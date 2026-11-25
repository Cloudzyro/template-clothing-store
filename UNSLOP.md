# Unslop pass (November 25, 2026)

Done with the unslop skill by Damir Sokolovsky (@heydamir), CC BY 4.0. The template was built with the skill's rules in mind, then screenshotted and audited.

## Audit

Light slop. The first build already had its own world (chalk, ink, one oxblood accent, Bodoni Moda and DM Sans, flat garment drawings), so this was polish mode. Signs found:

- Glass header: `bg-chalk/95 backdrop-blur-sm` on the sticky header (`components/Header.tsx`)
- Hero headline too long for its column: five lines at 76px in a 5 of 12 column, leaving the coat panel to carry the screen alone (`app/page.tsx`)
- Size filter mixed letter sizes, waist sizes and "One size" in one undifferentiated run of chips (`components/Catalog.tsx`)
- The scarf drawing was two loose rectangles that didn't read as one folded piece of cloth (`components/GarmentArt.tsx`)
- Copy: "1 pieces" on the Accessories count (home, collections), "New this season" heading and its link colliding on phones, metric and Celsius units in US copy ("200 by 35 cm", "Machine wash at 30C")
- Not found: no gradients, glows, pills, uppercase tracked labels, emoji, italic emphasis, hover scale or looping motion.

## Direction

- Product: a small clothing shop and workroom in Halden, Oregon that sells coats, knits, shirts and dresses made in short runs, and repairs them for free.
- Character: tailored, unhurried, a little severe.
- World: a cutting table under north light, chalk marks on wool, sewn-in care labels.
- Moments: the garments themselves, drawn flat in their real cloth colors with a faint weave, and the lookbook flat lays.
- Signature: the dashed care label, used for the hero price tag and the fit note on product pages.

## Changes

- Spacing: hero split moved to 6 and 6 columns with the coat panel square, so the headline sits in three lines centered against it; new arrivals heading wraps cleanly on phones.
- Color: header is solid chalk with a hairline instead of translucent glass; oxblood stays on focus rings, the active nav underline, hovers and alerts only.
- Icons: none needed; the plus and minus on the FAQ and bag stay plain text.
- Copy: singular and plural counts fixed, US units (79 by 14 inches, machine wash cold), no trailing periods on labels or buttons.
- Type: Bodoni Moda only on headlines at 400, DM Sans 400 and 500 everywhere else, tabular figures on every price and count.
- Layout: size filter grouped under "Tops and dresses", "Waist, in inches" and "Accessories".
- Details: square 2px corners on every control, hairline dividers instead of cards, care label used in two places only.
- Visuals: scarf redrawn as one cloth folded over a rail with fringed ends.
- Motion: only color, opacity and the bag's slide; press scale 0.98; reduced motion respected.

screenshot-2: Shop page with collection, size and color filters beside the product grid
screenshot-3: Wren coat product page with colorways, sizes, size guide link and care label fit note
