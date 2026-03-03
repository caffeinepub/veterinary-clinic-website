import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Service, ServiceCategory, ServiceType } from "../backend";
import { formatPrice } from "../utils/appointmentHelpers";

const categoryLabels: Record<ServiceCategory, string> = {
  [ServiceCategory.largeRuminant]: "Large Animal",
  [ServiceCategory.smallRuminant]: "Small Animal",
  [ServiceCategory.pet]: "Pet",
  [ServiceCategory.birdsPoultry]: "Birds / Poultry",
};

const typeLabels: Record<ServiceType, string> = {
  [ServiceType.treatment]: "Treatment",
  [ServiceType.vaccination]: "Vaccination",
  [ServiceType.consultation]: "Consultation",
  [ServiceType.surgery]: "Surgery",
  [ServiceType.other]: "Other",
};

const categoryColors: Record<ServiceCategory, string> = {
  [ServiceCategory.largeRuminant]:
    "bg-amber-100 text-amber-800 border-amber-200",
  [ServiceCategory.smallRuminant]: "bg-sky-100 text-sky-800 border-sky-200",
  [ServiceCategory.pet]: "bg-rose-100 text-rose-800 border-rose-200",
  [ServiceCategory.birdsPoultry]:
    "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const typeColors: Record<ServiceType, string> = {
  [ServiceType.treatment]: "bg-green-100 text-green-800 border-green-200",
  [ServiceType.vaccination]: "bg-blue-100 text-blue-800 border-blue-200",
  [ServiceType.consultation]: "bg-purple-100 text-purple-800 border-purple-200",
  [ServiceType.surgery]: "bg-orange-100 text-orange-800 border-orange-200",
  [ServiceType.other]: "bg-gray-100 text-gray-700 border-gray-200",
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-card hover:shadow-card-hover transition-shadow duration-200 border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${categoryColors[service.category]}`}
          >
            {categoryLabels[service.category]}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${typeColors[service.serviceType]}`}
          >
            {typeLabels[service.serviceType]}
          </span>
        </div>
        <CardTitle className="font-serif text-lg leading-snug">
          {service.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-3">
        <CardDescription className="text-sm leading-relaxed flex-1">
          {service.description}
        </CardDescription>
        <div className="pt-2 border-t border-border">
          <span className="text-xl font-bold text-primary font-sans">
            {formatPrice(service.price)}
          </span>
          <span className="text-xs text-muted-foreground ml-1">per visit</span>
        </div>
      </CardContent>
    </Card>
  );
}
