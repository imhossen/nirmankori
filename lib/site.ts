
export type CalculatorId="paint-calculator"|"concrete-calculator"|"cement-calculator"|"sand-calculator"|"brick-calculator"|"tile-calculator"|"plaster-calculator"|"floor-area-calculator";
export const calculators=[
{id:"paint-calculator",name:"ঘরের রঙের ক্যালকুলেটর",desc:"দেয়ালের আয়তন, দরজা-জানালা ও রঙের প্রলেপ ধরে প্রয়োজনীয় রং হিসাব করুন।",icon:"🎨"},
{id:"concrete-calculator",name:"কংক্রিটের ক্যালকুলেটর",desc:"দৈর্ঘ্য, প্রস্থ ও পুরুত্ব থেকে কংক্রিটের পরিমাণ হিসাব করুন।",icon:"🧱"},
{id:"cement-calculator",name:"সিমেন্টের ক্যালকুলেটর",desc:"মিশ্রণের অনুপাত অনুযায়ী আনুমানিক সিমেন্টের প্রয়োজন বের করুন।",icon:"🏗️"},
{id:"sand-calculator",name:"বালির ক্যালকুলেটর",desc:"মিশ্রণের অনুপাত অনুযায়ী প্রয়োজনীয় বালির পরিমাণ হিসাব করুন।",icon:"⛰️"},
{id:"brick-calculator",name:"ইটের ক্যালকুলেটর",desc:"দেয়ালের মাপ ও ইটের আকার অনুযায়ী আনুমানিক ইটের সংখ্যা বের করুন।",icon:"🧱"},
{id:"tile-calculator",name:"টাইলসের ক্যালকুলেটর",desc:"মেঝের আয়তন, টাইলসের মাপ ও অপচয় ধরে প্রয়োজনীয় টাইলস হিসাব করুন।",icon:"▦"},
{id:"plaster-calculator",name:"প্লাস্টারের ক্যালকুলেটর",desc:"প্লাস্টারের পুরুত্ব ও অনুপাত অনুযায়ী সিমেন্ট ও বালির হিসাব করুন।",icon:"◫"},
{id:"floor-area-calculator",name:"মেঝের আয়তন ক্যালকুলেটর",desc:"দৈর্ঘ্য ও প্রস্থ দিয়ে মেঝের মোট বর্গফুট ও বর্গমিটার বের করুন।",icon:"□"}
] as const;
export const articles=[
{slug:"ghorer-deyale-koto-rong-lagbe",title:"ঘরের দেয়ালে কত রং লাগবে?",desc:"দেয়ালের আয়তন, দরজা-জানালা, প্রলেপ ও রঙের ক্ষমতা ধরে হিসাব করার সহজ নিয়ম।",calc:"paint-calculator"},
{slug:"1000-borgofut-deyale-koto-it",title:"১০০০ বর্গফুট দেয়ালে কত ইট লাগবে?",desc:"দেয়ালের পুরুত্ব ও ইটের মাপ ব্যবহার করে আনুমানিক ইটের সংখ্যা বের করার নিয়ম।",calc:"brick-calculator"},
{slug:"chade-koto-cement-bali",title:"ছাদে কত সিমেন্ট ও বালি লাগবে?",desc:"কংক্রিটের আয়তন ও মিশ্রণের অনুপাত থেকে উপকরণের পরিমাণ বোঝার গাইড।",calc:"concrete-calculator"},
{slug:"tiles-koto-lagbe",title:"টাইলস কত লাগবে কীভাবে হিসাব করবেন?",desc:"মেঝের আয়তন, টাইলসের মাপ ও অপচয় ধরে প্রয়োজনীয় টাইলসের হিসাব।",calc:"tile-calculator"},
{slug:"ek-ghorer-jonno-koto-litre-rong",title:"এক ঘরের জন্য কত লিটার রং প্রয়োজন?",desc:"দেয়ালের আয়তন থেকে দরজা-জানালা বাদ দিয়ে কত লিটার রং লাগবে তা বোঝার নিয়ম।",calc:"paint-calculator"},
{slug:"concrete-poriman-kivabe-hisab",title:"কংক্রিটের পরিমাণ কীভাবে হিসাব করবেন?",desc:"দৈর্ঘ্য, প্রস্থ ও পুরুত্ব দিয়ে কংক্রিটের পরিমাণ বের করার সহজ পদ্ধতি।",calc:"concrete-calculator"}
];
