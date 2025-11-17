# CLAUDE.md - AI Assistant Guide for tidyup

**Last Updated:** 2025-11-17
**Repository:** SmartAgentBB/tidyup
**Status:** ✅ Active Development - Next.js Application

---

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Current State](#current-state)
3. [Development Workflow](#development-workflow)
4. [Codebase Structure](#codebase-structure)
5. [Key Conventions](#key-conventions)
6. [AI Assistant Guidelines](#ai-assistant-guidelines)
7. [Common Tasks](#common-tasks)
8. [Testing & Quality](#testing--quality)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## Repository Overview

### Purpose
비움 챌린지 (Tidyup Challenge) - 연말을 맞아 불필요한 물건들을 비워내고 새로운 시작을 준비하는 웹 애플리케이션입니다.

**Intended Use:** 사용자가 사진과 짧은 텍스트로 비움의 순간을 기록하고 타임라인 형태로 확인할 수 있는 웹 서비스

### Key Information
- **Remote:** `http://local_proxy@127.0.0.1:29744/git/SmartAgentBB/tidyup`
- **Primary Branch:** `main` (or `master`)
- **License:** MIT
- **Language/Framework:** Next.js 15 + TypeScript + Tailwind CSS
- **Storage:** Browser LocalStorage (Base64 encoded images)

---

## Current State

### Repository Status: ACTIVE
This repository is **actively developed** with:
- ✓ Next.js 15 with App Router
- ✓ TypeScript configuration
- ✓ Tailwind CSS for styling
- ✓ ESLint for code quality
- ✓ Complete application code
- ✓ Documentation (README.md)
- ✓ Git configured and ready

### Project Features
1. **Photo Upload**: Users can upload photos of items they've decluttered
2. **Text Input**: 140-character limit for describing the decluttering action
3. **Timeline View**: Posts displayed in reverse chronological order (newest first)
4. **Local Storage**: All data stored in browser's localStorage (Base64 images)
5. **Delete Functionality**: Users can remove individual posts

### Development Setup
To get started:
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

---

## Development Workflow

### Branch Strategy
**Status:** ✅ Established

**Current Workflow:**
```
main                 → Production-ready code
feature/*            → New features
bugfix/*             → Bug fixes
hotfix/*             → Critical production fixes
claude/*             → AI assistant work branches
```

**Note:** Currently using `claude/*` branches for development. Merge to main when features are complete and tested.

### Git Workflow

#### Creating a New Feature
```bash
# Fetch latest changes
git fetch origin

# Create feature branch from main/develop
git checkout -b feature/your-feature-name origin/main

# Make changes and commit
git add .
git commit -m "feat: descriptive commit message"

# Push to remote
git push -u origin feature/your-feature-name
```

#### Commit Message Conventions
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     New feature
fix:      Bug fix
docs:     Documentation only changes
style:    Code style changes (formatting, semicolons, etc.)
refactor: Code refactoring without changing functionality
perf:     Performance improvements
test:     Adding or updating tests
chore:    Build process or auxiliary tool changes
ci:       CI/CD configuration changes
```

**Example:**
```bash
git commit -m "feat: add user authentication module"
git commit -m "fix: resolve null pointer exception in data parser"
git commit -m "docs: update API documentation for v2 endpoints"
```

### Pull Request Process
**Status:** To be established

1. Create feature branch
2. Implement changes with tests
3. Ensure all tests pass
4. Update documentation
5. Create PR with descriptive title and summary
6. Address review feedback
7. Merge when approved

---

## Codebase Structure

### Directory Layout
**Status:** ✅ Established

**Current Structure:**

```
tidyup/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page (home route)
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles with Tailwind
├── components/            # React components
│   ├── PostForm.tsx      # Form for creating posts (photo + text)
│   └── PostList.tsx      # Timeline view of all posts
├── lib/                   # Utility libraries
│   └── storage.ts        # LocalStorage helper functions
├── public/                # Static assets
├── node_modules/          # npm dependencies
├── .next/                 # Next.js build output
├── CLAUDE.md             # This file
├── README.md             # Project documentation
├── package.json          # npm configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── postcss.config.mjs    # PostCSS configuration
├── next.config.ts        # Next.js configuration
├── .eslintrc.json        # ESLint configuration
└── .gitignore            # Git ignore patterns
```

### Module Organization
**Status:** ✅ Documented

**Component Structure:**
- `app/page.tsx` - Main page component, orchestrates PostForm and PostList
- `components/PostForm.tsx` - Handles image upload, text input, and form submission
- `components/PostList.tsx` - Displays posts in timeline format with delete functionality
- `lib/storage.ts` - Encapsulates all localStorage operations

**Import Patterns:**
- Use `@/` alias for imports from root directory
- Example: `import { storage } from '@/lib/storage'`
- All components are React Client Components (using `"use client"`)

**Key Dependencies:**
- `next` (^15.0.0) - React framework
- `react` (^19.0.0) - UI library
- `react-dom` (^19.0.0) - React DOM renderer
- `typescript` (^5) - Type safety
- `tailwindcss` (^3.4.17) - Utility-first CSS
- `eslint` - Code linting

---

## Key Conventions

### Code Style
**Status:** ✅ Established

**Current Conventions:**
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Indentation**: 2 spaces (enforced by ESLint)
- **Quotes**: Single quotes for strings (except JSX attributes use double quotes)
- **Semicolons**: Optional (but consistent within files)
- **Line length**: ~80-100 characters (soft limit)
- **Comment style**: JSDoc-style for functions, inline comments for complex logic

### Naming Conventions
**Status:** ✅ Established

**Files:**
- React components: `PascalCase.tsx` (e.g., `PostForm.tsx`)
- Utility files: `camelCase.ts` (e.g., `storage.ts`)
- Config files: `kebab-case` or specific format (e.g., `next.config.ts`)

**Variables/Functions:**
- Variables: `camelCase` (e.g., `postList`, `imageData`)
- Functions: `camelCase` (e.g., `handleSubmit`, `formatDate`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_TEXT_LENGTH`, `STORAGE_KEY`)
- React hooks: prefix with `use` (e.g., `useState`, `useEffect`)

**Components/Types:**
- React Components: `PascalCase` (e.g., `PostForm`, `PostList`)
- TypeScript Interfaces: `PascalCase` (e.g., `Post`, `PostFormProps`)
- TypeScript Types: `PascalCase` (e.g., `Metadata`)

### Documentation Standards

**Code Comments:**
- Write self-documenting code when possible
- Add comments for complex logic
- Document public APIs thoroughly
- Include examples in documentation

**Documentation Files:**
- Keep README.md up to date
- Document architecture decisions
- Maintain API documentation
- Update this CLAUDE.md as conventions are established

---

## AI Assistant Guidelines

### General Principles

1. **Always Read Before Writing**
   - Read existing files before editing
   - Understand context before making changes
   - Check for similar patterns in the codebase

2. **Follow Existing Patterns**
   - Match the style of surrounding code
   - Use established naming conventions
   - Follow the project's architectural patterns

3. **Be Conservative with Dependencies**
   - Prefer built-in/standard library solutions
   - Justify new dependencies
   - Check for existing similar dependencies

4. **Prioritize Code Quality**
   - Write clean, readable code
   - Add appropriate error handling
   - Include tests for new functionality
   - Avoid security vulnerabilities (SQL injection, XSS, etc.)

5. **Document Your Changes**
   - Update relevant documentation
   - Add/update code comments
   - Write clear commit messages
   - Update this CLAUDE.md if workflows change

### Working with This Repository

#### First Time Setup
When first working on this repository:

```bash
# Check current state
git status
git branch -a

# Fetch remote changes
git fetch origin

# Create/checkout working branch
git checkout -b claude/your-branch-name

# Verify you're on the correct branch
git branch --show-current
```

#### Before Making Changes
1. Understand what already exists
2. Read relevant code files
3. Check for existing patterns
4. Plan your approach
5. Use TodoWrite tool to track multi-step tasks

#### Making Changes
1. Create/edit files as needed
2. Test your changes
3. Review your changes with git diff
4. Commit with descriptive messages
5. Push to your working branch

#### When Blocked
If you encounter issues:
1. Check git status and current branch
2. Read error messages carefully
3. Search for similar patterns in the codebase
4. Ask the user for clarification if needed
5. Document the blocker in your response

### Code Review Checklist

Before committing code, verify:
- [ ] Code follows existing style and conventions
- [ ] No hardcoded secrets or sensitive data
- [ ] Error handling is appropriate
- [ ] Edge cases are considered
- [ ] Tests are included/updated
- [ ] Documentation is updated
- [ ] No debug code or console.logs left in
- [ ] Dependencies are necessary and documented
- [ ] Security best practices followed (OWASP Top 10)
- [ ] Performance considerations addressed

---

## Common Tasks

### Setting Up the Project (First Time)

**Status:** ✅ Complete

For new contributors:

1. **Clone and Install**
   ```bash
   # Clone the repository
   git clone http://local_proxy@127.0.0.1:29744/git/SmartAgentBB/tidyup
   cd tidyup

   # Install dependencies
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

3. **Verify Everything Works**
   - Upload a test photo
   - Add test text (max 140 characters)
   - Save and verify it appears in the timeline
   - Delete the test post

### Adding a New Feature

**Template for feature implementation:**

1. Create feature branch (if not on claude/* branch)
2. Implement core functionality
3. Add tests
4. Update documentation
5. Commit and push
6. Create pull request (if applicable)

### Fixing a Bug

**Template for bug fixes:**

1. Identify the bug location
2. Write a test that reproduces the bug
3. Fix the bug
4. Verify the test now passes
5. Check for similar bugs elsewhere
6. Commit with "fix:" prefix

### Updating Dependencies

**Template for dependency updates:**

1. Review dependency changes/changelogs
2. Update dependency version
3. Run tests to ensure nothing breaks
4. Update documentation if API changed
5. Commit with "chore:" prefix

---

## Testing & Quality

### Test Strategy
**Status:** To be established

Document testing approach when implemented:
- Unit tests
- Integration tests
- End-to-end tests
- Test coverage requirements

### Running Tests
**Status:** To be established

```bash
# Commands will be documented once testing is set up
# Example: npm test, pytest, go test, etc.
```

### Linting and Formatting
**Status:** ✅ Configured

```bash
# Run ESLint
npm run lint

# Build project (also checks for type errors)
npm run build
```

**Configuration:**
- ESLint with Next.js recommended rules
- TypeScript strict mode enabled
- Tailwind CSS class sorting (via PostCSS)

### CI/CD
**Status:** Not configured

Document CI/CD pipeline when established:
- Automated test runs
- Build processes
- Deployment triggers
- Quality gates

---

## Deployment

### Build Process
**Status:** ✅ Configured

```bash
# Development build (with hot reload)
npm run dev

# Production build
npm run build

# Start production server (after build)
npm start
```

**Build Output:** `.next/` directory (git-ignored)

### Deployment Steps
**Status:** ✅ Ready for Deployment

**Recommended Platform:** Vercel (seamless Next.js integration)

**Deployment Steps:**
1. Push code to repository
2. Connect repository to Vercel
3. Configure build settings (auto-detected for Next.js)
4. Deploy

**Alternative Platforms:**
- Netlify
- Cloudflare Pages
- Self-hosted (using `npm run build && npm start`)

### Environment Configuration
**Status:** ✅ No environment variables needed

**Current Setup:**
- No backend API required
- No database connection
- No authentication service
- All data stored in browser localStorage

**Future Enhancements:**
When upgrading to cloud storage (Vercel Blob, Supabase, etc.), add:
- `BLOB_READ_WRITE_TOKEN` (for Vercel Blob)
- `NEXT_PUBLIC_SUPABASE_URL` (for Supabase)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (for Supabase)

---

## Troubleshooting

### Common Issues

#### Git Issues

**Branch doesn't exist:**
```bash
# Fetch all remote branches
git fetch origin

# List available branches
git branch -a

# Create new branch
git checkout -b branch-name
```

**Push fails with 403:**
- Verify branch name starts with `claude/`
- Check remote configuration: `git remote -v`
- Retry with exponential backoff (2s, 4s, 8s, 16s)

**Merge conflicts:**
```bash
# Check conflict status
git status

# Resolve conflicts in files
# Then mark as resolved
git add <resolved-files>
git commit
```

#### Build Issues

**TypeScript errors:**
```bash
# Check for type errors
npx tsc --noEmit
```

**Module not found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

#### Runtime Issues

**LocalStorage quota exceeded:**
- Error: "저장 공간이 부족합니다"
- Solution: Delete old posts or clear browser data
- Browser limit: ~5-10MB for localStorage

**Images not displaying:**
- Check browser console for Base64 encoding errors
- Verify image file size < 5MB
- Ensure file type is valid image format

**Data lost after browser cache clear:**
- LocalStorage is cleared with browser cache
- Remind users to export/backup important data
- Consider upgrading to cloud storage for persistence

### Getting Help

When stuck:
1. Check this CLAUDE.md file
2. Read error messages carefully
3. Search codebase for similar patterns
4. Check git history for context
5. Ask the user for clarification

---

## Notes for Future Updates

This document should be updated when:
- [x] Project type and language are determined (Next.js + TypeScript)
- [x] Directory structure is established
- [x] Coding conventions are defined
- [ ] Testing framework is set up (future enhancement)
- [ ] CI/CD is configured (future enhancement)
- [x] Deployment process is established (Vercel recommended)
- [x] New patterns or conventions are introduced
- [x] Major architectural decisions are made (LocalStorage approach)

**Future Updates Needed When:**
- Migrating from LocalStorage to cloud storage
- Adding user authentication
- Implementing tests
- Setting up CI/CD pipeline
- Adding new features (search, tags, categories, etc.)

### Maintenance
- Review and update quarterly or after major changes
- Keep examples current with actual codebase
- Remove outdated information
- Add new patterns as they emerge

---

## Quick Reference

### Essential Commands

```bash
# Status and info
git status
git log --oneline -10
git branch -a

# Working with branches
git checkout -b branch-name
git push -u origin branch-name

# Making changes
git add .
git commit -m "type: description"
git push

# Getting updates
git fetch origin
git pull origin branch-name

# Checking differences
git diff
git diff --staged
```

### File Locations
- **Main page**: `app/page.tsx:1`
- **Post form**: `components/PostForm.tsx:1`
- **Post list**: `components/PostList.tsx:1`
- **Storage utils**: `lib/storage.ts:1`
- **Global styles**: `app/globals.css:1`
- **Config files**: Root directory

### Key Dependencies
- Next.js: ^15.0.0 (React framework with App Router)
- React: ^19.0.0 (UI library)
- TypeScript: ^5 (Type safety)
- Tailwind CSS: ^3.4.17 (Styling)
- ESLint: ^8 (Code quality)

### Important Links
- Repository: http://local_proxy@127.0.0.1:29744/git/SmartAgentBB/tidyup
- Documentation: See README.md
- v0.app: https://v0.app (for design iterations)
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

### Architecture Decisions

**Why LocalStorage?**
- Zero backend setup required
- Instant availability
- No API calls or authentication needed
- Perfect for v0.app prototyping
- Easy migration path to cloud storage later

**Why Base64 Images?**
- Simple storage alongside text data
- No separate file management needed
- Works entirely in browser
- Trade-off: Storage space limitations

**Why 140 Character Limit?**
- Encourages concise, meaningful reflections
- Twitter-like constraint promotes clarity
- Reduces storage space usage
- Better mobile UX with shorter texts

**Future Migration Path:**
1. Add cloud storage (Vercel Blob/Supabase)
2. Implement user authentication
3. Add data export/import functionality
4. Consider progressive web app (PWA) features

---

**Remember:** This document is a living guide. Update it as the codebase evolves to keep it useful for AI assistants and human developers alike.
