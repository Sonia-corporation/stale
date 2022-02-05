"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1468],{3905:function(t,e,n){n.d(e,{Zo:function(){return p},kt:function(){return c}});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},u=Object.keys(t);for(r=0;r<u.length;r++)n=u[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);for(r=0;r<u.length;r++)n=u[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var o=r.createContext({}),i=function(t){var e=r.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},p=function(t){var e=i(t.components);return r.createElement(o.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,u=t.originalType,o=t.parentName,p=l(t,["components","mdxType","originalType","parentName"]),m=i(n),c=a,f=m["".concat(o,".").concat(c)]||m[c]||d[c]||u;return n?r.createElement(f,s(s({ref:e},p),{},{components:n})):r.createElement(f,s({ref:e},p))}));function c(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var u=n.length,s=new Array(u);s[0]=m;var l={};for(var o in e)hasOwnProperty.call(e,o)&&(l[o]=e[o]);l.originalType=t,l.mdxType="string"==typeof t?t:a,s[1]=l;for(var i=2;i<u;i++)s[i]=n[i];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3281:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return l},contentTitle:function(){return o},metadata:function(){return i},toc:function(){return p},default:function(){return m}});var r=n(7462),a=n(3366),u=(n(7294),n(3905)),s=["components"],l={id:"all-issues-outputs",title:"All issues outputs",tags:["Issues","Outputs"]},o=void 0,i={unversionedId:"issues/outputs/all-issues-outputs",id:"issues/outputs/all-issues-outputs",title:"All issues outputs",description:"The list of all issues the outputs.",source:"@site/docs/06-issues/02-outputs/01-all-outputs.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/all-issues-outputs",permalink:"/stale/fr/docs/issues/outputs/all-issues-outputs",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/01-all-outputs.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:1,frontMatter:{id:"all-issues-outputs",title:"All issues outputs",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Issue limit api mutations count input",permalink:"/stale/fr/docs/issues/inputs/issue-limit-api-mutations-count-input"},next:{title:"Processed issues count output",permalink:"/stale/fr/docs/issues/outputs/processed-issues-count-output"}},p=[],d={toc:p};function m(t){var e=t.components,n=(0,a.Z)(t,s);return(0,u.kt)("wrapper",(0,r.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,u.kt)("p",null,"The list of all issues the outputs."),(0,u.kt)("table",null,(0,u.kt)("thead",{parentName:"table"},(0,u.kt)("tr",{parentName:"thead"},(0,u.kt)("th",{parentName:"tr",align:null},"Output"),(0,u.kt)("th",{parentName:"tr",align:null},"Description"),(0,u.kt)("th",{parentName:"tr",align:null},"Type"))),(0,u.kt)("tbody",{parentName:"table"},(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"processed-issues-count-output"},"processed-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues processed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"ignored-issues-count-output"},"ignored-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues ignored."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"unaltered-issues-count-output"},"unaltered-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues unaltered (either not good to stale or already stale)."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"stale-issues-count-output"},"stale-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues stale."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"already-stale-issues-count-output"},"already-stale-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues processed which were already stale."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"remove-stale-issues-count-output"},"remove-stale-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues from where the stale state was removed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"close-issues-count-output"},"close-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues closed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"added-issues-comments-count-output"},"added-issues-comments-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of added issues comments."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"added-issues-labels-count-output"},"added-issues-labels-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of added issues labels."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"called-api-issues-count-output"},"called-api-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API calls performed for the issues."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"called-api-issues-queries-count-output"},"called-api-issues-queries-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API queries calls performed for the issues."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"called-api-issues-mutations-count-output"},"called-api-issues-mutations-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API mutations calls performed for the issues."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))))))}m.isMDXComponent=!0}}]);