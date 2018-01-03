import React from 'react';
class Update extends React.Component{
    constructor(){
        super();
        this.state={
            id='',
            name=''
        }
    }
    handleid(e){
        this.setState({id:e.target.value});
    }
    handlename(e){
        this.setState({name:e.target.value});
    }
    render(){
        return(
            <div>
            <input type="text" onChange={e=>this.handleid()}/>
            <input type="text" onChange={e=>this.handlename()}/>
            <input type="button" value="Submit" onClick={e=>this.updatetable()}/>
            </div>
        )
    }
}
export default Update;