# @lxjx/bk-click-effect
## Introduce
md + windows 点击风格的简单实现。所有事件代理于document，支持动态创建的元素，可随意与mvvm库搭配使用。兼容手机和pc。

Md + windows Click on the simple implementation of the style. All events are delegated to the document, supporting dynamically created elements, and can be used with the mvvm library at will. Compatible with mobile phones and PCs.

<br>

## Install

```
yarn add @lxjx/bk-click-effect
// or 
npm install @lxjx/bk-click-effect
```

<br>

## demo

[![Edit thirsty-bhabha-td3tu](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/thirsty-bhabha-td3tu?fontsize=14)

<br>

## Example

```js

import BkEffect from "@lxjx/bk-click-effect";

new BkEffect({
  /* default match className ↓ */
  // effect: "bk-effect",	// primary className
  // disabled: "__disabled",	
  // disabledwinStyle: "__disabledWinStyle",	// disabled windows style effect
  // disabledMdStyle: "__disabledMdStyle"	// disabled material style effect
});

// tpl
<div class="box bk-effect">default</div>
<div class="box bk-effect __light" style="background-color: #61dafb;">__light</div>
<div class="box bk-effect __disabledWinStyle">only win style</div>
<div class="box bk-effect __disabledMdStyle">only md style</div>
<div class="box bk-effect __disabled">disabled</div>
<div class="box bk-effect __red">__red</div>
<div class="box bk-effect __orange">__orange</div>
<div class="box bk-effect __yellow">__yellow</div>
<div class="box bk-effect __green">__green</div>
<div class="box bk-effect __cyan">__cyan</div>
<div class="box __w2 bk-effect __blue">__blue</div>
<div class="box __w2 bk-effect __purple">__purple</div>

// add theme
.bk-effect.__custom .bk-effect-ripple{
  background: red;
}

<div class="box bk-effect __red">red</div>

```


