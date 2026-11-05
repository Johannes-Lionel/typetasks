# Daymark

A small task list built with plain HTML, CSS, and TypeScript. Tasks move from
**To do** to **In progress** to **Done** using the operations in `model.ts`.

## Run locally

Run `npx tsc`, then serve this folder with a static HTTP server and open
`index.html`. The browser loads the compiled `app.js` and `model.js`.

## Publish

The GitHub Actions workflow compiles the app and deploys it to GitHub Pages on
pushes to `main` or `part-2-ui-ship`. Before the first deployment, open the
repository’s **Settings → Pages** and set the build and deployment source to
**GitHub Actions**. If the initial workflow run failed because Pages was not
enabled yet, rerun **Publish Daymark** from the **Actions** tab after changing
that setting. The public URL is
`https://johannes-lionel.github.io/typetasks/`.
