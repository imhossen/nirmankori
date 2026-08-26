# Phase 2 — নির্মাণ হিসাব

এই সংস্করণে:
- রঙ, কংক্রিট, সিমেন্ট, বালি, ইট, টাইলস, প্লাস্টার ও মেঝের হিসাবের সঙ্গে unit price ও আনুমানিক খরচ যোগ করা হয়েছে।
- হোমপেজের emoji calculator icons-এর বদলে Lucide SVG icons ব্যবহার করা হয়েছে; প্লাস্টার ও মেঝের icon এখন পরিষ্কারভাবে দেখা যাবে।
- নতুন Phase 2 calculators:
  - রডের ক্যালকুলেটর
  - মর্টারের ক্যালকুলেটর
  - ছাদ/স্ল্যাব ক্যালকুলেটর
  - শ্রমিক খরচ ক্যালকুলেটর
- প্রতিটি নতুন calculator dynamic calculator route-এর মাধ্যমে কাজ করবে।
- `@vercel/analytics` dependency এবং `<Analytics />` root layout-এ যুক্ত করা হয়েছে।
- সব নতুন calculator sitemap-এ catalog থেকে স্বয়ংক্রিয়ভাবে যুক্ত হবে।

## Deploy
```bash
npm install
npm run build
```

Vercel Dashboard-এ Web Analytics enable করলে production traffic data দেখা যাবে।
