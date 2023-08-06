var mt=Object.defineProperty;var o=(t,e)=>mt(t,"name",{value:e,configurable:!0});import{c as F,x as xt,y as _t,s as kt,g as bt,b as vt,a as wt,e as Tt,A as $t,i as U,j as St}from"./mermaid-a98f434b-6ad3a326.js";import{d as Mt,f as Et,b as Pt,g as lt}from"./svgDrawCommon-f26cad39-11290333.js";import{a as st}from"./arc-072addf8.js";import"./preload-helper-d51aff73.js";import"./index-32ac9e7b.js";import"./_commonjsHelpers-df0bf62c.js";import"./memoize-a38ec700.js";import"./_MapCache-7e836c94.js";import"./isArray-6de4a062.js";import"./_getTag-9b3eabd6.js";import"./path-56a6d420.js";var J=function(){var t=o(function(k,r,a,u){for(a=a||{},u=k.length;u--;a[k[u]]=r);return a},"o"),e=[1,2],s=[1,5],n=[6,9,11,17,18,20,22,23,24,26],i=[1,15],h=[1,16],c=[1,17],d=[1,18],y=[1,19],_=[1,20],m=[1,24],g=[4,6,9,11,17,18,20,22,23,24,26],p={trace:o(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,directive:7,line:8,SPACE:9,statement:10,NEWLINE:11,openDirective:12,typeDirective:13,closeDirective:14,":":15,argDirective:16,title:17,acc_title:18,acc_title_value:19,acc_descr:20,acc_descr_value:21,acc_descr_multiline_value:22,section:23,taskName:24,taskData:25,open_directive:26,type_directive:27,arg_directive:28,close_directive:29,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",9:"SPACE",11:"NEWLINE",15:":",17:"title",18:"acc_title",19:"acc_title_value",20:"acc_descr",21:"acc_descr_value",22:"acc_descr_multiline_value",23:"section",24:"taskName",25:"taskData",26:"open_directive",27:"type_directive",28:"arg_directive",29:"close_directive"},productions_:[0,[3,3],[3,2],[5,0],[5,2],[8,2],[8,1],[8,1],[8,1],[7,4],[7,6],[10,1],[10,2],[10,2],[10,1],[10,1],[10,2],[10,1],[12,1],[13,1],[16,1],[14,1]],performAction:o(function(r,a,u,f,x,l,N){var b=l.length-1;switch(x){case 1:return l[b-1];case 3:this.$=[];break;case 4:l[b-1].push(l[b]),this.$=l[b-1];break;case 5:case 6:this.$=l[b];break;case 7:case 8:this.$=[];break;case 11:f.setDiagramTitle(l[b].substr(6)),this.$=l[b].substr(6);break;case 12:this.$=l[b].trim(),f.setAccTitle(this.$);break;case 13:case 14:this.$=l[b].trim(),f.setAccDescription(this.$);break;case 15:f.addSection(l[b].substr(8)),this.$=l[b].substr(8);break;case 16:f.addTask(l[b-1],l[b]),this.$="task";break;case 18:f.parseDirective("%%{","open_directive");break;case 19:f.parseDirective(l[b],"type_directive");break;case 20:l[b]=l[b].trim().replace(/'/g,'"'),f.parseDirective(l[b],"arg_directive");break;case 21:f.parseDirective("}%%","close_directive","journey");break}},"anonymous"),table:[{3:1,4:e,7:3,12:4,26:s},{1:[3]},t(n,[2,3],{5:6}),{3:7,4:e,7:3,12:4,26:s},{13:8,27:[1,9]},{27:[2,18]},{6:[1,10],7:21,8:11,9:[1,12],10:13,11:[1,14],12:4,17:i,18:h,20:c,22:d,23:y,24:_,26:s},{1:[2,2]},{14:22,15:[1,23],29:m},t([15,29],[2,19]),t(n,[2,8],{1:[2,1]}),t(n,[2,4]),{7:21,10:25,12:4,17:i,18:h,20:c,22:d,23:y,24:_,26:s},t(n,[2,6]),t(n,[2,7]),t(n,[2,11]),{19:[1,26]},{21:[1,27]},t(n,[2,14]),t(n,[2,15]),{25:[1,28]},t(n,[2,17]),{11:[1,29]},{16:30,28:[1,31]},{11:[2,21]},t(n,[2,5]),t(n,[2,12]),t(n,[2,13]),t(n,[2,16]),t(g,[2,9]),{14:32,29:m},{29:[2,20]},{11:[1,33]},t(g,[2,10])],defaultActions:{5:[2,18],7:[2,2],24:[2,21],31:[2,20]},parseError:o(function(r,a){if(a.recoverable)this.trace(r);else{var u=new Error(r);throw u.hash=a,u}},"parseError"),parse:o(function(r){var a=this,u=[0],f=[],x=[null],l=[],N=this.table,b="",Y=0,tt=0,dt=2,et=1,pt=l.slice.call(arguments,1),w=Object.create(this.lexer),I={yy:{}};for(var W in this.yy)Object.prototype.hasOwnProperty.call(this.yy,W)&&(I.yy[W]=this.yy[W]);w.setInput(r,I.yy),I.yy.lexer=w,I.yy.parser=this,typeof w.yylloc>"u"&&(w.yylloc={});var X=w.yylloc;l.push(X);var ft=w.options&&w.options.ranges;typeof I.yy.parseError=="function"?this.parseError=I.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function gt(){var P;return P=f.pop()||w.lex()||et,typeof P!="number"&&(P instanceof Array&&(f=P,P=f.pop()),P=a.symbols_[P]||P),P}o(gt,"lex");for(var T,C,S,G,L={},O,E,it,q;;){if(C=u[u.length-1],this.defaultActions[C]?S=this.defaultActions[C]:((T===null||typeof T>"u")&&(T=gt()),S=N[C]&&N[C][T]),typeof S>"u"||!S.length||!S[0]){var H="";q=[];for(O in N[C])this.terminals_[O]&&O>dt&&q.push("'"+this.terminals_[O]+"'");w.showPosition?H="Parse error on line "+(Y+1)+`:
`+w.showPosition()+`
Expecting `+q.join(", ")+", got '"+(this.terminals_[T]||T)+"'":H="Parse error on line "+(Y+1)+": Unexpected "+(T==et?"end of input":"'"+(this.terminals_[T]||T)+"'"),this.parseError(H,{text:w.match,token:this.terminals_[T]||T,line:w.yylineno,loc:X,expected:q})}if(S[0]instanceof Array&&S.length>1)throw new Error("Parse Error: multiple actions possible at state: "+C+", token: "+T);switch(S[0]){case 1:u.push(T),x.push(w.yytext),l.push(w.yylloc),u.push(S[1]),T=null,tt=w.yyleng,b=w.yytext,Y=w.yylineno,X=w.yylloc;break;case 2:if(E=this.productions_[S[1]][1],L.$=x[x.length-E],L._$={first_line:l[l.length-(E||1)].first_line,last_line:l[l.length-1].last_line,first_column:l[l.length-(E||1)].first_column,last_column:l[l.length-1].last_column},ft&&(L._$.range=[l[l.length-(E||1)].range[0],l[l.length-1].range[1]]),G=this.performAction.apply(L,[b,tt,Y,I.yy,S[1],x,l].concat(pt)),typeof G<"u")return G;E&&(u=u.slice(0,-1*E*2),x=x.slice(0,-1*E),l=l.slice(0,-1*E)),u.push(this.productions_[S[1]][0]),x.push(L.$),l.push(L._$),it=N[u[u.length-2]][u[u.length-1]],u.push(it);break;case 3:return!0}}return!0},"parse")},$=function(){var k={EOF:1,parseError:o(function(a,u){if(this.yy.parser)this.yy.parser.parseError(a,u);else throw new Error(a)},"parseError"),setInput:function(r,a){return this.yy=a||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var a=r.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var a=r.length,u=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var f=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),u.length-1&&(this.yylineno-=u.length-1);var x=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:u?(u.length===f.length?this.yylloc.first_column:0)+f[f.length-u.length].length-u[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[x[0],x[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),a=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+a+"^"},test_match:function(r,a){var u,f,x;if(this.options.backtrack_lexer&&(x={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(x.yylloc.range=this.yylloc.range.slice(0))),f=r[0].match(/(?:\r\n?|\n).*/g),f&&(this.yylineno+=f.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:f?f[f.length-1].length-f[f.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],u=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),u)return u;if(this._backtrack){for(var l in x)this[l]=x[l];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,a,u,f;this._more||(this.yytext="",this.match="");for(var x=this._currentRules(),l=0;l<x.length;l++)if(u=this._input.match(this.rules[x[l]]),u&&(!a||u[0].length>a[0].length)){if(a=u,f=l,this.options.backtrack_lexer){if(r=this.test_match(u,x[l]),r!==!1)return r;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(r=this.test_match(a,x[f]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:o(function(){var a=this.next();return a||this.lex()},"lex"),begin:o(function(a){this.conditionStack.push(a)},"begin"),popState:o(function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:o(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:o(function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},"topState"),pushState:o(function(a){this.begin(a)},"pushState"),stateStackSize:o(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:o(function(a,u,f,x){switch(f){case 0:return this.begin("open_directive"),26;case 1:return this.begin("type_directive"),27;case 2:return this.popState(),this.begin("arg_directive"),15;case 3:return this.popState(),this.popState(),29;case 4:return 28;case 5:break;case 6:break;case 7:return 11;case 8:break;case 9:break;case 10:return 4;case 11:return 17;case 12:return this.begin("acc_title"),18;case 13:return this.popState(),"acc_title_value";case 14:return this.begin("acc_descr"),20;case 15:return this.popState(),"acc_descr_value";case 16:this.begin("acc_descr_multiline");break;case 17:this.popState();break;case 18:return"acc_descr_multiline_value";case 19:return 23;case 20:return 24;case 21:return 25;case 22:return 15;case 23:return 6;case 24:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{open_directive:{rules:[1],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},acc_descr_multiline:{rules:[17,18],inclusive:!1},acc_descr:{rules:[15],inclusive:!1},acc_title:{rules:[13],inclusive:!1},INITIAL:{rules:[0,5,6,7,8,9,10,11,12,14,16,19,20,21,22,23,24],inclusive:!0}}};return k}();p.lexer=$;function v(){this.yy={}}return o(v,"Parser"),v.prototype=p,p.Parser=v,new v}();J.parser=J;const At=J;let R="";const K=[],j=[],B=[],It=o(function(t,e,s){Tt.parseDirective(this,t,e,s)},"parseDirective"),Ct=o(function(){K.length=0,j.length=0,R="",B.length=0,$t()},"clear"),Vt=o(function(t){R=t,K.push(t)},"addSection"),Ft=o(function(){return K},"getSections"),Lt=o(function(){let t=rt();const e=100;let s=0;for(;!t&&s<e;)t=rt(),s++;return j.push(...B),j},"getTasks"),Rt=o(function(){const t=[];return j.forEach(s=>{s.people&&t.push(...s.people)}),[...new Set(t)].sort()},"updateActors"),Nt=o(function(t,e){const s=e.substr(1).split(":");let n=0,i=[];s.length===1?(n=Number(s[0]),i=[]):(n=Number(s[0]),i=s[1].split(","));const h=i.map(d=>d.trim()),c={section:R,type:R,people:h,task:t,score:n};B.push(c)},"addTask"),jt=o(function(t){const e={section:R,type:R,description:t,task:t,classes:[]};j.push(e)},"addTaskOrg"),rt=o(function(){const t=o(function(s){return B[s].processed},"compileTask");let e=!0;for(const[s,n]of B.entries())t(s),e=e&&n.processed;return e},"compileTasks"),Bt=o(function(){return Rt()},"getActors"),nt={parseDirective:It,getConfig:()=>F().journey,clear:Ct,setDiagramTitle:xt,getDiagramTitle:_t,setAccTitle:kt,getAccTitle:bt,setAccDescription:vt,getAccDescription:wt,addSection:Vt,getSections:Ft,getTasks:Lt,addTask:Nt,addTaskOrg:jt,getActors:Bt},zt=o(t=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,"getStyles"),Yt=zt,Q=o(function(t,e){return Mt(t,e)},"drawRect"),Ot=o(function(t,e){const n=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),i=t.append("g");i.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),i.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function h(y){const _=st().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);y.append("path").attr("class","mouth").attr("d",_).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}o(h,"smile");function c(y){const _=st().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);y.append("path").attr("class","mouth").attr("d",_).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}o(c,"sad");function d(y){y.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return o(d,"ambivalent"),e.score>3?h(i):e.score<3?c(i):d(i),n},"drawFace"),ht=o(function(t,e){const s=t.append("circle");return s.attr("cx",e.cx),s.attr("cy",e.cy),s.attr("class","actor-"+e.pos),s.attr("fill",e.fill),s.attr("stroke",e.stroke),s.attr("r",e.r),s.class!==void 0&&s.attr("class",s.class),e.title!==void 0&&s.append("title").text(e.title),s},"drawCircle"),ut=o(function(t,e){return Et(t,e)},"drawText"),qt=o(function(t,e){function s(i,h,c,d,y){return i+","+h+" "+(i+c)+","+h+" "+(i+c)+","+(h+d-y)+" "+(i+c-y*1.2)+","+(h+d)+" "+i+","+(h+d)}o(s,"genPoints");const n=t.append("polygon");n.attr("points",s(e.x,e.y,50,20,7)),n.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,ut(t,e)},"drawLabel"),Dt=o(function(t,e,s){const n=t.append("g"),i=lt();i.x=e.x,i.y=e.y,i.fill=e.fill,i.width=s.width*e.taskCount+s.diagramMarginX*(e.taskCount-1),i.height=s.height,i.class="journey-section section-type-"+e.num,i.rx=3,i.ry=3,Q(n,i),yt(s)(e.text,n,i.x,i.y,i.width,i.height,{class:"journey-section section-type-"+e.num},s,e.colour)},"drawSection");let at=-1;const Wt=o(function(t,e,s){const n=e.x+s.width/2,i=t.append("g");at++;const h=300+5*30;i.append("line").attr("id","task"+at).attr("x1",n).attr("y1",e.y).attr("x2",n).attr("y2",h).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Ot(i,{cx:n,cy:300+(5-e.score)*30,score:e.score});const c=lt();c.x=e.x,c.y=e.y,c.fill=e.fill,c.width=s.width,c.height=s.height,c.class="task task-type-"+e.num,c.rx=3,c.ry=3,Q(i,c);let d=e.x+14;e.people.forEach(y=>{const _=e.actors[y].color,m={cx:d,cy:e.y,r:7,fill:_,stroke:"#000",title:y,pos:e.actors[y].position};ht(i,m),d+=10}),yt(s)(e.task,i,c.x,c.y,c.width,c.height,{class:"task"},s,e.colour)},"drawTask"),Xt=o(function(t,e){Pt(t,e)},"drawBackgroundRect"),yt=function(){function t(i,h,c,d,y,_,m,g){const p=h.append("text").attr("x",c+y/2).attr("y",d+_/2+5).style("font-color",g).style("text-anchor","middle").text(i);n(p,m)}o(t,"byText");function e(i,h,c,d,y,_,m,g,p){const{taskFontSize:$,taskFontFamily:v}=g,k=i.split(/<br\s*\/?>/gi);for(let r=0;r<k.length;r++){const a=r*$-$*(k.length-1)/2,u=h.append("text").attr("x",c+y/2).attr("y",d).attr("fill",p).style("text-anchor","middle").style("font-size",$).style("font-family",v);u.append("tspan").attr("x",c+y/2).attr("dy",a).text(k[r]),u.attr("y",d+_/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),n(u,m)}}o(e,"byTspan");function s(i,h,c,d,y,_,m,g){const p=h.append("switch"),v=p.append("foreignObject").attr("x",c).attr("y",d).attr("width",y).attr("height",_).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");v.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(i),e(i,p,c,d,y,_,m,g),n(v,m)}o(s,"byFo");function n(i,h){for(const c in h)c in h&&i.attr(c,h[c])}return o(n,"_setTextAttrs"),function(i){return i.textPlacement==="fo"?s:i.textPlacement==="old"?t:e}}(),Gt=o(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),z={drawRect:Q,drawCircle:ht,drawSection:Dt,drawText:ut,drawLabel:qt,drawTask:Wt,drawBackgroundRect:Xt,initGraphics:Gt},Ht=o(function(t){Object.keys(t).forEach(function(s){D[s]=t[s]})},"setConf"),A={};function Ut(t){const e=F().journey;let s=60;Object.keys(A).forEach(n=>{const i=A[n].color,h={cx:20,cy:s,r:7,fill:i,stroke:"#000",pos:A[n].position};z.drawCircle(t,h);const c={x:40,y:s+7,fill:"#666",text:n,textMargin:e.boxTextMargin|5};z.drawText(t,c),s+=20})}o(Ut,"drawActorLegend");const D=F().journey,V=D.leftMargin,Zt=o(function(t,e,s,n){const i=F().journey,h=F().securityLevel;let c;h==="sandbox"&&(c=U("#i"+e));const d=h==="sandbox"?U(c.nodes()[0].contentDocument.body):U("body");M.init();const y=d.select("#"+e);z.initGraphics(y);const _=n.db.getTasks(),m=n.db.getDiagramTitle(),g=n.db.getActors();for(const a in A)delete A[a];let p=0;g.forEach(a=>{A[a]={color:i.actorColours[p%i.actorColours.length],position:p},p++}),Ut(y),M.insert(0,0,V,Object.keys(A).length*50),Jt(y,_,0);const $=M.getBounds();m&&y.append("text").text(m).attr("x",V).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);const v=$.stopy-$.starty+2*i.diagramMarginY,k=V+$.stopx+2*i.diagramMarginX;St(y,v,k,i.useMaxWidth),y.append("line").attr("x1",V).attr("y1",i.height*4).attr("x2",k-V-4).attr("y2",i.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const r=m?70:0;y.attr("viewBox",`${$.startx} -25 ${k} ${v+r}`),y.attr("preserveAspectRatio","xMinYMin meet"),y.attr("height",v+r+25)},"draw"),M={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(t,e,s,n){t[e]===void 0?t[e]=s:t[e]=n(s,t[e])},updateBounds:function(t,e,s,n){const i=F().journey,h=this;let c=0;function d(y){return o(function(m){c++;const g=h.sequenceItems.length-c+1;h.updateVal(m,"starty",e-g*i.boxMargin,Math.min),h.updateVal(m,"stopy",n+g*i.boxMargin,Math.max),h.updateVal(M.data,"startx",t-g*i.boxMargin,Math.min),h.updateVal(M.data,"stopx",s+g*i.boxMargin,Math.max),y!=="activation"&&(h.updateVal(m,"startx",t-g*i.boxMargin,Math.min),h.updateVal(m,"stopx",s+g*i.boxMargin,Math.max),h.updateVal(M.data,"starty",e-g*i.boxMargin,Math.min),h.updateVal(M.data,"stopy",n+g*i.boxMargin,Math.max))},"updateItemBounds")}o(d,"updateFn"),this.sequenceItems.forEach(d())},insert:function(t,e,s,n){const i=Math.min(t,s),h=Math.max(t,s),c=Math.min(e,n),d=Math.max(e,n);this.updateVal(M.data,"startx",i,Math.min),this.updateVal(M.data,"starty",c,Math.min),this.updateVal(M.data,"stopx",h,Math.max),this.updateVal(M.data,"stopy",d,Math.max),this.updateBounds(i,c,h,d)},bumpVerticalPos:function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},Z=D.sectionFills,ot=D.sectionColours,Jt=o(function(t,e,s){const n=F().journey;let i="";const h=n.height*2+n.diagramMarginY,c=s+h;let d=0,y="#CCC",_="black",m=0;for(const[g,p]of e.entries()){if(i!==p.section){y=Z[d%Z.length],m=d%Z.length,_=ot[d%ot.length];let v=0;const k=p.section;for(let a=g;a<e.length&&e[a].section==k;a++)v=v+1;const r={x:g*n.taskMargin+g*n.width+V,y:50,text:p.section,fill:y,num:m,colour:_,taskCount:v};z.drawSection(t,r,n),i=p.section,d++}const $=p.people.reduce((v,k)=>(A[k]&&(v[k]=A[k]),v),{});p.x=g*n.taskMargin+g*n.width+V,p.y=c,p.width=n.diagramMarginX,p.height=n.diagramMarginY,p.colour=_,p.fill=y,p.num=m,p.actors=$,z.drawTask(t,p,n),M.insert(p.x,p.y,p.x+p.width+n.taskMargin,300+5*30)}},"drawTasks"),ct={setConf:Ht,draw:Zt},he={parser:At,db:nt,renderer:ct,styles:Yt,init:t=>{ct.setConf(t.journey),nt.clear()}};export{he as diagram};
//# sourceMappingURL=journeyDiagram-5120ee2f-0857713f.js.map
