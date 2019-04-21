/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import Query from "./Query";
import Log from "../Util";
import IOProcessing from "./IOProcessing";
import TransformQuery from "./TransformQuery";
//import getDefaultLibFileName = ts.getDefaultLibFileName;


export default class InsightFacade implements IInsightFacade {
    universe:any = {};
    db: IOProcessing = new IOProcessing();
    constructor() {
        this.universe = [];
        Log.trace('InsightFacadeImpl::init()');
    }

    //put the data of json[]  into the universe with the key id
    //if id exists in the universe, overwrite the JSON;
    //else, just put
    putData(id:string, data:JSON[]):void{
        //id exists
        this.universe[id] = data;
    }

    //show the first min(n, universe.length) JSONs in universe
    //show some data from a dataset by id
    showSomeData(n:number, id:string):void{
        if(Object.keys(this.universe).indexOf(id) == -1){
            ////console..log("Dataset not in universe");
            return;
        }

        let data = this.universe[id];
        n = Math.min(n, data.length);
        /*
        ////console..log('\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\nPrinting data from: [' + id + ']');
        ////console..log("universe size: " + data.length);
        ////console..log("show size: " + n);
        */
        for(let i = 0; i < n; i++){
            ////console..log("[" + i + "] ");
            Query.prettyPrint(data[i]);
        }
    }


    //query the universe using the bigQuery and return a JSON
    //masterQuery is of type JSON
    mainQuery(masterQuery:any, currentDataset:JSON[]):JSON{

        /*
        ////console..log(">>>>>>>>MainQuery\n")
        Query.prettyPrint(masterQuery);
        ////console..log("<<<<<<<<<<\n");
        */

        //ignore invalid query checking here
        let filter:JSON = masterQuery["WHERE"];
        let options:any = masterQuery["OPTIONS"];
        let transformation:any = masterQuery["TRANSFORMATIONS"];
        // check if undefined

        //ids for the row after applying the filter!!!!
        // //console..log("'mainQuery' currentDataset is: "+currentDataset);
        let ids:Set<number> = Query.queryIDs(filter, currentDataset);
        //console..log("finished Query.queryIDs");

        // console.log("id Set: ")
        // console.log(ids);

        // ////console..log("main query: "+ transformation);
        let result:any = Query.queryFormalizer(ids, currentDataset, options,transformation);
        // console.log("after queryFormalizer");
        // Query.prettyPrint(result);
        result= TransformQuery.transform(result,transformation,options);
        // console.log("after transform:");
        // console.log(result);
        //ORDER requirement
        let order: any = masterQuery.OPTIONS.ORDER;
        console.log(order);
        if ( order && typeof order === "string"){
            result["result"] = Query.sortByKey(result["result"], order, true);
        }
        else if (order){
            let dir: boolean;
            if (order && order["dir"] === "UP") {
                dir = true;
            }
            else {
                dir = false;
            } //already checked for errors
            // // //console.log("in queryFormalizer: dir is " + dir);
            result["result"] = Query.sortByMultipleKey(result["result"],order["keys"],dir);
        }
        // return Query.queryFormalizer(ids, currentDataset, options);
        return result;
    }


    //given a query in JSON, figure out what ids are required
    //to carry through the query
    //if some ids are not in the memory, then cache it into the memory
    //else, reject the promise with a list of missing ids (not in cache)
    // getMissingDatasets(query:any):Promise<string[]>{
    //     let that = this;
    //     return new Promise<string[]>(
    //         function(fulfill, reject){
    //             let ids:string[] = Query.mainExtractIDFromQuery(query);
    //             let toCache:string[] = [];
    //             let idsInMemory = Object.keys(that.universe);
    //             ids.map(
    //                 (id:string)=>{
    //                     if(idsInMemory.indexOf(id) == -1){
    //                             toCache.push(id);
    //                         }
    //                 }
    //             );
    //             let missing:string[] = [];
    //             for(let i = 0; i < toCache.length; i++){
    //                 if(!that.fileExists('cache/' + toCache[i])){
    //                         missing.push(toCache[i]);
    //                 }
    //             }
    //             if(missing.length > 0) {
    //                 // ////console..log(missing);
    //                 reject(missing);
    //             }else{
    //                 that.addAllCacheDatasets(toCache).then( ()=>{ fulfill([]); }
    //                 ).catch( ()=>{
    //                     ////console..log("here");
    //                     reject([]);
    //                 });
    //             }
    //         }
    // );
    // }

    //if cache/courses is not there, return 424
    performQuery(query: QueryRequest): Promise <InsightResponse> {
        console.log("**********Query START********");
        let that = this;
        return new Promise(
            function (fulfill, reject) {
                let str :string = JSON.stringify(query);
                let qDriver:Query = new Query();
                let errMsg = qDriver.isValid(str);
                if(errMsg != null){
                    if (errMsg.includes('{"missing":[')){
                        console.log("here");
                        let r:InsightResponse = {code:424,body:JSON.parse(errMsg)};
                        return reject(r);
                    }
                    let error = { 'error': errMsg };
                    let r:InsightResponse = {code:400, body:error};
                    return reject(r);
                }

                let id = that.getDependencyID(query);
                let currentDataset:any;
                if (that.universe[id]){
                    currentDataset = that.universe[id];
                        let result = that.mainQuery(query, currentDataset);
                        let r: InsightResponse = {code: 200, body: result};
                    console.log("**********Query END********");
                        return fulfill(r);
                }else{
                    InsightFacade.addCacheDataset(id,that)
                        .then(function(){
                            // //console..log("'AFTER ADDCACHEDATASET performQuery' currentDataset is: "+that.universe[id]);
                            currentDataset = that.universe[id];
                            // try {
                                let result = that.mainQuery(query, currentDataset);
                                let r: InsightResponse = {code: 200, body: result};
                            console.log("**********Query END********");
                                return fulfill(r);
                        })
                        .catch(function(){
                            let r: InsightResponse = {code: 424, body: {"missing:":id}};
                            return reject(r);
                        })
                }

            }
        );
    }

    private getDependencyID(query:any):string{
        //this should work since we know it's one dependency only
        let arr: string[] = query["OPTIONS"]["COLUMNS"];
        if (query["TRANSFORMATIONS"]) {
            arr = arr.concat(query["TRANSFORMATIONS"]["GROUP"]);
        }
        // console.log(arr);
        for (let e of arr){
            // console.log(e);
            if (/^courses_/g.test(e)){
                return "courses";
            }
            else if (/^rooms_/g.test(e)){
                return "rooms";
            }
        }
        //if all failed to return, then COLUMNS must only contain APPLY keys
        //so depdency should be the first of GROUP key
    }

    //cache all datasets listed in ids
    //if some ids existed, overwrite with the cache
    //precondition: all ids exist in the cache
    // addAllCacheDatasets(ids:string[]):Promise<boolean>{
    //     let that = this;
    //     return new Promise<boolean>(
    //         function(fulfill, reject){
    //             Promise.all(ids.map(
    //                 function(id:string){
    //                     return InsightFacade.addCacheDataset(id, that);
    //                 }
    //             )).then(
    //                     ()=>{fulfill(true); }
    //                 ).catch(
    //                     ()=>{reject(false); }
    //                 )
    //         }
    //     )
    // }


    static addCacheDataset(cache_id:string, that:any):Promise<boolean>{
        //let that = this;
        return new Promise<boolean>(
            function(fulfill, reject){
                // //console..log("in addCacheDataset, cache_id is: "+cache_id);
                IOProcessing.readFilePromise('./cache/'+ cache_id, 'utf8').then(
                    (data:string)=>{
                        let js = JSON.parse(data);
                        that.putData(cache_id, js);
                        fulfill(true);
                    }
                ).catch(
                    ()=>{
                        reject(false);
                    }
                )
            }
        );

    }

    //Piazza @548 says leave the body empty for success cases
    addDataset(id: string, content: string): Promise<InsightResponse> {
        let res: InsightResponse;
        let fs: any = require('fs');
        let replyMsg :string = "";
        let code_number: number = 0;
        let that = this;
        return new Promise<InsightResponse>(function (fulfill, reject) {
            if (id == null || id == undefined || id ==""){
                replyMsg = 'id cannot be empty';
                res = {code:400, body:{"error": replyMsg} };
                reject(res);
            }
            else if (content == null || content == undefined || content ==""){
                replyMsg = 'content cannot be empty';
                res = {code:400, body:{"error": replyMsg} };
                reject(res);
            }
            else {
                if (that.db.isExistId(id)){
                    code_number = 201;
                }
                else{
                    code_number = 204;
                }
                //always reload according to piazza, just overwrite everything
                that.db.loadDataFromBuffer(id, content)
                    .then(function (response: JSON[]) {
                        //always load into memory as required, add key on the fly, if key exists just replace
                        that.universe[id] = response;
                        //Piazza @548 answered that replyMsg should be empty when successfully added
                        res = {code: code_number, body: {}};
                        fulfill(res);
                    })
                    .catch(function (err: Error) {
                        code_number = 400;
                        // replyMsg["error"] = err.message; //add a key on the fly
                        // res = new Response(code, replyMsg);
                        res = {code: 400, body: {"error": err.message}};
                        reject(res);
                    });
            }
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        let that = this;
        return new Promise<InsightResponse>(function (fulfill, reject) {
            let replyMsg :string = "";
            let code:number = 0;
            let res: InsightResponse;
            if (id == null || id == undefined || id ==""){
                replyMsg = 'id cannot be empty';
                res = {code:404, body:{"error": replyMsg} };
                reject(res);
            }
            else if (! that.db.isExistId(id)) {
                code = 404;
                replyMsg = "Cannot delete, the id \"" + id + "\" does not exist";
                res = {code:404, body:{"error": replyMsg} };
                reject(res);
            }
            else{
                code = 204;
                //also take it out from the current memory saver
                that.db.removeFileFromDisk(id)
                    .then(function () {
                        that.universe[id] = null;
                        res = {code:code, body:{}};
                        fulfill(res);
                    });
/*                    .catch(function (err: Error) {
                        //because 404 is for data that does not exist
                        //this catch block will only be reached if the checking function in isExist went wrong
                        res = {code:404, body:{"error": err.message} };
                        reject(res);
                    })*/
            }
        });

    }

    // fileExists(id: string):boolean{
    //     let fs:any = require('fs');
    //     return fs.existsSync(id);
    // }

    
}
