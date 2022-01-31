"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9178],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return c}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,o=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=u(n),c=r,g=m["".concat(o,".").concat(c)]||m[c]||d[c]||s;return n?a.createElement(g,l(l({ref:t},p),{},{components:n})):a.createElement(g,l({ref:t},p))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,l=new Array(s);l[0]=m;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var u=2;u<s;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1590:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return o},metadata:function(){return u},toc:function(){return p},default:function(){return m}});var a=n(7462),r=n(3366),s=(n(7294),n(3905)),l=["components"],i={id:"all-issues-inputs",title:"All issues inputs",tags:["Issues","Inputs"]},o=void 0,u={unversionedId:"issues/inputs/all-issues-inputs",id:"issues/inputs/all-issues-inputs",title:"All issues inputs",description:"The list of all issues the inputs.",source:"@site/docs/06-issues/01-inputs/01-all-inputs.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/all-issues-inputs",permalink:"/stale/fr/docs/issues/inputs/all-issues-inputs",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/01-all-inputs.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"}],version:"current",sidebarPosition:1,frontMatter:{id:"all-issues-inputs",title:"All issues inputs",tags:["Issues","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"Dry-run input",permalink:"/stale/fr/docs/dry-run-input"},next:{title:"Stale issue label input",permalink:"/stale/fr/docs/issues/inputs/issue-stale-label-input"}},p=[],d={toc:p};function m(e){var t=e.components,n=(0,r.Z)(e,l);return(0,s.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"The list of all issues the inputs."),(0,s.kt)("table",null,(0,s.kt)("thead",{parentName:"table"},(0,s.kt)("tr",{parentName:"thead"},(0,s.kt)("th",{parentName:"tr",align:null},"Input"),(0,s.kt)("th",{parentName:"tr",align:null},"Description"),(0,s.kt)("th",{parentName:"tr",align:null},"Default"))),(0,s.kt)("tbody",{parentName:"table"},(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-stale-label-input"},"issue-stale-label")),(0,s.kt)("td",{parentName:"tr",align:null},"The label that will be added to the issue when it is stale."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"stale"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-all-labels-input"},"issue-ignore-all-labels")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any labels."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"false"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-any-labels-input"},"issue-ignore-any-labels")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those labels (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-all-assignees-input"},"issue-ignore-all-assignees")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any assignees."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"false"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-any-assignees-input"},"issue-ignore-any-assignees")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those assignees (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-all-project-cards-input"},"issue-ignore-all-project-cards")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any project cards."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"false"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-before-creation-date-input"},"issue-ignore-before-creation-date")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that were created before this date (",(0,s.kt)("a",{parentName:"td",href:"https://moment.github.io/luxon/#/parsing?id=iso-8601"},"ISO 8601"),")."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-days-before-stale-input"},"issue-days-before-stale")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of days until the issue is considered as stale."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"30"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-stale-comment-input"},"issue-stale-comment")),(0,s.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the issue is stale (keep empty to not send a comment)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-days-before-close-input"},"issue-days-before-close")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of days until a stale issue is considered as closed."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"10"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-close-comment-input"},"issue-close-comment")),(0,s.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the issue is close (keep empty to not send a comment)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-add-labels-after-stale-input"},"issue-add-labels-after-stale")),(0,s.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing stale the issue (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-add-labels-after-close-input"},"issue-add-labels-after-close")),(0,s.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing close the issue (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-processing-input"},"issue-processing")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to process the issues."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"true"))))))}m.isMDXComponent=!0}}]);