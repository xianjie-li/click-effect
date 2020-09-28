import React from 'react';

import ClickEffect from "../packages/ClickEffect";

new ClickEffect();
new ClickEffect();
new ClickEffect();

import './index.css';

const demo = () => {
  return (
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
  );
};

export default demo;
