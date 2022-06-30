"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2518],{4137:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>d});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},s=Object.keys(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=i.createContext({}),p=function(e){var t=i.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=p(e.components);return i.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,u=e.parentName,l=r(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,f=m["".concat(u,".").concat(d)]||m[d]||c[d]||s;return n?i.createElement(f,o(o({ref:t},l),{},{components:n})):i.createElement(f,o({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=m;var r={};for(var u in t)hasOwnProperty.call(t,u)&&(r[u]=t[u]);r.originalType=e,r.mdxType="string"==typeof e?e:a,o[1]=r;for(var p=2;p<s;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},659:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>c,frontMatter:()=>s,metadata:()=>r,toc:()=>p});var i=n(7462),a=(n(7294),n(4137));const s={id:"issue-limit-api-mutations-count-input",title:"Issue limit api mutations count input",description:"All the information you need to know about the issue limit api mutations count input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","API"]},o=void 0,r={unversionedId:"issues/inputs/issue-limit-api-mutations-count-input",id:"issues/inputs/issue-limit-api-mutations-count-input",title:"Issue limit api mutations count input",description:"All the information you need to know about the issue limit api mutations count input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/18-limit-api-mutations-count-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-limit-api-mutations-count-input",permalink:"/stale/docs/issues/inputs/issue-limit-api-mutations-count-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/18-limit-api-mutations-count-input.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"API",permalink:"/stale/docs/tags/api"}],version:"current",sidebarPosition:18,frontMatter:{id:"issue-limit-api-mutations-count-input",title:"Issue limit api mutations count input",description:"All the information you need to know about the issue limit api mutations count input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","API"]},sidebar:"tutorialSidebar",previous:{title:"Issue limit api queries count input",permalink:"/stale/docs/issues/inputs/issue-limit-api-queries-count-input"},next:{title:"Issue only any project cards input",permalink:"/stale/docs/issues/inputs/issue-only-any-project-cards-input"}},u={},p=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],l={toc:p};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"input"},"Input"),(0,a.kt)("p",null,"Name: ",(0,a.kt)("inlineCode",{parentName:"p"},"issue-limit-api-mutations-count"),(0,a.kt)("br",{parentName:"p"}),"\n","Type: ",(0,a.kt)("inlineCode",{parentName:"p"},"number"),(0,a.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,a.kt)("inlineCode",{parentName:"p"},"-1")," (unlimited)"),(0,a.kt)("h3",{id:"description"},"Description"),(0,a.kt)("p",null,"This input will let you define a limit count of issues API mutations (add, edit, delete) calls performed during the processing.",(0,a.kt)("br",{parentName:"p"}),"\n","If the limit is reached, the ongoing processed issue will finish it's processing then all other issues will be ignored.",(0,a.kt)("br",{parentName:"p"}),"\n","This can be useful when you want to play it safe with this action.",(0,a.kt)("br",{parentName:"p"}),"\n","This can be also very useful if you have a lot of issues to process, and you want to limit the quotas of your associated ",(0,a.kt)("a",{parentName:"p",href:"../../github-token-input"},"GitHub token"),"."),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"When the value is below ",(0,a.kt)("inlineCode",{parentName:"p"},"0"),", the input will have no effect."))),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-limit-api-mutations-count: 100\n")))}c.isMDXComponent=!0}}]);