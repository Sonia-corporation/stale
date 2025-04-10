"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[275],{8453:(e,s,t)=>{t.d(s,{R:()=>o,x:()=>u});var n=t(6540);const i={},a=n.createContext(i);function o(e){const s=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function u(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(a.Provider,{value:s},e.children)}},8721:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>u,default:()=>c,frontMatter:()=>o,metadata:()=>n,toc:()=>r});const n=JSON.parse('{"id":"issues/inputs/issue-days-before-stale-input","title":"Days before issue stale input","description":"All the information you need to know about the days before issue stale input.\\nIncluding a detailed description and an example.\\n","source":"@site/docs/06-issues/01-inputs/50-days-before-stale-input.mdx","sourceDirName":"06-issues/01-inputs","slug":"/issues/inputs/issue-days-before-stale-input","permalink":"/stale/docs/issues/inputs/issue-days-before-stale-input","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/50-days-before-stale-input.mdx","tags":[{"inline":true,"label":"Issues","permalink":"/stale/docs/tags/issues"},{"inline":true,"label":"Inputs","permalink":"/stale/docs/tags/inputs"}],"version":"current","sidebarPosition":50,"frontMatter":{"id":"issue-days-before-stale-input","title":"Days before issue stale input","description":"All the information you need to know about the days before issue stale input.\\nIncluding a detailed description and an example.\\n","tags":["Issues","Inputs"]},"sidebar":"tutorialSidebar","previous":{"title":"Close issue comment input","permalink":"/stale/docs/issues/inputs/issue-close-comment-input"},"next":{"title":"Days before issue close input","permalink":"/stale/docs/issues/inputs/issue-days-before-close-input"}}');var i=t(4848),a=t(8453);const o={id:"issue-days-before-stale-input",title:"Days before issue stale input",description:"All the information you need to know about the days before issue stale input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs"]},u=void 0,l={},r=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}];function d(e){const s={br:"br",code:"code",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h3,{id:"input",children:"Input"}),"\n",(0,i.jsxs)(s.p,{children:["Name: ",(0,i.jsx)(s.code,{children:"issue-days-before-stale"}),(0,i.jsx)(s.br,{}),"\n","Type: ",(0,i.jsx)(s.code,{children:"number"}),(0,i.jsx)(s.br,{}),"\n","Default value: ",(0,i.jsx)(s.code,{children:"30"})]}),"\n",(0,i.jsx)(s.h3,{id:"description",children:"Description"}),"\n",(0,i.jsx)(s.p,{children:"This input will let you define the number of days before processing the issues as stale."}),"\n",(0,i.jsx)(s.p,{children:"The number of days is calculated based on the last update that occurred on the issues."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"For example:"})}),"\n",(0,i.jsxs)(s.p,{children:["Assuming that an issue is inactive since 10 days and this input is configured to stale after two weeks.",(0,i.jsx)(s.br,{}),"\n","Someone adds a comment on this issue.",(0,i.jsx)(s.br,{}),"\n","The issue cannot be stale until at least 2 weeks once again."]}),"\n",(0,i.jsx)(s.h3,{id:"example",children:"Example"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yml",metastring:"{6}",children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-days-before-stale: 14\n"})})]})}function c(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);