import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Treatments', path: '/treatments' },
  { label: 'Vaccination', path: '/vaccination' },
  { label: 'Contact & Book', path: '/contact' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/generated/clinic-logo.dim_256x256.png"
              alt="treatVET Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-bold text-lg text-primary">treatVET</span>
              <span className="text-xs text-muted-foreground font-sans hidden sm:block">Veterinary Care Treatment</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-sm text-primary font-medium">
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">24/7 Available</span>
            </span>
            <Link to="/contact">
              <Button size="sm" className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">
                Book Appointment
              </Button>
            </Link>
            <button
              className="md:hidden p-2 rounded-md text-foreground hover:bg-accent"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="md:hidden py-3 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-md mb-1 transition-colors ${
                  currentPath === link.path
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full bg-primary text-primary-foreground">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
