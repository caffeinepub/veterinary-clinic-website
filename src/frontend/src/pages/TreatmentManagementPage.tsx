import { Skeleton } from "@/components/ui/skeleton";
import { ServiceCategory, ServiceType } from "../backend";
import TreatmentCategorySection from "../components/TreatmentCategorySection";
import { useGetAllServices } from "../hooks/useQueries";

const categoryConfig = [
  {
    category: ServiceCategory.pet,
    title: "Pets",
    subtitle: "Dogs, Cats & More",
    icon: "/assets/generated/icon-pet.dim_128x128.png",
    accentClass: "bg-rose-50/60 border-rose-200",
  },
  {
    category: ServiceCategory.largeRuminant,
    title: "Large Animals",
    subtitle: "Cattle, Buffalo & Camels",
    icon: "/assets/generated/icon-large-ruminant.dim_128x128.png",
    accentClass: "bg-amber-50/60 border-amber-200",
  },
  {
    category: ServiceCategory.smallRuminant,
    title: "Small Animals",
    subtitle: "Sheep & Goats",
    icon: "/assets/generated/icon-small-ruminant.dim_128x128.png",
    accentClass: "bg-sky-50/60 border-sky-200",
  },
  {
    category: ServiceCategory.birdsPoultry,
    title: "Birds / Poultry",
    subtitle: "Layer, Broiler & Color Birds",
    icon: "/assets/generated/animal-birds.dim_600x400.png",
    accentClass: "bg-emerald-50/60 border-emerald-200",
  },
];

export default function TreatmentManagementPage() {
  const { data: allServices = [], isLoading } = useGetAllServices();

  const treatmentServices = allServices.filter(
    (s) => s.serviceType === ServiceType.treatment,
  );

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Medical Care
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-3">
            Treatment Management
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Comprehensive treatment services organized by animal category. Click
            on any treatment to view full details and pricing.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border p-6 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {categoryConfig.map((config) => {
              const categoryServices = treatmentServices.filter(
                (s) => s.category === config.category,
              );
              return (
                <TreatmentCategorySection
                  key={config.category}
                  title={config.title}
                  subtitle={config.subtitle}
                  icon={config.icon}
                  services={categoryServices}
                  accentClass={config.accentClass}
                />
              );
            })}
            {treatmentServices.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🩺</div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  No treatments listed yet
                </h3>
                <p className="text-muted-foreground">
                  Treatment services will appear here once added by the clinic.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
