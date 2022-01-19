# Directives
Directives 能夠用來指定 DOM 需要被如何操作，其中又區分成三種 directive：
- 元件: 包含 template 的 directive。
- 結構指令 (structural directive。): 能夠新增或刪除 DOM 元素，來對整個 layout 產生變化 (ngFor or ngIf)
- 屬性指令 (property directive。): 更動 component 的屬性來構成外觀或行為的改變

## 元件
各個 component 就屬於此類，比如 `AppComponent`

## 結構型
透過結構型的 directive 能夠控制 DOM 元素的新增與刪除
(結構型通常帶有 `*` 的前綴)
- ngIf
  ```
  <div *ngIf="condition">show div if condition</div>
  ```
  透過在 DOM 中添加 `*ngIf` ，能夠在其狀態為 `true` 時顯示該 DOM。另外 這類 `structural directive` 前綴的 `*` 是用來給 Angular 辨識用的縮寫，Angular 會將帶有該符號的 directive 用一個 `ng-template` 包起來:
  ```
  <ng-template [ngIf]="condition">
    <div>show div if condition</div>
  </ng-template>
  ```
- ngIf else: 當 condition 為 `false` 時，顯示 `else` 後面指定的 DOM
  - 配合 `ng-template` 來宣告一個區塊，Angular 會將其載入記憶體，但不會在畫面顯示，僅會留下一段註解
  - 利用 `#` 宣告一個區域變數，做為該 DOM 的參考名稱
  ```
  // add condition in app.component.ts
  export class AppComponent {
    condition = true;
  }

  // in app.component.html
  // when condition is false, show the dom named elseShow
  <p *ngIf="condition; else elseShow">Content to render when condition is true.</p>
  // using ng-template to create a template for elseShow
  <ng-template #elseShow>show this when show 2 is false </ng-template>
  ```
  
- ngFor: 可以迴圈的建立 DOM，亦提供許多參數可連結到區域變數來使用
  ```
  // add list in app.component.ts
  export class AppComponent {
    list = ['first list itme',' 2 list item   content', 'third message'];
  }

  // in app.component.html
  // loop list to create each item within li
  <ul>
    <li *ngFor="let item of list">{{ item }}</li>
  </ul>
  ```
  ```
  // add users in app.component.ts
  export class AppComponent {
    users = ['hi1','hi2','user3'];
  }

  // in app.component.html
  // ngFor provides exported values that can be aliased to local variables. For example:
  <ul>
    <li *ngFor="let user of users; index as i; first as isFirst">
      {{i}}/{{users.length}}. {{user}} 
      <span *ngIf="isFirst">default</span>
    </li>
  </ul>
  ```

## 屬性型
`ngStyle` 就是一個典型的屬性型 directive，除了使用 `style` 我們也能通過 `ngStyle` 來設定 css 屬性
```
// set style
<p [style.background-color]= "'yellow'">yellow color</p>
<p [style.fon-size.px] = "16">font size 16</p>
// use ngStyle to assing style
<p [ngStyle]="{color: 'white', 'background-color': 'blue'}"> ngStyle content</p>
```
除此之外也能建立一個新的 directive 來使用，新建一個帶有 `@Directive` 宣告的檔案，讓 Angular 識別他，並透過 module 中的 `declarations` 裡宣告會用到的 directive 來使用他。
- 新增一個 directive
  ```
  // ng generate directive {directive-name}
  ng generate directive highlight
  ```

- 生成好 directive 檔案後，可以在建構子中設定他，並在 component 中使用他
  ```
  // in app.component.html
  <p appHighlight>Directive sample</p>

  // in highlight.directive.ts
  import { Directive, ElementRef } from '@angular/core';

  @Directive({
    selector: '[appHighlight]'
  })
  export class HighlightDirective {
      constructor(private el: ElementRef) {
        // set the dom background color to yellow
        el.nativeElement.style.backgroundColor = 'yellow';
      }
  }
  ```
  P.S. 另外似乎能使用 Renderer2 來操作 style，但還沒有深入去看。

- 若想要接收使用者事件，可以 import HostListener
  ```
  import { Directive, ElementRef, HostListener } from '@angular/core';

  export class HighlightDirective {
    constructor(private el: ElementRef) {
      this.el.nativeElement.style.backgroundColor = ;
    }  
    @HostListener('mouseenter') onMouseEnter() {
      this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.highlight(null);
    }

    private highlight(color: string) {
      this.el.nativeElement.style.backgroundColor = color;
    }
  ```

- 若想要輸入參數至 directive 中，需要先 import input，並使用 `@input` 來宣告該參數
  ```
  // in app.component.html
  <p appHighlight highlightColor="yellow">Highlighted in yellow</p>
  // or
  <p appHighlight [highlightColor]="'orange'">Highlighted in orange</p>

  // in highlight.directive.ts
  import { Directive, ElementRef, HostListener, Input } from '@angular/core';
  export class HighlightDirective {
    // input highlightColor
    @Input() highlightColor: string;
    constructor(private el: ElementRef) {}  

    @HostListener('mouseenter') onMouseEnter() {
      this.highlight(this.highlightColor);
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.highlight(null);
    }

    private highlight(color: string) {
      this.el.nativeElement.style.backgroundColor = color;
    }
  }
  ```

- 若將 `@input` 命名成跟 directive 同名，可以同時賦予屬性跟 directive
  ```
  // in app.component.html
  <p appHighlight="red">Highlight me !</p>
  // or
  <p [appHighlight]="'red'">Highlight me !</p>

  // in highlight.directive.ts
  @Input() appHighlight: string;
  ```

- 配合其他參數來動態的修改屬性的值可以配合如 input:
  ```
  // in app.component.html
  // bind the onClick event to assign the selected color
  <div>
    <input type="radio" name="colors" (click)="color='lightgreen'">Green
    <input type="radio" name="colors" (click)="color='yellow'">Yellow
    <input type="radio" name="colors" (click)="color='cyan'">Cyan
  </div>

  // in app.component.ts
  // declare a variable color for app component
  export class AppComponent {
    title = 'Directives';
    color = '';
  }
  <p appHighlight [highlightColor]="color">Highlight me using the input color!</p>
  ```
