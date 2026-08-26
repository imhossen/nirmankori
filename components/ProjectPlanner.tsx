"use client";
import Link from "next/link";
import { Trash2, Plus, FileText } from "lucide-react";
import { useEffect, useState } from "react";

type Item={id:string,title:string,quantity?:string,cost?:number,at?:string};
type Project={name:string,items:Item[],updated:string};
const KEY="nirman-project";
function money(n:number){return "৳ "+n.toLocaleString("bn-BD",{maximumFractionDigits:0});}
export default function ProjectPlanner(){
 const [project,setProject]=useState<Project>({name:"আমার নতুন বাড়ি",items:[],updated:new Date().toISOString()});
 const [editing,setEditing]=useState(false);
 useEffect(()=>{try{const x=JSON.parse(localStorage.getItem(KEY)||"null");if(x)setProject(x)}catch{}},[]);
 function save(next:Project){setProject(next);localStorage.setItem(KEY,JSON.stringify(next));}
 function remove(i:number){save({...project,items:project.items.filter((_,idx)=>idx!==i),updated:new Date().toISOString()})}
 const total=project.items.reduce((s,x)=>s+(x.cost||0),0);
 return <div className="container py-10 md:py-14">
   <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[var(--green)] font-bold">প্রজেক্ট পরিকল্পনা</p><h1 className="text-3xl md:text-4xl font-black mt-1">🏠 আমার প্রজেক্ট</h1><p className="text-[var(--muted)] mt-2">বিভিন্ন ক্যালকুলেটরের ফলাফল এক জায়গায় রেখে মোট আনুমানিক খরচ দেখুন।</p></div><Link href="/construction-cost-calculator" className="rounded-xl bg-[var(--green)] text-white px-4 py-2.5 font-bold">নির্মাণ খরচ হিসাব</Link></div>
   <div className="soft-card p-5 mt-7"><div className="flex items-center gap-3"><input value={project.name} onChange={e=>setProject({...project,name:e.target.value})} onBlur={()=>save({...project,updated:new Date().toISOString()})} className="text-xl font-black bg-transparent border-b border-[var(--line)] outline-none py-1 w-full max-w-md" aria-label="প্রজেক্টের নাম"/><button onClick={()=>save({...project,updated:new Date().toISOString()})} className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm font-bold">সংরক্ষণ</button></div></div>
   <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-6"><div className="soft-card p-5 md:p-7"><div className="flex justify-between items-center"><h2 className="font-black text-xl">উপকরণ ও হিসাব</h2><Link href="/#calculators" className="text-[var(--green)] font-bold flex gap-1 items-center"><Plus size={17}/> হিসাব যোগ করুন</Link></div>{project.items.length===0?<div className="py-16 text-center text-[var(--muted)]">এখনও কোনো হিসাব যোগ করা হয়নি।<div className="mt-4"><Link href="/#calculators" className="inline-flex rounded-xl bg-[var(--green)] text-white px-4 py-2 font-bold">ক্যালকুলেটর দেখুন</Link></div></div>:<div className="mt-4">{project.items.map((x,i)=><div key={i} className="py-4 border-b border-[var(--line)] flex items-center justify-between gap-4"><div><div className="font-bold">{x.title}</div>{x.quantity&&<div className="text-sm text-[var(--muted)] mt-1">{x.quantity}</div>}</div><div className="flex items-center gap-3"><b className="text-[var(--green)]">{typeof x.cost==="number" && x.cost>0?money(x.cost):"—"}</b><button onClick={()=>remove(i)} aria-label="হিসাব মুছুন" className="p-2 rounded-lg hover:bg-[var(--surface)] text-[var(--muted)]"><Trash2 size={17}/></button></div></div>)}</div>}</div>
   <aside className="soft-card p-6 h-fit lg:sticky lg:top-24"><div className="text-sm text-[var(--muted)]">মোট আনুমানিক খরচ</div><div className="text-3xl font-black text-[var(--green)] mt-1">{money(total)}</div><p className="text-xs text-[var(--muted)] leading-5 mt-3">শুধু যেসব হিসাবের সঙ্গে খরচ আছে সেগুলো মোটের মধ্যে ধরা হয়েছে।</p><Link href="/report" className="mt-5 w-full rounded-xl border border-[var(--line)] px-4 py-3 font-bold flex items-center justify-center gap-2"><FileText size={17}/> রিপোর্ট দেখুন / PDF</Link></aside></div>
 </div>
}
