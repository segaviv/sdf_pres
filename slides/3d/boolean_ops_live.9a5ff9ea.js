!function(t){"use strict";var n,e,r=t.Pos;function i(t){var n=t.flags;return null!=n?n:(t.ignoreCase?"i":"")+(t.global?"g":"")+(t.multiline?"m":"")}function o(t,n){for(var e=i(t),r=e,o=0;o<n.length;o++)-1==r.indexOf(n.charAt(o))&&(r+=n.charAt(o));return e==r?t:new RegExp(t.source,r)}function h(t){return/\\s|\\n|\n|\\W|\\D|\[\^/.test(t.source)}function l(t,n,e){n=o(n,"g");for(var i=e.line,h=e.ch,l=t.lastLine();i<=l;i++,h=0){n.lastIndex=h;var c=t.getLine(i),s=n.exec(c);if(s)return{from:r(i,s.index),to:r(i,s.index+s[0].length),match:s}}}function c(t,n,e){if(!h(n))return l(t,n,e);n=o(n,"gm");for(var i,c=1,s=e.line,f=t.lastLine();s<=f;){for(var a=0;a<c&&!(s>f);a++){var g=t.getLine(s++);i=null==i?g:i+"\n"+g}c*=2,n.lastIndex=e.ch;var u=n.exec(i);if(u){var m=i.slice(0,u.index).split("\n"),v=u[0].split("\n"),p=e.line+m.length-1,d=m[m.length-1].length;return{from:r(p,d),to:r(p+v.length-1,1==v.length?d+v[0].length:v[v.length-1].length),match:u}}}}function s(t,n,e){for(var r,i=0;i<=t.length;){n.lastIndex=i;var o=n.exec(t);if(!o)break;var h=o.index+o[0].length;if(h>t.length-e)break;(!r||h>r.index+r[0].length)&&(r=o),i=o.index+1}return r}function f(t,n,e){n=o(n,"g");for(var i=e.line,h=e.ch,l=t.firstLine();i>=l;i--,h=-1){var c=t.getLine(i),f=s(c,n,h<0?0:c.length-h);if(f)return{from:r(i,f.index),to:r(i,f.index+f[0].length),match:f}}}function a(t,n,e){if(!h(n))return f(t,n,e);n=o(n,"gm");for(var i,l=1,c=t.getLine(e.line).length-e.ch,a=e.line,g=t.firstLine();a>=g;){for(var u=0;u<l&&a>=g;u++){var m=t.getLine(a--);i=null==i?m:m+"\n"+i}l*=2;var v=s(i,n,c);if(v){var p=i.slice(0,v.index).split("\n"),d=v[0].split("\n"),x=a+p.length,L=p[p.length-1].length;return{from:r(x,L),to:r(x+d.length-1,1==d.length?L+d[0].length:d[d.length-1].length),match:v}}}}function g(t,n,e,r){if(t.length==n.length)return e;for(var i=0,o=e+Math.max(0,t.length-n.length);;){if(i==o)return i;var h=i+o>>1,l=r(t.slice(0,h)).length;if(l==e)return h;l>e?o=h:i=h+1}}function u(t,i,o,h){if(!i.length)return null;var l=h?n:e,c=l(i).split(/\r|\n\r?/);t:for(var s=o.line,f=o.ch,a=t.lastLine()+1-c.length;s<=a;s++,f=0){var u=t.getLine(s).slice(f),m=l(u);if(1==c.length){var v=m.indexOf(c[0]);if(-1==v)continue t;return o=g(u,m,v,l)+f,{from:r(s,g(u,m,v,l)+f),to:r(s,g(u,m,v+c[0].length,l)+f)}}var p=m.length-c[0].length;if(m.slice(p)==c[0]){for(var d=1;d<c.length-1;d++)if(l(t.getLine(s+d))!=c[d])continue t;var x=t.getLine(s+c.length-1),L=l(x),O=c[c.length-1];if(L.slice(0,O.length)==O)return{from:r(s,g(u,m,p,l)+f),to:r(s+c.length-1,g(x,L,O.length,l))}}}}function m(t,i,o,h){if(!i.length)return null;var l=h?n:e,c=l(i).split(/\r|\n\r?/);t:for(var s=o.line,f=o.ch,a=t.firstLine()-1+c.length;s>=a;s--,f=-1){var u=t.getLine(s);f>-1&&(u=u.slice(0,f));var m=l(u);if(1==c.length){var v=m.lastIndexOf(c[0]);if(-1==v)continue t;return{from:r(s,g(u,m,v,l)),to:r(s,g(u,m,v+c[0].length,l))}}var p=c[c.length-1];if(m.slice(0,p.length)==p){var d=1;for(o=s-c.length+1;d<c.length-1;d++)if(l(t.getLine(o+d))!=c[d])continue t;var x=t.getLine(s+1-c.length),L=l(x);if(L.slice(L.length-c[0].length)==c[0])return{from:r(s+1-c.length,g(x,L,x.length-c[0].length,l)),to:r(s,g(u,m,p.length,l))}}}}function v(t,n,e,i){var h;this.atOccurrence=!1,this.afterEmptyMatch=!1,this.doc=t,e=e?t.clipPos(e):r(0,0),this.pos={from:e,to:e},"object"==typeof i?h=i.caseFold:(h=i,i=null),"string"==typeof n?(null==h&&(h=!1),this.matches=function(e,r){return(e?m:u)(t,n,r,h)}):(n=o(n,"gm"),i&&!1===i.multiline?this.matches=function(e,r){return(e?f:l)(t,n,r)}:this.matches=function(e,r){return(e?a:c)(t,n,r)})}String.prototype.normalize?(n=function(t){return t.normalize("NFD").toLowerCase()},e=function(t){return t.normalize("NFD")}):(n=function(t){return t.toLowerCase()},e=function(t){return t}),v.prototype={findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},find:function(n){var e=this.doc.clipPos(n?this.pos.from:this.pos.to);if(this.afterEmptyMatch&&this.atOccurrence&&(e=r(e.line,e.ch),n?(e.ch--,e.ch<0&&(e.line--,e.ch=(this.doc.getLine(e.line)||"").length)):(e.ch++,e.ch>(this.doc.getLine(e.line)||"").length&&(e.ch=0,e.line++)),0!=t.cmpPos(e,this.doc.clipPos(e))))return this.atOccurrence=!1;var i=this.matches(n,e);if(this.afterEmptyMatch=i&&0==t.cmpPos(i.from,i.to),i)return this.pos=i,this.atOccurrence=!0,this.pos.match||!0;var o=r(n?this.doc.firstLine():this.doc.lastLine()+1,0);return this.pos={from:o,to:o},this.atOccurrence=!1},from:function(){if(this.atOccurrence)return this.pos.from},to:function(){if(this.atOccurrence)return this.pos.to},replace:function(n,e){if(this.atOccurrence){var i=t.splitLines(n);this.doc.replaceRange(i,this.pos.from,this.pos.to,e),this.pos.to=r(this.pos.from.line+i.length-1,i[i.length-1].length+(1==i.length?this.pos.from.ch:0))}}},t.defineExtension("getSearchCursor",(function(t,n,e){return new v(this.doc,t,n,e)})),t.defineDocExtension("getSearchCursor",(function(t,n,e){return new v(this,t,n,e)})),t.defineExtension("selectMatches",(function(n,e){for(var r=[],i=this.getSearchCursor(n,this.getCursor("from"),e);i.findNext()&&!(t.cmpPos(i.to(),this.getCursor("to"))>0);)r.push({anchor:i.from(),head:i.to()});r.length&&this.setSelections(r,0)}))}(CodeMirror);
//# sourceMappingURL=boolean_ops_live.9a5ff9ea.js.map
