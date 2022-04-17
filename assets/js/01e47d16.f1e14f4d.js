"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3043],{4137:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var l=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,l,r=function(e,t){if(null==e)return{};var n,l,r={},i=Object.keys(e);for(l=0;l<i.length;l++)n=i[l],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(l=0;l<i.length;l++)n=i[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=l.createContext({}),a=function(e){var t=l.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=a(e.components);return l.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},m=l.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),m=a(n),d=r,f=m["".concat(s,".").concat(d)]||m[d]||c[d]||i;return n?l.createElement(f,o(o({ref:t},p),{},{components:n})):l.createElement(f,o({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u.mdxType="string"==typeof e?e:r,o[1]=u;for(var a=2;a<i;a++)o[a]=n[a];return l.createElement.apply(null,o)}return l.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1122:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return u},metadata:function(){return a},toc:function(){return c}});var l=n(7462),r=n(3366),i=(n(7294),n(4137)),o=["components"],u={id:"pull-request-ignore-all-milestones-input",title:"Ignore all pull request milestones input",description:"All the information you need to know about the ignore all pull request milestones input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Milestones"]},s=void 0,a={unversionedId:"pull-requests/inputs/pull-request-ignore-all-milestones-input",id:"pull-requests/inputs/pull-request-ignore-all-milestones-input",title:"Ignore all pull request milestones input",description:"All the information you need to know about the ignore all pull request milestones input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/25-ignore-all-milestones-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-all-milestones-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-all-milestones-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/25-ignore-all-milestones-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Milestones",permalink:"/stale/docs/tags/milestones"}],version:"current",sidebarPosition:25,frontMatter:{id:"pull-request-ignore-all-milestones-input",title:"Ignore all pull request milestones input",description:"All the information you need to know about the ignore all pull request milestones input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Milestones"]},sidebar:"tutorialSidebar",previous:{title:"Ignore any pull request milestones input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-any-milestones-input"},next:{title:"All pull requests outputs",permalink:"/stale/docs/pull-requests/outputs/all-pull-requests-outputs"}},p={},c=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],m={toc:c};function d(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,l.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"input"},"Input"),(0,i.kt)("p",null,"Name: ",(0,i.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-all-milestones"),(0,i.kt)("br",{parentName:"p"}),"\n","Type: ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean"),(0,i.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,i.kt)("inlineCode",{parentName:"p"},"false")),(0,i.kt)("h3",{id:"description"},"Description"),(0,i.kt)("p",null,"This input will let you ignore the processing of the pull requests which have a milestone.",(0,i.kt)("br",{parentName:"p"}),"\n","This can be useful when you use milestones for triage."),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-all-milestones: true\n")))}d.isMDXComponent=!0}}]);