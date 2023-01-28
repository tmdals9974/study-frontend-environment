# Babel

- ES2015 이상으로 작성한 코드를 `모든 브라우저에서 동작`하도록 호환성을 지켜줌.
- 바벨은 세단계로 빌드한다. 1. `파싱` 2. `변환` 3. `출력`
- 바벨은 `파싱`과 `출력`만 하고, `변환`은 플러그인에게 맡긴다.

## Plugin

- `--plugins` 옵션을 통해 플러그인 추가 가능

```shell
npx babel ./src/app.js --plugins './my-babel-plugin.js'
```

- **자주 사용하는 플러그인**
  - @babel/plugin-transform-block-scoping: const, let을 var로 변환
  - @babel/plugin-transform-arrow-functions: arrow 함수를 일반 함수로 변경
  - @babel/plugin-transform-strict-mode: use strict를 추가해줌
- `프리셋`을 이용하여 플러그인들을 세트로 모아둘 수 있음.
- **자주 사용하는 프리셋**
  - preset-env: ES2015+ 를 변활할 때 사용. 바벨7 이전 버전에서는 년도별로 프리셋을 제공하였으나 (babel-reset-es2015, babel-reset-es2016...) `env 하나로 통합`됨.
    - `target` 옵션을 통해 브라우저별 버전 설정 가능. 사용법은 `babel.config.js` 참고 (`targets`)
    - `폴리필` 옵션을 통해 지원하지 않는 문법을 지원하게 할 수 있음. 사용법은 `babel.config.js` 참고 (`useBuiltIns`, `corejs`)
  - preset-react
  - preset-typescript
- webpack과 통합하고 싶을때는, `babel-loader`를 설치하여 webpack loader에 추가해주면 됨. (babel config에 `corejs`를 사용중이라면 해당하는 버전의 corejs를 npm install 해야함)