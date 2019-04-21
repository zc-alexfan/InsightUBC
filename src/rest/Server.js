"use strict";
var restify = require("restify");
var Util_1 = require("../Util");
var InsightFacade_1 = require("../controller/InsightFacade");
var Query_1 = require("../controller/Query");
var Room_1 = require("../controller/Room");
var Section_1 = require("../controller/Section");
var Schedule_1 = require("../controller/Schedule");
var Server = (function () {
    function Server(port) {
        Util_1.default.info("Server::<init>( " + port + " )");
        this.port = port;
        this.insight = new InsightFacade_1.default();
    }
    Server.prototype.stop = function () {
        Util_1.default.info('Server::close()');
        var that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    };
    Server.prototype.start = function () {
        var that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Util_1.default.info('Server::start() - start');
                that.rest = restify.createServer({
                    name: 'insightUBC'
                });
                that.rest.use(restify.CORS());
                that.rest.use(restify.bodyParser({ mapParams: true, mapFiles: true }));
                that.rest.get('/.*/', restify.serveStatic({
                    'directory': __dirname + '/views',
                    'default': 'index_working.html'
                }));
                that.rest.put('/dataset/:id', function (req, res, next) {
                    try {
                        var id = req.params.id;
                        Util_1.default.info("PUT /dataset/" + id);
                        var dataStr = new Buffer(req.params.body).toString('base64');
                        that.insight.addDataset(id, dataStr).then(function (r) {
                            console.log("PUT result:>>>>");
                            console.log(r);
                            console.log("<<<<<");
                            res.json(r.code, r.body);
                        }).catch(function (r) {
                            res.json(r.code, r.body);
                        });
                    }
                    catch (err) {
                        res.json(400, err.message);
                    }
                    return next();
                });
                that.rest.post('/query', function (request, respond, next) {
                    Util_1.default.info('POST /query');
                    Query_1.default.prettyPrint(request.body);
                    that.insight.performQuery(request.body).then(function (r) {
                        console.log("POST result:>>>>");
                        console.log(r);
                        console.log("<<<<<");
                        respond.json(r.code, r.body);
                    }).catch(function (r) {
                        console.log("POST result [ERROR]:>>>>");
                        console.log(r);
                        console.log("<<<<<");
                        respond.json(r.code, r.body);
                    });
                    return next();
                });
                that.rest.post('/schedule', function (request, respond, next) {
                    Util_1.default.info('POST /schedule');
                    Query_1.default.prettyPrint(request.body);
                    var rooms_list = request.body.rooms;
                    var courses_list = request.body.courses;
                    var rooms = Room_1.default.constructVecRoom(rooms_list);
                    var sections = Section_1.default.constructVecSection(courses_list);
                    var remainedSections = Schedule_1.default.scheduleAllRooms(sections, rooms);
                    var finalResult = {};
                    var remain = [];
                    remainedSections.forEach(function (sec) {
                        remain.push(sec.getidOnly());
                    });
                    var schedule_result = {};
                    rooms.forEach(function (oneRoom) {
                        var mon_list = oneRoom.getMonSchedule();
                        var tues_list = oneRoom.getTuesSchedule();
                        var room = {};
                        room['mon_list'] = mon_list;
                        room['tues_list'] = tues_list;
                        schedule_result[oneRoom.getName()] = room;
                    });
                    finalResult['schedule'] = schedule_result;
                    finalResult['remain'] = remain;
                    finalResult['score'] = (remain.length / sections.length) * 100;
                    Query_1.default.prettyPrint(finalResult);
                    respond.json(200, finalResult);
                    return next();
                });
                that.rest.del('/dataset/:id', function (request, respond, next) {
                    var id = request.params['id'];
                    console.log('DELETE /dataset/' + id);
                    that.insight.removeDataset(id).then(function (r) {
                        console.log("DELETE result:>>>>");
                        console.log(r);
                        console.log("<<<<<");
                        respond.json(r.code, r.body);
                    }).catch(function (r) {
                        console.log("DELETE result [ERROR]:>>>>");
                        console.log(r);
                        console.log("<<<<<");
                        respond.json(r.code, r.body);
                    });
                    return next();
                });
                that.rest.get('/echo/:msg', Server.echo);
                that.rest.listen(that.port, function () {
                    Util_1.default.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                });
                that.rest.on('error', function (err) {
                    reject(err);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    };
    Server.echo = function (req, res, next) {
        Util_1.default.trace('Server::echo(..) - params: ' + JSON.stringify(req.params));
        try {
            var result = Server.performEcho(req.params.msg);
            Util_1.default.info('Server::echo(..) - responding ' + result.code);
            res.json(result.code, result.body);
        }
        catch (err) {
            Util_1.default.error('Server::echo(..) - responding 400');
            res.json(400, { error: err.message });
        }
        return next();
    };
    Server.performEcho = function (msg) {
        if (typeof msg !== 'undefined' && msg !== null) {
            return { code: 200, body: { message: msg + '...' + msg } };
        }
        else {
            return { code: 400, body: { error: 'Message not provided' } };
        }
    };
    return Server;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
//# sourceMappingURL=Server.js.map