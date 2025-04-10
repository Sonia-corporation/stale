"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3303],{8092:(t,e,i)=>{i.r(e),i.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>u});const o=JSON.parse('{"id":"getting-started/workflow-testing","title":"Workflow testing","description":"Explanation to test a newly configured stale workflow so that it\'s safer for your project. \\nThe action can be risky if wrongly configured and may close all your issues for example.\\nThe dry-run option is strongly suggested, but also the limit of operations.\\n","source":"@site/docs/02-getting-started/02-workflow-testing.mdx","sourceDirName":"02-getting-started","slug":"/getting-started/workflow-testing","permalink":"/stale/docs/getting-started/workflow-testing","draft":false,"unlisted":false,"editUrl":"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/02-getting-started/02-workflow-testing.mdx","tags":[{"inline":true,"label":"Getting started","permalink":"/stale/docs/tags/getting-started"},{"inline":true,"label":"Workflow testing","permalink":"/stale/docs/tags/workflow-testing"}],"version":"current","sidebarPosition":2,"frontMatter":{"id":"workflow-testing","title":"Workflow testing","description":"Explanation to test a newly configured stale workflow so that it\'s safer for your project. \\nThe action can be risky if wrongly configured and may close all your issues for example.\\nThe dry-run option is strongly suggested, but also the limit of operations.\\n","tags":["Getting started","Workflow testing"]},"sidebar":"tutorialSidebar","previous":{"title":"Workflow creation","permalink":"/stale/docs/getting-started/workflow-creation"},"next":{"title":"All inputs","permalink":"/stale/docs/all-inputs"}}');var s=i(4848),n=i(8453);const r={id:"workflow-testing",title:"Workflow testing",description:"Explanation to test a newly configured stale workflow so that it's safer for your project. \nThe action can be risky if wrongly configured and may close all your issues for example.\nThe dry-run option is strongly suggested, but also the limit of operations.\n",tags:["Getting started","Workflow testing"]},a=void 0,l={},u=[{value:"Test the workflow",id:"test-the-workflow",level:2},{value:"Test it with the dry-run mode",id:"test-it-with-the-dry-run-mode",level:3},{value:"Test it with a limited amount of API calls",id:"test-it-with-a-limited-amount-of-api-calls",level:3},{value:"Debug the action",id:"debug-the-action",level:3},{value:"Customize the behaviour",id:"customize-the-behaviour",level:2}];function c(t){const e={a:"a",admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,n.R)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h2,{id:"test-the-workflow",children:"Test the workflow"}),"\n",(0,s.jsxs)(e.p,{children:["At this point, you shall have a working stale action.",(0,s.jsx)(e.br,{}),"\n","Before going further into the customization, you may want to try it first."]}),"\n",(0,s.jsx)(e.h3,{id:"test-it-with-the-dry-run-mode",children:"Test it with the dry-run mode"}),"\n",(0,s.jsxs)(e.p,{children:["Use the ",(0,s.jsx)(e.a,{href:"../dry-run-input",children:"dry-run"})," mode to avoid altering your repository yet."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yml",metastring:'{5-6} title=".github/workflows/stale.yml"',children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  dry-run: true\n"})}),"\n",(0,s.jsx)(e.admonition,{type:"tip",children:(0,s.jsxs)(e.p,{children:["You can now check the logs, and especially the ",(0,s.jsx)(e.a,{href:"../statistics",children:"statistics"})," at the end.",(0,s.jsx)(e.br,{}),"\n","You will have a better idea over what to expect when a real run without the ",(0,s.jsx)(e.a,{href:"../dry-run-input",children:"dry-run"})," mode occur."]})}),"\n",(0,s.jsx)(e.h3,{id:"test-it-with-a-limited-amount-of-api-calls",children:"Test it with a limited amount of API calls"}),"\n",(0,s.jsxs)(e.p,{children:["If you still wish to play it safe, you can configure a limit of API queries calls for your ",(0,s.jsx)(e.a,{href:"../issues/inputs/issue-limit-api-queries-count-input",children:"issues"})," and ",(0,s.jsx)(e.a,{href:"../pull-requests/inputs/pull-request-limit-api-queries-count-input",children:"pull requests"}),", and a limit of API mutations calls for your ",(0,s.jsx)(e.a,{href:"../issues/inputs/issue-limit-api-mutations-count-input",children:"issues"})," and ",(0,s.jsx)(e.a,{href:"../pull-requests/inputs/pull-request-limit-api-mutations-count-input",children:"pull requests"})," to alter your repository on a reduced scope."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yml",metastring:'{5-7} title=".github/workflows/stale.yml"',children:"# ...\nname: Stale\nid: stale\nuses: sonia-corporation/stale@latest\nwith:\n  issue-limit-api-queries-count: 30\n  pull-request-limit-api-queries-count: 30\n"})}),"\n",(0,s.jsx)(e.h3,{id:"debug-the-action",children:"Debug the action"}),"\n",(0,s.jsxs)(e.p,{children:["At this point, if you have an issue, you could help yourself to save some time by enabling the debug mode of the actions by adding the ",(0,s.jsx)(e.code,{children:"ACTIONS_STEP_DEBUG"})," GitHub secret to ",(0,s.jsx)(e.code,{children:"true"})," in your repository.",(0,s.jsx)(e.br,{}),"\n","Follow this ",(0,s.jsx)(e.a,{href:"https://github.com/actions/toolkit/blob/main/docs/action-debugging.md#how-to-access-step-debug-logs",children:"documentation"})," if you need more details."]}),"\n",(0,s.jsx)(e.p,{children:"You will be able to see more logs that may help you understand how the workflow is working, and also see the data fetched from your repository."}),"\n",(0,s.jsx)(e.h2,{id:"customize-the-behaviour",children:"Customize the behaviour"}),"\n",(0,s.jsxs)(e.p,{children:["If the action was successful, you may wish now to configure it at your convenience.",(0,s.jsx)(e.br,{}),"\n","Follow the ",(0,s.jsx)(e.a,{href:"../all-inputs",children:"next page"})," to have access to all the inputs."]}),"\n",(0,s.jsx)(e.admonition,{type:"info",children:(0,s.jsx)(e.p,{children:"The stale processing can be completely different between issues and pull requests."})})]})}function d(t={}){const{wrapper:e}={...(0,n.R)(),...t.components};return e?(0,s.jsx)(e,{...t,children:(0,s.jsx)(c,{...t})}):c(t)}},8453:(t,e,i)=>{i.d(e,{R:()=>r,x:()=>a});var o=i(6540);const s={},n=o.createContext(s);function r(t){const e=o.useContext(n);return o.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(s):t.components||s:r(t.components),o.createElement(n.Provider,{value:e},t.children)}}}]);