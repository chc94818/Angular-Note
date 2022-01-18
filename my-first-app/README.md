# MyFirstApp
這個專案將用來學習 Angular ，並記錄過程。

## 安裝環境
首先我們要先來安裝 Angular 的環境，並建立第一個專案。
- 第一步要先來安裝 Angular CLI
  ```
  npm install -g @angular/cli@latest
  ```
- 接著利用 `ng new {project-name}` 來建立第一個專案
  - 過程中可以選擇 css format 以及 routing 方式
  ```
  // ng is using for angular cammand
  ng new my-first-app

  // select css format and the routing.
  ? Would you like to add Angular routing? No
  ? Which stylesheet format would you like to use? (Use arrow keys)
  ```
- 建構好專案後，先嘗試將伺服器拉起來
  ```
  // enter the folder, and serve the server
  cd my-first-app
  ng serve
  ```

- 成功連到 localhost 後，便算初步完成了環境安裝

## 編輯網頁
安裝完環境並開啟 server 後，接著可以來練習編輯網頁，來完成第一個 hello world。
- 先打開 `src/app/app.component.ts` 並將內容修改成
  ```
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    message = 'Hello world';
  }
  ```

- 再來到 `src/app/app.component.html` 中將內容改成
  ```
  <h3>Hi, This is the first sample</h3>
  <input type="text" [(ngModel)]="message">
  <p>{{message}}</p>
  ```

- 這時會發現 error log，因為 `[(ngModel)]` 這個功能需要引用 `FormsModule` ，因此我們需要去 `src/app/app.module.ts` 中加入缺少的 `FormsModule`
  ```
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';

  import { AppComponent } from './app.component';
  import { FormsModule } from '@angular/forms';

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  ```
- 完成了第一個的修改後，畫面上已經能夠看到 hello world，再來嘗試 style 的設定

  - 套用 boostrap

    ```
    npm install bootstrap --save-dev
    ```
  - 開啟 `angular.json` 並修改成
    ```
    "styles": [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "src/styles.css"
    ],
    ```
  - 設定 `src/app/app.component.css` 加上
    ```
    h3 {
      color: blue;
    }
    ```

## Components
已經編輯了基本的 hello world 並加上 style 後，接著要來練習新增一個新的 component。
但在此之前，先來了解一下 Angular 的 component 包含哪些東西。

- 什麼是 Components
  <img src="./AngularComponent.png">

- 從上圖的官方架構途中，可以看到 Component 是由 template、metadata、component 組成的，這邊可以拿專案建立時自動創建的 `app-root` 作為例子。

- 打開 `src/app/app.component.ts` 可以看到
  ```
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    title = 'app works!';
  }
  ```

- `@Component` 就是 Angular 用來將 AppComponent `裝飾` 成一個 component 的語法(這是 ES6 中提出來的一種 `decorator` 語法)，
Angular 中有許多的 `decorator`，而 `@component` 就是其中一個用來製作 component 的 `decorator` ，用來讓 Angular 知道這是一個 component 。

- 其中三個屬性
  - selector: 表示要套用這個 component 到哪一個 HTML tag 上
  - templateUrl: 表示這個 component 的 view 存放位置
    - 若 view 的內容很單純，也可以改用 `template` 並直接寫入 html
    ```
    template: '<div>simple template</div>'
    ```
  - styleUrls: 用來加入專屬於這個 component的 css 檔案位置


## 新增一個新的 Component
了解完 component 的基礎架構，可以開始來建立一個新的 component

- 首先透過 Angular CLI 去新增一個 Components
  ```
  // ng generate component {component-name}
  ng generate component test-component
  // can be abbreviated to below
  // ng g c test-component
  ```
- 完成後會得到一個 `test-component` 的資料夾及其組成檔案。
  ```
  src
  ├─app
  │  └─test-component
  │          test-component.component.css
  │          test-component.component.html
  │          test-component.component.spec.ts
  │          test-component.component.ts
  ```
  - 其中的 `test-component.component.html` 就是 template，內容有點像是一個 html 的檔案

- 新增完 component 後，還要將其 `引用` 進 Angular 專案中才能使用，而要引用就得要先加入 module 中，一個 Angular 專案裡面可以很多不同的 module，這邊可以先利用一開始自動建立的 `app.module`
  - 補充介紹道: Angular 中的 Module 需要透過 `@NgModule` 來宣告，Module 其實就是 Component 的集合，其主要的用途是將需要用到的元件封裝在一起。
  - `@NgModule` 參數內容如下:
    - declarations: []：宣告跟這個 module 的 View 相關的 components、directives、pipes
    - exports:[]：module 下哪些類別是可以公開給外部使用的
    - imports:[]：在這個module下，我們需要匯入哪些其他的 module 給 components、directives、pipes 使用
    - providers:[]：宣告在其中的 Service，讓 Modules 內所有的組件使用。
    - bootstrap:[] : 只存在在 `app.module.ts` 中的屬性，啟動專案的根元件

- 打開 `src/app/app.module.ts` 並加入
  ```
  // import the test component
  import { TestComponentComponent } from './components/test-component/test-component.component';

  @NgModule({
    declarations: [
      AppComponent,
      // add the test component
      TestComponentComponent,
    ],
    imports: [
      BrowserModule,
      FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  ```

- 將其引入 `app.module` 後，便能在其中使用 `TestComponentComponent` 了

- 將 `TestComponentComponent` 加入 `src/app/app.components.html` 中
  ```
  <app-test-component></app-test-component>
  ```

## Note
成功建立起第一個 Angular 專案，並稍微了解其中的架構，可以看到光是自動建立起來的部分就包含 Typescript 的環境、自動測試以及 Webpack 等諸多開發環境的設定檔，可以感受到 Angular 作為一個框架為開發所提供的各種解決方案的完整性，其相較於 React 和 Vue，不需要透過太多額外的 package 來滿足這些功能，但也因此提高了初入 Angular 的學習成本。