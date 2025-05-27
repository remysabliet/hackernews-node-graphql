import { Context } from './index.js';
export interface ResolverParent {
    id: number;
    [key: string]: any;
}
export interface ResolverArgs {
    id?: string | number;
    url?: string;
    description?: string;
    name?: string;
    email?: string;
    password?: string;
    [key: string]: any;
}
export interface ResolverInfo {
    fieldName: string;
    [key: string]: any;
}
export type ResolverFn = (parent: ResolverParent, args: ResolverArgs, context: Context, info: ResolverInfo) => Promise<any> | any;
export interface ResolverMap {
    [key: string]: {
        [key: string]: ResolverFn;
    };
}
