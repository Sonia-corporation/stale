"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7974],{3441:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"migrations/migration-to-projects-v2","title":"Project cards to projects v2","description":"All the things you need to know to migrate from using project cards to projects v2.\\n","source":"@site/docs/16-migrations/03-migration-to-projects-v2.md","sourceDirName":"16-migrations","slug":"/migrations/migration-to-projects-v2","permalink":"/stale/docs/migrations/migration-to-projects-v2","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/16-migrations/03-migration-to-projects-v2.md","tags":[{"inline":true,"label":"Migrations","permalink":"/stale/docs/tags/migrations"},{"inline":true,"label":"Project cards","permalink":"/stale/docs/tags/project-cards"},{"inline":true,"label":"Projects v2","permalink":"/stale/docs/tags/projects-v-2"}],"version":"current","sidebarPosition":3,"frontMatter":{"id":"migration-to-projects-v2","title":"Project cards to projects v2","description":"All the things you need to know to migrate from using project cards to projects v2.\\n","tags":["Migrations","Project cards","Projects v2"]},"sidebar":"tutorialSidebar","previous":{"title":"v1 to v2","permalink":"/stale/docs/migrations/migration-v1-to-v2"}}');var n=r(4848),s=r(8453);const i={id:"migration-to-projects-v2",title:"Project cards to projects v2",description:"All the things you need to know to migrate from using project cards to projects v2.\n",tags:["Migrations","Project cards","Projects v2"]},a="Migration from project cards to projects v2",c={},l=[{value:"Migration",id:"migration",level:2},{value:"Breaking change reason \ud83c\udf6c",id:"breaking-change-reason",level:3}];function d(t){const e={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.header,{children:(0,n.jsx)(e.h1,{id:"migration-from-project-cards-to-projects-v2",children:"Migration from project cards to projects v2"})}),"\n",(0,n.jsx)(e.h2,{id:"migration",children:"Migration"}),"\n",(0,n.jsxs)(e.p,{children:["From ",(0,n.jsx)(e.a,{href:"https://github.com/Sonia-corporation/stale/releases/tag/2.5.0",children:"project cards"})," to ",(0,n.jsx)(e.a,{href:"https://github.com/Sonia-corporation/stale/releases/tag/3.0.0",children:"projects v2"}),"."]}),"\n",(0,n.jsx)(e.h3,{id:"breaking-change-reason",children:"Breaking change reason \ud83c\udf6c"}),"\n",(0,n.jsxs)(e.p,{children:["GitHub roll-out the ",(0,n.jsx)(e.a,{href:"https://github.blog/changelog/2024-05-23-sunset-notice-projects-classic/",children:"new project"})," in July 2022.",(0,n.jsx)(e.br,{}),"\n","The 1st April 2025, the legacy project was sunset, no choice but to migrate.",(0,n.jsx)(e.br,{}),"\n","The way to fetch the projects with GraphQL has to change from this point forward."]}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:"Before:"})}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-yml",metastring:"{6}",children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-ignore-all-project-cards: true\n"})}),"\n",(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:"After:"})}),"\n",(0,n.jsx)(e.p,{children:'All inputs including the word "-card(s)" were renamed without it as follows:'}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-yml",metastring:"{6}",children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-ignore-all-projects: true\n"})})]})}function p(t={}){const{wrapper:e}={...(0,s.R)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(d,{...t})}):d(t)}},8453:(t,e,r)=>{r.d(e,{R:()=>i,x:()=>a});var o=r(6540);const n={},s=o.createContext(n);function i(t){const e=o.useContext(s);return o.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(n):t.components||n:i(t.components),o.createElement(s.Provider,{value:e},t.children)}}}]);