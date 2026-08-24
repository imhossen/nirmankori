# V4 Build Fix

Fixed the TypeScript duplicate identifier caused by importing both:
- `Calculator` from `lucide-react`
- `Calculator` as a type from `lib/calculators`

The calculator data type is now aliased as `CalculatorData`, while the Lucide icon remains `Calculator`.

Run:
```bash
npm install
npm run build
```
