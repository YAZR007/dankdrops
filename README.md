# DANKDROPS | Premium Boutique Cannabis

Elite cultivation, artisanal extracts, and curated cannabis experiences.

## 🚀 How to Deploy Your Harvest

Your code is ready for the world. To trigger the live build and push to your repository, follow these steps:

### 1. Open the Terminal
The terminal is usually located at the **bottom of your screen**. 
- Look for a tab named **"Terminal"**.
- If you don't see it, use the shortcut: **Ctrl + `** (backtick).

### 2. Run the Artisanal Deployment Script
Once the terminal is open, simply run:

```bash
sh deploy.sh
```

### 3. Troubleshooting "Rejected" Pushes
If you see a "rejected" error, it's because GitHub has files (like a default README) that aren't in your studio. Our updated script uses a **force push** to ensure your boutique code takes priority. If you want to run it manually:

```bash
git push -u origin main --force
```

## Accessing the Live Site

Once deployed, your app will be available at:
- **Primary URL:** `https://studio-5674632108-4dce7.web.app`

## Development

- `npm run dev`: Start the Next.js development server.
- `npm run genkit:dev`: Start the Genkit developer UI.
