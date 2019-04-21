/**
 * Starts the server. It is unlikely you will have to change anything here.
 */
import Server from './rest/Server';
import Log from './Util';

/**
 * Starts the server; doesn't listen to whether the start was successful.
 */
export default class App {
    private server:any;
    public initServer(port: number) {
        Log.info('App::initServer( ' + port + ' ) - start');

        this.server = new Server(port);
        this.server.start().then(function (val: boolean) {
            Log.info("App::initServer() - started: " + val);
        }).catch(function (err: Error) {
            Log.error("App::initServer() - ERROR: " + err.message);
        });
    }

    public stopServer(){
        this.server.stop().then(
            (x:any)=>{
                Log.info('App:server stopped');
            }
        );
    }
}

// This ends up starting the whole system and listens on a hardcoded port (4321)
Log.info('App - starting');
let app = new App();
app.initServer(4321);



