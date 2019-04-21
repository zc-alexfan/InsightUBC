/**
 * Created by zfan on 2017-01-30.
 */
import InsightFacade from "../src/controller/InsightFacade";
import IOProcessing from "../src/controller/IOProcessing";
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import Query from "../src/controller/Query"


let facade:InsightFacade = new InsightFacade();
let ids:string[] = ['courses', 'tiny'];

// facade.addAllCacheDatasets(ids).then(
//     (b:boolean)=>{
//         facade.showSomeData(2, 'courses');
//         facade.showSomeData(2, 'tiny');
//         console.log("Adding is good");
//     }
// ).catch(
//     (e:any)=>{
//         console.log(e);
//         console.log("Adding is not fine");
//     }
// );

console.log("Hello");


