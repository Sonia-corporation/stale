"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[4664],{715:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>r,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>t,toc:()=>u});const t=JSON.parse('{"id":"issues/inputs/issue-add-labels-after-close-input","title":"Add issue labels after close input","description":"All the information you need to know about the add issue labels after close input.\\nIncluding a detailed description and an example.\\n","source":"@site/docs/06-issues/01-inputs/74-add-labels-after-close-input.mdx","sourceDirName":"06-issues/01-inputs","slug":"/issues/inputs/issue-add-labels-after-close-input","permalink":"/stale/fr/docs/issues/inputs/issue-add-labels-after-close-input","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/01-inputs/74-add-labels-after-close-input.mdx","tags":[{"inline":true,"label":"Issues","permalink":"/stale/fr/docs/tags/issues"},{"inline":true,"label":"Inputs","permalink":"/stale/fr/docs/tags/inputs"},{"inline":true,"label":"Labels","permalink":"/stale/fr/docs/tags/labels"},{"inline":true,"label":"Closing","permalink":"/stale/fr/docs/tags/closing"}],"version":"current","sidebarPosition":74,"frontMatter":{"id":"issue-add-labels-after-close-input","title":"Add issue labels after close input","description":"All the information you need to know about the add issue labels after close input.\\nIncluding a detailed description and an example.\\n","tags":["Issues","Inputs","Labels","Closing"]},"sidebar":"tutorialSidebar","previous":{"title":"Remove issue labels after stale input","permalink":"/stale/fr/docs/issues/inputs/issue-remove-labels-after-stale-input"},"next":{"title":"Remove issue labels after close input","permalink":"/stale/fr/docs/issues/inputs/issue-remove-labels-after-close-input"}}');var i=n(4848),l=n(8453);const a={id:"issue-add-labels-after-close-input",title:"Add issue labels after close input",description:"All the information you need to know about the add issue labels after close input.\nIncluding a detailed description and an example.\n",tags:["Issues","Inputs","Labels","Closing"]},o=void 0,r={},u=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}];function d(e){const s={a:"a",admonition:"admonition",br:"br",code:"code",em:"em",h3:"h3",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h3,{id:"input",children:"Input"}),"\n",(0,i.jsxs)(s.p,{children:["Name: ",(0,i.jsx)(s.code,{children:"issue-add-labels-after-close"}),(0,i.jsx)(s.br,{}),"\n","Type: ",(0,i.jsx)(s.code,{children:"string[]"}),(0,i.jsx)(s.br,{}),"\n","Default value: ",(0,i.jsx)(s.code,{children:"[]"})]}),"\n",(0,i.jsx)(s.h3,{id:"description",children:"Description"}),"\n",(0,i.jsxs)(s.p,{children:["This input will let you add extra labels when the processing close the issues.",(0,i.jsx)(s.br,{}),"\n","This can be useful if you wish to easily add extra labels to improve your triage post-closing."]}),"\n",(0,i.jsx)(s.admonition,{type:"caution",children:(0,i.jsxs)(s.p,{children:["The labels must be real labels, existing inside your repository list of labels (",(0,i.jsx)(s.em,{children:"github.com/your-organization/your-repository/labels"}),").",(0,i.jsx)(s.br,{}),"\n","If not, the GitHub API will throw an error."]})}),"\n",(0,i.jsx)(s.admonition,{type:"info",children:(0,i.jsxs)(s.p,{children:["You can also specify the reason for closing this issue by using the ",(0,i.jsx)(s.a,{href:"issue-close-reason-input",children:"close reason input"}),",\nadd a comment to explain why it was closed by using the ",(0,i.jsx)(s.a,{href:"issue-close-comment-input",children:"close comment input"}),",\nremove labels onto it by using the ",(0,i.jsx)(s.a,{href:"issue-remove-labels-after-close-input",children:"remove labels after close input"}),"\nand define the number of days before closing it by using the ",(0,i.jsx)(s.a,{href:"issue-days-before-close-input",children:"days before close input"}),"."]})}),"\n",(0,i.jsx)(s.h3,{id:"example",children:"Example"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yml",metastring:"{6-8}",children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-add-labels-after-close: |\n    do not reopen\n    please-create if needed\n"})})]})}function c(e={}){const{wrapper:s}={...(0,l.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>o});var t=n(6540);const i={},l=t.createContext(i);function a(e){const s=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(l.Provider,{value:s},e.children)}}}]);