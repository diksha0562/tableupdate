import React from 'react';
class Table extends React.Component{
    constructor(props){
        super(props);
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
                </table>
                <Update emp_data={this.props.emp_data}/>
            </div>
        );
    }
}
export default Table;
