var W=Object.defineProperty;var f=(e,a)=>W(e,"name",{value:a,configurable:!0});import{p as R,d as H,s as v}from"./styles-f626f8de-581d5f89.js";import{c as t,i as z,l as S,j as U,k as L,H as C,z as F}from"./mermaid-a98f434b-6ad3a326.js";import{G as $,l as O}from"./layout-06a9841d.js";import{l as X}from"./line-b92a72a5.js";import"./preload-helper-d51aff73.js";import"./index-32ac9e7b.js";import"./_commonjsHelpers-df0bf62c.js";import"./memoize-a38ec700.js";import"./_MapCache-7e836c94.js";import"./isArray-6de4a062.js";import"./_getTag-9b3eabd6.js";import"./get-fec7d053.js";import"./isSymbol-3167caec.js";import"./toString-40b958f3.js";import"./now-f5237b2a.js";import"./_arrayReduce-b962fc90.js";import"./array-2d8cd92e.js";import"./path-56a6d420.js";const J=f(e=>e.append("circle").attr("class","start-state").attr("r",t().state.sizeUnit).attr("cx",t().state.padding+t().state.sizeUnit).attr("cy",t().state.padding+t().state.sizeUnit),"drawStartState"),Y=f(e=>e.append("line").style("stroke","grey").style("stroke-dasharray","3").attr("x1",t().state.textHeight).attr("class","divider").attr("x2",t().state.textHeight*2).attr("y1",0).attr("y2",0),"drawDivider"),I=f((e,a)=>{const o=e.append("text").attr("x",2*t().state.padding).attr("y",t().state.textHeight+2*t().state.padding).attr("font-size",t().state.fontSize).attr("class","state-title").text(a.id),c=o.node().getBBox();return e.insert("rect",":first-child").attr("x",t().state.padding).attr("y",t().state.padding).attr("width",c.width+2*t().state.padding).attr("height",c.height+2*t().state.padding).attr("rx",t().state.radius),o},"drawSimpleState"),_=f((e,a)=>{const o=f(function(l,B,w){const k=l.append("tspan").attr("x",2*t().state.padding).text(B);w||k.attr("dy",t().state.textHeight)},"addTspan"),s=e.append("text").attr("x",2*t().state.padding).attr("y",t().state.textHeight+1.3*t().state.padding).attr("font-size",t().state.fontSize).attr("class","state-title").text(a.descriptions[0]).node().getBBox(),g=s.height,h=e.append("text").attr("x",t().state.padding).attr("y",g+t().state.padding*.4+t().state.dividerMargin+t().state.textHeight).attr("class","state-description");let i=!0,r=!0;a.descriptions.forEach(function(l){i||(o(h,l,r),r=!1),i=!1});const m=e.append("line").attr("x1",t().state.padding).attr("y1",t().state.padding+g+t().state.dividerMargin/2).attr("y2",t().state.padding+g+t().state.dividerMargin/2).attr("class","descr-divider"),x=h.node().getBBox(),d=Math.max(x.width,s.width);return m.attr("x2",d+3*t().state.padding),e.insert("rect",":first-child").attr("x",t().state.padding).attr("y",t().state.padding).attr("width",d+2*t().state.padding).attr("height",x.height+g+2*t().state.padding).attr("rx",t().state.radius),e},"drawDescrState"),q=f((e,a,o)=>{const c=t().state.padding,s=2*t().state.padding,g=e.node().getBBox(),h=g.width,i=g.x,r=e.append("text").attr("x",0).attr("y",t().state.titleShift).attr("font-size",t().state.fontSize).attr("class","state-title").text(a.id),x=r.node().getBBox().width+s;let d=Math.max(x,h);d===h&&(d=d+s);let l;const B=e.node().getBBox();a.doc,l=i-c,x>h&&(l=(h-d)/2+c),Math.abs(i-B.x)<c&&x>h&&(l=i-(x-h)/2);const w=1-t().state.textHeight;return e.insert("rect",":first-child").attr("x",l).attr("y",w).attr("class",o?"alt-composit":"composit").attr("width",d).attr("height",B.height+t().state.textHeight+t().state.titleShift+1).attr("rx","0"),r.attr("x",l+c),x<=h&&r.attr("x",i+(d-s)/2-x/2+c),e.insert("rect",":first-child").attr("x",l).attr("y",t().state.titleShift-t().state.textHeight-t().state.padding).attr("width",d).attr("height",t().state.textHeight*3).attr("rx",t().state.radius),e.insert("rect",":first-child").attr("x",l).attr("y",t().state.titleShift-t().state.textHeight-t().state.padding).attr("width",d).attr("height",B.height+3+2*t().state.textHeight).attr("rx",t().state.radius),e},"addTitleAndBox"),Z=f(e=>(e.append("circle").attr("class","end-state-outer").attr("r",t().state.sizeUnit+t().state.miniPadding).attr("cx",t().state.padding+t().state.sizeUnit+t().state.miniPadding).attr("cy",t().state.padding+t().state.sizeUnit+t().state.miniPadding),e.append("circle").attr("class","end-state-inner").attr("r",t().state.sizeUnit).attr("cx",t().state.padding+t().state.sizeUnit+2).attr("cy",t().state.padding+t().state.sizeUnit+2)),"drawEndState"),j=f((e,a)=>{let o=t().state.forkWidth,c=t().state.forkHeight;if(a.parentId){let s=o;o=c,c=s}return e.append("rect").style("stroke","black").style("fill","black").attr("width",o).attr("height",c).attr("x",t().state.padding).attr("y",t().state.padding)},"drawForkJoinState"),K=f((e,a,o,c)=>{let s=0;const g=c.append("text");g.style("text-anchor","start"),g.attr("class","noteText");let h=e.replace(/\r\n/g,"<br/>");h=h.replace(/\n/g,"<br/>");const i=h.split(L.lineBreakRegex);let r=1.25*t().state.noteMargin;for(const m of i){const x=m.trim();if(x.length>0){const d=g.append("tspan");if(d.text(x),r===0){const l=d.node().getBBox();r+=l.height}s+=r,d.attr("x",a+t().state.noteMargin),d.attr("y",o+s+1.25*t().state.noteMargin)}}return{textWidth:g.node().getBBox().width,textHeight:s}},"_drawLongText"),Q=f((e,a)=>{a.attr("class","state-note");const o=a.append("rect").attr("x",0).attr("y",t().state.padding),c=a.append("g"),{textWidth:s,textHeight:g}=K(e,0,0,c);return o.attr("height",g+2*t().state.noteMargin),o.attr("width",s+t().state.noteMargin*2),o},"drawNote"),G=f(function(e,a){const o=a.id,c={id:o,label:a.id,width:0,height:0},s=e.append("g").attr("id",o).attr("class","stateGroup");a.type==="start"&&J(s),a.type==="end"&&Z(s),(a.type==="fork"||a.type==="join")&&j(s,a),a.type==="note"&&Q(a.note.text,s),a.type==="divider"&&Y(s),a.type==="default"&&a.descriptions.length===0&&I(s,a),a.type==="default"&&a.descriptions.length>0&&_(s,a);const g=s.node().getBBox();return c.width=g.width+2*t().state.padding,c.height=g.height+2*t().state.padding,c},"drawState");let A=0;const V=f(function(e,a,o){const c=f(function(r){switch(r){case H.relationType.AGGREGATION:return"aggregation";case H.relationType.EXTENSION:return"extension";case H.relationType.COMPOSITION:return"composition";case H.relationType.DEPENDENCY:return"dependency"}},"getRelationType");a.points=a.points.filter(r=>!Number.isNaN(r.y));const s=a.points,g=X().x(function(r){return r.x}).y(function(r){return r.y}).curve(C),h=e.append("path").attr("d",g(s)).attr("id","edge"+A).attr("class","transition");let i="";if(t().state.arrowMarkerAbsolute&&(i=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,i=i.replace(/\(/g,"\\("),i=i.replace(/\)/g,"\\)")),h.attr("marker-end","url("+i+"#"+c(H.relationType.DEPENDENCY)+"End)"),o.title!==void 0){const r=e.append("g").attr("class","stateLabel"),{x:m,y:x}=F.calcLabelPosition(a.points),d=L.getRows(o.title);let l=0;const B=[];let w=0,k=0;for(let u=0;u<=d.length;u++){const p=r.append("text").attr("text-anchor","middle").text(d[u]).attr("x",m).attr("y",x+l),y=p.node().getBBox();w=Math.max(w,y.width),k=Math.min(k,y.x),S.info(y.x,m,x+l),l===0&&(l=p.node().getBBox().height,S.info("Title height",l,x)),B.push(p)}let N=l*d.length;if(d.length>1){const u=(d.length-1)*l*.5;B.forEach((p,y)=>p.attr("y",x+y*l-u)),N=l*d.length}const n=r.node().getBBox();r.insert("rect",":first-child").attr("class","box").attr("x",m-w/2-t().state.padding/2).attr("y",x-N/2-t().state.padding/2-3.5).attr("width",w+t().state.padding).attr("height",N+t().state.padding),S.info(n)}A++},"drawEdge");let b;const T={},D=f(function(){},"setConf"),tt=f(function(e){e.append("defs").append("marker").attr("id","dependencyEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 19,7 L9,13 L14,7 L9,1 Z")},"insertMarkers"),et=f(function(e,a,o,c){b=t().state;const s=t().securityLevel;let g;s==="sandbox"&&(g=z("#i"+a));const h=s==="sandbox"?z(g.nodes()[0].contentDocument.body):z("body"),i=s==="sandbox"?g.nodes()[0].contentDocument:document;S.debug("Rendering diagram "+e);const r=h.select(`[id='${a}']`);tt(r);const m=c.db.getRootDoc();P(m,r,void 0,!1,h,i,c);const x=b.padding,d=r.node().getBBox(),l=d.width+x*2,B=d.height+x*2,w=l*1.75;U(r,B,w,b.useMaxWidth),r.attr("viewBox",`${d.x-b.padding}  ${d.y-b.padding} `+l+" "+B)},"draw"),it=f(e=>e?e.length*b.fontSizeFactor:1,"getLabelWidth"),P=f((e,a,o,c,s,g,h)=>{const i=new $({compound:!0,multigraph:!0});let r,m=!0;for(r=0;r<e.length;r++)if(e[r].stmt==="relation"){m=!1;break}o?i.setGraph({rankdir:"LR",multigraph:!0,compound:!0,ranker:"tight-tree",ranksep:m?1:b.edgeLengthFactor,nodeSep:m?1:50,isMultiGraph:!0}):i.setGraph({rankdir:"TB",multigraph:!0,compound:!0,ranksep:m?1:b.edgeLengthFactor,nodeSep:m?1:50,ranker:"tight-tree",isMultiGraph:!0}),i.setDefaultEdgeLabel(function(){return{}}),h.db.extract(e);const x=h.db.getStates(),d=h.db.getRelations(),l=Object.keys(x);for(const n of l){const u=x[n];o&&(u.parentId=o);let p;if(u.doc){let y=a.append("g").attr("id",u.id).attr("class","stateGroup");p=P(u.doc,y,u.id,!c,s,g,h);{y=q(y,u,c);let E=y.node().getBBox();p.width=E.width,p.height=E.height+b.padding/2,T[u.id]={y:b.compositTitleSize}}}else p=G(a,u);if(u.note){const y={descriptions:[],id:u.id+"-note",note:u.note,type:"note"},E=G(a,y);u.note.position==="left of"?(i.setNode(p.id+"-note",E),i.setNode(p.id,p)):(i.setNode(p.id,p),i.setNode(p.id+"-note",E)),i.setParent(p.id,p.id+"-group"),i.setParent(p.id+"-note",p.id+"-group")}else i.setNode(p.id,p)}S.debug("Count=",i.nodeCount(),i);let B=0;d.forEach(function(n){B++,S.debug("Setting edge",n),i.setEdge(n.id1,n.id2,{relation:n,width:it(n.title),height:b.labelHeight*L.getRows(n.title).length,labelpos:"c"},"id"+B)}),O(i),S.debug("Graph after layout",i.nodes());const w=a.node();i.nodes().forEach(function(n){n!==void 0&&i.node(n)!==void 0?(S.warn("Node "+n+": "+JSON.stringify(i.node(n))),s.select("#"+w.id+" #"+n).attr("transform","translate("+(i.node(n).x-i.node(n).width/2)+","+(i.node(n).y+(T[n]?T[n].y:0)-i.node(n).height/2)+" )"),s.select("#"+w.id+" #"+n).attr("data-x-shift",i.node(n).x-i.node(n).width/2),g.querySelectorAll("#"+w.id+" #"+n+" .divider").forEach(p=>{const y=p.parentElement;let E=0,M=0;y&&(y.parentElement&&(E=y.parentElement.getBBox().width),M=parseInt(y.getAttribute("data-x-shift"),10),Number.isNaN(M)&&(M=0)),p.setAttribute("x1",0-M+8),p.setAttribute("x2",E-M-8)})):S.debug("No Node "+n+": "+JSON.stringify(i.node(n)))});let k=w.getBBox();i.edges().forEach(function(n){n!==void 0&&i.edge(n)!==void 0&&(S.debug("Edge "+n.v+" -> "+n.w+": "+JSON.stringify(i.edge(n))),V(a,i.edge(n),i.edge(n).relation))}),k=w.getBBox();const N={id:o||"root",label:o||"root",width:0,height:0};return N.width=k.width+2*b.padding,N.height=k.height+2*b.padding,S.debug("Doc rendered",N,i),N},"renderDoc"),at={setConf:D,draw:et},Et={parser:R,db:H,renderer:at,styles:v,init:e=>{e.state||(e.state={}),e.state.arrowMarkerAbsolute=e.arrowMarkerAbsolute,H.clear()}};export{Et as diagram};
//# sourceMappingURL=stateDiagram-b1c07dc6-5ec7f710.js.map
