import type {MetadataRoute} from "next";
import {calculators,articles} from "../lib/site";
export default function sitemap():MetadataRoute.Sitemap{
 const b="https://example.com";
 return [
  {url:b,priority:1},
  {url:b+"/articles",priority:.8},
  {url:b+"/project",priority:.8},
  {url:b+"/construction-cost-calculator",priority:.9},
  {url:b+"/report",priority:.5},
  ...calculators.map(c=>({url:b+"/"+c.id,priority:.9})),
  ...articles.map(a=>({url:b+"/articles/"+a.slug,priority:.7}))
 ];
}
