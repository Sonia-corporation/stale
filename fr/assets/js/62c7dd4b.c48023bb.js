"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3830],{4137:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var s=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,s,i=function(e,t){if(null==e)return{};var n,s,i={},o=Object.keys(e);for(s=0;s<o.length;s++)n=o[s],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)n=o[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=s.createContext({}),u=function(e){var t=s.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=u(e.components);return s.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},m=s.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),m=u(n),d=i,f=m["".concat(l,".").concat(d)]||m[d]||p[d]||o;return n?s.createElement(f,r(r({ref:t},c),{},{components:n})):s.createElement(f,r({ref:t},c))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=m;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:i,r[1]=a;for(var u=2;u<o;u++)r[u]=n[u];return s.createElement.apply(null,r)}return s.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9787:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>u});var s=n(7462),i=(n(7294),n(4137));const o={id:"issue-close-comment-input",title:"Close issue comment input",description:"All the information you need to know about the close issue comment input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Comments"]},r=void 0,a={unversionedId:"issues/inputs/issue-close-comment-input",id:"issues/inputs/issue-close-comment-input",title:"Close issue comment input",description:"All the information you need to know about the close issue comment input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/41-close-comment-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-close-comment-input",permalink:"/stale/fr/docs/issues/inputs/issue-close-comment-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/41-close-comment-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Comments",permalink:"/stale/fr/docs/tags/comments"}],version:"current",sidebarPosition:41,frontMatter:{id:"issue-close-comment-input",title:"Close issue comment input",description:"All the information you need to know about the close issue comment input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Comments"]},sidebar:"tutorialSidebar",previous:{title:"Stale issue comment input",permalink:"/stale/fr/docs/issues/inputs/issue-stale-comment-input"},next:{title:"Days before issue stale input",permalink:"/stale/fr/docs/issues/inputs/issue-days-before-stale-input"}},l={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],c={toc:u};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,s.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"input"},"Input"),(0,i.kt)("p",null,"Name: ",(0,i.kt)("inlineCode",{parentName:"p"},"issue-close-comment"),(0,i.kt)("br",{parentName:"p"}),"\n","Type: ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),(0,i.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,i.kt)("inlineCode",{parentName:"p"},"''")),(0,i.kt)("h3",{id:"description"},"Description"),(0,i.kt)("p",null,"This input will let you define the comment that will be added on the issues when they are closed after being stale for too long during the processing.",(0,i.kt)("br",{parentName:"p"}),"\n","This can be useful if you wish to improve the communication and the process on how to handle an unwanted closed issue."),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-close-comment: |\n    This issue is now closed due to a lack of activity!\n")))}p.isMDXComponent=!0}}]);