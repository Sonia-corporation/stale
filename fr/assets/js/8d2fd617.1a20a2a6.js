"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[254],{3905:function(t,e,l){l.d(e,{Zo:function(){return p},kt:function(){return c}});var n=l(7294);function r(t,e,l){return e in t?Object.defineProperty(t,e,{value:l,enumerable:!0,configurable:!0,writable:!0}):t[e]=l,t}function a(t,e){var l=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),l.push.apply(l,n)}return l}function s(t){for(var e=1;e<arguments.length;e++){var l=null!=arguments[e]?arguments[e]:{};e%2?a(Object(l),!0).forEach((function(e){r(t,e,l[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):a(Object(l)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(l,e))}))}return t}function o(t,e){if(null==t)return{};var l,n,r=function(t,e){if(null==t)return{};var l,n,r={},a=Object.keys(t);for(n=0;n<a.length;n++)l=a[n],e.indexOf(l)>=0||(r[l]=t[l]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)l=a[n],e.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(t,l)&&(r[l]=t[l])}return r}var i=n.createContext({}),u=function(t){var e=n.useContext(i),l=e;return t&&(l="function"==typeof t?t(e):s(s({},e),t)),l},p=function(t){var e=u(t.components);return n.createElement(i.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var l=t.components,r=t.mdxType,a=t.originalType,i=t.parentName,p=o(t,["components","mdxType","originalType","parentName"]),m=u(l),c=r,g=m["".concat(i,".").concat(c)]||m[c]||d[c]||a;return l?n.createElement(g,s(s({ref:e},p),{},{components:l})):n.createElement(g,s({ref:e},p))}));function c(t,e){var l=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var a=l.length,s=new Array(a);s[0]=m;var o={};for(var i in e)hasOwnProperty.call(e,i)&&(o[i]=e[i]);o.originalType=t,o.mdxType="string"==typeof t?t:r,s[1]=o;for(var u=2;u<a;u++)s[u]=l[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,l)}m.displayName="MDXCreateElement"},3447:function(t,e,l){l.r(e),l.d(e,{frontMatter:function(){return o},contentTitle:function(){return i},metadata:function(){return u},toc:function(){return p},default:function(){return m}});var n=l(7462),r=l(3366),a=(l(7294),l(3905)),s=["components"],o={id:"all-pull-requests-options",title:"All pull requests options",tags:["Pull requests","Options"]},i=void 0,u={unversionedId:"pull-requests/all-pull-requests-options",id:"pull-requests/all-pull-requests-options",title:"All pull requests options",description:"The list of all the pull requests options.",source:"@site/docs/07-pull-requests/01-all-options.mdx",sourceDirName:"07-pull-requests",slug:"/pull-requests/all-pull-requests-options",permalink:"/stale/fr/docs/pull-requests/all-pull-requests-options",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/07-pull-requests/01-all-options.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Options",permalink:"/stale/fr/docs/tags/options"}],version:"current",sidebarPosition:1,frontMatter:{id:"all-pull-requests-options",title:"All pull requests options",tags:["Pull requests","Options"]},sidebar:"tutorialSidebar",previous:{title:"All issues options",permalink:"/stale/fr/docs/issues/all-issues-options"},next:{title:"Issues configuration examples",permalink:"/stale/fr/docs/examples/issues-examples"}},p=[],d={toc:p};function m(t){var e=t.components,l=(0,r.Z)(t,s);return(0,a.kt)("wrapper",(0,n.Z)({},d,l,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The list of all the pull requests options."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Input"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-stale-label"),(0,a.kt)("td",{parentName:"tr",align:null},"The label that will be added to the pull request when it is stale."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"stale"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-ignore-all-labels"),(0,a.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains any labels."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"false"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-ignore-any-labels"),(0,a.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains one of those labels (multiline)."),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-ignore-all-assignees"),(0,a.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains any assignees."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"false"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-ignore-any-assignees"),(0,a.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains one of those assignees (multiline)."),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-ignore-all-project-cards"),(0,a.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains any project cards."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"false"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-ignore-before-creation-date"),(0,a.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that were created before this date (",(0,a.kt)("a",{parentName:"td",href:"https://moment.github.io/luxon/#/parsing?id=iso-8601"},"ISO 8601"),")."),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-ignore-draft"),(0,a.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that are drafts."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"false"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-days-before-stale"),(0,a.kt)("td",{parentName:"tr",align:null},"The number of days until the pull request is considered as stale."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"30"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-stale-comment"),(0,a.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the pull request is stale (keep empty to not send a comment)."),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-days-before-close"),(0,a.kt)("td",{parentName:"tr",align:null},"The number of days until a stale pull request is considered as closed."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"10"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-close-comment"),(0,a.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the pull request is close (keep empty to not send a comment)."),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-delete-branch-after-close"),(0,a.kt)("td",{parentName:"tr",align:null},"Delete the branch when the processing close the pull request."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"false"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-add-labels-after-stale"),(0,a.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing stale the pull request (multiline)."),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-add-labels-after-close"),(0,a.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing close the pull request (multiline)."),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-processing"),(0,a.kt)("td",{parentName:"tr",align:null},"Allow to process the pull requests."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"true"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"pull-request-to-draft-instead-of-stale"),(0,a.kt)("td",{parentName:"tr",align:null},"Convert the pull request to a draft pull request instead of handling it as a stale candidate."),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"false"))))))}m.isMDXComponent=!0}}]);