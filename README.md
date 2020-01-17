
## Introduce
md + windows 点击风格的简单实现。所有事件代理于document，支持动态创建的元素，可随意与mvvm库搭配使用。兼容手机和pc。

Md + windows Click on the simple implementation of the style. All events are delegated to the document, supporting dynamically created elements, and can be used with the mvvm library at will. Compatible with mobile phones and PCs.

<br>

## Install

```
yarn add @lxjx/fr-click-effect
// or 
npm install @lxjx/fr-click-effect

// browser
src="./dist/index.umd.min.js"
```

<br>

## demo

[![Edit bk-click-effect](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bk-click-effect-9ris7?fontsize=14)

<br>

## Example

```js

import ClickEffect from "@lxjx/fr-click-effect";

new ClickEffect({
  /* default match className ↓ */
  // effect: "fr-effect",	// primary className
  // disabled: "__disabled",	
  // disabledwinStyle: "__md",	// disabled windows style effect
  // disabledMdStyle: "__win"	// disabled material style effect
});

// tpl
<div>
  <div className="box fr-effect">base</div>
  <div className="box fr-effect">
    has block
    <div className="block" />
  </div>
  <div style={{ backgroundColor: '#000' }} className="box fr-effect __light">
    white
  </div>
  <div className="box fr-effect __win">only win style</div>
  <div className="box fr-effect __md ">only md style</div>
  <div className="box fr-effect __disabled">disabled</div>
  <div className="box fr-effect __red">red</div>
  <div className="box fr-effect __orange">orange</div>
  <div className="box fr-effect __yellow">yellow</div>
  <div className="box fr-effect __green">green</div>
  <div className="box fr-effect __cyan">cyan</div>
  <div className="box __w2 fr-effect __blue">blue</div>
  <div className="box __w2 fr-effect __purple">purple</div>
</div>

// add theme
.fr-effect.__red .fr-effect-ripple{
  background: red;
}

<div class="box fr-effect __red">red</div>

```


