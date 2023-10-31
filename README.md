# AstroNot

AstroNot is a fully customizable site builder powered by Astro & Notion.

Write, Edit, and Publish directly from Notion with total control over the website and design!

## 🙋🏼 Why AstroNot?

There are plenty of good options for turning your Notion content into a website, such as `super.so`. Why AstroNot?

First of all, AstroNot is 100% open-source and free. You can self host on a variety of platforms, such Vercel and Netlify, or for free on Github Pages. `super.so`, is $16/month _(without analytics)_!

Other popular Notion site builders allow for some limited customization such as changing fonts and logos, but are inherently based on Notion's layout; this is great if you want to design your entire site in Notion and mirror it to the web! However, if you want to design your own site with full control while still using Notion as a Content Management Solution for content such as blog posts and articles, that's where AstroNot shines!

AstroNot exports Notion content into MarkdownX, which can be styled and customized however you like. Since AstroNot only syncs Notion content to the `/posts` route, the entire website is available to modify, including the HTML, styling, and scripts.

AstroNot is built for performance from the ground up. Images are fetched and optimized at build time, resulting in page loads much faster than the native Notion pages! AstroNot also supports Chrome's new `View Transitions` API, resulting in smooth navigation transitions and page animations in supported environments.

Use the included Flowbite UI or Svelte components to design a landing page, marketing site, or portfolio. Or, feel free to BYOF _(Bring Your Own Framework)_ and add your own React or Vue components. The sky is the limit!

## 📡 Technology

Space requires **FAST** speeds, so AstroNot is built for performance with the **FAST** stack:

- **Flowbite**: Flowbite is a UI Framework which is built on top of Tailwind CSS. It's a collection of design elements, components, and layouts, helping to build pixel-perfect responsive websites and apps faster and easier. Flowbite can be used with all of the popular frameworks (React, Svelte, Vue, etc), or with no framework at all.

- **Astro**: Astro builds fast content sites, powerful web applications, dynamic server APIs, and everything in-between; pages are pre-rendered on the server so adding extra frameworks and large libraries will only slow users if hydrated to client for interactivity (using `client:load`, etc). AstroNot is built on Astro v3, which offers a host of new powerful features including `View Transitions` and enhanced `Image Optimization`.

- **Svelte**: Svelte describes itself as "cybernetically enhanced web apps". Svelte is not just a front-end UI framework, but also a compiler - which means that deployed web applications can remain lightweight and fast, without large Javascript bundle sizes required of other frameworks such as React. Svelte pairs perfectly with Astro and `nanostores`.

- **Tailwind**: Tailwind is utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and `rotate-90` that can be composed to build any design, directly in your markup. Tailwind used to power all of the Flowbite components included in AstroNot, as well as many other available Tailwind based UI libraries (such as TailwindUI) that are also compatible out of the box with AstroNot.

### 📦 Package Manager

AstroNot includes `pnpm` out of the box, and supports `bun`! Feel free to replace with your favorite package manager of choice.

### 🎨 Animations

- Includes Tailwind Animated library out of the box: [https://www.tailwindcss-animated.com/](https://www.tailwindcss-animated.com/)
  - Just add classes such as `wiggle`, `rotate-x`, `jump-out`, `bounce`, `fade-left`, or `flip-down`.
- Svelte animations: [https://svelte.dev/docs/svelte-animate](https://svelte.dev/docs/svelte-animate)
- View Transition support via Astro. Use `transition:name` to animate elements between page loads.

### ↝ MarkdownX processing

- Uses `notion-to-md` under the hood for converting Notion to Markdown
- `/src/notion.js` contains the Notion sync and transform code. Perform any alterations to Post layout and logic in this file.

## 👏🏼 Notion Features

- Tag support: Syncs tags with your posts, including color!
- Automatically generate Table of Content based on document. Supports nested headings.
- Images optimized based on view resolution at build time. High resolution images will be converted to the best format and size for the layout.

## ⚙️ Notion Setup

- Get your API key here

## 🚀 Installation

- Clone this repo
- Install with your package manager of choice _(`pnpm`, `bun`, etc...)_: `pnpm install`
- Move `.env.example` to `.env` and add your Notion API key and database ID
- Run `pnpm sync` to sync Notion Content for the first time
- Run `pnpm dev` to start development server
- Remove any unwanted components, such as `HyperDark` from `components/`, and `pages/` folder.

  - All of the built-in content here is available for reference, but can be modified or deleted
    - Parallax components show how to add interactive svelte components
    - `DarkMode` and `Hyperdark` components demonstrate how to use `nanostores` for data peristence with `Svelte`
    - Various examples using different Astro hydration techniques, such as `client:load`, `client:visible`, and `client:idle`.
  - _Soon, a `starter` branch will be available with barebones setup to get started quickly_

- Replace with your own content and design!

## 🏗️ Project Structure

```text
/
├── public/
├── src/
│   └── pages/
│       └── posts/   <-- Notion content lives here
│   ├── components/
│   ├── layouts/
│   │   └── Layout.svelte
│   │   └── PostLayout.svelte
│   │   └── _DarkMode.svelte
│   │   └── _Header.svelte
│   │   └── _Footer.svelte
└── package.json
```

AstroNot looks for `.astro`, `.md.` or `.mdx` files in the `src/pages/` directory. Each page is exposed as a route based on its file or folder name. A page can be one `.astro` file, or a folder containing many components; if using a subfolder inside `/pages` or `layout`, all component filenames must be prefixed `_`, such as `/pages/home/_Features.[astro,svelte,jsx,etc...]` and the main file should be called `index.astro`.

There's nothing special about `src/components/`, but that's where we like to put any Astro or React/Vue/Svelte/Preact components. It's recommended to use this location if sharing components.

Any static assets, like images, can be placed in the `public/` directory. Images which are to be optimized need to be placed inside `/src/images`, as they need to be imported during Astro's build process.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                |
| :------------------------ | :---------------------------------------------------- |
| `npm install`             | Installs dependencies                                 |
| `npm run dev`             | Starts local dev server at `localhost:4321`           |
| `npm run build`           | Build your production site to `./dist/`               |
| `npm run preview`         | Preview your build locally, before deploying          |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`      |
| `npm run astro -- --help` | Get help using the Astro CLI                          |
| **`npm run sync`**        | **Download & Transform Notion content into `/posts`** |

## 🔄 Automatic Publish Deploys

You can use webhooks or automated platforms such as `Make` or `Zapier` to automatically trigger deploys on compatible platforms such as `Netlify`.

[make.com](https://make.com/) currently offers 1,000 operations / month, which is more than enough for most use cases to automate publishing for a small blog. To enable, simply connect Make to Notion and watch for any changes to your content database, and connect to trigger Netlify deploy action (which will automatically build a new site based off of the latest content from Notion); this can be set up to run as often as every 15 minutes.

- [ ] TODO: Add Video
