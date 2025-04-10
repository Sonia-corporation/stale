"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5129],{4686:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>r});const s=JSON.parse('{"id":"issues/inputs/issue-limit-api-queries-count-input","title":"Issue limit api queries count input","description":"All the information you need to know about the issue limit api queries count input.\\nIncluding a detailed description and an example.\\n","source":"@site/docs/06-issues/01-inputs/60-limit-api-queries-count-input.mdx","sourceDirName":"06-issues/01-inputs","slug":"/issues/inputs/issue-limit-api-queries-count-input","permalink":"/stale/docs/issues/inputs/issue-limit-api-queries-count-input","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/60-limit-api-queries-count-input.mdx","tags":[{"inline":true,"label":"Issues","permalink":"/stale/docs/tags/issues"},{"inline":true,"label":"Inputs","permalink":"/stale/docs/tags/inputs"},{"inline":true,"label":"API","permalink":"/stale/docs/tags/api"},{"inline":true,"label":"Cache","permalink":"/stale/docs/tags/cache"}],"version":"current","sidebarPosition":60,"frontMatter":{"id":"issue-limit-api-queries-count-input","title":"Issue limit api queries count input","description":"All the information you need to know about the issue limit api queries count input.\\nIncluding a detailed description and an example.\\n","tags":["Issues","Inputs","API","Cache"]},"sidebar":"tutorialSidebar","previous":{"title":"Days before issue close input","permalink":"/stale/docs/issues/inputs/issue-days-before-close-input"},"next":{"title":"Issue limit api mutations count input","permalink":"/stale/docs/issues/inputs/issue-limit-api-mutations-count-input"}}');var n=t(4848),u=t(8453);const o={id:"issue-limit-api-queries-count-input",title:"Issue limit api queries count input",description:"All the information you need to know about the issue limit api queries count input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","API","Cache"]},a=void 0,l={},r=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Cache",id:"cache",level:3},{value:"Example",id:"example",level:3}];function c(e){const i={a:"a",admonition:"admonition",br:"br",code:"code",h3:"h3",p:"p",pre:"pre",...(0,u.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h3,{id:"input",children:"Input"}),"\n",(0,n.jsxs)(i.p,{children:["Name: ",(0,n.jsx)(i.code,{children:"issue-limit-api-queries-count"}),(0,n.jsx)(i.br,{}),"\n","Type: ",(0,n.jsx)(i.code,{children:"number"}),(0,n.jsx)(i.br,{}),"\n","Default value: ",(0,n.jsx)(i.code,{children:"-1"})," (unlimited)"]}),"\n",(0,n.jsx)(i.h3,{id:"description",children:"Description"}),"\n",(0,n.jsxs)(i.p,{children:["This input will let you define a limit count of issues API queries (read) calls performed during the processing.",(0,n.jsx)(i.br,{}),"\n","If the limit is reached, the ongoing processed issue will finish it's processing then all other issues will be ignored.",(0,n.jsx)(i.br,{}),"\n","This can be useful when you want to play it safe with this action.",(0,n.jsx)(i.br,{}),"\n","This can be also very useful if you have a lot of issues to process, and you want to limit the quotas of your associated ",(0,n.jsx)(i.a,{href:"../../github-token-input",children:"GitHub token"}),"."]}),"\n",(0,n.jsx)(i.admonition,{type:"info",children:(0,n.jsxs)(i.p,{children:["When the value is below ",(0,n.jsx)(i.code,{children:"0"}),", the input will have no effect."]})}),"\n",(0,n.jsx)(i.h3,{id:"cache",children:"Cache"}),"\n",(0,n.jsxs)(i.p,{children:["Some queries are cached during the workflow when loading static resources like the labels.",(0,n.jsx)(i.br,{}),"\n","This will reduce the number of calls made to the GitHub API, which will also reduce the quotas consumed for your GitHub token, avoiding reaching rate limits."]}),"\n",(0,n.jsx)(i.h3,{id:"example",children:"Example"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-yml",metastring:"{6}",children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-limit-api-queries-count: 100\n"})})]})}function p(e={}){const{wrapper:i}={...(0,u.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},8453:(e,i,t)=>{t.d(i,{R:()=>o,x:()=>a});var s=t(6540);const n={},u=s.createContext(n);function o(e){const i=s.useContext(u);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),s.createElement(u.Provider,{value:i},e.children)}}}]);