# Vue.ts Boilerplate

## TypeScript

### TypeScript ?

Microsoft에서 개발.관리 하는 오픈소스 프로그래밍 언어

#### **ECMA Script**의 표준 지원

- 모듈화: ES6 모듈, nameSpace 지원
- OOP: Class, interface 지원

#### JavaScript + 타입

- 명시적 타입 추가로 안정성

#### compile

: TypeScript > compile > JavaScript

```ts
const test : String = ''
const test2!: String | null
```

1. 유효성 검사
2. 타입 어노테이션 제거

`모듈화와 객체 지향 프로그래밍을 보다 완전하게 지원함으로서
결합도와 의존도를 낮추어 독립적으로 사용 가능.
타입으로 컴파일하여 안정성을 갖출 수 있다.
이런 특징들로 대규모 어플리케이션 개발에 필요한 조건들을 충족.`

## Boilerplate | boiler-template

### boiler template structure

    .
    ├── .vscode                 # 프로젝트 내에서 사용되는 vscode 설정
    ├── cli                     # build 관련 ts 파일(ex. *.ts, *.vue 파일 유효성 검토)
    ├── server                  # json-server api mock
    ├── src                     # src root
    │   ├── assets              # image, fonts 등 resource 파일
    │   ├── components          # 앱 내에서 재사용을 위한 컴포넌트
    │   ├── pages               # Vue Router와 연결될 실제 Page component
    │   ├── services            # Server API Module Layer
    │   ├── stores              # Vuex Store (Module 단위 개발)
    │   │   ├── modules         # Vuex Modules
    │   │   └── ...
    │   ├── styles              # Global Sass (ex. reset, mixin, variable)
    │   ├── utils               # Utility Modules
    │   │   ├── decorator       # Vue에서 사용되는 Util
    │   │   └── ...
    │   └── ...                 # etc.
    └── ...

### typeScript 컴파일 설정

- [tsconfig.json](./tsconfig.json)
- [tsconfig.base.json](./tsconfig.base.json)

### 주 사용 모듈

1. core-js
    - polyfill 지원
2. eslint [설정파일](./.eslintrc.js)
3. vue-property-decorator
4. vuex-module-decorators
5. ts-node
    - typeScript Compile시 memory 사용
6. husky
    - 즉시 배포 가능한 상태 유지

## source internal structure

- 각 파일은 class로 구현.
    1. [App.vue](./src/App.vue)
    2. [page](./src/pages/card/index.vue)
    3. [component](./src/components/Layout.vue)
    4. [vuex(store)](./src/stores/modules/card.ts)
    5. [service(axios)](./src/services/card.ts)
