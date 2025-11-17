import { Query } from "mongoose";
import { excludFields } from "../globalConstants";
import { searchFields } from "../Modules/Tour/Tour.constant";

export class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public readonly query: Record<string, string>

    constructor(modelquery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelquery;
        this.query = query
    }

    filter(): this {
        const filter = { ...this.query }
        for (const field of excludFields) {
            delete filter[field]
        }

        this.modelQuery=this.modelQuery.find(filter)
            return this
        
    }

    search(searchableField:string[]): this{
        const searchTerm=this.query.searchTerm || ""
         const searchQuery={
       $or: searchFields.map(field=>({[field]: { $regex: searchTerm, $options: "i" } }))
    } 
    this.modelQuery=this.modelQuery.find(searchQuery)
        return this
    }
}