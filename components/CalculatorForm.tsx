
"use client";
import {useState} from "react";
import type {CalculatorId} from "../lib/site";

const cfg:any={
"paint-calculator":{title:"ঘরের রঙের ক্যালকুলেটর",fields:[
["length","দৈর্ঘ্য","ফুট",12],["width","প্রস্থ","ফুট",10],["height","উচ্চতা","ফুট",9],["coats","কোট সংখ্যা","কোট",2],["doors","দরজা","টি",1],["windows","জানালা","টি",2],["coverage","কভারেজ (প্রতি লিটার)","বর্গফুট",100],["price","রঙের দাম (প্রতি লিটার)","৳",650]],extra:true},
"concrete-calculator":{title:"কংক্রিটের ক্যালকুলেটর",fields:[["length","দৈর্ঘ্য","ফুট",20],["width","প্রস্থ","ফুট",12],["depth","পুরুত্ব","ফুট",.5],["dry","শুকনো হিসাবের গুণক","গুণ",1.54],["cement","সিমেন্টের অনুপাত","অংশ",1],["sand","বালির অনুপাত","অংশ",2],["stone","পাথর/খোয়ার অনুপাত","অংশ",4]]},
"cement-calculator":{title:"সিমেন্টের ক্যালকুলেটর",fields:[["volume","ভেজা আয়তন","ঘনফুট",100],["dry","শুকনো হিসাবের গুণক","গুণ",1.54],["cement","সিমেন্টের অনুপাত","অংশ",1],["sand","বালির অনুপাত","অংশ",2],["stone","পাথর/খোয়ার অনুপাত","অংশ",4]]},
"sand-calculator":{title:"বালির ক্যালকুলেটর",fields:[["volume","ভেজা আয়তন","ঘনফুট",100],["dry","শুকনো হিসাবের গুণক","গুণ",1.54],["cement","সিমেন্টের অনুপাত","অংশ",1],["sand","বালির অনুপাত","অংশ",2],["stone","পাথর/খোয়ার অনুপাত","অংশ",4]]},
"brick-calculator":{title:"ইটের ক্যালকুলেটর",fields:[["length","দেয়ালের দৈর্ঘ্য","ফুট",20],["height","দেয়ালের উচ্চতা","ফুট",10],["thickness","দেয়ালের পুরুত্ব","ইঞ্চি",5],["brickL","ইটের দৈর্ঘ্য","ইঞ্চি",10],["brickW","ইটের প্রস্থ","ইঞ্চি",5],["brickH","ইটের উচ্চতা","ইঞ্চি",3],["waste","অপচয়","%",5]]},
"tile-calculator":{title:"টাইলসের ক্যালকুলেটর",fields:[["length","মেঝের দৈর্ঘ্য","ফুট",20],["width","মেঝের প্রস্থ","ফুট",12],["tileL","টাইলসের দৈর্ঘ্য","ইঞ্চি",24],["tileW","টাইলসের প্রস্থ","ইঞ্চি",24],["waste","অপচয়","%",10]]},
"plaster-calculator":{title:"প্লাস্টারের ক্যালকুলেটর",fields:[["length","দেয়ালের দৈর্ঘ্য","ফুট",20],["height","দেয়ালের উচ্চতা","ফুট",10],["thickness","পুরুত্ব","ইঞ্চি",.5],["dry","শুকনো হিসাবের গুণক","গুণ",1.33],["cement","সিমেন্টের অনুপাত","অংশ",1],["sand","বালির অনুপাত","অংশ",4]]},
"floor-area-calculator":{title:"মেঝের আয়তন ক্যালকুলেটর",fields:[["length","দৈর্ঘ্য","ফুট",20],["width","প্রস্থ","ফুট",12]]}
};

function bn(n:number,d=2){return n.toLocaleString("bn-BD",{maximumFractionDigits:d});}
export default function CalculatorForm({id}:{id:CalculatorId}){
 const c=cfg[id], initial=Object.fromEntries(c.fields.map((x:any)=>[x[0],x[3]])); const [v,setV]=useState<any>(initial); const [r,setR]=useState<any>(null);
 function calc(){
  let out:any[]=[]; let note="";
  if(id==="paint-calculator"){const wall=2*(v.length+v.width)*v.height; const open=v.doors*3*7+v.windows*4*4; const area=Math.max(0,wall-open); const litres=area*v.coats/v.coverage; const total=litres*1.1; out=[["দেয়ালের মোট ক্ষেত্রফল",bn(wall)+" বর্গফুট"],["সিলিং ক্ষেত্রফল",bn(v.length*v.width)+" বর্গফুট"],["দরজা-জানালা বাদ",bn(open)+" বর্গফুট"],["রঙযোগ্য ক্ষেত্রফল",bn(area)+" বর্গফুট"],["প্রয়োজনীয় রং",bn(total,1)+" লিটার"],["আনুমানিক খরচ","৳ "+bn(total*v.price,0)]]; note="দরজার মাপ ৩×৭ ফুট এবং জানালার মাপ ৪×৪ ফুট ধরে নেওয়া হয়েছে। প্রকৃত মাপ অনুযায়ী ফলাফল পরিবর্তন করুন।"}
  else if(id==="floor-area-calculator"){const a=v.length*v.width;out=[["মোট ক্ষেত্রফল",bn(a)+" বর্গফুট"],["মোট ক্ষেত্রফল",bn(a*.092903,2)+" বর্গমিটার"]];note="ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ।"}
  else if(id==="tile-calculator"){const a=v.length*v.width,t=(v.tileL*v.tileW)/144,n=Math.ceil(a/t*(1+v.waste/100));out=[["মেঝের মোট ক্ষেত্রফল",bn(a)+" বর্গফুট"],["একটি টাইলসের ক্ষেত্রফল",bn(t,3)+" বর্গফুট"],["প্রয়োজনীয় টাইলস",bn(n,0)+" টি"]];note="কাটাকাটি ও ভাঙার জন্য আপনার দেওয়া অপচয়ের হার যোগ করা হয়েছে।"}
  else if(id==="brick-calculator"){const wall=v.length*v.height*(v.thickness/12), brick=(v.brickL*v.brickW*v.brickH)/1728, n=Math.ceil(wall/brick*1.25*(1+v.waste/100));out=[["দেয়ালের আয়তন",bn(wall)+" ঘনফুট"],["একটি ইটের আয়তন",bn(brick,4)+" ঘনফুট"],["প্রয়োজনীয় ইট",bn(n,0)+" টি"]];note="মর্টারের জন্য ২৫% এবং আপনার দেওয়া অপচয়ের হার ধরে আনুমানিক হিসাব করা হয়েছে।"}
  else if(id==="plaster-calculator"){const a=v.length*v.height,wet=a*(v.thickness/12),dry=wet*v.dry,parts=v.cement+v.sand,cement=dry*v.cement/parts,sand=dry*v.sand/parts;out=[["প্লাস্টারের ক্ষেত্রফল",bn(a)+" বর্গফুট"],["প্লাস্টারের আয়তন",bn(wet,2)+" ঘনফুট"],["সিমেন্ট",bn((cement*.0283168)/.0347,1)+" ব্যাগ"],["বালি",bn(sand)+" ঘনফুট"]];note="পুরুত্ব, শুকনো হিসাবের গুণক এবং ১:৪ অনুপাত আপনার ইনপুট অনুযায়ী ধরা হয়েছে।"}
  else {const vol=id==="concrete-calculator"?v.length*v.width*v.depth:v.volume;const dry=vol*v.dry,parts=v.cement+v.sand+v.stone,cement=dry*v.cement/parts,sand=dry*v.sand/parts,stone=dry*v.stone/parts;out=[["ভেজা কংক্রিটের আয়তন",bn(vol)+" ঘনফুট"],["সিমেন্ট",bn((cement*.0283168)/.0347,1)+" ব্যাগ"],["বালি",bn(sand)+" ঘনফুট"],["পাথর/খোয়া",bn(stone)+" ঘনফুট"]];note="শুকনো হিসাবের গুণক ও মিশ্রণের অনুপাত আপনার ইনপুট অনুযায়ী ধরা হয়েছে। এটি প্রকৌশলগত নকশার বিকল্প নয়।"}
  setR({out,note});
 }
 return <div className="soft-card p-5 md:p-8 grid lg:grid-cols-[1.08fr_.92fr] gap-7">
  <div><div className="grid sm:grid-cols-2 gap-x-5 gap-y-5">{c.fields.map((f:any)=><label key={f[0]} className="grid gap-2"><span className="font-bold text-[16px]">{f[1]}</span><span className="input-box"><input type="number" min="0" step="any" value={v[f[0]]} onChange={e=>setV({...v,[f[0]]:Number(e.target.value)})} aria-label={f[1]}/><span className="input-unit">{f[2]}</span></span></label>)}</div>{c.extra&&<div className="mt-5 rounded-2xl bg-[#f6f2e9] border border-[#e6ded2] px-4 py-3 flex items-center gap-3"><span className="text-xl">☑</span><span className="font-bold">ছাদ/সিলিং-এ রং করা হবে</span></div>}<button onClick={calc} className="mt-5 w-full rounded-2xl bg-[#146b48] text-white py-4 font-black text-lg hover:bg-[#0b5b3d]">হিসাব করুন</button></div>
  <div className="rounded-[28px] bg-[#f6f2e9] p-6 md:p-7 min-h-[350px]"><div className="text-[#146b48] font-black text-xl">ফলাফল</div>{!r?<div className="h-[290px] grid place-items-center text-center text-[#8a8279]"><div><div className="font-bold text-lg">আপনার হিসাব এখানে দেখা যাবে</div><p className="text-sm mt-1">তথ্যগুলো পূরণ করে হিসাব করুন।</p></div></div>:<><div className="mt-4 grid">{r.out.map((x:any,i:number)=><div key={i} className="py-4 border-b border-[#e3dbcf] flex justify-between gap-4"><span className={i===r.out.length-2?"font-bold":""}>{x[0]}</span><strong className={i>=r.out.length-2?"text-[#146b48]":""}>{x[1]}</strong></div>)}</div><p className="text-sm text-[#7b7369] leading-6 mt-5">{r.note}</p><div className="flex gap-2 mt-5"><button onClick={()=>navigator.clipboard?.writeText(r.out.map((x:any)=>x.join(": ")).join("\\n"))} className="rounded-xl bg-white border border-[#ddd4c7] px-4 py-2 font-bold">ফলাফল কপি করুন</button><button onClick={()=>setR(null)} className="rounded-xl bg-white border border-[#ddd4c7] px-4 py-2 font-bold">নতুন করে হিসাব</button></div></>}</div>
 </div>
}
