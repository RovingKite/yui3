YUI.add("scrollview-base",function(e,t){function R(){R.superclass.constructor.apply(this,arguments)}var n=e.ClassNameManager.getClassName,r=e.config.doc,i=e.config.win,s=e.UA.ie,o=e.Transition.useNative,u=e.Transition._VENDOR_PREFIX,a="scrollview",f={vertical:n(a,"vert"),horizontal:n(a,"horiz")},l="scrollEnd",c="flick",h="drag",p="mousewheel",d="ui",v="top",m="right",g="bottom",y="left",b="px",w="axis",E="scrollY",S="scrollX",x="bounce",T="disabled",N="deceleration",C="x",k="y",L="boundingBox",A="contentBox",O="gesturemove",M="start",_="end",D="",P="0s",H="snapDuration",B="snapEasing",j="easing",F="frameDuration",I="bounceRange",q=function(e,t,n){return Math.min(Math.max(e,t),n)};e.ScrollView=e.extend(R,e.Widget,{_forceHWTransforms:e.UA.webkit?!0:!1,_prevent:{start:!1,move:!0,end:!1},lastScrolledAmt:0,initializer:function(e){var t=this;t._bb=t.get(L),t._cb=t.get(A),t._cAxis=t.get(w),t._cBounce=t.get(x),t._cBounceRange=t.get(I),t._cDeceleration=t.get(N),t._cFrameDuration=t.get(F)},bindUI:function(){var e=this;e._bindFlick(e.get(c)),e._bindDrag(e.get(h)),e._bindMousewheel(!0),e._bindAttrs(),s&&e._fixIESelect(e._bb,e._cb),R.SNAP_DURATION&&e.set(H,R.SNAP_DURATION),R.SNAP_EASING&&e.set(B,R.SNAP_EASING),R.EASING&&e.set(j,R.EASING),R.FRAME_STEP&&e.set(F,R.FRAME_STEP),R.BOUNCE_RANGE&&e.set(I,R.BOUNCE_RANGE)},_bindAttrs:function(){var e=this,t=e._afterScrollChange,n=e._afterDimChange;e.after({scrollEnd:e._afterScrollEnd,disabledChange:e._afterDisabledChange,flickChange:e._afterFlickChange,dragChange:e._afterDragChange,axisChange:e._afterAxisChange,scrollYChange:t,scrollXChange:t,heightChange:n,widthChange:n})},_bindDrag:function(t){var n=this,r=n._bb;r.detach(h+"|*"),t&&r.on(h+"|"+O+M,e.bind(n._onGestureMoveStart,n))},_bindFlick:function(t){var n=this,r=n._bb;r.detach(c+"|*"),t&&(r.on(c+"|"+c,e.bind(n._flick,n),t),n._bindDrag(n.get(h)))},_bindMousewheel:function(t){var n=this,i=n._bb;i.detach(p+"|*"),t&&e.one(r).on(p,e.bind(n._mousewheel,n))},syncUI:function(){var e=this,t=e._getScrollDims(),n=t.offsetWidth,r=t.offsetHeight,i=t.scrollWidth,s=t.scrollHeight;e._cAxis===undefined&&(e._cAxis={x:i>n,y:s>r},e._set(w,e._cAxis)),e.rtl=e._cb.getComputedStyle("direction")==="rtl",e._cDisabled=e.get(T),e._uiDimensionsChange(),e._isOutOfBounds()&&e._snapBack()},_getScrollDims:function(){var e=this,t=e._cb,n=e._bb,r=R._TRANSITION,i=e.get(S),s=e.get(E),u,a;return o&&(t.setStyle(r.DURATION,P),t.setStyle(r.PROPERTY,D)),u=e._forceHWTransforms,e._forceHWTransforms=!1,e._moveTo(t,0,0),a={offsetWidth:n.get("offsetWidth"),offsetHeight:n.get("offsetHeight"),scrollWidth:n.get("scrollWidth"),scrollHeight:n.get("scrollHeight")},e._moveTo(t,-i,-s),e._forceHWTransforms=u,a},_uiDimensionsChange:function(){var e=this,t=e._bb,n=e._getScrollDims(),r=n.offsetWidth,i=n.offsetHeight,s=n.scrollWidth,o=n.scrollHeight,u=e.rtl,a=e._cAxis;a&&a.x&&t.addClass(f.horizontal),a&&a.y&&t.addClass(f.vertical),e._minScrollX=u?Math.min(0,-(s-r)):0,e._maxScrollX=u?0:Math.max(0,s-r),e._minScrollY=0,e._maxScrollY=Math.max(0,o-i)},scrollTo:function(t,n,r,i,s){if(this._cDisabled)return;var u=this,a=u._cb,f=R._TRANSITION,l=e.bind(u._onTransEnd,u),c=0,h=0,p={},m;r=r||0,i=i||u.get(j),s=s||a,t!==null&&(u.set(S,t,{src:d}),c=-t),n!==null&&(u.set(E,n,{src:d}),h=-n),m=u._transform(c,h),o&&s.setStyle(f.DURATION,P).setStyle(f.PROPERTY,D),r===0?o?s.setStyle("transform",m):(t!==null&&s.setStyle(y,c+b),n!==null&&s.setStyle(v,h+b)):(p.easing=i,p.duration=r/1e3,o?p.transform=m:(p.left=c+b,p.top=h+b),s.transition(p,l))},_transform:function(e,t){var n="translate("+e+"px, "+t+"px)";return this._forceHWTransforms&&(n+=" translateZ(0)"),n},_moveTo:function(e,t,n){o?e.setStyle("transform",this._transform(t,n)):(e.setStyle(y,t+b),e.setStyle(v,n+b))},_onTransEnd:function(e){var t=this;t.fire(l)},_onGestureMoveStart:function(t){if(this._cDisabled)return!1;var n=this,r=n._bb,i=n.get(S),s=n.get(E),o=t.clientX,u=t.clientY;n._prevent.start&&t.preventDefault(),n._flickAnim&&(n._flickAnim.cancel(),delete n._flickAnim,n._onTransEnd()),t.stopPropagation(),n.lastScrolledAmt=0,n._gesture={axis:null,startX:i,startY:s,startClientX:o,startClientY:u,endClientX:null,endClientY:null,deltaX:null,deltaY:null,flick:null,onGestureMove:r.on(h+"|"+O,e.bind(n._onGestureMove,n)),onGestureMoveEnd:r.on(h+"|"+O+_,e.bind(n._onGestureMoveEnd,n))}},_onGestureMove:function(e){var t=this,n=t._gesture,r=t._cAxis,i=r.x,s=r.y,o=n.startX,u=n.startY,a=n.startClientX,f=n.startClientY,l=e.clientX,c=e.clientY;t._prevent.move&&e.preventDefault(),n.deltaX=a-l,n.deltaY=f-c,n.axis===null&&(n.axis=Math.abs(n.deltaX)>Math.abs(n.deltaY)?C:k),n.axis===C&&i?t.set(S,o+n.deltaX):n.axis===k&&s&&t.set(E,u+n.deltaY)},_onGestureMoveEnd:function(e){var t=this,n=t._gesture,r=n.flick,i=e.clientX,s=e.clientY;t._prevent.end&&e.preventDefault(),n.endClientX=i,n.endClientY=s,n.onGestureMove.detach(),n.onGestureMoveEnd.detach(),r||n.deltaX!==null&&n.deltaY!==null&&(t._isOutOfBounds()?t._snapBack():t.pages&&!t.pages.get(w)[n.axis]&&t._onTransEnd())},_flick:function(e){if(this._cDisabled)return!1;var t=this,n=t._cAxis,r=e.flick,i=r.axis,s=r.velocity,o=i===C?S:E,u=t.get(o);t._gesture&&(t._gesture.flick=r),n[i]&&t._flickFrame(s,i,u)},_flickFrame:function(t,n,r){var i=this,s=n===C?S:E,o=i._cBounce,u=i._cBounceRange,a=i._cDeceleration,f=i._cFrameDuration,l=t*a,c=r-f*l,h=n===C?i._minScrollX:i._minScrollY,p=n===C?i._maxScrollX:i._maxScrollY,d=c<h,v=c<p,m=c>h,g=c>p,y=c<h-u,b=c<p+u,w=d&&c>h-u,x=g&&c<p+u,T=c>h-u,N=c>p+u,k;if(w||x)l*=o;k=Math.abs(l).toFixed(4)<.015,k||y||N?(i._flickAnim&&(i._flickAnim.cancel(),delete i._flickAnim),m&&v?i._onTransEnd():i._snapBack()):(i._flickAnim=e.later(f,i,"_flickFrame",[l,n,c]),i.set(s,c))},_mousewheel:function(e){var t=this,n=t.get(E),r=t._bb,i=10,s=e.wheelDelta>0,o=n-(s?1:-1)*i;o=q(o,t._minScrollY,t._maxScrollY),r.contains(e.target)&&t._cAxis[k]&&(t.lastScrolledAmt=0,t.set(E,o),t.scrollbars&&(t.scrollbars._update(),t.scrollbars.flash()),t._onTransEnd(),e.preventDefault())},_isOutOfBounds:function(e,t){var n=this
,r=n._cAxis,i=r.x,s=r.y,o=e||n.get(S),u=t||n.get(E),a=n._minScrollX,f=n._minScrollY,l=n._maxScrollX,c=n._maxScrollY;return i&&(o<a||o>l)||s&&(u<f||u>c)},_snapBack:function(){var e=this,t=e.get(S),n=e.get(E),r=e._minScrollX,i=e._minScrollY,s=e._maxScrollX,o=e._maxScrollY,u=q(n,i,o),a=q(t,r,s),f=e.get(H),l=e.get(B);a!==t?e.set(S,a,{duration:f,easing:l}):u!==n?e.set(E,u,{duration:f,easing:l}):e._onTransEnd()},_afterScrollChange:function(e){if(e.src===R.UI_SRC)return!1;var t=this,n=e.duration,r=e.easing,i=e.newVal,s=[];t.lastScrolledAmt=t.lastScrolledAmt+(e.newVal-e.prevVal),e.attrName===S?(s.push(i),s.push(t.get(E))):(s.push(t.get(S)),s.push(i)),s.push(n),s.push(r),t.scrollTo.apply(t,s)},_afterFlickChange:function(e){this._bindFlick(e.newVal)},_afterDisabledChange:function(e){this._cDisabled=e.newVal},_afterAxisChange:function(e){this._cAxis=e.newVal},_afterDragChange:function(e){this._bindDrag(e.newVal)},_afterDimChange:function(){this._uiDimensionsChange()},_afterScrollEnd:function(e){var t=this;t._flickAnim&&(t._flickAnim.cancel(),delete t._flickAnim),t._isOutOfBounds()&&t._snapBack()},_axisSetter:function(t,n){if(e.Lang.isString(t))return{x:t.match(/x/i)?!0:!1,y:t.match(/y/i)?!0:!1}},_setScroll:function(t,n){return this._cDisabled&&(t=e.Attribute.INVALID_VALUE),t},_setScrollX:function(e){return this._setScroll(e,C)},_setScrollY:function(e){return this._setScroll(e,k)}},{NAME:"scrollview",ATTRS:{axis:{setter:"_axisSetter",writeOnce:"initOnly"},scrollX:{value:0,setter:"_setScrollX"},scrollY:{value:0,setter:"_setScrollY"},deceleration:{value:.93},bounce:{value:.1},flick:{value:{minDistance:10,minVelocity:.3}},drag:{value:!0},snapDuration:{value:400},snapEasing:{value:"ease-out"},easing:{value:"cubic-bezier(0, 0.1, 0, 1.0)"},frameDuration:{value:15},bounceRange:{value:150}},CLASS_NAMES:f,UI_SRC:d,_TRANSITION:{DURATION:u?u+"TransitionDuration":"transitionDuration",PROPERTY:u?u+"TransitionProperty":"transitionProperty"},BOUNCE_RANGE:!1,FRAME_STEP:!1,EASING:!1,SNAP_EASING:!1,SNAP_DURATION:!1})},"@VERSION@",{requires:["widget","event-gestures","event-mousewheel","transition"],skinnable:!0});
