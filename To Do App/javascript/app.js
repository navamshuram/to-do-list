//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Functions
const addTodo = (event) => {
    event.preventDefault(); //prevent form from submitting 
    let spaceRegex = /\w/g;
    let whitespaces = todoInput.value.match(spaceRegex)
    console.log(whitespaces)

    if(whitespaces === null) {
      return null  
    }
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create input
    const newTodo = document.createElement("input");
    newTodo.type= 'text'
    newTodo.value=todoInput.value;
    newTodo.classList.add('todo-item');
    newTodo.setAttribute('readonly', 'readonly');
    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveLocalTodos(todoInput.value)

    //edit button
    const editButton = document.createElement("button")
    editButton.innerHTML = '<i class="fas fa-pen"></i>'
    editButton.classList.add("edit-btn")
    todoDiv.appendChild(editButton)

    //event listener for edit operation

    editButton.addEventListener('click', (e) => {
        const item = e.target
        if(item.classList[0] === 'edit-btn') {
            item.classList.remove('edit-btn')
            item.innerHTML = '<i class="fas fa-bookmark"></i>'
            item.classList.add('save-btn')
            item.parentElement.children[0].removeAttribute("readonly")
            item.parentElement.children[0].focus();
        } else {
            let spaceRegex = /\w/g;
            let whitespaces = item.parentElement.children[0].value.match(spaceRegex)
            console.log(item.parentElement)
            console.log(whitespaces)
            if(whitespaces === null) {
                // return item.remove(parentElement.children)
                const todo = item.parentElement
                todo.classList.add("fall")
                 removeLocalTodos(todo);
                todo.addEventListener("transitionend", () =>{
                    todo.remove()
                })
            }
            item.classList.remove('save-btn')
            item.innerHTML = '<i class="fas fa-pen"></i>'
            item.classList.add('edit-btn')
            item.parentElement.children[0].setAttribute("readonly", "readonly")
        }
    })

    //checked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>' ;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>' ;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    


    //append to list
    todoList.appendChild(todoDiv);

    //clear todoInput value
    todoInput.value = ""
}

const deleteCheck = (e) => {
    const item = e.target;

    //delete todo
    if(item.classList[0] !== 'complete-btn' &&  item.classList[0] !== 'trash-btn' && item.classList[0] !== 'edit-btn' && item.classList[0] !== 'save-btn') {
        const todo = item.parentElement;
        return null
        // //animation
        // todo.classList.add("fall")
        // removeLocalTodos(todo);
        // todo.addEventListener("transitionend", () =>{
        //     todo.remove()
        // })
        
    } else if (item.classList[0] == 'trash-btn' && item.classList[0] !== 'complete-btn' && item.classList[0] !== 'edit-btn' && item.classList[0] !== 'savet-btn') {
        const todo = item.parentElement;
        
        //animation
        todo.classList.add("fall")
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () =>{
            todo.remove()
        })
    }

    //checked
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

//filter todo 
const filterTodo = (e) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }

    });

}

//local storage
const saveLocalTodos = (todo) => {
    //check for an existing todo
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //push todo into todos
    todos.push(todo);

    //set todos in local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//get todos from local storage 
const getTodos = () => {
    //check for an existing todo
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
        //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create input
        const newTodo = document.createElement("input");
        newTodo.type= 'text'
        newTodo.value=todo;
        newTodo.classList.add('todo-item');
        newTodo.setAttribute('readonly', 'readonly');
        todoDiv.appendChild(newTodo);

         //edit button
        const editButton = document.createElement("button")
        editButton.innerHTML = '<i class="fas fa-pen"></i>'
        editButton.classList.add("edit-btn")
        todoDiv.appendChild(editButton)

        //event listener for edit operation

        editButton.addEventListener('click', (e) => {
            const item = e.target
            if(item.classList[0] === 'edit-btn') {
                item.classList.remove('edit-btn')
                item.innerHTML = '<i class="fas fa-bookmark"></i>'
                item.classList.add('save-btn')
                item.parentElement.children[0].removeAttribute("readonly")
                item.parentElement.children[0].focus();
            } else {
                let spaceRegex = /\w/g;
                let whitespaces = item.parentElement.children[0].value.match(spaceRegex)
                console.log(item.parentElement)
                console.log(whitespaces)
                if(whitespaces === null) {
                    // return item.remove(parentElement.children)
                    const todo = item.parentElement
                    todo.classList.add("fall")
                    removeLocalTodos(todo);
                    todo.addEventListener("transitionend", () =>{
                        todo.remove()
                    })
                }
                item.classList.remove('save-btn')
                item.innerHTML = '<i class="fas fa-pen"></i>'
                item.classList.add('edit-btn')
                item.parentElement.children[0].setAttribute("readonly", "readonly")
            }
        })

        //checked button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>' ;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>' ;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        //append to list
        todoList.appendChild(todoDiv);
    })
}

//remove todos from local storage 
const removeLocalTodos = (todo) => {
    //check for an existing todo
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todos.indexOf(todo.children[0].innerText))
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

