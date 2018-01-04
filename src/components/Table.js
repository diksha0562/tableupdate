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
        document.getElementById('text1').value='';
        document.getElementById('text2').value='';
        this.setState({name:'', id:''});
    }
    render(){
        return(
            <div>
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
                        </tr>
                    )
                })}
                 <tr>
                        <td><input type="text" id="text1" onChange={e=>this.handleid(e)}/></td>
                        <td> <input type="text" id="text2" onChange={e=>this.handlename(e)}/></td>
                        </tr>
                </table>
                <input type="button" value="Submit" onClick={e=>this.updatetable()}/>
                {/* <Update emp_data={this.props.emp_data} updatetable={this.props.updatetable}/> */}
            </div>
        );
    }
}
export default Table;
