import React from 'react';
import Table from './Table';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emp_data:[
                {Employee_id :'316472', Name : 'Diksha'}, 
                {Employee_id :'316470', Name : 'Nishchay'},
                {Employee_id :'316474', Name : 'Heena'}
            ]
        }
        this.updatetable = this.updatetable.bind(this);
    }
    updatetable(emp_data){
        this.setState({emp_data});
    }
    render(){
        return(
            <div>
                <Table tableName="Employees List" col1="Employee ID" col2="Employee name" emp_data={this.state.emp_data} updatetable={this.updatetable} />
            </div>
        );
    }
}
export default App;