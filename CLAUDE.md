# CLAUDE.md - AI Assistant Guide for tidyup

**Last Updated:** 2025-11-17
**Repository:** SmartAgentBB/tidyup
**Status:** 🆕 New Repository - Initial Setup Phase

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
The `tidyup` repository is currently in its initial setup phase. This document will evolve as the codebase develops.

**Intended Use:** To be determined based on initial commits and project structure.

### Key Information
- **Remote:** `http://local_proxy@127.0.0.1:29744/git/SmartAgentBB/tidyup`
- **Primary Branch:** TBD (will be set after first commit)
- **License:** TBD
- **Language/Framework:** TBD

---

## Current State

### Repository Status: EMPTY
This repository is currently **empty** with:
- ✗ No source code files
- ✗ No configuration files
- ✗ No documentation files
- ✗ No commit history
- ✓ Git initialized
- ✓ Remote configured

### What Needs to Be Done
When starting development on this repository, AI assistants should:

1. **Determine Project Type**
   - Ask the user what type of project this will be
   - Identify the primary language/framework
   - Understand the project goals

2. **Create Essential Files**
   - README.md - Project description and getting started guide
   - .gitignore - Appropriate for the chosen language/framework
   - LICENSE - Project license (if applicable)
   - Configuration files for the chosen tech stack

3. **Set Up Development Environment**
   - Package manager configuration (package.json, requirements.txt, go.mod, etc.)
   - Linting/formatting tools (.eslintrc, .prettierrc, pyproject.toml, etc.)
   - Editor configuration (.editorconfig)

4. **Establish Structure**
   - Create appropriate directory structure
   - Set up initial project scaffolding
   - Add basic documentation

5. **Update This Document**
   - Fill in the sections below with actual project information
   - Document the architecture and patterns used
   - Keep conventions and workflows current

---

## Development Workflow

### Branch Strategy
**Status:** To be established

**Recommended Workflow:**
```
main/master          → Production-ready code
develop              → Integration branch for features
feature/*            → New features
bugfix/*             → Bug fixes
hotfix/*             → Critical production fixes
claude/*             → AI assistant work branches
```

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
**Status:** Not yet established

**Recommended Structure (update when project type is determined):**

```
tidyup/
├── src/              # Source code (or lib/, pkg/, etc.)
├── tests/            # Test files
├── docs/             # Documentation
├── config/           # Configuration files
├── scripts/          # Build/utility scripts
├── .github/          # GitHub workflows and templates
├── CLAUDE.md         # This file
├── README.md         # Project overview
├── LICENSE           # License file
└── .gitignore        # Git ignore patterns
```

### Module Organization
**Status:** To be documented when modules are created

When the project structure is established, document:
- How modules/packages are organized
- Import/dependency patterns
- Core vs. utility code separation
- Third-party dependencies

---

## Key Conventions

### Code Style
**Status:** To be established

Document code style conventions here once determined:
- Naming conventions (camelCase, snake_case, PascalCase)
- Indentation (spaces vs. tabs, width)
- Line length limits
- Comment style and documentation
- File organization patterns

### Naming Conventions
**Status:** To be established

**Files:**
- TBD based on project type

**Variables/Functions:**
- TBD based on project language

**Classes/Types:**
- TBD based on project language

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

**Status:** This repository is empty - initial setup needed

When initializing this project:

1. **Determine Project Type**
   ```bash
   # Example for Node.js/TypeScript
   npm init -y
   npm install typescript --save-dev
   npx tsc --init

   # Example for Python
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt

   # Example for Go
   go mod init github.com/SmartAgentBB/tidyup
   ```

2. **Create Essential Files**
   - .gitignore
   - README.md
   - Configuration files
   - Directory structure

3. **First Commit**
   ```bash
   git add .
   git commit -m "chore: initial project setup"
   git push -u origin main
   ```

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
**Status:** To be established

```bash
# Commands will be documented once linting is set up
# Example: npm run lint, black ., gofmt, etc.
```

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
**Status:** To be established

Document build commands and processes:
```bash
# Build commands will be documented here
```

### Deployment Steps
**Status:** To be established

Document deployment procedures:
1. Pre-deployment checklist
2. Deployment commands
3. Post-deployment verification
4. Rollback procedures

### Environment Configuration
**Status:** To be established

Document environment variables and configuration:
- Development environment
- Staging environment
- Production environment

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
**Status:** To be documented when build process is established

#### Runtime Issues
**Status:** To be documented when application is developed

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
- [ ] Project type and language are determined
- [ ] Directory structure is established
- [ ] Coding conventions are defined
- [ ] Testing framework is set up
- [ ] CI/CD is configured
- [ ] Deployment process is established
- [ ] New patterns or conventions are introduced
- [ ] Major architectural decisions are made

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
**Status:** To be documented as project structure develops

### Key Dependencies
**Status:** To be documented when dependencies are added

### Important Links
- Repository: http://local_proxy@127.0.0.1:29744/git/SmartAgentBB/tidyup
- Documentation: TBD
- Issue Tracker: TBD
- CI/CD Dashboard: TBD

---

**Remember:** This document is a living guide. Update it as the codebase evolves to keep it useful for AI assistants and human developers alike.
