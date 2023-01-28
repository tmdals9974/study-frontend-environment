# SASS

- sass를 사용하기 위한 환경을 구축하기 위해서는 `webpack`, `style-loader`, `sass`가 필요하다.

```shell
npm install sass-loader sass webpack --save-dev
```

- **`webpack.config.js`** 파일에 추가

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
```
