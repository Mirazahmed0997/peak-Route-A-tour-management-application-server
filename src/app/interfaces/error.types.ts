



export interface TErrorSources{
    path:string;
    message:string
}

export interface TGenericErrorRes{
    statusCode: number;
    message: string;
    errorSources?: TErrorSources[]

}
