"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1468],{4137:function(t,e,n){n.d(e,{Zo:function(){return p},kt:function(){return c}});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},s=Object.keys(t);for(a=0;a<s.length;a++)n=s[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(a=0;a<s.length;a++)n=s[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var o=a.createContext({}),i=function(t){var e=a.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):u(u({},e),t)),n},p=function(t){var e=i(t.components);return a.createElement(o.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,s=t.originalType,o=t.parentName,p=l(t,["components","mdxType","originalType","parentName"]),m=i(n),c=r,k=m["".concat(o,".").concat(c)]||m[c]||d[c]||s;return n?a.createElement(k,u(u({ref:e},p),{},{components:n})):a.createElement(k,u({ref:e},p))}));function c(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var s=n.length,u=new Array(s);u[0]=m;var l={};for(var o in e)hasOwnProperty.call(e,o)&&(l[o]=e[o]);l.originalType=t,l.mdxType="string"==typeof t?t:r,u[1]=l;for(var i=2;i<s;i++)u[i]=n[i];return a.createElement.apply(null,u)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4311:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return l},contentTitle:function(){return o},metadata:function(){return i},assets:function(){return p},toc:function(){return d},default:function(){return c}});var a=n(7462),r=n(3366),s=(n(7294),n(4137)),u=["components"],l={id:"all-issues-outputs",title:"All issues outputs",description:"List all the issues outputs of this action.\n",tags:["Issues","Outputs"]},o=void 0,i={unversionedId:"issues/outputs/all-issues-outputs",id:"issues/outputs/all-issues-outputs",title:"All issues outputs",description:"List all the issues outputs of this action.\n",source:"@site/docs/06-issues/02-outputs/01-all-outputs.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/all-issues-outputs",permalink:"/stale/fr/docs/issues/outputs/all-issues-outputs",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/01-all-outputs.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:1,frontMatter:{id:"all-issues-outputs",title:"All issues outputs",description:"List all the issues outputs of this action.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Issue only any milestones input",permalink:"/stale/fr/docs/issues/inputs/issue-only-any-milestones-input"},next:{title:"Processed issues count output",permalink:"/stale/fr/docs/issues/outputs/processed-issues-count-output"}},p={},d=[],m={toc:d};function c(t){var e=t.components,n=(0,r.Z)(t,u);return(0,s.kt)("wrapper",(0,a.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"The list of all issues the outputs."),(0,s.kt)("table",null,(0,s.kt)("thead",{parentName:"table"},(0,s.kt)("tr",{parentName:"thead"},(0,s.kt)("th",{parentName:"tr",align:null},"Output"),(0,s.kt)("th",{parentName:"tr",align:null},"Description"),(0,s.kt)("th",{parentName:"tr",align:null},"Type"))),(0,s.kt)("tbody",{parentName:"table"},(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"processed-issues-count-output"},"processed-issues-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of issues processed."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"ignored-issues-count-output"},"ignored-issues-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of issues ignored."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"unaltered-issues-count-output"},"unaltered-issues-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of issues unaltered (either not good to stale or already stale)."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"stale-issues-count-output"},"stale-issues-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of issues stale."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"already-stale-issues-count-output"},"already-stale-issues-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of issues processed which were already stale."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"remove-stale-issues-count-output"},"remove-stale-issues-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of issues from where the stale state was removed."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"close-issues-count-output"},"close-issues-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of issues closed."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"added-issues-comments-count-output"},"added-issues-comments-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of added issues comments."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"added-issues-labels-count-output"},"added-issues-labels-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of added issues labels."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"called-api-issues-count-output"},"called-api-issues-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of GitHub API calls performed for the issues."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"called-api-issues-queries-count-output"},"called-api-issues-queries-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of GitHub API queries calls performed for the issues."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"called-api-issues-mutations-count-output"},"called-api-issues-mutations-count")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of GitHub API mutations calls performed for the issues."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"number"))))),(0,s.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"You can also retrieve those statistics in the ",(0,s.kt)("a",{parentName:"p",href:"../../annotations"},"annotations"),"."))))}c.isMDXComponent=!0}}]);