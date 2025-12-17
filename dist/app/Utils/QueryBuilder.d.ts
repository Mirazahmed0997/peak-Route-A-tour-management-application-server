import mongoose, { Query } from "mongoose";
export declare class QueryBuilder<T> {
    modelQuery: Query<T[], T>;
    readonly query: Record<string, string>;
    constructor(modelquery: Query<T[], T>, query: Record<string, string>);
    filter(): this;
    search(searchableFields: string[]): this;
    sort(): this;
    fields(): this;
    paginate(): this;
    build(): mongoose.Query<T[], T, {}, unknown, "find", Record<string, never>>;
    getMeta(): Promise<{
        page: number;
        limit: number;
        totalPage: number;
        total: number;
    }>;
}
//# sourceMappingURL=QueryBuilder.d.ts.map