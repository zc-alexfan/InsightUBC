"use strict";
var LocationIO = (function () {
    function LocationIO() {
        this.TEAM_NUMBER = 15;
    }
    LocationIO.getGeoLocation = function (address) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            try {
                var http = require("http");
                var urlAddress = address.replace(/ /g, "%20");
                var aPath = "/api/v1/team" + that.TEAM_NUMBER + "/" + urlAddress;
                var options = {
                    host: "skaha.cs.ubc.ca",
                    port: 11316,
                    path: aPath
                };
                var url = "http://skaha.cs.ubc.ca:11316/api/v1/team" + that.TEAM_NUMBER + "/" + urlAddress;
                http.get(options, function (res) {
                    var rawData = "";
                    res.on("data", function (chunk) {
                        rawData += chunk;
                    });
                    res.on("end", function () {
                        try {
                            var geo = JSON.parse(rawData);
                            if (geo.error) {
                                reject(geo);
                            }
                            else {
                                fulfill(geo);
                            }
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return LocationIO;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LocationIO;
//# sourceMappingURL=LocationIO.js.map