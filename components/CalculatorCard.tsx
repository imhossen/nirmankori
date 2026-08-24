
import Link from "next/link";
import { ArrowUpRight, Blocks, BrickWall, Calculator, Construction, Grid2X2, Layers3, Paintbrush, SquareDashed, Waves } from "lucide-react";
import type { Calculator } from "../lib/calculators";

const icons:any={Paintbrush,Blocks,Construction,Waves,BrickWall,Grid2X2,Layers3,SquareDashed};
export default function CalculatorCard({c}:{c:Calculator}) {
  const Icon=icons[c.icon]||Calculator;
  return <Link href={"/"+c.id} className="card lift p-5 block">
    <div className="flex justify-between gap-3">
      <span className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 grid place-items-center"><Icon size={23}/></span>
      <ArrowUpRight size={20} className="muted"/>
    </div>
    <h3 className="font-bold text-lg mt-5">{c.name}</h3>
    <p className="muted text-sm mt-2 leading-6">{c.description}</p>
  </Link>
}
