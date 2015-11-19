/* jqKeyboard | v0.1.0 | https://github.com/hAWKdv/jqKeyboard#readme | MIT | b95 */
var jqKeyboard=function(t){"use strict";var e="input, textarea",n="normal",a="shift-b",i="special",s="jqk-btn",o="jqk-lang-btn",c="selected",r="clicked",l="minimize-btn",d="btn-row",u="jqk-hide",h="jq-keyboard",f="jqk-lang-cont",v="-lang",p=0,g=3,C={},m={},L={},b={},S={};return L={insertCharacter:function(t,e,n){return t.slice(0,e.start)+n+t.slice(e.end)},backspaceStrManipulation:function(t,e,n){return 0===e.start&&0===e.end?t:t.slice(0,e.start-n)+t.slice(e.end)},setCaretPosition:function(t,e){var n;null!==t&&(t.createTextRange?(n=t.createTextRange(),n.move("character",e),n.select()):t.selectionStart?(t.focus(),t.setSelectionRange(e,e)):t.focus())}},C={$$createBase:function(){var e,n;this.$base=t("<div>").attr("id",h),this.$langCont=t("<div>").attr("id",f),this.$minBtn=t("<div>").addClass(l).prop("title","Minimize"),this.$langCont.append(this.$minBtn),this.$base.append(this.$langCont),this.createLayout(),S.options&&S.options.containment?(this.containment=t(S.options.containment),this.containment.append(this.$base)):(t("body").append(this.$base),e=t(window).outerWidth()-this.$base.outerWidth(),n=t(window).outerHeight()-this.$base.outerHeight(),this.containment=[p,p,e,n],this.maintainContainment())},maintainContainment:function(){var e;t(window).resize(function(){clearTimeout(e),e=setTimeout(function(){var e=t(window).outerWidth()-C.$base.outerWidth(),n=t(window).outerHeight()-C.$base.outerHeight(),a=[p,p,e,n];C.$base.draggable("option","containment",a)},100)})},createLayout:function(){var t,e,n,a=jqKeyboard.layouts.length;for(n=0;a>n&&g>n;n+=1)e=jqKeyboard.layouts[n],t=this.createButtons(e,n),this.createLangSwitchBtn(e.lang,n),this.$base.append(t)},createButtons:function(e,n){var a,i,s,o,c,r=t("<div>").addClass(e.lang+v);for(n>0&&r.addClass(u),o=0;o<e.layout.length;o+=1){for(a=t("<div>").addClass(d),s=e.layout[o].split(" "),c=0;c<s.length;c+=1)i=this.buildButtonFromString(s[c]),a.append(i);r.append(a)}return r},buildButtonFromString:function(e){var i=t("<button>").addClass(s);return 1===e.length?i.addClass(n).data("val",e).html(e):3===e.length?i.addClass(a).data("val",e[0]).data("shift",e[2]).data("normal",e[0]).html(e[0]):-1!==e.indexOf("<<")&&-1!==e.indexOf(">>")&&(i=this.createSpecialBtn(i,e)),i},createSpecialBtn:function(t,e){var n=e.replace("<<","").replace(">>","");switch(n){case"space":t.data("val"," ");break;case"tab":t.data("val","	");break;case"enter":t.data("val","\n")}return t.addClass(i+" "+n).html("&nbsp;"),t},createLangSwitchBtn:function(e,n){var a=t("<button>").addClass(o).data("lang",e).html(e.toUpperCase());0===n&&(a.addClass(c),S.selectedLanguage=e),this.$langCont.append(a)}},m={SHIFT_CLASS:"."+i+".shift",CPSLCK_CLASS:"."+i+".capslock",loadLanguageSwitcher:function(){t("."+o).click(function(){var e=t(this),n=e.data("lang"),a="."+n+v,i=m.getSelectedLngClass();i!==a&&(t(i).addClass(u),t(a).removeClass(u),t("."+o+"."+c).removeClass(c),e.addClass(c),S.selectedLanguage=n,m.loadCapsLockEvent(),m.loadShiftEvent())})},getSelectedLngClass:function(){return"."+S.selectedLanguage+v},loadCapsLockEvent:function(){var e=this.getSelectedLngClass();this.onLocalButtonClick(m.CPSLCK_CLASS,function(){var n,a;S.shift||(n=t(this),a=n.closest(e),S.capsLock?(n.removeClass(c),S.capsLock=!1):(n.addClass(c),S.capsLock=!0),m.traverseLetterButtons(a,S.capsLock))})},loadShiftEvent:function(){var e=this.getSelectedLngClass();this.onLocalButtonClick(m.SHIFT_CLASS,function(){var n,a=t(m.getSelectedLngClass()).find(m.SHIFT_CLASS);return S.shift?void m.unshift():(S.capsLock&&(t(m.CPSLCK_CLASS).removeClass(c),S.capsLock=!1),n=t(this).closest(e),m.traverseInputButtons(n,!0,"shift"),S.shift=!0,void a.addClass(c))})},unshift:function(){var e=this.getSelectedLngClass(),n=t(m.getSelectedLngClass()).find(m.SHIFT_CLASS),a=n.closest(e);this.traverseInputButtons(a,!1,"normal"),S.shift=!1,n.removeClass(c)},onLocalButtonClick:function(t,e){C.$base.find(this.getSelectedLngClass()).find(t).click(e)},traverseLetterButtons:function(e,a){e.find("."+n).each(function(){var e=t(this),n=e.data("val");n=a?n.toUpperCase():n.toLowerCase(),e.html(n).data("val",n)})},traverseInputButtons:function(e,n,i){this.traverseLetterButtons(e,n),e.find("."+a).each(function(){var e=t(this),n=e.data(i);e.html(n).data("val",n)})},loadBackspaceEvent:function(){t("."+i+".backspace").click(function(){m.onDirectTextManip(function(t,e){var n;return n=t.start===t.end?1:0,{updatedContent:L.backspaceStrManipulation(e,t,n),caretOffset:-n}})})},loadInputButtonEvent:function(){C.$base.find("."+n).add("."+a).add("."+i+".space").add("."+i+".tab").add("."+i+".enter").click(function(){var e=t(this).data("val");m.onDirectTextManip(function(t,n){return{updatedContent:L.insertCharacter(n,t,e),caretOffset:1}}),S.shift&&m.unshift()})},onDirectTextManip:function(t){var e,n,a,i;m.$activeElement&&(m.resetActiveElementFocus(),n=m.$activeElement.val()||"",e=m.$activeElement[0],i={start:e.selectionStart,end:e.selectionEnd},a=t(i,n),m.$activeElement.val(a.updatedContent),L.setCaretPosition(e,i.start+a.caretOffset))},activeElementListener:function(){var n;n=S.options&&S.options.allowed?S.options.allowed.join(", "):e,t(n).focus(function(){m.$activeElement=t(this)})},resetActiveElementFocus:function(){this.$activeElement.blur(function(){setTimeout(function(){m.$activeElement.focus(function(t){t.stopPropagation()})},25)})},$$loadEvents:function(){this.activeElementListener(),this.loadLanguageSwitcher(),this.loadInputButtonEvent(),this.loadBackspaceEvent(),this.loadCapsLockEvent(),this.loadShiftEvent()}},b={attachDragToBase:function(){C.$base.draggable({containment:C.containment,cursor:"move",stop:function(){t(this).css({width:"auto",height:"auto"})}})},attachOnClickBtnEvent:function(){t("."+s).mousedown(function(){var e=t(this);e.addClass(r),setTimeout(function(){e.removeClass(r)},500)}).mouseup(function(){t(this).removeClass(r)})},minimizeKeyboard:function(){C.$minBtn.click(function(){console.log("todo")})},$$load:function(){this.attachDragToBase(),this.attachOnClickBtnEvent(),this.minimizeKeyboard()}},S={isReadyToRun:function(){return jqKeyboard.layouts?this.isRunning?(console.error("jqKeyboard: The library is already used/running in the current context/page."),!1):!0:(console.error("jqKeyboard: The keyboard layout configuration file hasn't been loaded."),!1)},init:function(t){S.isReadyToRun()&&(S.options=t,S.isRunning=!0,S.selectedLanguage=null,S.shift=!1,S.capsLock=!1,C.$$createBase(),m.$$loadEvents(),b.$$load())}},{init:S.init}}(jQuery);