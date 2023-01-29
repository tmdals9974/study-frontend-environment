# Prettier

- 코드 포매팅 도구.
- Lint보다 `포매팅을 더 일관적`으로 하지만, 코드 품질에는 관여하지 않는다.

## 설치

1.  npm `prettier` 설치
2.  아래 명령어 실행 시 포매팅 결과 콘솔에서 확인 가능. (기본 설정값으로 포매팅 진행, `--write` 옵션으로 콘솔확인이 아닌, 파일 수정 진행.)

```shell
npx prettier app.js
```

3.  `VSCode Extension`에서 `Prettier` 설치
4.  편집기에서 결과 확인 가능.
5.  설정값 변경하고 싶을 경우, `.prettierrc.js` 파일 작성

## ESLint와 통합 방법
> 주의! [공식 문서](https://prettier.io/docs/en/integrating-with-linters.html#notes)를 보면, `eslint-plugin-prettier`의 사용은 비추천하고 있다.
> `eslint-config-prettier`만 사용하고, `editor`의 `default formatter`를 `prettier`로 지정해주는 것을 추천한다. [참고 문서](https://heewon26.tistory.com/262)
>
> 내 경험으로도, `eslint-config-prettier`와 `eslint-plugin-prettier`를 모두 설정한 경우,
> `.prettierrc.js`에서 설정한 내용과 다르게 `eslint`에서 오류가 발생하여, `eslintrc.js`에서 추가로 설정을 해줘야 했던 상황도 있었으며,
> 오류명도 `prettier/prettier`로 나와서 원인을 알기도 힘들었다.

### 1. `eslint-config-prettier` 패키지 설치

- 해당 패키지는 `Prettier와 충돌하는 ESLint 규칙을 끄는` 역할을 한다.

1. 패키지 설치

```shell
npm i -D eslint-config-prettier
```

2. `.eslintrc.js` 수정

```javascript
{
  extends: [
    "eslint:recommended",
    "eslint-config-prettier",
  ]
}
```

### 2. `eslint-plugin-prettier` 패키지 설치

- 해당 패키지는 `Prettier 규칙을 ESLint 규칙으로 추가`하는 역할을 한다.
- Prettier의 모든 규칙이 ESLint로 들어오기 때문에, ESLint만 실행하면 Prettier는 실행하지 않아도 된다.

1. 패키지 설치

```shell
npm i -D eslint-plugin-prettier
```

2. `.eslintrc.js` 수정

```javascript
{
  plugins: [
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error"
  },
}
```

### 3. 1,2번을 한번에 설정하는 방법
- 1,2번을 한번에 설정할 수 있으나, 2번의 rules를 별도로 설정하기 어려움.

1. 1,2번에서 소개한 패키지를 모두 설치.
2. `.eslintrc.js` 수정

```javascript
{
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
  ]
}
```
