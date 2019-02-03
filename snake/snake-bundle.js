!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e){var n;console.log("logic lib");var o={xPos:0,yPos:0},i={xPos:0,yPos:0},r=function(){var t=n(),e=t.CANVANS_WIDTH,i=t.CANVANS_HEIGHT;o.xPos=40*Math.floor(Math.random()*e/40),o.yPos=40*Math.floor(Math.random()*i/40),console.log(o)};t.exports={getFruitPos:function(){return o},getPlayertPos:function(){return i},setupLogic:function(t){n=t,r()}}},function(t,e){var n,o,i,r,a,s,c=new Image(40,40),d=new Image(40,40),l=new Image(40,40),p=new Image(40,40),f=new Image(40,40),u=new Image(40,40),m=new Image(40,40),g=new Image(40,40),h=new Image(40,40),w=new Image(40,40),x=new Image(40,40),v=new Image(40,40),b=new Image(40,40),y=new Image(40,40),k=new Image(40,40),I=function(){o.clearRect(0,0,a,s),o.fillStyle="#7a969b",o.fillRect(0,0,a,s)};t.exports={setupScreen:function(t,e){n=document.getElementById("gameCanvans"),o=n.getContext("2d"),i=t,r=e,console.log(window.screen.availWidth),window.screen.availWidth>10?(n.width=520,n.height=400,a=520,s=400):(n.width=360,n.height=320,a=360,s=320),I(),c.src="img/head4.png",d.src="img/head2.png",l.src="img/head3.png",p.src="img/head1.png",f.src="img/fruit.png",u.src="img/tail1.png",m.src="img/tail2.png",g.src="img/tail3.png",h.src="img/tail4.png",w.src="img/tail5.png",x.src="img/tail6.png",v.src="img/tail7.png",b.src="img/tail8.png",y.src="img/tail9.png",k.src="img/tail10.png",console.log("setupScreen()")},gameDraw:function(){var t=i(),e=r();I(),o.drawImage(f,t.xPos,t.yPos),o.drawImage(p,e.xPos,e.yPos)},getCanvansSize:function(){return{CANVANS_WIDTH:a,CANVANS_HEIGHT:s}}}},function(t,e){var n="NONE";t.exports={getDirMove:function(){console.log("Góra")},keyPressedService:function(t){"KeyW"===t.code?n="UP":"KeyS"===t.code?n="DOWN":"KeyA"===t.code?n="LEFT":"KeyD"===t.code&&(n="RIGHT"),console.log(t)},getLastDir:function(){return n}}},function(t,e,n){"use strict";n.r(e);n(4),n(5),n(6);var o=n(2),i=n(0),r=n(1);console.log("Lib loaded");window.onload=function(){Object(r.setupScreen)(i.getFruitPos,i.getPlayertPos),Object(i.setupLogic)(r.getCanvansSize,o.getLastDir)},document.onkeypress=o.keyPressedService,setInterval(function(){Object(r.gameDraw)()},1e3)},function(t,e,n){},function(t,e,n){},function(t,e,n){var o=n(7);"string"==typeof o&&(o=[[t.i,o,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(9)(o,i);o.locals&&(t.exports=o.locals)},function(t,e,n){(t.exports=n(8)(!1)).push([t.i,'@charset "UTF-8";*{box-sizing:border-box;padding:0;margin:0}img{width:100%;height:auto}body{font-family:Montserrat Alternates,sans-serif;font-size:16px;font-weight:lighter;background:#d1d1d1;align-content:center;margin:auto}.topNavbar{background:#fff;width:100%;z-index:100;border:1px solid #c0c2c5;border-radius:8px;overflow:hidden;margin-bottom:40px}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.topNavbar{position:fixed;top:0}}.topNavbarContainer{width:95vw;max-width:800px;margin:auto;padding:.5rem;display:flex;flex-flow:row wrap}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.topNavbarContainer{width:85vw}}@media (orientation:landscape){.topNavbarContainer{justify-content:center;padding:.5em 2em}}.logo{background:#006fff;color:#fff;margin:auto;font-size:1.8rem;border-radius:100%;text-align:center;padding:.4em;font-weight:700;text-decoration:none;flex-grow:0}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.logo{font-size:2.4rem;padding:.3em;filter:saturate(40%) opacity(80%);transition:1s ease}.logo:hover{filter:saturate(100%);cursor:pointer}}.logo p:after{content:"ŁB"}.desc{height:100%;flex-basis:100%;flex-grow:0;align-self:center;font-size:1rem;padding:.1em .5em;text-align:center;color:#707070}.desc p:after{content:"Strona poświecona moim projektom z elektroniki, programowania i fizyki..."}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.desc{text-align:left;flex-basis:40%;flex-grow:1;margin-left:1em}}@media (orientation:landscape){.desc{flex-basis:40%;flex-grow:1;text-align:left;margin-left:.5rem}}.contentContainer{margin-left:auto;margin-right:auto;margin-bottom:100px;width:90vw;min-height:100vh;max-width:700px}@media (orientation:landscape){.contentContainer{width:70vw}}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.contentContainer{width:85vw;margin-top:150px;margin-bottom:200px}}.dataBlock{border:1px solid #c0c2c5;border-radius:8px;overflow:hidden;margin-bottom:50px;width:100%;background:#ebebeb;position:relative}.dataBlock:hover{cursor:pointer}.dataBlockBar{background:#1e1e1e;text-align:center;color:#fff;padding:8px;width:100%}.dataBlockImg{display:block;height:200px;width:100%;object-fit:contain;background-size:cover;transition:.6s ease}@media (orientation:landscape){.dataBlockImg{height:170px}}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.dataBlockImg{height:300px;transition:.7s ease-in-out}.dataBlock:hover .dataBlockImg{filter:blur(2px)}}.overlay{position:absolute;overflow:hidden;z-index:1;top:47px;bottom:100%;width:100%;background-color:hsla(0,0%,46.7%,.401);transition:.5s ease;text-align:center}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.dataBlock:hover .overlay{bottom:0}}.text{position:relative;top:30%;color:#fff;font-size:50px;font-weight:700}.dataBlockDesc{font-size:.6rem;padding:1.5em;white-space:pre-wrap}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.dataBlockDesc{transition:.7s ease-in-out;font-size:.8rem}.dataBlock:hover .dataBlockDesc{filter:blur(2px)}}#footerContainer{width:100%;min-height:150px;background:#c7c7c7}.dataBlock--game{min-width:200px;padding-bottom:50px;display:flex;flex-flow:row wrap}@media (orientation:landscape) and (max-height:450px){.dataBlock--game{width:120vh;margin:auto}}#gameCanvans{width:100%;height:auto}@media (orientation:landscape) and (max-height:450px){#gameCanvans{width:auto;height:100%}}.dataBlock{display:flex;flex-flow:row wrap;justify-content:center}.windowGame{position:relative;border:5px dashed #b8babc;background:#af5b5b;margin-top:10px;margin-left:auto;margin-right:auto;width:95%}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.windowGame{width:auto}}@media (orientation:landscape) and (max-height:450px){.windowGame{height:75vh;width:auto}}.arrow{color:hsla(0,0%,51.4%,.37);z-index:2;position:absolute;font-size:calc(1rem + 9vw);font-weight:700;padding:0 1rem;user-select:none}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.arrow{display:none}}@media (orientation:landscape) and (max-height:450px){.arrow{font-size:calc(1rem + 9vh)}}.arrow:active{color:rgba(255,0,0,.363)}.arrow--up{transform:rotate(90deg) scale(2,4);top:2%;left:40%}.arrow--left{transform:scale(2,4);left:5px;top:40%}.arrow--down{bottom:5px;left:40%;transform:scale(4,2) rotate(-90deg)}.arrow--right{right:5px;top:40%;transform:scale(2,4) rotate(180deg)}#manualGame{display:none}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){#manualGame{display:inline}}.windowGameText{display:inline-block;color:#ffe18e;font-size:.8rem;padding-top:.5em;padding-bottom:.1em;text-align:center}.windowGameText--waring{color:#f36541}@media (orientation:landscape) and (min-height:450px),(orientation:portrait) and (min-width:600px){.windowGameText{font-size:1.2rem}}.windowGameText--margin{margin-right:20%}@media (orientation:landscape) and (max-height:450px){.windowGameText--margin{margin-right:35%}}.dataBlock--game{background-color:#202020}',""])},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var i=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),r=o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"});return[n].concat(r).concat([i]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];null!=r&&(o[r]=!0)}for(i=0;i<t.length;i++){var a=t[i];null!=a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){var o,i,r={},a=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===i&&(i=o.apply(this,arguments)),i}),s=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var o=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(t){o=null}e[t]=o}return e[t]}}(),c=null,d=0,l=[],p=n(10);function f(t,e){for(var n=0;n<t.length;n++){var o=t[n],i=r[o.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](o.parts[a]);for(;a<o.parts.length;a++)i.parts.push(x(o.parts[a],e))}else{var s=[];for(a=0;a<o.parts.length;a++)s.push(x(o.parts[a],e));r[o.id]={id:o.id,refs:1,parts:s}}}}function u(t,e){for(var n=[],o={},i=0;i<t.length;i++){var r=t[i],a=e.base?r[0]+e.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};o[a]?o[a].parts.push(s):n.push(o[a]={id:a,parts:[s]})}return n}function m(t,e){var n=s(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=l[l.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),l.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=s(t.insertAt.before,n);n.insertBefore(e,i)}}function g(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=l.indexOf(t);e>=0&&l.splice(e,1)}function h(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var o=function(){0;return n.nc}();o&&(t.attrs.nonce=o)}return w(e,t.attrs),m(t,e),e}function w(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function x(t,e){var n,o,i,r;if(e.transform&&t.css){if(!(r="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=r}if(e.singleton){var a=d++;n=c||(c=h(e)),o=y.bind(null,n,a,!1),i=y.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",w(e,t.attrs),m(t,e),e}(e),o=function(t,e,n){var o=n.css,i=n.sourceMap,r=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||r)&&(o=p(o));i&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,e),i=function(){g(n),n.href&&URL.revokeObjectURL(n.href)}):(n=h(e),o=function(t,e){var n=e.css,o=e.media;o&&t.setAttribute("media",o);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),i=function(){g(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else i()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=u(t,e);return f(n,e),function(t){for(var o=[],i=0;i<n.length;i++){var a=n[i];(s=r[a.id]).refs--,o.push(s)}t&&f(u(t,e),e);for(i=0;i<o.length;i++){var s;if(0===(s=o[i]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete r[s.id]}}}};var v,b=(v=[],function(t,e){return v[t]=e,v.filter(Boolean).join("\n")});function y(t,e,n,o){var i=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=b(e,i);else{var r=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var i,r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")")})}}]);