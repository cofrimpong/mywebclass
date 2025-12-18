# Sanity Studio for MyWebClass.org

This folder will contain the Sanity Studio for the MyWebClass.org site.

Important: The Studio must be created locally using the interactive Sanity create CLI. This repo includes a helper script at the project root to launch the interactive creation.

Create the Studio (interactive)

1. From the project root run:

```bash
./create_sanity.sh
```

2. The `npm create sanity@latest ./cms` interactive prompts will appear. Choose the following options when prompted:

- Project name: (any name you like; `mywebclass-studio` is fine)
- Use an existing project? No (or choose existing if you have one)
- Dataset: `production` (select `production`)
- Use TypeScript? `Yes`
- Template: choose the default Studio template (usually labelled "Default" or "clean")

3. After creation finishes, enter the `cms` folder and install dependencies (if not already installed):

```bash
cd cms
npm install
```

Run Sanity Studio (development)

```bash
npm run dev
```

This will start the Sanity Studio on `http://localhost:3333` by default.

Run Eleventy alongside Studio

From the project root you can run Eleventy and the Studio simultaneously in two terminals:

Terminal A (Eleventy dev server):
```bash
npm run dev
```

Terminal B (Sanity Studio):
```bash
cd cms
npm run dev
```

Deploy notes (do later)

- Sanity Studio can be built for static hosting using `npm run build` inside `cms`.
- Keep `dataset=production` as requested. Configure your Sanity project and dataset credentials when you add schemas and deploy.

Do not add schemas yet — the Studio is just scaffolded and configured for TypeScript and the `production` dataset.
