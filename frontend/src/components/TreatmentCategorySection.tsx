import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { type Service } from '../backend';
import { formatPrice } from '../utils/appointmentHelpers';
import { DollarSign, FileText } from 'lucide-react';

interface TreatmentCategorySectionProps {
  title: string;
  subtitle: string;
  icon: string;
  services: Service[];
  accentClass: string;
}

export default function TreatmentCategorySection({
  title,
  subtitle,
  icon,
  services,
  accentClass,
}: TreatmentCategorySectionProps) {
  if (services.length === 0) {
    return (
      <div className={`rounded-2xl border border-border p-6 ${accentClass}`}>
        <div className="flex items-center gap-4 mb-4">
          <img src={icon} alt={title} className="h-14 w-14 object-contain" />
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm italic">No treatment services available in this category yet.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-border overflow-hidden ${accentClass}`}>
      <div className="flex items-center gap-4 p-6 pb-4">
        <img src={icon} alt={title} className="h-14 w-14 object-contain" />
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          <span className="inline-block mt-1 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {services.length} treatment{services.length !== 1 ? 's' : ''} available
          </span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <Accordion type="multiple" className="space-y-2">
          {services.map((service) => (
            <AccordionItem
              key={service.id}
              value={service.id}
              className="bg-card rounded-xl border border-border px-4 shadow-xs"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center justify-between w-full pr-2">
                  <span className="font-medium text-left text-foreground">{service.name}</span>
                  <span className="text-primary font-bold text-sm ml-4 shrink-0">{formatPrice(service.price)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mt-0.5 shrink-0 text-primary/60" />
                    <p className="leading-relaxed">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-primary/60" />
                    <span className="font-semibold text-primary">{formatPrice(service.price)}</span>
                    <span className="text-muted-foreground">per visit</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
