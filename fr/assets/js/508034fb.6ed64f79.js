"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6593],{8453:(e,t,i)=>{i.d(t,{R:()=>u,x:()=>r});var n=i(6540);const l={},s=n.createContext(l);function u(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:u(e.components),n.createElement(s.Provider,{value:t},e.children)}},9081:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>c,frontMatter:()=>u,metadata:()=>n,toc:()=>a});const n=JSON.parse('{"id":"pull-requests/inputs/pull-request-limit-api-queries-count-input","title":"Pull request limit api queries count input","description":"All the information you need to know about the pull request limit api queries count input.\\nIncluding a detailed description and an example.\\n","source":"@site/docs/08-pull-requests/01-inputs/60-limit-api-queries-count-input.mdx","sourceDirName":"08-pull-requests/01-inputs","slug":"/pull-requests/inputs/pull-request-limit-api-queries-count-input","permalink":"/stale/fr/docs/pull-requests/inputs/pull-request-limit-api-queries-count-input","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/01-inputs/60-limit-api-queries-count-input.mdx","tags":[{"inline":true,"label":"Pull requests","permalink":"/stale/fr/docs/tags/pull-requests"},{"inline":true,"label":"Inputs","permalink":"/stale/fr/docs/tags/inputs"},{"inline":true,"label":"API","permalink":"/stale/fr/docs/tags/api"},{"inline":true,"label":"Cache","permalink":"/stale/fr/docs/tags/cache"}],"version":"current","sidebarPosition":60,"frontMatter":{"id":"pull-request-limit-api-queries-count-input","title":"Pull request limit api queries count input","description":"All the information you need to know about the pull request limit api queries count input.\\nIncluding a detailed description and an example.\\n","tags":["Pull requests","Inputs","API","Cache"]},"sidebar":"tutorialSidebar","previous":{"title":"Days before pull request close input","permalink":"/stale/fr/docs/pull-requests/inputs/pull-request-days-before-close-input"},"next":{"title":"Pull request limit api mutations count input","permalink":"/stale/fr/docs/pull-requests/inputs/pull-request-limit-api-mutations-count-input"}}');var l=i(4848),s=i(8453);const u={id:"pull-request-limit-api-queries-count-input",title:"Pull request limit api queries count input",description:"All the information you need to know about the pull request limit api queries count input.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Inputs","API","Cache"]},r=void 0,o={},a=[{value:"Input",id:"input",level:3},{value:"Description",id:"description",level:3},{value:"Cache",id:"cache",level:3},{value:"Example",id:"example",level:3}];function p(e){const t={a:"a",admonition:"admonition",br:"br",code:"code",h3:"h3",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h3,{id:"input",children:"Input"}),"\n",(0,l.jsxs)(t.p,{children:["Name: ",(0,l.jsx)(t.code,{children:"pull-request-limit-api-queries-count"}),(0,l.jsx)(t.br,{}),"\n","Type: ",(0,l.jsx)(t.code,{children:"number"}),(0,l.jsx)(t.br,{}),"\n","Default value: ",(0,l.jsx)(t.code,{children:"-1"})," (unlimited)"]}),"\n",(0,l.jsx)(t.h3,{id:"description",children:"Description"}),"\n",(0,l.jsxs)(t.p,{children:["This input will let you define a limit count of pull requests API queries (read) calls performed during the processing.",(0,l.jsx)(t.br,{}),"\n","If the limit is reached, the ongoing processed pull request will finish it's processing then all other pull requests will be ignored.",(0,l.jsx)(t.br,{}),"\n","This can be useful when you want to play it safe with this action.",(0,l.jsx)(t.br,{}),"\n","This can be also very useful if you have a lot of pull requests to process, and you want to limit the quotas of your associated ",(0,l.jsx)(t.a,{href:"../../github-token-input",children:"GitHub token"}),"."]}),"\n",(0,l.jsx)(t.admonition,{type:"info",children:(0,l.jsxs)(t.p,{children:["When the value is below ",(0,l.jsx)(t.code,{children:"0"}),", the input will have no effect."]})}),"\n",(0,l.jsx)(t.h3,{id:"cache",children:"Cache"}),"\n",(0,l.jsxs)(t.p,{children:["Some queries are cached during the workflow when loading static resources like the labels.",(0,l.jsx)(t.br,{}),"\n","This will reduce the number of calls made to the GitHub API, which will also reduce the quotas consumed for your GitHub token, avoiding reaching rate limits."]}),"\n",(0,l.jsx)(t.h3,{id:"example",children:"Example"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-yml",metastring:"{6}",children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  pull-request-limit-api-queries-count: 100\n"})})]})}function c(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}}}]);