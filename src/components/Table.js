import React from 'react';
// import Update from './Update';
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            name: undefined,
            update_state: false,
            update_id: undefined,
            update_name: undefined,
            table_index: undefined,
            input_text: {
                'id':undefined,
                'name':undefined,
                'updateid':undefined,
                'updatename':undefined
            }
        }
    }
    updatetable() {
        let updatedata = this.props.emp_data;
        let newitem = [];
        if (this.state.input_text['id'] || this.state.input_text['name']) {
            newitem = [{ Employee_id: this.state.input_text['id'], Name: this.state.input_text['name'] }];
        }
        else {
            newitem = [];
        }
        updatedata = newitem ? updatedata.concat(newitem) : updatedata;
        this.props.updatetable(updatedata);
        this.textinput1.value = '';
        this.textinput2.value = '';
        this.setState(prevState => ({
            input_text: {
                ...prevState.input_text,
                'id': '',
                'name' : ''
            }
        }))
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
          //  let input_text = Object.assign({}, this.state.input_text); 
            let input_text = {...this.state.input_text};
            console.log(input_text);
            input_text['id']='';
            input_text['updateid']='';
            this.setState({input_text});
        }
    }
    updatedata(index, id, name) {
        this.setState({ update_state: true, table_index: index });
    }
    savedata(index) {
        this.setState({ update_state: false });
        let updatedata = this.props.emp_data;
        let newitem = {};
        if (this.state.input_text['updateid'] || this.state.input_text['updatename']) {
            newitem = { Employee_id: this.state.input_text['updateid'], Name: this.state.input_text['updatename'] };
        }
        else {
            newitem = undefined;
        }
        newitem ? updatedata.splice(index, 1, newitem) : updatedata;
        this.props.updatetable(updatedata);
    }
    handle_input_text(e, change_val) {
        let input_text = this.state.input_text;
        input_text[change_val] = e.target.value;
        this.setState({input_text:input_text});
    }
    render() {
        return (
            <div className="container my-4">
                <form>
                    <div className="form-group">
                    <h2>{this.props.tableName}</h2>
                    <div className="row  my-2">
                        <div className="col-sm-3"><strong>{this.props.col1}</strong></div>
                        <div className="col-sm-3 pl-0"><strong>{this.props.col2}</strong></div>
                    </div>
                    {this.props.emp_data.map((obj, index) => {
                        return (
                            <div key={index} className="row  mb-2">
                                {(this.state.update_state) && (this.state.table_index == index) ?
                                    <div className="col-sm-6 row">
                                        <div className="col-sm-6" ><input type="text" placeholder={obj.Employee_id} onChange={e => this.handle_input_text(e, 'updateid')} onBlur={e => this.check_unique(this.state.input_text['id'])} /></div>
                                        <div className="col-sm-6"><input type="text" placeholder={obj.Name} onChange={e => this.handle_input_text(e, 'updatename')} /></div>
                                    </div>
                                    : <div className="col-sm-6 row">
                                        <div className="col-sm-6">{obj.Employee_id}</div>
                                        <div className="col-sm-6">{obj.Name}</div>
                                    </div>
                                }
                                <div className="col-sm-1"><input type="button" value="x" onClick={e => this.deletedata(obj.Employee_id)} /></div>
                                <div className="col-sm-2"><input type="button" value="Update" onClick={e => this.updatedata(index, obj.Employee_id, obj.Name)} /></div>
                                <div className="col-sm-2"><input type="button" value="Save" onClick={e => this.savedata(index)} /></div>
                            </div>
                        )
                    })}
                    <div className="form-inline">
                        <div className="form-group mb-2"><input type="text" className="form-control" ref={(node) => { this.textinput1 = node }} onChange={e =>this.handle_input_text(e, 'id')} onBlur={e => this.check_unique(this.state.input_text['id'])} /></div>
                        <div className="form-group mx-lg-5 mb-2"><input type="text" className="form-control" ref={(node) => { this.textinput2 = node }} onChange={e => this.handle_input_text(e, 'name')} /></div>
                        <div className="col-sm-3 mx-lg-5"><input type="button" className="submitdata" value="Submit" onClick={e => this.updatetable()} /></div>
                    </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Table;
