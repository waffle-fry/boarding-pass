import React from "react";
import { render } from "react-dom";
import App from "./App";

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");

root.id = "root";
root.style = "min-height:100%;display:flex;flex:1;";

document.body.appendChild(root);

// Now we can render our application into it
render(<App />, document.getElementById("root"));
