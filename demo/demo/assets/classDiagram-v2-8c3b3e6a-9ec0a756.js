var M=Object.defineProperty;var y=(o,e)=>M(o,"name",{value:e,configurable:!0});import{p as R,d as D,s as B}from"./styles-88ad4441-60e5eed5.js";import{l as d,c,i as k,z as G,u as z,t as _,p as C,q,k as A}from"./mermaid-a98f434b-6ad3a326.js";import{G as P}from"./layout-06a9841d.js";import{r as F}from"./index-4c4adb72-f5a5e4b7.js";import"./preload-helper-d51aff73.js";import"./index-32ac9e7b.js";import"./_commonjsHelpers-df0bf62c.js";import"./memoize-a38ec700.js";import"./_MapCache-7e836c94.js";import"./isArray-6de4a062.js";import"./_getTag-9b3eabd6.js";import"./get-fec7d053.js";import"./isSymbol-3167caec.js";import"./toString-40b958f3.js";import"./now-f5237b2a.js";import"./_arrayReduce-b962fc90.js";import"./edges-b00f0ec2-afddb99d.js";import"./createText-285e50b4-c51484b0.js";import"./svgDraw-5d8a058e-478ed659.js";import"./line-b92a72a5.js";import"./array-2d8cd92e.js";import"./path-56a6d420.js";const T=y(o=>A.sanitizeText(o,c()),"sanitizeText");let S={dividerMargin:10,padding:5,textHeight:10,curve:void 0};const H=y(function(o,e,f,n){const t=Object.keys(o);d.info("keys:",t),d.info(o),t.forEach(function(i){var l,r;const s=o[i],p={shape:"rect",id:s.id,domId:s.domId,labelText:T(s.id),labelStyle:"",style:"fill: none; stroke: black",padding:((l=c().flowchart)==null?void 0:l.padding)??((r=c().class)==null?void 0:r.padding)};e.setNode(s.id,p),$(s.classes,e,f,n,s.id),d.info("setNode",p)})},"addNamespaces"),$=y(function(o,e,f,n,t){const i=Object.keys(o);d.info("keys:",i),d.info(o),i.filter(l=>o[l].parent==t).forEach(function(l){var r,s;const a=o[l],p=a.cssClasses.join(" "),b={labelStyle:"",style:""},v=a.label??a.id,u=0,h="class_box",m={labelStyle:b.labelStyle,shape:h,labelText:T(v),classData:a,rx:u,ry:u,class:p,style:b.style,id:a.id,domId:a.domId,tooltip:n.db.getTooltip(a.id,t)||"",haveCallback:a.haveCallback,link:a.link,width:a.type==="group"?500:void 0,type:a.type,padding:((r=c().flowchart)==null?void 0:r.padding)??((s=c().class)==null?void 0:s.padding)};e.setNode(a.id,m),t&&e.setParent(a.id,t),d.info("setNode",m)})},"addClasses"),V=y(function(o,e,f,n){d.info(o),o.forEach(function(t,i){var l,r;const s=t,a="",p={labelStyle:"",style:""},b=s.text,v=0,u="note",h={labelStyle:p.labelStyle,shape:u,labelText:T(b),noteData:s,rx:v,ry:v,class:a,style:p.style,id:s.id,domId:s.id,tooltip:"",type:"note",padding:((l=c().flowchart)==null?void 0:l.padding)??((r=c().class)==null?void 0:r.padding)};if(e.setNode(s.id,h),d.info("setNode",h),!s.class||!(s.class in n))return;const m=f+i,x={id:`edgeNote${m}`,classes:"relation",pattern:"dotted",arrowhead:"none",startLabelRight:"",endLabelLeft:"",arrowTypeStart:"none",arrowTypeEnd:"none",style:"fill:none",labelStyle:"",curve:_(S.curve,C)};e.setEdge(s.id,s.class,x,m)})},"addNotes"),W=y(function(o,e){const f=c().flowchart;let n=0;o.forEach(function(t){var i;n++;const l={classes:"relation",pattern:t.relation.lineType==1?"dashed":"solid",id:"id"+n,arrowhead:t.type==="arrow_open"?"none":"normal",startLabelRight:t.relationTitle1==="none"?"":t.relationTitle1,endLabelLeft:t.relationTitle2==="none"?"":t.relationTitle2,arrowTypeStart:E(t.relation.type1),arrowTypeEnd:E(t.relation.type2),style:"fill:none",labelStyle:"",curve:_(f==null?void 0:f.curve,C)};if(d.info(l,t),t.style!==void 0){const r=q(t.style);l.style=r.style,l.labelStyle=r.labelStyle}t.text=t.title,t.text===void 0?t.style!==void 0&&(l.arrowheadStyle="fill: #333"):(l.arrowheadStyle="fill: #333",l.labelpos="c",((i=c().flowchart)==null?void 0:i.htmlLabels)??c().htmlLabels?(l.labelType="html",l.label='<span class="edgeLabel">'+t.text+"</span>"):(l.labelType="text",l.label=t.text.replace(A.lineBreakRegex,`
`),t.style===void 0&&(l.style=l.style||"stroke: #333; stroke-width: 1.5px;fill:none"),l.labelStyle=l.labelStyle.replace("color:","fill:"))),e.setEdge(t.id1,t.id2,l,n)})},"addRelations"),J=y(function(o){S={...S,...o}},"setConf"),K=y(async function(o,e,f,n){d.info("Drawing class - ",e);const t=c().flowchart??c().class,i=c().securityLevel;d.info("config:",t);const l=(t==null?void 0:t.nodeSpacing)??50,r=(t==null?void 0:t.rankSpacing)??50,s=new P({multigraph:!0,compound:!0}).setGraph({rankdir:n.db.getDirection(),nodesep:l,ranksep:r,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}}),a=n.db.getNamespaces(),p=n.db.getClasses(),b=n.db.getRelations(),v=n.db.getNotes();d.info(b),H(a,s,e,n),$(p,s,e,n),W(b,s),V(v,s,b.length+1,p);let u;i==="sandbox"&&(u=k("#i"+e));const h=i==="sandbox"?k(u.nodes()[0].contentDocument.body):k("body"),m=h.select(`[id="${e}"]`),x=h.select("#"+e+" g");if(await F(x,s,["aggregation","extension","composition","dependency","lollipop"],"classDiagram",e),G.insertTitle(m,"classTitleText",(t==null?void 0:t.titleTopMargin)??5,n.db.getDiagramTitle()),z(s,m,t==null?void 0:t.diagramPadding,t==null?void 0:t.useMaxWidth),!(t!=null&&t.htmlLabels)){const L=i==="sandbox"?u.nodes()[0].contentDocument:document,I=L.querySelectorAll('[id="'+e+'"] .edgeLabel .label');for(const w of I){const N=w.getBBox(),g=L.createElementNS("http://www.w3.org/2000/svg","rect");g.setAttribute("rx",0),g.setAttribute("ry",0),g.setAttribute("width",N.width),g.setAttribute("height",N.height),w.insertBefore(g,w.firstChild)}}},"draw");function E(o){let e;switch(o){case 0:e="aggregation";break;case 1:e="extension";break;case 2:e="composition";break;case 3:e="dependency";break;case 4:e="lollipop";break;default:e="none"}return e}y(E,"getArrowMarker");const Q={setConf:J,draw:K},ht={parser:R,db:D,renderer:Q,styles:B,init:o=>{o.class||(o.class={}),o.class.arrowMarkerAbsolute=o.arrowMarkerAbsolute,D.clear()}};export{ht as diagram};
//# sourceMappingURL=classDiagram-v2-8c3b3e6a-9ec0a756.js.map