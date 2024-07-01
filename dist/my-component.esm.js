import axios$1 from 'axios';
import _$1 from 'lodash';
import moment$1 from 'moment';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'Modal',
	props: {
		title: String,
		cancelBtnTxt: {
			type: String,
			default: function default$1 () {
				return 'Close'
			}
		},
		cancelDeleteBtnTxt: {
			type: String,
			default: function default$2 () {
				return 'Cancel'
			}
		},
		classes: {
			type: Object,
			default: function default$3 () {
				return {}
			}
		},
		deleteBtnTxt: {
			type: String,
			default: function default$4 () {
				return 'Yes, Delete'
			}
		},
		hasDelete: {
			type: Boolean,
			default: function default$5 () {
				return false;
			}
		},
		okBtnTxt: {
			type: String,
			default: function default$6 () {
				return 'Okay'
			}
		},
		okCb: {
			type: Function,
			default: function default$7 () {
				return true;
			}
		},
		template: Object
	},
	computed: {
		notConfirmDelete: function notConfirmDelete () {
			return this.confirmDelete !== true;
		}
	},
	data: function data () {
		return {
			confirmDelete: false
		}
	},
	methods: {
		cancelDelete: function cancelDelete () {
			this.confirmDelete = false;
		},
		closeModal: function closeModal () {
			this.$emit('cancelclicked');
		},
		deleteClicked: function deleteClicked () {
			this.$emit('deleteclicked');
		},
		okClicked: function okClicked () {
			if (this.okCb) {
				this.okCb();
			}
			this.$emit('okclicked');
		},
		showConfirmDelete: function showConfirmDelete () {
			this.confirmDelete = true;
		}
	}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [
    _c("div", { staticClass: "modal-backdrop" }),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal builder-modal",
        class: _vm.classes,
        attrs: { id: "save-warning" }
      },
      [
        _c("div", { staticClass: "modal-header" }, [
          _c("h3", [_vm._v(_vm._s(_vm.title))]),
          _vm._v(" "),
          _vm.hasDelete && _vm.notConfirmDelete
            ? _c(
                "div",
                {
                  staticClass: "delete-btn",
                  on: { click: _vm.showConfirmDelete }
                },
                [
                  _c("svg", { staticClass: "nicon nicon-outline" }, [
                    _c("use", {
                      attrs: { href: "#nicon-bin", "xlink:href": "#nicon-bin" }
                    })
                  ])
                ]
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "modal-body" }, [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.notConfirmDelete,
                  expression: "notConfirmDelete"
                }
              ]
            },
            [_vm._t("default")],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.confirmDelete,
                  expression: "confirmDelete"
                }
              ]
            },
            [
              _c("div", { staticClass: "alert alert-danger" }, [
                _c("svg", { staticClass: "nicon nicon-outline" }, [
                  _c("use", {
                    attrs: {
                      href: "#nicon-warning-sign",
                      "xlink:href": "#nicon-warning-sign"
                    }
                  })
                ]),
                _vm._v(" Are you sure you want to delete this item?")
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "modal-footer with-groups" }, [
          _vm.confirmDelete
            ? _c("div", { staticClass: "modal-footer-right" }, [
                _c(
                  "a",
                  {
                    staticClass: "btn",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.cancelDelete($event)
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.cancelDeleteBtnTxt))]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-danger",
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.deleteClicked($event)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n          " + _vm._s(_vm.deleteBtnTxt) + "\n        "
                    )
                  ]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.notConfirmDelete
            ? _c("div", { staticClass: "modal-footer-right" }, [
                _c(
                  "a",
                  {
                    staticClass: "btn",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.closeModal($event)
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.cancelBtnTxt))]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    attrs: { id: "ok-btn" },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.okClicked($event)
                      }
                    }
                  },
                  [_vm._v("\n          " + _vm._s(_vm.okBtnTxt) + "\n        ")]
                )
              ])
            : _vm._e()
        ])
      ]
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-8392f5e8_0", { source: "\n.modal-backdrop[data-v-8392f5e8] {\n\topacity: 0.8;\n\tposition: fixed;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\tz-index: 1040;\n\tbackground-color: #232323;\n}\n.alert.alert-danger svg[data-v-8392f5e8] {\n\tcolor: #e61922;\n\tstroke: #e61922;\n\theight: 18px;\n\twidth: 18px;\n\ttop: 4px;\n\tposition: relative;\n}\n.delete-btn svg[data-v-8392f5e8] {\n\tcolor: #dba571;\n\tstroke: #dba571;\n\theight: 20px;\n\twidth: 20px;\n}\n.modal.builder-modal[data-v-8392f5e8] {\n\t border: none;\n}\n.modal.builder-modal.nopadding .modal-body[data-v-8392f5e8] {\n\t padding: 0;\n}\n.modal.builder-modal.wide[data-v-8392f5e8] {\n\t width: 800px;\n\t margin-left: -400px;\n}\n.modal.builder-modal.video-wide[data-v-8392f5e8] {\n\t width: 640px;\n\t margin-left: -300px;\n}\n.modal.builder-modal .modal-header[data-v-8392f5e8] {\n\t position: relative;\n\t border-bottom: none;\n}\n.modal.builder-modal .modal-header .delete-btn[data-v-8392f5e8] {\n\t position: absolute;\n\t right: 15px;\n\t top: 15px;\n\t width: 20px;\n\t height: 20px;\n\t color: #dba571;\n\t cursor: pointer;\n}\n.modal.builder-modal .modal-scroll-section[data-v-8392f5e8] {\n\t max-height: 320px;\n\t overflow-y: auto;\n}\n.modal.builder-modal .modal-scroll-section.min[data-v-8392f5e8] {\n\t min-height: 320px;\n}\n.modal.builder-modal .modal-body input.max[data-v-8392f5e8] {\n\t width: 100%;\n\t box-sizing: border-box;\n\t padding: 15px 5px !important;\n}\n.modal.builder-modal .modal-body .add-file-options[data-v-8392f5e8] {\n\t text-align: center;\n\t padding: 8px;\n\t margin: 8px;\n}\n.modal.builder-modal .modal-tabs[data-v-8392f5e8] {\n\t display: flex;\n\t height: 40px;\n\t background: #38737b;\n\t margin-bottom: 10px;\n}\n.modal.builder-modal .modal-tabs .modal-tab[data-v-8392f5e8] {\n\t flex: 1;\n\t display: block;\n\t height: 40px;\n\t padding: 0 10px;\n\t line-height: 40px;\n\t text-transform: uppercase;\n\t text-align: center;\n\t color: #fff;\n\t text-decoration: none;\n\t cursor: pointer;\n}\n.modal.builder-modal .modal-tabs .modal-tab.selected[data-v-8392f5e8] {\n\t background: #5a9aa8;\n}\n.modal.builder-modal .modal-tabs .modal-tab.disabled[data-v-8392f5e8] {\n\t background-color: #e1e1e1;\n\t color: #999;\n}\n.modal.builder-modal .new-modal-section[data-v-8392f5e8] {\n\t padding-bottom: 10px;\n}\n.modal.builder-modal .new-modal-section select[data-v-8392f5e8] {\n\t width: 530px;\n}\n.modal.builder-modal .new-modal-section input.calcuation[data-v-8392f5e8] {\n\t width: 500px;\n}\n.modal.builder-modal .new-modal-section textarea.lg[data-v-8392f5e8] {\n\t padding: 5px;\n\t font-size: 12px;\n\t margin: 0;\n\t box-sizing: border-box;\n\t width: 100%;\n\t height: 80px;\n\t border-width: 1px;\n}\n.modal.builder-modal .question-tags-section[data-v-8392f5e8] {\n\t margin-top: 20px;\n}\n.modal.builder-modal .question-tags-list[data-v-8392f5e8] {\n\t list-style: none;\n\t padding: 0;\n\t margin: 0;\n}\n.modal.builder-modal .question-tags-list li[data-v-8392f5e8] {\n\t display: inline-block;\n\t margin-right: 20px;\n}\n.modal.builder-modal .question-tags-list li label[data-v-8392f5e8] {\n\t font-family: Helvetica, Arial, sans-serif;\n\t text-transform: none;\n}\n.modal.builder-modal .modal-positioning[data-v-8392f5e8] {\n\t display: flex;\n}\n.modal.builder-modal .modal-positioning .modal-positioning-gutter[data-v-8392f5e8] {\n\t width: 20px;\n}\n.modal.builder-modal .modal-positioning .modal-positioning-gutter.sm[data-v-8392f5e8] {\n\t width: 10px;\n}\n.modal.builder-modal .modal-positioning .modal-positioning-side[data-v-8392f5e8] {\n\t flex: 1;\n}\n.modal.builder-modal .modal-positioning .modal-positioning-side.w-33[data-v-8392f5e8] {\n\t flex: 0 0 33%;\n}\n.modal.builder-modal .modal-positioning .modal-positioning-side select[data-v-8392f5e8] {\n\t width: 100%;\n}\n.modal.builder-modal .dropdown-items[data-v-8392f5e8] {\n\t width: 100%;\n}\n.modal.builder-modal .dropdown-items .dropdown-items-head[data-v-8392f5e8] {\n\t width: 100%;\n\t display: flex;\n}\n.modal.builder-modal .dropdown-items .dropdown-item[data-v-8392f5e8] {\n\t width: 100%;\n\t display: flex;\n}\n.modal.builder-modal .dropdown-items .dropdown-items-body[data-v-8392f5e8] {\n\t border-bottom: 1px solid #eeefee;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt[data-v-8392f5e8] {\n\t border: 1px solid #eeefee;\n\t border-bottom: none;\n\t border-right: none;\n\t padding: 5px 8px;\n\t box-sizing: border-box;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt[data-v-8392f5e8]:last-child {\n\t border-right: 1px solid #eeefee;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.option[data-v-8392f5e8] {\n\t flex: 1;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.option input.text[data-v-8392f5e8] {\n\t width: 337px;\n\t margin: 0;\n\t border-width: 1px;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.th[data-v-8392f5e8] {\n\t font-size: 11px;\n\t font-color: #999;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.in-out[data-v-8392f5e8], .modal.builder-modal .dropdown-items .dropdown-item-opt.dragger[data-v-8392f5e8] {\n\t width: 30px;\n\t text-align: center;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.rangeval[data-v-8392f5e8] {\n\t width: 173px;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.rangeval input[data-v-8392f5e8] {\n\t border-width: 1px;\n\t width: 144px;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.in-out[data-v-8392f5e8] {\n\t padding: 5px 0;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.in-out input[data-v-8392f5e8] {\n\t position: relative;\n\t top: 4px;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.in-out svg[data-v-8392f5e8] {\n\t position: relative;\n\t top: 6px;\n\t cursor: pointer;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.in-out input.opt-val[data-v-8392f5e8] {\n\t padding: 1px !important;\n\t border-width: 1px;\n\t width: 21px !important;\n\t height: 16px !important;\n\t font-size: 10px;\n\t text-align: center;\n\t position: relative;\n\t top: 6px;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.dragger[data-v-8392f5e8] {\n\t padding: 0;\n}\n.modal.builder-modal .dropdown-items .dropdown-item-opt.dragger svg[data-v-8392f5e8] {\n\t position: relative;\n\t top: 11px;\n}\n.modal.builder-modal .dropdown-items .dropdown-items-footer[data-v-8392f5e8] {\n\t text-align: right;\n\t padding-top: 10px;\n}\n.modal.builder-modal .dropdown-items .dropdown-items-footer a svg[data-v-8392f5e8] {\n\t fill: #5a9aa8;\n\t height: 30px;\n\t width: 30px;\n}\n.modal.builder-modal .modal-footer.with-groups[data-v-8392f5e8] {\n\t display: flex;\n}\n.modal.builder-modal .modal-footer.with-groups .modal-footer-left[data-v-8392f5e8] {\n\t flex: 1;\n\t text-align: left;\n}\n.modal.builder-modal .modal-footer.with-groups .modal-footer-right[data-v-8392f5e8] {\n\t flex: 1;\n\t text-align: right;\n}\n.modal.builder-modal .modal-footer.with-groups .btn[data-v-8392f5e8] {\n\t height: 60px;\n\t padding: 0 20px;\n\t line-height: 60px;\n\t border: none;\n\t margin: 0;\n}\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/Modal.vue"],"names":[],"mappings":";AAqHA;CACA,YAAA;CACA,eAAA;CACA,MAAA;CACA,QAAA;CACA,SAAA;CACA,OAAA;CACA,aAAA;CACA,yBAAA;AACA;AACA;CACA,cAAA;CACA,eAAA;CACA,YAAA;CACA,WAAA;CACA,QAAA;CACA,kBAAA;AACA;AACA;CACA,cAAA;CACA,eAAA;CACA,YAAA;CACA,WAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,YAAA;EACA,mBAAA;AACA;AACA;EACA,YAAA;EACA,mBAAA;AACA;AACA;EACA,kBAAA;EACA,mBAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;EACA,eAAA;AACA;AACA;EACA,iBAAA;EACA,gBAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,WAAA;EACA,sBAAA;EACA,4BAAA;AACA;AACA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;AACA;AACA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;EACA,mBAAA;AACA;AACA;EACA,OAAA;EACA,cAAA;EACA,YAAA;EACA,eAAA;EACA,iBAAA;EACA,yBAAA;EACA,kBAAA;EACA,WAAA;EACA,qBAAA;EACA,eAAA;AACA;AACA;EACA,mBAAA;AACA;AACA;EACA,yBAAA;EACA,WAAA;AACA;AACA;EACA,oBAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,YAAA;EACA,eAAA;EACA,SAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AACA;AACA;EACA,gBAAA;AACA;AACA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;AACA;AACA;EACA,qBAAA;EACA,kBAAA;AACA;AACA;EACA,yCAAA;EACA,oBAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,WAAA;EACA,aAAA;AACA;AACA;EACA,WAAA;EACA,aAAA;AACA;AACA;EACA,gCAAA;AACA;AACA;EACA,yBAAA;EACA,mBAAA;EACA,kBAAA;EACA,gBAAA;EACA,sBAAA;AACA;AACA;EACA,+BAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,YAAA;EACA,SAAA;EACA,iBAAA;AACA;AACA;EACA,eAAA;EACA,gBAAA;AACA;AACA;EACA,WAAA;EACA,kBAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,iBAAA;EACA,YAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,kBAAA;EACA,QAAA;AACA;AACA;EACA,kBAAA;EACA,QAAA;EACA,eAAA;AACA;AACA;EACA,uBAAA;EACA,iBAAA;EACA,sBAAA;EACA,uBAAA;EACA,eAAA;EACA,kBAAA;EACA,kBAAA;EACA,QAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,kBAAA;EACA,SAAA;AACA;AACA;EACA,iBAAA;EACA,iBAAA;AACA;AACA;EACA,aAAA;EACA,YAAA;EACA,WAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,OAAA;EACA,gBAAA;AACA;AACA;EACA,OAAA;EACA,iBAAA;AACA;AACA;EACA,YAAA;EACA,eAAA;EACA,iBAAA;EACA,YAAA;EACA,SAAA;AACA","file":"Modal.vue","sourcesContent":["<template>\n  <div>\n  <div class=\"modal-backdrop\"></div>\n    <div id=\"save-warning\" class=\"modal builder-modal\" :class=\"classes\">\n      <div class=\"modal-header\">\n        <h3>{{title}}</h3>\n        <div v-if=\"hasDelete && notConfirmDelete\" class=\"delete-btn\" @click=\"showConfirmDelete\">\n          <svg class=\"nicon nicon-outline\"><use href=\"#nicon-bin\" xlink:href=\"#nicon-bin\"/></svg>\n        </div>\n      </div>\n      <div class=\"modal-body\">\n        <div v-show=\"notConfirmDelete\">\n          <slot></slot>\n        </div>\n        <div v-show=\"confirmDelete\">\n          <div class=\"alert alert-danger\"><svg class=\"nicon nicon-outline\"><use href=\"#nicon-warning-sign\" xlink:href=\"#nicon-warning-sign\"/></svg> Are you sure you want to delete this item?</div>\n        </div>\n      </div>\n      <div class=\"modal-footer with-groups\">\n        <div class=\"modal-footer-right\" v-if=\"confirmDelete\">\n          <a href=\"#\" @click.prevent=\"cancelDelete\" class=\"btn\">{{cancelDeleteBtnTxt}}</a>\n          <button class=\"btn btn-danger\" @click.prevent=\"deleteClicked\">\n            {{deleteBtnTxt}}\n          </button>\t\t\n        </div>\n        <div class=\"modal-footer-right\" v-if=\"notConfirmDelete\">\n          <a href=\"#\" @click.prevent=\"closeModal\" class=\"btn\">{{cancelBtnTxt}}</a>\n          <button class=\"btn btn-primary\" id=\"ok-btn\" @click.prevent=\"okClicked\">\n            {{okBtnTxt}}\n          </button>\t\t\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n<script>\nexport default {\n  name: 'Modal',\n\tprops: {\n\t\ttitle: String,\n\t\tcancelBtnTxt: {\n\t\t\ttype: String,\n\t\t\tdefault () {\n\t\t\t\treturn 'Close'\n\t\t\t}\n\t\t},\n\t\tcancelDeleteBtnTxt: {\n\t\t\ttype: String,\n\t\t\tdefault () {\n\t\t\t\treturn 'Cancel'\n\t\t\t}\n\t\t},\n\t\tclasses: {\n\t\t\ttype: Object,\n\t\t\tdefault () {\n\t\t\t\treturn {}\n\t\t\t}\n\t\t},\n\t\tdeleteBtnTxt: {\n\t\t\ttype: String,\n\t\t\tdefault () {\n\t\t\t\treturn 'Yes, Delete'\n\t\t\t}\n\t\t},\n\t\thasDelete: {\n\t\t\ttype: Boolean,\n\t\t\tdefault () {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t},\n\t\tokBtnTxt: {\n\t\t\ttype: String,\n\t\t\tdefault () {\n\t\t\t\treturn 'Okay'\n\t\t\t}\n\t\t},\n\t\tokCb: {\n\t\t\ttype: Function,\n\t\t\tdefault () {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t},\n\t\ttemplate: Object\n\t},\n\tcomputed: {\n\t\tnotConfirmDelete () {\n\t\t\treturn this.confirmDelete !== true;\n\t\t}\n\t},\n\tdata () {\n\t\treturn {\n\t\t\tconfirmDelete: false\n\t\t}\n\t},\n\tmethods: {\n\t\tcancelDelete () {\n\t\t\tthis.confirmDelete = false;\n\t\t},\n\t\tcloseModal () {\n\t\t\tthis.$emit('cancelclicked')\n\t\t},\n\t\tdeleteClicked () {\n\t\t\tthis.$emit('deleteclicked');\n\t\t},\n\t\tokClicked () {\n\t\t\tif (this.okCb) {\n\t\t\t\tthis.okCb();\n\t\t\t}\n\t\t\tthis.$emit('okclicked')\n\t\t},\n\t\tshowConfirmDelete () {\n\t\t\tthis.confirmDelete = true;\n\t\t}\n\t}\n}\n</script>\n<style scoped>\n.modal-backdrop {\n\topacity: 0.8;\n\tposition: fixed;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\tz-index: 1040;\n\tbackground-color: #232323;\n}\n.alert.alert-danger svg {\n\tcolor: #e61922;\n\tstroke: #e61922;\n\theight: 18px;\n\twidth: 18px;\n\ttop: 4px;\n\tposition: relative;\n}\n.delete-btn svg {\n\tcolor: #dba571;\n\tstroke: #dba571;\n\theight: 20px;\n\twidth: 20px;\n}\n.modal.builder-modal {\n\t border: none;\n}\n .modal.builder-modal.nopadding .modal-body {\n\t padding: 0;\n}\n .modal.builder-modal.wide {\n\t width: 800px;\n\t margin-left: -400px;\n}\n .modal.builder-modal.video-wide {\n\t width: 640px;\n\t margin-left: -300px;\n}\n .modal.builder-modal .modal-header {\n\t position: relative;\n\t border-bottom: none;\n}\n .modal.builder-modal .modal-header .delete-btn {\n\t position: absolute;\n\t right: 15px;\n\t top: 15px;\n\t width: 20px;\n\t height: 20px;\n\t color: #dba571;\n\t cursor: pointer;\n}\n .modal.builder-modal .modal-scroll-section {\n\t max-height: 320px;\n\t overflow-y: auto;\n}\n .modal.builder-modal .modal-scroll-section.min {\n\t min-height: 320px;\n}\n .modal.builder-modal .modal-body input.max {\n\t width: 100%;\n\t box-sizing: border-box;\n\t padding: 15px 5px !important;\n}\n .modal.builder-modal .modal-body .add-file-options {\n\t text-align: center;\n\t padding: 8px;\n\t margin: 8px;\n}\n .modal.builder-modal .modal-tabs {\n\t display: flex;\n\t height: 40px;\n\t background: #38737b;\n\t margin-bottom: 10px;\n}\n .modal.builder-modal .modal-tabs .modal-tab {\n\t flex: 1;\n\t display: block;\n\t height: 40px;\n\t padding: 0 10px;\n\t line-height: 40px;\n\t text-transform: uppercase;\n\t text-align: center;\n\t color: #fff;\n\t text-decoration: none;\n\t cursor: pointer;\n}\n .modal.builder-modal .modal-tabs .modal-tab.selected {\n\t background: #5a9aa8;\n}\n .modal.builder-modal .modal-tabs .modal-tab.disabled {\n\t background-color: #e1e1e1;\n\t color: #999;\n}\n .modal.builder-modal .new-modal-section {\n\t padding-bottom: 10px;\n}\n .modal.builder-modal .new-modal-section select {\n\t width: 530px;\n}\n .modal.builder-modal .new-modal-section input.calcuation {\n\t width: 500px;\n}\n .modal.builder-modal .new-modal-section textarea.lg {\n\t padding: 5px;\n\t font-size: 12px;\n\t margin: 0;\n\t box-sizing: border-box;\n\t width: 100%;\n\t height: 80px;\n\t border-width: 1px;\n}\n .modal.builder-modal .question-tags-section {\n\t margin-top: 20px;\n}\n .modal.builder-modal .question-tags-list {\n\t list-style: none;\n\t padding: 0;\n\t margin: 0;\n}\n .modal.builder-modal .question-tags-list li {\n\t display: inline-block;\n\t margin-right: 20px;\n}\n .modal.builder-modal .question-tags-list li label {\n\t font-family: Helvetica, Arial, sans-serif;\n\t text-transform: none;\n}\n .modal.builder-modal .modal-positioning {\n\t display: flex;\n}\n .modal.builder-modal .modal-positioning .modal-positioning-gutter {\n\t width: 20px;\n}\n .modal.builder-modal .modal-positioning .modal-positioning-gutter.sm {\n\t width: 10px;\n}\n .modal.builder-modal .modal-positioning .modal-positioning-side {\n\t flex: 1;\n}\n .modal.builder-modal .modal-positioning .modal-positioning-side.w-33 {\n\t flex: 0 0 33%;\n}\n .modal.builder-modal .modal-positioning .modal-positioning-side select {\n\t width: 100%;\n}\n .modal.builder-modal .dropdown-items {\n\t width: 100%;\n}\n .modal.builder-modal .dropdown-items .dropdown-items-head {\n\t width: 100%;\n\t display: flex;\n}\n .modal.builder-modal .dropdown-items .dropdown-item {\n\t width: 100%;\n\t display: flex;\n}\n .modal.builder-modal .dropdown-items .dropdown-items-body {\n\t border-bottom: 1px solid #eeefee;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt {\n\t border: 1px solid #eeefee;\n\t border-bottom: none;\n\t border-right: none;\n\t padding: 5px 8px;\n\t box-sizing: border-box;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt:last-child {\n\t border-right: 1px solid #eeefee;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.option {\n\t flex: 1;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.option input.text {\n\t width: 337px;\n\t margin: 0;\n\t border-width: 1px;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.th {\n\t font-size: 11px;\n\t font-color: #999;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out, .modal.builder-modal .dropdown-items .dropdown-item-opt.dragger {\n\t width: 30px;\n\t text-align: center;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.rangeval {\n\t width: 173px;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.rangeval input {\n\t border-width: 1px;\n\t width: 144px;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out {\n\t padding: 5px 0;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out input {\n\t position: relative;\n\t top: 4px;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out svg {\n\t position: relative;\n\t top: 6px;\n\t cursor: pointer;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out input.opt-val {\n\t padding: 1px !important;\n\t border-width: 1px;\n\t width: 21px !important;\n\t height: 16px !important;\n\t font-size: 10px;\n\t text-align: center;\n\t position: relative;\n\t top: 6px;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.dragger {\n\t padding: 0;\n}\n .modal.builder-modal .dropdown-items .dropdown-item-opt.dragger svg {\n\t position: relative;\n\t top: 11px;\n}\n .modal.builder-modal .dropdown-items .dropdown-items-footer {\n\t text-align: right;\n\t padding-top: 10px;\n}\n .modal.builder-modal .dropdown-items .dropdown-items-footer a svg {\n\t fill: #5a9aa8;\n\t height: 30px;\n\t width: 30px;\n}\n .modal.builder-modal .modal-footer.with-groups {\n\t display: flex;\n}\n .modal.builder-modal .modal-footer.with-groups .modal-footer-left {\n\t flex: 1;\n\t text-align: left;\n}\n .modal.builder-modal .modal-footer.with-groups .modal-footer-right {\n\t flex: 1;\n\t text-align: right;\n}\n .modal.builder-modal .modal-footer.with-groups .btn {\n\t height: 60px;\n\t padding: 0 20px;\n\t line-height: 60px;\n\t border: none;\n\t margin: 0;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-8392f5e8";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$1 = {
	name: 'FilterDate',
	props: {
		opts: {
			type: Object,
			default: function default$1 () {
				return {
					val: 'current-month',
					range: []
				}
			}
		}
	},
	data: function data () {
		return {
			modalOpts: [
				{
					label: 'Current month',
					val: 'current-month'
				},
				{
					label: 'Last 3 months',
					val: 'last-3-months'
				},
				{
					label: 'Last 6 months',
					val: 'last-6-months'
				},
				{
					label: 'Current week',
					val: 'current-week'
				},
				{
					label: 'Last two weeks',
					val: 'last-2-weeks'
				},
				{
					label: 'Custom Range',
					val: 'custom'
				} ]
		}
	},
	computed: {
		label: function label () {
			var self = this;
			var label = 'Choose';
			_$1.each(this.modalOpts, function (opt) {
				if (opt.val === self.opts.val && opt.val !== 'custom') {
					label = opt.label;
					return false;
				} else if (opt.val === self.opts.val && opt.val === 'custom') {
					label = moment(self.opts.range[0]).format('DD MMM YYYY') + ' - ' + moment(self.opts.range[1]).format('DD MMM YYYY');
				}
			});
			
			return label;
		}
	},
	methods: {
		choiceLabel: function choiceLabel () {
			return 
		},
		showModal: function showModal () {
			var self = this;
			var opts = {
				title: 'Choose date',
				component: 'filter-date-modal',
				componentProps: {
					val: self.opts.val,
					range: self.opts.range,
					opts: self.modalOpts
				}
			};
			return this.$emit('modal-new', opts);
		}
	}
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "filter-item", on: { click: _vm.showModal } },
    [
      _c("div", { staticClass: "filter-label" }, [_vm._v("Date")]),
      _vm._v(" "),
      _c("div", { staticClass: "filter-val" }, [_vm._v(_vm._s(_vm.label))])
    ]
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$2 = {
	name: 'FilterDateModal',
	components: { DatePicker: DatePicker },
	props: {
		val: String,
		range: Array,
		opts: Array
	},
	created: function created () {
		this.choiceVal = this.val;
		this.rangeVal = this.range;
		this.setDateRange();
	},
	data: function data () {
		return {
			formatNice: 'DD MMM YYYY',
			format: 'YYYY-MM-DD',
			choiceVal: 'current-month',
			dateVal: null,
			rangeVal: []
		}
	},
	computed: {
		labelEnd: function labelEnd () {
			return moment$1(this.rangeVal[1]).format(this.formatNice);
		},
		labelStart: function labelStart () {
			return moment$1(this.rangeVal[0]).format(this.formatNice);
		},
		showDates: function showDates () {
			if (this.choiceVal === 'custom' && this.rangeVal[0] && this.rangeVal[1]) {
				return true;
			}
			
			return false;
		}
	},
	methods: {
		okClicked: function okClicked () {
				
		},
		setDateRange: function setDateRange () {
			if (this.choiceVal === 'current-month') {
				this.rangeVal[0] = new moment$1().startOf('month').format(this.format);
				this.rangeVal[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'last-3-months') {
				this.rangeVal[0] = new moment$1().startOf('month').subtract(3, 'months').format(this.format);
				this.rangeVal[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'last-6-months') {
				this.rangeVal[0] = new moment$1().startOf('month').subtract(6, 'months').format(this.format);
				this.rangeVal[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'current-week') {
				this.rangeVal[0] = new moment$1().startOf('week').format(this.format);
				this.rangeVal[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'last-2-weeks') {
				this.rangeVal[0] = new moment$1().startOf('week').subtract(2, 'weeks').format(this.format);
				this.rangeVal[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'custom') ;
		}
	}
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c("div", [
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.choiceVal,
                expression: "choiceVal"
              }
            ],
            on: {
              change: [
                function($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function(o) {
                      return o.selected
                    })
                    .map(function(o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val
                    });
                  _vm.choiceVal = $event.target.multiple
                    ? $$selectedVal
                    : $$selectedVal[0];
                },
                _vm.setDateRange
              ]
            }
          },
          _vm._l(_vm.opts, function(opt) {
            return _c(
              "option",
              { key: opt.val, domProps: { value: opt.val } },
              [_vm._v(_vm._s(opt.label))]
            )
          }),
          0
        )
      ]),
      _vm._v(" "),
      _vm.showDates
        ? _c("div", { staticClass: "show-date" }, [
            _vm._v(
              "\n\t\t" +
                _vm._s(_vm.labelStart) +
                " - " +
                _vm._s(_vm.labelEnd) +
                "\n\t"
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.choiceVal === "custom"
        ? [
            _c(
              "div",
              { staticClass: "date-picker-container" },
              [
                _c("date-picker", {
                  attrs: {
                    inline: true,
                    clearable: false,
                    range: "",
                    format: _vm.formatNice,
                    "value-type": _vm.format
                  },
                  model: {
                    value: _vm.rangeVal,
                    callback: function($$v) {
                      _vm.rangeVal = $$v;
                    },
                    expression: "rangeVal"
                  }
                })
              ],
              1
            )
          ]
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-5027bcd2_0", { source: "\n.date-picker-container[data-v-5027bcd2] {\n\ttext-align: center;\n}\n.show-date[data-v-5027bcd2] {\n\tmargin: 10px 15px;\n}\nselect[data-v-5027bcd2] {\n\tmargin: 0;\n}\n.mx-datepicker[data-v-5027bcd2] input {\n\tfont-size: 14px;\n\tline-height: 1;\n\tpadding: 2px 0 2px 10px;\n\twidth: 100%;\n\tborder-width: 1px;\n\tmargin-top: 5px;\n}\n.mx-datepicker[data-v-5027bcd2] .mx-btn-icon-double-right,\n.mx-datepicker[data-v-5027bcd2] .mx-btn-icon-double-left {\n\tdisplay: none;\n}\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/FilterDateModal.vue"],"names":[],"mappings":";AA8FA;CACA,kBAAA;AACA;AACA;CACA,iBAAA;AACA;AACA;CACA,SAAA;AACA;AACA;CACA,eAAA;CACA,cAAA;CACA,uBAAA;CACA,WAAA;CACA,iBAAA;CACA,eAAA;AACA;AACA;;CAEA,aAAA;AACA","file":"FilterDateModal.vue","sourcesContent":["<template>\n\t<div>\n\t\t<div>\n\t\t\t<select v-model=\"choiceVal\" @change=\"setDateRange\">\n\t\t\t\t<option\n\t\t\t\t\tv-for=\"opt in opts\"\n\t\t\t\t\t:key=\"opt.val\"\n\t\t\t\t\t:value=\"opt.val\">{{opt.label}}</option>\n\t\t\t</select>\n\t\t</div>\n\t\t<div class=\"show-date\" v-if=\"showDates\">\n\t\t\t{{labelStart}} - {{labelEnd}}\n\t\t</div>\n\t\t<template v-if=\"choiceVal === 'custom'\">\n\t\t\t<div class=\"date-picker-container\">\n\t\t\t\t<date-picker\n\t\t\t\t\t:inline=\"true\"\n\t\t\t\t\tv-model=\"rangeVal\"\n\t\t\t\t\t:clearable=\"false\"\n\t\t\t\t\trange\n\t\t\t\t\t:format=\"formatNice\"\n\t\t\t\t\t:value-type=\"format\"></date-picker>\n\t\t\t</div>\n\t\t</template>\n\t</div>\n</template>\n<script>\nimport moment from 'moment';\nimport DatePicker from 'vue2-datepicker';\nimport 'vue2-datepicker/index.css';\nexport default {\n\tname: 'FilterDateModal',\n\tcomponents: { DatePicker },\n\tprops: {\n\t\tval: String,\n\t\trange: Array,\n\t\topts: Array\n\t},\n\tcreated () {\n\t\tthis.choiceVal = this.val;\n\t\tthis.rangeVal = this.range;\n\t\tthis.setDateRange();\n\t},\n\tdata () {\n\t\treturn {\n\t\t\tformatNice: 'DD MMM YYYY',\n\t\t\tformat: 'YYYY-MM-DD',\n\t\t\tchoiceVal: 'current-month',\n\t\t\tdateVal: null,\n\t\t\trangeVal: []\n\t\t}\n\t},\n\tcomputed: {\n\t\tlabelEnd () {\n\t\t\treturn moment(this.rangeVal[1]).format(this.formatNice);\n\t\t},\n\t\tlabelStart () {\n\t\t\treturn moment(this.rangeVal[0]).format(this.formatNice);\n\t\t},\n\t\tshowDates () {\n\t\t\tif (this.choiceVal === 'custom' && this.rangeVal[0] && this.rangeVal[1]) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\t\n\t\t\treturn false;\n\t\t}\n\t},\n\tmethods: {\n\t\tokClicked () {\n\t\t\t\t\n\t\t},\n\t\tsetDateRange () {\n\t\t\tif (this.choiceVal === 'current-month') {\n\t\t\t\tthis.rangeVal[0] = new moment().startOf('month').format(this.format);\n\t\t\t\tthis.rangeVal[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'last-3-months') {\n\t\t\t\tthis.rangeVal[0] = new moment().startOf('month').subtract(3, 'months').format(this.format);\n\t\t\t\tthis.rangeVal[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'last-6-months') {\n\t\t\t\tthis.rangeVal[0] = new moment().startOf('month').subtract(6, 'months').format(this.format);\n\t\t\t\tthis.rangeVal[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'current-week') {\n\t\t\t\tthis.rangeVal[0] = new moment().startOf('week').format(this.format);\n\t\t\t\tthis.rangeVal[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'last-2-weeks') {\n\t\t\t\tthis.rangeVal[0] = new moment().startOf('week').subtract(2, 'weeks').format(this.format);\n\t\t\t\tthis.rangeVal[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'custom') {\n\t\t\t}\n\t\t}\n\t}\n}\n</script>\n<style scoped>\n.date-picker-container {\n\ttext-align: center;\n}\n.show-date {\n\tmargin: 10px 15px;\n}\nselect {\n\tmargin: 0;\n}\n.mx-datepicker >>> input {\n\tfont-size: 14px;\n\tline-height: 1;\n\tpadding: 2px 0 2px 10px;\n\twidth: 100%;\n\tborder-width: 1px;\n\tmargin-top: 5px;\n}\n.mx-datepicker >>> .mx-btn-icon-double-right,\n.mx-datepicker >>> .mx-btn-icon-double-left {\n\tdisplay: none;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-5027bcd2";
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
	name: 'TypeGroup',
	props: {
		title: String,
		opts: Array,
		parentSelection: Array,
		parentIdKey: String,
		startItems: Array,
		valKey: {
			type: String,
			default: 'id'
		},
		parentValKey: {
			type: String,
			default: 'id'
		},
		nameKey: {
			type: String,
			default: 'name'
		},
		deepCheck: {
			type: Boolean,
			default: false
		}
	},
	created: function created () {
		var self = this;
		if (self.startItems && self.startItems.length) {
			_.each(self.startItems, function (item) {
				self.selectedVals.push(item);
			});
		}
	},
	data: function data () {
		return {
			selectedVals: [],
		}
	},
	watch: {
		parentSelection: function parentSelection () {
			return this.updateFromParent();
		}
	},
	computed: {
		showOpts: function showOpts () {
			var self = this;
			if (!self.parentIdKey) {
				return self.opts;
			}
			
			if (!self.parentSelection.length) {
				return self.opts;
			}

			var arr = [];
			_.each(self.opts, function (opt) {
				if (self.deepCheck === true) {
					var found = false;
					_.each(self.parentSelection, function (id) {
						var obj = {};
						obj[self.parentValKey] = id;
						if (_.find(opt[self.parentIdKey], obj)) {
							found = true;
						}
					});
					
					if (found === true) {
						arr.push(opt);
					}
				} else {
					if (self.parentSelection.indexOf(opt[self.parentIdKey]) !== -1) {
						arr.push(opt);
					}
				}
			});
			
			return arr;
		}
	},
	methods: {
		changed: function changed () {
			this.$emit('change', this.selectedVals);
		},
		selectAll: function selectAll () {
			var self = this;
			var arr = [];
			_.each(this.showOpts, function (opt) {
				arr.push(opt[self.valKey]);
			});
			
			this.selectedVals = arr;
			this.changed();
		},
		selectNone: function selectNone () {
			this.selectedVals = [];
			this.changed();
		},
		updateSelected: function updateSelected () {
			this.changed();
		},
		updateFromParent: function updateFromParent () {
			var self = this;
			if (!self.parentIdKey) {
				return;
			}

			if (!self.parentSelection.length) {
				return;
			}

			_.each(self.opts, function (opt) {
				if (self.parentSelection.indexOf(opt[self.parentIdKey]) === -1) {
					var idx = self.selectedVals.indexOf(opt.id);
					if (idx !== -1) {
						self.selectedVals.splice(idx, 1);
					}
				}
			});

			self.changed();
		}
	}
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "modal-group" },
    [
      _c("h4", [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c("div", { staticClass: "select-all-none" }, [
        _c(
          "a",
          {
            staticClass: "select-all",
            attrs: { href: "" },
            on: {
              click: function($event) {
                $event.preventDefault();
                return _vm.selectAll()
              }
            }
          },
          [_vm._v("Select All")]
        ),
        _vm._v(" "),
        _c("span", { staticClass: "select-all-none-divider" }, [_vm._v("|")]),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "select-none",
            attrs: { href: "" },
            on: {
              click: function($event) {
                $event.preventDefault();
                return _vm.selectNone()
              }
            }
          },
          [_vm._v("Select None")]
        )
      ]),
      _vm._v(" "),
      _vm._l(_vm.showOpts, function(opt) {
        return _c("label", { staticClass: "checkbox" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.selectedVals,
                expression: "selectedVals"
              }
            ],
            attrs: { type: "checkbox" },
            domProps: {
              value: opt[_vm.valKey],
              checked: Array.isArray(_vm.selectedVals)
                ? _vm._i(_vm.selectedVals, opt[_vm.valKey]) > -1
                : _vm.selectedVals
            },
            on: {
              change: [
                function($event) {
                  var $$a = _vm.selectedVals,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false;
                  if (Array.isArray($$a)) {
                    var $$v = opt[_vm.valKey],
                      $$i = _vm._i($$a, $$v);
                    if ($$el.checked) {
                      $$i < 0 && (_vm.selectedVals = $$a.concat([$$v]));
                    } else {
                      $$i > -1 &&
                        (_vm.selectedVals = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)));
                    }
                  } else {
                    _vm.selectedVals = $$c;
                  }
                },
                _vm.updateSelected
              ]
            }
          }),
          _vm._v(" " + _vm._s(opt[_vm.nameKey]) + "\n\t")
        ])
      })
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$4 = {
	name: 'TypeLocation',
	components: {TypeGroup: __vue_component__$3},
	created: function created () {
		var self = this;
		axios$1.get('/api/location?v2=1&regions=1')
			.then(function (r) {
				self.locations = _.get(r, 'data.locations');
				self.regions = _.get(r, 'data.regions');
			})
			.then(function () {
				var needsToUpdate = false;
				if (self.filterItem && self.filterItem.locations) {
					needsToUpdate = true;
					self.selectedLocations = self.filterItem.locations;
				}
				if (self.filterItem && self.filterItem.regions) {
					needsToUpdate = true;
					self.selectedRegions = self.filterItem.regions;
				}
				
				if (needsToUpdate === true) {
					self.updated();
				}
			})
			.then(function () {
				self.isLoaded = true;
			});
	},
	props: {
		filterItem: Object
	},
	data: function data () {
		return {
			isLoaded: false,
			selectedRegions: [],
			selectedLocations: [],
			locations: [],
			regions: []
		}
	},
	computed: {
		showLocations: function showLocations () {
			var self = this;
			var arr = [];
			_.each(this.locations, function (location) {
				if (!self.selectedRegions.length) {
					arr.push(location);
				} else if (self.selectedRegions.indexOf(location.region_id) !== -1) {
					arr.push(location);
				}
			});
			
			return arr;
		}
	},
	methods: {
		setLocations: function setLocations (ev) {
			this.selectedLocations = ev;
			this.updated();
		},
		setRegions: function setRegions (ev) {
			this.selectedRegions = ev;
			this.updated();
		},
		updated: function updated () {
			var numSelected = this.selectedLocations.length + this.selectedRegions.length;
			var opts = {
				locations: this.selectedLocations,
				regions: this.selectedRegions,
				num: numSelected
			};

			this.$emit('update-filter', opts);
		}
	}
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isLoaded === true
    ? _c("div", { staticClass: "modal-groups" }, [
        _c(
          "div",
          { staticClass: "modal-group" },
          [
            _c("TypeGroup", {
              attrs: {
                title: "Region",
                opts: _vm.regions,
                "start-items": _vm.selectedRegions,
                "parent-selection": []
              },
              on: { change: _vm.setRegions }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "modal-group" },
          [
            _c("TypeGroup", {
              attrs: {
                title: "Location",
                opts: _vm.locations,
                "start-items": _vm.selectedLocations,
                "parent-selection": _vm.selectedRegions,
                "parent-id-key": "region_id"
              },
              on: { change: _vm.setLocations }
            })
          ],
          1
        )
      ])
    : _vm._e()
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$5 = {
	name: 'TypeDate',
	components: { DatePicker: DatePicker },
	created: function created () {
		this.setDateRange(true);
	},
	props: {
		filterItem: Object
	},
	data: function data () {
		return {
			opts: [
				{
					label: 'Current month',
					val: 'current-month'
				},
				{
					label: 'Last 3 months',
					val: 'last-3-months'
				},
				{
					label: 'Last 6 months',
					val: 'last-6-months'
				},
				{
					label: 'Current week',
					val: 'current-week'
				},
				{
					label: 'Last two weeks',
					val: 'last-2-weeks'
				},
				{
					label: 'Custom Range',
					val: 'custom'
				} ],
			formatNice: 'DD MMM YYYY',
			format: 'YYYY-MM-DD',
			choiceVal: 'current-month',
			dateVal: null,
			rangeVal: []
		}
	},
	computed: {
		labelEnd: function labelEnd () {
			return moment$1(this.rangeVal[1]).format(this.formatNice);
		},
		labelStart: function labelStart () {
			return moment$1(this.rangeVal[0]).format(this.formatNice);
		},
		showDates: function showDates () {
			if (this.choiceVal === 'custom' && this.rangeVal[0] && this.rangeVal[1]) {
				return true;
			} else if (this.rangeVal[0] && this.rangeVal[1]) {
				return true;
			}
			
			return false;
		}
	},
	methods: {
		pickerChanged: function pickerChanged () {
			var opts = {
				dateRange: this.rangeVal,
				dateChoiceVal: this.choiceVal
			};

			this.$emit('update-filter', opts);
		},
		setDateRange: function setDateRange (starting) {
			var vals = [];
			if (starting === true && this.filterItem && this.filterItem.dateRange) {
				vals = this.filterItem.dateRange;
				this.choiceVal = this.filterItem.dateChoiceVal;
			} else if (this.choiceVal === 'current-month') {
				vals[0] = new moment$1().startOf('month').format(this.format);
				vals[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'last-3-months') {
				vals[0] = new moment$1().startOf('month').subtract(3, 'months').format(this.format);
				vals[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'last-6-months') {
				vals[0] = new moment$1().startOf('month').subtract(6, 'months').format(this.format);
				vals[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'current-week') {
				vals[0] = new moment$1().startOf('week').format(this.format);
				vals[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'last-2-weeks') {
				vals[0] = new moment$1().startOf('week').subtract(2, 'weeks').format(this.format);
				vals[1] = new moment$1().format(this.format);
			} else if (this.choiceVal === 'custom') {
				vals = this.rangeVal;
			}
			
			this.rangeVal = vals;
			var opts = {
				dateRange: vals,
				dateChoiceVal: this.choiceVal
			};

			this.$emit('update-filter', opts);
		}
	}
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "modal-groups" }, [
    _c("div", { staticClass: "modal-group" }, [
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.choiceVal,
              expression: "choiceVal"
            }
          ],
          on: {
            change: [
              function($event) {
                var $$selectedVal = Array.prototype.filter
                  .call($event.target.options, function(o) {
                    return o.selected
                  })
                  .map(function(o) {
                    var val = "_value" in o ? o._value : o.value;
                    return val
                  });
                _vm.choiceVal = $event.target.multiple
                  ? $$selectedVal
                  : $$selectedVal[0];
              },
              _vm.setDateRange
            ]
          }
        },
        _vm._l(_vm.opts, function(opt) {
          return _c("option", { key: opt.val, domProps: { value: opt.val } }, [
            _vm._v(_vm._s(opt.label))
          ])
        }),
        0
      ),
      _vm._v(" "),
      _vm.showDates
        ? _c("div", { staticClass: "show-date" }, [
            _vm._v(
              "\n\t\t\t" +
                _vm._s(_vm.labelStart) +
                " - " +
                _vm._s(_vm.labelEnd) +
                "\n\t\t"
            )
          ])
        : _vm._e()
    ]),
    _vm._v(" "),
    _vm.choiceVal === "custom"
      ? _c("div", { staticClass: "modal-group" }, [
          _c(
            "div",
            { staticClass: "date-picker-container" },
            [
              _c("date-picker", {
                attrs: {
                  inline: true,
                  clearable: false,
                  range: "",
                  format: _vm.formatNice,
                  "value-type": _vm.format
                },
                on: { change: _vm.pickerChanged },
                model: {
                  value: _vm.rangeVal,
                  callback: function($$v) {
                    _vm.rangeVal = $$v;
                  },
                  expression: "rangeVal"
                }
              })
            ],
            1
          )
        ])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-3dd90b74_0", { source: "\n.date-picker-container[data-v-3dd90b74] {\n\ttext-align: center;\n}\n.show-date[data-v-3dd90b74] {\n\tmargin: 10px 15px;\n}\nselect[data-v-3dd90b74] {\n\tmargin: 0;\n}\n.mx-datepicker[data-v-3dd90b74] input {\n\tfont-size: 14px;\n\tline-height: 1;\n\tpadding: 2px 0 2px 10px;\n\twidth: 100%;\n\tborder-width: 1px;\n\tmargin-top: 5px;\n}\n.mx-datepicker[data-v-3dd90b74] .mx-btn-icon-double-right,\n.mx-datepicker[data-v-3dd90b74] .mx-btn-icon-double-left {\n\tdisplay: none;\n}\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/TypeDate.vue"],"names":[],"mappings":";AAyIA;CACA,kBAAA;AACA;AACA;CACA,iBAAA;AACA;AACA;CACA,SAAA;AACA;AACA;CACA,eAAA;CACA,cAAA;CACA,uBAAA;CACA,WAAA;CACA,iBAAA;CACA,eAAA;AACA;AACA;;CAEA,aAAA;AACA","file":"TypeDate.vue","sourcesContent":["<template>\n\t<div class=\"modal-groups\">\n\t\t<div class=\"modal-group\">\n\t\t\t<select v-model=\"choiceVal\" @change=\"setDateRange\">\n\t\t\t\t<option\n\t\t\t\t\tv-for=\"opt in opts\"\n\t\t\t\t\t:key=\"opt.val\"\n\t\t\t\t\t:value=\"opt.val\">{{opt.label}}</option>\n\t\t\t</select>\n\t\t\t<div class=\"show-date\" v-if=\"showDates\">\n\t\t\t\t{{labelStart}} - {{labelEnd}}\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"modal-group\" v-if=\"choiceVal === 'custom'\">\n\t\t\t<div class=\"date-picker-container\">\n\t\t\t\t<date-picker\n\t\t\t\t\t:inline=\"true\"\n\t\t\t\t\tv-model=\"rangeVal\"\n\t\t\t\t\t:clearable=\"false\"\n\t\t\t\t\trange\n\t\t\t\t\t@change=\"pickerChanged\"\n\t\t\t\t\t:format=\"formatNice\"\n\t\t\t\t\t:value-type=\"format\"></date-picker>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n<script>\nimport moment from 'moment';\nimport DatePicker from 'vue2-datepicker';\nimport 'vue2-datepicker/index.css';\nexport default {\n\tname: 'TypeDate',\n\tcomponents: { DatePicker },\n\tcreated () {\n\t\tthis.setDateRange(true);\n\t},\n\tprops: {\n\t\tfilterItem: Object\n\t},\n\tdata () {\n\t\treturn {\n\t\t\topts: [\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Current month',\n\t\t\t\t\tval: 'current-month'\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Last 3 months',\n\t\t\t\t\tval: 'last-3-months'\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Last 6 months',\n\t\t\t\t\tval: 'last-6-months'\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Current week',\n\t\t\t\t\tval: 'current-week'\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Last two weeks',\n\t\t\t\t\tval: 'last-2-weeks'\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Custom Range',\n\t\t\t\t\tval: 'custom'\n\t\t\t\t},\n\t\t\t],\n\t\t\tformatNice: 'DD MMM YYYY',\n\t\t\tformat: 'YYYY-MM-DD',\n\t\t\tchoiceVal: 'current-month',\n\t\t\tdateVal: null,\n\t\t\trangeVal: []\n\t\t}\n\t},\n\tcomputed: {\n\t\tlabelEnd () {\n\t\t\treturn moment(this.rangeVal[1]).format(this.formatNice);\n\t\t},\n\t\tlabelStart () {\n\t\t\treturn moment(this.rangeVal[0]).format(this.formatNice);\n\t\t},\n\t\tshowDates () {\n\t\t\tif (this.choiceVal === 'custom' && this.rangeVal[0] && this.rangeVal[1]) {\n\t\t\t\treturn true;\n\t\t\t} else if (this.rangeVal[0] && this.rangeVal[1]) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\t\n\t\t\treturn false;\n\t\t}\n\t},\n\tmethods: {\n\t\tpickerChanged () {\n\t\t\tlet opts = {\n\t\t\t\tdateRange: this.rangeVal,\n\t\t\t\tdateChoiceVal: this.choiceVal\n\t\t\t};\n\n\t\t\tthis.$emit('update-filter', opts);\n\t\t},\n\t\tsetDateRange (starting) {\n\t\t\tlet vals = [];\n\t\t\tif (starting === true && this.filterItem && this.filterItem.dateRange) {\n\t\t\t\tvals = this.filterItem.dateRange;\n\t\t\t\tthis.choiceVal = this.filterItem.dateChoiceVal;\n\t\t\t} else if (this.choiceVal === 'current-month') {\n\t\t\t\tvals[0] = new moment().startOf('month').format(this.format);\n\t\t\t\tvals[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'last-3-months') {\n\t\t\t\tvals[0] = new moment().startOf('month').subtract(3, 'months').format(this.format);\n\t\t\t\tvals[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'last-6-months') {\n\t\t\t\tvals[0] = new moment().startOf('month').subtract(6, 'months').format(this.format);\n\t\t\t\tvals[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'current-week') {\n\t\t\t\tvals[0] = new moment().startOf('week').format(this.format);\n\t\t\t\tvals[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'last-2-weeks') {\n\t\t\t\tvals[0] = new moment().startOf('week').subtract(2, 'weeks').format(this.format);\n\t\t\t\tvals[1] = new moment().format(this.format);\n\t\t\t} else if (this.choiceVal === 'custom') {\n\t\t\t\tvals = this.rangeVal;\n\t\t\t}\n\t\t\t\n\t\t\tthis.rangeVal = vals;\n\t\t\tlet opts = {\n\t\t\t\tdateRange: vals,\n\t\t\t\tdateChoiceVal: this.choiceVal\n\t\t\t};\n\n\t\t\tthis.$emit('update-filter', opts);\n\t\t}\n\t}\n}\n</script>\n<style scoped>\n.date-picker-container {\n\ttext-align: center;\n}\n.show-date {\n\tmargin: 10px 15px;\n}\nselect {\n\tmargin: 0;\n}\n.mx-datepicker >>> input {\n\tfont-size: 14px;\n\tline-height: 1;\n\tpadding: 2px 0 2px 10px;\n\twidth: 100%;\n\tborder-width: 1px;\n\tmargin-top: 5px;\n}\n.mx-datepicker >>> .mx-btn-icon-double-right,\n.mx-datepicker >>> .mx-btn-icon-double-left {\n\tdisplay: none;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = "data-v-3dd90b74";
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$6 = {
	name: 'TypeUser',
	components: {TypeGroup: __vue_component__$3},
	created: function created () {
		var self = this;
		axios$1.get('/api/user')
			.then(function (r) {
				self.users = _.get(r, 'data.users');
				self.userGroups = _.get(r, 'data.user_groups');
			})
			.then(function () {
				var needsToUpdate = false;
				if (self.filterItem && self.filterItem.groups) {
					needsToUpdate = true;
					self.selectedGroups = self.filterItem.groups;
				}
				if (self.filterItem && self.filterItem.users) {
					needsToUpdate = true;
					self.selectedUsers = self.filterItem.users;
				}
				
				if (needsToUpdate === true) {
					self.updated();
				}
			})
			.then(function () {
				self.isLoaded = true;
			});
	},
	props: {
		filterItem: Object
	},
	data: function data () {
		return {
			isLoaded: false,
			users: [],
			userGroups: [],
			selectedGroups: [],
			selectedUsers: []
		}
	},
	methods: {
		setGroups: function setGroups (ev) {
			this.selectedGroups = ev;
			this.updated();
		},
		setUsers: function setUsers (ev) {
			this.selectedUsers = ev;
			this.updated();
		},
		updated: function updated () {
			var numSelected = this.selectedGroups.length + this.selectedUsers.length;

			var opts = {
				groups: this.selectedGroups,
				users: this.selectedUsers,
				num: numSelected
			};

			this.$emit('update-filter', opts);
		}
	}
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isLoaded
    ? _c("div", { staticClass: "modal-groups" }, [
        _c(
          "div",
          { staticClass: "modal-group" },
          [
            _c("TypeGroup", {
              attrs: {
                title: "User Group",
                opts: _vm.userGroups,
                "start-items": _vm.selectedGroups,
                "parent-selection": []
              },
              on: { change: _vm.setGroups }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "modal-group" },
          [
            _c("TypeGroup", {
              attrs: {
                title: "User",
                opts: _vm.users,
                "start-items": _vm.selectedUsers,
                "parent-selection": _vm.selectedGroups,
                "parent-id-key": "user_group_id"
              },
              on: { change: _vm.setUsers }
            })
          ],
          1
        )
      ])
    : _vm._e()
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$7 = {
	name: 'TypeTemplate',
	components: {TypeGroup: __vue_component__$3},
	created: function created () {
		var self = this;
		axios$1.get('/api/templates')
			.then(function (r) {
				self.templates = _.get(r, 'data.templates');
				self.tags = _.get(r, 'data.tags');
			})
			.then(function () {
				var needsToUpdate = false;
				if (self.filterItem && self.filterItem.tags) {
					needsToUpdate = true;
					self.selectedTags = self.filterItem.tags;
				}
				if (self.filterItem && self.filterItem.templates) {
					needsToUpdate = true;
					self.selectedTemplates = self.filterItem.templates;
				}
				
				if (needsToUpdate === true) {
					self.updated();
				}
			})
			.then(function () {
				self.isLoaded = true;
			});
	},
	props: {
		filterItem: Object
	},
	data: function data () {
		return {
			isLoaded: false,
			tags: [],
			templates: [],
			selectedTemplates: [],
			selectedTags: []
		}
	},
	methods: {
		setTags: function setTags (ev) {
			this.selectedTags = ev;
			this.updated();
		},
		setTemplates: function setTemplates (ev) {
			this.selectedTemplates = ev;
			this.updated();
		},
		updated: function updated () {
			var numSelected = this.selectedTemplates.length + this.selectedTags.length;
			var opts = {
				templates: this.selectedTemplates,
				tags: this.selectedTags,
				num: numSelected
			};

			this.$emit('update-filter', opts);
		}
	}
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isLoaded
    ? _c("div", { staticClass: "modal-groups" }, [
        _c(
          "div",
          { staticClass: "modal-group" },
          [
            _c("TypeGroup", {
              attrs: {
                title: "Tag",
                opts: _vm.tags,
                "start-items": _vm.selectedTags,
                "val-key": "name",
                "parent-selection": []
              },
              on: { change: _vm.setTags }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "modal-group" },
          [
            _c("TypeGroup", {
              attrs: {
                title: "Template",
                opts: _vm.templates,
                "start-items": _vm.selectedTemplates,
                "val-key": "group",
                "parent-val-key": "name",
                "parent-selection": _vm.selectedTags,
                "parent-id-key": "tags",
                "deep-check": true
              },
              on: { change: _vm.setTemplates }
            })
          ],
          1
        )
      ])
    : _vm._e()
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = undefined;
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$8 = {
	name: 'TypePreformInfo',
	props: {
		item: Object
	},
	created: function created () {
		
	},
	computed: {
		itemIsOpen: function itemIsOpen () {
			if (['Barcode', 'Text', 'Integer'].indexOf(this.item.type) !== -1) {
				return true;
			}
			
			return false;
		}
	},
	methods: {
		removeItem: function removeItem () {
			this.$emit('remove-item', this.item);
		},
		updated: function updated () {
			this.$emit('change', this.item);
		}
	}
};

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "question-info-container" }, [
    _c(
      "a",
      {
        staticClass: "remove-item",
        attrs: { href: "" },
        on: {
          click: function($event) {
            $event.preventDefault();
            return _vm.removeItem($event)
          }
        }
      },
      [_vm._v("x")]
    ),
    _vm._v(" "),
    _c("h5", [_vm._v(_vm._s(_vm.item.name))]),
    _vm._v(" "),
    _vm.item.type === "Dropdown"
      ? _c(
          "div",
          _vm._l(_vm.item.options, function(opt) {
            return _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.item.filter.opts,
                    expression: "item.filter.opts"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  value: opt,
                  checked: Array.isArray(_vm.item.filter.opts)
                    ? _vm._i(_vm.item.filter.opts, opt) > -1
                    : _vm.item.filter.opts
                },
                on: {
                  change: [
                    function($event) {
                      var $$a = _vm.item.filter.opts,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false;
                      if (Array.isArray($$a)) {
                        var $$v = opt,
                          $$i = _vm._i($$a, $$v);
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(_vm.item.filter, "opts", $$a.concat([$$v]));
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.item.filter,
                              "opts",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            );
                        }
                      } else {
                        _vm.$set(_vm.item.filter, "opts", $$c);
                      }
                    },
                    _vm.updated
                  ]
                }
              }),
              _vm._v(" " + _vm._s(opt) + "\n\t\t")
            ])
          }),
          0
        )
      : _vm.itemIsOpen
      ? _c("div", [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.item.filter.str,
                expression: "item.filter.str"
              }
            ],
            staticClass: "text",
            attrs: { type: "text" },
            domProps: { value: _vm.item.filter.str },
            on: {
              change: _vm.updated,
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.item.filter, "str", $event.target.value);
              }
            }
          })
        ])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  var __vue_inject_styles__$8 = function (inject) {
    if (!inject) { return }
    inject("data-v-2d619c00_0", { source: "\nh5[data-v-2d619c00] {\n\tfont-weight: normal;\n\tfont-size: 11px;\n\tmargin: 0;\n\tpadding-right: 15px;\n}\n.question-info-container[data-v-2d619c00] {\n\tposition: relative;\n\tmargin-bottom: 10px;\n\tpadding-bottom: 10px;\n\tborder-bottom: 1px solid #eeefee;\n}\n.remove-item[data-v-2d619c00] {\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n}\ninput.text[data-v-2d619c00] {\n\twidth: 300px;\n\tborder-width: 1px !important;\n\tpadding: 2px;\n\tfont-size: 11px;\n}\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/TypePreformInfo.vue"],"names":[],"mappings":";AA2CA;CACA,mBAAA;CACA,eAAA;CACA,SAAA;CACA,mBAAA;AACA;AACA;CACA,kBAAA;CACA,mBAAA;CACA,oBAAA;CACA,gCAAA;AACA;AACA;CACA,kBAAA;CACA,QAAA;CACA,MAAA;AACA;AACA;CACA,YAAA;CACA,4BAAA;CACA,YAAA;CACA,eAAA;AACA","file":"TypePreformInfo.vue","sourcesContent":["<template>\n\t<div class=\"question-info-container\">\n\t\t<a href=\"\" class=\"remove-item\" @click.prevent=\"removeItem\">x</a>\n\t\t<h5>{{item.name}}</h5>\n\t\t<div v-if=\"item.type === 'Dropdown'\">\n\t\t\t<label v-for=\"opt in item.options\" class=\"checkbox\">\n\t\t\t\t<input type=\"checkbox\" v-model=\"item.filter.opts\" :value=\"opt\" @change=\"updated\" /> {{opt}}\n\t\t\t</label>\n\t\t</div>\n\t\t<div v-else-if=\"itemIsOpen\">\n\t\t\t<input type=\"text\" v-model=\"item.filter.str\" class=\"text\" @change=\"updated\" />\n\t\t</div>\n\t</div>\n</template>\n<script>\nexport default {\n\tname: 'TypePreformInfo',\n\tprops: {\n\t\titem: Object\n\t},\n\tcreated () {\n\t\t\n\t},\n\tcomputed: {\n\t\titemIsOpen () {\n\t\t\tif (['Barcode', 'Text', 'Integer'].indexOf(this.item.type) !== -1) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\t\n\t\t\treturn false;\n\t\t}\n\t},\n\tmethods: {\n\t\tremoveItem () {\n\t\t\tthis.$emit('remove-item', this.item);\n\t\t},\n\t\tupdated () {\n\t\t\tthis.$emit('change', this.item);\n\t\t}\n\t}\n}\n</script>\n<style scoped>\nh5 {\n\tfont-weight: normal;\n\tfont-size: 11px;\n\tmargin: 0;\n\tpadding-right: 15px;\n}\n.question-info-container {\n\tposition: relative;\n\tmargin-bottom: 10px;\n\tpadding-bottom: 10px;\n\tborder-bottom: 1px solid #eeefee;\n}\n.remove-item {\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n}\ninput.text {\n\twidth: 300px;\n\tborder-width: 1px !important;\n\tpadding: 2px;\n\tfont-size: 11px;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$8 = "data-v-2d619c00";
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$9 = {
	name: 'TypePreform',
	components: {TypePreformInfo: __vue_component__$8},
	created: function created () {
		var self = this;
		axios.get('/api/templates')
		.then(function (r) {
			self.templates = _$1.get(r, 'data.templates');
		})
		.then(function () {
			if (self.filterItem && self.filterItem.items && self.filterItem.items.length) {
				self.chosenFields = self.filterItem.items;
				self.updated();
			}
		})
		.then(function () {
			self.isLoaded = true;
		});
	},
	props: {
		filterItem: Object
	},
	data: function data () {
		return {
			isLoaded: false,
			chosenTemplateId: null,
			chosenPreformFieldId: null,
			templates: [],
			preformFields: [],
			chosenFields: []
		}
	},
	computed: {
		showPreformFields: function showPreformFields () {
			var self = this;
			var arr = [];
			_$1.each(self.preformFields, function (field) {
				var foundField = _$1.find(self.chosenFields, {id: field.id});
				if (!foundField) {
					arr.push(field);
				}
			});
			
			return arr;
		},
		showTemplates: function showTemplates () {
			var arr = [];
			_$1.each(this.templates, function (template) {
				if (template.audit_template_pre_id) {
					arr.push(template);
				}
			});
			
			return arr;
		}
	},
	methods: {
		changePreformitem: function changePreformitem () {
			var preformField = _$1.find(this.preformFields, {id: this.chosenPreformFieldId});
			preformField.filter = {
				opts: [],
				str: ''
			};

			this.chosenPreformFieldId = null;
			this.chosenFields.push(preformField);
		},
		changeTemplate: function changeTemplate () {
			this.getPreformFields(this.chosenTemplateId);
		},
		getPreformFields: function getPreformFields (templateId) {
			var self = this;
			axios.get('/api/filter_preformfields', {
				params: {
					audit_template_id: templateId
				}
			})
			.then(function (r) {
				self.preformFields = _$1.get(r, 'data.preform_fields', []);
			});
		},
		removeItem: function removeItem (item) {
			var idx = _$1.findIndex(this.chosenFields, {id: item.id});
			this.chosenFields.splice(idx, 1);
		},
		updated: function updated () {
			var numSelected = this.chosenFields.length;
			var opts = {
				items: this.chosenFields,
				num: numSelected
			};

			this.$emit('update-filter', opts);
		}
	}
};

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isLoaded
    ? _c("div", { staticClass: "modal-groups" }, [
        _c("div", { staticClass: "modal-group" }, [
          _vm.templates.length
            ? _c("div", { staticClass: "field control-group" }, [
                _c("label", [_vm._v("Choose Template")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.chosenTemplateId,
                        expression: "chosenTemplateId"
                      }
                    ],
                    on: {
                      change: [
                        function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value;
                              return val
                            });
                          _vm.chosenTemplateId = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0];
                        },
                        _vm.changeTemplate
                      ]
                    }
                  },
                  [
                    _c("option", { domProps: { value: null } }),
                    _vm._v(" "),
                    _vm._l(_vm.showTemplates, function(template) {
                      return _c(
                        "option",
                        { domProps: { value: template.id } },
                        [_vm._v(_vm._s(template.name))]
                      )
                    })
                  ],
                  2
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.chosenTemplateId && _vm.showPreformFields.length
            ? _c("div", { staticClass: "field control-group" }, [
                _c("label", [_vm._v("Choose Item")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.chosenPreformFieldId,
                        expression: "chosenPreformFieldId"
                      }
                    ],
                    on: {
                      change: [
                        function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value;
                              return val
                            });
                          _vm.chosenPreformFieldId = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0];
                        },
                        _vm.changePreformitem
                      ]
                    }
                  },
                  [
                    _c("option", { domProps: { value: null } }),
                    _vm._v(" "),
                    _vm._l(_vm.showPreformFields, function(item) {
                      return _c("option", { domProps: { value: item.id } }, [
                        _vm._v(_vm._s(item.name))
                      ])
                    })
                  ],
                  2
                )
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "modal-group" },
          _vm._l(_vm.chosenFields, function(item) {
            return _c(
              "div",
              [
                _c("TypePreformInfo", {
                  attrs: { item: item },
                  on: { "remove-item": _vm.removeItem, change: _vm.updated }
                })
              ],
              1
            )
          }),
          0
        )
      ])
    : _vm._e()
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  var __vue_inject_styles__$9 = function (inject) {
    if (!inject) { return }
    inject("data-v-3aec4098_0", { source: "\nselect[data-v-3aec4098] {\n\twidth: 370px;\n\tborder-width: 1px;\n\tpadding: 5px;\n\theight: auto;\n\tfont-size: 12px;\n}\n\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/TypePreform.vue"],"names":[],"mappings":";AA8HA;CACA,YAAA;CACA,iBAAA;CACA,YAAA;CACA,YAAA;CACA,eAAA;AACA","file":"TypePreform.vue","sourcesContent":["<template>\n<div class=\"modal-groups\" v-if=\"isLoaded\">\n\t<div class=\"modal-group\">\n\t\t<div class=\"field control-group\" v-if=\"templates.length\">\n\t\t\t<label>Choose Template</label>\n\t\t\t<select v-model=\"chosenTemplateId\" @change=\"changeTemplate\">\n\t\t\t\t<option :value=\"null\"></option>\n\t\t\t\t<option v-for=\"template in showTemplates\" :value=\"template.id\">{{template.name}}</option>\n\t\t\t</select>\n\t\t</div>\n\t\t<div class=\"field control-group\" v-if=\"chosenTemplateId && showPreformFields.length\">\n\t\t\t<label>Choose Item</label>\n\t\t\t<select v-model=\"chosenPreformFieldId\" @change=\"changePreformitem\">\n\t\t\t\t<option :value=\"null\"></option>\n\t\t\t\t<option v-for=\"item in showPreformFields\" :value=\"item.id\">{{item.name}}</option>\n\t\t\t</select>\n\t\t</div>\n\t</div>\n\t<div class=\"modal-group\">\n\t\t<div v-for=\"item in chosenFields\">\n\t\t\t<TypePreformInfo :item=\"item\" @remove-item=\"removeItem\" @change=\"updated\"></TypePreformInfo>\n\t\t</div>\n\t</div>\n</div>\n</template>\n<script>\nimport _ from 'lodash';\nimport TypePreformInfo from './TypePreformInfo.vue';\nexport default {\n\tname: 'TypePreform',\n\tcomponents: {TypePreformInfo},\n\tcreated () {\n\t\tlet self = this;\n\t\taxios.get('/api/templates')\n\t\t.then((r) => {\n\t\t\tself.templates = _.get(r, 'data.templates');\n\t\t})\n\t\t.then(() => {\n\t\t\tif (self.filterItem && self.filterItem.items && self.filterItem.items.length) {\n\t\t\t\tself.chosenFields = self.filterItem.items;\n\t\t\t\tself.updated();\n\t\t\t}\n\t\t})\n\t\t.then(() => {\n\t\t\tself.isLoaded = true;\n\t\t})\n\t},\n\tprops: {\n\t\tfilterItem: Object\n\t},\n\tdata () {\n\t\treturn {\n\t\t\tisLoaded: false,\n\t\t\tchosenTemplateId: null,\n\t\t\tchosenPreformFieldId: null,\n\t\t\ttemplates: [],\n\t\t\tpreformFields: [],\n\t\t\tchosenFields: []\n\t\t}\n\t},\n\tcomputed: {\n\t\tshowPreformFields () {\n\t\t\tlet self = this;\n\t\t\tlet arr = [];\n\t\t\t_.each(self.preformFields, (field) => {\n\t\t\t\tlet foundField = _.find(self.chosenFields, {id: field.id});\n\t\t\t\tif (!foundField) {\n\t\t\t\t\tarr.push(field);\n\t\t\t\t}\n\t\t\t})\n\t\t\t\n\t\t\treturn arr;\n\t\t},\n\t\tshowTemplates () {\n\t\t\tlet arr = [];\n\t\t\t_.each(this.templates, (template) => {\n\t\t\t\tif (template.audit_template_pre_id) {\n\t\t\t\t\tarr.push(template);\n\t\t\t\t}\n\t\t\t})\n\t\t\t\n\t\t\treturn arr;\n\t\t}\n\t},\n\tmethods: {\n\t\tchangePreformitem () {\n\t\t\tlet preformField = _.find(this.preformFields, {id: this.chosenPreformFieldId});\n\t\t\tpreformField.filter = {\n\t\t\t\topts: [],\n\t\t\t\tstr: ''\n\t\t\t};\n\n\t\t\tthis.chosenPreformFieldId = null;\n\t\t\tthis.chosenFields.push(preformField);\n\t\t},\n\t\tchangeTemplate () {\n\t\t\tthis.getPreformFields(this.chosenTemplateId);\n\t\t},\n\t\tgetPreformFields (templateId) {\n\t\t\tlet self = this;\n\t\t\taxios.get('/api/filter_preformfields', {\n\t\t\t\tparams: {\n\t\t\t\t\taudit_template_id: templateId\n\t\t\t\t}\n\t\t\t})\n\t\t\t.then(r => {\n\t\t\t\tself.preformFields = _.get(r, 'data.preform_fields', []);\n\t\t\t})\n\t\t},\n\t\tremoveItem (item) {\n\t\t\tlet idx = _.findIndex(this.chosenFields, {id: item.id});\n\t\t\tthis.chosenFields.splice(idx, 1);\n\t\t},\n\t\tupdated () {\n\t\t\tlet numSelected = this.chosenFields.length;\n\t\t\tlet opts = {\n\t\t\t\titems: this.chosenFields,\n\t\t\t\tnum: numSelected\n\t\t\t};\n\n\t\t\tthis.$emit('update-filter', opts);\n\t\t}\n\t}\n}\n</script>\n<style scoped>\n\tselect {\n\t\twidth: 370px;\n\t\tborder-width: 1px;\n\t\tpadding: 5px;\n\t\theight: auto;\n\t\tfont-size: 12px;\n\t}\n\t\n\t</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$9 = "data-v-3aec4098";
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$a = {
	name: 'TypeQuestionInfo',
	props: {
		question: Object,
	},
	created: function created () {
	},
	computed: {
		questionIsOpen: function questionIsOpen () {
			if (['barcode', 'text', 'text-na', 'integer', 'integer-na', 'decimal', 'decimal-na'].indexOf(this.question.type) !== -1) {
				return true;
			}
			
			return false;
		}
	},
	methods: {
		removeQuestion: function removeQuestion () {
			this.$emit('remove-question', this.question);
		},
		updated: function updated () {
			this.$emit('change', this.question);
		}
	}
};

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "question-info-container" }, [
    _c(
      "a",
      {
        staticClass: "remove-question",
        attrs: { href: "" },
        on: {
          click: function($event) {
            $event.preventDefault();
            return _vm.removeQuestion($event)
          }
        }
      },
      [_vm._v("x")]
    ),
    _vm._v(" "),
    _c("h5", [_vm._v(_vm._s(_vm.question.name))]),
    _vm._v(" "),
    _vm.question.opts_arr && _vm.question.opts_arr.length
      ? _c(
          "div",
          _vm._l(_vm.question.opts_arr, function(opt) {
            return _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.question.filter.opts,
                    expression: "question.filter.opts"
                  }
                ],
                attrs: { type: "checkbox", alue: opt },
                domProps: {
                  checked: Array.isArray(_vm.question.filter.opts)
                    ? _vm._i(_vm.question.filter.opts, null) > -1
                    : _vm.question.filter.opts
                },
                on: {
                  change: [
                    function($event) {
                      var $$a = _vm.question.filter.opts,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false;
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v);
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.question.filter,
                              "opts",
                              $$a.concat([$$v])
                            );
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.question.filter,
                              "opts",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            );
                        }
                      } else {
                        _vm.$set(_vm.question.filter, "opts", $$c);
                      }
                    },
                    _vm.updated
                  ]
                }
              }),
              _vm._v(" " + _vm._s(opt) + "\n\t\t")
            ])
          }),
          0
        )
      : _vm.question.buttons && _vm.question.buttons.length
      ? _c(
          "div",
          _vm._l(_vm.question.buttons, function(button) {
            return _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.question.filter.opts,
                    expression: "question.filter.opts"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  value: button.value,
                  checked: Array.isArray(_vm.question.filter.opts)
                    ? _vm._i(_vm.question.filter.opts, button.value) > -1
                    : _vm.question.filter.opts
                },
                on: {
                  change: [
                    function($event) {
                      var $$a = _vm.question.filter.opts,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false;
                      if (Array.isArray($$a)) {
                        var $$v = button.value,
                          $$i = _vm._i($$a, $$v);
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.question.filter,
                              "opts",
                              $$a.concat([$$v])
                            );
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.question.filter,
                              "opts",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            );
                        }
                      } else {
                        _vm.$set(_vm.question.filter, "opts", $$c);
                      }
                    },
                    _vm.updated
                  ]
                }
              }),
              _vm._v(" " + _vm._s(button.title) + "\n\t\t")
            ])
          }),
          0
        )
      : _vm.questionIsOpen
      ? _c("div", [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.question.filter.str,
                expression: "question.filter.str"
              }
            ],
            staticClass: "text",
            attrs: { type: "text" },
            domProps: { value: _vm.question.filter.str },
            on: {
              change: _vm.updated,
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.question.filter, "str", $event.target.value);
              }
            }
          })
        ])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  var __vue_inject_styles__$a = function (inject) {
    if (!inject) { return }
    inject("data-v-8dd6a7d8_0", { source: "\nh5[data-v-8dd6a7d8] {\n\tfont-weight: normal;\n\tfont-size: 11px;\n\tmargin: 0;\n\tpadding-right: 15px;\n}\n.question-info-container[data-v-8dd6a7d8] {\n\tposition: relative;\n\tmargin-bottom: 10px;\n\tpadding-bottom: 10px;\n\tborder-bottom: 1px solid #eeefee;\n}\n.remove-question[data-v-8dd6a7d8] {\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n}\ninput.text[data-v-8dd6a7d8] {\n\twidth: 300px;\n\tborder-width: 1px !important;\n\tpadding: 2px;\n\tfont-size: 11px;\n}\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/TypeQuestionInfo.vue"],"names":[],"mappings":";AA+CA;CACA,mBAAA;CACA,eAAA;CACA,SAAA;CACA,mBAAA;AACA;AACA;CACA,kBAAA;CACA,mBAAA;CACA,oBAAA;CACA,gCAAA;AACA;AACA;CACA,kBAAA;CACA,QAAA;CACA,MAAA;AACA;AACA;CACA,YAAA;CACA,4BAAA;CACA,YAAA;CACA,eAAA;AACA","file":"TypeQuestionInfo.vue","sourcesContent":["<template>\n\t<div class=\"question-info-container\">\n\t\t<a href=\"\" class=\"remove-question\" @click.prevent=\"removeQuestion\">x</a>\n\t\t<h5>{{question.name}}</h5>\n\t\t<div v-if=\"question.opts_arr && question.opts_arr.length\">\n\t\t\t<label v-for=\"opt in question.opts_arr\" class=\"checkbox\">\n\t\t\t\t<input type=\"checkbox\" :alue=\"opt\" v-model=\"question.filter.opts\"  @change=\"updated\"/> {{opt}}\n\t\t\t</label>\n\t\t</div>\n\t\t<div v-else-if=\"question.buttons && question.buttons.length\">\n\t\t\t<label v-for=\"button in question.buttons\" class=\"checkbox\">\n\t\t\t\t<input type=\"checkbox\" :value=\"button.value\" v-model=\"question.filter.opts\" @change=\"updated\" /> {{button.title}}\n\t\t\t</label>\n\t\t</div>\n\t\t<div v-else-if=\"questionIsOpen\">\n\t\t\t<input type=\"text\" class=\"text\" v-model=\"question.filter.str\" @change=\"updated\" />\n\t\t</div>\n\t</div>\n</template>\n<script>\nexport default {\n\tname: 'TypeQuestionInfo',\n\tprops: {\n\t\tquestion: Object,\n\t},\n\tcreated () {\n\t},\n\tcomputed: {\n\t\tquestionIsOpen () {\n\t\t\tif (['barcode', 'text', 'text-na', 'integer', 'integer-na', 'decimal', 'decimal-na'].indexOf(this.question.type) !== -1) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\t\n\t\t\treturn false;\n\t\t}\n\t},\n\tmethods: {\n\t\tremoveQuestion () {\n\t\t\tthis.$emit('remove-question', this.question);\n\t\t},\n\t\tupdated () {\n\t\t\tthis.$emit('change', this.question);\n\t\t}\n\t}\n}\n</script>\n<style scoped>\nh5 {\n\tfont-weight: normal;\n\tfont-size: 11px;\n\tmargin: 0;\n\tpadding-right: 15px;\n}\n.question-info-container {\n\tposition: relative;\n\tmargin-bottom: 10px;\n\tpadding-bottom: 10px;\n\tborder-bottom: 1px solid #eeefee;\n}\n.remove-question {\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n}\ninput.text {\n\twidth: 300px;\n\tborder-width: 1px !important;\n\tpadding: 2px;\n\tfont-size: 11px;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$a = "data-v-8dd6a7d8";
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$b = {
	name: 'TypeQuestion',
	components: {TypeQuestionInfo: __vue_component__$a},
	created: function created () {
		var self = this;
		axios.get('/api/templates')
		.then(function (r) {
			self.templates = _$1.get(r, 'data.templates');
		})
		.then(function () {
			if (self.filterItem && self.filterItem.questions && self.filterItem.questions.length) {
				self.selectedQuestions = self.filterItem.questions;
				self.updated();
			}
		})
		.then(function () {
			self.isLoaded = true;
		});
	},
	props: {
		filterItem: Object
	},
	data: function data () {
		return {
			isLoaded: false,
			chosenQuestionId: null,
			chosenTemplateId: null,
			templates: [],
			questions: [],
			selectedQuestions: []
		};
	},
	computed: {
		showQuestions: function showQuestions () {
			var self = this;
			var arr = [];
			_$1.each(self.questions, function (question) {
				var foundQuestion = _$1.find(self.selectedQuestions, {id: question.id});
				if (!foundQuestion) {
					arr.push(question);
				}
			});
			
			return arr;
		}
	},
	methods: {
		getQuestionById: function getQuestionById (id) {
			var question = _$1.find(this.questions, {id: id});
			return question;
		},
		changeQuestion: function changeQuestion () {
			var question = this.getQuestionById(this.chosenQuestionId);
			question.filter = {
				opts: [],
				str: ''
			};
			this.chosenQuestionId = null;
			this.selectedQuestions.push(question);
		},
		changeTemplate: function changeTemplate () {
			this.updateQuestions();
		},
		questionsChanged: function questionsChanged () {
			console.log('changed');
			this.updated();
		},
		removeQuestion: function removeQuestion (question) {
			var idx = _$1.findIndex(this.selectedQuestions, {id: question.id});
			this.selectedQuestions.splice(idx, 1);
		},
		updateQuestions: function updateQuestions () {
			var self = this;
			axios.get('/api/filter_questions', {
				params: {
					audit_template_id: self.chosenTemplateId
				}
			})
			.then(function (r) {
				self.questions = _$1.get(r, 'data.questions', []);
			});
		},
		updated: function updated () {
			var numSelected = this.selectedQuestions.length;
			var opts = {
				questions: this.selectedQuestions,
				num: numSelected
			};

			this.$emit('update-filter', opts);
		}
	}
};

/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isLoaded
    ? _c("div", { staticClass: "modal-groups" }, [
        _c("div", { staticClass: "modal-group" }, [
          _vm.templates.length
            ? _c("div", { staticClass: "field control-group" }, [
                _c("label", [_vm._v("Choose Template")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.chosenTemplateId,
                        expression: "chosenTemplateId"
                      }
                    ],
                    on: {
                      change: [
                        function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value;
                              return val
                            });
                          _vm.chosenTemplateId = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0];
                        },
                        _vm.changeTemplate
                      ]
                    }
                  },
                  [
                    _c("option", { domProps: { value: null } }),
                    _vm._v(" "),
                    _vm._l(_vm.templates, function(template) {
                      return _c(
                        "option",
                        { domProps: { value: template.id } },
                        [_vm._v(_vm._s(template.name))]
                      )
                    })
                  ],
                  2
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.chosenTemplateId && _vm.questions.length
            ? _c("div", { staticClass: "field control-group" }, [
                _c("label", [_vm._v("Choose Question")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.chosenQuestionId,
                        expression: "chosenQuestionId"
                      }
                    ],
                    on: {
                      change: [
                        function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value;
                              return val
                            });
                          _vm.chosenQuestionId = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0];
                        },
                        _vm.changeQuestion
                      ]
                    }
                  },
                  [
                    _c("option", { domProps: { value: null } }),
                    _vm._v(" "),
                    _vm._l(_vm.showQuestions, function(question) {
                      return _c(
                        "option",
                        { domProps: { value: question.id } },
                        [_vm._v(_vm._s(question.name))]
                      )
                    })
                  ],
                  2
                )
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "modal-group" },
          _vm._l(_vm.selectedQuestions, function(question) {
            return _c(
              "div",
              [
                _c("TypeQuestionInfo", {
                  attrs: { question: question },
                  on: {
                    "remove-question": _vm.removeQuestion,
                    change: _vm.questionsChanged
                  }
                })
              ],
              1
            )
          }),
          0
        )
      ])
    : _vm._e()
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  var __vue_inject_styles__$b = function (inject) {
    if (!inject) { return }
    inject("data-v-4b6676b4_0", { source: "\nselect[data-v-4b6676b4] {\n\twidth: 370px;\n\tborder-width: 1px;\n\tpadding: 5px;\n\theight: auto;\n\tfont-size: 12px;\n}\n\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/TypeQuestion.vue"],"names":[],"mappings":";AA2HA;CACA,YAAA;CACA,iBAAA;CACA,YAAA;CACA,YAAA;CACA,eAAA;AACA","file":"TypeQuestion.vue","sourcesContent":["<template>\n<div class=\"modal-groups\" v-if=\"isLoaded\">\n\t<div class=\"modal-group\">\n\t\t<div class=\"field control-group\" v-if=\"templates.length\">\n\t\t\t<label>Choose Template</label>\n\t\t\t<select v-model=\"chosenTemplateId\" @change=\"changeTemplate\">\n\t\t\t\t<option :value=\"null\"></option>\n\t\t\t\t<option v-for=\"template in templates\" :value=\"template.id\">{{template.name}}</option>\n\t\t\t</select>\n\t\t</div>\n\t\t<div class=\"field control-group\" v-if=\"chosenTemplateId && questions.length\">\n\t\t\t<label>Choose Question</label>\n\t\t\t<select v-model=\"chosenQuestionId\" @change=\"changeQuestion\">\n\t\t\t\t<option :value=\"null\"></option>\n\t\t\t\t<option v-for=\"question in showQuestions\" :value=\"question.id\">{{question.name}}</option>\n\t\t\t</select>\n\t\t</div>\n\t</div>\n\t<div class=\"modal-group\">\n\t\t<div v-for=\"question in selectedQuestions\">\n\t\t\t<TypeQuestionInfo :question=\"question\" @remove-question=\"removeQuestion\" @change=\"questionsChanged\"></TypeQuestionInfo>\n\t\t</div>\n\t</div>\n</div>\n</template>\n<script>\nimport _ from 'lodash';\nimport TypeQuestionInfo from './TypeQuestionInfo.vue';\nexport default {\n\tname: 'TypeQuestion',\n\tcomponents: {TypeQuestionInfo},\n\tcreated () {\n\t\tlet self = this;\n\t\taxios.get('/api/templates')\n\t\t.then((r) => {\n\t\t\tself.templates = _.get(r, 'data.templates');\n\t\t})\n\t\t.then(() => {\n\t\t\tif (self.filterItem && self.filterItem.questions && self.filterItem.questions.length) {\n\t\t\t\tself.selectedQuestions = self.filterItem.questions;\n\t\t\t\tself.updated();\n\t\t\t}\n\t\t})\n\t\t.then(() => {\n\t\t\tself.isLoaded = true;\n\t\t})\n\t},\n\tprops: {\n\t\tfilterItem: Object\n\t},\n\tdata () {\n\t\treturn {\n\t\t\tisLoaded: false,\n\t\t\tchosenQuestionId: null,\n\t\t\tchosenTemplateId: null,\n\t\t\ttemplates: [],\n\t\t\tquestions: [],\n\t\t\tselectedQuestions: []\n\t\t};\n\t},\n\tcomputed: {\n\t\tshowQuestions () {\n\t\t\tlet self = this;\n\t\t\tlet arr = [];\n\t\t\t_.each(self.questions, (question) => {\n\t\t\t\tlet foundQuestion = _.find(self.selectedQuestions, {id: question.id})\n\t\t\t\tif (!foundQuestion) {\n\t\t\t\t\tarr.push(question);\n\t\t\t\t}\n\t\t\t})\n\t\t\t\n\t\t\treturn arr;\n\t\t}\n\t},\n\tmethods: {\n\t\tgetQuestionById (id) {\n\t\t\tlet question = _.find(this.questions, {id: id});\n\t\t\treturn question;\n\t\t},\n\t\tchangeQuestion () {\n\t\t\tlet question = this.getQuestionById(this.chosenQuestionId);\n\t\t\tquestion.filter = {\n\t\t\t\topts: [],\n\t\t\t\tstr: ''\n\t\t\t};\n\t\t\tthis.chosenQuestionId = null;\n\t\t\tthis.selectedQuestions.push(question);\n\t\t},\n\t\tchangeTemplate () {\n\t\t\tthis.updateQuestions();\n\t\t},\n\t\tquestionsChanged () {\n\t\t\tconsole.log('changed');\n\t\t\tthis.updated();\n\t\t},\n\t\tremoveQuestion (question) {\n\t\t\tlet idx = _.findIndex(this.selectedQuestions, {id: question.id});\n\t\t\tthis.selectedQuestions.splice(idx, 1);\n\t\t},\n\t\tupdateQuestions () {\n\t\t\tlet self = this;\n\t\t\taxios.get('/api/filter_questions', {\n\t\t\t\tparams: {\n\t\t\t\t\taudit_template_id: self.chosenTemplateId\n\t\t\t\t}\n\t\t\t})\n\t\t\t.then(r => {\n\t\t\t\tself.questions = _.get(r, 'data.questions', []);\n\t\t\t})\n\t\t},\n\t\tupdated () {\n\t\t\tlet numSelected = this.selectedQuestions.length;\n\t\t\tlet opts = {\n\t\t\t\tquestions: this.selectedQuestions,\n\t\t\t\tnum: numSelected\n\t\t\t};\n\n\t\t\tthis.$emit('update-filter', opts);\n\t\t}\n\t}\n}\n</script>\n<style scoped>\nselect {\n\twidth: 370px;\n\tborder-width: 1px;\n\tpadding: 5px;\n\theight: auto;\n\tfont-size: 12px;\n}\n\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$b = "data-v-4b6676b4";
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$c = {
	name: 'NewFilterModal',
	components: {TypeLocation: __vue_component__$4, TypeDate: __vue_component__$5, TypeUser: __vue_component__$6, TypeTemplate: __vue_component__$7, TypePreform: __vue_component__$9, TypeQuestion: __vue_component__$b},
	props: {
		filterItem: Object,
		filters: Array
	},
	created: function created () {
		if (this.filterItem && this.filterItem.type) {
			this.chosenType = this.filterItem.type;
			this.isEditing = true;
			this.currentTab = 'options';
		}
	},
	data: function data () {
		return {
			chosenType: null,
			isEditing: false,
			currentTab: 'filter-type',
			currentFilter: {
				type: null
			},
			types: [
				{
					label: 'Date',
					val: 'date',
				},
				{
					label: 'Location',
					val: 'location',
				},
				{
					label: 'Template',
					val: 'template',
				},
				{
					label: 'User',
					val: 'user',
				},
				{
					label: 'Pre-form',
					val: 'preform',
				},
				{
					label: 'Question',
					val: 'question',
				} ]
		}
	},
	computed: {
		showTypes: function showTypes () {
			var self = this;
			var arr = [];
			_$1.each(this.types, function (type) {
				var foundFilter = _$1.find(self.filters, {type: type.val});
				if (!foundFilter) {
					arr.push(type);
				}
			});
			
			return arr;
		}
	},
	methods: {
		changedType: function changedType () {
			this.currentTab = 'options';
		},
		isSelected: function isSelected (val) {
			return this.currentTab === val;
		},
		okClicked: function okClicked () {
			this.currentFilter.type = this.chosenType;
			var ev = new CustomEvent('add-filter', {detail: {filterItem: this.currentFilter}});
			document.dispatchEvent(ev);
			return true;
		},
		setTab: function setTab (val) {
			this.currentTab = val;
		},
		updateFilter: function updateFilter (val) {
			for (var key in val) {
				this.currentFilter[key] = val[key];
			}
		}
	}
};

/* script */
var __vue_script__$c = script$c;

/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c("div", { staticClass: "modal-tabs rel" }, [
        !_vm.isEditing
          ? _c(
              "div",
              {
                staticClass: "modal-tab",
                class: { selected: _vm.isSelected("filter-type") },
                on: {
                  click: function($event) {
                    return _vm.setTab("filter-type")
                  }
                }
              },
              [_vm._v("Filter Type")]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.chosenType
          ? _c(
              "div",
              {
                staticClass: "modal-tab",
                class: { selected: _vm.isSelected("options") },
                on: {
                  click: function($event) {
                    return _vm.setTab("options")
                  }
                }
              },
              [_vm._v("Options")]
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isSelected("filter-type"),
              expression: "isSelected('filter-type')"
            }
          ],
          staticClass: "modal-item"
        },
        [
          _c("div", { staticClass: "field control-group" }, [
            _c("label", [_vm._v("Choose Filter")]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.chosenType,
                    expression: "chosenType"
                  }
                ],
                on: {
                  change: [
                    function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value;
                          return val
                        });
                      _vm.chosenType = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0];
                    },
                    _vm.changedType
                  ]
                }
              },
              [
                _c("option", { domProps: { value: null } }),
                _vm._v(" "),
                _vm._l(_vm.showTypes, function(type) {
                  return _c("option", { domProps: { value: type.val } }, [
                    _vm._v(_vm._s(type.label))
                  ])
                })
              ],
              2
            )
          ])
        ]
      ),
      _vm._v(" "),
      _vm.isSelected("options")
        ? [
            _vm.chosenType === "location"
              ? _c("TypeLocation", {
                  attrs: { "filter-item": _vm.filterItem },
                  on: { "update-filter": _vm.updateFilter }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.chosenType === "date"
              ? _c("TypeDate", {
                  attrs: { "filter-item": _vm.filterItem },
                  on: { "update-filter": _vm.updateFilter }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.chosenType === "user"
              ? _c("TypeUser", {
                  attrs: { "filter-item": _vm.filterItem },
                  on: { "update-filter": _vm.updateFilter }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.chosenType === "template"
              ? _c("TypeTemplate", {
                  attrs: { "filter-item": _vm.filterItem },
                  on: { "update-filter": _vm.updateFilter }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.chosenType === "preform"
              ? _c("TypePreform", {
                  attrs: { "filter-item": _vm.filterItem },
                  on: { "update-filter": _vm.updateFilter }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.chosenType === "question"
              ? _c("TypeQuestion", {
                  attrs: { "filter-item": _vm.filterItem },
                  on: { "update-filter": _vm.updateFilter }
                })
              : _vm._e()
          ]
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  var __vue_inject_styles__$c = function (inject) {
    if (!inject) { return }
    inject("data-v-5173e837_0", { source: "\n.modal-item[data-v-5173e837] {\n\tmargin: 10px;\n}\n.field > select[data-v-5173e837] {\n\theight: auto;\n\tpadding: 5px 0;\n\tfont-size: 11px;\n\tborder-width: 1px;\n}\n.modal-tabs.rel[data-v-5173e837] {\n\tposition: relative;\n}\n[data-v-5173e837] .modal-groups {\n\tdisplay: flex;\n\tpadding: 10px;\n\tmax-height: 330px;\n\tpadding-bottom: 30px;\n\toverflow-y: auto;\n}\n[data-v-5173e837] .modal-group {\n\tflex: 1;\n}\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/NewFilterModal.vue"],"names":[],"mappings":";AA4IA;CACA,YAAA;AACA;AACA;CACA,YAAA;CACA,cAAA;CACA,eAAA;CACA,iBAAA;AACA;AACA;CACA,kBAAA;AACA;AACA;CACA,aAAA;CACA,aAAA;CACA,iBAAA;CACA,oBAAA;CACA,gBAAA;AACA;AACA;CACA,OAAA;AACA","file":"NewFilterModal.vue","sourcesContent":["<template>\n<div>\n\t<div class=\"modal-tabs rel\">\n\t\t<div class=\"modal-tab\" v-if=\"!isEditing\" :class=\"{selected: isSelected('filter-type')}\" @click=\"setTab('filter-type')\">Filter Type</div>\n\t\t<div class=\"modal-tab\" :class=\"{selected: isSelected('options')}\" v-if=\"chosenType\" @click=\"setTab('options')\">Options</div>\n\t</div>\n\t<div class=\"modal-item\" v-show=\"isSelected('filter-type')\">\n\t\t<div class=\"field control-group\">\n\t\t\t<label>Choose Filter</label>\n\t\t\t<select v-model=\"chosenType\" @change=\"changedType\">\n\t\t\t\t<option :value=\"null\"></option>\n\t\t\t\t<option v-for=\"type in showTypes\" :value=\"type.val\">{{type.label}}</option>\n\t\t\t</select>\n\t\t</div>\n\t</div>\n\t<template v-if=\"isSelected('options')\">\n\t\t<TypeLocation\n\t\t\tv-if=\"chosenType === 'location'\"\n\t\t\t:filter-item=\"filterItem\"\n\t\t\t@update-filter=\"updateFilter\"></TypeLocation>\n\t\t<TypeDate\n\t\t\tv-if=\"chosenType === 'date'\"\n\t\t\t:filter-item=\"filterItem\"\n\t\t\t@update-filter=\"updateFilter\"></TypeDate>\n\t\t<TypeUser\n\t\t\tv-if=\"chosenType === 'user'\"\n\t\t\t:filter-item=\"filterItem\"\n\t\t\t@update-filter=\"updateFilter\"></TypeUser>\n\t\t<TypeTemplate\n\t\t\tv-if=\"chosenType === 'template'\"\n\t\t\t:filter-item=\"filterItem\"\n\t\t\t@update-filter=\"updateFilter\"></TypeTemplate>\n\t\t<TypePreform\n\t\t\tv-if=\"chosenType === 'preform'\"\n\t\t\t:filter-item=\"filterItem\"\n\t\t\t@update-filter=\"updateFilter\"></TypePreform>\n\t\t<TypeQuestion\n\t\t\tv-if=\"chosenType === 'question'\"\n\t\t\t:filter-item=\"filterItem\"\n\t\t\t@update-filter=\"updateFilter\"></TypeQuestion>\n\t</template>\n</div>\n</template>\n<script>\nimport _ from 'lodash';\nimport TypeLocation from './TypeLocation.vue';\nimport TypeDate from './TypeDate.vue';\nimport TypeUser from './TypeUser.vue';\nimport TypeTemplate from './TypeTemplate.vue';\nimport TypePreform from './TypePreform.vue';\nimport TypeQuestion from './TypeQuestion.vue';\nexport default {\n\tname: 'NewFilterModal',\n\tcomponents: {TypeLocation, TypeDate, TypeUser, TypeTemplate, TypePreform, TypeQuestion},\n\tprops: {\n\t\tfilterItem: Object,\n\t\tfilters: Array\n\t},\n\tcreated () {\n\t\tif (this.filterItem && this.filterItem.type) {\n\t\t\tthis.chosenType = this.filterItem.type;\n\t\t\tthis.isEditing = true;\n\t\t\tthis.currentTab = 'options';\n\t\t}\n\t},\n\tdata () {\n\t\treturn {\n\t\t\tchosenType: null,\n\t\t\tisEditing: false,\n\t\t\tcurrentTab: 'filter-type',\n\t\t\tcurrentFilter: {\n\t\t\t\ttype: null\n\t\t\t},\n\t\t\ttypes: [\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Date',\n\t\t\t\t\tval: 'date',\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Location',\n\t\t\t\t\tval: 'location',\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Template',\n\t\t\t\t\tval: 'template',\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'User',\n\t\t\t\t\tval: 'user',\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Pre-form',\n\t\t\t\t\tval: 'preform',\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tlabel: 'Question',\n\t\t\t\t\tval: 'question',\n\t\t\t\t},\n\t\t\t]\n\t\t}\n\t},\n\tcomputed: {\n\t\tshowTypes () {\n\t\t\tlet self = this;\n\t\t\tlet arr = [];\n\t\t\t_.each(this.types, (type) => {\n\t\t\t\tlet foundFilter = _.find(self.filters, {type: type.val});\n\t\t\t\tif (!foundFilter) {\n\t\t\t\t\tarr.push(type);\n\t\t\t\t}\n\t\t\t})\n\t\t\t\n\t\t\treturn arr;\n\t\t}\n\t},\n\tmethods: {\n\t\tchangedType () {\n\t\t\tthis.currentTab = 'options';\n\t\t},\n\t\tisSelected (val) {\n\t\t\treturn this.currentTab === val;\n\t\t},\n\t\tokClicked () {\n\t\t\tthis.currentFilter.type = this.chosenType;\n\t\t\tlet ev = new CustomEvent('add-filter', {detail: {filterItem: this.currentFilter}});\n\t\t\tdocument.dispatchEvent(ev);\n\t\t\treturn true;\n\t\t},\n\t\tsetTab (val) {\n\t\t\tthis.currentTab = val;\n\t\t},\n\t\tupdateFilter (val) {\n\t\t\tfor (var key in val) {\n\t\t\t\tthis.currentFilter[key] = val[key];\n\t\t\t}\n\t\t}\n\t}\n}\n</script>\n<style scoped>\n.modal-item {\n\tmargin: 10px;\n}\n.field > select {\n\theight: auto;\n\tpadding: 5px 0;\n\tfont-size: 11px;\n\tborder-width: 1px;\n}\n.modal-tabs.rel {\n\tposition: relative;\n}\n>>> .modal-groups {\n\tdisplay: flex;\n\tpadding: 10px;\n\tmax-height: 330px;\n\tpadding-bottom: 30px;\n\toverflow-y: auto;\n}\n>>> .modal-group {\n\tflex: 1;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$c = "data-v-5173e837";
  /* module identifier */
  var __vue_module_identifier__$c = undefined;
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$d = {
	name: 'FilterItem',
	props: {
		filterItem: Object
	},
	data: function data () {
		return {
			formatNice: 'DD MMM YYYY',
		}
	},
	computed: {
		label: function label () {
			if (this.filterItem.type === 'date') {
				var str = moment$1(this.filterItem.dateRange[0]).format(this.formatNice);
				str += ' - ';
				str += moment$1(this.filterItem.dateRange[1]).format(this.formatNice);
				return str;
			} else if (this.filterItem.num > 0) {
				return '' + this.filterItem.num + ' selected';
			}
			return '-';
		},
		typeLabel: function typeLabel () {
			return this.filterItem.type;
		}
	},
	methods: {
		clicked: function clicked () {
			this.$emit('click', this.filterItem);
		}
	}
};

/* script */
var __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "filter-item", on: { click: _vm.clicked } }, [
    _c("div", { staticClass: "filter-label" }, [_vm._v(_vm._s(_vm.typeLabel))]),
    _vm._v(" "),
    _c("div", { staticClass: "filter-val" }, [_vm._v(_vm._s(_vm.label))])
  ])
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  var __vue_inject_styles__$d = function (inject) {
    if (!inject) { return }
    inject("data-v-0385066f_0", { source: "\n.filter-item[data-v-0385066f] {\n\tpadding-left: 10px;\n\tpadding-right: 10px;\n\tborder-right: 1px solid #1a6b4d;\n\tborder-bottom: 1px solid #1a6b4d; \n\theight: 45px;\n\tfloat: left;\n\tcursor: pointer;\n}\n.filter-item[data-v-0385066f]:hover {\n\tbackground: #1a6b4d;\n}\n.filter-label[data-v-0385066f] {\n\tcolor: #89b7a7;\n\tfont-siZe: 12px;\n\ttext-transform: capitalize;\n}\n.filter-val[data-v-0385066f] {\n\tcolor: #fff;\n}\n\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/FilterItem.vue"],"names":[],"mappings":";AA0CA;CACA,kBAAA;CACA,mBAAA;CACA,+BAAA;CACA,gCAAA;CACA,YAAA;CACA,WAAA;CACA,eAAA;AACA;AACA;CACA,mBAAA;AACA;AACA;CACA,cAAA;CACA,eAAA;CACA,0BAAA;AACA;AACA;CACA,WAAA;AACA","file":"FilterItem.vue","sourcesContent":["<template>\n\t<div class=\"filter-item\" @click=\"clicked\">\n\t\t<div class=\"filter-label\">{{typeLabel}}</div>\n\t\t<div class=\"filter-val\">{{label}}</div>\n\t</div>\n</template>\n<script>\nimport moment from 'moment';\nexport default {\n\tname: 'FilterItem',\n\tprops: {\n\t\tfilterItem: Object\n\t},\n\tdata () {\n\t\treturn {\n\t\t\tformatNice: 'DD MMM YYYY',\n\t\t}\n\t},\n\tcomputed: {\n\t\tlabel () {\n\t\t\tif (this.filterItem.type === 'date') {\n\t\t\t\tlet str = moment(this.filterItem.dateRange[0]).format(this.formatNice);\n\t\t\t\tstr += ' - ';\n\t\t\t\tstr += moment(this.filterItem.dateRange[1]).format(this.formatNice);\n\t\t\t\treturn str;\n\t\t\t} else if (this.filterItem.num > 0) {\n\t\t\t\treturn '' + this.filterItem.num + ' selected';\n\t\t\t}\n\t\t\treturn '-';\n\t\t},\n\t\ttypeLabel () {\n\t\t\treturn this.filterItem.type;\n\t\t}\n\t},\n\tmethods: {\n\t\tclicked () {\n\t\t\tthis.$emit('click', this.filterItem);\n\t\t}\n\t}\n}\n</script>\n<style scoped>\n.filter-item {\n\tpadding-left: 10px;\n\tpadding-right: 10px;\n\tborder-right: 1px solid #1a6b4d;\n\tborder-bottom: 1px solid #1a6b4d; \n\theight: 45px;\n\tfloat: left;\n\tcursor: pointer;\n}\n.filter-item:hover {\n\tbackground: #1a6b4d;\n}\n.filter-label {\n\tcolor: #89b7a7;\n\tfont-siZe: 12px;\n\ttext-transform: capitalize;\n}\n.filter-val {\n\tcolor: #fff;\n}\n\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$d = "data-v-0385066f";
  /* module identifier */
  var __vue_module_identifier__$d = undefined;
  /* functional template */
  var __vue_is_functional_template__$d = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$d = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//

var script$e = {
	name: 'FilterApplyBtn',
	props: {
		filters: Array
	},
	methods: {
		clicked: function clicked () {
			this.$emit('click', this.filters);
		}
	}
};

/* script */
var __vue_script__$e = script$e;

/* template */
var __vue_render__$e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "apply-filters", on: { click: _vm.clicked } },
    [_vm._v("Apply Filters")]
  )
};
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  var __vue_inject_styles__$e = function (inject) {
    if (!inject) { return }
    inject("data-v-0292129e_0", { source: "\n.apply-filters[data-v-0292129e] {\n\tbackground: #ffc819;\n\tcolor: #fff;\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\theight: 45px;\n\tline-height: 45px;\n\tfont-size: 12px;\n\twidth: 116px;\n\ttext-align: center;\n\tfont-family: 'soho-light';\n\tfont-weight: normal;\n\ttext-transform: uppercase;\n\tcursor: pointer;\n}\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/FilterApplyBtn.vue"],"names":[],"mappings":";AAiBA;CACA,mBAAA;CACA,WAAA;CACA,kBAAA;CACA,QAAA;CACA,MAAA;CACA,YAAA;CACA,iBAAA;CACA,eAAA;CACA,YAAA;CACA,kBAAA;CACA,yBAAA;CACA,mBAAA;CACA,yBAAA;CACA,eAAA;AACA","file":"FilterApplyBtn.vue","sourcesContent":["<template>\n\t<div class=\"apply-filters\" @click=\"clicked\">Apply Filters</div>\n</template>\n<script>\nexport default {\n\tname: 'FilterApplyBtn',\n\tprops: {\n\t\tfilters: Array\n\t},\n\tmethods: {\n\t\tclicked () {\n\t\t\tthis.$emit('click', this.filters);\n\t\t}\n\t}\n}\n</script>\n<style scoped>\n.apply-filters {\n\tbackground: #ffc819;\n\tcolor: #fff;\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\theight: 45px;\n\tline-height: 45px;\n\tfont-size: 12px;\n\twidth: 116px;\n\ttext-align: center;\n\tfont-family: 'soho-light';\n\tfont-weight: normal;\n\ttext-transform: uppercase;\n\tcursor: pointer;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$e = "data-v-0292129e";
  /* module identifier */
  var __vue_module_identifier__$e = undefined;
  /* functional template */
  var __vue_is_functional_template__$e = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$e = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$f = {
	name: 'FilterList',
	components: {Modal: __vue_component__, FilterItem: __vue_component__$d, FilterDate: __vue_component__$1, FilterDateModal: __vue_component__$2, NewFilterModal: __vue_component__$c, FilterApplyBtn: __vue_component__$e},
	created: function created () {
		var self = this;

		if (self.authToken) {
			axios$1.defaults.headers.common['Authorization'] = 'Bearer ' + self.authToken;
		}

		if (self.baseUrl) {
			axios$1.defaults.baseURL = self.baseUrl;
		}

		document.addEventListener('add-filter', function (ev) {
			self.$nextTick(function () {
				self.addFilter(ev.detail.filterItem);
			});
		});
	},
	props: {
		authToken: {
			type: String,
			default: function default$1 () {
				return null;
			}
		},
		baseUrl: {
			type: String,
			default: function default$2 () {
				return null;
			}
		}
	},
	data: function data () {
		return {
			title: 'Title',
			needsToApply: false,
			filters: [],
			needsToSave: false,
			isSaving: false,
			widgetTabs: [{
				label: 'Tab 1',
				val: 'tab1'
			}],
			modal: {
				show: false,
				title: 'This is the title oh',
				component: 'new-item',
				props: {
				},
				componentProps: {
				}
			}
		}
	},
	methods: {
		addFilter: function addFilter (newFilter) {
			var idx = _.findIndex(this.filters, {type: newFilter.type});
			if (idx !== -1) {
				this.filters[idx] = newFilter;
			} else {
				this.filters.push(newFilter);
			}

			this.needsToApply = true;
			window.filterItems = this.filters;
		},
		applyFilters: function applyFilters (filterList) {
			var ev = new CustomEvent('apply-filters', {detail: {filterList: filterList}});
			document.dispatchEvent(ev);
			this.$emit('apply-filters', {detail: {filterList: filterList}});
			this.needsToApply = false;
		},
		currentTab: function currentTab (name) {
			return this.selectedTab === name;
		},
		editFilter: function editFilter (filterItem) {
			var opts = {
				title: 'Edit Filter',
				component: 'new-filter-modal',
				props: {
					classes: {nopadding: true}
				},
				componentProps: {
					filterItem: filterItem
				}
			};

			return this.modalNew(opts);
		},
		setTab: function setTab (name) {
			this.selectedTab = name;
		},
		modalClose: function modalClose () {
			this.modalReset();
			this.modal.show = false;
		},
		modalCancelClicked: function modalCancelClicked () {
			var cancelcb = _.get(this.$refs, 'modalComponent.cancelClicked');
			if (cancelcb) {
				var shouldCloseModal = cancelcb();
				if (shouldCloseModal === true) {
					this.modalClose();
				}
			} else {
				return this.modalClose();
			}
		},
		modalClickOks: function modalClickOks () {
			var okcb = _.get(this.$refs, 'modalComponent.okClicked');
			if (okcb) {
				var result = okcb();
				if (result === true) {
					return this.modalClose();
				}
			} else {
				return this.modalClose();
			}
		},
		modalDeleteClicked: function modalDeleteClicked () {
			var deleteCb = _.get(this.$refs, 'modalComponent.deleteClicked');
			if (deleteCb) {
				var shouldCloseModal = deleteCb();
				if (shouldCloseModal === true) {
					return this.modalClose();
				}
			}
		},
		modalNew: function modalNew (modalOpts) {
			var this$1 = this;

			_.each(modalOpts, function (opt, key) {
				this$1.modal[key] = opt;
			});
			this.modal.componentProps.filters = this.filters;
			this.modal.show = true;
		},
		modalReset: function modalReset() {
			this.modal = {
				show: false,
				title: 'This is the title',
				component: 'new-item',
				props: {},
				componentProps: {}
			};
		},
		newFilter: function newFilter () {
			var opts = {
				title: 'New Filter',
				component: 'new-filter-modal',
				props: {
					classes: {nopadding: true}
				}
			};

			return this.modalNew(opts);
		}
	}
};

/* script */
var __vue_script__$f = script$f;

/* template */
var __vue_render__$f = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "filters" },
    [
      _c(
        "div",
        { staticClass: "filter-items-container" },
        [
          _c(
            "div",
            {
              staticClass: "button",
              attrs: { href: "" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.newFilter($event)
                }
              }
            },
            [
              _c("svg", { staticClass: "nicon nicon-outline" }, [
                _c("use", {
                  attrs: {
                    href: "#nicon-filter",
                    "xlink:href": "#nicon-filter"
                  }
                })
              ])
            ]
          ),
          _vm._v(" "),
          _vm._l(_vm.filters, function(filterItem) {
            return _c("FilterItem", {
              key: filterItem.type,
              attrs: { "filter-item": filterItem },
              on: { click: _vm.editFilter }
            })
          })
        ],
        2
      ),
      _vm._v(" "),
      _vm.needsToApply
        ? _c("FilterApplyBtn", {
            attrs: { filters: _vm.filters },
            on: { click: _vm.applyFilters }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "clear" }),
      _vm._v(" "),
      _vm.modal.show === true
        ? _c(
            "modal",
            _vm._b(
              {
                attrs: { title: _vm.modal.title },
                on: {
                  cancelclicked: _vm.modalCancelClicked,
                  okclicked: _vm.modalClickOks,
                  deleteclicked: _vm.modalDeleteClicked
                }
              },
              "modal",
              _vm.modal.props,
              false
            ),
            [
              _vm.modal.component
                ? _c(
                    _vm.modal.component,
                    _vm._b(
                      { ref: "modalComponent", tag: "div" },
                      "div",
                      _vm.modal.componentProps,
                      false
                    )
                  )
                : _vm._e()
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;

  /* style */
  var __vue_inject_styles__$f = function (inject) {
    if (!inject) { return }
    inject("data-v-5975b17a_0", { source: "\n.filters[data-v-5975b17a] {\n\tbackground: #1f7f5c;\n\tmin-height: 45px;\n\tposition: relative;\n}\n.filter-items-container[data-v-5975b17a] {\n\twidth: 821px;\n}\n.button[data-v-5975b17a] {\n\tcolor: #fff;\n\theight: 45px;\n\twidth: 45px;\n\tfloat: left;\n\tbackground: none;\n\tborder: none;\n\tborder-right: 1px solid #1a6b4d;\n\tborder-bottom: 1px solid #1a6b4d;\n\ttext-align: center;\n\tline-height: 45px;\n\tcursor: pointer;\n}\n.button[data-v-5975b17a]:hover {\n\tbackground: #1a6b4d;\n}\n.button svg[data-v-5975b17a] {\n\theight: 14px;\n\twidth: 14px;\n\tcolor: #89b7a7;\n}\n[data-v-5975b17a] .modal-header {\n\tposition: relative;\n\tborder-bottom: none;\n}\n[data-v-5975b17a] .modal {\n\twidth: 800px;\n\tmargin-left: -400px;\n}\n[data-v-5975b17a] .modal.nopadding .modal-body {\n\tpadding: 0;\n}\n[data-v-5975b17a] .modal-tabs {\n\tdisplay: flex;\n\theight: 40px;\n\tbackground: #38737b;\n\tmargin-bottom: 10px;\n}\n[data-v-5975b17a] .modal-tabs .modal-tab {\n\tflex: 1;\n\tdisplay: block;\n\theight: 40px;\n\tpadding: 0 10px;\n\tline-height: 40px;\n\ttext-transform: uppercase;\n\ttext-align: center;\n\tcolor: #fff;\n\ttext-decoration: none;\n\tcursor: pointer;\n}\n[data-v-5975b17a] .modal-tabs .modal-tab.selected {\n\tbackground: #5a9aa8;\n}\n[data-v-5975b17a] .select-all-none {\n\tcolor: #999;\n\tmargin-bottom: 5px;\n}\n[data-v-5975b17a] .select-all-none-divider {\n\tmargin-left: 5px;\n\tmargin-right: 5px;\n}\n[data-v-5975b17a] .modal-group h4 {\n\ttext-transform: uppercase;\n\tfont-family: 'soho-light';\n\tfont-weight: normal;\n\tmargin: 0;\n}\n", map: {"version":3,"sources":["/Users/bmidget/Sites/freshability-filter/src/FilterList.vue"],"names":[],"mappings":";AAoMA;CACA,mBAAA;CACA,gBAAA;CACA,kBAAA;AACA;AACA;CACA,YAAA;AACA;AACA;CACA,WAAA;CACA,YAAA;CACA,WAAA;CACA,WAAA;CACA,gBAAA;CACA,YAAA;CACA,+BAAA;CACA,gCAAA;CACA,kBAAA;CACA,iBAAA;CACA,eAAA;AACA;AACA;CACA,mBAAA;AACA;AACA;CACA,YAAA;CACA,WAAA;CACA,cAAA;AACA;AACA;CACA,kBAAA;CACA,mBAAA;AACA;AACA;CACA,YAAA;CACA,mBAAA;AACA;AACA;CACA,UAAA;AACA;AACA;CACA,aAAA;CACA,YAAA;CACA,mBAAA;CACA,mBAAA;AACA;AACA;CACA,OAAA;CACA,cAAA;CACA,YAAA;CACA,eAAA;CACA,iBAAA;CACA,yBAAA;CACA,kBAAA;CACA,WAAA;CACA,qBAAA;CACA,eAAA;AACA;AACA;CACA,mBAAA;AACA;AACA;CACA,WAAA;CACA,kBAAA;AACA;AACA;CACA,gBAAA;CACA,iBAAA;AACA;AACA;CACA,yBAAA;CACA,yBAAA;CACA,mBAAA;CACA,SAAA;AACA","file":"FilterList.vue","sourcesContent":["<template>\n\t<div class=\"filters\">\n\t\t<div class=\"filter-items-container\">\n\t\t\t<div class=\"button\" href=\"\" @click.prevent=\"newFilter\">\n\t\t\t\t<svg class=\"nicon nicon-outline\"><use href=\"#nicon-filter\" xlink:href=\"#nicon-filter\"/></svg>\n\t\t\t</div>\n\t\t\t<FilterItem v-for=\"filterItem in filters\" :key=\"filterItem.type\" :filter-item=\"filterItem\" @click=\"editFilter\"></FilterItem>\n\t\t</div>\n\t\t<FilterApplyBtn @click=\"applyFilters\" :filters=\"filters\" v-if=\"needsToApply\"></FilterApplyBtn>\n\t\t<div class=\"clear\"></div>\n\t\t<modal\n\t\t\tv-if=\"modal.show === true\"\n\t\t\t:title=\"modal.title\"\n\t\t\tv-bind=\"modal.props\"\n\t\t\t@cancelclicked=\"modalCancelClicked\"\n\t\t\t@okclicked=\"modalClickOks\"\n\t\t\t@deleteclicked=\"modalDeleteClicked\">\n\t\t\t\t<div\n\t\t\t\t\tv-if=\"modal.component\"\n\t\t\t\t\t:is=\"modal.component\"\n\t\t\t\t\tv-bind=\"modal.componentProps\"\n\t\t\t\t\tref=\"modalComponent\"></div>\n\t\t</modal>\n\t</div>\n\n</template>\n\n<script>\n\timport axios from 'axios';\n\timport Modal from './Modal.vue';\n\timport FilterDate from './FilterDate.vue';\n\timport FilterDateModal from './FilterDateModal.vue';\n\timport NewFilterModal from './NewFilterModal.vue';\n\timport FilterItem from './FilterItem.vue';\n\timport FilterApplyBtn from './FilterApplyBtn.vue';\n\texport default {\n\t\tname: 'FilterList',\n\t\tcomponents: {Modal, FilterItem, FilterDate, FilterDateModal, NewFilterModal, FilterApplyBtn},\n\t\tcreated () {\n\t\t\tlet self = this;\n\n\t\t\tif (self.authToken) {\n\t\t\t\taxios.defaults.headers.common['Authorization'] = 'Bearer ' + self.authToken;\n\t\t\t}\n\n\t\t\tif (self.baseUrl) {\n\t\t\t\taxios.defaults.baseURL = self.baseUrl;\n\t\t\t}\n\n\t\t\tdocument.addEventListener('add-filter', (ev) => {\n\t\t\t\tself.$nextTick(() => {\n\t\t\t\t\tself.addFilter(ev.detail.filterItem);\n\t\t\t\t})\n\t\t\t})\n\t\t},\n\t\tprops: {\n\t\t\tauthToken: {\n\t\t\t\ttype: String,\n\t\t\t\tdefault () {\n\t\t\t\t\treturn null;\n\t\t\t\t}\n\t\t\t},\n\t\t\tbaseUrl: {\n\t\t\t\ttype: String,\n\t\t\t\tdefault () {\n\t\t\t\t\treturn null;\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\tdata () {\n\t\t\treturn {\n\t\t\t\ttitle: 'Title',\n\t\t\t\tneedsToApply: false,\n\t\t\t\tfilters: [],\n\t\t\t\tneedsToSave: false,\n\t\t\t\tisSaving: false,\n\t\t\t\twidgetTabs: [{\n\t\t\t\t\tlabel: 'Tab 1',\n\t\t\t\t\tval: 'tab1'\n\t\t\t\t}],\n\t\t\t\tmodal: {\n\t\t\t\t\tshow: false,\n\t\t\t\t\ttitle: 'This is the title oh',\n\t\t\t\t\tcomponent: 'new-item',\n\t\t\t\t\tprops: {\n\t\t\t\t\t},\n\t\t\t\t\tcomponentProps: {\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\tmethods: {\n\t\t\taddFilter (newFilter) {\n\t\t\t\tlet idx = _.findIndex(this.filters, {type: newFilter.type});\n\t\t\t\tif (idx !== -1) {\n\t\t\t\t\tthis.filters[idx] = newFilter;\n\t\t\t\t} else {\n\t\t\t\t\tthis.filters.push(newFilter);\n\t\t\t\t}\n\n\t\t\t\tthis.needsToApply = true;\n\t\t\t\twindow.filterItems = this.filters;\n\t\t\t},\n\t\t\tapplyFilters (filterList) {\n\t\t\t\tlet ev = new CustomEvent('apply-filters', {detail: {filterList: filterList}});\n\t\t\t\tdocument.dispatchEvent(ev);\n\t\t\t\tthis.$emit('apply-filters', {detail: {filterList: filterList}});\n\t\t\t\tthis.needsToApply = false;\n\t\t\t},\n\t\t\tcurrentTab (name) {\n\t\t\t\treturn this.selectedTab === name;\n\t\t\t},\n\t\t\teditFilter (filterItem) {\n\t\t\t\tlet opts = {\n\t\t\t\t\ttitle: 'Edit Filter',\n\t\t\t\t\tcomponent: 'new-filter-modal',\n\t\t\t\t\tprops: {\n\t\t\t\t\t\tclasses: {nopadding: true}\n\t\t\t\t\t},\n\t\t\t\t\tcomponentProps: {\n\t\t\t\t\t\tfilterItem: filterItem\n\t\t\t\t\t}\n\t\t\t\t};\n\n\t\t\t\treturn this.modalNew(opts);\n\t\t\t},\n\t\t\tsetTab (name) {\n\t\t\t\tthis.selectedTab = name;\n\t\t\t},\n\t\t\tmodalClose () {\n\t\t\t\tthis.modalReset();\n\t\t\t\tthis.modal.show = false;\n\t\t\t},\n\t\t\tmodalCancelClicked () {\n\t\t\t\tlet cancelcb = _.get(this.$refs, 'modalComponent.cancelClicked');\n\t\t\t\tif (cancelcb) {\n\t\t\t\t\tlet shouldCloseModal = cancelcb();\n\t\t\t\t\tif (shouldCloseModal === true) {\n\t\t\t\t\t\tthis.modalClose();\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\treturn this.modalClose();\n\t\t\t\t}\n\t\t\t},\n\t\t\tmodalClickOks () {\n\t\t\t\tlet okcb = _.get(this.$refs, 'modalComponent.okClicked');\n\t\t\t\tif (okcb) {\n\t\t\t\t\tlet result = okcb();\n\t\t\t\t\tif (result === true) {\n\t\t\t\t\t\treturn this.modalClose();\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\treturn this.modalClose();\n\t\t\t\t}\n\t\t\t},\n\t\t\tmodalDeleteClicked () {\n\t\t\t\tlet deleteCb = _.get(this.$refs, 'modalComponent.deleteClicked');\n\t\t\t\tif (deleteCb) {\n\t\t\t\t\tlet shouldCloseModal = deleteCb();\n\t\t\t\t\tif (shouldCloseModal === true) {\n\t\t\t\t\t\treturn this.modalClose();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t},\n\t\t\tmodalNew (modalOpts) {\n\t\t\t\t_.each(modalOpts, (opt, key) => {\n\t\t\t\t\tthis.modal[key] = opt;\n\t\t\t\t})\n\t\t\t\tthis.modal.componentProps.filters = this.filters;\n\t\t\t\tthis.modal.show = true;\n\t\t\t},\n\t\t\tmodalReset() {\n\t\t\t\tthis.modal = {\n\t\t\t\t\tshow: false,\n\t\t\t\t\ttitle: 'This is the title',\n\t\t\t\t\tcomponent: 'new-item',\n\t\t\t\t\tprops: {},\n\t\t\t\t\tcomponentProps: {}\n\t\t\t\t}\n\t\t\t},\n\t\t\tnewFilter () {\n\t\t\t\tlet opts = {\n\t\t\t\t\ttitle: 'New Filter',\n\t\t\t\t\tcomponent: 'new-filter-modal',\n\t\t\t\t\tprops: {\n\t\t\t\t\t\tclasses: {nopadding: true}\n\t\t\t\t\t}\n\t\t\t\t};\n\n\t\t\t\treturn this.modalNew(opts);\n\t\t\t}\n\t\t}\n\t}\n</script>\n\n<style scoped>\n.filters {\n\tbackground: #1f7f5c;\n\tmin-height: 45px;\n\tposition: relative;\n}\n.filter-items-container {\n\twidth: 821px;\n}\n.button {\n\tcolor: #fff;\n\theight: 45px;\n\twidth: 45px;\n\tfloat: left;\n\tbackground: none;\n\tborder: none;\n\tborder-right: 1px solid #1a6b4d;\n\tborder-bottom: 1px solid #1a6b4d;\n\ttext-align: center;\n\tline-height: 45px;\n\tcursor: pointer;\n}\n.button:hover {\n\tbackground: #1a6b4d;\n}\n.button svg {\n\theight: 14px;\n\twidth: 14px;\n\tcolor: #89b7a7;\n}\n>>> .modal-header {\n\tposition: relative;\n\tborder-bottom: none;\n}\n>>> .modal {\n\twidth: 800px;\n\tmargin-left: -400px;\n}\n>>> .modal.nopadding .modal-body {\n\tpadding: 0;\n}\n>>> .modal-tabs {\n\tdisplay: flex;\n\theight: 40px;\n\tbackground: #38737b;\n\tmargin-bottom: 10px;\n}\n>>> .modal-tabs .modal-tab {\n\tflex: 1;\n\tdisplay: block;\n\theight: 40px;\n\tpadding: 0 10px;\n\tline-height: 40px;\n\ttext-transform: uppercase;\n\ttext-align: center;\n\tcolor: #fff;\n\ttext-decoration: none;\n\tcursor: pointer;\n}\n>>> .modal-tabs .modal-tab.selected {\n\tbackground: #5a9aa8;\n}\n>>> .select-all-none {\n\tcolor: #999;\n\tmargin-bottom: 5px;\n}\n>>> .select-all-none-divider {\n\tmargin-left: 5px;\n\tmargin-right: 5px;\n}\n>>> .modal-group h4 {\n\ttext-transform: uppercase;\n\tfont-family: 'soho-light';\n\tfont-weight: normal;\n\tmargin: 0;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$f = "data-v-5975b17a";
  /* module identifier */
  var __vue_module_identifier__$f = undefined;
  /* functional template */
  var __vue_is_functional_template__$f = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('FilterList', __vue_component__$f);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default __vue_component__$f;
export { install };
