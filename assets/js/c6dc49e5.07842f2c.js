"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4873],{4137:function(t,e,n){n.d(e,{Zo:function(){return o},kt:function(){return k}});var a=n(7294);function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,a,l=function(t,e){if(null==t)return{};var n,a,l={},r=Object.keys(t);for(a=0;a<r.length;a++)n=r[a],e.indexOf(n)>=0||(l[n]=t[n]);return l}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(a=0;a<r.length;a++)n=r[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(l[n]=t[n])}return l}var u=a.createContext({}),p=function(t){var e=a.useContext(u),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},o=function(t){var e=p(t.components);return a.createElement(u.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var n=t.components,l=t.mdxType,r=t.originalType,u=t.parentName,o=i(t,["components","mdxType","originalType","parentName"]),m=p(n),k=l,g=m["".concat(u,".").concat(k)]||m[k]||d[k]||r;return n?a.createElement(g,s(s({ref:e},o),{},{components:n})):a.createElement(g,s({ref:e},o))}));function k(t,e){var n=arguments,l=e&&e.mdxType;if("string"==typeof t||l){var r=n.length,s=new Array(r);s[0]=m;var i={};for(var u in e)hasOwnProperty.call(e,u)&&(i[u]=e[u]);i.originalType=t,i.mdxType="string"==typeof t?t:l,s[1]=i;for(var p=2;p<r;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4463:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return i},contentTitle:function(){return u},metadata:function(){return p},assets:function(){return o},toc:function(){return d},default:function(){return k}});var a=n(7462),l=n(3366),r=(n(7294),n(4137)),s=["components"],i={id:"all-inputs",title:"All inputs",description:"List all the inputs of this action.\nIncluding common, issues and pull requests inputs.\n",tags:["Common","Issues","Pull requests","Inputs"]},u=void 0,p={unversionedId:"all-inputs",id:"all-inputs",title:"All inputs",description:"List all the inputs of this action.\nIncluding common, issues and pull requests inputs.\n",source:"@site/docs/03-all-inputs.mdx",sourceDirName:".",slug:"/all-inputs",permalink:"/stale/docs/all-inputs",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/03-all-inputs.mdx",tags:[{label:"Common",permalink:"/stale/docs/tags/common"},{label:"Issues",permalink:"/stale/docs/tags/issues"},{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Inputs",permalink:"/stale/docs/tags/inputs"}],version:"current",sidebarPosition:3,frontMatter:{id:"all-inputs",title:"All inputs",description:"List all the inputs of this action.\nIncluding common, issues and pull requests inputs.\n",tags:["Common","Issues","Pull requests","Inputs"]},sidebar:"tutorialSidebar",previous:{title:"Workflow testing",permalink:"/stale/docs/getting-started/workflow-testing"},next:{title:"All outputs",permalink:"/stale/docs/all-outputs"}},o={},d=[],m={toc:d};function k(t){var e=t.components,n=(0,l.Z)(t,s);return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The list of all the inputs."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Input"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"github-token-input"},"github-token")),(0,r.kt)("td",{parentName:"tr",align:null},"A GitHub token used to perform the API calls to GitHub through ",(0,r.kt)("inlineCode",{parentName:"td"},"@actions/github"),". Usually ",(0,r.kt)("inlineCode",{parentName:"td"},"${{ secrets.GITHUB_TOKEN }}"),"."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"${{ github.token }}"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"dry-run-input"},"dry-run")),(0,r.kt)("td",{parentName:"tr",align:null},"A mode where any Data Manipulation Language will be skipped. Useful to debug safely and without risking messing up with your repository."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-stale-label-input"},"issue-stale-label")),(0,r.kt)("td",{parentName:"tr",align:null},"The label that will be added to the issue when it is stale."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"stale"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-ignore-all-labels-input"},"issue-ignore-all-labels")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any labels."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-ignore-any-labels-input"},"issue-ignore-any-labels")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those labels (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-ignore-all-assignees-input"},"issue-ignore-all-assignees")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any assignees."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-ignore-any-assignees-input"},"issue-ignore-any-assignees")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those assignees (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-ignore-all-project-cards-input"},"issue-ignore-all-project-cards")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains any project cards."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-ignore-any-project-cards-input"},"issue-ignore-any-project-cards")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that contains one of those project cards (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-ignore-before-creation-date-input"},"issue-ignore-before-creation-date")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of issues that were created before this date (",(0,r.kt)("a",{parentName:"td",href:"https://moment.github.io/luxon/#/parsing?id=iso-8601"},"ISO 8601"),")."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-days-before-stale-input"},"issue-days-before-stale")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of days until the issue is considered as stale."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"30"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-stale-comment-input"},"issue-stale-comment")),(0,r.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the issue is stale (keep empty to not send a comment)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-days-before-close-input"},"issue-days-before-close")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of days until a stale issue is considered as closed."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"10"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-close-comment-input"},"issue-close-comment")),(0,r.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the issue is close (keep empty to not send a comment)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-add-labels-after-stale-input"},"issue-add-labels-after-stale")),(0,r.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing stale the issue (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-add-labels-after-close-input"},"issue-add-labels-after-close")),(0,r.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing close the issue (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-processing-input"},"issue-processing")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to process the issues."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"true"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-limit-api-queries-count-input"},"issue-limit-api-queries-count")),(0,r.kt)("td",{parentName:"tr",align:null},"Limit the quantity of API queries calls performed during the processing of issues (-1 for unlimited)."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"-1"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-limit-api-mutations-count-input"},"issue-limit-api-mutations-count")),(0,r.kt)("td",{parentName:"tr",align:null},"Limit the quantity of API mutations calls performed during the processing of issues (-1 for unlimited)."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"-1"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-only-any-project-cards-input"},"issue-only-any-project-cards")),(0,r.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains one of those project cards (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"issues/inputs/issue-only-any-milestones-input"},"issue-only-any-milestones")),(0,r.kt)("td",{parentName:"tr",align:null},"Only allow the processing of issues that contains one of those milestones (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-stale-label-input"},"pull-request-stale-label")),(0,r.kt)("td",{parentName:"tr",align:null},"The label that will be added to the pull request when it is stale."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"stale"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-ignore-all-labels-input"},"pull-request-ignore-all-labels")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains any labels."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-ignore-any-labels-input"},"pull-request-ignore-any-labels")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains one of those labels (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-ignore-all-assignees-input"},"pull-request-ignore-all-assignees")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains any assignees."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-ignore-any-assignees-input"},"pull-request-ignore-any-assignees")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains one of those assignees (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-ignore-all-project-cards-input"},"pull-request-ignore-all-project-cards")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains any project cards."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-ignore-any-project-cards-input"},"pull-request-ignore-any-project-cards")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that contains one of those project cards (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-ignore-before-creation-date-input"},"pull-request-ignore-before-creation-date")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that were created before this date (",(0,r.kt)("a",{parentName:"td",href:"https://moment.github.io/luxon/#/parsing?id=iso-8601"},"ISO 8601"),")."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-ignore-draft-input"},"pull-request-ignore-draft")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to ignore the processing of pull requests that are drafts."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-days-before-stale-input"},"pull-request-days-before-stale")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of days until the pull request is considered as stale."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"30"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-stale-comment-input"},"pull-request-stale-comment")),(0,r.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the pull request is stale (keep empty to not send a comment)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-days-before-close-input"},"pull-request-days-before-close")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of days until a stale pull request is considered as closed."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"10"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-close-comment-input"},"pull-request-close-comment")),(0,r.kt)("td",{parentName:"tr",align:null},"The comment that will be sent once the pull request is close (keep empty to not send a comment)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-delete-branch-after-close-input"},"pull-request-delete-branch-after-close")),(0,r.kt)("td",{parentName:"tr",align:null},"Delete the branch when the processing close the pull request."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-add-labels-after-stale-input"},"pull-request-add-labels-after-stale")),(0,r.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing stale the pull request (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-add-labels-after-close-input"},"pull-request-add-labels-after-close")),(0,r.kt)("td",{parentName:"tr",align:null},"A list of labels added when the processing close the pull request (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-processing-input"},"pull-request-processing")),(0,r.kt)("td",{parentName:"tr",align:null},"Allow to process the pull requests."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"true"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-to-draft-instead-of-stale-input"},"pull-request-to-draft-instead-of-stale")),(0,r.kt)("td",{parentName:"tr",align:null},"Convert the pull request to a draft pull request instead of handling it as a stale candidate."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-limit-api-queries-count-input"},"pull-request-limit-api-queries-count")),(0,r.kt)("td",{parentName:"tr",align:null},"Limit the quantity of API queries calls performed during the processing of pull requests (-1 for unlimited)."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"-1"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-limit-api-mutations-count-input"},"pull-request-limit-api-mutations-count")),(0,r.kt)("td",{parentName:"tr",align:null},"Limit the quantity of API mutations calls performed during the processing of pull requests (-1 for unlimited)."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"-1"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-only-any-project-cards-input"},"pull-request-only-any-project-cards")),(0,r.kt)("td",{parentName:"tr",align:null},"Only allow the processing of pull requests that contains one of those project cards (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"pull-requests/inputs/pull-request-only-any-milestones-input"},"pull-request-only-any-milestones")),(0,r.kt)("td",{parentName:"tr",align:null},"Only allow the processing of pull requests that contains one of those milestones (multiline)."),(0,r.kt)("td",{parentName:"tr",align:null})))))}k.isMDXComponent=!0}}]);