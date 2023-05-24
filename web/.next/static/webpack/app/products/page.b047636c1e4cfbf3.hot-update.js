"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/products/page",{

/***/ "(app-client)/./src/components/product-list.component.tsx":
/*!***************************************************!*\
  !*** ./src/components/product-list.component.tsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProductList\": function() { return /* binding */ ProductList; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _hooks_use_api_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/hooks/use-api-get */ \"(app-client)/./src/hooks/use-api-get.ts\");\n/* harmony import */ var _hooks_use_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/hooks/use-toast */ \"(app-client)/./src/hooks/use-toast.tsx\");\n/* harmony import */ var _product_card_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-card.component */ \"(app-client)/./src/components/product-card.component.tsx\");\n/* __next_internal_client_entry_do_not_use__ ProductList auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst ProductList = ()=>{\n    _s();\n    const { errorToast , Toast  } = (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    const [data, getRequest, isLoading] = (0,_hooks_use_api_get__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n        onError: errorToast\n    });\n    console.log(\"\\uD83D\\uDE80 ~ file: product-list.component.tsx:22 ~ ProductList ~ data:\", data);\n    const refresh = async ()=>{\n        await getRequest(\"/product/list\");\n    };\n    if (!data) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Toast, {}, void 0, false, {\n                fileName: \"/home/felipe/Documentos/comunikime/web/src/components/product-list.component.tsx\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, undefined),\n            data === null || data === void 0 ? void 0 : data.map((product)=>{\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_product_card_component__WEBPACK_IMPORTED_MODULE_3__.ProductCard, {\n                    id: product.id,\n                    name: product.name,\n                    description: product.description,\n                    productUrl: product.productUrl,\n                    quantity: product.quantity,\n                    refresh: refresh\n                }, product.id, false, {\n                    fileName: \"/home/felipe/Documentos/comunikime/web/src/components/product-list.component.tsx\",\n                    lineNumber: 35,\n                    columnNumber: 11\n                }, undefined);\n            })\n        ]\n    }, void 0, true);\n};\n_s(ProductList, \"/lF8CmXNXtx9+HZJZOI7XfX3IA0=\", false, function() {\n    return [\n        _hooks_use_toast__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n        _hooks_use_api_get__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n    ];\n});\n_c = ProductList;\nvar _c;\n$RefreshReg$(_c, \"ProductList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vc3JjL2NvbXBvbmVudHMvcHJvZHVjdC1saXN0LmNvbXBvbmVudC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUV3QztBQUVBO0FBQ2M7QUFVL0MsTUFBTUcsY0FBYyxJQUFNOztJQUMvQixNQUFNLEVBQUVDLFdBQVUsRUFBRUMsTUFBSyxFQUFFLEdBQUdKLDREQUFRQTtJQUV0QyxNQUFNLENBQUNLLE1BQU1DLFlBQVlDLFVBQVUsR0FBR1IsOERBQU1BLENBQVk7UUFDdERTLFNBQVNMO0lBQ1g7SUFDQU0sUUFBUUMsR0FBRyxDQUFDLDRFQUFrRUw7SUFHOUUsTUFBTU0sVUFBVSxVQUFZO1FBQzFCLE1BQU1MLFdBQVc7SUFDbkI7SUFDQSxJQUFJLENBQUNELE1BQU0scUJBQU87SUFFbEIscUJBQ0U7OzBCQUNFLDhEQUFDRDs7Ozs7WUFDQUMsaUJBQUFBLGtCQUFBQSxLQUFBQSxJQUFBQSxLQUFNTyxHQUFHLENBQUMsQ0FBQ0MsVUFBWTtnQkFDdEIscUJBQ0UsOERBQUNaLGdFQUFXQTtvQkFFVmEsSUFBSUQsUUFBUUMsRUFBRTtvQkFDZEMsTUFBTUYsUUFBUUUsSUFBSTtvQkFDbEJDLGFBQWFILFFBQVFHLFdBQVc7b0JBQ2hDQyxZQUFZSixRQUFRSSxVQUFVO29CQUM5QkMsVUFBVUwsUUFBUUssUUFBUTtvQkFDMUJQLFNBQVNBO21CQU5KRSxRQUFRQyxFQUFFOzs7OztZQVNyQjs7O0FBR04sRUFBQztHQWhDWVo7O1FBQ21CRix3REFBUUE7UUFFQUQsMERBQU1BOzs7S0FIakNHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC5jb21wb25lbnQudHN4Pzk5ODIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5cbmltcG9ydCB1c2VHZXQgZnJvbSAnQC9ob29rcy91c2UtYXBpLWdldCdcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHVzZVRvYXN0IGZyb20gJ0AvaG9va3MvdXNlLXRvYXN0J1xuaW1wb3J0IHsgUHJvZHVjdENhcmQgfSBmcm9tICcuL3Byb2R1Y3QtY2FyZC5jb21wb25lbnQnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdCB7XG4gIGlkOiBzdHJpbmdcbiAgcXVhbnRpdHk6IG51bWJlclxuICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBwcm9kdWN0VXJsOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IFByb2R1Y3RMaXN0ID0gKCkgPT4ge1xuICBjb25zdCB7IGVycm9yVG9hc3QsIFRvYXN0IH0gPSB1c2VUb2FzdCgpXG5cbiAgY29uc3QgW2RhdGEsIGdldFJlcXVlc3QsIGlzTG9hZGluZ10gPSB1c2VHZXQ8UHJvZHVjdFtdPih7XG4gICAgb25FcnJvcjogZXJyb3JUb2FzdCxcbiAgfSlcbiAgY29uc29sZS5sb2coXCLwn5qAIH4gZmlsZTogcHJvZHVjdC1saXN0LmNvbXBvbmVudC50c3g6MjIgfiBQcm9kdWN0TGlzdCB+IGRhdGE6XCIsIGRhdGEpXG5cblxuICBjb25zdCByZWZyZXNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGdldFJlcXVlc3QoJy9wcm9kdWN0L2xpc3QnKVxuICB9XG4gIGlmICghZGF0YSkgcmV0dXJuIDw+PC8+XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFRvYXN0IC8+XG4gICAgICB7ZGF0YT8ubWFwKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFByb2R1Y3RDYXJkXG4gICAgICAgICAgICBrZXk9e3Byb2R1Y3QuaWR9XG4gICAgICAgICAgICBpZD17cHJvZHVjdC5pZH1cbiAgICAgICAgICAgIG5hbWU9e3Byb2R1Y3QubmFtZX1cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtwcm9kdWN0LmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgcHJvZHVjdFVybD17cHJvZHVjdC5wcm9kdWN0VXJsfVxuICAgICAgICAgICAgcXVhbnRpdHk9e3Byb2R1Y3QucXVhbnRpdHl9XG4gICAgICAgICAgICByZWZyZXNoPXtyZWZyZXNofVxuICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICAgIH0pfVxuICAgIDwvPlxuICApXG59XG4iXSwibmFtZXMiOlsidXNlR2V0IiwidXNlVG9hc3QiLCJQcm9kdWN0Q2FyZCIsIlByb2R1Y3RMaXN0IiwiZXJyb3JUb2FzdCIsIlRvYXN0IiwiZGF0YSIsImdldFJlcXVlc3QiLCJpc0xvYWRpbmciLCJvbkVycm9yIiwiY29uc29sZSIsImxvZyIsInJlZnJlc2giLCJtYXAiLCJwcm9kdWN0IiwiaWQiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJwcm9kdWN0VXJsIiwicXVhbnRpdHkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./src/components/product-list.component.tsx\n"));

/***/ })

});