"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9869],{4137:(t,e,r)=>{r.d(e,{Zo:()=>i,kt:()=>c});var l=r(7294);function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,l)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e){if(null==t)return{};var r,l,n=function(t,e){if(null==t)return{};var r,l,n={},a=Object.keys(t);for(l=0;l<a.length;l++)r=a[l],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(l=0;l<a.length;l++)r=a[l],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var p=l.createContext({}),o=function(t){var e=l.useContext(p),r=e;return t&&(r="function"==typeof t?t(e):u(u({},e),t)),r},i=function(t){var e=o(t.components);return l.createElement(p.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return l.createElement(l.Fragment,{},e)}},m=l.forwardRef((function(t,e){var r=t.components,n=t.mdxType,a=t.originalType,p=t.parentName,i=s(t,["components","mdxType","originalType","parentName"]),m=o(r),c=n,k=m["".concat(p,".").concat(c)]||m[c]||d[c]||a;return r?l.createElement(k,u(u({ref:e},i),{},{components:r})):l.createElement(k,u({ref:e},i))}));function c(t,e){var r=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var a=r.length,u=new Array(a);u[0]=m;var s={};for(var p in e)hasOwnProperty.call(e,p)&&(s[p]=e[p]);s.originalType=t,s.mdxType="string"==typeof t?t:n,u[1]=s;for(var o=2;o<a;o++)u[o]=r[o];return l.createElement.apply(null,u)}return l.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3216:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>p,contentTitle:()=>u,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>o});var l=r(7462),n=(r(7294),r(4137));const a={id:"all-pull-requests-outputs",title:"All pull requests outputs",description:"List all the pull requests outputs of this action.\n",tags:["Pull requests","Outputs"]},u=void 0,s={unversionedId:"pull-requests/outputs/all-pull-requests-outputs",id:"pull-requests/outputs/all-pull-requests-outputs",title:"All pull requests outputs",description:"List all the pull requests outputs of this action.\n",source:"@site/docs/08-pull-requests/02-outputs/01-all-outputs.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/all-pull-requests-outputs",permalink:"/stale/fr/docs/pull-requests/outputs/all-pull-requests-outputs",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/01-all-outputs.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:1,frontMatter:{id:"all-pull-requests-outputs",title:"All pull requests outputs",description:"List all the pull requests outputs of this action.\n",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Pull request only with assignees input",permalink:"/stale/fr/docs/pull-requests/inputs/pull-request-only-with-assignees-input"},next:{title:"Processed pull requests count output",permalink:"/stale/fr/docs/pull-requests/outputs/processed-pull-requests-count-output"}},p={},o=[],i={toc:o};function d(t){let{components:e,...r}=t;return(0,n.kt)("wrapper",(0,l.Z)({},i,r,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"The list of all pull requests the outputs."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Output"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"processed-pull-requests-count-output"},"processed-pull-requests-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of pull requests processed."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"ignored-pull-requests-count-output"},"ignored-pull-requests-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of pull requests ignored."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"unaltered-pull-requests-count-output"},"unaltered-pull-requests-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of pull requests unaltered (either not good to stale or already stale)."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"stale-pull-requests-count-output"},"stale-pull-requests-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of pull requests stale."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"already-stale-pull-requests-count-output"},"already-stale-pull-requests-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of pull requests processed which were already stale."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"remove-stale-pull-requests-count-output"},"remove-stale-pull-requests-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of pull requests from where the stale state was removed."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"close-pull-requests-count-output"},"close-pull-requests-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of pull requests closed."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"deleted-pull-requests-branches-count-output"},"deleted-pull-requests-branches-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of deleted pull requests branches closed."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"added-pull-requests-comments-count-output"},"added-pull-requests-comments-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of added pull requests comments."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"added-pull-requests-labels-count-output"},"added-pull-requests-labels-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of added pull requests labels."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"draft-pull-requests-count-output"},"draft-pull-requests-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of pull requests converted to draft."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"called-api-pull-requests-count-output"},"called-api-pull-requests-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of GitHub API calls performed for the pull requests."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"called-api-pull-requests-queries-count-output"},"called-api-pull-requests-queries-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of GitHub API queries calls performed for the pull requests."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("a",{parentName:"td",href:"called-api-pull-requests-mutations-count-output"},"called-api-pull-requests-mutations-count")),(0,n.kt)("td",{parentName:"tr",align:null},"The number of GitHub API mutations calls performed for the pull requests."),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"number"))))),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"You can also retrieve those statistics in the ",(0,n.kt)("a",{parentName:"p",href:"../../annotations"},"annotations"),".")))}d.isMDXComponent=!0}}]);