const path = require("path");
const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        use: [process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"], //webpack.md 참고.   MiniCssExtractPlugin을 사용할 경우 style-loader 대신 MiniCssExtractPlugin.loader 사용 필요.
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
          // publicPath: "./dist/", //file-loader가 파일을 처리할 때, 경로 앞에 추가되는 문자열. import 경로를 맞추기 위해 사용. //! HtmlWebpackPlugin을 사용 시 경로가 같아지기에 주석처리
          name: "[name].[ext]?[hash]", //file output에 복사할 때 사용하는 파일명. default는 [hash].[ext] 라서 파일명을 알아보기 힘들다.
          limit: 20000, // 20kb 이하의 크기는 url-loader로 base64 인코딩. 20kb 이상은 file-loader가 처리해줌.
        },
      },
      {
        // webpack에 babel 통합
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MyWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version : ${childProcess.execSync("git rev-parse --short HEAD")}
        Author : ${childProcess.execSync("git config user.name")}
      `,
    }),
    new webpack.DefinePlugin({
      TWO: "1+1", //소스상에서 전역변수 TWO로 접근하면 2 반환.
      STR: JSON.stringify("1+1"), //1+1 문자열 반환
      "api.domain": JSON.stringify("http://dev.api.domain.com"), //api.domain 객체형식으로 접근 가능
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "(운영용)", //html에서 ejs문법으로 받아올 수 있음.
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, //빈칸 제거
              removeComments: true, //주석 제거
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production" ? [new MiniCssExtractPlugin({ filename: "[name].css" })] : []), //사용하지 않는 것이 빌드속도가 빠르기 때문에, 개발환경에서는 제외.
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"), //정적파일을 제공할 경로. 기본값은 웹팩 아웃풋.
    publicPath: "/", //브라우저를 통해 접근하는 경로. 기본값은 '/'.
    //host: "dev.domain.com", //개발환경에서 도메인을 맞추어야하는 상황에서 사용. 운영체제 호스트 파일에서 도메인과 127.0.0.1을 연결해야 사용 가능.
    overlay: true, //빌드 시 에러나 경고를 브라우저에 표시할 지 여부.
    port: 8080, //개발서버 포트 설정
    stats: "errors-only", // webpack server 실행 후 콘솔에 표시될 메시지 수준을 정함. ['none', 'errors-only', 'mininal', 'normal', 'verbose']
    historyApiFallback: true, //히스토리 API를 사용하는 SPA 개발 시 설정. 404가 발생하면 index.html로 리다이렉트한다.
  },
};
