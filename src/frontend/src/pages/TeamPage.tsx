import {
  BadgeDollarSign,
  FlaskConical,
  Leaf,
  Shield,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";

interface TeamMember {
  name: string;
  note?: string;
}

interface SubGroup {
  label: string;
  members: TeamMember[];
}

interface TeamSection {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  headerBg: string;
  badgeBg: string;
  badgeText: string;
  members?: TeamMember[];
  subGroups?: SubGroup[];
}

const teamSections: TeamSection[] = [
  {
    id: "advisory-board",
    title: "Advisory Board",
    icon: Shield,
    color: "border-blue-200",
    headerBg: "bg-blue-600",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-800",
    members: [
      { name: "Dr Abdullah al Masud" },
      { name: "Mr Mahiuddin Sarkar Rana" },
      { name: "Mr Maung Kyaw Thing" },
      { name: "Mr Jewel Talukder" },
      { name: "Mr Rakibul Hasan" },
    ],
  },
  {
    id: "veterinarian",
    title: "Veterinarian",
    icon: Stethoscope,
    color: "border-emerald-200",
    headerBg: "bg-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800",
    members: [
      { name: "Dr Muntachir Bin Noman" },
      { name: "Dr Harun" },
      { name: "Dr Saifullah" },
      { name: "Dr Misbah" },
    ],
  },
  {
    id: "homoeopathy",
    title: "Veterinary Homoeopathy",
    icon: Leaf,
    color: "border-green-200",
    headerBg: "bg-green-700",
    badgeBg: "bg-green-50",
    badgeText: "text-green-800",
    members: [
      { name: "Dr A. N. M. Budaruddin" },
      { name: "Dr Fatema Binty Noman" },
      { name: "Dr Mustahir Bin Noman" },
    ],
  },
  {
    id: "research",
    title: "Research & Query Management",
    icon: FlaskConical,
    color: "border-purple-200",
    headerBg: "bg-purple-600",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-800",
    members: [
      { name: "Dr A A M Sabuj" },
      { name: "Dr Delowar Hossain" },
      { name: "Dr Mishuk Shaha" },
    ],
  },
  {
    id: "coordinator-accounts-finance",
    title: "Coordinator Accounts & Finance",
    icon: BadgeDollarSign,
    color: "border-teal-200",
    headerBg: "bg-teal-600",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800",
    members: [{ name: "Mr. Chala Thoai Chak" }],
  },
  {
    id: "supporting",
    title: "Supporting Companion",
    icon: Users,
    color: "border-amber-200",
    headerBg: "bg-amber-600",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    subGroups: [
      {
        label: "Expert on Large Animal Management",
        members: [{ name: "Mr Liakot Ali" }],
      },
      {
        label: "Post Mortem (Poultry)",
        members: [
          { name: "MPO (Renata)" },
          { name: "MPO (Techno)" },
          { name: "MPO (Acme)" },
          { name: "MPO (Sk+F)" },
        ],
      },
    ],
  },
  {
    id: "vaccinator",
    title: "Vaccinator",
    icon: Syringe,
    color: "border-rose-200",
    headerBg: "bg-rose-600",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-800",
    members: [{ name: "Mr Sourov Hossain" }, { name: "Mr Zulu" }],
  },
];

const ocidMap: Record<string, string> = {
  "advisory-board": "team.advisory_board.section",
  veterinarian: "team.veterinarian.section",
  homoeopathy: "team.homoeopathy.section",
  research: "team.research.section",
  "coordinator-accounts-finance": "team.coordinator_accounts_finance.section",
  supporting: "team.supporting.section",
  vaccinator: "team.vaccinator.section",
};

export default function TeamPage() {
  return (
    <div className="py-12">
      {/* Hero Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 py-14 text-center">
          <span className="inline-block bg-primary-foreground/15 border border-primary-foreground/25 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm uppercase tracking-widest">
            Our People
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-3">
            Our Team
          </h1>
          <p className="text-primary-foreground/85 text-lg mb-4">
            The dedicated professionals behind treatVET
          </p>
          <p className="text-primary-foreground/70 text-sm italic max-w-2xl mx-auto">
            "Treatment, research and educational assurance through veterinary
            engage team"
          </p>
        </div>
      </div>

      {/* Team Sections Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {teamSections.map((section) => {
            const Icon = section.icon;
            const ocid = ocidMap[section.id];

            return (
              <div
                key={section.id}
                data-ocid={ocid}
                className={`rounded-2xl border-2 ${section.color} overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                {/* Card Header */}
                <div
                  className={`${section.headerBg} text-white px-5 py-4 flex items-center gap-3`}
                >
                  <div className="p-2 bg-white/20 rounded-lg shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg leading-tight">
                      {section.title}
                    </h2>
                    {section.members && (
                      <p className="text-white/75 text-xs mt-0.5">
                        {section.members.length} member
                        {section.members.length !== 1 ? "s" : ""}
                      </p>
                    )}
                    {section.subGroups && (
                      <p className="text-white/75 text-xs mt-0.5">
                        {section.subGroups.reduce(
                          (acc, g) => acc + g.members.length,
                          0,
                        )}{" "}
                        members
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 bg-white">
                  {/* Flat member list */}
                  {section.members && (
                    <div className="flex flex-wrap gap-2">
                      {section.members.map((member) => (
                        <span
                          key={member.name}
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${section.badgeBg} ${section.badgeText} border-current/10`}
                        >
                          {member.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Grouped members */}
                  {section.subGroups && (
                    <div className="space-y-4">
                      {section.subGroups.map((group) => (
                        <div key={group.label}>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 border-b border-border pb-1">
                            {group.label}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {group.members.map((member) => (
                              <span
                                key={member.name}
                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${section.badgeBg} ${section.badgeText} border-current/10`}
                              >
                                {member.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom motto banner */}
        <div className="mt-12 bg-secondary/40 border border-border rounded-2xl p-8 text-center">
          <p className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2">
            Together for Animal Welfare
          </p>
          <p className="text-muted-foreground text-sm italic max-w-2xl mx-auto">
            Our multidisciplinary team combines clinical expertise, homeopathic
            knowledge, research capability, and field experience — all committed
            to the highest standards of veterinary care.
          </p>
        </div>
      </div>
    </div>
  );
}
