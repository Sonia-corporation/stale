"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2631],{4137:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var o=r.createContext({}),s=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,o=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=s(n),f=l,m=d["".concat(o,".").concat(f)]||d[f]||c[f]||a;return n?r.createElement(m,u(u({ref:t},p),{},{components:n})):r.createElement(m,u({ref:t},p))}));function f(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,u=new Array(a);u[0]=d;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:l,u[1]=i;for(var s=2;s<a;s++)u[s]=n[s];return r.createElement.apply(null,u)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5974:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return o},metadata:function(){return s},assets:function(){return p},toc:function(){return c},default:function(){return f}});var r=n(7462),l=n(3366),a=(n(7294),n(4137)),u=["components"],i={id:"pull-request-ignore-any-labels-input",title:"Ignore any pull request labels input",description:"All the information you need to know about the ignore any pull request labels input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Labels"]},o=void 0,s={unversionedId:"pull-requests/inputs/pull-request-ignore-any-labels-input",id:"pull-requests/inputs/pull-request-ignore-any-labels-input",title:"Ignore any pull request labels input",description:"All the information you need to know about the ignore any pull request labels input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/04-ignore-any-labels-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-any-labels-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-any-labels-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/04-ignore-any-labels-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Labels",permalink:"/stale/fr/docs/tags/labels"}],version:"current",sidebarPosition:4,frontMatter:{id:"pull-request-ignore-any-labels-input",title:"Ignore any pull request labels input",description:"All the information you need to know about the ignore any pull request labels input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Labels"]},sidebar:"tutorialSidebar",previous:{title:"Ignore all pull request labels input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-all-labels-input"},next:{title:"Ignore all pull request assignees input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-all-assignees-input"}},p={},c=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function f(e){var t=e.components,n=(0,l.Z)(e,u);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"input"},"Input"),(0,a.kt)("p",null,"Name: ",(0,a.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-any-labels"),(0,a.kt)("br",{parentName:"p"}),"\n","Type: ",(0,a.kt)("inlineCode",{parentName:"p"},"string[]"),(0,a.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,a.kt)("inlineCode",{parentName:"p"},"[]")),(0,a.kt)("h3",{id:"description"},"Description"),(0,a.kt)("p",null,"This input will let you ignore the processing of the pull requests which have at least one of the label from this list.",(0,a.kt)("br",{parentName:"p"}),"\n","This can be useful when you use labels for triage."),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-any-labels: |\n    need help\n    bug\n")))}f.isMDXComponent=!0}}]);