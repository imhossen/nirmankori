"use client";

import { useEffect, useState } from "react";
import {
  Copy, RotateCcw, Share2, ChevronDown, Plus, FileText,
} from "lucide-react";
import type { CalculatorId } from "../lib/site";

type Field = [key: string, label: string, unit: string, value: number];
type ResultRow = [label: string, value: string];

const cfg: Record<CalculatorId, {title:string; fields:Field[]; extra?:boolean}> = {
  "paint-calculator": {
    title:"ঘরের রঙের ক্যালকুলেটর",
    fields:[
      ["length","দৈর্ঘ্য","ফুট",12],["width","প্রস্থ","ফুট",10],["height","উচ্চতা","ফুট",9],
      ["coats","কোট সংখ্যা","কোট",2],["doors","দরজা","টি",1],["windows","জানালা","টি",2],
      ["coverage","কভারেজ (প্রতি লিটার)","বর্গফুট",100],["price","রঙের দাম (প্রতি লিটার)","৳",650]
    ], extra:true
  },
  "concrete-calculator": {
    title:"কংক্রিটের ক্যালকুলেটর",
    fields:[
      ["length","দৈর্ঘ্য","ফুট",20],["width","প্রস্থ","ফুট",12],["depth","পুরুত্ব","ফুট",0.5],
      ["dry","শুকনো হিসাবের গুণক","গুণ",1.54],["cement","সিমেন্টের অনুপাত","অংশ",1],
      ["sand","বালির অনুপাত","অংশ",2],["stone","পাথর/খোয়ার অনুপাত","অংশ",4],
      ["cementPrice","সিমেন্ট (প্রতি ব্যাগ)","৳",580],["sandPrice","বালি (প্রতি ঘনফুট)","৳",35],
      ["stonePrice","খোয়া (প্রতি ঘনফুট)","৳",95]
    ]
  },
  "cement-calculator": {
    title:"সিমেন্টের ক্যালকুলেটর",
    fields:[
      ["volume","ভেজা আয়তন","ঘনফুট",100],["dry","শুকনো হিসাবের গুণক","গুণ",1.54],
      ["cement","সিমেন্টের অনুপাত","অংশ",1],["sand","বালির অনুপাত","অংশ",2],["stone","খোয়ার অনুপাত","অংশ",4],
      ["cementPrice","সিমেন্ট (প্রতি ব্যাগ)","৳",580]
    ]
  },
  "sand-calculator": {
    title:"বালির ক্যালকুলেটর",
    fields:[
      ["volume","ভেজা আয়তন","ঘনফুট",100],["dry","শুকনো হিসাবের গুণক","গুণ",1.54],
      ["cement","সিমেন্টের অনুপাত","অংশ",1],["sand","বালির অনুপাত","অংশ",2],["stone","খোয়ার অনুপাত","অংশ",4],
      ["sandPrice","বালি (প্রতি ঘনফুট)","৳",35]
    ]
  },
  "brick-calculator": {
    title:"ইটের ক্যালকুলেটর",
    fields:[
      ["length","দেয়ালের দৈর্ঘ্য","ফুট",20],["height","দেয়ালের উচ্চতা","ফুট",10],["thickness","দেয়ালের পুরুত্ব","ইঞ্চি",5],
      ["brickL","ইটের দৈর্ঘ্য","ইঞ্চি",10],["brickW","ইটের প্রস্থ","ইঞ্চি",5],["brickH","ইটের উচ্চতা","ইঞ্চি",3],
      ["waste","অপচয়","%",5],["brickPrice","ইটের দাম (প্রতি টি)","৳",12]
    ]
  },
  "tile-calculator": {
    title:"টাইলসের ক্যালকুলেটর",
    fields:[
      ["length","মেঝের দৈর্ঘ্য","ফুট",20],["width","মেঝের প্রস্থ","ফুট",12],
      ["tileL","টাইলসের দৈর্ঘ্য","ইঞ্চি",24],["tileW","টাইলসের প্রস্থ","ইঞ্চি",24],
      ["waste","অপচয়","%",10],["tilePrice","টাইলসের দাম (প্রতি বর্গফুট)","৳",90]
    ]
  },
  "plaster-calculator": {
    title:"প্লাস্টারের ক্যালকুলেটর",
    fields:[
      ["length","দেয়ালের দৈর্ঘ্য","ফুট",20],["height","দেয়ালের উচ্চতা","ফুট",10],["thickness","পুরুত্ব","ইঞ্চি",0.5],
      ["dry","শুকনো হিসাবের গুণক","গুণ",1.33],["cement","সিমেন্টের অনুপাত","অংশ",1],["sand","বালির অনুপাত","অংশ",4],
      ["cementPrice","সিমেন্ট (প্রতি ব্যাগ)","৳",580],["sandPrice","বালি (প্রতি ঘনফুট)","৳",35]
    ]
  },
  "floor-area-calculator": {
    title:"মেঝের আয়তন ক্যালকুলেটর",
    fields:[
      ["length","দৈর্ঘ্য","ফুট",20],["width","প্রস্থ","ফুট",12],
      ["floorPrice","ফ্লোরিং/টাইলসের দাম (প্রতি বর্গফুট)","৳",90],["waste","অপচয়","%",10]
    ]
  },
  "rod-calculator": {
    title:"রডের ক্যালকুলেটর",
    fields:[
      ["diameter","রডের ব্যাস","মিমি",12],["length","একটি রডের দৈর্ঘ্য","ফুট",40],
      ["count","রডের সংখ্যা","টি",20],["rodPrice","রডের দাম (প্রতি কেজি)","৳",95],["waste","অপচয়","%",5]
    ]
  },
  "mortar-calculator": {
    title:"মর্টারের ক্যালকুলেটর",
    fields:[
      ["volume","মর্টারের ভেজা আয়তন","ঘনফুট",50],["dry","শুকনো হিসাবের গুণক","গুণ",1.33],
      ["cement","সিমেন্টের অনুপাত","অংশ",1],["sand","বালির অনুপাত","অংশ",4],
      ["cementPrice","সিমেন্ট (প্রতি ব্যাগ)","৳",580],["sandPrice","বালি (প্রতি ঘনফুট)","৳",35]
    ]
  },
  "slab-calculator": {
    title:"ছাদ/স্ল্যাব ক্যালকুলেটর",
    fields:[
      ["length","ছাদের দৈর্ঘ্য","ফুট",30],["width","ছাদের প্রস্থ","ফুট",20],["depth","পুরুত্ব","ফুট",0.5],
      ["dry","শুকনো হিসাবের গুণক","গুণ",1.54],["cement","সিমেন্টের অনুপাত","অংশ",1],
      ["sand","বালির অনুপাত","অংশ",2],["stone","খোয়ার অনুপাত","অংশ",4],
      ["cementPrice","সিমেন্ট (প্রতি ব্যাগ)","৳",580],["sandPrice","বালি (প্রতি ঘনফুট)","৳",35],["stonePrice","খোয়া (প্রতি ঘনফুট)","৳",95]
    ]
  },
  "labour-cost-calculator": {
    title:"শ্রমিক খরচ ক্যালকুলেটর",
    fields:[
      ["area","কাজের ক্ষেত্রফল","বর্গফুট",1000],["labourPrice","শ্রমের দাম (প্রতি বর্গফুট)","৳",25],
      ["waste","অতিরিক্ত/অন্যান্য","%",0]
    ]
  }
};

function num(n:number){
  const latin = typeof window!=="undefined" && localStorage.getItem("nirman-numbers")==="latin";
  return n.toLocaleString(latin?"en-US":"bn-BD",{maximumFractionDigits:2});
}
function money(n:number){ return "৳ "+num(Math.max(0,n)); }
function bagFromCft(cft:number){ return cft*0.0283168/0.0347; }

export default function CalculatorForm({id}:{id:CalculatorId}){
  const c=cfg[id];
  const initial=Object.fromEntries(c.fields.map(f=>[f[0],f[3]]));
  const [v,setV]=useState<Record<string,number>>(initial);
  const [r,setR]=useState<{out:ResultRow[];note:string}|null>(null);
  const [assume,setAssume]=useState(false);
  const [,refresh]=useState(0);

  useEffect(()=>{
    const f=()=>refresh(x=>x+1);
    addEventListener("nirman-settings",f);
    return()=>removeEventListener("nirman-settings",f);
  },[]);

  function calc(){
    let out:ResultRow[]=[]; let note="";

    if(id==="paint-calculator"){
      const wall=2*(v.length+v.width)*v.height;
      const open=v.doors*3*7+v.windows*4*4;
      const area=Math.max(0,wall-open);
      const litres=area*v.coats/v.coverage;
      const total=litres*1.1;
      out=[
        ["দেয়ালের মোট ক্ষেত্রফল",num(wall)+" বর্গফুট"],
        ["দরজা-জানালা বাদ",num(open)+" বর্গফুট"],
        ["রঙযোগ্য ক্ষেত্রফল",num(area)+" বর্গফুট"],
        ["প্রয়োজনীয় রং",num(total)+" লিটার"],
        ["আনুমানিক রঙের খরচ",money(total*v.price)]
      ];
      note="দরজার মাপ ৩×৭ ফুট এবং জানালার মাপ ৪×৪ ফুট ধরে নেওয়া হয়েছে। কভারেজ, কোট ও প্রতি লিটারের দাম পরিবর্তনযোগ্য। ১০% সাধারণ অপচয় ধরা হয়েছে।";
    } else if(id==="floor-area-calculator"){
      const a=v.length*v.width, purchase=a*(1+v.waste/100);
      out=[
        ["মোট ক্ষেত্রফল",num(a)+" বর্গফুট"],
        ["মোট ক্ষেত্রফল",num(a*.092903)+" বর্গমিটার"],
        ["কেনার জন্য আনুমানিক ক্ষেত্রফল",num(purchase)+" বর্গফুট"],
        ["ফ্লোরিং/টাইলসের আনুমানিক খরচ",money(purchase*v.floorPrice)]
      ];
      note="ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ। কেনার সময় আপনার দেওয়া অপচয়ের হার যোগ করা হয়েছে।";
    } else if(id==="tile-calculator"){
      const a=v.length*v.width,t=v.tileL*v.tileW/144,n=Math.ceil(a/t*(1+v.waste/100)),purchaseArea=a*(1+v.waste/100);
      out=[
        ["মেঝের মোট ক্ষেত্রফল",num(a)+" বর্গফুট"],
        ["একটি টাইলসের ক্ষেত্রফল",num(t)+" বর্গফুট"],
        ["প্রয়োজনীয় টাইলস",num(n)+" টি"],
        ["কেনার জন্য ক্ষেত্রফল",num(purchaseArea)+" বর্গফুট"],
        ["টাইলসের আনুমানিক খরচ",money(purchaseArea*v.tilePrice)]
      ];
      note="কাটাকাটি ও ভাঙার জন্য আপনার দেওয়া অপচয়ের হার যোগ করা হয়েছে। দাম প্রতি বর্গফুট হিসেবে ধরা হয়েছে।";
    } else if(id==="brick-calculator"){
      const wall=v.length*v.height*(v.thickness/12);
      const brick=v.brickL*v.brickW*v.brickH/1728;
      const n=Math.ceil(wall/brick*1.25*(1+v.waste/100));
      out=[
        ["দেয়ালের আয়তন",num(wall)+" ঘনফুট"],
        ["একটি ইটের আয়তন",num(brick)+" ঘনফুট"],
        ["প্রয়োজনীয় ইট",num(n)+" টি"],
        ["ইটের আনুমানিক খরচ",money(n*v.brickPrice)]
      ];
      note="মর্টারের জন্য ২৫% এবং আপনার দেওয়া অপচয়ের হার ধরে আনুমানিক ইটের সংখ্যা করা হয়েছে। প্রতি ইটের দাম পরিবর্তনযোগ্য।";
    } else if(id==="plaster-calculator"){
      const a=v.length*v.height,wet=a*(v.thickness/12),dry=wet*v.dry,parts=v.cement+v.sand;
      const cement=dry*v.cement/parts,sand=dry*v.sand/parts,bags=bagFromCft(cement);
      out=[
        ["প্লাস্টারের ক্ষেত্রফল",num(a)+" বর্গফুট"],
        ["প্লাস্টারের আয়তন",num(wet)+" ঘনফুট"],
        ["সিমেন্ট",num(bags)+" ব্যাগ"],
        ["বালি",num(sand)+" ঘনফুট"],
        ["সিমেন্টের খরচ",money(bags*v.cementPrice)],
        ["বালির খরচ",money(sand*v.sandPrice)],
        ["মোট আনুমানিক খরচ",money(bags*v.cementPrice+sand*v.sandPrice)]
      ];
      note="পুরুত্ব, শুকনো হিসাবের গুণক এবং মিশ্রণের অনুপাত আপনার ইনপুট অনুযায়ী ধরা হয়েছে। সিমেন্টের ব্যাগের আনুমানিক আয়তন ০.০৩৪৭ ঘনমিটার ধরা হয়েছে।";
    } else if(id==="rod-calculator"){
      const weightPerMeter=v.diameter*v.diameter/162;
      const totalMeters=v.length*.3048*v.count*(1+v.waste/100);
      const weight=weightPerMeter*totalMeters;
      out=[
        ["মোট রডের দৈর্ঘ্য",num(totalMeters)+" মিটার"],
        ["আনুমানিক ওজন",num(weight)+" কেজি"],
        ["রডের আনুমানিক খরচ",money(weight*v.rodPrice)]
      ];
      note="রডের ওজনের প্রচলিত সূত্র: ব্যাস² ÷ ১৬২ = কেজি/মিটার। এটি আনুমানিক হিসাব; structural detailing-এর জন্য প্রকৌশলীর bar schedule অনুসরণ করুন।";
    } else if(id==="mortar-calculator"){
      const dry=v.volume*v.dry,parts=v.cement+v.sand,cement=dry*v.cement/parts,sand=dry*v.sand/parts,bags=bagFromCft(cement);
      const total=bags*v.cementPrice+sand*v.sandPrice;
      out=[
        ["শুকনো মর্টারের হিসাব",num(dry)+" ঘনফুট"],
        ["সিমেন্ট",num(bags)+" ব্যাগ"],
        ["বালি",num(sand)+" ঘনফুট"],
        ["সিমেন্টের খরচ",money(bags*v.cementPrice)],
        ["বালির খরচ",money(sand*v.sandPrice)],
        ["মোট আনুমানিক খরচ",money(total)]
      ];
      note="শুকনো হিসাবের গুণক ও মিশ্রণের অনুপাত আপনার ইনপুট অনুযায়ী ধরা হয়েছে।";
    } else {
      const isSlab=id==="slab-calculator";
      const vol=isSlab?v.length*v.width*v.depth:v.volume;
      const dry=vol*v.dry;
      const parts=v.cement+v.sand+(v.stone||0);
      const cement=dry*v.cement/parts;
      const sand=dry*v.sand/parts;
      const stone=v.stone?dry*v.stone/parts:0;
      const bags=bagFromCft(cement);
      const cementCost=bags*(v.cementPrice||0);
      const sandCost=sand*(v.sandPrice||0);
      const stoneCost=stone*(v.stonePrice||0);
      if(id==="cement-calculator"){
        out=[["সিমেন্ট",num(bags)+" ব্যাগ"],["সিমেন্টের আনুমানিক খরচ",money(bags*v.cementPrice)]];
        note="সিমেন্টের অংশ ও মোট মিশ্রণের অংশ থেকে সিমেন্টের পরিমাণ বের করা হয়েছে।";
      } else if(id==="sand-calculator"){
        out=[["বালি",num(sand)+" ঘনফুট"],["বালির আনুমানিক খরচ",money(sand*v.sandPrice)]];
        note="বালির অংশ ও মোট মিশ্রণের অংশ থেকে বালির পরিমাণ বের করা হয়েছে।";
      } else {
        out=[
          ["কংক্রিটের ভেজা আয়তন",num(vol)+" ঘনফুট"],
          ["সিমেন্ট",num(bags)+" ব্যাগ"],
          ["বালি",num(sand)+" ঘনফুট"],
          ["পাথর/খোয়া",num(stone)+" ঘনফুট"],
          ["সিমেন্টের খরচ",money(cementCost)],
          ["বালির খরচ",money(sandCost)],
          ["খোয়ার খরচ",money(stoneCost)],
          ["মোট আনুমানিক খরচ",money(cementCost+sandCost+stoneCost)]
        ];
        note=isSlab
          ?"স্ল্যাবের আয়তন = দৈর্ঘ্য × প্রস্থ × পুরুত্ব। শুকনো হিসাবের গুণক ও মিশ্রণের অনুপাত আপনার ইনপুট অনুযায়ী ধরা হয়েছে। কাঠামোগত কাজের জন্য প্রকৌশলীর অনুমোদিত mix design অনুসরণ করুন।"
          :"শুকনো হিসাবের গুণক ও মিশ্রণের অনুপাত আপনার ইনপুট অনুযায়ী ধরা হয়েছে। structural কাজের জন্য প্রকৌশলীর অনুমোদিত mix design অনুসরণ করুন।";
      }
    }

    if(id==="labour-cost-calculator"){
      const area=v.area, total=area*v.labourPrice*(1+v.waste/100);
      out=[["কাজের ক্ষেত্রফল",num(area)+" বর্গফুট"],["শ্রমের হার","৳ "+num(v.labourPrice)+" / বর্গফুট"],["মোট আনুমানিক শ্রমিক খরচ",money(total)]];
      note="শ্রমের হার আপনার স্থানীয় বাজারদর অনুযায়ী পরিবর্তন করুন।";
    }

    setR({out,note});
    const payload={title:c.title,out,note,at:new Date().toISOString()};
    localStorage.setItem("nirman-last-report",JSON.stringify(payload));
    const recent:string[]=JSON.parse(localStorage.getItem("nirman-recent")||"[]");
    localStorage.setItem("nirman-recent",JSON.stringify([id,...recent.filter(x=>x!==id)].slice(0,6)));
    const hist:any[]=JSON.parse(localStorage.getItem("nirman-history")||"[]");
    localStorage.setItem("nirman-history",JSON.stringify([{id,title:c.title,at:new Date().toISOString(),out},...hist].slice(0,20)));
    dispatchEvent(new Event("nirman-recent"));
  }

  function reset(){setV(initial);setR(null)}
  function text(){return c.title+"\n"+(r?.out||[]).map(x=>x[0]+": "+x[1]).join("\n")+"\n\n"+(r?.note||"")}
  async function share(){const t=text();if(navigator.share)await navigator.share({title:c.title,text:t});else{await navigator.clipboard?.writeText(t);alert("ফলাফল কপি হয়েছে।")}}
  function whatsapp(){window.open(`https://wa.me/?text=${encodeURIComponent(text())}`,"_blank","noopener,noreferrer")}
  function addProject(){
    if(!r)return;
    const p=JSON.parse(localStorage.getItem("nirman-project")||'{"name":"আমার নতুন বাড়ি","items":[]}');
    const costRow=r.out.find(x=>x[0].includes("মোট")&&x[0].includes("খরচ"))||r.out.find(x=>x[0].includes("খরচ"));
    const cost=costRow?Number(String(costRow[1]).replace(/[^\d.]/g,"")):0;
    const important=r.out.find(x=>/প্রয়োজনীয়|সিমেন্ট|বালি|আনুমানিক ওজন|ক্ষেত্রফল/.test(x[0]))?.[1]||"";
    p.items=[...(p.items||[]),{title:c.title,quantity:important,cost,at:new Date().toISOString()}];
    p.updated=new Date().toISOString();
    localStorage.setItem("nirman-project",JSON.stringify(p));
    alert("প্রজেক্টে যোগ হয়েছে।");
  }

  return <div className="soft-card p-5 md:p-8 grid lg:grid-cols-[1.08fr_.92fr] gap-7">
    <div>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-5">
        {c.fields.map(f=><label key={f[0]} className="grid gap-2">
          <span className="font-bold text-[16px]">{f[1]}</span>
          <span className="input-box">
            <input type="number" min="0" step="any" value={v[f[0]]} onChange={e=>setV({...v,[f[0]]:Number(e.target.value)})} aria-label={f[1]}/>
            <span className="input-unit">{f[2]}</span>
          </span>
        </label>)}
      </div>
      {c.extra&&<div className="mt-5 rounded-2xl bg-[var(--surface)] border border-[var(--line)] px-4 py-3 flex items-center gap-3"><span className="text-xl">☑</span><span className="font-bold">সাধারণ ১০% অপচয় ধরা হয়েছে</span></div>}
      <button onClick={calc} className="mt-5 w-full rounded-2xl bg-[var(--green)] text-white py-4 font-black text-lg hover:opacity-90">হিসাব করুন</button>
    </div>
    <div className="rounded-[28px] bg-[var(--surface)] p-6 md:p-7 min-h-[350px]">
      <div className="text-[var(--green)] font-black text-xl">ফলাফল</div>
      {!r?<div className="h-[290px] grid place-items-center text-center text-[var(--muted)]"><div><div className="font-bold text-lg">আপনার হিসাব এখানে দেখা যাবে</div><p className="text-sm mt-1">তথ্যগুলো পূরণ করে হিসাব করুন।</p></div></div>:
      <>
        <div className="mt-4 grid">{r.out.map((x,i)=><div key={i} className="py-4 border-b border-[var(--line)] flex justify-between gap-4"><span className={x[0].includes("মোট")?"font-bold":""}>{x[0]}</span><strong className={x[0].includes("খরচ")||x[0].includes("প্রয়োজনীয়")||x[0].includes("ওজন")?"text-[var(--green)] text-lg":""}>{x[1]}</strong></div>)}</div>
        <button onClick={()=>setAssume(!assume)} className="mt-4 flex items-center gap-2 text-sm font-bold text-[var(--green)]"><ChevronDown size={17} className={assume?"rotate-180":""}/>এই হিসাব কীভাবে করা হয়েছে?</button>
        {assume&&<p className="text-sm text-[var(--muted)] leading-6 mt-2 rounded-xl bg-[var(--card)] p-3">{r.note}</p>}
        <div className="flex flex-wrap gap-2 mt-5">
          <button onClick={()=>navigator.clipboard?.writeText(text())} className="rounded-xl bg-[var(--card)] border border-[var(--line)] px-4 py-2 font-bold flex gap-2 items-center"><Copy size={16}/>ফলাফল কপি</button>
          <button onClick={share} className="rounded-xl bg-[var(--card)] border border-[var(--line)] px-4 py-2 font-bold flex gap-2 items-center"><Share2 size={16}/>শেয়ার</button>
          <button onClick={whatsapp} className="rounded-xl bg-[var(--card)] border border-[var(--line)] px-4 py-2 font-bold">WhatsApp</button>
          <button onClick={addProject} className="rounded-xl bg-[var(--card)] border border-[var(--line)] px-4 py-2 font-bold flex gap-2 items-center"><Plus size={16}/>প্রজেক্টে যোগ</button>
          <button onClick={()=>window.location.href="/report"} className="rounded-xl bg-[var(--card)] border border-[var(--line)] px-4 py-2 font-bold flex gap-2 items-center"><FileText size={16}/>রিপোর্ট</button>
          <button onClick={reset} className="rounded-xl bg-[var(--card)] border border-[var(--line)] px-4 py-2 font-bold flex gap-2 items-center"><RotateCcw size={16}/>নতুন হিসাব</button>
        </div>
      </>}
    </div>
  </div>
}
