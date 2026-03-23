# Promo and Merch Manager

A campaign management prototype for managing promotional campaigns and merchandise placement settings at DoorDash.

## Live Demo

**GitHub Pages**: https://bonni3l33.github.io/bonnie-prototype-live/

### Program Management Views

**Programs Overview**
- https://bonni3l33.github.io/bonnie-prototype-live/programs.html

**Program Detail Pages**
- **NPWS (National Program)**: https://bonni3l33.github.io/bonnie-prototype-live/program-detail-v2.html
- **Ulta Partnership**: https://bonni3l33.github.io/bonnie-prototype-live/program-detail-ulta.html
- **Lifecycle Resurrection**: https://bonni3l33.github.io/bonnie-prototype-live/program-detail-lifecycle.html
- **Signup AI Evergreen**: https://bonni3l33.github.io/bonnie-prototype-live/program-detail-signup-ai.html
- **Summer of Dashpass**: https://bonni3l33.github.io/bonnie-prototype-live/program-detail-sodp.html

Access requires DoorDash GitHub organization membership (Engineering, Product Design, or Design Infrastructure teams).

## Overview

This prototype provides a streamlined interface for managing promotional campaigns with features including:

- **Program Management** - Grid-based program overview with detail pages
- **AI Chat Panel** - Contextual AI suggestions with slide-in panel
- Campaign overview and management dashboard
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

### Program Management
- **Programs Overview** - Grid-based view of all marketing programs
- **Program Detail Pages** - 5 comprehensive program templates:
  - NPWS (National Program) - Multi-city campaign management
  - Ulta Partnership - Partner engagement tracking
  - Lifecycle Resurrection - User re-engagement campaigns
  - Signup AI Evergreen - Tier-based performance tracking with alerts
  - Summer of Dashpass - Multi-program seasonal campaign with sub-campaigns
- **Parent/Child Structure** - Hierarchical campaign organization
- **Status Indicators** - Color-coded tags (running/planned/completed)

### AI Chat Panel
- **Contextual Suggestions** - 3 tailored prompts per page
- **Slide-in Interface** - 400px panel that pushes content left
- **Prism Integration** - Sparkle icon from Prism design system
- **Auto-responsive** - Reduces page padding when panel opens

### Campaign Dashboard
- Overview of active campaigns
- Quick access to campaign settings
- Status indicators and metrics

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
