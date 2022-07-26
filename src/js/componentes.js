import {Todo } from '../classes';
import { todoList } from '../index';

//Referencias en el HTML

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')



export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
    <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append (div.firstElementChild);

    return div.firstElementChild;
}

//Eventos 

txtInput.addEventListener('keyup', (event) => { //Agregar un elemento a lista con la ayuda de la funcion crearTodoHtml

    if(event.keyCode === 13 && txtInput.value.length > 0) {

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; //Idenficar que click realizo. input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id'); //El get se encarga de traerme lo que necesie de ese elemento

    if (nombreElemento.includes('input')) { //click en el check

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); //Hacer regertencia a todas las clases y si quiero agregar o quitar una clase es el toggle

    } else if (nombreElemento.includes('button')){ //borrar el todo

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletado();

    for ( let i = divTodoList.children.length - 1; i >=0 ; i--)  //Recorrer el array de forma inversa
    {
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if(!filtro) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) { //Traigo cada uno de los elementos que tenga en la lista

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {

            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

});
