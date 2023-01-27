// my-webpack-loader test
import * as math from "./math.js";
console.log(math.sum(1, 2));

// css-loader
import "./app.css";

// url-loader
import nyancat from "./nyancat.jpg";
document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `
})