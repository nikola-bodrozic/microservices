const express = require("express");
const app = express();
const connection = require("./database.js")

const port = 3008;

const users = [
   { id: 1, name: "ronald" },
   { id: 2, name: "jacob" },
   { id: 3, name: "e"}
 ];

app.get("/", (req, res) =>
  res.json({
    "msg": "welcome to API"
  })
);

app.get("/task", (req, res) => {
  connection.query('SELECT title FROM tasks WHERE id = 1', (err, rows, fields) => {
    if (err)
      throw err

    res.json({"title": rows[0].title});
  })
})

app.get("/users", (req, res) =>
  res.json(users)
);

app.get("/users/:id", (req, res) => {
  const result = getUser(req.params.id)
  res.json(result)
});

getUser = (id) => {
  if (id > 2) return {
    "msg": "user doesn't exist"
  }
  return users[id - 1];
}

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);