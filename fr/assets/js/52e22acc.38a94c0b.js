"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2986],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var l=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,l,r=function(e,t){if(null==e)return{};var n,l,r={},o=Object.keys(e);for(l=0;l<o.length;l++)n=o[l],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(l=0;l<o.length;l++)n=o[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=l.createContext({}),i=function(e){var t=l.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=i(e.components);return l.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},m=l.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),m=i(n),d=r,f=m["".concat(u,".").concat(d)]||m[d]||c[d]||o;return n?l.createElement(f,s(s({ref:t},p),{},{components:n})):l.createElement(f,s({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:r,s[1]=a;for(var i=2;i<o;i++)s[i]=n[i];return l.createElement.apply(null,s)}return l.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6579:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>c,frontMatter:()=>o,metadata:()=>a,toc:()=>i});var l=n(7462),r=(n(7294),n(4137));const o={id:"pull-request-close-comment-input",title:"Close pull request comment input",description:"All the information you need to know about the close pull request comment input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Comments","Closing"]},s=void 0,a={unversionedId:"pull-requests/inputs/pull-request-close-comment-input",id:"pull-requests/inputs/pull-request-close-comment-input",title:"Close pull request comment input",description:"All the information you need to know about the close pull request comment input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/41-close-comment-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-close-comment-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-close-comment-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/41-close-comment-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Comments",permalink:"/stale/fr/docs/tags/comments"},{label:"Closing",permalink:"/stale/fr/docs/tags/closing"}],version:"current",sidebarPosition:41,frontMatter:{id:"pull-request-close-comment-input",title:"Close pull request comment input",description:"All the information you need to know about the close pull request comment input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Comments","Closing"]},sidebar:"tutorialSidebar",previous:{title:"Stale pull request comment input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-stale-comment-input"},next:{title:"Days before pull request stale input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-days-before-stale-input"}},u={},i=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:i};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,l.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"input"},"Input"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"pull-request-close-comment"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),(0,r.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,r.kt)("inlineCode",{parentName:"p"},"''")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This input will let you define the comment that will be added on the pull requests when they are closed after being stale for too long during the processing.",(0,r.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to improve the communication and the process on how to handle an unwanted closed pull request."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"You can also specify the reason for closing this pull request by using the ",(0,r.kt)("a",{parentName:"p",href:"pull-request-close-reason-input"},"close reason input"),",\nadd labels onto it by using the ",(0,r.kt)("a",{parentName:"p",href:"pull-request-add-labels-after-close-input"},"add labels after close input"),"\nand define the number of days before closing it by using the ",(0,r.kt)("a",{parentName:"p",href:"pull-request-days-before-close-input"},"days before close input"),".")),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-close-comment: |\n    This pull request is now closed due to a lack of activity!\n")))}c.isMDXComponent=!0}}]);