import React from 'react';
import Update from './Update';
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            name: undefined,
            update_state: false,
            update_id: undefined,
            update_name: undefined,
            table_index: undefined
        }
    }
    handleid(e) {
        this.setState({ id: e.target.value });
    }
    handlename(e) {
        this.setState({ name: e.target.value });
    }
    updatetable() {
        let updatedata = this.props.emp_data;
        let newitem = [];
        if (this.state.id || this.state.name) {
            newitem = [{ Employee_id: this.state.id, Name: this.state.name }];
        }
        else {
            newitem = [];
        }
        updatedata = newitem ? updatedata.concat(newitem) : updatedata;
        this.props.updatetable(updatedata);
        this.textinput1.value = '';
        this.textinput2.value = '';
        this.setState({ name: '', id: '' });
        this.setState({ editable: false });
    }
    deletedata(employee_id) {
        let updatedata = this.props.emp_data;
        updatedata = updatedata.filter((employeedata) => employeedata.Employee_id != employee_id);
        this.props.updatetable(updatedata);
    }
    check_unique(id) {
        let duplicate_id = this.props.emp_data.find(employee => employee.Employee_id == id);
        if (duplicate_id != undefined) {
            alert('Id should be unique');
            this.textinput1.value = '';
            this.setState({ id: '', update_id: '' });
            this.text_input1.value = '';
        }
        //  this.text_input1.focus();
    }
    updatedata(index, id, name) {
        this.setState({ update_state: true, table_index: index });
        //    this.text_input1.value=id;
        //    this.text_input2.value=name;
    }
    savedata(id, index) {
        this.setState({ update_state: false });
        let updatedata = this.props.emp_data;
        let newitem = {};
        if (this.state.update_id || this.state.update_name) {
            newitem = { Employee_id: this.state.update_id, Name: this.state.update_name };
        }
        else {
            newitem = undefined;
        }
        newitem ? updatedata.splice(index, 1, newitem) : updatedata;
        this.props.updatetable(updatedata);
        this.setState({ name: '', id: '' });
    }
    updateid(e, id) {
        //  e.target.value = id;
        this.setState({ update_id: e.target.value });
    }
    updatename(e, name) {
        //  e.target.value = name;
        this.setState({ update_name: e.target.value });
    }
    render() {
        return (
            <div class="container">
                <form>
                <h2>{this.props.tableName}</h2>
                            <div className="row">
                                <div className="col-sm-3">{this.props.col1}</div>
                                <div className="col-sm-3">{this.props.col2}</div>
                            </div>
                            {this.props.emp_data.map((obj, index) => {
                                return (
                                    <div key={index} className="row">
                                        {(this.state.update_state) && (this.state.table_index == index) ?
                                            <div className="col-sm-6 row">
                                                <div className="col-sm-6" ><input type="text" placeholder={obj.Employee_id} onChange={e => this.updateid(e, obj.Employee_id)} onBlur={e => this.check_unique(this.state.update_id)} /></div>
                                                <div className="col-sm-6"><input type="text" placeholder={obj.Name} onChange={e => this.updatename(e, obj.Name)} /></div>
                                            </div>
                                            : <div className="col-sm-6 row">
                                                <div className="col-sm-6">{obj.Employee_id}</div>
                                                <div className="col-sm-6">{obj.Name}</div>
                                            </div>
                                        }
                                        <div className="col-sm-1"><input type="button" value="x" onClick={e => this.deletedata(obj.Employee_id)} /></div>
                                        <div className="col-sm-2"><input type="button" value="Update" onClick={e => this.updatedata(index, obj.Employee_id, obj.Name)} /></div>
                                        <div className="col-sm-2"><input type="button" value="Save" onClick={e => this.savedata(obj.Employee_id, index)} /></div>
                                    </div>
                                )
                            })}
                            <div>
                                <span><input type="text" className="inputbox" ref={(node) => { this.textinput1 = node }} onChange={e => this.handleid(e)} onBlur={e => this.check_unique(this.state.id)} /></span>
                                <span><input type="text" className="inputbox" ref={(node) => { this.textinput2 = node }} onChange={e => this.handlename(e)} /></span>
                                <span><input type="button" className="submitdata" value="Submit" onClick={e => this.updatetable()} /></span>
                            </div> 
                </form>
            </div>
        );
    }
}
export default Table;
