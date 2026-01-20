---
name: final-push
description: Simplify code, add proper comments, commit with concise message, and push
---

# Final Push Skill

Use this skill when the user says "simplify, comment, commit and push" or similar.

## Steps

### 1. Review Changed Files
// turbo
```bash
git status
```

### 2. Simplify Code (if needed)
- Remove redundant comments
- Consolidate duplicate code
- Clean up formatting inconsistencies

### 3. Add Proper Comments
- Ensure key functions have descriptive comments
- Remove obvious/redundant comments
- Keep comments concise and meaningful

### 4. Update GEMINI.md (if important changes)
**Skip for small fixes.** Update GEMINI.md when:
- New components or features are added
- Architecture or data structures change
- New CSS classes or styling patterns are introduced
- Configuration or routing changes
- New dependencies or build changes

Use your judgment to determine what is "important" enough to document.

### 5. Stage All Changes
// turbo
```bash
git add -A
```

### 6. Commit with Concise Message
Format: `<type>: <short description>`

Types:
- `feat:` - new feature
- `fix:` - bug fix
- `style:` - styling/CSS changes
- `refactor:` - code refactoring
- `docs:` - documentation
- `chore:` - maintenance

Example:
```bash
git commit -m "style: update button styling for consistency"
```

### 7. Push to Remote
// turbo
```bash
git push
```

## Notes
- Always review changes before committing
- Keep commit messages under 72 characters
- Group related changes into single commits
