"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5437],{3905:function(e,t,u){u.d(t,{Zo:function(){return p},kt:function(){return f}});var n=u(7294);function r(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}function s(e,t){var u=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.push.apply(u,n)}return u}function o(e){for(var t=1;t<arguments.length;t++){var u=null!=arguments[t]?arguments[t]:{};t%2?s(Object(u),!0).forEach((function(t){r(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):s(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}function i(e,t){if(null==e)return{};var u,n,r=function(e,t){if(null==e)return{};var u,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)u=s[n],t.indexOf(u)>=0||(r[u]=e[u]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)u=s[n],t.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(e,u)&&(r[u]=e[u])}return r}var a=n.createContext({}),l=function(e){var t=n.useContext(a),u=t;return e&&(u="function"==typeof e?e(t):o(o({},t),e)),u},p=function(e){var t=l(e.components);return n.createElement(a.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var u=e.components,r=e.mdxType,s=e.originalType,a=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=l(u),f=r,m=d["".concat(a,".").concat(f)]||d[f]||c[f]||s;return u?n.createElement(m,o(o({ref:t},p),{},{components:u})):n.createElement(m,o({ref:t},p))}));function f(e,t){var u=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=u.length,o=new Array(s);o[0]=d;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var l=2;l<s;l++)o[l]=u[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,u)}d.displayName="MDXCreateElement"},8789:function(e,t,u){u.r(t),u.d(t,{frontMatter:function(){return i},contentTitle:function(){return a},metadata:function(){return l},toc:function(){return p},default:function(){return d}});var n=u(7462),r=u(3366),s=(u(7294),u(3905)),o=["components"],i={id:"called-api-issues-queries-count-output",title:"Called api issues queries count output",tags:["Issues","Outputs"]},a=void 0,l={unversionedId:"issues/outputs/called-api-issues-queries-count-output",id:"issues/outputs/called-api-issues-queries-count-output",title:"Called api issues queries count output",description:"Output",source:"@site/docs/06-issues/02-outputs/12-called-api-issues-queries-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/called-api-issues-queries-count-output",permalink:"/stale/fr/docs/issues/outputs/called-api-issues-queries-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/12-called-api-issues-queries-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:12,frontMatter:{id:"called-api-issues-queries-count-output",title:"Called api issues queries count output",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Called api issues count output",permalink:"/stale/fr/docs/issues/outputs/called-api-issues-count-output"},next:{title:"Called api issues mutations count output",permalink:"/stale/fr/docs/issues/outputs/called-api-issues-mutations-count-output"}},p=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:p};function d(e){var t=e.components,u=(0,r.Z)(e,o);return(0,s.kt)("wrapper",(0,n.Z)({},c,u,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"output"},"Output"),(0,s.kt)("p",null,"Name: ",(0,s.kt)("inlineCode",{parentName:"p"},"called-api-issues-queries-count"),(0,s.kt)("br",{parentName:"p"}),"\n","Type: ",(0,s.kt)("inlineCode",{parentName:"p"},"number")),(0,s.kt)("h3",{id:"description"},"Description"),(0,s.kt)("p",null,"This output will expose the number of GitHub API queries calls performed for the issues."),(0,s.kt)("h3",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.called-api-issues-queries-count }}"\n')))}d.isMDXComponent=!0}}]);