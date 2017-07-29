webpackJsonp([8],{

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(12)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(59),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Staffan\\Dropbox\\xampp\\htdocs\\case-site\\resources\\assets\\js\\components\\CreateCase.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CreateCase.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7d455238", Component.options)
  } else {
    hotAPI.reload("data-v-7d455238", Component.options)
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
      caseName: '', //Name of the case
      caseimages: [], //Populated with all case images
      chosenImage: '', //What number picture they choose
      itemlist: [], //populated with all items
      caseinfo: [],
      itemcaselist: [], //populated with the items they choose
      api: '/api/case/', //our api url
      searchInput: '', //If they search by name
      orderSort: 'desc', //What we sort after
      orderBy: 'price', //What is ordered by
      orderByQuality: 'all', //WIP
      nextPage: 1, //To figure out what next page is
      isSubmitDisabled: true, //Is submit disabled yes?no
      maxItems: 10, //How many items a person can pick
      totalOdds: 0, //totalOdds calculated
      totalPrice: 0, //totalPrice calculated
      totalMinus: 0, //Total minus
      loaded: 0 //Used to check if the site is fully loaded
    };
  },
  mounted: function mounted() {
    this.loadImages();
  },

  methods: {
    onCaseName: function onCaseName() {
      Vue.set(this.caseinfo, 'casename', this.caseName);
      this.isSubmitable();
    },
    loadImages: function loadImages() {
      var _this = this;

      axios.get(this.api + 'images', {}).then(function (res) {
        var data = res.data;
        _this.caseimages = _this.caseimages.concat(data);
        _this.loaded++;
      });
    },
    chooseImage: function chooseImage(id) {
      //Set the active class and save what case they picked
      this.chosenImage = id;
      Vue.set(this.caseinfo, 'imageid', id);
      this.isSubmitable();
    },

    //Loads automatically
    onInfinite: function onInfinite() {
      var _this2 = this;

      axios.get(this.api + 'items', {
        //Params for the get request
        params: {
          page: this.nextPage,
          name: this.searchInput,
          order: this.orderSort,
          orderBy: this.orderBy
        }
      }).then(function (res) {
        //We check nextpageurl
        var nextPageUrl = res.data.next_page_url;
        //Returned data
        var data = res.data;

        //Check if there was an error
        if (data.status == 'error') {
          //Complete infiniteloading if an error happened
          _this2.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        } else if (data.data) {
          //Concat all the data down into itemlist
          _this2.itemlist = _this2.itemlist.concat(data.data);
          //Tell infiniteloading we are loading
          _this2.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          //Next page is +=1
          _this2.nextPage += 1;
          //If nextpageurl is null, there are no mo items, tell infinite loading to complete
          if (nextPageUrl == null) {
            _this2.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        } else {
          //If data.data isnt there we complete
          _this2.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        }

        _this2.loaded++;
      });
    },
    onSearchChange: function onSearchChange() {
      var _this3 = this;

      //Set this.itemlist empty to load in new data
      this.itemlist = [];
      //Reset nextpage to load first page
      this.nextPage = 1;
      //Tell infiniteloading to reset and load new data
      this.$nextTick(function () {
        _this3.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      });
    },
    onSearch: function onSearch() {
      this.onSearchChange();
    },
    onSort: function onSort() {
      this.onSearchChange();
    },
    onSortBy: function onSortBy() {
      this.onSearchChange();
    },
    onSortQuality: function onSortQuality() {
      this.onSearchChange();
    },
    onAddItem: function onAddItem(item, index) {
      var _this4 = this;

      //If the value already exists, in case they updated the search etc.
      if (this.itemcaselist.filter(function (obj) {
        return obj.id == item.id;
      }).length > 0) return;
      //If the case is full
      if (this.itemcaselist.length == this.maxItems) return;
      //Remove the item from the array of loaded items
      this.itemlist.splice(index, 1);
      //Add property odds to calculate total odds
      item.odds = 0;
      //Add property pricechange to calculate total price
      item.pricechange = 0;
      //Push the item to the other array to display it under
      this.itemcaselist.push(item);

      //If the itemlist is empty we add next page
      if (this.itemlist == 0) {
        //If we managed to add all items on the current page we tell to load the next one
        this.$nextTick(function () {
          _this4.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        });
      }

      //Put the items into the case info, this.caseinfo.items
      Vue.set(this.caseinfo, 'items', this.itemcaselist);

      //We calculate totals to check if something is off, eg. minus odds
      this.calcTotals();
    },
    onRemoveItem: function onRemoveItem(item, index) {
      //Remove item from array
      this.itemcaselist.splice(index, 1);
      //Push it back to old array
      this.itemlist.push(item);

      //We calculate totals to check if something is off, eg. minus odds
      this.calcTotals();
    },
    calcPrice: function calcPrice(odds, index) {
      //Get price of item
      var price = this.itemcaselist[index].price;
      //If odds is empty set it to 0 programatically
      odds = odds == '' ? 0 : odds;
      //Calculate price change
      price = price / 100 * odds * 1.15;
      //Update array via vue to keep the binding
      Vue.set(this.itemcaselist[index], 'pricechange', price);
      Vue.set(this.itemcaselist[index], 'odds', odds);

      //Calcuate totals
      this.calcTotals();
    },
    isSubmitable: function isSubmitable() {
      this.isSubmitDisabled = this.totalMinus == 0 && this.totalOdds == 100 && this.itemcaselist.length >= 2 ? false : true;
    },
    calcTotals: function calcTotals() {
      var _this5 = this;

      //We set all to 0 everytime to reset them
      this.totalPrice = 0;
      this.totalOdds = 0;
      this.totalMinus = 0;
      this.itemcaselist.map(function (q) {
        _this5.totalPrice += parseFloat(q.pricechange);
        _this5.totalOdds += parseFloat(q.odds);
        _this5.totalMinus += parseFloat(q.odds) < 0 ? 1 : 0;
      });
      this.isSubmitable();
    },
    onSubmit: function onSubmit() {
      var _this6 = this;

      if (this.caseName == '') {
        location.hash = "#";
        location.hash = "#caseName";
        return;
      };
      if (this.chosenImage == '') {
        location.hash = "#";
        location.hash = "#caseImages";
        return;
      };
      if (this.isSubmitDisabled) return;

      var data = Object.assign({}, this.caseinfo);

      axios.post(this.api + 'create', {
        case: data
      }).then(function (res) {
        _this6.$router.push('/case/' + res.data.message);
      }).catch(function (err) {});
    }
  }
});

/***/ }),

/***/ 59:
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
      value: (_vm.loaded > 1),
      expression: "loaded > 1"
    }],
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-lg-12"
  }, [_c('div', {
    staticClass: "row itemName"
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "col-lg-6 col-md-6 col-sm-6 col-xs-12 content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.caseName),
      expression: "caseName"
    }],
    staticClass: "form-control input50",
    attrs: {
      "id": "caseName",
      "name": "query",
      "placeholder": "Enter a name"
    },
    domProps: {
      "value": (_vm.caseName)
    },
    on: {
      "change": _vm.onCaseName,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.caseName = $event.target.value
      }
    }
  })])]), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "caseImages"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-lg-1 col-md-1 hidden-sm hidden-xs"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-lg-11 col-md-11 col-sm-11 col-xs-12 container"
  }, [_c('div', {
    staticClass: "row"
  }, _vm._l((_vm.caseimages), function(item, index) {
    return _c('div', {
      staticClass: "col-xs-12 col-sm-6 col-md-4 col-lg-3",
      attrs: {
        "id": "caseImages"
      }
    }, [_c('div', {
      staticClass: "caseCaption",
      class: {
        active: _vm.chosenImage == item.id
      },
      on: {
        "click": function($event) {
          _vm.chooseImage(item.id)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": item.imageurl
      }
    })])])
  }))])])]), _vm._v(" "), _c('div', {
    staticClass: "itemSearch"
  }, [_c('div', {
    staticClass: "row"
  }, [_vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "col-lg-11 col-md-11 col-sm-11 col-xs-12"
  }, [_c('div', {
    staticClass: "row content"
  }, [_c('div', {
    staticClass: "col-lg-3 col-md-3 col-sm-3 col-xs-12"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchInput),
      expression: "searchInput"
    }],
    staticClass: "search form-control",
    attrs: {
      "name": "query",
      "placeholder": "Search"
    },
    domProps: {
      "value": (_vm.searchInput)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.onSearch($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchInput = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-3 col-md-3 col-sm-3 col-xs-12"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.orderBy),
      expression: "orderBy"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "inputType"
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.orderBy = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.onSortBy]
    }
  }, [_c('option', {
    attrs: {
      "value": "price"
    }
  }, [_vm._v("Price")]), _vm._v(">\n                  "), _c('option', {
    attrs: {
      "value": "name"
    }
  }, [_vm._v("Name")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-3 col-md-3 col-sm-3 col-xs-12"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.orderSort),
      expression: "orderSort"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "inputSort"
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.orderSort = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.onSort]
    }
  }, [_c('option', {
    attrs: {
      "value": "desc"
    }
  }, [_vm._v("DESC")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "asc"
    }
  }, [_vm._v("ASC")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-3 col-md-3 col-sm-3 col-xs-12"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.orderByQuality),
      expression: "orderByQuality"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "inputType"
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.orderByQuality = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.onSortQuality]
    }
  }, [_c('option', {
    attrs: {
      "value": "all"
    }
  }, [_vm._v("All")])])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "row item"
  }, [_c('div', {
    staticClass: "col-lg-1 col-md-1 hidden-sm hidden-xs"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-lg-11 col-md-11 col-sm-11 col-xs-12 container"
  }, [_c('div', {
    staticClass: "row"
  }, _vm._l((_vm.itemlist), function(item, index) {
    return _c('div', {
      staticClass: "col-lg-2 col-md-4 col-sm-4 col-xs-6",
      on: {
        "click": function($event) {
          _vm.onAddItem(item, index)
        }
      }
    }, [_c('div', {
      staticClass: "thumbnail"
    }, [_c('div', {
      staticClass: "caption-img"
    }, [_c('img', {
      attrs: {
        "src": item.imageurl
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "caption"
    }, [_c('h5', {
      domProps: {
        "textContent": _vm._s(item.market_name)
      }
    }), _vm._v(" "), _c('p', {
      domProps: {
        "textContent": _vm._s(item.price)
      }
    })])])])
  })), _vm._v(" "), _c('infinite-loading', {
    ref: "infiniteLoading",
    attrs: {
      "spinner": "waveDots",
      "on-infinite": _vm.onInfinite
    }
  }, [_c('span', {
    slot: "no-more"
  }, [_vm._v("\n              Nothing found\n            ")])])], 1)]), _vm._v(" "), _vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "row items"
  }, [_c('div', {
    staticClass: "col-lg-1 col-md-1 hidden-sm hidden-xs"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-lg-11 col-md-11 col-sm-11 col-xs-12 itemlist"
  }, [(_vm.itemcaselist.length > 0) ? _c('table', {
    staticClass: "table table-striped"
  }, [_vm._m(5), _vm._v(" "), _vm._l((_vm.itemcaselist), function(item, index) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(item.market_name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.price))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.pricechange.toFixed(2)))]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.odds),
        expression: "item.odds"
      }],
      staticClass: "form-control",
      attrs: {
        "placeholder": "Insert",
        "autofocus": "",
        "min": "0.00001",
        "max": "100",
        "step": "1",
        "type": "number"
      },
      domProps: {
        "value": (item.odds)
      },
      on: {
        "keyup": function($event) {
          _vm.calcPrice(item.odds, index)
        },
        "input": function($event) {
          if ($event.target.composing) { return; }
          item.odds = $event.target.value
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })]), _vm._v(" "), _c('td', {
      staticClass: "text-center",
      on: {
        "click": function($event) {
          _vm.onRemoveItem(item, index)
        }
      }
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-trash",
      attrs: {
        "aria-hidden": "true"
      }
    })])])
  }), _vm._v(" "), _c('tr', [_c('td'), _vm._v(" "), _c('td'), _vm._v(" "), _c('td', [_c('span', [_vm._v("Total " + _vm._s(_vm.totalPrice.toFixed(2)))])]), _vm._v(" "), _c('td', [_c('span', [_vm._v("Odds " + _vm._s(_vm.totalOdds))])]), _vm._v(" "), _c('td')])], 2) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "row errors"
  }, [_c('div', {
    staticClass: "col-lg-1 col-md-1 hidden-sm hidden-xs"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-lg-11 col-md-11 col-sm-11 col-xs-12"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-lg-6 col-md-6 col-sm-6 col-xs-12"
  }, [(this.caseName == '') ? _c('div', {
    staticClass: "alert alert-danger",
    attrs: {
      "role": "alert"
    }
  }, [_c('a', {
    staticClass: "alert-link",
    attrs: {
      "href": "#caseName"
    }
  }, [_vm._v("You forgot a casename")])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-6 col-md-6 col-sm-6 col-xs-12"
  }, [(this.chosenImage == '') ? _c('div', {
    staticClass: "alert alert-danger",
    attrs: {
      "role": "alert"
    }
  }, [_c('a', {
    staticClass: "alert-link",
    attrs: {
      "href": "#caseImages"
    }
  }, [_vm._v("You have to pick a picture")])]) : _vm._e()])])])]), _vm._v(" "), _c('div', {
    staticClass: "row errors"
  }, [_c('div', {
    staticClass: "col-lg-1 col-md-1 hidden-sm hidden-xs"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-lg-2 col-md-2 col-sm-2 col-xs-12"
  }, [(_vm.itemcaselist.length < 2) ? _c('div', {
    staticClass: "alert alert-danger",
    attrs: {
      "role": "alert"
    }
  }, [_vm._v("Choose at least 2 items")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-2 col-md-2 col-sm-2 col-xs-12"
  }, [((_vm.totalOdds < 100 || _vm.totalOdds > 100) && _vm.itemcaselist.length > 1) ? _c('div', {
    staticClass: "alert alert-danger",
    attrs: {
      "role": "alert"
    }
  }, [_vm._v("Odds need to be combined 100")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-2 col-md-2 col-sm-2 col-xs-12"
  }, [(_vm.totalMinus == 1) ? _c('div', {
    staticClass: "alert alert-danger",
    attrs: {
      "role": "alert"
    }
  }, [_vm._v("One odds is below minus")]) : (_vm.totalMinus > 1) ? _c('div', {
    staticClass: "alert alert-danger",
    attrs: {
      "role": "alert"
    }
  }, [_vm._v("Several odds is below minus")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-2 col-md-2 col-sm-2 col-xs-12"
  }, [(_vm.itemcaselist.length == _vm.maxItems) ? _c('div', {
    staticClass: "alert alert-danger",
    attrs: {
      "role": "alert"
    }
  }, [_vm._v("Max item reached")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right"
  }, [_c('button', {
    staticClass: "btn btn-success",
    attrs: {
      "disabled": _vm.isSubmitDisabled,
      "type": "submit"
    },
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("Submit")])])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-lg-1 col-md-1 hidden-sm hidden-xs"
  }, [_c('div', {
    staticClass: "createItemHeader text-center"
  }, [_vm._v("1")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-lg-5 col-md-5 col-sm-5 col-xs-12 content"
  }, [_c('span', [_vm._v("Name your case")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "caseImageHeader"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-lg-1 col-md-1 hidden-sm hidden-xs"
  }, [_c('div', {
    staticClass: "createItemHeader text-center"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-11 col-md-11 col-sm-11 col-xs-12 content"
  }, [_c('span', [_vm._v("Choose an image your case")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-lg-1 col-md-1 hidden-sm hidden-xs"
  }, [_c('div', {
    staticClass: "createItemHeader text-center"
  }, [_vm._v("3")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row itemHeader"
  }, [_c('div', {
    staticClass: "col-lg-1 col-md-1 hidden-sm hidden-xs"
  }, [_c('div', {
    staticClass: "createItemHeader text-center"
  }, [_vm._v("4")])]), _vm._v(" "), _c('div', {
    staticClass: "col-lg-11 col-md-11 col-sm-11 col-xs-12 content"
  }, [_c('span', [_vm._v("Set the drop rates")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('td', {
    staticClass: "header col-lg-4 col-md-4 col-sm-4 col-xs-4"
  }, [_vm._v("Name")]), _vm._v(" "), _c('td', {
    staticClass: "header col-lg-2 col-md-2 col-sm-2 col-xs-2"
  }, [_vm._v("Price")]), _vm._v(" "), _c('td', {
    staticClass: "header col-lg-2 col-md-2 col-sm-2 col-xs-2"
  }, [_vm._v("Price change")]), _vm._v(" "), _c('td', {
    staticClass: "header col-lg-2 col-md-2 col-sm-2 col-xs-2"
  }, [_vm._v("% Drop rates")]), _vm._v(" "), _c('td', {
    staticClass: "col-lg-2 col-md-2 col-sm-2 col-xs-2"
  })])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7d455238", module.exports)
  }
}

/***/ })

});