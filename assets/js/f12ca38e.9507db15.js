"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2413],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var l=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,l,r=function(e,t){if(null==e)return{};var n,l,r={},a=Object.keys(e);for(l=0;l<a.length;l++)n=a[l],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)n=a[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=l.createContext({}),i=function(e){var t=l.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=i(e.components);return l.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},m=l.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),m=i(n),d=r,f=m["".concat(s,".").concat(d)]||m[d]||c[d]||a;return n?l.createElement(f,o(o({ref:t},p),{},{components:n})):l.createElement(f,o({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=m;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u.mdxType="string"==typeof e?e:r,o[1]=u;for(var i=2;i<a;i++)o[i]=n[i];return l.createElement.apply(null,o)}return l.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1151:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>u,toc:()=>i});var l=n(7462),r=(n(7294),n(4137));const a={id:"pull-request-stale-comment-input",title:"Stale pull request comment input",description:"All the information you need to know about the stale pull request comment input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Comments"]},o=void 0,u={unversionedId:"pull-requests/inputs/pull-request-stale-comment-input",id:"pull-requests/inputs/pull-request-stale-comment-input",title:"Stale pull request comment input",description:"All the information you need to know about the stale pull request comment input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/40-stale-comment-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-stale-comment-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-stale-comment-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/40-stale-comment-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Comments",permalink:"/stale/docs/tags/comments"}],version:"current",sidebarPosition:40,frontMatter:{id:"pull-request-stale-comment-input",title:"Stale pull request comment input",description:"All the information you need to know about the stale pull request comment input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Comments"]},sidebar:"tutorialSidebar",previous:{title:"Pull request only any milestones input",permalink:"/stale/docs/pull-requests/inputs/pull-request-only-any-milestones-input"},next:{title:"Close pull request comment input",permalink:"/stale/docs/pull-requests/inputs/pull-request-close-comment-input"}},s={},i=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:i};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,l.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"input"},"Input"),(0,r.kt)("p",null,"Name: ",(0,r.kt)("inlineCode",{parentName:"p"},"pull-request-stale-comment"),(0,r.kt)("br",{parentName:"p"}),"\n","Type: ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),(0,r.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,r.kt)("inlineCode",{parentName:"p"},"''")),(0,r.kt)("h3",{id:"description"},"Description"),(0,r.kt)("p",null,"This input will let you define the comment that will be added on the pull requests when they are stale during the processing.\nThis can be useful if you wish to improve the call to action so that watchers can be aware that their pull requests may be closed soon."),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-stale-comment: |\n    This pull request is now stale due to a lack of activity!\n")))}c.isMDXComponent=!0}}]);