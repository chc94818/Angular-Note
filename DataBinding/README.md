# DataBinding

Angular 透過 Data Binding 讓 Component 及 DOM 建立資料的連結，其方式有四種。
- 字串插值(String Imterpolation)
- 屬性綁定(Property Binding)
- 事件綁定(Event Binding)
- 雙向資料繫結(Two-Way-Binding)

## 字串插值(String Imterpolation)

直接在 Template 中插入 `{{value}}`，當 value 的值發生改變，就會更新到 DOM 上。
(也可以綁定在 function 的 return value)
```
// in  app.component.ts
export class AppComponent {
  value = 'text'
  getValue = () => {
    return this.value;
  }
}

// in app.component.html
// bind the value directly
<div>{{stringImterpolationValue}}</div>
// bind the value got from function
<div>{{getStringImterpolationValue()}}</div>
```

## 屬性綁定(Property Binding)

在 HTML 中的屬性加入 [property]="value"，來將 value 的變化更新到該 property 上。當然也能夠綁定到 function returned value 上

```
// in  app.component.ts
IdBinding = "id-for-property-binding";

// in app.component.html
// bind the property value directly
<div [id]="IdBinding">property binding</div>
// bind the property value got from function
<div [id]="getIdBindingString()">property binding</div>
```

## 事件綁定(Event Binding)
當發生指定 event 時，執行指定的函式。
```
// in  app.component.ts
onClick = () => {
  this.clickNum++;
}

// in app.component.html
// run onClick method when the button is clicked.
<div>
  <button (click)="onClick()">event binding for onClick</button>
  <div>click nums: {{clickNum}}</div>
</div>
```


## 雙向資料繫結(Two-Way-Binding)
透過在 HTML 中的加入 `[(ngModel)]="value"` 來實現雙向綁定，用於可以讓使用者互動的 HTML 元素

```
// in  app.component.ts
twoWayValue = '';

// in app.component.html
// bind the twoWayValue to the input by [(ngModel)]
<div>
  <div>two way data binding</div>
  <input [(ngModel)]="twoWayValue">
  <div>input value: {{twoWayValue}}</div>
</div>
```


P.S.
使用 `ngModel`，需要先 import 到 module 中。例如使用到 `FormsModule` :
```
// in app.module.ts
import { FormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule
  ],
  ...
})
```

## Note
Angular 所使用的 Data binding 方式基本上與其他框架大同小異，特別是其雙向綁定所用到的 `ngModel`，能夠十分方便的去觸發及管理 DOM 與資料的互動。
