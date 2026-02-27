# Z-Index Scale

This document defines the z-index layering strategy used across the app. Use semantic utilities instead of arbitrary values to keep stacking order consistent.

## Scale (lowest → highest)

| Class | Value | Purpose |
|-------|-------|---------|
| `z-grain` | 1 | Paper grain overlay (body::before), decorative only |
| `z-header` | 50 | Fixed header, sticky navigation, site chrome |
| `z-modal-backdrop` | 100 | Modal/overlay backdrop (dimmer, click-to-close) |
| `z-modal` | 110 | Modal/dialog content, command palette (above backdrop) |
| `z-toast` | 120 | Toast notifications (above modals) |

## Guidelines

- **Do** use semantic classes (`z-header`, `z-modal`, etc.) when they fit.
- **Don't** use arbitrary values (`z-[9999]`) unless you have a documented reason.
- **Do** add new semantic classes here when introducing new overlay types.
- **Don't** add one-off z-values—extend the scale instead.

## Adding a New Layer

1. Add the CSS custom property in `globals.css` (`:root`).
2. Add the `@utility` class if using Tailwind.
3. Document it in this file.
