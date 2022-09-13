!function(t){"use strict";var e="CodeMirror-hint",i="CodeMirror-hint-active";function n(t,e){this.cm=t,this.options=this.buildOptions(e),this.widget=this.onClose=null}function o(t){return"string"==typeof t?t:t.text}function s(t,e){var i={Up:function(){e.moveFocus(-1)},Down:function(){e.moveFocus(1)},PageUp:function(){e.moveFocus(1-e.menuSize(),!0)},PageDown:function(){e.moveFocus(e.menuSize()-1,!0)},Home:function(){e.setFocus(0)},End:function(){e.setFocus(e.length-1)},Enter:e.pick,Tab:e.pick,Esc:e.close},n=t.options.customKeys,o=n?{}:i;function s(t,n){var s;s="string"!=typeof n?function(t){return n(t,e)}:i.hasOwnProperty(n)?i[n]:n,o[t]=s}if(n)for(var c in n)n.hasOwnProperty(c)&&s(c,n[c]);var l=t.options.extraKeys;if(l)for(var c in l)l.hasOwnProperty(c)&&s(c,l[c]);return o}function c(t,e){for(;e&&e!=t;){if("LI"===e.nodeName.toUpperCase()&&e.parentNode==t)return e;e=e.parentNode}}function l(n,l){this.completion=n,this.data=l;var r=this,h=n.cm,a=this.hints=document.createElement("ul");a.className="CodeMirror-hints",this.selectedHint=l.selectedHint||0;for(var f=l.list,u=0;u<f.length;++u){var p=a.appendChild(document.createElement("li")),d=f[u],m=e+(u!=this.selectedHint?"":" "+i);null!=d.className&&(m=d.className+" "+m),p.className=m,d.render?d.render(p,l,d):p.appendChild(document.createTextNode(d.displayText||o(d))),p.hintId=u}var g=h.cursorCoords(n.options.alignWithWord?l.from:null),v=g.left,w=g.bottom,y=!0;a.style.left=v+"px",a.style.top=w+"px";var C=window.innerWidth||Math.max(document.body.offsetWidth,document.documentElement.offsetWidth),H=window.innerHeight||Math.max(document.body.offsetHeight,document.documentElement.offsetHeight);(n.options.container||document.body).appendChild(a);var k=a.getBoundingClientRect();if(k.bottom-H>0){var x=k.bottom-k.top;if(g.top-(g.bottom-k.top)-x>0)a.style.top=(w=g.top-x)+"px",y=!1;else if(x>H){a.style.height=H-5+"px",a.style.top=(w=g.bottom-k.top)+"px";var A=h.getCursor();l.from.ch!=A.ch&&(g=h.cursorCoords(A),a.style.left=(v=g.left)+"px",k=a.getBoundingClientRect())}}var T,b=k.right-C;b>0&&(k.right-k.left>C&&(a.style.width=C-5+"px",b-=k.right-k.left-C),a.style.left=(v=g.left-b)+"px"),h.addKeyMap(this.keyMap=s(n,{moveFocus:function(t,e){r.changeActive(r.selectedHint+t,e)},setFocus:function(t){r.changeActive(t)},menuSize:function(){return r.screenAmount()},length:f.length,close:function(){n.close()},pick:function(){r.pick()},data:l})),n.options.closeOnUnfocus&&(h.on("blur",this.onBlur=function(){T=setTimeout((function(){n.close()}),100)}),h.on("focus",this.onFocus=function(){clearTimeout(T)}));var N=h.getScrollInfo();return h.on("scroll",this.onScroll=function(){var t=h.getScrollInfo(),e=h.getWrapperElement().getBoundingClientRect(),i=w+N.top-t.top,o=i-(window.pageYOffset||(document.documentElement||document.body).scrollTop);if(y||(o+=a.offsetHeight),o<=e.top||o>=e.bottom)return n.close();a.style.top=i+"px",a.style.left=v+N.left-t.left+"px"}),t.on(a,"dblclick",(function(t){var e=c(a,t.target||t.srcElement);e&&null!=e.hintId&&(r.changeActive(e.hintId),r.pick())})),t.on(a,"click",(function(t){var e=c(a,t.target||t.srcElement);e&&null!=e.hintId&&(r.changeActive(e.hintId),n.options.completeOnSingleClick&&r.pick())})),t.on(a,"mousedown",(function(){setTimeout((function(){h.focus()}),20)})),t.signal(l,"select",f[0],a.firstChild),!0}t.showHint=function(t,e,i){if(!e)return t.showHint(i);i&&i.async&&(e.async=!0);var n={hint:e};if(i)for(var o in i)n[o]=i[o];return t.showHint(n)},t.defineExtension("showHint",(function(e){if(!(this.listSelections().length>1||this.somethingSelected())){this.state.completionActive&&this.state.completionActive.close();var i=this.state.completionActive=new n(this,e),o=i.options.hint;if(o){if(t.signal(this,"startCompletion",this),!o.async)return i.showHints(o(this,i.options));o(this,(function(t){i.showHints(t)}),i.options)}}})),n.prototype={close:function(){this.active()&&(this.cm.state.completionActive=null,this.widget&&this.widget.close(),this.onClose&&this.onClose(),t.signal(this.cm,"endCompletion",this.cm))},active:function(){return this.cm.state.completionActive==this},pick:function(e,i){var n=e.list[i];n.hint?n.hint(this.cm,e,n):this.cm.replaceRange(o(n),n.from||e.from,n.to||e.to,"complete"),t.signal(e,"pick",n),this.close()},showHints:function(t){if(!t||!t.list.length||!this.active())return this.close();this.options.completeSingle&&1==t.list.length?this.pick(t,0):this.showWidget(t)},showWidget:function(e){this.widget=new l(this,e),t.signal(e,"shown");var i,n=0,o=this,s=this.options.closeCharacters,c=this.cm.getCursor(),r=this.cm.getLine(c.line).length,h=window.requestAnimationFrame||function(t){return setTimeout(t,1e3/60)},a=window.cancelAnimationFrame||clearTimeout;function f(){i||(i=!0,o.close(),o.cm.off("cursorActivity",m),e&&t.signal(e,"close"))}function u(){if(!i){t.signal(e,"update");var n=o.options.hint;n.async?n(o.cm,p,o.options):p(n(o.cm,o.options))}}function p(t){if(e=t,!i){if(!e||!e.list.length)return f();o.widget&&o.widget.close(),o.widget=new l(o,e)}}function d(){n&&(a(n),n=0)}function m(){d();var t=o.cm.getCursor(),e=o.cm.getLine(t.line);t.line!=c.line||e.length-t.ch!=r-c.ch||t.ch<c.ch||o.cm.somethingSelected()||t.ch&&s.test(e.charAt(t.ch-1))?o.close():(n=h(u),o.widget&&o.widget.close())}this.cm.on("cursorActivity",m),this.onClose=f},buildOptions:function(t){var e=this.cm.options.hintOptions,i={};for(var n in r)i[n]=r[n];if(e)for(var n in e)void 0!==e[n]&&(i[n]=e[n]);if(t)for(var n in t)void 0!==t[n]&&(i[n]=t[n]);return i}},l.prototype={close:function(){if(this.completion.widget==this){this.completion.widget=null,this.hints.parentNode.removeChild(this.hints),this.completion.cm.removeKeyMap(this.keyMap);var t=this.completion.cm;this.completion.options.closeOnUnfocus&&(t.off("blur",this.onBlur),t.off("focus",this.onFocus)),t.off("scroll",this.onScroll)}},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(e,n){if(e>=this.data.list.length?e=n?this.data.list.length-1:0:e<0&&(e=n?0:this.data.list.length-1),this.selectedHint!=e){var o=this.hints.childNodes[this.selectedHint];o.className=o.className.replace(" "+i,""),(o=this.hints.childNodes[this.selectedHint=e]).className+=" "+i,o.offsetTop<this.hints.scrollTop?this.hints.scrollTop=o.offsetTop-3:o.offsetTop+o.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=o.offsetTop+o.offsetHeight-this.hints.clientHeight+3),t.signal(this.data,"select",this.data.list[this.selectedHint],o)}},screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1}},t.registerHelper("hint","auto",(function(e,i){var n,o=e.getHelpers(e.getCursor(),"hint");if(o.length)for(var s=0;s<o.length;s++){var c=o[s](e,i);if(c&&c.list.length)return c}else if(n=e.getHelper(e.getCursor(),"hintWords")){if(n)return t.hint.fromList(e,{words:n})}else if(t.hint.anyword)return t.hint.anyword(e,i)})),t.registerHelper("hint","fromList",(function(e,i){for(var n=e.getCursor(),o=e.getTokenAt(n),s=[],c=0;c<i.words.length;c++){var l=i.words[c];l.slice(0,o.string.length)==o.string&&s.push(l)}if(s.length)return{list:s,from:t.Pos(n.line,o.start),to:t.Pos(n.line,o.end)}})),t.commands.autocomplete=t.showHint;var r={hint:t.hint.auto,completeSingle:!0,alignWithWord:!0,closeCharacters:/[\s()\[\]{};:>,]/,closeOnUnfocus:!0,completeOnSingleClick:!1,container:null,customKeys:null,extraKeys:null};t.defineOption("hintOptions",null)}(CodeMirror);
//# sourceMappingURL=boolean_ops_live.d4381dda.js.map