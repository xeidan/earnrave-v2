import { BookOpen, Blocks, GraduationCap, Rocket, Brain, type LucideIcon } from "lucide-react";
import type { Product } from "@/providers/ProductProvider";
export const products: {id:Product;title:string;label:string;icon:LucideIcon;href:string;description:string}[] = [
{id:"journal",title:"Journal",label:"Trading Journal",icon:BookOpen,href:"#journal",description:"Turn every trade into useful feedback."},
{id:"funding",title:"Funding",label:"Funding",icon:Rocket,href:"#funding",description:"Get ready for your next evaluation."},
{id:"academy",title:"Academy",label:"Academy",icon:GraduationCap,href:"#academy",description:"Build skill with structured learning."},
{id:"tools",title:"Tools",label:"Trading Tools",icon:Blocks,href:"#tools",description:"Plan risk and make decisions clearly."},
{id:"ai",title:"AI Coach",label:"AI Coach",icon:Brain,href:"#ai-coach",description:"Review your process with AI support."}];
