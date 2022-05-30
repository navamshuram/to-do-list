# to-do-list

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)



## Overview

### Demo

![](./images/Animation.gif)

### Screenshot
![](./images/img1_desktop.png)
![](./images/img1_mobile.png)
![](./images/img2_desktop.png)
![](./images/img2_mobile.png)
![](./images/img3_desktop.png)
![](./images/img3_mobile.png)
![](./images/img4_desktop.png)
![](./images/img4_mobile.png)

### Links

- Live Site URL: [https://vanilla-javascript-todo-list.netlify.app/](https://vanilla-javascript-todo-list.netlify.app/)

## My process

### Built with

- CSS custom properties
- Flexbox
- Mobile-first workflow
- [JavaScript](https://www.javascript.com/)
- [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
### What I learned

This project helped me in revising some of the core javascript concepts like DOM manipulations . I learned to use Local Storage to store data required to store the previous todos in the Todo App.

```js
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
                console.log(item)
            } else {
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

```
## Author

- Github - [@Navamshu Ram](https://github.com/navamshuram)
