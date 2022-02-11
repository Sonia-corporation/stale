"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8277],{4137:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=c(n),f=i,m=d["".concat(u,".").concat(f)]||d[f]||l[f]||o;return n?r.createElement(m,s(s({ref:t},p),{},{components:n})):r.createElement(m,s({ref:t},p))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,s=new Array(o);s[0]=d;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},88:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var r=n(7462),i=n(3366),o=(n(7294),n(4137)),s=["components"],a={id:"issue-ignore-any-project-cards-input",title:"Ignore any issue project cards input",description:"All the information you need to know about the ignore any issue project cards input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Projects"]},u=void 0,c={unversionedId:"issues/inputs/issue-ignore-any-project-cards-input",id:"issues/inputs/issue-ignore-any-project-cards-input",title:"Ignore any issue project cards input",description:"All the information you need to know about the ignore any issue project cards input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/08-ignore-any-project-cards-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-ignore-any-project-cards-input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-any-project-cards-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/08-ignore-any-project-cards-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Projects",permalink:"/stale/fr/docs/tags/projects"}],version:"current",sidebarPosition:8,frontMatter:{id:"issue-ignore-any-project-cards-input",title:"Ignore any issue project cards input",description:"All the information you need to know about the ignore any issue project cards input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Projects"]},sidebar:"tutorialSidebar",previous:{title:"Ignore all issue project cards input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-all-project-cards-input"},next:{title:"Ignore issue before creation date input",permalink:"/stale/fr/docs/issues/inputs/issue-ignore-before-creation-date-input"}},p=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],l={toc:p};function d(e){var t=e.components,n=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"input"},"Input"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"issue-ignore-any-project-cards"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"string[]"),(0,o.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,o.kt)("inlineCode",{parentName:"p"},"[]")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This input will let you ignore the processing of the issues which have at least one of the project card from this list.",(0,o.kt)("br",{parentName:"p"}),"\n","This can be useful when you link your issues with some projects, and you know that you will for sure close or at least process the issues very soon."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-ignore-any-project-cards: |\n    bugs\n    features\n")))}d.isMDXComponent=!0}}]);