/**
 * Created by Nyanko on 2/7/2017.
 */

//GOAL: get out content of <p> tag
let parse5:any = require('parse5');
//TODO try out table later on
//TODO try out <a href> later on
let htmlString :string=
    "<!DOCTYPE html> <html> <head> <title> HelloWorld </title> </head> <body> <p> ;) </p> <a href='www.google.ca'>click me </a> </body> </html>";
const doc = parse5.parse(htmlString);
// let a:any = doc.getElementsByTagName("a");
console.log(doc.childNodes.length);
let list:any = doc.childNodes[1].childNodes[2].childNodes;
//TODO can I get a list of elements by their tag names?
//TODO is there siblings?
//TODO how does customize parsetree work?
// console.log(doc.getElementsByTagName("p"));
// for (var i=0; i < list.length; i++){
//     console.log("vvvvvvvvvvvvvv");
//     console.log(list[i].tagName);
//     console.log(list[i].attrs);
// }
//TODO: I know everything I need is inside the element <table> and there must be 0 or 1 table existing in our given HTML, so how do I get there?
//TODO: second <h2> tag is rooms_fullname
//TODO: basically want the <div> near L355 in each file for <table>
//getting innerHTML of a tag as follows
var htmlpart = parse5.serialize(list[1]);
console.log(htmlpart);

//getting the link from <a>
console.log(list[3].attrs[0].value);

//doc.childNodes[0] is #documentType
//doc.childNodes[1] is html
//everything is inside childNodes[1], [2] is undefined
//childNodes[1] has 3 children: head, #text, body
//childNodes[2] is "body", everything we want is inside "body"

let body : any = parse5.parseFragment(doc.childNodes[1].childNodes[2], "<p> Oh ! </p>");
console.log(parse5.serialize(body.childNodes[0]));

let body2 : any = parse5.parseFragment(doc.childNodes[1].childNodes[2], "<a href='www.ubc.ca'> UBC ! </a>");
console.log(body2.childNodes[0]);