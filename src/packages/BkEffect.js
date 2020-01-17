/**
 *  md + windows 点击风格的简单实现。所有事件代理于document，支持动态创建的元素，可随意与mvvm库搭配使用。兼容手机和pc。
 *  Md + windows Click on the simple implementation of the style. All events are delegated to the document, supporting dynamically created elements, and can be used with the mvvm library at will. Compatible with mobile phones and PCs.
 */

let loaded = false;

const defaultConfig = {
  effect: 'fr-effect',
  disabled: '__disabled',
  disabledWinStyle: '__md',
  disabledMdStyle: '__win',
};

export default class BkEffect {
  supportTouch = ('ontouchstart' in window);
  triggerEl = []; // 触发点击的元素列表
  ripple = []; // 所有波动元素的列表

  constructor(option = {}) {
    if (loaded) {
      return;
    }
    loaded = true;

    this.option = {
      ...defaultConfig,
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
    let target = this.getCurrentEl(e);
    if (!target) return;
    let isEffectEl = this.isEffectEl(target);
    let isDisabledWinStyle = this.isDisabledWinStyle(target);
    let isDisabledMdStyle = this.isDisabledMdStyle(target);
    let isDisabled = this.isDisabled(target);
    if (!isDisabled && isEffectEl) {

      this.triggerEl.push(target);

      if (!isDisabledWinStyle) {
        this.onMove(e, true);
        this.bindMoveEvent();
      }

      if (!isDisabledMdStyle) {
        this.ripple.push(this.displayRipple(target, e));
      }
    }
  };

  /**
   *  在根据事件对象在指定元素内生成wave
   *  @param el { Node } - 要生成内wave的元素
   *  @param e { TouchEvent | MouseEvent } - 当前触发的事件对象
   *  */
  displayRipple(el, e) {
    let mouseEvt = this.supportTouch ? e.changedTouches[0] : e;
    let bound = el.getBoundingClientRect();

    let ripple = document.createElement('div');
    let [left, top] = this.getOffestPos(mouseEvt, bound);
    let scaleW = bound.width * 1.8;
    let scaleH = bound.height * 1.8;
    let max = Math.max(scaleW, scaleH);

    ripple.className = `${this.option.effect}-ripple`;
    ripple.style.left = `${left - max / 2}px`;
    ripple.style.top = `${top - max / 2}px`;
    ripple.style.height = `${max}px`;
    ripple.style.width = `${max}px`;

    ripple.setAttribute('data-hold', '1');

    el.appendChild(ripple);

    // animation
    setTimeout(() => {
      // 设置为结束状态
      ripple.style.transform = `scale3d(${1}, ${1}, 1)`;
      ripple.style.opacity = '0';
      this.removeRipple(ripple);
    });

    // 用于保存到ripple列表
    return ripple;
  }

  /* 移除传入的ripple */
  removeRipple(ripple) {
    let isHold = +ripple.getAttribute('data-hold');

    if (isHold === 1) {
      ripple.style.opacity = 1;
      setTimeout(() => {
        this.removeRipple(ripple);
      }, 700);
    } else {
      // 非按住状态300ms后隐藏
      setTimeout(() => {
        ripple.style.opacity = 0;
        ripple.style.transition = 'all 0.3s ease-out';

        // 300ms后彻底移除
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

    this.ripple.forEach((rippleItem, index) => {
      rippleItem.setAttribute('data-hold', 2);
      this.removeRipple(rippleItem);
      this.ripple.splice(index, 1);
    });
  };

  /*  鼠标按下并在元素内部移动 */
  onMove = (e, isManual) => {
    // if (e.cancelable && !isManual) e.preventDefault();

    // throttling
    if (this.stopFlag) return;
    this.stopFlag = true;
    setTimeout(() => {
      this.stopFlag = false;
    }, 100);
    let currentEl = this.triggerEl[this.triggerEl.length - 1];
    // assure .clientX、e.clientY exits
    let mouseEvt = this.supportTouch ? e.changedTouches[0] : e;
    let bound = currentEl.getBoundingClientRect();

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
      this.setRotate(...rotateData, currentEl);
    }
  };

  /* 鼠标相对于目标元素的xy坐标 | The xy coordinate of the mouse relative to the target element */
  getOffestPos(mouseEvt, bound) {
    let offsetX = mouseEvt.clientX - bound.x;
    let offsetY = mouseEvt.clientY - bound.y;
    return [offsetX, offsetY];
  }

  /* 鼠标是否还在触发事件的元素内 | Whether the mouse is still inside the element that triggered the event */
  inArea = (mouseEvt, bound) => {
    return !(mouseEvt.clientX < bound.x ||
      mouseEvt.clientY < bound.y ||
      mouseEvt.clientX > bound.x + bound.width ||
      mouseEvt.clientY > bound.y + bound.height);
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
  setRotate(x, y, center, currentEl) {
    currentEl.style.transition = '70ms ease-in-out';
    currentEl.style.transformOrigin = '50% 50%';
    currentEl.style.transform = `perspective(400px) rotate3d(${y}, ${x}, 0, 8deg) scale3d(${center}, ${center}, 1)`;
    currentEl.style.userSelect = 'none';
  }

  /* 移除元素倾斜状态 | Remove element tilt state */
  removeRotate() {
    if (!this.triggerEl) return;
    this.triggerEl.forEach(elItem => {
      elItem.style.transformOrigin = '';
      elItem.style.transform = '';
      elItem.style.userSelect = '';
      setTimeout(() => {
        elItem.style.transition = '';
      }, 70);
    });
  }

  /* ======= eventBinder / utils ====== */

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

  getCurrentEl(e) {
    return this.getWavesEffectElement(e);
  }

  isEffectEl(el) {
    return el.className.indexOf(this.option.effect) !== -1;
  }

  isDisabledWinStyle(el) {
    return el.className.indexOf(this.option.disabledWinStyle) !== -1;
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

    let element = null;
    let target = e.target || e.srcElement;

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

