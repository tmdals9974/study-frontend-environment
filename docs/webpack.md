# Webpack

## 배경

- 모든 브라우저에서 모듈 시스템을 사용하기 위해 등장.

## 주요 옵션

- mode : [development, production, none] 중 택 1
- entry : 번들링 시작 위치
- output : 번들링 결과물 저장 위치

```shell
webpack --mode development --entry ./src/app.js --output dist/main
```

- config : 설정 파일 위치 (옵션 대체용. default: webpack.config.js)

```shell
webpack
```

## 모듈

- 웹팩은 `모든 파일을 Module로 판단`함. 따라서 import 구문으로 모두 가져올 수 있음 (css, img, fonts 등)
- 위와 같은 처리가 가능한 이유는 `Loader` 덕분임. 로더는 타입스크립트 같은 다른 언어를 자바스크립트 문법으로 변환해주거나, 이미지를 data URL 형식의 문자열로 변환함.

## 로더

- 로더를 이용하여 빌드 시 파일마다 다르게 처리할 수 있다.
- 사용법은 webpack.config.js 참고
- **자주 사용하는 로더**
  - css-loader: javascript에서 css를 loader로 불러올 수 있게 해줌. (css가 js로 변환)
  - style-loader: js로 변환된 css가 브라우저에 적용될 수 있게 처리해줌.
  - file-loader: 파일을 모듈로 변환.
  - url-loader: 이미지를 base64로 인코딩해줌. (파일을 url 형식으로 여러개 가져오는 것은 네트워크 리소스 부담이 있음. 작은 이미지들은 data url scheme를 이용하는 것이 효율적임.) `limit` 옵션을 통해, 일정 크기 이상은 file-loader 와 같이 처리해줌.

## 플러그인

- 로더는 번들 시 파일 단위로 처리했지만, 플러그인은 번들된 결과물을 처리함. 주로 난독화나 텍스트 추출 등 용도로 사용.
- 사용법은 webpack.config.js 참고
- **자주 사용하는 플러그인**

  - BannerPlugin: 빌드 결과물에 빌드 정보나 커밋 버전 등 추가 가능. (webpack default plugin)
  - DefinePlugin: 환경 변수를 정의할 수 있게 해줌. (개발/운영 환경에서 api 주소가 다르듯이, 환경마다 달라지는 정보를 소스단이 아닌 설정파일에 정의할 수 있게 해줌) (webpack default plugin)
  - HtmlTemplatePlugin: HTML 파일을 후처리할 수 있게 해줌. (빌드 타임의 값을 넣거나 코드를 압축하는 등 가능) **해당 Plugin을 사용하기 전까지는 HTML은 번들링 결과에서 제외되며, HTML에 빌드된 js를 직접 script src로 연결해주어야 했었음. 그러나 해당 플러그인 사용 시 명시한 HTML은 함께 번들링해주며, 자동으로 번들링 된 script와 연결해줌.**
  - CleanWebpackPlugin: output 폴더를 삭제하고 빌드해줌.
  - MiniCssExtractPlugin: CSS별로 파일을 뽑아내는 플러그인. (단, 해당 플러그인 사용 시 style-loader 대신 MiniCssExtractPlugin.loader 사용 필요.)

## 개발서버

- `webpack-dev-server` 패키지 설치를 통해 개발서버 구축 가능.
- `webpack-dev-server` 명령어를 통해 개발서버 실행 가능하며 핫로딩 지원. (`--progress` 옵션 사용 가능)
- `webpack.config.js` 파일에 `devServer` 객체를 통해 옵션 설정 가능.

## Mockup

- Back-End와 API 연동 전, Dummy Data를 위해 Webpack에서 간단하게 Mockup 설정이 가능하다. 만약 대량의 Mockup이 필요하다면 `connect-api-mocker` 패키지를 사용하면 된다.

```javascript
//webpack.config.js
devServer: {
  before: (app) => {
    app.get("/api/users", (req, res) => {
      res.json([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bek" },
      ]);
    });
  },
},
```

## 핫 모듈 리플레이스먼트

- 핫로딩을 전체화면이 아닌 `변경된 모듈만 변경`하도록 설정하는 기능.
- 해당 기능을 제대로 사용하려면 모듈에서 `HMR Interface`에 맞추어야함. [참고 문서](https://velog.io/@jakeseo_me/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B3%B5%EB%B6%80-18-%ED%95%AB-%EB%AA%A8%EB%93%88-%EB%A6%AC%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4%EB%A8%BC%ED%8A%B8)
- `HMR`을 지원하는 로더들도 있음. (style-loader, file-loader 등)

```javascript
//webpack.config.js
devServer: {
  hot: true,
},
```

## 최적화

- 번들 결과물의 용량을 줄이거나, 빌드 속도를 올릴 수 있는 방법에 대해 알아보자.
- `webpack.config.js`의 `mode`를 `production`으로 변경. (모드별로 사용하는 기본 플러그인이 다름, production으로 할 경우 자동 난독화해주는 등)
- `HtmlWebpackPlugin`에서 `minify` 옵션 활성화
- `optimize-css-assets-webpack-plugin` 패키지를 사용하여 CSS 압축
- `terser-webpack-plugin` 패키지를 이용하여 콘솔로그 제거

```javascript
//webpack.config.js
optimization: {
  minimizer:
    mode === "production"
      ? [
          new OptimizeCSSAssetsPlugin(),  //css 압축
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, //콘솔 로그 제거
              },
            },
          }),
        ]
      : [],
},
```

- ### 코드 스플리팅

  - 코드 스플리팅을 통하여, 첫 로딩 시 용량을 줄이는 방식으로도 최적화가 가능하다.
  - 코드 스플리팅을 자동으로 할 수 있는 `dynamic import`도 있다. [참고 문서](https://pks2974.medium.com/dynamic-import-%EB%A1%9C%EC%9B%B9%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%B1%EB%8A%A5-%EC%98%AC%EB%A6%AC%EA%B8%B0-caf62cc8c375)

  ```javascript
  //webpack.config.js
  entry: {
    main: "./src/app.js",
    math: "./src/math.js",
  },
  optimization: {
    splitChunks: {
      //해당 옵션 없이 entry point만 여러개로 구성한다면, 코드 중복이 발생함.
      //해당 옵션을 사용할 경우 verdors~main.js 파일에 중복되는 코드가 작성됨.
      chunks: "all",
    },
  },
  ```

- ### externals

  - 이미 빌드되어 나온 패키지들은 재빌드 할 필요가 없음.
  - 빌드 시점에 패키지를 복사해오는 것으로 대체하기 위해 `copy-webpack-plugin` 설치 필요.
  - axios가 전역변수로 등록되어야하기에, `index.html에 axios.min.js를 import` 해야함.

  ```javascript
  //webpack.config.js
  plugins: [
    new CopyPlugin([
      {
        from: "./node_modules/axios/dist/axios.min.js",
        to: "./axios.min.js",
      },
    ]),
  ],
  externals: {
    axios: "axios" //axios 객체는 전역변수 axios로 접근하는 것으로 대체하겠다는 의미.
  },
  ```
