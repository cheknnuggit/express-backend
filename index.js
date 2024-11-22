import express from "express";
import * as fs from "fs";


const PORT = 3333;
const app = express();
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  const data = fs.readFile("./data.json", "utf-8");
  todos = JSON.parse(data);
  todos = res.send(todos);
});

app.post("/todos", (req, res) => {
  const title = req.body.title;
  if(!title) return res.status(400).send({ message: "title is not found" });
  const newTodo = {
    id : todos[todos.length - 1].id + 1,
    title: title,
    checked: false,
  };
  console.log(newTodo);
  todos.push(newTodo);
  return res.send(newTodo);
});

// http://localhost:3333/todos/1

app.get("/todos/:id", (req, res) => {
  const id = req.prams.id;
  if(!id) return res.status(404).send({ message: "Id not found!" });
  const todo = todos.find((item) => item.id === Number(id));
  if(!todo) return res.status(404).send({ message: "Todo not found!" });
  return res.send(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  if(!id) return res.statusMessage(400).send({ message: "Id not found"});
  // TODO delete functions
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.statusMessage(400).send({ message: "Id not found" });
  // TODO update functions
});

app.post("/signup", (req, res) => {
  const {email, password} = req.body;
  const users = JSON.parse(fs.readFileSync("./user.json", "utf-8"));
  const existingUser = users.find((user) => user.email === email);
  if(existingUser)
    return res.status(400).send({message: "Email already registered!"});
  fs.writeFileSync('./user.json',JSON.stringify([...users, newUser]));
  return res.status(201).send(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});