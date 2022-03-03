"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9178],{4137:function(t,e,n){n.d(e,{Zo:function(){return p},kt:function(){return c}});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},s=Object.keys(t);for(a=0;a<s.length;a++)n=s[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(a=0;a<s.length;a++)n=s[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var o=a.createContext({}),u=function(t){var e=a.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},p=function(t){var e=u(t.components);return a.createElement(o.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,s=t.originalType,o=t.parentName,p=i(t,["components","mdxType","originalType","parentName"]),m=u(n),c=r,g=m["".concat(o,".").concat(c)]||m[c]||d[c]||s;return n?a.createElement(g,l(l({ref:e},p),{},{components:n})):a.createElement(g,l({ref:e},p))}));function c(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var s=n.length,l=new Array(s);l[0]=m;var i={};for(var o in e)hasOwnProperty.call(e,o)&&(i[o]=e[o]);i.originalType=t,i.mdxType="string"==typeof t?t:r,l[1]=i;for(var u=2;u<s;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7933:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return i},contentTitle:function(){return o},metadata:function(){return u},assets:function(){return p},toc:function(){return d},default:function(){return c}});var a=n(7462),r=n(3366),s=(n(7294),n(4137)),l=["components"],i={id:"all-issues-inputs",title:"All issues inputs",description:"List all the issues inputs of this action.\n",tags:["Issues","Inputs"]},o=void 0,u={unversionedId:"issues/inputs/all-issues-inputs",id:"issues/inputs/all-issues-inputs",title:"All issues inputs",description:"List all the issues inputs of this action.\n",source:"@site/docs/06-issues/01-inputs/01-all-inputs.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/all-issues-inputs",permalink:"/stale/fr/docs/issues/inputs/all-issues-inputs",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/01-all-inputs.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"}],version:"current",sidebarPosition:1,frontMatter:{id:"all-issues-inputs",title:"All issues inputs",description:"List all the issues inputs of this action.\n",tags:["Issues","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"Dry-run input",permalink:"/stale/fr/docs/dry-run-input"},next:{title:"Stale issue label input",permalink:"/stale/fr/docs/issues/inputs/issue-stale-label-input"}},p={},d=[],m={toc:d};function c(t){var e=t.components,n=(0,r.Z)(t,l);return(0,s.kt)("wrapper",(0,a.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"The list of all issues the inputs."),(0,s.kt)("table",null,(0,s.kt)("thead",{parentName:"table"},(0,s.kt)("tr",{parentName:"thead"},(0,s.kt)("th",{parentName:"tr",align:null},"Input"),(0,s.kt)("th",{parentName:"tr",align:null},"Description"),(0,s.kt)("th",{parentName:"tr",align:null},"Default"))),(0,s.kt)("tbody",{parentName:"table"},(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-stale-label-input"},"issue-stale-label")),(0,s.kt)("td",{parentName:"tr",align:null},"The label that will be added to the issue when it is stale."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"stale"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-all-labels-input"},"issue-ignore-all-labels")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any labels."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"false"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-any-labels-input"},"issue-ignore-any-labels")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those labels (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-all-assignees-input"},"issue-ignore-all-assignees")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any assignees."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"false"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-any-assignees-input"},"issue-ignore-any-assignees")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those assignees (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-all-project-cards-input"},"issue-ignore-all-project-cards")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any project cards."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"false"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-any-project-cards-input"},"issue-ignore-any-project-cards")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those project cards (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-ignore-before-creation-date-input"},"issue-ignore-before-creation-date")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that were created before this date (",(0,s.kt)("a",{parentName:"td",href:"https://moment.github.io/luxon/#/parsing?id=iso-8601"},"ISO 8601"),")."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-days-before-stale-input"},"issue-days-before-stale")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of days until the issue is considered as stale."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"30"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-stale-comment-input"},"issue-stale-comment")),(0,s.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the issue is stale (keep empty to not send a comment)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-days-before-close-input"},"issue-days-before-close")),(0,s.kt)("td",{parentName:"tr",align:null},"The number of days until a stale issue is considered as closed."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"10"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-close-comment-input"},"issue-close-comment")),(0,s.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the issue is close (keep empty to not send a comment)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-add-labels-after-stale-input"},"issue-add-labels-after-stale")),(0,s.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing stale the issue (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-add-labels-after-close-input"},"issue-add-labels-after-close")),(0,s.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing close the issue (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-processing-input"},"issue-processing")),(0,s.kt)("td",{parentName:"tr",align:null},"Allow to process the issues."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"true"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-limit-api-queries-count-input"},"issue-limit-api-queries-count")),(0,s.kt)("td",{parentName:"tr",align:null},"Limit the quantity of API queries calls performed during the processing of issues (-1 for unlimited)."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"-1"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-limit-api-mutations-count-input"},"issue-limit-api-mutations-count")),(0,s.kt)("td",{parentName:"tr",align:null},"Limit the quantity of API mutations calls performed during the processing of issues (-1 for unlimited)."),(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("inlineCode",{parentName:"td"},"-1"))),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-only-any-project-cards-input"},"issue-only-any-project-cards")),(0,s.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains one of those project cards (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"issue-only-any-milestones-input"},"issue-only-any-milestones")),(0,s.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains one of those milestones (multiline)."),(0,s.kt)("td",{parentName:"tr",align:null})))))}c.isMDXComponent=!0}}]);