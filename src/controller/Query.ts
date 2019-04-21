import IOProcessing from "./IOProcessing";
import TransformQuery from "./TransformQuery";
/**
 * Created by zfan on 2017-01-21.
 */


export default class Query {

    missingDependencies: string [] = [];
    isUniqueID: boolean = true;
    uniqueID: string = "";
    validNumberKey: string[] = ["rooms_lat", "rooms_lon", "rooms_seats", "courses_avg", "courses_pass", "courses_fail", "courses_audit", "courses_year", "courses_sectionSize"];
    validStringKey: string[] = ["rooms_fullname", "rooms_shortname", "rooms_number", "rooms_name", "rooms_address", "rooms_type", "rooms_furniture", "rooms_href", "courses_dept", "courses_id", "courses_instructor", "courses_title", "courses_uuid"];
    columnKeys: any = new Set([]);
    //and also store the initial key to see if they are from the same set?
    //take out all the keys inside a query and compare them

    static union: any = function (set1: Set<number>, set2: Set<number>): Set<number> {
        let set: Set<number> = new Set<number>(set1);
        set2.forEach((x: number) => {
            set.add(x);
        });
        return set;
    };

    static setToArray: any = function (set: Set<any>) {
        let A: any[] = [];
        set.forEach(
            (x: any) => {
                A.push(x);
            }
        );
        return A;
    };

    //TODO might change it back
    static intersect: any = function (set1: Set<any>, set2: Set<any>): Set<any> {
        let set: Set<any> = new Set<any>();
        set1.forEach(
            (x: any) => {
                if (set2.has(x)) set.add(x);
            }
        );
        return set;
    };

    static difference: any = function (set1: Set<any>, set2: Set<any>): Set<any> {
        let set: Set<any> = new Set<any>();
        set1.forEach(
            (x: any) => {
                if (!set2.has(x)) set.add(x);
            }
        );
        return set;
    };

    static NODES = {
        "GT": (x: number, y: number): boolean => {
            return x > y;
        },
        "EQ": (x: number, y: number): boolean => {
            return x == y;
        },
        "LT": (x: number, y: number): boolean => {
            return x < y;
        },
        "IS": (x: string, pattern: string): boolean => {
            //exact match, even though for null and undefined
            if (x == pattern)return true;
            if (x == undefined || pattern == undefined)return false;

            //generate regular expression
            if (pattern[0] == '*' && pattern[pattern.length - 1] == '*') {
                pattern = '.' + pattern;
                pattern = pattern.substr(0, pattern.length - 1);
                pattern = pattern + '.*';
            } else if (pattern[0] == '*' && pattern[pattern.length - 1] != '*') {
                pattern = '.' + pattern;
                pattern = pattern + '$';
            } else if (pattern[0] != '*' && pattern[pattern.length - 1] == '*') {
                pattern = '^' + pattern;
                pattern = pattern.substr(0, pattern.length - 1);
                pattern = pattern + '.*';
            } else {
                return pattern == x;
            }

            let reg = new RegExp(pattern);
            let result = x.match(reg);
            return result != null;
        },
        "AND": (set1: Set<number>, set2: Set<number>): Set<number> => {
            return Query.intersect(set1, set2);
        },
        "OR": (set1: Set<number>, set2: Set<number>): Set<number> => {
            return Query.union(set1, set2);
        }
    };

    static minus: any = function (set1: Set<number>, set2: Set<number>): Set<number> {
        let set: Set<number> = new Set<number>();
        set1.forEach(
            (x: number) => {
                if (!set2.has(x)) {
                    set.add(x);
                }
            }
        );
        return set;
    };


    // //extract ids including the filter and options
    // //ID: all ids such as courses, rooms, not the row ID!!!!!!!!!!!!!!!!!!
    // static mainExtractIDFromQuery(query:any):string[]{
    //
    //     let ids:string[] = [];
    //     let filter = query['WHERE'];
    //     Query.extractIDFromQuery(filter, ids);
    //
    //     //TODO add TRANSFORMATION
    //
    //     let cols:string[] = query['OPTIONS']['COLUMNS'];
    //
    //     cols.map(
    //         (x:string)=>{
    //             let y = Query.idExtractorStr(x);
    //             if(ids.indexOf(y) == -1){
    //                 ids.push(y);
    //             }
    //         }
    //     );
    //
    //     let order = query['OPTIONS']['ORDER'];
    //     if (order && order.hasOwnProperty('dir') && order.hasOwnProperty('keys')){
    //         order = order['keys'];
    //         let orderList : any = order;
    //         // // //// console.log(order.length);
    //         for (let key in orderList) {
    //             // //// console.log("before extraction: "+orderList[key]);
    //             order = Query.idExtractorStr(orderList[key]);
    //             // // //// console.log("after extraction: "+order);
    //             if (order != undefined && order != null && ids.indexOf(order) == -1) {
    //                 // // //// console.log(order);
    //                 ids.push(order);
    //             }
    //         }
    //     }
    //     else {
    //         order = Query.idExtractorStr(order);
    //         // // //// console.log("after extraction: "+order);
    //         if(order != undefined && order != null && ids.indexOf(order) == -1){
    //             ids.push(order);
    //         }
    //     }
    //     return ids;
    // }
    //
    //
    // //given a filter json from the query, extract all ids needed inside the query
    // //precondition: the filter should be valid
    // //output: push all ids inside ids
    // static extractIDFromQuery(filter: any, ids:string[]):void{
    //     /*
    //     // //// console.log("\n\n########Welcome to the new layer");
    //     Query.prettyPrint(filter);
    //     */
    //
    //     let keys:string[] = Object.keys(filter);
    //
    //     //get the only key in the JSON
    //     let k:string = keys[0];
    //     //// //// console.log("The key running is: >>" + k + "<<");
    //     let opened:any = filter[k];
    //
    //     if(k == "IS" || k == "GT" || k == "LT"|| k == "EQ"){
    //         let cond_key:string = Object.keys(opened)[0];
    //         let cond_val:any = opened[cond_key];
    //         //// //// console.log("Condition: " + cond_key + " and " + cond_val);
    //         cond_key = Query.idExtractorStr(cond_key);
    //
    //         if(ids.indexOf(cond_key) == -1){ ids.push(cond_key); }
    //         return;
    //     }
    //
    //     if(k == "AND" || k == "OR"){
    //         for(let i = 0; i < opened.length; i++){
    //             if(Object.keys(opened[i]).length > 0){
    //                 Query.extractIDFromQuery(opened[i],ids);
    //             }
    //         }
    //         return;
    //     }
    //
    //     if(k == "NOT"){
    //         Query.extractIDFromQuery(opened, ids);
    //         return ;
    //     }
    //
    // }

    //pretty print a JSON object
    static prettyPrint(json: any): void {
        let js = JSON.stringify(json, null, 2);
        console.log("***" + js + "***");
    }


    //grab indices from a list of JSONs
    //return a list of indices satisfying satisfyCond(x, y)
    //return [], if nothing satisfies
    static grab(key: string, val: any, list: JSON[], satisfyCond: any): Set<number> {
        //extract col from list
        // //// console.log("key is: "+key);
        // //// console.log("val is: "+val);
        // //// console.log("list is: "+list);
        let valList: any[] = list.map(function (js: any) {
            return js[key]
        });
        let ids = new Set<number>();
        for (let i = 0; i < list.length; i++) {
            if (satisfyCond(valList[i], val)) ids.add(i);
        }
        return ids;
    }

    //find entries corresponding to ids in universe
    //and then extract columns, transform info based on options
    //options: a JSON object
    static queryFormalizer(ids: Set<number>, universe: JSON[], options: any, transformation: any): JSON {
        let entries: any[] = [];
        //get matched entries from universe
        // //// console.log("ids are: "+Array.from(ids)); //TODO this is cool
        ids.forEach(
            (x: number) => {
                entries.push(universe[x]);
            }
        );

        //extract columns from entries
        //"columnize" the entries
        let cols: string[] = options["COLUMNS"];
        if (transformation) {
            cols = cols.concat(transformation["GROUP"]);
        }
        let columnizedEntries: JSON[] = [];
        for (let x of entries) {
            let tmp: any = {};
            for (let k of cols) {
                if (x.hasOwnProperty(k)) {
                    tmp[k] = x[k];
                }
                else {
                    tmp[k] = x;
                }
            }
            columnizedEntries.push(tmp);
        }

        //render requirement
        let renderVar: string = options["FORM"];
        //formalize, put things together
        let r: any;
        //result['render'] = render;
        //result['result'] = columnizedEntries;
        r = {render: renderVar, result: columnizedEntries};
        return r;
    }

    /*
     //get a random integers from [a, b] (inclusively)
     static randInt(a:number, b:number):number{
     return Math.floor((Math.random() * b) + a);
     }


     static shuffle(A:any[]):any[]{
     let iters:number = A.length * 10;
     for(let i = 0; i < iters; i++){
     let i1 = Query.randInt(0, A.length-1);
     let i2 = Query.randInt(0, A.length-1);
     let tmp = A[i1]; A[i1] = A[i2]; A[i2] = tmp;
     }
     return A;
     }
     */

    static sortByMultipleKey(columnizedEntries: JSON[], order: any, dir: boolean) {
        // console.log("in sortByMultipleKey: "+JSON.stringify(order));
        let sortedEntries: any;
        let sets: Set<any> = new Set();
        let index: number = 0;
        let map: Map<any,any[]> = new Map<any,any[]>();
        let key: string = order[index];
        if (order && order instanceof Array && order.length == 0) {
            return columnizedEntries;
        }
        //go through the whole sets
        sortedEntries = Query.sortByKey(columnizedEntries, key, dir);
        // Query.prettyPrint(sortedEntries);
        // console.log(sortedEntries.length);
        order = order.slice(1);
        // console.log("new order is: "+order);
        if (order.length == 0) {
            return sortedEntries;
        }
        // if there are more to sort with, put them into groups
        for (let item of sortedEntries) {
            if (sets.has(item[key])) {
                let arr: any[] = map.get(item[key]);
                arr.push(item);
                map.set(item[key], arr);
            }
            else {
                sets.add(item[key]);
                let arr: any [] = [];
                arr.push(item);
                map.set(item[key], arr);
            }
        }
        // console.log("everything is in maps");
        //now sort each groups
        let new_sorted: any[] = [];
        let ite: any = map.values();
        let chunk: any = ite.next().value;
        while (chunk != undefined) {
            chunk = Query.sortByMultipleKey(chunk, order, dir);
            // console.log("returned from recursive call, sorted chunk is now: ");
            // Query.prettyPrint(chunk);
            new_sorted = new_sorted.concat(chunk);
            // console.log("new sorted is now: ");
            // Query.prettyPrint(new_sorted);
            chunk = ite.next().value;
        }
        return new_sorted;
        // while ()
        //     console.log(map[v]);
        // }
        // console.log(map.get(1));
        //     let j: number = Query.findIndexInSets(sets, a[key]);
        //     if ( j === -1){
        //         // // //// console.log("creating a new part in this set: "+a[key]);
        //         obj[a[key]] = [];
        //         obj[a[key]].push(a);
        //         sets.push(obj);
        //     }
        //     else{
        //         // // //// console.log("pushing to existing part: "+a[key]);
        //         sets[j][a[key]].push(a);
        //     }
        // }
        // // sets = Query.sortByKey(sets,key,dir);
        // // Query.prettyPrint(sets);
        // //check if there are another key, if there are, repeat for every sets
        // if (order.length > 1) {
        //     let new_order = order.slice(1);
        //     // // //// console.log("after sorting into sets, let's now sort again with next key:" + new_order + ", key length: "+new_order.length);
        //     for (let i in sets) {
        //         let list: any = sets[i][Object.keys(sets[i])[0]];
        //         let key: string = Object.keys(sets[i])[0];
        //         if (list.length > 1) {
        //             //break tie
        //             // // //// console.log("calling sortByMultipleKey recursively on key: " + key);
        //             sets[i][key] = Query.sortByMultipleKey(sets[i][key], new_order, dir);
        //         }
        //     }
        // }
        // //combine all the sets to make the final result
        // sortedEntries = [];
        // for (let i in sets){
        //     sortedEntries = sortedEntries.concat(sets[i][Object.keys(sets[i])[0]]);
        // }
        // // // //// console.log("SETS");
        // // Query.prettyPrint(sets);
        // return sortedEntries;
    };

    public static debugPrint(str: string) {
        // console.log(str);
    }

    //
    // private static findIndexInSets(sets: any, key: any) {
    //     for (let j in sets){
    //         if (Object.keys(sets[j])[0] === key){
    //             // // //// console.log(j);
    //             return Number(j);
    //         }
    //     }
    //     return -1;
    // }

    //note: sortByKey snippet is modified from
    //http://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects
    static sortByKey(array: any[], key: string, ascend: boolean): any[] {
        if (key === undefined) {
            return array;
        }
        // // console.log(array);
        // // console.log(key);
        let lower: number = -1;
        let upper: number = 1;
        if (!ascend) {
            // // //// console.log("IN SORTBYKEY DESCENDING!!!!");
            lower = 1;
            upper = -1;
        }
        let result: any = array.sort(function (a, b) {
            let x = a[key];
            let y = b[key];
            // // console.log(a[key]);
            // // console.log(b[key]);
            return ((x < y) ? lower : ((x > y) ? upper : 0));
        });
        // console.log(result);
        return result;
    }

    //
    // static idExtractorStr(key:string):string{
    //     if(key == undefined || key == null){ return key; }
    //     let tmp:string = key.substr(0, key.indexOf('_'));
    //     // // //// console.log(tmp);
    //     if (!tmp) {return key};
    //     return tmp;
    // }


    //input: filter, a JSON object
    //       currentDataset, a list of json object to filter
    //output: set of ids of the universe applying the filter
    static queryIDs(filter: any, currentDataset: JSON[]): Set<number> {
        // // console.log("filter looks like "+ JSON.stringify(filter));
        // let a: any = {};
        // // console.log(a.length);
        if (JSON.stringify(filter).trim() === "{}") {
            let universeIDs = Array.from(Array(currentDataset.length).keys());
            let universeSet = new Set<number>(universeIDs);
            return universeSet;
        }
        /*
         // //// console.log("\n\n########Welcome to the new layer");
         Query.prettyPrint(filter);
         */
        // //// console.log("queryIDs dataset is: "+currentDataset);
        let new_set: Set<number> = new Set<number>();
        let keys: string[] = Object.keys(filter);

        //get the only key in the JSON
        let k: string = keys[0];
        // //// console.log("The key running is: >>" + k + "<<");
        let opened: any = filter[k];

        if (k == "IS" || k == "GT" || k == "LT" || k == "EQ") {
            let cond_key: string = Object.keys(opened)[0];
            let cond_val: any = opened[cond_key];
            //let id = Query.idExtractorStr(cond_key);
            /*
             // //// console.log("Condition: " + cond_key + " and " + cond_val);
             */
            // // //// console.log("currentDataset is: "+currentDataset);
            new_set = Query.grab(cond_key, cond_val, currentDataset, Query.NODES[k]);
        }

        if (k == "AND" || k == "OR") {
            let set: Set<number> = Query.queryIDs(opened[0], currentDataset);
            // //// console.log(JSON.stringify(opened[0])+" has size: "+set.size);
            for (let i = 1; i < opened.length; i++) {
                if (Object.keys(opened[i]).length > 0) {
                    set = Query.NODES[k](set, Query.queryIDs(opened[i], currentDataset));
                    // //// console.log(JSON.stringify(opened[i])+" has size: "+set.size);
                }
                // //// console.log("new set size in AND/OR: "+set.size);
            }
            new_set = set;
        }

        if (k == "NOT") {
            let set: Set<number> = Query.queryIDs(opened, currentDataset);
            let universeIDs = Array.from(Array(currentDataset.length).keys());
            let universeSet = new Set<number>(universeIDs);
            // // //// console.log("'NOT' set");
            // // //// console.log(set.size);
            // // //// console.log(Query.minus(universeSet, set).size);
            // // //// console.log(opened);
            new_set = Query.minus(universeSet, set);
        }
        // //// console.log("final new_set size: "+new_set.size);
        return new_set;
    }

    /**
     * Check if query is a valid JSON and has essential keys
     * @param query
     */
    isValid(query: string): string {
        let msg: string = null;
        //rest global variables
        this.uniqueID = "";
        this.isUniqueID = true;
        if (query == null) {
            return "Query cannot be null"; //should not parse null
        }
        try {
            let q: any = JSON.parse(query);
            //QUERY ::='{'BODY ', ' OPTIONS '}'
            //only can have 2 keys
            if ((Object.keys(q).length == 2 && q.hasOwnProperty('WHERE') && q.hasOwnProperty('OPTIONS'))
                || (Object.keys(q).length == 3 && q.hasOwnProperty('WHERE') && q.hasOwnProperty('OPTIONS')
                && q.hasOwnProperty("TRANSFORMATIONS"))) {
                let filter: string = JSON.stringify(q['WHERE']);
                let options: string = JSON.stringify(q['OPTIONS']);
                //optional transformation
                let transformation: any = q['TRANSFORMATIONS'];
                // // //// console.log(transformation);
                if (transformation) {
                    //TODO not sure why this is the case, why we don't need to check WHERE clause anymore?
                    //TODO I probably need to update WHERE clause check, one of it is wrong
                    msg = this.isValidTransformation(transformation, q["OPTIONS"]);
                }
                else {
                    msg = this.isValidFilter(filter) || this.isValidOptions(options);
                }
            }
            else {
                msg = "Query must have only two keys 'WHERE' and 'OPTIONS' "
            }
        }
        catch (err) {
            //not valid JSON, do nothing, just return false
            msg = "Invalid JSON";
        }
        finally {
            if (this.missingDependencies.length != 0) {
                //// //// console.log("rejected 424 here");
                let js: any = {"missing": this.missingDependencies};
                msg = JSON.stringify(js);
                this.missingDependencies = []; //reset it
            }
            return msg;
        }
    }

    /**
     * Helper to check if OPTIONS is valid
     * @param options
     * @returns {boolean}
     */
    isValidOptions(options: string): string {
        let msg: string = null;
        if (options == null) {
            return "Query OPTIONS cannot be null"; //should not parse null
        }
        try {
            let q: any = JSON.parse(options);
            let len: number = Object.keys(q).length;
            // OPTIONS ::= 'OPTIONS:{' COLUMNS ', ' ('ORDER:' key ', ')? VIEW '}''
            if (len >= 2 && len <= 3 && (q.hasOwnProperty('COLUMNS') && q.hasOwnProperty('FORM'))) {
                let columns: any = q['COLUMNS'];
                let view: string = q['FORM'];
                // COLUMNS ::= 'COLUMNS:[' (key ',')* key ']'
                if (!(columns instanceof Array)) {
                    msg = "COLUMNS must be an array of keys";
                }
                else if (columns.length == 0) {
                    console.log(columns);
                    msg = "COLUMNS must contain something keys";
                }
                else if (columns.length == 1) {
                    if (!Query.isValidKey(columns[0]) || this.isValidKeyFilter(columns[0], true) == 400) {
                        if (this.isUniqueID) {
                            msg = "COLUMNS must contain at least 1 valid key";
                        }
                        // else {
                        //     msg = "Cannot query from multiple datasets";
                        //     // this.uniqueID = "";
                        //     // this.isUniqueID = true;
                        // }
                    }
                }
                else {
                    // console.log("im hereeeeeeeee");
                    // console.log(columns);
                    for (let i in columns) {
                        if (columns.hasOwnProperty(i)) {
                            let s: string = columns[i];
                            if (!Query.isValidKey(s)) {
                                return s + " is an invalid key";
                            }
                        }
                    }
                    if (columns.length > 0) {
                        //also check if everyone column has same ID
                        let j: number = columns[0].indexOf('_');
                        let id: string = columns[0].substring(0, j);
                        for (let i in columns) {
                            if (columns.hasOwnProperty(i)) {
                                let nextId: string = columns[i].substring(0, j);
                                // A valid query will not contain keys from more than one dataset (i.e. only courses_xx keys or only rooms_xx keys, never a combination).
                                if (id != nextId) {
                                    msg = "Cannot query from multiple datasets at once";
                                    break;
                                }
                            }
                        }
                    }
                }
                // console.log("finished checking columns");

                // VIEW ::= 'FORM : TABLE'
                if (view !== 'TABLE') {
                    msg = "Must contain phrase: FORM: TABLE"
                }
                //if we have 3 keys, the third key must be ORDER
                if (len == 3) {
                    // 'ORDER': key // string is the column name to sort on; the string must be in the COLUMNS array or the query is invalid
                    if (q.hasOwnProperty('ORDER')) {
                        let key: any = q['ORDER'];
                        // // //// console.log("ORDER keys: "+JSON.stringify(key));
                        if (key["dir"] && key["keys"]) {
                            if (!(key["dir"] == "UP" || key["dir"] == "DOWN")) {
                                return "ORDER dir must be UP or DOWN";
                            }
                            if (!(key["keys"] instanceof Array)) {
                                return "ORDER keys must be an array";
                            }
                            if (key["keys"].length == 0) {
                                return "ORDER keys must contain 1 key at least";
                            }
                            for (let i of key["keys"]) {
                                if (columns.indexOf(i) == -1) {
                                    return "ORDER keys must be from columns";
                                }
                            }
                        }
                        else if (typeof key == "string") {
                            if (columns.indexOf(key) == -1) {
                                //this is without transformation, so order key must be in columns
                                msg = "ORDER key must be in columns";
                            }
                            //valid
                        }
                        else {
                            console.log(columns);
                            console.log(key);
                            msg = "ORDER must contain a valid key";
                        }
                    }
                    else {
                        msg = "ORDER is the only optional key in OPTIONS";
                    }
                }
            }
            else {
                msg = "OPTIONS can only have certain keys";
            }
        }
        catch (err) {
            //not valid JSON, do nothing, just return false
            msg = "Invalid JSON ORDER";
        }
        return msg;
    }

    /**
     * Helper to check if it is a math comparison
     * @param innerQ
     * @returns {Promise<boolean>}
     */
    isMComparison(innerQ: any): string {
        let msg: string = null;
        // MCOMPARISON ::= MCOMPARATOR ':{' key ':' number '}'
        // MCOMPARATOR ::= 'LT' | 'GT' | 'EQ'
        if (innerQ == null) {
            return "Query filter cannot be null";
        }
        let key: string = Object.keys(innerQ)[0]; //must only have 1 key
        //make sure that the only key has only one field, not an array/object as content
        if (Object.keys(innerQ).length !== 1) {
            msg = "Filter MCOMPARISON should contain 1 key";
        }
        else if (innerQ.length != undefined) {
            msg = "Filter MCOMPARISON key's content should not be nested";
        }
        else if (!Query.isValidKey(key) || this.isValidKeyFilter(key, true) == 400) {
            // // //// console.log(key);
            if (this.isUniqueID) {
                // // //// console.log(Query.isValidKey(key));
                // // //// console.log(this.isValidKeyFilter(key));
                msg = "MCOMPARISON should be against a valid key";
            }
            else {
                msg = "Cannot query from multiple datasets";
                // this.uniqueID = "";
                // this.isUniqueID = true;
            }
        }
        else if (this.validNumberKey.indexOf(key) == -1) {
            msg = "Math Comparator requires a number key";
        }

        if (isNaN(innerQ[key]) || typeof innerQ[key] == "string") {
            msg = "MCOMPARISON must be against a number";
        }
        if (innerQ[key] == null) {
            msg = "MCOMPARISON must have content, cannot be null, or undefined";
        }
        // // //// console.log(key);
        //  // //// console.log(innerQ[key]);
        //  // //// console.log(isNaN(innerQ[key]));
        //  // //// console.log(typeof innerQ[key] == "string");
        return msg;
    }

    /**
     * Helper to check if it is a string comparision
     * @param innerQ
     * @returns {Promise<boolean>}
     * @note assuming string is without whitespace, and includes all kinds of characters
     */
    isSComparison(innerQ: any): string {
        let msg: string = null;
        // SCOMPARISON ::= 'IS:{' key ':' [*]? string [*]? '}'
        if (innerQ == null) {
            return "Query filter cannot be null";
        }
        let key: string = Object.keys(innerQ)[0]; //must only have 1 key
        if (Object.keys(innerQ).length !== 1) {
            msg = "Filter SCOMPARISON should contain 1 key";
        }
        else if (innerQ.length != undefined) {
            msg = "Filter SCOMPARISON key's content should not be nested";
        }
        else if (!Query.isValidKey(key) || this.isValidKeyFilter(key, true) == 400) {
            if (this.isUniqueID) {
                msg = "SCOMPARISON should be against a valid key";
            }
            else {
                msg = "Cannot query from multiple datasets";
                // this.uniqueID = "";
                // this.isUniqueID = true;
            }
            // // //// console.log(!this.isValid(innerQ[key]));
            // // //// console.log(this.isValidKeyFilter(innerQ[key]));
        }
        else if (typeof innerQ[key] !== 'string') {
            msg = "SCOMPARISON expecting a string to compare with";
        }
        else if (this.validStringKey.indexOf(key) == -1) {
            msg = "String Comparator requires a string key";
        }
        else if (!innerQ[key]) {
            msg = "SCOMPARISON must have content, cannot be null, or undefined";
        }
        else {
            let pattern: string = innerQ[key];
            //remove all the spaces from pattern
            //// //// console.log(pattern);
            let numAstericks: number = (pattern.match(/\*/g) || []).length;
            // let numNoneChars: number = (pattern.match(/\W/g)||[]).length;
            //all non a-zA-Z0-9_ characters must be *
            if ((numAstericks == 0 )
                || (numAstericks == 1 && (/^\*[\S|\s]*/g.test(pattern) || /[\S|\s]*\*$/g.test(pattern)))
                || (numAstericks == 2 && (/^\*[\S|\s]*\*$/g.test(pattern)))
            ) {
                msg = null; //success
            }
            else {
                msg = "SCOMPARISON string can only be of format [*]?string[*]?";
            }
        }
        return msg;
    }

    /**
     * Helper to check if key is valid
     * @param s
     * @note we are IGNORING keys that should not exists, e.g. courses_DEPT is ignored (tested from UI)
     */
    static isValidKey(s: string): boolean {
        // key ::= string '_' string
        //a string of size at least 1 in front, and a string of size at least 1 afterwards
        //but should not have more than 1 underscore
        //found out how to use .match from http://stackoverflow.com/questions/881085/
        // // //// console.log(s);
        return (s.length > 2 && s.indexOf('_') > 1 && s.indexOf('_') < s.length - 1 )
            && (s.match(/_/g) || []).length == 1;
    }

    /**
     * Helper for checking valid key for filter
     * @param s
     * First check 424 dependecny
     * Second check 400 keys
     * Both valid returns 0
     */
    isValidKeyFilter(s: string, needDependency: boolean): number {
        let i: number = s.indexOf('_');
        let key: string = s.substring(i + 1);
        let id: string = s.substring(0, i);
        let io: IOProcessing = new IOProcessing();
        // // //// console.log(key);
        if (!io.isExistId(id) && needDependency) {
            if (this.missingDependencies.indexOf(id) == -1) {
                this.missingDependencies.push(id);
            }
            return 424;
        }

        if (this.uniqueID == "") {
            this.uniqueID = id;
        }
        else {
            if (this.uniqueID != id) {
                this.isUniqueID = false;
                return 400;
            }
        }

        if (id == "courses" && (key == 'dept' || key == 'id' || key == 'avg' || key == 'instructor'
            || key == 'title' || key == 'pass' || key == 'fail' || key == 'audit'
            || key == 'uuid' || key == 'year' || key == "sectionSize")) {
            return 0;
        }
        else if (id == "rooms" && ((key == "fullname") || (key == "shortname") || (key == "number")
            || (key == "name") || (key == "address") || (key == "lat") || (key == "lon")
            || (key == "seats") || (key == "type") || (key == "furniture") || (key == "href"))) {
            return 0;
        }
        else {
            return 400;
        }
    }

    /**
     * Helper to check if filter is valid
     * @param filter
     * @returns {Promise<boolean>}
     */
    isValidFilter(filter: string): string {
        let msg: string = null;
        if (filter == null) {
            return "Query filter cannot be null";
        }
        if (filter === "{}") {
            return null;
        }
        try {
            let q: any = JSON.parse(filter);
            let keys: any = Object.keys(q);
            if (keys.length === 1) {
                if (q.hasOwnProperty('LT') || q.hasOwnProperty('GT') || q.hasOwnProperty('EQ')) {
                    msg = this.isMComparison(q[keys[0]]);
                }
                else if (q.hasOwnProperty('AND') || q.hasOwnProperty('OR')) {
                    let filterList: any = q[keys[0]];
                    if (!(filterList instanceof Array)) {
                        msg = "LOGICCOMPARISON should contain an array of filters";
                    }
                    else if (filterList instanceof Array && filterList.length == 0) {
                        msg = "LOGICCOMPARISON should contain an array of filters";
                    }
                    else {
                        // stop and first encountered error
                        for (let i in filterList) {
                            if (filterList.hasOwnProperty(i)) {
                                if (msg != null) {
                                    break;
                                }
                                msg = msg || this.isValidFilter(JSON.stringify(filterList[i]));
                            }
                        }
                    }
                }
                else if (q.hasOwnProperty('NOT')) {
                    //recursive
                    msg = this.isValidFilter(JSON.stringify(q[keys[0]]));
                }
                else if (q.hasOwnProperty('IS')) {
                    // SCOMPARISON ::= 'IS:{' key ':' [*]? string [*]? '}'
                    msg = this.isSComparison(q[keys[0]]);
                }
                else {
                    msg = "Unexpected key in Filter";
                }
            }
            else {
                msg = "FILTER should have 1 key";
            }
        }
        catch (err) {
            msg = "Invalid JSON";
        }
        return msg;
    }

    checkListOfValidNumberKey(arr: any): boolean {
        for (var i of arr) {
            if (this.validNumberKey.indexOf(i) == -1) {
                return false;
            }
        }
        return true;
    }

    isValidTransformation(trans: any, options: any): string {
        //check options
        if (!options) {
            return "there must be OPTIONS";
        }
        else if (!options.COLUMNS || !options.FORM
            || options.FORM != "TABLE") {
            return "options must have columns and view";
        }

        if (!(options.COLUMNS instanceof Array)) {
            return "options columns must be an array";
        }
        else {
            if (options.COLUMNS.length == 0) {
                return "columns cannot be empty";
            }
            for (let e of options.COLUMNS) {
                if (typeof e != "string") {
                    return "options columns must be string type";
                }
            }
        }
        //check orders
        let orderKeys: any = options.ORDER;
        if (orderKeys && typeof orderKeys === "string") {
            if (options.COLUMNS.indexOf(orderKeys) == -1) {
                return "ORDER keys need to be included in columns";
            }
        }
        else if (orderKeys) {
            if (orderKeys.dir && orderKeys.keys) {
                if (orderKeys.dir != "DOWN" && orderKeys.dir != "UP") {
                    return "ORDER dir can only be UP or DOWN";
                }
                if (!(orderKeys.keys instanceof Array)) {
                    return "ORDER keys must be instance of array";
                }
                if (orderKeys.keys.length == 0) {
                    return "ORDER keys must have at least 1 entry";
                }
                for (let i of orderKeys.keys) {
                    if (options.COLUMNS.indexOf(i) == -1) {
                        return "ORDER keys need to be included in columns";
                    }
                }
            }
            else {
                return "ORDER keys D3 style must contain dir and keys";
            }
        }

        //check VIEW
        if (options.FORM != "TABLE") {
            return "FORM:TABLE must be present";
        }

        let columns: string[] = options["COLUMNS"];
        // console.log(columns);
        this.columnKeys = new Set(columns);
        // must have GORUP and APPLY
        let setGroupKeys: any = new Set();
        let setApplyKeys: any = new Set();
        let setApplyTokenKeys: any = new Set();
        if (!(Object.keys(trans).length == 2 && trans.hasOwnProperty("GROUP") && trans.hasOwnProperty("APPLY"))) {
            return "TRANSFORMATIONS must contain GROUP and APPLY";
        }
        let groupKeys: any = trans["GROUP"];
        if (!(groupKeys instanceof Array && groupKeys.length >= 1)) {
            return "GROUP must have 1 or more keys";
        }
        else {
            for (let i in groupKeys) {
                if (!Query.isValidKey(groupKeys[i])
                    || this.isValidKeyFilter(groupKeys[i], false) == 400) {
                    return "GROUP should only contain keys";
                }
                else {
                    setGroupKeys.add(groupKeys[i]);
                }
            }
        }
        // APPLY ::= 'APPLY: [' (APPLYKEY (', ' APPLYKEY )* )? ']'
        //     APPLYKEY ::= '{' string ': {' APPLYTOKEN ':' key '}}'
        // APPLYTOKEN ::= 'MAX' | 'MIN' | 'AVG' | 'COUNT' | 'SUM'
        let applykeyList: any = trans["APPLY"];
        if (!(applykeyList instanceof Array)) {
            return "APPLY must be an array";
        }
        else {
            for (let i in applykeyList) {
                let applyKey: any = applykeyList[i];
                let key: any = Object.keys(applyKey);
                if (key.length != 1) {
                    return "applykey should have 1 key only";
                }
                if (/_/g.test(key[0])) {
                    // //// console.log(key[0]);
                    return "applykey cannot contain _ ";
                }
                if (setApplyKeys.has(key[0])) {
                    return "no two APPLY targets should have the same name";
                }
                else {
                    setApplyKeys.add(key[0]);
                }
                let applyTokenObject = applyKey[key[0]];
                key = Object.keys(applyTokenObject);
                if (key && key.length != 1) {
                    return "every applykey can only contain 1 applytoken";
                }
                let applyToken: string = key[0];
                if (!((applyToken === "MAX" && this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1)
                        || (applyToken === "MIN" && this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1)
                        || (applyToken === "AVG" && this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1)
                        || (applyToken === "COUNT"
                        && ( this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1
                        || this.validStringKey.indexOf(applyTokenObject[applyToken]) != -1))
                        || (applyToken === "SUM" && this.validNumberKey.indexOf(applyTokenObject[applyToken]) != -1)
                    )) {
                    return "applyToken must be one of 'MAX','MIN','AVG','COUNT','SUM','ADD', and the keys must be certain keys";
                }
                if (typeof applyTokenObject[applyToken] != "object") {
                    if (!Query.isValidKey(applyTokenObject[applyToken])
                        || this.isValidKeyFilter(applyTokenObject[applyToken], false) == 400) {
                        return "key in applyToken is invalid";
                    }
                    else {
                        setApplyTokenKeys.add(applyTokenObject[applyToken]);
                    }
                }
            }
            //group keys cannot be in applykeys
            if (Query.intersect(setGroupKeys, setApplyKeys).size > 0) {
                // console.log(setGroupKeys);
                // console.log(setApplyTokenKeys);
                return "keys in GROUP cannot be in APPLY";
            }
            let keysInGroupButNotInColumns: any = Query.difference(setGroupKeys, this.columnKeys);
            // // // console.log(setGroupKeys);
            // // // console.log(this.columnKeys);
            // //TODO somehow this fixed one of the 400 but I'm not sure why?
            // if (keysInGroupButNotInColumns.size > 0){
            //     //this must appear in apply key
            //     // console.log(keysInGroupButNotInColumns);
            //     // // console.log("differences between keysinGroupbutNotInColumns and apply");
            //     let keysNotInAny:any = Query.difference(keysInGroupButNotInColumns,setApplyKeys);
            //     // console.log(keysNotInAny);
            //     if (keysNotInAny.size > 0){
            //         if ( keysNotInAny.size != this.columnKeys.size)
            //             return "Group cannot contain Apply keys";
            //     }
            // }
            //column keys must be in either group or apply
            let first_diff: any = Query.difference(this.columnKeys, setGroupKeys);
            let diff: Set<any> = Query.difference(first_diff, setApplyKeys);
            // // console.log(setApplyKeys);
            if (diff.size != 0) {
                // // console.log("diff is :");
                // // console.log(diff);
                // for (let key of Array.from(diff)){
                //     let dependency: string = null;
                //     if (/_/g.test(key)){
                //         let index:number = key.indexOf("_");
                //         dependency = key.slice(0,index);
                //         if (this.missingDependencies.indexOf(dependency) == -1) {
                //             this.missingDependencies.push(dependency);
                //         }
                //     }
                // }
                return "column keys must be in either group or apply";
            }

            // diff = Query.difference(setApplyKeys,first_diff);
            // if (diff.size != 0){
            //     return "apply keys must be present in columns, but not in groups";
            // }
            // // //// console.log("columnKeys:\n")
            // // //// console.log(this.columnKeys);
            // // //// console.log("groupKeys:\n");
            // // //// console.log(setGroupKeys);
            // // //// console.log("applyKeys:\n")
            // // //// console.log(setApplyKeys);
            // // //// console.log("applyTokenKeys:\n")
            // // //// console.log(setApplyTokenKeys);
            return null; //it's true
        }
    }
}

