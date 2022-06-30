"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6289],{4137:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>d});var i=t(7294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,i,s=function(e,n){if(null==e)return{};var t,i,s={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=i.createContext({}),u=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=u(e.components);return i.createElement(l.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},m=i.forwardRef((function(e,n){var t=e.components,s=e.mdxType,r=e.originalType,l=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),m=u(t),d=s,y=m["".concat(l,".").concat(d)]||m[d]||c[d]||r;return t?i.createElement(y,o(o({ref:n},p),{},{components:t})):i.createElement(y,o({ref:n},p))}));function d(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var r=t.length,o=new Array(r);o[0]=m;var a={};for(var l in n)hasOwnProperty.call(n,l)&&(a[l]=n[l]);a.originalType=e,a.mdxType="string"==typeof e?e:s,o[1]=a;for(var u=2;u<r;u++)o[u]=t[u];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9672:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>a,toc:()=>u});var i=t(7462),s=(t(7294),t(4137));const r={id:"issue-ignore-any-milestones-input",title:"Ignore any issue milestones input",description:"All the information you need to know about the ignore any issue milestones input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Milestones"]},o=void 0,a={unversionedId:"issues/inputs/issue-ignore-any-milestones-input",id:"issues/inputs/issue-ignore-any-milestones-input",title:"Ignore any issue milestones input",description:"All the information you need to know about the ignore any issue milestones input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/21-ignore-any-milestones-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-ignore-any-milestones-input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-any-milestones-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/21-ignore-any-milestones-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Milestones",permalink:"/stale/fr/docs/tags/milestones"}],version:"current",sidebarPosition:21,frontMatter:{id:"issue-ignore-any-milestones-input",title:"Ignore any issue milestones input",description:"All the information you need to know about the ignore any issue milestones input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Milestones"]},sidebar:"tutorialSidebar",previous:{title:"Issue only any milestones input",permalink:"/stale/fr/docs/issues/inputs/issue-only-any-milestones-input"},next:{title:"Ignore all issue milestones input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-all-milestones-input"}},l={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function c(e){let{components:n,...t}=e;return(0,s.kt)("wrapper",(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"input"},"Input"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"issue-ignore-any-milestones"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"string[]"),(0,s.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,s.kt)("inlineCode",{parentName:"p"},"[]")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This input will let you ignore the processing of the issues which have at least one of the milestone from this list.",(0,s.kt)("br",{parentName:"p"}),"\n","This can be useful when you use milestones for triage."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-ignore-any-milestones: |\n    milestone-x\n    milestone-y\n")))}c.isMDXComponent=!0}}]);