"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[710],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=r.createContext({}),o=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},p=function(e){var t=o(e.components);return r.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=o(n),f=l,m=d["".concat(i,".").concat(f)]||d[f]||c[f]||a;return n?r.createElement(m,u(u({ref:t},p),{},{components:n})):r.createElement(m,u({ref:t},p))}));function f(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,u=new Array(a);u[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:l,u[1]=s;for(var o=2;o<a;o++)u[o]=n[o];return r.createElement.apply(null,u)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9748:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>u,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>o});var r=n(7462),l=(n(7294),n(4137));const a={id:"pull-request-delete-branch-after-close-input",title:"Delete pull request branch after close input",description:"All the information you need to know about the delete pull request branch after close input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Branches"]},u=void 0,s={unversionedId:"pull-requests/inputs/pull-request-delete-branch-after-close-input",id:"pull-requests/inputs/pull-request-delete-branch-after-close-input",title:"Delete pull request branch after close input",description:"All the information you need to know about the delete pull request branch after close input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/54-delete-branch-after-close-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-delete-branch-after-close-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-delete-branch-after-close-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/54-delete-branch-after-close-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Branches",permalink:"/stale/fr/docs/tags/branches"}],version:"current",sidebarPosition:54,frontMatter:{id:"pull-request-delete-branch-after-close-input",title:"Delete pull request branch after close input",description:"All the information you need to know about the delete pull request branch after close input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Branches"]},sidebar:"tutorialSidebar",previous:{title:"Add pull request labels after close input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-add-labels-after-close-input"},next:{title:"Pull request limit api queries count input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-limit-api-queries-count-input"}},i={},o=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:o};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"input"},"Input"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-request-delete-branch-after-close"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"boolean"),(0,l.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,l.kt)("inlineCode",{parentName:"p"},"false")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This input will let you delete the branch associated to your pull requests when the processing close them.",(0,l.kt)("br",{parentName:"p"}),"\n","This can be useful when you didn't enable the auto-deletion of branches and want to avoid having stale branches after some time."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-delete-branch-after-close: true\n")))}c.isMDXComponent=!0}}]);