"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9178],{4137:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>k});var a=n(7294);function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,a,l=function(t,e){if(null==t)return{};var n,a,l={},r=Object.keys(t);for(a=0;a<r.length;a++)n=r[a],e.indexOf(n)>=0||(l[n]=t[n]);return l}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(a=0;a<r.length;a++)n=r[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(l[n]=t[n])}return l}var o=a.createContext({}),p=function(t){var e=a.useContext(o),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},u=function(t){var e=p(t.components);return a.createElement(o.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var n=t.components,l=t.mdxType,r=t.originalType,o=t.parentName,u=i(t,["components","mdxType","originalType","parentName"]),m=p(n),k=l,g=m["".concat(o,".").concat(k)]||m[k]||d[k]||r;return n?a.createElement(g,s(s({ref:e},u),{},{components:n})):a.createElement(g,s({ref:e},u))}));function k(t,e){var n=arguments,l=e&&e.mdxType;if("string"==typeof t||l){var r=n.length,s=new Array(r);s[0]=m;var i={};for(var o in e)hasOwnProperty.call(e,o)&&(i[o]=e[o]);i.originalType=t,i.mdxType="string"==typeof t?t:l,s[1]=i;for(var p=2;p<r;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7933:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>p});var a=n(7462),l=(n(7294),n(4137));const r={id:"all-issues-inputs",title:"All issues inputs",description:"List all the issues inputs of this action.\n",tags:["Issues","Inputs"]},s=void 0,i={unversionedId:"issues/inputs/all-issues-inputs",id:"issues/inputs/all-issues-inputs",title:"All issues inputs",description:"List all the issues inputs of this action.\n",source:"@site/docs/06-issues/01-inputs/01-all-inputs.mdx",sourceDirName:"06-issues/01-inputs",slug:"/issues/inputs/all-issues-inputs",permalink:"/stale/fr/docs/issues/inputs/all-issues-inputs",draft:!1,editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/01-all-inputs.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Inputs",permalink:"/stale/fr/docs/tags/inputs"}],version:"current",sidebarPosition:1,frontMatter:{id:"all-issues-inputs",title:"All issues inputs",description:"List all the issues inputs of this action.\n",tags:["Issues","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"Dry-run input",permalink:"/stale/fr/docs/dry-run-input"},next:{title:"Stale issue label input",permalink:"/stale/fr/docs/issues/inputs/issue-stale-label-input"}},o={},p=[],u={toc:p};function d(t){let{components:e,...n}=t;return(0,l.kt)("wrapper",(0,a.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"The list of all issues the inputs."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Input"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"Labels")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-stale-label-input"},"issue-stale-label")),(0,l.kt)("td",{parentName:"tr",align:null},"The label that will be added to the issue when it is stale."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"stale"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-ignore-all-labels-input"},"issue-ignore-all-labels")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any labels."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"false"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-ignore-any-labels-input"},"issue-ignore-any-labels")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those labels (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"Assignees")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-ignore-all-assignees-input"},"issue-ignore-all-assignees")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any assignees."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"false"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-ignore-any-assignees-input"},"issue-ignore-any-assignees")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those assignees (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-only-with-assignees-input"},"issue-only-with-assignees")),(0,l.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains at least one assignee."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"false"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-only-any-assignees-input"},"issue-only-any-assignees")),(0,l.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains one of those assignees (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"Project cards")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-ignore-all-project-cards-input"},"issue-ignore-all-project-cards")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any project cards."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"false"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-ignore-any-project-cards-input"},"issue-ignore-any-project-cards")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those project cards (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-only-with-project-cards-input"},"issue-only-with-project-cards")),(0,l.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains at least one project card."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"false"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-only-any-project-cards-input"},"issue-only-any-project-cards")),(0,l.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains one of those project cards (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"Milestones")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-ignore-all-milestones-input"},"issue-ignore-all-milestones")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any milestones."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"false"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-ignore-any-milestones-input"},"issue-ignore-any-milestones")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those milestones (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-only-with-milestones-input"},"issue-only-with-milestones")),(0,l.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains at least one milestone."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"false"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-only-any-milestones-input"},"issue-only-any-milestones")),(0,l.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains one of those milestones (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"Comments")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-stale-comment-input"},"issue-stale-comment")),(0,l.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the issue is stale (keep empty to not send a comment)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-close-comment-input"},"issue-close-comment")),(0,l.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the issue is close (keep empty to not send a comment)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"Durations")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-days-before-stale-input"},"issue-days-before-stale")),(0,l.kt)("td",{parentName:"tr",align:null},"The number of days until the issue is considered as stale."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"30"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-days-before-close-input"},"issue-days-before-close")),(0,l.kt)("td",{parentName:"tr",align:null},"The number of days until a stale issue is considered as closed."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"10"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"Limiters")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-limit-api-queries-count-input"},"issue-limit-api-queries-count")),(0,l.kt)("td",{parentName:"tr",align:null},"Limit the quantity of API queries calls performed during the processing of issues (",(0,l.kt)("inlineCode",{parentName:"td"},"-1")," for unlimited)."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"-1"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-limit-api-mutations-count-input"},"issue-limit-api-mutations-count")),(0,l.kt)("td",{parentName:"tr",align:null},"Limit the quantity of API mutations calls performed during the processing of issues (",(0,l.kt)("inlineCode",{parentName:"td"},"-1")," for unlimited)."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"-1"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-ignore-before-creation-date-input"},"issue-ignore-before-creation-date")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that were created before this date (",(0,l.kt)("a",{parentName:"td",href:"https://moment.github.io/luxon/#/parsing?id=iso-8601"},"ISO 8601"),")."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"Others")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-processing-input"},"issue-processing")),(0,l.kt)("td",{parentName:"tr",align:null},"Allow to process the issues."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"true"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-close-reason-input"},"issue-close-reason")),(0,l.kt)("td",{parentName:"tr",align:null},"The reason when closing an issue (",(0,l.kt)("inlineCode",{parentName:"td"},"completed")," or ",(0,l.kt)("inlineCode",{parentName:"td"},"not planned"),")."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"not planned"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-add-labels-after-stale-input"},"issue-add-labels-after-stale")),(0,l.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing stale the issue (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-remove-labels-after-stale-input"},"issue-remove-labels-after-stale")),(0,l.kt)("td",{parentName:"tr",align:null},"A list of labels removed when the processing stale the issue (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-add-labels-after-close-input"},"issue-add-labels-after-close")),(0,l.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing close the issue (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"issue-remove-labels-after-close-input"},"issue-remove-labels-after-close")),(0,l.kt)("td",{parentName:"tr",align:null},"A list of labels removed when the processing close the issue (multiline)."),(0,l.kt)("td",{parentName:"tr",align:null})))))}d.isMDXComponent=!0}}]);