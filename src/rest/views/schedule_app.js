let displayError = (msg, id)=>{
    let tmp =   '<div class="alert alert-danger fade in">'+
        '<a href="#" class="close" data-dismiss="alert">&times;</a>'+
        '<p><strong>Error!</strong>'+msg+'</p></div>';
    document.getElementById(id).innerHTML = tmp;
}

//send filtering request, using this.state.coures
let scheduleRender = (that)=>{
    return (
        <div className="container">
            <div className="page-header"><h1>{that.props.title}</h1></div>

            <div>
                <h2>Room Input</h2>
                <h4>Instructions: leave all empty will add all rooms</h4>
                <div id="addRoomWithoutFilter" className="form-group">
                    Room_shortname<br/>
                    <input type="text" ref="building_add"  className="form-control" onChange={that.building_search}/> <br/>
                    <input type="text" ref="building_auto" className="form-control" onClick={that.building_fill} placeholder="<YouCompleteMe>"/> <br/>
                    Room_number<br/>
                    <input type="text" ref="id_add"  className="form-control"/> <br/>
                    <div className="radio">
                    <input type="radio" name="logic1" ref="and_radio_1" value="AND"/> AND<br/>
                    <input type="radio" name="logic1" ref="or_radio_1" value="OR"/> OR<br/>
                    </div>
                    <input type="number" ref="id_meters"  className="form-control"/> meters from building <br/><input type="text" ref="id_from_building"  className="form-control"/> <br/>
                    <input type="button" className="btn btn-primary" value="Add Room" onClick={that.addRoom}/>
                    <input type="button" className="btn btn-primary" value="Clear" onClick={that.clearRoom}/>
                    <input type="button" className="btn btn-primary" value="Display Selected" onClick={that.doneAddRoom}/> <br/>
                    <div>
                        <div id="error_rooms"></div>
                        <h4>Added Rooms</h4>
                        <div id="added_rooms">

                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2>Course Input</h2>
                <div id="addCourseWithoutFilter" className="form-group">
                    <label>Courses_dept</label><br/>
                    <input type="text" ref="dept_add" className="form-control" onChange={that.dept_search}/> <br/>
                    <input type="text" ref="dept_auto" className="form-control" onClick={that.dept_fill} placeholder="<YouCompleteMe>"/> <br/>
                    <div className="radio">
                        <input type="radio" name="logic2" ref="and_radio_2" value="AND" selected/> AND<br/>
                    <input type="radio" name="logic2" ref="or_radio_2" value="OR"/> OR<br/>
                    Courses_id<br/>
                    </div>
                    <input type="text" ref="cid_add"  className="form-control"/> <br/>
                    <input type="button" className="btn btn-primary" value="Add Course" onClick={that.addCourse}/>
                    <input type="button" className="btn btn-primary" value="Clear" onClick={that.clearCourse}/>
                    <input type="button" className="btn btn-primary" value="Display Selected" onClick={that.doneAddCourse}/> <br/>
                    <div>
                        <div id="error_courses"></div>
                        <h4>Added Courses</h4>
                        <div id="added_courses">

                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2>Time Table</h2>
                <input type="button" className="btn btn-primary" value="Fetch Schedule" onClick={that.fetchSchedule}/>
                <input type="button" className="btn btn-primary" value="Previous Room" onClick={that.showPreviousRoom}/>
                <input type="button" className="btn btn-primary"  value="Next Room" onClick={that.showNextRoom}/>
                <input type="button" className="btn btn-primary" value="Clear" onClick={that.clearTimeTable}/> <br/>
                <div id="error_timetable"></div>
                <h3 id="room_title"> </h3>
                <p id="room_info"> </p>
                <p id="viewing_info"> </p>
                <div id="timetables">
                </div>
            </div>
        </div>
    );
};

//TODO
//send filtering request, using this.state.coures
//should be adding courses, not adding sections

let Scheduler = React.createClass({
    getInitialState:function(){
        this.props.BUILDING_UNIT = [];
        this.props.DEPT_UNIT = [];
        this.props.INSTRU_UNIT = []; 
        this.props.title = "Scheduler";

        feedAutoCompleteData(this);

        //selected rooms and courses
        return {courses:null, rooms:null, schedule:null,
            rooms_list:null, current_room:-1,
            remain_course:[], score:-1
        };
    },
    building_fill:function(){
        this.refs.building_add.value = this.refs.building_auto.value;
    },
    dept_fill:function(){
        this.refs.dept_add.value = this.refs.dept_auto.value;
    },
    dept_search:function (){
        autoCompleteGeneric(this.refs.dept_add.value.toLowerCase(), this.refs.dept_auto, this.props.DEPT_UNIT);
    },
    building_search:function (){
        autoCompleteGeneric(this.refs.building_add.value.toUpperCase(), this.refs.building_auto, this.props.BUILDING_UNIT);
    },
    addCourse: function(){
        if(this.state.courses == null)this.state.courses = [];
        let dept = this.refs.dept_add.value.trim().toLowerCase();
        let id = this.refs.cid_add.value.trim();
        let logic = this.refs.and_radio_2.checked? "AND": null;
        if (logic == null) {
            logic = this.refs.or_radio_2.checked ? "OR" : null;
        }
        //error checking
        if (logic == null && (dept != "" || id != "")){
            displayError("Please select logic AND/OR", "error_courses");
            return;
        }

        let where = getCourseWhere(dept, id, logic);
        console.log(where);
        renderAdd2stage(this.state.courses, this, "added_courses_table", "added_courses", where, NUM_SEC_COURSE_COLS, MAX_SEC_COURSE_COLS, getNumSecCourseTransformer(), getMaxSecCourseTransformer());
    },
    doneAddCourse:function(){
        let list = this.state.courses;
        let table_id = "added_courses_table";
        let target_id = "added_courses";
        if(list.length == 0){
            injectTable(list, target_id, table_id, 'Oops~~ Nothing is found (200).');
        }else{
            injectTable(list, target_id, table_id, null);
        }
    },
    clearCourse:function(){
        this.state.courses = [];
        document.getElementById("added_courses").innerHTML = "";
    },
    addRoom: function(){
        if(this.state.rooms == null)this.state.rooms = [];
        let building = this.refs.building_add.value.trim().toUpperCase();
        let id = this.refs.id_add.value.trim();
        let meter = Number(this.refs.id_meters.value.trim());
        let id_from_building = this.refs.id_from_building.value.trim().toUpperCase();
        // console.log(this.refs.and_radio_1);
        let logic = this.refs.and_radio_1.checked ? "AND": null;
        if (logic == null){
            logic = this.refs.or_radio_1.checked? "OR": null;
        }

        //error checking
        if (logic == null){
            if (id_from_building == "" && this.refs.id_meters.value == ""){
                //valid
            }
            else {
                console.log("hereee");
                displayError("Please select logic or do not fill X meters from building Y","error_rooms");
                return;
            }
        }
        else{
            if (this.refs.id_meters.value == ""){
                displayError("Please fill out X meters from building Y, they must appear together", "error_rooms");
                return;
            }
            else if (meter % 1 != 0 || meter < 0){
                displayError("Please only use positive integers for meters", "error_rooms");
                return;
            }
        }


        let list_keys = []; let list_vals = []; let list_comp = [];

        if(building != ""){
            list_keys.push("rooms_shortname");
            list_vals.push(building);
            list_comp.push("IS");
        }

        if(id != ""){
            list_keys.push("rooms_number");
            list_vals.push(id);
            list_comp.push("IS");
        }

        let where;
        if(list_keys.length == 0){
            where = {};
        }else{
            where = createWhere(list_keys, list_vals, list_comp, "AND");
        }

        let option = createOption(ROOMS_COLS, {'dir':'DOWN',"keys":["rooms_seats"]}); let transf = null;
        let query = createQuery(where, option, transf);
        //console.log(logic);
        let queryAll = createQuery({},option,transf);

        if (this.refs.id_meters.value.trim() && id_from_building) {

            if (logic == "AND") {
                let queryOrigin = createQuery(createWhere(["rooms_shortname"], [id_from_building], ["IS"], null), option, transf);
                //console.log(JSON.stringify(queryOrigin));
                //console.log(JSON.stringify(query));
                getQueryResultNotDone(query, queryOrigin, "added_rooms", "added_rooms_table", meter, this, true, renderquery_process_not_done);
            }
            else { // logic is OR
                let queryOrigin = createQuery(createWhere(["rooms_shortname"], [id_from_building], ["IS"], null), option, transf);
                //console.log(JSON.stringify(queryOrigin));
                //console.log(JSON.stringify(query));
                getQueryResultNotDone2Stage(queryAll, queryOrigin, query, "added_rooms", "added_rooms_table", meter, this, true, renderquery_process_not_done);
            }
        }
        else{
            //just do normally
            renderQueryProcess(query, "added_rooms", "added_rooms_table", this, true, renderquery_process_not_done);
        }
    },

    doneAddRoom:function(){
        renderDone(this.state.rooms, this,
            consShallowWhere, ROOMS_COLS,
             {'dir':'DOWN', "keys":['rooms_seats']},"added_rooms_table", "added_rooms", true, null);
    },
    clearRoom:function(){
        this.state.rooms = [];
        document.getElementById("added_rooms").innerHTML = "";
    },
    showPreviousRoom:function(){
        let op = (x, m)=>{
            let t = (x - 1)%m;
            t = (t>=0)?t:(t+m);
            return t;
        };
        scrollRoom(this, op);
    },
    showNextRoom:function(){
        let op = (x, m)=>{
            return (x+1)%m;
        };
        scrollRoom(this, op);
    },
    fetchSchedule:function(){
        let data = {};
        data['rooms'] = this.state.rooms;
        data['courses'] = this.state.courses;
        getSchedule(data, this);
    },
    clearTimeTable:function(){
        this.state.score = -1;
        this.state.current_room = -1;
        this.state.remain_course = [];
        this.state.schedule = null;
        this.state.rooms_list = [];

        document.getElementById('timetables').innerHTML = '';
        document.getElementById('room_info').innerHTML = "";
        document.getElementById('viewing_info').innerHTML = "";
        document.getElementById('room_title').innerHTML = '';

    },
    render:function(){
        return scheduleRender(this);
    }
});

ReactDOM.render(<div><Scheduler/></div>, document.getElementById('scheduler_root'));
