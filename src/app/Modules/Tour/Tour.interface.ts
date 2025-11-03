import { Types } from "mongoose";


export interface ITour{
    title: string;
    slug: string;
    decription?: string;
    images?:string[];
    description?:string;
    costFrom?:number;
    startDate?: Date;
    endDate?: Date;
    included?: string[];
    exCluded?: string[];
    amenities?:string[];
    tourPlan?: string[];
    maxGuest?: number;
    minAge?: number;
    division: Types.ObjectId
    tourType: Types.ObjectId
}