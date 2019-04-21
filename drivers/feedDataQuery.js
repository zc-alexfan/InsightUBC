"use strict";
var InsightFacade_1 = require("../src/controller/InsightFacade");
var Query_1 = require("../src/controller/Query");
var facade = new InsightFacade_1.default();
var str1 = "120";
var str2 = "1202";
var output = Query_1.default.NODES["IS"](str1, str2);
console.log(output);
//# sourceMappingURL=feedDataQuery.js.map