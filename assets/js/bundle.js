/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./assets/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';\n\n__webpack_require__(2);\n\n(function ($) {\n  'use strict';\n\n  $(function () {\n\n    $('.bt-menu').on('click', function (e) {\n      e.preventDefault();\n      $('body').toggleClass('menu-open');\n    });\n  });\n})(jQuery);\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/main.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = jQuery;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"jQuery\"\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(jQuery, $) {/*! jQuery.browser */\r\n(function(d){var c,b;d.uaMatch=function(a){a=a.toLowerCase();a=/(chrome)[ \\/]([\\w.]+)/.exec(a)||/(webkit)[ \\/]([\\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \\/]([\\w.]+)/.exec(a)||/(msie) ([\\w.]+)/.exec(a)||0>a.indexOf(\"compatible\")&&/(mozilla)(?:.*? rv:([\\w.]+)|)/.exec(a)||[];return{browser:a[1]||\"\",version:a[2]||\"0\"}};c=d.uaMatch(navigator.userAgent);b={};c.browser&&(b[c.browser]=!0,b.version=c.version);b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0);d.browser=b})(jQuery);\r\n\r\n/*! Detect mobile */\r\n(function(){jQuery.browser.mobile=/android|blackberry|symbianos|iemobile|ip(ad|od|hone)/i.test(navigator.userAgent)}());\r\n\r\n/*! Easing - https://github.com/julianshapiro/velocity - Copyright The jQuery Foundation. MIT License: https://jquery.org/license */\r\n(function(){var d={};$.each([\"Quad\",\"Cubic\",\"Quart\",\"Quint\",\"Expo\"],function(a,b){d[b]=function(c){return Math.pow(c,a+2)}});$.extend(d,{Sine:function(a){return 1-Math.cos(a*Math.PI/2)},Circ:function(a){return 1-Math.sqrt(1-a*a)},Elastic:function(a){return 0===a||1===a?a:-Math.pow(2,8*(a-1))*Math.sin((80*(a-1)-7.5)*Math.PI/15)},Back:function(a){return a*a*(3*a-2)},Bounce:function(a){for(var b,c=4;a<((b=Math.pow(2,--c))-1)/11;);return 1/Math.pow(4,3-c)-7.5625*Math.pow((3*b-2)/22-a,2)}});$.each(d,function(a,b){$.easing[\"easeIn\"+a]=b;$.easing[\"easeOut\"+a]=function(a){return 1-b(1-a)};$.easing[\"easeInOut\"+a]=function(a){return 0.5>a?b(2*a)/2:1-b(-2*a+2)/2}});$.easing.spring=function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)}})();\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(1)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/vendor/plugins.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./src/js/vendor/plugins.js?");

/***/ }
/******/ ]);