/**
 * Created by zfan on 2017-01-22.
 */

import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import Query from "../src/controller/Query"

let facade:InsightFacade = new InsightFacade();
let str1 = "120";
let str2 = "1202";
let output = Query.NODES["IS"](str1, str2);

console.log(output);



