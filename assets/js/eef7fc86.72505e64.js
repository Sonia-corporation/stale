"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9179],{8453:(e,n,t)=>{t.d(n,{R:()=>u,x:()=>a});var l=t(6540);const s={},i=l.createContext(s);function u(e){const n=l.useContext(i);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:u(e.components),l.createElement(i.Provider,{value:n},e.children)}},9068:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>a,default:()=>d,frontMatter:()=>u,metadata:()=>l,toc:()=>o});const l=JSON.parse('{"id":"pull-requests/inputs/pull-request-ignore-any-labels-input","title":"Ignore any pull request labels input","description":"All the information you need to know about the ignore any pull request labels input.\\nIncluding a detailed description and an example.\\n","source":"@site/docs/08-pull-requests/01-inputs/04-ignore-any-labels-input.mdx","sourceDirName":"08-pull-requests/01-inputs","slug":"/pull-requests/inputs/pull-request-ignore-any-labels-input","permalink":"/stale/docs/pull-requests/inputs/pull-request-ignore-any-labels-input","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/04-ignore-any-labels-input.mdx","tags":[{"inline":true,"label":"Pull requests","permalink":"/stale/docs/tags/pull-requests"},{"inline":true,"label":"Inputs","permalink":"/stale/docs/tags/inputs"},{"inline":true,"label":"Labels","permalink":"/stale/docs/tags/labels"}],"version":"current","sidebarPosition":4,"frontMatter":{"id":"pull-request-ignore-any-labels-input","title":"Ignore any pull request labels input","description":"All the information you need to know about the ignore any pull request labels input.\\nIncluding a detailed description and an example.\\n","tags":["Pull requests","Inputs","Labels"]},"sidebar":"tutorialSidebar","previous":{"title":"Ignore all pull request labels input","permalink":"/stale/docs/pull-requests/inputs/pull-request-ignore-all-labels-input"},"next":{"title":"Ignore all pull request assignees input","permalink":"/stale/docs/pull-requests/inputs/pull-request-ignore-all-assignees-input"}}');var s=t(4848),i=t(8453);const u={id:"pull-request-ignore-any-labels-input",title:"Ignore any pull request labels input",description:"All the information you need to know about the ignore any pull request labels input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","Labels"]},a=void 0,r={},o=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}];function p(e){const n={br:"br",code:"code",h3:"h3",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h3,{id:"input",children:"Input"}),"\n",(0,s.jsxs)(n.p,{children:["Name: ",(0,s.jsx)(n.code,{children:"pull-request-ignore-any-labels"}),(0,s.jsx)(n.br,{}),"\n","Type: ",(0,s.jsx)(n.code,{children:"string[]"}),(0,s.jsx)(n.br,{}),"\n","Default value: ",(0,s.jsx)(n.code,{children:"[]"})]}),"\n",(0,s.jsx)(n.h3,{id:"description",children:"Description"}),"\n",(0,s.jsxs)(n.p,{children:["This input will let you ignore the processing of the pull requests which have at least one of the label from this list.",(0,s.jsx)(n.br,{}),"\n","This can be useful when you use labels for triage."]}),"\n",(0,s.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yml",metastring:"{6-8}",children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-ignore-any-labels: |\n    need help\n    bug\n"})})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}}}]);