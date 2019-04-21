import MagicParser from "../src/controller/MagicParser";
import Query from "../src/controller/Query";

let fs: any = require('fs');
let url:string = '/Users/zfan/Downloads/rooms/campus/discover/buildings-and-classrooms/ESB';
let html = fs.readFileSync(url, 'utf8' );
let p = require('parse5');

//docu = docu.childNodes[6].childNodes[3];
//console.log(docu);

let magic = new MagicParser(html);
//let links:any[] = magic.findElementsByTagName('td');
//let links:any[] = magic.findElementsById('ubc7-address-street');
//let links:any[] = magic.findElementsByClassName('div');

let tmp = magic.getBuildingName();


console.log('>>>' + tmp + '<<<');























