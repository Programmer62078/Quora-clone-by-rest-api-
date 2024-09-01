const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "salman khan",
    content: " i love ISLAM",
  },
  {
    id: uuidv4(),
    username: "salJAn khan",
    content: " i love ALLAH",
  },
  {
    id: uuidv4(),
    username: "salSman khan",
    content: " i love MOHAMMAD",
  },
];

app.get("/posts", (req, res) => {
  // ye post router hai
  res.render("index.ejs", { posts }); // ye jo posts hai ye array waala hai
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  // res.send("your post is posted "); JAB NAYA KUCHH jorte to ye response milta lekin mujhe chahiye ki post krne ke baad http://localhost:8000/posts par direct hm redirect ho jaaye
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newcontent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id); // Corrected logic to remove post
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
