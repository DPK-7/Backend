// const todos = [
//     {
//         "title": "Read a book",
//         "description": "read at least 10pages today"
//     }, {
//         "title": "remove ice",
//         "description": "Remove ice from the freezer for noght party"
//     }, {
//         "title": "Bring jim from school",
//         "description": "Don't forget to bring jim from school"
//     },
// ]

// exports.getAllTodos = () =>{
//     return todos;
// }



const { query } = require("express");
const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS todos (
      TodoId INT NOT NULL AUTO_INCREMENT,
      UserId INT NOT NULL,
      todoDescription VARCHAR(255) NOT NULL,
      CONSTRAINT TodoPK PRIMARY KEY(TodoId));`

      await con.query(sql)
}

createTable()

// add todos
async function addTodo(newTodo) {
  let sql = `
    INSERT INTO todos(UserId, todoDescription)
    VALUES("${newTodo.UserId}", "${newTodo.todoDescription}")
  `

  await con.query(sql)
  return true;
}

// Update - CRUD
async function editTodo(newTodo) {
  let updatedTodo = await getTodoById(user.username)
  if(updatedTodo.length < 0) throw Error("Username not available!")

  let sql = `UPDATE todos
    SET todoDescription = "${newTodo.todoDescription}"
    WHERE TodoId = ${newTodo.TodoId}
  `
  await con.query(sql)
  updatedTodo = await getTodoById(user.username)
  return updatedTodo[0]
}

// Delete User 
async function deleteTodo(todo) {
  let sql = `DELETE FROM todos
    WHERE TodoId = ${todo.TodoId}
  `
  await con.query(sql)
}

// Useful functions
async function getTodoById(todoId) {
  let sql = `
    SELECT * FROM todos 
    WHERE TodoId = "${todoId}" 
  `
  return await con.query(sql)
}


async function getTodoByUserId(userId){
    let sql=`SELECT * FROM todos WHERE UserID=${userId}`

    return await con.query(sql)
}



module.exports = {addTodo, deleteTodo, editTodo, getTodoByUserId}