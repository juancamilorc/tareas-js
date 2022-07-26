import './styles.css';

import { Todo, TodoList}  from './classes';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml ); //Crear cada uno de los elementos del local storage. con un forEach. El primer argumento esta llamando la funcion dentro del argumento



console.log('todos', todoList.todos);



