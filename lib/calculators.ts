
export type CalculatorId =
  | "paint-calculator" | "concrete-calculator" | "cement-calculator"
  | "sand-calculator" | "brick-calculator" | "tile-calculator"
  | "plaster-calculator" | "floor-area-calculator";

export type Calculator = {
  id: CalculatorId;
  name: string;
  short: string;
  description: string;
  icon: string;
};

export const calculators: Calculator[] = [
  { id:"paint-calculator", name:"রং ক্যালকুলেটর", short:"রং", description:"দেয়াল, দরজা-জানালা বাদ দিয়ে প্রয়োজনীয় রং হিসাব করুন।", icon:"Paintbrush" },
  { id:"concrete-calculator", name:"কংক্রিট ক্যালকুলেটর", short:"কংক্রিট", description:"দৈর্ঘ্য, প্রস্থ ও পুরুত্ব থেকে কংক্রিটের পরিমাণ বের করুন।", icon:"Blocks" },
  { id:"cement-calculator", name:"সিমেন্ট ক্যালকুলেটর", short:"সিমেন্ট", description:"মিক্স অনুপাত ও ভলিউম দিয়ে সিমেন্টের আনুমানিক প্রয়োজন হিসাব করুন।", icon:"Construction" },
  { id:"sand-calculator", name:"বালি ক্যালকুলেটর", short:"বালি", description:"কংক্রিট বা মিক্সের জন্য বালির আনুমানিক ভলিউম হিসাব করুন।", icon:"Waves" },
  { id:"brick-calculator", name:"ইট ক্যালকুলেটর", short:"ইট", description:"দেয়ালের আয়তন ও ইটের মাপ থেকে প্রয়োজনীয় ইটের সংখ্যা অনুমান করুন।", icon:"BrickWall" },
  { id:"tile-calculator", name:"টাইলস ক্যালকুলেটর", short:"টাইলস", description:"মেঝের আয়তন, টাইলের মাপ ও অপচয় ধরে টাইলস হিসাব করুন।", icon:"Grid2X2" },
  { id:"plaster-calculator", name:"প্লাস্টার ক্যালকুলেটর", short:"প্লাস্টার", description:"প্লাস্টারের আয়তন ও মিক্স অনুপাত থেকে সিমেন্ট-বালি হিসাব করুন।", icon:"Layers3" },
  { id:"floor-area-calculator", name:"ফ্লোর এরিয়া ক্যালকুলেটর", short:"ফ্লোর", description:"দৈর্ঘ্য ও প্রস্থ দিয়ে বর্গফুট ও বর্গমিটার বের করুন।", icon:"SquareDashed" }
];

export const getCalculator = (id: string) => calculators.find(c => c.id === id);

export function num(v: FormData, key: string, fallback = 0) {
  const n = Number(v.get(key));
  return Number.isFinite(n) ? n : fallback;
}
export function round(n: number, d = 2) {
  const p = 10 ** d;
  return Math.round(n * p) / p;
}
export function ftToM(v: number) { return v * 0.3048; }
export function inchToM(v: number) { return v * 0.0254; }
export function sqftToSqm(v: number) { return v * 0.092903; }
export function cftToM3(v: number) { return v * 0.0283168; }

export function calculate(id: CalculatorId, v: Record<string, number>) {
  switch (id) {
    case "floor-area-calculator": {
      const area = v.length * v.width;
      return {
        title:"ফ্লোর এরিয়া",
        items:[["মোট আয়তন", `${round(area)} বর্গফুট`],["মোট আয়তন", `${round(area*0.092903,2)} বর্গমিটার`]],
        note:"আয়তন = দৈর্ঘ্য × প্রস্থ।"
      };
    }
    case "paint-calculator": {
      const wall = 2*(v.length+v.width)*v.height;
      const openings = v.doors*v.doorW*v.doorH + v.windows*v.windowW*v.windowH;
      const net = Math.max(0, wall-openings);
      const litres = net*v.coats/v.coverage;
      const extra = litres*(1+v.waste/100);
      return {
        title:"প্রয়োজনীয় রং",
        items:[["মোট দেয়ালের আয়তন",`${round(wall)} বর্গফুট`],["দরজা-জানালা বাদে আয়তন",`${round(net)} বর্গফুট`],["বেস প্রয়োজন",`${round(litres,2)} লিটার`],["অপচয়সহ আনুমানিক",`${round(extra,2)} লিটার`],["আনুমানিক খরচ",`৳${round(extra*v.price)}`]],
        note:"ধরা হয়েছে coverage প্রতি লিটারে নির্দিষ্ট বর্গফুট এবং প্রতিটি coat সমানভাবে প্রয়োগ হবে। বাস্তবে পৃষ্ঠের ধরন, প্রাইমার ও রঙের ব্র্যান্ডে coverage বদলায়।"
      };
    }
    case "concrete-calculator": {
      const wet = v.length*v.width*v.depth;
      const dry = wet*v.dryFactor;
      const parts = v.cementRatio+v.sandRatio+v.aggregateRatio;
      const cementM3 = dry*v.cementRatio/parts;
      const sandM3 = dry*v.sandRatio/parts;
      const aggM3 = dry*v.aggregateRatio/parts;
      const bags = cementM3/0.0347;
      return {
        title:"কংক্রিটের আনুমানিক উপকরণ",
        items:[["Wet concrete",`${round(wet,2)} ঘনফুট`],["Dry-volume ভিত্তি",`${round(dry,2)} ঘনফুট`],["সিমেন্ট",`${round(bags,1)} ব্যাগ`],["বালি",`${round(sandM3/0.0283168,2)} ঘনফুট`],["স্টোন/অ্যাগ্রিগেট",`${round(aggM3/0.0283168,2)} ঘনফুট`]],
        note:"এখানে dry volume factor এবং nominal mix ratio configurable রাখা হয়েছে। এটি quantity estimate; structural design বা mix design-এর বিকল্প নয়।"
      };
    }
    case "cement-calculator": {
      const dry = v.volume*v.dryFactor;
      const parts = v.cementRatio+v.sandRatio+v.aggregateRatio;
      const cementM3 = dry*v.cementRatio/parts;
      const bags = cementM3/0.0347;
      return { title:"সিমেন্টের আনুমানিক পরিমাণ", items:[["Dry volume",`${round(dry,2)} ঘনফুট`],["সিমেন্ট",`${round(bags,1)} ব্যাগ`],["সিমেন্টের ভলিউম",`${round(cementM3/0.0283168,2)} ঘনফুট`]], note:"১ ব্যাগ সিমেন্ট ≈ 0.0347 m³ ধরে হিসাব করা হয়েছে। ব্যাগের প্রকৃত ওজন/ভলিউম ব্র্যান্ড ও প্যাকেজ অনুযায়ী যাচাই করুন।" };
    }
    case "sand-calculator": {
      const dry = v.volume*v.dryFactor;
      const parts = v.cementRatio+v.sandRatio+v.aggregateRatio;
      const sand = dry*v.sandRatio/parts;
      return { title:"বালির আনুমানিক পরিমাণ", items:[["Dry volume",`${round(dry,2)} ঘনফুট`],["বালি",`${round(sand,2)} ঘনফুট`],["বালি",`${round(sand*0.0283168,3)} ঘনমিটার`]], note:"মিক্স ratio পরিবর্তন করলে ফলাফল পরিবর্তিত হবে। বালির আর্দ্রতা ও bulking-এর কারণে সাইটে প্রকৃত ভলিউম ভিন্ন হতে পারে।" };
    }
    case "brick-calculator": {
      const wall = v.length*v.height*v.thickness;
      const brickVol = (v.brickL*v.brickW*v.brickH)/1728;
      const netBrickVol = brickVol*(1+v.mortar/100);
      const count = wall/netBrickVol;
      const total = Math.ceil(count*(1+v.waste/100));
      return { title:"প্রয়োজনীয় ইট", items:[["দেয়ালের ভলিউম",`${round(wall,2)} ঘনফুট`],["প্রতি ইটের ভলিউম",`${round(brickVol,4)} ঘনফুট`],["ইটের আনুমানিক সংখ্যা",`${total.toLocaleString("bn-BD")} টি`]], note:"ইটের মাপ, মর্টারের joint এবং workmanship-এর উপর প্রকৃত সংখ্যা বদলায়। এখানে আপনার দেওয়া ইটের মাপ ও mortar allowance ব্যবহার করা হয়েছে।" };
    }
    case "tile-calculator": {
      const area = v.length*v.width;
      const tileArea = (v.tileL*v.tileW)/144;
      const base = area/tileArea;
      const total = Math.ceil(base*(1+v.waste/100));
      return { title:"প্রয়োজনীয় টাইলস", items:[["মেঝের আয়তন",`${round(area)} বর্গফুট`],["প্রতি টাইলের আয়তন",`${round(tileArea,3)} বর্গফুট`],["বেস সংখ্যা",`${Math.ceil(base).toLocaleString("bn-BD")} টি`],["অপচয়সহ প্রয়োজন",`${total.toLocaleString("bn-BD")} টি`]], note:"কাটিং, কোণ ও ভাঙার জন্য wastage রাখা হয়েছে। জটিল pattern হলে বেশি allowance লাগতে পারে।" };
    }
    case "plaster-calculator": {
      const area = v.length*v.height;
      const wet = area*(v.thickness/12);
      const dry = wet*v.dryFactor;
      const parts = v.cementRatio+v.sandRatio;
      const cementM3 = dry*v.cementRatio/parts;
      const sand = dry*v.sandRatio/parts;
      return { title:"প্লাস্টারের উপকরণ", items:[["প্লাস্টার area",`${round(area)} বর্গফুট`],["Wet volume",`${round(wet,2)} ঘনফুট`],["সিমেন্ট",`${round(cementM3/0.0283168/0.0347,1)} ব্যাগ`],["বালি",`${round(sand,2)} ঘনফুট`]], note:"প্লাস্টারের thickness, mix ratio ও dry-volume factor configurable। দেয়ালের condition ও surface preparation-এর কারণে প্রকৃত consumption বদলাতে পারে।" };
    }
  }
}

export const articles = [
  { slug:"ghorer-deyale-koto-rong-lagbe", title:"ঘরের দেয়ালে কত রং লাগবে?", excerpt:"দেয়ালের আয়তন, দরজা-জানালা, coat ও coverage ধরে কীভাবে রঙের পরিমাণ হিসাব করবেন।", calc:"paint-calculator" },
  { slug:"1000-borgofut-deyale-koto-it", title:"১০০০ বর্গফুট দেয়ালে কত ইট লাগবে?", excerpt:"দেয়ালের thickness ও ইটের মাপ ব্যবহার করে ইটের আনুমানিক সংখ্যা বের করার সহজ পদ্ধতি।", calc:"brick-calculator" },
  { slug:"chade-koto-cement-bali", title:"ছাদে কত সিমেন্ট ও বালি লাগবে?", excerpt:"কংক্রিটের volume ও mix ratio থেকে উপকরণের quantity estimate করার ধারণা।", calc:"concrete-calculator" },
  { slug:"tiles-koto-lagbe", title:"টাইলস কত লাগবে কীভাবে হিসাব করবেন?", excerpt:"ফ্লোর area, tile size এবং wastage ধরে প্রয়োজনীয় টাইলসের সংখ্যা হিসাব করুন।", calc:"tile-calculator" },
  { slug:"ek-ghorer-jonno-koto-litre-rong", title:"এক ঘরের জন্য কত লিটার রং প্রয়োজন?", excerpt:"একটি সাধারণ ঘরের দেয়াল থেকে door-window বাদ দিয়ে paint requirement বের করার নিয়ম।", calc:"paint-calculator" },
  { slug:"concrete-poriman-kivabe-hisab", title:"কংক্রিটের পরিমাণ কীভাবে হিসাব করবেন?", excerpt:"দৈর্ঘ্য, প্রস্থ ও thickness দিয়ে concrete volume এবং material estimate বোঝার সহজ গাইড।", calc:"concrete-calculator" }
];
