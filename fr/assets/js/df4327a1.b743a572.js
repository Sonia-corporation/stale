"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[184],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return y}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),p=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,s=e.originalType,u=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),d=p(n),y=i,m=d["".concat(u,".").concat(y)]||d[y]||l[y]||s;return n?r.createElement(m,o(o({ref:t},c),{},{components:n})):r.createElement(m,o({ref:t},c))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=n.length,o=new Array(s);o[0]=d;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:i,o[1]=a;for(var p=2;p<s;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3135:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return u},metadata:function(){return p},toc:function(){return c},default:function(){return d}});var r=n(7462),i=n(3366),s=(n(7294),n(3905)),o=["components"],a={id:"issue-only-any-project-cards-input",title:"Issue only any project cards input",description:"All the information you need to know about the issue only any project cards input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Projects"]},u=void 0,p={unversionedId:"issues/inputs/issue-only-any-project-cards-input",id:"issues/inputs/issue-only-any-project-cards-input",title:"Issue only any project cards input",description:"All the information you need to know about the issue only any project cards input.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/01-inputs/19-only-any-project-cards-input.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/issue-only-any-project-cards-input",permalink:"/stale/fr/docs/issues/inputs/issue-only-any-project-cards-input",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/19-only-any-project-cards-input.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"},{label:"Projects",permalink:"/stale/fr/docs/tags/projects"}],version:"current",sidebarPosition:19,frontMatter:{id:"issue-only-any-project-cards-input",title:"Issue only any project cards input",description:"All the information you need to know about the issue only any project cards input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Projects"]},sidebar:"tutorialSidebar",previous:{title:"Issue limit api mutations count input",permalink:"/stale/fr/docs/issues/inputs/issue-limit-api-mutations-count-input"},next:{title:"All issues outputs",permalink:"/stale/fr/docs/issues/outputs/all-issues-outputs"}},c=[{value:"Input",id:"input",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],l={toc:c};function d(e){var t=e.components,n=(0,i.Z)(e,o);return(0,s.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"input"},"Input"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"issue-only-any-project-cards"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"string[]"),(0,s.kt)("br",{parentName:"p"}),"\n","Default value: ",(0,s.kt)("inlineCode",{parentName:"p"},"[]")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This input will let you process only the issues that are linked to a project card which is white-listed with this input.",(0,s.kt)("br",{parentName:"p"}),"\n","This can be useful when you use the project cards for triage."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-8}","{6-8}":!0},"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-only-any-project-cards: |\n    project-x\n    project-y\n")))}d.isMDXComponent=!0}}]);