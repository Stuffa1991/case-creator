webpackJsonp([4],{

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(12)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(60),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Staffan\\Dropbox\\xampp\\htdocs\\case-site\\resources\\assets\\js\\components\\Case.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Case.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5873cfc8", Component.options)
  } else {
    hotAPI.reload("data-v-5873cfc8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            api: '/api/case/', //our api url
            caseName: '',
            casePrice: '',
            caseId: this.$route.params.id,
            items: [], //Items in the case
            caseItems: [], //Items in the case animation window
            repeatItems: 40, //Repeats winning items x amount of time
            fakeItems: 30, //How many items to fake spinning by before hitting
            widthImg: 124, //Width of input pictures
            lengthInPx: 0, //Width of the entire animation container in px - is automatically set
            wonItem: '', //In px what number you won - is automatically set
            itemWon: '', //To show information about the item won - Dont touch
            animDuration: 5, //How long should the roll animation be
            winnerDuration: 0.5, //How long it should take for it to be on the winning item after the animation
            spinStyle: {}, //To dynamically change the style
            rollDisabled: true, //To disable enable the open case button
            loaded: 0,
            itemStyle: { border: '1px solid #eee;' },
            absoluteZero: 311, //Where the selector meets the first edge of a img - in px
            showWin: false //Show winner css
        };
    },
    mounted: function mounted() {
        this.loadCase();
    },

    methods: {
        loadCase: function loadCase() {
            var _this = this;

            axios.get(this.api + 'get/' + this.caseId).then(function (res) {
                //Case Price
                _this.casePrice = res.data.totalPrice.toFixed(3);
                //Case Name
                _this.caseName = res.data.name;
                //Case items information
                _this.items = _this.items.concat(res.data.items);

                //We do this to make sure the item its defaulted on is pushed a little so they dont see the edge on the right
                _this.wonItem = _this.absoluteZero - _this.widthImg * _this.items.length * 2 - _this.widthImg / 2;

                //We need to make a new array for 
                _this.makeArray(function (newArray) {
                    //Populate case items
                    _this.caseItems = newArray;
                    //Get container width
                    _this.lengthInPx = _this.caseItems.length * _this.widthImg;

                    //Set the animation
                    _this.setRollStyle();
                    //Enable open case
                    _this.rollDisabled = false;
                    //This request has been loaded
                    _this.loaded++;
                });
            });
        },
        makeArray: function makeArray(callback) {
            //We create a new array to populate the case animation row
            var newArray = [];
            for (var i = 0; i < this.repeatItems; i++) {
                newArray.push.apply(newArray, this.items);
            }

            callback(newArray);
        },
        resetAnimate: function resetAnimate() {
            //We style the object to make it reset
            this.spinStyle = {
                transform: 'translateX(0)',
                transition: 'all ease 0s'
            };
        },
        setRollStyle: function setRollStyle() {
            //We style the object to make it spin
            this.spinStyle = {
                width: this.lengthInPx + 'px',
                transform: 'translateX(' + this.wonItem + 'px)',
                transition: 'all cubic-bezier(0.075, 0.800, 0.17, 1.000) ' + this.animDuration + 's'
            };
        },
        setWinnerStyle: function setWinnerStyle(fixedRoll) {
            var _this2 = this;

            //We style the object to make it spin
            this.spinStyle = {
                width: this.lengthInPx + ' px',
                transform: 'translateX(' + fixedRoll + 'px)',
                transition: 'all ease ' + this.winnerDuration + 's'
            };

            //Show winner animation when its done going onto the item
            setTimeout(function () {
                //Enable opening the case again
                _this2.rollDisabled = false;
                //Show winner stuff
                _this2.showWin = true;
            }, this.winnerDuration * 1000 + 100);
        },
        openCase: function openCase() {
            var _this3 = this;

            axios.get(this.api + 'open/' + this.caseId, {}).then(function (res) {
                if (res.data.status == 'error') {
                    //A unknown error happened
                } else {
                    document.getElementById('userBalance').textContent = res.data.message.balance.toFixed(2);

                    //index of the won item
                    var itemIndex = res.data.message.index;

                    //Info about weapon
                    _this3.itemWon = res.data.message.item.iteminfo;
                    //Roll the item with index
                    _this3.rollItem(itemIndex);
                    console.log(res.data);
                }
            });
        },
        rollItem: function rollItem(index) {
            var _this4 = this;

            //We disabled the button
            this.rollDisabled = true;
            this.showWin = false;

            //Index eg. 2 * imageWidth -1 for border + absoluteZero of div - This is slightly static rolls but meh
            var minRoll = -(index * this.widthImg) + this.absoluteZero + this.widthImg;
            var maxRoll = minRoll - this.widthImg;

            //we add 10 px to just make it never land on the border
            var minRollMargin = minRoll - 10;
            var maxRollMargin = maxRoll + 10;

            //Reset animation
            this.resetAnimate();

            //We fake some rolls to make it spin nice
            var fakeRoll = -(this.fakeItems * this.items.length * this.widthImg);

            //Math random a minRoll between maxRoll
            var randomRoll = Math.floor(Math.random() * (maxRollMargin - minRollMargin + 1) + minRollMargin);

            //The random between for the item and fake roll
            this.wonItem = randomRoll + fakeRoll;

            //We fix a roll to the center of the item - this is to make sure nobody gets confused Using initial values to make it actually center
            var fixedRoll = (minRoll + maxRoll) / 2 + fakeRoll;

            //Hack to make sure browser see's changes
            setTimeout(function () {
                //Set animation styling
                _this4.setRollStyle();

                //Execute the winner animation after roll is done
                setTimeout(function () {
                    _this4.setWinnerStyle(fixedRoll);
                }, _this4.animDuration * 1000 + 1000);
            }, 0);
        }
    }
});

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loaded == 0),
      expression: "loaded == 0"
    }],
    staticClass: "row"
  }, [_c('loader')], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loaded == 1),
      expression: "loaded == 1"
    }],
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-lg-12 col-md-12 col-sm-12 col-xs-12"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-lg-10 col-md-10 col-sm-12 col-xs-12"
  }, [_c('div', {
    staticClass: "openingSpinner"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showWin),
      expression: "showWin"
    }],
    staticClass: "top-win"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showWin),
      expression: "showWin"
    }],
    staticClass: "bottom-win"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showWin),
      expression: "showWin"
    }],
    staticClass: "pre-win"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showWin),
      expression: "showWin"
    }],
    staticClass: "win"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showWin),
      expression: "showWin"
    }],
    staticClass: "after-win"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.showWin),
      expression: "!showWin"
    }],
    staticClass: "selected"
  }), _vm._v(" "), _c('div', {
    staticClass: "scrollBox",
    style: (_vm.spinStyle)
  }, _vm._l((_vm.caseItems), function(item) {
    return _c('div', {
      staticClass: "potentialWinning",
      class: item.iteminfo.type,
      style: (_vm.itemStyle)
    }, [_c('div', {
      staticClass: "caseContent"
    }, [_c('h4', {
      staticClass: "name"
    }, [_vm._v(_vm._s(item.iteminfo.market_name))]), _vm._v(" "), _c('img', {
      staticClass: "image",
      attrs: {
        "src": item.iteminfo.imageurl
      }
    })])])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "openSection"
  }, [_c('button', {
    staticClass: "btn btn-success",
    attrs: {
      "type": "button",
      "disabled": _vm.rollDisabled
    },
    on: {
      "click": _vm.openCase
    }
  }, [_vm._v("Open Case")])]), _vm._v(" "), _c('div', {
    staticClass: "potentialWinnings"
  }, [_c('div', {
    staticClass: "heading"
  }, [_c('h3', {
    staticClass: "itemsInCase"
  }, [_vm._v(" " + _vm._s(_vm.items.length) + " Items in this case ")])]), _vm._v(" "), _c('div', {
    staticClass: "potentialItems"
  }, _vm._l((_vm.items), function(item) {
    return _c('div', {
      staticClass: "potentialWinning",
      class: item.iteminfo.type
    }, [_c('div', {
      staticClass: "caseContent"
    }, [_c('h4', {
      staticClass: "name"
    }, [_vm._v(_vm._s(item.iteminfo.market_name))]), _vm._v(" "), _c('img', {
      staticClass: "image",
      attrs: {
        "src": item.iteminfo.imageurl
      }
    }), _vm._v(" "), _c('h4', {
      staticClass: "percentage"
    }, [_vm._v(_vm._s(item.percentage) + "%")])])])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-2 col-md-2 col-sm-12 col-xs-12"
  }, [_c('h4', [_vm._v(" " + _vm._s(_vm.caseName))]), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(_vm.casePrice) + "$")])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5873cfc8", module.exports)
  }
}

/***/ })

});