"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7502],{4137:function(t,e,n){n.d(e,{Zo:function(){return i},kt:function(){return c}});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},u=Object.keys(t);for(a=0;a<u.length;a++)n=u[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);for(a=0;a<u.length;a++)n=u[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var o=a.createContext({}),p=function(t){var e=a.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},i=function(t){var e=p(t.components);return a.createElement(o.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,u=t.originalType,o=t.parentName,i=s(t,["components","mdxType","originalType","parentName"]),m=p(n),c=r,k=m["".concat(o,".").concat(c)]||m[c]||d[c]||u;return n?a.createElement(k,l(l({ref:e},i),{},{components:n})):a.createElement(k,l({ref:e},i))}));function c(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var u=n.length,l=new Array(u);l[0]=m;var s={};for(var o in e)hasOwnProperty.call(e,o)&&(s[o]=e[o]);s.originalType=t,s.mdxType="string"==typeof t?t:r,l[1]=s;for(var p=2;p<u;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5977:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return s},contentTitle:function(){return o},metadata:function(){return p},assets:function(){return i},toc:function(){return d},default:function(){return c}});var a=n(7462),r=n(3366),u=(n(7294),n(4137)),l=["components"],s={id:"all-outputs",title:"All outputs",description:"List all the outputs of this action.\nIncluding issues and pull requests outputs.\n",tags:["Issues","Pull requests","Outputs"]},o=void 0,p={unversionedId:"all-outputs",id:"all-outputs",title:"All outputs",description:"List all the outputs of this action.\nIncluding issues and pull requests outputs.\n",source:"@site/docs/04-all-outputs.mdx",sourceDirName:".",slug:"/all-outputs",permalink:"/stale/fr/docs/all-outputs",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/04-all-outputs.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:4,frontMatter:{id:"all-outputs",title:"All outputs",description:"List all the outputs of this action.\nIncluding issues and pull requests outputs.\n",tags:["Issues","Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"All inputs",permalink:"/stale/fr/docs/all-inputs"},next:{title:"GitHub token input",permalink:"/stale/fr/docs/github-token-input"}},i={},d=[],m={toc:d};function c(t){var e=t.components,n=(0,r.Z)(t,l);return(0,u.kt)("wrapper",(0,a.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,u.kt)("p",null,"The list of all the outputs."),(0,u.kt)("table",null,(0,u.kt)("thead",{parentName:"table"},(0,u.kt)("tr",{parentName:"thead"},(0,u.kt)("th",{parentName:"tr",align:null},"Output"),(0,u.kt)("th",{parentName:"tr",align:null},"Description"),(0,u.kt)("th",{parentName:"tr",align:null},"Type"))),(0,u.kt)("tbody",{parentName:"table"},(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/processed-issues-count-output"},"processed-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues processed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/ignored-issues-count-output"},"ignored-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues ignored."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/unaltered-issues-count-output"},"unaltered-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues unaltered (either not good to stale or already stale)."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/stale-issues-count-output"},"stale-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues stale."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/already-stale-issues-count-output"},"already-stale-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues processed which were already stale."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/remove-stale-issues-count-output"},"remove-stale-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues from where the stale state was removed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/close-issues-count-output"},"close-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of issues closed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/added-issues-comments-count-output"},"added-issues-comments-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of added issues comments."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/added-issues-labels-count-output"},"added-issues-labels-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of added issues labels."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/called-api-issues-count-output"},"called-api-issues-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API calls performed for the issues."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/called-api-issues-queries-count-output"},"called-api-issues-queries-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API queries calls performed for the issues."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"issues/outputs/called-api-issues-mutations-count-output"},"called-api-issues-mutations-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API mutations calls performed for the issues."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/processed-pull-requests-count-output"},"processed-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests processed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/ignored-pull-requests-count-output"},"ignored-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests ignored."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/unaltered-pull-requests-count-output"},"unaltered-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests unaltered (either not good to stale or already stale)."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/stale-pull-requests-count-output"},"stale-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests stale."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/already-stale-pull-requests-count-output"},"already-stale-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests processed which were already stale."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/remove-stale-pull-requests-count-output"},"remove-stale-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests from where the stale state was removed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/close-pull-requests-count-output"},"close-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests closed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/deleted-pull-requests-branches-count-output"},"deleted-pull-requests-branches-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of deleted pull requests branches closed."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/added-pull-requests-comments-count-output"},"added-pull-requests-comments-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of added pull requests comments."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/added-pull-requests-labels-count-output"},"added-pull-requests-labels-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of added pull requests labels."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/draft-pull-requests-count-output"},"draft-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of pull requests converted to draft."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/called-api-pull-requests-count-output"},"called-api-pull-requests-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API calls performed for the pull requests."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/called-api-pull-requests-queries-count-output"},"called-api-pull-requests-queries-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API queries calls performed for the pull requests."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))),(0,u.kt)("tr",{parentName:"tbody"},(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("a",{parentName:"td",href:"pull-requests/outputs/called-api-pull-requests-mutations-count-output"},"called-api-pull-requests-mutations-count")),(0,u.kt)("td",{parentName:"tr",align:null},"The number of GitHub API mutations calls performed for the pull requests."),(0,u.kt)("td",{parentName:"tr",align:null},(0,u.kt)("inlineCode",{parentName:"td"},"number"))))),(0,u.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,u.kt)("div",{parentName:"div",className:"admonition-heading"},(0,u.kt)("h5",{parentName:"div"},(0,u.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,u.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,u.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,u.kt)("div",{parentName:"div",className:"admonition-content"},(0,u.kt)("p",{parentName:"div"},"You can also retrieve those statistics in the ",(0,u.kt)("a",{parentName:"p",href:"./annotations"},"annotations"),"."))))}c.isMDXComponent=!0}}]);