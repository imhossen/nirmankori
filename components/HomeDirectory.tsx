"use client";

import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {
  Paintbrush, Blocks, BrickWall, Construction, Grid2X2, Layers3,
  SquareDashed, Waves, Calculator, Star
} from "lucide-react";
import {calculators, CalculatorMeta} from "../lib/site";
import FavoriteButton from "./FavoriteButton";

const iconMap:Record<string,any>={
  Paintbrush, Blocks, BrickWall, Construction, Grid2X2, Layers3,
  SquareDashed, Waves, Calculator
};

function CalcIcon({name}:{name:string}){
  const Icon=iconMap[name]||Calculator;
  return <span className="w-11 h-11 rounded-2xl bg-[var(--green-soft)] text-[var(--green)] grid place-items-center shrink-0"><Icon size={22}/></span>;
}

export default function HomeDirectory(){
  const [fav,setFav]=useState<string[]>([]);
  const [recent,setRecent]=useState<string[]>([]);
  function load(){
    setFav(JSON.parse(localStorage.getItem("nirman-favorites")||"[]"));
    setRecent(JSON.parse(localStorage.getItem("nirman-recent")||"[]"));
  }
  useEffect(()=>{
    load();
    addEventListener("nirman-favorites",load);
    addEventListener("nirman-recent",load);
    return()=>{removeEventListener("nirman-favorites",load);removeEventListener("nirman-recent",load)}
  },[]);
  const favs=useMemo(()=>calculators.filter(c=>fav.includes(c.id)),[fav]);
  const recs=useMemo(()=>recent.map(id=>calculators.find(c=>c.id===id)).filter(Boolean).slice(0,4) as CalculatorMeta[],[recent]);

  return <section id="calculators" className="container py-16">
    <div className="flex items-end justify-between gap-4">
      <div><p className="text-[var(--green)] font-bold">জনপ্রিয় ক্যালকুলেটর</p><h2 className="text-3xl md:text-4xl font-black mt-1">প্রয়োজনীয় হিসাব এক জায়গায়</h2></div>
      {(favs.length>0||recs.length>0)&&<span className="text-sm text-[var(--muted)]">আপনার পছন্দ ও সাম্প্রতিক হিসাব এখানে থাকবে</span>}
    </div>

    {favs.length>0&&<div className="mt-7"><h3 className="font-black mb-3 flex items-center gap-2"><Star size={17}/> আমার প্রিয় হিসাব</h3><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{favs.map(c=><Mini key={c.id} c={c}/>)}</div></div>}
    {recs.length>0&&<div className="mt-7"><h3 className="font-black mb-3">🕘 সম্প্রতি ব্যবহার করেছেন</h3><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{recs.map(c=><Mini key={c.id} c={c}/>)}</div></div>}

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
      {calculators.map(c=><div key={c.id} className="soft-card lift p-5 relative">
        <div className="absolute right-4 top-4"><FavoriteButton id={c.id}/></div>
        <Link href={'/'+c.id} className="block">
          <CalcIcon name={c.icon}/>
          <h3 className="font-black text-lg mt-4 pr-10">{c.name}</h3>
          <p className="text-sm text-[var(--muted)] leading-6 mt-2">{c.desc}</p>
        </Link>
      </div>)}
    </div>
  </section>
}
function Mini({c}:{c:CalculatorMeta}){return <Link href={'/'+c.id} className="soft-card p-4 flex items-center gap-3"><CalcIcon name={c.icon}/><span className="font-bold text-sm">{c.name}</span></Link>}
