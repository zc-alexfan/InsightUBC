"use strict";
var LocationIO_1 = require("./LocationIO");
var MagicParser = (function () {
    function MagicParser(html) {
        this.docu = MagicParser.p.parse(html);
    }
    MagicParser.traverser = function (doc, val, output, getter) {
        if (doc == undefined) {
            return;
        }
        if (getter(doc) != undefined && getter(doc) == val) {
            output.push(doc);
        }
        if (doc.childNodes != undefined && doc.childNodes.length > 0) {
            for (var i = 0; i < doc.childNodes.length; i++) {
                MagicParser.traverser(doc.childNodes[i], val, output, getter);
            }
        }
    };
    MagicParser.getAttr = function (vec_attrs, attrType) {
        if (vec_attrs == undefined || vec_attrs.length == 0)
            return undefined;
        for (var i = 0; i < vec_attrs.length; i++) {
            if (vec_attrs[i] != undefined &&
                vec_attrs[i].name != undefined &&
                vec_attrs[i].name == attrType) {
                return vec_attrs[i].value;
            }
        }
        return undefined;
    };
    MagicParser.prototype.findElementsByClassName = function (classname) {
        var vec = [];
        MagicParser.traverser(this.docu, classname, vec, MagicParser.getClassName);
        return vec;
    };
    MagicParser.prototype.findElementsByTagName = function (tag) {
        var vec = [];
        MagicParser.traverser(this.docu, tag, vec, MagicParser.getTagName);
        return vec;
    };
    MagicParser.findHref = function (anchor) {
        var keys = Object.keys(anchor);
        if (keys.indexOf("attrs") != -1) {
            var arr = anchor["attrs"];
            for (var i = 0; i < arr.length; i++) {
                var attr = arr[i];
                keys = Object.keys(attr);
                if (keys.indexOf("name") != -1 && keys.indexOf("value") != -1) {
                    if (attr["name"] == "href") {
                        return attr["value"];
                    }
                }
            }
        }
        return "";
    };
    MagicParser.normalize = function (str) {
        var target = '&amp;';
        return str.replace(target, '&');
    };
    MagicParser.prototype.getBuildingName = function () {
        var tmp = this.findElementsByTagName('h2');
        var s = tmp[1].childNodes[0].childNodes[0].value.trim();
        return s;
    };
    MagicParser.getRoomNumber = function (tr) {
        if (tr == undefined ||
            tr.childNodes == undefined ||
            tr.childNodes[1] == undefined ||
            tr.childNodes[1].childNodes == undefined ||
            tr.childNodes[1].childNodes[1] == undefined) {
            return '';
        }
        return MagicParser.p.serialize(tr.childNodes[1].childNodes[1]).trim();
    };
    MagicParser.prototype.tableRealizer = function (shortname) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            var vec = that.findElementsByTagName('tr');
            vec = vec.splice(1, vec.length - 1);
            var addr = that.getRoomAddress();
            LocationIO_1.default.getGeoLocation(addr)
                .then(function (geo) {
                var pList = [];
                for (var i = 0; i < vec.length; i++) {
                    pList.push(that.tableRealizerForOneEntry(vec[i], shortname, addr, geo.lat, geo.lon));
                }
                return Promise.all(pList);
            })
                .then(function (rooms) {
                fulfill(rooms);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    MagicParser.prototype.tableRealizerForOneEntry = function (vec, shortname, addr, lat, lon) {
        var roomNum = MagicParser.getRoomNumber(vec);
        var entry = {
            rooms_fullname: MagicParser.normalize(this.getBuildingName()),
            rooms_shortname: MagicParser.normalize(shortname),
            rooms_number: roomNum,
            rooms_name: shortname + "_" + roomNum,
            rooms_address: MagicParser.normalize(addr),
            rooms_lat: lat,
            rooms_lon: lon,
            rooms_seats: MagicParser.getRoomSeats(vec),
            rooms_type: MagicParser.normalize(MagicParser.getRoomType(vec)),
            rooms_furniture: MagicParser.normalize(MagicParser.getRoomFurniture(vec)),
            rooms_href: MagicParser.getRoomHref(vec)
        };
        return entry;
    };
    MagicParser.prototype.getRoomAddress = function () {
        var tmp = this.findElementsByClassName('field-content');
        tmp = tmp[1].childNodes[0].value.trim();
        return tmp;
    };
    MagicParser.getRoomSeats = function (tr) {
        if (tr == undefined || tr.childNodes == undefined || tr.childNodes[3] == undefined) {
            return -1;
        }
        var tmp = tr.childNodes[3];
        tmp = MagicParser.p.serialize(tmp).trim();
        return parseInt(tmp);
    };
    MagicParser.getRoomType = function (tr) {
        if (tr == undefined || tr.childNodes == undefined || tr.childNodes[7] == undefined) {
            return '';
        }
        var tmp = tr.childNodes[7];
        tmp = MagicParser.p.serialize(tmp).trim();
        return tmp;
    };
    MagicParser.getRoomFurniture = function (tr) {
        if (tr == undefined || tr.childNodes == undefined || tr.childNodes[5] == undefined) {
            return '';
        }
        var tmp = tr.childNodes[5];
        tmp = MagicParser.p.serialize(tmp).trim();
        return tmp;
    };
    MagicParser.getRoomHref = function (tr) {
        if (tr == undefined || tr.childNodes == undefined || tr.childNodes[6] == undefined
            || tr.childNodes[9].childNodes == undefined
            || tr.childNodes[9].childNodes[1] == undefined
            || tr.childNodes[9].childNodes[1].attrs == undefined
            || tr.childNodes[9].childNodes[1].attrs[0] == undefined
            || tr.childNodes[9].childNodes[1].attrs[0].value == undefined) {
            return '';
        }
        return tr.childNodes[9].childNodes[1].attrs[0].value.trim();
    };
    return MagicParser;
}());
MagicParser.p = require("parse5");
MagicParser.getTagName = function (doc) {
    if (doc == undefined)
        return doc;
    return doc.tagName;
};
MagicParser.getClassName = function (doc) {
    if (doc.attrs == undefined)
        return undefined;
    return MagicParser.getAttr(doc.attrs, 'class');
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MagicParser;
//# sourceMappingURL=MagicParser.js.map