# Promo and Merch Manager

A campaign management prototype for managing promotional campaigns and merchandise placement settings at DoorDash.

## Live Demo

**GitHub Pages**: https://bookish-memory-p3er739.pages.github.io/

Access requires DoorDash GitHub organization membership (Engineering, Product Design, or Design Infrastructure teams).

## Overview

This prototype provides a streamlined interface for managing promotional campaigns with features including:

- Campaign overview and management dashboard
- AI-powered chat assistant for campaign insights
- Universal placement settings configuration
- Responsive card-based layout
- Multi-tab navigation system
- Real-time section toggling and state management

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables
- **Vanilla JavaScript** - No framework dependencies
- **View Transitions API** - Smooth page transitions
- **Router** - Client-side routing system

## Project Structure

```
bonnie-prototype/
├── MegaTool/               # Main project folder
│   ├── index.html          # Main application entry point
│   ├── styles.css          # Global styles and component styling
│   ├── scripts.js          # Core application logic
│   ├── router.js           # Client-side routing
│   ├── dropdown.js         # Dropdown component functionality
│   ├── section-toggle.js   # Section state management
│   ├── view-transition.js  # Page transition effects
│   ├── README.md           # This file
│   ├── .gitignore          # Git ignore rules
│   └── .cursor/
│       └── rules/
│           └── github-pages-deploy.mdc  # Deployment workflow
├── docs/                   # GitHub Pages deployment (auto-generated)
│   └── ...                 # Mirror of MegaTool source files
└── .git/                   # Git repository
```

## Local Development

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Optional: Local web server (Python, Node.js http-server, or VS Code Live Server)

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/doordash/bonnie-prototype.git
cd bonnie-prototype/MegaTool
```

2. Open directly in browser:
```bash
open index.html
```

Or use a local server (recommended for full routing support):
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

3. Visit `http://localhost:8000` in your browser

## Deployment

This project uses **GitHub Pages** with legacy mode (`/docs` directory on `main` branch).

### Automatic Deployment

A pre-commit hook automatically syncs changes from `MegaTool/` source files to the root `docs/` directory:

```bash
# Make changes to source files in MegaTool/
vim MegaTool/index.html

# Commit changes - hook automatically updates docs/
git add MegaTool/index.html
git commit -m "Update homepage"

# Push to deploy
git push origin main
```

The site updates within 1-2 minutes after pushing to `main`.

### Manual Deployment

If the pre-commit hook is missing, reinstall it from the repository root:

```bash
cat > .git/hooks/pre-commit << 'HOOK'
#!/bin/sh
STAGED=$(git diff --cached --name-only --diff-filter=d | grep -E '^MegaTool/.*\.(html|js|css)$')
if [ -z "$STAGED" ]; then exit 0; fi
echo "Updating docs/ for GitHub Pages from MegaTool/..."
mkdir -p docs
cp MegaTool/*.html MegaTool/*.js MegaTool/*.css docs/ 2>/dev/null
cp MegaTool/README.md docs/ 2>/dev/null
touch docs/.nojekyll
git add docs/
echo "docs/ updated from MegaTool/."
HOOK
chmod +x .git/hooks/pre-commit
```

### Trigger Manual Build

```bash
gh api repos/doordash/bonnie-prototype/pages/builds -X POST
```

## Branching Strategy

- **`main`** - Production branch, deployed to GitHub Pages
- **`2026-03-02`** - Development branch for current iteration

### Working with Branches

Create a feature branch:
```bash
git checkout -b feature-name
```

Merge to main when ready:
```bash
git checkout main
git merge feature-name
git push origin main
```

## Access Control

The GitHub Pages site is accessible to:
- **Engineering** team (~4,300 members)
- **product-design-contributors** team (~180 members)
- **Design Infrastructure** team (~20 members)
- All repo collaborators

To add additional teams:
```bash
gh api orgs/doordash/teams/{TEAM_SLUG}/repos/doordash/bonnie-prototype -X PUT -f permission=pull
```

## Features

### Campaign Dashboard
- Overview of active campaigns
- Quick access to campaign settings
- Status indicators and metrics

### AI Chat Assistant
- Conversational interface for campaign insights
- Smart suggestions and recommendations
- Context-aware responses

### Placement Management
- Universal placement settings
- Card-based configuration UI
- Real-time preview and validation

### Navigation
- Multi-tab interface
- Client-side routing
- Smooth view transitions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Note: View Transitions API requires modern browser support or graceful fallback is provided.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test locally
4. Commit with descriptive messages
5. Push and create a Pull Request
6. Request review from team members

## Repository

**GitHub**: https://github.com/doordash/bonnie-prototype

## License

Internal DoorDash prototype - not for external distribution.

---

Built with ❤️ by the DoorDash Design Infrastructure team
