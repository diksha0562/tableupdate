import React from 'react';
class Update extends React.Component{
    constructor(){
        super();
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
            <input type="text" id="text1" onChange={e=>this.handleid(e)}/>
            <input type="text" id="text2" onChange={e=>this.handlename(e)}/>
            <input type="button" value="Submit" onClick={e=>this.updatetable()}/>
            </div>
        )
    }
}
export default Update;