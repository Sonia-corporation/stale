"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1796],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var i=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,s=function(e,t){if(null==e)return{};var n,i,s={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var a=i.createContext({}),u=function(e){var t=i.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=u(e.components);return i.createElement(a.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,s=e.mdxType,o=e.originalType,a=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=u(n),d=s,y=m["".concat(a,".").concat(d)]||m[d]||c[d]||o;return n?i.createElement(y,r(r({ref:t},p),{},{components:n})):i.createElement(y,r({ref:t},p))}));function d(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=n.length,r=new Array(o);r[0]=m;var l={};for(var a in t)hasOwnProperty.call(t,a)&&(l[a]=t[a]);l.originalType=e,l.mdxType="string"==typeof e?e:s,r[1]=l;for(var u=2;u<o;u++)r[u]=n[u];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7006:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var i=n(7462),s=(n(7294),n(4137));const o={id:"issue-only-with-milestones-input",title:"Issue only with milestones input",description:"All the information you need to know about the issue only with milestones input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Milestones"]},r=void 0,l={unversionedId:"issues/inputs/issue-only-with-milestones-input",id:"issues/inputs/issue-only-with-milestones-input",title:"Issue only with milestones input",description:"All the information you need to know about the issue only with milestones input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/32-only-with-milestones-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-only-with-milestones-input",permalink:"/stale/docs/issues/inputs/issue-only-with-milestones-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/32-only-with-milestones-input.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Milestones",permalink:"/stale/docs/tags/milestones"}],version:"current",sidebarPosition:32,frontMatter:{id:"issue-only-with-milestones-input",title:"Issue only with milestones input",description:"All the information you need to know about the issue only with milestones input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Milestones"]},sidebar:"tutorialSidebar",previous:{title:"Ignore any issue milestones input",permalink:"/stale/docs/issues/inputs/issue-ignore-any-milestones-input"},next:{title:"Issue only any milestones input",permalink:"/stale/docs/issues/inputs/issue-only-any-milestones-input"}},a={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"input"},"Input"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"issue-only-with-milestones"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"boolean"),(0,s.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,s.kt)("inlineCode",{parentName:"p"},"false")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This input will let you process only the issues that are linked to at least one milestone.",(0,s.kt)("br",{parentName:"p"}),"\n","This can be useful when you use the milestones for triage."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-only-with-milestones: true\n")))}c.isMDXComponent=!0}}]);