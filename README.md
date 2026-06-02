"I am providing two reference images (Desktop and Mobile) that define the absolute visual and structural standard for the Seyyah Travel project. You must perform a deep 'Visual Logic Extraction' and rebuild the site from scratch using Next.js 14, Tailwind CSS, and GSAP.

1. Desktop Layout Extraction (Ref: Image 1):

Layered Hero Typography: Recreate the 'Ghost Headline' effect. The word 'AFRICA' (or current destination) must be a massive, semi-transparent background serif (Cormorant Garamond, ~25vw). It should sit at z-0 behind the main centered headline.

Cinematic Navigation: Implement the top-right localized navigation (ES, Mis reservas) and the minimalist center menu with high-fidelity letter spacing.

Bottom Global Navigation: Recreate the horizontal continent selector at the bottom. Use the exact spacing and font-weight contrast seen in 'America del Norte', 'Asia', etc..

Vertical Accents: Add the 'DESCUBRE' vertical text and animated scroll arrow on the far left.

2. Mobile Responsive Logic (Ref: Image 2):

Vertical Hierarchy: On mobile, the ghosted text should remain but scale proportionally. The 'Tanzania' title and the 'DISCOVER COUNTRY' CTA must be centered vertically with generous breathing room.

Symbolism: Include the placeholder for the custom ethnic icons (Adinkra style) above the destination names as seen in the mobile reference.

Navigation: Use the minimalist 'hamburger' menu at the top right and the brand symbol at the top left.

3. Animation & Brand Logic (The 'Seyyah' Touch):

GSAP Parallax: The ghosted background text must move horizontally at a different speed than the foreground during scroll.

Atmospheric Blending: Use the petrol blue (#1B6E7A) and gold (#C9A84C) brand colors in the gradients to match the 'Golden Hour' cinematic lighting of the references.

Verified Content: Use the Ümraniye/İstanbul address for the footer as specified in our Roadmap.

Final Order: Do not use generic components. Write a pixel-perfect, CSS-heavy implementation. Start by generating the HeroSection.tsx and the global home.module.css to lock in this high-end aesthetic immediately.