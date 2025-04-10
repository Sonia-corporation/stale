"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3686],{6421:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>i,contentTitle:()=>r,default:()=>d,frontMatter:()=>a,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"examples/multiple-cron-example","title":"Multiple cron jobs","description":"Example to process only the issues that belongs to specific projects.\\nThey will not be process at the same rate due to the different workflows.\\n","source":"@site/docs/09-examples/02-multiple-cron.mdx","sourceDirName":"09-examples","slug":"/examples/multiple-cron-example","permalink":"/stale/docs/examples/multiple-cron-example","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/09-examples/02-multiple-cron.mdx","tags":[{"inline":true,"label":"Issues","permalink":"/stale/docs/tags/issues"},{"inline":true,"label":"Projects","permalink":"/stale/docs/tags/projects"},{"inline":true,"label":"Examples","permalink":"/stale/docs/tags/examples"},{"inline":true,"label":"Cron","permalink":"/stale/docs/tags/cron"}],"version":"current","sidebarPosition":2,"frontMatter":{"id":"multiple-cron-example","title":"Multiple cron jobs","description":"Example to process only the issues that belongs to specific projects.\\nThey will not be process at the same rate due to the different workflows.\\n","tags":["Issues","Projects","Examples","Cron"]},"sidebar":"tutorialSidebar","previous":{"title":"Stale with comments except if assigned","permalink":"/stale/docs/examples/stale-with-comments-except-if-assigned-example"},"next":{"title":"Statistics","permalink":"/stale/docs/statistics"}}');var o=s(4848),l=s(8453);const a={id:"multiple-cron-example",title:"Multiple cron jobs",description:"Example to process only the issues that belongs to specific projects.\nThey will not be process at the same rate due to the different workflows.\n",tags:["Issues","Projects","Examples","Cron"]},r=void 0,i={},c=[{value:"Stale sooner based on the project",id:"stale-sooner-based-on-the-project",level:2},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}];function p(e){const t={br:"br",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{id:"stale-sooner-based-on-the-project",children:"Stale sooner based on the project"}),"\n",(0,o.jsx)(t.h3,{id:"description",children:"Description"}),"\n",(0,o.jsxs)(t.p,{children:["The issues belonging to the project X will be stale after only 20 days.",(0,o.jsx)(t.br,{}),"\n","The issues belonging to the project Y will be stale after 50 days.",(0,o.jsx)(t.br,{}),"\n","All the other issues will be ignored from the processing."]}),"\n",(0,o.jsx)(t.h3,{id:"example",children:"Example"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-yml",metastring:'title=".github/workflows/stale-project-x.yml"',children:"name: Stale project X\non:\n  schedule:\n    - cron: '0 12 * * *'\njobs:\n  name: Stale\n  id: stale\n  uses: sonia-corporation/stale@latest\n  with:\n    issue-only-any-projects: project-x\n    issue-days-before-stale: 20\n"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-yml",metastring:'title=".github/workflows/stale-project-y.yml"',children:"name: Stale project Y\non:\n  schedule:\n    - cron: '0 12 * * *'\njobs:\n  name: Stale\n  id: stale\n  uses: sonia-corporation/stale@latest\n  with:\n    issue-only-any-projects: project-y\n    issue-days-before-stale: 50\n"})})]})}function d(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>r});var n=s(6540);const o={},l=n.createContext(o);function a(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);