!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=5)}([function(e,n){function t(e,n){var t=e;return n.slice(0,-1).forEach(function(e){t=t[e]||{}}),n[n.length-1]in t}function r(e){return"number"==typeof e||(!!/^0x[0-9a-f]+$/i.test(e)||/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e))}e.exports=function(e,n){function o(e,n){return u.allBools&&/^--[^=]+$/.test(n)||u.strings[e]||u.bools[e]||c[e]}function i(e,n,t){if(!t||!u.unknownFn||o(e,t)||!1!==u.unknownFn(t)){var i=!u.strings[e]&&r(n)?Number(n):n;a(f,e.split("."),i),(c[e]||[]).forEach(function(e){a(f,e.split("."),i)})}}function a(e,n,t){var r=e;n.slice(0,-1).forEach(function(e){void 0===r[e]&&(r[e]={}),r=r[e]});var o=n[n.length-1];void 0===r[o]||u.bools[o]||"boolean"==typeof r[o]?r[o]=t:Array.isArray(r[o])?r[o].push(t):r[o]=[r[o],t]}function s(e){return c[e].some(function(e){return u.bools[e]})}n||(n={});var u={bools:{},strings:{},unknownFn:null};"function"==typeof n.unknown&&(u.unknownFn=n.unknown),"boolean"==typeof n.boolean&&n.boolean?u.allBools=!0:[].concat(n.boolean).filter(Boolean).forEach(function(e){u.bools[e]=!0});var c={};Object.keys(n.alias||{}).forEach(function(e){c[e]=[].concat(n.alias[e]),c[e].forEach(function(n){c[n]=[e].concat(c[e].filter(function(e){return n!==e}))})}),[].concat(n.string).filter(Boolean).forEach(function(e){u.strings[e]=!0,c[e]&&(u.strings[c[e]]=!0)});var l=n.default||{},f={_:[]};Object.keys(u.bools).forEach(function(e){i(e,void 0!==l[e]&&l[e])});var p=[];-1!==e.indexOf("--")&&(p=e.slice(e.indexOf("--")+1),e=e.slice(0,e.indexOf("--")));for(var h=0;h<e.length;h++){var d=e[h];if(/^--.+=/.test(d)){var b=d.match(/^--([^=]+)=([\s\S]*)$/),v=b[1],y=b[2];u.bools[v]&&(y="false"!==y),i(v,y,d)}else if(/^--no-.+/.test(d)){var v=d.match(/^--no-(.+)/)[1];i(v,!1,d)}else if(/^--.+/.test(d)){var v=d.match(/^--(.+)/)[1],g=e[h+1];void 0===g||/^-/.test(g)||u.bools[v]||u.allBools||c[v]&&s(v)?/^(true|false)$/.test(g)?(i(v,"true"===g,d),h++):i(v,!u.strings[v]||"",d):(i(v,g,d),h++)}else if(/^-[^-]+/.test(d)){for(var m=d.slice(1,-1).split(""),w=!1,k=0;k<m.length;k++){var g=d.slice(k+2);if("-"!==g){if(/[A-Za-z]/.test(m[k])&&/=/.test(g)){i(m[k],g.split("=")[1],d),w=!0;break}if(/[A-Za-z]/.test(m[k])&&/-?\d+(\.\d*)?(e-?\d+)?$/.test(g)){i(m[k],g,d),w=!0;break}if(m[k+1]&&m[k+1].match(/\W/)){i(m[k],d.slice(k+2),d),w=!0;break}i(m[k],!u.strings[m[k]]||"",d)}else i(m[k],g,d)}var v=d.slice(-1)[0];w||"-"===v||(!e[h+1]||/^(-|--)[^-]/.test(e[h+1])||u.bools[v]||c[v]&&s(v)?e[h+1]&&/true|false/.test(e[h+1])?(i(v,"true"===e[h+1],d),h++):i(v,!u.strings[v]||"",d):(i(v,e[h+1],d),h++))}else if(u.unknownFn&&!1===u.unknownFn(d)||f._.push(u.strings._||!r(d)?d:Number(d)),n.stopEarly){f._.push.apply(f._,e.slice(h+1));break}}return Object.keys(l).forEach(function(e){t(f,e.split("."))||(a(f,e.split("."),l[e]),(c[e]||[]).forEach(function(n){a(f,n.split("."),l[e])}))}),n["--"]?(f["--"]=new Array,p.forEach(function(e){f["--"].push(e)})):p.forEach(function(e){f._.push(e)}),f}},function(e,n){e.exports=React},function(e,n){e.exports=ReactDOM},function(e,n){e.exports=_},function(e,n){e.exports=require("electron")},function(e,n,t){"use strict";function r(e){return Array.isArray(e)?e:Array.from(e)}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function a(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var s=function(){function e(e,n){var t=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return t}return function(n,t){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return e(n,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),c=t(1),l=t(2),f=t(3),p=t(0),h=t(4),d=h.ipcRenderer,b=c.Component,v=function(e){function n(e){o(this,n);var t=i(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return d.on("focus",t.onFocus.bind(t)),t}return a(n,e),u(n,[{key:"onFocus",value:function(){l.findDOMNode(this).focus()}},{key:"render",value:function(){var e=this.props,n=e.onBlur,t=e.onChange,r=e.onKeyDown,o=e.value;return c.createElement("input",{onBlur:n,onChange:t,onKeyDown:r,value:o,style:{display:"block",boxSizing:"border-box",width:"100%",fontSize:"2rem",outline:"none",border:"none",backgroundColor:"transparent"}})}},{key:"componentDidMount",value:function(){l.findDOMNode(this).focus()}}]),n}(b),y=function(e){function n(e){o(this,n);var t=i(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.config=f.toPairs(d.sendSync("setup")),t.state={value:"gle"},t.parsed={},t.candidates=[],t.onBlur=t.onBlur.bind(t),t.onChange=t.onChange.bind(t),t.onKeyDown=t.onKeyDown.bind(t),t}return a(n,e),u(n,[{key:"parse",value:function(e){var n=f.get(e.match(/\s/),["index"],e.length),t=[e.substring(0,n)],r=e.substring(n),o=r.match(/[^"\s]+|"(?:\\"|[^"])+"/g);return o?t=f.concat(t,o):""!==r&&t.push(r),p(f.map(t,function(e){var n=e.length;return e.substring('"'===e.charAt(0)?1:0,'"'===e.charAt(n-1)?n-1:n)}))}},{key:"render",value:function(){var e=this.config,n=this.state.value,t=this.parse(n),o=r(t._),i=o[0],a=o.slice(1),u=i.length,l=[];f.forEach(e,function(e){var n=s(e,2),t=n[0],r=n[1].description,o=0,a=[];f.forEach(t,function(e){for(var n=!1,t=o;t<u;t+=1)if(e===i.charAt(t)){n=!0,o+=1;break}a.push(n?c.createElement("span",{style:{textDecoration:"underline"}},e):e)}),o===u&&l.push({text:t,description:r,element:a})});var p=f.map(l,function(e,n){var t=e.element,r={marginRight:4};return 0===n&&(r.fontSize="1.4rem",r.fontWeight="bold"),c.createElement("span",{style:r},t)});return this.parsed=t,this.candidates=l,c.createElement("div",null,c.createElement("div",{className:"wnwn",style:{position:"relative"}},c.createElement("div",{style:{position:"absolute",width:"90%",left:"5%",bottom:20,backgroundColor:"rgb(242, 242, 242)",borderRadius:4,padding:"6px 12px"}},p,l.length>0?c.createElement("div",null,f.template(l[0].description)({querys:a})):null,c.createElement(v,{onBlur:this.onBlur,onChange:this.onChange,onKeyDown:this.onKeyDown,value:n}))))}},{key:"onBlur",value:function(){d.send("blur")}},{key:"onChange",value:function(e){this.setState({value:e.currentTarget.value})}},{key:"onKeyDown",value:function(e){if(13===e.keyCode){var n=this.candidates,t=this.parsed,o=this.state.value,i=r(t._),a=i[0],s=i.slice(1),u=n[0];if(u){var c=u.text;if(c===a)delete t._,d.send("exec",{func:c,querys:s,options:t});else{var l=f.get(o.match(/\s/),["index"],o.length);this.setState({value:c+" "+o.slice(l)})}}}}}]),n}(b);l.render(c.createElement(y,null),document.querySelector("main"))}]);