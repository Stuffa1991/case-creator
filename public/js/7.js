webpackJsonp([7],{

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(12)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(60),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Staffan\\Dropbox\\xampp\\htdocs\\case-site\\resources\\assets\\js\\components\\MyAccount.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MyAccount.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8d1f71b6", Component.options)
  } else {
    hotAPI.reload("data-v-8d1f71b6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 55:
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
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            api: '/api/user/', //our api url
            loaded: 0,
            user: {}
        };
    },
    mounted: function mounted() {
        this.loadUser();
    },

    methods: {
        loadUser: function loadUser() {
            var _this = this;

            axios.get(this.api).then(function (res) {
                _this.loaded++;

                _this.user = res.data;
            });
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
  }, [_c('h3', [_vm._v("Active winnings")]), _vm._v(" "), _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.user.has_items), function(item) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(item.iteminfo.market_name))]), _vm._v(" "), _c('td'), _vm._v(" "), _c('td')])
  }))])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-12 col-md-12 col-sm-12 col-xs-12"
  }, [_c('h3', [_vm._v("Transactions")]), _vm._v(" "), _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('table', {
    staticClass: "table"
  }, [_vm._m(1), _vm._v(" "), _c('tbody', _vm._l((_vm.user.transactions), function(transaction) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(transaction.action))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(transaction.amount))])])
  }))])])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("Name")]), _vm._v(" "), _c('th', [_vm._v("Sell")]), _vm._v(" "), _c('th', [_vm._v("Withdraw")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("Action")]), _vm._v(" "), _c('th', [_vm._v("Amount")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8d1f71b6", module.exports)
  }
}

/***/ })

});