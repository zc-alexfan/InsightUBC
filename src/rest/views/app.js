
//this file is the main js
//only deal with UI creating

function expandCollapse(that, style_id){
    if(that.state.hide_table){
        console.log(style_id);
        let style = document.getElementById(style_id);
        style.removeChild(style.childNodes[0]);
        document.getElementById("expand_collapse").innerHTML = "Collapse";
    }else{
        let style = document.getElementById(style_id);
        console.log(style);
        style.appendChild(that.props.showStyle);
        document.getElementById("expand_collapse").innerHTML = "Show All";
    }
    that.state.hide_table = !that.state.hide_table;
}

let sectionRender = (that)=>{
    return (
        <div className="container">
            <div className="page-header"><a className="btn btn-primary" data-toggle="collapse" aria-expanded="false" href="#innerContainer">{that.props.title}</a></div>
            <div className="collapse" id="innerContainer">
            <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#sample" onClick={that.clearTable}>Home</a></li>
                <li><a data-toggle="tab" href="#task1" onClick={that.clearTable}>Task 1</a></li>
                <li><a data-toggle="tab" href="#task2" onClick={that.clearTable}>Task 2</a></li>
                <li><a data-toggle="tab" href="#task3" onClick={that.clearTable}>Task 3</a></li>
                <li><a data-toggle="tab" href="#task4" onClick={that.clearTable}>Task 4</a></li>
                <li><a data-toggle="tab" href="#task5" onClick={that.clearTable}>Task 5</a></li>
                <li><a data-toggle="tab" href="#task6" onClick={that.clearTable}>Task 6</a></li>
            </ul>
            <div className="tab-content">
                <div id="sample" className="tab-pane fade in active">
                    <h3> Sample </h3>
                    <input type="radio" name="logic" ref="and_radio" value="AND"/> AND<br/>
                    <input type="radio" name="logic" ref="or_radio" value="OR"/> OR<br/>
                    Department <br/>
                    <input type="text" ref="input_depart" /> <br/>
                    Instructor <br/>
                    <input type="text" ref="input_instr" /> <br/>
                    Sorted By <br/>
                    <input type="checkbox" ref="sort_fail" name="section_sort" value="mostfailing"/>Most Failing<br/>
                    <input type="checkbox" ref="sort_pass" name="section_sort" value="mostpassing"/>Most Passing<br/>
                    <input type="checkbox" ref="sort_avg" name="section_sort" value="average"/>Average<br/>
                    <button className="btn btn-primary" onClick={ ()=> that.submit(0)}>Submit</button>
                    <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                    <button className="btn btn-primary" id="expand-collapse" onClick={that.expand}>Expand</button>
                </div>
                <div id="task1" className="tab-pane fade">
                    <h3>Show all of the sections in department X</h3>
                    Department <br/>
                    <input type="text" ref="input_depart_task1" /> <br/>
                    <button className="btn btn-primary" onClick={()=>that.submit(1)}>Submit</button>
                    <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                    <button className="btn btn-primary" id="expand-collapse" onClick={that.expand}>Expand</button>
                </div>
                <div id="task2" className="tab-pane fade">
                    <h3>Show all of the courses in department X ordered by</h3>
                    <h5>[the most failing students || the most passing students || average grade]</h5>
                    Department <br/>
                    <input type="text" ref="input_depart_task2" /> <br/>
                    Sort By <br/>
                    <div onChange={that.setSortKey.bind(this)}>
                    <input type="radio" name="sort" ref="sort_fail" value="courses_fail"/> Most Failing Students<br/>
                    <input type="radio" name="sort" ref="sort_pass" value="courses_pass"/> Most Passing Students<br/>
                    <input type="radio" name="sort" ref="sort_avg" value="courses_avg"/> Highest Average Grade<br/>
                    </div>
                    <button className="btn btn-primary" onClick={()=>that.submit(2)}>Submit</button>
                    <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                    <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                </div>
                <div id="task3" className="tab-pane fade">
                    <h3>Same as Task 2, but allow sorting by more than one field.</h3>
                    <input type="text" ref="input_depart_task3" /> <br/>
                    Sort by the following order: <br/>
                    <div>
                        <input type="checkbox" ref="sort_fail" name="sort" value="courses_fail"/>Most Failing Students<br/>
                        <input type="checkbox" ref="sort_pass" name="sort" value="courses_pass"/>Most Passing Students<br/>
                        <input type="checkbox" ref="sort_avg" name="sort" value="courses_avg"/>Highest Average Grade<br/>
                    </div>
                    <button className="btn btn-primary" onClick={()=>that.submit(3)}>Submit</button>
                    <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                    <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                </div>
                <div id="task4" className="tab-pane fade">
                    <h3>Find all the sections taught by instructor Y</h3>
                    Instructor <br/>
                    <input type="text" ref="input_instr_task4" /> <br/>
                    <button className="btn btn-primary" onClick={()=>that.submit(4)}>Submit</button>
                    <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                    <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                </div>
                <div id="task5" className="tab-pane fade">
                    <h3>Show all of the key details for courses in the university with filters for course titles, department, and sizes</h3>
                    Filter By <br/>
                    <div onChange={that.setFilterKey.bind(this)}>
                        <input type="radio" name="filter" ref="filter_title" value="courses_title"/> Course Title <div id="courses_title_input_task5"></div><br/>
                        <input type="radio" name="filter" ref="filter_depart" value="courses_dept"/> Course Department<div id="courses_dept_input_task5"></div><br/>
                        <input type="radio" name="filter" ref="filter_size" value="courses_sectionSize"/> Course Size Greater Than<div id="courses_sectionSize_input_task5"></div><br/>
                    </div>
                    <button className="btn btn-primary" onClick={()=>that.submit(5)}>Submit</button>
                    <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                    <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                </div>
                <div id="task6" className="tab-pane fade">
                    <h3>Task 5, and allow filtering by more than one field concurrently</h3>
                    <div>
                        <input type="checkbox" ref="filter_title" name="filter" value="courses_title" onChange={that.handleChangeCheckBox.bind(this)}/>Course Title <div id="courses_title_input_task6"></div><br/>
                        <input type="checkbox" ref="filter_dept" name="filter" value="courses_dept" onChange={that.handleChangeCheckBox.bind(this)}/>Course Department<div id="courses_dept_input_task6"></div><br/>
                        <input type="checkbox" ref="filter_size" name="filter" value="courses_sectionSize" onChange={that.handleChangeCheckBox.bind(this)}/>Course Size Greater Than<div id="courses_sectionSize_input_task6"></div><br/>
                    </div>
                    <button className="btn btn-primary" onClick={()=>that.submit(6)}>Submit</button>
                    <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                    <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                </div>
            </div>
            <div id={that.props.renderName}></div>
            </div>
        </div>
    );
};

let task1Submit = (that)=>{

    let depart = that.refs.input_depart_task1.value.trim().toLowerCase();
    // console.log("depart is: ");
    // console.log(that.refs.input_depart_task1.value);
    //TODO check depart has to be exact and valid
    let sortBy = "courses_dept";
    let key = [];
    key.push(depart);
    let where = createWhere(["courses_dept"],key , ["IS"], null);
    let option = createOption(["courses_dept","courses_id"], sortBy);
    let query = createQuery(where, option, null);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task2Submit = (that)=>{
    let depart = that.refs.input_depart_task2.value.trim().toLowerCase();
    //TODO check depart has to be exact and valid
    let userKeyArray = ["Most Fail", "Most Pass", "Highest Average"];
    let possibleSortArray = ["courses_fail","courses_pass","courses_avg"];
    let index  = possibleSortArray.indexOf(that.props.sort_key);
    let sortBy = {"dir":"DOWN","keys":[userKeyArray[index]]};
    console.log(sortBy);
    let key = [];
    key.push(depart);
    let cols = ["courses_dept","courses_id"];
    sortBy['keys'] = sortBy['keys'].concat(cols);
    cols.push(userKeyArray[index]);
    //TODO should I look at overall sections for courses?
    let where = createWhere(["courses_dept","courses_year"],[key,1900] , ["IS","GT"], ["AND"]);
    let option = createOption(cols, sortBy);
    let groups = ["courses_dept","courses_id"];
    let transformation = createTransform(groups,[userKeyArray[index]],
        ["MAX"],[that.props.sort_key]);
    let query = createQuery(where, option, transformation);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task3Submit = (that)=>{
    let depart = that.refs.input_depart_task3.value.trim().toLowerCase();
    //TODO check depart has to be exact and valid
    let userKeyArray = ["Most Fail", "Most Pass", "Highest Average"];
    let possibleSortArray = ["courses_fail","courses_pass","courses_avg"];
    let actualSortKey = [];
    let applyUserDefinedIds = [];
    let applykeys = [];
    let applyids = [];
    for (let i of that.props.multiple_sort_key){
        let index  = possibleSortArray.indexOf(i);
        actualSortKey.push(userKeyArray[index]);
        applyUserDefinedIds.push(userKeyArray[index]);
        applykeys.push("MAX");
        applyids.push(i);
    }
    let sortBy = {"dir":"DOWN","keys":actualSortKey};
    console.log(sortBy);
    let key = [];
    key.push(depart);
    let cols = ["courses_dept","courses_id"];
    sortBy['keys'] = sortBy['keys'].concat(cols);
    cols = cols.concat(actualSortKey);
    let where = createWhere(["courses_dept","courses_year"],[key,1900] , ["IS","GT"], ["AND"]);
    let option = createOption(cols, sortBy);
    let groups = ["courses_dept","courses_id"];
    let transformation = createTransform(groups,applyUserDefinedIds,
        applykeys,applyids);
    let query = createQuery(where, option, transformation);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task4Submit = (that) =>{
    let instr = that.refs.input_instr_task4.value.trim().toLowerCase();
    //TODO check depart has to be exact and valid
    let sortBy = "courses_dept";
    let key = [];
    key.push(instr);
    let where = createWhere(["courses_instructor"],key , ["IS"], null);
    let option = createOption(["courses_instructor","courses_dept","courses_id"], sortBy);
    let query = createQuery(where, option, null);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task5Submit = (that)=>{
    let filterValue = document.getElementById("input_task5").value.trim().toLowerCase();
    let filterKey = that.props.filter_key;
    //TODO check depart has to be exact and valid
    let key = [];
    key.push(filterValue);
    let cols = ["courses_dept","courses_id"];
    let groups = ["courses_dept","courses_id"];
    // cols = cols.concat("courses_sectionSize");
    let where = {};
    if (filterKey === "courses_dept" || filterKey === "courses_title") {
        where = createWhere([filterKey], [filterValue], ["IS"], null);
        where = filterWithoutOverall(where,false);
        groups.push(filterKey);
        cols.push(filterKey);
    }
    else if (filterKey === "courses_sectionSize") {
        where = createWhere([filterKey],[Number(filterValue)],["GT"],null);
        where = filterWithoutOverall(where,false);
        cols.push("Most Section Size");
    }
    let option = createOption(cols, null);
    //TODO: got the idea to do most from spec, not sure though
    let transformation = createTransform(groups,["Most Section Size"],
    ["MAX"],["courses_sectionSize"]);
    let query = createQuery(where, option, transformation);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task6Submit = (that)=>{
    console.log(that.props.multiple_sort_key);
    let filterValue = [];
    let filterKey = [];
    let comparisons = [];
    for (let i of that.props.multiple_sort_key){
        filterKey.push(i);
        let v = document.getElementById("input_"+i+"_task6").value.trim().toLowerCase();
        if (i === "courses_sectionSize"){
            filterValue.push(Number(v));
        }else {
            filterValue.push(v);
        }
    }
    //TODO check depart has to be exact and valid
    let key = [];
    key.push(filterValue);
    let cols = ["courses_dept","courses_id"];
    let groups = ["courses_dept","courses_id"];
    // cols = cols.concat("courses_sectionSize");
    let where;
    for (let i of filterKey){
        if (i === "courses_dept" || i === "courses_title") {
            comparisons.push("IS");
            groups.push(i);
            cols.push(i);
        }
        else if (i === "courses_sectionSize") {
            comparisons.push("GT");
            cols.push("Most Section Size");
        }
    }
    where = createWhere(filterKey,filterValue,comparisons,"AND");
    where = filterWithoutOverall(where,false);
    let option = createOption(cols, null);
    //TODO: got the idea to do most from spec, not sure though
    let transformation = createTransform(groups,["Most Section Size"],
        ["MAX"],["courses_sectionSize"]);
    let query = createQuery(where, option, transformation);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);

};

let filterWithoutOverall = (where,isTrue)=>{
    // console.log(where);
    // console.log(isTrue);
    let comparison;
    if (isTrue){
        comparison = {"EQ":{"courses_year":1900}};
    }
    else{
        comparison = {"GT":{"courses_year":1900}};
    }
    if (where.hasOwnProperty("AND")){
        console.log("already has AND");
    }
    else{
        // console.log("did not have and");
        let tmp = where;
        where = {};
        where["AND"] = [];
        where["AND"].push(tmp); //original where, a single clause
        // console.log(where);
    }
    where["AND"].push(comparison);
    return where;
};

let courses_cols = [
    "courses_dept",
    "courses_id",
    "courses_avg",
    "courses_instructor",
    "courses_title,",
    "courses_pass",
    "courses_fail",
    "courses_audit",
    "courses_uuid"
];

let sectionSubmit = (that)=>{
    //extract data from UI
    let depart = that.refs.input_depart.value.trim().toLowerCase();
    let instr = that.refs.input_instr.value.trim().toLowerCase();

    //create where
    let list_keys = []; let list_vals = []; let list_comp = [];
    if(depart != ""){ list_keys.push("courses_dept"); list_vals.push(depart); list_comp.push("IS");}
    if(instr != ""){ list_keys.push("courses_instructor"); list_vals.push(instr); list_comp.push("IS");}
    let logic_op = (that.refs.and_radio.checked)?"AND":"OR";

    //query object generator
    let sortBy = "courses_avg";
    let where = createWhere(list_keys, list_vals, list_comp, logic_op);
    let option = createOption(COURSES_COLS, sortBy);
    let transf = createTransform();

    let query = createQuery(where, option, transf);
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let SectionExp = React.createClass({
    getInitialState:function(){
        //Preamble parameters
        this.props.comp_id = "sec";
        this.props.title = "Course & Section Explorer";
        this.props.sort_key = "";
        this.props.filter_key = "";
        this.props.multiple_sort_key = [];
        //No need to init the following:
        this.props.style_id = "style_" + this.props.comp_id;
        this.props.showStyle = document.getElementById(this.props.style_id).childNodes[0];

        //style tag id in html
        this.props.renderName = this.props.comp_id + "_exp_render";
        return {hide_table:true};
    },
    submit:function(num){
        this.clearTable();
        switch(num) {
            case 0:
                sectionSubmit(this);
                break;
            case 1:
                task1Submit(this);
                break;
            case 2:
                task2Submit(this);
                break;
            case 3:
                this.setMultipleSortKey("sort");
                task3Submit(this);
                break;
            case 4:
                task4Submit(this);
                break;
            case 5:
                task5Submit(this);
                break;
            case 6:
                task6Submit(this);
                break;
            default:
                console.log("should not be here");
                break;
        }
        // sectionSubmit(this);
    },
    clear:function(){
        //TODO should clear also clear table?
        let keys = Object.keys(this.refs);
        for (let e in keys){
            this.refs[keys[e]].value = "";
            this.refs[keys[e]].checked = false;
        }
        this.clearTable();
        clearInputBoxes(5);
        clearInputBoxes(6);
        // console.log(this.refs);
        // this.refs.input_depart.value = "";
        // this.refs.input_instr.value = "";
    },
    clearTable:function(){
        document.getElementById(this.props.renderName).innerHTML = "";
    },
    setSortKey: function(event){
        this.props.sort_key = event.target.value;
    },
    setFilterKey: function(event){
        this.props.filter_key = event.target.value;
        createInputBox(this.props.filter_key,"task5",true);
    },
    setMultipleSortKey: function(id){
        this.props.multiple_sort_key = [];
        let list = document.getElementsByName(id);
        for (let e of list){
            if (e.checked){
                this.props.multiple_sort_key.push(e.value);
            }
        }
        // if (event.target.checked && this.props.multiple_sort_key.indexOf(event.target.value) == -1){
            // this.props.multiple_sort_key.push(event.target.value);
        // }
    },
    handleChangeCheckBox: function(event){
        console.log(event.target);
        if (event.target.checked){
            this.props.multiple_sort_key.push(event.target.value);
            createInputBox(event.target.value,"task6",false);
        }
        else{
            let i = this.props.multiple_sort_key.indexOf(event.target.value);
            this.props.multiple_sort_key.splice(i,1);
            document.getElementById(event.target.value+"_input_task6").innerHTML = "";
        }
    },
    expand:function(){ expandCollapse(this, this.props.style_id); },
    render:function(){ return sectionRender(this); }
});
let listOfTask5Inputs = ["courses_title_input","courses_dept_input","courses_sectionSize_input","rooms_furniture_input",
 "rooms_type_input"];

let clearInputBoxes = (num)=>{
    //clear out all the other ones first
    for (let i =0; i <listOfTask5Inputs.length; i++){
        document.getElementById(listOfTask5Inputs[i]+"_task"+num).innerHTML = "";
    }
};

let createInputBox = (id,taskNumber,isClear) => {
    if (isClear){
        clearInputBoxes(5);
        clearInputBoxes(6);
    }
    console.log(id+"_input_"+taskNumber);
    let e = document.getElementById(id+"_input_"+taskNumber);
    let new_id = "";
    let new_type = "";
    if (taskNumber ==="task5" && id.indexOf("rooms") == -1) {
        new_id = "input_" + taskNumber;
    }
    else {
        //need different names
        new_id = "input_"+id+"_"+taskNumber;
    }
    if (id==="courses_sectionSize"){
        new_type = "number";
    }
    else{
        new_type = "text";
    }
    e.innerHTML = "<input type="+new_type+" id=" + new_id + " /> <br/>";
};

let RoomExp = React.createClass({
    getInitialState:function(){
        //Preamble parameters
        this.props.comp_id = "rooms";
        this.props.title = "Room Explorer";
        this.props.filter_key = "";

        //No need to init the following:
        this.props.style_id = "style_" + this.props.comp_id;
        this.props.showStyle = document.getElementById(this.props.style_id).childNodes[0];

        //style tag id in html
        this.props.renderName = this.props.comp_id + "_exp_render";
        return {hide_table:true};
    },
    submit:function(num){
        switch(num) {
            case 1:
                task1Room(this);
                break;
            case 2:
                task2Room(this);
                break;
            case 3:
                task3Room(this);
                break;
            case 4:
                task4Room(this);
                break;
            case 5:
                task5Room(this);
                break;
            case 6:
                task6Room(this);
                break;
        }
        console.log(document.getElementById(this.props.renderName));
    },
    clear:function(){
        let keys = Object.keys(this.refs);
        for (let e in keys){
            this.refs[keys[e]].value = "";
            this.refs[keys[e]].checked = false;
        }
        this.clearTable();
        clearInputBoxes(5);
        clearInputBoxes(6);
    },
    clearTable:function(){
        document.getElementById(this.props.renderName).innerHTML = "";
    },
    setFilterKeyTask5: function(event){
        this.props.filter_key = event.target.value;
        createInputBox(this.props.filter_key, "task5",true);
    },
    setFilterKeyTask6: function(event){
        this.props.filter_key = event.target.value;
        createInputBox(this.props.filter_key, "task6",true);
    },
    expand:function(){ expandCollapse(this, this.props.style_id); },
    render:function(){ return roomRender(this); }
});

let roomRender = (that)=>{
    return (
        <div className="container">
            <div className="page-header"><a className="btn btn-primary" data-toggle="collapse" aria-expanded="false" href="#innerContainer_rooms">{that.props.title}</a></div>
            <div className="collapse" id="innerContainer_rooms">
               <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#task1_rooms" onClick={that.clearTable}>Task 1</a></li>
                    <li><a data-toggle="tab" href="#task2_rooms" onClick={that.clearTable}>Task 2</a></li>
                    <li><a data-toggle="tab" href="#task3_rooms" onClick={that.clearTable}>Task 3</a></li>
                    <li><a data-toggle="tab" href="#task4_rooms" onClick={that.clearTable}>Task 4</a></li>
                    <li><a data-toggle="tab" href="#task5_rooms" onClick={that.clearTable}>Task 5</a></li>
                    <li><a data-toggle="tab" href="#task6_rooms" onClick={that.clearTable}>Task 6</a></li>
                </ul>
                <div className="tab-content">
                    <div id="task1_rooms" className="tab-pane fade in active">
                        <h3>Show all rooms in building X</h3>
                        <label>Short Building name</label> <br/>
                        <input type="text" ref="input_building_task1" /> <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(1)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                    </div>
                    <div id="task2_rooms" className="tab-pane fade">
                        <h3>Show all rooms within X meters of building X</h3>
                        <label>Short Building name</label> <br/>
                        <input type="text" ref="input_building_task2" /> <br/>
                        <label>Within meters</label> <br/>
                        <input type="number" ref="input_distance_task2" /> <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(2)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                    </div>
                    <div id="task3_rooms" className="tab-pane fade">
                        <h3>Show all rooms over size X</h3>
                        <label> Room Size </label> <br/>
                        <input type="number" ref="input_size_task3" /> <br/>
                        Sort by the following order: <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(3)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                    </div>
                    <div id="task4_rooms" className="tab-pane fade">
                        <h3>Task 3 within X meters of building X</h3>
                        <label>Short Building name</label> <br/>
                        <input type="text" ref="input_building_task4" /> <br/>
                        <label>Within meters</label> <br/>
                        <input type="number" ref="input_distance_task4" /> <br/>
                        <label> Room Size </label> <br/>
                        <input type="number" ref="input_size_task4" /> <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(4)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                    </div>
                    <div id="task5_rooms" className="tab-pane fade">
                        <h3>Show all rooms with type X or furniture X</h3>
                        Filter By <br/>
                        <div onChange={that.setFilterKeyTask5.bind(this)}>
                            <input type="radio" name="filter_room_task5" ref="filter_rooms_type" value="rooms_type"/> Rooms Type <div id="rooms_type_input_task5"></div><br/>
                            <input type="radio" name="filter_room_task5" ref="filter_rooms_furniture" value="rooms_furniture"/> Rooms Furniture Type<div id="rooms_furniture_input_task5"></div><br/>
                        </div>
                        <button className="btn btn-primary" onClick={()=>that.submit(5)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                    </div>
                    <div id="task6_rooms" className="tab-pane fade">
                        <h3>Task 5,and within X meters of building X.</h3>
                        <label>Short Building name</label> <br/>
                        <input type="text" ref="input_building_task6" /> <br/>
                        <label>Within meters</label> <br/>
                        <input type="number" ref="input_distance_task6" /> <br/>
                        Filter By <br/>
                        <div onChange={that.setFilterKeyTask6.bind(this)}>
                            <input type="radio" name="filter_room_task6" ref="filter_rooms_type" value="rooms_type"/> Rooms Type <div id="rooms_type_input_task6"></div><br/>
                            <input type="radio" name="filter_room_task6" ref="filter_rooms_furniture" value="rooms_furniture"/> Rooms Furniture Type<div id="rooms_furniture_input_task6"></div><br/>
                        </div>
                        <button className="btn btn-primary" onClick={()=>that.submit(6)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
                    </div>
                </div>
                <div id={that.props.renderName}></div>
            </div>
        </div>
    );
};

let task1Room = (that) =>{
    let roomsShortNameValue = that.refs.input_building_task1.value.trim().toUpperCase();
    //TODO check depart has to be exact and valid
    let key = [];
    key.push(roomsShortNameValue);
    let where = createWhere(["rooms_shortname"],key , ["IS"], null);
    let option = createOption(["rooms_shortname","rooms_number"], null);
    let query = createQuery(where, option, null);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task2Room = (that) =>{
    let roomsShortNameValue = that.refs.input_building_task2.value.trim().toUpperCase();
    // console.log(that.refs);
    // console.log(roomsShortNameValue);
    let roomsDistance = Number(that.refs.input_distance_task2.value).toFixed(2);
    //TODO check depart has to be exact and valid
    let key = [];
    key.push(roomsShortNameValue);
    let whereOne = {};
    let option = createOption(["rooms_shortname","rooms_number","rooms_lon","rooms_lat"], null);
    let queryOne = createQuery(whereOne, option, null);

    let whereTwo = createWhere(["rooms_shortname"],key , ["IS"], null);
    let optionTwo = createOption(["rooms_shortname","rooms_lon","rooms_lat"],null);
    let transformation = createTransform(["rooms_shortname","rooms_lon","rooms_lat"],[],[],[]);
    let queryTwo = createQuery(whereTwo, optionTwo, transformation);

    console.log(JSON.stringify(queryOne));
    console.log(JSON.stringify(queryTwo))
    getQueryResult(queryOne, queryTwo, that.props.renderName, that.props.comp_id, roomsDistance);
};

let task3Room = (that) =>{
    let roomsSizeValue = Number(that.refs.input_size_task3.value.trim());
    //TODO check depart has to be exact and valid
    let key = [];
    key.push(roomsSizeValue);
    let where = createWhere(["rooms_seats"],key , ["GT"], null);
    let option = createOption(["rooms_shortname","rooms_number","rooms_seats"], null);
    let query = createQuery(where, option, null);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task4Room = (that) =>{
    let roomsSizeValue = Number(that.refs.input_size_task4.value.trim());
    let roomsShortNameValue = that.refs.input_building_task4.value.trim().toUpperCase();
    let roomsDistance = Number(that.refs.input_distance_task4.value).toFixed(2);
    //TODO check depart has to be exact and valid
    let key = [];
    key.push(roomsSizeValue);
    let whereOne = createWhere(["rooms_seats"],key , ["GT"], null);
    let option = createOption(["rooms_shortname","rooms_number","rooms_lon","rooms_lat","rooms_seats"], null);
    let queryOne = createQuery(whereOne, option, null);

    key.push(roomsShortNameValue);
    let whereTwo = createWhere(["rooms_seats","rooms_shortname"],key , ["GT","IS"], "AND");
    let optionTwo = createOption(["rooms_shortname","rooms_lon","rooms_lat"],null);
    let transformation = createTransform(["rooms_shortname","rooms_lon","rooms_lat","rooms_seats"],[],[],[]);
    let queryTwo = createQuery(whereTwo, optionTwo, transformation);

    console.log(JSON.stringify(queryOne));
    console.log(JSON.stringify(queryTwo))
    getQueryResult(queryOne, queryTwo, that.props.renderName, that.props.comp_id, roomsDistance);
};

let task5Room = (that) =>{
    let input_key = that.props.filter_key;
    //TODO the value of Type and Furniture are finicky, they don't like small caps, and has to have certain letter cap?
    let input_value = document.getElementById("input_"+input_key+"_task5").value.trim();
    console.log(input_key);
    console.log(input_value);
    //TODO check depart has to be exact and valid
    let key = [];
    key.push(input_key);
    let where = createWhere(key,[input_value] , ["IS"], null);
    let option = createOption(["rooms_shortname","rooms_number",input_key], null);
    let query = createQuery(where, option, null);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task6Room = (that) =>{
    let input_key = that.props.filter_key;
    //TODO the value of Type and Furniture are finicky, they don't like small caps, and has to have certain letter cap?
    let input_value = document.getElementById("input_"+input_key+"_task6").value.trim();
    let roomsShortNameValue = that.refs.input_building_task6.value.trim().toUpperCase();
    // console.log(that.refs);
    // console.log(roomsShortNameValue);
    let roomsDistance = Number(that.refs.input_distance_task6.value).toFixed(2);
    //TODO check depart has to be exact and valid
    let key = [];
    key.push(roomsShortNameValue);
    let whereOne = createWhere([input_key],[input_value],["IS"],null);
    let option = createOption([input_key,"rooms_shortname","rooms_number","rooms_lon","rooms_lat"], null);
    let queryOne = createQuery(whereOne, option, null);

    let whereTwo = createWhere([input_key,"rooms_shortname"],[input_value,roomsShortNameValue] , ["IS","IS"], "AND");
    let optionTwo = createOption([input_key,"rooms_shortname","rooms_lon","rooms_lat"],null);
    let transformation = createTransform([input_key,"rooms_shortname","rooms_lon","rooms_lat"],[],[],[]);
    let queryTwo = createQuery(whereTwo, optionTwo, transformation);

    console.log(JSON.stringify(queryOne));
    console.log(JSON.stringify(queryTwo))
    getQueryResult(queryOne, queryTwo, that.props.renderName, that.props.comp_id, roomsDistance);
};


{/*ReactDOM.render(<div><SectionExp/><RoomExp/></div>, document.getElementById('root'));*/}
