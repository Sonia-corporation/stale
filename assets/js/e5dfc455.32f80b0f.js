"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1468],{4137:(t,e,n)=>{n.d(e,{Zo:()=>p,kt:()=>c});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},s=Object.keys(t);for(a=0;a<s.length;a++)n=s[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(a=0;a<s.length;a++)n=s[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var o=a.createContext({}),i=function(t){var e=a.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):u(u({},e),t)),n},p=function(t){var e=i(t.components);return a.createElement(o.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,s=t.originalType,o=t.parentName,p=l(t,["components","mdxType","originalType","parentName"]),m=i(n),c=r,k=m["".concat(o,".").concat(c)]||m[c]||d[c]||s;return n?a.createElement(k,u(u({ref:e},p),{},{components:n})):a.createElement(k,u({ref:e},p))}));function c(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var s=n.length,u=new Array(s);u[0]=m;var l={};for(var o in e)hasOwnProperty.call(e,o)&&(l[o]=e[o]);l.originalType=t,l.mdxType="string"==typeof t?t:r,u[1]=l;for(var i=2;i<s;i++)u[i]=n[i];return a.createElement.apply(null,u)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4311:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>u,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>i});var a=n(7462),r=(n(7294),n(4137));const s={id:"all-issues-outputs",title:"All issues outputs",description:"List all the issues outputs of this action.\n",tags:["Issues","Outputs"]},u=void 0,l={unversionedId:"issues/outputs/all-issues-outputs",id:"issues/outputs/all-issues-outputs",title:"All issues outputs",description:"List all the issues outputs of this action.\n",source:"@site/docs/06-issues/02-outputs/01-all-outputs.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/all-issues-outputs",permalink:"/stale/docs/issues/outputs/all-issues-outputs",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/01-all-outputs.mdx",tags:[{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:1,frontMatter:{id:"all-issues-outputs",title:"All issues outputs",description:"List all the issues outputs of this action.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Issue only with assignees input",permalink:"/stale/docs/issues/inputs/issue-only-with-assignees-input"},next:{title:"Processed issues count output",permalink:"/stale/docs/issues/outputs/processed-issues-count-output"}},o={},i=[],p={toc:i};function d(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The list of all issues the outputs."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Output"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"processed-issues-count-output"},"processed-issues-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of issues processed."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"ignored-issues-count-output"},"ignored-issues-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of issues ignored."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"unaltered-issues-count-output"},"unaltered-issues-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of issues unaltered (either not good to stale or already stale)."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"stale-issues-count-output"},"stale-issues-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of issues stale."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"already-stale-issues-count-output"},"already-stale-issues-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of issues processed which were already stale."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"remove-stale-issues-count-output"},"remove-stale-issues-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of issues from where the stale state was removed."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"close-issues-count-output"},"close-issues-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of issues closed."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"added-issues-comments-count-output"},"added-issues-comments-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of added issues comments."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"added-issues-labels-count-output"},"added-issues-labels-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of added issues labels."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"called-api-issues-count-output"},"called-api-issues-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of GitHub API calls performed for the issues."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"called-api-issues-queries-count-output"},"called-api-issues-queries-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of GitHub API queries calls performed for the issues."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"called-api-issues-mutations-count-output"},"called-api-issues-mutations-count")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of GitHub API mutations calls performed for the issues."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number"))))),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"You can also retrieve those statistics in the ",(0,r.kt)("a",{parentName:"p",href:"../../annotations"},"annotations"),".")))}d.isMDXComponent=!0}}]);