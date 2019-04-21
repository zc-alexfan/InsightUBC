/**
 * This is the REST entry point for the project.
 * Restify is configured here.
 */

import restify = require('restify');

import Log from "../Util";
import {InsightResponse} from "../controller/IInsightFacade";
import InsightFacade from "../controller/InsightFacade";
import IOProcessing from "../controller/IOProcessing";
import Query from "../controller/Query"
import Room from "../controller/Room"
import Section from "../controller/Section"
import Schedule from "../controller/Schedule"

/**
 * This configures the REST endpoints for the server.
 */
export default class Server {

    private port: number;
    private rest: restify.Server;
    private insight:InsightFacade;
    private html:string;

    constructor(port: number) {
        Log.info("Server::<init>( " + port + " )");
        this.port = port;
        this.insight = new InsightFacade();
    }

    /**
     * Stops the server. Again returns a promise so we know when the connections have
     * actually been fully closed and the port has been released.
     *
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        Log.info('Server::close()');
        let that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    }

    /**
     * Starts the server. Returns a promise with a boolean value. Promises are used
     * here because starting the server takes some time and we want to know when it
     * is done (and if it worked).
     *
     * @returns {Promise<boolean>}
     */
    public start(): Promise<boolean> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Log.info('Server::start() - start');

                that.rest = restify.createServer({
                    name: 'insightUBC'
                });


                that.rest.use(restify.CORS());
                that.rest.use(restify.bodyParser({mapParams: true, mapFiles: true}));

                that.rest.get('/.*/',
                    restify.serveStatic({
                            'directory': __dirname + '/views',
                            'default': 'index_working.html'
                        }
                    )
                );


                that.rest.put('/dataset/:id', function(req, res, next){
                    try {
                        let id = req.params.id;
                        Log.info("PUT /dataset/" + id);

                        let dataStr = new Buffer(req.params.body).toString('base64');
                        that.insight.addDataset(id, dataStr).then(
                            (r: InsightResponse) => {
                                console.log("PUT result:>>>>"); console.log(r); console.log("<<<<<");
                                res.json(r.code, r.body);
                            }
                        ).catch(
                            (r: any) => {
                                res.json(r.code, r.body);
                            }
                        );
                    }catch(err){
                        res.json(400, err.message);
                    }
                    return next();
                });

                that.rest.post('/query', function(request, respond, next){
                    Log.info('POST /query');
                    Query.prettyPrint(request.body);
                    that.insight.performQuery(request.body).then(
                        (r:InsightResponse)=>{
                            console.log("POST result:>>>>"); console.log(r); console.log("<<<<<");
                            respond.json(r.code, r.body);
                        }
                    ).catch(
                        (r:any)=>{
                            console.log("POST result [ERROR]:>>>>"); console.log(r); console.log("<<<<<");
                            respond.json(r.code, r.body);
                        }
                    );
                    return next();
                });

                that.rest.post('/schedule', function(request, respond, next){
                    Log.info('POST /schedule');
                    Query.prettyPrint(request.body);

                    let rooms_list:any = request.body.rooms;
                    let courses_list:any = request.body.courses;

                    let rooms:Room[] = Room.constructVecRoom(rooms_list);
                    let sections:Section[] = Section.constructVecSection(courses_list);
                    let remainedSections = Schedule.scheduleAllRooms(sections, rooms);
                    let finalResult:any = {};

                    let remain:string[] = [];
                    remainedSections.forEach(
                        (sec)=>{
                            remain.push(sec.getidOnly());
                        }
                    );


                    let schedule_result:any = {};
                    rooms.forEach(
                        (oneRoom:Room)=>{
                            let mon_list:any = oneRoom.getMonSchedule();
                            let tues_list:any = oneRoom.getTuesSchedule();
                            let room:any = {}; room['mon_list'] = mon_list; room['tues_list'] = tues_list;
                            schedule_result[oneRoom.getName()] = room;
                        }
                    );

                    finalResult['schedule'] = schedule_result;
                    finalResult['remain'] = remain;
                    finalResult['score'] = (remain.length/sections.length)*100;

                    Query.prettyPrint(finalResult);
                    respond.json(200, finalResult);
                    return next();

                });


                that.rest.del('/dataset/:id', function(request, respond, next){
                    let id = request.params['id'];
                    console.log('DELETE /dataset/' + id);
                    that.insight.removeDataset(id).then(
                        function (r:InsightResponse){
                            console.log("DELETE result:>>>>"); console.log(r); console.log("<<<<<");
                            respond.json(r.code, r.body);
                        }
                    ).catch(
                        (r:InsightResponse)=>{
                            console.log("DELETE result [ERROR]:>>>>"); console.log(r); console.log("<<<<<");
                            respond.json(r.code, r.body);
                        }
                    );
                    return next();
                });
                
                // provides the echo service
                // curl -is  http://localhost:4321/echo/myMessage
                that.rest.get('/echo/:msg', Server.echo);

                // Other endpoints will go here
                that.rest.listen(that.port, function () {
                    Log.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                });

                that.rest.on('error', function (err: string) {
                    // catches errors in restify start; unusual syntax due to internal node not using normal exceptions here
                    //Log.info('Server::start() - restify ERROR: ' + err);
                    reject(err);
                });
            } catch (err) {
                //Log.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    }

    // The next two methods handle the echo service.
    // These are almost certainly not the best place to put these, but are here for your reference.
    // By updating the Server.echo function pointer above, these methods can be easily moved.

    public static echo(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('Server::echo(..) - params: ' + JSON.stringify(req.params));
        try {
            let result = Server.performEcho(req.params.msg);
            Log.info('Server::echo(..) - responding ' + result.code);
            res.json(result.code, result.body);
        } catch (err) {
            Log.error('Server::echo(..) - responding 400');
            res.json(400, {error: err.message});
        }
        return next();
    }

    public static performEcho(msg: string): InsightResponse {
        if (typeof msg !== 'undefined' && msg !== null) {
            return {code: 200, body: {message: msg + '...' + msg}};
        } else {
            return {code: 400, body: {error: 'Message not provided'}};
        }
    }

}
