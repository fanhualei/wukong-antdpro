
var key="todolist"

var storage={

    setTodo(value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    getTodo(){
        return JSON.parse(localStorage.getItem(key))
    },
    removeTodo(){
        localStorage.removeItem(key)
    }
}

export default storage;