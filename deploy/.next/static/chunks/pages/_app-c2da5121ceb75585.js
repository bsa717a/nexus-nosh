(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{9711:function(e,t,r){"use strict";r.d(t,{BH:function(){return E},LL:function(){return B},ZR:function(){return F},tV:function(){return c},L:function(){return h},Sg:function(){return T},ne:function(){return G},vZ:function(){return function e(t,r){if(t===r)return!0;let n=Object.keys(t),i=Object.keys(r);for(let s of n){if(!i.includes(s))return!1;let n=t[s],a=r[s];if(z(n)&&z(a)){if(!e(n,a))return!1}else if(n!==a)return!1}for(let e of i)if(!n.includes(e))return!1;return!0}},pd:function(){return H},aH:function(){return w},q4:function(){return y},P0:function(){return v},Pz:function(){return _},Rd:function(){return d},m9:function(){return X},z$:function(){return k},ru:function(){return D},Xx:function(){return I},L_:function(){return O},xb:function(){return q},w1:function(){return L},hl:function(){return U},uI:function(){return R},b$:function(){return P},G6:function(){return x},WO:function(){return M},Uo:function(){return b},xO:function(){return $},zd:function(){return K},dp:function(){return A},eu:function(){return V}});let n=()=>void 0;var i=r(4155);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s=function(e){let t=[],r=0;for(let n=0;n<e.length;n++){let i=e.charCodeAt(n);i<128?t[r++]=i:(i<2048?t[r++]=i>>6|192:((64512&i)==55296&&n+1<e.length&&(64512&e.charCodeAt(n+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++n)),t[r++]=i>>18|240,t[r++]=i>>12&63|128):t[r++]=i>>12|224,t[r++]=i>>6&63|128),t[r++]=63&i|128)}return t},a=function(e){let t=[],r=0,n=0;for(;r<e.length;){let i=e[r++];if(i<128)t[n++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[r++];t[n++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){let s=((7&i)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536;t[n++]=String.fromCharCode(55296+(s>>10)),t[n++]=String.fromCharCode(56320+(1023&s))}else{let s=e[r++],a=e[r++];t[n++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&a)}}return t.join("")},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let t=0;t<e.length;t+=3){let i=e[t],s=t+1<e.length,a=s?e[t+1]:0,o=t+2<e.length,l=o?e[t+2]:0,u=i>>2,h=(3&i)<<4|a>>4,c=(15&a)<<2|l>>6,d=63&l;o||(d=64,s||(c=64)),n.push(r[u],r[h],r[c],r[d])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(s(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):a(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let t=0;t<e.length;){let i=r[e.charAt(t++)],s=t<e.length?r[e.charAt(t)]:0,a=++t<e.length?r[e.charAt(t)]:64,o=++t<e.length?r[e.charAt(t)]:64;if(++t,null==i||null==s||null==a||null==o)throw new l;let u=i<<2|s>>4;if(n.push(u),64!==a){let e=s<<4&240|a>>2;if(n.push(e),64!==o){let e=a<<6&192|o;n.push(e)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class l extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}let u=function(e){let t=s(e);return o.encodeByteArray(t,!0)},h=function(e){return u(e).replace(/\./g,"")},c=function(e){try{return o.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r.g)return r.g;throw Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let f=()=>d().__FIREBASE_DEFAULTS__,p=()=>{if(void 0===i||void 0===i.env)return;let e=i.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},g=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&c(e[1]);return t&&JSON.parse(t)},m=()=>{try{return n()||f()||p()||g()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},y=e=>m()?.emulatorHosts?.[e],v=e=>{let t=y(e);if(!t)return;let r=t.lastIndexOf(":");if(r<=0||r+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let n=parseInt(t.substring(r+1),10);return"["===t[0]?[t.substring(1,r-1),n]:[t.substring(0,r),n]},w=()=>m()?.config,_=e=>m()?.[`_${e}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function b(e){return(await fetch(e,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(e,t){if(e.uid)throw Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let r=t||"demo-project",n=e.iat||0,i=e.sub||e.user_id;if(!i)throw Error("mockUserToken must contain 'sub' or 'user_id' field!");let s={iss:`https://securetoken.google.com/${r}`,aud:r,iat:n,exp:n+3600,auth_time:n,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...e};return[h(JSON.stringify({alg:"none",type:"JWT"})),h(JSON.stringify(s)),""].join(".")}let S={},C=!1;function A(e,t){if("undefined"==typeof window||"undefined"==typeof document||!I(window.location.host)||S[e]===t||S[e]||C)return;function r(e){return`__firebase__banner__${e}`}S[e]=t;let n="__firebase__banner",i=function(){let e={prod:[],emulator:[]};for(let t of Object.keys(S))S[t]?e.emulator.push(t):e.prod.push(t);return e}().prod.length>0;function s(){let e,t;let s=(e=document.getElementById(n),t=!1,e||((e=document.createElement("div")).setAttribute("id",n),t=!0),{created:t,element:e}),a=r("text"),o=document.getElementById(a)||document.createElement("span"),l=r("learnmore"),u=document.getElementById(l)||document.createElement("a"),h=r("preprendIcon"),c=document.getElementById(h)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(s.created){let e=s.element;e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center",u.setAttribute("id",l),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline";let t=function(){let e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{C=!0,function(){let e=document.getElementById(n);e&&e.remove()}()},e}();c.setAttribute("width","24"),c.setAttribute("id",h),c.setAttribute("height","24"),c.setAttribute("viewBox","0 0 24 24"),c.setAttribute("fill","none"),c.style.marginLeft="-6px",e.append(c,o,u,t),document.body.appendChild(e)}i?(o.innerText="Preview backend disconnected.",c.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(c.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,o.innerText="Preview backend running in this workspace."),o.setAttribute("id",a)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",s):s()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function R(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(k())}function N(){let e=m()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(r.g.process)}catch(e){return!1}}function O(){return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function D(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function P(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function L(){let e=k();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function x(){return!N()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function M(){return!N()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function U(){try{return"object"==typeof indexedDB}catch(e){return!1}}function V(){return new Promise((e,t)=>{try{let r=!0,n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},i.onupgradeneeded=()=>{r=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(e){t(e)}})}class F extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,F.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,B.prototype.create)}}class B{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},n=`${this.service}/${e}`,i=this.errors[e],s=i?i.replace(j,(e,t)=>{let n=r[t];return null!=n?String(n):`<${t}?>`}):"Error",a=`${this.serviceName}: ${s} (${n}).`;return new F(n,a,r)}}let j=/\{\$([^}]+)}/g;function q(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function z(e){return null!==e&&"object"==typeof e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e){let t=[];for(let[r,n]of Object.entries(e))Array.isArray(n)?n.forEach(e=>{t.push(encodeURIComponent(r)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(r)+"="+encodeURIComponent(n));return t.length?"&"+t.join("&"):""}function K(e){let t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){let[r,n]=e.split("=");t[decodeURIComponent(r)]=decodeURIComponent(n)}}),t}function H(e){let t=e.indexOf("?");if(!t)return"";let r=e.indexOf("#",t);return e.substring(t,r>0?r:void 0)}function G(e,t){let r=new W(e,t);return r.subscribe.bind(r)}class W{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let n;if(void 0===e&&void 0===t&&void 0===r)throw Error("Missing Observer.");void 0===(n=!function(e,t){if("object"!=typeof e||null===e)return!1;for(let r of t)if(r in e&&"function"==typeof e[r])return!0;return!1}(e,["next","error","complete"])?{next:e,error:t,complete:r}:e).next&&(n.next=Q),void 0===n.error&&(n.error=Q),void 0===n.complete&&(n.complete=Q);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?n.error(this.finalError):n.complete()}catch(e){}}),this.observers.push(n),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Q(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(e){return e&&e._delegate?e._delegate:e}},6840:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(6814)}])},6442:function(e,t,r){"use strict";r.d(t,{H:function(){return u},a:function(){return h}});var n=r(5893),i=r(7294),s=r(3910),a=r(9724),o=r(310);let l=(0,i.createContext)(void 0);function u(e){let{children:t}=e,[r,u]=(0,i.useState)(null),[h,c]=(0,i.useState)(!0),d=async e=>{try{var t;let r=(0,o.xI)(),n=(0,a.JU)(r,"users",e.uid);await (0,a.pl)(n,{email:e.email,emailLowerCase:null===(t=e.email)||void 0===t?void 0:t.toLowerCase(),displayName:e.displayName,photoURL:e.photoURL,lastSeen:(0,a.Bt)()},{merge:!0})}catch(e){}};async function f(e,t){let r=(0,o.yL)();await (0,s.e5)(r,e,t)}async function p(e,t,r){let n=(0,o.yL)(),i=await (0,s.Xb)(n,e,t);return r&&i.user&&(await (0,s.ck)(i.user,{displayName:r}),await d({...i.user,displayName:r})),i.user}async function g(){let e=(0,o.yL)();await (0,s.w7)(e)}async function m(e){let t=(0,o.yL)();await (0,s.LS)(t,e)}return(0,i.useEffect)(()=>{try{let e;(0,o.mw)();let t=(0,o.yL)(),r=(0,s.Aj)(t,t=>{clearTimeout(e),u(t),t&&d(t),c(!1)},t=>{clearTimeout(e),c(!1)});return e=setTimeout(()=>{c(!1)},5e3),()=>{clearTimeout(e),r()}}catch(e){return c(!1),()=>{}}},[]),(0,n.jsx)(l.Provider,{value:{user:r,loading:h,signIn:f,signUp:p,signOut:g,resetPassword:m},children:t})}function h(){let e=(0,i.useContext)(l);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},310:function(e,t,r){"use strict";let n,i,s,a;r.d(t,{I8:function(){return s},db:function(){return i},yL:function(){return M},xI:function(){return U},mw:function(){return x},Wn:function(){return L}});var o,l,u,h,c=r(6771);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(0,c.KN)("firebase","12.6.0","app");var d=r(9724),f=r(3910),p=r(9711),g=r(75);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let m="firebasestorage.googleapis.com";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y extends p.ZR{constructor(e,t,r=0){super(v(e),`Firebase Storage: ${t} (${v(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,y.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return v(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function v(e){return"storage/"+e}function w(e){return new y(u.INVALID_ARGUMENT,e)}function _(){return new y(u.APP_DELETED,"The Firebase app was deleted.")}(o=u||(u={})).UNKNOWN="unknown",o.OBJECT_NOT_FOUND="object-not-found",o.BUCKET_NOT_FOUND="bucket-not-found",o.PROJECT_NOT_FOUND="project-not-found",o.QUOTA_EXCEEDED="quota-exceeded",o.UNAUTHENTICATED="unauthenticated",o.UNAUTHORIZED="unauthorized",o.UNAUTHORIZED_APP="unauthorized-app",o.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",o.INVALID_CHECKSUM="invalid-checksum",o.CANCELED="canceled",o.INVALID_EVENT_NAME="invalid-event-name",o.INVALID_URL="invalid-url",o.INVALID_DEFAULT_BUCKET="invalid-default-bucket",o.NO_DEFAULT_BUCKET="no-default-bucket",o.CANNOT_SLICE_BLOB="cannot-slice-blob",o.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",o.NO_DOWNLOAD_URL="no-download-url",o.INVALID_ARGUMENT="invalid-argument",o.INVALID_ARGUMENT_COUNT="invalid-argument-count",o.APP_DELETED="app-deleted",o.INVALID_ROOT_OPERATION="invalid-root-operation",o.INVALID_FORMAT="invalid-format",o.INTERNAL_ERROR="internal-error",o.UNSUPPORTED_ENVIRONMENT="unsupported-environment";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=E.makeFromUrl(e,t)}catch(t){return new E(e,"")}if(""===r.path)return r;throw new y(u.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let r=null,n="([A-Za-z0-9.\\-_]+)",i=RegExp("^gs://"+n+"(/(.*))?$","i");function s(e){e.path_=decodeURIComponent(e.path)}let a=t.replace(/[.]/g,"\\."),o=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${n}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:s},{regex:RegExp(`^https?://${t===m?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${n}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let t=0;t<o.length;t++){let n=o[t],i=n.regex.exec(e);if(i){let e=i[n.indices.bucket],t=i[n.indices.path];t||(t=""),r=new E(e,t),n.postModify(r);break}}if(null==r)throw new y(u.INVALID_URL,"Invalid URL '"+e+"'.");return r}}class I{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function b(e,t,r,n){if(n<t)throw w(`Invalid value for '${e}'. Expected ${t} or greater.`);if(n>r)throw w(`Invalid value for '${e}'. Expected ${r} or less.`)}(l=h||(h={}))[l.NO_ERROR=0]="NO_ERROR",l[l.NETWORK_ERROR=1]="NETWORK_ERROR",l[l.ABORT=2]="ABORT";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(e,t,r,n,i,s,a,o,l,u,h,c=!0,d=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=n,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=a,this.errorCallback_=o,this.timeout_=l,this.progressCallback_=u,this.connectionFactory_=h,this.retry=c,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{let r=this.resolve_,n=this.reject_,i=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(i,i.getResponse());void 0!==e?r(e):r()}catch(e){n(e)}else if(null!==i){let e=new y(u.UNKNOWN,"An unknown error occurred, please check the error payload for server response.");e.serverResponse=i.getErrorText(),n(this.errorCallback_?this.errorCallback_(i,e):e)}else n(t.canceled?this.appDelete_?_():new y(u.CANCELED,"User canceled the upload/download."):new y(u.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))};this.canceled_?e(!1,new S(!1,null,!0)):this.backoffId_=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,r){let n=1,i=null,s=null,a=!1,o=0,l=!1;function u(...e){l||(l=!0,t.apply(null,e))}function h(t){i=setTimeout(()=>{i=null,e(d,2===o)},t)}function c(){s&&clearTimeout(s)}function d(e,...t){let r;if(l){c();return}if(e||2===o||a){c(),u.call(null,e,...t);return}n<64&&(n*=2),1===o?(o=2,r=0):r=(n+Math.random())*1e3,h(r)}let f=!1;function p(e){!f&&(f=!0,c(),!l&&(null!==i?(e||(o=2),clearTimeout(i),h(0)):e||(o=1)))}return h(0),s=setTimeout(()=>{a=!0,p(!0)},r),p}((e,t)=>{if(t){e(!1,new S(!1,null,!0));return}let r=this.connectionFactory_();this.pendingConnection_=r;let n=e=>{let t=e.loaded,r=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,r)};null!==this.progressCallback_&&r.addUploadProgressListener(n),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&r.removeUploadProgressListener(n),this.pendingConnection_=null;let t=r.getErrorCode()===h.NO_ERROR,i=r.getStatus();if(!t||/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let r=e>=500&&e<600,n=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return r||n||i}(i,this.additionalRetryCodes_)&&this.retry){e(!1,new S(!1,null,r.getErrorCode()===h.ABORT));return}e(!0,new S(-1!==this.successCodes_.indexOf(i),r))})},e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class S{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,t){this._service=e,t instanceof E?this._location=t:this._location=E.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new C(e,t)}get root(){let e=new E(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return function(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}(this._location.path)}get storage(){return this._service}get parent(){let e=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");return -1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;let t=new E(this._location.bucket,e);return new C(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw new y(u.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}}function A(e,t){let r=t?.storageBucket;return null==r?null:E.makeFromBucketSpec(r,e)}class k{constructor(e,t,r,n,i,s=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=n,this._firebaseVersion=i,this._isUsingEmulator=s,this._bucket=null,this._host=m,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=n?this._bucket=E.makeFromBucketSpec(n,this._host):this._bucket=A(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=E.makeFromBucketSpec(this._url,e):this._bucket=A(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){b("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){b("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if((0,c.rh)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new C(this,e)}_makeRequest(e,t,r,n,i=!0){if(this._deleted)return new I(_());{let s=function(e,t,r,n,i,s,a=!0,o=!1){let l=function(e){let t=encodeURIComponent,r="?";for(let n in e)e.hasOwnProperty(n)&&(r=r+(t(n)+"=")+t(e[n])+"&");return r.slice(0,-1)}(e.urlParams),u=e.url+l,h=Object.assign({},e.headers);return t&&(h["X-Firebase-GMPID"]=t),null!==r&&r.length>0&&(h.Authorization="Firebase "+r),h["X-Firebase-Storage-Version"]="webjs/"+(s??"AppManager"),null!==n&&(h["X-Firebase-AppCheck"]=n),new T(u,e.method,h,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,a,o)}(e,this._appId,r,n,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){let[r,n]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,n).getPromise()}}let R="@firebase/storage",N="0.14.0",O="storage";(0,c.Xd)(new g.wA(O,function(e,{instanceIdentifier:t}){return new k(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),t,c.Jn)},"PUBLIC").setMultipleInstances(!0)),(0,c.KN)(R,N,""),(0,c.KN)(R,N,"esm2020");var D=r(4155);let P={apiKey:"AIzaSyBwDU2LlhEXIzB5iw4zhq_uepf2K4skPSc",authDomain:"nexus-nosh.firebaseapp.com",projectId:"nexus-nosh",storageBucket:"nexus-nosh.firebasestorage.app",messagingSenderId:"251223233015",appId:"1:251223233015:web:26460b83dd6a21f5ce1ef2"};console.log("[Firebase Config] Environment check:",{hasApiKey:!!P.apiKey,hasAuthDomain:!!P.authDomain,hasProjectId:!!P.projectId,apiKeyPreview:P.apiKey?"".concat(P.apiKey.substring(0,10),"..."):"MISSING",projectId:P.projectId||"MISSING",allEnvKeys:Object.keys(D.env).filter(e=>e.startsWith("NEXT_PUBLIC_FIREBASE"))});let L=P.apiKey&&"placeholder_api_key"!==P.apiKey&&P.apiKey.length>10&&P.projectId&&"placeholder_project_id"!==P.projectId&&P.projectId.length>0;function x(){if(n&&s&&i){console.log("[Firebase] Already initialized, skipping");return}console.log("[Firebase] Starting initialization...",{isFirebaseConfigured:L,hasApiKey:!!P.apiKey,hasProjectId:!!P.projectId,apiKeyPreview:P.apiKey?"".concat(P.apiKey.substring(0,15),"..."):"MISSING",projectId:P.projectId||"MISSING"});try{if(!L){var e;let t="[Firebase] Not configured. Missing or invalid credentials";throw console.error(t,{hasApiKey:!!P.apiKey,hasProjectId:!!P.projectId,apiKey:P.apiKey?"".concat(P.apiKey.substring(0,10),"..."):"missing",projectId:P.projectId||"missing",apiKeyLength:(null===(e=P.apiKey)||void 0===e?void 0:e.length)||0,config:P}),Error(t)}if((0,c.C6)().length?(n=(0,c.C6)()[0],console.log("[Firebase] ✓ Using existing app")):(console.log("[Firebase] Initializing new app..."),n=(0,c.ZF)(P),console.log("[Firebase] ✓ App initialized successfully")),console.log("[Firebase] Getting Firestore, Auth, and Storage..."),i=(0,d.ad)(n),s=(0,f.v0)(n),a=function(e=(0,c.Mq)(),t){e=(0,p.m9)(e);let r=(0,c.qX)(e,O).getImmediate({identifier:void 0}),n=(0,p.P0)("storage");return n&&function(e,t,r,n={}){!function(e,t,r,n={}){e.host=`${t}:${r}`;let i=(0,p.Xx)(t);i&&((0,p.Uo)(`https://${e.host}/b`),(0,p.dp)("Storage",!0)),e._isUsingEmulator=!0,e._protocol=i?"https":"http";let{mockUserToken:s}=n;s&&(e._overrideAuthToken="string"==typeof s?s:(0,p.Sg)(s,e.app.options.projectId))}(e,t,r,n)}(r,...n),r}(n),console.log("[Firebase] ✓ Services initialized:",{hasDb:!!i,hasAuth:!!s,hasStorage:!!a,projectId:P.projectId,apiKey:P.apiKey?"".concat(P.apiKey.substring(0,10),"..."):"missing"}),!s)throw Error("getAuth() returned undefined");(0,d.Ix)(i).then(()=>{console.log("[Firebase] ✓ Firestore network enabled")}).catch(e=>{console.warn("[Firebase] Could not enable Firestore network:",e)})}catch(t){let e={message:t.message,stack:t.stack,name:t.name};throw console.error("[Firebase] ✗ Initialization failed:",t),console.error("[Firebase] ✗ Error details:",e),t}}try{x()}catch(e){console.warn("[Firebase] Initial module load initialization failed, will retry on first use:",e)}function M(){try{x()}catch(e){throw console.error("[getFirebaseAuth] Initialization error:",e),Error("Firebase initialization failed: ".concat(e.message))}if(!s){var e;throw console.error("[getFirebaseAuth] Auth is undefined after initialization attempt",{hasApp:!!n,hasDb:!!i,hasAuth:!!s,isFirebaseConfigured:L,firebaseConfig:{hasApiKey:!!P.apiKey,hasProjectId:!!P.projectId,apiKeyLength:(null===(e=P.apiKey)||void 0===e?void 0:e.length)||0,projectId:P.projectId}}),Error("Firebase Auth not initialized. Check Firebase configuration.")}return s}function U(){if(x(),!i)throw Error("Firestore not initialized. Check Firebase configuration.");return i}},6814:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return s}});var n=r(5893);r(9311),r(1042);var i=r(6442);function s(e){let{Component:t,pageProps:r}=e;return(0,n.jsx)(i.H,{children:(0,n.jsx)(t,{...r})})}},1876:function(e){!function(){var t={675:function(e,t){"use strict";t.byteLength=function(e){var t=l(e),r=t[0],n=t[1];return(r+n)*3/4-n},t.toByteArray=function(e){var t,r,s=l(e),a=s[0],o=s[1],u=new i((a+o)*3/4-o),h=0,c=o>0?a-4:a;for(r=0;r<c;r+=4)t=n[e.charCodeAt(r)]<<18|n[e.charCodeAt(r+1)]<<12|n[e.charCodeAt(r+2)]<<6|n[e.charCodeAt(r+3)],u[h++]=t>>16&255,u[h++]=t>>8&255,u[h++]=255&t;return 2===o&&(t=n[e.charCodeAt(r)]<<2|n[e.charCodeAt(r+1)]>>4,u[h++]=255&t),1===o&&(t=n[e.charCodeAt(r)]<<10|n[e.charCodeAt(r+1)]<<4|n[e.charCodeAt(r+2)]>>2,u[h++]=t>>8&255,u[h++]=255&t),u},t.fromByteArray=function(e){for(var t,n=e.length,i=n%3,s=[],a=0,o=n-i;a<o;a+=16383)s.push(function(e,t,n){for(var i,s=[],a=t;a<n;a+=3)s.push(r[(i=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]))>>18&63]+r[i>>12&63]+r[i>>6&63]+r[63&i]);return s.join("")}(e,a,a+16383>o?o:a+16383));return 1===i?s.push(r[(t=e[n-1])>>2]+r[t<<4&63]+"=="):2===i&&s.push(r[(t=(e[n-2]<<8)+e[n-1])>>10]+r[t>>4&63]+r[t<<2&63]+"="),s.join("")};for(var r=[],n=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,o=s.length;a<o;++a)r[a]=s[a],n[s.charCodeAt(a)]=a;function l(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");-1===r&&(r=t);var n=r===t?0:4-r%4;return[r,n]}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63},72:function(e,t,r){"use strict";/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var n=r(675),i=r(783),s="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function a(e){if(e>2147483647)throw RangeError('The value "'+e+'" is invalid for option "size"');var t=new Uint8Array(e);return Object.setPrototypeOf(t,o.prototype),t}function o(e,t,r){if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return h(e)}return l(e,t,r)}function l(e,t,r){if("string"==typeof e)return function(e,t){if(("string"!=typeof t||""===t)&&(t="utf8"),!o.isEncoding(t))throw TypeError("Unknown encoding: "+t);var r=0|f(e,t),n=a(r),i=n.write(e,t);return i!==r&&(n=n.slice(0,i)),n}(e,t);if(ArrayBuffer.isView(e))return c(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(R(e,ArrayBuffer)||e&&R(e.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(R(e,SharedArrayBuffer)||e&&R(e.buffer,SharedArrayBuffer)))return function(e,t,r){var n;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),o.prototype),n}(e,t,r);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');var n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return o.from(n,t,r);var i=function(e){if(o.isBuffer(e)){var t,r=0|d(e.length),n=a(r);return 0===n.length||e.copy(n,0,0,r),n}return void 0!==e.length?"number"!=typeof e.length||(t=e.length)!=t?a(0):c(e):"Buffer"===e.type&&Array.isArray(e.data)?c(e.data):void 0}(e);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return o.from(e[Symbol.toPrimitive]("string"),t,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function u(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function h(e){return u(e),a(e<0?0:0|d(e))}function c(e){for(var t=e.length<0?0:0|d(e.length),r=a(t),n=0;n<t;n+=1)r[n]=255&e[n];return r}function d(e){if(e>=2147483647)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function f(e,t){if(o.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||R(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);var r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(var i=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return S(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return A(e).length;default:if(i)return n?-1:S(e).length;t=(""+t).toLowerCase(),i=!0}}function p(e,t,r){var i,s,a=!1;if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||(r>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var i="",s=t;s<r;++s)i+=N[e[s]];return i}(this,t,r);case"utf8":case"utf-8":return v(this,t,r);case"ascii":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(127&e[i]);return n}(this,t,r);case"latin1":case"binary":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(e[i]);return n}(this,t,r);case"base64":return i=t,s=r,0===i&&s===this.length?n.fromByteArray(this):n.fromByteArray(this.slice(i,s));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){for(var n=e.slice(t,r),i="",s=0;s<n.length;s+=2)i+=String.fromCharCode(n[s]+256*n[s+1]);return i}(this,t,r);default:if(a)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),a=!0}}function g(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function m(e,t,r,n,i){var s;if(0===e.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),(s=r=+r)!=s&&(r=i?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(i)return -1;r=e.length-1}else if(r<0){if(!i)return -1;r=0}if("string"==typeof t&&(t=o.from(t,n)),o.isBuffer(t))return 0===t.length?-1:y(e,t,r,n,i);if("number"==typeof t)return(t&=255,"function"==typeof Uint8Array.prototype.indexOf)?i?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):y(e,[t],r,n,i);throw TypeError("val must be string, number or Buffer")}function y(e,t,r,n,i){var s,a=1,o=e.length,l=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return -1;a=2,o/=2,l/=2,r/=2}function u(e,t){return 1===a?e[t]:e.readUInt16BE(t*a)}if(i){var h=-1;for(s=r;s<o;s++)if(u(e,s)===u(t,-1===h?0:s-h)){if(-1===h&&(h=s),s-h+1===l)return h*a}else -1!==h&&(s-=s-h),h=-1}else for(r+l>o&&(r=o-l),s=r;s>=0;s--){for(var c=!0,d=0;d<l;d++)if(u(e,s+d)!==u(t,d)){c=!1;break}if(c)return s}return -1}function v(e,t,r){r=Math.min(e.length,r);for(var n=[],i=t;i<r;){var s,a,o,l,u=e[i],h=null,c=u>239?4:u>223?3:u>191?2:1;if(i+c<=r)switch(c){case 1:u<128&&(h=u);break;case 2:(192&(s=e[i+1]))==128&&(l=(31&u)<<6|63&s)>127&&(h=l);break;case 3:s=e[i+1],a=e[i+2],(192&s)==128&&(192&a)==128&&(l=(15&u)<<12|(63&s)<<6|63&a)>2047&&(l<55296||l>57343)&&(h=l);break;case 4:s=e[i+1],a=e[i+2],o=e[i+3],(192&s)==128&&(192&a)==128&&(192&o)==128&&(l=(15&u)<<18|(63&s)<<12|(63&a)<<6|63&o)>65535&&l<1114112&&(h=l)}null===h?(h=65533,c=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),i+=c}return function(e){var t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);for(var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));return r}(n)}function w(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function _(e,t,r,n,i,s){if(!o.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<s)throw RangeError('"value" argument is out of bounds');if(r+n>e.length)throw RangeError("Index out of range")}function E(e,t,r,n,i,s){if(r+n>e.length||r<0)throw RangeError("Index out of range")}function I(e,t,r,n,s){return t=+t,r>>>=0,s||E(e,t,r,4,34028234663852886e22,-34028234663852886e22),i.write(e,t,r,n,23,4),r+4}function b(e,t,r,n,s){return t=+t,r>>>=0,s||E(e,t,r,8,17976931348623157e292,-17976931348623157e292),i.write(e,t,r,n,52,8),r+8}t.Buffer=o,t.SlowBuffer=function(e){return+e!=e&&(e=0),o.alloc(+e)},t.INSPECT_MAX_BYTES=50,t.kMaxLength=2147483647,o.TYPED_ARRAY_SUPPORT=function(){try{var e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),o.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(o.prototype,"parent",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.buffer}}),Object.defineProperty(o.prototype,"offset",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.byteOffset}}),o.poolSize=8192,o.from=function(e,t,r){return l(e,t,r)},Object.setPrototypeOf(o.prototype,Uint8Array.prototype),Object.setPrototypeOf(o,Uint8Array),o.alloc=function(e,t,r){return(u(e),e<=0)?a(e):void 0!==t?"string"==typeof r?a(e).fill(t,r):a(e).fill(t):a(e)},o.allocUnsafe=function(e){return h(e)},o.allocUnsafeSlow=function(e){return h(e)},o.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==o.prototype},o.compare=function(e,t){if(R(e,Uint8Array)&&(e=o.from(e,e.offset,e.byteLength)),R(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),!o.isBuffer(e)||!o.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;for(var r=e.length,n=t.length,i=0,s=Math.min(r,n);i<s;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0},o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(e,t){if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return o.alloc(0);if(void 0===t)for(r=0,t=0;r<e.length;++r)t+=e[r].length;var r,n=o.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){var s=e[r];if(R(s,Uint8Array)&&(s=o.from(s)),!o.isBuffer(s))throw TypeError('"list" argument must be an Array of Buffers');s.copy(n,i),i+=s.length}return n},o.byteLength=f,o.prototype._isBuffer=!0,o.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)g(this,t,t+1);return this},o.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)g(this,t,t+3),g(this,t+1,t+2);return this},o.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)g(this,t,t+7),g(this,t+1,t+6),g(this,t+2,t+5),g(this,t+3,t+4);return this},o.prototype.toString=function(){var e=this.length;return 0===e?"":0==arguments.length?v(this,0,e):p.apply(this,arguments)},o.prototype.toLocaleString=o.prototype.toString,o.prototype.equals=function(e){if(!o.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===o.compare(this,e)},o.prototype.inspect=function(){var e="",r=t.INSPECT_MAX_BYTES;return e=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(e+=" ... "),"<Buffer "+e+">"},s&&(o.prototype[s]=o.prototype.inspect),o.prototype.compare=function(e,t,r,n,i){if(R(e,Uint8Array)&&(e=o.from(e,e.offset,e.byteLength)),!o.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),t<0||r>e.length||n<0||i>this.length)throw RangeError("out of range index");if(n>=i&&t>=r)return 0;if(n>=i)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,i>>>=0,this===e)return 0;for(var s=i-n,a=r-t,l=Math.min(s,a),u=this.slice(n,i),h=e.slice(t,r),c=0;c<l;++c)if(u[c]!==h[c]){s=u[c],a=h[c];break}return s<a?-1:a<s?1:0},o.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},o.prototype.indexOf=function(e,t,r){return m(this,e,t,r,!0)},o.prototype.lastIndexOf=function(e,t,r){return m(this,e,t,r,!1)},o.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var i,s,a,o,l,u,h,c,d,f,p,g,m=this.length-t;if((void 0===r||r>m)&&(r=m),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var y=!1;;)switch(n){case"hex":return function(e,t,r,n){r=Number(r)||0;var i=e.length-r;n?(n=Number(n))>i&&(n=i):n=i;var s=t.length;n>s/2&&(n=s/2);for(var a=0;a<n;++a){var o=parseInt(t.substr(2*a,2),16);if(o!=o)break;e[r+a]=o}return a}(this,e,t,r);case"utf8":case"utf-8":return l=t,u=r,k(S(e,this.length-l),this,l,u);case"ascii":return h=t,c=r,k(C(e),this,h,c);case"latin1":case"binary":return i=this,s=e,a=t,o=r,k(C(s),i,a,o);case"base64":return d=t,f=r,k(A(e),this,d,f);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return p=t,g=r,k(function(e,t){for(var r,n,i=[],s=0;s<e.length&&!((t-=2)<0);++s)n=(r=e.charCodeAt(s))>>8,i.push(r%256),i.push(n);return i}(e,this.length-p),this,p,g);default:if(y)throw TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),y=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.slice=function(e,t){var r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);var n=this.subarray(e,t);return Object.setPrototypeOf(n,o.prototype),n},o.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=this[e],i=1,s=0;++s<t&&(i*=256);)n+=this[e+s]*i;return n},o.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=this[e+--t],i=1;t>0&&(i*=256);)n+=this[e+--t]*i;return n},o.prototype.readUInt8=function(e,t){return e>>>=0,t||w(e,1,this.length),this[e]},o.prototype.readUInt16LE=function(e,t){return e>>>=0,t||w(e,2,this.length),this[e]|this[e+1]<<8},o.prototype.readUInt16BE=function(e,t){return e>>>=0,t||w(e,2,this.length),this[e]<<8|this[e+1]},o.prototype.readUInt32LE=function(e,t){return e>>>=0,t||w(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},o.prototype.readUInt32BE=function(e,t){return e>>>=0,t||w(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},o.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=this[e],i=1,s=0;++s<t&&(i*=256);)n+=this[e+s]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*t)),n},o.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||w(e,t,this.length);for(var n=t,i=1,s=this[e+--n];n>0&&(i*=256);)s+=this[e+--n]*i;return s>=(i*=128)&&(s-=Math.pow(2,8*t)),s},o.prototype.readInt8=function(e,t){return(e>>>=0,t||w(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},o.prototype.readInt16LE=function(e,t){e>>>=0,t||w(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},o.prototype.readInt16BE=function(e,t){e>>>=0,t||w(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},o.prototype.readInt32LE=function(e,t){return e>>>=0,t||w(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},o.prototype.readInt32BE=function(e,t){return e>>>=0,t||w(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},o.prototype.readFloatLE=function(e,t){return e>>>=0,t||w(e,4,this.length),i.read(this,e,!0,23,4)},o.prototype.readFloatBE=function(e,t){return e>>>=0,t||w(e,4,this.length),i.read(this,e,!1,23,4)},o.prototype.readDoubleLE=function(e,t){return e>>>=0,t||w(e,8,this.length),i.read(this,e,!0,52,8)},o.prototype.readDoubleBE=function(e,t){return e>>>=0,t||w(e,8,this.length),i.read(this,e,!1,52,8)},o.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){var i=Math.pow(2,8*r)-1;_(this,e,t,r,i,0)}var s=1,a=0;for(this[t]=255&e;++a<r&&(s*=256);)this[t+a]=e/s&255;return t+r},o.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){var i=Math.pow(2,8*r)-1;_(this,e,t,r,i,0)}var s=r-1,a=1;for(this[t+s]=255&e;--s>=0&&(a*=256);)this[t+s]=e/a&255;return t+r},o.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,1,255,0),this[t]=255&e,t+1},o.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},o.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},o.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},o.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},o.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var i=Math.pow(2,8*r-1);_(this,e,t,r,i-1,-i)}var s=0,a=1,o=0;for(this[t]=255&e;++s<r&&(a*=256);)e<0&&0===o&&0!==this[t+s-1]&&(o=1),this[t+s]=(e/a>>0)-o&255;return t+r},o.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var i=Math.pow(2,8*r-1);_(this,e,t,r,i-1,-i)}var s=r-1,a=1,o=0;for(this[t+s]=255&e;--s>=0&&(a*=256);)e<0&&0===o&&0!==this[t+s+1]&&(o=1),this[t+s]=(e/a>>0)-o&255;return t+r},o.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},o.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},o.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},o.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},o.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||_(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},o.prototype.writeFloatLE=function(e,t,r){return I(this,e,t,!0,r)},o.prototype.writeFloatBE=function(e,t,r){return I(this,e,t,!1,r)},o.prototype.writeDoubleLE=function(e,t,r){return b(this,e,t,!0,r)},o.prototype.writeDoubleBE=function(e,t,r){return b(this,e,t,!1,r)},o.prototype.copy=function(e,t,r,n){if(!o.isBuffer(e))throw TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r||0===e.length||0===this.length)return 0;if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(n<0)throw RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var i=n-r;if(this===e&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(t,r,n);else if(this===e&&r<t&&t<n)for(var s=i-1;s>=0;--s)e[s+t]=this[s+r];else Uint8Array.prototype.set.call(e,this.subarray(r,n),t);return i},o.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw TypeError("encoding must be a string");if("string"==typeof n&&!o.isEncoding(n))throw TypeError("Unknown encoding: "+n);if(1===e.length){var i,s=e.charCodeAt(0);("utf8"===n&&s<128||"latin1"===n)&&(e=s)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(i=t;i<r;++i)this[i]=e;else{var a=o.isBuffer(e)?e:o.from(e,n),l=a.length;if(0===l)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-t;++i)this[i+t]=a[i%l]}return this};var T=/[^+/0-9A-Za-z-_]/g;function S(e,t){t=t||1/0;for(var r,n=e.length,i=null,s=[],a=0;a<n;++a){if((r=e.charCodeAt(a))>55295&&r<57344){if(!i){if(r>56319||a+1===n){(t-=3)>-1&&s.push(239,191,189);continue}i=r;continue}if(r<56320){(t-=3)>-1&&s.push(239,191,189),i=r;continue}r=(i-55296<<10|r-56320)+65536}else i&&(t-=3)>-1&&s.push(239,191,189);if(i=null,r<128){if((t-=1)<0)break;s.push(r)}else if(r<2048){if((t-=2)<0)break;s.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;s.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;s.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return s}function C(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}function A(e){return n.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(T,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function k(e,t,r,n){for(var i=0;i<n&&!(i+r>=t.length)&&!(i>=e.length);++i)t[i+r]=e[i];return i}function R(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}var N=function(){for(var e="0123456789abcdef",t=Array(256),r=0;r<16;++r)for(var n=16*r,i=0;i<16;++i)t[n+i]=e[r]+e[i];return t}()},783:function(e,t){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */t.read=function(e,t,r,n,i){var s,a,o=8*i-n-1,l=(1<<o)-1,u=l>>1,h=-7,c=r?i-1:0,d=r?-1:1,f=e[t+c];for(c+=d,s=f&(1<<-h)-1,f>>=-h,h+=o;h>0;s=256*s+e[t+c],c+=d,h-=8);for(a=s&(1<<-h)-1,s>>=-h,h+=n;h>0;a=256*a+e[t+c],c+=d,h-=8);if(0===s)s=1-u;else{if(s===l)return a?NaN:1/0*(f?-1:1);a+=Math.pow(2,n),s-=u}return(f?-1:1)*a*Math.pow(2,s-n)},t.write=function(e,t,r,n,i,s){var a,o,l,u=8*s-i-1,h=(1<<u)-1,c=h>>1,d=23===i?5960464477539062e-23:0,f=n?0:s-1,p=n?1:-1,g=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(o=isNaN(t)?1:0,a=h):(a=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-a))<1&&(a--,l*=2),a+c>=1?t+=d/l:t+=d*Math.pow(2,1-c),t*l>=2&&(a++,l/=2),a+c>=h?(o=0,a=h):a+c>=1?(o=(t*l-1)*Math.pow(2,i),a+=c):(o=t*Math.pow(2,c-1)*Math.pow(2,i),a=0));i>=8;e[r+f]=255&o,f+=p,o/=256,i-=8);for(a=a<<i|o,u+=i;u>0;e[r+f]=255&a,f+=p,a/=256,u-=8);e[r+f-p]|=128*g}}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var s=r[e]={exports:{}},a=!0;try{t[e](s,s.exports,n),a=!1}finally{a&&delete r[e]}return s.exports}n.ab="//";var i=n(72);e.exports=i}()},1042:function(){},9311:function(){},4155:function(e){var t,r,n,i=e.exports={};function s(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}function o(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var l=[],u=!1,h=-1;function c(){u&&n&&(u=!1,n.length?l=n.concat(l):h=-1,l.length&&d())}function d(){if(!u){var e=o(c);u=!0;for(var t=l.length;t;){for(n=l,l=[];++h<t;)n&&n[h].run();h=-1,t=l.length}n=null,u=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function p(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new f(e,t)),1!==l.length||u||o(d)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=p,i.addListener=p,i.once=p,i.off=p,i.removeListener=p,i.removeAllListeners=p,i.emit=p,i.prependListener=p,i.prependOnceListener=p,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}},6771:function(e,t,r){"use strict";let n,i,s;r.d(t,{Jn:function(){return U},qX:function(){return P},rh:function(){return L},Xd:function(){return D},Mq:function(){return F},C6:function(){return B},ZF:function(){return V},KN:function(){return j}});var a=r(75),o=r(4645),l=r(9711);let u=(e,t)=>t.some(t=>e instanceof t),h=new WeakMap,c=new WeakMap,d=new WeakMap,f=new WeakMap,p=new WeakMap,g={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return c.get(e);if("objectStoreNames"===t)return e.objectStoreNames||d.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return m(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function m(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(m(e.result)),n()},s=()=>{r(e.error),n()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&h.set(t,e)}).catch(()=>{}),p.set(t,e),t}(e);if(f.has(e))return f.get(e);let r="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(y(this),e),m(h.get(this))}:function(...e){return m(t.apply(y(this),e))}:function(e,...r){let n=t.call(y(this),e,...r);return d.set(n,e.sort?e.sort():[e]),m(n)}:(t instanceof IDBTransaction&&function(e){if(c.has(e))return;let t=new Promise((t,r)=>{let n=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),n()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});c.set(e,t)}(t),u(t,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,g):t;return r!==e&&(f.set(e,r),p.set(r,e)),r}let y=e=>p.get(e),v=["get","getKey","getAll","getAllKeys","count"],w=["put","add","delete","clear"],_=new Map;function E(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(_.get(t))return _.get(t);let r=t.replace(/FromIndex$/,""),n=t!==r,i=w.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(i||v.includes(r)))return;let s=async function(e,...t){let s=this.transaction(e,i?"readwrite":"readonly"),a=s.store;return n&&(a=a.index(t.shift())),(await Promise.all([a[r](...t),i&&s.done]))[0]};return _.set(t,s),s}g={...s=g,get:(e,t,r)=>E(e,t)||s.get(e,t,r),has:(e,t)=>!!E(e,t)||s.has(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(!function(e){let t=e.getComponent();return t?.type==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let b="@firebase/app",T="0.14.6",S=new o.Yd("@firebase/app"),C="[DEFAULT]",A={[b]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/data-connect":"fire-data-connect","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","@firebase/ai":"fire-vertex","fire-js":"fire-js",firebase:"fire-js-all"},k=new Map,R=new Map,N=new Map;function O(e,t){try{e.container.addComponent(t)}catch(r){S.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,r)}}function D(e){let t=e.name;if(N.has(t))return S.debug(`There were multiple attempts to register component ${t}.`),!1;for(let r of(N.set(t,e),k.values()))O(r,e);for(let t of R.values())O(t,e);return!0}function P(e,t){let r=e.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),e.container.getProvider(t)}function L(e){return null!=e&&void 0!==e.settings}let x=new l.LL("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new a.wA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw x.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let U="12.6.0";function V(e,t={}){let r=e;"object"!=typeof t&&(t={name:t});let n={name:C,automaticDataCollectionEnabled:!0,...t},i=n.name;if("string"!=typeof i||!i)throw x.create("bad-app-name",{appName:String(i)});if(r||(r=(0,l.aH)()),!r)throw x.create("no-options");let s=k.get(i);if(s){if((0,l.vZ)(r,s.options)&&(0,l.vZ)(n,s.config))return s;throw x.create("duplicate-app",{appName:i})}let o=new a.H0(i);for(let e of N.values())o.addComponent(e);let u=new M(r,n,o);return k.set(i,u),u}function F(e=C){let t=k.get(e);if(!t&&e===C&&(0,l.aH)())return V();if(!t)throw x.create("no-app",{appName:e});return t}function B(){return Array.from(k.values())}function j(e,t,r){let n=A[e]??e;r&&(n+=`-${r}`);let i=n.match(/\s|\//),s=t.match(/\s|\//);if(i||s){let e=[`Unable to register library "${n}" with version "${t}":`];i&&e.push(`library name "${n}" contains illegal characters (whitespace or "/")`),i&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),S.warn(e.join(" "));return}D(new a.wA(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}let q="firebase-heartbeat-store",z=null;function $(){return z||(z=(function(e,t,{blocked:r,upgrade:n,blocking:i,terminated:s}={}){let a=indexedDB.open(e,1),o=m(a);return n&&a.addEventListener("upgradeneeded",e=>{n(m(a.result),e.oldVersion,e.newVersion,m(a.transaction),e)}),r&&a.addEventListener("blocked",e=>r(e.oldVersion,e.newVersion,e)),o.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),o})("firebase-heartbeat-database",0,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(q)}catch(e){console.warn(e)}}}).catch(e=>{throw x.create("idb-open",{originalErrorMessage:e.message})})),z}async function K(e){try{let t=(await $()).transaction(q),r=await t.objectStore(q).get(G(e));return await t.done,r}catch(e){if(e instanceof l.ZR)S.warn(e.message);else{let t=x.create("idb-get",{originalErrorMessage:e?.message});S.warn(t.message)}}}async function H(e,t){try{let r=(await $()).transaction(q,"readwrite"),n=r.objectStore(q);await n.put(t,G(e)),await r.done}catch(e){if(e instanceof l.ZR)S.warn(e.message);else{let t=x.create("idb-set",{originalErrorMessage:e?.message});S.warn(t.message)}}}function G(e){return`${e.name}!${e.options.appId}`}class W{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new X(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{let e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=Q();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){let e=function(e){if(0===e.length)return -1;let t=0,r=e[0].date;for(let n=1;n<e.length;n++)e[n].date<r&&(r=e[n].date,t=n);return t}(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){S.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||0===this._heartbeatsCache.heartbeats.length)return"";let e=Q(),{heartbeatsToSend:t,unsentEntries:r}=function(e,t=1024){let r=[],n=e.slice();for(let i of e){let e=r.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),Y(r)>t){e.dates.pop();break}}else if(r.push({agent:i.agent,dates:[i.date]}),Y(r)>t){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}(this._heartbeatsCache.heartbeats),n=(0,l.L)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),n}catch(e){return S.warn(e),""}}}function Q(){return new Date().toISOString().substring(0,10)}class X{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,l.hl)()&&(0,l.eu)().then(()=>!0).catch(()=>!1)}async read(){if(!await this._canUseIndexedDBPromise)return{heartbeats:[]};{let e=await K(this.app);return e?.heartbeats?e:{heartbeats:[]}}}async overwrite(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return H(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return H(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function Y(e){return(0,l.L)(JSON.stringify({version:2,heartbeats:e})).length}D(new a.wA("platform-logger",e=>new I(e),"PRIVATE")),D(new a.wA("heartbeat",e=>new W(e),"PRIVATE")),j(b,T,""),j(b,T,"esm2020"),j("fire-js","")},75:function(e,t,r){"use strict";r.d(t,{H0:function(){return o},wA:function(){return i}});var n=r(9711);class i{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new n.BH;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:t});r&&e.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(r)return null;throw e}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:s})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:r});t.resolve(e)}catch(e){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let n=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[e,t]of this.instancesDeferred.entries())r===this.normalizeInstanceIdentifier(e)&&t.resolve(n);return n}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),n=this.onInitCallbacks.get(r)??new Set;n.add(e),this.onInitCallbacks.set(r,n);let i=this.instances.get(r);return i&&e(i,r),()=>{n.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let n of r)try{n(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:e===s?void 0:e,options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new a(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},4645:function(e,t,r){"use strict";var n,i;r.d(t,{Yd:function(){return h},in:function(){return n}});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s=[];(i=n||(n={}))[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT";let a={debug:n.DEBUG,verbose:n.VERBOSE,info:n.INFO,warn:n.WARN,error:n.ERROR,silent:n.SILENT},o=n.INFO,l={[n.DEBUG]:"log",[n.VERBOSE]:"log",[n.INFO]:"info",[n.WARN]:"warn",[n.ERROR]:"error"},u=(e,t,...r)=>{if(t<e.logLevel)return;let n=new Date().toISOString(),i=l[t];if(i)console[i](`[${n}]  ${e.name}:`,...r);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class h{constructor(e){this.name=e,this._logLevel=o,this._logHandler=u,this._userLogHandler=null,s.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in n))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?a[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,n.DEBUG,...e),this._logHandler(this,n.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,n.VERBOSE,...e),this._logHandler(this,n.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,n.INFO,...e),this._logHandler(this,n.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,n.WARN,...e),this._logHandler(this,n.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,n.ERROR,...e),this._logHandler(this,n.ERROR,...e)}}},3910:function(e,t,r){"use strict";r.d(t,{Xb:function(){return ts},v0:function(){return rE},Aj:function(){return tu},LS:function(){return ti},e5:function(){return ta},w7:function(){return th},ck:function(){return tl}});var n,i=r(6771),s=r(9711),a=r(4645),o=r(75);function l(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}let u=new s.LL("auth","Firebase",l()),h=new a.Yd("@firebase/auth");function c(e,...t){h.logLevel<=a.in.ERROR&&h.error(`Auth (${i.Jn}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e,...t){throw m(e,...t)}function f(e,...t){return m(e,...t)}function p(e,t,r){let n={...l(),[t]:r};return new s.LL("auth","Firebase",n).create(t,{appName:e.name})}function g(e){return p(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function m(e,...t){if("string"!=typeof e){let r=t[0],n=[...t.slice(1)];return n[0]&&(n[0].appName=e.name),e._errorFactory.create(r,...n)}return u.create(e,...t)}function y(e,t,...r){if(!e)throw m(t,...r)}function v(e){let t="INTERNAL ASSERTION FAILED: "+e;throw c(t),Error(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w(){return"undefined"!=typeof self&&self.location?.href||""}function _(){return"undefined"!=typeof self&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e,t){var r;this.shortDelay=e,this.longDelay=t,r="Short delay should be less than long delay!",t>e||v(r),this.isMobile=(0,s.uI)()||(0,s.b$)()}get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&("http:"===_()||"https:"===_()||(0,s.ru)()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I(e,t){var r,n;r=e.emulator,n="Emulator should always be set here",r||v(n);let{url:i}=e.emulator;return t?`${i}${t.startsWith("/")?t.slice(1):t}`:i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void v("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void v("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void v("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let T={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},S=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],C=new E(3e4,6e4);function A(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function k(e,t,r,n,i={}){return R(e,i,async()=>{let i={},a={};n&&("GET"===t?a=n:i={body:JSON.stringify(n)});let o=(0,s.xO)({key:e.config.apiKey,...a}).slice(1),l=await e._getAdditionalHeaders();l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode);let u={method:t,headers:l,...i};return(0,s.L_)()||(u.referrerPolicy="no-referrer"),e.emulatorConfig&&(0,s.Xx)(e.emulatorConfig.host)&&(u.credentials="include"),b.fetch()(await O(e,e.config.apiHost,r,o),u)})}async function R(e,t,r){e._canInitEmulator=!1;let n={...T,...t};try{let t=new D(e),i=await Promise.race([r(),t.promise]);t.clearNetworkTimeout();let s=await i.json();if("needConfirmation"in s)throw P(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{let[t,r]=(i.ok?s.errorMessage:s.error.message).split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===t)throw P(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===t)throw P(e,"email-already-in-use",s);if("USER_DISABLED"===t)throw P(e,"user-disabled",s);let a=n[t]||t.toLowerCase().replace(/[_\s]+/g,"-");if(r)throw p(e,a,r);d(e,a)}}catch(t){if(t instanceof s.ZR)throw t;d(e,"network-request-failed",{message:String(t)})}}async function N(e,t,r,n,i={}){let s=await k(e,t,r,n,i);return"mfaPendingCredential"in s&&d(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function O(e,t,r,n){let i=`${t}${r}?${n}`,s=e.config.emulator?I(e.config,i):`${e.config.apiScheme}://${i}`;return S.includes(r)&&(await e._persistenceManagerAvailable,"COOKIE"===e._getPersistenceType())?e._getPersistence()._getFinalTarget(s).toString():s}class D{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(f(this.auth,"network-request-failed")),C.get())})}}function P(e,t,r){let n={appName:e.name};r.email&&(n.email=r.email),r.phoneNumber&&(n.phoneNumber=r.phoneNumber);let i=f(e,t,n);return i.customData._tokenResponse=r,i}function L(e){return void 0!==e&&void 0!==e.enterprise}class x{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return function(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function M(e,t){return k(e,"GET","/v2/recaptchaConfig",A(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U(e,t){return k(e,"POST","/v1/accounts:delete",t)}async function V(e,t){return k(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}async function B(e,t=!1){let r=(0,s.m9)(e),n=await r.getIdToken(t),i=q(n);y(i&&i.exp&&i.auth_time&&i.iat,r.auth,"internal-error");let a="object"==typeof i.firebase?i.firebase:void 0,o=a?.sign_in_provider;return{claims:i,token:n,authTime:F(j(i.auth_time)),issuedAtTime:F(j(i.iat)),expirationTime:F(j(i.exp)),signInProvider:o||null,signInSecondFactor:a?.sign_in_second_factor||null}}function j(e){return 1e3*Number(e)}function q(e){let[t,r,n]=e.split(".");if(void 0===t||void 0===r||void 0===n)return c("JWT malformed, contained fewer than 3 sections"),null;try{let e=(0,s.tV)(r);if(!e)return c("Failed to decode base64 JWT payload"),null;return JSON.parse(e)}catch(e){return c("Caught error parsing JWT payload as JSON",e?.toString()),null}}function z(e){let t=q(e);return y(t,"internal-error"),y(void 0!==t.exp,"internal-error"),y(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $(e,t,r=!1){if(r)return t;try{return await t}catch(t){throw t instanceof s.ZR&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(!e)return this.errorBackoff=3e4,Math.max(0,(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5);{let e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=F(this.lastLoginAt),this.creationTime=F(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G(e){let t=e.auth,r=await e.getIdToken(),n=await $(e,V(t,{idToken:r}));y(n?.users.length,t,"internal-error");let i=n.users[0];e._notifyReloadListener(i);let s=i.providerUserInfo?.length?Q(i.providerUserInfo):[],a=[...e.providerData.filter(e=>!s.some(t=>t.providerId===e.providerId)),...s],o=e.isAnonymous,l=!(e.email&&i.passwordHash)&&!a?.length;Object.assign(e,{uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new H(i.createdAt,i.lastLoginAt),isAnonymous:!!o&&l})}async function W(e){let t=(0,s.m9)(e);await G(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Q(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X(e,t){let r=await R(e,{},async()=>{let r=(0,s.xO)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:n,apiKey:i}=e.config,a=await O(e,n,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";let l={method:"POST",headers:o,body:r};return e.emulatorConfig&&(0,s.Xx)(e.emulatorConfig.host)&&(l.credentials="include"),b.fetch()(a,l)});return{accessToken:r.access_token,expiresIn:r.expires_in,refreshToken:r.refresh_token}}async function Y(e,t){return k(e,"POST","/v2/accounts:revokeToken",A(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){y(e.idToken,"internal-error"),y(void 0!==e.idToken,"internal-error"),y(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):z(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){y(0!==e.length,"internal-error");let t=z(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(y(this.refreshToken,e,"user-token-expired"),this.refreshToken)?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:n,expiresIn:i}=await X(e,t);this.updateTokensAndExpiration(r,n,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*r}static fromJSON(e,t){let{refreshToken:r,accessToken:n,expirationTime:i}=t,s=new J;return r&&(y("string"==typeof r,"internal-error",{appName:e}),s.refreshToken=r),n&&(y("string"==typeof n,"internal-error",{appName:e}),s.accessToken=n),i&&(y("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new J,this.toJSON())}_performRefresh(){return v("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e,t){y("string"==typeof e||void 0===e,"internal-error",{appName:t})}class ee{constructor({uid:e,auth:t,stsTokenManager:r,...n}){this.providerId="firebase",this.proactiveRefresh=new K(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=n.displayName||null,this.email=n.email||null,this.emailVerified=n.emailVerified||!1,this.phoneNumber=n.phoneNumber||null,this.photoURL=n.photoURL||null,this.isAnonymous=n.isAnonymous||!1,this.tenantId=n.tenantId||null,this.providerData=n.providerData?[...n.providerData]:[],this.metadata=new H(n.createdAt||void 0,n.lastLoginAt||void 0)}async getIdToken(e){let t=await $(this,this.stsTokenManager.getToken(this.auth,e));return y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return B(this,e)}reload(){return W(this)}_assign(e){this!==e&&(y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new ee({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await G(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,i.rh)(this.auth.app))return Promise.reject(g(this.auth));let e=await this.getIdToken();return await $(this,U(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let r=t.displayName??void 0,n=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,a=t.tenantId??void 0,o=t._redirectEventId??void 0,l=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:h,emailVerified:c,isAnonymous:d,providerData:f,stsTokenManager:p}=t;y(h&&p,e,"internal-error");let g=J.fromJSON(this.name,p);y("string"==typeof h,e,"internal-error"),Z(r,e.name),Z(n,e.name),y("boolean"==typeof c,e,"internal-error"),y("boolean"==typeof d,e,"internal-error"),Z(i,e.name),Z(s,e.name),Z(a,e.name),Z(o,e.name),Z(l,e.name),Z(u,e.name);let m=new ee({uid:h,auth:e,email:n,emailVerified:c,displayName:r,isAnonymous:d,photoURL:s,phoneNumber:i,tenantId:a,stsTokenManager:g,createdAt:l,lastLoginAt:u});return f&&Array.isArray(f)&&(m.providerData=f.map(e=>({...e}))),o&&(m._redirectEventId=o),m}static async _fromIdTokenResponse(e,t,r=!1){let n=new J;n.updateFromServerResponse(t);let i=new ee({uid:t.localId,auth:e,stsTokenManager:n,isAnonymous:r});return await G(i),i}static async _fromGetAccountInfoResponse(e,t,r){let n=t.users[0];y(void 0!==n.localId,"internal-error");let i=void 0!==n.providerUserInfo?Q(n.providerUserInfo):[],s=!(n.email&&n.passwordHash)&&!i?.length,a=new J;a.updateFromIdToken(r);let o=new ee({uid:n.localId,auth:e,stsTokenManager:a,isAnonymous:s});return Object.assign(o,{uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:i,metadata:new H(n.createdAt,n.lastLoginAt),isAnonymous:!(n.email&&n.passwordHash)&&!i?.length}),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let et=new Map;function er(e){var t,r;t="Expected a class definition",e instanceof Function||v(t);let n=et.get(e);return n?(r="Instance stored in cache mismatched with class",n instanceof e||v(r)):(n=new e,et.set(e,n)),n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(e,t,r){return`firebase:${e}:${t}:${r}`}en.type="NONE";class es{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:n,name:i}=this.auth;this.fullUserKey=ei(this.userKey,n.apiKey,i),this.fullPersistenceKey=ei("persistence",n.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){let t=await V(this.auth,{idToken:e}).catch(()=>void 0);return t?ee._fromGetAccountInfoResponse(this.auth,t,e):null}return ee._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new es(er(en),e,r);let n=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),i=n[0]||er(en),s=ei(r,e.config.apiKey,e.name),a=null;for(let r of t)try{let t=await r._get(s);if(t){let n;if("string"==typeof t){let r=await V(e,{idToken:t}).catch(()=>void 0);if(!r)break;n=await ee._fromGetAccountInfoResponse(e,r,t)}else n=ee._fromJSON(e,t);r!==i&&(a=n),i=r;break}}catch{}let o=n.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&o.length&&(i=o[0],a&&await i._set(s,a.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch{}}))),new es(i,e,r)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(eh(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";{if(t.includes("edge/"))return"Edge";if(eo(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ed(t))return"Blackberry";if(ef(t))return"Webos";if(el(t))return"Safari";if((t.includes("chrome/")||eu(t))&&!t.includes("edge/"))return"Chrome";if(ec(t))return"Android";let r=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if(r?.length===2)return r[1]}return"Other"}function eo(e=(0,s.z$)()){return/firefox\//i.test(e)}function el(e=(0,s.z$)()){let t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function eu(e=(0,s.z$)()){return/crios\//i.test(e)}function eh(e=(0,s.z$)()){return/iemobile/i.test(e)}function ec(e=(0,s.z$)()){return/android/i.test(e)}function ed(e=(0,s.z$)()){return/blackberry/i.test(e)}function ef(e=(0,s.z$)()){return/webos/i.test(e)}function ep(e=(0,s.z$)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function eg(e=(0,s.z$)()){return ep(e)||ec(e)||ef(e)||ed(e)||/windows phone/i.test(e)||eh(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(e,t=[]){let r;switch(e){case"Browser":r=ea((0,s.z$)());break;case"Worker":r=`${ea((0,s.z$)())}-${e}`;break;default:r=e}let n=t.length?t.join(","):"FirebaseCore-web";return`${r}/JsCore/${i.Jn}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=t=>new Promise((r,n)=>{try{let n=e(t);r(n)}catch(e){n(e)}});r.onAbort=t,this.queue.push(r);let n=this.queue.length-1;return()=>{this.queue[n]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(e){for(let e of(t.reverse(),t))try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:e?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ev(e,t={}){return k(e,"GET","/v2/passwordPolicy",A(e,t))}class ew{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,n=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),n&&(t.meetsMaxPasswordLength=e.length<=n)}validatePasswordCharacterOptions(e,t){let r;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let n=0;n<e.length;n++)r=e.charAt(n),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,n,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=n)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t,r,n){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new eI(this),this.idTokenSubscription=new eI(this),this.beforeStateQueue=new ey(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=u,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=er(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await es.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await V(this,{idToken:e}),r=await ee._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if((0,i.rh)(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),r=t,n=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let t=this.redirectUser?._redirectEventId,i=r?._redirectEventId,s=await this.tryRedirectSignIn(e);(!t||t===i)&&s?.user&&(r=s.user,n=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(n)try{await this.beforeStateQueue.runMiddleware(r)}catch(e){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return(y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId)?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await G(e)}catch(e){if(e?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,i.rh)(this.app))return Promise.reject(g(this));let t=e?(0,s.m9)(e):null;return t&&y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(0,i.rh)(this.app)?Promise.reject(g(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,i.rh)(this.app)?Promise.reject(g(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(er(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=new ew(await ev(this));null===this.tenantId?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new s.LL("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await Y(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return null===e?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&er(e)||this._popupRedirectResolver;y(t,this,"argument-error"),this.redirectPersistenceManager=await es.create(this,[er(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return(this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e)?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,n){if(this._deleted)return()=>{};let i="function"==typeof t?t:t.next.bind(t),s=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(y(a,this,"internal-error"),a.then(()=>{s||i(this.currentUser)}),"function"==typeof t){let i=e.addObserver(t,r,n);return()=>{s=!0,i()}}{let r=e.addObserver(t);return()=>{s=!0,r()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=em(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);let r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if((0,i.rh)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&function(e,...t){h.logLevel<=a.in.WARN&&h.warn(`Auth (${i.Jn}): ${e}`,...t)}(`Error while retrieving App Check token: ${e.error}`),e?.token}}function eE(e){return(0,s.m9)(e)}class eI{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,s.ne)(e=>this.observer=e)}get next(){return y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eb={async loadJS(){throw Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function eT(e){return`__${e}${Math.floor(1e6*Math.random())}`}class eS{constructor(){this.enterprise=new eC}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class eC{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}let eA="NO_RECAPTCHA";class ek{constructor(e){this.type="recaptcha-enterprise",this.auth=eE(e)}async verify(e="verify",t=!1){async function r(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,r)=>{M(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(n=>{if(void 0===n.recaptchaKey)r(Error("recaptcha Enterprise site key undefined"));else{let r=new x(n);return null==e.tenantId?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,t(r.siteKey)}}).catch(e=>{r(e)})})}function n(t,r,n){let i=window.grecaptcha;L(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{r(e)}).catch(()=>{r(eA)})}):n(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new eS().execute("siteKey",{action:"verify"}):new Promise((e,i)=>{r(this.auth).then(r=>{if(!t&&L(window.grecaptcha))n(r,e,i);else{var s;if("undefined"==typeof window){i(Error("RecaptchaVerifier is only supported in browser"));return}let t=eb.recaptchaEnterpriseScript;0!==t.length&&(t+=r),(s=t,eb.loadJS(s)).then(()=>{n(r,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function eR(e,t,r,n=!1,i=!1){let s;let a=new ek(e);if(i)s=eA;else try{s=await a.verify(r)}catch(e){s=await a.verify(r,!0)}let o={...t};if("mfaSmsEnrollment"===r||"mfaSmsSignIn"===r){if("phoneEnrollmentInfo"in o){let e=o.phoneEnrollmentInfo.phoneNumber,t=o.phoneEnrollmentInfo.recaptchaToken;Object.assign(o,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in o){let e=o.phoneSignInInfo.recaptchaToken;Object.assign(o,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return o}return n?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function eN(e,t,r,n,i){if("EMAIL_PASSWORD_PROVIDER"===i){if(!e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER"))return n(e,t).catch(async i=>{if("auth/missing-recaptcha-token"!==i.code)return Promise.reject(i);{console.log(`${r} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let i=await eR(e,t,r,"getOobCode"===r);return n(e,i)}});{let i=await eR(e,t,r,"getOobCode"===r);return n(e,i)}}if("PHONE_PROVIDER"!==i)return Promise.reject(i+" provider is not supported.");if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){let i=await eR(e,t,r);return n(e,i).catch(async i=>{if(e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${r} flow.`);let i=await eR(e,t,r,!1,!0);return n(e,i)}return Promise.reject(i)})}{let i=await eR(e,t,r,!1,!0);return n(e,i)}}async function eO(e){let t=eE(e),r=new x(await M(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}));null==t.tenantId?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()&&new ek(t).verify()}function eD(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function eP(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eL{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return v("not implemented")}_getIdTokenResponse(e){return v("not implemented")}_linkToIdToken(e,t){return v("not implemented")}_getReauthenticationResolver(e){return v("not implemented")}}async function ex(e,t){return k(e,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eM(e,t){return N(e,"POST","/v1/accounts:signInWithPassword",A(e,t))}async function eU(e,t){return k(e,"POST","/v1/accounts:sendOobCode",A(e,t))}async function eV(e,t){return eU(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eF(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",A(e,t))}async function eB(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",A(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ej extends eL{constructor(e,t,r,n=null){super("password",r),this._email=e,this._password=t,this._tenantId=n}static _fromEmailAndPassword(e,t){return new ej(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ej(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return eN(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",eM,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return eF(e,{email:this._email,oobCode:this._password});default:d(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return eN(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",ex,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return eB(e,{idToken:t,email:this._email,oobCode:this._password});default:d(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eq(e,t){return N(e,"POST","/v1/accounts:signInWithIdp",A(e,t))}class ez extends eL{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new ez(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):d("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let{providerId:t,signInMethod:r,...n}="string"==typeof e?JSON.parse(e):e;if(!t||!r)return null;let i=new ez(t,r);return i.idToken=n.idToken||void 0,i.accessToken=n.accessToken||void 0,i.secret=n.secret,i.nonce=n.nonce,i.pendingToken=n.pendingToken||null,i}_getIdTokenResponse(e){return eq(e,this.buildRequest())}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,eq(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,eq(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,s.xO)(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e$(e,t){return k(e,"POST","/v1/accounts:sendVerificationCode",A(e,t))}async function eK(e,t){return N(e,"POST","/v1/accounts:signInWithPhoneNumber",A(e,t))}async function eH(e,t){let r=await N(e,"POST","/v1/accounts:signInWithPhoneNumber",A(e,t));if(r.temporaryProof)throw P(e,"account-exists-with-different-credential",r);return r}let eG={USER_NOT_FOUND:"user-not-found"};async function eW(e,t){return N(e,"POST","/v1/accounts:signInWithPhoneNumber",A(e,{...t,operation:"REAUTH"}),eG)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eQ extends eL{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new eQ({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new eQ({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return eK(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return eH(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return eW(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:n}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:n}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:n,temporaryProof:i}=e;return r||t||n||i?new eQ({verificationId:t,verificationCode:r,phoneNumber:n,temporaryProof:i}):null}}class eX{constructor(e){let t=(0,s.zd)((0,s.pd)(e)),r=t.apiKey??null,n=t.oobCode??null,i=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);y(r&&n&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=n,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=function(e){let t=(0,s.zd)((0,s.pd)(e)).link,r=t?(0,s.zd)((0,s.pd)(t)).deep_link_id:null,n=(0,s.zd)((0,s.pd)(e)).deep_link_id;return(n?(0,s.zd)((0,s.pd)(n)).link:null)||n||r||t||e}(e);try{return new eX(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eY{constructor(){this.providerId=eY.PROVIDER_ID}static credential(e,t){return ej._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=eX.parseLink(t);return y(r,"argument-error"),ej._fromEmailAndCode(e,r.code,r.tenantId)}}eY.PROVIDER_ID="password",eY.EMAIL_PASSWORD_SIGN_IN_METHOD="password",eY.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eJ{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eZ extends eJ{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e0 extends eZ{constructor(){super("facebook.com")}static credential(e){return ez._fromParams({providerId:e0.PROVIDER_ID,signInMethod:e0.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return e0.credentialFromTaggedObject(e)}static credentialFromError(e){return e0.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return e0.credential(e.oauthAccessToken)}catch{return null}}}e0.FACEBOOK_SIGN_IN_METHOD="facebook.com",e0.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e1 extends eZ{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ez._fromParams({providerId:e1.PROVIDER_ID,signInMethod:e1.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return e1.credentialFromTaggedObject(e)}static credentialFromError(e){return e1.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return e1.credential(t,r)}catch{return null}}}e1.GOOGLE_SIGN_IN_METHOD="google.com",e1.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e2 extends eZ{constructor(){super("github.com")}static credential(e){return ez._fromParams({providerId:e2.PROVIDER_ID,signInMethod:e2.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return e2.credentialFromTaggedObject(e)}static credentialFromError(e){return e2.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return e2.credential(e.oauthAccessToken)}catch{return null}}}e2.GITHUB_SIGN_IN_METHOD="github.com",e2.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e4 extends eZ{constructor(){super("twitter.com")}static credential(e,t){return ez._fromParams({providerId:e4.PROVIDER_ID,signInMethod:e4.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return e4.credentialFromTaggedObject(e)}static credentialFromError(e){return e4.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return e4.credential(t,r)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e6(e,t){return N(e,"POST","/v1/accounts:signUp",A(e,t))}e4.TWITTER_SIGN_IN_METHOD="twitter.com",e4.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e9{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,n=!1){return new e9({user:await ee._fromIdTokenResponse(e,r,n),providerId:e5(r),_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){return await e._updateTokensIfNecessary(r,!0),new e9({user:e,providerId:e5(r),_tokenResponse:r,operationType:t})}}function e5(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e3 extends s.ZR{constructor(e,t,r,n){super(t.code,t.message),this.operationType=r,this.user=n,Object.setPrototypeOf(this,e3.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,n){return new e3(e,t,r,n)}}function e7(e,t,r,n){return("reauthenticate"===t?r._getReauthenticationResolver(e):r._getIdTokenResponse(e)).catch(r=>{if("auth/multi-factor-auth-required"===r.code)throw e3._fromErrorAndOperation(e,r,t,n);throw r})}async function e8(e,t,r=!1){let n=await $(e,t._linkToIdToken(e.auth,await e.getIdToken()),r);return e9._forOperation(e,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function te(e,t,r=!1){let{auth:n}=e;if((0,i.rh)(n.app))return Promise.reject(g(n));let s="reauthenticate";try{let i=await $(e,e7(n,s,t,e),r);y(i.idToken,n,"internal-error");let a=q(i.idToken);y(a,n,"internal-error");let{sub:o}=a;return y(e.uid===o,n,"user-mismatch"),e9._forOperation(e,s,i)}catch(e){throw e?.code==="auth/user-not-found"&&d(n,"user-mismatch"),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tt(e,t,r=!1){if((0,i.rh)(e.app))return Promise.reject(g(e));let n="signIn",s=await e7(e,n,t),a=await e9._fromIdTokenResponse(e,n,s);return r||await e._updateCurrentUser(a.user),a}async function tr(e,t){return tt(eE(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tn(e){let t=eE(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function ti(e,t,r){let n=eE(e),i={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};r&&(y(r.url?.length>0,n,"invalid-continue-uri"),y(void 0===r.dynamicLinkDomain||r.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),y(void 0===r.linkDomain||r.linkDomain.length>0,n,"invalid-hosting-link-domain"),i.continueUrl=r.url,i.dynamicLinkDomain=r.dynamicLinkDomain,i.linkDomain=r.linkDomain,i.canHandleCodeInApp=r.handleCodeInApp,r.iOS&&(y(r.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),i.iOSBundleId=r.iOS.bundleId),r.android&&(y(r.android.packageName.length>0,n,"missing-android-pkg-name"),i.androidInstallApp=r.android.installApp,i.androidMinimumVersionCode=r.android.minimumVersion,i.androidPackageName=r.android.packageName)),await eN(n,i,"getOobCode",eV,"EMAIL_PASSWORD_PROVIDER")}async function ts(e,t,r){if((0,i.rh)(e.app))return Promise.reject(g(e));let n=eE(e),s=eN(n,{returnSecureToken:!0,email:t,password:r,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",e6,"EMAIL_PASSWORD_PROVIDER"),a=await s.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tn(e),t}),o=await e9._fromIdTokenResponse(n,"signIn",a);return await n._updateCurrentUser(o.user),o}function ta(e,t,r){return(0,i.rh)(e.app)?Promise.reject(g(e)):tr((0,s.m9)(e),eY.credential(t,r)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tn(e),t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function to(e,t){return k(e,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tl(e,{displayName:t,photoURL:r}){if(void 0===t&&void 0===r)return;let n=(0,s.m9)(e),i=await n.getIdToken(),a=await $(n,to(n.auth,{idToken:i,displayName:t,photoUrl:r,returnSecureToken:!0}));n.displayName=a.displayName||null,n.photoURL=a.photoUrl||null;let o=n.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=n.displayName,o.photoURL=n.photoURL),await n._updateTokensIfNecessary(a)}function tu(e,t,r,n){return(0,s.m9)(e).onAuthStateChanged(t,r,n)}function th(e){return(0,s.m9)(e).signOut()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tc(e,t){return k(e,"POST","/v2/accounts/mfaEnrollment:start",A(e,t))}new WeakMap;let td="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(td,"1"),this.storage.removeItem(td),Promise.resolve(!0)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class tp extends tf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=eg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),n=this.localCache[t];r!==n&&e(t,n,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,r)=>{this.notifyListeners(e,r)});return}let r=e.key;t?this.detachListener():this.stopPolling();let n=()=>{let e=this.storage.getItem(r);(t||this.localCache[r]!==e)&&this.notifyListeners(r,e)},i=this.storage.getItem(r);(0,s.w1)()&&10===document.documentMode&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(n,10):n()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let e of Array.from(r))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}function tg(e){let t=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),r=RegExp(`${t}=([^;]+)`);return document.cookie.match(r)?.[1]??null}function tm(e){let t="http:"===window.location.protocol;return`${t?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}tp.type="LOCAL";class ty{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!!("boolean"!=typeof isSecureContext||isSecureContext)&&"undefined"!=typeof navigator&&"undefined"!=typeof document&&(navigator.cookieEnabled??!0)}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=tm(e);if(window.cookieStore){let e=await window.cookieStore.get(t);return e?.value}return tg(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let t=tm(e);document.cookie=`${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>void 0)}_addListener(e,t){if(!this._isAvailable())return;let r=tm(e);if(window.cookieStore){let e=e=>{let n=e.changed.find(e=>e.name===r);n&&t(n.value),e.deleted.find(e=>e.name===r)&&t(null)};return this.listenerUnsubscribes.set(t,()=>window.cookieStore.removeEventListener("change",e)),window.cookieStore.addEventListener("change",e)}let n=tg(r),i=setInterval(()=>{let e=tg(r);e!==n&&(t(e),n=e)},1e3);this.listenerUnsubscribes.set(t,()=>clearInterval(i))}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}}ty.type="COOKIE";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tv extends tf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}tv.type="SESSION";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let r=new tw(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let{eventId:t,eventType:r,data:n}=e.data,i=this.handlersMap[r];if(!i?.size)return;e.ports[0].postMessage({status:"ack",eventId:t,eventType:r});let s=Array.from(i).map(async t=>t(e.origin,n)),a=await Promise.all(s.map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(e){return{fulfilled:!1,reason:e}}}));e.ports[0].postMessage({status:"done",eventId:t,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t_(e="",t=10){let r="";for(let e=0;e<t;e++)r+=Math.floor(10*Math.random());return e+r}tw.receivers=[];/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let n,i;let s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw Error("connection_unavailable");return new Promise((a,o)=>{let l=t_("",20);s.port1.start();let u=setTimeout(()=>{o(Error("unsupported_event"))},r);i={messageChannel:s,onMessage(e){if(e.data.eventId===l)switch(e.data.status){case"ack":clearTimeout(u),n=setTimeout(()=>{o(Error("timeout"))},3e3);break;case"done":clearTimeout(n),a(e.data.response);break;default:clearTimeout(u),clearTimeout(n),o(Error("invalid_response"))}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tI(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tb(){return void 0!==tI().WorkerGlobalScope&&"function"==typeof tI().importScripts}async function tT(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tS="firebaseLocalStorageDb",tC="firebaseLocalStorage",tA="fbase_key";class tk{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function tR(e,t){return e.transaction([tC],t?"readwrite":"readonly").objectStore(tC)}function tN(){let e=indexedDB.open(tS,1);return new Promise((t,r)=>{e.addEventListener("error",()=>{r(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(tC,{keyPath:tA})}catch(e){r(e)}}),e.addEventListener("success",async()=>{let r=e.result;r.objectStoreNames.contains(tC)?t(r):(r.close(),await new tk(indexedDB.deleteDatabase(tS)).toPromise(),t(await tN()))})})}async function tO(e,t,r){return new tk(tR(e,!0).put({[tA]:t,value:r})).toPromise()}async function tD(e,t){let r=tR(e,!1).get(t),n=await new tk(r).toPromise();return void 0===n?null:n.value}function tP(e,t){return new tk(tR(e,!0).delete(t)).toPromise()}class tL{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await tN()),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tb()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=tw._getInstance(tb()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await tT(),!this.activeServiceWorker)return;this.sender=new tE(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&(navigator?.serviceWorker?.controller||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await tN();return await tO(e,td,"1"),await tP(e,td),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>tO(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>tD(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>tP(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>new tk(tR(e,!1).getAll()).toPromise());if(!e||0!==this.pendingWrites)return[];let t=[],r=new Set;if(0!==e.length)for(let{fbase_key:n,value:i}of e)r.add(n),JSON.stringify(this.localCache[n])!==JSON.stringify(i)&&(this.notifyListeners(n,i),t.push(n));for(let e of Object.keys(this.localCache))this.localCache[e]&&!r.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let e of Array.from(r))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tx(e,t){return k(e,"POST","/v2/accounts/mfaSignIn:start",A(e,t))}tL.type="LOCAL",eT("rcb"),new E(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tM="recaptcha";async function tU(e,t,r){if(!e._getRecaptchaConfig())try{await eO(e)}catch(e){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let n;if(n="string"==typeof t?{phoneNumber:t}:t,"session"in n){let t=n.session;if("phoneNumber"in n){y("enroll"===t.type,e,"internal-error");let i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:n.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===eA){y(r?.type===tM,e,"argument-error");let n=await tV(e,t,r);return tc(e,n)}return tc(e,t)},a=eN(e,i,"mfaSmsEnrollment",s,"PHONE_PROVIDER");return(await a.catch(e=>Promise.reject(e))).phoneSessionInfo.sessionInfo}{y("signin"===t.type,e,"internal-error");let i=n.multiFactorHint?.uid||n.multiFactorUid;y(i,e,"missing-multi-factor-info");let s={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},a=async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===eA){y(r?.type===tM,e,"argument-error");let n=await tV(e,t,r);return tx(e,n)}return tx(e,t)},o=eN(e,s,"mfaSmsSignIn",a,"PHONE_PROVIDER");return(await o.catch(e=>Promise.reject(e))).phoneResponseInfo.sessionInfo}}{let t={phoneNumber:n.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=async(e,t)=>{if(t.captchaResponse===eA){y(r?.type===tM,e,"argument-error");let n=await tV(e,t,r);return e$(e,n)}return e$(e,t)},s=eN(e,t,"sendVerificationCode",i,"PHONE_PROVIDER");return(await s.catch(e=>Promise.reject(e))).sessionInfo}}finally{r?._reset()}}async function tV(e,t,r){y(r.type===tM,e,"argument-error");let n=await r.verify();y("string"==typeof n,e,"argument-error");let i={...t};if("phoneEnrollmentInfo"in i){let e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,r=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:n,captchaResponse:t,clientType:r,recaptchaVersion:s}}),i}if(!("phoneSignInInfo"in i))return Object.assign(i,{recaptchaToken:n}),i;{let e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,r=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:n,captchaResponse:e,clientType:t,recaptchaVersion:r}}),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tF{constructor(e){this.providerId=tF.PROVIDER_ID,this.auth=eE(e)}verifyPhoneNumber(e,t){return tU(this.auth,e,(0,s.m9)(t))}static credential(e,t){return eQ._fromVerification(e,t)}static credentialFromResult(e){return tF.credentialFromTaggedObject(e)}static credentialFromError(e){return tF.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?eQ._fromTokenResponse(t,r):null}}tF.PROVIDER_ID="phone",tF.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tB extends eL{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return eq(e,this._buildIdpRequest())}_linkToIdToken(e,t){return eq(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return eq(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function tj(e){return tt(e.auth,new tB(e),e.bypassAuthState)}function tq(e){let{auth:t,user:r}=e;return y(r,t,"internal-error"),te(r,new tB(e),e.bypassAuthState)}async function tz(e){let{auth:t,user:r}=e;return y(r,t,"internal-error"),e8(r,new tB(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t${constructor(e,t,r,n,i=!1){this.auth=e,this.resolver=r,this.user=n,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:n,tenantId:i,error:s,type:a}=e;if(s){this.reject(s);return}let o={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:n||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(o))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tj;case"linkViaPopup":case"linkViaRedirect":return tz;case"reauthViaPopup":case"reauthViaRedirect":return tq;default:d(this.auth,"internal-error")}}resolve(e){var t,r;t=this.pendingPromise,r="Pending promise was never set",t||v(r),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){var t,r;t=this.pendingPromise,r="Pending promise was never set",t||v(r),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tK=new E(2e3,1e4);class tH extends t${constructor(e,t,r,n,i){super(e,t,n,i),this.provider=r,this.authWindow=null,this.pollId=null,tH.currentPopupAction&&tH.currentPopupAction.cancel(),tH.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return y(e,this.auth,"internal-error"),e}async onExecution(){var e,t;e=1===this.filter.length,t="Popup operations only handle one event",e||v(t);let r=t_();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],r),this.authWindow.associatedEvent=r,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(f(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(f(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,tH.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(f(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,tK.get())};e()}}tH.currentPopupAction=null;let tG=new Map;class tW extends t${constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=tG.get(this.auth._key());if(!e){try{let t=await tQ(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}tG.set(this.auth._key(),e)}return this.bypassAuthState||tG.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tQ(e,t){let r=ei("pendingRedirect",t.config.apiKey,t.name),n=er(e._redirectPersistence);if(!await n._isAvailable())return!1;let i=await n._get(r)==="true";return await n._remove(r),i}function tX(e,t){tG.set(e._key(),t)}async function tY(e,t,r=!1){if((0,i.rh)(e.app))return Promise.reject(g(e));let n=eE(e),s=t?er(t):(y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver),a=new tW(n,s,r),o=await a.execute();return o&&!r&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,t)),o}class tJ{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return t0(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!t0(e)){let r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(f(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(tZ(e))}saveEventToCache(e){this.cachedEventUids.add(tZ(e)),this.lastProcessedEventTime=Date.now()}}function tZ(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function t0({type:e,error:t}){return"unknown"===e&&t?.code==="auth/no-auth-event"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t1(e,t={}){return k(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t2=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,t4=/^https?/;async function t6(e){if(e.config.emulator)return;let{authorizedDomains:t}=await t1(e);for(let e of t)try{if(function(e){let t=w(),{protocol:r,hostname:n}=new URL(t);if(e.startsWith("chrome-extension://")){let i=new URL(e);return""===i.hostname&&""===n?"chrome-extension:"===r&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===r&&i.hostname===n}if(!t4.test(r))return!1;if(t2.test(e))return n===e;let i=e.replace(/\./g,"\\.");return RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}(e))return}catch{}d(e,"unauthorized-domain")}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t9=new E(3e4,6e4);function t5(){let e=tI().___jsl;if(e?.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}let t3=null,t7=new E(5e3,15e3),t8={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},re=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function rt(e){let t=await (t3=t3||new Promise((t,r)=>{function n(){t5(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{t5(),r(f(e,"network-request-failed"))},timeout:t9.get()})}if(tI().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else if(tI().gapi?.load)n();else{var i;let t=eT("iframefcb");return tI()[t]=()=>{gapi.load?n():r(f(e,"network-request-failed"))},(i=`${eb.gapiScript}?onload=${t}`,eb.loadJS(i)).catch(e=>r(e))}}).catch(e=>{throw t3=null,e})),r=tI().gapi;return y(r,e,"internal-error"),t.open({where:document.body,url:function(e){let t=e.config;y(t.authDomain,e,"auth-domain-config-required");let r=t.emulator?I(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,n={apiKey:t.apiKey,appName:e.name,v:i.Jn},a=re.get(e.config.apiHost);a&&(n.eid=a);let o=e._getFrameworks();return o.length&&(n.fw=o.join(",")),`${r}?${(0,s.xO)(n).slice(1)}`}(e),messageHandlersFilter:r.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:t8,dontclear:!0},t=>new Promise(async(r,n)=>{await t.restyle({setHideOnLeave:!1});let i=f(e,"network-request-failed"),s=tI().setTimeout(()=>{n(i)},t7.get());function a(){tI().clearTimeout(s),r(t)}t.ping(a).then(a,()=>{n(i)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class rn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}let ri=encodeURIComponent("fac");async function rs(e,t,r,n,a,o){y(e.config.authDomain,e,"auth-domain-config-required"),y(e.config.apiKey,e,"invalid-api-key");let l={apiKey:e.config.apiKey,appName:e.name,authType:r,redirectUrl:n,v:i.Jn,eventId:a};if(t instanceof eJ)for(let[r,n]of(t.setDefaultLanguage(e.languageCode),l.providerId=t.providerId||"",(0,s.xb)(t.getCustomParameters())||(l.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(o||{})))l[r]=n;if(t instanceof eZ){let e=t.getScopes().filter(e=>""!==e);e.length>0&&(l.scopes=e.join(","))}for(let t of(e.tenantId&&(l.tid=e.tenantId),Object.keys(l)))void 0===l[t]&&delete l[t];let u=await e._getAppCheckToken(),h=u?`#${ri}=${encodeURIComponent(u)}`:"";return`${function({config:e}){return e.emulator?I(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}(e)}?${(0,s.xO)(l).slice(1)}${h}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ra="webStorageSupport";class ro{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=tv,this._completeRedirectFn=tY,this._overrideRedirectResult=tX}async _openPopup(e,t,r,n){var i,a;i=this.eventManagers[e._key()]?.manager,a="_initialize() not called before _openPopup()",i||v(a);let o=await rs(e,t,r,w(),n);return function(e,t,r,n=500,i=600){let a=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString(),l="",u={...rr,width:n.toString(),height:i.toString(),top:a,left:o},h=(0,s.z$)().toLowerCase();r&&(l=eu(h)?"_blank":r),eo(h)&&(t=t||"http://localhost",u.scrollbars="yes");let c=Object.entries(u).reduce((e,[t,r])=>`${e}${t}=${r},`,"");if(function(e=(0,s.z$)()){return ep(e)&&!!window.navigator?.standalone}(h)&&"_self"!==l)return function(e,t){let r=document.createElement("a");r.href=e,r.target=t;let n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),r.dispatchEvent(n)}(t||"",l),new rn(null);let d=window.open(t||"",l,c);y(d,e,"popup-blocked");try{d.focus()}catch(e){}return new rn(d)}(e,o,t_())}async _openRedirect(e,t,r,n){var i;return await this._originValidation(e),i=await rs(e,t,r,w(),n),tI().location.href=i,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){var r;let{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(r="If manager is not set, promise should be",n||v(r),n)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await rt(e),r=new tJ(e);return t.register("authEvent",t=>(y(t?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(t.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ra,{type:ra},r=>{let n=r?.[0]?.[ra];void 0!==n&&t(!!n),d(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=t6(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return eg()||el()||ep()}}class rl{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return v("unexpected MultiFactorSessionType")}}}class ru extends rl{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new ru(e)}_finalizeEnroll(e,t,r){return k(e,"POST","/v2/accounts/mfaEnrollment:finalize",A(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}_finalizeSignIn(e,t){return k(e,"POST","/v2/accounts/mfaSignIn:finalize",A(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}}class rh{constructor(){}static assertion(e){return ru._fromCredential(e)}}rh.FACTOR_ID="phone";class rc{static assertionForEnrollment(e,t){return rd._fromSecret(e,t)}static assertionForSignIn(e,t){return rd._fromEnrollmentId(e,t)}static async generateSecret(e){var t;y(void 0!==e.user?.auth,"internal-error");let r=await k(t=e.user.auth,"POST","/v2/accounts/mfaEnrollment:start",A(t,{idToken:e.credential,totpEnrollmentInfo:{}}));return rf._fromStartTotpMfaEnrollmentResponse(r,e.user.auth)}}rc.FACTOR_ID="totp";class rd extends rl{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new rd(t,void 0,e)}static _fromEnrollmentId(e,t){return new rd(t,e)}async _finalizeEnroll(e,t,r){return y(void 0!==this.secret,e,"argument-error"),k(e,"POST","/v2/accounts/mfaEnrollment:finalize",A(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)}))}async _finalizeSignIn(e,t){y(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");let r={verificationCode:this.otp};return k(e,"POST","/v2/accounts/mfaSignIn:finalize",A(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r}))}}class rf{constructor(e,t,r,n,i,s,a){this.sessionInfo=s,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=n,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new rf(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(rp(e)||rp(t))&&(r=!0),r&&(rp(e)&&(e=this.auth.currentUser?.email||"unknownuser"),rp(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function rp(e){return void 0===e||e?.length===0}var rg="@firebase/auth",rm="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return(this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser)?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}let rv=(0,s.Pz)("authIdTokenMaxAge")||300,rw=null,r_=e=>async t=>{let r=t&&await t.getIdTokenResult(),n=r&&(new Date().getTime()-Date.parse(r.issuedAtTime))/1e3;if(n&&n>rv)return;let i=r?.token;rw!==i&&(rw=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function rE(e=(0,i.Mq)()){let t=(0,i.qX)(e,"auth");if(t.isInitialized())return t.getImmediate();let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let r=(0,i.qX)(e,"auth");if(r.isInitialized()){let e=r.getImmediate(),n=r.getOptions();if((0,s.vZ)(n,t??{}))return e;d(e,"already-initialized")}return r.initialize({options:t})}(e,{popupRedirectResolver:ro,persistence:[tL,tp,tv]}),n=(0,s.Pz)("authTokenSyncURL");if(n&&"boolean"==typeof isSecureContext&&isSecureContext){let e=new URL(n,location.origin);if(location.origin===e.origin){var a,o;let t=r_(e.toString());a=()=>t(r.currentUser),(0,s.m9)(r).beforeAuthStateChanged(t,a),o=e=>t(e),(0,s.m9)(r).onIdTokenChanged(o,void 0,void 0)}}let l=(0,s.q4)("auth");return l&&function(e,t,r){let n=eE(e);y(/^https?:\/\//.test(t),n,"invalid-emulator-scheme");let i=eD(t),{host:a,port:o}=function(e){let t=eD(e),r=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!r)return{host:"",port:null};let n=r[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){let e=i[1];return{host:e,port:eP(n.substr(e.length+1))}}{let[e,t]=n.split(":");return{host:e,port:eP(t)}}}(t),l=null===o?"":`:${o}`,u={url:`${i}//${a}${l}/`},h=Object.freeze({host:a,port:o,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:!1})});if(!n._canInitEmulator){y(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),y((0,s.vZ)(u,n.config.emulator)&&(0,s.vZ)(h,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=u,n.emulatorConfig=h,n.settings.appVerificationDisabledForTesting=!0,(0,s.Xx)(a)?((0,s.Uo)(`${i}//${a}${l}`),(0,s.dp)("Auth",!0)):function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}(r,`http://${l}`),r}eb={loadJS:e=>new Promise((t,r)=>{let n=document.createElement("script");n.setAttribute("src",e),n.onload=t,n.onerror=e=>{let t=f("internal-error");t.customData=e,r(t)},n.type="text/javascript",n.charset="UTF-8",(document.getElementsByTagName("head")?.[0]??document).appendChild(n)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},n="Browser",(0,i.Xd)(new o.wA("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=r.options;y(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l=new e_(r,i,s,{apiKey:a,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:em(n)});return function(e,t){let r=t?.persistence||[],n=(Array.isArray(r)?r:[r]).map(er);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(n,t?.popupRedirectResolver)}(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),(0,i.Xd)(new o.wA("auth-internal",e=>new ry(eE(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,i.KN)(rg,rm,/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(n)),(0,i.KN)(rg,rm,"esm2020")},9724:function(e,t,r){"use strict";r.d(t,{Timestamp:function(){return eg},ET:function(){return ad},hJ:function(){return sm},oe:function(){return ac},JU:function(){return sy},Ix:function(){return sT},QT:function(){return ao},PL:function(){return au},ad:function(){return sI},b9:function(){return s3},Xo:function(){return s9},IO:function(){return s0},Bt:function(){return am},pl:function(){return ah},ar:function(){return s2},qs:function(){return ay}});var n,i,s,a,o,l,u,h,c,d,f,p,g,m,y=r(6771),v=r(75),w=r(4645),_=r(9711),E="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},I={};(function(){function e(){this.blockSize=-1,this.blockSize=64,this.g=[,,,,],this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function t(e,t,r){r||(r=0);let n=Array(16);if("string"==typeof t)for(var i=0;i<16;++i)n[i]=t.charCodeAt(r++)|t.charCodeAt(r++)<<8|t.charCodeAt(r++)<<16|t.charCodeAt(r++)<<24;else for(i=0;i<16;++i)n[i]=t[r++]|t[r++]<<8|t[r++]<<16|t[r++]<<24;t=e.g[0],r=e.g[1],i=e.g[2];let s=e.g[3],a;a=t+(s^r&(i^s))+n[0]+3614090360&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[1]+3905402710&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[2]+606105819&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[3]+3250441966&4294967295,a=t+(s^(r=i+(a<<22&4294967295|a>>>10))&(i^s))+n[4]+4118548399&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[5]+1200080426&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[6]+2821735955&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[7]+4249261313&4294967295,a=t+(s^(r=i+(a<<22&4294967295|a>>>10))&(i^s))+n[8]+1770035416&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[9]+2336552879&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[10]+4294925233&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[11]+2304563134&4294967295,a=t+(s^(r=i+(a<<22&4294967295|a>>>10))&(i^s))+n[12]+1804603682&4294967295,a=s+(i^(t=r+(a<<7&4294967295|a>>>25))&(r^i))+n[13]+4254626195&4294967295,a=i+(r^(s=t+(a<<12&4294967295|a>>>20))&(t^r))+n[14]+2792965006&4294967295,a=r+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+n[15]+1236535329&4294967295,r=i+(a<<22&4294967295|a>>>10),a=t+(i^s&(r^i))+n[1]+4129170786&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[6]+3225465664&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[11]+643717713&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[0]+3921069994&4294967295,r=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(r^i))+n[5]+3593408605&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[10]+38016083&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[15]+3634488961&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[4]+3889429448&4294967295,r=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(r^i))+n[9]+568446438&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[14]+3275163606&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[3]+4107603335&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[8]+1163531501&4294967295,r=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(r^i))+n[13]+2850285829&4294967295,t=r+(a<<5&4294967295|a>>>27),a=s+(r^i&(t^r))+n[2]+4243563512&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^r&(s^t))+n[7]+1735328473&4294967295,i=s+(a<<14&4294967295|a>>>18),a=r+(s^t&(i^s))+n[12]+2368359562&4294967295,a=t+((r=i+(a<<20&4294967295|a>>>12))^i^s)+n[5]+4294588738&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[8]+2272392833&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[11]+1839030562&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[14]+4259657740&4294967295,a=t+((r=i+(a<<23&4294967295|a>>>9))^i^s)+n[1]+2763975236&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[4]+1272893353&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[7]+4139469664&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[10]+3200236656&4294967295,a=t+((r=i+(a<<23&4294967295|a>>>9))^i^s)+n[13]+681279174&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[0]+3936430074&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[3]+3572445317&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[6]+76029189&4294967295,a=t+((r=i+(a<<23&4294967295|a>>>9))^i^s)+n[9]+3654602809&4294967295,a=s+((t=r+(a<<4&4294967295|a>>>28))^r^i)+n[12]+3873151461&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^r)+n[15]+530742520&4294967295,a=r+((i=s+(a<<16&4294967295|a>>>16))^s^t)+n[2]+3299628645&4294967295,r=i+(a<<23&4294967295|a>>>9),a=t+(i^(r|~s))+n[0]+4096336452&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[7]+1126891415&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[14]+2878612391&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[5]+4237533241&4294967295,r=i+(a<<21&4294967295|a>>>11),a=t+(i^(r|~s))+n[12]+1700485571&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[3]+2399980690&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[10]+4293915773&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[1]+2240044497&4294967295,r=i+(a<<21&4294967295|a>>>11),a=t+(i^(r|~s))+n[8]+1873313359&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[15]+4264355552&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[6]+2734768916&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[13]+1309151649&4294967295,r=i+(a<<21&4294967295|a>>>11),a=t+(i^(r|~s))+n[4]+4149444226&4294967295,t=r+(a<<6&4294967295|a>>>26),a=s+(r^(t|~i))+n[11]+3174756917&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~r))+n[2]+718787259&4294967295,i=s+(a<<15&4294967295|a>>>17),a=r+(s^(i|~t))+n[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(a<<21&4294967295|a>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+s&4294967295}function r(e,t){this.h=t;let r=[],n=!0;for(let i=e.length-1;i>=0;i--){let s=0|e[i];n&&s==t||(r[i]=s,n=!1)}this.g=r}!function(e,t){function r(){}r.prototype=t.prototype,e.F=t.prototype,e.prototype=new r,e.prototype.constructor=e,e.D=function(e,r,n){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[r].apply(e,i)}}(e,function(){this.blockSize=-1}),e.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},e.prototype.v=function(e,r){void 0===r&&(r=e.length);let n=r-this.blockSize,i=this.C,s=this.h,a=0;for(;a<r;){if(0==s)for(;a<=n;)t(this,e,a),a+=this.blockSize;if("string"==typeof e){for(;a<r;)if(i[s++]=e.charCodeAt(a++),s==this.blockSize){t(this,i),s=0;break}}else for(;a<r;)if(i[s++]=e[a++],s==this.blockSize){t(this,i),s=0;break}}this.h=s,this.o+=r},e.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var r=e.length-8;r<e.length;++r)e[r]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,r=0;r<4;++r)for(let n=0;n<32;n+=8)e[t++]=this.g[r]>>>n&255;return e};var s,a={};function o(e){var t;return -128<=e&&e<128?(t=function(e){return new r([0|e],e<0?-1:0)},Object.prototype.hasOwnProperty.call(a,e)?a[e]:a[e]=t(e)):new r([0|e],e<0?-1:0)}function l(e){if(isNaN(e)||!isFinite(e))return u;if(e<0)return p(l(-e));let t=[],n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new r(t,0)}var u=o(0),h=o(1),c=o(16777216);function d(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function f(e){return -1==e.h}function p(e){let t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new r(n,~e.h).add(h)}function g(e,t){return e.add(p(t))}function m(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function y(e,t){this.g=e,this.h=t}function v(e,t){if(d(t))throw Error("division by zero");if(d(e))return new y(u,u);if(f(e))return t=v(p(e),t),new y(p(t.g),p(t.h));if(f(t))return t=v(e,p(t)),new y(p(t.g),t.h);if(e.g.length>30){if(f(e)||f(t))throw Error("slowDivide_ only works with positive integers.");for(var r=h,n=t;0>=n.l(e);)r=w(r),n=w(n);var i=_(r,1),s=_(n,1);for(n=_(n,2),r=_(r,2);!d(n);){var a=s.add(n);0>=a.l(e)&&(i=i.add(r),s=a),n=_(n,1),r=_(r,1)}return t=g(e,i.j(t)),new y(i,t)}for(i=u;e.l(t)>=0;){for(n=(n=Math.ceil(Math.log(r=Math.max(1,Math.floor(e.m()/t.m())))/Math.LN2))<=48?1:Math.pow(2,n-48),a=(s=l(r)).j(t);f(a)||a.l(e)>0;)r-=n,a=(s=l(r)).j(t);d(s)&&(s=h),i=i.add(s),e=g(e,a)}return new y(i,e)}function w(e){let t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new r(n,e.h)}function _(e,t){let n=t>>5;t%=32;let i=e.g.length-n,s=[];for(let r=0;r<i;r++)s[r]=t>0?e.i(r+n)>>>t|e.i(r+n+1)<<32-t:e.i(r+n);return new r(s,e.h)}(s=r.prototype).m=function(){if(f(this))return-p(this).m();let e=0,t=1;for(let r=0;r<this.g.length;r++){let n=this.i(r);e+=(n>=0?n:4294967296+n)*t,t*=4294967296}return e},s.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(d(this))return"0";if(f(this))return"-"+p(this).toString(e);let t=l(Math.pow(e,6));var r=this;let n="";for(;;){let i=v(r,t).g,s=(((r=g(r,i.j(t))).g.length>0?r.g[0]:r.h)>>>0).toString(e);if(d(r=i))return s+n;for(;s.length<6;)s="0"+s;n=s+n}},s.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},s.l=function(e){return f(e=g(this,e))?-1:d(e)?0:1},s.abs=function(){return f(this)?p(this):this},s.add=function(e){let t=Math.max(this.g.length,e.g.length),n=[],i=0;for(let r=0;r<=t;r++){let t=i+(65535&this.i(r))+(65535&e.i(r)),s=(t>>>16)+(this.i(r)>>>16)+(e.i(r)>>>16);i=s>>>16,t&=65535,s&=65535,n[r]=s<<16|t}return new r(n,-2147483648&n[n.length-1]?-1:0)},s.j=function(e){if(d(this)||d(e))return u;if(f(this))return f(e)?p(this).j(p(e)):p(p(this).j(e));if(f(e))return p(this.j(p(e)));if(0>this.l(c)&&0>e.l(c))return l(this.m()*e.m());let t=this.g.length+e.g.length,n=[];for(var i=0;i<2*t;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(let t=0;t<e.g.length;t++){let r=this.i(i)>>>16,s=65535&this.i(i),a=e.i(t)>>>16,o=65535&e.i(t);n[2*i+2*t]+=s*o,m(n,2*i+2*t),n[2*i+2*t+1]+=r*o,m(n,2*i+2*t+1),n[2*i+2*t+1]+=s*a,m(n,2*i+2*t+1),n[2*i+2*t+2]+=r*a,m(n,2*i+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new r(n,0)},s.B=function(e){return v(this,e).h},s.and=function(e){let t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new r(n,this.h&e.h)},s.or=function(e){let t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new r(n,this.h|e.h)},s.xor=function(e){let t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new r(n,this.h^e.h)},e.prototype.digest=e.prototype.A,e.prototype.reset=e.prototype.u,e.prototype.update=e.prototype.v,i=I.Md5=e,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=l,r.fromString=function e(t,r){if(0==t.length)throw Error("number format error: empty string");if((r=r||10)<2||36<r)throw Error("radix out of range: "+r);if("-"==t.charAt(0))return p(e(t.substring(1),r));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');let n=l(Math.pow(r,8)),i=u;for(let e=0;e<t.length;e+=8){var s=Math.min(8,t.length-e);let a=parseInt(t.substring(e,e+s),r);s<8?(s=l(Math.pow(r,s)),i=i.j(s).add(l(a))):i=(i=i.j(n)).add(l(a))}return i},n=I.Integer=r}).apply(void 0!==E?E:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var b="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},T={};(function(){var e,t,r=Object.defineProperty,n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof b&&b];for(var t=0;t<e.length;++t){var r=e[t];if(r&&r.Math==Math)return r}throw Error("Cannot find global object")}(this);function i(e,t){if(t)e:{var i=n;e=e.split(".");for(var s=0;s<e.length-1;s++){var a=e[s];if(!(a in i))break e;i=i[a]}(t=t(s=i[e=e[e.length-1]]))!=s&&null!=t&&r(i,e,{configurable:!0,writable:!0,value:t})}}i("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(e){return e||function(e){var t,r=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.push([t,e[t]]);return r}});var f=f||{},p=this||self;function g(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function m(e,t,r){return e.call.apply(e.bind,arguments)}function y(e,t,r){return(y=m).apply(null,arguments)}function v(e,t){var r=Array.prototype.slice.call(arguments,1);return function(){var t=r.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function w(e,t){function r(){}r.prototype=t.prototype,e.Z=t.prototype,e.prototype=new r,e.prototype.constructor=e,e.Ob=function(e,r,n){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[r].apply(e,i)}}var _="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function E(e){let t=e.length;if(t>0){let r=Array(t);for(let n=0;n<t;n++)r[n]=e[n];return r}return[]}function I(e,t){for(let t=1;t<arguments.length;t++){let n=arguments[t];var r=typeof n;if("array"==(r="object"!=r?r:n?Array.isArray(n)?"array":r:"null")||"object"==r&&"number"==typeof n.length){r=e.length||0;let t=n.length||0;e.length=r+t;for(let i=0;i<t;i++)e[r+i]=n[i]}else e.push(n)}}class S{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}class C{constructor(){this.h=this.g=null}add(e,t){let r=A.get();r.set(e,t),this.h?this.h.next=r:this.g=r,this.h=r}}var A=new S(()=>new k,e=>e.reset());class k{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let R,N=!1,O=new C,D=()=>{let e=Promise.resolve(void 0);R=()=>{e.then(P)}};function P(){let e;for(var t;e=null,O.g&&(e=O.g,O.g=O.g.next,O.g||(O.h=null),e.next=null),t=e;){try{t.h.call(t.g)}catch(e){!function(e){p.setTimeout(()=>{throw e},0)}(e)}A.j(t),A.h<100&&(A.h++,t.next=A.g,A.g=t)}N=!1}function L(){this.u=this.u,this.C=this.C}function x(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}L.prototype.u=!1,L.prototype.dispose=function(){this.u||(this.u=!0,this.N())},L.prototype[Symbol.dispose]=function(){this.dispose()},L.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},x.prototype.h=function(){this.defaultPrevented=!0};var M=function(){if(!p.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{let e=()=>{};p.addEventListener("test",e,t),p.removeEventListener("test",e,t)}catch(e){}return e}();function U(e){return/^[\s\xa0]*$/.test(e)}function V(e,t){x.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}w(V,x),V.prototype.init=function(e,t){let r=this.type=e.type,n=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==r?t=e.fromElement:"mouseout"==r&&(t=e.toElement)),this.relatedTarget=t,n?(this.clientX=void 0!==n.clientX?n.clientX:n.pageX,this.clientY=void 0!==n.clientY?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&V.Z.h.call(this)},V.prototype.h=function(){V.Z.h.call(this);let e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var F="closure_listenable_"+(1e6*Math.random()|0),B=0;function j(e,t,r,n,i){this.listener=e,this.proxy=null,this.src=t,this.type=r,this.capture=!!n,this.ha=i,this.key=++B,this.da=this.fa=!1}function q(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function z(e,t,r){for(let n in e)t.call(r,e[n],n,e)}function $(e){let t={};for(let r in e)t[r]=e[r];return t}let K="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function H(e,t){let r,n;for(let t=1;t<arguments.length;t++){for(r in n=arguments[t])e[r]=n[r];for(let t=0;t<K.length;t++)r=K[t],Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}}function G(e){this.src=e,this.g={},this.h=0}function W(e,t){let r=t.type;if(r in e.g){var n,i=e.g[r],s=Array.prototype.indexOf.call(i,t,void 0);(n=s>=0)&&Array.prototype.splice.call(i,s,1),n&&(q(t),0==e.g[r].length&&(delete e.g[r],e.h--))}}function Q(e,t,r,n){for(let i=0;i<e.length;++i){let s=e[i];if(!s.da&&s.listener==t&&!!r==s.capture&&s.ha==n)return i}return -1}G.prototype.add=function(e,t,r,n,i){let s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);let a=Q(e,t,n,i);return a>-1?(t=e[a],r||(t.fa=!1)):((t=new j(t,this.src,s,!!n,i)).fa=r,e.push(t)),t};var X="closure_lm_"+(1e6*Math.random()|0),Y={};function J(e,t,r,n,i,s){if(!t)throw Error("Invalid event type");let a=g(i)?!!i.capture:!!i,o=er(e);if(o||(e[X]=o=new G(e)),(r=o.add(t,r,n,a,s)).proxy)return r;if(n=function e(t){return et.call(e.src,e.listener,t)},r.proxy=n,n.src=e,n.listener=r,e.addEventListener)M||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),n,i);else if(e.attachEvent)e.attachEvent(ee(t.toString()),n);else if(e.addListener&&e.removeListener)e.addListener(n);else throw Error("addEventListener and attachEvent are unavailable.");return r}function Z(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[F])W(t.i,e);else{var r=e.type,n=e.proxy;t.removeEventListener?t.removeEventListener(r,n,e.capture):t.detachEvent?t.detachEvent(ee(r),n):t.addListener&&t.removeListener&&t.removeListener(n),(r=er(t))?(W(r,e),0==r.h&&(r.src=null,t[X]=null)):q(e)}}}function ee(e){return e in Y?Y[e]:Y[e]="on"+e}function et(e,t){if(e.da)e=!0;else{t=new V(t,this);let r=e.listener,n=e.ha||e.src;e.fa&&Z(e),e=r.call(n,t)}return e}function er(e){return(e=e[X])instanceof G?e:null}var en="__closure_events_fn_"+(1e9*Math.random()>>>0);function ei(e){return"function"==typeof e?e:(e[en]||(e[en]=function(t){return e.handleEvent(t)}),e[en])}function es(){L.call(this),this.i=new G(this),this.M=this,this.G=null}function ea(e,t){let r,n;var i,s=e.G;if(s)for(i=[];s;s=s.G)i.push(s);if(e=e.M,s=t.type||t,"string"==typeof t)t=new x(t,e);else if(t instanceof x)t.target=t.target||e;else{var a=t;H(t=new x(s,e),a)}if(a=!0,i)for(n=i.length-1;n>=0;n--)a=eo(r=t.g=i[n],s,!0,t)&&a;if(a=eo(r=t.g=e,s,!0,t)&&a,a=eo(r,s,!1,t)&&a,i)for(n=0;n<i.length;n++)a=eo(r=t.g=i[n],s,!1,t)&&a}function eo(e,t,r,n){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let i=!0;for(let s=0;s<t.length;++s){let a=t[s];if(a&&!a.da&&a.capture==r){let t=a.listener,r=a.ha||a.src;a.fa&&W(e.i,a),i=!1!==t.call(r,n)&&i}}return i&&!n.defaultPrevented}w(es,L),es.prototype[F]=!0,es.prototype.removeEventListener=function(e,t,r,n){!function e(t,r,n,i,s){if(Array.isArray(r))for(var a=0;a<r.length;a++)e(t,r[a],n,i,s);else(i=g(i)?!!i.capture:!!i,n=ei(n),t&&t[F])?(t=t.i,(a=String(r).toString())in t.g&&(n=Q(r=t.g[a],n,i,s))>-1&&(q(r[n]),Array.prototype.splice.call(r,n,1),0==r.length&&(delete t.g[a],t.h--))):t&&(t=er(t))&&(r=t.g[r.toString()],t=-1,r&&(t=Q(r,n,i,s)),(n=t>-1?r[t]:null)&&Z(n))}(this,e,t,r,n)},es.prototype.N=function(){if(es.Z.N.call(this),this.i){var e=this.i;for(let t in e.g){let r=e.g[t];for(let e=0;e<r.length;e++)q(r[e]);delete e.g[t],e.h--}}this.G=null},es.prototype.J=function(e,t,r,n){return this.i.add(String(e),t,!1,r,n)},es.prototype.K=function(e,t,r,n){return this.i.add(String(e),t,!0,r,n)};class el extends L{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:function e(t){t.g=function(e,t){if("function"!=typeof e){if(e&&"function"==typeof e.handleEvent)e=y(e.handleEvent,e);else throw Error("Invalid listener argument")}return Number(t)>2147483647?-1:p.setTimeout(e,t||0)}(()=>{t.g=null,t.i&&(t.i=!1,e(t))},t.l);let r=t.h;t.h=null,t.m.apply(null,r)}(this)}N(){super.N(),this.g&&(p.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function eu(e){L.call(this),this.h=e,this.g={}}w(eu,L);var eh=[];function ec(e){z(e.g,function(e,t){this.g.hasOwnProperty(t)&&Z(e)},e),e.g={}}eu.prototype.N=function(){eu.Z.N.call(this),ec(this)},eu.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ed=p.JSON.stringify,ef=p.JSON.parse,ep=class{stringify(e){return p.JSON.stringify(e,void 0)}parse(e){return p.JSON.parse(e,void 0)}};function eg(){}function em(){}var ey={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ev(){x.call(this,"d")}function ew(){x.call(this,"c")}w(ev,x),w(ew,x);var e_={},eE=null;function eI(){return eE=eE||new es}function eb(e){x.call(this,e_.Ia,e)}function eT(e){let t=eI();ea(t,new eb(t))}function eS(e,t){x.call(this,e_.STAT_EVENT,e),this.stat=t}function eC(e){let t=eI();ea(t,new eS(t,e))}function eA(e,t){x.call(this,e_.Ja,e),this.size=t}function ek(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return p.setTimeout(function(){e()},t)}function eR(){this.g=!0}function eN(e,t,r,n){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{let s=JSON.parse(t);if(s){for(e=0;e<s.length;e++)if(Array.isArray(s[e])){var r=s[e];if(!(r.length<2)){var n=r[1];if(Array.isArray(n)&&!(n.length<1)){var i=n[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(let e=1;e<n.length;e++)n[e]=""}}}}return ed(s)}catch(e){return t}}(e,r)+(n?" "+n:"")})}e_.Ia="serverreachability",w(eb,x),e_.STAT_EVENT="statevent",w(eS,x),e_.Ja="timingevent",w(eA,x),eR.prototype.ua=function(){this.g=!1},eR.prototype.info=function(){};var eO={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},eD={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function eP(){}function eL(e){return encodeURIComponent(String(e))}function ex(e,t,r,n){this.j=e,this.i=t,this.l=r,this.S=n||1,this.V=new eu(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new eM}function eM(){this.i=null,this.g="",this.h=!1}w(eP,eg),eP.prototype.g=function(){return new XMLHttpRequest},e=new eP;var eU={},eV={};function eF(e,t,r){e.M=1,e.A=e8(e6(t)),e.u=r,e.R=!0,eB(e,null)}function eB(e,t){e.F=Date.now(),eq(e),e.B=e6(e.A);var r=e.B,n=e.S;Array.isArray(n)||(n=[String(n)]),tf(r.i,"t",n),e.C=0,r=e.j.L,e.h=new eM,e.g=tZ(e.j,r?t:null,!e.u),e.P>0&&(e.O=new el(y(e.Y,e,e.g),e.P)),t=e.V,r=e.g,n=e.ba;var i="readystatechange";Array.isArray(i)||(i&&(eh[0]=i.toString()),i=eh);for(let e=0;e<i.length;e++){let s=function e(t,r,n,i,s){if(i&&i.once)return function e(t,r,n,i,s){if(Array.isArray(r)){for(let a=0;a<r.length;a++)e(t,r[a],n,i,s);return null}return n=ei(n),t&&t[F]?t.K(r,n,g(i)?!!i.capture:!!i,s):J(t,r,n,!0,i,s)}(t,r,n,i,s);if(Array.isArray(r)){for(let a=0;a<r.length;a++)e(t,r[a],n,i,s);return null}return n=ei(n),t&&t[F]?t.J(r,n,g(i)?!!i.capture:!!i,s):J(t,r,n,!1,i,s)}(r,i[e],n||t.handleEvent,!1,t.h||t);if(!s)break;t.g[s.key]=s}t=e.J?$(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),eT(),function(e,t,r,n,i,s){e.info(function(){if(e.g){if(s){var a="",o=s.split("&");for(let e=0;e<o.length;e++){var l=o[e].split("=");if(l.length>1){let e=l[0];l=l[1];let t=e.split("_");a=t.length>=2&&"type"==t[1]?a+(e+"=")+l+"&":a+(e+"=redacted&")}}}else a=null}else a=s;return"XMLHTTP REQ ("+n+") [attempt "+i+"]: "+t+"\n"+r+"\n"+a})}(e.i,e.v,e.B,e.l,e.S,e.u)}function ej(e){return!!e.g&&"GET"==e.v&&2!=e.M&&e.j.Aa}function eq(e){e.T=Date.now()+e.H,ez(e,e.H)}function ez(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=ek(y(e.aa,e),t)}function e$(e){e.D&&(p.clearTimeout(e.D),e.D=null)}function eK(e){0==e.j.I||e.K||tW(e.j,e)}function eH(e){e$(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,ec(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function eG(e,t){try{var r=e.j;if(0!=r.I&&(r.g==e||eJ(r.h,e))){if(!e.L&&eJ(r.h,e)&&3==r.I){try{var n=r.Ba.g.parse(t)}catch(e){n=null}if(Array.isArray(n)&&3==n.length){var i=n;if(0==i[0]){e:if(!r.v){if(r.g){if(r.g.F+3e3<e.F)tG(r),tU(r);else break e}t$(r),eC(18)}}else r.xa=i[1],0<r.xa-r.K&&i[2]<37500&&r.F&&0==r.A&&!r.C&&(r.C=ek(y(r.Va,r),6e3));1>=eY(r.h)&&r.ta&&(r.ta=void 0)}else tX(r,11)}else if((e.L||r.g==e)&&tG(r),!U(t))for(i=r.Ba.g.parse(t),t=0;t<i.length;t++){let o=i[t],l=o[0];if(!(l<=r.K)){if(r.K=l,o=o[1],2==r.I){if("c"==o[0]){r.M=o[1],r.ba=o[2];let t=o[3];null!=t&&(r.ka=t,r.j.info("VER="+r.ka));let i=o[4];null!=i&&(r.za=i,r.j.info("SVER="+r.za));let l=o[5];null!=l&&"number"==typeof l&&l>0&&(n=1.5*l,r.O=n,r.j.info("backChannelRequestTimeoutMs_="+n)),n=r;let u=e.g;if(u){let e=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=n.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(eZ(s,s.h),s.h=null))}if(n.G){let e=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(n.wa=e,e7(n.J,n.G,e))}}if(r.I=3,r.l&&r.l.ra(),r.aa&&(r.T=Date.now()-e.F,r.j.info("Handshake RTT: "+r.T+"ms")),(n=r).na=tJ(n,n.L?n.ba:null,n.W),e.L){e0(n.h,e);var a=n.O;a&&(e.H=a),e.D&&(e$(e),eq(e)),n.g=e}else tz(n);r.i.length>0&&tF(r)}else"stop"!=o[0]&&"close"!=o[0]||tX(r,7)}else 3==r.I&&("stop"==o[0]||"close"==o[0]?"stop"==o[0]?tX(r,7):tM(r):"noop"!=o[0]&&r.l&&r.l.qa(o),r.A=0)}}}eT(4)}catch(e){}}ex.prototype.ba=function(e){e=e.target;let t=this.O;t&&3==tD(e)?t.j():this.Y(e)},ex.prototype.Y=function(e){try{if(e==this.g)e:{let o=tD(this.g),l=this.g.ya(),u=this.g.ca();if(!(o<3)&&(3!=o||this.g&&(this.h.h||this.g.la()||tP(this.g)))){this.K||4!=o||7==l||(8==l||u<=0?eT(3):eT(2)),e$(this);var t=this.g.ca();this.X=t;var r=function(e){if(!ej(e))return e.g.la();let t=tP(e.g);if(""===t)return"";let r="",n=t.length,i=4==tD(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return eH(e),eK(e),"";e.h.i=new p.TextDecoder}for(let s=0;s<n;s++)e.h.h=!0,r+=e.h.i.decode(t[s],{stream:!(i&&s==n-1)});return t.length=0,e.h.g+=r,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,r,n,i,s,a){e.info(function(){return"XMLHTTP RESP ("+n+") [ attempt "+i+"]: "+t+"\n"+r+"\n"+s+" "+a})}(this.i,this.v,this.B,this.l,this.S,o,t),this.o){if(this.U&&!this.L){t:{if(this.g){var n,i=this.g;if((n=i.g?i.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!U(n)){var s=n;break t}}s=null}if(e=s)eN(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,eG(this,e);else{this.o=!1,this.m=3,eC(12),eH(this),eK(this);break e}}if(this.R){let t;for(e=!0;!this.K&&this.C<r.length;)if((t=function(e,t){var r=e.C,n=t.indexOf("\n",r);return -1==n?eV:isNaN(r=Number(t.substring(r,n)))?eU:(n+=1)+r>t.length?eV:(t=t.slice(n,n+r),e.C=n+r,t)}(this,r))==eV){4==o&&(this.m=4,eC(14),e=!1),eN(this.i,this.l,null,"[Incomplete Response]");break}else if(t==eU){this.m=4,eC(15),eN(this.i,this.l,r,"[Invalid Chunk]"),e=!1;break}else eN(this.i,this.l,t,null),eG(this,t);if(ej(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=o||0!=r.length||this.h.h||(this.m=1,eC(16),e=!1),this.o=this.o&&e,e){if(r.length>0&&!this.W){this.W=!0;var a=this.j;a.g==this&&a.aa&&!a.P&&(a.j.info("Great, no buffering proxy detected. Bytes received: "+r.length),tK(a),a.P=!0,eC(11))}}else eN(this.i,this.l,r,"[Invalid Chunked Response]"),eH(this),eK(this)}else eN(this.i,this.l,r,null),eG(this,r);4==o&&eH(this),this.o&&!this.K&&(4==o?tW(this.j,this):(this.o=!1,eq(this)))}else(function(e){let t={};e=(e.g&&tD(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let n=0;n<e.length;n++){if(U(e[n]))continue;var r=function(e){var t=1;e=e.split(":");let r=[];for(;t>0&&e.length;)r.push(e.shift()),t--;return e.length&&r.push(e.join(":")),r}(e[n]);let i=r[0];if("string"!=typeof(r=r[1]))continue;r=r.trim();let s=t[i]||[];t[i]=s,s.push(r)}!function(e,t){for(let r in e)t.call(void 0,e[r],r,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&r.indexOf("Unknown SID")>0?(this.m=3,eC(12)):(this.m=0,eC(13)),eH(this),eK(this)}}}catch(e){}finally{}},ex.prototype.cancel=function(){this.K=!0,eH(this)},ex.prototype.aa=function(){this.D=null;let e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(eT(),eC(17)),eH(this),this.m=2,eK(this)):ez(this,this.T-e)};var eW=class{constructor(e,t){this.g=e,this.map=t}};function eQ(e){this.l=e||10,e=p.PerformanceNavigationTiming?(e=p.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(p.chrome&&p.chrome.loadTimes&&p.chrome.loadTimes()&&p.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function eX(e){return!!e.h||!!e.g&&e.g.size>=e.j}function eY(e){return e.h?1:e.g?e.g.size:0}function eJ(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function eZ(e,t){e.g?e.g.add(t):e.h=t}function e0(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function e1(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(let r of e.g.values())t=t.concat(r.G);return t}return E(e.i)}eQ.prototype.cancel=function(){if(this.i=e1(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(let e of this.g.values())e.cancel();this.g.clear()}};var e2=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function e4(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof e4?(this.l=e.l,e9(this,e.j),this.o=e.o,this.g=e.g,e5(this,e.u),this.h=e.h,e3(this,tp(e.i)),this.m=e.m):e&&(t=String(e).match(e2))?(this.l=!1,e9(this,t[1]||"",!0),this.o=te(t[2]||""),this.g=te(t[3]||"",!0),e5(this,t[4]),this.h=te(t[5]||"",!0),e3(this,t[6]||"",!0),this.m=te(t[7]||"")):(this.l=!1,this.i=new tl(null,this.l))}function e6(e){return new e4(e)}function e9(e,t,r){e.j=r?te(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function e5(e,t){if(t){if(isNaN(t=Number(t))||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function e3(e,t,r){var n,i;t instanceof tl?(e.i=t,n=e.i,(i=e.l)&&!n.j&&(tu(n),n.i=null,n.g.forEach(function(e,t){let r=t.toLowerCase();t!=r&&(th(this,t),tf(this,r,e))},n)),n.j=i):(r||(t=tt(t,ta)),e.i=new tl(t,e.l))}function e7(e,t,r){e.i.set(t,r)}function e8(e){return e7(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function te(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function tt(e,t,r){return"string"==typeof e?(e=encodeURI(e).replace(t,tr),r&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function tr(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}e4.prototype.toString=function(){let e=[];var t=this.j;t&&e.push(tt(t,tn,!0),":");var r=this.g;return(r||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(tt(t,tn,!0),"@"),e.push(eL(r).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(r=this.u)&&e.push(":",String(r))),(r=this.h)&&(this.g&&"/"!=r.charAt(0)&&e.push("/"),e.push(tt(r,"/"==r.charAt(0)?ts:ti,!0))),(r=this.i.toString())&&e.push("?",r),(r=this.m)&&e.push("#",tt(r,to)),e.join("")},e4.prototype.resolve=function(e){let t=e6(this),r=!!e.j;r?e9(t,e.j):r=!!e.o,r?t.o=e.o:r=!!e.g,r?t.g=e.g:r=null!=e.u;var n=e.h;if(r)e5(t,e.u);else if(r=!!e.h){if("/"!=n.charAt(0)){if(this.g&&!this.h)n="/"+n;else{var i=t.h.lastIndexOf("/");-1!=i&&(n=t.h.slice(0,i+1)+n)}}if(".."==(i=n)||"."==i)n="";else if(-1!=i.indexOf("./")||-1!=i.indexOf("/.")){n=0==i.lastIndexOf("/",0),i=i.split("/");let e=[];for(let t=0;t<i.length;){let r=i[t++];"."==r?n&&t==i.length&&e.push(""):".."==r?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),n&&t==i.length&&e.push("")):(e.push(r),n=!0)}n=e.join("/")}else n=i}return r?t.h=n:r=""!==e.i.toString(),r?e3(t,tp(e.i)):r=!!e.m,r&&(t.m=e.m),t};var tn=/[#\/\?@]/g,ti=/[#\?:]/g,ts=/[#\?]/g,ta=/[#\?@]/g,to=/#/g;function tl(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function tu(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let r=0;r<e.length;r++){let n=e[r].indexOf("="),i,s=null;n>=0?(i=e[r].substring(0,n),s=e[r].substring(n+1)):i=e[r],t(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(e.i,function(t,r){e.add(decodeURIComponent(t.replace(/\+/g," ")),r)}))}function th(e,t){tu(e),t=tg(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function tc(e,t){return tu(e),t=tg(e,t),e.g.has(t)}function td(e,t){tu(e);let r=[];if("string"==typeof t)tc(e,t)&&(r=r.concat(e.g.get(tg(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)r=r.concat(e[t]);return r}function tf(e,t,r){th(e,t),r.length>0&&(e.i=null,e.g.set(tg(e,t),E(r)),e.h+=r.length)}function tp(e){let t=new tl;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function tg(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function tm(e,t,r,n,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),n(r)}catch(e){}}function ty(){this.g=new ep}function tv(e){this.i=e.Sb||null,this.h=e.ab||!1}function tw(e,t){es.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function t_(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function tE(e){e.readyState=4,e.l=null,e.j=null,e.B=null,tI(e)}function tI(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function tb(e){let t="";return z(e,function(e,r){t+=r+":"+e+"\r\n"}),t}function tT(e,t,r){e:{for(n in r){var n=!1;break e}n=!0}n||(r=tb(r),"string"==typeof e?null!=r&&eL(r):e7(e,t,r))}function tS(e){es.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(t=tl.prototype).add=function(e,t){tu(this),this.i=null,e=tg(this,e);let r=this.g.get(e);return r||this.g.set(e,r=[]),r.push(t),this.h+=1,this},t.forEach=function(e,t){tu(this),this.g.forEach(function(r,n){r.forEach(function(r){e.call(t,r,n,this)},this)},this)},t.set=function(e,t){return tu(this),this.i=null,tc(this,e=tg(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},t.get=function(e,t){return e&&(e=td(this,e)).length>0?String(e[0]):t},t.toString=function(){if(this.i)return this.i;if(!this.g)return"";let e=[],t=Array.from(this.g.keys());for(let n=0;n<t.length;n++){var r=t[n];let i=eL(r);r=td(this,r);for(let t=0;t<r.length;t++){let n=i;""!==r[t]&&(n+="="+eL(r[t])),e.push(n)}}return this.i=e.join("&")},w(tv,eg),tv.prototype.g=function(){return new tw(this.i,this.h)},w(tw,es),(t=tw.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,tI(this)},t.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;let t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||p).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,tE(this)),this.readyState=0},t.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,tI(this)),this.g&&(this.readyState=3,tI(this),this.g))){if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==p.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;t_(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))}},t.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?tE(this):tI(this),3==this.readyState&&t_(this)}},t.Oa=function(e){this.g&&(this.response=this.responseText=e,tE(this))},t.Na=function(e){this.g&&(this.response=e,tE(this))},t.ga=function(){this.g&&tE(this)},t.setRequestHeader=function(e,t){this.A.append(e,t)},t.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";let e=[],t=this.h.entries();for(var r=t.next();!r.done;)e.push((r=r.value)[0]+": "+r[1]),r=t.next();return e.join("\r\n")},Object.defineProperty(tw.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),w(tS,es);var tC=/^https?$/i,tA=["POST","PUT"];function tk(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,tR(e),tO(e)}function tR(e){e.A||(e.A=!0,ea(e,"complete"),ea(e,"error"))}function tN(e){if(e.h&&void 0!==f){if(e.v&&4==tD(e))setTimeout(e.Ca.bind(e),0);else if(ea(e,"readystatechange"),4==tD(e)){e.h=!1;try{let s=e.ca();switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t,r,n=!0;break;default:n=!1}if(!(t=n)){if(r=0===s){let t=String(e.D).match(e2)[1]||null;!t&&p.self&&p.self.location&&(t=p.self.location.protocol.slice(0,-1)),r=!tC.test(t?t.toLowerCase():"")}t=r}if(t)ea(e,"complete"),ea(e,"success");else{e.o=6;try{var i=tD(e)>2?e.g.statusText:""}catch(e){i=""}e.l=i+" ["+e.ca()+"]",tR(e)}}finally{tO(e)}}}}function tO(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);let r=e.g;e.g=null,t||ea(e,"ready");try{r.onreadystatechange=null}catch(e){}}}function tD(e){return e.g?e.g.readyState:0}function tP(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function tL(e,t,r){return r&&r.internalChannelParams&&r.internalChannelParams[e]||t}function tx(e){this.za=0,this.i=[],this.j=new eR,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=tL("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=tL("baseRetryDelayMs",5e3,e),this.Za=tL("retryDelaySeedMs",1e4,e),this.Ta=tL("forwardChannelMaxRetries",2,e),this.va=tL("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new eQ(e&&e.concurrentRequestLimit),this.Ba=new ty,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function tM(e){if(tV(e),3==e.I){var t=e.V++,r=e6(e.J);if(e7(r,"SID",e.M),e7(r,"RID",t),e7(r,"TYPE","terminate"),tj(e,r),(t=new ex(e,e.j,t)).M=2,t.A=e8(e6(r)),r=!1,p.navigator&&p.navigator.sendBeacon)try{r=p.navigator.sendBeacon(t.A.toString(),"")}catch(e){}!r&&p.Image&&((new Image).src=t.A,r=!0),r||(t.g=tZ(t.j,null),t.g.ea(t.A)),t.F=Date.now(),eq(t)}tY(e)}function tU(e){e.g&&(tK(e),e.g.cancel(),e.g=null)}function tV(e){tU(e),e.v&&(p.clearTimeout(e.v),e.v=null),tG(e),e.h.cancel(),e.m&&("number"==typeof e.m&&p.clearTimeout(e.m),e.m=null)}function tF(e){if(!eX(e.h)&&!e.m){e.m=!0;var t=e.Ea;R||D(),N||(R(),N=!0),O.add(t,e),e.D=0}}function tB(e,t){var r;r=t?t.l:e.V++;let n=e6(e.J);e7(n,"SID",e.M),e7(n,"RID",r),e7(n,"AID",e.K),tj(e,n),e.u&&e.o&&tT(n,e.u,e.o),r=new ex(e,e.j,r,e.D+1),null===e.u&&(r.J=e.o),t&&(e.i=t.G.concat(e.i)),t=tq(e,r,1e3),r.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),eZ(e.h,r),eF(r,n,t)}function tj(e,t){e.H&&z(e.H,function(e,r){e7(t,r,e)}),e.l&&z({},function(e,r){e7(t,r,e)})}function tq(e,t,r){r=Math.min(e.i.length,r);let n=e.l?y(e.l.Ka,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){let e=["count="+r];-1==t?r>0?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let o=!0;for(let l=0;l<r;l++){var s=i[l].g;let r=i[l].map;if((s-=t)<0)t=Math.max(0,i[l].g-100),o=!1;else try{s="req"+s+"_";try{var a=r instanceof Map?r:Object.entries(r);for(let[t,r]of a){let n=r;g(r)&&(n=ed(r)),e.push(s+t+"="+encodeURIComponent(n))}}catch(t){throw e.push(s+"type="+encodeURIComponent("_badmap")),t}}catch(e){n&&n(r)}}if(o){a=e.join("&");break e}}a=void 0}return e=e.i.splice(0,r),t.G=e,a}function tz(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;R||D(),N||(R(),N=!0),O.add(t,e),e.A=0}}function t$(e){return!e.g&&!e.v&&!(e.A>=3)&&(e.Y++,e.v=ek(y(e.Da,e),tQ(e,e.A)),e.A++,!0)}function tK(e){null!=e.B&&(p.clearTimeout(e.B),e.B=null)}function tH(e){e.g=new ex(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=e6(e.na);e7(t,"RID","rpc"),e7(t,"SID",e.M),e7(t,"AID",e.K),e7(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&e7(t,"TO",e.ia),e7(t,"TYPE","xmlhttp"),tj(e,t),e.u&&e.o&&tT(t,e.u,e.o),e.O&&(e.g.H=e.O);var r=e.g;e=e.ba,r.M=1,r.A=e8(e6(t)),r.u=null,r.R=!0,eB(r,e)}function tG(e){null!=e.C&&(p.clearTimeout(e.C),e.C=null)}function tW(e,t){var r=null;if(e.g==t){tG(e),tK(e),e.g=null;var n=2}else{if(!eJ(e.h,t))return;r=t.G,e0(e.h,t),n=1}if(0!=e.I){if(t.o){if(1==n){r=t.u?t.u.length:0,t=Date.now()-t.F;var i,s=e.D;ea(n=eI(),new eA(n,r)),tF(e)}else tz(e)}else if(3==(s=t.m)||0==s&&t.X>0||!(1==n&&(i=t,!(eY(e.h)>=e.h.j-(e.m?1:0))&&(e.m?(e.i=i.G.concat(e.i),!0):1!=e.I&&2!=e.I&&!(e.D>=(e.Sa?0:e.Ta))&&(e.m=ek(y(e.Ea,e,i),tQ(e,e.D)),e.D++,!0)))||2==n&&t$(e)))switch(r&&r.length>0&&((t=e.h).i=t.i.concat(r)),s){case 1:tX(e,5);break;case 4:tX(e,10);break;case 3:tX(e,6);break;default:tX(e,2)}}}function tQ(e,t){let r=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(r*=2),r*t}function tX(e,t){if(e.j.info("Error code "+t),2==t){var r=y(e.bb,e),n=e.Ua;let t=!n;n=new e4(n||"//www.google.com/images/cleardot.gif"),p.location&&"http"==p.location.protocol||e9(n,"https"),e8(n),t?function(e,t){let r=new eR;if(p.Image){let n=new Image;n.onload=v(tm,r,"TestLoadImage: loaded",!0,t,n),n.onerror=v(tm,r,"TestLoadImage: error",!1,t,n),n.onabort=v(tm,r,"TestLoadImage: abort",!1,t,n),n.ontimeout=v(tm,r,"TestLoadImage: timeout",!1,t,n),p.setTimeout(function(){n.ontimeout&&n.ontimeout()},1e4),n.src=e}else t(!1)}(n.toString(),r):function(e,t){let r=new eR,n=new AbortController,i=setTimeout(()=>{n.abort(),tm(r,"TestPingServer: timeout",!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(i),e.ok?tm(r,"TestPingServer: ok",!0,t):tm(r,"TestPingServer: server error",!1,t)}).catch(()=>{clearTimeout(i),tm(r,"TestPingServer: error",!1,t)})}(n.toString(),r)}else eC(2);e.I=0,e.l&&e.l.pa(t),tY(e),tV(e)}function tY(e){if(e.I=0,e.ja=[],e.l){let t=e1(e.h);(0!=t.length||0!=e.i.length)&&(I(e.ja,t),I(e.ja,e.i),e.h.i.length=0,E(e.i),e.i.length=0),e.l.oa()}}function tJ(e,t,r){var n=r instanceof e4?e6(r):new e4(r);if(""!=n.g)t&&(n.g=t+"."+n.g),e5(n,n.u);else{var i=p.location;n=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;let e=new e4(null);n&&e9(e,n),t&&(e.g=t),i&&e5(e,i),r&&(e.h=r),n=e}return r=e.G,t=e.wa,r&&t&&e7(n,r,t),e7(n,"VER",e.ka),tj(e,n),n}function tZ(e,t,r){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=new tS(e.Aa&&!e.ma?new tv({ab:r}):e.ma)).Fa(e.L),t}function t0(){}function t1(){}function t2(e,t){es.call(this),this.g=new tx(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!U(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!U(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new t9(this)}function t4(e){ev.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(let r in t){e=r;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function t6(){ew.call(this),this.status=1}function t9(e){this.g=e}(t=tS.prototype).Fa=function(e){this.H=e},t.ea=function(t,r,n,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);r=r?r.toUpperCase():"GET",this.D=t,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():e.g(),this.g.onreadystatechange=_(y(this.Ca,this));try{this.B=!0,this.g.open(r,String(t),!0),this.B=!1}catch(e){tk(this,e);return}if(t=n||"",n=new Map(this.headers),i){if(Object.getPrototypeOf(i)===Object.prototype)for(var s in i)n.set(s,i[s]);else if("function"==typeof i.keys&&"function"==typeof i.get)for(let e of i.keys())n.set(e,i.get(e));else throw Error("Unknown input type for opt_headers: "+String(i))}for(let[e,a]of(i=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=p.FormData&&t instanceof p.FormData,!(Array.prototype.indexOf.call(tA,r,void 0)>=0)||i||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),n))this.g.setRequestHeader(e,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(t),this.v=!1}catch(e){tk(this,e)}},t.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,ea(this,"complete"),ea(this,"abort"),tO(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),tO(this,!0)),tS.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?tN(this):this.Xa())},t.Xa=function(){tN(this)},t.isActive=function(){return!!this.g},t.ca=function(){try{return tD(this)>2?this.g.status:-1}catch(e){return -1}},t.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},t.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),ef(t)}},t.ya=function(){return this.o},t.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(t=tx.prototype).ka=8,t.I=1,t.connect=function(e,t,r,n){eC(0),this.W=e,this.H=t||{},r&&void 0!==n&&(this.H.OSID=r,this.H.OAID=n),this.F=this.X,this.J=tJ(this,null,this.W),tF(this)},t.Ea=function(e){if(this.m){if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;let i=new ex(this,this.j,e),s=this.o;if(this.U&&(s?H(s=$(s),this.U):s=this.U),null!==this.u||this.R||(i.J=s,s=null),this.S)e:{for(var t=0,r=0;r<this.i.length;r++){t:{var n=this.i[r];if("__data__"in n.map&&"string"==typeof(n=n.map.__data__)){n=n.length;break t}n=void 0}if(void 0===n)break;if((t+=n)>4096){t=r;break e}if(4096===t||r===this.i.length-1){t=r+1;break e}}t=1e3}else t=1e3;t=tq(this,i,t),e7(r=e6(this.J),"RID",e),e7(r,"CVER",22),this.G&&e7(r,"X-HTTP-Session-Id",this.G),tj(this,r),s&&(this.R?t="headers="+eL(tb(s))+"&"+t:this.u&&tT(r,this.u,s)),eZ(this.h,i),this.Ra&&e7(r,"TYPE","init"),this.S?(e7(r,"$req",t),e7(r,"SID","null"),i.U=!0,eF(i,r,null)):eF(i,r,t),this.I=2}}else 3==this.I&&(e?tB(this,e):0==this.i.length||eX(this.h)||tB(this))}},t.Da=function(){if(this.v=null,tH(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=ek(y(this.Wa,this),e)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,eC(10),tU(this),tH(this))},t.Va=function(){null!=this.C&&(this.C=null,tU(this),t$(this),eC(19))},t.bb=function(e){e?(this.j.info("Successfully pinged google.com"),eC(2)):(this.j.info("Failed to ping google.com"),eC(1))},t.isActive=function(){return!!this.l&&this.l.isActive(this)},(t=t0.prototype).ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){},t1.prototype.g=function(e,t){return new t2(e,t)},w(t2,es),t2.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},t2.prototype.close=function(){tM(this.g)},t2.prototype.o=function(e){var t=this.g;if("string"==typeof e){var r={};r.__data__=e,e=r}else this.v&&((r={}).__data__=ed(e),e=r);t.i.push(new eW(t.Ya++,e)),3==t.I&&tF(t)},t2.prototype.N=function(){this.g.l=null,delete this.j,tM(this.g),delete this.g,t2.Z.N.call(this)},w(t4,ev),w(t6,ew),w(t9,t0),t9.prototype.ra=function(){ea(this.g,"a")},t9.prototype.qa=function(e){ea(this.g,new t4(e))},t9.prototype.pa=function(e){ea(this.g,new t6)},t9.prototype.oa=function(){ea(this.g,"b")},t1.prototype.createWebChannel=t1.prototype.g,t2.prototype.send=t2.prototype.o,t2.prototype.open=t2.prototype.m,t2.prototype.close=t2.prototype.close,d=T.createWebChannelTransport=function(){return new t1},c=T.getStatEventTarget=function(){return eI()},h=T.Event=e_,u=T.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},eO.NO_ERROR=0,eO.TIMEOUT=8,eO.HTTP_ERROR=6,l=T.ErrorCode=eO,eD.COMPLETE="complete",o=T.EventType=eD,em.EventType=ey,ey.OPEN="a",ey.CLOSE="b",ey.ERROR="c",ey.MESSAGE="d",es.prototype.listen=es.prototype.J,a=T.WebChannel=em,T.FetchXmlHttpFactory=tv,tS.prototype.listenOnce=tS.prototype.K,tS.prototype.getLastError=tS.prototype.Ha,tS.prototype.getLastErrorCode=tS.prototype.ya,tS.prototype.getStatus=tS.prototype.ca,tS.prototype.getResponseJson=tS.prototype.La,tS.prototype.getResponseText=tS.prototype.la,tS.prototype.send=tS.prototype.ea,tS.prototype.setWithCredentials=tS.prototype.Fa,s=T.XhrIo=tS}).apply(void 0!==b?b:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{}),r(4155);var S=r(1876).Buffer;let C="@firebase/firestore",A="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}k.UNAUTHENTICATED=new k(null),k.GOOGLE_CREDENTIALS=new k("google-credentials-uid"),k.FIRST_PARTY=new k("first-party-uid"),k.MOCK_USER=new k("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let R="12.3.0",N=new w.Yd("@firebase/firestore");function O(){return N.logLevel}function D(e,...t){if(N.logLevel<=w.in.DEBUG){let r=t.map(x);N.debug(`Firestore (${R}): ${e}`,...r)}}function P(e,...t){if(N.logLevel<=w.in.ERROR){let r=t.map(x);N.error(`Firestore (${R}): ${e}`,...r)}}function L(e,...t){if(N.logLevel<=w.in.WARN){let r=t.map(x);N.warn(`Firestore (${R}): ${e}`,...r)}}function x(e){if("string"==typeof e)return e;try{/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e,t,r){let n="Unexpected state";"string"==typeof t?n=t:r=t,U(e,n,r)}function U(e,t,r){let n=`FIRESTORE (${R}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==r)try{n+=" CONTEXT: "+JSON.stringify(r)}catch(e){n+=" CONTEXT: "+r}throw P(n),Error(n)}function V(e,t,r,n){let i="Unexpected state";"string"==typeof r?i=r:n=r,e||U(t,i,n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class B extends _.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class z{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(k.UNAUTHENTICATED))}shutdown(){}}class ${constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class K{constructor(e){this.t=e,this.currentUser=k.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){V(void 0===this.o,42304);let r=this.i,n=e=>this.i!==r?(r=this.i,t(e)):Promise.resolve(),i=new j;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new j,e.enqueueRetryable(()=>n(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},a=e=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new j)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(V("string"==typeof t.accessToken,31837,{l:t}),new q(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return V(null===e||"string"==typeof e,2055,{h:e}),new k(e)}}class H{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=k.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class G{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new H(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(k.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class W{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Q{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,y.rh)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){V(void 0===this.o,3512);let r=e=>{null!=e.error&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let r=e.token!==this.m;return this.m=e.token,D("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>r(t))};let n=e=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){let e=this.V.getImmediate({optional:!0});e?n(e):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new W(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(V("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new W(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{static newId(){let e=62*Math.floor(256/62),t="";for(;t.length<20;){let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),r=new Uint8Array(40);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(r);else for(let e=0;e<40;e++)r[e]=Math.floor(256*Math.random());return r}(0);for(let n=0;n<r.length;++n)t.length<20&&r[n]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(r[n]%62))}return t}}function Y(e,t){return e<t?-1:e>t?1:0}function J(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=e.charAt(n),i=t.charAt(n);if(r!==i)return Z(r)===Z(i)?Y(r,i):Z(r)?1:-1}return Y(e.length,t.length)}function Z(e){let t=e.charCodeAt(0);return t>=55296&&t<=57343}function ee(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let et="__name__";class er{constructor(e,t,r){void 0===t?t=0:t>e.length&&M(637,{offset:t,range:e.length}),void 0===r?r=e.length-t:r>e.length-t&&M(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===er.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof er?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=er.compareSegments(e.get(n),t.get(n));if(0!==r)return r}return Y(e.length,t.length)}static compareSegments(e,t){let r=er.isNumericId(e),n=er.isNumericId(t);return r&&!n?-1:!r&&n?1:r&&n?er.extractNumericId(e).compare(er.extractNumericId(t)):J(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return n.fromString(e.substring(4,e.length-2))}}class en extends er{construct(e,t,r){return new en(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new B(F.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new en(t)}static emptyPath(){return new en([])}}let ei=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class es extends er{construct(e,t,r){return new es(e,t,r)}static isValidIdentifier(e){return ei.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),es.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===et}static keyField(){return new es([et])}static fromServerFormat(e){let t=[],r="",n=0,i=()=>{if(0===r.length)throw new B(F.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},s=!1;for(;n<e.length;){let t=e[n];if("\\"===t){if(n+1===e.length)throw new B(F.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new B(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?s=!s:"."!==t||s?r+=t:i(),n++}if(i(),s)throw new B(F.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new es(t)}static emptyPath(){return new es([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e){this.path=e}static fromPath(e){return new ea(en.fromString(e))}static fromName(e){return new ea(en.fromString(e).popFirst(5))}static empty(){return new ea(en.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===en.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return en.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ea(new en(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(e,t,r){if(!r)throw new B(F.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function el(e){if(!ea.isDocumentKey(e))throw new B(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function eu(e){if(ea.isDocumentKey(e))throw new B(F.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function eh(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function ec(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let r=(t=e).constructor?t.constructor.name:null;return r?`a custom ${r} object`:"an object"}}return"function"==typeof e?"a function":M(12329,{type:typeof e})}function ed(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new B(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let r=ec(e);throw new B(F.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ef(e,t){let r={typeString:e};return t&&(r.value=t),r}function ep(e,t){let r;if(!eh(e))throw new B(F.INVALID_ARGUMENT,"JSON must be an object");for(let n in t)if(t[n]){let i=t[n].typeString,s="value"in t[n]?{value:t[n].value}:void 0;if(!(n in e)){r=`JSON missing required field: '${n}'`;break}let a=e[n];if(i&&typeof a!==i){r=`JSON field '${n}' must be a ${i}.`;break}if(void 0!==s&&a!==s.value){r=`Expected '${n}' field to equal '${s.value}'`;break}}if(r)throw new B(F.INVALID_ARGUMENT,r);return!0}class eg{static now(){return eg.fromMillis(Date.now())}static fromDate(e){return eg.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new eg(t,Math.floor((e-1e3*t)*1e6))}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new B(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new B(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Y(this.nanoseconds,e.nanoseconds):Y(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:eg._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ep(e,eg._jsonSchema))return new eg(e.seconds,e.nanoseconds)}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}eg._jsonSchemaVersion="firestore/timestamp/1.0",eg._jsonSchema={type:ef("string",eg._jsonSchemaVersion),seconds:ef("number"),nanoseconds:ef("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{static fromTimestamp(e){return new em(e)}static min(){return new em(new eg(0,0))}static max(){return new em(new eg(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}class ey{constructor(e,t,r,n){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=n}}ey.UNKNOWN_ID=-1;class ev{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new ev(em.min(),ea.empty(),-1)}static max(){return new ev(em.max(),ea.empty(),-1)}}class ew{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e_(e){if(e.code!==F.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new eE((r,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(r,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(r,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof eE?t:eE.resolve(t)}catch(e){return eE.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):eE.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):eE.reject(t)}static resolve(e){return new eE((t,r)=>{t(e)})}static reject(e){return new eE((t,r)=>{r(e)})}static waitFor(e){return new eE((t,r)=>{let n=0,i=0,s=!1;e.forEach(e=>{++n,e.next(()=>{++i,s&&i===n&&t()},e=>r(e))}),s=!0,i===n&&t()})}static or(e){let t=eE.resolve(!1);for(let r of e)t=t.next(e=>e?eE.resolve(e):r());return t}static forEach(e,t){let r=[];return e.forEach((e,n)=>{r.push(t.call(this,e,n))}),this.waitFor(r)}static mapArray(e,t){return new eE((r,n)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let l=o;t(e[l]).next(e=>{s[l]=e,++a===i&&r(s)},e=>n(e))}})}static doWhile(e,t){return new eE((r,n)=>{let i=()=>{!0===e()?t().next(()=>{i()},n):r()};i()})}}function eI(e){return"IndexedDbTransactionError"===e.name}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ue&&this.ue(e),e}}function eT(e){return 0===e&&1/e==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eS(e){let t=0;for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function eC(e,t){for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function eA(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}eb.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e,t){this.comparator=e,this.root=t||eN.EMPTY}insert(e,t){return new ek(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,eN.BLACK,null,null))}remove(e){return new ek(this.comparator,this.root.remove(e,this.comparator).copy(null,null,eN.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new eR(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new eR(this.root,e,this.comparator,!1)}getReverseIterator(){return new eR(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new eR(this.root,e,this.comparator,!0)}}class eR{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&n&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class eN{constructor(e,t,r,n,i){this.key=e,this.value=t,this.color=null!=r?r:eN.RED,this.left=null!=n?n:eN.EMPTY,this.right=null!=i?i:eN.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,i){return new eN(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this,i=r(e,n.key);return(n=i<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===i?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r))).fixUp()}removeMin(){if(this.left.isEmpty())return eN.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let r,n=this;if(0>t(e,n.key))n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return eN.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,eN.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,eN.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}}eN.EMPTY=null,eN.RED=!0,eN.BLACK=!1,eN.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,r,n,i){return this}insert(e,t,r){return new eN(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eO{constructor(e){this.comparator=e,this.data=new ek(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new eD(this.data.getIterator())}getIteratorFrom(e){return new eD(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof eO)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new eO(this.comparator);return t.data=e,t}}class eD{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eP{constructor(e){this.fields=e,e.sort(es.comparator)}static empty(){return new eP([])}unionWith(e){let t=new eO(es.comparator);for(let e of this.fields)t=t.add(e);for(let r of e)t=t.add(r);return new eP(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ee(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eL extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ex{constructor(e){this.binaryString=e}static fromBase64String(e){return new ex(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new eL("Invalid base64 string: "+e):e}}(e))}static fromUint8Array(e){return new ex(function(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Y(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ex.EMPTY_BYTE_STRING=new ex("");let eM=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function eU(e){if(V(!!e,39018),"string"==typeof e){let t=0,r=eM.exec(e);if(V(!!r,46558,{timestamp:e}),r[1]){let e=r[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:eV(e.seconds),nanos:eV(e.nanos)}}function eV(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function eF(e){return"string"==typeof e?ex.fromBase64String(e):ex.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eB="server_timestamp",ej="__type__",eq="__previous_value__",ez="__local_write_time__";function e$(e){return(e?.mapValue?.fields||{})[ej]?.stringValue===eB}function eK(e){let t=e.mapValue.fields[eq];return e$(t)?eK(t):t}function eH(e){let t=eU(e.mapValue.fields[ez].timestampValue);return new eg(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eG{constructor(e,t,r,n,i,s,a,o,l,u){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=l,this.isUsingEmulator=u}}let eW="(default)";class eQ{constructor(e,t){this.projectId=e,this.database=t||eW}static empty(){return new eQ("","")}get isDefaultDatabase(){return this.database===eW}isEqual(e){return e instanceof eQ&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eX="__type__",eY="__max__",eJ={mapValue:{fields:{__type__:{stringValue:eY}}}},eZ="__vector__",e0="value";function e1(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?e$(e)?4:ta(e)?9007199254740991:ti(e)?10:11:M(28295,{value:e})}function e2(e,t){if(e===t)return!0;let r=e1(e);if(r!==e1(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return eH(e).isEqual(eH(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let r=eU(e.timestampValue),n=eU(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return eF(e.bytesValue).isEqual(eF(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return eV(e.geoPointValue.latitude)===eV(t.geoPointValue.latitude)&&eV(e.geoPointValue.longitude)===eV(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return eV(e.integerValue)===eV(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let r=eV(e.doubleValue),n=eV(t.doubleValue);return r===n?eT(r)===eT(n):isNaN(r)&&isNaN(n)}return!1}(e,t);case 9:return ee(e.arrayValue.values||[],t.arrayValue.values||[],e2);case 10:case 11:return function(e,t){let r=e.mapValue.fields||{},n=t.mapValue.fields||{};if(eS(r)!==eS(n))return!1;for(let e in r)if(r.hasOwnProperty(e)&&(void 0===n[e]||!e2(r[e],n[e])))return!1;return!0}(e,t);default:return M(52216,{left:e})}}function e4(e,t){return void 0!==(e.values||[]).find(e=>e2(e,t))}function e6(e,t){if(e===t)return 0;let r=e1(e),n=e1(t);if(r!==n)return Y(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return Y(e.booleanValue,t.booleanValue);case 2:return function(e,t){let r=eV(e.integerValue||e.doubleValue),n=eV(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}(e,t);case 3:return e9(e.timestampValue,t.timestampValue);case 4:return e9(eH(e),eH(t));case 5:return J(e.stringValue,t.stringValue);case 6:return function(e,t){let r=eF(e),n=eF(t);return r.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){let t=Y(r[e],n[e]);if(0!==t)return t}return Y(r.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let r=Y(eV(e.latitude),eV(t.latitude));return 0!==r?r:Y(eV(e.longitude),eV(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return e5(e.arrayValue,t.arrayValue);case 10:return function(e,t){let r=e.fields||{},n=t.fields||{},i=r[e0]?.arrayValue,s=n[e0]?.arrayValue,a=Y(i?.values?.length||0,s?.values?.length||0);return 0!==a?a:e5(i,s)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===eJ.mapValue&&t===eJ.mapValue)return 0;if(e===eJ.mapValue)return 1;if(t===eJ.mapValue)return -1;let r=e.fields||{},n=Object.keys(r),i=t.fields||{},s=Object.keys(i);n.sort(),s.sort();for(let e=0;e<n.length&&e<s.length;++e){let t=J(n[e],s[e]);if(0!==t)return t;let a=e6(r[n[e]],i[s[e]]);if(0!==a)return a}return Y(n.length,s.length)}(e.mapValue,t.mapValue);default:throw M(23264,{he:r})}}function e9(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Y(e,t);let r=eU(e),n=eU(t),i=Y(r.seconds,n.seconds);return 0!==i?i:Y(r.nanos,n.nanos)}function e5(e,t){let r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){let t=e6(r[e],n[e]);if(t)return t}return Y(r.length,n.length)}function e3(e){var t,r;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=eU(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?eF(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,ea.fromName(t).toString()):"geoPointValue"in e?(r=e.geoPointValue,`geo(${r.latitude},${r.longitude})`):"arrayValue"in e?function(e){let t="[",r=!0;for(let n of e.values||[])r?r=!1:t+=",",t+=e3(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),r="{",n=!0;for(let i of t)n?n=!1:r+=",",r+=`${i}:${e3(e.fields[i])}`;return r+"}"}(e.mapValue):M(61005,{value:e})}function e7(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function e8(e){return!!e&&"integerValue"in e}function te(e){return!!e&&"arrayValue"in e}function tt(e){return!!e&&"nullValue"in e}function tr(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function tn(e){return!!e&&"mapValue"in e}function ti(e){return(e?.mapValue?.fields||{})[eX]?.stringValue===eZ}function ts(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){let t={mapValue:{fields:{}}};return eC(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=ts(r)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=ts(e.arrayValue.values[r]);return t}return{...e}}function ta(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===eY}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e){this.value=e}static empty(){return new to({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(!tn(t=(t.mapValue.fields||{})[e.get(r)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ts(t)}setAll(e){let t=es.emptyPath(),r={},n=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=i.popLast()}e?r[i.lastSegment()]=ts(e):n.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,r,n)}delete(e){let t=this.field(e.popLast());tn(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return e2(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];tn(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){for(let n of(eC(t,(t,r)=>e[t]=r),r))delete e[n]}clone(){return new to(ts(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e,t,r,n,i,s,a){this.key=e,this.documentType=t,this.version=r,this.readTime=n,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new tl(e,0,em.min(),em.min(),em.min(),to.empty(),0)}static newFoundDocument(e,t,r,n){return new tl(e,1,t,em.min(),r,n,0)}static newNoDocument(e,t){return new tl(e,2,t,em.min(),em.min(),to.empty(),0)}static newUnknownDocument(e,t){return new tl(e,3,t,em.min(),em.min(),to.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(em.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=to.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=to.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=em.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof tl&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new tl(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e,t){this.position=e,this.inclusive=t}}function th(e,t,r){let n=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(n=s.field.isKeyField()?ea.comparator(ea.fromName(a.referenceValue),r.key):e6(a,r.data.field(s.field)),"desc"===s.dir&&(n*=-1),0!==n)break}return n}function tc(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!e2(e.position[r],t.position[r]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{}class tp extends tf{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,r):new tv(e,t,r):"array-contains"===t?new tI(e,r):"in"===t?new tb(e,r):"not-in"===t?new tT(e,r):"array-contains-any"===t?new tS(e,r):new tp(e,t,r)}static createKeyFieldInFilter(e,t,r){return"in"===t?new tw(e,r):new t_(e,r)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(e6(t,this.value)):null!==t&&e1(this.value)===e1(t)&&this.matchesComparison(e6(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tg extends tf{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new tg(e,t)}matches(e){return tm(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function tm(e){return"and"===e.op}function ty(e){for(let t of e.filters)if(t instanceof tg)return!1;return!0}class tv extends tp{constructor(e,t,r){super(e,t,r),this.key=ea.fromName(r.referenceValue)}matches(e){let t=ea.comparator(e.key,this.key);return this.matchesComparison(t)}}class tw extends tp{constructor(e,t){super(e,"in",t),this.keys=tE("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class t_ extends tp{constructor(e,t){super(e,"not-in",t),this.keys=tE("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function tE(e,t){return(t.arrayValue?.values||[]).map(e=>ea.fromName(e.referenceValue))}class tI extends tp{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return te(t)&&e4(t.arrayValue,this.value)}}class tb extends tp{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&e4(this.value.arrayValue,t)}}class tT extends tp{constructor(e,t){super(e,"not-in",t)}matches(e){if(e4(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!e4(this.value.arrayValue,t)}}class tS extends tp{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!te(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>e4(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e,t=null,r=[],n=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=i,this.startAt=s,this.endAt=a,this.Te=null}}function tA(e,t=null,r=[],n=[],i=null,s=null,a=null){return new tC(e,t,r,n,i,s,a)}function tk(e){if(null===e.Te){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof tp)return t.field.canonicalString()+t.op.toString()+e3(t.value);if(ty(t)&&tm(t))return t.filters.map(t=>e(t)).join(",");{let r=t.filters.map(t=>e(t)).join(",");return`${t.op}(${r})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==e.limit||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>e3(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>e3(e)).join(",")),e.Te=t}return e.Te}function tR(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var r,n;if(r=e.orderBy[i],n=t.orderBy[i],!(r.dir===n.dir&&r.field.isEqual(n.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(!function e(t,r){return t instanceof tp?r instanceof tp&&t.op===r.op&&t.field.isEqual(r.field)&&e2(t.value,r.value):t instanceof tg?r instanceof tg&&t.op===r.op&&t.filters.length===r.filters.length&&t.filters.reduce((t,n,i)=>t&&e(n,r.filters[i]),!0):void M(19439)}(e.filters[r],t.filters[r]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!tc(e.startAt,t.startAt)&&tc(e.endAt,t.endAt)}function tN(e){return ea.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tO{constructor(e,t=null,r=[],n=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function tD(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function tP(e){return null!==e.collectionGroup}function tL(e){if(null===e.Ie){let t;e.Ie=[];let r=new Set;for(let t of e.explicitOrderBy)e.Ie.push(t),r.add(t.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(t=new eO(es.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t).forEach(t=>{r.has(t.canonicalString())||t.isKeyField()||e.Ie.push(new td(t,n))}),r.has(es.keyField().canonicalString())||e.Ie.push(new td(es.keyField(),n))}return e.Ie}function tx(e){return e.Ee||(e.Ee=function(e,t){if("F"===e.limitType)return tA(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new td(e.field,t)});let r=e.endAt?new tu(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new tu(e.startAt.position,e.startAt.inclusive):null;return tA(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}(e,tL(e))),e.Ee}function tM(e,t){let r=e.filters.concat([t]);return new tO(e.path,e.collectionGroup,e.explicitOrderBy.slice(),r,e.limit,e.limitType,e.startAt,e.endAt)}function tU(e,t,r){return new tO(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,r,e.startAt,e.endAt)}function tV(e,t){return tR(tx(e),tx(t))&&e.limitType===t.limitType}function tF(e){return`${tk(tx(e))}|lt:${e.limitType}`}function tB(e){var t;let r;return`Query(target=${r=(t=tx(e)).path.canonicalString(),null!==t.collectionGroup&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof tp?`${t.field.canonicalString()} ${t.op} ${e3(t.value)}`:t instanceof tg?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(r+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>e3(e)).join(",")),t.endAt&&(r+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>e3(e)).join(",")),`Target(${r})`}; limitType=${e.limitType})`}function tj(e,t){return t.isFoundDocument()&&function(e,t){let r=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(r):ea.isDocumentKey(e.path)?e.path.isEqual(r):e.path.isImmediateParentOf(r)}(e,t)&&function(e,t){for(let r of tL(e))if(!r.field.isKeyField()&&null===t.data.field(r.field))return!1;return!0}(e,t)&&function(e,t){for(let r of e.filters)if(!r.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,r){let n=th(e,t,r);return e.inclusive?n<=0:n<0}(e.startAt,tL(e),t))&&(!e.endAt||!!function(e,t,r){let n=th(e,t,r);return e.inclusive?n>=0:n>0}(e.endAt,tL(e),t))}function tq(e){return(t,r)=>{let n=!1;for(let i of tL(e)){let e=function(e,t,r){let n=e.field.isKeyField()?ea.comparator(t.key,r.key):function(e,t,r){let n=t.data.field(e),i=r.data.field(e);return null!==n&&null!==i?e6(n,i):M(42886)}(e.field,t,r);switch(e.dir){case"asc":return n;case"desc":return -1*n;default:return M(19790,{direction:e.dir})}}(i,t,r);if(0!==e)return e;n=n||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tz{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0!==r){for(let[t,n]of r)if(this.equalsFn(t,e))return n}}has(e){return void 0!==this.get(e)}set(e,t){let r=this.mapKeyFn(e),n=this.inner[r];if(void 0===n)return this.inner[r]=[[e,t]],void this.innerSize++;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return void(n[r]=[e,t]);n.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0===r)return!1;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return 1===r.length?delete this.inner[t]:r.splice(n,1),this.innerSize--,!0;return!1}forEach(e){eC(this.inner,(t,r)=>{for(let[t,n]of r)e(t,n)})}isEmpty(){return eA(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t$=new ek(ea.comparator),tK=new ek(ea.comparator);function tH(...e){let t=tK;for(let r of e)t=t.insert(r.key,r);return t}function tG(e){let t=tK;return e.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function tW(){return new tz(e=>e.toString(),(e,t)=>e.isEqual(t))}let tQ=new ek(ea.comparator),tX=new eO(ea.comparator);function tY(...e){let t=tX;for(let r of e)t=t.add(r);return t}let tJ=new eO(Y);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tZ(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:eT(t)?"-0":t}}function t0(e){return{integerValue:""+e}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t1{constructor(){this._=void 0}}function t2(e,t){return e instanceof t7?e8(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class t4 extends t1{}class t6 extends t1{constructor(e){super(),this.elements=e}}function t9(e,t){let r=re(t);for(let t of e.elements)r.some(e=>e2(e,t))||r.push(t);return{arrayValue:{values:r}}}class t5 extends t1{constructor(e){super(),this.elements=e}}function t3(e,t){let r=re(t);for(let t of e.elements)r=r.filter(e=>!e2(e,t));return{arrayValue:{values:r}}}class t7 extends t1{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function t8(e){return eV(e.integerValue||e.doubleValue)}function re(e){return te(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){this.field=e,this.transform=t}}class rr{constructor(e,t){this.version=e,this.transformResults=t}}class rn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new rn}static exists(e){return new rn(void 0,e)}static updateTime(e){return new rn(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ri(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class rs{}function ra(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new rp(e.key,rn.none()):new ru(e.key,e.data,rn.none());{let r=e.data,n=to.empty(),i=new eO(es.comparator);for(let e of t.fields)if(!i.has(e)){let t=r.field(e);null===t&&e.length>1&&(e=e.popLast(),t=r.field(e)),null===t?n.delete(e):n.set(e,t),i=i.add(e)}return new rh(e.key,n,new eP(i.toArray()),rn.none())}}function ro(e,t,r,n){return e instanceof ru?function(e,t,r,n){if(!ri(e.precondition,t))return r;let i=e.value.clone(),s=rf(e.fieldTransforms,n,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,r,n):e instanceof rh?function(e,t,r,n){if(!ri(e.precondition,t))return r;let i=rf(e.fieldTransforms,n,t),s=t.data;return(s.setAll(rc(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===r)?null:r.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,r,n):ri(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):r}function rl(e,t){var r,n;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(r=e.fieldTransforms,n=t.fieldTransforms,!!(void 0===r&&void 0===n||!(!r||!n)&&ee(r,n,(e,t)=>{var r,n;return e.field.isEqual(t.field)&&(r=e.transform,n=t.transform,r instanceof t6&&n instanceof t6||r instanceof t5&&n instanceof t5?ee(r.elements,n.elements,e2):r instanceof t7&&n instanceof t7?e2(r.Ae,n.Ae):r instanceof t4&&n instanceof t4)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class ru extends rs{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class rh extends rs{constructor(e,t,r,n,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function rc(e){let t=new Map;return e.fieldMask.fields.forEach(r=>{if(!r.isEmpty()){let n=e.data.field(r);t.set(r,n)}}),t}function rd(e,t,r){let n=new Map;V(e.length===r.length,32656,{Re:r.length,Ve:e.length});for(let s=0;s<r.length;s++){var i;let a=e[s],o=a.transform,l=t.data.field(a.field);n.set(a.field,(i=r[s],o instanceof t6?t9(o,l):o instanceof t5?t3(o,l):i))}return n}function rf(e,t,r){let n=new Map;for(let i of e){let e=i.transform,s=r.data.field(i.field);n.set(i.field,e instanceof t4?function(e,t){let r={fields:{[ej]:{stringValue:eB},[ez]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&e$(t)&&(t=eK(t)),t&&(r.fields[eq]=t),{mapValue:r}}(t,s):e instanceof t6?t9(e,s):e instanceof t5?t3(e,s):function(e,t){let r=t2(e,t),n=t8(r)+t8(e.Ae);return e8(r)&&e8(e.Ae)?t0(n):tZ(e.serializer,n)}(e,s))}return n}class rp extends rs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class rg extends rs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e,t,r,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=n}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var n;n=r[t],i instanceof ru?function(e,t,r){let n=e.value.clone(),i=rd(e.fieldTransforms,t,r.transformResults);n.setAll(i),t.convertToFoundDocument(r.version,n).setHasCommittedMutations()}(i,e,n):i instanceof rh?function(e,t,r){if(!ri(e.precondition,t))return void t.convertToUnknownDocument(r.version);let n=rd(e.fieldTransforms,t,r.transformResults),i=t.data;i.setAll(rc(e)),i.setAll(n),t.convertToFoundDocument(r.version,i).setHasCommittedMutations()}(i,e,n):function(e,t,r){t.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=ro(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=ro(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=tW();return this.mutations.forEach(n=>{let i=e.get(n.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields),o=ra(s,a=t.has(n.key)?null:a);null!==o&&r.set(n.key,o),s.isValidDocument()||s.convertToNoDocument(em.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),tY())}isEqual(e){return this.batchId===e.batchId&&ee(this.mutations,e.mutations,(e,t)=>rl(e,t))&&ee(this.baseMutations,e.baseMutations,(e,t)=>rl(e,t))}}class ry{constructor(e,t,r,n){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=n}static from(e,t,r){V(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let n=tQ,i=e.mutations;for(let e=0;e<i.length;e++)n=n.insert(i[e].key,r[e].version);return new ry(e,t,r,n)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rw{constructor(e,t){this.count=e,this.unchangedNames=t}}function r_(e){if(void 0===e)return P("GRPC error has no .code"),F.UNKNOWN;switch(e){case f.OK:return F.OK;case f.CANCELLED:return F.CANCELLED;case f.UNKNOWN:return F.UNKNOWN;case f.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case f.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case f.INTERNAL:return F.INTERNAL;case f.UNAVAILABLE:return F.UNAVAILABLE;case f.UNAUTHENTICATED:return F.UNAUTHENTICATED;case f.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case f.NOT_FOUND:return F.NOT_FOUND;case f.ALREADY_EXISTS:return F.ALREADY_EXISTS;case f.PERMISSION_DENIED:return F.PERMISSION_DENIED;case f.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case f.ABORTED:return F.ABORTED;case f.OUT_OF_RANGE:return F.OUT_OF_RANGE;case f.UNIMPLEMENTED:return F.UNIMPLEMENTED;case f.DATA_LOSS:return F.DATA_LOSS;default:return M(39323,{code:e})}}(p=f||(f={}))[p.OK=0]="OK",p[p.CANCELLED=1]="CANCELLED",p[p.UNKNOWN=2]="UNKNOWN",p[p.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",p[p.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",p[p.NOT_FOUND=5]="NOT_FOUND",p[p.ALREADY_EXISTS=6]="ALREADY_EXISTS",p[p.PERMISSION_DENIED=7]="PERMISSION_DENIED",p[p.UNAUTHENTICATED=16]="UNAUTHENTICATED",p[p.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",p[p.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",p[p.ABORTED=10]="ABORTED",p[p.OUT_OF_RANGE=11]="OUT_OF_RANGE",p[p.UNIMPLEMENTED=12]="UNIMPLEMENTED",p[p.INTERNAL=13]="INTERNAL",p[p.UNAVAILABLE=14]="UNAVAILABLE",p[p.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rE=new n([4294967295,4294967295],0);function rI(e){let t=(new TextEncoder).encode(e),r=new i;return r.update(t),new Uint8Array(r.digest())}function rb(e){let t=new DataView(e.buffer),r=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),a=t.getUint32(12,!0);return[new n([r,i],0),new n([s,a],0)]}class rT{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new rS(`Invalid padding: ${t}`);if(r<0||e.length>0&&0===this.hashCount)throw new rS(`Invalid hash count: ${r}`);if(0===e.length&&0!==t)throw new rS(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=n.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(n.fromNumber(r)));return 1===i.compare(rE)&&(i=new n([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;let[t,r]=rb(rI(e));for(let e=0;e<this.hashCount;e++){let n=this.ye(t,r,e);if(!this.we(n))return!1}return!0}static create(e,t,r){let n=new rT(new Uint8Array(Math.ceil(e/8)),e%8==0?0:8-e%8,t);return r.forEach(e=>n.insert(e)),n}insert(e){if(0===this.ge)return;let[t,r]=rb(rI(e));for(let e=0;e<this.hashCount;e++){let n=this.ye(t,r,e);this.Se(n)}}Se(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class rS extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rC{constructor(e,t,r,n,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=n,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let n=new Map;return n.set(e,rA.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new rC(em.min(),n,new ek(Y),t$,tY())}}class rA{constructor(e,t,r,n,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=n,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new rA(r,t,tY(),tY(),tY())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rk{constructor(e,t,r,n){this.be=e,this.removedTargetIds=t,this.key=r,this.De=n}}class rR{constructor(e,t){this.targetId=e,this.Ce=t}}class rN{constructor(e,t,r=ex.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=n}}class rO{constructor(){this.ve=0,this.Fe=rL(),this.Me=ex.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=tY(),t=tY(),r=tY();return this.Fe.forEach((n,i)=>{switch(i){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:r=r.add(n);break;default:M(38017,{changeType:i})}}),new rA(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=rL()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,V(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class rD{constructor(e){this.Ge=e,this.ze=new Map,this.je=t$,this.Je=rP(),this.He=rP(),this.Ye=new ek(Y)}Ze(e){for(let t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(let t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{let r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:M(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,r)=>{this.rt(r)&&t(r)})}st(e){let t=e.targetId,r=e.Ce.count,n=this.ot(t);if(n){let i=n.target;if(tN(i)){if(0===r){let e=new ea(i.path);this.et(t,e,tl.newNoDocument(e,em.min()))}else V(1===r,20013,{expectedCount:r})}else{let n=this._t(t);if(n!==r){let r=this.ut(e),i=r?this.ct(r,e,n):1;0!==i&&(this.it(t),this.Ye=this.Ye.insert(t,2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch"))}}}}ut(e){let t,r;let n=e.Ce.unchangedNames;if(!n||!n.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=n;try{t=eF(i).toUint8Array()}catch(e){if(e instanceof eL)return L("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{r=new rT(t,s,a)}catch(e){return L(e instanceof rS?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===r.ge?null:r}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){let r=this.Ge.getRemoteKeysForTarget(t),n=0;return r.forEach(r=>{let i=this.Ge.ht(),s=`projects/${i.projectId}/databases/${i.database}/documents/${r.path.canonicalString()}`;e.mightContain(s)||(this.et(t,r,null),n++)}),n}Tt(e){let t=new Map;this.ze.forEach((r,n)=>{let i=this.ot(n);if(i){if(r.current&&tN(i.target)){let t=new ea(i.target.path);this.It(t).has(n)||this.Et(n,t)||this.et(n,t,tl.newNoDocument(t,e))}r.Be&&(t.set(n,r.ke()),r.qe())}});let r=tY();this.He.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{let t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(n=!1,!1)}),n&&(r=r.add(e))}),this.je.forEach((t,r)=>r.setReadTime(e));let n=new rC(e,t,this.Ye,this.je,r);return this.je=t$,this.Je=rP(),this.He=rP(),this.Ye=new ek(Y),n}Xe(e,t){if(!this.rt(e))return;let r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;let n=this.nt(e);this.Et(e,t)?n.Qe(t,1):n.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){let t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new rO,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new eO(Y),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new eO(Y),this.Je=this.Je.insert(e,t)),t}rt(e){let t=null!==this.ot(e);return t||D("WatchChangeAggregator","Detected inactive target",e),t}ot(e){let t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new rO),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function rP(){return new ek(ea.comparator)}function rL(){return new ek(ea.comparator)}let rx={asc:"ASCENDING",desc:"DESCENDING"},rM={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},rU={and:"AND",or:"OR"};class rV{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function rF(e,t){return e.useProto3Json||null==t?t:{value:t}}function rB(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function rj(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function rq(e){return V(!!e,49232),em.fromTimestamp(function(e){let t=eU(e);return new eg(t.seconds,t.nanos)}(e))}function rz(e,t){return r$(e,t).canonicalString()}function r$(e,t){let r=new en(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?r:r.child(t)}function rK(e){let t=en.fromString(e);return V(r0(t),10190,{key:t.toString()}),t}function rH(e,t){return rz(e.databaseId,t.path)}function rG(e,t){let r=rK(t);if(r.get(1)!==e.databaseId.projectId)throw new B(F.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new B(F.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new ea(rX(r))}function rW(e,t){return rz(e.databaseId,t)}function rQ(e){return new en(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function rX(e){return V(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function rY(e,t,r){return{name:rH(e,t),fields:r.value.mapValue.fields}}function rJ(e){return{fieldPath:e.canonicalString()}}function rZ(e){return es.fromServerFormat(e.fieldPath)}function r0(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r1{constructor(e,t,r,n,i=em.min(),s=em.min(),a=ex.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=n,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new r1(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new r1(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new r1(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new r1(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r2{constructor(e){this.yt=e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r4{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(eV(e.integerValue));else if("doubleValue"in e){let r=eV(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),eT(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),"string"==typeof r&&(r=eU(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(eF(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?ta(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):ti(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Qt(e.arrayValue,t),this.Nt(t)):M(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){let r=e.fields||{};for(let e of(this.Ft(t,55),Object.keys(r)))this.Ot(e,t),this.Ct(r[e],t)}kt(e,t){let r=e.fields||{};this.Ft(t,53);let n=r[e0].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(eV(n)),this.Ot(e0,t),this.Ct(r[e0],t)}Qt(e,t){let r=e.values||[];for(let e of(this.Ft(t,50),r))this.Ct(e,t)}Lt(e,t){this.Ft(t,37),ea.fromName(e).path.forEach(e=>{this.Ft(t,60),this.Ut(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}r4.Kt=new r4;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r6{constructor(){this.Cn=new r9}addToCollectionParentIndex(e,t){return this.Cn.add(t),eE.resolve()}getCollectionParents(e,t){return eE.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return eE.resolve()}deleteFieldIndex(e,t){return eE.resolve()}deleteAllFieldIndexes(e){return eE.resolve()}createTargetIndexes(e,t){return eE.resolve()}getDocumentsMatchingTarget(e,t){return eE.resolve(null)}getIndexType(e,t){return eE.resolve(0)}getFieldIndexes(e,t){return eE.resolve([])}getNextCollectionGroupToUpdate(e){return eE.resolve(null)}getMinOffset(e,t){return eE.resolve(ev.min())}getMinOffsetFromCollectionGroup(e,t){return eE.resolve(ev.min())}updateCollectionGroup(e,t,r){return eE.resolve()}updateIndexEntries(e,t){return eE.resolve()}}class r9{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t]||new eO(en.comparator),i=!n.has(r);return this.index[t]=n.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t];return n&&n.has(r)}getEntries(e){return(this.index[e]||new eO(en.comparator)).toArray()}}new Uint8Array(0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r5={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class r3{static withCacheSize(e){return new r3(e,r3.DEFAULT_COLLECTION_PERCENTILE,r3.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */r3.DEFAULT_COLLECTION_PERCENTILE=10,r3.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,r3.DEFAULT=new r3(41943040,r3.DEFAULT_COLLECTION_PERCENTILE,r3.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),r3.DISABLED=new r3(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r7{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new r7(0)}static cr(){return new r7(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r8="LruGarbageCollector";function ne([e,t],[r,n]){let i=Y(e,r);return 0===i?Y(t,n):i}class nt{constructor(e){this.Ir=e,this.buffer=new eO(ne),this.Er=0}dr(){return++this.Er}Ar(e){let t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{let e=this.buffer.last();0>ne(t,e)&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class nr{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(e){D(r8,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){eI(e)?D(r8,"Ignoring IndexedDB error during garbage collection: ",e):await e_(e)}await this.Vr(3e5)})}}class nn{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return eE.resolve(eb.ce);let r=new nt(t);return this.mr.forEachTarget(e,e=>r.Ar(e.sequenceNumber)).next(()=>this.mr.pr(e,e=>r.Ar(e))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return -1===this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector","Garbage collection skipped; disabled"),eE.resolve(r5)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),r5):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,n,i,s,a,o,l;let u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),n=this.params.maximumSequenceNumbersToCollect):n=t,s=Date.now(),this.nthSequenceNumber(e,n))).next(n=>(r=n,a=Date.now(),this.removeTargets(e,r,t))).next(t=>(i=t,o=Date.now(),this.removeOrphanedDocuments(e,r))).next(e=>(l=Date.now(),O()<=w.in.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-u}ms
	Determined least recently used ${n} in `+(a-s)+"ms\n"+`	Removed ${i} targets in `+(o-a)+"ms\n"+`	Removed ${e} documents in `+(l-o)+"ms\n"+`Total Duration: ${l-u}ms`),eE.resolve({didRun:!0,sequenceNumbersCollected:n,targetsRemoved:i,documentsRemoved:e})))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(){this.changes=new tz(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,tl.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return void 0!==r?eE.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e,t,r,n){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=n}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(n=>(r=n,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==r&&ro(r.mutation,e,eP.empty(),eg.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,tY()).next(()=>t))}getLocalViewOfDocuments(e,t,r=tY()){let n=tW();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,r).next(e=>{let t=tH();return e.forEach((e,r)=>{t=t.insert(e,r.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let r=tW();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,tY()))}populateOverlays(e,t,r){let n=[];return r.forEach(e=>{t.has(e)||n.push(e)}),this.documentOverlayCache.getOverlays(e,n).next(e=>{e.forEach((e,r)=>{t.set(e,r)})})}computeViews(e,t,r,n){let i=t$,s=tW(),a=tW();return t.forEach((e,t)=>{let a=r.get(t.key);n.has(t.key)&&(void 0===a||a.mutation instanceof rh)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),ro(a.mutation,t,a.mutation.getFieldMask(),eg.now())):s.set(t.key,eP.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>a.set(e,new ns(t,s.get(e)??null))),a))}recalculateAndSaveOverlays(e,t){let r=tW(),n=new ek((e,t)=>e-t),i=tY();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=r.get(e)||eP.empty();a=i.applyToLocalView(s,a),r.set(e,a);let o=(n.get(i.batchId)||tY()).add(e);n=n.insert(i.batchId,o)})}).next(()=>{let s=[],a=n.getReverseIterator();for(;a.hasNext();){let n=a.getNext(),o=n.key,l=n.value,u=tW();l.forEach(e=>{if(!i.has(e)){let n=ra(t.get(e),r.get(e));null!==n&&u.set(e,n),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,u))}return eE.waitFor(s)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,r,n){return ea.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):tP(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,n):this.getDocumentsMatchingCollectionQuery(e,t,r,n)}getNextDocuments(e,t,r,n){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,n).next(i=>{let s=n-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,n-i.size):eE.resolve(tW()),a=-1,o=i;return s.next(t=>eE.forEach(t,(t,r)=>(a<r.largestBatchId&&(a=r.largestBatchId),i.get(t)?eE.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,tY())).next(e=>({batchId:a,changes:tG(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ea(t)).next(e=>{let t=tH();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,r,n){let i=t.collectionGroup,s=tH();return this.indexManager.getCollectionParents(e,i).next(a=>eE.forEach(a,a=>{let o=new tO(a.child(i),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,o,r,n).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,r,n){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,n))).next(e=>{i.forEach((t,r)=>{let n=r.getKey();null===e.get(n)&&(e=e.insert(n,tl.newInvalidDocument(n)))});let r=tH();return e.forEach((e,n)=>{let s=i.get(e);void 0!==s&&ro(s.mutation,n,eP.empty(),eg.now()),tj(t,n)&&(r=r.insert(e,n))}),r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return eE.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,{id:t.id,version:t.version,createTime:rq(t.createTime)}),eE.resolve()}getNamedQuery(e,t){return eE.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,{name:t.name,query:function(e){let t=function(e){var t;let r,n=function(e){let t=rK(e);return 4===t.length?en.emptyPath():rX(t)}(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,a=null;if(s>0){V(1===s,65062);let e=i.from[0];e.allDescendants?a=e.collectionId:n=n.child(e.collectionId)}let o=[];i.where&&(o=function(e){var t;let r=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=rZ(e.unaryFilter.field);return tp.create(t,"==",{doubleValue:NaN});case"IS_NULL":let r=rZ(e.unaryFilter.field);return tp.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let n=rZ(e.unaryFilter.field);return tp.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=rZ(e.unaryFilter.field);return tp.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(t):void 0!==t.fieldFilter?tp.create(rZ(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?tg.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(t.compositeFilter.op)):M(30097,{filter:t})}(e);return r instanceof tg&&ty(t=r)&&tm(t)?r.getFilters():[r]}(i.where));let l=[];i.orderBy&&(l=i.orderBy.map(e=>new td(rZ(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let u=null;i.limit&&(u=null==(r="object"==typeof(t=i.limit)?t.value:t)?null:r);let h=null;i.startAt&&(h=function(e){let t=!!e.before;return new tu(e.values||[],t)}(i.startAt));let c=null;return i.endAt&&(c=function(e){let t=!e.before;return new tu(e.values||[],t)}(i.endAt)),new tO(n,a,l,o,u,"F",h,c)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?tU(t,t.limit,"L"):t}(t.bundledQuery),readTime:rq(t.readTime)}),eE.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(){this.overlays=new ek(ea.comparator),this.qr=new Map}getOverlay(e,t){return eE.resolve(this.overlays.get(t))}getOverlays(e,t){let r=tW();return eE.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((r,n)=>{this.St(e,t,n)}),eE.resolve()}removeOverlaysForBatchId(e,t,r){let n=this.qr.get(r);return void 0!==n&&(n.forEach(e=>this.overlays=this.overlays.remove(e)),this.qr.delete(r)),eE.resolve()}getOverlaysForCollection(e,t,r){let n=tW(),i=t.length+1,s=new ea(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>r&&n.set(e.getKey(),e)}return eE.resolve(n)}getOverlaysForCollectionGroup(e,t,r,n){let i=new ek((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>r){let t=i.get(e.largestBatchId);null===t&&(t=tW(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=tW(),o=i.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=n)););return eE.resolve(a)}St(e,t,r){let n=this.overlays.get(r.key);if(null!==n){let e=this.qr.get(n.largestBatchId).delete(r.key);this.qr.set(n.largestBatchId,e)}this.overlays=this.overlays.insert(r.key,new rv(t,r));let i=this.qr.get(t);void 0===i&&(i=tY(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(){this.sessionToken=ex.EMPTY_BYTE_STRING}getSessionToken(e){return eE.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,eE.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(){this.Qr=new eO(nc.$r),this.Ur=new eO(nc.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){let r=new nc(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Gr(new nc(e,t))}zr(e,t){e.forEach(e=>this.removeReference(e,t))}jr(e){let t=new ea(new en([])),r=new nc(t,e),n=new nc(t,e+1),i=[];return this.Ur.forEachInRange([r,n],e=>{this.Gr(e),i.push(e.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){let t=new ea(new en([])),r=new nc(t,e),n=new nc(t,e+1),i=tY();return this.Ur.forEachInRange([r,n],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new nc(e,0),r=this.Qr.firstAfterOrEqual(t);return null!==r&&e.isEqual(r.key)}}class nc{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return ea.comparator(e.key,t.key)||Y(e.Yr,t.Yr)}static Kr(e,t){return Y(e.Yr,t.Yr)||ea.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new eO(nc.$r)}checkEmpty(e){return eE.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,r,n){let i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new rm(i,t,r,n);for(let t of(this.mutationQueue.push(s),n))this.Zr=this.Zr.add(new nc(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return eE.resolve(s)}lookupMutationBatch(e,t){return eE.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){let r=this.ei(t+1),n=r<0?0:r;return eE.resolve(this.mutationQueue.length>n?this.mutationQueue[n]:null)}getHighestUnacknowledgedBatchId(){return eE.resolve(0===this.mutationQueue.length?-1:this.tr-1)}getAllMutationBatches(e){return eE.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new nc(t,0),n=new nc(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,n],e=>{let t=this.Xr(e.Yr);i.push(t)}),eE.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new eO(Y);return t.forEach(e=>{let t=new nc(e,0),n=new nc(e,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([t,n],e=>{r=r.add(e.Yr)})}),eE.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,n=r.length+1,i=r;ea.isDocumentKey(i)||(i=i.child(""));let s=new nc(new ea(i),0),a=new eO(Y);return this.Zr.forEachWhile(e=>{let t=e.key.path;return!!r.isPrefixOf(t)&&(t.length===n&&(a=a.add(e.Yr)),!0)},s),eE.resolve(this.ti(a))}ti(e){let t=[];return e.forEach(e=>{let r=this.Xr(e);null!==r&&t.push(r)}),t}removeMutationBatch(e,t){V(0===this.ni(t.batchId,"removed"),55003),this.mutationQueue.shift();let r=this.Zr;return eE.forEach(t.mutations,n=>{let i=new nc(n.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){let r=new nc(t,0),n=this.Zr.firstAfterOrEqual(r);return eE.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.mutationQueue.length,eE.resolve()}ni(e,t){return this.ei(e)}ei(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Xr(e){let t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e){this.ri=e,this.docs=new ek(ea.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,n=this.docs.get(r),i=n?n.size:0,s=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return eE.resolve(r?r.document.mutableCopy():tl.newInvalidDocument(t))}getEntries(e,t){let r=t$;return t.forEach(e=>{let t=this.docs.get(e);r=r.insert(e,t?t.document.mutableCopy():tl.newInvalidDocument(e))}),eE.resolve(r)}getDocumentsMatchingQuery(e,t,r,n){let i=t$,s=t.path,a=new ea(s.child("__id-9223372036854775808__")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){let{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=function(e,t){let r=e.readTime.compareTo(t.readTime);return 0!==r?r:0!==(r=ea.comparator(e.documentKey,t.documentKey))?r:Y(e.largestBatchId,t.largestBatchId)}(new ev(a.readTime,a.key,-1),r)||(n.has(a.key)||tj(t,a))&&(i=i.insert(a.key,a.mutableCopy()))}return eE.resolve(i)}getAllFromCollectionGroup(e,t,r,n){M(9500)}ii(e,t){return eE.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new np(this)}getSize(e){return eE.resolve(this.size)}}class np extends ni{constructor(e){super(),this.Nr=e}applyChanges(e){let t=[];return this.changes.forEach((r,n)=>{n.isValidDocument()?t.push(this.Nr.addEntry(e,n)):this.Nr.removeEntry(r)}),eE.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e){this.persistence=e,this.si=new tz(e=>tk(e),tR),this.lastRemoteSnapshotVersion=em.min(),this.highestTargetId=0,this.oi=0,this._i=new nh,this.targetCount=0,this.ai=r7.ur()}forEachTarget(e,t){return this.si.forEach((e,r)=>t(r)),eE.resolve()}getLastRemoteSnapshotVersion(e){return eE.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return eE.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),eE.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),eE.resolve()}Pr(e){this.si.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.ai=new r7(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,eE.resolve()}updateTargetData(e,t){return this.Pr(t),eE.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,eE.resolve()}removeTargets(e,t,r){let n=0,i=[];return this.si.forEach((s,a)=>{a.sequenceNumber<=t&&null===r.get(a.targetId)&&(this.si.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),n++)}),eE.waitFor(i).next(()=>n)}getTargetCount(e){return eE.resolve(this.targetCount)}getTargetData(e,t){let r=this.si.get(t)||null;return eE.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),eE.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);let n=this.persistence.referenceDelegate,i=[];return n&&t.forEach(t=>{i.push(n.markPotentiallyOrphaned(e,t))}),eE.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),eE.resolve()}getMatchingKeysForTargetId(e,t){let r=this._i.Hr(t);return eE.resolve(r)}containsKey(e,t){return eE.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e,t){this.ui={},this.overlays={},this.ci=new eb(0),this.li=!1,this.li=!0,this.hi=new nu,this.referenceDelegate=e(this),this.Pi=new ng(this),this.indexManager=new r6,this.remoteDocumentCache=new nf(e=>this.referenceDelegate.Ti(e)),this.serializer=new r2(t),this.Ii=new no(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new nl,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new nd(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){D("MemoryPersistence","Starting transaction:",e);let n=new ny(this.ci.next());return this.referenceDelegate.Ei(),r(n).next(e=>this.referenceDelegate.di(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}Ai(e,t){return eE.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class ny extends ew{constructor(e){super(),this.currentSequenceNumber=e}}class nv{constructor(e){this.persistence=e,this.Ri=new nh,this.Vi=null}static mi(e){return new nv(e)}get fi(){if(this.Vi)return this.Vi;throw M(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),eE.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),eE.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),eE.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(e=>this.fi.add(e.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.fi.add(e.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return eE.forEach(this.fi,r=>{let n=ea.fromPath(r);return this.gi(e,n).next(e=>{e||t.removeEntry(n,em.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return eE.or([()=>eE.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class nw{constructor(e,t){this.persistence=e,this.pi=new tz(e=>(function(e){let t="";for(let r=0;r<e.length;r++)t.length>0&&(t+="\x01\x01"),t=function(e,t){let r=t,n=e.length;for(let t=0;t<n;t++){let n=e.charAt(t);switch(n){case"\0":r+="\x01\x10";break;case"\x01":r+="\x01\x11";break;default:r+=n}}return r}(e.get(r),t);return t+"\x01\x01"})(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=new nn(this,t)}static mi(e,t){return new nw(e,t)}Ei(){}di(e){return eE.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){let t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}pr(e,t){return eE.forEach(this.pi,(r,n)=>this.br(e,r,n).next(e=>e?eE.resolve():t(n)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,n=this.persistence.getRemoteDocumentCache(),i=n.newChangeBuffer();return n.ii(e,n=>this.br(e,n,t).next(e=>{e||(r++,i.removeEntry(n,em.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),eE.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),eE.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),eE.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),eE.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=function e(t){switch(e1(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let r=eK(t);return r?16+e(r):16;case 5:return 2*t.stringValue.length;case 6:return eF(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,r)=>t+e(r),0);case 10:case 11:var n;let i;return n=t.mapValue,i=0,eC(n.fields,(t,r)=>{i+=t.length+e(r)}),i;default:throw M(13486,{value:t})}}(e.data.value)),t}br(e,t,r){return eE.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let e=this.pi.get(t);return eE.resolve(void 0!==e&&e>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,t,r,n){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=n}static As(e,t){let r=tY(),n=tY();for(let e of t.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new n_(e,t.fromCache,r,n)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(0,_.G6)()?8:function(e){let t=e.match(/Android ([\d.]+)/i);return Number(t?t[1].split(".").slice(0,2).join("."):"-1")}((0,_.z$)())>0?6:4}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,n){let i={result:null};return this.ys(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.ws(e,t,n,r).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let r=new nE;return this.Ss(e,t,r).next(n=>{if(i.result=n,this.Vs)return this.bs(e,t,r,n.size)})}).next(()=>i.result)}bs(e,t,r,n){return r.documentReadCount<this.fs?(O()<=w.in.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",tB(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),eE.resolve()):(O()<=w.in.DEBUG&&D("QueryEngine","Query:",tB(t),"scans",r.documentReadCount,"local documents and returns",n,"documents as results."),r.documentReadCount>this.gs*n?(O()<=w.in.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",tB(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tx(t))):eE.resolve())}ys(e,t){if(tD(t))return eE.resolve(null);let r=tx(t);return this.indexManager.getIndexType(e,r).next(n=>0===n?null:(null!==t.limit&&1===n&&(r=tx(t=tU(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,r).next(n=>{let i=tY(...n);return this.ps.getDocuments(e,i).next(n=>this.indexManager.getMinOffset(e,r).next(r=>{let s=this.Ds(t,n);return this.Cs(t,s,i,r.readTime)?this.ys(e,tU(t,null,"F")):this.vs(e,s,t,r)}))})))}ws(e,t,r,n){return tD(t)||n.isEqual(em.min())?eE.resolve(null):this.ps.getDocuments(e,r).next(i=>{let s=this.Ds(t,i);return this.Cs(t,s,r,n)?eE.resolve(null):(O()<=w.in.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),tB(t)),this.vs(e,s,t,function(e,t){let r=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1;return new ev(em.fromTimestamp(1e9===n?new eg(r+1,0):new eg(r,n)),ea.empty(),-1)}(n,0)).next(e=>e))})}Ds(e,t){let r=new eO(tq(e));return t.forEach((t,n)=>{tj(e,n)&&(r=r.add(n))}),r}Cs(e,t,r,n){if(null===e.limit)return!1;if(r.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(n)>0)}Ss(e,t,r){return O()<=w.in.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",tB(t)),this.ps.getDocumentsMatchingQuery(e,t,ev.min(),r)}vs(e,t,r,n){return this.ps.getDocumentsMatchingQuery(e,r,n).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nb="LocalStore";class nT{constructor(e,t,r,n){this.persistence=e,this.Fs=t,this.serializer=n,this.Ms=new ek(Y),this.xs=new tz(e=>tk(e),tR),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new na(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}async function nS(e,t){return await e.persistence.runTransaction("Handle user change","readonly",r=>{let n;return e.mutationQueue.getAllMutationBatches(r).next(i=>(n=i,e.Bs(t),e.mutationQueue.getAllMutationBatches(r))).next(t=>{let i=[],s=[],a=tY();for(let e of n)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(r,a).next(e=>({Ls:e,removedBatchIds:i,addedBatchIds:s}))})})}function nC(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}async function nA(e,t,r){let n=e.Ms.get(t);try{r||await e.persistence.runTransaction("Release target",r?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,n))}catch(e){if(!eI(e))throw e;D(nb,`Failed to update sequence numbers for target ${t}: ${e}`)}e.Ms=e.Ms.remove(t),e.xs.delete(n.target)}function nk(e,t,r){let n=em.min(),i=tY();return e.persistence.runTransaction("Execute query","readwrite",s=>(function(e,t,r){let n=e.xs.get(r);return void 0!==n?eE.resolve(e.Ms.get(n)):e.Pi.getTargetData(t,r)})(e,s,tx(t)).next(t=>{if(t)return n=t.lastLimboFreeSnapshotVersion,e.Pi.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.Fs.getDocumentsMatchingQuery(s,t,r?n:em.min(),r?i:tY())).next(r=>{var n;let s;return n=t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2)),s=e.Os.get(n)||em.min(),r.forEach((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)}),e.Os.set(n,s),{documents:r,Qs:i}}))}class nR{constructor(){this.activeTargetIds=tJ}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class nN{constructor(){this.Mo=new nR,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new nR,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nO{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nD="ConnectivityMonitor";class nP{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){for(let e of(D(nD,"Network connectivity changed: AVAILABLE"),this.qo))e(0)}ko(){for(let e of(D(nD,"Network connectivity changed: UNAVAILABLE"),this.qo))e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nL=null;function nx(){return null===nL?nL=268435456+Math.round(2147483648*Math.random()):nL++,"0x"+nL.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nM="RestConnection",nU={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class nV{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),n=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${n}`,this.Wo=this.databaseId.database===eW?`project_id=${r}`:`project_id=${r}&database_id=${n}`}Go(e,t,r,n,i){let s=nx(),a=this.zo(e,t.toUriEncodedString());D(nM,`Sending RPC '${e}' ${s}:`,a,r);let o={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(o,n,i);let{host:l}=new URL(a),u=(0,_.Xx)(l);return this.Jo(e,a,o,r,u).then(t=>(D(nM,`Received RPC '${e}' ${s}: `,t),t),t=>{throw L(nM,`RPC '${e}' ${s} failed with error: `,t,"url: ",a,"request:",r),t})}Ho(e,t,r,n,i,s){return this.Go(e,t,r,n,i)}jo(e,t,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+R,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}zo(e,t){let r=nU[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nF{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nB="WebChannelConnection";class nj extends nV{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,n,i){let a=nx();return new Promise((i,u)=>{let h=new s;h.setWithCredentials(!0),h.listenOnce(o.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case l.NO_ERROR:let t=h.getResponseJson();D(nB,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(t)),i(t);break;case l.TIMEOUT:D(nB,`RPC '${e}' ${a} timed out`),u(new B(F.DEADLINE_EXCEEDED,"Request time out"));break;case l.HTTP_ERROR:let r=h.getStatus();if(D(nB,`RPC '${e}' ${a} failed with status:`,r,"response text:",h.getResponseText()),r>0){let e=h.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=e?.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf(t)>=0?t:F.UNKNOWN}(t.status);u(new B(e,t.message))}else u(new B(F.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new B(F.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:e,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{D(nB,`RPC '${e}' ${a} completed.`)}});let c=JSON.stringify(n);D(nB,`RPC '${e}' ${a} sending request:`,n),h.send(t,"POST",c,r,15)})}T_(e,t,r){let n=nx(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=d(),o=c(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},p=this.longPollingOptions.timeoutSeconds;void 0!==p&&(l.longPollingTimeout=Math.round(1e3*p)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let g=i.join("");D(nB,`Creating RPC '${e}' stream ${n}: ${g}`,l);let m=s.createWebChannel(g,l);this.I_(m);let y=!1,v=!1,w=new nF({Yo:t=>{v?D(nB,`Not sending because RPC '${e}' stream ${n} is closed:`,t):(y||(D(nB,`Opening RPC '${e}' stream ${n} transport.`),m.open(),y=!0),D(nB,`RPC '${e}' stream ${n} sending:`,t),m.send(t))},Zo:()=>m.close()}),_=(e,t,r)=>{e.listen(t,e=>{try{r(e)}catch(e){setTimeout(()=>{throw e},0)}})};return _(m,a.EventType.OPEN,()=>{v||(D(nB,`RPC '${e}' stream ${n} transport opened.`),w.o_())}),_(m,a.EventType.CLOSE,()=>{v||(v=!0,D(nB,`RPC '${e}' stream ${n} transport closed`),w.a_(),this.E_(m))}),_(m,a.EventType.ERROR,t=>{v||(v=!0,L(nB,`RPC '${e}' stream ${n} transport errored. Name:`,t.name,"Message:",t.message),w.a_(new B(F.UNAVAILABLE,"The operation could not be completed")))}),_(m,a.EventType.MESSAGE,t=>{if(!v){let r=t.data[0];V(!!r,16349);let i=r?.error||r[0]?.error;if(i){D(nB,`RPC '${e}' stream ${n} received error:`,i);let t=i.status,r=function(e){let t=f[e];if(void 0!==t)return r_(t)}(t),s=i.message;void 0===r&&(r=F.INTERNAL,s="Unknown error status: "+t+" with message "+i.message),v=!0,w.a_(new B(r,s)),m.close()}else D(nB,`RPC '${e}' stream ${n} received:`,r),w.u_(r)}}),_(o,h.STAT_EVENT,t=>{t.stat===u.PROXY?D(nB,`RPC '${e}' stream ${n} detected buffering proxy`):t.stat===u.NOPROXY&&D(nB,`RPC '${e}' stream ${n} detected no buffering proxy`)}),setTimeout(()=>{w.__()},0),w}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function nq(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nz(e){return new rV(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n${constructor(e,t,r=1e3,n=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=n,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();let t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),n=Math.max(0,t-r);n>0&&D("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,n,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nK="PersistentStream";class nH{constructor(e,t,r,n,i,s,a,o){this.Mi=e,this.S_=r,this.b_=n,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new n$(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===F.RESOURCE_EXHAUSTED?(P(t.toString()),P("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===F.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;let e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,r])=>{this.D_===t&&this.G_(e,r)},t=>{e(()=>{let e=new B(F.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){let r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(e=>{r(()=>this.z_(e))}),this.stream.onMessage(e=>{r(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return D(nK,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(D(nK,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class nG extends nH{constructor(e,t,r,n,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();let t=function(e,t){let r;if("targetChange"in t){var n,i;t.targetChange;let s="NO_CHANGE"===(n=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===n?1:"REMOVE"===n?2:"CURRENT"===n?3:"RESET"===n?4:M(39313,{state:n}),a=t.targetChange.targetIds||[],o=(i=t.targetChange.resumeToken,e.useProto3Json?(V(void 0===i||"string"==typeof i,58123),ex.fromBase64String(i||"")):(V(void 0===i||i instanceof S||i instanceof Uint8Array,16193),ex.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause;r=new rN(s,a,o,l&&new B(void 0===l.code?F.UNKNOWN:r_(l.code),l.message||"")||null)}else if("documentChange"in t){t.documentChange;let n=t.documentChange;n.document,n.document.name,n.document.updateTime;let i=rG(e,n.document.name),s=rq(n.document.updateTime),a=n.document.createTime?rq(n.document.createTime):em.min(),o=new to({mapValue:{fields:n.document.fields}}),l=tl.newFoundDocument(i,s,a,o);r=new rk(n.targetIds||[],n.removedTargetIds||[],l.key,l)}else if("documentDelete"in t){t.documentDelete;let n=t.documentDelete;n.document;let i=rG(e,n.document),s=n.readTime?rq(n.readTime):em.min(),a=tl.newNoDocument(i,s);r=new rk([],n.removedTargetIds||[],a.key,a)}else if("documentRemove"in t){t.documentRemove;let n=t.documentRemove;n.document;let i=rG(e,n.document);r=new rk([],n.removedTargetIds||[],i,null)}else{if(!("filter"in t))return M(11601,{Rt:t});{t.filter;let e=t.filter;e.targetId;let{count:n=0,unchangedNames:i}=e,s=new rw(n,i);r=new rR(e.targetId,s)}}return r}(this.serializer,e),r=function(e){if(!("targetChange"in e))return em.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?em.min():t.readTime?rq(t.readTime):em.min()}(e);return this.listener.H_(t,r)}Y_(e){let t={};t.database=rQ(this.serializer),t.addTarget=function(e,t){let r;let n=t.target;if((r=tN(n)?{documents:{documents:[rW(e,n.path)]}}:{query:function(e,t){var r,n;let i;let s={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i=a,s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=a.popLast(),s.structuredQuery.from=[{collectionId:a.lastSegment()}]),s.parent=rW(e,i);let o=function(e){if(0!==e.length)return function e(t){return t instanceof tp?function(e){if("=="===e.op){if(tr(e.value))return{unaryFilter:{field:rJ(e.field),op:"IS_NAN"}};if(tt(e.value))return{unaryFilter:{field:rJ(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(tr(e.value))return{unaryFilter:{field:rJ(e.field),op:"IS_NOT_NAN"}};if(tt(e.value))return{unaryFilter:{field:rJ(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rJ(e.field),op:rM[e.op],value:e.value}}}(t):t instanceof tg?function(t){let r=t.getFilters().map(t=>e(t));return 1===r.length?r[0]:{compositeFilter:{op:rU[t.op],filters:r}}}(t):M(54877,{filter:t})}(tg.create(e,"and"))}(t.filters);o&&(s.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:rJ(e.field),direction:rx[e.dir]}))}(t.orderBy);l&&(s.structuredQuery.orderBy=l);let u=rF(e,t.limit);return null!==u&&(s.structuredQuery.limit=u),t.startAt&&(s.structuredQuery.startAt={before:(r=t.startAt).inclusive,values:r.position}),t.endAt&&(s.structuredQuery.endAt={before:!(n=t.endAt).inclusive,values:n.position}),{ft:s,parent:i}}(e,n).ft}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){r.resumeToken=rj(e,t.resumeToken);let n=rF(e,t.expectedCount);null!==n&&(r.expectedCount=n)}else if(t.snapshotVersion.compareTo(em.min())>0){r.readTime=rB(e,t.snapshotVersion.toTimestamp());let n=rF(e,t.expectedCount);null!==n&&(r.expectedCount=n)}return r}(this.serializer,e);let r=function(e,t){let r=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:e})}}(t.purpose);return null==r?null:{"goog-listen-tags":r}}(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){let t={};t.database=rQ(this.serializer),t.removeTarget=e,this.q_(t)}}class nW extends nH{constructor(e,t,r,n,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return V(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,V(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){var t,r;V(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();let n=(t=e.writeResults,r=e.commitTime,t&&t.length>0?(V(void 0!==r,14353),t.map(e=>{let t;return(t=e.updateTime?rq(e.updateTime):rq(r)).isEqual(em.min())&&(t=rq(r)),new rr(t,e.transformResults||[])})):[]),i=rq(e.commitTime);return this.listener.na(i,n)}ra(){let e={};e.database=rQ(this.serializer),this.q_(e)}ea(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>(function(e,t){var r;let n;if(t instanceof ru)n={update:rY(e,t.key,t.value)};else if(t instanceof rp)n={delete:rH(e,t.key)};else if(t instanceof rh)n={update:rY(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof rg))return M(16599,{Vt:t.type});n={verify:rH(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let r=t.transform;if(r instanceof t4)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof t6)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof t5)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof t7)return{fieldPath:t.field.canonicalString(),increment:r.Ae};throw M(20930,{transform:t.transform})})(0,e))),t.precondition.isNone||(n.currentDocument=void 0!==(r=t.precondition).updateTime?{updateTime:rB(e,r.updateTime.toTimestamp())}:void 0!==r.exists?{exists:r.exists}:M(27497)),n})(this.serializer,e))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nQ{}class nX extends nQ{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=n,this.ia=!1}sa(){if(this.ia)throw new B(F.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,n){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Go(e,r$(t,r),n,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new B(F.UNKNOWN,e.toString())})}Ho(e,t,r,n,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Ho(e,r$(t,r),n,s,a,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new B(F.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class nY{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(P(t),this.aa=!1):D("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nJ="RemoteStore";class nZ{constructor(e,t,r,n,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(e=>{r.enqueueAndForget(async()=>{n7(this)&&(D(nJ,"Restarting streams for network reachability change."),await async function(e){e.Ea.add(4),await n1(e),e.Ra.set("Unknown"),e.Ea.delete(4),await n0(e)}(this))})}),this.Ra=new nY(r,n)}}async function n0(e){if(n7(e))for(let t of e.da)await t(!0)}async function n1(e){for(let t of e.da)await t(!1)}function n2(e,t){e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),n3(e)?n5(e):im(e).O_()&&n6(e,t))}function n4(e,t){let r=im(e);e.Ia.delete(t),r.O_()&&n9(e,t),0===e.Ia.size&&(r.O_()?r.L_():n7(e)&&e.Ra.set("Unknown"))}function n6(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(em.min())>0){let r=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(r)}im(e).Y_(t)}function n9(e,t){e.Va.Ue(t),im(e).Z_(t)}function n5(e){e.Va=new rD({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),im(e).start(),e.Ra.ua()}function n3(e){return n7(e)&&!im(e).x_()&&e.Ia.size>0}function n7(e){return 0===e.Ea.size}async function n8(e){e.Ra.set("Online")}async function ie(e){e.Ia.forEach((t,r)=>{n6(e,t)})}async function it(e,t){e.Va=void 0,n3(e)?(e.Ra.ha(t),n5(e)):e.Ra.set("Unknown")}async function ir(e,t,r){if(e.Ra.set("Online"),t instanceof rN&&2===t.state&&t.cause)try{await async function(e,t){let r=t.cause;for(let n of t.targetIds)e.Ia.has(n)&&(await e.remoteSyncer.rejectListen(n,r),e.Ia.delete(n),e.Va.removeTarget(n))}(e,t)}catch(r){D(nJ,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await ii(e,r)}else if(t instanceof rk?e.Va.Ze(t):t instanceof rR?e.Va.st(t):e.Va.tt(t),!r.isEqual(em.min()))try{let t=await nC(e.localStore);r.compareTo(t)>=0&&await function(e,t){let r=e.Va.Tt(t);return r.targetChanges.forEach((r,n)=>{if(r.resumeToken.approximateByteSize()>0){let i=e.Ia.get(n);i&&e.Ia.set(n,i.withResumeToken(r.resumeToken,t))}}),r.targetMismatches.forEach((t,r)=>{let n=e.Ia.get(t);if(!n)return;e.Ia.set(t,n.withResumeToken(ex.EMPTY_BYTE_STRING,n.snapshotVersion)),n9(e,t);let i=new r1(n.target,t,r,n.sequenceNumber);n6(e,i)}),e.remoteSyncer.applyRemoteEvent(r)}(e,r)}catch(t){D(nJ,"Failed to raise snapshot:",t),await ii(e,t)}}async function ii(e,t,r){if(!eI(t))throw t;e.Ea.add(1),await n1(e),e.Ra.set("Offline"),r||(r=()=>nC(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{D(nJ,"Retrying IndexedDB access"),await r(),e.Ea.delete(1),await n0(e)})}function is(e,t){return t().catch(r=>ii(e,r,t))}async function ia(e){let t=iy(e),r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:-1;for(;n7(e)&&e.Ta.length<10;)try{let n=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}(e.localStore,r);if(null===n){0===e.Ta.length&&t.L_();break}r=n.batchId,function(e,t){e.Ta.push(t);let r=iy(e);r.O_()&&r.X_&&r.ea(t.mutations)}(e,n)}catch(t){await ii(e,t)}io(e)&&il(e)}function io(e){return n7(e)&&!iy(e).x_()&&e.Ta.length>0}function il(e){iy(e).start()}async function iu(e){iy(e).ra()}async function ih(e){let t=iy(e);for(let r of e.Ta)t.ea(r.mutations)}async function ic(e,t,r){let n=e.Ta.shift(),i=ry.from(n,t,r);await is(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await ia(e)}async function id(e,t){t&&iy(e).X_&&await async function(e,t){var r;if(function(e){switch(e){case F.OK:return M(64938);case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0;default:return M(15467,{code:e})}}(r=t.code)&&r!==F.ABORTED){let r=e.Ta.shift();iy(e).B_(),await is(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await ia(e)}}(e,t),io(e)&&il(e)}async function ip(e,t){e.asyncQueue.verifyOperationInProgress(),D(nJ,"RemoteStore received new credentials");let r=n7(e);e.Ea.add(3),await n1(e),r&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await n0(e)}async function ig(e,t){t?(e.Ea.delete(2),await n0(e)):t||(e.Ea.add(2),await n1(e),e.Ra.set("Unknown"))}function im(e){var t,r,n;return e.ma||(e.ma=(t=e.datastore,r=e.asyncQueue,n={Xo:n8.bind(null,e),t_:ie.bind(null,e),r_:it.bind(null,e),H_:ir.bind(null,e)},t.sa(),new nG(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.da.push(async t=>{t?(e.ma.B_(),n3(e)?n5(e):e.Ra.set("Unknown")):(await e.ma.stop(),e.Va=void 0)})),e.ma}function iy(e){var t,r,n;return e.fa||(e.fa=(t=e.datastore,r=e.asyncQueue,n={Xo:()=>Promise.resolve(),t_:iu.bind(null,e),r_:id.bind(null,e),ta:ih.bind(null,e),na:ic.bind(null,e)},t.sa(),new nW(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.da.push(async t=>{t?(e.fa.B_(),await ia(e)):(await e.fa.stop(),e.Ta.length>0&&(D(nJ,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(e,t,r,n,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=n,this.removalCallback=i,this.deferred=new j,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,n,i){let s=new iv(e,t,Date.now()+r,n,i);return s.start(r),s}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new B(F.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function iw(e,t){if(P("AsyncQueue",`${t}: ${e}`),eI(e))return new B(F.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{static emptySet(e){return new i_(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||ea.comparator(t.key,r.key):(e,t)=>ea.comparator(e.key,t.key),this.keyedMap=tH(),this.sortedSet=new ek(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof i_)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let r=new i_;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iE{constructor(){this.ga=new ek(ea.comparator)}track(e){let t=e.doc.key,r=this.ga.get(t);r?0!==e.type&&3===r.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==r.type?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):2===e.type&&2===r.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===r.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===r.type?this.ga=this.ga.remove(t):1===e.type&&2===r.type?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):0===e.type&&1===r.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):M(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){let e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class iI{constructor(e,t,r,n,i,s,a,o,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=n,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,n,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new iI(e,t,i_.emptySet(t),s,r,n,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&tV(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==r[e].type||!t[e].doc.isEqual(r[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ib{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class iT{constructor(){this.queries=iS(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){let r=e.queries;e.queries=iS(),r.forEach((e,r)=>{for(let e of r.Sa)e.onError(t)})}(this,new B(F.ABORTED,"Firestore shutting down"))}}function iS(){return new tz(e=>tF(e),tV)}async function iC(e,t){let r=3,n=t.query,i=e.queries.get(n);i?!i.ba()&&t.Da()&&(r=2):(i=new ib,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await e.onListen(n,!0);break;case 1:i.wa=await e.onListen(n,!1);break;case 2:await e.onFirstRemoteStoreListen(n)}}catch(r){let e=iw(r,`Initialization of query '${tB(t.query)}' failed`);return void t.onError(e)}e.queries.set(n,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&iN(e)}async function iA(e,t){let r=t.query,n=3,i=e.queries.get(r);if(i){let e=i.Sa.indexOf(t);e>=0&&(i.Sa.splice(e,1),0===i.Sa.length?n=t.Da()?0:1:!i.ba()&&t.Da()&&(n=2))}switch(n){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function ik(e,t){let r=!1;for(let n of t){let t=n.query,i=e.queries.get(t);if(i){for(let e of i.Sa)e.Fa(n)&&(r=!0);i.wa=n}}r&&iN(e)}function iR(e,t,r){let n=e.queries.get(t);if(n)for(let e of n.Sa)e.onError(r);e.queries.delete(t)}function iN(e){e.Ca.forEach(e=>{e.next()})}(m=g||(g={})).Ma="default",m.Cache="cache";class iO{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){let t=[];for(let r of e.docChanges)3!==r.type&&t.push(r);e=new iI(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){return!(e.fromCache&&this.Da())||(!this.options.qa||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;let t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=iI.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==g.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iD{constructor(e){this.key=e}}class iP{constructor(e){this.key=e}}class iL{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=tY(),this.mutatedKeys=tY(),this.eu=tq(e),this.tu=new i_(this.eu)}get nu(){return this.Ya}ru(e,t){let r=t?t.iu:new iE,n=t?t.tu:this.tu,i=t?t.mutatedKeys:this.mutatedKeys,s=n,a=!1,o="F"===this.query.limitType&&n.size===this.query.limit?n.last():null,l="L"===this.query.limitType&&n.size===this.query.limit?n.first():null;if(e.inorderTraversal((e,t)=>{let u=n.get(e),h=tj(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(r.track({type:3,doc:h}),f=!0):this.su(u,h)||(r.track({type:2,doc:h}),f=!0,(o&&this.eu(h,o)>0||l&&0>this.eu(h,l))&&(a=!0)):!u&&h?(r.track({type:0,doc:h}),f=!0):u&&!h&&(r.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(h?(s=s.add(h),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),r.track({type:1,doc:e})}return{tu:s,iu:r,Cs:a,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,n){let i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;let s=e.iu.ya();s.sort((e,t)=>(function(e,t){let r=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Rt:e})}};return r(e)-r(t)})(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(r),n=n??!1;let a=t&&!n?this._u():[],o=0===this.Xa.size&&this.current&&!n?1:0,l=o!==this.Za;return(this.Za=o,0!==s.length||l)?{snapshot:new iI(this.query,e.tu,i,s,e.mutatedKeys,0===o,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new iE,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];let e=this.Xa;this.Xa=tY(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))});let t=[];return e.forEach(e=>{this.Xa.has(e)||t.push(new iP(e))}),this.Xa.forEach(r=>{e.has(r)||t.push(new iD(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=tY();let t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return iI.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}let ix="SyncEngine";class iM{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class iU{constructor(e){this.key=e,this.hu=!1}}class iV{constructor(e,t,r,n,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=n,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new tz(e=>tF(e),tV),this.Iu=new Map,this.Eu=new Set,this.du=new ek(ea.comparator),this.Au=new Map,this.Ru=new nh,this.Vu={},this.mu=new Map,this.fu=r7.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function iF(e,t,r=!0){let n;let i=i5(e),s=i.Tu.get(t);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),n=s.view.lu()):n=await ij(i,t,r,!0),n}async function iB(e,t){let r=i5(e);await ij(r,t,!0,!1)}async function ij(e,t,r,n){var i,s;let a;let o=await (i=e.localStore,s=tx(t),i.persistence.runTransaction("Allocate target","readwrite",e=>{let t;return i.Pi.getTargetData(e,s).next(r=>r?(t=r,eE.resolve(t)):i.Pi.allocateTargetId(e).next(r=>(t=new r1(s,r,"TargetPurposeListen",e.currentSequenceNumber),i.Pi.addTargetData(e,t).next(()=>t))))}).then(e=>{let t=i.Ms.get(e.targetId);return(null===t||e.snapshotVersion.compareTo(t.snapshotVersion)>0)&&(i.Ms=i.Ms.insert(e.targetId,e),i.xs.set(s,e.targetId)),e})),l=o.targetId,u=e.sharedClientState.addLocalQueryTarget(l,r);return n&&(a=await iq(e,t,l,"current"===u,o.resumeToken)),e.isPrimaryClient&&r&&n2(e.remoteStore,o),a}async function iq(e,t,r,n,i){e.pu=(t,r,n)=>(async function(e,t,r,n){let i=t.view.ru(r);i.Cs&&(i=await nk(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,i)));let s=n&&n.targetChanges.get(t.targetId),a=n&&null!=n.targetMismatches.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s,a);return i1(e,t.targetId,o.au),o.snapshot})(e,t,r,n);let s=await nk(e.localStore,t,!0),a=new iL(t,s.Qs),o=a.ru(s.documents),l=rA.createSynthesizedTargetChangeForCurrentChange(r,n&&"Offline"!==e.onlineState,i),u=a.applyChanges(o,e.isPrimaryClient,l);i1(e,r,u.au);let h=new iM(t,r,a);return e.Tu.set(t,h),e.Iu.has(r)?e.Iu.get(r).push(t):e.Iu.set(r,[t]),u.snapshot}async function iz(e,t,r){let n=e.Tu.get(t),i=e.Iu.get(n.targetId);if(i.length>1)return e.Iu.set(n.targetId,i.filter(e=>!tV(e,t))),void e.Tu.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(n.targetId),e.sharedClientState.isActiveQueryTarget(n.targetId)||await nA(e.localStore,n.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(n.targetId),r&&n4(e.remoteStore,n.targetId),iZ(e,n.targetId)}).catch(e_)):(iZ(e,n.targetId),await nA(e.localStore,n.targetId,!0))}async function i$(e,t){let r=e.Tu.get(t),n=e.Iu.get(r.targetId);e.isPrimaryClient&&1===n.length&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),n4(e.remoteStore,r.targetId))}async function iK(e,t,r){var n;let i=(e.remoteStore.remoteSyncer.applySuccessfulWrite=iQ.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=iX.bind(null,e),e);try{let e;let s=await function(e,t){let r,n;let i=eg.now(),s=t.reduce((e,t)=>e.add(t.key),tY());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=t$,l=tY();return e.Ns.getEntries(a,s).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(n=>{r=n;let s=[];for(let e of t){let t=function(e,t){let r=null;for(let n of e.fieldTransforms){let e=t.data.field(n.field),i=t2(n.transform,e||null);null!=i&&(null===r&&(r=to.empty()),r.set(n.field,i))}return r||null}(e,r.get(e.key).overlayedDocument);null!=t&&s.push(new rh(e.key,t,function e(t){let r=[];return eC(t.fields,(t,n)=>{let i=new es([t]);if(tn(n)){let t=e(n.mapValue).fields;if(0===t.length)r.push(i);else for(let e of t)r.push(i.child(e))}else r.push(i)}),new eP(r)}(t.value.mapValue),rn.exists(!0)))}return e.mutationQueue.addMutationBatch(a,i,s,t)}).next(t=>{n=t;let i=t.applyToLocalDocumentSet(r,l);return e.documentOverlayCache.saveOverlays(a,t.batchId,i)})}).then(()=>({batchId:n.batchId,changes:tG(r)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),n=s.batchId,(e=i.Vu[i.currentUser.toKey()])||(e=new ek(Y)),e=e.insert(n,r),i.Vu[i.currentUser.toKey()]=e,await i4(i,s.changes),await ia(i.remoteStore)}catch(t){let e=iw(t,"Failed to persist write");r.reject(e)}}async function iH(e,t){try{let r=await function(e,t){let r=t.snapshotVersion,n=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{var s;let a,o;let l=e.Ns.newChangeBuffer({trackRemovals:!0});n=e.Ms;let u=[];t.targetChanges.forEach((s,a)=>{var o;let l=n.get(a);if(!l)return;u.push(e.Pi.removeMatchingKeys(i,s.removedDocuments,a).next(()=>e.Pi.addMatchingKeys(i,s.addedDocuments,a)));let h=l.withSequenceNumber(i.currentSequenceNumber);null!==t.targetMismatches.get(a)?h=h.withResumeToken(ex.EMPTY_BYTE_STRING,em.min()).withLastLimboFreeSnapshotVersion(em.min()):s.resumeToken.approximateByteSize()>0&&(h=h.withResumeToken(s.resumeToken,r)),n=n.insert(a,h),o=h,(0===l.resumeToken.approximateByteSize()||o.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size>0)&&u.push(e.Pi.updateTargetData(i,h))});let h=t$,c=tY();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,r))}),u.push((s=t.documentUpdates,a=tY(),o=tY(),s.forEach(e=>a=a.add(e)),l.getEntries(i,a).next(e=>{let t=t$;return s.forEach((r,n)=>{let i=e.get(r);n.isFoundDocument()!==i.isFoundDocument()&&(o=o.add(r)),n.isNoDocument()&&n.version.isEqual(em.min())?(l.removeEntry(r,n.readTime),t=t.insert(r,n)):!i.isValidDocument()||n.version.compareTo(i.version)>0||0===n.version.compareTo(i.version)&&i.hasPendingWrites?(l.addEntry(n),t=t.insert(r,n)):D(nb,"Ignoring outdated watch update for ",r,". Current version:",i.version," Watch version:",n.version)}),{ks:t,qs:o}})).next(e=>{h=e.ks,c=e.qs})),!r.isEqual(em.min())){let t=e.Pi.getLastRemoteSnapshotVersion(i).next(t=>e.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));u.push(t)}return eE.waitFor(u).next(()=>l.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,h,c)).next(()=>h)}).then(t=>(e.Ms=n,t))}(e.localStore,t);t.targetChanges.forEach((t,r)=>{let n=e.Au.get(r);n&&(V(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?n.hu=!0:t.modifiedDocuments.size>0?V(n.hu,14607):t.removedDocuments.size>0&&(V(n.hu,42227),n.hu=!1))}),await i4(e,r,t)}catch(e){await e_(e)}}function iG(e,t,r){var n;if(e.isPrimaryClient&&0===r||!e.isPrimaryClient&&1===r){let r;let i=[];e.Tu.forEach((e,r)=>{let n=r.view.va(t);n.snapshot&&i.push(n.snapshot)}),(n=e.eventManager).onlineState=t,r=!1,n.queries.forEach((e,n)=>{for(let e of n.Sa)e.va(t)&&(r=!0)}),r&&iN(n),i.length&&e.Pu.H_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function iW(e,t,r){e.sharedClientState.updateQueryState(t,"rejected",r);let n=e.Au.get(t),i=n&&n.key;if(i){let r=new ek(ea.comparator);r=r.insert(i,tl.newNoDocument(i,em.min()));let n=tY().add(i),s=new rC(em.min(),new Map,new ek(Y),r,n);await iH(e,s),e.du=e.du.remove(i),e.Au.delete(t),i2(e)}else await nA(e.localStore,t,!1).then(()=>iZ(e,t,r)).catch(e_)}async function iQ(e,t){var r;let n=t.batch.batchId;try{let i=await (r=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let n=t.batch.keys(),i=r.Ns.newChangeBuffer({trackRemovals:!0});return(function(e,t,r,n){let i=r.batch,s=i.keys(),a=eE.resolve();return s.forEach(e=>{a=a.next(()=>n.getEntry(t,e)).next(t=>{let s=r.docVersions.get(e);V(null!==s,48541),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,r),t.isValidDocument()&&(t.setReadTime(r.commitVersion),n.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(r,e,t,i).next(()=>i.apply(e)).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t.batch.batchId)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=tY();for(let r=0;r<e.mutationResults.length;++r)e.mutationResults[r].transformResults.length>0&&(t=t.add(e.batch.mutations[r].key));return t}(t))).next(()=>r.localDocuments.getDocuments(e,n))});iJ(e,n,null),iY(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await i4(e,i)}catch(e){await e_(e)}}async function iX(e,t,r){var n;try{let i=await (n=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(V(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))});iJ(e,t,r),iY(e,t),e.sharedClientState.updateMutationState(t,"rejected",r),await i4(e,i)}catch(e){await e_(e)}}function iY(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function iJ(e,t,r){let n=e.Vu[e.currentUser.toKey()];if(n){let i=n.get(t);i&&(r?i.reject(r):i.resolve(),n=n.remove(t)),e.Vu[e.currentUser.toKey()]=n}}function iZ(e,t,r=null){for(let n of(e.sharedClientState.removeLocalQueryTarget(t),e.Iu.get(t)))e.Tu.delete(n),r&&e.Pu.yu(n,r);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach(t=>{e.Ru.containsKey(t)||i0(e,t)})}function i0(e,t){e.Eu.delete(t.path.canonicalString());let r=e.du.get(t);null!==r&&(n4(e.remoteStore,r),e.du=e.du.remove(t),e.Au.delete(r),i2(e))}function i1(e,t,r){for(let n of r)n instanceof iD?(e.Ru.addReference(n.key,t),function(e,t){let r=t.key,n=r.path.canonicalString();e.du.get(r)||e.Eu.has(n)||(D(ix,"New document in limbo: "+r),e.Eu.add(n),i2(e))}(e,n)):n instanceof iP?(D(ix,"Document no longer in limbo: "+n.key),e.Ru.removeReference(n.key,t),e.Ru.containsKey(n.key)||i0(e,n.key)):M(19791,{wu:n})}function i2(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){let t=e.Eu.values().next().value;e.Eu.delete(t);let r=new ea(en.fromString(t)),n=e.fu.next();e.Au.set(n,new iU(r)),e.du=e.du.insert(r,n),n2(e.remoteStore,new r1(tx(new tO(r.path)),n,"TargetPurposeLimboResolution",eb.ce))}}async function i4(e,t,r){let n=[],i=[],s=[];e.Tu.isEmpty()||(e.Tu.forEach((a,o)=>{s.push(e.pu(o,t,r).then(t=>{if((t||r)&&e.isPrimaryClient){let n=t?!t.fromCache:r?.targetChanges.get(o.targetId)?.current;e.sharedClientState.updateQueryState(o.targetId,n?"current":"not-current")}if(t){n.push(t);let e=n_.As(o.targetId,t);i.push(e)}}))}),await Promise.all(s),e.Pu.H_(n),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",r=>eE.forEach(t,t=>eE.forEach(t.Es,n=>e.persistence.referenceDelegate.addReference(r,t.targetId,n)).next(()=>eE.forEach(t.ds,n=>e.persistence.referenceDelegate.removeReference(r,t.targetId,n)))))}catch(e){if(!eI(e))throw e;D(nb,"Failed to update sequence numbers: "+e)}for(let r of t){let t=r.targetId;if(!r.fromCache){let r=e.Ms.get(t),n=r.snapshotVersion,i=r.withLastLimboFreeSnapshotVersion(n);e.Ms=e.Ms.insert(t,i)}}}(e.localStore,i))}async function i6(e,t){var r;if(!e.currentUser.isEqual(t)){D(ix,"User change. New user:",t.toKey());let n=await nS(e.localStore,t);e.currentUser=t,r="'waitForPendingWrites' promise is rejected due to a user change.",e.mu.forEach(e=>{e.forEach(e=>{e.reject(new B(F.CANCELLED,r))})}),e.mu.clear(),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await i4(e,n.Ls)}}function i9(e,t){let r=e.Au.get(t);if(r&&r.hu)return tY().add(r.key);{let r=tY(),n=e.Iu.get(t);if(!n)return r;for(let t of n){let n=e.Tu.get(t);r=r.unionWith(n.view.nu)}return r}}function i5(e){return e.remoteStore.remoteSyncer.applyRemoteEvent=iH.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=i9.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=iW.bind(null,e),e.Pu.H_=ik.bind(null,e.eventManager),e.Pu.yu=iR.bind(null,e.eventManager),e}class i3{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=nz(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){var t;return t=this.persistence,new nT(t,new nI,e.initialUser,this.serializer)}Cu(e){return new nm(nv.mi,this.serializer)}Du(e){return new nN}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}i3.provider={build:()=>new i3};class i7 extends i3{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){return V(this.persistence.referenceDelegate instanceof nw,46915),new nr(this.persistence.referenceDelegate.garbageCollector,e.asyncQueue,t)}Cu(e){let t=void 0!==this.cacheSizeBytes?r3.withCacheSize(this.cacheSizeBytes):r3.DEFAULT;return new nm(e=>nw.mi(e,t),this.serializer)}}class i8{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>iG(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=i6.bind(null,this.syncEngine),await ig(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new iT}createDatastore(e){let t=nz(e.databaseInfo.databaseId),r=new nj(e.databaseInfo);return new nX(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){var t;return t=this.localStore,new nZ(t,this.datastore,e.asyncQueue,e=>iG(this.syncEngine,e,0),nP.v()?new nP:new nO)}createSyncEngine(e,t){return function(e,t,r,n,i,s,a){let o=new iV(e,t,r,n,i,s);return a&&(o.gu=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){D(nJ,"RemoteStore shutting down."),e.Ea.add(5),await n1(e),e.Aa.shutdown(),e.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}i8.provider={build:()=>new i8};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):P("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let st="FirestoreClient";class sr{constructor(e,t,r,n,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=n,this.user=k.UNAUTHENTICATED,this.clientId=X.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async e=>{D(st,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(r,e=>(D(st,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new j;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(r){let t=iw(r,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function sn(e,t){e.asyncQueue.verifyOperationInProgress(),D(st,"Initializing OfflineComponentProvider");let r=e.configuration;await t.initialize(r);let n=r.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await nS(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function si(e,t){e.asyncQueue.verifyOperationInProgress();let r=await ss(e);D(st,"Initializing OnlineComponentProvider"),await t.initialize(r,e.configuration),e.setCredentialChangeListener(e=>ip(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,r)=>ip(t.remoteStore,r)),e._onlineComponents=t}async function ss(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){D(st,"Using user provided OfflineComponentProvider");try{await sn(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===F.FAILED_PRECONDITION||t.code===F.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;L("Error using user provided cache. Falling back to memory cache: "+t),await sn(e,new i3)}}else D(st,"Using default OfflineComponentProvider"),await sn(e,new i7(void 0))}return e._offlineComponents}async function sa(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(D(st,"Using user provided OnlineComponentProvider"),await si(e,e._uninitializedComponentsProvider._online)):(D(st,"Using default OnlineComponentProvider"),await si(e,new i8))),e._onlineComponents}async function so(e){let t=await sa(e),r=t.eventManager;return r.onListen=iF.bind(null,t.syncEngine),r.onUnlisten=iz.bind(null,t.syncEngine),r.onFirstRemoteStoreListen=iB.bind(null,t.syncEngine),r.onLastRemoteStoreUnlisten=i$.bind(null,t.syncEngine),r}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let su=new Map,sh="firestore.googleapis.com";class sc{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new B(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=sh,this.ssl=!0}else this.host=e.host,this.ssl=e.ssl??!0;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new B(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,r,n){if(!0===t&&!0===n)throw new B(F.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=sl(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new B(F.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new B(F.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new B(F.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,r;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,t.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class sd{constructor(e,t,r,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new B(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sc(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new z;switch(e.type){case"firstParty":return new G(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new B(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=su.get(e);t&&(D("ComponentProvider","Removing Datastore"),su.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new sf(this.firestore,e,this._query)}}class sp{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new sg(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new sp(this.firestore,e,this._key)}toJSON(){return{type:sp._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ep(t,sp._jsonSchema))return new sp(e,r||null,new ea(en.fromString(t.referencePath)))}}sp._jsonSchemaVersion="firestore/documentReference/1.0",sp._jsonSchema={type:ef("string",sp._jsonSchemaVersion),referencePath:ef("string")};class sg extends sf{constructor(e,t,r){super(e,t,new tO(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new sp(this.firestore,null,new ea(e))}withConverter(e){return new sg(this.firestore,e,this._path)}}function sm(e,t,...r){if(e=(0,_.m9)(e),eo("collection","path",t),e instanceof sd){let n=en.fromString(t,...r);return eu(n),new sg(e,null,n)}{if(!(e instanceof sp||e instanceof sg))throw new B(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(en.fromString(t,...r));return eu(n),new sg(e.firestore,null,n)}}function sy(e,t,...r){if(e=(0,_.m9)(e),1==arguments.length&&(t=X.newId()),eo("doc","path",t),e instanceof sd){let n=en.fromString(t,...r);return el(n),new sp(e,null,new ea(n))}{if(!(e instanceof sp||e instanceof sg))throw new B(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(en.fromString(t,...r));return el(n),new sp(e.firestore,e instanceof sg?e.converter:null,new ea(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sv="AsyncQueue";class sw{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new n$(this,"async_queue_retry"),this._c=()=>{let e=nq();e&&D(sv,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;let t=nq();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;let t=nq();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});let t=new j;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!eI(e))throw e;D(sv,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){let t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,P("INTERNAL UNHANDLED ERROR: ",s_(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);let n=iv.createAndSchedule(this,e,t,r,e=>this.hc(e));return this.tc.push(n),n}uc(){this.nc&&M(47125,{Pc:s_(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(let t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{for(let t of(this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.tc))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){let t=this.tc.indexOf(e);this.tc.splice(t,1)}}function s_(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}class sE extends sd{constructor(e,t,r,n){super(e,t,r,n),this.type="firestore",this._queue=new sw,this._persistenceKey=n?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new sw(e),this._firestoreClient=void 0,await e}}}function sI(e,t){let r="object"==typeof e?e:(0,y.Mq)(),n=(0,y.qX)(r,"firestore").getImmediate({identifier:"string"==typeof e?e:t||eW});if(!n._initialized){let e=(0,_.P0)("firestore");e&&function(e,t,r,n={}){e=ed(e,sd);let i=(0,_.Xx)(t),s=e._getSettings(),a={...s,emulatorOptions:e._getEmulatorOptions()},o=`${t}:${r}`;i&&((0,_.Uo)(`https://${o}`),(0,_.dp)("Firestore",!0)),s.host!==sh&&s.host!==o&&L("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let l={...s,host:o,ssl:i,emulatorOptions:n};if(!(0,_.vZ)(l,a)&&(e._setSettings(l),n.mockUserToken)){let t,r;if("string"==typeof n.mockUserToken)t=n.mockUserToken,r=k.MOCK_USER;else{t=(0,_.Sg)(n.mockUserToken,e._app?.options.projectId);let i=n.mockUserToken.sub||n.mockUserToken.user_id;if(!i)throw new B(F.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new k(i)}e._authCredentials=new $(new q(t,r))}}(n,...e)}return n}function sb(e){if(e._terminated)throw new B(F.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t;let r=e._freezeSettings(),n=(t=e._databaseId,new eG(t,e._app?.options.appId||"",e._persistenceKey,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,sl(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator));e._componentsProvider||r.localCache?._offlineComponentProvider&&r.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),e._firestoreClient=new sr(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){let t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}(e),e._firestoreClient}function sT(e){var t;return(t=sb(e=ed(e,sE))).asyncQueue.enqueue(async()=>{let e=await ss(t).then(e=>e.persistence),r=await sa(t).then(e=>e.remoteStore);return e.setNetworkEnabled(!0),r.Ea.delete(0),n0(r)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sS{constructor(e){this._byteString=e}static fromBase64String(e){try{return new sS(ex.fromBase64String(e))}catch(e){throw new B(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new sS(ex.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:sS._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ep(e,sS._jsonSchema))return sS.fromBase64String(e.bytes)}}sS._jsonSchemaVersion="firestore/bytes/1.0",sS._jsonSchema={type:ef("string",sS._jsonSchemaVersion),bytes:ef("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sC{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new B(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new es(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sA{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new B(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new B(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Y(this._lat,e._lat)||Y(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:sk._jsonSchemaVersion}}static fromJSON(e){if(ep(e,sk._jsonSchema))return new sk(e.latitude,e.longitude)}}sk._jsonSchemaVersion="firestore/geoPoint/1.0",sk._jsonSchema={type:ef("string",sk._jsonSchemaVersion),latitude:ef("number"),longitude:ef("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sR{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;++r)if(e[r]!==t[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:sR._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ep(e,sR._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new sR(e.vectorValues);throw new B(F.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}sR._jsonSchemaVersion="firestore/vectorValue/1.0",sR._jsonSchema={type:ef("string",sR._jsonSchemaVersion),vectorValues:ef("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sN=/^__.*__$/;class sO{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new rh(e,this.data,this.fieldMask,t,this.fieldTransforms):new ru(e,this.data,t,this.fieldTransforms)}}class sD{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new rh(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function sP(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ac:e})}}class sL{constructor(e,t,r,n,i,s){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=n,void 0===i&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new sL({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){let t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){let t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return sG(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(0===e.length)throw this.Sc("Document fields must not be empty");if(sP(this.Ac)&&sN.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class sx{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||nz(e)}Cc(e,t,r,n=!1){return new sL({Ac:e,methodName:t,Dc:r,path:es.emptyPath(),fc:!1,bc:n},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function sM(e){let t=e._freezeSettings(),r=nz(e._databaseId);return new sx(e._databaseId,!!t.ignoreUndefinedProperties,r)}function sU(e,t,r,n,i,s={}){let a,o;let l=e.Cc(s.merge||s.mergeFields?2:0,t,r,i);sz("Data must be an object, but it was:",l,n);let u=sj(n,l);if(s.merge)a=new eP(l.fieldMask),o=l.fieldTransforms;else if(s.mergeFields){let e=[];for(let n of s.mergeFields){let i=s$(t,n,r);if(!l.contains(i))throw new B(F.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);sW(e,i)||e.push(i)}a=new eP(e),o=l.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=l.fieldTransforms;return new sO(new to(u),a,o)}class sV extends sA{_toFieldTransform(e){if(2!==e.Ac)throw 1===e.Ac?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof sV}}class sF extends sA{_toFieldTransform(e){return new rt(e.path,new t4)}isEqual(e){return e instanceof sF}}function sB(e,t){if(sq(e=(0,_.m9)(e)))return sz("Unsupported field value:",t,e),sj(e,t);if(e instanceof sA)return function(e,t){if(!sP(t.Ac))throw t.Sc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Sc(`${e._methodName}() is not currently supported inside arrays`);let r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&4!==t.Ac)throw t.Sc("Nested arrays are not supported");return function(e,t){let r=[],n=0;for(let i of e){let e=sB(i,t.wc(n));null==e&&(e={nullValue:"NULL_VALUE"}),r.push(e),n++}return{arrayValue:{values:r}}}(e,t)}return function(e,t){var r,n,i;if(null===(e=(0,_.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return r=t.serializer,"number"==typeof(i=n=e)&&Number.isInteger(i)&&!eT(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER?t0(n):tZ(r,n);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let r=eg.fromDate(e);return{timestampValue:rB(t.serializer,r)}}if(e instanceof eg){let r=new eg(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:rB(t.serializer,r)}}if(e instanceof sk)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof sS)return{bytesValue:rj(t.serializer,e._byteString)};if(e instanceof sp){let r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.Sc(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:rz(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof sR)return{mapValue:{fields:{[eX]:{stringValue:eZ},[e0]:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw t.Sc("VectorValues must only contain numeric values.");return tZ(t.serializer,e)})}}}}};throw t.Sc(`Unsupported field value: ${ec(e)}`)}(e,t)}function sj(e,t){let r={};return eA(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):eC(e,(e,n)=>{let i=sB(n,t.mc(e));null!=i&&(r[e]=i)}),{mapValue:{fields:r}}}function sq(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof eg||e instanceof sk||e instanceof sS||e instanceof sp||e instanceof sA||e instanceof sR)}function sz(e,t,r){if(!sq(r)||!eh(r)){let n=ec(r);throw"an object"===n?t.Sc(e+" a custom object"):t.Sc(e+" "+n)}}function s$(e,t,r){if((t=(0,_.m9)(t))instanceof sC)return t._internalPath;if("string"==typeof t)return sH(e,t);throw sG("Field path arguments must be of type string or ",e,!1,void 0,r)}let sK=RegExp("[~\\*/\\[\\]]");function sH(e,t,r){if(t.search(sK)>=0)throw sG(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new sC(...t.split("."))._internalPath}catch(n){throw sG(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function sG(e,t,r,n,i){let s=n&&!n.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;r&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${n}`),a&&(l+=` in document ${i}`),l+=")"),new B(F.INVALID_ARGUMENT,o+e+l)}function sW(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sQ{constructor(e,t,r,n,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=n,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new sp(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new sX(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(sY("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class sX extends sQ{data(){return super.data()}}function sY(e,t){return"string"==typeof t?sH(e,t):t instanceof sC?t._internalPath:t._delegate._internalPath}class sJ{}class sZ extends sJ{}function s0(e,t,...r){let n=[];for(let i of(t instanceof sJ&&n.push(t),function(e){let t=e.filter(e=>e instanceof s4).length,r=e.filter(e=>e instanceof s1).length;if(t>1||t>0&&r>0)throw new B(F.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n=n.concat(r)),n))e=i._apply(e);return e}class s1 extends sZ{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new s1(e,t,r)}_apply(e){let t=this._parse(e);return ae(e._query,t),new sf(e.firestore,e.converter,tM(e._query,t))}_parse(e){let t=sM(e.firestore);return function(e,t,r,n,i,s,a){let o;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new B(F.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){s8(a,s);let t=[];for(let r of a)t.push(s7(n,e,r));o={arrayValue:{values:t}}}else o=s7(n,e,a)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||s8(a,s),o=function(e,t,r,n=!1){return sB(r,e.Cc(n?4:3,t))}(r,t,a,"in"===s||"not-in"===s);return tp.create(i,s,o)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function s2(e,t,r){let n=sY("where",e);return s1._create(n,t,r)}class s4 extends sJ{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new s4(e,t)}_parse(e){let t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:tg.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let r=e;for(let e of t.getFlattenedFilters())ae(r,e),r=tM(r,e)}(e._query,t),new sf(e.firestore,e.converter,tM(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class s6 extends sZ{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new s6(e,t)}_apply(e){let t=function(e,t,r){if(null!==e.startAt)throw new B(F.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new B(F.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new td(t,r)}(e._query,this._field,this._direction);return new sf(e.firestore,e.converter,function(e,t){let r=e.explicitOrderBy.concat([t]);return new tO(e.path,e.collectionGroup,r,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function s9(e,t="asc"){let r=sY("orderBy",e);return s6._create(r,t)}class s5 extends sZ{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new s5(e,t,r)}_apply(e){return new sf(e.firestore,e.converter,tU(e._query,this._limit,this._limitType))}}function s3(e){return function(e,t){if(t<=0)throw new B(F.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}("limit",e),s5._create("limit",e,"F")}function s7(e,t,r){if("string"==typeof(r=(0,_.m9)(r))){if(""===r)throw new B(F.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!tP(t)&&-1!==r.indexOf("/"))throw new B(F.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`);let n=t.path.child(en.fromString(r));if(!ea.isDocumentKey(n))throw new B(F.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return e7(e,new ea(n))}if(r instanceof sp)return e7(e,r._key);throw new B(F.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ec(r)}.`)}function s8(e,t){if(!Array.isArray(e)||0===e.length)throw new B(F.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function ae(e,t){let r=function(e,t){for(let r of e)for(let e of r.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==r)throw r===t.op?new B(F.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new B(F.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`)}class at{convertValue(e,t="none"){switch(e1(e)){case 0:return null;case 1:return e.booleanValue;case 2:return eV(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(eF(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return eC(e,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertVectorValue(e){return new sR(e.fields?.[e0].arrayValue?.values?.map(e=>eV(e.doubleValue)))}convertGeoPoint(e){return new sk(eV(e.latitude),eV(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=eK(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(eH(e));default:return null}}convertTimestamp(e){let t=eU(e);return new eg(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=en.fromString(e);V(r0(r),9688,{name:e});let n=new eQ(r.get(1),r.get(3)),i=new ea(r.popFirst(5));return n.isEqual(t)||P(`Document ${i} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ar(e,t,r){return e?r&&(r.merge||r.mergeFields)?e.toFirestore(t,r):e.toFirestore(t):t}class an{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ai extends sQ{constructor(e,t,r,n,i,s){super(e,t,r,n,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new as(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(sY("DocumentSnapshot.get",e));if(null!==r)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new B(F.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=ai._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()&&(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED")),t}}ai._jsonSchemaVersion="firestore/documentSnapshot/1.0",ai._jsonSchema={type:ef("string",ai._jsonSchemaVersion),bundleSource:ef("string","DocumentSnapshot"),bundleName:ef("string"),bundle:ef("string")};class as extends ai{data(e={}){return super.data(e)}}class aa{constructor(e,t,r,n){this._firestore=e,this._userDataWriter=t,this._snapshot=n,this.metadata=new an(n.hasPendingWrites,n.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new as(this._firestore,this._userDataWriter,r.key,r,new an(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new B(F.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(r=>{let n=new as(e._firestore,e._userDataWriter,r.doc.key,r.doc,new an(e._snapshot.mutatedKeys.has(r.doc.key),e._snapshot.fromCache),e.query.converter);return r.doc,{type:"added",doc:n,oldIndex:-1,newIndex:t++}})}{let r=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let n=new as(e._firestore,e._userDataWriter,t.doc.key,t.doc,new an(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=r.indexOf(t.doc.key),r=r.delete(t.doc.key)),1!==t.type&&(s=(r=r.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:e})}}(t.type),doc:n,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new B(F.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=aa._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=X.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],n=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),r.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),n.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ao(e){e=ed(e,sp);let t=ed(e.firestore,sE);return(function(e,t,r={}){let n=new j;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new se({next:o=>{s.Nu(),t.enqueueAndForget(()=>iA(e,a));let l=o.docs.has(r);!l&&o.fromCache?i.reject(new B(F.UNAVAILABLE,"Failed to get document because the client is offline.")):l&&o.fromCache&&n&&"server"===n.source?i.reject(new B(F.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(o)},error:e=>i.reject(e)}),a=new iO(new tO(r.path),s,{includeMetadataChanges:!0,qa:!0});return iC(e,a)})(await so(e),e.asyncQueue,t,r,n)),n.promise})(sb(t),e._key).then(r=>(function(e,t,r){let n=r.docs.get(t._key),i=new al(e);return new ai(e,i,t._key,n,new an(r.hasPendingWrites,r.fromCache),t.converter)})(t,e,r))}aa._jsonSchemaVersion="firestore/querySnapshot/1.0",aa._jsonSchema={type:ef("string",aa._jsonSchemaVersion),bundleSource:ef("string","QuerySnapshot"),bundleName:ef("string"),bundle:ef("string")};class al extends at{constructor(e){super(),this.firestore=e}convertBytes(e){return new sS(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new sp(this.firestore,null,t)}}function au(e){e=ed(e,sf);let t=ed(e.firestore,sE),r=sb(t),n=new al(t);return(/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new B(F.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query),(function(e,t,r={}){let n=new j;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new se({next:r=>{s.Nu(),t.enqueueAndForget(()=>iA(e,a)),r.fromCache&&"server"===n.source?i.reject(new B(F.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(r)},error:e=>i.reject(e)}),a=new iO(r,s,{includeMetadataChanges:!0,qa:!0});return iC(e,a)})(await so(e),e.asyncQueue,t,r,n)),n.promise})(r,e._query).then(r=>new aa(t,n,e,r)))}function ah(e,t,r){e=ed(e,sp);let n=ed(e.firestore,sE),i=ar(e.converter,t,r);return af(n,[sU(sM(n),"setDoc",e._key,i,null!==e.converter,r).toMutation(e._key,rn.none())])}function ac(e){return af(ed(e.firestore,sE),[new rp(e._key,rn.none())])}function ad(e,t){let r=ed(e.firestore,sE),n=sy(e),i=ar(e.converter,t);return af(r,[sU(sM(e.firestore),"addDoc",n._key,i,null!==e.converter,{}).toMutation(n._key,rn.exists(!1))]).then(()=>n)}function af(e,t){return function(e,t){let r=new j;return e.asyncQueue.enqueueAndForget(async()=>iK(await sa(e).then(e=>e.syncEngine),t,r)),r.promise}(sb(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=sM(e)}set(e,t,r){this._verifyNotCommitted();let n=ag(e,this._firestore),i=ar(n.converter,t,r),s=sU(this._dataReader,"WriteBatch.set",n._key,i,null!==n.converter,r);return this._mutations.push(s.toMutation(n._key,rn.none())),this}update(e,t,r,...n){let i;this._verifyNotCommitted();let s=ag(e,this._firestore);return i="string"==typeof(t=(0,_.m9)(t))||t instanceof sC?function(e,t,r,n,i,s){let a=e.Cc(1,t,r),o=[s$(t,n,r)],l=[i];if(s.length%2!=0)throw new B(F.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<s.length;e+=2)o.push(s$(t,s[e])),l.push(s[e+1]);let u=[],h=to.empty();for(let e=o.length-1;e>=0;--e)if(!sW(u,o[e])){let t=o[e],r=l[e];r=(0,_.m9)(r);let n=a.yc(t);if(r instanceof sV)u.push(t);else{let e=sB(r,n);null!=e&&(u.push(t),h.set(t,e))}}return new sD(h,new eP(u),a.fieldTransforms)}(this._dataReader,"WriteBatch.update",s._key,t,r,n):function(e,t,r,n){let i=e.Cc(1,t,r);sz("Data must be an object, but it was:",i,n);let s=[],a=to.empty();return eC(n,(e,n)=>{let o=sH(t,e,r);n=(0,_.m9)(n);let l=i.yc(o);if(n instanceof sV)s.push(o);else{let e=sB(n,l);null!=e&&(s.push(o),a.set(o,e))}}),new sD(a,new eP(s),i.fieldTransforms)}(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(i.toMutation(s._key,rn.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=ag(e,this._firestore);return this._mutations=this._mutations.concat(new rp(t._key,rn.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new B(F.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ag(e,t){if((e=(0,_.m9)(e)).firestore!==t)throw new B(F.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}function am(){return new sF("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ay(e){return sb(e=ed(e,sE)),new ap(e,t=>af(e,t))}new WeakMap,function(e=!0){R=y.Jn,(0,y.Xd)(new v.wA("firestore",(t,{instanceIdentifier:r,options:n})=>{let i=t.getProvider("app").getImmediate(),s=new sE(new K(t.getProvider("auth-internal")),new Q(i,t.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new B(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new eQ(e.options.projectId,t)}(i,r),i);return n={useFetchStreams:e,...n},s._setSettings(n),s},"PUBLIC").setMultipleInstances(!0)),(0,y.KN)(C,A,void 0),(0,y.KN)(C,A,"esm2020")}()}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(6840),t(9090)}),_N_E=e.O()}]);