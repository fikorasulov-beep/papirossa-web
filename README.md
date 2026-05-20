# Papirossa — Premium Tobacco Store (React + Vite Template)

Thank you for purchasing **Papirossa**! This is the React version of a premium, fully responsive multilingual tobacco store template — production-ready and easy to customize.

---

## Live Features

- **9 routes / pages**: Home, About, Menu, Product Details, Testimonials, Gallery, Contact, Documentation, 404
- **Cart system** with localStorage persistence
- **Multilingual** out of the box: English, Russian, Azerbaijani
- **Dark / light theme toggle** with persistent choice
- **Age verification modal** on first visit (18+ tobacco compliance)
- **Telegram order notifications** — orders sent straight to your Telegram bot
- **Contact form** powered by Formspree (free tier ready)
- **Mobile-responsive navigation** with slide-out menu
- **Image lightbox** in the gallery
- **Touch-friendly testimonials slider** (Swiper.js)
- **Form validation** with localized error messages
- **Toast notifications** for cart actions
- **SEO-friendly meta tags** and Open Graph

---

## Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18 | UI framework |
| React Router | 6 | Client-side routing |
| Vite | 5 | Build tool / dev server |
| Swiper | 11 | Testimonials slider |
| Font Awesome | 6 | Icons (via CDN) |
| Google Fonts | — | Poppins + Miniver typefaces |
| Formspree | — | Contact form backend |

---

## Installation

### Prerequisites

- **Node.js 18+** ([download](https://nodejs.org/))
- **npm** (bundled with Node) or **pnpm** / **yarn**

### Steps

```bash
# 1. Unzip and enter the folder
cd papirossa-react

# 2. Install dependencies
npm install

# 3. Start development server (opens http://localhost:5173)
npm run dev

# 4. Build for production (output to /dist)
npm run build

# 5. Preview the production build locally
npm run preview
```

Deploy the contents of the generated `dist/` folder to any static host:
Netlify, Vercel, GitHub Pages, Cloudflare Pages, Hostinger, your own VPS, etc.

---

## File Structure

```
papirossa-react/
├── index.html              ← Vite HTML entry
├── package.json
├── vite.config.js
├── public/
│   └── images/             ← Static images (44 files included)
└── src/
    ├── main.jsx            ← React entry
    ├── App.jsx             ← Routes
    ├── index.css           ← All styles (2000+ lines)
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── CartModal.jsx
    │   ├── AgeModal.jsx
    │   └── Toast.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Menu.jsx
    │   ├── ProductDetails.jsx
    │   ├── Testimonials.jsx
    │   ├── Gallery.jsx
    │   ├── Contact.jsx
    │   ├── Documentation.jsx
    │   └── NotFound.jsx
    ├── context/
    │   └── AppContext.jsx  ← Language, theme, cart state
    └── data/
        ├── i18n.js
        ├── menuData.js     ← Edit products here
        ├── galleryData.js
        └── testimonialsData.js
```

---

## Customization Quick Reference

### Brand colors

Open `src/index.css` and edit CSS variables at the top:

```css
:root {
  --primary-color: #3b141c;     /* Dark maroon */
  --secondary-color: #f3961c;   /* Orange accent */
  --dark-color: #252525;
  --light-pink-color: #faf4f5;
}
```

All buttons, links, headers, hover states update automatically.

### Products

Edit `src/data/menuData.js`. Each item is multilingual:

```js
{
  id: 1,
  name: { en: "...", ru: "...", az: "..." },
  description: { en: "...", ru: "...", az: "..." },
  price: "$12.00",
  image: "/images/marlboro.jpg"
}
```

**To use Unsplash photos**, replace the `image` path with a CDN URL:

```js
image: "https://images.unsplash.com/photo-1530021852476-a3b50d70e7b9?w=800&q=80&auto=format&fit=crop"
```

### Telegram order notifications

Open `src/components/CartModal.jsx` and replace at the top:

```js
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";
const CHAT_ID   = "YOUR_CHAT_ID_HERE";
```

**How to get them:**

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot` and follow the prompts — copy the token
3. Send any message to your new bot
4. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser — find your chat ID

Until you configure the bot, the cart runs in **demo mode** (shows success toast without sending).

### Contact form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a form, copy the endpoint URL
3. Open `src/pages/Contact.jsx` and replace:

```js
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";
```

### Adding a language

1. Open `src/data/i18n.js`
2. Copy the entire `en: { ... }` block, rename to your locale (e.g. `de`)
3. Translate every value
4. Add a language option in `src/components/Navbar.jsx` dropdown

### Logo

The navbar logo is an inline SVG inside `src/components/Navbar.jsx`. Replace the
entire `<svg>...</svg>` block with your own. To change colors, edit the
`stroke` / `fill` attributes.

### Favicon

Replace `/public/images/smoking.png` — `index.html` already references it.

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge — last 2 versions).
IE11 is **not** supported (React 18 dropped it).

---

## License

Commercial license — sold via Codester. One license per end product.
Photos in `public/images/` are placeholders supplied with the template; please
replace them with photos you own or license before going live in production.

---

## Credits

- Original HTML template by Fikret Rasulov
- React port: same author, v2.0
- Font Awesome icons (Free / CC BY 4.0)
- Google Fonts (Poppins, Miniver — OFL)

---

## Support

Questions? Issues? Feature requests? Reach out via the Codester item page or
email **papirossa2026@gmail.com**.

Enjoy! 🚬
