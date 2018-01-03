import React from 'react';
class Update extends React.Component{
    constructor(){
        super();
    }
    handleid(){

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