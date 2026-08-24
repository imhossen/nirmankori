# নির্মাণ হিসাব v2

বাংলাদেশের জন্য বাংলা construction ও renovation calculator.

## চালু করুন
npm install
npm run dev

## প্রকাশের আগে
`example.com`-এর জায়গায় আসল domain বসান। Material specification ও formulas স্থানীয় প্রকৌশলী/সরবরাহকারীর সঙ্গে যাচাই করুন।

## ফন্ট
এই সংস্করণে Bengali Serif typography ব্যবহার করা হয়েছে যাতে দেওয়া reference screenshot-এর মতো বাংলা অক্ষরের character পাওয়া যায়। প্রয়োজন হলে `app/layout.tsx`-এ অন্য Bengali font বদলানো যাবে।


## ব্র্যান্ডের রং
- কমলা: `oklch(55% .15 40)`
- সবুজ: `oklch(42% .09 155)`
- সাদা: `#ffffff`

ফ্যাভিকন সরাসরি `app/icon.svg` এবং `public/favicon.svg`-এ যুক্ত করা হয়েছে।
