var __assign=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd?define(["require","exports","fetch-everywhere"],e):"undefined"!=typeof window&&e(window.require||function(){},window["@servicestack/client"]={})}(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),e("fetch-everywhere");var o=function(e){Object.assign(this,e)};t.ResponseStatus=o;function n(e){Object.assign(this,e)}t.ResponseError=n;var i=function(e){Object.assign(this,e)};t.ErrorResponse=i;function r(e){Object.assign(this,e)}t.NavItem=r;var s=(a.prototype.createResponse=function(){return new u},a.prototype.getTypeName=function(){return"GetNavItems"},a);function a(e){Object.assign(this,e)}t.GetNavItems=s;var u=function(e){Object.assign(this,e)};t.GetNavItemsResponse=u;var l=(c.prototype.tryResolve=function(e){return new e},c);function c(){}t.NewInstanceResolver=l;var f,h=(p.prototype.tryResolve=function(e){return e.instance||(e.instance=new e)},p);function p(){}function k(e){switch(e){case"onConnect":return"ServerEventConnect";case"onHeartbeat":return"ServerEventHeartbeat";case"onJoin":return"ServerEventJoin";case"onLeave":return"ServerEventLeave";case"onUpdate":return"ServerEventUpdate"}return null}t.SingletonInstanceResolver=h,(f=t.ReadyState||(t.ReadyState={}))[f.CONNECTING=0]="CONNECTING",f[f.OPEN=1]="OPEN",f[f.CLOSED=2]="CLOSED";var v=(d.prototype.getEventSourceOptions=function(){return{withCredentials:this.withCredentials}},d.prototype.reconnectServerEvents=function(t){var n=this;if(void 0===t&&(t={}),!this.stopped){t.error&&this.onError(t.error);var r=this.eventSource,e=t.url||this.eventStreamUri||r.url;null!=this.options.resolveStreamUrl&&(e=this.options.resolveStreamUrl(e));var o=this.EventSource?new this.EventSource(e,this.getEventSourceOptions()):new EventSource(e,this.getEventSourceOptions());o.addEventListener("error",function(e){return(t.onerror||r.onerror||n.onError)(e)}),o.addEventListener("message",t.onmessage||r.onmessage||this.onMessage);var s=this.options.onReconnect;return null!=s&&s.call(o,t.error),r.removeEventListener&&(r.removeEventListener("error",this.onError),r.removeEventListener("message",this.onMessage)),r.close(),this.eventSource=o}},d.prototype.start=function(){var t=this;if(this.stopped=!1,null==this.eventSource||this.eventSource.readyState===EventSource.CLOSED){var e=this.eventStreamUri;null!=this.options.resolveStreamUrl&&(e=this.options.resolveStreamUrl(e)),this.eventSource=this.EventSource?new this.EventSource(e,this.getEventSourceOptions()):new EventSource(e,this.getEventSourceOptions()),this.eventSource.addEventListener("error",this.onError),this.eventSource.addEventListener("message",function(e){return t.onMessage(e)})}return this},d.prototype.stop=function(){this.stopped=!0,this.eventSource&&this.eventSource.close();var e=this.options;e&&e.heartbeat&&clearInterval(e.heartbeat);var t=this.connectionInfo;return null==t||null==t.unRegisterUrl?new Promise(function(e,t){return e()}):(this.connectionInfo=null,fetch(new Request(t.unRegisterUrl,{method:"POST",mode:"cors",credentials:this.serviceClient.credentials})).then(function(e){if(!e.ok)throw new Error(e.status+" - "+e.statusText)}).catch(this.onError))},d.prototype.invokeReceiver=function(e,t,n,r,o){if(e)if("function"==typeof e&&(e=this.resolver.tryResolve(e)),t=t.replace("-",""),e.client=this,e.request=r,"function"==typeof e[t])e[t].call(n||e,r.body,r);else if(t in e)e[t]=r.body;else{var s=t.toLowerCase();for(var i in e)if(i.toLowerCase()==s)return void("function"==typeof e[i]?e[i].call(n||e,r.body,r):e[i]=r.body);var a=e.noSuchMethod;"function"==typeof a&&a.call(n||e,r.target,r)}},d.prototype.hasConnected=function(){return null!=this.connectionInfo},d.prototype.registerHandler=function(e,t){return this.options.handlers||(this.options.handlers={}),this.options.handlers[e]=t,this},d.prototype.setResolver=function(e){return this.options.resolver=e,this},d.prototype.registerReceiver=function(e){return this.registerNamedReceiver("cmd",e)},d.prototype.registerNamedReceiver=function(e,t){return this.options.receivers||(this.options.receivers={}),this.options.receivers[e]=t,this},d.prototype.unregisterReceiver=function(e){return void 0===e&&(e="cmd"),this.options.receivers&&delete this.options.receivers[e],this},d.prototype.updateChannels=function(e){this.channels=e;var t=null!=this.eventSource?this.eventSource.url:this.eventStreamUri;this.eventStreamUri=t.substring(0,Math.min(t.indexOf("?"),t.length))+"?channels="+e.join(",")+"&t="+(new Date).getTime()},d.prototype.update=function(e,t){var n="string"==typeof e?e.split(","):e,r="string"==typeof t?t.split(","):t,o=[];for(var s in this.channels){var i=this.channels[s];null!=r&&-1!==r.indexOf(i)||o.push(i)}if(n)for(var s in n)i=n[s],-1===o.indexOf(i)&&o.push(i);this.updateChannels(o)},d.prototype.addListener=function(e,t){return(this.listeners[e]||(this.listeners[e]=[])).push(t),this},d.prototype.removeListener=function(e,t){var n=this.listeners[e];if(n){var r=n.indexOf(t);0<=r&&n.splice(r,1)}return this},d.prototype.raiseEvent=function(e,t){var n=this,r=this.listeners[e];r&&r.forEach(function(e){try{e(t)}catch(e){n.onError(e)}})},d.prototype.getConnectionInfo=function(){if(null==this.connectionInfo)throw"Not Connected";return this.connectionInfo},d.prototype.getSubscriptionId=function(){return this.getConnectionInfo().id},d.prototype.updateSubscriber=function(t){var n=this;return null==t.id&&(t.id=this.getSubscriptionId()),this.serviceClient.post(t).then(function(e){n.update(t.subscribeChannels,t.unsubscribeChannels)}).catch(this.onError)},d.prototype.subscribeToChannels=function(){for(var t=this,n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];var r=new g;return r.id=this.getSubscriptionId(),r.subscribeChannels=n,this.serviceClient.post(r).then(function(e){t.update(n,null)}).catch(this.onError)},d.prototype.unsubscribeFromChannels=function(){for(var t=this,n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];var r=new g;return r.id=this.getSubscriptionId(),r.unsubscribeChannels=n,this.serviceClient.post(r).then(function(e){t.update(null,n)}).catch(this.onError)},d.prototype.getChannelSubscribers=function(){var t=this,e=new E;return e.channels=this.channels,this.serviceClient.get(e).then(function(e){return e.map(function(e){return t.toServerEventUser(e)})}).catch(function(e){return t.onError(e),[]})},d.prototype.toServerEventUser=function(e){var t=e.channels,n=new S;for(var r in n.userId=e.userId,n.displayName=e.displayName,n.profileUrl=e.profileUrl,n.channels=t?t.split(","):null,e)"userId"!=r&&"displayName"!=r&&"profileUrl"!=r&&"channels"!=r&&(null==n.meta&&(n.meta={}),n.meta[r]=e[r]);return n},d.UnknownChannel="*",d);function d(e,t,n,r){void 0===n&&(n={}),void 0===r&&(r=null);var S=this;if(this.channels=t,this.options=n,this.eventSource=r,this.onMessage=function(e){if(!S.stopped){var t=S.options;if(void 0===n)var n={querySelectorAll:function(e){return[]}};var r=n.querySelectorAll.bind(n),o=q(e.data," "),s=null,i=o[0],a=q(i,"@");1<a.length&&(s=a[0],i=a[1]);var u=o[1],l=null;try{l=u?JSON.parse(u):null}catch(e){}if((o=q(i,".")).length<=1)throw"invalid selector format: "+i;var c=o[0],f=o[1].replace(new RegExp("%20","g")," "),h=q(f,"$"),p=h[0],v=h[1],d=v&&r(v),m=d&&d[0],y={eventId:parseInt(e.lastEventId),data:e.data,type:k(p)||"ServerEventMessage",channel:s,selector:i,json:u,body:l,op:c,target:h[0],cssSelector:v,meta:{}},g="object"==typeof l?Object.assign({},y,l):y;if(!t.validate||!1!==t.validate(y)){var b=new Headers;if(b.set("Content-Type","text/plain"),"cmd"===c)if("onConnect"===p){if(S.connectionInfo=g,"string"==typeof l.heartbeatIntervalMs&&(S.connectionInfo.heartbeatIntervalMs=parseInt(l.heartbeatIntervalMs)),"string"==typeof l.idleTimeoutMs&&(S.connectionInfo.idleTimeoutMs=parseInt(l.idleTimeoutMs)),Object.assign(t,l),(w=t.handlers.onConnect)&&(w.call(m||n.body,S.connectionInfo,y),S.stopped))return;t.heartbeatUrl&&(t.heartbeat&&clearInterval(t.heartbeat),t.heartbeat=setInterval(function(){if(S.eventSource.readyState===EventSource.CLOSED){clearInterval(t.heartbeat);var e=t.handlers.onStop;return null!=e&&e.apply(S.eventSource),void S.reconnectServerEvents({error:new Error("EventSource is CLOSED")})}fetch(new Request(t.heartbeatUrl,{method:"POST",mode:"cors",headers:b,credentials:S.serviceClient.credentials})).then(function(e){if(!e.ok)throw new Error(e.status+" - "+e.statusText)}).catch(function(e){return S.reconnectServerEvents({error:e})})},S.connectionInfo&&S.connectionInfo.heartbeatIntervalMs||t.heartbeatIntervalMs||1e4)),t.unRegisterUrl&&"undefined"!=typeof window&&(window.onunload=function(){navigator.sendBeacon?(S.stopped=!0,S.eventSource&&S.eventSource.close(),navigator.sendBeacon(t.unRegisterUrl)):S.stop()}),S.updateSubscriberUrl=t.updateSubscriberUrl,S.updateChannels((t.channels||"").split(","))}else{var C="onJoin"==p||"onLeave"==p||"onUpdate"==p;if(w=t.handlers[p])C?w.call(m||n.body,g):w.call(m||n.body,l,y);else if(!C){var E=t.receivers&&t.receivers.cmd;S.invokeReceiver(E,p,m,y,"cmd")}C&&(w=t.handlers.onCommand)&&w.call(m||n.body,g)}else"trigger"===c?S.raiseEvent(f,y):"css"===c&&F(d||r("body"),p,l);var w;E=t.receivers&&t.receivers[c];if(S.invokeReceiver(E,p,m,y,c),!k(p))(w=t.handlers.onMessage)&&w.call(m||n.body,g);t.onTick&&t.onTick()}}},this.onError=function(e){if(!S.stopped){e||(e=event);var t=S.options.onException;null!=t&&t.call(S.eventSource,e),S.options.onTick&&S.options.onTick()}},0===this.channels.length)throw"at least 1 channel is required";this.resolver=this.options.resolver||new l,this.eventStreamUri=H(e,"event-stream")+"?",this.updateChannels(t),this.serviceClient=new x(e),this.listeners={},this.withCredentials=!0,this.options.handlers||(this.options.handlers={})}t.ServerEventsClient=v;var m=(y.prototype.noSuchMethod=function(e,t){},y);function y(){}t.ServerEventReceiver=m;var g=(b.prototype.createResponse=function(){return new C},b.prototype.getTypeName=function(){return"UpdateEventSubscriber"},b);function b(){}t.UpdateEventSubscriber=g;var C=function(){};t.UpdateEventSubscriberResponse=C;var E=(w.prototype.createResponse=function(){return[]},w.prototype.getTypeName=function(){return"GetEventSubscribers"},w);function w(){}t.GetEventSubscribers=E;var S=function(){};t.ServerEventUser=S;var N=(O.Get="GET",O.Post="POST",O.Put="PUT",O.Delete="DELETE",O.Patch="PATCH",O.Head="HEAD",O.Options="OPTIONS",O.hasRequestBody=function(e){return!("GET"===e||"DELETE"===e||"HEAD"===e||"OPTIONS"===e)},O);function O(){}t.HttpMethods=N;var I=(T.prototype.createResponse=function(){return new L},T.prototype.getTypeName=function(){return"GetAccessToken"},T);function T(e){Object.assign(this,e)}var L=function(){};t.GetAccessTokenResponse=L;var x=(R.prototype.setCredentials=function(e,t){this.userName=e,this.password=t},R.prototype.setBearerToken=function(e){this.bearerToken=e},R.prototype.get=function(e,t){return"string"!=typeof e?this.send(N.Get,e,t):this.send(N.Get,null,t,this.toAbsoluteUrl(e))},R.prototype.delete=function(e,t){return"string"!=typeof e?this.send(N.Delete,e,t):this.send(N.Delete,null,t,this.toAbsoluteUrl(e))},R.prototype.post=function(e,t){return this.send(N.Post,e,t)},R.prototype.postToUrl=function(e,t,n){return this.send(N.Post,t,n,this.toAbsoluteUrl(e))},R.prototype.postBody=function(e,t,n){return this.sendBody(N.Post,e,t,n)},R.prototype.put=function(e,t){return this.send(N.Put,e,t)},R.prototype.putToUrl=function(e,t,n){return this.send(N.Put,t,n,this.toAbsoluteUrl(e))},R.prototype.putBody=function(e,t,n){return this.sendBody(N.Put,e,t,n)},R.prototype.patch=function(e,t){return this.send(N.Patch,e,t)},R.prototype.patchToUrl=function(e,t,n){return this.send(N.Patch,t,n,this.toAbsoluteUrl(e))},R.prototype.patchBody=function(e,t,n){return this.sendBody(N.Patch,e,t,n)},R.prototype.publish=function(e,t){return this.sendOneWay(e,t)},R.prototype.sendOneWay=function(e,t){var n=H(this.oneWayBaseUrl,P(e));return this.send(N.Post,e,null,n)},R.prototype.sendAll=function(e){if(0==e.length)return Promise.resolve([]);var t=H(this.replyBaseUrl,P(e[0])+"[]");return this.send(N.Post,e,null,t)},R.prototype.sendAllOneWay=function(e){if(0==e.length)return Promise.resolve(void 0);var t=H(this.oneWayBaseUrl,P(e[0])+"[]");return this.send(N.Post,e,null,t).then(function(e){})},R.prototype.createUrlFromDto=function(e,t){var n=H(this.replyBaseUrl,P(t));return N.hasRequestBody(e)||(n=J(n,t)),n},R.prototype.toAbsoluteUrl=function(e){return e.startsWith("http://")||e.startsWith("https://")?e:H(this.baseUrl,e)},R.prototype.deleteCookie=function(e){this.manageCookies?delete this.cookies[e]:document&&(document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/")},R.prototype.createRequest=function(e){var n=this,t=e.method,r=e.request,o=e.url,s=e.args,i=e.body;if(o||(o=this.createUrlFromDto(t,r)),s&&(o=J(o,s)),null!=this.bearerToken?this.headers.set("Authorization","Bearer "+this.bearerToken):null!=this.userName&&this.headers.set("Authorization","Basic "+R.toBase64(this.userName+":"+this.password)),this.manageCookies){var a=Object.keys(this.cookies).map(function(e){var t=n.cookies[e];return t.expires&&t.expires<new Date?null:t.name+"="+encodeURIComponent(t.value)}).filter(function(e){return!!e});0<a.length?this.headers.set("Cookie",a.join("; ")):this.headers.delete("Cookie")}var u=new Headers(this.headers),l=N.hasRequestBody(t),c={url:o,method:t,mode:this.mode,credentials:this.credentials,headers:u,compress:!1};return l&&(c.body=i||JSON.stringify(r),U(i)&&u.delete("Content-Type")),null!=this.requestFilter&&this.requestFilter(c),c},R.prototype.json=function(e){return this.parseJson?this.parseJson(e):e.json()},R.prototype.createResponse=function(e,t){var n=this;if(!e.ok)throw e;if(this.manageCookies){var r=[];e.headers.forEach(function(e,t){"set-cookie"==t.toLowerCase()&&r.push(e)}),r.forEach(function(e){var t=$(e);t&&(n.cookies[t.name]=t)})}null!=this.responseFilter&&this.responseFilter(e);var o=t&&"string"!=typeof t&&"function"==typeof t.createResponse?t.createResponse():null;if("string"==typeof o)return e.text().then(function(e){return e});var s=e.headers.get("content-type"),i=s&&-1!==s.indexOf("application/json");if(i)return this.json(e).then(function(e){return e});if("undefined"!=typeof Uint8Array&&o instanceof Uint8Array){if("function"!=typeof e.arrayBuffer)throw new Error("This fetch polyfill does not implement 'arrayBuffer'");return e.arrayBuffer().then(function(e){return new Uint8Array(e)})}if("function"==typeof Blob&&o instanceof Blob){if("function"!=typeof e.blob)throw new Error("This fetch polyfill does not implement 'blob'");return e.blob().then(function(e){return e})}var a=e.headers.get("content-length");return"0"===a||null==a&&!i?o:this.json(e).then(function(e){return e})},R.prototype.handleError=function(e,n,r){var o=this;if(void 0===r&&(r=null),n instanceof Error)throw this.raiseError(e,n);if(n.bodyUsed)throw this.raiseError(n,M(n.status,n.statusText,r));return void 0===n.json&&n.responseStatus?new Promise(function(e,t){return t(o.raiseError(null,n))}):this.json(n).then(function(e){var t=j(e);if(!t.responseStatus)throw M(n.status,n.statusText,r);throw null!=r&&(t.type=r),t}).catch(function(e){if(e instanceof Error||"undefined"!=typeof window&&e instanceof window.DOMException)throw o.raiseError(n,M(n.status,n.statusText,r));throw o.raiseError(n,e)})},R.prototype.send=function(e,t,n,r){return this.sendRequest({method:e,request:t,args:n,url:r})},R.prototype.sendBody=function(e,t,n,r){var o=H(this.replyBaseUrl,P(t));return this.sendRequest({method:e,request:n,body:"string"==typeof n?n:U(n)?n:JSON.stringify(n),url:J(o,t),args:r,returns:t})},R.prototype.sendRequest=function(t){function o(){var e=s.createRequest(t);return s.urlFilter&&s.urlFilter(e.url),fetch(e.url,e).then(function(e){return s.createResponse(e,n)}).catch(function(e){return s.handleError(i,e)})}var s=this,e=this.createRequest(t),n=t.returns||t.request,i=null;return this.urlFilter&&this.urlFilter(e.url),fetch(e.url,e).then(function(e){return i=e,s.createResponse(e,n)}).catch(function(e){if(401===e.status){if(s.refreshToken){var t=new I({refreshToken:s.refreshToken,useTokenCookie:s.useTokenCookie}),n=s.refreshTokenUri||s.createUrlFromDto(N.Post,t);s.useTokenCookie&&(s.bearerToken=null,s.headers.delete("Authorization"));var r=s.createRequest({method:N.Post,request:t,args:null,url:n});return fetch(n,r).then(function(e){return s.createResponse(e,t).then(function(e){return s.bearerToken=e.accessToken||null,o()})}).catch(function(e){return s.onAuthenticationRequired?s.onAuthenticationRequired().then(o).catch(function(e){return s.handleError(i,e,"RefreshTokenException")}):s.handleError(i,e,"RefreshTokenException")})}if(s.onAuthenticationRequired)return s.onAuthenticationRequired().then(o)}return s.handleError(i,e)})},R.prototype.raiseError=function(e,t){return null!=this.exceptionFilter&&this.exceptionFilter(e,t),t},R);function R(e){void 0===e&&(e="/"),this.baseUrl=e,this.replyBaseUrl=H(e,"json","reply")+"/",this.oneWayBaseUrl=H(e,"json","oneway")+"/",this.mode="cors",this.credentials="include",this.headers=new Headers,this.headers.set("Content-Type","application/json"),this.manageCookies="undefined"==typeof document,this.cookies={}}function U(e){return"undefined"!=typeof window&&e instanceof FormData}function M(e,t,n){void 0===n&&(n=null);var r=new i;return null!=n&&(r.type=n),r.responseStatus=new o,r.responseStatus.errorCode=e&&e.toString(),r.responseStatus.message=t,r}function D(e){return e?e.charAt(0).toLowerCase()+e.substring(1):e}function A(e){return e?e.charAt(0).toUpperCase()+e.substring(1):e}function j(e){if(e.responseStatus)return e;if(e.errors)return e;var t={};for(var n in e)e.hasOwnProperty(n)&&(e[n]instanceof Object?t[D(n)]=j(e[n]):t[D(n)]=e[n]);if(t.errors=[],null!=e.Errors)for(var r=0,o=e.Errors.length;r<o;r++){var s=e.Errors[r],i={};for(var a in s)i[D(a)]=s[a];t.errors.push(i)}return t}function P(e){if(!e)return"null";if("function"==typeof e.getTypeName)return e.getTypeName();var t=e&&e.constructor;if(null==t)throw e+" doesn't have constructor";if(t.name)return t.name;var n=t.toString();return n.substring(9,n.indexOf("("))}function F(e,t,n){for(var r="string"==typeof e?document.querySelectorAll(e):e,o=0;o<r.length;o++){var s=r[o];null!=s&&null!=s.style&&(s.style[t]=n)}}function q(e,t){if(!e)return[e];var n=e.indexOf(t);return 0<=n?[e.substring(0,n),e.substring(n+1)]:[e]}function B(e){return"string"!=typeof e?e:e.replace(/([A-Z]|[0-9]+)/g," $1").replace(/_/g," ").trim()}function H(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n,r,o=[];for(n=0,r=e.length;n<r;n++){var s=e[n];o=-1===s.indexOf("://")?o.concat(s.split("/")):o.concat(s.lastIndexOf("/")===s.length-1?s.substring(0,s.length-1):s)}var i=[];for(n=0,r=o.length;n<r;n++){var a=o[n];a&&"."!==a&&(".."===a?i.pop():i.push(a))}return""===o[0]&&i.unshift(""),i.join("/")||(i.length?"/":".")}function G(e,t){var n={};for(var r in t)n[r.toLowerCase()]=r;for(var o=e.split("/"),s="",i=0;i<o.length;i++){var a=o[i];if(null==a&&(a=""),"{"===a[0]&&"}"===a[a.length-1]){var u=n[a.substring(1,a.length-1).toLowerCase()];u&&(a=t[u],delete t[u])}0<s.length&&(s+="/"),s+=a}return s}function J(e,t){for(var n in t)t.hasOwnProperty(n)&&(e+=0<=e.indexOf("?")?"&":"?",e+=n+"="+_(t[n]));return e}function _(e){return null==e?"":"undefined"!=typeof Uint8Array&&e instanceof Uint8Array?z(e):encodeURIComponent(e)||""}function z(e){for(var t,n=(3-e.length%3)%3,r="",o=e.length,s=0,i=0;i<o;i++)t=i%3,s|=e[i]<<(16>>>t&24),2!=t&&e.length-i!=1||(r+=String.fromCharCode(W(s>>>18&63),W(s>>>12&63),W(s>>>6&63),W(63&s)),s=0);return 0==n?r:r.substring(0,r.length-n)+(1==n?"=":"==")}function W(e){return e<26?e+65:e<52?e+71:e<62?e-4:62===e?43:63===e?47:65}function X(e){return e&&'"'==e[0]&&'"'==e[e.length]?e.slice(1,-1):e}function Y(t){try{return decodeURIComponent(t)}catch(e){return t}}function $(e){if(!e)return null;for(var t=null,n=e.split(/; */),r=0;r<n.length;r++){var o=q(n[r],"="),s=o[0].trim(),i=1<o.length?Y(X(o[1].trim())):null;if(0==r)t={name:s,value:i,path:"/"};else{var a=s.toLowerCase();"httponly"==a?t.httpOnly=!0:"secure"==a?t.secure=!0:"expires"==a?(t.expires=new Date(i),"Invalid Date"===t.expires.toString()&&(t.expires=new Date(i.replace(/-/g," ")))):t[s]=i}}return t}function Q(e){return e.toLowerCase().replace(/_/g,"")}function V(e){return"[object Array]"===Object.prototype.toString.call(e)}function K(){var e=this.responseStatus||this.ResponseStatus;if(null!=e){var t=e.ErrorCode?j(e):e;return t.errors&&0!=t.errors.length?void 0:t.message||t.errorCode}}function Z(e){var t=this.responseStatus||this.ResponseStatus;if(null!=t){var n=t.ErrorCode?j(t):t,r=de(e);if(r&&null!=n.errors&&0!=n.errors.length){for(var o=r.map(function(e){return(e||"").toLowerCase()}),s=0,i=n.errors;s<i.length;s++){var a=i[s];if(-1!==o.indexOf((a.fieldName||"").toLowerCase()))return}for(var u=0,l=n.errors;u<l.length;u++){a=l[u];if(-1===o.indexOf((a.fieldName||"").toLowerCase()))return a.message||a.errorCode}}return n.message||n.errorCode||void 0}}function ee(e){return e?"function"==typeof e.getMonth?e:"/"==e[0]?new Date(parseFloat(/Date\(([^)]+)\)/.exec(e)[1])):new Date(e):null}function te(e){return e<10?"0"+e:e}function ne(e){return void 0===e&&(e=new Date),e.getFullYear()+"/"+te(e.getMonth()+1)+"/"+te(e.getDate())}function re(e){return'<div class="alert alert-danger">'+e+"</div>"}function oe(e,t){return e.getAttribute(t)}function se(e,t,n){return e.setAttribute(t,n)}function ie(e,t){return e.removeAttribute(t)}function ae(e,t,n){var r={className:"class",htmlFor:"for"},o=document.createElement(e);if(n)for(var s in n)se(o,r[s]||s,n[s]);return t&&t.insertAfter&&t.insertAfter.parentNode.insertBefore(o,t.insertAfter.nextSibling),o}function ue(){var e=oe(this,"data-invalid");if(e){var t="checkbox"===this.type||"radio"===this.type||le(this,"form-check"),n=t?function(e,t){for(;null!=e&&!le(e,t);)e=e.parentElement;return e}(this,"form-check"):null;t?ce(n||this.parentElement,"is-invalid form-control"):ce(this,"is-invalid");var r=this.nextElementSibling,o=!r||oe(r,"for")!==this.id&&"SMALL"!==r.tagName?this:t?n||r.parentElement:r;(null!=o&&o.nextElementSibling&&le(o.nextElementSibling,"invalid-feedback")?o.nextElementSibling:ae("div",{insertAfter:o},{className:"invalid-feedback"})).innerHTML=e}}function le(e,t){return!!e&&(e.classList?e.classList.contains(t):-1<(" "+e.className+" ").replace(/[\n\t\r]/g," ").indexOf(" "+t+" "))}function ce(e,t){return e?e.classList?(n=e.classList).add.apply(n,t.split(" ")):le(e,t)?null:e.className=(e.className+" "+t).trim():null;var n}function fe(e,t){return e?e.classList?e.classList.remove(t):le(e,t)?e.className=e.className.replace(/(\s|^)someclass(\s|$)/," "):null:null}function he(l,e,c){void 0===e&&(e=document),e.addEventListener(c,function(e){var t="data-"+c,n=e.target,r=oe(n,t);if(!r){var o=n.closest("["+t+"]");o&&(r=oe(o,t),n=o)}if(r){var s=r.indexOf(":");if(0<=s){var i=r.substring(0,s),a=r.substring(s+1);(u=l[i])&&u.apply(n,a.split(","))}else{var u;(u=l[r])&&u.apply(n,[].slice.call(arguments))}}})}function pe(e){fe(e,"has-errors");var t=e.querySelectorAll.bind(e);t(".error-summary").forEach(function(e){e.innerHTML="",e.style.display="none"}),t("[data-validation-summary]").forEach(function(e){e.innerHTML=""}),t(".error").forEach(function(e){return fe(e,"error")}),t(".form-check.is-invalid [data-invalid]").forEach(function(e){ie(e,"data-invalid")}),t(".form-check.is-invalid").forEach(function(e){return fe(e,"form-control")}),t(".is-invalid").forEach(function(e){fe(e,"is-invalid"),ie(e,"data-invalid")}),t(".is-valid").forEach(function(e){return fe(e,"is-valid")})}t.JsonServiceClient=x,t.isFormData=U,t.toCamelCase=D,t.toPascalCase=A,t.sanitize=j,t.nameOf=P,t.css=F,t.splitOnFirst=q,t.splitOnLast=function(e,t){if(!e)return[e];var n=e.lastIndexOf(t);return 0<=n?[e.substring(0,n),e.substring(n+1)]:[e]},t.leftPart=function(e,t){if(null==e)return null;var n=e.indexOf(t);return-1==n?e:e.substring(0,n)},t.rightPart=function(e,t){if(null==e)return null;var n=e.indexOf(t);return-1==n?e:e.substring(n+t.length)},t.lastLeftPart=function(e,t){if(null==e)return null;var n=e.lastIndexOf(t);return-1==n?e:e.substring(0,n)},t.lastRightPart=function(e,t){if(null==e)return null;var n=e.lastIndexOf(t);return-1==n?e:e.substring(n+t.length)},t.onlyProps=function(t,e){var n={};return e.forEach(function(e){return n[e]=t[e]}),n},t.humanize=function(e){return!e||0<=e.indexOf(" ")?e:B(e)},t.queryString=function(e){if(!e||-1===e.indexOf("?"))return{};for(var t=q(e,"?")[1].split("&"),n={},r=0;r<t.length;++r){var o=t[r].split("=");n[o[0]]=1<o.length?decodeURIComponent(o[1].replace(/\+/g," ")):null}return n},t.combinePaths=H,t.createPath=G,t.createUrl=function(e,t){return J(G(e,t),t)},t.appendQueryString=J,t.bytesToBase64=z,x.toBase64=function(e){return function(e){return"function"==typeof btoa?btoa(e):new Buffer(e).toString("base64")}(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,t){return String.fromCharCode(new Number("0x"+t).valueOf())}))},t.stripQuotes=X,t.tryDecode=Y,t.parseCookie=$,t.normalizeKey=Q,t.normalize=function e(t,n){if(V(t)){if(!n)return t;for(var r=[],o=0;o<t.length;o++)r[o]=e(t[o],n);return r}if("object"!=typeof t)return t;var s={};for(var i in t)s[Q(i)]=n?e(t[i],n):t[i];return s},t.getField=function(e,t){return null==e||null==t?null:e[t]||e[Object.keys(e).filter(function(e){return Q(e)===Q(t)})[0]||""]},t.parseResponseStatus=function(t,n){void 0===n&&(n=null);try{var e=JSON.parse(t);return j(e.ResponseStatus||e.responseStatus)}catch(e){return{message:n||e.message||e,__error:{error:e,json:t}}}},t.toFormData=function(e){if("undefined"!=typeof window){var t=new FormData;for(var n in e)t.append(n,e[n]);return t}},t.toObject=function(e){var t=this,n={};if(!e)return n;if("object"!=typeof e)throw new Error("keys must be an Array of object keys");return Array.prototype.slice.call(e).forEach(function(e){t[e]&&(n[e]=t[e])}),n},t.errorResponseSummary=K,t.errorResponseExcept=Z,t.errorResponse=function(t){if(null==t)return K.call(this);var e=this.responseStatus||this.ResponseStatus;if(null!=e){var n=e.ErrorCode?j(e):e;if(null!=n.errors&&0!=n.errors.length){var r=n.errors.find(function(e){return(e.fieldName||"").toLowerCase()==t.toLowerCase()});return r?r.message||r.errorCode:void 0}}},t.toDate=ee,t.toDateFmt=function(e){return ne(ee(e))},t.padInt=te,t.dateFmt=ne,t.dateFmtHM=function(e){return void 0===e&&(e=new Date),e.getFullYear()+"/"+te(e.getMonth()+1)+"/"+te(e.getDate())+" "+te(e.getHours())+":"+te(e.getMinutes())},t.timeFmt12=function(e){return void 0===e&&(e=new Date),te((e.getHours()+24)%12||12)+":"+te(e.getMinutes())+":"+te(e.getSeconds())+" "+(12<e.getHours()?"PM":"AM")},t.toLocalISOString=function(e){return void 0===e&&(e=new Date),e.getFullYear()+"-"+te(e.getMonth()+1)+"-"+te(e.getDate())+"T"+te(e.getHours())+":"+te(e.getMinutes())+":"+te(e.getSeconds())},t.createElement=ae,t.bootstrap=function(e){for(var t=(e||document).querySelectorAll("[data-invalid]"),n=0;n<t.length;n++)ue.call(t[n])},"undefined"!=typeof window&&void 0!==window.Element&&(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null})),t.bindHandlers=function(t,n,e){void 0===n&&(n=document),void 0===e&&(e=null),e&&e.events?e.events.forEach(function(e){return he(t,n,e)}):["click","dblclick","change","focus","blur","focusin","focusout","select","keydown","keypress","keyup","hover","toggle","input"].forEach(function(e){n.querySelector("[data-"+e+"]")&&he(t,n,e)})},t.bootstrapForm=function(t,n){t&&(n.model&&Se(t,n.model),t.onsubmit=function(e){return e.preventDefault(),n.type="bootstrap-v4",ye(t,n)})};var ve=function(){};function de(e){return e?V(e)?e:e.split(",").map(function(e){return e.trim()}):[]}function me(e){void 0===e&&(e={});var t,n=this,r=oe(n,"enctype")||ve.UrlEncoded;if(r==ve.MultiPart&&void 0===window.FormData)throw new Error("FormData Type is needed to send '"+ve.MultiPart+"' Content Types");try{t=ge(n,r)}catch(e){throw new Error(""+(e.message||e))}var o=new Headers;o.set("Accept",ve.Json),o.set("Content-Type",r);var s={method:oe(n,"method")||"POST",credentials:"include",mode:"cors",headers:o,body:t};return e.requestFilter&&e.requestFilter(s),fetch(new Request(e.url||oe(n,"action"),s)).catch(function(e){throw new Error("Network is unreachable ("+(e.message||e)+")")}).then(function(t){return e.responseFilter&&e.responseFilter(t),t.ok?(function(e,t){var n=t.headers.get("X-Location");n&&(location.href=n);var r=t.headers.get("X-Trigger");if(r){var o=r.indexOf(":"),s=0<=o?r.substring(0,o):r,i=0<=o?r.substring(o+1):null;we(e,s,i?[i]:[])}}(n,t),function(e){var t=e.headers.get("content-type"),n=t&&-1!==t.indexOf(ve.Json);if(n)return e.json();var r=e.headers.get("content-length");return"0"===r||null==r&&!n?null:e.json()}(t)):t.json().catch(function(e){throw new Error("The request failed with "+(t.statusText||t.status))}).then(function(e){throw Object.assign.apply(Object,[new i].concat(j(e)))})})}function ye(o,s){void 0===s&&(s={});var i="bootstrap-v4"===s.type;pe(o);try{if(s.validate&&!1===s.validate.call(o))return!1}catch(e){return!1}var a=o.querySelectorAll.bind(o);ce(o,"loading");var e=null==s.onSubmitDisable?"[type=submit]":s.onSubmitDisable,t=null!=e&&""!=e;function n(e,t){if(void 0===t&&(t=null),t)!function(e,r,t){var n={overrideMessages:!1,messages:{NotEmpty:"Required",NotNull:"Required",Email:"Invalid email",AlreadyExists:"Already exists"},errorFilter:function(e,t,n){return this.overrideMessages?this.messages[t]||e||B(t):e||B(t)}};if(pe(e),r){r=j(r),ce(e,"has-errors");var i=t&&"bootstrap-v4"===t.type,o=__assign({},n,t);t.messages&&(o.overrideMessages=!0);var s=o.errorFilter.bind(o),a=r.errors,u=e.querySelectorAll.bind(e);if(a&&a.length){var l={},c={};u("input,textarea,select,button").forEach(function(e){var t=e,n=t.previousElementSibling,r=t.nextElementSibling,o=("radio"===t.type||"checkbox"===t.type?null:t.id)||oe(t,"name");if(o){var s=o.toLowerCase();l[s]=t,i||(le(n,"help-inline")||le(n,"help-block")?c[s]=n:(le(r,"help-inline")||le(r,"help-block"))&&(c[s]=r))}}),u(".help-inline[data-for],.help-block[data-for]").forEach(function(e){var t=oe(e,"data-for").toLowerCase();c[t]=e});for(var f=0,h=a;f<h.length;f++){var p=h[f],v=(p.fieldName||"").toLowerCase(),d=l[v];if(d)if(i){var m=oe(d,"type");"radio"===m||"checkbox"===m||ce(d,"is-invalid"),se(d,"data-invalid",s(p.message,p.errorCode,"field"))}else ce(d,"error"),ce(d.parentElement,"has-error");var y=c[v];y&&(ce(y,"error"),y.innerHTML=s(p.message,p.errorCode,"field"),y.style.display="block")}u("[data-validation-summary]").forEach(function(e){var t=oe(e,"data-validation-summary").split(","),n=Z.call(r,t);n&&(e.innerHTML=re(n))})}else{var g=s(r.message||B(r.errorCode),r.errorCode,"summary");i?u("[data-validation-summary]").forEach(function(e){return e.innerHTML="<"===g[0]?g:re(g)}):u(".error-summary").forEach(function(e){e.innerHTML=g,e.style.display="block"})}}}(o,t.ResponseStatus||t.responseStatus,__assign({},s));else if(e){ce(o,"has-errors");var n=a(".error-summary")[0];if(n&&(n.innerHTML=e),i){var r=a("[data-validation-summary]")[0];r&&(r.innerHTML=re(e))}}s.error&&s.error.call(o,t),i&&a("[data-invalid]").forEach(function(e){return ue.call(e)})}return t&&a(e).forEach(function(e){se(e,"disabled","disabled")}),(s.submit||me).call(o,s).then(function(e){return s.success&&s.success.call(o,e),!1}).catch(function(e){e.responseStatus?n(null,e):n(""+(e.message||e),null)}).finally(function(){fe(o,"loading"),t&&a(e).forEach(function(e){ie(e,"disabled")}),s.complete&&s.complete.call(o)})}function ge(e,t){return void 0===t&&(t=null),t===ve.MultiPart?new FormData(e):t==ve.Json?JSON.stringify(Ce(e)):Ee(e)}function be(e,t,n){for(var r,o=e,s=o.elements.length,i=0;i<s;i++)if((r=o.elements[i]).name&&!r.disabled&&"file"!=r.type&&"reset"!=r.type&&"submit"!=r.type&&"button"!=r.type)if("select-multiple"==r.type)for(var a=o.elements[i].options.length-1;0<=a;a--)r.options[a].selected&&n(t,r.name,r.options[a].value);else("checkbox"!=r.type&&"radio"!=r.type||r.checked)&&n(t,r.name,r.value);return t}function Ce(e){return be(e,{},function(e,t,n){return e[t]=n})}function Ee(e){return be(e,[],function(e,t,n){return"string"==typeof n?e.push(encodeURIComponent(t)+"="+encodeURIComponent(n)):null}).join("&").replace(/%20/g,"+")}function we(e,t,n){if(void 0===n&&(n=null),document.createEvent){(r=document.createEvent("click"==t||t.startsWith("mouse")?"MouseEvents":"HTMLEvents")).initEvent(t,!0,!0),r.data=n,e.dispatchEvent(r)}else{var r=document.createEventObject();e.fireEvent("on"+t,r)}}function Se(e,t){if(t){var n;for(var r in t){var o=t[r];null==o&&(o="");var s=e.elements.namedItem(r)||e.elements.namedItem((n=r)?n[0]===n[0].toUpperCase()?D(n):n[0]===n[0].toLowerCase()?A(n):n:n),i=s;if(s)switch(i.type||s[0].type){case"radio":case"checkbox":for(var a=s.length,u=0;u<a;u++)s[u].checked=-1<o.indexOf(s[u].value);break;case"select-multiple":var l=V(o)?o:[o],c=s;for(u=0;u<c.options.length;u++)c.options[u].selected=-1<l.indexOf(c.options[u].value);break;case"select":case"select-one":i.value=o.toString()||o;break;case"date":var f=ee(o);f&&(i.value=f.toISOString().split("T")[0]);break;default:i.value=o}}}}function ke(e,t){for(var n=e.length;0<n&&e[n-1]===t;)--n;return n<e.length?e.substring(0,n):e}function Ne(e){for(var t=0,n=["primary","secondary","success","info","warning","danger","light","dark"];t<n.length;t++){var r=n[t];if(e[r])return"btn-"+r;if(e["outline-"+r])return"btn-outline-"+r}return null}function Oe(e){for(var t=0,n=["xs","sm","md","lg"];t<n.length;t++){var r=n[t];if(e[r])return"btn-"+r}return null}t.toVarNames=de,t.formSubmit=me,t.ajaxSubmit=ye,t.serializeForm=ge,t.serializeToObject=Ce,t.serializeToUrlEncoded=Ee,t.serializeToFormData=function(e){return be(e,new FormData,function(e,t,n){return e.append(t,n)})},t.triggerEvent=we,t.populateForm=Se,t.trimEnd=ke,t.safeVarName=function(e){return e.replace(/[\W]+/g,"")},t.pick=function(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&0<=t.indexOf(r)&&(n[r]=e[r]);return n},t.omit=function(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&t.indexOf(r)<0&&(n[r]=e[r]);return n},t.activeClassNav=function(e,t){return null!=e.href&&(e.exact||t.length<=1?ke(t,"/").toLowerCase()===ke(e.href,"/").toLowerCase():ke(t,"/").toLowerCase().startsWith(ke(e.href,"/").toLowerCase()))?"active":null},t.activeClass=function(e,t,n){return null!=e&&(n||t.length<=1?ke(t,"/").toLowerCase()===ke(e,"/").toLowerCase():ke(t,"/").toLowerCase().startsWith(ke(e,"/").toLowerCase()))?"active":null},t.BootstrapColors=["primary","secondary","success","info","warning","danger","light","dark"],t.btnColorClass=Ne,t.BootstrapSizes=["xs","sm","md","lg"],t.btnSizeClass=Oe,t.btnClasses=function(e){var t=[],n=Ne(e);n&&t.push(n);var r=Oe(e);return r&&t.push(r),e.block&&t.push("btn-block"),t};var Ie=(Te.create=function(){return new qe},Te.forNav=function(e){return e||Te.create()},Te.overrideDefaults=function(e,t){return null==e?t:((e=Object.assign({},e)).navClass===Te.navClass&&null!=t.navClass&&(e.navClass=t.navClass),e.navItemClass===Te.navItemClass&&null!=t.navItemClass&&(e.navItemClass=t.navItemClass),e.navLinkClass===Te.navLinkClass&&null!=t.navLinkClass&&(e.navLinkClass=t.navLinkClass),e.childNavItemClass===Te.childNavItemClass&&null!=t.childNavItemClass&&(e.childNavItemClass=t.childNavItemClass),e.childNavLinkClass===Te.childNavLinkClass&&null!=t.childNavLinkClass&&(e.childNavLinkClass=t.childNavLinkClass),e.childNavMenuClass===Te.childNavMenuClass&&null!=t.childNavMenuClass&&(e.childNavMenuClass=t.childNavMenuClass),e.childNavMenuItemClass===Te.childNavMenuItemClass&&null!=t.childNavMenuItemClass&&(e.childNavMenuItemClass=t.childNavMenuItemClass),e)},Te.showNav=function(e,t){return null==t||0===t.length?null==e.show:!(null!=e.show&&t.indexOf(e.show)<0||null!=e.hide&&0<=t.indexOf(e.hide))},Te.navClass="nav",Te.navItemClass="nav-item",Te.navLinkClass="nav-link",Te.childNavItemClass="nav-item dropdown",Te.childNavLinkClass="nav-link dropdown-toggle",Te.childNavMenuClass="dropdown-menu",Te.childNavMenuItemClass="dropdown-item",Te);function Te(){}t.NavDefaults=Ie;var Le=(xe.forNavLink=function(e){return e||Ie.create()},xe);function xe(){}t.NavLinkDefaults=Le;var Re=(Ue.create=function(){return new qe({navClass:Ue.navClass})},Ue.forNavbar=function(e){return Ie.overrideDefaults(e,Ue.create())},Ue.navClass="navbar-nav",Ue);function Ue(){}t.NavbarDefaults=Re;var Me=(De.create=function(){return new qe({navClass:De.navClass,navItemClass:De.navItemClass})},De.forNavButtonGroup=function(e){return Ie.overrideDefaults(e,De.create())},De.navClass="btn-group",De.navItemClass="btn btn-primary",De);function De(){}t.NavButtonGroupDefaults=Me;var Ae=(je.create=function(){return new qe({navItemClass:je.navItemClass})},je.forLinkButton=function(e){return Ie.overrideDefaults(e||null,je.create())},je.navItemClass="btn",je);function je(){}t.LinkButtonDefaults=Ae;var Pe=(Fe.fromSession=function(e){var t=[];return null!=e&&(t.push("auth"),e.roles&&t.push.apply(t,e.roles.map(function(e){return"role:"+e})),e.permissions&&t.push.apply(t,e.permissions.map(function(e){return"perm:"+e}))),t},Fe);function Fe(){}t.UserAttributes=Pe;var qe=(Be.fromSession=function(e,t){return(t=t||new Be).attributes=Pe.fromSession(e),t},Be);function Be(e){this.attributes=[],this.navClass=Ie.navClass,this.navItemClass=Ie.navItemClass,this.navLinkClass=Ie.navLinkClass,this.childNavItemClass=Ie.childNavItemClass,this.childNavLinkClass=Ie.childNavLinkClass,this.childNavMenuClass=Ie.childNavMenuClass,this.childNavMenuItemClass=Ie.childNavMenuItemClass,Object.assign(this,e)}function He(e,t){var n,r=0|e,o=r,s=60<=o?o%60:o,i=60<=(o/=60)?o%60:o,a=24<=(o/=60)?o%24:o,u=o/24,l=s+(e-r),c=t?"P":"";t?(0<(0|u)&&(c+=(0|u)+"D"),(0==u||0<a+i+s+l)&&(c+="T",0<(0|a)&&(c+=(0|a)+"H"),0<(0|i)&&(c+=(0|i)+"M"),0<l?c+=(n=ke(ke(n=l.toFixed(7),"0"),"."))+"S":2==c.length&&(c+="0S"))):(0<(0|u)&&(c+=(0|u)+":"),c+=te(0|a)+":"+te(0|i)+":",0<l?(n=ke(ke(n=l.toFixed(7),"0"),"."),c+=10<=l?""+n:"0"+n):c+="00");return c}t.NavOptions=qe,t.classNames=function e(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];for(var r=[],o=0;o<t.length;o++){var s=t[o];if(s){var i=typeof s;if("string"==i||"number"==i)r.push(s);else if(Array.isArray(s)&&s.length){var a=e.apply(null,s);a&&r.push(a)}else if("object"==i)for(var u=0,l=Object.keys(s);u<l.length;u++){var c=l[u];s[c]&&r.push(c)}}}return r.join(" ")},t.fromXsdDuration=function(e){var t=0,n=0,r=0,o=0,s=0,i=q(e.substring(1),"T"),a=2==i.length,u=q(i[0],"D");if(2==u.length&&(t=parseInt(u[0],10)||0),a){var l=q(i[1],"H");2==l.length&&(n=parseInt(l[0],10)||0);var c=q(l[l.length-1],"M");2==c.length&&(r=parseInt(c[0],10)||0);var f=q(c[c.length-1],"S");2==f.length&&(s=parseFloat(f[0])),s-=o=0|s}return 24*t*60*60+60*n*60+60*r+o+s},t.toXsdDuration=function(e){return He(e,!0)},t.toTimeSpanFmt=function(e){return He(e,!1)}});