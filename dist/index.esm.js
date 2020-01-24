import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';

var style = function style(base) {
  /* language=css */
  return "\n    .".concat(base, " {\n      position: relative;\n      overflow: hidden;\n    }\n\n    .").concat(base, "-ripple {\n      position: absolute;\n      border-radius: 50%;\n      width: 0;\n      height: 0;\n      opacity: 1;\n      background: rgba(0,0,0,0.18);\n      transition: 0.6s ease-out;\n      transition-property: transform, opacity;\n      transform: scale3d(0, 0, 1);\n      pointer-events: none;\n    }\n    \n    .").concat(base, ".__red .").concat(base, "-ripple{\n      background: rgba(245, 34, 45, 0.3);\n    }\n    \n    .").concat(base, ".__orange .").concat(base, "-ripple{\n      background: rgba(250, 140, 22, 0.3);\n    }\n    \n    .").concat(base, ".__yellow .").concat(base, "-ripple{\n      background: rgba(250, 219, 20, 0.3);\n    }\n    \n    .").concat(base, ".__green .").concat(base, "-ripple{\n      background: rgba(82, 196, 26, 0.3);\n    }\n    \n    .").concat(base, ".__cyan .").concat(base, "-ripple{\n      background: rgba(19, 194, 194, 0.3);\n    }\n    \n    .").concat(base, ".__blue .").concat(base, "-ripple{\n      background: rgba(24, 144, 255, 0.3);\n    }\n    \n    .").concat(base, ".__purple .").concat(base, "-ripple{\n      background: rgba(114, 46, 209, 0.3);\n    }\n        \n    .").concat(base, ".__light .").concat(base, "-ripple{\n      background: rgba(255,255,255, 0.3);\n    }\n  ");
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var loaded = false;
var defaultConfig = {
  effect: 'fr-effect',
  disabled: '__disabled',
  disabledWinStyle: '__md',
  disabledMdStyle: '__win'
}; // 基础倾斜值

var baseSkew = 20;

var ClickEffect =
/*#__PURE__*/
function () {
  // 触发点击的元素列表
  // 所有波动元素的列表
  function ClickEffect() {
    var _this = this;

    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ClickEffect);

    this.supportTouch = 'ontouchstart' in window;
    this.triggerEl = [];
    this.ripple = [];

    this.onDown = function (e) {
      var target = _this.getCurrentEl(e);

      if (!target) return;

      var isEffectEl = _this.isEffectEl(target);

      var isDisabledWinStyle = _this.isDisabledWinStyle(target);

      var isDisabledMdStyle = _this.isDisabledMdStyle(target);

      var isDisabled = _this.isDisabled(target);

      if (!isDisabled && isEffectEl) {
        _this.triggerEl.push(target);

        if (!isDisabledWinStyle) {
          _this.onMove(e, true);

          _this.bindMoveEvent();
        }

        if (!isDisabledMdStyle) {
          _this.ripple.push(_this.displayRipple(target, e));
        }
      }
    };

    this.onUp = function () {
      _this.unbindMoveEvent();

      _this.ripple.forEach(function (rippleItem, index) {
        rippleItem.setAttribute('data-hold', 2);

        _this.removeRipple(rippleItem);

        _this.ripple.splice(index, 1);
      });
    };

    this.onMove = function (e, isManual) {
      // if (e.cancelable && !isManual) e.preventDefault();
      // throttling
      if (_this.stopFlag) return;
      _this.stopFlag = true;
      setTimeout(function () {
        _this.stopFlag = false;
      }, 100);
      var currentEl = _this.triggerEl[_this.triggerEl.length - 1]; // assure .clientX、e.clientY exits

      var mouseEvt = _this.supportTouch ? e.changedTouches[0] : e;
      var bound = currentEl.getBoundingClientRect();

      var inArea = _this.inArea(mouseEvt, bound); // out target element


      if (!inArea) {
        _this.unbindMoveEvent();
      }

      if (inArea) {
        var _this$getOffestPos = _this.getOffestPos(mouseEvt, bound),
            _this$getOffestPos2 = _slicedToArray(_this$getOffestPos, 2),
            offsetX = _this$getOffestPos2[0],
            offsetY = _this$getOffestPos2[1];

        var rotateData = _this.getRotateRatio(bound.width, bound.height, offsetX, offsetY);

        _this.setRotate.apply(_this, _toConsumableArray(rotateData).concat([currentEl]));
      }
    };

    this.inArea = function (mouseEvt, bound) {
      return !(mouseEvt.clientX < bound.x || mouseEvt.clientY < bound.y || mouseEvt.clientX > bound.x + bound.width || mouseEvt.clientY > bound.y + bound.height);
    };

    if (loaded) {
      return;
    }

    loaded = true;
    this.option = _objectSpread({}, defaultConfig, {}, option);
    this.init();
  }

  _createClass(ClickEffect, [{
    key: "init",
    value: function init() {
      this.bindUpEvent();
      this.bindDownEvent();
      this.injectStyle(style(this.option.effect));
    }
    /* mousedown */

  }, {
    key: "displayRipple",

    /**
     *  在根据事件对象在指定元素内生成wave
     *  @param el { Node } - 要生成内wave的元素
     *  @param e { TouchEvent | MouseEvent } - 当前触发的事件对象
     *  */
    value: function displayRipple(el, e) {
      var _this2 = this;

      var mouseEvt = this.supportTouch ? e.changedTouches[0] : e;
      var bound = el.getBoundingClientRect();
      var ripple = document.createElement('div');

      var _this$getOffestPos3 = this.getOffestPos(mouseEvt, bound),
          _this$getOffestPos4 = _slicedToArray(_this$getOffestPos3, 2),
          left = _this$getOffestPos4[0],
          top = _this$getOffestPos4[1];

      var scaleW = bound.width * 1.8;
      var scaleH = bound.height * 1.8;
      var max = Math.max(scaleW, scaleH);
      ripple.className = "".concat(this.option.effect, "-ripple");
      ripple.style.left = "".concat(left - max / 2, "px");
      ripple.style.top = "".concat(top - max / 2, "px");
      ripple.style.height = "".concat(max, "px");
      ripple.style.width = "".concat(max, "px");
      ripple.setAttribute('data-hold', '1');
      el.appendChild(ripple); // animation

      setTimeout(function () {
        // 设置为结束状态
        ripple.style.transform = "scale3d(".concat(1, ", ", 1, ", 1)");
        ripple.style.opacity = '0';

        _this2.removeRipple(ripple);
      }); // 用于保存到ripple列表

      return ripple;
    }
    /* 移除传入的ripple */

  }, {
    key: "removeRipple",
    value: function removeRipple(ripple) {
      var _this3 = this;

      var isHold = +ripple.getAttribute('data-hold');

      if (isHold === 1) {
        ripple.style.opacity = 1;
        setTimeout(function () {
          _this3.removeRipple(ripple);
        }, 700);
      } else {
        // 非按住状态300ms后隐藏
        setTimeout(function () {
          ripple.style.opacity = 0;
          ripple.style.transition = 'all 0.3s ease-out'; // 300ms后彻底移除

          setTimeout(function () {
            if (!ripple.parentNode) return;
            ripple.parentNode.removeChild(ripple);
          }, 300);
        }, 300);
      }
    }
    /* mouseup */

  }, {
    key: "getOffestPos",

    /* 鼠标相对于目标元素的xy坐标 | The xy coordinate of the mouse relative to the target element */
    value: function getOffestPos(mouseEvt, bound) {
      var offsetX = mouseEvt.clientX - bound.x;
      var offsetY = mouseEvt.clientY - bound.y;
      return [offsetX, offsetY];
    }
    /* 鼠标是否还在触发事件的元素内 | Whether the mouse is still inside the element that triggered the event */

  }, {
    key: "getRotateRatio",

    /* 获取元素倾斜的所需的数据 | Get the required data for the element tilt */
    value: function getRotateRatio(width, height, offsetX, offsetY) {
      var x = this.calcRotateRatio(offsetX / width);
      var y = this.calcRotateRatio(offsetY / height, true);
      var center = x === 0 && y === 0 ? 0.9 : 1;
      var max = Math.max(width, height);
      var cutSkew = Math.floor(max / 30); // 倾斜角度修正值，尺寸每增加30减少1

      var resSkew = Math.max(4, baseSkew - cutSkew); // 最小倾斜度为4

      return [x, y, center, resSkew];
    }
    /* 根据鼠标在元素上的位置来计算倾斜的反向 | Calculate the inverse of the tilt based on the position of the mouse on the element */

  }, {
    key: "calcRotateRatio",
    value: function calcRotateRatio(offset, isY) {
      if (offset <= 0.3) {
        return isY ? 1 : -1;
      }

      if (offset <= 0.7 && offset > 0.3) {
        return 0;
      }

      return isY ? -1 : 1;
    }
    /* 设置元素倾斜状态 | Set the element tilt state */

  }, {
    key: "setRotate",
    value: function setRotate(x, y, center, resSkew, currentEl) {
      console.log(resSkew);
      currentEl.style.transition = '70ms ease-in-out';
      currentEl.style.transformOrigin = '50% 50%';
      currentEl.style.transform = "perspective(400px) rotate3d(".concat(y, ", ").concat(x, ", 0, ").concat(resSkew, "deg) scale3d(").concat(center, ", ").concat(center, ", 1)");
      currentEl.style.userSelect = 'none';
    }
    /* 移除元素倾斜状态 | Remove element tilt state */

  }, {
    key: "removeRotate",
    value: function removeRotate() {
      if (!this.triggerEl) return;
      this.triggerEl.forEach(function (elItem) {
        elItem.style.transformOrigin = '';
        elItem.style.transform = '';
        elItem.style.userSelect = '';
        setTimeout(function () {
          elItem.style.transition = '';
        }, 70);
      });
    }
    /* ======= eventBinder / utils ====== */

  }, {
    key: "bindUpEvent",
    value: function bindUpEvent() {
      if (this.supportTouch) {
        document.addEventListener('touchend', this.onUp, false);
        document.addEventListener('touchcancel', this.onUp, false);
      } else {
        document.addEventListener('mouseup', this.onUp, false);
        document.addEventListener('mouseleave', this.onUp, false);
        document.addEventListener('dragend', this.onUp, false);
      }
    }
  }, {
    key: "bindDownEvent",
    value: function bindDownEvent() {
      if (this.supportTouch) {
        document.addEventListener('touchstart', this.onDown, false);
      } else {
        document.addEventListener('mousedown', this.onDown, false);
      }
    }
  }, {
    key: "bindMoveEvent",
    value: function bindMoveEvent() {
      if (this.supportTouch) {
        document.addEventListener('touchmove', this.onMove, {
          passive: false
        });
      } else {
        document.addEventListener('mousemove', this.onMove, false);
      }
    }
  }, {
    key: "unbindMoveEvent",
    value: function unbindMoveEvent() {
      this.removeRotate();

      if (this.supportTouch) {
        document.removeEventListener('touchmove', this.onMove);
      } else {
        document.removeEventListener('mousemove', this.onMove);
      }
    }
  }, {
    key: "injectStyle",
    value: function injectStyle(styleStr) {
      var style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.setAttribute('symbol', 'fr-effect');
      style.innerHTML = styleStr;
      document.head.appendChild(style);
    }
  }, {
    key: "getCurrentEl",
    value: function getCurrentEl(e) {
      return this.getWavesEffectElement(e);
    }
  }, {
    key: "isEffectEl",
    value: function isEffectEl(el) {
      return el.className.indexOf(this.option.effect) !== -1;
    }
  }, {
    key: "isDisabledWinStyle",
    value: function isDisabledWinStyle(el) {
      return el.className.indexOf(this.option.disabledWinStyle) !== -1;
    }
  }, {
    key: "isDisabledMdStyle",
    value: function isDisabledMdStyle(el) {
      return el.className.indexOf(this.option.disabledMdStyle) !== -1;
    }
  }, {
    key: "isDisabled",
    value: function isDisabled(el) {
      return new RegExp(this.option.disabled + '(\\s|)$').test(el.className);
    }
    /**
     * Reference to: https://github.com/fians/Waves
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */

  }, {
    key: "getWavesEffectElement",
    value: function getWavesEffectElement(e) {
      var element = null;
      var target = e.target || e.srcElement;

      while (target.parentNode !== null) {
        if (!(target instanceof SVGElement) && target.className.indexOf(this.option.effect) !== -1) {
          element = target;
          break;
        }

        target = target.parentNode;
      }

      return element;
    }
  }]);

  return ClickEffect;
}();

export default ClickEffect;
