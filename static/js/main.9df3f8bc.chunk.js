(this.webpackJsonpkeeper=this.webpackJsonpkeeper||[]).push([[0],{49:function(e,t,n){e.exports=n(80)},80:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),c=n(7),o=n.n(c),r=n(30),u=n.n(r),i=n(41),s=n(22),m=n(42),p=n.n(m);var f=function(){return l.a.createElement("header",null,l.a.createElement("h1",null,l.a.createElement(p.a,null)," Keeper"))};var E=function(){const e=(new Date).getFullYear();return l.a.createElement("footer",null,l.a.createElement("p",null,"Copyright \u24d2 ",e))},h=n(44),d=n.n(h);var v=function(e){return l.a.createElement("div",{className:"note"},l.a.createElement("h1",null,e.title),l.a.createElement("p",null,e.content),l.a.createElement("button",{onClick:function(){e.onDelete(e.id)}},l.a.createElement(d.a,null)))},b=n(31),g=n(45),j=n.n(g),k=n(97),O=n(98),w=n(21),C=n.n(w);var x=function(e){const t=Object(a.useState)(!1),n=Object(s.a)(t,2),c=n[0],o=n[1],r=Object(a.useState)({title:"",content:""}),u=Object(s.a)(r,2),i=u[0],m=u[1];function p(e){const t=e.target,n=t.name,a=t.value;m(e=>Object(b.a)(Object(b.a)({},e),{},{[n]:a}))}return l.a.createElement("div",null,l.a.createElement("form",{className:"create-note"},c&&l.a.createElement("input",{name:"title",onChange:p,value:i.title,placeholder:"Title"}),l.a.createElement("textarea",{name:"content",onClick:function(){o(!0)},onChange:p,value:i.content,placeholder:"Take a note...",rows:c?3:1}),l.a.createElement(O.a,{in:c},l.a.createElement(k.a,{onClick:function(t){e.onAdd(i);const n={title:i.title,content:i.content};C.a.post("http://localhost:8000/notes",n).then(e=>console.log(e.data)),m({title:"",content:""}),t.preventDefault()}},l.a.createElement(j.a,null)))))};var y=function(){const e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],c=t[1],o=function(){var e=Object(i.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.get("http://localhost:8000/notes").then(e=>{const t=e.data;c(t)}).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function r(e){c(t=>t.filter((t,n)=>n!==e[1])),C.a.delete("http://localhost:8000/notes/".concat(e[0])).then(e=>{console.log(e)})}return Object(a.useEffect)(()=>{o()},[]),l.a.createElement("div",null,l.a.createElement(f,null),l.a.createElement(x,{onAdd:function(e){c(t=>[...t,e])}}),n.map((e,t)=>l.a.createElement(v,{key:t,id:[e._id,t],title:e.title,content:e.content,onDelete:r})),l.a.createElement(E,null))};o.a.render(l.a.createElement(y,null),document.getElementById("root"))}},[[49,1,2]]]);
//# sourceMappingURL=main.9df3f8bc.chunk.js.map