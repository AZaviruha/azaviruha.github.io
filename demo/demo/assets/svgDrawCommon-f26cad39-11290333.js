var o=Object.defineProperty;var i=(n,t)=>o(n,"name",{value:t,configurable:!0});import{o as l}from"./mermaid-a98f434b-6ad3a326.js";const c=i(function(n,t){const r=n.append("rect");if(r.attr("x",t.x),r.attr("y",t.y),r.attr("fill",t.fill),r.attr("stroke",t.stroke),r.attr("width",t.width),r.attr("height",t.height),r.attr("rx",t.rx),r.attr("ry",t.ry),t.attrs!=="undefined"&&t.attrs!==null)for(let s in t.attrs)r.attr(s,t.attrs[s]);return t.class!=="undefined"&&r.attr("class",t.class),r},"drawRect"),f=i(function(n,t){c(n,{x:t.startx,y:t.starty,width:t.stopx-t.startx,height:t.stopy-t.starty,fill:t.fill,stroke:t.stroke,class:"rect"}).lower()},"drawBackgroundRect"),h=i(function(n,t){const r=t.text.replace(/<br\s*\/?>/gi," "),s=n.append("text");s.attr("x",t.x),s.attr("y",t.y),s.attr("class","legend"),s.style("text-anchor",t.anchor),t.class!==void 0&&s.attr("class",t.class);const e=s.append("tspan");return e.attr("x",t.x+t.textMargin*2),e.text(r),s},"drawText"),g=i(function(n,t,r,s){const e=n.append("image");e.attr("x",t),e.attr("y",r);var a=l.sanitizeUrl(s);e.attr("xlink:href",a)},"drawImage"),y=i(function(n,t,r,s){const e=n.append("use");e.attr("x",t),e.attr("y",r);const a=l.sanitizeUrl(s);e.attr("xlink:href","#"+a)},"drawEmbeddedImage"),p=i(function(){return{x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}},"getNoteRect"),m=i(function(){return{x:0,y:0,width:100,height:100,fill:void 0,anchor:void 0,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0,valign:void 0}},"getTextObj");export{m as a,f as b,y as c,c as d,g as e,h as f,p as g};
//# sourceMappingURL=svgDrawCommon-f26cad39-11290333.js.map