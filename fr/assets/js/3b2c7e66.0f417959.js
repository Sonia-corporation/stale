"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2823],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var s=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,s,i=function(e,t){if(null==e)return{};var n,s,i={},r=Object.keys(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=s.createContext({}),u=function(e){var t=s.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return s.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},m=s.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=u(n),d=i,f=m["".concat(l,".").concat(d)]||m[d]||c[d]||r;return n?s.createElement(f,a(a({ref:t},p),{},{components:n})):s.createElement(f,a({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,a=new Array(r);a[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,a[1]=o;for(var u=2;u<r;u++)a[u]=n[u];return s.createElement.apply(null,a)}return s.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3872:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>u});var s=n(7462),i=(n(7294),n(4137));const r={id:"issue-stale-comment-input",title:"Stale issue comment input",description:"All the information you need to know about the stale issue comment input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Comments"]},a=void 0,o={unversionedId:"issues/inputs/issue-stale-comment-input",id:"issues/inputs/issue-stale-comment-input",title:"Stale issue comment input",description:"All the information you need to know about the stale issue comment input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/11-stale-comment-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-stale-comment-input",permalink:"/stale/fr/docs/issues/inputs/issue-stale-comment-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/11-stale-comment-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Comments",permalink:"/stale/fr/docs/tags/comments"}],version:"current",sidebarPosition:11,frontMatter:{id:"issue-stale-comment-input",title:"Stale issue comment input",description:"All the information you need to know about the stale issue comment input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Comments"]},sidebar:"tutorialSidebar",previous:{title:"Days before issue stale input",permalink:"/stale/fr/docs/issues/inputs/issue-days-before-stale-input"},next:{title:"Days before issue close input",permalink:"/stale/fr/docs/issues/inputs/issue-days-before-close-input"}},l={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,s.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"input"},"Input"),(0,i.kt)("p",null,"Name: ",(0,i.kt)("inlineCode",{parentName:"p"},"issue-stale-comment"),(0,i.kt)("br",{parentName:"p"}),"\n","Type: ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),(0,i.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,i.kt)("inlineCode",{parentName:"p"},"''")),(0,i.kt)("h3",{id:"description"},"Description"),(0,i.kt)("p",null,"This input will let you define the comment that will be added on the issues when they are stale during the processing.\nThis can be useful if you wish to improve the call to action so that watchers can be aware that their issues may be closed soon."),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-stale-comment: |\n    This issue is now stale due to a lack of activity!\n")))}c.isMDXComponent=!0}}]);