import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useState } from "react";
import { ServiceCategory, ServiceType } from "../backend";
import ServiceCard from "../components/ServiceCard";
import ServiceFilters from "../components/ServiceFilters";
import { useGetAllServices } from "../hooks/useQueries";

export default function ServicesPage() {
  const { data: services = [], isLoading } = useGetAllServices();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = services.filter((s) => {
    const matchCat =
      selectedCategory === "all" || s.category === selectedCategory;
    const matchType = selectedType === "all" || s.serviceType === selectedType;
    const matchSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Our Offerings
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-3">
            All Veterinary Services
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse our complete range of veterinary services for large
            ruminants, small ruminants, and pets.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ServiceFilters
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            onCategoryChange={setSelectedCategory}
            onTypeChange={setSelectedType}
          />
        </div>

        {/* Results Count */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing <strong>{filtered.length}</strong> of{" "}
            <strong>{services.length}</strong> services
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => i).map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-5 space-y-3"
              >
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-6 w-1/3 mt-2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              No services found
            </h3>
            <p className="text-muted-foreground">
              {services.length === 0
                ? "No services have been added yet. Check back soon!"
                : "Try adjusting your filters or search query."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
