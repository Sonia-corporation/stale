"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2095],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return f}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),d=p(n),f=i,m=d["".concat(l,".").concat(f)]||d[f]||c[f]||o;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:i,a[1]=u;for(var p=2;p<o;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1250:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return s},default:function(){return d}});var r=n(7462),i=n(3366),o=(n(7294),n(3905)),a=["components"],u={id:"pull-request-ignore-before-creation-date-input",title:"Ignore pull request before creation date input",description:"All the information you need to know about the ignore pull request before creation date input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Creation date"]},l=void 0,p={unversionedId:"pull-requests/inputs/pull-request-ignore-before-creation-date-input",id:"pull-requests/inputs/pull-request-ignore-before-creation-date-input",title:"Ignore pull request before creation date input",description:"All the information you need to know about the ignore pull request before creation date input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/09-ignore-before-creation-date-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-ignore-before-creation-date-input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-before-creation-date-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/09-ignore-before-creation-date-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"},{label:"Creation date",permalink:"/stale/docs/tags/creation-date"}],version:"current",sidebarPosition:9,frontMatter:{id:"pull-request-ignore-before-creation-date-input",title:"Ignore pull request before creation date input",description:"All the information you need to know about the ignore pull request before creation date input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Creation date"]},sidebar:"tutorialSidebar",previous:{title:"Ignore any pull request project cards input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-any-project-cards-input"},next:{title:"Ignore pull request draft input",permalink:"/stale/docs/pull-requests/inputs/pull-request-ignore-draft-input"}},s=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:s};function d(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"input"},"Input"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"pull-request-ignore-before-creation-date"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"string"),(0,o.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,o.kt)("inlineCode",{parentName:"p"},"''")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This input will let you ignore the processing of the pull requests which were created before this date.",(0,o.kt)("br",{parentName:"p"}),"\n","This can be useful when you are configuring this action for the first time, and you wish to keep it safe!",(0,o.kt)("br",{parentName:"p"}),"\n","Let the processing handle the newest pull requests first to see if your configuration seems good!"),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-before-creation-date: 2020-04\n")))}d.isMDXComponent=!0}}]);