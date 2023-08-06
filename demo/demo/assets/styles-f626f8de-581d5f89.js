var Xt=Object.defineProperty;var n=(t,s)=>Xt(t,"name",{value:s,configurable:!0});import{c as G,g as Kt,s as Wt,a as Jt,b as qt,x as Qt,y as Zt,e as te,l as x,k as ut,A as ee,ai as se}from"./mermaid-a98f434b-6ad3a326.js";var Tt=function(){var t=n(function(C,r,c,i){for(c=c||{},i=C.length;i--;c[C[i]]=r);return c},"o"),s=[1,2],a=[1,3],u=[1,5],d=[1,7],p=[2,5],y=[1,15],D=[1,17],f=[1,21],b=[1,22],k=[1,23],j=[1,24],w=[1,37],U=[1,25],z=[1,26],M=[1,27],H=[1,28],X=[1,29],K=[1,32],W=[1,33],J=[1,34],q=[1,35],Q=[1,36],Z=[1,39],tt=[1,40],et=[1,41],st=[1,42],B=[1,38],At=[1,45],h=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],it=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],dt=[1,4,5,7,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],Lt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],ft={trace:n(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,directive:6,SD:7,document:8,line:9,statement:10,classDefStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,classDef:38,CLASSDEF_ID:39,CLASSDEF_STYLEOPTS:40,DEFAULT:41,class:42,CLASSENTITY_IDS:43,STYLECLASS:44,openDirective:45,typeDirective:46,closeDirective:47,":":48,argDirective:49,direction_tb:50,direction_bt:51,direction_rl:52,direction_lr:53,eol:54,";":55,EDGE_STATE:56,STYLE_SEPARATOR:57,left_of:58,right_of:59,open_directive:60,type_directive:61,arg_directive:62,close_directive:63,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",7:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"classDef",39:"CLASSDEF_ID",40:"CLASSDEF_STYLEOPTS",41:"DEFAULT",42:"class",43:"CLASSENTITY_IDS",44:"STYLECLASS",48:":",50:"direction_tb",51:"direction_bt",52:"direction_rl",53:"direction_lr",55:";",56:"EDGE_STATE",57:"STYLE_SEPARATOR",58:"left_of",59:"right_of",60:"open_directive",61:"type_directive",62:"arg_directive",63:"close_directive"},productions_:[0,[3,2],[3,2],[3,2],[3,2],[8,0],[8,2],[9,2],[9,1],[9,1],[10,1],[10,1],[10,1],[10,2],[10,3],[10,4],[10,1],[10,2],[10,1],[10,4],[10,3],[10,6],[10,1],[10,1],[10,1],[10,1],[10,4],[10,4],[10,1],[10,1],[10,2],[10,2],[10,1],[11,3],[11,3],[12,3],[6,3],[6,5],[32,1],[32,1],[32,1],[32,1],[54,1],[54,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1],[45,1],[46,1],[49,1],[47,1]],performAction:n(function(r,c,i,o,S,e,$){var l=e.length-1;switch(S){case 4:return o.setRootDoc(e[l]),e[l];case 5:this.$=[];break;case 6:e[l]!="nl"&&(e[l-1].push(e[l]),this.$=e[l-1]);break;case 7:case 8:this.$=e[l];break;case 9:this.$="nl";break;case 12:this.$=e[l];break;case 13:const P=e[l-1];P.description=o.trimColon(e[l]),this.$=P;break;case 14:this.$={stmt:"relation",state1:e[l-2],state2:e[l]};break;case 15:const yt=o.trimColon(e[l]);this.$={stmt:"relation",state1:e[l-3],state2:e[l-1],description:yt};break;case 19:this.$={stmt:"state",id:e[l-3],type:"default",description:"",doc:e[l-1]};break;case 20:var A=e[l],N=e[l-2].trim();if(e[l].match(":")){var rt=e[l].split(":");A=rt[0],N=[N,rt[1]]}this.$={stmt:"state",id:A,type:"default",description:N};break;case 21:this.$={stmt:"state",id:e[l-3],type:"default",description:e[l-5],doc:e[l-1]};break;case 22:this.$={stmt:"state",id:e[l],type:"fork"};break;case 23:this.$={stmt:"state",id:e[l],type:"join"};break;case 24:this.$={stmt:"state",id:e[l],type:"choice"};break;case 25:this.$={stmt:"state",id:o.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:e[l-1].trim(),note:{position:e[l-2].trim(),text:e[l].trim()}};break;case 30:this.$=e[l].trim(),o.setAccTitle(this.$);break;case 31:case 32:this.$=e[l].trim(),o.setAccDescription(this.$);break;case 33:case 34:this.$={stmt:"classDef",id:e[l-1].trim(),classes:e[l].trim()};break;case 35:this.$={stmt:"applyClass",id:e[l-1].trim(),styleClass:e[l].trim()};break;case 38:o.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:o.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:o.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:o.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:e[l].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:e[l-2].trim(),classes:[e[l].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:e[l-2].trim(),classes:[e[l].trim()],type:"default",description:""};break;case 50:o.parseDirective("%%{","open_directive");break;case 51:o.parseDirective(e[l],"type_directive");break;case 52:e[l]=e[l].trim().replace(/'/g,'"'),o.parseDirective(e[l],"arg_directive");break;case 53:o.parseDirective("}%%","close_directive","state");break}},"anonymous"),table:[{3:1,4:s,5:a,6:4,7:u,45:6,60:d},{1:[3]},{3:8,4:s,5:a,6:4,7:u,45:6,60:d},{3:9,4:s,5:a,6:4,7:u,45:6,60:d},{3:10,4:s,5:a,6:4,7:u,45:6,60:d},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],p,{8:11}),{46:12,61:[1,13]},{61:[2,50]},{1:[2,1]},{1:[2,2]},{1:[2,3]},{1:[2,4],4:y,5:D,6:30,9:14,10:16,11:18,12:19,13:20,16:f,17:b,19:k,22:j,24:w,25:U,26:z,27:M,28:H,29:X,32:31,33:K,35:W,37:J,38:q,42:Q,45:6,50:Z,51:tt,52:et,53:st,56:B,60:d},{47:43,48:[1,44],63:At},t([48,63],[2,51]),t(h,[2,6]),{6:30,10:46,11:18,12:19,13:20,16:f,17:b,19:k,22:j,24:w,25:U,26:z,27:M,28:H,29:X,32:31,33:K,35:W,37:J,38:q,42:Q,45:6,50:Z,51:tt,52:et,53:st,56:B,60:d},t(h,[2,8]),t(h,[2,9]),t(h,[2,10]),t(h,[2,11]),t(h,[2,12],{14:[1,47],15:[1,48]}),t(h,[2,16]),{18:[1,49]},t(h,[2,18],{20:[1,50]}),{23:[1,51]},t(h,[2,22]),t(h,[2,23]),t(h,[2,24]),t(h,[2,25]),{30:52,31:[1,53],58:[1,54],59:[1,55]},t(h,[2,28]),t(h,[2,29]),{34:[1,56]},{36:[1,57]},t(h,[2,32]),{39:[1,58],41:[1,59]},{43:[1,60]},t(it,[2,44],{57:[1,61]}),t(it,[2,45],{57:[1,62]}),t(h,[2,38]),t(h,[2,39]),t(h,[2,40]),t(h,[2,41]),t(dt,[2,36]),{49:63,62:[1,64]},t(dt,[2,53]),t(h,[2,7]),t(h,[2,13]),{13:65,24:w,56:B},t(h,[2,17]),t(Lt,p,{8:66}),{24:[1,67]},{24:[1,68]},{23:[1,69]},{24:[2,48]},{24:[2,49]},t(h,[2,30]),t(h,[2,31]),{40:[1,70]},{40:[1,71]},{44:[1,72]},{24:[1,73]},{24:[1,74]},{47:75,63:At},{63:[2,52]},t(h,[2,14],{14:[1,76]}),{4:y,5:D,6:30,9:14,10:16,11:18,12:19,13:20,16:f,17:b,19:k,21:[1,77],22:j,24:w,25:U,26:z,27:M,28:H,29:X,32:31,33:K,35:W,37:J,38:q,42:Q,45:6,50:Z,51:tt,52:et,53:st,56:B,60:d},t(h,[2,20],{20:[1,78]}),{31:[1,79]},{24:[1,80]},t(h,[2,33]),t(h,[2,34]),t(h,[2,35]),t(it,[2,46]),t(it,[2,47]),t(dt,[2,37]),t(h,[2,15]),t(h,[2,19]),t(Lt,p,{8:81}),t(h,[2,26]),t(h,[2,27]),{4:y,5:D,6:30,9:14,10:16,11:18,12:19,13:20,16:f,17:b,19:k,21:[1,82],22:j,24:w,25:U,26:z,27:M,28:H,29:X,32:31,33:K,35:W,37:J,38:q,42:Q,45:6,50:Z,51:tt,52:et,53:st,56:B,60:d},t(h,[2,21])],defaultActions:{7:[2,50],8:[2,1],9:[2,2],10:[2,3],54:[2,48],55:[2,49],64:[2,52]},parseError:n(function(r,c){if(c.recoverable)this.trace(r);else{var i=new Error(r);throw i.hash=c,i}},"parseError"),parse:n(function(r){var c=this,i=[0],o=[],S=[null],e=[],$=this.table,l="",A=0,N=0,rt=2,P=1,yt=e.slice.call(arguments,1),g=Object.create(this.lexer),L={yy:{}};for(var St in this.yy)Object.prototype.hasOwnProperty.call(this.yy,St)&&(L.yy[St]=this.yy[St]);g.setInput(r,L.yy),L.yy.lexer=g,L.yy.parser=this,typeof g.yylloc>"u"&&(g.yylloc={});var gt=g.yylloc;e.push(gt);var Mt=g.options&&g.options.ranges;typeof L.yy.parseError=="function"?this.parseError=L.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Ht(){var v;return v=o.pop()||g.lex()||P,typeof v!="number"&&(v instanceof Array&&(o=v,v=o.pop()),v=c.symbols_[v]||v),v}n(Ht,"lex");for(var m,I,T,_t,R={},nt,E,It,at;;){if(I=i[i.length-1],this.defaultActions[I]?T=this.defaultActions[I]:((m===null||typeof m>"u")&&(m=Ht()),T=$[I]&&$[I][m]),typeof T>"u"||!T.length||!T[0]){var mt="";at=[];for(nt in $[I])this.terminals_[nt]&&nt>rt&&at.push("'"+this.terminals_[nt]+"'");g.showPosition?mt="Parse error on line "+(A+1)+`:
`+g.showPosition()+`
Expecting `+at.join(", ")+", got '"+(this.terminals_[m]||m)+"'":mt="Parse error on line "+(A+1)+": Unexpected "+(m==P?"end of input":"'"+(this.terminals_[m]||m)+"'"),this.parseError(mt,{text:g.match,token:this.terminals_[m]||m,line:g.yylineno,loc:gt,expected:at})}if(T[0]instanceof Array&&T.length>1)throw new Error("Parse Error: multiple actions possible at state: "+I+", token: "+m);switch(T[0]){case 1:i.push(m),S.push(g.yytext),e.push(g.yylloc),i.push(T[1]),m=null,N=g.yyleng,l=g.yytext,A=g.yylineno,gt=g.yylloc;break;case 2:if(E=this.productions_[T[1]][1],R.$=S[S.length-E],R._$={first_line:e[e.length-(E||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(E||1)].first_column,last_column:e[e.length-1].last_column},Mt&&(R._$.range=[e[e.length-(E||1)].range[0],e[e.length-1].range[1]]),_t=this.performAction.apply(R,[l,N,A,L.yy,T[1],S,e].concat(yt)),typeof _t<"u")return _t;E&&(i=i.slice(0,-1*E*2),S=S.slice(0,-1*E),e=e.slice(0,-1*E)),i.push(this.productions_[T[1]][0]),S.push(R.$),e.push(R._$),It=$[i[i.length-2]][i[i.length-1]],i.push(It);break;case 3:return!0}}return!0},"parse")},zt=function(){var C={EOF:1,parseError:n(function(c,i){if(this.yy.parser)this.yy.parser.parseError(c,i);else throw new Error(c)},"parseError"),setInput:function(r,c){return this.yy=c||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var c=r.match(/(?:\r\n?|\n).*/g);return c?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var c=r.length,i=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-c),this.offset-=c;var o=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var S=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===o.length?this.yylloc.first_column:0)+o[o.length-i.length].length-i[0].length:this.yylloc.first_column-c},this.options.ranges&&(this.yylloc.range=[S[0],S[0]+this.yyleng-c]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),c=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+c+"^"},test_match:function(r,c){var i,o,S;if(this.options.backtrack_lexer&&(S={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(S.yylloc.range=this.yylloc.range.slice(0))),o=r[0].match(/(?:\r\n?|\n).*/g),o&&(this.yylineno+=o.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:o?o[o.length-1].length-o[o.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],i=this.performAction.call(this,this.yy,this,c,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack){for(var e in S)this[e]=S[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,c,i,o;this._more||(this.yytext="",this.match="");for(var S=this._currentRules(),e=0;e<S.length;e++)if(i=this._input.match(this.rules[S[e]]),i&&(!c||i[0].length>c[0].length)){if(c=i,o=e,this.options.backtrack_lexer){if(r=this.test_match(i,S[e]),r!==!1)return r;if(this._backtrack){c=!1;continue}else return!1}else if(!this.options.flex)break}return c?(r=this.test_match(c,S[o]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:n(function(){var c=this.next();return c||this.lex()},"lex"),begin:n(function(c){this.conditionStack.push(c)},"begin"),popState:n(function(){var c=this.conditionStack.length-1;return c>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:n(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:n(function(c){return c=this.conditionStack.length-1-Math.abs(c||0),c>=0?this.conditionStack[c]:"INITIAL"},"topState"),pushState:n(function(c){this.begin(c)},"pushState"),stateStackSize:n(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:n(function(c,i,o,S){switch(o){case 0:return 41;case 1:return 50;case 2:return 51;case 3:return 52;case 4:return 53;case 5:return this.begin("open_directive"),60;case 6:return this.begin("type_directive"),61;case 7:return this.popState(),this.begin("arg_directive"),48;case 8:return this.popState(),this.popState(),63;case 9:return 62;case 10:break;case 11:break;case 12:return 5;case 13:break;case 14:break;case 15:break;case 16:break;case 17:return this.pushState("SCALE"),17;case 18:return 18;case 19:this.popState();break;case 20:return this.begin("acc_title"),33;case 21:return this.popState(),"acc_title_value";case 22:return this.begin("acc_descr"),35;case 23:return this.popState(),"acc_descr_value";case 24:this.begin("acc_descr_multiline");break;case 25:this.popState();break;case 26:return"acc_descr_multiline_value";case 27:return this.pushState("CLASSDEF"),38;case 28:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 29:return this.popState(),this.pushState("CLASSDEFID"),39;case 30:return this.popState(),40;case 31:return this.pushState("CLASS"),42;case 32:return this.popState(),this.pushState("CLASS_STYLE"),43;case 33:return this.popState(),44;case 34:return this.pushState("SCALE"),17;case 35:return 18;case 36:this.popState();break;case 37:this.pushState("STATE");break;case 38:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;case 39:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),26;case 40:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),27;case 41:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;case 42:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),26;case 43:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),27;case 44:return 50;case 45:return 51;case 46:return 52;case 47:return 53;case 48:this.pushState("STATE_STRING");break;case 49:return this.pushState("STATE_ID"),"AS";case 50:return this.popState(),"ID";case 51:this.popState();break;case 52:return"STATE_DESCR";case 53:return 19;case 54:this.popState();break;case 55:return this.popState(),this.pushState("struct"),20;case 56:break;case 57:return this.popState(),21;case 58:break;case 59:return this.begin("NOTE"),29;case 60:return this.popState(),this.pushState("NOTE_ID"),58;case 61:return this.popState(),this.pushState("NOTE_ID"),59;case 62:this.popState(),this.pushState("FLOATING_NOTE");break;case 63:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 64:break;case 65:return"NOTE_TEXT";case 66:return this.popState(),"ID";case 67:return this.popState(),this.pushState("NOTE_TEXT"),24;case 68:return this.popState(),i.yytext=i.yytext.substr(2).trim(),31;case 69:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),31;case 70:return 7;case 71:return 7;case 72:return 16;case 73:return 56;case 74:return 24;case 75:return i.yytext=i.yytext.trim(),14;case 76:return 15;case 77:return 28;case 78:return 57;case 79:return 5;case 80:return"INVALID"}},"anonymous"),rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[14,15],inclusive:!1},close_directive:{rules:[14,15],inclusive:!1},arg_directive:{rules:[8,9,14,15],inclusive:!1},type_directive:{rules:[7,8,14,15],inclusive:!1},open_directive:{rules:[6,14,15],inclusive:!1},struct:{rules:[14,15,27,31,37,44,45,46,47,56,57,58,59,73,74,75,76,77],inclusive:!1},FLOATING_NOTE_ID:{rules:[66],inclusive:!1},FLOATING_NOTE:{rules:[63,64,65],inclusive:!1},NOTE_TEXT:{rules:[68,69],inclusive:!1},NOTE_ID:{rules:[67],inclusive:!1},NOTE:{rules:[60,61,62],inclusive:!1},CLASS_STYLE:{rules:[33],inclusive:!1},CLASS:{rules:[32],inclusive:!1},CLASSDEFID:{rules:[30],inclusive:!1},CLASSDEF:{rules:[28,29],inclusive:!1},acc_descr_multiline:{rules:[25,26],inclusive:!1},acc_descr:{rules:[23],inclusive:!1},acc_title:{rules:[21],inclusive:!1},SCALE:{rules:[18,19,35,36],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[50],inclusive:!1},STATE_STRING:{rules:[51,52],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[14,15,38,39,40,41,42,43,48,49,53,54,55],inclusive:!1},ID:{rules:[14,15],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,10,11,12,13,15,16,17,20,22,24,27,31,34,37,55,59,70,71,72,73,74,75,76,78,79,80],inclusive:!0}}};return C}();ft.lexer=zt;function pt(){this.yy={}}return n(pt,"Parser"),pt.prototype=ft,ft.Parser=pt,new pt}();Tt.parser=Tt;const Re=Tt,ie="LR",we="TB",kt="state",wt="relation",re="classDef",ne="applyClass",xt="default",ae="divider",Dt="[*]",Bt="start",$t=Dt,Pt="end",Ot="color",Nt="fill",ce="bgFill",le=",";function Vt(){return{}}n(Vt,"newClassesList");let Ft=ie,ot=[],V=Vt();const Yt=n(()=>({relations:[],states:{},documents:{}}),"newDoc");let ht={root:Yt()},_=ht.root,F=0,Rt=0;const oe={LINE:0,DOTTED_LINE:1},he={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},ct=n(t=>JSON.parse(JSON.stringify(t)),"clone"),ue=n(function(t,s,a){te.parseDirective(this,t,s,a)},"parseDirective"),de=n(t=>{x.info("Setting root doc",t),ot=t},"setRootDoc"),fe=n(()=>ot,"getRootDoc"),lt=n((t,s,a)=>{if(s.stmt===wt)lt(t,s.state1,!0),lt(t,s.state2,!1);else if(s.stmt===kt&&(s.id==="[*]"?(s.id=a?t.id+"_start":t.id+"_end",s.start=a):s.id=s.id.trim()),s.doc){const u=[];let d=[],p;for(p=0;p<s.doc.length;p++)if(s.doc[p].type===ae){const y=ct(s.doc[p]);y.doc=ct(d),u.push(y),d=[]}else d.push(s.doc[p]);if(u.length>0&&d.length>0){const y={stmt:kt,id:se(),type:"divider",doc:ct(d)};u.push(ct(y)),s.doc=u}s.doc.forEach(y=>lt(s,y,!0))}},"docTranslator"),pe=n(()=>(lt({id:"root"},{id:"root",doc:ot},!0),{id:"root",doc:ot}),"getRootDocV2"),ye=n(t=>{let s;t.doc?s=t.doc:s=t,x.info(s),Gt(!0),x.info("Extract",s),s.forEach(a=>{switch(a.stmt){case kt:O(a.id.trim(),a.type,a.doc,a.description,a.note,a.classes,a.styles,a.textStyles);break;case wt:jt(a.state1,a.state2,a.description);break;case re:Ut(a.id.trim(),a.classes);break;case ne:Ct(a.id.trim(),a.styleClass);break}})},"extract"),O=n(function(t,s=xt,a=null,u=null,d=null,p=null,y=null,D=null){const f=t==null?void 0:t.trim();_.states[f]===void 0?(x.info("Adding state ",f,u),_.states[f]={id:f,descriptions:[],type:s,doc:a,note:d,classes:[],styles:[],textStyles:[]}):(_.states[f].doc||(_.states[f].doc=a),_.states[f].type||(_.states[f].type=s)),u&&(x.info("Setting state description",f,u),typeof u=="string"&&vt(f,u.trim()),typeof u=="object"&&u.forEach(b=>vt(f,b.trim()))),d&&(_.states[f].note=d,_.states[f].note.text=ut.sanitizeText(_.states[f].note.text,G())),p&&(x.info("Setting state classes",f,p),(typeof p=="string"?[p]:p).forEach(k=>Ct(f,k.trim()))),y&&(x.info("Setting state styles",f,y),(typeof y=="string"?[y]:y).forEach(k=>xe(f,k.trim()))),D&&(x.info("Setting state styles",f,y),(typeof D=="string"?[D]:D).forEach(k=>De(f,k.trim())))},"addState"),Gt=n(function(t){ht={root:Yt()},_=ht.root,F=0,V=Vt(),t||ee()},"clear"),Y=n(function(t){return _.states[t]},"getState"),Se=n(function(){return _.states},"getStates"),ge=n(function(){x.info("Documents = ",ht)},"logDocuments"),_e=n(function(){return _.relations},"getRelations");function bt(t=""){let s=t;return t===Dt&&(F++,s=`${Bt}${F}`),s}n(bt,"startIdIfNeeded");function Et(t="",s=xt){return t===Dt?Bt:s}n(Et,"startTypeIfNeeded");function me(t=""){let s=t;return t===$t&&(F++,s=`${Pt}${F}`),s}n(me,"endIdIfNeeded");function Te(t="",s=xt){return t===$t?Pt:s}n(Te,"endTypeIfNeeded");function ke(t,s,a){let u=bt(t.id.trim()),d=Et(t.id.trim(),t.type),p=bt(s.id.trim()),y=Et(s.id.trim(),s.type);O(u,d,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),O(p,y,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),_.relations.push({id1:u,id2:p,relationTitle:ut.sanitizeText(a,G())})}n(ke,"addRelationObjs");const jt=n(function(t,s,a){if(typeof t=="object")ke(t,s,a);else{const u=bt(t.trim()),d=Et(t),p=me(s.trim()),y=Te(s);O(u,d),O(p,y),_.relations.push({id1:u,id2:p,title:ut.sanitizeText(a,G())})}},"addRelation"),vt=n(function(t,s){const a=_.states[t],u=s.startsWith(":")?s.replace(":","").trim():s;a.descriptions.push(ut.sanitizeText(u,G()))},"addDescription"),be=n(function(t){return t.substring(0,1)===":"?t.substr(2).trim():t.trim()},"cleanupLabel"),Ee=n(()=>(Rt++,"divider-id-"+Rt),"getDividerId"),Ut=n(function(t,s=""){V[t]===void 0&&(V[t]={id:t,styles:[],textStyles:[]});const a=V[t];s!=null&&s.split(le).forEach(u=>{const d=u.replace(/([^;]*);/,"$1").trim();if(u.match(Ot)){const y=d.replace(Nt,ce).replace(Ot,Nt);a.textStyles.push(y)}a.styles.push(d)})},"addStyleClass"),ve=n(function(){return V},"getClasses"),Ct=n(function(t,s){t.split(",").forEach(function(a){let u=Y(a);if(u===void 0){const d=a.trim();O(d),u=Y(d)}u.classes.push(s)})},"setCssClass"),xe=n(function(t,s){const a=Y(t);a!==void 0&&a.textStyles.push(s)},"setStyle"),De=n(function(t,s){const a=Y(t);a!==void 0&&a.textStyles.push(s)},"setTextStyle"),Ce=n(()=>Ft,"getDirection"),Ae=n(t=>{Ft=t},"setDirection"),Le=n(t=>t&&t[0]===":"?t.substr(1).trim():t.trim(),"trimColon"),Be={parseDirective:ue,getConfig:()=>G().state,addState:O,clear:Gt,getState:Y,getStates:Se,getRelations:_e,getClasses:ve,getDirection:Ce,addRelation:jt,getDividerId:Ee,setDirection:Ae,cleanupLabel:be,lineType:oe,relationType:he,logDocuments:ge,getRootDoc:fe,setRootDoc:de,getRootDocV2:pe,extract:ye,trimColon:Le,getAccTitle:Kt,setAccTitle:Wt,getAccDescription:Jt,setAccDescription:qt,addStyleClass:Ut,setCssClass:Ct,addDescription:vt,setDiagramTitle:Qt,getDiagramTitle:Zt},Ie=n(t=>`
defs #statediagram-barbEnd {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`,"getStyles"),$e=Ie;export{xt as D,wt as S,ae as a,kt as b,we as c,Be as d,Re as p,$e as s};
//# sourceMappingURL=styles-f626f8de-581d5f89.js.map
