import React, { Component } from 'react';
import storage from '../model/storage'


class C07_03 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            todoList:[

            ]
         };
    }

    

    componentDidMount(){
        let todoListStorage=storage.getTodo();
        if(todoListStorage){
            this.setState({
                todoList:todoListStorage
            })
        }
    }

    add=()=>{
        let tempList=this.state.todoList;
        tempList.push({
            title:this.refs.newTodo.value,
            checked:false
        })
        this.setState({
            todoList:tempList
        })

        storage.setTodo(tempList);

        this.refs.newTodo.value=""
    }

    onHuiche=(e)=>{
        if(e.keyCode==13){
            this.add()
        }
    }

    del=(key)=>{
        let tempList=this.state.todoList;

        tempList.splice(key,1);

        
        this.setState({
            todoList:tempList
        })
        storage.setTodo(tempList);
    }

    doneTode=(key)=>{
        let temp=this.state.todoList;
        temp[key].checked=!(temp[key].checked);
        this.setState({
            todoList:temp
        })
        storage.setTodo(temp);
    }


    render() {
        return (
            <div>
                <div>
                    <h2>Todo List 使用redux</h2>
                    <input  ref='newTodo'  onKeyUp={this.onHuiche} /> <button onClick={this.add} >添加</button>
                    <hr/>
                </div>
                <div>
                    <p>未完成</p>
                    {
                        this.state.todoList.map((value,key)=>{
                            if(value.checked===false){
                            return(
                                <li key={key} > 
                                    <input type='checkbox'   onChange={this.doneTode.bind(this,key)} />  
                                    {value.title}      
                                    ---<button  onClick={this.del.bind(this,key)}>删除</button>
                                </li>
                            )
                            }
                        })
                    }
                     <p>已完成</p>
                    {
                        this.state.todoList.map((value,key)=>{
                            if(value.checked){
                            return(
                                <li key={key} > 
                                    <input type='checkbox' checked={true}   onChange={this.doneTode.bind(this,key)} />  
                                    {value.title}      
                                    ---<button  onClick={this.del.bind(this,key)}>删除</button>
                                </li>
                            )
                            }
                        })
                    }                   
                        
                </div>

            </div>
        );
    }
}

export default C07_03;