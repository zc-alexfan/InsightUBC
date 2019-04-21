"use strict";
var Entry_1 = require("./Entry");
var MagicParser_1 = require("./MagicParser");
var IOProcessing = (function () {
    function IOProcessing() {
        var _this = this;
        this.path = "cache";
        this.DATASETS = {
            "rooms": function (zip) { return _this.processRooms(zip); },
            "courses": function (zip, filenames) { return _this.processCourses(filenames, zip); }
        };
        this.processRooms = function (zip) {
            var that = this;
            return new Promise(function (fulfill, reject) {
                return zip.file("index.htm").async("string")
                    .then(function (html) {
                    return that.getBuildings(html);
                })
                    .then(function (buildings) {
                    return Promise.all(buildings.map(function (building) { return that.readAndParseRoom(building, zip); }));
                })
                    .then(function (normalizedContents) {
                    var contents = [];
                    for (var i in normalizedContents) {
                        for (var j in normalizedContents[i]) {
                            if (normalizedContents[i][j] !== undefined) {
                                contents.push(normalizedContents[i][j]);
                            }
                        }
                    }
                    fulfill(contents);
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        };
        this.processCourses = function (filenames, zip) {
            var that = this;
            return new Promise(function (fulfill, reject) {
                var newFileNames = [];
                filenames.map(function (f) {
                    if (f.indexOf("courses/") != -1) {
                        newFileNames.push(f);
                    }
                });
                return Promise.all(filenames.map(function (fname) {
                    return zip.file(fname).async('string');
                }))
                    .then(function (contents) {
                    return Promise.all(contents.map(that.normalize));
                })
                    .then(function (normalizedContents) {
                    var contents = [];
                    for (var i in normalizedContents) {
                        for (var j in normalizedContents[i]) {
                            if (normalizedContents[i][j] !== undefined) {
                                contents.push(JSON.parse(normalizedContents[i][j]));
                            }
                        }
                    }
                    fulfill(contents);
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        };
    }
    IOProcessing.readFilePromise = function (path, encoding) {
        return new Promise(function (fulfill, reject) {
            var fs = require('fs');
            fs.readFile(path, encoding, function (err, data) {
                if (err)
                    reject(err);
                fulfill(data);
            });
        });
    };
    IOProcessing.prototype.loadDataFromBuffer = function (id, data) {
        var that = this;
        var data_to_be_fulfilled = null;
        return new Promise(function (fulfill, reject) {
            that.processData(id, data)
                .then(function (new_data) {
                data_to_be_fulfilled = new_data;
                return that.saveDataToDisk(id, new_data);
            })
                .then(function () {
                fulfill(data_to_be_fulfilled);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    IOProcessing.prototype.processData = function (id, content) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            var filenames = [];
            var jszip = require("jszip");
            var zip = jszip();
            zip.loadAsync(content, { base64: true })
                .then(function (data) {
                Object.keys(data.files).forEach(function (fname) {
                    filenames.push(fname);
                });
                filenames.splice(0, 1);
                try {
                    var p = that.DATASETS[id](zip, filenames);
                    return p;
                }
                catch (e) {
                    return reject(new Error("invalid file name: " + id));
                }
            })
                .then(function (js) {
                fulfill(js);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    IOProcessing.prototype.getBuildings = function (html) {
        return new Promise(function (fulfill, reject) {
            try {
                var magic = new MagicParser_1.default(html);
                var parse5_1 = require("parse5");
                var links = magic.findElementsByClassName("views-field views-field-nothing");
                var innerString_1 = "";
                links.map(function (link) {
                    innerString_1 += parse5_1.serialize(link);
                });
                magic = new MagicParser_1.default(innerString_1);
                var anchors = magic.findElementsByTagName("a");
                var hrefs = anchors.map(MagicParser_1.default.findHref);
                var modifiedHrefs = hrefs.map(function (href) {
                    return href.replace(/\.\//g, "");
                });
                fulfill(modifiedHrefs);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    IOProcessing.prototype.readAndParseRoom = function (link, zip) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            zip.file(link).async("string")
                .then(function (html) {
                var shortname = link.slice(link.lastIndexOf("/") + 1);
                var magic = new MagicParser_1.default(html);
                return magic.tableRealizer(shortname);
            })
                .then(function (entries) {
                fulfill(entries);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    IOProcessing.normalizeOneJson = function (entry) {
        var parsedEntry;
        return new Promise(function (fulfill) {
            if (entry === undefined || entry === null
                || entry["Subject"] === undefined || entry["Course"] === undefined
                || entry["Avg"] === undefined || entry["Professor"] === undefined
                || entry["Title"] === undefined || entry["Pass"] === undefined
                || entry["Fail"] === undefined || entry["Audit"] === undefined
                || entry["Section"] === undefined || entry["Year"] === undefined
                || entry["id"] === undefined) {
                fulfill(undefined);
            }
            else {
                var dept = entry[IOProcessing.KEYS_B[0]];
                var id = entry[IOProcessing.KEYS_B[1]];
                var avg = entry[IOProcessing.KEYS_B[2]];
                var instructor = entry[IOProcessing.KEYS_B[3]];
                var title = entry[IOProcessing.KEYS_B[4]];
                var pass = Number(entry[IOProcessing.KEYS_B[5]]);
                var fail = Number(entry[IOProcessing.KEYS_B[6]]);
                var audit = entry[IOProcessing.KEYS_B[7]];
                var section = entry[IOProcessing.KEYS_B[8]];
                var sectionSize = pass + fail;
                var year = void 0;
                if (section == "overall") {
                    year = 1900;
                }
                else {
                    year = Number(entry[IOProcessing.KEYS_B[9]]);
                }
                var uuid = String(entry[IOProcessing.KEYS_B[10]]);
                parsedEntry = new Entry_1.default(dept, id, avg, instructor, title, pass, fail, audit, section, year, uuid, sectionSize);
                if (parsedEntry.isValid()) {
                    fulfill(JSON.stringify(parsedEntry));
                }
                else {
                    fulfill(undefined);
                }
            }
        });
    };
    IOProcessing.prototype.normalize = function (content) {
        return new Promise(function (fulfill, reject) {
            try {
                var contentAsJSON = JSON.parse(content);
                var resultList = contentAsJSON['result'];
                Promise.all(resultList.map(function (entry) {
                    return IOProcessing.normalizeOneJson(entry);
                }))
                    .then(function (parsedList) {
                    fulfill(parsedList);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    };
    IOProcessing.prototype.removeFileFromDisk = function (id) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            var fs = require('fs');
            var path = that.path + "/" + id;
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
                fulfill();
            }
            else {
                reject(new Error('Cannot remove file, it does not exist'));
            }
        });
    };
    IOProcessing.prototype.saveDataToDisk = function (id, data) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            try {
                if (data == null || data == undefined || data.length === 0) {
                    reject(new Error('Cannot set a valid file that does not contain any real data.'));
                }
                else {
                    try {
                        var fs = require('fs');
                        var path = that.path + "/" + id;
                        if (!fs.existsSync(that.path)) {
                            fs.mkdirSync(that.path);
                        }
                        fs.writeFile(path, JSON.stringify(data), function (err) {
                            if (err)
                                reject(err);
                            fulfill();
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            }
            catch (err) {
                reject(err);
            }
        });
    };
    IOProcessing.prototype.isExistId = function (id) {
        var fs = require('fs');
        var path = this.path + "/" + id;
        return fs.existsSync(path);
    };
    return IOProcessing;
}());
IOProcessing.KEYS_B = ['Subject', 'Course', 'Avg', 'Professor', 'Title', 'Pass', 'Fail', 'Audit', 'Section', 'Year', 'id'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IOProcessing;
//# sourceMappingURL=IOProcessing.js.map