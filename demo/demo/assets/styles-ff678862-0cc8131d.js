var F=Object.defineProperty;var p=(e,l)=>F(e,"name",{value:l,configurable:!0});import{i as M,G as R}from"./layout-06a9841d.js";import{S as G,C as U,D as H,_ as W,E as X,q as A,l as w,r as J,c as $,k as z,t as E,p as L,i as C,z as K,u as Q,F as Y}from"./mermaid-a98f434b-6ad3a326.js";import{f as Z}from"./flowDb-8f9fc471-f2a1a3a8.js";import{r as j}from"./index-4c4adb72-f5a5e4b7.js";import{i as O}from"./_MapCache-7e836c94.js";function ee(e){return typeof e=="string"?new G([document.querySelectorAll(e)],[document.documentElement]):new G([H(e)],U)}p(ee,"selectAll");const te=p((e,l)=>W.lang.round(X.parse(e)[l]),"channel"),re=te;function ge(e,l){return!!e.children(l).length}p(ge,"isSubgraph");function ke(e){return N(e.v)+":"+N(e.w)+":"+N(e.name)}p(ke,"edgeToId");var le=/:/g;function N(e){return e?String(e).replace(le,"\\:"):""}p(N,"escapeId");function ae(e,l){l&&e.attr("style",l)}p(ae,"applyStyle");function xe(e,l,c){l&&e.attr("class",l).attr("class",c+" "+e.attr("class"))}p(xe,"applyClass");function me(e,l){var c=l.graph();if(M(c)){var a=c.transition;if(O(a))return a(e)}return e}p(me,"applyTransition");function oe(e,l){var c=e.append("foreignObject").attr("width","100000"),a=c.append("xhtml:div");a.attr("xmlns","http://www.w3.org/1999/xhtml");var i=l.label;switch(typeof i){case"function":a.insert(i);break;case"object":a.insert(function(){return i});break;default:a.html(i)}ae(a,l.labelStyle),a.style("display","inline-block"),a.style("white-space","nowrap");var d=a.node().getBoundingClientRect();return c.attr("width",d.width).attr("height",d.height),c}p(oe,"addHtmlLabel");const q={},ne=p(function(e){const l=Object.keys(e);for(const c of l)q[c]=e[c]},"setConf"),P=p(function(e,l,c,a,i,d){const h=a.select(`[id="${c}"]`);Object.keys(e).forEach(function(b){const r=e[b];let k="default";r.classes.length>0&&(k=r.classes.join(" ")),k=k+" flowchart-label";const y=A(r.styles);let t=r.text!==void 0?r.text:r.id,s;if(w.info("vertex",r,r.labelType),r.labelType==="markdown")w.info("vertex",r,r.labelType);else if(J($().flowchart.htmlLabels)){const v={label:t.replace(/fa[blrs]?:fa-[\w-]+/g,x=>`<i class='${x.replace(":"," ")}'></i>`)};s=oe(h,v).node(),s.parentNode.removeChild(s)}else{const v=i.createElementNS("http://www.w3.org/2000/svg","text");v.setAttribute("style",y.labelStyle.replace("color:","fill:"));const x=t.split(z.lineBreakRegex);for(const _ of x){const S=i.createElementNS("http://www.w3.org/2000/svg","tspan");S.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),S.setAttribute("dy","1em"),S.setAttribute("x","1"),S.textContent=_,v.appendChild(S)}s=v}let f=0,o="";switch(r.type){case"round":f=5,o="rect";break;case"square":o="rect";break;case"diamond":o="question";break;case"hexagon":o="hexagon";break;case"odd":o="rect_left_inv_arrow";break;case"lean_right":o="lean_right";break;case"lean_left":o="lean_left";break;case"trapezoid":o="trapezoid";break;case"inv_trapezoid":o="inv_trapezoid";break;case"odd_right":o="rect_left_inv_arrow";break;case"circle":o="circle";break;case"ellipse":o="ellipse";break;case"stadium":o="stadium";break;case"subroutine":o="subroutine";break;case"cylinder":o="cylinder";break;case"group":o="rect";break;case"doublecircle":o="doublecircle";break;default:o="rect"}l.setNode(r.id,{labelStyle:y.labelStyle,shape:o,labelText:t,labelType:r.labelType,rx:f,ry:f,class:k,style:y.style,id:r.id,link:r.link,linkTarget:r.linkTarget,tooltip:d.db.getTooltip(r.id)||"",domId:d.db.lookUpDomId(r.id),haveCallback:r.haveCallback,width:r.type==="group"?500:void 0,dir:r.dir,type:r.type,props:r.props,padding:$().flowchart.padding}),w.info("setNode",{labelStyle:y.labelStyle,labelType:r.labelType,shape:o,labelText:t,rx:f,ry:f,class:k,style:y.style,id:r.id,domId:d.db.lookUpDomId(r.id),width:r.type==="group"?500:void 0,type:r.type,dir:r.dir,props:r.props,padding:$().flowchart.padding})})},"addVertices"),V=p(function(e,l,c){w.info("abc78 edges = ",e);let a=0,i={},d,h;if(e.defaultStyle!==void 0){const n=A(e.defaultStyle);d=n.style,h=n.labelStyle}e.forEach(function(n){a++;const b="L-"+n.start+"-"+n.end;i[b]===void 0?(i[b]=0,w.info("abc78 new entry",b,i[b])):(i[b]++,w.info("abc78 new entry",b,i[b]));let r=b+"-"+i[b];w.info("abc78 new link id to be used is",b,r,i[b]);const k="LS-"+n.start,y="LE-"+n.end,t={style:"",labelStyle:""};switch(t.minlen=n.length||1,n.type==="arrow_open"?t.arrowhead="none":t.arrowhead="normal",t.arrowTypeStart="arrow_open",t.arrowTypeEnd="arrow_open",n.type){case"double_arrow_cross":t.arrowTypeStart="arrow_cross";case"arrow_cross":t.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":t.arrowTypeStart="arrow_point";case"arrow_point":t.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":t.arrowTypeStart="arrow_circle";case"arrow_circle":t.arrowTypeEnd="arrow_circle";break}let s="",f="";switch(n.stroke){case"normal":s="fill:none;",d!==void 0&&(s=d),h!==void 0&&(f=h),t.thickness="normal",t.pattern="solid";break;case"dotted":t.thickness="normal",t.pattern="dotted",t.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":t.thickness="thick",t.pattern="solid",t.style="stroke-width: 3.5px;fill:none;";break;case"invisible":t.thickness="invisible",t.pattern="solid",t.style="stroke-width: 0;fill:none;";break}if(n.style!==void 0){const o=A(n.style);s=o.style,f=o.labelStyle}t.style=t.style+=s,t.labelStyle=t.labelStyle+=f,n.interpolate!==void 0?t.curve=E(n.interpolate,L):e.defaultInterpolate!==void 0?t.curve=E(e.defaultInterpolate,L):t.curve=E(q.curve,L),n.text===void 0?n.style!==void 0&&(t.arrowheadStyle="fill: #333"):(t.arrowheadStyle="fill: #333",t.labelpos="c"),t.labelType=n.labelType,t.label=n.text.replace(z.lineBreakRegex,`
`),n.style===void 0&&(t.style=t.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),t.labelStyle=t.labelStyle.replace("color:","fill:"),t.id=r,t.classes="flowchart-link "+k+" "+y,l.setEdge(n.start,n.end,t,a)})},"addEdges"),se=p(function(e,l){w.info("Extracting classes"),l.db.clear();try{return l.parse(e),l.db.getClasses()}catch{return}},"getClasses"),ie=p(async function(e,l,c,a){w.info("Drawing flowchart"),a.db.clear(),Z.setGen("gen-2"),a.parser.parse(e);let i=a.db.getDirection();i===void 0&&(i="TD");const{securityLevel:d,flowchart:h}=$(),n=h.nodeSpacing||50,b=h.rankSpacing||50;let r;d==="sandbox"&&(r=C("#i"+l));const k=d==="sandbox"?C(r.nodes()[0].contentDocument.body):C("body"),y=d==="sandbox"?r.nodes()[0].contentDocument:document,t=new R({multigraph:!0,compound:!0}).setGraph({rankdir:i,nodesep:n,ranksep:b,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let s;const f=a.db.getSubGraphs();w.info("Subgraphs - ",f);for(let u=f.length-1;u>=0;u--)s=f[u],w.info("Subgraph - ",s),a.db.addVertex(s.id,{text:s.title,type:s.labelType},"group",void 0,s.classes,s.dir);const o=a.db.getVertices(),v=a.db.getEdges();w.info("Edges",v);let x=0;for(x=f.length-1;x>=0;x--){s=f[x],ee("cluster").append("text");for(let u=0;u<s.nodes.length;u++)w.info("Setting up subgraphs",s.nodes[u],s.id),t.setParent(s.nodes[u],s.id)}P(o,t,l,k,y,a),V(v,t);const _=k.select(`[id="${l}"]`),S=k.select("#"+l+" g");if(await j(S,t,["point","circle","cross"],"flowchart",l),K.insertTitle(_,"flowchartTitleText",h.titleTopMargin,a.db.getDiagramTitle()),Q(t,_,h.diagramPadding,h.useMaxWidth),a.db.indexNodes("subGraph"+x),!h.htmlLabels){const u=y.querySelectorAll('[id="'+l+'"] .edgeLabel .label');for(const m of u){const T=m.getBBox(),g=y.createElementNS("http://www.w3.org/2000/svg","rect");g.setAttribute("rx",0),g.setAttribute("ry",0),g.setAttribute("width",T.width),g.setAttribute("height",T.height),m.insertBefore(g,m.firstChild)}}Object.keys(o).forEach(function(u){const m=o[u];if(m.link){const T=C("#"+l+' [id="'+u+'"]');if(T){const g=y.createElementNS("http://www.w3.org/2000/svg","a");g.setAttributeNS("http://www.w3.org/2000/svg","class",m.classes.join(" ")),g.setAttributeNS("http://www.w3.org/2000/svg","href",m.link),g.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),d==="sandbox"?g.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):m.linkTarget&&g.setAttributeNS("http://www.w3.org/2000/svg","target",m.linkTarget);const B=T.insert(function(){return g},":first-child"),D=T.select(".label-container");D&&B.append(function(){return D.node()});const I=T.select(".label");I&&B.append(function(){return I.node()})}}})},"draw"),ve={setConf:ne,addVertices:P,addEdges:V,getClasses:se,draw:ie},ce=p((e,l)=>{const c=re,a=c(e,"r"),i=c(e,"g"),d=c(e,"b");return Y(a,i,d,l)},"fade"),de=p(e=>`.label {
    font-family: ${e.fontFamily};
    color: ${e.nodeTextColor||e.textColor};
  }
  .cluster-label text {
    fill: ${e.titleColor};
  }
  .cluster-label span,p {
    color: ${e.titleColor};
  }

  .label text,span,p {
    fill: ${e.nodeTextColor||e.textColor};
    color: ${e.nodeTextColor||e.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${e.edgeLabelBackground};
      fill: ${e.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${ce(e.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${e.clusterBkg};
    stroke: ${e.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  .cluster span,p {
    color: ${e.titleColor};
  }
  /* .cluster div {
    color: ${e.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`,"getStyles"),Se=de;export{ae as a,oe as b,me as c,xe as d,ke as e,ve as f,Se as g,ge as i,ee as s};
//# sourceMappingURL=styles-ff678862-0cc8131d.js.map
