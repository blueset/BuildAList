import { TelegrafContext } from "telegraf/typings/context";

declare module "telegraf/typings/context" {
    export interface TelegrafContext {
        strings: {
            [key: string]: string;
        } | undefined;
    }
}