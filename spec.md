# treatVET Veterinary Clinic Website

## Current State
The site has 5 pages: Home, Services, Treatments, Vaccination, Contact & Book.
- Navigation uses a generated logo image (`/assets/generated/clinic-logo.dim_256x256.png`)
- Footer has Quick Links, Contact info, and Brand section
- HomePage has hero, stats bar, animal categories (Pets, Large Animals, Small Animals, Birds/Poultry), Why Choose Us, About Us, Specialized Services, CTA, contact strip
- Services page shows backend-driven service cards with filter/search
- ContactBookingPage has appointment form + clinic info sidebar
- No Team/About team page exists yet
- WhatsApp phone number not present
- Animal categories do not include Game Bird, Zoo Animal, Lab Animal

## Requested Changes (Diff)

### Add
- **Logo**: Replace generated logo in Navigation and Footer with uploaded image `/assets/uploads/IMG_9071-1.png`
- **Motto**: Add tagline "Treatment, research and educational assurance through veterinary engage team" on the homepage hero and/or about section
- **Team Page** (`/team`): New page with 6 subsections:
  a. Advisory Board: Dr Abdullah al Masud, Mr Mahiuddin Sarkar Rana, Mr Maung Kyaw Thing, Mr Jewel Talukder, Mr Rakibul Hasan
  b. Veterinarian: Dr Muntachir Bin Noman, Dr Harun, Dr Saifullah, Dr Misbah
  c. Veterinary Homoeopathy: Dr A. N. M. Budaruddin, Dr Fatema Binty Noman, Dr Mustahir Bin Noman
  d. Research & Query Management Team: Dr A A M Sabuj, Dr Delowar Hossain, Dr Mishuk Shaha
  e. Supporting Companion:
    - Expert on Large Animal Management: Mr Liakot Ali
    - Post Mortem (Poultry): MPO(Renata), MPO(Techno), MPO(Acme), MPO(Sk+F)
  f. Vaccinator: Mr Sourov Hossain, Mr Zulu
- **Nav link** for "Team" added to Navigation and Footer Quick Links
- **New services** in services data / display on Services page (these are static additions visible on the page even if backend-driven):
  - Veterinary Homoeopathy
  - SMS Service (WhatsApp)
  - Basic Training
  - Micro Loan for Livestock Rearing
  - Farm Planning
  - Ration Formulation
  - Post Mortem (Poultry)
- **WhatsApp Quick Link** in Footer Quick Links: "Text on WhatsApp" linking to `https://wa.me/8801989692489`
- **WhatsApp contact entry** in ContactBookingPage sidebar showing phone +880 1989 69 2489 with WhatsApp icon/link
- **Animal categories** on HomePage: Add Game Bird, Zoo Animal, Lab Animal (3 new cards appended to the grid)

### Modify
- Navigation: logo src changed from generated image to `/assets/uploads/IMG_9071-1.png`
- Footer: logo src changed from generated image to `/assets/uploads/IMG_9071-1.png`
- HomePage hero subtitle/description: include the new motto
- Animal categories grid: expand from 4 to 7 categories (add Game Bird, Zoo Animal, Lab Animal)
- App.tsx: add route `/team` pointing to new TeamPage component
- Footer Quick Links list: add Team link and WhatsApp link

### Remove
- Nothing removed

## Implementation Plan
1. Update Navigation.tsx: change logo src to `/assets/uploads/IMG_9071-1.png`
2. Update Footer.tsx: change logo src to `/assets/uploads/IMG_9071-1.png`; add "Team" link; add "Text on WhatsApp" link pointing to `https://wa.me/8801989692489`
3. Update HomePage.tsx: add motto text in hero section; add 3 new animal categories (Game Bird, Zoo Animal, Lab Animal); add new specialized services cards
4. Create TeamPage.tsx: full team listing with 6 subsections, styled with cards/badges
5. Update App.tsx: import TeamPage, add `/team` route
6. Update Navigation.tsx: add "Team" link to navLinks array
7. Update ContactBookingPage.tsx: add WhatsApp phone number entry in sidebar
8. Validate (typecheck + build)
