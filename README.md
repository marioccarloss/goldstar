# Gold Star Plumbing 🌟

A modern, responsive website for Gold Star Plumbing - providing reliable and fast plumbing services in Vancouver.

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd goldstar
   pnpm install
   ```

2. **Run development server:**

   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

### One-Command Setup

```bash
pnpm run setup
```

This command will install dependencies, format code, fix linting issues, and run type checking.

## 📝 Code Quality & Formatting

This project uses **Prettier** and **ESLint** with modern standards and automatic formatting on save.

### Configuration Highlights

- **Print Width:** 120 characters
- **Quotes:** Double quotes (`"`)
- **Semicolons:** Always required
- **Trailing Commas:** ES5 compatible
- **Auto-formatting:** Enabled on save in VS Code

### Available Scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `pnpm dev`          | Start development server              |
| `pnpm build`        | Build for production                  |
| `pnpm start`        | Start production server               |
| `pnpm lint`         | Run ESLint checker                    |
| `pnpm lint:fix`     | Fix ESLint issues automatically       |
| `pnpm format`       | Format all files with Prettier        |
| `pnpm format:check` | Check if files are properly formatted |
| `pnpm type-check`   | Run TypeScript type checking          |
| `pnpm pre-commit`   | Run full code quality pipeline        |
| `pnpm clean`        | Clean build cache and dependencies    |

### VS Code Setup

The project includes optimized VS Code settings that automatically:

- Format code on save with Prettier
- Fix ESLint issues on save
- Organize imports automatically
- Show ruler at 120 characters
- Use proper TypeScript settings

**Recommended VS Code Extensions:**

- ESLint (`ms-vscode.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- TypeScript Importer (`pmneo.tsimporter`)

## 🏗️ Project Structure

```
goldstar/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with theme color
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── home/             # Home page components
│   ├── icons/            # SVG icon components
│   ├── layout/           # Layout components (header, footer)
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/               # Additional stylesheets
└── public/               # Static assets
```

## 🎨 Styling & Design

- **Framework:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animations:** Framer Motion
- **Fonts:** Geologica (Google Fonts)
- **Theme Color:** `#f6be00` (Gold)

### Browser Theme

The website includes proper meta tags for browser theming:

- Mobile browser UI color: `#f6be00`
- Windows tile color support
- iOS status bar styling
- PWA-ready meta tags

## 📦 Dependencies

### Core Dependencies

- **Next.js 14.2.16** - React framework
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations

### Development Dependencies

- **ESLint 8.57** - Code linting
- **Prettier 3.6** - Code formatting
- **@typescript-eslint** - TypeScript ESLint rules
- **prettier-plugin-tailwindcss** - Tailwind class sorting

## 🔧 Configuration Files

- **`.eslintrc.json`** - ESLint configuration with React, TypeScript, and accessibility rules
- **`.prettierrc`** - Prettier configuration with 120 character width and double quotes
- **`.editorconfig`** - Cross-editor consistency
- **`tailwind.config.mjs`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration

## 🚀 Deployment

### Vercel (Recommended)

1. Push to your Git repository
2. Connect to Vercel
3. Deploy automatically on every push

### Manual Build

```bash
pnpm build
pnpm start
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🧪 Code Quality Pipeline

### Pre-commit Workflow

```bash
pnpm run pre-commit
```

This runs:

1. Prettier formatting
2. ESLint fixes
3. TypeScript checking

### GitHub Actions

The project includes a CI/CD pipeline (`.github/workflows/ci.yml`) that:

- Checks code formatting
- Runs ESLint
- Performs type checking
- Builds the application
- Caches dependencies for faster builds

## 🤝 Development Guidelines

### Code Style

- Use **double quotes** for strings
- **120 character** line limit
- **2 spaces** for indentation
- **Semicolons required**
- Prefer `const` over `let`
- Use template literals over concatenation

### Import Organization

Imports are automatically organized by ESLint:

1. Built-in Node.js modules
2. External packages
3. Internal modules
4. Parent directory imports
5. Sibling imports
6. Index imports

### TypeScript

- Use `type` imports when possible
- Prefer interfaces over types for object shapes
- Use proper generic constraints
- Avoid `any` - use `unknown` instead

### React Best Practices

- Use functional components with hooks
- Prefer named exports
- Use proper prop types
- Follow accessibility guidelines (jsx-a11y rules)

## 📞 Contact & Support

For questions about the Gold Star Plumbing website:

- **Business:** Gold Star Plumbing Services
- **Location:** Vancouver, BC
- **Services:** Reliable & Fast Plumbing Solutions

---

Built with ❤️ using modern web technologies and best practices.
