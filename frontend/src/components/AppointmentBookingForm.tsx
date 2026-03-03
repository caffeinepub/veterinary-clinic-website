import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ServiceCategory, type Service } from '../backend';
import { Loader2 } from 'lucide-react';

const categoryOptions = [
  { value: ServiceCategory.pet, label: 'Pet (Dog, Cat, etc.)' },
  { value: ServiceCategory.largeRuminant, label: 'Large Animal (Cattle, Buffalo, Camel)' },
  { value: ServiceCategory.smallRuminant, label: 'Small Animal (Sheep, Goat)' },
  { value: ServiceCategory.birdsPoultry, label: 'Birds / Poultry (Layer, Broiler, Color Bird)' },
];

export interface BookingFormData {
  clientName: string;
  phoneNumber: string;
  animalType: string;
  category: ServiceCategory;
  serviceId: string;
  preferredDate: string;
  notes: string;
}

interface AppointmentBookingFormProps {
  services: Service[];
  onSubmit: (data: BookingFormData) => void;
  isSubmitting: boolean;
}

export default function AppointmentBookingForm({
  services,
  onSubmit,
  isSubmitting,
}: AppointmentBookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    phoneNumber: '',
    animalType: '',
    category: ServiceCategory.pet,
    serviceId: '',
    preferredDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    if (!formData.clientName.trim()) newErrors.clientName = 'Name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!/^\+?[\d\s\-()]{7,}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Enter a valid phone number';
    if (!formData.animalType.trim()) newErrors.animalType = 'Animal type is required';
    if (!formData.serviceId) newErrors.serviceId = 'Please select a service';
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date';
    else {
      const selected = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) newErrors.preferredDate = 'Date must be today or in the future';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const filteredServices = services.filter((s) => s.category === formData.category);

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="clientName">Your Full Name *</Label>
          <Input
            id="clientName"
            placeholder="e.g. Rahim Uddin"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            className={errors.clientName ? 'border-destructive' : ''}
          />
          {errors.clientName && <p className="text-xs text-destructive">{errors.clientName}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            placeholder="+880 1XXX-XXXXXX"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className={errors.phoneNumber ? 'border-destructive' : ''}
          />
          {errors.phoneNumber && <p className="text-xs text-destructive">{errors.phoneNumber}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="category">Animal Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(val) =>
              setFormData({ ...formData, category: val as ServiceCategory, serviceId: '' })
            }
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="animalType">Animal Type / Name *</Label>
          <Input
            id="animalType"
            placeholder="e.g. Broiler Chicken, Holstein Cow"
            value={formData.animalType}
            onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
            className={errors.animalType ? 'border-destructive' : ''}
          />
          {errors.animalType && <p className="text-xs text-destructive">{errors.animalType}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="serviceId">Desired Service *</Label>
        <Select
          value={formData.serviceId}
          onValueChange={(val) => setFormData({ ...formData, serviceId: val })}
        >
          <SelectTrigger id="serviceId" className={errors.serviceId ? 'border-destructive' : ''}>
            <SelectValue placeholder={filteredServices.length === 0 ? 'No services for this category' : 'Select a service'} />
          </SelectTrigger>
          <SelectContent>
            {filteredServices.length === 0 ? (
              <SelectItem value="none" disabled>No services available</SelectItem>
            ) : (
              filteredServices.map((svc) => (
                <SelectItem key={svc.id} value={svc.id}>
                  {svc.name} — ৳{Number(svc.price).toLocaleString()}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        {errors.serviceId && <p className="text-xs text-destructive">{errors.serviceId}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="preferredDate">Preferred Date *</Label>
        <Input
          id="preferredDate"
          type="date"
          min={today}
          value={formData.preferredDate}
          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
          className={errors.preferredDate ? 'border-destructive' : ''}
        />
        {errors.preferredDate && <p className="text-xs text-destructive">{errors.preferredDate}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Additional Notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Describe any symptoms, concerns, or special requirements..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Booking...
          </>
        ) : (
          'Book Appointment'
        )}
      </Button>
    </form>
  );
}
