// job-hierarchy.interface.ts
export interface WorksyTask { name: string; slug?: string; id?: string|number; }
export interface WorksySubcategory { name: string; slug?: string; tasks: WorksyTask[]; }
export interface WorksyCategory { category: string; slug?: string; subcategories: WorksySubcategory[]; }
export interface WorksyCatalog { version?: number; catalog: { services: WorksyCategory[] }; }
