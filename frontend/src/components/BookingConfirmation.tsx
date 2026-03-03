import { CheckCircle2, Calendar, Phone, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { formatDate } from '../utils/appointmentHelpers';

interface BookingConfirmationProps {
  clientName: string;
  phoneNumber: string;
  animalType: string;
  serviceName: string;
  preferredDate: Date;
  appointmentId: string;
  onBookAnother: () => void;
}

export default function BookingConfirmation({
  clientName,
  phoneNumber,
  animalType,
  serviceName,
  preferredDate,
  appointmentId,
  onBookAnother,
}: BookingConfirmationProps) {
  return (
    <div className="max-w-lg mx-auto text-center animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-primary/10">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
      </div>
      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Appointment Booked!</h2>
      <p className="text-muted-foreground mb-6">
        Thank you, <strong>{clientName}</strong>! Your appointment request has been received. We'll confirm it shortly.
      </p>

      <div className="bg-card rounded-xl border border-border p-5 text-left space-y-3 mb-6 shadow-xs">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Appointment Details</h3>
        <div className="flex items-center gap-3 text-sm">
          <User className="h-4 w-4 text-primary/70 shrink-0" />
          <span className="text-muted-foreground">Client:</span>
          <span className="font-medium">{clientName}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="h-4 w-4 text-primary/70 shrink-0" />
          <span className="text-muted-foreground">Phone:</span>
          <span className="font-medium">{phoneNumber}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Tag className="h-4 w-4 text-primary/70 shrink-0" />
          <span className="text-muted-foreground">Animal:</span>
          <span className="font-medium">{animalType}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Tag className="h-4 w-4 text-primary/70 shrink-0" />
          <span className="text-muted-foreground">Service:</span>
          <span className="font-medium">{serviceName}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="h-4 w-4 text-primary/70 shrink-0" />
          <span className="text-muted-foreground">Date:</span>
          <span className="font-medium">{formatDate(preferredDate)}</span>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">Reference ID: <code className="font-mono text-primary">{appointmentId}</code></p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onBookAnother} variant="outline" className="border-primary text-primary hover:bg-accent">
          Book Another
        </Button>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
