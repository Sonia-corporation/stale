"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9869],{3905:function(t,e,r){r.d(e,{Zo:function(){return d},kt:function(){return c}});var n=r(7294);function l(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){l(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function p(t,e){if(null==t)return{};var r,n,l=function(t,e){if(null==t)return{};var r,n,l={},u=Object.keys(t);for(n=0;n<u.length;n++)r=u[n],e.indexOf(r)>=0||(l[r]=t[r]);return l}(t,e);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);for(n=0;n<u.length;n++)r=u[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(l[r]=t[r])}return l}var s=n.createContext({}),o=function(t){var e=n.useContext(s),r=e;return t&&(r="function"==typeof t?t(e):a(a({},e),t)),r},d=function(t){var e=o(t.components);return n.createElement(s.Provider,{value:e},t.children)},i={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var r=t.components,l=t.mdxType,u=t.originalType,s=t.parentName,d=p(t,["components","mdxType","originalType","parentName"]),m=o(r),c=l,k=m["".concat(s,".").concat(c)]||m[c]||i[c]||u;return r?n.createElement(k,a(a({ref:e},d),{},{components:r})):n.createElement(k,a({ref:e},d))}));function c(t,e){var r=arguments,l=e&&e.mdxType;if("string"==typeof t||l){var u=r.length,a=new Array(u);a[0]=m;var p={};for(var s in e)hasOwnProperty.call(e,s)&&(p[s]=e[s]);p.originalType=t,p.mdxType="string"==typeof t?t:l,a[1]=p;for(var o=2;o<u;o++)a[o]=r[o];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7954:function(t,e,r){r.r(e),r.d(e,{frontMatter:function(){return p},contentTitle:function(){return s},metadata:function(){return o},toc:function(){return d},default:function(){return m}});var n=r(7462),l=r(3366),u=(r(7294),r(3905)),a=["components"],p={id:"all-pull-requests-outputs",title:"All pull requests outputs",tags:["Pull requests","Outputs"]},s=void 0,o={unversionedId:"pull-requests/outputs/all-pull-requests-outputs",id:"pull-requests/outputs/all-pull-requests-outputs",title:"All pull requests outputs",description:"The list of all pull requests the outputs.",source:"@site/docs/08-pull-requests/02-outputs/01-all-outputs.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/all-pull-requests-outputs",permalink:"/stale/docs/pull-requests/outputs/all-pull-requests-outputs",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/01-all-outputs.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:1,frontMatter:{id:"all-pull-requests-outputs",title:"All pull requests outputs",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Pull request to draft instead of stale input",permalink:"/stale/docs/pull-requests/inputs/pull-request-to-draft-instead-of-stale-input"},next:{title:"Processed pull requests count output",permalink:"/stale/docs/pull-requests/outputs/processed-pull-requests-count-output"}},d=[],i={toc:d};function m(t){var e=t.components,r=(0,l.Z)(t,a);return(0,u.kt)("wrapper",(0,n.Z)({},i,r,{components:e,mdxType:"MDXLayout"}),(0,u.kt)("p",null,"The list of all pull requests the outputs."),(0,u.kt)("table",null,(0,u.kt)("thead",{parentName:"table"},(0,u.kt)("tr",{parentName:"thead"},(0,u.kt)("th",{parentName:"tr",align:null},"Output"),(0,u.kt)("th",{parentName:"tr",align:null},"Description"),(0,u.kt)("th",{parentName:"tr",align:null},"Type"))),(0,u.kt)("tbody",{parentName:"table"},(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"processed-pull-requests-count-output"},"processed-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests processed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"ignored-pull-requests-count-output"},"ignored-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests ignored."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"unaltered-pull-requests-count-output"},"unaltered-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests unaltered (either not good to stale or already stale)."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"stale-pull-requests-count-output"},"stale-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests stale."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"already-stale-pull-requests-count-output"},"already-stale-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests processed which were already stale."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"remove-stale-pull-requests-count-output"},"remove-stale-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests from where the stale state was removed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"close-pull-requests-count-output"},"close-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests closed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"deleted-pull-requests-branches-count-output"},"deleted-pull-requests-branches-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of deleted pull requests branches closed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"added-pull-requests-comments-count-output"},"added-pull-requests-comments-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of added pull requests comments."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"added-pull-requests-labels-count-output"},"added-pull-requests-labels-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of added pull requests labels."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"draft-pull-requests-count-output"},"draft-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests converted to draft."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"called-api-pull-requests-count-output"},"called-api-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API calls performed for the pull requests."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"called-api-pull-requests-queries-count-output"},"called-api-pull-requests-queries-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API queries calls performed for the pull requests."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"called-api-pull-requests-mutations-count-output"},"called-api-pull-requests-mutations-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API mutations calls performed for the pull requests."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))))))}m.isMDXComponent=!0}}]);