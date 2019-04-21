/**
 * Created by Nyanko on 3/29/2017.
 */
let displayError = (msg)=>{
    let tmp =   '<div class="alert alert-danger fade in">'+
        '<a href="#" class="close" data-dismiss="alert">&times;</a>'+
        '<p><strong>Error!</strong>'+msg+'</p></div>';
    document.getElementById("error").innerHTML = tmp;
}

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

let novelRender = (that)=>{
    return (
        <div className="container">
            <h1>{that.props.title}</h1>
            <h2>Arbitrary and/or queries on Courses</h2>
            <h6>Note: Add allows repetition, it does not influence query result</h6>
            <div className="row">
                <select id="input_key">
                    <option value="courses_dept"> Department</option>
                    <option value="courses_id"> Course ID</option>
                    <option value="courses_title"> Course Title</option>
                </select>
                <input type="text" className="form-control" ref="input_value_ref" id="input_value"/><br/>
                <label>Logic </label> <br/>
                <label className="radio-inline"><input type="radio"  ref="logic_and" name="logic" value="AND" /> And </label>
                <label className="radio-inline"><input type="radio"  ref="logic_or" name="logic" value="OR" /> Or </label> <br/>
            <button className="btn btn-primary" onClick={that.add}>Add</button>
            <button className="btn btn-primary" onClick={that.submit}>Query</button>
            <button className="btn btn-primary" onClick={that.clear}>Clear</button>
            <button className="btn btn-primary" id="expand_collapse" onClick={that.expand}>Expand</button>
            </div>
            <div id="error" className="row"></div>
            <div className="row">
                <div id={that.props.tmpAnd} className="col"></div>
                <div id={that.props.tmpOr} className="col"></div>
            </div>
            <div id={that.props.renderName}></div>
            <div id={that.props.renderName}></div>
        </div>
    );
};

let sectionSubmit = (that)=>{
    let q = that.props.query;
    q.WHERE.OR = that.props.or_list;
    q.WHERE.OR.push({"AND":that.props.and_list});
    console.log(JSON.stringify(q));
    renderQuery(q, that.props.renderName, that.props.comp_id);
};

let addToQuery = (that)=>{
    let logic = that.refs.logic_and.checked? "AND": null;
    if (logic == null){
        logic = that.refs.logic_or.checked? "OR": null;
    }
    if (logic == null){
        displayError("Please select AND/OR","error");
        return;
    }
    let t = document.getElementById("input_value");
    let v = document.getElementById("input_key");
    if (t.value == ""){
        displayError("Please fill out input box","error");
        return;
    }
    let tmp = {};
    let key = v.options[v.selectedIndex].value;
    tmp[key] = t.value;
    let tmp2 = {"IS":tmp};
    if (logic == "AND"){
        that.props.and_list.push(tmp2);
        // that.props.and_list =  uniqueObject(that.props.and_list);
        displayTable(that.props.and_list,that.props.tmpAnd);
    }
    else{ //logic is OR
        that.props.or_list.push(tmp2);
        // that.props.or_list = uniqueObject(that.props.or_list);
        displayTable(that.props.or_list,that.props.tmpOr);
    }
};

let displayTable = (list, table_id)=>{
    let e = document.getElementById(table_id);
    e.innerHTML = "";
    let table = document.createElement("table");
    table.setAttribute("class", "table");
    let head = document.createElement("thead");
    head.setAttribute("class","thead-inverse");
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    if (table_id == "andList") {
        th.appendChild(document.createTextNode("And List"));
    }
    else {
        th.appendChild(document.createTextNode("Or List"));
    }
    tr.appendChild(th);
    head.appendChild(tr);
    table.appendChild(head);

    let body = document.createElement("tbody");
    let count = 1;
    for (let i of list){
        let tr = document.createElement("tr");
        let th2 = document.createElement("th");
        th2.setAttribute("scope","row");
        th2.appendChild(document.createTextNode(count));
        tr.appendChild(th2);
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(JSON.stringify(i)));
        tr.appendChild(td);
        body.appendChild(tr);
        count ++;
    }
    table.appendChild(body);
    e.appendChild(table);
};

let InifiniteAndOR = React.createClass({
    getInitialState: function () {

        this.state = {
            selected: undefined
        }

        this.props.comp_id = "sec";
        this.props.title = "Novel Explorer";
        this.props.sort_key = "";
        this.props.filter_key = "";
        this.props.multiple_sort_key = [];
        //No need to init the following:
        this.props.style_id = "style_" + this.props.comp_id;
        this.props.showStyle = document.getElementById(this.props.style_id).childNodes[0];
        this.props.and_list = [];
        this.props.or_list = [];
        let option = createOption(["courses_dept","courses_id","courses_title"],"courses_dept");
        let trans = createTransform(["courses_dept","courses_id","courses_title"],[],[],[]);
        this.props.query = createQuery({"OR":[]},option,trans);;
        //style tag id in html
        this.props.renderName = this.props.comp_id + "_exp_render";
        this.props.tmpAnd = "andList";
        this.props.tmpOr = "orList";
        this.props.count = 0;
        return {
            hide_table:true
        };

    },
    submit:function(){
        this.clearTable();
        sectionSubmit(this);

    },
    clear:function(){
        let keys = Object.keys(this.refs);
        for (let e in keys){
            this.refs[keys[e]].value = "";
            this.refs[keys[e]].checked = false;
        }
        this.clearTable();
        document.getElementById("input_key").selectedIndex = 0;
        this.props.and_list = [];
        this.props.or_list = [];
        document.getElementById("andList").innerHTML = "";
        document.getElementById("orList").innerHTML = "";
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
    onChange: function(){
        alert("HEY!");
    },
    onSelect: function(user){
        alert("DONE");
        this.setState({
           selectedUser: user
        });
    },
    add: function(){ addToQuery(this);},
    expand:function(){ expandCollapse(this, this.props.style_id); },
    render:function(){ return novelRender(this); }
});

ReactDOM.render(<div><InifiniteAndOR/></div>, document.getElementById("novel_root"));