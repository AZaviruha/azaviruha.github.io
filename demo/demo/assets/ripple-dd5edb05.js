var g=Object.defineProperty;var l=(e,t)=>g(e,"name",{value:t,configurable:!0});const o=l(e=>"targetTouches"in e,"isTouchEventGuard"),u=l(e=>{const t=e.currentTarget;if(t==null)return;const c=t.getBoundingClientRect(),s=document.createElement("span"),n=Math.max(c.width,c.height),a=n/2,p=o(e)?e.targetTouches[0].pageX:e.pageX,i=o(e)?e.targetTouches[0].pageY:e.pageY;s.style.width=`${n}px`,s.style.height=`${n}px`,s.style.left=`${p-c.x-window.scrollX-a}px`,s.style.top=`${i-c.y-window.scrollY-a}px`,s.classList.add("cf-ripple");const r=t.getElementsByClassName("cf-ripple")[0];r!=null&&r.remove(),t.appendChild(s)},"createRipple");export{u as c};
//# sourceMappingURL=ripple-dd5edb05.js.map
