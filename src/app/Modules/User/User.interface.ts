import { Types } from "mongoose";

export enum Role{
    SUPER_ADMIN="SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER  = "USER",
    GUIDE ="GUIDE"
}

export enum isActive{
    ACTIVE= "ACTIVE",
    INACTIVE="INACTIVE",
    BLOCKED="BLOCKED"
}

export interface IauthProvider{
    provider:"google"|"credentials";  //Google,credentials
    providerId: string
} 

export interface Iuser{
    name: string;
    email: string;
    password? :string;
    phone?: string;
    picture?:string;
    address?: string;
    isDeleted?:string;
    isActive?:isActive;
    isVerified?:boolean
    role: Role;
   
    auths:  IauthProvider[];
    booking?: Types.ObjectId[];
    guide?:Types.ObjectId[];
}