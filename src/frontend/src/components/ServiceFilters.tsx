import { ServiceCategory, ServiceType } from "../backend";

const categories = [
  { value: "all", label: "All Animals" },
  { value: ServiceCategory.pet, label: "Pets" },
  { value: ServiceCategory.largeRuminant, label: "Large Animals" },
  { value: ServiceCategory.smallRuminant, label: "Small Animals" },
  { value: ServiceCategory.birdsPoultry, label: "Birds / Poultry" },
];

const types = [
  { value: "all", label: "All Types" },
  { value: ServiceType.treatment, label: "Treatment" },
  { value: ServiceType.vaccination, label: "Vaccination" },
  { value: ServiceType.consultation, label: "Consultation" },
  { value: ServiceType.surgery, label: "Surgery" },
  { value: ServiceType.other, label: "Other" },
];

interface ServiceFiltersProps {
  selectedCategory: string;
  selectedType: string;
  onCategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function ServiceFilters({
  selectedCategory,
  selectedType,
  onCategoryChange,
  onTypeChange,
}: ServiceFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-xl border border-border shadow-xs">
      <div className="flex-1">
        <p className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
          Animal Category
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      <div className="sm:border-l sm:border-border sm:pl-4 flex-1">
        <p className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
          Service Type
        </p>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              type="button"
              key={type.value}
              onClick={() => onTypeChange(type.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedType === type.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
