let todos = []


let form = document.querySelector('#form')
var editForm = document.querySelector('#edit')
var editInput = editForm.querySelector('input')

form.onsubmit = function (e) {
    e.preventDefault()
    let act = document.querySelector('#inp1').value  
    if(!act.length) {
        return false
    }
    var todo = {
        id: new Date().getTime(),
        title : act
    }
   
    todos.push(todo)

    // localStorage.setItem('todos', JSON.stringify(todos))
    renderForm();
    form.reset();
    

    
}

let container = document.querySelector('#todo_container')
let task_container = document.querySelector('#container2')
function renderForm(){
    // todos = JSON.parse(localStorage.getItem('todos')) 
    
    if(todos.length){
        var content = ""
        console.log(todos)
        todos.reverse().forEach(todo => {
            content += `
            <div class="todo_content">
                <div> 
                    <input type="checkbox" class="checkbox" id="${todo.id}"  />
                    <label for="${todo.id}"> ${todo.title} </label> 
                </div>
                <div class="action_btn">
                    <div class="pencil" onClick = editing(${todo.id})>&#9998;</div>
                    <div class="trash" onClick = deleting(${todo.id}) name="delete">&#x1F5D1;</div>
                </div>
            </div>
            `
            container.innerHTML = content
            task_container.appendChild(container)

        })   

        //     var currentTodo= document.querySelectorAll(".trash");
        //     for (var i=0; i<currentTodo.length; i++){
        //     currentTodo[i].onclick = function () {
        //     this.parentNode.parentNode.remove();
        //     }
        // }
    }
   
}

renderForm()

var actualTodo = {}

function editing (id) {
    todos.forEach(function(todo) {
        if(todo.id == id) {
            currentTodo = todo
        }
    })

    editInput.value = currentTodo.title
}

editForm.onsubmit = function (e) {
    e.preventDefault();
    if(!editInput.value.length) {
        return
    }
    currentTodo.title = editInput.value
    var index = todos.findIndex(todo => todo.id == currentTodo.id)
    todos.splice(index,1,currentTodo)
    renderForm();
    editForm.reset();
}

function deleting (id) {
    var index = todos.findIndex(todo => todo.id == id)
    todos.splice(index,1)
    renderForm();
}

// localStorage.clear()
