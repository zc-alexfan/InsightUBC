/**
 * Created by Robin on 1/20/2017.
 */

import Entry from "./Entry";
import MagicParser from "./MagicParser";

/** Just wanted to put all of the I/O stuff in their own class */
export default class IOProcessing {
    //keys from JSON objects which we loaded
    static KEYS_B: string[] = ['Subject', 'Course', 'Avg', 'Professor', 'Title', 'Pass', 'Fail', 'Audit', 'Section', 'Year', 'id'];
    path: string = "cache"; //should be in this folder

    constructor() {
        // Log.trace('InsightFacadeImpl::init()');
    }

    DATASETS :any = {
        "rooms": (zip:any):Promise<JSON[]>=>{return this.processRooms(zip);},
        "courses": (zip:any, filenames:string[]):Promise<JSON[]>=>{return this.processCourses(filenames,zip);}
    };

    static readFilePromise(path: string, encoding: string): Promise<string> {
        return new Promise<string>(
            function (fulfill, reject) {
                let fs: any = require('fs');
                fs.readFile(path, encoding,
                    function (err: any, data: string) {
                        if (err) reject(err);
                        fulfill(data);
                    }
                );
            }
        );
    }


    loadDataFromBuffer(id: string, data: string): Promise<JSON[]> {
        let that = this;
        let data_to_be_fulfilled: JSON[] = null;
        return new Promise<JSON[]>(function (fulfill, reject) {
            that.processData(id,data)
                .then(function (new_data: JSON[]) {
                    data_to_be_fulfilled = new_data;
                    return that.saveDataToDisk(id, new_data);
                    // fulfill(new_data);
                })
                .then(function () {
                    fulfill(data_to_be_fulfilled);
                })
                .catch(function (err: Error) {
                    reject(err);
                });
        });
    }

    /**
     * Convert buffer into string[]
     * @param content
     * @param id
     * @returns {Promise<string>}
     * @requires JSZip
     * @pre content is encoded in base64
     */
    processData(id:string, content:string ): Promise<JSON[]> {
        let that = this;
        return new Promise<JSON[]>(function (fulfill, reject) {
            let filenames: string[] = [];
            let jszip: any = require("jszip");
            let zip: any = jszip();
            zip.loadAsync(content, {base64: true})
                .then(function (data: any) {
                    Object.keys(data.files).forEach(function (fname) {
                        // console.log(filename);
                        filenames.push(fname);
                    });
                    //this won't ever cause an error since filenames is array []
                    filenames.splice(0, 1); //get rid of first index, that is the folder name
                    //TODO reading after deleting causes .zip to contain extra info?
                    // console.log("ID is " + id);
                    // console.log(filenames.length);
                    try {
                        let p: Promise<any> = that.DATASETS[id](zip,filenames);
                        return p;
                    }
                    catch(e){
                        return reject(new Error("invalid file name: "+id));
                    }
                })
                .then(function(js: JSON[]){
                    // console.log("js are here");
                    fulfill(js);
                })
                .catch(function (err: any) {
                    reject(err);
                });
        })
    }

    processRooms: any = function(zip:any):Promise<JSON[]>{
        let that: any = this;
        return new Promise<JSON[]>(function(fulfill,reject){
            // console.log(filenames);
            // console.log("in rooms");
            return zip.file("index.htm").async("string")
                .then (function(html: string){
                    // console.log("read index.htm");
                    return that.getBuildings(html);
                })
                .then(function(buildings:string[]){
                    // console.log(buildings.length);
                    return Promise.all(buildings.map(function(building){return that.readAndParseRoom(building,zip);}));
                })
                .then(function(normalizedContents: JSON[][]){
                    // console.log(normalizedContents);
                    let contents: JSON[] = [];
                    for (let i in normalizedContents) {
                        for (let j in normalizedContents[i]) {
                            if (normalizedContents[i][j] !== undefined) {
                                contents.push(normalizedContents[i][j]);
                            }
                        }
                    }
                    // console.log(contents);
                    fulfill(contents);
                })
                .catch(function(err:any){
                    reject(err);
                })
        });
    };

    getBuildings(html: string):Promise<string[]> {
        return new Promise<string[]>(function(fulfill,reject){
            try {
                let magic: MagicParser = new MagicParser(html);
                let parse5: any = require("parse5");
                let links: any[] = magic.findElementsByClassName("views-field views-field-nothing");
                let innerString = "";
                links.map(function (link: any) {
                    innerString += parse5.serialize(link)
                });
                // console.log(links.length);
                // console.log(innerString);
                magic = new MagicParser(innerString);
                let anchors: any[] = magic.findElementsByTagName("a");
                // console.log(anchors[1]["attrs"][0]);

                let hrefs: string[] = anchors.map(MagicParser.findHref);

                //delete the first ./ tag names
                let modifiedHrefs: string[] = hrefs.map(function (href) {
                    return href.replace(/\.\//g, "")
                });
                // console.log(modifiedHrefs.length);
                // console.log(modifiedHrefs);
                fulfill(modifiedHrefs);
            }
            catch(e){
                //seems like no need to reject here?
                reject(e);
            }
        });
    }

    readAndParseRoom(link: string,zip:any):Promise<any[]>{
        let that : any = this;
        return new Promise<JSON[]> (function(fulfill,reject){
            // console.log(link);
           zip.file(link).async("string")
               .then(function(html:string){
                   let shortname :string = link.slice(link.lastIndexOf("/")+1);
                   // console.log(shortname);
                   let magic = new MagicParser(html);
                   return magic.tableRealizer(shortname);
               })
               .then(function(entries: any[]){
                   fulfill(entries);
               })
               .catch(function(e:any){
                   reject(e);
               });
        });
    }

    processCourses: any = function(filenames: string[],zip:any): Promise<JSON[]> {
        let that = this;
        return new Promise<JSON[]>(function (fulfill, reject) {
                let newFileNames : string[] = [];
                filenames.map(function(f){
                    if (f.indexOf("courses/")!= -1){
                        newFileNames.push(f);
                    }
                });
                return Promise.all(
                    filenames.map(function (fname: string) {
                        // console.log(fname);
                        return zip.file(fname).async('string');
                    }))
                .then(function (contents: string[]) {
                    return Promise.all(contents.map(that.normalize));
                })
                .then(function (normalizedContents: string[][]) {
                    let contents: JSON[] = [];
                    for (let i in normalizedContents) {
                        for (let j in normalizedContents[i]) {
                            if (normalizedContents[i][j] !== undefined) {
                                contents.push(JSON.parse(normalizedContents[i][j]));
                            }
                        }
                    }
                    fulfill(contents);
                })
                .catch(function (err: any) {
                    reject(err);
                });
        });
    };

    /**
     * Normalize 1 entry
     * @param entry
     * @returns {Promise<JSON>}
     * @pre make sure entry is defined
     * @note this function also gets rid of "overall" sections
     */
    static normalizeOneJson(entry: any): Promise<string> {
        // console.log("here in normalizedOneJson");
        // console.log(entry);
        let parsedEntry: Entry;
        //this promise will only fulfill
        return new Promise<string>(function (fulfill) {
            //make sure all keys are present
            //    static KEYS_B :string[]=['Subject','Course','Avg','Professor','Title','Pass','Fail','Audit','Section','Year','id'];
                if (entry === undefined || entry === null
                    || entry["Subject"] === undefined || entry["Course"] === undefined
                    || entry["Avg"] === undefined || entry["Professor"] === undefined
                    || entry["Title"] === undefined || entry["Pass"] === undefined
                    || entry["Fail"] === undefined || entry["Audit"] === undefined
                    || entry["Section"] === undefined || entry["Year"] === undefined
                    || entry["id"] === undefined) {
                    // reject(new Error("Invalid dataset"));
                    fulfill(undefined); //should not reject invalid data, just skip them
                }
                else {
                    //made sure all keys exist
                    let dept: string = entry[IOProcessing.KEYS_B[0]];
                    let id: string = entry[IOProcessing.KEYS_B[1]];
                    let avg: number = entry[IOProcessing.KEYS_B[2]];
                    let instructor: string = entry[IOProcessing.KEYS_B[3]];
                    let title: string = entry[IOProcessing.KEYS_B[4]];
                    let pass: number = Number(entry[IOProcessing.KEYS_B[5]]);
                    let fail: number = Number(entry[IOProcessing.KEYS_B[6]]);
                    let audit: number = entry[IOProcessing.KEYS_B[7]];
                    let section: string = entry[IOProcessing.KEYS_B[8]];
                    let sectionSize: number = pass+fail;
                    let year: number;
                    if (section == "overall"){
                        year = 1900;
                    }
                    else{
                        year = Number(entry[IOProcessing.KEYS_B[9]]);
                    }
                    let uuid: string = String(entry[IOProcessing.KEYS_B[10]]);
                    parsedEntry = new Entry(dept, id, avg, instructor, title, pass, fail, audit, section, year, uuid,sectionSize);
                    if (parsedEntry.isValid()) {
                        fulfill(JSON.stringify(parsedEntry));
                    }
                    else {
                        // console.log(parsedEntry);
                        // reject(new Error('JSON contains invalid data'));
                        fulfill(undefined); // should not reject
                    }
                }
        });
    }

    /**
     * Normalize the keys in B (read from zip) to keys in A (stored data)
     * @param content
     * @returns {Promise<T>}
     * @pre it is assumed that content has key 'result', which is an array
     */
    normalize(content: string): Promise<JSON[]> {
        return new Promise(function (fulfill, reject) {
            try {
                let contentAsJSON: any = JSON.parse(content);
                let resultList: JSON[] = contentAsJSON['result'];

                Promise.all(resultList.map(function (entry: any) {
                    return IOProcessing.normalizeOneJson(entry);
                }))
                    .then(function (parsedList: string[]) {
                        // console.log(parsedList);
                        fulfill(parsedList);
                    })
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Remove from disk
     */
    removeFileFromDisk(id: string): Promise<void> {
        let that: any = this;
        return new Promise<void>(function (fulfill, reject) {
                let fs: any = require('fs');
                let path: string = that.path + "/" + id;
                if (fs.existsSync(path)) {

                    fs.unlinkSync(path);
                    fulfill();
                }
                else {
                    reject(new Error('Cannot remove file, it does not exist'));
                }
        });
    }

    /**
     * Save to disk
     * @param id
     * @param data
     */
    saveDataToDisk(id: string, data: JSON[]): Promise<void> {
        let that: any = this;
        return new Promise<void>(function (fulfill, reject) {
            // console.log(data.length);
            try {
                if (data == null || data == undefined || data.length === 0) {
                    reject(new Error('Cannot set a valid file that does not contain any real data.'));
                }
                else {
                    try {
                        let fs: any = require('fs');
                        let path: string = that.path + "/" + id;
                        if (!fs.existsSync(that.path)) {
                            fs.mkdirSync(that.path);
                        }
                        fs.writeFile(path, JSON.stringify(data), function (err: Error) {
                            if (err) reject(err);
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
        })
    }

    /**
     * Check if id is a name of a directory
     * @param id the name of the zip file to be found
     * @returns {Promise<boolean>}
     */
    isExistId(id: string): boolean {
        let fs: any = require('fs');
        let path: string = this.path +"/"+id;
        return fs.existsSync(path);
    }
}