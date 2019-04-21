"use strict";
var MagicParser_1 = require("../src/controller/MagicParser");
var fs = require('fs');
var url = '/Users/zfan/Downloads/rooms/campus/discover/buildings-and-classrooms/ESB';
var html = fs.readFileSync(url, 'utf8');
var p = require('parse5');
var magic = new MagicParser_1.default(html);
var tmp = magic.getBuildingName();
console.log('>>>' + tmp + '<<<');
//# sourceMappingURL=parse5Driver.js.map