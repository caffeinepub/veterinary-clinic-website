import { type Service } from '../backend';
import { formatPrice } from '../utils/appointmentHelpers';
import { Shield, Calendar, DollarSign } from 'lucide-react';

interface VaccinationEntryProps {
  service: Service;
  accentClass?: string;
}

export default function VaccinationEntry({ service, accentClass = '' }: VaccinationEntryProps) {
  return (
    <div className={`bg-card rounded-xl border border-border p-5 shadow-xs hover:shadow-card transition-shadow ${accentClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-0.5 p-2 rounded-lg bg-primary/10">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground font-sans">{service.name}</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{service.description}</p>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Consult vet for schedule</span>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 text-primary font-bold">
            <DollarSign className="h-4 w-4" />
            <span className="text-lg">{Number(service.price).toLocaleString()}</span>
          </div>
          <span className="text-xs text-muted-foreground">per dose</span>
        </div>
      </div>
    </div>
  );
}
