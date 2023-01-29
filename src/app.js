/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable semi */

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
  `;
});

// babel
const alert = msg => window.alert(msg);
new Promise();// lint error 확인
console.log()
(function() {})()

