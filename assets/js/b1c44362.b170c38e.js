"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5670],{8453:(e,t,u)=>{u.d(t,{R:()=>n,x:()=>r});var s=u(6540);const l={},o=s.createContext(l);function n(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:n(e.components),s.createElement(o.Provider,{value:t},e.children)}},9688:(e,t,u)=>{u.r(t),u.d(t,{assets:()=>p,contentTitle:()=>r,default:()=>a,frontMatter:()=>n,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"pull-requests/outputs/close-pull-requests-count-output","title":"Close pull requests count output","description":"All the information you need to know about the close pull requests count output.\\nIncluding a detailed description and an example.\\n","source":"@site/docs/08-pull-requests/02-outputs/08-close-pull-requests-count-output.mdx","sourceDirName":"08-pull-requests/02-outputs","slug":"/pull-requests/outputs/close-pull-requests-count-output","permalink":"/stale/docs/pull-requests/outputs/close-pull-requests-count-output","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/08-close-pull-requests-count-output.mdx","tags":[{"inline":true,"label":"Pull requests","permalink":"/stale/docs/tags/pull-requests"},{"inline":true,"label":"Outputs","permalink":"/stale/docs/tags/outputs"},{"inline":true,"label":"Closing","permalink":"/stale/docs/tags/closing"}],"version":"current","sidebarPosition":8,"frontMatter":{"id":"close-pull-requests-count-output","title":"Close pull requests count output","description":"All the information you need to know about the close pull requests count output.\\nIncluding a detailed description and an example.\\n","tags":["Pull requests","Outputs","Closing"]},"sidebar":"tutorialSidebar","previous":{"title":"Remove stale pull requests count output","permalink":"/stale/docs/pull-requests/outputs/remove-stale-pull-requests-count-output"},"next":{"title":"Deleted pull requests branches count output","permalink":"/stale/docs/pull-requests/outputs/deleted-pull-requests-branches-count-output"}}');var l=u(4848),o=u(8453);const n={id:"close-pull-requests-count-output",title:"Close pull requests count output",description:"All the information you need to know about the close pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs","Closing"]},r=void 0,p={},c=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}];function i(e){const t={br:"br",code:"code",h3:"h3",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h3,{id:"output",children:"Output"}),"\n",(0,l.jsxs)(t.p,{children:["Name: ",(0,l.jsx)(t.code,{children:"close-pull-requests-count"}),(0,l.jsx)(t.br,{}),"\n","Type: ",(0,l.jsx)(t.code,{children:"number"})]}),"\n",(0,l.jsx)(t.h3,{id:"description",children:"Description"}),"\n",(0,l.jsx)(t.p,{children:"This output will expose the number of pull requests closed."}),"\n",(0,l.jsx)(t.h3,{id:"example",children:"Example"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-yml",metastring:"{6-7}",children:'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.close-pull-requests-count }}"\n'})})]})}function a(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(i,{...e})}):i(e)}}}]);