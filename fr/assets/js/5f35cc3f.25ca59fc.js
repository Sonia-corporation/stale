"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5487],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,i=e.originalType,l=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=p(n),m=s,f=d["".concat(l,".").concat(m)]||d[m]||c[m]||i;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function m(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var i=n.length,o=new Array(i);o[0]=d;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:s,o[1]=a;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9850:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>a,toc:()=>p});var r=n(7462),s=(n(7294),n(4137));const i={id:"issue-ignore-all-project-cards-input",title:"Ignore all issue project cards input",description:"All the information you need to know about the ignore all issue project cards input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Projects"]},o=void 0,a={unversionedId:"issues/inputs/issue-ignore-all-project-cards-input",id:"issues/inputs/issue-ignore-all-project-cards-input",title:"Ignore all issue project cards input",description:"All the information you need to know about the ignore all issue project cards input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/07-ignore-all-project-cards-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-ignore-all-project-cards-input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-all-project-cards-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/07-ignore-all-project-cards-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Projects",permalink:"/stale/fr/docs/tags/projects"}],version:"current",sidebarPosition:7,frontMatter:{id:"issue-ignore-all-project-cards-input",title:"Ignore all issue project cards input",description:"All the information you need to know about the ignore all issue project cards input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Projects"]},sidebar:"tutorialSidebar",previous:{title:"Ignore any issue assignees input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-any-assignees-input"},next:{title:"Ignore any issue project cards input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-any-project-cards-input"}},l={},p=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],u={toc:p};function c(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"input"},"Input"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"issue-ignore-all-project-cards"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"boolean"),(0,s.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,s.kt)("inlineCode",{parentName:"p"},"false")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This input will let you ignore the processing of the issues which have at least one project card.",(0,s.kt)("br",{parentName:"p"}),"\n","This can be useful when you link your issues with your projects, and you know that you will for sure close or at least process the issues very soon."),(0,s.kt)("p",null,"However, if you are not certain that linking the issues with any project will result in the handling for sure of the processing of the issues, this input may not suit you.",(0,s.kt)("br",{parentName:"p"}),"\n","You may prefer to use instead the ",(0,s.kt)("a",{parentName:"p",href:"issue-ignore-any-project-cards-input"},"ignore any project cards input")," to list only some specific project cards or not use this input at all."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-ignore-all-project-cards: true\n")))}c.isMDXComponent=!0}}]);