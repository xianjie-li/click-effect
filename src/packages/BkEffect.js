/**
 * @description 
 *    md + windows 点击风格的简单实现。所有事件代理于document，支持动态创建的元素，可随意与mvvm库搭配使用。兼容手机和pc。
 *    Md + windows Click on the simple implementation of the style. All events are delegated to the document, supporting dynamically created elements, and can be used with the mvvm library at will. Compatible with mobile phones and PCs.
 * @author lxj
 * @date 2019-07-28
 * @class BkEffect
 */

const defaultconfig = {
  effect: 'bk-effect',
  disabled: '__disabled',
  disabledwinStyle: '__disabledWinStyle',
  disabledMdStyle: '__disabledMdStyle',
}

export default class BkEffect {
  triggerEl = null;
  supportTouch = 'ontouchstart' in window;
  ripple = null;
  static loaded = false;

  constructor(option = {}) {
    if (BkEffect.loaded) {
      console.warn('BkEffect: Do not create instances repeatedly！');
      return;
    };
    BkEffect.loaded = true;

    this.option = {
      ...defaultconfig,
      ...option,
    };

    this.init();
  }

  init() {
    this.bindUpEvent();
    this.bindDownEvent();
  }

  /* mousedown */
  onDown = e => {
    let target = this.getCrrentEl(e);
    let isEffectEl = this.isEffectEl(target);
    let isDisabledWinStyle = this.isDisabledWinStyle(target);
    let isDisabledMdStyle = this.isDisabledMdStyle(target);
    let isDisabled = this.isDisabled(target);
    if (isEffectEl) {
      if(isDisabled) return;

      this.triggerEl = target;

      if(!isDisabledWinStyle) {
        this.onMove(e, true);
        this.bindMoveEvent();
      }

      if(!isDisabledMdStyle) {
        this.ripple = this.displayRipple(target, e);
      }
    }
  };

  displayRipple(el, e) {
    let mouseEvt = this.supportTouch ? e.changedTouches[0] : e;
    let bound = el.getBoundingClientRect();

    let ripple = document.createElement('div');
    let [left, top] = this.getOffestPos(mouseEvt, bound);
    let scalew = bound.width * 1.8;
    let scaleh = bound.height * 1.8;
    let max = Math.max(scalew, scaleh);

    ripple.className = 'bk-effect-ripple';
    ripple.style.left = `${left - max / 2}px`;
    ripple.style.top = `${top - max / 2}px`;
    ripple.style.height = `${max}px`;
    ripple.style.width = `${max}px`;

    ripple.setAttribute('data-hold', 1);

    el.appendChild(ripple);

    // animation
    setTimeout(() => {
      ripple.style.transform = `scale3d(${1}, ${1}, 1)`;
      ripple.style.opacity = 0;
      this.romoveRipple(ripple);
    });

    // used to save elements
    return ripple;
  }

  romoveRipple(ripple) {
    let isHold = +ripple.getAttribute('data-hold');

    if (isHold === 1) {
      ripple.style.opacity = 1;
      setTimeout(() => {
        this.romoveRipple(ripple);
      }, 700);
      return;

    } else {

      // not hold, delay 300ms to remove
      setTimeout(() => {
        ripple.style.opacity = 0;
        ripple.style.transition = 'all 0.3s ease-out';

        setTimeout(() => {
          if (!ripple.parentNode) return;
          ripple.parentNode.removeChild(ripple);
        }, 300);
      }, 300);
    }
  }

  /* mouseup */
  onUp = () => {
    this.unbindMoveEvent();
    if (this.ripple) {
      this.ripple.setAttribute('data-hold', 2);
      this.romoveRipple(this.ripple);
      this.ripple = null;
    }
  };

  /*  mouse press and move the mouse inside the element */
  onMove = (e, isManual) => {
    if (e.cancelable && !isManual) e.preventDefault();

    // throttling
    if (this.stopFlag) return;
    this.stopFlag = true;
    setTimeout(() => {
      this.stopFlag = false;
    }, 100);

    // assure .clientX、e.clientY exits
    let mouseEvt = this.supportTouch ? e.changedTouches[0] : e;
    let bound = this.triggerEl.getBoundingClientRect();

    let inArea = this.inArea(mouseEvt, bound);

    // out target element
    if (!inArea) {
      this.unbindMoveEvent();
    }

    if (inArea) {
      let [offsetX, offsetY] = this.getOffestPos(mouseEvt, bound);
      let rotateData = this.getRotateRatio(
        bound.width,
        bound.height,
        offsetX,
        offsetY
      );
      this.setRotate(...rotateData);
    }
  };

  /* 鼠标相对于目标元素的xy坐标 | The xy coordinate of the mouse relative to the target element */
  getOffestPos(mouseEvt, bound) {
    let offsetx = mouseEvt.clientX - bound.x;
    let offsety = mouseEvt.clientY - bound.y;
    return [offsetx, offsety];
  }

  /* 鼠标是否还在触发事件的元素内 | Whether the mouse is still inside the element that triggered the event */
  inArea = (mouseEvt, bound) => {
    if (
      mouseEvt.clientX < bound.x ||
      mouseEvt.clientY < bound.y ||
      mouseEvt.clientX > bound.x + bound.width ||
      mouseEvt.clientY > bound.y + bound.height
    ) {
      return false;
    } else {
      return true;
    }
  };

  /* 获取元素倾斜的所需的数据 | Get the required data for the element tilt */
  getRotateRatio(width, height, offsetX, offsetY) {
    let x = this.calcRotateRatio(offsetX / width);
    let y = this.calcRotateRatio(offsetY / height, true);
    let center = x === 0 && y === 0 ? 0.9 : 1;
    return [x, y, center];
  }

  /* 根据鼠标在元素上的位置来计算倾斜的反向 | Calculate the inverse of the tilt based on the position of the mouse on the element */
  calcRotateRatio(offset, isY) {
    if (offset <= 0.3) {
      return isY ? 1 : -1;
    }
    if (offset <= 0.7 && offset > 0.3) {
      return 0;
    }
    return isY ? -1 : 1;
  }

  /* 设置元素倾斜状态 | Set the element tilt state */
  setRotate(x, y, center) {
    this.triggerEl.style.transition = '70ms ease-in-out';
    this.triggerEl.style.transformOrigin = '50% 50%';
    this.triggerEl.style.transform = `perspective(400px) rotate3d(${y}, ${x}, 0, 16deg) scale3d(${center}, ${center}, 1)`;
  }

  /* 移除元素倾斜状态 | Remove element tilt state */
  removeRotate() {
    if (!this.triggerEl) return;
    this.triggerEl.style.transformOrigin = '';
    this.triggerEl.style.transform = '';
    setTimeout(() => {
      this.triggerEl.style.transition = '';
    }, 70);
  }

  /* ======= eventBinder/ utils ↓ ====== */

  bindUpEvent() {
    if (this.supportTouch) {
      document.addEventListener('touchend', this.onUp, false);
      document.addEventListener('touchcancel', this.onUp, false);
    } else {
      document.addEventListener('mouseup', this.onUp, false);
      document.addEventListener('mouseleave', this.onUp, false);
      document.addEventListener('dragend', this.onUp, false);
    }
  }

  bindDownEvent() {
    if (this.supportTouch) {
      document.addEventListener('touchstart', this.onDown, false);
    } else {
      document.addEventListener('mousedown', this.onDown, false);
    }
  }

  bindMoveEvent() {
    if (this.supportTouch) {
      document.addEventListener('touchmove', this.onMove, { passive: false });
    } else {
      document.addEventListener('mousemove', this.onMove, false);
    }
  }

  unbindMoveEvent() {
    this.removeRotate();
    if (this.supportTouch) {
      document.removeEventListener('touchmove', this.onMove);
    } else {
      document.removeEventListener('mousemove', this.onMove);
    }
  }

  getCrrentEl(e) {
    return this.getWavesEffectElement(e);
  }

  isEffectEl(el) {
    return el.className.indexOf(this.option.effect) !== -1;
  }
  
  isDisabledWinStyle(el) {
    return el.className.indexOf(this.option.disabledwinStyle) !== -1;
  }

  isDisabledMdStyle(el) {
    return el.className.indexOf(this.option.disabledMdStyle) !== -1;
  }

  isDisabled(el) {
    return new RegExp(this.option.disabled + '(\\s|)$').test(el.className);
  }

  /**
   * Reference to: https://github.com/fians/Waves
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  getWavesEffectElement(e) {

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentNode !== null) {
      if (
        !(target instanceof SVGElement) &&
        target.className.indexOf(this.option.effect) !== -1
      ) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }
}

