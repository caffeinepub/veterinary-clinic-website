import { AlertTriangle, Clock, MapPin, Phone, Users } from "lucide-react";
import { useState } from "react";
import type { Service } from "../backend";
import AppointmentBookingForm, {
  type BookingFormData,
} from "../components/AppointmentBookingForm";
import BookingConfirmation from "../components/BookingConfirmation";
import { useBookAppointment, useGetAllServices } from "../hooks/useQueries";
import { dateToTime, generateAppointmentId } from "../utils/appointmentHelpers";

interface ConfirmationData {
  clientName: string;
  phoneNumber: string;
  animalType: string;
  serviceName: string;
  preferredDate: Date;
  appointmentId: string;
}

export default function ContactBookingPage() {
  const { data: services = [], isLoading: servicesLoading } =
    useGetAllServices();
  const bookAppointment = useBookAppointment();
  const [confirmation, setConfirmation] = useState<ConfirmationData | null>(
    null,
  );

  const handleSubmit = async (formData: BookingFormData) => {
    const appointmentId = generateAppointmentId();
    const preferredDate = new Date(formData.preferredDate);
    const preferredTime = dateToTime(preferredDate);

    const selectedService = services.find(
      (s: Service) => s.id === formData.serviceId,
    );

    await bookAppointment.mutateAsync({
      id: appointmentId,
      clientName: formData.clientName,
      phoneNumber: formData.phoneNumber,
      animalType: formData.animalType,
      category: formData.category,
      serviceId: formData.serviceId,
      preferredDate: preferredTime,
    });

    setConfirmation({
      clientName: formData.clientName,
      phoneNumber: formData.phoneNumber,
      animalType: formData.animalType,
      serviceName: selectedService?.name ?? "Selected Service",
      preferredDate,
      appointmentId,
    });
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-3">
            Contact & Book Appointment
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fill out the form below to request an appointment. Our standby
            veterinary specialist will confirm your booking promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
              {confirmation ? (
                <BookingConfirmation
                  {...confirmation}
                  onBookAnother={() => setConfirmation(null)}
                />
              ) : (
                <>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                    Request an Appointment
                  </h2>
                  {servicesLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                    </div>
                  ) : (
                    <AppointmentBookingForm
                      services={services}
                      onSubmit={handleSubmit}
                      isSubmitting={bookAppointment.isPending}
                    />
                  )}
                  {bookAppointment.isError && (
                    <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                      Failed to book appointment. Please try again or contact us
                      directly.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-5">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                Clinic Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Address
                    </p>
                    <p className="text-sm text-muted-foreground">
                      treatVET, Tulatali
                      <br />
                      (In front of Padua High School)
                      <br />
                      Padua - 4397, Lohagara, Chittagong
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Availability
                    </p>
                    <p className="text-sm text-primary font-medium">
                      24/7 — Always Available
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Standby veterinary specialist on call
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Service Hours
                    </p>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      <p>Open 24 hours, 7 days a week</p>
                      <p>Poultry diagnosis: 15+ hrs/day</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Our Team
                    </p>
                    <p className="text-sm text-muted-foreground">
                      4+ Veterinary Experts · Est. 2017
                    </p>
                  </div>
                </li>
                <li
                  className="flex items-start gap-3"
                  data-ocid="contact.whatsapp.link"
                >
                  <div className="p-2 rounded-lg bg-green-100 shrink-0">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/8801989692489"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 font-medium hover:underline"
                    >
                      +880 1989 69 2489
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Text us on WhatsApp anytime
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 rounded-2xl border border-primary/20 p-5">
              <h4 className="font-semibold text-foreground mb-2 text-sm">
                📋 What to Bring
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• Previous vaccination records</li>
                <li>• Animal identification (tag/microchip)</li>
                <li>• Description of symptoms (if any)</li>
                <li>• Recent medical history</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <h4 className="font-semibold text-foreground text-sm">
                  Emergency House Visit
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                In emergency cases, our veterinary team visits the animal
                owner's house at <strong>any time</strong>. We are available
                24/7 for urgent situations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
