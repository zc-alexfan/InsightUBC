import Query from "./Query";
import {Transform} from "stream";
/**
 * Created by Nyanko on 3/2/2017.
 */

export default class TransformQuery {

    static APPLY:any = {
        "MAX": (list: number[]): number=>{
            // // console.log("in MAX!!!!");
            // // console.log(list);
            let max: number = list[0];
            for (let n of list){
                if (n>max){
                    max = n;
                }
            }
            return max;
        },
        "MIN": (list: number[]): number=>{
            let min: number = list[0];
            for (let n of list){
                if (n<min){
                    min = n;
                }
            }
            return min;
        },
        "AVG": (list: number[]): number=>{
            //return number rounded to two decimals
            let sum: number = 0;
            for (let n of list){
                n = n * 10;
                n = Number(n.toFixed(0));
                sum +=n;
            }
            let avg:number = sum / list.length;
            avg = avg / 10;
            avg = Number(avg.toFixed(2));
            return avg;
        },
        "COUNT": (list: any[]): number=>{
            // console.log("IN COUNT: ");
            // console.log(list);
            let set: Set<any> = new Set(list);
            return set.size;
        },
        "SUM": (list: number[]): number=>{
            let total: number = 0;
            for (let n of list){
                total +=n;
            }
            return total;
        }
    };
    static transform(json: any, transformation: any, options:any): any{
        if (!(transformation)){
            // console.log("no transformation");
            return json;
        }
        // console.log(json);
        let columns: string[] = options["COLUMNS"];
        let newEntries: any;
        //note that json is already constructed with columns (from groups as well)
        let diffSet: Set<string> = Query.difference(new Set(columns),new Set(transformation["GROUP"]));
        newEntries = TransformQuery.group(json["result"],transformation["GROUP"],Array.from(diffSet));
        // console.log("entries after grouping!: ");
        // console.log()
        // Query.prettyPrint(newEntries);
        let new_applies : any[] = [];
        for (let i of transformation["APPLY"]){
            let key : string = Object.keys(i)[0];
            if (columns.indexOf(key) != -1){
                new_applies.push(i);
            }
        }
        console.log("apply in transform:"+JSON.stringify(new_applies));
        newEntries = TransformQuery.apply(newEntries, new_applies);

        let new_columns: string[] = TransformQuery.reorder(transformation["GROUP"],transformation["APPLY"]);
        // console.log("new columns afte reorder: "+new_columns);
        new_columns = Query.intersect(new Set(new_columns), new Set(columns));
        // console.log("new columns afte intersect: "+Array.from(new_columns));
        newEntries = TransformQuery.pickColumns(newEntries, Array.from(new_columns));

        json["result"] = newEntries;
        return json;
    }

    static reorder(groups:string[],apply:any[]):string[]{
        let new_cols : string[] = [];
        new_cols = new_cols.concat(groups);
        for (let i of apply){
            let k : string = Object.keys(i)[0];
            new_cols.push(k);
        }
        // console.log(new_cols);
        return new_cols;
    }


    private static group(json:any,groupKeys:string[],diffSet:string[]):any{
        let groups : Set<any> = new Set();
        let count: number = 0;
        let map : Map<string,number> = new Map<string,number>();
        let grouped_entries : any = [];

        // groups = TransformQuery.consGroup(groups,groupKeys,json);
        // console.log(Array.from(groups));
        for (let i in json){
            // console.log(json[i]);
            // console.log(groupKeys[0]);
            let unique_key :string = "";
            for (let k of groupKeys){
                unique_key +=String(json[i][k]);
            }
            // console.log(unique_key);
            if (groups.has(unique_key)){
                let index : number = map.get(unique_key);
                // // console.log(diffSet);
                if (diffSet && diffSet.length > 0) {
                    // console.log("already has this group, index is ;"+index);
                    for (let j of diffSet) {
                        // console.log(j);
                        let original: any = grouped_entries[index][j];
                        // console.log(original);
                        if (original) {
                            if (!( original instanceof Array)) {
                                let tmp: any = [];
                                tmp.push(original);
                                grouped_entries[index][j] = tmp;
                            }
                            grouped_entries[index][j].push(json[i][j]);
                            // console.log(grouped_entries[index][j]);
                        }
                        // else{
                        //     console.log("CANNOT parse original!!!!");
                        // }
                    }
                }
            }
            else{
                map.set(unique_key,count);
                count++;
                groups.add(unique_key);
                grouped_entries.push(json[i]);
            }
        }
        return grouped_entries;
    }

    // private static isInGroup(groups: Set<any>, potential_member:Set<any>):boolean{
    //     let groupsArray = Array.from(groups);
    //     for (let member of groupsArray){
    //         let diff: Set<any> = Query.difference(member, potential_member);
    //         if (diff.size == 0){
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // private static getIdFromUniqueSet(list:any[],key:Set<any>):number{
    //     for (let i in list){
    //         let diff: Set<any> = Query.difference(list[i]["set"],key);
    //         if (diff.size == 0){
    //             return Number(i);
    //         }
    //     }
    //     return -1;
    // }

    private static apply(json:any,applyKeys:any):any{
        // console.log("in apply: ");
        // console.log(json);
        // console.log("APPLYKEYS are: "+JSON.stringify(applyKeys));
        let key : any = applyKeys[0];
        if (key == undefined){
            return json;
        }
        //construct a single column array
        let outer_key: any = Object.keys(key)[0];
        let tokenKeyPair: any = key[outer_key];
        let token: string = Object.keys(tokenKeyPair)[0];
        let inner_key: string = tokenKeyPair[token];
        // console.log(json);
        let column: any = [];
        for (let i in json) {
            // console.log("for every json, pushing this unto column: ");
            // console.log(json[i][outer_key][inner_key]);
            let inner_array: any[] = [];
            if (json[i][outer_key] instanceof Array) {
                //here is something that needs APPLY
                for (let value of json[i][outer_key]) {
                    inner_array.push(value[inner_key]);
                }
            }
            else {
                inner_array.push(json[i][outer_key][inner_key]);
            }
            // console.log("token in apply: " + token);
            json[i][outer_key] = TransformQuery.APPLY[token](inner_array);
        }
        // for (let i in json){
        //    json[i][outer_key] = TransformQuery.APPLY[token](column);
        // }
        return TransformQuery.apply(json, applyKeys.slice(1));
    }

    // public static extractApplyKeys(apply: any): string[]{
    //     let keys: string[] = [];
    //     for (let i of apply){
    //         keys.push(Object.keys(i)[0]);
    //     }
    //     return keys;
    // }

    private static pickColumns(list: any[], columns: string[]): any[]{
        let new_entries : any[] = [];
        for (let item of list){
            let new_item : any = {};
            for (let c of columns){
                new_item[c] = item[c];
            }
            new_entries.push(new_item);
        }
        return new_entries;
    }
}
