# Prompt to Production

James Hong's personal brand for AI-engineering work: an 80s retro-futuristic system of geometric type, four racing stripes and plain marks on warm black or warm paper. It covers the portfolio website and social assets such as the LinkedIn banner. Night is the signature theme; Day is its light counterpart, and every component works in both.

## Content fundamentals

- **Voice:** direct and confident, peer to peer. Say what was built or shipped and what it does, not adjectives about it. First person on the site ("I design agents…"), no first person on the banner.
- **Headlines:** big statements are uppercase, two short lines at most, and end with a full stop: **FROM PROMPT / TO PRODUCTION.** Section and project titles are sentence case with no full stop.
- **Identity line:** "AI-native developer, Singapore." Always "AI-native", hyphenated.
- **Body copy:** short paragraphs, 60–68 characters a line, active voice. Name tools by their real names (Claude Code, MCP, TypeScript).
- **Buttons and links:** a verb plus an object ("See the work", "Read the case study"). Never "Click here".
- **Numbers:** write "0 to 1" in words in display type; URW Gothic has no arrow glyph.
- **Proof, not claims:** every skill shown pairs with where it was used (Sonata, real data, shipped apps). Never invent clients, metrics or testimonials.
- Keep HR out of the headline story; the brand is about AI engineering.

Current skill set, used on the banner and the site:

| Skill | Line | Mark |
| --- | --- | --- |
| Agentic engineering | Orchestrating coding agents | Clawd |
| Shipping 0 to 1 | 3 apps, end to end | Space Shuttle orbiter |
| MCP design | Agents read and act on real data | MCP mark |
| Decision models | Smart if-statements, Jev-style | TypeSafe AI mark |

## Visual foundations

**Colour.** Three tiers, each with one job:

1. **Identity.** The four stripe colours (`stripe-yellow`, `stripe-amber`, `stripe-orange`, `stripe-red`) appear only as stripes and as chart series, identical in both themes; as stripes they are always four lanes in that order. Never add a fifth lane or a cool colour to the stripes. `counter` is the one cool counterpoint, a 70s teal set against the warm stripes. Use it for a second chart series, code keywords and topic tags, never on stripes or as the main action, and on no more than about a tenth of a screen.
2. **Action and status.** `accent` (amber at night, burnt orange by day) is the only interactive colour: links, the primary button and the current nav item. `success` (olive), `warning` (ochre) and `error` (crimson) are text and icon colours for feedback. They always come with a word or symbol, and are deliberately distinct from the stripe colours so a lane never reads as an error.
3. **Neutrals.** `surface-sunken` (code and inputs), `surface`, and `surface-raised` (cards), each a tone step apart. `ink`, `ink-soft` (secondary text) and `ink-faint` (placeholders and disabled). `field-border` is only for fields and the secondary button.

Every text colour is at least 4.5:1 on every surface in both themes. No gradients, glows or shadows: surfaces separate by tone, never by a line or a shadow.

**Type.** Two families, both geometric:
- **Display:** URW Gothic, a faithful clone of ITC Avant Garde Gothic, Demi 600. Use `display-xl`, `display-lg`, `heading-1`, `heading-2` and `label`. Set display sizes uppercase and tight.
- **Text:** Jost (Futura-like, open source), 400 and 500. Use `lead`, `body` and `small`.
- Code uses the platform monospace stack.
- Two or three sizes do most of the work on any screen: one very large, one body, one small.

**The stripes.** The signature element: four parallel lanes in order, yellow innermost to red outermost, at `stripe-width` thick and `stripe-pitch` apart. Three forms:
1. **Bend:** lanes run flat, then turn up on concentric radii `bend-1` to `bend-4` and leave through the top edge. Used in the home hero and the banner. One bend per page.
2. **Divider:** lanes run flat and full width between major sections, 10px lanes with 6px gaps. At most two per page.
3. **Cover band:** the system's cover and social cards.

Never put text or marks on a stripe. Never drop or reorder a lane. Stripes are not progress bars or status colours.

**Charts.** Data series take the stripe colours, and the series the story is about takes `stripe-orange`, followed by `stripe-amber`, then `stripe-yellow`. `stripe-yellow` fades on Day paper, so it never carries the lead series or a lone line. Bars start at zero and are square; lines are 3px. Labels, values and axes stay in `ink` and `ink-soft`, and gridlines in `field-border`, never in a series colour. `counter` remains available as a cool second series.

**Layout.**
- A single centred grid `content-width` wide with `space-5` gutters (`space-3` on phones).
- Running text never wider than `measure`.
- Sections are `space-7` apart, with `space-6` between a section title and its content.
- Left-aligned by default; centre at most one moment per page.

**Shape.** Square everywhere (`radius-none`): cards, buttons, images, fields. The only curves are the stripe bends, the letterforms and tags (`radius-pill`).

**Motion.** Minimal: buttons lift 1px on hover. Respect `prefers-reduced-motion`. A hero may draw its stripes in once on load; nothing loops. Every transition and animation uses one curve, `cubic-bezier(0.42, 0, 0.58, 1)`, a symmetric ease-in-out. No springs, bounces or linear moves.

**Focus.** Every interactive element shows a 3px `focus` outline offset 3px.

## Iconography

- Use the **official logo** of a tool or project wherever one exists. Where none exists, use a **period pictogram**: a flat silhouette of a real late-70s/early-80s object drawn from its true proportions (the Space Shuttle orbiter for shipping). Fall back to **Material Symbols Rounded (filled)** only when no period object fits.
- Pictograms must stay chunky enough to read at `mark-size`. Very slender objects (Saturn V is about 11:1) disappear at icon size; use them only as large illustrations, such as a hero.
- Every mark renders **plain** in `ink`, in a `mark-size` box, using the file as a CSS mask (`ptp-mark`). No stripe masks, gradients or recolouring beyond the single ink.
- Third-party logos keep their shape and are only ever single-colour. They mean "I work with this", never endorsement.
- **Clawd** is traced from a community mock-up in anthropics/claude-code issue #8536, not an official Anthropic file. Replace it when an official asset or a terminal screenshot is available.

## Components

- **Hero:** the home opener with the stripe bend.
- **NavBar:** the wordmark and three to five links.
- **Button:** primary and secondary.
- **ProjectCard:** a whole-card link on `surface-raised`.
- **ShowcaseItem:** a skill shown with its mark.
- **Tag**
- **StripeDivider**
- **Banner:** the LinkedIn banner, Night only.
- **StatusMessage:** success, warning and error feedback.
- **CodeBlock:** code with three highlight roles.
- **TextField:** a labelled input with an error state.
- **Palette:** every colour, by tier.

All styles live in `components/bundle.css` under the `ptp-` prefix and read only tokens. There is no JavaScript.

## Don'ts

- No AI-template tropes: no gradient heroes, emoji, icon-topped feature cards, glassy blurred panels, pill-shaped badges on headings, or rounded cards.
- No third typeface.
- No stripe colours on text, chart labels included.
- Don't use `accent` for decoration.
- Never let a headline or a skill line wrap. Shorten the words first, then tighten spacing, and resize last.
