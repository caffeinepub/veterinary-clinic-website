import { useGetAllServices } from '../hooks/useQueries';
import VaccinationEntry from '../components/VaccinationEntry';
import { Skeleton } from '@/components/ui/skeleton';
import { ServiceCategory, ServiceType } from '../backend';

const categoryConfig = [
  {
    category: ServiceCategory.pet,
    title: 'Pets',
    subtitle: 'Dogs, Cats & More',
    icon: '/assets/generated/icon-pet.dim_128x128.png',
    headerClass: 'bg-rose-50 border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-800',
  },
  {
    category: ServiceCategory.largeRuminant,
    title: 'Large Animals',
    subtitle: 'Cattle, Buffalo & Camels',
    icon: '/assets/generated/icon-large-ruminant.dim_128x128.png',
    headerClass: 'bg-amber-50 border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-800',
  },
  {
    category: ServiceCategory.smallRuminant,
    title: 'Small Animals',
    subtitle: 'Sheep & Goats',
    icon: '/assets/generated/icon-small-ruminant.dim_128x128.png',
    headerClass: 'bg-sky-50 border-sky-200',
    badgeClass: 'bg-sky-100 text-sky-800',
  },
  {
    category: ServiceCategory.birdsPoultry,
    title: 'Birds / Poultry',
    subtitle: 'Layer, Broiler & Color Birds',
    icon: '/assets/generated/animal-birds.dim_600x400.png',
    headerClass: 'bg-emerald-50 border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800',
  },
];

export default function VaccinationPage() {
  const { data: allServices = [], isLoading } = useGetAllServices();

  const vaccinationServices = allServices.filter(
    (s) => s.serviceType === ServiceType.vaccination
  );

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Prevention First</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-3">
            Vaccination Programs
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Protect your animals with our comprehensive vaccination programs. Prevention is the best medicine.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8 flex items-start gap-3">
          <span className="text-2xl">💉</span>
          <div>
            <p className="font-semibold text-foreground text-sm">Why Vaccinate?</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Regular vaccination is the most cost-effective way to prevent infectious diseases in your herd, flock, or pets. Our veterinarians will help you create a customized vaccination schedule for any kind of animal.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {categoryConfig.map((config) => {
              const categoryVaccinations = vaccinationServices.filter(
                (s) => s.category === config.category
              );
              return (
                <section key={config.category}>
                  {/* Category Header */}
                  <div className={`flex items-center gap-4 p-5 rounded-xl border mb-4 ${config.headerClass}`}>
                    <img src={config.icon} alt={config.title} className="h-12 w-12 object-contain rounded-lg" />
                    <div>
                      <h2 className="font-serif text-xl font-bold text-foreground">{config.title}</h2>
                      <p className="text-sm text-muted-foreground">{config.subtitle}</p>
                    </div>
                    <span className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${config.badgeClass}`}>
                      {categoryVaccinations.length} vaccine{categoryVaccinations.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {categoryVaccinations.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic px-2">
                      No vaccination programs listed for this category yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryVaccinations.map((svc) => (
                        <VaccinationEntry key={svc.id} service={svc} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            {vaccinationServices.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">💉</div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No vaccination programs listed yet</h3>
                <p className="text-muted-foreground">Vaccination programs will appear here once added by the clinic.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
