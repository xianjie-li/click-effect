
## Introduce
md + windows 点击风格的实现。所有事件代理于document，支持动态创建的元素，可随意与mvvm库搭配使用。兼容手机和pc。

Md + windows Click implementation of the style. All events are delegated to the document, supporting dynamically created elements, and can be used with the mvvm library at will. Compatible with mobile phones and PCs.



## demo

[![Edit bk-click-effect (forked)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bk-click-effect-forked-r3k42?fontsize=14&hidenavigation=1&theme=dark)



<br>

## Install

```
yarn add @lxjx/click-effect
// or 
npm install @lxjx/click-effect

// browser
src="./dist/index.umd.min.js"
```



<br>

## Example

```jsx

import ClickEffect from "@lxjx/fr-click-effect";

new ClickEffect({
  /* default match className ↓ */
  // effect: "m78-effect",	// primary className
  // disabled: "__disabled",	
  // disabledwinStyle: "__md",	// disabled windows style effect
  // disabledMdStyle: "__win"	// disabled material style effect
});

// tpl
<div>
    <div className="box m78-effect">base</div>
    <div className="box m78-effect __light" style={{ background: '#1890ff' }}>base</div>
    <div className="box m78-effect __light" style={{ background: '#f5222d' }}>base</div>
    <div className="box m78-effect __light" style={{ background: '#52c41a' }}>base</div>
    <div className="box m78-effect __light" style={{ background: '#fadb14' }}>base</div>
    <div className="box m78-effect">
        has block
            <div className="block" />
                </div>
    <div style={{ backgroundColor: '#000' }} className="box m78-effect __light">
        white
    </div>
    <div className="box m78-effect __win">only win style</div>
    <div className="box m78-effect __md">only md style</div>
    <div className="box m78-effect __disabled">disabled</div>
    <div className="box m78-effect __red">red</div>
    <div className="box m78-effect __orange">orange</div>
    <div className="box m78-effect __yellow">yellow</div>
    <div className="box m78-effect __green">green</div>
    <div className="box m78-effect __cyan">cyan</div>
    <div className="box __w2 m78-effect __blue">blue</div>
    <div className="box __w2 m78-effect __purple">purple</div>
</div>

// add theme
.fr-effect.__myRed .fr-effect-ripple{
  background: red;
}

<div class="box fr-effect __myRed">red</div>

```


