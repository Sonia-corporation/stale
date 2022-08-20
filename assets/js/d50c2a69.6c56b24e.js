"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3944],{4137:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var o=r.createContext({}),p=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,o=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),d=p(n),f=l,m=d["".concat(o,".").concat(f)]||d[f]||c[f]||a;return n?r.createElement(m,i(i({ref:t},s),{},{components:n})):r.createElement(m,i({ref:t},s))}));function f(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,i=new Array(a);i[0]=d;var u={};for(var o in t)hasOwnProperty.call(t,o)&&(u[o]=t[o]);u.originalType=e,u.mdxType="string"==typeof e?e:l,i[1]=u;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},952:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>c,frontMatter:()=>a,metadata:()=>u,toc:()=>p});var r=n(7462),l=(n(7294),n(4137));const a={id:"pull-request-ignore-draft-input",title:"Ignore pull request draft input",description:"All the information you need to know about the ignore pull request draft input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Drafts"]},i=void 0,u={unversionedId:"pull-requests/inputs/pull-request-ignore-draft-input",id:"pull-requests/inputs/pull-request-ignore-draft-input",title:"Ignore pull request draft input",description:"All the information you need to know about the ignore pull request draft input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/63-ignore-draft-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-draft-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-draft-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/63-ignore-draft-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Drafts",permalink:"/stale/docs/tags/drafts"}],version:"current",sidebarPosition:63,frontMatter:{id:"pull-request-ignore-draft-input",title:"Ignore pull request draft input",description:"All the information you need to know about the ignore pull request draft input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Drafts"]},sidebar:"tutorialSidebar",previous:{title:"Ignore pull request before creation date input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-before-creation-date-input"},next:{title:"Pull request processing input",permalink:"/stale/docs/pull-requests/inputs/pull-request-processing-input"}},o={},p=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],s={toc:p};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"input"},"Input"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-draft"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"boolean"),(0,l.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,l.kt)("inlineCode",{parentName:"p"},"false")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This input will let you ignore the processing of the pull requests which are in draft.",(0,l.kt)("br",{parentName:"p"}),"\n","This can be useful when you use the draft feature to consider some pull requests as work in progress.",(0,l.kt)("br",{parentName:"p"}),"\n","In such case, you may not wish to stale them."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-draft: true\n")))}c.isMDXComponent=!0}}]);