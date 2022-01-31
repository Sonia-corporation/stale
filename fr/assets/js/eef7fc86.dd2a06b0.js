"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2631],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=r.createContext({}),o=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=o(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,u=e.originalType,s=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),f=o(n),d=l,m=f["".concat(s,".").concat(d)]||f[d]||c[d]||u;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function d(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var u=n.length,i=new Array(u);i[0]=f;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:l,i[1]=a;for(var o=2;o<u;o++)i[o]=n[o];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},7633:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return o},toc:function(){return p},default:function(){return f}});var r=n(7462),l=n(3366),u=(n(7294),n(3905)),i=["components"],a={id:"pull-request-ignore-any-labels-input",title:"Ignore any pull request labels input",tags:["Pull requests","Inputs"]},s=void 0,o={unversionedId:"pull-requests/inputs/pull-request-ignore-any-labels-input",id:"pull-requests/inputs/pull-request-ignore-any-labels-input",title:"Ignore any pull request labels input",description:"Input",source:"@site/docs/08-pull-requests/01-inputs/04-ignore-any-labels-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-any-labels-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-any-labels-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/04-ignore-any-labels-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"}],version:"current",sidebarPosition:4,frontMatter:{id:"pull-request-ignore-any-labels-input",title:"Ignore any pull request labels input",tags:["Pull requests","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"Ignore all pull request labels input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-all-labels-input"},next:{title:"Ignore all pull request assignees input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-all-assignees-input"}},p=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:p};function f(e){var t=e.components,n=(0,l.Z)(e,i);return(0,u.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h3",{id:"input"},"Input"),(0,u.kt)("p",null,"Name: ",(0,u.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-any-labels"),(0,u.kt)("br",{parentName:"p"}),"\n","Type: ",(0,u.kt)("inlineCode",{parentName:"p"},"string[]"),(0,u.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,u.kt)("inlineCode",{parentName:"p"},"[]")),(0,u.kt)("h3",{id:"description"},"Description"),(0,u.kt)("p",null,"This input will let you ignore the processing of the pull requests which have at least one of the label from this list.",(0,u.kt)("br",{parentName:"p"}),"\n","This can be useful when you use labels for triage."),(0,u.kt)("h3",{id:"example"},"Example"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-any-labels: |\n    need help\n    bug\n")))}f.isMDXComponent=!0}}]);