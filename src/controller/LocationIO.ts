import {GeoResponse} from "./IInsightFacade"
/**
 * Created by Nyanko on 2/7/2017.
 */

/**
 * using a lot of functionalities from IOProcessing
 * TODO: need to separate the other functionalities from IOProcessing into CourseIO
 */
export default class LocationIO {
    TEAM_NUMBER: number = 15;

    public static getGeoLocation(address: string): Promise<GeoResponse> {
        let that : any = this;
        return new Promise<GeoResponse>(function (fulfill, reject) {
            try {
                let http: any = require("http");
                //get lan/lon pair by sending a query GET request using node http module to http://skaha.cs.ubc.ca:11316/api/v1/team15/<ADDRESS>
                //<ADDRESS> is URL-encoded version of rooms_address
                //achieved by replace space with %20
                let urlAddress: string = address.replace(/ /g, "%20");
                // console.log(urlAddress);
                let aPath: string = "/api/v1/team" + that.TEAM_NUMBER + "/" + urlAddress;
                let options: any = {
                    host: "skaha.cs.ubc.ca",
                    port: 11316,
                    path: aPath
                };
                let url: string = "http://skaha.cs.ubc.ca:11316/api/v1/team" + that.TEAM_NUMBER + "/" + urlAddress;
                // console.log(url);
                http.get(options, function (res: any) {
                    // console.log(Object.keys(res));
                    let rawData: string = "";
                    res.on("data", function (chunk: Buffer) {
                        rawData += chunk;
                    });
                    res.on("end", function () {
                        try {
                            let geo: GeoResponse = JSON.parse(rawData);
                            // console.log(geo);
                            if (geo.error) {
                                //cannot find the geo location due to some reason
                                reject(geo);
                            }
                            else {
                                fulfill(geo);
                            }
                        } catch (e) {
                            //something went wrong with http.get
                            reject(e);
                        }
                    });
                });
            }catch(e){
                //uncaught error such as getaddrinfo
                reject(e);
            }
        });
    }
}