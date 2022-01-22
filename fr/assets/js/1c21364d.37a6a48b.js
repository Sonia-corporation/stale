"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3573],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),f=u(n),d=l,m=f["".concat(s,".").concat(d)]||f[d]||c[d]||o;return n?r.createElement(m,a(a({ref:t},p),{},{components:n})):r.createElement(m,a({ref:t},p))}));function d(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var o=n.length,a=new Array(o);a[0]=f;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:l,a[1]=i;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6801:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return p},default:function(){return f}});var r=n(7462),l=n(3366),o=(n(7294),n(3905)),a=["components"],i={id:"pull-request-ignore-any-labels-option",title:"Ignore any pull request labels option",tags:["Pull requests","Options"]},s=void 0,u={unversionedId:"pull-requests/pull-request-ignore-any-labels-option",id:"pull-requests/pull-request-ignore-any-labels-option",title:"Ignore any pull request labels option",description:"Input",source:"@site/docs/07-pull-requests/04-ignore-any-labels-option.mdx",sourceDirName:"07-pull-requests",slug:"/pull-requests/pull-request-ignore-any-labels-option",permalink:"/stale/fr/docs/pull-requests/pull-request-ignore-any-labels-option",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/07-pull-requests/04-ignore-any-labels-option.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Options",permalink:"/stale/fr/docs/tags/options"}],version:"current",sidebarPosition:4,frontMatter:{id:"pull-request-ignore-any-labels-option",title:"Ignore any pull request labels option",tags:["Pull requests","Options"]},sidebar:"tutorialSidebar",previous:{title:"Ignore all pull request labels option",permalink:"/stale/fr/docs/pull-requests/pull-request-ignore-all-labels-option"},next:{title:"Ignore all pull request assignees option",permalink:"/stale/fr/docs/pull-requests/pull-request-ignore-all-assignees-option"}},p=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:p};function f(e){var t=e.components,n=(0,l.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"input"},"Input"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-any-labels"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"string[]"),(0,o.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,o.kt)("inlineCode",{parentName:"p"},"[]")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This option will let you ignore the processing of the pull requests which have at least one of the label from this list.",(0,o.kt)("br",{parentName:"p"}),"\n","This can be useful when you use labels for triage."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-any-labels: |\n    need help\n    bug\n")))}f.isMDXComponent=!0}}]);