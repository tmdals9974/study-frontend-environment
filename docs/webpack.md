# Webpack

## 배경

- 모든 브라우저에서 모듈 시스템을 사용하기 위해 등장.

## webpack 주요 옵션

- mode : [development, production, none] 중 택 1
- entry : 번들링 시작 위치
- output : 번들링 결과물 저장 위치

> webpack --mode development --entry ./src/app.js --output dist/main

- config : 설정 파일 위치 (옵션 대체용. default: webpack.config.js)

> webpack

## 모듈

- 웹팩은 `모든 파일을 Module로 판단`함. 따라서 import 구문으로 모두 가져올 수 있음 (css, img, fonts 등)
- 위와 같은 처리가 가능한 이유는 `Loader` 덕분임. 로더는 타입스크립트 같은 다른 언어를 자바스크립트 문법으로 변환해주거나, 이미지를 data URL 형식의 문자열로 변환함.

## 로더

> 사용법은 webpack.config.js 참고

- css-loader: javascript에서 css를 loader로 불러올 수 있게 해줌. (css가 js로 변환)
- style-loader: js로 변환된 css가 브라우저에 적용될 수 있게 처리해줌.
- file-loader: 파일을 모듈로 변환.
- url-loader: 이미지를 base64로 인코딩해줌. (파일을 url 형식으로 여러개 가져오는 것은 네트워크 리소스 부담이 있음. 작은 이미지들은 data url scheme를 이용하는 것이 효율적임.) `limit` 옵션을 통해, 일정 크기 이상은 file-loader 와 같이 처리해줌.

## 플러그인

- 로더는 번들 시 파일 단위로 처리했지만, 플러그인은 번들된 결과물을 처리함. 주로 난독화나 텍스트 추출 등 용도로 사용.