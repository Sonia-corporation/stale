"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3751],{1618:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var l=a(7294),n=a(6010),r=a(5565),c=a(9488),s=a(3702),m=a(241),o=a(6426),u=a(3647);function i(e){let{tags:t}=e;const a=(0,r.M)();return l.createElement(c.FG,{className:(0,n.Z)(s.k.wrapper.docsPages,s.k.page.docsTagsListPage)},l.createElement(c.d,{title:a}),l.createElement(u.Z,{tag:"doc_tags_list"}),l.createElement(m.Z,null,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},l.createElement("main",{className:"col col--8 col--offset-2"},l.createElement("h1",null,a),l.createElement(o.Z,{tags:t}))))))}},3852:(e,t,a)=>{a.d(t,{Z:()=>o});var l=a(7294),n=a(6010),r=a(3699);const c="tag_zVej",s="tagRegular_sFm0",m="tagWithCount_h2kH";function o(e){let{permalink:t,label:a,count:o}=e;return l.createElement(r.Z,{href:t,className:(0,n.Z)(c,o?m:s)},a,o&&l.createElement("span",null,o))}},6426:(e,t,a)=>{a.d(t,{Z:()=>m});var l=a(7294),n=a(5565),r=a(3852);const c="tag_Nnez";function s(e){let{letterEntry:t}=e;return l.createElement("article",null,l.createElement("h2",null,t.letter),l.createElement("ul",{className:"padding--none"},t.tags.map((e=>l.createElement("li",{key:e.permalink,className:c},l.createElement(r.Z,e))))),l.createElement("hr",null))}function m(e){let{tags:t}=e;const a=(0,n.P)(t);return l.createElement("section",{className:"margin-vert--lg"},a.map((e=>l.createElement(s,{key:e.letter,letterEntry:e}))))}},5565:(e,t,a)=>{a.d(t,{M:()=>n,P:()=>r});var l=a(7325);const n=()=>(0,l.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function r(e){const t={};return Object.values(e).forEach((e=>{const a=function(e){return e[0].toUpperCase()}(e.label);null!=t[a]||(t[a]=[]),t[a].push(e)})),Object.entries(t).sort(((e,t)=>{let[a]=e,[l]=t;return a.localeCompare(l)})).map((e=>{let[t,a]=e;return{letter:t,tags:a.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}}}]);