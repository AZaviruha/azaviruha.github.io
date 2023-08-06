var Ie=Object.defineProperty;var b=(r,a)=>Ie(r,"name",{value:a,configurable:!0});import{c as G,s as Ge,g as Pe,a as Ne,b as He,x as Be,y as De,e as Ve,l as H,k as z,A as ze,K as be,i as je,z as qe,L as Ye,M as Ke}from"./mermaid-a98f434b-6ad3a326.js";import"./preload-helper-d51aff73.js";import"./index-32ac9e7b.js";import"./_commonjsHelpers-df0bf62c.js";import"./memoize-a38ec700.js";import"./_MapCache-7e836c94.js";import"./isArray-6de4a062.js";import"./_getTag-9b3eabd6.js";var fe=function(){var r=b(function(Y,m,g,x){for(g=g||{},x=Y.length;x--;g[Y[x]]=m);return g},"o"),a=[1,4],o=[1,7],p=[1,5],n=[1,9],c=[1,6],u=[2,6],h=[1,16],w=[6,8,14,20,22,24,25,27,29,32,37,40,50,55],_=[8,14,20,22,24,25,27,29,32,37,40],l=[8,13,14,20,22,24,25,27,29,32,37,40],d=[1,26],f=[6,8,14,50,55],s=[8,14,55],y=[1,53],T=[1,52],I=[8,14,30,33,35,38,55],E=[1,67],k=[1,68],v=[1,69],B=[8,14,33,35,42,55],oe={trace:b(function(){},"trace"),yy:{},symbols_:{error:2,start:3,eol:4,directive:5,GG:6,document:7,EOF:8,":":9,DIR:10,options:11,body:12,OPT:13,NL:14,line:15,statement:16,commitStatement:17,mergeStatement:18,cherryPickStatement:19,acc_title:20,acc_title_value:21,acc_descr:22,acc_descr_value:23,acc_descr_multiline_value:24,section:25,branchStatement:26,CHECKOUT:27,ref:28,BRANCH:29,ORDER:30,NUM:31,CHERRY_PICK:32,COMMIT_ID:33,STR:34,COMMIT_TAG:35,EMPTYSTR:36,MERGE:37,COMMIT_TYPE:38,commitType:39,COMMIT:40,commit_arg:41,COMMIT_MSG:42,NORMAL:43,REVERSE:44,HIGHLIGHT:45,openDirective:46,typeDirective:47,closeDirective:48,argDirective:49,open_directive:50,type_directive:51,arg_directive:52,close_directive:53,ID:54,";":55,$accept:0,$end:1},terminals_:{2:"error",6:"GG",8:"EOF",9:":",10:"DIR",13:"OPT",14:"NL",20:"acc_title",21:"acc_title_value",22:"acc_descr",23:"acc_descr_value",24:"acc_descr_multiline_value",25:"section",27:"CHECKOUT",29:"BRANCH",30:"ORDER",31:"NUM",32:"CHERRY_PICK",33:"COMMIT_ID",34:"STR",35:"COMMIT_TAG",36:"EMPTYSTR",37:"MERGE",38:"COMMIT_TYPE",40:"COMMIT",42:"COMMIT_MSG",43:"NORMAL",44:"REVERSE",45:"HIGHLIGHT",50:"open_directive",51:"type_directive",52:"arg_directive",53:"close_directive",54:"ID",55:";"},productions_:[0,[3,2],[3,2],[3,3],[3,4],[3,5],[7,0],[7,2],[11,2],[11,1],[12,0],[12,2],[15,2],[15,1],[16,1],[16,1],[16,1],[16,2],[16,2],[16,1],[16,1],[16,1],[16,2],[26,2],[26,4],[19,3],[19,5],[19,5],[19,5],[19,5],[18,2],[18,4],[18,4],[18,4],[18,6],[18,6],[18,6],[18,6],[18,6],[18,6],[18,8],[18,8],[18,8],[18,8],[18,8],[18,8],[17,2],[17,3],[17,3],[17,5],[17,5],[17,3],[17,5],[17,5],[17,5],[17,5],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,3],[17,5],[17,5],[17,5],[17,5],[17,5],[17,5],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,7],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[17,9],[41,0],[41,1],[39,1],[39,1],[39,1],[5,3],[5,5],[46,1],[47,1],[49,1],[48,1],[28,1],[28,1],[4,1],[4,1],[4,1]],performAction:b(function(m,g,x,i,L,e,J){var t=e.length-1;switch(L){case 3:return e[t];case 4:return e[t-1];case 5:return i.setDirection(e[t-3]),e[t-1];case 7:i.setOptions(e[t-1]),this.$=e[t];break;case 8:e[t-1]+=e[t],this.$=e[t-1];break;case 10:this.$=[];break;case 11:e[t-1].push(e[t]),this.$=e[t-1];break;case 12:this.$=e[t-1];break;case 17:this.$=e[t].trim(),i.setAccTitle(this.$);break;case 18:case 19:this.$=e[t].trim(),i.setAccDescription(this.$);break;case 20:i.addSection(e[t].substr(8)),this.$=e[t].substr(8);break;case 22:i.checkout(e[t]);break;case 23:i.branch(e[t]);break;case 24:i.branch(e[t-2],e[t]);break;case 25:i.cherryPick(e[t],"",void 0);break;case 26:i.cherryPick(e[t-2],"",e[t]);break;case 27:case 29:i.cherryPick(e[t-2],"","");break;case 28:i.cherryPick(e[t],"",e[t-2]);break;case 30:i.merge(e[t],"","","");break;case 31:i.merge(e[t-2],e[t],"","");break;case 32:i.merge(e[t-2],"",e[t],"");break;case 33:i.merge(e[t-2],"","",e[t]);break;case 34:i.merge(e[t-4],e[t],"",e[t-2]);break;case 35:i.merge(e[t-4],"",e[t],e[t-2]);break;case 36:i.merge(e[t-4],"",e[t-2],e[t]);break;case 37:i.merge(e[t-4],e[t-2],e[t],"");break;case 38:i.merge(e[t-4],e[t-2],"",e[t]);break;case 39:i.merge(e[t-4],e[t],e[t-2],"");break;case 40:i.merge(e[t-6],e[t-4],e[t-2],e[t]);break;case 41:i.merge(e[t-6],e[t],e[t-4],e[t-2]);break;case 42:i.merge(e[t-6],e[t-4],e[t],e[t-2]);break;case 43:i.merge(e[t-6],e[t-2],e[t-4],e[t]);break;case 44:i.merge(e[t-6],e[t],e[t-2],e[t-4]);break;case 45:i.merge(e[t-6],e[t-2],e[t],e[t-4]);break;case 46:i.commit(e[t]);break;case 47:i.commit("","",i.commitType.NORMAL,e[t]);break;case 48:i.commit("","",e[t],"");break;case 49:i.commit("","",e[t],e[t-2]);break;case 50:i.commit("","",e[t-2],e[t]);break;case 51:i.commit("",e[t],i.commitType.NORMAL,"");break;case 52:i.commit("",e[t-2],i.commitType.NORMAL,e[t]);break;case 53:i.commit("",e[t],i.commitType.NORMAL,e[t-2]);break;case 54:i.commit("",e[t-2],e[t],"");break;case 55:i.commit("",e[t],e[t-2],"");break;case 56:i.commit("",e[t-4],e[t-2],e[t]);break;case 57:i.commit("",e[t-4],e[t],e[t-2]);break;case 58:i.commit("",e[t-2],e[t-4],e[t]);break;case 59:i.commit("",e[t],e[t-4],e[t-2]);break;case 60:i.commit("",e[t],e[t-2],e[t-4]);break;case 61:i.commit("",e[t-2],e[t],e[t-4]);break;case 62:i.commit(e[t],"",i.commitType.NORMAL,"");break;case 63:i.commit(e[t],"",i.commitType.NORMAL,e[t-2]);break;case 64:i.commit(e[t-2],"",i.commitType.NORMAL,e[t]);break;case 65:i.commit(e[t-2],"",e[t],"");break;case 66:i.commit(e[t],"",e[t-2],"");break;case 67:i.commit(e[t],e[t-2],i.commitType.NORMAL,"");break;case 68:i.commit(e[t-2],e[t],i.commitType.NORMAL,"");break;case 69:i.commit(e[t-4],"",e[t-2],e[t]);break;case 70:i.commit(e[t-4],"",e[t],e[t-2]);break;case 71:i.commit(e[t-2],"",e[t-4],e[t]);break;case 72:i.commit(e[t],"",e[t-4],e[t-2]);break;case 73:i.commit(e[t],"",e[t-2],e[t-4]);break;case 74:i.commit(e[t-2],"",e[t],e[t-4]);break;case 75:i.commit(e[t-4],e[t],e[t-2],"");break;case 76:i.commit(e[t-4],e[t-2],e[t],"");break;case 77:i.commit(e[t-2],e[t],e[t-4],"");break;case 78:i.commit(e[t],e[t-2],e[t-4],"");break;case 79:i.commit(e[t],e[t-4],e[t-2],"");break;case 80:i.commit(e[t-2],e[t-4],e[t],"");break;case 81:i.commit(e[t-4],e[t],i.commitType.NORMAL,e[t-2]);break;case 82:i.commit(e[t-4],e[t-2],i.commitType.NORMAL,e[t]);break;case 83:i.commit(e[t-2],e[t],i.commitType.NORMAL,e[t-4]);break;case 84:i.commit(e[t],e[t-2],i.commitType.NORMAL,e[t-4]);break;case 85:i.commit(e[t],e[t-4],i.commitType.NORMAL,e[t-2]);break;case 86:i.commit(e[t-2],e[t-4],i.commitType.NORMAL,e[t]);break;case 87:i.commit(e[t-6],e[t-4],e[t-2],e[t]);break;case 88:i.commit(e[t-6],e[t-4],e[t],e[t-2]);break;case 89:i.commit(e[t-6],e[t-2],e[t-4],e[t]);break;case 90:i.commit(e[t-6],e[t],e[t-4],e[t-2]);break;case 91:i.commit(e[t-6],e[t-2],e[t],e[t-4]);break;case 92:i.commit(e[t-6],e[t],e[t-2],e[t-4]);break;case 93:i.commit(e[t-4],e[t-6],e[t-2],e[t]);break;case 94:i.commit(e[t-4],e[t-6],e[t],e[t-2]);break;case 95:i.commit(e[t-2],e[t-6],e[t-4],e[t]);break;case 96:i.commit(e[t],e[t-6],e[t-4],e[t-2]);break;case 97:i.commit(e[t-2],e[t-6],e[t],e[t-4]);break;case 98:i.commit(e[t],e[t-6],e[t-2],e[t-4]);break;case 99:i.commit(e[t],e[t-4],e[t-2],e[t-6]);break;case 100:i.commit(e[t-2],e[t-4],e[t],e[t-6]);break;case 101:i.commit(e[t],e[t-2],e[t-4],e[t-6]);break;case 102:i.commit(e[t-2],e[t],e[t-4],e[t-6]);break;case 103:i.commit(e[t-4],e[t-2],e[t],e[t-6]);break;case 104:i.commit(e[t-4],e[t],e[t-2],e[t-6]);break;case 105:i.commit(e[t-2],e[t-4],e[t-6],e[t]);break;case 106:i.commit(e[t],e[t-4],e[t-6],e[t-2]);break;case 107:i.commit(e[t-2],e[t],e[t-6],e[t-4]);break;case 108:i.commit(e[t],e[t-2],e[t-6],e[t-4]);break;case 109:i.commit(e[t-4],e[t-2],e[t-6],e[t]);break;case 110:i.commit(e[t-4],e[t],e[t-6],e[t-2]);break;case 111:this.$="";break;case 112:this.$=e[t];break;case 113:this.$=i.commitType.NORMAL;break;case 114:this.$=i.commitType.REVERSE;break;case 115:this.$=i.commitType.HIGHLIGHT;break;case 118:i.parseDirective("%%{","open_directive");break;case 119:i.parseDirective(e[t],"type_directive");break;case 120:e[t]=e[t].trim().replace(/'/g,'"'),i.parseDirective(e[t],"arg_directive");break;case 121:i.parseDirective("}%%","close_directive","gitGraph");break}},"anonymous"),table:[{3:1,4:2,5:3,6:a,8:o,14:p,46:8,50:n,55:c},{1:[3]},{3:10,4:2,5:3,6:a,8:o,14:p,46:8,50:n,55:c},{3:11,4:2,5:3,6:a,8:o,14:p,46:8,50:n,55:c},{7:12,8:u,9:[1,13],10:[1,14],11:15,14:h},r(w,[2,124]),r(w,[2,125]),r(w,[2,126]),{47:17,51:[1,18]},{51:[2,118]},{1:[2,1]},{1:[2,2]},{8:[1,19]},{7:20,8:u,11:15,14:h},{9:[1,21]},r(_,[2,10],{12:22,13:[1,23]}),r(l,[2,9]),{9:[1,25],48:24,53:d},r([9,53],[2,119]),{1:[2,3]},{8:[1,27]},{7:28,8:u,11:15,14:h},{8:[2,7],14:[1,31],15:29,16:30,17:32,18:33,19:34,20:[1,35],22:[1,36],24:[1,37],25:[1,38],26:39,27:[1,40],29:[1,44],32:[1,43],37:[1,42],40:[1,41]},r(l,[2,8]),r(f,[2,116]),{49:45,52:[1,46]},r(f,[2,121]),{1:[2,4]},{8:[1,47]},r(_,[2,11]),{4:48,8:o,14:p,55:c},r(_,[2,13]),r(s,[2,14]),r(s,[2,15]),r(s,[2,16]),{21:[1,49]},{23:[1,50]},r(s,[2,19]),r(s,[2,20]),r(s,[2,21]),{28:51,34:y,54:T},r(s,[2,111],{41:54,33:[1,57],34:[1,59],35:[1,55],38:[1,56],42:[1,58]}),{28:60,34:y,54:T},{33:[1,61],35:[1,62]},{28:63,34:y,54:T},{48:64,53:d},{53:[2,120]},{1:[2,5]},r(_,[2,12]),r(s,[2,17]),r(s,[2,18]),r(s,[2,22]),r(I,[2,122]),r(I,[2,123]),r(s,[2,46]),{34:[1,65]},{39:66,43:E,44:k,45:v},{34:[1,70]},{34:[1,71]},r(s,[2,112]),r(s,[2,30],{33:[1,72],35:[1,74],38:[1,73]}),{34:[1,75]},{34:[1,76],36:[1,77]},r(s,[2,23],{30:[1,78]}),r(f,[2,117]),r(s,[2,47],{33:[1,80],38:[1,79],42:[1,81]}),r(s,[2,48],{33:[1,83],35:[1,82],42:[1,84]}),r(B,[2,113]),r(B,[2,114]),r(B,[2,115]),r(s,[2,51],{35:[1,85],38:[1,86],42:[1,87]}),r(s,[2,62],{33:[1,90],35:[1,88],38:[1,89]}),{34:[1,91]},{39:92,43:E,44:k,45:v},{34:[1,93]},r(s,[2,25],{35:[1,94]}),{33:[1,95]},{33:[1,96]},{31:[1,97]},{39:98,43:E,44:k,45:v},{34:[1,99]},{34:[1,100]},{34:[1,101]},{34:[1,102]},{34:[1,103]},{34:[1,104]},{39:105,43:E,44:k,45:v},{34:[1,106]},{34:[1,107]},{39:108,43:E,44:k,45:v},{34:[1,109]},r(s,[2,31],{35:[1,111],38:[1,110]}),r(s,[2,32],{33:[1,113],35:[1,112]}),r(s,[2,33],{33:[1,114],38:[1,115]}),{34:[1,116],36:[1,117]},{34:[1,118]},{34:[1,119]},r(s,[2,24]),r(s,[2,49],{33:[1,120],42:[1,121]}),r(s,[2,53],{38:[1,122],42:[1,123]}),r(s,[2,63],{33:[1,125],38:[1,124]}),r(s,[2,50],{33:[1,126],42:[1,127]}),r(s,[2,55],{35:[1,128],42:[1,129]}),r(s,[2,66],{33:[1,131],35:[1,130]}),r(s,[2,52],{38:[1,132],42:[1,133]}),r(s,[2,54],{35:[1,134],42:[1,135]}),r(s,[2,67],{35:[1,137],38:[1,136]}),r(s,[2,64],{33:[1,139],38:[1,138]}),r(s,[2,65],{33:[1,141],35:[1,140]}),r(s,[2,68],{35:[1,143],38:[1,142]}),{39:144,43:E,44:k,45:v},{34:[1,145]},{34:[1,146]},{34:[1,147]},{34:[1,148]},{39:149,43:E,44:k,45:v},r(s,[2,26]),r(s,[2,27]),r(s,[2,28]),r(s,[2,29]),{34:[1,150]},{34:[1,151]},{39:152,43:E,44:k,45:v},{34:[1,153]},{39:154,43:E,44:k,45:v},{34:[1,155]},{34:[1,156]},{34:[1,157]},{34:[1,158]},{34:[1,159]},{34:[1,160]},{34:[1,161]},{39:162,43:E,44:k,45:v},{34:[1,163]},{34:[1,164]},{34:[1,165]},{39:166,43:E,44:k,45:v},{34:[1,167]},{39:168,43:E,44:k,45:v},{34:[1,169]},{34:[1,170]},{34:[1,171]},{39:172,43:E,44:k,45:v},{34:[1,173]},r(s,[2,37],{35:[1,174]}),r(s,[2,38],{38:[1,175]}),r(s,[2,36],{33:[1,176]}),r(s,[2,39],{35:[1,177]}),r(s,[2,34],{38:[1,178]}),r(s,[2,35],{33:[1,179]}),r(s,[2,60],{42:[1,180]}),r(s,[2,73],{33:[1,181]}),r(s,[2,61],{42:[1,182]}),r(s,[2,84],{38:[1,183]}),r(s,[2,74],{33:[1,184]}),r(s,[2,83],{38:[1,185]}),r(s,[2,59],{42:[1,186]}),r(s,[2,72],{33:[1,187]}),r(s,[2,58],{42:[1,188]}),r(s,[2,78],{35:[1,189]}),r(s,[2,71],{33:[1,190]}),r(s,[2,77],{35:[1,191]}),r(s,[2,57],{42:[1,192]}),r(s,[2,85],{38:[1,193]}),r(s,[2,56],{42:[1,194]}),r(s,[2,79],{35:[1,195]}),r(s,[2,80],{35:[1,196]}),r(s,[2,86],{38:[1,197]}),r(s,[2,70],{33:[1,198]}),r(s,[2,81],{38:[1,199]}),r(s,[2,69],{33:[1,200]}),r(s,[2,75],{35:[1,201]}),r(s,[2,76],{35:[1,202]}),r(s,[2,82],{38:[1,203]}),{34:[1,204]},{39:205,43:E,44:k,45:v},{34:[1,206]},{34:[1,207]},{39:208,43:E,44:k,45:v},{34:[1,209]},{34:[1,210]},{34:[1,211]},{34:[1,212]},{39:213,43:E,44:k,45:v},{34:[1,214]},{39:215,43:E,44:k,45:v},{34:[1,216]},{34:[1,217]},{34:[1,218]},{34:[1,219]},{34:[1,220]},{34:[1,221]},{34:[1,222]},{39:223,43:E,44:k,45:v},{34:[1,224]},{34:[1,225]},{34:[1,226]},{39:227,43:E,44:k,45:v},{34:[1,228]},{39:229,43:E,44:k,45:v},{34:[1,230]},{34:[1,231]},{34:[1,232]},{39:233,43:E,44:k,45:v},r(s,[2,40]),r(s,[2,42]),r(s,[2,41]),r(s,[2,43]),r(s,[2,45]),r(s,[2,44]),r(s,[2,101]),r(s,[2,102]),r(s,[2,99]),r(s,[2,100]),r(s,[2,104]),r(s,[2,103]),r(s,[2,108]),r(s,[2,107]),r(s,[2,106]),r(s,[2,105]),r(s,[2,110]),r(s,[2,109]),r(s,[2,98]),r(s,[2,97]),r(s,[2,96]),r(s,[2,95]),r(s,[2,93]),r(s,[2,94]),r(s,[2,92]),r(s,[2,91]),r(s,[2,90]),r(s,[2,89]),r(s,[2,87]),r(s,[2,88])],defaultActions:{9:[2,118],10:[2,1],11:[2,2],19:[2,3],27:[2,4],46:[2,120],47:[2,5]},parseError:b(function(m,g){if(g.recoverable)this.trace(m);else{var x=new Error(m);throw x.hash=g,x}},"parseError"),parse:b(function(m){var g=this,x=[0],i=[],L=[null],e=[],J=this.table,t="",ie=0,de=0,Ce=2,ke=1,Ae=e.slice.call(arguments,1),C=Object.create(this.lexer),K={yy:{}};for(var he in this.yy)Object.prototype.hasOwnProperty.call(this.yy,he)&&(K.yy[he]=this.yy[he]);C.setInput(m,K.yy),K.yy.lexer=C,K.yy.parser=this,typeof C.yylloc>"u"&&(C.yylloc={});var me=C.yylloc;e.push(me);var Se=C.options&&C.options.ranges;typeof K.yy.parseError=="function"?this.parseError=K.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Oe(){var q;return q=i.pop()||C.lex()||ke,typeof q!="number"&&(q instanceof Array&&(i=q,q=i.pop()),q=g.symbols_[q]||q),q}b(Oe,"lex");for(var N,F,V,ue,X={},se,j,xe,ae;;){if(F=x[x.length-1],this.defaultActions[F]?V=this.defaultActions[F]:((N===null||typeof N>"u")&&(N=Oe()),V=J[F]&&J[F][N]),typeof V>"u"||!V.length||!V[0]){var pe="";ae=[];for(se in J[F])this.terminals_[se]&&se>Ce&&ae.push("'"+this.terminals_[se]+"'");C.showPosition?pe="Parse error on line "+(ie+1)+`:
`+C.showPosition()+`
Expecting `+ae.join(", ")+", got '"+(this.terminals_[N]||N)+"'":pe="Parse error on line "+(ie+1)+": Unexpected "+(N==ke?"end of input":"'"+(this.terminals_[N]||N)+"'"),this.parseError(pe,{text:C.match,token:this.terminals_[N]||N,line:C.yylineno,loc:me,expected:ae})}if(V[0]instanceof Array&&V.length>1)throw new Error("Parse Error: multiple actions possible at state: "+F+", token: "+N);switch(V[0]){case 1:x.push(N),L.push(C.yytext),e.push(C.yylloc),x.push(V[1]),N=null,de=C.yyleng,t=C.yytext,ie=C.yylineno,me=C.yylloc;break;case 2:if(j=this.productions_[V[1]][1],X.$=L[L.length-j],X._$={first_line:e[e.length-(j||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(j||1)].first_column,last_column:e[e.length-1].last_column},Se&&(X._$.range=[e[e.length-(j||1)].range[0],e[e.length-1].range[1]]),ue=this.performAction.apply(X,[t,de,ie,K.yy,V[1],L,e].concat(Ae)),typeof ue<"u")return ue;j&&(x=x.slice(0,-1*j*2),L=L.slice(0,-1*j),e=e.slice(0,-1*j)),x.push(this.productions_[V[1]][0]),L.push(X.$),e.push(X._$),xe=J[x[x.length-2]][x[x.length-1]],x.push(xe);break;case 3:return!0}}return!0},"parse")},Me=function(){var Y={EOF:1,parseError:b(function(g,x){if(this.yy.parser)this.yy.parser.parseError(g,x);else throw new Error(g)},"parseError"),setInput:function(m,g){return this.yy=g||this.yy||{},this._input=m,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var m=this._input[0];this.yytext+=m,this.yyleng++,this.offset++,this.match+=m,this.matched+=m;var g=m.match(/(?:\r\n?|\n).*/g);return g?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),m},unput:function(m){var g=m.length,x=m.split(/(?:\r\n?|\n)/g);this._input=m+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-g),this.offset-=g;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),x.length-1&&(this.yylineno-=x.length-1);var L=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:x?(x.length===i.length?this.yylloc.first_column:0)+i[i.length-x.length].length-x[0].length:this.yylloc.first_column-g},this.options.ranges&&(this.yylloc.range=[L[0],L[0]+this.yyleng-g]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(m){this.unput(this.match.slice(m))},pastInput:function(){var m=this.matched.substr(0,this.matched.length-this.match.length);return(m.length>20?"...":"")+m.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var m=this.match;return m.length<20&&(m+=this._input.substr(0,20-m.length)),(m.substr(0,20)+(m.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var m=this.pastInput(),g=new Array(m.length+1).join("-");return m+this.upcomingInput()+`
`+g+"^"},test_match:function(m,g){var x,i,L;if(this.options.backtrack_lexer&&(L={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(L.yylloc.range=this.yylloc.range.slice(0))),i=m[0].match(/(?:\r\n?|\n).*/g),i&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+m[0].length},this.yytext+=m[0],this.match+=m[0],this.matches=m,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(m[0].length),this.matched+=m[0],x=this.performAction.call(this,this.yy,this,g,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),x)return x;if(this._backtrack){for(var e in L)this[e]=L[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var m,g,x,i;this._more||(this.yytext="",this.match="");for(var L=this._currentRules(),e=0;e<L.length;e++)if(x=this._input.match(this.rules[L[e]]),x&&(!g||x[0].length>g[0].length)){if(g=x,i=e,this.options.backtrack_lexer){if(m=this.test_match(x,L[e]),m!==!1)return m;if(this._backtrack){g=!1;continue}else return!1}else if(!this.options.flex)break}return g?(m=this.test_match(g,L[i]),m!==!1?m:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:b(function(){var g=this.next();return g||this.lex()},"lex"),begin:b(function(g){this.conditionStack.push(g)},"begin"),popState:b(function(){var g=this.conditionStack.length-1;return g>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:b(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:b(function(g){return g=this.conditionStack.length-1-Math.abs(g||0),g>=0?this.conditionStack[g]:"INITIAL"},"topState"),pushState:b(function(g){this.begin(g)},"pushState"),stateStackSize:b(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:b(function(g,x,i,L){switch(i){case 0:return this.begin("open_directive"),50;case 1:return this.begin("type_directive"),51;case 2:return this.popState(),this.begin("arg_directive"),9;case 3:return this.popState(),this.popState(),53;case 4:return 52;case 5:return this.begin("acc_title"),20;case 6:return this.popState(),"acc_title_value";case 7:return this.begin("acc_descr"),22;case 8:return this.popState(),"acc_descr_value";case 9:this.begin("acc_descr_multiline");break;case 10:this.popState();break;case 11:return"acc_descr_multiline_value";case 12:return 14;case 13:break;case 14:break;case 15:return 6;case 16:return 40;case 17:return 33;case 18:return 38;case 19:return 42;case 20:return 43;case 21:return 44;case 22:return 45;case 23:return 35;case 24:return 29;case 25:return 30;case 26:return 37;case 27:return 32;case 28:return 27;case 29:return 10;case 30:return 10;case 31:return 9;case 32:return"CARET";case 33:this.begin("options");break;case 34:this.popState();break;case 35:return 13;case 36:return 36;case 37:this.begin("string");break;case 38:this.popState();break;case 39:return 34;case 40:return 31;case 41:return 54;case 42:return 8}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:(\r?\n)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:gitGraph\b)/i,/^(?:commit(?=\s|$))/i,/^(?:id:)/i,/^(?:type:)/i,/^(?:msg:)/i,/^(?:NORMAL\b)/i,/^(?:REVERSE\b)/i,/^(?:HIGHLIGHT\b)/i,/^(?:tag:)/i,/^(?:branch(?=\s|$))/i,/^(?:order:)/i,/^(?:merge(?=\s|$))/i,/^(?:cherry-pick(?=\s|$))/i,/^(?:checkout(?=\s|$))/i,/^(?:LR\b)/i,/^(?:TB\b)/i,/^(?::)/i,/^(?:\^)/i,/^(?:options\r?\n)/i,/^(?:[ \r\n\t]+end\b)/i,/^(?:[\s\S]+(?=[ \r\n\t]+end))/i,/^(?:["]["])/i,/^(?:["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[0-9]+(?=\s|$))/i,/^(?:\w([-\./\w]*[-\w])?)/i,/^(?:$)/i,/^(?:\s+)/i],conditions:{acc_descr_multiline:{rules:[10,11],inclusive:!1},acc_descr:{rules:[8],inclusive:!1},acc_title:{rules:[6],inclusive:!1},close_directive:{rules:[],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},open_directive:{rules:[1],inclusive:!1},options:{rules:[34,35],inclusive:!1},string:{rules:[38,39],inclusive:!1},INITIAL:{rules:[0,5,7,9,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,36,37,40,41,42,43],inclusive:!0}}};return Y}();oe.lexer=Me;function le(){this.yy={}}return b(le,"Parser"),le.prototype=oe,oe.Parser=le,new le}();fe.parser=fe;const Fe=fe;let ne=G().gitGraph.mainBranchName,Ue=G().gitGraph.mainBranchOrder,M={},P=null,$={};$[ne]={name:ne,order:Ue};let R={};R[ne]=P;let S=ne,ve="LR",W=0;function ge(){return Ke({length:7})}b(ge,"getId");const We=b(function(r,a,o){Ve.parseDirective(this,r,a,o)},"parseDirective");function Xe(r,a){const o=Object.create(null);return r.reduce((p,n)=>{const c=a(n);return o[c]||(o[c]=!0,p.push(n)),p},[])}b(Xe,"uniqBy");const Je=b(function(r){ve=r},"setDirection");let Ee={};const Qe=b(function(r){H.debug("options str",r),r=r&&r.trim(),r=r||"{}";try{Ee=JSON.parse(r)}catch(a){H.error("error while parsing gitGraph options",a.message)}},"setOptions"),Ze=b(function(){return Ee},"getOptions"),$e=b(function(r,a,o,p){H.debug("Entering commit:",r,a,o,p),a=z.sanitizeText(a,G()),r=z.sanitizeText(r,G()),p=z.sanitizeText(p,G());const n={id:a||W+"-"+ge(),message:r,seq:W++,type:o||ee.NORMAL,tag:p||"",parents:P==null?[]:[P.id],branch:S};P=n,M[n.id]=n,R[S]=n.id,H.debug("in pushCommit "+n.id)},"commit"),et=b(function(r,a){if(r=z.sanitizeText(r,G()),R[r]===void 0)R[r]=P!=null?P.id:null,$[r]={name:r,order:a?parseInt(a,10):null},we(r),H.debug("in createBranch");else{let o=new Error('Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout '+r+'")');throw o.hash={text:"branch "+r,token:"branch "+r,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:['"checkout '+r+'"']},o}},"branch"),tt=b(function(r,a,o,p){r=z.sanitizeText(r,G()),a=z.sanitizeText(a,G());const n=M[R[S]],c=M[R[r]];if(S===r){let h=new Error('Incorrect usage of "merge". Cannot merge a branch to itself');throw h.hash={text:"merge "+r,token:"merge "+r,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:["branch abc"]},h}else if(n===void 0||!n){let h=new Error('Incorrect usage of "merge". Current branch ('+S+")has no commits");throw h.hash={text:"merge "+r,token:"merge "+r,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:["commit"]},h}else if(R[r]===void 0){let h=new Error('Incorrect usage of "merge". Branch to be merged ('+r+") does not exist");throw h.hash={text:"merge "+r,token:"merge "+r,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:["branch "+r]},h}else if(c===void 0||!c){let h=new Error('Incorrect usage of "merge". Branch to be merged ('+r+") has no commits");throw h.hash={text:"merge "+r,token:"merge "+r,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:['"commit"']},h}else if(n===c){let h=new Error('Incorrect usage of "merge". Both branches have same head');throw h.hash={text:"merge "+r,token:"merge "+r,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:["branch abc"]},h}else if(a&&M[a]!==void 0){let h=new Error('Incorrect usage of "merge". Commit with id:'+a+" already exists, use different custom Id");throw h.hash={text:"merge "+r+a+o+p,token:"merge "+r+a+o+p,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:["merge "+r+" "+a+"_UNIQUE "+o+" "+p]},h}const u={id:a||W+"-"+ge(),message:"merged branch "+r+" into "+S,seq:W++,parents:[P==null?null:P.id,R[r]],branch:S,type:ee.MERGE,customType:o,customId:!!a,tag:p||""};P=u,M[u.id]=u,R[S]=u.id,H.debug(R),H.debug("in mergeBranch")},"merge"),rt=b(function(r,a,o){if(H.debug("Entering cherryPick:",r,a,o),r=z.sanitizeText(r,G()),a=z.sanitizeText(a,G()),o=z.sanitizeText(o,G()),!r||M[r]===void 0){let c=new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');throw c.hash={text:"cherryPick "+r+" "+a,token:"cherryPick "+r+" "+a,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:["cherry-pick abc"]},c}let p=M[r],n=p.branch;if(p.type===ee.MERGE){let c=new Error('Incorrect usage of "cherryPick". Source commit should not be a merge commit');throw c.hash={text:"cherryPick "+r+" "+a,token:"cherryPick "+r+" "+a,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:["cherry-pick abc"]},c}if(!a||M[a]===void 0){if(n===S){let h=new Error('Incorrect usage of "cherryPick". Source commit is already on current branch');throw h.hash={text:"cherryPick "+r+" "+a,token:"cherryPick "+r+" "+a,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:["cherry-pick abc"]},h}const c=M[R[S]];if(c===void 0||!c){let h=new Error('Incorrect usage of "cherry-pick". Current branch ('+S+")has no commits");throw h.hash={text:"cherryPick "+r+" "+a,token:"cherryPick "+r+" "+a,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:["cherry-pick abc"]},h}const u={id:W+"-"+ge(),message:"cherry-picked "+p+" into "+S,seq:W++,parents:[P==null?null:P.id,p.id],branch:S,type:ee.CHERRY_PICK,tag:o??"cherry-pick:"+p.id};P=u,M[u.id]=u,R[S]=u.id,H.debug(R),H.debug("in cherryPick")}},"cherryPick"),we=b(function(r){if(r=z.sanitizeText(r,G()),R[r]===void 0){let a=new Error('Trying to checkout branch which is not yet created. (Help try using "branch '+r+'")');throw a.hash={text:"checkout "+r,token:"checkout "+r,line:"1",loc:{first_line:1,last_line:1,first_column:1,last_column:1},expected:['"branch '+r+'"']},a}else{S=r;const a=R[S];P=M[a]}},"checkout");function _e(r,a,o){const p=r.indexOf(a);p===-1?r.push(o):r.splice(p,1,o)}b(_e,"upsert");function Te(r){const a=r.reduce((n,c)=>n.seq>c.seq?n:c,r[0]);let o="";r.forEach(function(n){n===a?o+="	*":o+="	|"});const p=[o,a.id,a.seq];for(let n in R)R[n]===a.id&&p.push(n);if(H.debug(p.join(" ")),a.parents&&a.parents.length==2){const n=M[a.parents[0]];_e(r,a,n),r.push(M[a.parents[1]])}else{if(a.parents.length==0)return;{const n=M[a.parents];_e(r,a,n)}}r=Xe(r,n=>n.id),Te(r)}b(Te,"prettyPrintCommitHistory");const it=b(function(){H.debug(M);const r=Le()[0];Te([r])},"prettyPrint"),st=b(function(){M={},P=null;let r=G().gitGraph.mainBranchName,a=G().gitGraph.mainBranchOrder;R={},R[r]=null,$={},$[r]={name:r,order:a},S=r,W=0,ze()},"clear$1"),at=b(function(){return Object.values($).map((a,o)=>a.order!==null?a:{...a,order:parseFloat(`0.${o}`,10)}).sort((a,o)=>a.order-o.order).map(({name:a})=>({name:a}))},"getBranchesAsObjArray"),nt=b(function(){return R},"getBranches"),ct=b(function(){return M},"getCommits"),Le=b(function(){const r=Object.keys(M).map(function(a){return M[a]});return r.forEach(function(a){H.debug(a.id)}),r.sort((a,o)=>a.seq-o.seq),r},"getCommitsArray"),ot=b(function(){return S},"getCurrentBranch"),lt=b(function(){return ve},"getDirection"),ht=b(function(){return P},"getHead"),ee={NORMAL:0,REVERSE:1,HIGHLIGHT:2,MERGE:3,CHERRY_PICK:4},mt={parseDirective:We,getConfig:()=>G().gitGraph,setDirection:Je,setOptions:Qe,getOptions:Ze,commit:$e,branch:et,merge:tt,cherryPick:rt,checkout:we,prettyPrint:it,clear:st,getBranchesAsObjArray:at,getBranches:nt,getCommits:ct,getCommitsArray:Le,getCurrentBranch:ot,getDirection:lt,getHead:ht,setAccTitle:Ge,getAccTitle:Pe,getAccDescription:Ne,setAccDescription:He,setDiagramTitle:Be,getDiagramTitle:De,commitType:ee};let Q={};const D={NORMAL:0,REVERSE:1,HIGHLIGHT:2,MERGE:3,CHERRY_PICK:4},U=8;let A={},te={},ce=[],re=0,O="LR";const ut=b(()=>{A={},te={},Q={},re=0,ce=[],O="LR"},"clear"),Re=b(r=>{const a=document.createElementNS("http://www.w3.org/2000/svg","text");let o=[];typeof r=="string"?o=r.split(/\\n|\n|<br\s*\/?>/gi):Array.isArray(r)?o=r:o=[];for(const p of o){const n=document.createElementNS("http://www.w3.org/2000/svg","tspan");n.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),n.setAttribute("dy","1em"),n.setAttribute("x","0"),n.setAttribute("class","row"),n.textContent=p.trim(),a.appendChild(n)}return a},"drawText"),ye=b((r,a,o)=>{const p=be().gitGraph,n=r.append("g").attr("class","commit-bullets"),c=r.append("g").attr("class","commit-labels");let u=0;O==="TB"&&(u=30),Object.keys(a).sort((_,l)=>a[_].seq-a[l].seq).forEach(_=>{const l=a[_],d=O==="TB"?u+10:A[l.branch].pos,f=O==="TB"?A[l.branch].pos:u+10;if(o){let s,y=l.customType!==void 0&&l.customType!==""?l.customType:l.type;switch(y){case D.NORMAL:s="commit-normal";break;case D.REVERSE:s="commit-reverse";break;case D.HIGHLIGHT:s="commit-highlight";break;case D.MERGE:s="commit-merge";break;case D.CHERRY_PICK:s="commit-cherry-pick";break;default:s="commit-normal"}if(y===D.HIGHLIGHT){const T=n.append("rect");T.attr("x",f-10),T.attr("y",d-10),T.attr("height",20),T.attr("width",20),T.attr("class",`commit ${l.id} commit-highlight${A[l.branch].index%U} ${s}-outer`),n.append("rect").attr("x",f-6).attr("y",d-6).attr("height",12).attr("width",12).attr("class",`commit ${l.id} commit${A[l.branch].index%U} ${s}-inner`)}else if(y===D.CHERRY_PICK)n.append("circle").attr("cx",f).attr("cy",d).attr("r",10).attr("class",`commit ${l.id} ${s}`),n.append("circle").attr("cx",f-3).attr("cy",d+2).attr("r",2.75).attr("fill","#fff").attr("class",`commit ${l.id} ${s}`),n.append("circle").attr("cx",f+3).attr("cy",d+2).attr("r",2.75).attr("fill","#fff").attr("class",`commit ${l.id} ${s}`),n.append("line").attr("x1",f+3).attr("y1",d+1).attr("x2",f).attr("y2",d-5).attr("stroke","#fff").attr("class",`commit ${l.id} ${s}`),n.append("line").attr("x1",f-3).attr("y1",d+1).attr("x2",f).attr("y2",d-5).attr("stroke","#fff").attr("class",`commit ${l.id} ${s}`);else{const T=n.append("circle");if(T.attr("cx",f),T.attr("cy",d),T.attr("r",l.type===D.MERGE?9:10),T.attr("class",`commit ${l.id} commit${A[l.branch].index%U}`),y===D.MERGE){const I=n.append("circle");I.attr("cx",f),I.attr("cy",d),I.attr("r",6),I.attr("class",`commit ${s} ${l.id} commit${A[l.branch].index%U}`)}y===D.REVERSE&&n.append("path").attr("d",`M ${f-5},${d-5}L${f+5},${d+5}M${f-5},${d+5}L${f+5},${d-5}`).attr("class",`commit ${s} ${l.id} commit${A[l.branch].index%U}`)}}if(O==="TB"?te[l.id]={x:f,y:u+10}:te[l.id]={x:u+10,y:d},o){if(l.type!==D.CHERRY_PICK&&(l.customId&&l.type===D.MERGE||l.type!==D.MERGE)&&p.showCommitLabel){const T=c.append("g"),I=T.insert("rect").attr("class","commit-label-bkg"),E=T.append("text").attr("x",u).attr("y",d+25).attr("class","commit-label").text(l.id);let k=E.node().getBBox();if(I.attr("x",u+10-k.width/2-2).attr("y",d+13.5).attr("width",k.width+2*2).attr("height",k.height+2*2),O==="TB"&&(I.attr("x",f-(k.width+4*4+5)).attr("y",d-12),E.attr("x",f-(k.width+4*4)).attr("y",d+k.height-12)),O!=="TB"&&E.attr("x",u+10-k.width/2),p.rotateCommitLabel)if(O==="TB")E.attr("transform","rotate(-45, "+f+", "+d+")"),I.attr("transform","rotate(-45, "+f+", "+d+")");else{let v=-7.5-(k.width+10)/25*9.5,B=10+k.width/25*8.5;T.attr("transform","translate("+v+", "+B+") rotate(-45, "+u+", "+d+")")}}if(l.tag){const T=c.insert("polygon"),I=c.append("circle"),E=c.append("text").attr("y",d-16).attr("class","tag-label").text(l.tag);let k=E.node().getBBox();E.attr("x",u+10-k.width/2);const v=k.height/2,B=d-19.2;T.attr("class","tag-label-bkg").attr("points",`
          ${u-k.width/2-4/2},${B+2}
          ${u-k.width/2-4/2},${B-2}
          ${u+10-k.width/2-4},${B-v-2}
          ${u+10+k.width/2+4},${B-v-2}
          ${u+10+k.width/2+4},${B+v+2}
          ${u+10-k.width/2-4},${B+v+2}`),I.attr("cx",u-k.width/2+4/2).attr("cy",B).attr("r",1.5).attr("class","tag-hole"),O==="TB"&&(T.attr("class","tag-label-bkg").attr("points",`
            ${f},${u+2}
            ${f},${u-2}
            ${f+10},${u-v-2}
            ${f+10+k.width+4},${u-v-2}
            ${f+10+k.width+4},${u+v+2}
            ${f+10},${u+v+2}`).attr("transform","translate(12,12) rotate(45, "+f+","+u+")"),I.attr("cx",f+4/2).attr("cy",u).attr("transform","translate(12,12) rotate(45, "+f+","+u+")"),E.attr("x",f+5).attr("y",u+3).attr("transform","translate(14,14) rotate(45, "+f+","+u+")"))}}u+=50,u>re&&(re=u)})},"drawCommits"),pt=b((r,a,o)=>Object.keys(o).filter(c=>o[c].branch===a.branch&&o[c].seq>r.seq&&o[c].seq<a.seq).length>0,"hasOverlappingCommits"),Z=b((r,a,o=0)=>{const p=r+Math.abs(r-a)/2;if(o>5)return p;if(ce.every(u=>Math.abs(u-p)>=10))return ce.push(p),p;const c=Math.abs(r-a);return Z(r,a-c/5,o+1)},"findLane"),ft=b((r,a,o,p)=>{const n=te[a.id],c=te[o.id],u=pt(a,o,p);let h="",w="",_=0,l=0,d=A[o.branch].index,f;if(u){h="A 10 10, 0, 0, 0,",w="A 10 10, 0, 0, 1,",_=10,l=10,d=A[o.branch].index;const s=n.y<c.y?Z(n.y,c.y):Z(c.y,n.y),y=n.x<c.x?Z(n.x,c.x):Z(c.x,n.x);O==="TB"?n.x<c.x?f=`M ${n.x} ${n.y} L ${y-_} ${n.y} ${w} ${y} ${n.y+l} L ${y} ${c.y-_} ${h} ${y+l} ${c.y} L ${c.x} ${c.y}`:f=`M ${n.x} ${n.y} L ${y+_} ${n.y} ${h} ${y} ${n.y+l} L ${y} ${c.y-_} ${w} ${y-l} ${c.y} L ${c.x} ${c.y}`:n.y<c.y?f=`M ${n.x} ${n.y} L ${n.x} ${s-_} ${h} ${n.x+l} ${s} L ${c.x-_} ${s} ${w} ${c.x} ${s+l} L ${c.x} ${c.y}`:f=`M ${n.x} ${n.y} L ${n.x} ${s+_} ${w} ${n.x+l} ${s} L ${c.x-_} ${s} ${h} ${c.x} ${s-l} L ${c.x} ${c.y}`}else O==="TB"?(n.x<c.x&&(h="A 20 20, 0, 0, 0,",w="A 20 20, 0, 0, 1,",_=20,l=20,d=A[o.branch].index,f=`M ${n.x} ${n.y} L ${c.x-_} ${n.y} ${w} ${c.x} ${n.y+l} L ${c.x} ${c.y}`),n.x>c.x&&(h="A 20 20, 0, 0, 0,",w="A 20 20, 0, 0, 1,",_=20,l=20,d=A[a.branch].index,f=`M ${n.x} ${n.y} L ${n.x} ${c.y-_} ${w} ${n.x-l} ${c.y} L ${c.x} ${c.y}`),n.x===c.x&&(d=A[a.branch].index,f=`M ${n.x} ${n.y} L ${n.x+_} ${n.y} ${h} ${n.x+l} ${c.y+_} L ${c.x} ${c.y}`)):(n.y<c.y&&(h="A 20 20, 0, 0, 0,",_=20,l=20,d=A[o.branch].index,f=`M ${n.x} ${n.y} L ${n.x} ${c.y-_} ${h} ${n.x+l} ${c.y} L ${c.x} ${c.y}`),n.y>c.y&&(h="A 20 20, 0, 0, 0,",_=20,l=20,d=A[a.branch].index,f=`M ${n.x} ${n.y} L ${c.x-_} ${n.y} ${h} ${c.x} ${n.y-l} L ${c.x} ${c.y}`),n.y===c.y&&(d=A[a.branch].index,f=`M ${n.x} ${n.y} L ${n.x} ${c.y-_} ${h} ${n.x+l} ${c.y} L ${c.x} ${c.y}`));r.append("path").attr("d",f).attr("class","arrow arrow"+d%U)},"drawArrow"),bt=b((r,a)=>{const o=r.append("g").attr("class","commit-arrows");Object.keys(a).forEach(p=>{const n=a[p];n.parents&&n.parents.length>0&&n.parents.forEach(c=>{ft(o,a[c],n,a)})})},"drawArrows"),gt=b((r,a)=>{const o=be().gitGraph,p=r.append("g");a.forEach((n,c)=>{const u=c%U,h=A[n.name].pos,w=p.append("line");w.attr("x1",0),w.attr("y1",h),w.attr("x2",re),w.attr("y2",h),w.attr("class","branch branch"+u),O==="TB"&&(w.attr("y1",30),w.attr("x1",h),w.attr("y2",re),w.attr("x2",h)),ce.push(h);let _=n.name;const l=Re(_),d=p.insert("rect"),s=p.insert("g").attr("class","branchLabel").insert("g").attr("class","label branch-label"+u);s.node().appendChild(l);let y=l.getBBox();d.attr("class","branchLabelBkg label"+u).attr("rx",4).attr("ry",4).attr("x",-y.width-4-(o.rotateCommitLabel===!0?30:0)).attr("y",-y.height/2+8).attr("width",y.width+18).attr("height",y.height+4),s.attr("transform","translate("+(-y.width-14-(o.rotateCommitLabel===!0?30:0))+", "+(h-y.height/2-1)+")"),O==="TB"&&(d.attr("x",h-y.width/2-10).attr("y",0),s.attr("transform","translate("+(h-y.width/2-5)+", 0)")),O!=="TB"&&d.attr("transform","translate(-19, "+(h-y.height/2)+")")})},"drawBranches"),dt=b(function(r,a,o,p){ut();const n=be(),c=n.gitGraph;H.debug("in gitgraph renderer",r+`
`,"id:",a,o),Q=p.db.getCommits();const u=p.db.getBranchesAsObjArray();O=p.db.getDirection();const h=je(`[id="${a}"]`);let w=0;u.forEach((_,l)=>{const d=Re(_.name),f=h.append("g"),s=f.insert("g").attr("class","branchLabel"),y=s.insert("g").attr("class","label branch-label");y.node().appendChild(d);let T=d.getBBox();A[_.name]={pos:w,index:l},w+=50+(c.rotateCommitLabel?40:0)+(O==="TB"?T.width/2:0),y.remove(),s.remove(),f.remove()}),ye(h,Q,!1),c.showBranches&&gt(h,u),bt(h,Q),ye(h,Q,!0),qe.insertTitle(h,"gitTitleText",c.titleTopMargin,p.db.getDiagramTitle()),Ye(void 0,h,c.diagramPadding,c.useMaxWidth??n.useMaxWidth)},"draw"),kt={draw:dt},xt=b(r=>`
  .commit-id,
  .commit-msg,
  .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  ${[0,1,2,3,4,5,6,7].map(a=>`
        .branch-label${a} { fill: ${r["gitBranchLabel"+a]}; }
        .commit${a} { stroke: ${r["git"+a]}; fill: ${r["git"+a]}; }
        .commit-highlight${a} { stroke: ${r["gitInv"+a]}; fill: ${r["gitInv"+a]}; }
        .label${a}  { fill: ${r["git"+a]}; }
        .arrow${a} { stroke: ${r["git"+a]}; }
        `).join(`
`)}

  .branch {
    stroke-width: 1;
    stroke: ${r.lineColor};
    stroke-dasharray: 2;
  }
  .commit-label { font-size: ${r.commitLabelFontSize}; fill: ${r.commitLabelColor};}
  .commit-label-bkg { font-size: ${r.commitLabelFontSize}; fill: ${r.commitLabelBackground}; opacity: 0.5; }
  .tag-label { font-size: ${r.tagLabelFontSize}; fill: ${r.tagLabelColor};}
  .tag-label-bkg { fill: ${r.tagLabelBackground}; stroke: ${r.tagLabelBorder}; }
  .tag-hole { fill: ${r.textColor}; }

  .commit-merge {
    stroke: ${r.primaryColor};
    fill: ${r.primaryColor};
  }
  .commit-reverse {
    stroke: ${r.primaryColor};
    fill: ${r.primaryColor};
    stroke-width: 3;
  }
  .commit-highlight-outer {
  }
  .commit-highlight-inner {
    stroke: ${r.primaryColor};
    fill: ${r.primaryColor};
  }

  .arrow { stroke-width: 8; stroke-linecap: round; fill: none}
  .gitTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${r.textColor};
  }
`,"getStyles"),_t=xt,At={parser:Fe,db:mt,renderer:kt,styles:_t};export{At as diagram};
//# sourceMappingURL=gitGraphDiagram-a13ae597-0e22c300.js.map