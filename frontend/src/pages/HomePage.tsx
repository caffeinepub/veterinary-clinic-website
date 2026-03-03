import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, MapPin, Clock, Star, Shield, Heart, Stethoscope, AlertTriangle, Users } from 'lucide-react';

const animalCategories = [
  {
    title: 'Pets',
    subtitle: 'Dogs, Cats & More',
    image: '/assets/generated/animal-pets.dim_600x400.png',
    description: 'Loving, expert care for your companion animals with a full range of preventive and curative services.',
    color: 'bg-rose-50 border-rose-200',
    badge: 'bg-rose-100 text-rose-800',
  },
  {
    title: 'Large Animals',
    subtitle: 'Cattle, Buffalo & Camels',
    image: '/assets/generated/animal-large.dim_600x400.png',
    description: 'Comprehensive care for your large livestock including health monitoring, disease prevention, and emergency treatment.',
    color: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
  },
  {
    title: 'Small Animals',
    subtitle: 'Sheep & Goats',
    image: '/assets/generated/animal-small.dim_600x400.png',
    description: 'Specialized veterinary services for sheep and goats, from routine check-ups to advanced surgical procedures.',
    color: 'bg-sky-50 border-sky-200',
    badge: 'bg-sky-100 text-sky-800',
  },
  {
    title: 'Birds / Poultry',
    subtitle: 'Layer, Broiler & Color Birds',
    image: '/assets/generated/animal-birds.dim_600x400.png',
    description: 'Expert post-mortem, diagnosis, and care for all poultry including layer, broiler, and color birds. 15+ hours/day service.',
    color: 'bg-emerald-50 border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800',
  },
];

const features = [
  { icon: Shield, title: 'Preventive Care', desc: 'Vaccination programs and health screenings to keep your animals healthy year-round.' },
  { icon: Stethoscope, title: 'Expert Diagnosis', desc: 'Post-mortem and diagnosis of poultry (layer, broiler, color bird) — more than 15 hours a day.' },
  { icon: Heart, title: 'Compassionate Treatment', desc: 'We treat every animal with the same care and compassion we would give our own.' },
  { icon: Star, title: 'Trusted by Clients', desc: '82% known client satisfaction rate with 1700+ animals treated since 2017.' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1400x500.png"
            alt="treatVET clinic hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary/20 text-primary-foreground text-sm font-medium px-3 py-1 rounded-full mb-4 backdrop-blur-sm border border-primary-foreground/20">
              🌿 Trusted Veterinary Care Since 2017
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
              treatVET
            </h1>
            <p className="text-white/90 text-xl font-semibold mb-3">Veterinary Care Treatment</p>
            <p className="text-white/85 text-lg mb-8 leading-relaxed max-w-xl">
              From large livestock to beloved pets and poultry — treatVET provides expert veterinary services with compassion and dedication, available 24/7.
            </p>
            {/* Emergency callout */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-300/40 rounded-lg px-4 py-2 mb-6 backdrop-blur-sm">
              <AlertTriangle className="h-4 w-4 text-yellow-300 shrink-0" />
              <span className="text-white text-sm font-medium">Emergency? We visit your home at any time!</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                  Book an Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10 backdrop-blur-sm">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold font-serif">24/7</p>
              <p className="text-sm opacity-80">Always Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-serif">4+</p>
              <p className="text-sm opacity-80">Veterinary Experts</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-serif">1700+</p>
              <p className="text-sm opacity-80">Animals Treated</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-serif">82%</p>
              <p className="text-sm opacity-80">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-serif">2017</p>
              <p className="text-sm opacity-80">Established</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animal Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Services for Every Animal
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We provide specialized veterinary care tailored to the unique needs of each animal category.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {animalCategories.map((cat) => (
              <Card key={cat.title} className={`border-2 ${cat.color} shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 overflow-hidden`}>
                <div className="h-40 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${cat.badge}`}>
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{cat.description}</p>
                  <Link to="/services">
                    <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground">
                      View Services <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Why Choose treatVET?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We combine expertise, compassion, and modern veterinary medicine to deliver the best outcomes for your animals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="bg-card rounded-xl p-5 border border-border shadow-xs text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                  <feat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">About Us</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
                Dedicated to Animal Health Since 2017
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                treatVET was founded with a simple mission: to provide the highest quality veterinary care to all animals in our community. Our team of 4+ experienced veterinarians and support staff are passionate about animal health and welfare.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We serve farmers, ranchers, and pet owners alike, offering a comprehensive range of services from routine vaccinations and health checks to complex surgical procedures and emergency care. Our standby veterinary specialist is always ready.
              </p>
              {/* Emergency highlight */}
              <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">24/7 Emergency House Visits</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    In emergency cases, our veterinary team visits the animal owner's house at any time — day or night.
                  </p>
                </div>
              </div>
              {/* Address */}
              <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Our Location</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    treatVET, Tulatali (In front of Padua High School)<br />
                    Padua - 4397, Lohagara, Chittagong
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/services">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Explore Services
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-accent">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <p className="font-serif text-4xl font-bold text-primary">1700+</p>
                <p className="text-sm text-muted-foreground mt-1">Animals Treated</p>
              </div>
              <div className="bg-accent rounded-2xl p-6 text-center">
                <p className="font-serif text-4xl font-bold text-accent-foreground">82%</p>
                <p className="text-sm text-muted-foreground mt-1">Client Satisfaction</p>
              </div>
              <div className="bg-secondary rounded-2xl p-6 text-center">
                <p className="font-serif text-4xl font-bold text-secondary-foreground">24/7</p>
                <p className="text-sm text-muted-foreground mt-1">Emergency Service</p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <p className="font-serif text-4xl font-bold text-primary">4+</p>
                <p className="text-sm text-muted-foreground mt-1">Expert Vets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Specialized Services
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              Beyond routine care, treatVET offers specialized services for all your animal needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-card rounded-xl p-5 border border-border shadow-xs">
              <div className="text-2xl mb-3">🔬</div>
              <h3 className="font-semibold text-foreground mb-1.5 text-sm">Post-Mortem & Poultry Diagnosis</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                More than 15 hours a day dedicated to post-mortem and diagnosis of poultry — layer, broiler, and color birds.
              </p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border shadow-xs">
              <div className="text-2xl mb-3">🌾</div>
              <h3 className="font-semibold text-foreground mb-1.5 text-sm">Ration Formulation Consultation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Expert consultation on ration formulation to optimize nutrition and health outcomes for your animals.
              </p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border shadow-xs">
              <div className="text-2xl mb-3">🏠</div>
              <h3 className="font-semibold text-foreground mb-1.5 text-sm">Animal Housing Planning</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Professional guidance on animal housing design and planning for optimal welfare and productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
            Ready to Schedule a Visit?
          </h2>
          <p className="opacity-85 mb-6 max-w-lg mx-auto">
            Book an appointment today and give your animals the expert care they deserve. Available 24/7 with standby veterinary specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-2 border border-white/60 rounded-lg px-5 py-2.5 text-white text-sm font-medium">
              <Users className="h-4 w-4" />
              Standby Specialist Always Available
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Strip */}
      <section className="py-8 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Tulatali, Padua - 4397, Lohagara, Chittagong</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">24/7 Emergency House Visits Available</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Open 24 Hours · Since 2017</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
