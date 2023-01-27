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