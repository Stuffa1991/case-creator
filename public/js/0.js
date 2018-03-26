webpackJsonp([0],{

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(13)(
  /* script */
  __webpack_require__(60),
  /* template */
  __webpack_require__(61),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\enema\\Desktop\\Dev\\case-creator\\resources\\assets\\js\\components\\PopularCases.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PopularCases.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-003306cd", Component.options)
  } else {
    hotAPI.reload("data-v-003306cd", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 60:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            cases: [],
            api: '/api/case/', //our api url
            loaded: 0
        };
    },
    mounted: function mounted() {
        this.loadCases();
    },

    methods: {
        loadCases: function loadCases() {
            var _this = this;

            axios.get(this.api + 'all').then(function (res) {
                _this.cases = _this.cases.concat(res.data);

                _this.loaded++;
            });
        }
    }
});

/***/ }),

/***/ 61:
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
  }, _vm._l((_vm.cases), function(item, index) {
    return _c('div', {
      staticClass: "col-lg-4"
    }, [_c('router-link', {
      attrs: {
        "to": '/case/' + item.id
      }
    }, [_vm._v(_vm._s(item.name))])], 1)
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-003306cd", module.exports)
  }
}

/***/ })

});