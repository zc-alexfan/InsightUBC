/**
 * Created by zfan on 2017-03-19.
 */
/* This is a JS file, NOT babel */
let displayError = (msg, id)=>{
    let tmp =   '<div class="alert alert-danger fade in">'+
        '<a href="#" class="close" data-dismiss="alert">&times;</a>'+
        '<p><strong>Error!</strong>'+msg+'</p></div>';
    document.getElementById(id).innerHTML = tmp;
}

let timetable_template = ' <table class="table"> <tbody> <tr> <th>&nbsp;</th> <th class="sun">Sun</th> <th class="mon">Mon</th> <th class="tue">Tue</th> <th class="wed">Wed</th> <th class="thu">Thu</th> <th class="fri">Fri</th> <th class="sat">Sat</th> </tr> <tr> <td> <div class="time">08:00</div> </td> <td id="Sun1" class="sun"> </td> <td id="Mon1" class="mon"> </td> <td id="Tue1" class="tue"> </td> <td id="Wed1" class="wed"> </td> <td id="Thu1" class="thu"> </td> <td id="Fri1" class="fri"> </td> <td id="Sat1" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun2" class="sun"> </td> <td id="Mon2" class="mon"> </td> <td id="Tue2" class="tue"> </td> <td id="Wed2" class="wed"> </td> <td id="Thu2" class="thu"> </td> <td id="Fri2" class="fri"> </td> <td id="Sat2" class="sat"> </td> </tr> <tr> <td> <div class="time">09:00</div> </td> <td id="Sun3" class="sun"> </td> <td id="Mon3" class="mon"> </td> <td id="Tue3" class="tue"> </td> <td id="Wed3" class="wed"> </td> <td id="Thu3" class="thu"> </td> <td id="Fri3" class="fri"> </td> <td id="Sat3" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun4" class="sun"> </td> <td id="Mon4" class="mon"> </td> <td id="Tue4" class="tue"> </td> <td id="Wed4" class="wed"> </td> <td id="Thu4" class="thu"> </td> <td id="Fri4" class="fri"> </td> <td id="Sat4" class="sat"> </td> </tr> <tr> <td> <div class="time">10:00</div> </td> <td id="Sun5" class="sun"> </td> <td id="Mon5" class="mon"> </td> <td id="Tue5" class="tue"> </td> <td id="Wed5" class="wed"> </td> <td id="Thu5" class="thu"> </td> <td id="Fri5" class="fri"> </td> <td id="Sat5" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun6" class="sun"> </td> <td id="Mon6" class="mon"> </td> <td id="Tue6" class="tue"> </td> <td id="Wed6" class="wed"> </td> <td id="Thu6" class="thu"> </td> <td id="Fri6" class="fri"> </td> <td id="Sat6" class="sat"> </td> </tr> <tr> <td> <div class="time">11:00</div> </td> <td id="Sun7" class="sun"> </td> <td id="Mon7" class="mon"> </td> <td id="Tue7" class="tue"> </td> <td id="Wed7" class="wed"> </td> <td id="Thu7" class="thu"> </td> <td id="Fri7" class="fri"> </td> <td id="Sat7" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun8" class="sun"> </td> <td id="Mon8" class="mon"> </td> <td id="Tue8" class="tue"> </td> <td id="Wed8" class="wed"> </td> <td id="Thu8" class="thu"> </td> <td id="Fri8" class="fri"> </td> <td id="Sat8" class="sat"> </td> </tr> <tr> <td> <div class="time">12:00</div> </td> <td id="Sun9" class="sun"> </td> <td id="Mon9" class="mon"> </td> <td id="Tue9" class="tue"> </td> <td id="Wed9" class="wed"> </td> <td id="Thu9" class="thu"> </td> <td id="Fri9" class="fri"> </td> <td id="Sat9" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun10" class="sun"> </td> <td id="Mon10" class="mon"> </td> <td id="Tue10" class="tue"> </td> <td id="Wed10" class="wed"> </td> <td id="Thu10" class="thu"> </td> <td id="Fri10" class="fri"> </td> <td id="Sat10" class="sat"> </td> </tr> <tr> <td> <div class="time">13:00</div> </td> <td id="Sun11" class="sun"> </td> <td id="Mon11" class="mon"> </td> <td id="Tue11" class="tue"> </td> <td id="Wed11" class="wed"> </td> <td id="Thu11" class="thu"> </td> <td id="Fri11" class="fri"> </td> <td id="Sat11" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun12" class="sun"> </td> <td id="Mon12" class="mon"> </td> <td id="Tue12" class="tue"> </td> <td id="Wed12" class="wed"> </td> <td id="Thu12" class="thu"> </td> <td id="Fri12" class="fri"> </td> <td id="Sat12" class="sat"> </td> </tr> <tr> <td> <div class="time">14:00</div> </td> <td id="Sun13" class="sun"> </td> <td id="Mon13" class="mon"> </td> <td id="Tue13" class="tue"> </td> <td id="Wed13" class="wed"> </td> <td id="Thu13" class="thu"> </td> <td id="Fri13" class="fri"> </td> <td id="Sat13" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun14" class="sun"> </td> <td id="Mon14" class="mon"> </td> <td id="Tue14" class="tue"> </td> <td id="Wed14" class="wed"> </td> <td id="Thu14" class="thu"> </td> <td id="Fri14" class="fri"> </td> <td id="Sat14" class="sat"> </td> </tr> <tr> <td> <div class="time">15:00</div> </td> <td id="Sun15" class="sun"> </td> <td id="Mon15" class="mon"> </td> <td id="Tue15" class="tue"> </td> <td id="Wed15" class="wed"> </td> <td id="Thu15" class="thu"> </td> <td id="Fri15" class="fri"> </td> <td id="Sat15" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun16" class="sun"> </td> <td id="Mon16" class="mon"> </td> <td id="Tue16" class="tue"> </td> <td id="Wed16" class="wed"> </td> <td id="Thu16" class="thu"> </td> <td id="Fri16" class="fri"> </td> <td id="Sat16" class="sat"> </td> </tr> <tr> <td> <div class="time">16:00</div> </td> <td id="Sun17" class="sun"> </td> <td id="Mon17" class="mon"> </td> <td id="Tue17" class="tue"> </td> <td id="Wed17" class="wed"> </td> <td id="Thu17" class="thu"> </td> <td id="Fri17" class="fri"> </td> <td id="Sat17" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun18" class="sun"> </td> <td id="Mon18" class="mon"> </td> <td id="Tue18" class="tue"> </td> <td id="Wed18" class="wed"> </td> <td id="Thu18" class="thu"> </td> <td id="Fri18" class="fri"> </td> <td id="Sat18" class="sat"> </td> </tr> <tr> <td> <div class="time">17:00</div> </td> <td id="Sun19" class="sun"> </td> <td id="Mon19" class="mon"> </td> <td id="Tue19" class="tue"> </td> <td id="Wed19" class="wed"> </td> <td id="Thu19" class="thu"> </td> <td id="Fri19" class="fri"> </td> <td id="Sat19" class="sat"> </td> </tr> <tr> <td> <div class="time">&nbsp;</div> </td> <td id="Sun20" class="sun"> </td> <td id="Mon20" class="mon"> </td> <td id="Tue20" class="tue"> </td> <td id="Wed20" class="wed"> </td> <td id="Thu20" class="thu"> </td> <td id="Fri20" class="fri"> </td> <td id="Sat20" class="sat"> </td> </tr> </tbody> </table>';



//course cols to display
let COURSES_COLS = ["courses_uuid", "courses_dept", "courses_id", "courses_year", "courses_avg","courses_pass","courses_fail", "courses_dept","courses_instructor","courses_title","courses_audit"];
let ROOMS_COLS = ["rooms_fullname","rooms_shortname","rooms_number","rooms_name", "rooms_address", "rooms_seats", "rooms_furniture","rooms_lon","rooms_lat","rooms_type","rooms_href"];
let DENSE_COURSES_COLS = [ "courses_dept", "courses_id", "totalpass", "totalfail" ];
let NUM_SEC_COURSE_COLS = [ "courses_dept", "courses_id", "numsection2014" ];
let MAX_SEC_COURSE_COLS = [ "courses_dept", "courses_id", "maxsectionsize" ];

let query_instru = {
    "WHERE": {
        "NOT":{
            "IS":{
                "courses_instructor": ""
            }
        }
    },
    "OPTIONS": {
        "COLUMNS": [
            "courses_instructor"
        ],
        "FORM": "TABLE"
    },
    "TRANSFORMATIONS": {
        "GROUP": ["courses_instructor"],
        "APPLY": [ ]
    }
};

let query_dept = {
    "WHERE": {
    },
    "OPTIONS": {
        "COLUMNS": [
            "courses_dept"
        ],
        "FORM": "TABLE"
    },
    "TRANSFORMATIONS": {
        "GROUP": ["courses_dept"],
        "APPLY": [
        ]
    }
};

let query_building = {
    "WHERE": {
    },
    "OPTIONS": {
        "COLUMNS": [
            "rooms_shortname"
        ],
        "FORM": "TABLE"
    },
    "TRANSFORMATIONS": {
        "GROUP": ["rooms_shortname"],
        "APPLY": [
        ]
    }
};

let requestData = (container, query, key_name)=>{
    let request = getReq();
    let A = [];
    request.post('/query', query)
    .then(function (response) {
        response.data.result.forEach(
            (js)=>{
                container.push(js[key_name]);
            }
        );
    }).catch(function (error) {
        alert(error.message);
    });
};

let feedAutoCompleteData = (that)=>{
    requestData(that.props.BUILDING_UNIT, query_building, "rooms_shortname");
    requestData(that.props.DEPT_UNIT, query_dept, "courses_dept");
    requestData(that.props.INSTRU_UNIT, query_instru, "courses_instructor");
};


//http://stackoverflow.com/questions/5424488/how-to-search-for-a-string-inside-an-array-of-strings
function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

let autoCompleteGeneric = (from_value, to_id, COLS)=>{
    let building = from_value.trim();
    let i = searchStringInArray(building, COLS);
    if(i != -1){
        let candidate = COLS[i];
        to_id.value = candidate;
    }
};

let convertReadyToSendCourse = (js)=>{
    let result = [];
    let keys = Object.keys(js);
    keys.forEach(
        (k)=>{
            result.push(js[k]);
        }
    );
    return result;
};

let getMaxSecCourseTransformer = ()=>{
    let trans = {
        "GROUP":[
            "courses_dept",
            "courses_id"
        ],
        "APPLY":[
            {
                "maxsectionsize":{
                    "MAX":"courses_sectionSize"
                }
            }
        ]
    };
    return trans;
}


let getNumSecCourseTransformer = ()=>{
    let trans = {
        "GROUP":[
            "courses_dept",
            "courses_id"
        ],
        "APPLY":[
            {
                "numsection2014":{
                    "COUNT":"courses_uuid"
                }
            }
        ]
    }
    return trans;
};


let getDenseCourseTransformer = ()=>{
    let trans = {
            "GROUP":[
                "courses_dept",
                "courses_id",
                "courses_uuid"
            ],
                "APPLY":[
                {
                    "totalpass":{
                        "SUM":"courses_pass"
                    }
                },
                {
                    "totalfail":{
                        "SUM":"courses_fail"
                    }
                }
            ]
        };
    return trans;
};

// This following function was taken and modified from:
// http://stackoverflow.com/questions/5180382/convert-json-data-to-a-html-table
// build data from a list of json objects
// hide_class, if more than 15 rows, the rest rows will be attached a class
function buildHtmlTable(arr, hide_class, table_id) {
    let table = document.createElement('table'),
        columns = addAllColumnHeaders(arr, table);
    let tbody = document.createElement('tbody');
    table.id = table_id;

    let k = 0;
    for (let i=0, maxi=arr.length; i < maxi; ++i) {
        let tr = document.createElement('tr');
        if(k > 15)tr.className = hide_class;
        for (let j=0, maxj=columns.length; j < maxj ; ++j) {
            let td = document.createElement('td');
            let cellValue = arr[i][columns[j]];
            if (columns[j] =="rooms_href"){
                let a = document.createElement('a');
                a.setAttribute("href",cellValue);
                a.appendChild(document.createTextNode(cellValue));
                td.appendChild(a);
            }
            else {
                td.appendChild(document.createTextNode(cellValue || ''));
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        k++;
    }
    table.appendChild(tbody);
    return table;
}

function addAllColumnHeaders(arr, table) {
    let thead = document.createElement('thead');
    let columnSet = [],tr = document.createElement('tr');
    let k = 0;
    for (let i=0, l=arr.length; i < l; i++) {
        for (let key in arr[i]) {
            if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key)===-1) {
                columnSet.push(key);
                let th =document.createElement('th');
                th.appendChild(document.createTextNode(key));
                tr.appendChild(th);
            }
        }
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    return columnSet;
}


//err: a response from the server
//just a placeholder for future query status notification
function responseExplain(res){
    res = res.response;
    let prefix = "Error(" + res.status +"): ";

    switch(res.status){
        case 400:
            return prefix + res.data.error;
            break;
        case 424:
            return prefix + res.data.error;
            break;
        default:
            return prefix + res.data.error;
    }
}


//either inject a msg or a table into the target id
//rows: array of objects, each object is one row
//disable table when msg != null
let injectTable = (rows, target_id, table_id, msg)=>{
    let target = document.getElementById(target_id); let content;
    console.log("target is: "+target_id);
    console.log("table is: "+table_id);
    console.log("msg is: "+msg);
    console.log("rows is: "+rows);
    if (rows == ""){
        msg = "Opps, nothing found";
    }
    if(msg == null){
        content = buildHtmlTable(rows, "hide_" + target_id, table_id);
        content.className = "table table-striped table-bordered table-hover table-responsive";
    }else{
        content = document.createTextNode(msg);
    }
    if(target.childNodes.length == 0){
        target.appendChild(content);
    }else{
        target.replaceChild(content,target.childNodes[0]);
    }
};

//op is ignored
let consDoneCourseWhere = (list, op)=>{
    let orjs = {}; orjs["OR"] = [];
    list.forEach(
        (js)=>{
            let dept = js['courses_dept'];
            let id = js['courses_id'];
            let andjs = { "AND": [
                {
                    "IS":{
                        "courses_id":id
                    }
                },
                {
                    "IS":{
                        "courses_dept":dept
                    }
                },
                {
                    "EQ":{
                        "courses_year":2014
                    }
                }
            ]};
            orjs["OR"].push(andjs);
        }
    );
    return orjs;
};

//construct a where with shallow depth
let consShallowWhere = (list, op)=>{
    let list_keys = []; let list_vals = []; let list_comp = [];
    list.forEach(
        (x)=>{
            list_keys.push("rooms_name");
            list_vals.push(x["rooms_name"]);
            list_comp.push("IS");
        }
    );
    if(list_vals.length != list_keys.length || list_vals.length != list_comp.length)return null;

    let where = {};
    if(op != null) {
        where[op] = [];
    }
    for(let i = 0; i< list_keys.length ;i++){
        let tmp = {};
        let tmp2 = {}; tmp2[list_keys[i]] = list_vals[i];
        tmp[list_comp[i]] = tmp2;
        if (op != null) {
            where[op].push(tmp);
        }
        else{
            where[list_comp[i]] = tmp2;
        }
    }
    return where;
};

//placeholder
//if nothing to transform, return null;
let createTransform = (groupids, applyUserDefinedIds, applykeys, applyids)=>{
    if (applyUserDefinedIds.length != applykeys.length) return null;
    if (applyUserDefinedIds.length != applyids.length) return null;
    let js = {
        "GROUP": groupids,
        "APPLY":[]
    };
    for (var i = 0; i<applyUserDefinedIds.length;i++){
        let obj = {};
        obj[applyUserDefinedIds[i]] = {};
        let ptr = obj[applyUserDefinedIds[i]];
        ptr[applykeys[i]] = applyids[i];
        js["APPLY"].push(obj);
    }
    return js;
};

//placeholder
let createOption = (cols, sortBy)=>{
    let js = {
        "COLUMNS" : cols,
        "FORM" : "TABLE"
    };
    if (sortBy != null){
        js["ORDER"] = sortBy;
    }
    return js;
};

//placeholder for generic routine to create query json
let createQuery = (where, options, transf) =>{
    let query = {};
    query["WHERE"] = where;
    query["OPTIONS"] = options;
    if(transf != null){
        query["TRANSFORMATIONS"] = transf;
    }
    return query;
};

//send a request to server using the this.state.courses (for example)
//and render the response to table_id
let renderDone = (list, that, consWhere, cols, sortby, table_id, target_id, isRoom, transf)=>{
    let where = consWhere(list, "OR"); //where constructor
    let option = createOption(cols, sortby);
    let query = createQuery(where, option, transf);
    renderQueryProcess(query, target_id, table_id, that, isRoom, renderquery_process_done);
};

let getCourseWhere = (dept, id, logic)=>{
    let list_keys = []; let list_vals = []; let list_comp = [];

    if(dept != ""){
        list_keys.push("courses_dept");
        list_vals.push(dept);
        list_comp.push("IS");
    }

    if(id != ""){
        list_keys.push("courses_id");
        list_vals.push(id);
        list_comp.push("IS");
    }

    let where;
    if (logic == "AND") {
        where = createWhere(list_keys, list_vals, list_comp, logic);
    }
    else {
        let tmp = createList(list_keys,list_vals,list_comp);
        if (tmp == ""){
            where = {"AND":[]};
        }
        else {
            where = {"AND": [{"OR": tmp}]};
        }
    }

    let eq = {
        "EQ":{
            "courses_year":2014
        }
    };

    where["AND"].push(eq);
    return where;
};

let createList =(list_keys, list_vals, list_comps)=>{
    let list = [];
    for (let i = 0; i < list_keys.length; i++){
        let tmp = {};
        let tmp2 = {}; tmp2[list_keys[i]] = list_vals[i];
        tmp[list_comps[i]] = tmp2;
        list.push(tmp);
    }
    return list;
}

let renderAdd2stage = (list, that, table_id, target_id, where, cols1, cols2, tranfs1, tranfs2)=>{
    //1st stage query
        let option = createOption(cols1, null);
        let query = createQuery(where, option, tranfs1);

        //2nd stage query
        option = createOption(cols2, null);
        let query2 = createQuery(where, option, tranfs2);
        let result = {};

        console.log(JSON.stringify(query));

        //1st stage: get num section 2014
        let request = getReq();
        request.post('/query', query)
        .then(function (response) {
            response.data.result.forEach(
                (js)=>{
                    let t = {};
                    t["courses_dept"] = js["courses_dept"];
                    t["courses_id"] = js["courses_id"];
                    t["numsection2014"] = js["numsection2014"];

                    //store in this format:
                    //result = {CPSC310:{info}, MATH220:{info}}
                    //can be converted to
                    //result = [{info}, {info}]
                    result[t["courses_dept"]+t["courses_id"]] = t;
                }
            );

            return request.post('/query',query2);
        }).then(function(response){
            //stage 2: get max section size
            response.data.result.forEach(
                (js)=>{
                    let id = js['courses_dept'] + js['courses_id'];
                    let sectionSize = js['maxsectionsize'];
                    result[id]['maxsectionsize'] = sectionSize;
                }
            );

            let newlist = convertReadyToSendCourse(result);
            // that.state.courses = addUniqueToList(that.state.courses,newlist);
            that.state.courses = that.state.courses.concat(newlist);
            that.state.courses =  uniqueObject(that.state.courses);

            if(that.state.courses.length == 0){
                injectTable(newlist, target_id, table_id, 'Oops~~ Nothing is found (200).');
            }else{
                injectTable(newlist, target_id, table_id, null);
            }
        }).catch(function (error) {
            alert(error.message);
        });
};

let uniqueObject = (list)=>{
    let myMap = new Map();
    let new_list = [];
    for (let i of list){
        let unique_string = "";
        let keys = Object.keys(i);
        for (let j of keys){
            unique_string += i[j];
        }
        if (myMap.get(unique_string) == undefined){
            new_list.push(i);
            myMap.set(unique_string,0);
        }
    }
    console.log(new_list);
    console.log(myMap);
    return new_list;
}


//send a request to server using the this.state.courses (for example)
//and render the response to table_id
let renderDone2stage = (list, that, table_id, target_id)=>{
    //1st stage query
    let where = consDoneCourseWhere(list, "OR"); //where constructor
    let option = createOption(NUM_SEC_COURSE_COLS, null);
    let query = createQuery(where, option, getNumSecCourseTransformer());


    //2nd stage query
    where = consDoneCourseWhere(list, "OR"); //where constructor
    option = createOption(MAX_SEC_COURSE_COLS, null);
    let query2 = createQuery(where, option, getMaxSecCourseTransformer());

    let result = {};

    //1st stage: get num section 2014
    let request = getReq();

    request.post('/query', query)
    .then(function (response) {
        response.data.result.forEach(
            (js)=>{
                let t = {};
                t["courses_dept"] = js["courses_dept"];
                t["courses_id"] = js["courses_id"];
                t["numsection2014"] = js["numsection2014"];

                //store in this format:
                //result = {CPSC310:{info}, MATH220:{info}}
                //can be converted to
                //result = [{info}, {info}]
                result[t["courses_dept"]+t["courses_id"]] = t;
            }
        );

        return request.post('/query',query2);
    }).then(function(response){
        //stage 2: get max section size
        response.data.result.forEach(
            (js)=>{
                let id = js['courses_dept'] + js['courses_id'];
                let sectionSize = js['maxsectionsize'];
                result[id]['maxsectionsize'] = sectionSize;
            }
        );

        that.state.courses = convertReadyToSendCourse(result);

        if(that.state.courses.length == 0){
            injectTable(that.state.courses, target_id, table_id, 'Oops~~ Nothing is found (200).');
        }else{
            injectTable(that.state.courses, target_id, table_id, null);
        }
    }).catch(function (error) {
        alert(error.message);
    });




};


//convert a js object of response into a this.state.courses (e.g.)
let roomConverter = (js, result)=>{
    let t = {};
    t["rooms_name"] = js["rooms_name"];
    t["rooms_seats"] = js["rooms_seats"];
    result.push(t);
};

//convert a js object of response into a this.state.courses (e.g.)
let courseConverter = (js, result)=>{
    let t = {};
    t["courses_dept"] = js["courses_dept"];
    t["courses_id"] = js["courses_id"];
    t["numsection2014"] = js["numsection2014"];
    result.push(t);
};

let createWhere = (list_keys, list_vals, list_comp , op)=>{
    if(list_vals.length != list_keys.length || list_vals.length != list_comp.length)return null;

    let where = {};
    if(op != null) {
        where[op] = [];
    }
    for(let i = 0; i< list_keys.length ;i++){
        let tmp = {};
        let tmp2 = {}; tmp2[list_keys[i]] = list_vals[i];
        tmp[list_comp[i]] = tmp2;
        if (op != null) {
            where[op].push(tmp);
        }
        else{
            where[list_comp[i]] = tmp2;
        }
    }
    return where;
};


//convert a list of JSON objects based on some conversion def
let convertJSON2List = (list, conversion)=>{
    let result = [];
    list.forEach(
        (js)=>{
            conversion(js, result);
        }
    );
    return result;
};

//define what to do when response of renderquery is returned
//done: when user clicks done
let renderquery_process_done = (response, that, isRoom) =>{
    if(isRoom){
        that.state.rooms =  convertJSON2List(response, roomConverter);
    }else{
        that.state.courses = convertJSON2List(response, courseConverter);
    }
};

//define what to do when response of renderquery is returned
//not_done: when user clicks addCourse/addRoom
let renderquery_process_not_done = (response, that, isRoom) =>{
    if(isRoom){
        let list_res = convertJSON2List(response, roomConverter);
        that.state.rooms =  that.state.rooms.concat(list_res);
        that.state.rooms =  uniqueObject(that.state.rooms);
        // console.log(that.state.rooms);
    }else{
        let list_res = convertJSON2List(response, courseConverter);
        that.state.courses =  that.state.courses.concat(list_res);
    }
};

//renderQuery and do something
let renderQueryProcess = (query, target_id, table_id, that, isRoom, process)=>{
    let request = getReq();

    request.post('/query', query)
    .then(function (response) {

        if(response.data.result.length == 0){
            injectTable(response.data.result, target_id, table_id, 'Oops~~ Nothing is found (200).');
        }else{
            injectTable(response.data.result, target_id, table_id, null);
        }

        process(response.data.result, that, isRoom);

    }).catch(function (error) {
        console.log("fail");
        injectTable(null, target_id, table_id, error.message);
    });

};


let getReq = ()=>{
    let request = axios.create({
        baseURL: 'http://localhost:4321/',
        timeout: 10000,
        headers:{"Access-Control-Allow-Origin": "*"},
        headers: {"Content-Type": "application/json"}
    });
    return request;
}

//render the query response
//send a query to server and inject table as a child of the target_id node
//target_id: id of the target
//table_id: the name of the table

let renderQuery = (query, target_id, table_id)=>{
        let request = getReq();
        request.post('/query', query )
        .then(function (response) {

            if(response.data.result.length == 0){
                injectTable(response.data.result, target_id, table_id, 'Oops~~ Nothing is found (200).');
            }else{
                console.log("succeed");
                injectTable(response.data.result, target_id, table_id, null);
            }
        }).catch(function (error) {
            injectTable(null, target_id, table_id, responseExplain(error));
        });
};


let scrollRoom = (that, op)=>{
        //prior
        that.state.current_room = op(that.state.current_room, that.state.rooms_list.length);
        let current_index = that.state.current_room;
        if(current_index == -1)return;
        let rooms_js = that.state.schedule;
        document.getElementById('timetables').innerHTML = timetable_template;

        //render the next room

        let title = that.state.rooms_list[current_index];
        let s = that.state.score + ""; s = s.substring(0,4);
        let info = 'Percentage of failure: ' + s + '%, Failed to schedule: ' + JSON.stringify(that.state.remain_course);
        document.getElementById('room_title').innerHTML = title;
        document.getElementById('room_info').innerHTML = info;
        document.getElementById('viewing_info').innerHTML =
            'Viewing: ['+(current_index+1)+'/'+that.state.rooms_list.length + ']';

        //posterior
        renderTimeTableResult(rooms_js[title]['mon_list'], rooms_js[title]['tues_list']);
};



let getSchedule = (data, that)=>{
        let request = getReq();
        request.post('/schedule', data )
        .then(function (response) {
            that.state.schedule = response.data.schedule;
            that.state.rooms_list = Object.keys(response.data.schedule);
            that.state.current_room = -1;
            that.state.remain_course = response.data.remain;
            that.state.score = response.data.score;
            document.getElementById("timetables").innerHTML = "Data is Fetched";

        }).catch(function (error) {
            // document.getElementById("timetables").innerHTML = "ERROR: failed to fetch schedule data";
            displayError("Failed to fetch schedule data, please make sure to Add Course and Add Room first","error_timetable");
            that.state.schedule = null;
        });
};

let getQueryResult = (queryAllRooms, queryOrigin, target_id, table_id,distance)=>{
    let request = getReq();
    let globalResponse = null;
    request.post('/query', queryAllRooms )
        .then(function (response) {
            if(response.data.result.length == 0){
                injectTable(response.data.result, target_id, table_id, 'Oops~~ Nothing is found (200).');
            }else{
                globalResponse = response;
                return request.post('/query',queryOrigin)
            }
        })
        .then(function(response){

            let listOfOrigin = constructOrigins(response.data.result);
            console.log(listOfOrigin);
            let new_result = filterRoomsByDistance(distance,listOfOrigin,globalResponse.data.result);
            injectTable(new_result,target_id,table_id,null);
        })
        .catch(function (error) {
            console.log("fail");
            injectTable(null, target_id, table_id, responseExplain(error));
    });
};
let getQueryResultNotDone = (queryAllRooms, queryOrigin, target_id, table_id,distance,that, isRoom, process )=>{
    let request = getReq();
    let globalResponse = null;
    request.post('/query', queryAllRooms )
        .then(function (response) {
            if(response.data.result.length == 0){
                injectTable(response.data.result, target_id, table_id, 'Oops~~ Nothing is found (200).');
            }else{
                globalResponse = response;
                // console.log(globalResponse);
                return request.post('/query',queryOrigin)
            }
        })
        .then(function(response){

            let listOfOrigin = constructOrigins(response.data.result);
            console.log(listOfOrigin);
            let new_result = filterRoomsByDistance(distance,listOfOrigin,globalResponse.data.result);
            console.log(new_result);
            injectTable(new_result,target_id,table_id,null);
            process(new_result, that, isRoom);
        })
        .catch(function (error) {
            console.log("fail");
            injectTable(null, target_id, table_id, responseExplain(error));
        });
};

let getQueryResultNotDone2Stage = (queryAllRooms, queryOrigin, query, target_id, table_id,distance,that, isRoom, process )=>{
    let request = getReq();
    let globalResponse = null;
    let global_result = null;
    request.post('/query', queryAllRooms )
        .then(function (response) {
            if(response.data.result.length == 0){
                injectTable(response.data.result, target_id, table_id, 'Oops~~ Nothing is found (200).');
            }else{
                globalResponse = response;
                // console.log(globalResponse);
                return request.post('/query',queryOrigin)
            }
        })
        .then(function(response){

            let listOfOrigin = constructOrigins(response.data.result);
            console.log(listOfOrigin);
            let new_result = filterRoomsByDistance(distance,listOfOrigin,globalResponse.data.result);
            console.log(new_result);
            global_result = new_result;
            // injectTable(new_result,target_id,table_id,null);
            // process(new_result, that, isRoom);
            return request.post('/query', query);
        })
        .then(function (response) {
            global_result = global_result.concat(response.data.result);
            global_result = uniqueObject(global_result);
            if (global_result.length == 0) {
                injectTable(global_result, target_id, table_id, 'Oops~~ Nothing is found (200).');
            } else {
                injectTable(global_result, target_id, table_id, null);
            }

            process(global_result, that, isRoom);
        })
        .catch(function (error) {
            console.log("fail");
            injectTable(null, target_id, table_id, responseExplain(error));
        });
};

let constructOrigins = (result)=>{
    let origins = [];
    for (let i in result){
        // console.log (result[i]);
        let arr = [];
        arr.push(result[i]["rooms_lon"]);
        arr.push(result[i]["rooms_lat"]);
        origins.push(arr);
    }
    return origins;
};

let filterRoomsByDistance = (roomsDistance,listOfOrigin, result)=>{
    let new_result = new Set();
    for (let i in result){
        let arr = [];
        arr.push(result[i]["rooms_lon"]);
        arr.push(result[i]["rooms_lat"]);
        if (isWithinDistance(roomsDistance,listOfOrigin,arr)){
            new_result.add(result[i]);
        }
    }
    return Array.from(new_result);
};

let isWithinDistance = (roomsDistance,listOfOrigin,point)=>{
    //go through the list of origin, if any of them is within distance
    //then it is true
    for (let i in listOfOrigin){
        if (haversine(listOfOrigin[i],point) <= roomsDistance){
            return true;
        }
    }
    return false;
};

//algorithm reference from: http://www.movable-type.co.uk/scripts/latlong.html
let haversine = (p1, p2)=>{
    let lat1 = p1[1];
    let lon1 = p1[0];
    let lat2 = p2[1];
    let lon2 = p2[0];
    let R = 6371e3; //earth's mean radius
    let lat1Radian = lat1 * Math.PI / 180;
    let lat2Radian = lat2 * Math.PI / 180;
    let diffLat = (lat2-lat1) * Math.PI / 180;
    let diffLon = (lon2-lon1) * Math.PI / 180;

    let a = Math.pow(Math.sin(diffLat/2),2) +
            Math.cos(lat1Radian) * Math.cos(lat2Radian)
            * Math.pow(Math.sin(diffLon/2),2);
    let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    let d = R*c;
    return d;
};

let removeSpan = (list, day, span)=>{
    let keys = Object.keys(list);
    keys.forEach(
        (k)=>{
            $('#' + day + (span+1)).remove()
        }
    );
};

//render a list of courses into a day using "span" amount of rowspan
let renderADay = (list, day, span) =>{
    let keys = Object.keys(list);

    keys.forEach(
        (k)=>{
            //$('#'+day+(span+1)).remove();
            let val = list[k];
            let id = day + k;
            let elem = document.getElementById(id);
            elem.innerHTML = val;
            //elem.setAttribute("rowspan",''+span);
        }
    );

};


let MON_DAYS = ["Mon", "Wed",  "Fri"];
let TUES_DAYS = [ "Tue",  "Thu"];

/*
{ '1': 'MATH101', '2': 'MATH103', '3': 'CPSC321' }
{ '1': 'CPSC200', '2': 'MATH102' }
*/
let renderTimeTableResult = (mon_list, tues_list)=>{
    MON_DAYS.forEach(
        (day)=>{
            renderADay(mon_list, day, 2)
        }
    );

    TUES_DAYS.forEach(
        (day)=>{
            renderADay(tues_list, day, 3)
        }
    );


};


