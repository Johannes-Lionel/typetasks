# Daymark

A small task list built with plain HTML, CSS, and TypeScript. Tasks move from
**To do** to **In progress** to **Done** using the operations in `model.ts`.

## Run locally

Run `npx tsc`, then serve this folder with a static HTTP server and open
`index.html`. The browser loads the compiled `app.js` and `model.js`.

## Publish

The GitHub Actions workflow compiles the app and deploys it to GitHub Pages on
pushes to `main` or `part-2-ui-ship`. In the repository’s **Settings → Pages**,
set the build and deployment source to **GitHub Actions**. The public URL is
`https://johannes-lionel.github.io/typetasks/`.
