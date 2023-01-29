# Lint

- `코드 가독성`과 `런타임 오류 방지`를 위해 사용
- `포맷팅`과 `코드 품질`을 검사

## 설치

1.  npm `eslint` 설치
2.  아래 두 방법 중 하나 선택
    1.  `.eslintrc.js` 파일 생성 후 rules 작성
    2.  아래 명령어를 통해 대화형으로 `.eslintrc.js` 작성
    ```shell
    npx eslint --init
    ```
3.  아래 명령어 실행 시 린트 결과 콘솔에서 확인 가능. (일부 rule은 `--fix` 옵션으로 자동 수정 가능)

```shell
npx eslint app.js
```

4. `VSCode Extension`에서 `ESLint` 설치
5. 편집기에서 결과 확인 가능.

## Extensible Config

- 모든 rule을 일일이 작성하는 것은 어렵기에 `Extensible Config`을 이용하여 rules를 묶어둘 수 있음.
- 자주 사용하는 Configs: [`eslint:recommended`, `eslint-config-airbnb-base`, `eslint-config-standard`]

## Prettier와 통합 방법

- [해당 문서 하단 확인](./prettier.md)

## 자동화 방법

- 매번 명령어를 이용하여 린팅하는 것보다, `git commit` 전에 자동으로 명령어 실행하도록 `자동화` 하는 것을 추천.
- 린팅을 통과하지 못하면 커밋되지 않음.

1. 패키지 설치
   - husky: git commit 시점에 명령어 실행하도록 해줌
   - lint-staged: git stage에 있는 파일만 linting 가능

```shell
npm i -D husky lint-staged
```

2. `package.json`에 추가

```javascript
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": "eslint --fix"
  }
}
```
