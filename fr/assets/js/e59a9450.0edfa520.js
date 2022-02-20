"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7102],{4137:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var u=r.createContext({}),a=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=a(e.components);return r.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,i=e.originalType,u=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=a(n),d=l,y=m["".concat(u,".").concat(d)]||m[d]||c[d]||i;return n?r.createElement(y,o(o({ref:t},p),{},{components:n})):r.createElement(y,o({ref:t},p))}));function d(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:l,o[1]=s;for(var a=2;a<i;a++)o[a]=n[a];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1681:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return a},toc:function(){return p},default:function(){return m}});var r=n(7462),l=n(3366),i=(n(7294),n(4137)),o=["components"],s={id:"pull-request-only-any-milestones-input",title:"Pull request only any milestones input",description:"All the information you need to know about the pull request only any milestones input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Milestones"]},u=void 0,a={unversionedId:"pull-requests/inputs/pull-request-only-any-milestones-input",id:"pull-requests/inputs/pull-request-only-any-milestones-input",title:"Pull request only any milestones input",description:"All the information you need to know about the pull request only any milestones input.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/01-inputs/23-only-any-milestones-input.mdx",sourceDirName:"08-pull-requests/01-inputs",slug:"/pull-requests/inputs/pull-request-only-any-milestones-input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-only-any-milestones-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/23-only-any-milestones-input.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Milestones",permalink:"/stale/fr/docs/tags/milestones"}],version:"current",sidebarPosition:23,frontMatter:{id:"pull-request-only-any-milestones-input",title:"Pull request only any milestones input",description:"All the information you need to know about the pull request only any milestones input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Milestones"]},sidebar:"tutorialSidebar",previous:{title:"Pull request only any project cards input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-only-any-project-cards-input"},next:{title:"All pull requests outputs",permalink:"/stale/fr/docs/pull-requests/outputs/all-pull-requests-outputs"}},p=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:p};function m(e){var t=e.components,n=(0,l.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"input"},"Input"),(0,i.kt)("p",null,"Name: ",(0,i.kt)("inlineCode",{parentName:"p"},"pull-request-only-any-milestones"),(0,i.kt)("br",{parentName:"p"}),"\n","Type: ",(0,i.kt)("inlineCode",{parentName:"p"},"string[]"),(0,i.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,i.kt)("inlineCode",{parentName:"p"},"[]")),(0,i.kt)("h3",{id:"description"},"Description"),(0,i.kt)("p",null,"This input will let you process only the pull requests that are linked to a milestone which is white-listed with this input.",(0,i.kt)("br",{parentName:"p"}),"\n","This can be useful when you use the milestones for triage."),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-only-any-milestones: |\n    milestone-x\n    milestone-y\n")))}m.isMDXComponent=!0}}]);