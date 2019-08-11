import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".bk-effect {\n  position: relative;\n  overflow: hidden;\n}\n\n.bk-effect.__light .bk-effect-ripple{\n  background: rgba(255,255,255,0.3);\n}\n\n.bk-effect.__red .bk-effect-ripple{\n  background: rgba(245, 34, 45, 0.4);\n}\n\n.bk-effect.__orange .bk-effect-ripple{\n  background: rgba(250, 140, 22, 0.4);\n}\n\n.bk-effect.__yellow .bk-effect-ripple{\n  background: rgba(250, 219, 20, 0.4);\n}\n\n.bk-effect.__green .bk-effect-ripple{\n  background: rgba(82, 196, 26, 0.4);\n}\n\n.bk-effect.__cyan .bk-effect-ripple{\n  background: rgba(19, 194, 194, 0.4);\n}\n\n.bk-effect.__blue .bk-effect-ripple{\n  background: rgba(24, 144, 255, 0.4);\n}\n\n.bk-effect.__purple .bk-effect-ripple{\n  background: rgba(114, 46, 209, 0.4);\n}\n\n.bk-effect-ripple {\n  position: absolute;\n  border-radius: 50%;\n  width: 0;\n  height: 0;\n  opacity: 1;\n  background: rgba(0,0,0,0.16);\n  transition: all 0.7s ease-out;\n  transition-property: transform, opacity;\n  transform: scale(0);\n  pointer-events: none;\n}";
styleInject(css);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @description 
 *    md + windows 点击风格的简单实现。所有事件代理于document，支持动态创建的元素，可随意与mvvm库搭配使用。兼容手机和pc。
 *    Md + windows Click on the simple implementation of the style. All events are delegated to the document, supporting dynamically created elements, and can be used with the mvvm library at will. Compatible with mobile phones and PCs.
 * @author lxj
 * @date 2019-07-28
 * @class BkEffect
 */
var defaultconfig = {
  effect: 'bk-effect',
  disabled: '__disabled',
  disabledwinStyle: '__disabledWinStyle',
  disabledMdStyle: '__disabledMdStyle'
};

var BkEffect =
/*#__PURE__*/
function () {
  function BkEffect() {
    var _this = this;

    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BkEffect);

    this.triggerEl = null;
    this.supportTouch = 'ontouchstart' in window;
    this.ripple = null;

    this.onDown = function (e) {
      var target = _this.getCrrentEl(e);

      if (!target) return;

      var isEffectEl = _this.isEffectEl(target);

      var isDisabledWinStyle = _this.isDisabledWinStyle(target);

      var isDisabledMdStyle = _this.isDisabledMdStyle(target);

      var isDisabled = _this.isDisabled(target);

      if (isEffectEl) {
        if (isDisabled) return;
        _this.triggerEl = target;

        if (!isDisabledWinStyle) {
          _this.onMove(e, true);

          _this.bindMoveEvent();
        }

        if (!isDisabledMdStyle) {
          _this.ripple = _this.displayRipple(target, e);
        }
      }
    };

    this.onUp = function () {
      _this.unbindMoveEvent();

      if (_this.ripple) {
        _this.ripple.setAttribute('data-hold', 2);

        _this.romoveRipple(_this.ripple);

        _this.ripple = null;
      }
    };

    this.onMove = function (e, isManual) {
      // if (e.cancelable && !isManual) e.preventDefault();
      // throttling
      if (_this.stopFlag) return;
      _this.stopFlag = true;
      setTimeout(function () {
        _this.stopFlag = false;
      }, 100); // assure .clientX、e.clientY exits

      var mouseEvt = _this.supportTouch ? e.changedTouches[0] : e;

      var bound = _this.triggerEl.getBoundingClientRect();

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

        _this.setRotate.apply(_this, _toConsumableArray(rotateData));
      }
    };

    this.inArea = function (mouseEvt, bound) {
      if (mouseEvt.clientX < bound.x || mouseEvt.clientY < bound.y || mouseEvt.clientX > bound.x + bound.width || mouseEvt.clientY > bound.y + bound.height) {
        return false;
      } else {
        return true;
      }
    };

    if (BkEffect.loaded) {
      return;
    }
    BkEffect.loaded = true;
    this.option = _objectSpread({}, defaultconfig, {}, option);
    this.init();
  }

  _createClass(BkEffect, [{
    key: "init",
    value: function init() {
      this.bindUpEvent();
      this.bindDownEvent();
    }
    /* mousedown */

  }, {
    key: "displayRipple",
    value: function displayRipple(el, e) {
      var _this2 = this;

      var mouseEvt = this.supportTouch ? e.changedTouches[0] : e;
      var bound = el.getBoundingClientRect();
      var ripple = document.createElement('div');

      var _this$getOffestPos3 = this.getOffestPos(mouseEvt, bound),
          _this$getOffestPos4 = _slicedToArray(_this$getOffestPos3, 2),
          left = _this$getOffestPos4[0],
          top = _this$getOffestPos4[1];

      var scalew = bound.width * 1.8;
      var scaleh = bound.height * 1.8;
      var max = Math.max(scalew, scaleh);
      ripple.className = 'bk-effect-ripple';
      ripple.style.left = "".concat(left - max / 2, "px");
      ripple.style.top = "".concat(top - max / 2, "px");
      ripple.style.height = "".concat(max, "px");
      ripple.style.width = "".concat(max, "px");
      ripple.setAttribute('data-hold', 1);
      el.appendChild(ripple); // animation

      setTimeout(function () {
        ripple.style.transform = "scale3d(".concat(1, ", ", 1, ", 1)");
        ripple.style.opacity = 0;

        _this2.romoveRipple(ripple);
      }); // used to save elements

      return ripple;
    }
  }, {
    key: "romoveRipple",
    value: function romoveRipple(ripple) {
      var _this3 = this;

      var isHold = +ripple.getAttribute('data-hold');

      if (isHold === 1) {
        ripple.style.opacity = 1;
        setTimeout(function () {
          _this3.romoveRipple(ripple);
        }, 700);
        return;
      } else {
        // not hold, delay 300ms to remove
        setTimeout(function () {
          ripple.style.opacity = 0;
          ripple.style.transition = 'all 0.3s ease-out';
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
      var offsetx = mouseEvt.clientX - bound.x;
      var offsety = mouseEvt.clientY - bound.y;
      return [offsetx, offsety];
    }
    /* 鼠标是否还在触发事件的元素内 | Whether the mouse is still inside the element that triggered the event */

  }, {
    key: "getRotateRatio",

    /* 获取元素倾斜的所需的数据 | Get the required data for the element tilt */
    value: function getRotateRatio(width, height, offsetX, offsetY) {
      var x = this.calcRotateRatio(offsetX / width);
      var y = this.calcRotateRatio(offsetY / height, true);
      var center = x === 0 && y === 0 ? 0.9 : 1;
      return [x, y, center];
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
    value: function setRotate(x, y, center) {
      this.triggerEl.style.transition = '70ms ease-in-out';
      this.triggerEl.style.transformOrigin = '50% 50%';
      this.triggerEl.style.transform = "perspective(400px) rotate3d(".concat(y, ", ").concat(x, ", 0, 16deg) scale3d(").concat(center, ", ").concat(center, ", 1)");
    }
    /* 移除元素倾斜状态 | Remove element tilt state */

  }, {
    key: "removeRotate",
    value: function removeRotate() {
      var _this4 = this;

      if (!this.triggerEl) return;
      this.triggerEl.style.transformOrigin = '';
      this.triggerEl.style.transform = '';
      setTimeout(function () {
        _this4.triggerEl.style.transition = '';
      }, 70);
    }
    /* ======= eventBinder/ utils ↓ ====== */

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
    key: "getCrrentEl",
    value: function getCrrentEl(e) {
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
      return el.className.indexOf(this.option.disabledwinStyle) !== -1;
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

  return BkEffect;
}();

BkEffect.loaded = false;

export default BkEffect;
