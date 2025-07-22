## 3. A clearer, token‑based hierarchy

| Token name | Tailwind class | Size (px / rem) | Weight | Usage |
|------------|---------------|-----------------|--------|-------|
| `txt-display` | `text-xl lg:text-2xl` | 20 / 24 px | `font-semibold` (600) | Timer |
| `txt-body-lg` | `text-lg` | 18 px | `font-medium` (500) | Chinese prompts, Submit button |
| `txt-body` | `text-base` | 16 px | `font-normal` (400) | Input fields, general body |
| `txt-caption` | `text-sm` | 14 px | `font-medium` (500) | Option buttons |
| `txt-label` | `text-sm` | 14 px | `font-semibold` (600) | Option labels, minor headers |

### Why this works

1. **Clear size steps** – 14 → 16 → 18 → 20 / 24 respects a 1.25–1.33 modular scale.  
2. **Consistent weight logic** – heavier weight always signals more importance *at the same size*.  
3. **Baselines divisible by 4** keep vertical rhythm with an 8‑pt spacing grid.  
4. **Design tokens decouple code from UI tweaks** – change `txt-body-lg` once to adjust every prompt.
