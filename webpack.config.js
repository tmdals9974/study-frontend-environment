const path = require("path");
const MyWebpackPlugin = require("./my-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js", //output 이름을 entry 이름에 따라 동적으로 생성 가능.
  },
  module: {
    rules: [
      /**
       * Loader
       * * test : loader가 처리해야할 파일명 입력 (정규식)
       * * use : 사용할 loader 배열 입력. 배열의 역순으로 로더가 실행됨.
       */

      {
        test: /\.js$/,
        use: [path.resolve("./my-webpack-loader.js")],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], //webpack.md 참고
      },
      // ? //file-loader 세팅방법. 그러나 url-loader를 사용하면 file-loader가 대체됨.
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader', //webpack.md 참고
      //   options: {
      //     publicPath: "./dist/", //file-loader가 파일을 처리할 때, 경로 앞에 추가되는 문자열. import 경로를 맞추기 위해 사용.
      //     name: "[name].[ext]?[hash]" //file output에 복사할 때 사용하는 파일명. default는 [hash].[ext] 라서 파일명을 알아보기 힘들다.
      //   }
      // },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader", //webpack.md 참고
        options: {
          publicPath: "./dist/", //file-loader가 파일을 처리할 때, 경로 앞에 추가되는 문자열. import 경로를 맞추기 위해 사용.
          name: "[name].[ext]?[hash]", //file output에 복사할 때 사용하는 파일명. default는 [hash].[ext] 라서 파일명을 알아보기 힘들다.
          limit: 20000, // 20kb 이하의 크기는 url-loader로 base64 인코딩. 20kb 이상은 file-loader가 처리해줌.
        },
      },
    ],
  },
  plugins: [new MyWebpackPlugin()],
};
