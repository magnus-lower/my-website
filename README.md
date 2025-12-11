# Magnus Løwer - Portfolio

A bilingual, theme-aware portfolio that showcases programming projects, education highlights, and an accessible contact channel. The site is a static HTML/CSS/JS build designed for fast Vercel deployment without changing any runtime behavior.

## Features
- Dual language support (English and Norwegian) with persisted preference
- Light/Dark theme toggle with instant preloading to avoid flashes
- Typing intro animation across hero sections
- Responsive navigation with active-link highlighting and scroll-to-top control
- Accessible contact form powered by Formspree submissions
- Project cards that deep-link to live demos

## Architecture Overview
```
[preferences preload] -> [core controllers] -> [components] -> [features]
          |                    |                  |              |
          |                    |                  |              +-- typing, contact, scroll, navigation extras
          |                    |                  +-- header/nav, settings, resume link
          |                    +-- language/theme/state managers
          +-- ensures DOM has language & theme before render
```

### File Tree
```
.
├── about.html
├── index.html
├── projects.html
├── assets/
│   ├── dots-pattern.svg
│   ├── english_cv.pdf
│   ├── norwegian_cv.pdf
│   ├── norwegian-flag.png
│   ├── profile_picture.jpg
│   └── uk-flag.png
├── js/
│   ├── components/
│   │   ├── navigation.js
│   │   ├── resume-link.js
│   │   └── settings-panel.js
│   ├── core/
│   │   ├── app.js
│   │   ├── language.js
│   │   ├── preferences-preload-runner.js
│   │   ├── preferences-preloader.js
│   │   ├── preferences.js
│   │   └── theme.js
│   ├── features/
│   │   ├── contact/contact-form.js
│   │   ├── navigation/nav-highlight.js
│   │   ├── projects/project-links.js
│   │   ├── scroll/fade-in-observer.js
│   │   └── typing/typing-controller.js
│   └── utils/dom.js
├── styles/
│   ├── app.css
│   ├── base/
│   │   ├── base.css
│   │   ├── reset.css
│   │   └── tokens.css
│   ├── components/
│   │   ├── enhancements.css
│   │   ├── footer.css
│   │   ├── hero.css
│   │   ├── navigation.css
│   │   └── ui-components.css
│   ├── features/
│   │   ├── dark-mode.css
│   │   └── responsive.css
│   └── layout/
│       ├── form-layout.css
│       ├── header-layout.css
│       ├── page-layout.css
│       └── section-layout.css
├── favicon.png
├── robots.txt
├── sitemap.xml
└── README.md
```

## Technical Decisions
- **Single entrypoint (`js/core/app.js`)** orchestrates language, theme, navigation, typing, projects, and contact form initialization after preferences are preloaded.
- **Preferences preloading (`js/core/preferences-preload-runner.js`)** runs before DOMContentLoaded to keep language and dark-mode synced with stored values immediately.
- **Feature-scoped modules**: components handle reusable UI pieces, while feature modules encapsulate behaviors like typing, scrolling, navigation highlighting, and contact submission.
- **CSS layering**: tokens define design primitives, base covers typography defaults, layout files manage spatial rules, and component/feature styles handle visual polish.
- **Utility helpers**: shared DOM helpers live in `js/utils/dom.js` to avoid repeated query logic.

## Deployment (Vercel Static)
1. Ensure all HTML files stay in the repository root.
2. Deploy the repository as a static site on Vercel (no build step required).
3. Verify environment: external assets (Font Awesome, Google Fonts) are pulled via CDN, and Formspree handles contact POSTs.

## Future Improvements
- Add automated visual regression checks to safeguard layout refinements.
- Introduce unit tests for core controllers (language/theme/preferences).
- Expand accessibility auditing (axe/lighthouse) as a CI check.
- Inline critical CSS for faster first paint while retaining modular source files.
