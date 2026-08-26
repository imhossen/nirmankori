"use client";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { calculators, articles } from "../lib/site";

export default function GlobalSearch(){
  const [q,setQ]=useState("");
  const results=useMemo(()=>{
    const term=q.trim().toLowerCase();
    if(!term) return [];
    return [
      ...calculators.map(c=>({type:"ক্যালকুলেটর",title:c.name,desc:c.desc,href:"/"+c.id})),
      ...articles.map(a=>({type:"গাইড",title:a.title,desc:a.desc,href:"/articles/"+a.slug}))
    ].filter(x=>(x.title+x.desc).toLowerCase().includes(term)).slice(0,7);
  },[q]);
  return <div className="relative hidden md:block w-[250px] lg:w-[300px]">
    <div className="input-box h-11 rounded-xl"><Search size={18} className="ml-3 text-[var(--muted)]"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="কী হিসাব করতে চান?" aria-label="ক্যালকুলেটর খুঁজুন" className="!py-2 !px-3"/>{q&&<button onClick={()=>setQ("")} aria-label="খোঁজ বন্ধ করুন" className="mr-2"><X size={16}/></button>}</div>
    {q&&<div className="absolute top-12 left-0 right-0 rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-xl p-2 z-50">
      {results.length?results.map(x=><Link key={x.href} href={x.href} onClick={()=>setQ("")} className="block rounded-xl p-3 hover:bg-[var(--surface)]"><div className="text-xs font-bold text-[var(--green)]">{x.type}</div><div className="font-bold text-sm mt-0.5">{x.title}</div></Link>):<div className="p-4 text-sm text-[var(--muted)]">কোনো মিল পাওয়া যায়নি।</div>}
    </div>}
  </div>
}
