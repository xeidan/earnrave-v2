import type { Product } from "@/providers/ProductProvider";
export const navigation: Record<Product,{product:string;items:{label:string;href:string}[]}> = {
journal:{product:"Journal",items:[{label:"Features",href:"#features"},{label:"Analytics",href:"#analytics"},{label:"How it works",href:"#workflow"},{label:"Pricing",href:"#pricing"}]},
funding:{product:"Funding",items:[{label:"Challenges",href:"#funding"},{label:"Preparation",href:"#workflow"},{label:"Resources",href:"#academy"},{label:"Pricing",href:"#pricing"}]},
academy:{product:"Academy",items:[{label:"Learning paths",href:"#academy"},{label:"Lessons",href:"#features"},{label:"Community",href:"#community"},{label:"Pricing",href:"#pricing"}]},
tools:{product:"Tools",items:[{label:"Calculators",href:"#tools"},{label:"Risk planner",href:"#tools"},{label:"Analytics",href:"#analytics"},{label:"Pricing",href:"#pricing"}]},
ai:{product:"AI Coach",items:[{label:"Trade review",href:"#ai-coach"},{label:"Insights",href:"#analytics"},{label:"Workflow",href:"#workflow"},{label:"Pricing",href:"#pricing"}]}};
