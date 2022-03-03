"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2095],{4137:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),d=p(n),f=o,m=d["".concat(l,".").concat(f)]||d[f]||c[f]||i;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:o,a[1]=u;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1929:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return l},metadata:function(){return p},assets:function(){return s},toc:function(){return c},default:function(){return f}});var r=n(7462),o=n(3366),i=(n(7294),n(4137)),a=["components"],u={id:"pull-request-ignore-before-creation-date-input",title:"Ignore pull request before creation date input",description:"All the information you need to know about the ignore pull request before creation date input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Creation date"]},l=void 0,p={unversionedId:"pull-requests/inputs/pull-request-ignore-before-creation-date-input",id:"pull-requests/inputs/pull-request-ignore-before-creation-date-input",title:"Ignore pull request before creation date input",description:"All the information you need to know about the ignore pull request before creation date input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/09-ignore-before-creation-date-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-before-creation-date-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-before-creation-date-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/09-ignore-before-creation-date-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Creation date",permalink:"/stale/fr/docs/tags/creation-date"}],version:"current",sidebarPosition:9,frontMatter:{id:"pull-request-ignore-before-creation-date-input",title:"Ignore pull request before creation date input",description:"All the information you need to know about the ignore pull request before creation date input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Creation date"]},sidebar:"tutorialSidebar",previous:{title:"Ignore any pull request project cards input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-any-project-cards-input"},next:{title:"Ignore pull request draft input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-ignore-draft-input"}},s={},c=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"input"},"Input"),(0,i.kt)("p",null,"Name: ",(0,i.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-before-creation-date"),(0,i.kt)("br",{parentName:"p"}),"\n","Type: ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),(0,i.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,i.kt)("inlineCode",{parentName:"p"},"''")),(0,i.kt)("h3",{id:"description"},"Description"),(0,i.kt)("p",null,"This input will let you ignore the processing of the pull requests which were created before this date.",(0,i.kt)("br",{parentName:"p"}),"\n","This can be useful when you are configuring this action for the first time, and you wish to keep it safe!",(0,i.kt)("br",{parentName:"p"}),"\n","Let the processing handle the newest pull requests first to see if your configuration seems good!"),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-before-creation-date: 2020-04\n")))}f.isMDXComponent=!0}}]);