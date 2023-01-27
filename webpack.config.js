const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js", //output 이름을 entry 이름에 따라 동적으로 생성 가능.
  },
};
