/**
 * Created by Nyanko on 3/29/2017.
 */

//this file is the main js
//only deal with UI creating

let displayError = (msg)=>{
    let tmp =   '<div class="alert alert-danger fade in">'+
        '<a href="#" class="close" data-dismiss="alert">&times;</a>'+
        '<p><strong>Error!</strong>'+msg+'</p></div>';
    document.getElementById("error").innerHTML = tmp;
}

function expandCollapse(that, style_id,num){
    if(that.state.hide_table){
        console.log(style_id);
        let style = document.getElementById(style_id);
        style.removeChild(style.childNodes[0]);
        // console.log("expand_collapse_"+num);
        document.getElementById("expand_collapse_"+num).innerHTML = "Collapse";
    }else{
        let style = document.getElementById(style_id);
        console.log(style);
        style.appendChild(that.props.showStyle);
        document.getElementById("expand_collapse_"+num).innerHTML = "Show All";
    }
    that.state.hide_table = !that.state.hide_table;
}

let listOfTask5Inputs = ["rooms_type_input", "rooms_furniture_input"];

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
    e.innerHTML = "<input type="+new_type+" id='" + new_id + "'class='form-control'/> <br/>";
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

        this.props.BUILDING_UNIT = [];
        this.props.DEPT_UNIT = [];
        this.props.INSTRU_UNIT = [];
        feedAutoCompleteData(this);
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
            case 7:
                task7Room(this);
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
    expand:function(num){ expandCollapse(this, this.props.style_id, num); },
    render:function(){ return roomRender(this); }
});

let roomRender = (that)=>{
    return (
        <div className="container">
            <h1>{that.props.title}</h1>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#task1_rooms" onClick={that.clearTable}>Task 1</a></li>
                    <li><a data-toggle="tab" href="#task2_rooms" onClick={that.clearTable}>Task 2</a></li>
                    <li><a data-toggle="tab" href="#task3_rooms" onClick={that.clearTable}>Task 3</a></li>
                    <li><a data-toggle="tab" href="#task4_rooms" onClick={that.clearTable}>Task 4</a></li>
                    <li><a data-toggle="tab" href="#task5_rooms" onClick={that.clearTable}>Task 5</a></li>
                    <li><a data-toggle="tab" href="#task6_rooms" onClick={that.clearTable}>Task 6</a></li>
                    <li><a data-toggle="tab" href="#task7_rooms" onClick={that.clearTable}>Task 7</a></li>
                </ul>
                <div className="tab-content">
                    <div id="task1_rooms" className="tab-pane fade in active">
                        <h3>Show all rooms in building X</h3>
                        <label>Short Building name</label> <br/>
                        <input type="text" ref="input_building_task1" className="form-control"
                               onChange={()=>(autoCompleteGeneric(that.refs.input_building_task1.value, that.refs.input_building_task1_auto, that.props.BUILDING_UNIT))}
                        /> <br/>
                        <input type="text" ref="input_building_task1_auto" className="form-control" placeholder="<YouCompleteMe>"
                               onClick={()=>that.refs.input_building_task1.value=that.refs.input_building_task1_auto.value}
                        /><br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(1)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_1" onClick={()=>that.expand(1)}>Expand</button>
                    </div>
                    <div id="task2_rooms" className="tab-pane fade">
                        <h3>Show all rooms within X meters of building X</h3>
                        <label>Short Building name</label> <br/>
                        <input type="text" ref="input_building_task2" className="form-control"/> <br/>
                        <label>Within meters</label> <br/>
                        <input type="number" ref="input_distance_task2" className="form-control"/> <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(2)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_2" onClick={()=>that.expand(2)}>Expand</button>
                    </div>
                    <div id="task3_rooms" className="tab-pane fade">
                        <h3>Show all rooms over size X</h3>
                        <label> Room Size </label> <br/>
                        <input type="number" ref="input_size_task3" className="form-control"/> <br/>
                        Sort by the following order: <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(3)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_3" onClick={()=>that.expand(3)}>Expand</button>
                    </div>
                    <div id="task4_rooms" className="tab-pane fade">
                        <h3>Task 3 within X meters of building X</h3>
                        <label>Short Building name</label> <br/>
                        <input type="text" ref="input_building_task4" className="form-control" placeholder="DMP"/> <br/>
                        <label>Within meters</label> <br/>
                        <input type="number" ref="input_distance_task4" className="form-control" placeholder="0"/> <br/>
                        <label> Room Size </label> <br/>
                        <input type="number" ref="input_size_task4" className="form-control" placeholder="0"/> <br/>
                        <button className="btn btn-primary" onClick={()=>that.submit(4)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_4" onClick={()=>that.expand(4)}>Expand</button>
                    </div>
                    <div id="task5_rooms" className="tab-pane fade">
                        <h3>Show all rooms with type X or furniture X</h3>
                        Filter By <br/>
                        <div onChange={that.setFilterKeyTask5.bind(this)}>
                            <div className="radio">
                            <input type="radio" name="filter_room_task5" ref="filter_rooms_type" value="rooms_type" /> Rooms Type <div id="rooms_type_input_task5"></div><br/>
                            <input type="radio" name="filter_room_task5" ref="filter_rooms_furniture" value="rooms_furniture" /> Rooms Furniture Type<div id="rooms_furniture_input_task5"></div><br/>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={()=>that.submit(5)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_5" onClick={()=>that.expand(5)}>Expand</button>
                    </div>
                    <div id="task6_rooms" className="tab-pane fade">
                        <h3>Task 5,and within X meters of building X.</h3>
                        <label>Short Building name</label> <br/>
                        <input type="text" ref="input_building_task6" className="form-control"/> <br/>
                        <label>Within meters</label> <br/>
                        <input type="number" ref="input_distance_task6" className="form-control"/> <br/>
                        Filter By <br/>
                        <div onChange={that.setFilterKeyTask6.bind(this)}>
                            <div className="radio">
                            <input type="radio" name="filter_room_task6" ref="filter_rooms_type" value="rooms_type"/> Rooms Type <div id="rooms_type_input_task6"></div><br/>
                            <input type="radio" name="filter_room_task6" ref="filter_rooms_furniture" value="rooms_furniture"/> Rooms Furniture Type<div id="rooms_furniture_input_task6"></div><br/>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={()=>that.submit(6)}>Submit</button>
                        <button className="btn btn-primary" onClick={that.clear}>Clear</button>
                        <button className="btn btn-primary" id="expand_collapse_6" onClick={()=>that.expand(6)}>Expand</button>
                    </div>
                    <div id="task7_rooms" className="tab-pane fade">
                        <h3>From Spec, search by Room number, with optional building short name</h3>
                        <label>Room number</label> <br/>
                        <input type="text" ref="input_room_number_task7" className="form-control"/> <br/>
                        <label>Short Building name</label> <br/>
                        <input type="text" ref="input_building_task7" className="form-control"/> <br/>
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

let task1Room = (that) =>{
    let roomsShortNameValue = that.refs.input_building_task1.value.trim().toUpperCase();
    if (roomsShortNameValue == ""){
        displayError("Please fill out the short room name");
        return;
    }
    let key = [];
    key.push(roomsShortNameValue);
    let where = createWhere(["rooms_shortname"],key , ["IS"], null);
    let option = createOption(ROOMS_COLS, null);
    let query = createQuery(where, option, null);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task2Room = (that) =>{
    let roomsShortNameValue = that.refs.input_building_task2.value.trim().toUpperCase();
    let roomsDistance = Number(that.refs.input_distance_task2.value).toFixed(2);
    if (roomsShortNameValue == "" || that.refs.input_distance_task2.value == ""){
        displayError("Please fill out both the room short name and room distance");
        return;
    }
    if (roomsDistance < 0){
        displayError("Please only fill positive number (float or integer) for distance");
        return;
    }
    let key = [];
    key.push(roomsShortNameValue);
    let whereOne = {};
    let option = createOption(["rooms_shortname","rooms_number","rooms_lon","rooms_lat"], null);
    let queryOne = createQuery(whereOne, option, null);

    let whereTwo = createWhere(["rooms_shortname"],key , ["IS"], null);
    let optionTwo = createOption(ROOMS_COLS,null);
    let transformation = createTransform(ROOMS_COLS,[],[],[]);
    let queryTwo = createQuery(whereTwo, optionTwo, transformation);

    console.log(JSON.stringify(queryOne));
    console.log(JSON.stringify(queryTwo))
    getQueryResult(queryOne, queryTwo, that.props.renderName, that.props.comp_id, roomsDistance);
};

let task3Room = (that) =>{
    let roomsSizeValue = that.refs.input_size_task3.value.trim();
    if(roomsSizeValue == ""){
        displayError("Please fill out the room size integer");
        return;
    }
    roomsSizeValue = Number(roomsSizeValue);
    if (roomsSizeValue % 1 != 0 || roomsSizeValue < 0){
        displayError("Please only fill positive integer");
        return;
    }
    let key = [];
    key.push(roomsSizeValue);
    let where = createWhere(["rooms_seats"],key , ["GT"], null);
    let option = createOption(ROOMS_COLS, null);
    let query = createQuery(where, option, null);
    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task4Room = (that) =>{
    let roomsSizeValue = that.refs.input_size_task4.value.trim();
    let roomsShortNameValue = that.refs.input_building_task4.value.trim().toUpperCase();
    let roomsDistance = Number(that.refs.input_distance_task4.value).toFixed(2);
    if (roomsShortNameValue == "" || roomsSizeValue == "" || that.refs.input_distance_task4.value == ""){
        displayError("Please fill out all three fields");
        return;
    }
    if (roomsDistance < 0){
        displayError("Please only fill positive number (float or integer) for distance");
        return;
    }
    roomsSizeValue = Number(roomsSizeValue);
    if (roomsSizeValue % 1 != 0 || roomsSizeValue < 0){
        displayError("Please fill positive integer for room size");
        return;
    }
    let key = [];
    key.push(roomsSizeValue);
    let whereOne = createWhere(["rooms_seats"],key , ["GT"], null);
    let option = createOption(ROOMS_COLS, null);
    let queryOne = createQuery(whereOne, option, null);

    key.push(roomsShortNameValue);
    let whereTwo = createWhere(["rooms_seats","rooms_shortname"],key , ["GT","IS"], "AND");
    let optionTwo = createOption(ROOMS_COLS,null);
    let transformation = createTransform(ROOMS_COLS,[],[],[]);
    let queryTwo = createQuery(whereTwo, optionTwo, transformation);

    console.log(JSON.stringify(queryOne));
    console.log(JSON.stringify(queryTwo))
    getQueryResult(queryOne, queryTwo, that.props.renderName, that.props.comp_id, roomsDistance);
};

let task5Room = (that) =>{
    let input_key = that.props.filter_key;
    let e = document.getElementById("input_"+input_key+"_task5") ;
    if (e == null){
        displayError("Please choose a radio button");
        return;
    }
    let input_value = e.value.trim();
    if (input_value == ""){
        displayError("Please fill out the input text box");
        return;
    }
    let key = [];
    key.push(input_key);
    let where = createWhere(key,[input_value] , ["IS"], null);
    let option = createOption(ROOMS_COLS, null);
    let query = createQuery(where, option, null);
    // console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};

let task6Room = (that) =>{
    let input_key = that.props.filter_key;
    let e = document.getElementById("input_"+input_key+"_task6");
    if (e == null){
        displayError("Please choose a filter by option");
        return;
    }
    let input_value = e.value.trim();
    if (input_value == ""){
        displayError("Please fill out the input box under the filter option");
        return;
    }
    let roomsShortNameValue = that.refs.input_building_task6.value.trim().toUpperCase();
    if (roomsShortNameValue == "" || that.refs.input_distance_task6.value == ""){
        displayError("Please fill out the building name AND distance value");
        return;
    }
    let roomsDistance = Number(that.refs.input_distance_task6.value).toFixed(2);
    if (roomsDistance < 0){
        displayError("Please only fill in positive floating-point or integer for meters");
        return;
    }
    let key = [];
    key.push(roomsShortNameValue);
    let whereOne = createWhere([input_key],[input_value],["IS"],null);
    let option = createOption(ROOMS_COLS, null);
    let queryOne = createQuery(whereOne, option, null);

    let whereTwo = createWhere([input_key,"rooms_shortname"],[input_value,roomsShortNameValue] , ["IS","IS"], "AND");
    let optionTwo = createOption(ROOMS_COLS,null);
    let transformation = createTransform(ROOMS_COLS,[],[],[]);
    let queryTwo = createQuery(whereTwo, optionTwo, transformation);

    // console.log(JSON.stringify(queryOne));
    // console.log(JSON.stringify(queryTwo))
    getQueryResult(queryOne, queryTwo, that.props.renderName, that.props.comp_id, roomsDistance);
};

let task7Room = (that) =>{
    let roomsShortNameValue = that.refs.input_building_task7.value.trim().toUpperCase();
    let roomsIdValue = that.refs.input_room_number_task7.value.trim();
    if (roomsIdValue == ""){
        displayError("Please fill out rooms ID value");
        return;
    }

    let key = [];
    let value = [];
    let comps = [];
    if (roomsShortNameValue != "") {
        value.push(roomsShortNameValue);
        key.push("rooms_shortname");
        comps.push("IS");
    }
    value.push(roomsIdValue);
    key.push("rooms_number");
    comps.push("IS");
    let where = createWhere(key,value,comps,"AND");
    let option = createOption(ROOMS_COLS, null);
    let query = createQuery(where, option, null);

    console.log(JSON.stringify(query));
    renderQuery(query, that.props.renderName, that.props.comp_id);
};


ReactDOM.render(<div><RoomExp/></div>, document.getElementById('rooms_root'));
