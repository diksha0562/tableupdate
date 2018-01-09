import React from 'react';
import Update from './Update';
class Table extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:undefined,
            name:undefined
        }
    }
    handleid(e){
        this.setState({id:e.target.value});
    }
    handlename(e){
        this.setState({name:e.target.value});
    }
    updatetable(){
        let updatedata=this.props.emp_data;
        let newitem= [];
        if(this.state.id || this.state.name){
            newitem= [{Employee_id:this.state.id,Name:this.state.name}];
        }
        else{
            newitem= [];
        }
        updatedata= newitem? updatedata.concat(newitem):updatedata;
        this.props.updatetable(updatedata);
        this.textinput1.value='';
        this.textinput2.value='';
        this.setState({name:'', id:''});
    }
    deletedata(employee_id){
        let updatedata=this.props.emp_data;
        updatedata = updatedata.filter((employeedata)=>employeedata.Employee_id!=employee_id);
        this.props.updatetable(updatedata);
    }
    check_unique(id){
        let duplicate_id = this.props.emp_data.find(employee=> employee.Employee_id==id);
        if(duplicate_id!=undefined){
                alert('Id should be unique');
                this.textinput1.value='';
                this.setState({id:''});
            }
        }
    render(){
        return(
            <div>
                <form>
                <table className="emp_data">
                <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                </tr>
                {this.props.emp_data.map((obj,index)=>{
                    return(
                        <tr key={index}>
                        <td>{obj.Employee_id}</td>
                        <td>{obj.Name}</td>
                        <td><input type="button" value="x" onClick={e=>this.deletedata(obj.Employee_id)}/></td>
                        </tr>
                    )
                })}
                 <tr>
                        <td><input type="text" ref={(node) =>{this.textinput1 = node}} onChange={e=>this.handleid(e)} onBlur={e=>this.check_unique(this.state.id)}/></td>
                        <td><input type="text" ref={(node) =>{this.textinput2 = node}} onChange={e=>this.handlename(e)}/></td>
                        </tr>
                </table>
                <input type="button" value="Submit" onClick={e=>this.updatetable()}/>
                </form>
            </div>
        );
    }
}
export default Table;
