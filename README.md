# DIGIDAW // Digital Directory of Arts and Words

An architectural brutalist web archive celebrating global poets, landmark novels, and visionary literature — from the lyrical quietude of **Sapardi Djoko Damono** and the mystical ecstasy of **Jalaluddin Rumi** to the existential defiance of **Franz Kafka**, **Charles Baudelaire**, and **Fyodor Dostoevsky**.

Built with **Bootstrap 5.3**, pure **CSS custom properties**, and **vanilla JavaScript**. 100% static, responsive, and pre-configured for instant **GitHub Pages** deployment.

---

## 🏛️ Project Architecture

```
UTS-Web/
├── .nojekyll         # Disables Jekyll processing for GitHub Pages compatibility
├── README.md         # Project documentation and deployment guide
├── index.html        # Home Directory (Hero, 3 Featured Cards, Picture Gallery, 3 Accordion Pillars)
├── matrix.html       # Author & Book Matrix (10 Canonical figures, real-time search & filter)
├── portal.html       # Interactive Reader Access Portal (Regex email validation & clearance tier)
├── style.css         # Swiss Brutalist design system with full Light & Dark theme tokens
├── script.js         # Theme switcher (localStorage), email verification, and matrix search
└── images/           # Local SVG architectural & author illustrations
```

---

## ✨ Key Features

1. **Swiss Architectural Brutalism Aesthetic**:
   - Strict `2px solid #000` grid borders with zero rounded corners (`border-radius: 0 !important`).
   - High-impact condensed typography: **Anton** (headings), **Space Grotesk** (subheadings), and **Space Mono** (metadata).
   - Minimalist, intentional color accents: **Electric Yellow** (`#ffe600`) and **Vermilion Red** (`#ff3b1e`).

2. **🌓 High-Contrast Light & Dark Mode**:
   - Fully accessible in both modes without any disappearing or low-contrast text.
   - Theme toggle button in the header grid; preference is automatically saved in `localStorage`.

3. **Featured Figures & Masterworks**:
   - 🇮🇩 **Sapardi Djoko Damono** (*Hujan Bulan Juni*, *Duka-Mu Abadi*)
   - 🇮🇩 **Chairil Anwar** (*Aku*, *Deru Campur Debu*)
   - 🇮🇷 **Jalaluddin Rumi** (*The Masnavi*, *Divan-e Shams*)
   - 🇨🇿 **Franz Kafka** (*The Metamorphosis*, *The Trial*)
   - 🇫🇷 **Charles Baudelaire** (*Les Fleurs du mal*, *Paris Spleen*)
   - 🇫🇷 **Arthur Rimbaud** (*A Season in Hell*, *Illuminations*)
   - 🇺🇸 **Sylvia Plath** (*Ariel*, *The Bell Jar*)
   - 🇩🇿/🇫🇷 **Albert Camus** (*The Stranger*, *The Myth of Sisyphus*)
   - 🇷🇺 **Fyodor Dostoevsky** (*Crime and Punishment*, *The Brothers Karamazov*)
   - 🇦🇷 **Jorge Luis Borges** (*Ficciones*, *The Aleph*)

4. **Interactive Capabilities**:
   - **Live Data Matrix Search & Filter** (`matrix.html`): Search by poet, country, or category in real time.
   - **Interactive Access Portal** (`portal.html`): Strict email verification (`name@domain.com`) with instant feedback alerts.

---

## 📜 License & Credits

- Typography: Google Fonts ([Anton](https://fonts.google.com/specimen/Anton), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Space Mono](https://fonts.google.com/specimen/Space+Mono), [Public Sans](https://fonts.google.com/specimen/Public+Sans)).
- Framework: [Bootstrap 5.3](https://getbootstrap.com/) & [Bootstrap Icons](https://icons.getbootstrap.com/).
- Photography: Curated public domain and creative commons architectural & manuscript photography via Unsplash.