webpackJsonp([6],{

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(12)(
  /* script */
  __webpack_require__(68),
  /* template */
  __webpack_require__(69),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Staffan\\Dropbox\\xampp\\htdocs\\case-site\\resources\\assets\\js\\components\\NotFound.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] NotFound.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d0563db", Component.options)
  } else {
    hotAPI.reload("data-v-6d0563db", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 68:
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center"
  }, [_c('h2', [_vm._v("404 Not Found")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6d0563db", module.exports)
  }
}

/***/ })

});