"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6691],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var r=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var o=r.createContext({}),u=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,i=e.originalType,o=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=u(n),g=s,m=d["".concat(o,".").concat(g)]||d[g]||c[g]||i;return n?r.createElement(m,l(l({ref:t},p),{},{components:n})):r.createElement(m,l({ref:t},p))}));function g(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var i=n.length,l=new Array(i);l[0]=d;var a={};for(var o in t)hasOwnProperty.call(t,o)&&(a[o]=t[o]);a.originalType=e,a.mdxType="string"==typeof e?e:s,l[1]=a;for(var u=2;u<i;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7407:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>a,toc:()=>u});var r=n(7462),s=(n(7294),n(4137));const i={id:"pull-request-ignore-any-assignees-input",title:"Ignore any pull request assignees input",description:"All the information you need to know about the ignore any pull request assignees input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Assignees"]},l=void 0,a={unversionedId:"pull-requests/inputs/pull-request-ignore-any-assignees-input",id:"pull-requests/inputs/pull-request-ignore-any-assignees-input",title:"Ignore any pull request assignees input",description:"All the information you need to know about the ignore any pull request assignees input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/06-ignore-any-assignees-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-any-assignees-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-any-assignees-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/06-ignore-any-assignees-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Assignees",permalink:"/stale/fr/docs/tags/assignees"}],version:"current",sidebarPosition:6,frontMatter:{id:"pull-request-ignore-any-assignees-input",title:"Ignore any pull request assignees input",description:"All the information you need to know about the ignore any pull request assignees input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Assignees"]},sidebar:"tutorialSidebar",previous:{title:"Ignore all pull request assignees input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-all-assignees-input"},next:{title:"Ignore all pull request project cards input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-all-project-cards-input"}},o={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"input"},"Input"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-any-assignees"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"string[]"),(0,s.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,s.kt)("inlineCode",{parentName:"p"},"[]")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This input will let you ignore the processing of the pull requests which have at least one of the assignee from this list.",(0,s.kt)("br",{parentName:"p"}),"\n","This can be useful when you use assignees to assign the pull requests to some members of your repository which will for sure close or at least process the pull requests very soon."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-any-assignees: |\n    C0ZEN\n    maintainers\n")))}c.isMDXComponent=!0}}]);