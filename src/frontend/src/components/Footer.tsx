import { Link } from "@tanstack/react-router";
import { AlertTriangle, Clock, Heart, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "treatvet-clinic",
  );

  return (
    <footer className="bg-foreground text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/IMG_9071-1.png"
                alt="treatVET"
                className="h-10 w-10 object-contain"
              />
              <div>
                <p className="font-serif font-bold text-lg">treatVET</p>
                <p className="text-xs opacity-70">Veterinary Care Treatment</p>
              </div>
            </div>
            <p className="text-sm opacity-75 leading-relaxed mb-3">
              Expert veterinary care for pets, large animals, small animals, and
              birds/poultry. Serving the community since 2017.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/30 border border-primary-foreground/20 rounded-lg px-3 py-2">
              <AlertTriangle className="h-4 w-4 text-yellow-300 shrink-0" />
              <p className="text-xs font-medium">
                Emergency house visits available 24/7
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-base mb-4 opacity-90">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Our Services", path: "/services" },
                { label: "Treatment Management", path: "/treatments" },
                { label: "Vaccination Programs", path: "/vaccination" },
                { label: "Our Team", path: "/team" },
                { label: "Book Appointment", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-75 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/8801989692489"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.whatsapp.link"
                  className="text-sm opacity-75 hover:opacity-100 hover:underline transition-opacity flex items-center gap-1.5"
                >
                  💬 Text on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-base mb-4 opacity-90">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm opacity-75">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  treatVET, Tulatali
                  <br />
                  (In front of Padua High School)
                  <br />
                  Padua - 4397, Lohagara, Chittagong
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-75">
                <Phone className="h-4 w-4 shrink-0" />
                <span>Available 24/7 for emergencies</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm opacity-75">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p>Open 24 hours, 7 days a week</p>
                  <p className="text-xs opacity-80 mt-0.5">
                    Standby veterinary specialist always available
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-60">
          <p>© {year} treatVET. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 fill-current text-red-400" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-100"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
