"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4478],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var u=r.createContext({}),a=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=a(e.components);return r.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,i=e.originalType,u=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=a(n),d=l,y=m["".concat(u,".").concat(d)]||m[d]||c[d]||i;return n?r.createElement(y,s(s({ref:t},p),{},{components:n})):r.createElement(y,s({ref:t},p))}));function d(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var i=n.length,s=new Array(i);s[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:l,s[1]=o;for(var a=2;a<i;a++)s[a]=n[a];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2611:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>a});var r=n(7462),l=(n(7294),n(4137));const i={id:"pull-request-ignore-any-milestones-input",title:"Ignore any pull request milestones input",description:"All the information you need to know about the ignore any pull request milestones input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Milestones"]},s=void 0,o={unversionedId:"pull-requests/inputs/pull-request-ignore-any-milestones-input",id:"pull-requests/inputs/pull-request-ignore-any-milestones-input",title:"Ignore any pull request milestones input",description:"All the information you need to know about the ignore any pull request milestones input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/24-ignore-any-milestones-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-any-milestones-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-any-milestones-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/24-ignore-any-milestones-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Milestones",permalink:"/stale/docs/tags/milestones"}],version:"current",sidebarPosition:24,frontMatter:{id:"pull-request-ignore-any-milestones-input",title:"Ignore any pull request milestones input",description:"All the information you need to know about the ignore any pull request milestones input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Milestones"]},sidebar:"tutorialSidebar",previous:{title:"Pull request only any milestones input",permalink:"/stale/docs/pull-requests/inputs/pull-request-only-any-milestones-input"},next:{title:"Ignore all pull request milestones input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-all-milestones-input"}},u={},a=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:a};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"input"},"Input"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-any-milestones"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"string[]"),(0,l.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,l.kt)("inlineCode",{parentName:"p"},"[]")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This input will let you ignore the processing of the pull requests which have at least one of the milestone from this list.",(0,l.kt)("br",{parentName:"p"}),"\n","This can be useful when you use milestones for triage."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-any-milestones: |\n    milestone-x\n    milestone-y\n")))}c.isMDXComponent=!0}}]);