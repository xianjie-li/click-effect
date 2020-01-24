import React from 'react';

import ClickEffect from "../packages/ClickEffect";

new ClickEffect();
new ClickEffect();
new ClickEffect();

import './index.css';

const demo = () => {
  return (
    <div>
      <div className="box fr-effect">base</div>
      <div className="box fr-effect __blue __light" style={{ background: '#1890ff' }}>base</div>
      <div className="box fr-effect __red" style={{ background: '#f5222d' }}>base</div>
      <div className="box fr-effect __green" style={{ background: '#52c41a' }}>base</div>
      <div className="box fr-effect __yellow" style={{ background: '#fadb14' }}>base</div>
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
  );
};

export default demo;
