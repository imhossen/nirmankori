# Vercel build fix — CostCalculator

Fixed TypeScript error:

`Type 'number' is not assignable to type '3200'`

Cause: TypeScript inferred the `rates["মাঝারি"]` values as literal numbers.

Fix: the result state now uses an explicit:
`type CostRate = { low: number; high: number }`

This allows the city multiplier to produce normal `number` values.
