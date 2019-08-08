import React from 'react';

import BkEffect from "../packages/BkEffect";

new BkEffect({
  /* default match className ↓ */
  // effect: "bk-effect",
  // disabled: "__disabled",
  // disabledwinStyle: "__disabledWinStyle",
  // disabledMdStyle: "__disabledMdStyle"
});

import './index.css';
import '../packages/style.css'

const demo = () => {
  return (
    <div>
      <div className="box bk-effect">
        default
        <div className="block"></div>
      </div>
      <div className="box bk-effect __light">
        __light
      </div>
      <div className="box bk-effect __disabledWinStyle">only win style</div>
      <div className="box bk-effect __disabledMdStyle">only md style</div>
      <div className="box bk-effect __disabled">disabled</div>
      <div className="box bk-effect __red">__red</div>
      <div className="box bk-effect __orange">__orange</div>
      <div className="box bk-effect __yellow">__yellow</div>
      <div className="box bk-effect __green">__green</div>
      <div className="box bk-effect __cyan">__cyan</div>
      <div className="box __w2 bk-effect __blue">__blue</div>
      <div className="box __w2 bk-effect __purple">__purple</div>
    </div>
  );
};

export default demo;
