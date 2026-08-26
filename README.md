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

## Phase 1 features
- আমার প্রজেক্ট: ক্যালকুলেটরের ফলাফল এক জায়গায় সংরক্ষণ ও মোট আনুমানিক খরচ
- নির্মাণ খরচ ক্যালকুলেটর: আয়তন/ধরন/এলাকা অনুযায়ী পরিকল্পনামূলক range
- PDF রিপোর্ট: সর্বশেষ হিসাবকে print/save as PDF করা যায়
- WhatsApp share: calculator result সরাসরি WhatsApp share
- Calculator search: header থেকে calculator ও গাইড খোঁজা
- প্রজেক্টে যোগ: calculator result project-এ সংরক্ষণ

## Note on PDF
কোনো ভারী PDF library যোগ না করে browser-এর print engine ব্যবহার করা হয়েছে। "PDF রিপোর্ট" চাপলে report page খুলে "PDF হিসেবে সংরক্ষণ / প্রিন্ট" থেকে Save as PDF করা যায়। এতে bundle ছোট থাকে এবং low-end mobile/desktop-এও ভালো কাজ করে।
