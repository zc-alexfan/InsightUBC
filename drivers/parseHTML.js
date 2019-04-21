var parse5 = require('parse5');
var htmlString = "<!DOCTYPE html> <html> <head> <title> HelloWorld </title> </head> <body> <p> ;) </p> <a href='www.google.ca'>click me </a> </body> </html>";
var doc = parse5.parse(htmlString);
console.log(doc.childNodes.length);
var list = doc.childNodes[1].childNodes[2].childNodes;
var htmlpart = parse5.serialize(list[1]);
console.log(htmlpart);
console.log(list[3].attrs[0].value);
var body = parse5.parseFragment(doc.childNodes[1].childNodes[2], "<p> Oh ! </p>");
console.log(parse5.serialize(body.childNodes[0]));
var body2 = parse5.parseFragment(doc.childNodes[1].childNodes[2], "<a href='www.ubc.ca'> UBC ! </a>");
console.log(body2.childNodes[0]);
//# sourceMappingURL=parseHTML.js.map