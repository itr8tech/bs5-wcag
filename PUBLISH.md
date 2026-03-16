# Publishing to GitHub Pages

This project is configured to publish the demo page to GitHub Pages.

## Setup

1. **Build the project** (required before the demo will work):
   ```bash
   # Fix npm cache permissions if needed
   sudo chown -R $(whoami) ~/.npm
   npm cache clean --force

   # Install dependencies
   npm install

   # Build CSS and JavaScript
   npm run build
   ```

2. **Commit the built files**:
   ```bash
   git add dist/
   git commit -m "Build distribution files for GitHub Pages"
   git push
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Select branch: `main`
   - Select folder: `/docs`
   - Click Save

4. **Access your demo**:
   - GitHub will build and deploy your site
   - It will be available at: `https://[username].github.io/bs5-wcag/`
   - For this repo: https://itr8tech.github.io/bs5-wcag/

## Structure

- `/docs` - Contains the demo HTML page (served by GitHub Pages)
  - `/docs/dist` - Copy of built CSS and JS files for GitHub Pages
- `/dist` - Contains built CSS and JS files (for npm package)
- The demo page references `dist/css/bs5-wcag.css` and `dist/js/bs5-wcag.js`
- Build process automatically copies `/dist` to `/docs/dist`

## Important Notes

- The `dist/` folder is NOT in `.gitignore` for GitHub Pages to work
- You must run `npm run build` before pushing to update the demo
- The build process copies `dist/` to `docs/dist/` automatically
- Any changes to Sass or JS require rebuilding before they appear on GitHub Pages
- Both `/dist` and `/docs/dist` must be committed

## Updating the Demo

When you make changes:

```bash
# Make changes to scss/ or js/ files
npm run build
git add dist/ docs/
git commit -m "Update demo"
git push
```

GitHub Pages will automatically redeploy within a few minutes.
