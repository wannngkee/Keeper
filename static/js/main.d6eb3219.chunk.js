(this.webpackJsonpkeeper=this.webpackJsonpkeeper||[]).push([[0],{49:function(e,t,n){e.exports=n(80)},80:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(7),r=n.n(l),o=n(30),u=n.n(o),i=n(41),m=n(22),s=n(42),p=n.n(s);var f=function(){return c.a.createElement("header",null,c.a.createElement("h1",null,c.a.createElement(p.a,null)," Keeper"))};var E=function(){const e=(new Date).getFullYear();return c.a.createElement("footer",null,c.a.createElement("p",null,"Copyright \u24d2 ",e))},h=n(44),d=n.n(h);var k=function(e){return c.a.createElement("div",{className:"note"},c.a.createElement("h1",null,e.title),c.a.createElement("p",null,e.content),c.a.createElement("button",{onClick:function(){e.onDelete(e.id)}},c.a.createElement(d.a,null)))},v=n(31),b=n(45),g=n.n(b),j=n(97),O=n(98),w=n(21),C=n.n(w);var x=function(e){const t=Object(a.useState)(!1),n=Object(m.a)(t,2),l=n[0],r=n[1],o=Object(a.useState)({title:"",content:""}),u=Object(m.a)(o,2),i=u[0],s=u[1];function p(e){const t=e.target,n=t.name,a=t.value;s(e=>Object(v.a)(Object(v.a)({},e),{},{[n]:a}))}return c.a.createElement("div",null,c.a.createElement("form",{className:"create-note"},l&&c.a.createElement("input",{name:"title",onChange:p,value:i.title,placeholder:"Title"}),c.a.createElement("textarea",{name:"content",onClick:function(){r(!0)},onChange:p,value:i.content,placeholder:"Take a note...",rows:l?3:1}),c.a.createElement(O.a,{in:l},c.a.createElement(j.a,{onClick:function(t){e.onAdd(i);const n={title:i.title,content:i.content};C.a.post("https://keeper-mern.herokuapp.com/notes",n).then(e=>console.log(e.data)),s({title:"",content:""}),t.preventDefault()}},c.a.createElement(g.a,null)))))};var y=function(){const e=Object(a.useState)([]),t=Object(m.a)(e,2),n=t[0],l=t[1],r=function(){var e=Object(i.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.get("https://keeper-mern.herokuapp.com/notes").then(e=>{const t=e.data;l(t)}).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function o(e){l(t=>t.filter((t,n)=>n!==e[1])),C.a.delete("https://keeper-mern.herokuapp.com/notes/".concat(e[0])).then(e=>{console.log(e)})}return Object(a.useEffect)(()=>{r()},[]),c.a.createElement("div",null,c.a.createElement(f,null),c.a.createElement(x,{onAdd:function(e){l(t=>[...t,e])}}),n.map((e,t)=>c.a.createElement(k,{key:t,id:[e._id,t],title:e.title,content:e.content,onDelete:o})),c.a.createElement(E,null))};r.a.render(c.a.createElement(y,null),document.getElementById("root"))}},[[49,1,2]]]);
//# sourceMappingURL=main.d6eb3219.chunk.js.map