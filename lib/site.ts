export type CalculatorId =
  | "paint-calculator"
  | "concrete-calculator"
  | "cement-calculator"
  | "sand-calculator"
  | "brick-calculator"
  | "tile-calculator"
  | "plaster-calculator"
  | "floor-area-calculator"
  | "rod-calculator"
  | "mortar-calculator"
  | "slab-calculator"
  | "labour-cost-calculator";

export type CalculatorMeta = {
  id: CalculatorId;
  name: string;
  desc: string;
  icon: string;
};

export const calculators: CalculatorMeta[] = [
  {id:"paint-calculator",name:"ঘরের রঙের ক্যালকুলেটর",desc:"দেয়ালের আয়তন, দরজা-জানালা, প্রলেপ, রঙের কভারেজ ও দাম ধরে প্রয়োজনীয় রং ও খরচ হিসাব করুন।",icon:"Paintbrush"},
  {id:"concrete-calculator",name:"কংক্রিটের ক্যালকুলেটর",desc:"দৈর্ঘ্য, প্রস্থ, পুরুত্ব, মিশ্রণ অনুপাত ও উপকরণের দাম ধরে কংক্রিটের পরিমাণ ও খরচ হিসাব করুন।",icon:"Construction"},
  {id:"cement-calculator",name:"সিমেন্টের ক্যালকুলেটর",desc:"মিশ্রণের অনুপাত ও প্রতি ব্যাগের দাম ধরে প্রয়োজনীয় সিমেন্ট এবং আনুমানিক খরচ বের করুন।",icon:"Blocks"},
  {id:"sand-calculator",name:"বালির ক্যালকুলেটর",desc:"মিশ্রণের অনুপাত, বালির পরিমাণ ও প্রতি ঘনফুটের দাম ধরে মোট খরচ হিসাব করুন।",icon:"Waves"},
  {id:"brick-calculator",name:"ইটের ক্যালকুলেটর",desc:"দেয়ালের মাপ, ইটের মাপ, অপচয় ও প্রতি ইটের দাম ধরে প্রয়োজনীয় ইট ও খরচ বের করুন।",icon:"BrickWall"},
  {id:"tile-calculator",name:"টাইলসের ক্যালকুলেটর",desc:"মেঝের আয়তন, টাইলসের মাপ, অপচয় ও প্রতি বর্গফুটের দাম ধরে প্রয়োজনীয় টাইলস ও খরচ হিসাব করুন।",icon:"Grid2X2"},
  {id:"plaster-calculator",name:"প্লাস্টারের ক্যালকুলেটর",desc:"প্লাস্টারের ক্ষেত্রফল, পুরুত্ব, অনুপাত এবং সিমেন্ট-বালির দাম ধরে উপকরণ ও খরচ হিসাব করুন।",icon:"Layers3"},
  {id:"floor-area-calculator",name:"মেঝের আয়তন ক্যালকুলেটর",desc:"দৈর্ঘ্য ও প্রস্থ দিয়ে বর্গফুট ও বর্গমিটার বের করুন এবং চাইলে প্রতি বর্গফুটের ফ্লোরিং দামে মোট খরচ হিসাব করুন।",icon:"SquareDashed"},
  {id:"rod-calculator",name:"রডের ক্যালকুলেটর",desc:"রডের ব্যাস, দৈর্ঘ্য ও সংখ্যা থেকে আনুমানিক ওজন এবং প্রতি কেজির দামে মোট খরচ হিসাব করুন।",icon:"Calculator"},
  {id:"mortar-calculator",name:"মর্টারের ক্যালকুলেটর",desc:"মর্টারের আয়তন ও সিমেন্ট-বালির অনুপাত থেকে ব্যাগ, ঘনফুট ও আনুমানিক খরচ হিসাব করুন।",icon:"Blocks"},
  {id:"slab-calculator",name:"ছাদ/স্ল্যাব ক্যালকুলেটর",desc:"স্ল্যাবের মাপ, পুরুত্ব, মিশ্রণ অনুপাত ও উপকরণের দাম ধরে কংক্রিট, সিমেন্ট, বালি, খোয়া ও খরচ হিসাব করুন।",icon:"Construction"},
  {id:"labour-cost-calculator",name:"শ্রমিক খরচ ক্যালকুলেটর",desc:"কাজের ক্ষেত্রফল ও প্রতি বর্গফুট শ্রমের দামের ভিত্তিতে আনুমানিক শ্রমিক খরচ হিসাব করুন।",icon:"Calculator"}
];

export const articles=[
{slug:"ghorer-deyale-koto-rong-lagbe",title:"ঘরের দেয়ালে কত রং লাগবে?",desc:"দেয়ালের আয়তন, দরজা-জানালা, প্রলেপ ও রঙের ক্ষমতা ধরে হিসাব করার সহজ নিয়ম।",calc:"paint-calculator"},
{slug:"1000-borgofut-deyale-koto-it",title:"১০০০ বর্গফুট দেয়ালে কত ইট লাগবে?",desc:"দেয়ালের পুরুত্ব ও ইটের মাপ ব্যবহার করে আনুমানিক ইটের সংখ্যা বের করার নিয়ম।",calc:"brick-calculator"},
{slug:"chade-koto-cement-bali",title:"ছাদে কত সিমেন্ট ও বালি লাগবে?",desc:"কংক্রিটের আয়তন ও মিশ্রণের অনুপাত থেকে উপকরণের পরিমাণ বোঝার গাইড।",calc:"concrete-calculator"},
{slug:"tiles-koto-lagbe",title:"টাইলস কত লাগবে কীভাবে হিসাব করবেন?",desc:"মেঝের আয়তন, টাইলসের মাপ ও অপচয় ধরে প্রয়োজনীয় টাইলসের হিসাব।",calc:"tile-calculator"},
{slug:"ek-ghorer-jonno-koto-litre-rong",title:"এক ঘরের জন্য কত লিটার রং প্রয়োজন?",desc:"দেয়ালের আয়তন থেকে দরজা-জানালা বাদ দিয়ে কত লিটার রং লাগবে তা বোঝার নিয়ম।",calc:"paint-calculator"},
{slug:"concrete-poriman-kivabe-hisab",title:"কংক্রিটের পরিমাণ কীভাবে হিসাব করবেন?",desc:"দৈর্ঘ্য, প্রস্থ ও পুরুত্ব দিয়ে কংক্রিটের পরিমাণ বের করার সহজ পদ্ধতি।",calc:"concrete-calculator"},
{slug:"roder-ojon-kivabe-hisab",title:"রডের ওজন কীভাবে হিসাব করবেন?",desc:"রডের ব্যাস, দৈর্ঘ্য ও সংখ্যা থেকে আনুমানিক ওজন বের করার সহজ নিয়ম।",calc:"rod-calculator"},
{slug:"mortar-er-cement-bali",title:"মর্টারে কত সিমেন্ট ও বালি লাগে?",desc:"মর্টারের আয়তন ও মিশ্রণের অনুপাত থেকে উপকরণের আনুমানিক পরিমাণ বের করুন।",calc:"mortar-calculator"}
];
