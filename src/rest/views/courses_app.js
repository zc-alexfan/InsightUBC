
//this file is the main js
//only deal with UI creating

function expandCollapse(that, style_id,num){
    if(that.state.hide_table){
        console.log(style_id);
        let style = document.getElementById(style_id);
        style.removeChild(style.childNodes[0]);
        document.getElementById("expand_collapse_"+num).innerHTML = "Collapse";
    }else{
        let style = document.getElementById(style_id);
        console.log(style);
        style.appendChild(that.props.showStyle);
        document.getElementById("expand_collapse_"+num).innerHTML = "Show All";
    }
    that.state.hide_table = !that.state.hide_table;
}

let sectionRender = (that)=>{
    return (
        <div className="container">
                <h1>{that.props.title}</h1>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#task1" onClick={that.clear}>Task 1</a></li>
                    <li><a data-toggle="tab" href="#task2" onClick={that.clear}>Task 2</a></li>
                    <li><a data-toggle="tab" href="#task3" onClick={that.clear}>Task 3</a></li>
                    <li><a data-toggle="tab" href="#task4" onClick={that.clear}>Task 4</a></li>
                    <li><a data-toggle="tab" href="#task5" onClick={that.clear}>Task 5</a></li>
                    <li><a data-toggle="tab" href="#task6" onClick={that.clear}>Task 6</a></li>
                    <li><a data-toggle="tab" href="#task7" onClick={that.clear}>Task 7</a></li>
                </ul>
                <div className="tab-content">
                    <div id="task1" className="tab-pane fade in active">
                        <h3>Show all of the sections in department X</h3>
                        Department * <br/>
                        <input type="text" ref="input_depart_task1"  className="form-control"
                               onChange={()=>(autoCompleteGeneric(that.refs.input_depart_task1.value, that.refs.input_depart_auto, that.props.DEPT_UNIT))}
                        /> <br/>
                        <input type="text" ref="input_depart_auto" placeholder="<YouCompleteMe>" className="form-control"
                               onClick={()=>that.refs.input_depart_task1.value=that.refs.input_depart_auto.value}
                        /> <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(1)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_1" onClick={()=>that.expand(1)}>Expand</button>
                    </div>
                    <div id="task2" className="tab-pane fade">
                        <h3>Show all of the courses in department X ordered by</h3>
                        <h5>[the most failing students || the most passing students || average grade]</h5>
                        Department * <br/>
                        <input type="text" ref="input_depart_task2" className="form-control"
                               onChange={()=>(autoCompleteGeneric(that.refs.input_depart_task2.value, that.refs.input_depart_task2_auto, that.props.DEPT_UNIT))}
                        /> <br/>
                        <input type="text" ref="input_depart_task2_auto" className="form-control" placeholder="<YouCompleteMe>"
                               onClick={()=>that.refs.input_depart_task2.value=that.refs.input_depart_task2_auto.value}
                        /> <br/>

                        Sort By * <br/>
                        <div onChange={that.setSortKey.bind(this)}>
                            <div className="radio">
                            <input type="radio" name="sort_task2"  value="courses_fail" /> Most Failing Students<br/>
                            <input type="radio" name="sort_task2"  value="courses_pass" /> Most Passing Students<br/>
                            <input type="radio" name="sort_task2"  value="courses_avg_down" /> Highest Average Grade<br/>
                            <input type="radio" name="sort_task2"  value="courses_avg_up"/> Lowest Average Grade<br/>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={()=>that.submit(2)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_2" onClick={()=>that.expand(2)}>Expand</button>
                    </div>
                    <div id="task3" className="tab-pane fade">
                        <h3>Same as Task 2, but allow sorting by more than one field.</h3>
                        Department <br/>
                        <input type="text" ref="input_depart_task3" className="form-control"
                               onChange={()=>(autoCompleteGeneric(that.refs.input_depart_task3.value, that.refs.input_depart_task3_auto, that.props.DEPT_UNIT))}
                        /> <br/>
                        <input type="text" ref="input_depart_task3_auto" className="form-control" placeholder="<YouCompleteMe>"
                               onClick={()=>that.refs.input_depart_task3.value=that.refs.input_depart_task3_auto.value}
                        /> <br/>
                        Sort by the following order: <br/>
                        <div>
                            <div className="checkbox">
                            <input type="checkbox" ref="sort_fail" name="sort_task3" value="courses_fail"/>Most Failing Students<br/>
                            <input type="checkbox" ref="sort_pass" name="sort_task3" value="courses_pass"/>Most Passing Students<br/>
                            <input type="checkbox" ref="sort_avg" name="sort_task3" value="courses_avg" /> Highest Average Grade<br/>
                            {/*<div id="checked_average" className="radio" onChange={that.setSortKey.bind(this)}>*/}
                                {/*<input type="radio" name="sort_task3_radio" ref="sort_avg_down_task3" value="courses_avg_down" selected /> Highest Average Grade<br/>*/}
                                {/*<input type="radio" name="sort_task3_radio" ref="sort_avg_up_task3" value="courses_avg_up"/> Lowest Average Grade<br/>*/}
                            {/*</div>*/}
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={()=>that.submit(3)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_3" onClick={()=>that.expand(3)}>Expand</button>
                    </div>
                    <div id="task4" className="tab-pane fade">
                        <h3>Find all the sections taught by instructor Y</h3>
                        Instructor <br/>
                        <input type="text" ref="input_instr_task4" className="form-control" onChange={()=>(autoCompleteGeneric(that.refs.input_instr_task4.value, that.refs.input_instr_task4_auto, that.props.INSTRU_UNIT))} /> <br/>
                        <input type="text" ref="input_instr_task4_auto" className="form-control" placeholder="<YouCompleteMe>" onClick={()=>that.refs.input_instr_task4.value=that.refs.input_instr_task4_auto.value} /> <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(4)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_4" onClick={()=>that.expand(4)}>Expand</button>
                    </div>
                    <div id="task5" className="tab-pane fade">
                        <h3>Show all of the key details for courses in the university with filters for course titles, department, and sizes</h3>
                        Filter By <br/>
                        <div onChange={that.setFilterKey.bind(this)}>
                            <input type="radio" name="filter_task5" value="courses_title" /> Course Title <div id="courses_title_input_task5"></div><br/>
                            <input type="radio" name="filter_task5" value="courses_dept"/> Course Department<div id="courses_dept_input_task5"></div><br/>
                            <input type="radio" name="filter_task5" value="courses_sectionSize"/> Course Size Greater Than<div id="courses_sectionSize_input_task5"></div><br/>
                        </div>
                        <button className="btn btn-primary" onClick={()=>that.submit(5)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_5" onClick={()=>that.expand(5)}>Expand</button>
                    </div>
                    <div id="task6" className="tab-pane fade">
                        <h3>Task 5, and allow filtering by more than one field concurrently</h3>
                        <div>
                            <div className="checkbox">
                            <input type="checkbox"  name="filter_task6" value="courses_title" onChange={that.handleChangeCheckBox.bind(this)}/>Course Title <div id="courses_title_input_task6"></div><br/>
                            <input type="checkbox"  name="filter_task6" value="courses_dept" onChange={that.handleChangeCheckBox.bind(this)}/>Course Department<div id="courses_dept_input_task6"></div><br/>
                            <input type="checkbox" name="filter_task6" value="courses_sectionSize" onChange={that.handleChangeCheckBox.bind(this)}/>Course Size Greater Than<div id="courses_sectionSize_input_task6"></div><br/>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={()=>that.submit(6)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_6" onClick={()=>that.expand(6)}>Expand</button>
                    </div>
                    <div id="task7" className="tab-pane fade">
                        <h3>From Spec, search by Course ID, with optional department name</h3>
                        Courses ID <br/>
                        <input type="text" ref="input_courses_id_task7" className="form-control" />
                        Department * <br/>
                        <input type="text" ref="input_depart_task7"  className="form-control"
                               onChange={()=>(autoCompleteGeneric(that.refs.input_depart_task7.value, that.refs.input_depart_task7_auto, that.props.DEPT_UNIT))}
                        /> <br/>
                        <input type="text" ref="input_depart_task7_auto" placeholder="<YouCompleteMe>" className="form-control"
                               onClick={()=>that.refs.input_depart_task7.value=that.refs.input_depart_task7_auto.value}
                        /> <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(7)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_7" onClick={()=>that.expand(7)}>Expand</button>
                    </div>
                </div>
            <div id="error"></div>
                <div id={that.props.renderName}></div>
            </div>
    );
};

let displayError = (msg)=>{
    let tmp =   '<div class="alert alert-danger fade in">'+
        '<a href="#" class="close" data-dismiss="alert">&times;</a>'+
        '<p><strong>Error!</strong>'+msg+'</p></div>';
    document.getElementById("error").innerHTML = tmp;
}

let task1Submit = (that)=>{

    let depart = that.refs.input_depart_task1.value.trim().toLowerCase();
    // console.log("depart is: ");
    // console.log(that.refs.input_depart_task1.value);
    if (depart == "" ){
        displayError("Please fill out department");
    }
    else {
        let sortBy = "courses_dept";
        let key = [];
        key.push(depart);
        let where = createWhere(["courses_dept"], key, ["IS"], null);
        let option = createOption(COURSES_COLS, sortBy);
        let query = createQuery(where, option, null);
        console.log(JSON.stringify(query));
        renderQuery(query, that.props.renderName, that.props.comp_id);
    }
};

let task2Submit = (that)=>{
    let depart = that.refs.input_depart_task2.value.trim().toLowerCase();
    if (depart == "" || that.props.sort_key == ""){
        displayError("Must fill out department and choose a sort by option");
    }
    else {
        let userKeyArray = ["Most Fail", "Most Pass", "Highest Average", "Lowest Average"];
        let possibleSortArray = ["courses_fail", "courses_pass", "courses_avg_down", "courses_avg_up"];
        let index = possibleSortArray.indexOf(that.props.sort_key);
        let innerKey = that.props.sort_key;
        let sortBy;
        if (index == 3) {
            sortBy = {"dir": "UP", "keys": [userKeyArray[index]]};
            innerKey = "courses_avg";
        }
        else {
            sortBy = {"dir": "DOWN", "keys": [userKeyArray[index]]};
            innerKey = "courses_avg";
        }
        let cols = ["courses_dept", "courses_id","courses_title"];
        cols.push(userKeyArray[index]);
        let where = createWhere(["courses_dept", "courses_year"], [depart, 1900], ["IS", "GT"], ["AND"]);
        let option = createOption(cols, sortBy);
        let groups =["courses_dept", "courses_id","courses_title"];
        let transformation;
        if (innerKey == "courses_avg") {
            transformation = createTransform(groups, [userKeyArray[index]],
                ["AVG"], [innerKey]);
        }
        else {
            transformation = createTransform(groups, [userKeyArray[index]],
                ["MAX"], [innerKey]);
        }
        let query = createQuery(where, option, transformation);
        console.log(JSON.stringify(query));
        renderQuery(query, that.props.renderName, that.props.comp_id);
    }
};

let task3Submit = (that)=>{
    let depart = that.refs.input_depart_task3.value.trim().toLowerCase();
    if (depart == "" || that.props.multiple_sort_key == "") {
        displayError("Must fill out department and check at least one option");
    }
    else {
        let userKeyArray = ["Most Fail", "Most Pass", "Highest Average"];
        let possibleSortArray = ["courses_fail", "courses_pass", "courses_avg"];
        let actualSortKey = [];
        let applyUserDefinedIds = [];
        let applykeys = [];
        let applyids = [];
        console.log(that.props.multiple_sort_key);
        for (let i of that.props.multiple_sort_key) {
            let index = possibleSortArray.indexOf(i);
            actualSortKey.push(userKeyArray[index]);
            applyUserDefinedIds.push(userKeyArray[index]);
            if (i == "courses_avg") {
                applykeys.push("AVG");
            }
            else {
                applykeys.push("MAX");
            }
            applyids.push(i);
        }
        let sortBy = {"dir": "DOWN", "keys": actualSortKey};
        console.log(sortBy);
        let key = [];
        key.push(depart);
        let cols = ["courses_dept", "courses_id","courses_title"];
        cols = cols.concat(actualSortKey);
        let where = createWhere(["courses_dept", "courses_year"], [key, 1900], ["IS", "GT"], ["AND"]);
        let option = createOption(cols, sortBy);
        let groups = ["courses_dept", "courses_id","courses_title"];
        let transformation = createTransform(groups, applyUserDefinedIds,
            applykeys, applyids);
        let query = createQuery(where, option, transformation);
        // console.log(JSON.stringify(query));
        renderQuery(query, that.props.renderName, that.props.comp_id);
    }
};

let task4Submit = (that) =>{
    let instr = that.refs.input_instr_task4.value.trim().toLowerCase();
    if (instr == ""){
        displayError("Please fill out instructor. e.g. *holmes*");
    }
    else {
        let sortBy = "courses_dept";
        let key = [];
        key.push(instr);
        let where = createWhere(["courses_instructor"], key, ["IS"], null);
        let option = createOption(COURSES_COLS, sortBy);
        let query = createQuery(where, option, null);
        // console.log(JSON.stringify(query));
        renderQuery(query, that.props.renderName, that.props.comp_id);
    }
};

let task5Submit = (that)=>{
    let e = document.getElementById("input_task5");
    if (e == null){
        displayError("Please check a radio button");
        return;
    }
    let filterValue = e.value.trim().toLowerCase();
    let filterKey = that.props.filter_key;
    if (filterKey == "" || filterValue == ""){
        displayError("Please fill out the input respectively");
    }
    else {
        let key = [];
        key.push(filterValue);
        let cols = ["courses_dept", "courses_id","courses_title"];
        let groups = ["courses_dept", "courses_id","courses_title"];
        // cols = cols.concat("courses_sectionSize");
        let where = {};
        if (filterKey === "courses_dept" || filterKey === "courses_title") {
            where = createWhere([filterKey], [filterValue], ["IS"], null);
            where = filterWithoutOverall(where, false);
            groups.push(filterKey);
        }
        else if (filterKey === "courses_sectionSize") {
            where = createWhere([filterKey], [Number(filterValue)], ["GT"], null);
            where = filterWithoutOverall(where, false);
            cols.push("Most Section Size");
        }
        let option = createOption(cols, null);
        let transformation = createTransform(groups, ["Most Section Size"],
            ["MAX"], ["courses_sectionSize"]);
        let query = createQuery(where, option, transformation);
        // console.log(JSON.stringify(query));
        renderQuery(query, that.props.renderName, that.props.comp_id);
    }
};

let task6Submit = (that)=>{
    // console.log(that.props.multiple_sort_key);
    if (that.props.multiple_sort_key == ""){
        displayError("Please check at least one box");
        return;
    }
    let filterValue = [];
    let filterKey = [];
    let comparisons = [];
    for (let i of that.props.multiple_sort_key){
        filterKey.push(i);
        // let e = document.getElementById("input_"+i+"_task6");
        // if (e == null){
        //     displayError("Internal error: should generate an input box!");
        //     return;
        // }
        let v = document.getElementById("input_"+i+"_task6").value.trim().toLowerCase();
        if (v == ""){
            displayError("Please fill out the input box respectively");
            return;
        }
        if (i === "courses_sectionSize"){
            filterValue.push(Number(v));
        }else {
            filterValue.push(v);
        }
    }
    let key = [];
    key.push(filterValue);
    let cols = ["courses_dept", "courses_id","courses_title"];
    let groups = ["courses_dept", "courses_id","courses_title"];
    // cols = cols.concat("courses_sectionSize");
    let where;
    for (let i of filterKey){
        if (i === "courses_dept" || i === "courses_title") {
            comparisons.push("IS");
            groups.push(i);
        }
        else if (i === "courses_sectionSize") {
            comparisons.push("GT");
            cols.push("Most Section Size");
        }
    }
    where = createWhere(filterKey,filterValue,comparisons,"AND");
    where = filterWithoutOverall(where,false);
    let option = createOption(cols, null);
    let transformation = createTransform(groups,["Most Section Size"],
        ["MAX"],["courses_sectionSize"]);
    let query = createQuery(where, option, transformation);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);

};


let task7Submit = (that)=>{
    let idValue = that.refs.input_courses_id_task7.value.trim();
    let depart = that.refs.input_depart_task7.value.trim().toLowerCase();
    // console.log("depart is: ");
    // console.log(that.refs.input_depart_task1.value);
    if (idValue == "" ){
        displayError("Please fill out Courses ID");
    }
    else {
        let sortBy = "courses_id";
        let value = [];
        let key = [];
        let comp = [];
        if (depart != ""){
            value.push(depart);
            key.push("courses_dept");
            comp.push("IS");
        }
        value.push(idValue);
        key.push("courses_id");
        comp.push("IS");
        let cols = ["courses_dept", "courses_id","courses_title"];
        let groups = ["courses_dept", "courses_id","courses_title"];
        let transformation = createTransform(groups,[],
            [],[]);
        let where = createWhere(key,value,comp, "AND");
        let option = createOption(cols, sortBy);
        let query = createQuery(where, option, transformation);
        console.log(JSON.stringify(query));
        renderQuery(query, that.props.renderName, that.props.comp_id);
    }
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

        this.props.BUILDING_UNIT = [];
        this.props.DEPT_UNIT = [];
        this.props.INSTRU_UNIT = [];
        feedAutoCompleteData(this);
        return {
            hide_table:true
        };
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
                this.setMultipleSortKey("sort_task3");
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
            case 7:
                task7Submit(this);
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
    },
    clearTable:function(){
        document.getElementById(this.props.renderName).innerHTML = "";
    },
    setSortKey: function(event){
        this.props.sort_key = event.target.value;
    },
    setFilterKey: function(event){
        this.props.filter_key = event.target.value;
        console.log("in set filter key-----");
        console.log(this.props.filter_key);
        console.log(event.target.value);
        createInputBox(this.props.filter_key,"task5",true);
    },
    setMultipleSortKey: function(id){
        this.props.multiple_sort_key = [];
        let list = document.getElementsByName(id);
        for (let e of list){
            if (e.value == "courses_average" && e.checked){
                this.props.multiple_sort_key.push(this.props.filter_key);
            }
            if (e.checked){
                this.props.multiple_sort_key.push(e.value);
            }
        }
        console.log(this.props.multiple_sort_key);
        // if (event.target.checked && this.props.multiple_sort_key.indexOf(event.target.value) == -1){
        // this.props.multiple_sort_key.push(event.target.value);
        // }
    },
    handleChangeCheckBox: function(event){
        console.log(this.props.multiple_sort_key);
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
    expand:function(num){ expandCollapse(this, this.props.style_id,num); },
    render:function(){ return sectionRender(this); }
});
let listOfTask5Inputs = ["courses_title_input","courses_dept_input","courses_sectionSize_input"];

let clearInputBoxes = (num)=>{
    //clear out all the other ones first
    for (let i =0; i <listOfTask5Inputs.length; i++){
        let e = document.getElementById(listOfTask5Inputs[i]+"_task"+num);
        if (e != null) {
            e.innerHTML = "";
        }
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
    e.innerHTML = "<input type="+new_type+" id='" + new_id + "'class='form-control'/> <br/>";

};

ReactDOM.render(<div><SectionExp/></div>, document.getElementById('courses_root'));
