"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2413],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=r.createContext({}),i=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=i(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,s=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),m=i(n),d=l,f=m["".concat(s,".").concat(d)]||m[d]||c[d]||a;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function d(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,o=new Array(a);o[0]=m;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u.mdxType="string"==typeof e?e:l,o[1]=u;for(var i=2;i<a;i++)o[i]=n[i];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1151:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>u,toc:()=>i});var r=n(7462),l=(n(7294),n(4137));const a={id:"pull-request-stale-comment-input",title:"Stale pull request comment input",description:"All the information you need to know about the stale pull request comment input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Comments"]},o=void 0,u={unversionedId:"pull-requests/inputs/pull-request-stale-comment-input",id:"pull-requests/inputs/pull-request-stale-comment-input",title:"Stale pull request comment input",description:"All the information you need to know about the stale pull request comment input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/40-stale-comment-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-stale-comment-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-stale-comment-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/40-stale-comment-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Comments",permalink:"/stale/fr/docs/tags/comments"}],version:"current",sidebarPosition:40,frontMatter:{id:"pull-request-stale-comment-input",title:"Stale pull request comment input",description:"All the information you need to know about the stale pull request comment input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Comments"]},sidebar:"tutorialSidebar",previous:{title:"Pull request only any milestones input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-only-any-milestones-input"},next:{title:"Close pull request comment input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-close-comment-input"}},s={},i=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:i};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"input"},"Input"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-request-stale-comment"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"string"),(0,l.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,l.kt)("inlineCode",{parentName:"p"},"''")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This input will let you define the comment that will be added on the pull requests when they are stale during the processing.\nThis can be useful if you wish to improve the call to action so that watchers can be aware that their pull requests may be closed soon."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-stale-comment: |\n    This pull request is now stale due to a lack of activity!\n")))}c.isMDXComponent=!0}}]);