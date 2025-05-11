# 🌐 Github Cards API&#x20;

**GitHub Cards API** is a lightweight, serverless utility that allows you to generate beautifully customizable GitHub profile cards. Built using **Cloudflare Workers**, this project offers fast, globally distributed performance with minimal overhead. It supports a variety of themes, flexible layout options, and custom styling — making it perfect for embedding in your README, portfolio, or anywhere you want.

### 🔧 Key Features

- ✨ **Theme Support** – Multiple built-in themes and a powerful `custom` mode for full design control.
- 🎨 **Card Customization** – Tweak font size, color, alignment, padding, shadows, and more.
- 🖼️ **Live Preview GUI** – Comes with an interactive app to preview and generate your card with ease.
- ⚡ **Serverless & Fast** – Powered by Cloudflare Workers with optional KV-based caching for performance.
- 🌍 **Open Source & Extensible** – Contributions are welcome! Easily extend the card options or renderer logic.

### 🚀 Why This Project?

This project started as a learning experiment while transitioning from traditional Node.js + Express apps to modern **serverless deployments**. It demonstrates how Cloudflare Workers can be used to build and deploy scalable, high-performance APIs.

---

## 🌟 Live Demo & Interactive UI

Try the web-based Card Generator to build and preview your GitHub Cards without writing any code:

**🔗 Live Generator**: https://github-cards-worker.akanshsirohi-dev.workers.dev/app

Use the form to select a card type and theme, tweak custom colors or gradients, then generate and download your SVG card instantly.

---

## 🚀 Usage

Access all available cards and their respective options at:
[`https://github-cards-worker.akanshsirohi-dev.workers.dev/`](https://github-cards-worker.akanshsirohi-dev.workers.dev/)

### 📜 Using the Interactive UI

1. Select a **Card type** and **Theme**.
2. (Optional) For the **custom** theme, adjust the card, background, font, and shadow colors or gradients.
3. Click **Generate card**.
4. Preview your card, download the SVG, or copy the Markdown/HTML embed code.

### 📎 Using Markdown

```md
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/card-name)
```

### 🧩 Using HTML

```html
<img src="https://github-cards-worker.akanshsirohi-dev.workers.dev/card-name" alt="Card" />
```

---

## 🧾 Available Cards

All cards are managed via `help.js`. A few popular examples include:


<table>
  <thead>
    <tr>
      <th>Card Name</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>programming-facts</code></td>
      <td><code>&#33;[Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card)</code></td>
    </tr>
    <tr>
      <td><code>motivational-quote</code></td>
      <td><code>&#33;[Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/motivational-quotes-card)</code></td>
    </tr>
    <tr>
      <td><code>programming-quote</code></td>
      <td><code>&#33;[Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-quotes-card)</code></td>
    </tr>
    <tr>
      <td><code>bhagwad-geeta-quotes</code></td>
      <td><code>&#33;[Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/bhagavad-geeta-card )</code></td>
    </tr>
    <tr>
      <td><code>fun-facts</code></td>
      <td><code>&#33;[Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/fun-fact-card)</code></td>
    </tr>
    <tr>
      <td><code>my-card</code></td>
      <td><code>&#33;[Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/my-card?theme=neon_horizon&text=SGVsbG8sIFdvcmxkIQ)</code></td>
    </tr>
  </tbody>
</table>


**`my-card`**: Special card to show the customized text only.

👉 For the full list, visit [`https://github-cards-worker.akanshsirohi-dev.workers.dev`](https://github-cards-worker.akanshsirohi-dev.workers.dev)

---

## 🎨 Themes

All themes are created using HTML and rendered via **Satori**.

### ✅ Available Themes

- `custom` (fully customizable)
- `techy`
- `neon_horizon`
- `galactic_dusk`
- `aurora_borealis`
- `retro_block`
- `rainbow_vortex`
- `endless_constellation`
- `lemonade`
- `galaxy`
- `vintage`

### ⚙️ Custom Arguments (for `CUSTOM` theme only)

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>card_color</code></td>
      <td>Card's main background color <strong>or</strong> a Base64‑encoded CSS gradient string</td>
      <td><code>#ffffff</code></td>
    </tr>
    <tr>
      <td><code>font_color</code></td>
      <td>Text color</td>
      <td><code>#000000</code></td>
    </tr>
    <tr>
      <td><code>bg_color</code></td>
      <td>Outer background color <strong>or</strong> a Base64‑encoded CSS gradient string</td>
      <td><code>#ffffff</code></td>
    </tr>
    <tr>
      <td><code>shadow_color</code></td>
      <td>Card shadow color</td>
      <td><code>#00000000</code></td>
    </tr>
    <tr>
      <td><code>google_font</code></td>
      <td>Custom google font</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>text_align</code></td>
      <td>Text alignment (Top/Middle/Bottom + Left/Middle/Right). Available: <code>tl</code>, <code>tm</code>, <code>tr</code>, <code>ml</code>, <code>mm</code>, <code>mr</code>, <code>bl</code>, <code>bm</code>, <code>br</code></td>
      <td><code>tl</code></td>
    </tr>
    <tr>
      <td><code>outer_pad</code></td>
      <td>Outer card padding in pixels.</td>
      <td><code>15</code></td>
    </tr>
    <tr>
      <td><code>inner_pad</code></td>
      <td>Inner card padding in pixels.</td>
      <td><code>15</code></td>
    </tr>
    <tr>
      <td><code>font_size</code></td>
      <td>Font size.</td>
      <td><code>12</code></td>
    </tr>
    <tr>
      <td><code>card_width</code></td>
      <td>Width of the card in pixels.</td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>card_min_height</code></td>
      <td>Minimum height of the card in pixels.</td>
      <td><code>100</code></td>
    </tr>
  </tbody>
</table>


> **Gradient Support**  
> `card_color` and `bg_color` accept linear or radial gradients. Because commas & parentheses are not URL‑safe, supply the gradient as a **URL‑safe Base64 string**.
> Use <https://www.base64encode.org/> (or any encoder) and copy the **Encode (URL‑Safe)** output.
>
> ```text
> # Original CSS
> linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
>
> # URL‑safe Base64
> bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoMiwgMCwgMzYsIDEpIDAlLCByZ2JhKDksIDksIDEyMSwgMSkgMzUlLCByZ2JhKDAsIDIxMiwgMjU1LCAxKSAxMDAlKTs
> ```
>
> Then call the API:
>
> ```md
> ![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/jokes-card?theme=custom&card_color=<BASE64>&bg_color=<BASE64>&font_color=000&shadow_color=000)
> ```

#### Example (Solid Colors)

```md
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=custom&card_color=000000&font_color=ffffff&shadow_color=ff0000)
```

#### Example (Gradients)

```md
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/jokes-card?theme=custom&card_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoNDIsIDEyMywgMTU1LCAxKSAwJSwgcmdiYSg4NywgMTk5LCAxMzMsIDEpIDUwJSwgcmdiYSgyMzcsIDIyMSwgODMsIDEpIDEwMCUpOw&bg_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoMiwgMCwgMzYsIDEpIDAlLCByZ2JhKDksIDksIDEyMSwgMSkgMzUlLCByZ2JhKDAsIDIxMiwgMjU1LCAxKSAxMDAlKTs&font_color=000&shadow_color=000)
```

### 🖼️ Theme Examples

- **Galactic Dusk Theme** <br>
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=galactic_dusk)

- **Neon Horizon Theme** <br>
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=neon_horizon)

- **Custom (Gradient)**  <br>
![Custom Gradient](https://github-cards-worker.akanshsirohi-dev.workers.dev/motivational-quotes-card?theme=custom&card_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoNDIsIDEyMywgMTU1LCAxKSAwJSwgcmdiYSg4NywgMTk5LCAxMzMsIDEpIDUwJSwgcmdiYSgyMzcsIDIyMSwgODMsIDEpIDEwMCUpOw&font_color=fff&bg_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoMiwgMCwgMzYsIDEpIDAlLCByZ2JhKDksIDksIDEyMSwgMSkgMzUlLCByZ2JhKDAsIDIxMiwgMjU1LCAxKSAxMDAlKTs&shadow_color=fff)

- **Fully Customized**  <br>
![Custom Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=custom&card_color=515151&bg_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLCAjRkM0NjZCIDAlLCAjM0Y1RUZCIDEwMCUp&font_color=fff&shadow_color=000&google_font=Cascadia+Code&text_align=mm&outer_pad=25&card_width=550&card_min_height=150)
---

## 🤝 Contributing

### 🧩 Adding a New Card

1. Fork this repository.
2. Add your card in the `src/cards` directory. Refer to existing cards for guidance.
3. If needed, add a file inside the `data` directory (supports English & Hindi).
4. Register your route in `index.js`.
5. Update both `help.js` and this README.
6. Ensure your dataset contains at least \~100 entries.
7. Submit a pull request.
8. Test locally:

```bash
wrangler dev
```

### 🎨 Adding a New Theme

1. Fork this repository.
2. Open `themes.js`.
3. Add your theme inside the exported `HTML_THEMES` object.
4. Use inline styles & valid Satori-compatible HTML.
5. Reference `{{card_content}}` properly.
6. Update `help.js` and the README.
7. Submit a pull request.

### ✅ Contribution Guidelines

- Code should be clean and minimal.
- Themes must be visually distinct.
- Cards must be useful, interesting, or educational.
- Avoid copyright violations.

---

## 🔎 Additional Information

- Built with **Cloudflare Workers** for speed and scalability.
- Uses **Satori** for HTML-to-image rendering.
- All assets (fonts, images) are served via Cloudflare Worker assets.
- Cards and themes are maintained centrally in `help.js` and `themes.js`.

---

✨ Feel free to create a PR and contribute a card or theme! Let’s build something cool together.

