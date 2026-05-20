/**
 * Buyer-facing template documentation. Standalone styling — not affected by
 * the rest of the site's theme. Open at /documentation route.
 */
const css = `
  .papirossa-doc * { margin: 0; padding: 0; box-sizing: border-box; }
  .papirossa-doc { font-family: "Segoe UI", sans-serif; color: #333; background: #f8f8f8; min-height: 100vh; }
  .papirossa-doc .doc-header { background: #3b141c; color: #fff; padding: 40px; text-align: center; }
  .papirossa-doc .doc-header h1 { font-size: 2.2rem; margin-bottom: 8px; }
  .papirossa-doc .doc-header p { color: rgba(255,255,255,0.7); font-size: 1rem; }
  .papirossa-doc .doc-nav { background: #fff; border-bottom: 1px solid #eee; padding: 16px 40px; display: flex; gap: 24px; flex-wrap: wrap; }
  .papirossa-doc .doc-nav a { color: #3b141c; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
  .papirossa-doc .doc-nav a:hover { color: #f3961c; }
  .papirossa-doc .doc-body { max-width: 900px; margin: 40px auto; padding: 0 40px 80px; }
  .papirossa-doc h2 { font-size: 1.5rem; color: #3b141c; margin: 40px 0 16px; padding-bottom: 8px; border-bottom: 3px solid #f3961c; }
  .papirossa-doc h3 { font-size: 1.1rem; color: #555; margin: 24px 0 10px; }
  .papirossa-doc p { line-height: 1.7; margin-bottom: 14px; color: #555; }
  .papirossa-doc pre { background: #1e1e1e; color: #f8f8f2; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 14px 0; font-size: 0.88rem; line-height: 1.6; }
  .papirossa-doc code { background: #eee; padding: 2px 6px; border-radius: 4px; font-size: 0.88rem; color: #c0392b; }
  .papirossa-doc ul, .papirossa-doc ol { padding-left: 24px; margin-bottom: 14px; }
  .papirossa-doc li { margin-bottom: 6px; line-height: 1.6; color: #555; }
  .papirossa-doc .note { background: #fff8e1; border-left: 4px solid #f3961c; padding: 14px 18px; border-radius: 4px; margin: 16px 0; }
  .papirossa-doc table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  .papirossa-doc th { background: #3b141c; color: #fff; padding: 10px 14px; text-align: left; }
  .papirossa-doc td { padding: 10px 14px; border-bottom: 1px solid #eee; }
  .papirossa-doc tr:nth-child(even) td { background: #fafafa; }
`;

export default function Documentation() {
  return (
    <div className="papirossa-doc">
      <style>{css}</style>

      <div className="doc-header">
        <h1>🚬 Papirossa</h1>
        <p>Tobacco Store React Template — Documentation v2.0</p>
      </div>

      <nav className="doc-nav">
        <a href="#getting-started">Getting Started</a>
        <a href="#structure">File Structure</a>
        <a href="#colors">Colors</a>
        <a href="#products">Products</a>
        <a href="#telegram">Telegram</a>
        <a href="#language">Language</a>
        <a href="#contact-form">Contact Form</a>
        <a href="#credits">Credits</a>
      </nav>

      <div className="doc-body">
        <h2 id="getting-started">Getting Started</h2>
        <p>
          Thank you for purchasing Papirossa! This is the React + Vite version of
          the template. Before running, make sure you have Node.js 18+ installed.
        </p>
        <ol>
          <li>Unzip the downloaded file</li>
          <li>
            Open a terminal in the project folder and run <code>npm install</code>
          </li>
          <li>
            Run <code>npm run dev</code> for development or <code>npm run build</code>{" "}
            for production
          </li>
          <li>Follow the sections below to customize for your business</li>
        </ol>
        <div className="note">
          ℹ️ The dev server runs on <code>http://localhost:5173</code>. Production
          build output goes to the <code>dist/</code> folder.
        </div>

        <h2 id="structure">File Structure</h2>
        <pre>{`papirossa-react/
├── index.html              ← Vite HTML entry
├── package.json
├── vite.config.js
├── public/
│   └── images/             ← Static images (44 files included)
└── src/
    ├── main.jsx            ← React entry
    ├── App.jsx             ← Routes
    ├── index.css           ← All site styles
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── CartModal.jsx
    │   ├── AgeModal.jsx
    │   └── Toast.jsx
    ├── pages/              ← One file per route
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
        └── testimonialsData.js`}</pre>

        <h2 id="colors">Changing Colors</h2>
        <p>
          All colors are defined as CSS variables at the top of{" "}
          <code>src/index.css</code>:
        </p>
        <pre>{`:root {
  --primary-color: #3b141c;     /* Dark maroon — navbar, hero */
  --secondary-color: #f3961c;   /* Orange — buttons, accents */
  --dark-color: #252525;        /* Dark sections background */
  --light-pink-color: #faf4f5;  /* Light sections background */
}`}</pre>
        <p>Change these values to match your brand colors.</p>

        <h2 id="products">Adding / Editing Products</h2>
        <p>
          Open <code>src/data/menuData.js</code>. Each product looks like this:
        </p>
        <pre>{`{
  id: 1,                                  // Unique number
  name: {
    en: "Product Name",
    ru: "Название продукта",
    az: "Məhsulun adı"
  },
  description: { en: "...", ru: "...", az: "..." },
  price: "$12.00",
  image: "/images/product.jpg"            // path under /public
}`}</pre>
        <p>
          Add new objects to the array — pages update automatically. To use an
          Unsplash photo, swap the <code>image</code> string for a CDN URL.
        </p>

        <h2 id="telegram">Telegram Order Notifications</h2>
        <p>Customer orders can be delivered to your Telegram. Setup:</p>
        <ol>
          <li>
            Open Telegram and message <strong>@BotFather</strong>
          </li>
          <li>
            Send <code>/newbot</code> — copy the <strong>Bot Token</strong>
          </li>
          <li>
            Message your bot once, then visit{" "}
            <code>{`https://api.telegram.org/bot<TOKEN>/getUpdates`}</code> to find
            your <strong>Chat ID</strong>
          </li>
          <li>
            Open <code>src/components/CartModal.jsx</code> and replace:
          </li>
        </ol>
        <pre>{`const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";
const CHAT_ID   = "YOUR_CHAT_ID_HERE";`}</pre>
        <div className="note">
          ⚠️ Keep your bot token private. Never commit it to public repos.
        </div>

        <h2 id="language">Multilingual Support</h2>
        <p>
          The template ships with <strong>English, Russian, and Azerbaijani</strong>
          . To add a new language:
        </p>
        <ol>
          <li>
            Open <code>src/data/i18n.js</code>
          </li>
          <li>
            Copy any block (e.g. <code>en</code>) and rename to your locale code
          </li>
          <li>
            Translate every value, then add a button in{" "}
            <code>src/components/Navbar.jsx</code> language dropdown
          </li>
        </ol>

        <h2 id="contact-form">Contact Form</h2>
        <p>
          The contact form uses{" "}
          <a href="https://formspree.io" target="_blank" rel="noreferrer">
            Formspree
          </a>{" "}
          — free service that emails submissions to you.
        </p>
        <ol>
          <li>
            Sign up at{" "}
            <a href="https://formspree.io" target="_blank" rel="noreferrer">
              formspree.io
            </a>
          </li>
          <li>Create a form, copy its endpoint URL</li>
          <li>
            In <code>src/pages/Contact.jsx</code> replace:
          </li>
        </ol>
        <pre>const FORMSPREE_URL = &quot;https://formspree.io/f/YOUR_FORM_ID&quot;;</pre>

        <h2 id="credits">Credits & Libraries</h2>
        <table>
          <tbody>
            <tr>
              <th>Library</th>
              <th>Purpose</th>
              <th>License</th>
            </tr>
            <tr>
              <td>React 18</td>
              <td>UI framework</td>
              <td>MIT</td>
            </tr>
            <tr>
              <td>React Router 6</td>
              <td>Client-side routing</td>
              <td>MIT</td>
            </tr>
            <tr>
              <td>Vite 5</td>
              <td>Build tool / dev server</td>
              <td>MIT</td>
            </tr>
            <tr>
              <td>Font Awesome 6</td>
              <td>Icons</td>
              <td>Free / CC BY 4.0</td>
            </tr>
            <tr>
              <td>Swiper 11</td>
              <td>Testimonials slider</td>
              <td>MIT</td>
            </tr>
            <tr>
              <td>Google Fonts</td>
              <td>Poppins, Miniver</td>
              <td>OFL</td>
            </tr>
            <tr>
              <td>Formspree</td>
              <td>Contact form backend</td>
              <td>Free tier</td>
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop: 40, color: "#999", fontSize: "0.85rem" }}>
          © 2026 Papirossa Template. All rights reserved.
        </p>
      </div>
    </div>
  );
}
