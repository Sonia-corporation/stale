"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3906],{6833:(e,t,u)=>{u.r(t),u.d(t,{assets:()=>p,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>n,toc:()=>a});const n=JSON.parse('{"id":"pull-requests/outputs/unaltered-pull-requests-count-output","title":"Unaltered pull requests count output","description":"All the information you need to know about the unaltered pull requests count output.\\nIncluding a detailed description and an example.\\n","source":"@site/docs/08-pull-requests/02-outputs/04-unaltered-pull-requests-count-output.mdx","sourceDirName":"08-pull-requests/02-outputs","slug":"/pull-requests/outputs/unaltered-pull-requests-count-output","permalink":"/stale/fr/docs/pull-requests/outputs/unaltered-pull-requests-count-output","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/04-unaltered-pull-requests-count-output.mdx","tags":[{"inline":true,"label":"Pull requests","permalink":"/stale/fr/docs/tags/pull-requests"},{"inline":true,"label":"Outputs","permalink":"/stale/fr/docs/tags/outputs"}],"version":"current","sidebarPosition":4,"frontMatter":{"id":"unaltered-pull-requests-count-output","title":"Unaltered pull requests count output","description":"All the information you need to know about the unaltered pull requests count output.\\nIncluding a detailed description and an example.\\n","tags":["Pull requests","Outputs"]},"sidebar":"tutorialSidebar","previous":{"title":"Ignored pull requests count output","permalink":"/stale/fr/docs/pull-requests/outputs/ignored-pull-requests-count-output"},"next":{"title":"Stale pull requests count output","permalink":"/stale/fr/docs/pull-requests/outputs/stale-pull-requests-count-output"}}');var s=u(4848),l=u(8453);const o={id:"unaltered-pull-requests-count-output",title:"Unaltered pull requests count output",description:"All the information you need to know about the unaltered pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},r=void 0,p={},a=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}];function i(e){const t={br:"br",code:"code",h3:"h3",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h3,{id:"output",children:"Output"}),"\n",(0,s.jsxs)(t.p,{children:["Name: ",(0,s.jsx)(t.code,{children:"unaltered-pull-requests-count"}),(0,s.jsx)(t.br,{}),"\n","Type: ",(0,s.jsx)(t.code,{children:"number"})]}),"\n",(0,s.jsx)(t.h3,{id:"description",children:"Description"}),"\n",(0,s.jsx)(t.p,{children:"This output will expose the number of pull requests unaltered (either not good to stale or already stale)."}),"\n",(0,s.jsx)(t.h3,{id:"example",children:"Example"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-yml",metastring:"{6-7}",children:'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.unaltered-pull-requests-count }}"\n'})})]})}function d(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(i,{...e})}):i(e)}},8453:(e,t,u)=>{u.d(t,{R:()=>o,x:()=>r});var n=u(6540);const s={},l=n.createContext(s);function o(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);