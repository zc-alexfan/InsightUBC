/**
 * Created by zfan on 2017-01-22.
 */

import Query from "../src/controller/Query";
import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";

let facade:InsightFacade = new InsightFacade();

let input:string = ' [ { "courses_dept":"cpsc", "courses_id":"340", "courses_avg":80, "courses_instructor":"Mark" , "courses_title":"Machine Learning", "courses_pass": 90, "courses_fail": 2, "courses_audit": 1 }, { "courses_dept":"math", "courses_id":"340", "courses_avg":60, "courses_instructor":"Pich Money" , "courses_title":"Linear Programming", "courses_pass": 44, "courses_fail": 4, "courses_audit": 2 }, { "courses_dept":"math", "courses_id":"320", "courses_avg":40, "courses_instructor":"Jack" , "courses_title":"Real Variable", "courses_pass": 2, "courses_fail": 99, "courses_audit": 0 }, { "courses_dept":"cpsc", "courses_id":"322", "courses_avg":82, "courses_instructor":"Jason" , "courses_title":"Artificial Intelligence", "courses_pass": 99, "courses_fail": 3, "courses_audit": 10 }, { "courses_dept":"cpsc", "courses_id":"340", "courses_avg":90, "courses_instructor":"Alex" , "courses_title":"Machine Learning", "courses_pass": 99, "courses_fail": 0, "courses_audit": 100 } ]';

let data:any = JSON.parse(input);  
let id:string = 'courses'; //TODO ALEX: please change this to whatever you want
facade.putData(id, data);
facade.showSomeData(7, id);

//input = '{ "WHERE":{ "AND":[ { "IS":{ "courses_dept":"math" } }, { "GT":{ "courses_avg": 50 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "ORDER":"courses_avg", "FORM":"TABLE" } }';
//input = '{ "WHERE":{ "AND":[ { "IS":{ "courses_dept":"math" } }, { "GT":{ "courses_avg": 50 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "FORM":"TABLE" } }';

input = '{ "WHERE":{ "OR":[ { "IS":{ "courses_dept":"math" } }, { "GT":{ "courses_avg": 89 } } ] }, "OPTIONS":{ "COLUMNS": ["courses_dept", "courses_id", "courses_instructor", "courses_avg"], "ORDER":"courses_avg", "FORM":"TABLE" } } ';


let query:any = JSON.parse(input);
console.log("Query:\n");
Query.prettyPrint(query);

let queryRequest:QueryRequest = {body:input};


facade.performQuery(queryRequest).then(
    function(r:InsightResponse){
        let js:any = r.body;
        console.log("\n\n\nQuery Result:\n");
        Query.prettyPrint(js);
    }
).catch(
    function(r:InsightResponse){
        console.log(">>>>>>Calling Rejected: ");
        console.log(r);
        console.log("<<<<<<<");
    }
);




