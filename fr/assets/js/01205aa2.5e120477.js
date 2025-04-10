"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2323],{2619:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>r,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>i,toc:()=>u});const i=JSON.parse('{"id":"issues/inputs/issue-stale-label-input","title":"Stale issue label input","description":"All the information you need to know about the stale issue label input.\\nIncluding a detailed description and an example.\\n","source":"@site/docs/06-issues/01-inputs/02-stale-label-input.mdx","sourceDirName":"06-issues/01-inputs","slug":"/issues/inputs/issue-stale-label-input","permalink":"/stale/fr/docs/issues/inputs/issue-stale-label-input","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/02-stale-label-input.mdx","tags":[{"inline":true,"label":"Issues","permalink":"/stale/fr/docs/tags/issues"},{"inline":true,"label":"Inputs","permalink":"/stale/fr/docs/tags/inputs"},{"inline":true,"label":"Labels","permalink":"/stale/fr/docs/tags/labels"},{"inline":true,"label":"Cache","permalink":"/stale/fr/docs/tags/cache"}],"version":"current","sidebarPosition":2,"frontMatter":{"id":"issue-stale-label-input","title":"Stale issue label input","description":"All the information you need to know about the stale issue label input.\\nIncluding a detailed description and an example.\\n","tags":["Issues","Inputs","Labels","Cache"]},"sidebar":"tutorialSidebar","previous":{"title":"All issues inputs","permalink":"/stale/fr/docs/issues/inputs/all-issues-inputs"},"next":{"title":"Ignore all issue labels input","permalink":"/stale/fr/docs/issues/inputs/issue-ignore-all-labels-input"}}');var n=t(4848),l=t(8453);const a={id:"issue-stale-label-input",title:"Stale issue label input",description:"All the information you need to know about the stale issue label input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels","Cache"]},o=void 0,r={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Cache",id:"cache",level:3},{value:"Example",id:"example",level:3}];function d(e){const s={a:"a",admonition:"admonition",br:"br",code:"code",em:"em",h3:"h3",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h3,{id:"input",children:"Input"}),"\n",(0,n.jsxs)(s.p,{children:["Name: ",(0,n.jsx)(s.code,{children:"issue-stale-label"}),(0,n.jsx)(s.br,{}),"\n","Type: ",(0,n.jsx)(s.code,{children:"string"}),(0,n.jsx)(s.br,{}),"\n","Default value: ",(0,n.jsx)(s.code,{children:"stale"})]}),"\n",(0,n.jsx)(s.h3,{id:"description",children:"Description"}),"\n",(0,n.jsx)(s.p,{children:"This input will let you define the label (by name) that will be added to your issues when they are considered as stale."}),"\n",(0,n.jsxs)(s.p,{children:["If the label is added to an issue (based on the ",(0,n.jsx)(s.a,{href:"issue-days-before-stale-input",children:"days before stale input"}),"), the next time the issue is processed, the workflow will process it as a candidate for un-stale.",(0,n.jsx)(s.br,{}),"\n","If the issue was updated after the addition of the label, the issue will be un-stale, and the label will be removed."]}),"\n",(0,n.jsxs)(s.p,{children:["Once the un-stale processing is done, if the issue is still stale, the workflow will then process it as a candidate for closing.",(0,n.jsx)(s.br,{}),"\n","If the issue is stale for too long (based on the ",(0,n.jsx)(s.a,{href:"issue-days-before-close-input",children:"days before close input"}),"), the issue will be closed."]}),"\n",(0,n.jsx)(s.admonition,{type:"caution",children:(0,n.jsxs)(s.p,{children:["The label must be a real label, existing inside your repository list of labels (",(0,n.jsx)(s.em,{children:"github.com/your-organization/your-repository/labels"}),").",(0,n.jsx)(s.br,{}),"\n","If not, the GitHub API will throw an error."]})}),"\n",(0,n.jsx)(s.h3,{id:"cache",children:"Cache"}),"\n",(0,n.jsxs)(s.p,{children:["The label will be cached during the workflow.",(0,n.jsx)(s.br,{}),"\n","This will reduce the number of calls made to the GitHub API, which will also reduce the quotas consumed for your GitHub token, avoiding reaching rate limits."]}),"\n",(0,n.jsx)(s.h3,{id:"example",children:"Example"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yml",metastring:"{6}",children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-stale-label: stale-label\n"})})]})}function c(e={}){const{wrapper:s}={...(0,l.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},8453:(e,s,t)=>{t.d(s,{R:()=>a,x:()=>o});var i=t(6540);const n={},l=i.createContext(n);function a(e){const s=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),i.createElement(l.Provider,{value:s},e.children)}}}]);