"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4611],{4137:(e,t,n)=>{n.d(t,{Zo:()=>a,kt:()=>y});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},a=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,o=e.originalType,i=e.parentName,a=u(e,["components","mdxType","originalType","parentName"]),d=s(n),y=l,m=d["".concat(i,".").concat(y)]||d[y]||c[y]||o;return n?r.createElement(m,p(p({ref:t},a),{},{components:n})):r.createElement(m,p({ref:t},a))}));function y(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var o=n.length,p=new Array(o);p[0]=d;var u={};for(var i in t)hasOwnProperty.call(t,i)&&(u[i]=t[i]);u.originalType=e,u.mdxType="string"==typeof e?e:l,p[1]=u;for(var s=2;s<o;s++)p[s]=n[s];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7420:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>p,default:()=>c,frontMatter:()=>o,metadata:()=>u,toc:()=>s});var r=n(7462),l=(n(7294),n(4137));const o={id:"pull-request-only-any-projects-input",title:"Pull request only any projects input",description:"All the information you need to know about the pull request only any projects input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Projects"]},p=void 0,u={unversionedId:"pull-requests/inputs/pull-request-only-any-projects-input",id:"pull-requests/inputs/pull-request-only-any-projects-input",title:"Pull request only any projects input",description:"All the information you need to know about the pull request only any projects input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/23-only-any-projects-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-only-any-projects-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-only-any-projects-input",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/23-only-any-projects-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Projects",permalink:"/stale/fr/docs/tags/projects"}],version:"current",sidebarPosition:23,frontMatter:{id:"pull-request-only-any-projects-input",title:"Pull request only any projects input",description:"All the information you need to know about the pull request only any projects input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Projects"]},sidebar:"tutorialSidebar",previous:{title:"Pull request only with projects input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-only-with-projects-input"},next:{title:"Ignore all pull request milestones input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-all-milestones-input"}},i={},s=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],a={toc:s};function c(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},a,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"input"},"Input"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"pull-request-only-any-projects"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"string[]"),(0,l.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,l.kt)("inlineCode",{parentName:"p"},"[]")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This input will let you process only the pull requests that are linked to a project which is white-listed with this input.",(0,l.kt)("br",{parentName:"p"}),"\n","This can be useful when you use the projects for triage."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-only-any-projects: |\n    project-x\n    project-y\n")))}c.isMDXComponent=!0}}]);