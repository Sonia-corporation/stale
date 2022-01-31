"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8634],{3905:function(t,e,u){u.d(e,{Zo:function(){return i},kt:function(){return m}});var r=u(7294);function n(t,e,u){return e in t?Object.defineProperty(t,e,{value:u,enumerable:!0,configurable:!0,writable:!0}):t[e]=u,t}function l(t,e){var u=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),u.push.apply(u,r)}return u}function o(t){for(var e=1;e<arguments.length;e++){var u=null!=arguments[e]?arguments[e]:{};e%2?l(Object(u),!0).forEach((function(e){n(t,e,u[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(u)):l(Object(u)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(u,e))}))}return t}function s(t,e){if(null==t)return{};var u,r,n=function(t,e){if(null==t)return{};var u,r,n={},l=Object.keys(t);for(r=0;r<l.length;r++)u=l[r],e.indexOf(u)>=0||(n[u]=t[u]);return n}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)u=l[r],e.indexOf(u)>=0||Object.prototype.propertyIsEnumerable.call(t,u)&&(n[u]=t[u])}return n}var p=r.createContext({}),a=function(t){var e=r.useContext(p),u=e;return t&&(u="function"==typeof t?t(e):o(o({},e),t)),u},i=function(t){var e=a(t.components);return r.createElement(p.Provider,{value:e},t.children)},c={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var u=t.components,n=t.mdxType,l=t.originalType,p=t.parentName,i=s(t,["components","mdxType","originalType","parentName"]),d=a(u),m=n,f=d["".concat(p,".").concat(m)]||d[m]||c[m]||l;return u?r.createElement(f,o(o({ref:e},i),{},{components:u})):r.createElement(f,o({ref:e},i))}));function m(t,e){var u=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var l=u.length,o=new Array(l);o[0]=d;var s={};for(var p in e)hasOwnProperty.call(e,p)&&(s[p]=e[p]);s.originalType=t,s.mdxType="string"==typeof t?t:n,o[1]=s;for(var a=2;a<l;a++)o[a]=u[a];return r.createElement.apply(null,o)}return r.createElement.apply(null,u)}d.displayName="MDXCreateElement"},275:function(t,e,u){u.r(e),u.d(e,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return a},toc:function(){return i},default:function(){return d}});var r=u(7462),n=u(3366),l=(u(7294),u(3905)),o=["components"],s={id:"stale-pull-requests-count-output",title:"Stale pull requests count output",tags:["Pull requests","Outputs"]},p=void 0,a={unversionedId:"pull-requests/outputs/stale-pull-requests-count-output",id:"pull-requests/outputs/stale-pull-requests-count-output",title:"Stale pull requests count output",description:"Output",source:"@site/docs/08-pull-requests/02-outputs/05-stale-pull-requests-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/stale-pull-requests-count-output",permalink:"/stale/docs/pull-requests/outputs/stale-pull-requests-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/05-stale-pull-requests-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/docs/tags/outputs"}],version:"current",sidebarPosition:5,frontMatter:{id:"stale-pull-requests-count-output",title:"Stale pull requests count output",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Unaltered pull requests count output",permalink:"/stale/docs/pull-requests/outputs/unaltered-pull-requests-count-output"},next:{title:"Already stale pull requests count output",permalink:"/stale/docs/pull-requests/outputs/already-stale-pull-requests-count-output"}},i=[{value:"Output",id:"output",children:[],level:3},{value:"Description",id:"description",children:[],level:3},{value:"Example",id:"example",children:[],level:3}],c={toc:i};function d(t){var e=t.components,u=(0,n.Z)(t,o);return(0,l.kt)("wrapper",(0,r.Z)({},c,u,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"output"},"Output"),(0,l.kt)("p",null,"Name: ",(0,l.kt)("inlineCode",{parentName:"p"},"stale-pull-requests-count"),(0,l.kt)("br",{parentName:"p"}),"\n","Type: ",(0,l.kt)("inlineCode",{parentName:"p"},"number")),(0,l.kt)("h3",{id:"description"},"Description"),(0,l.kt)("p",null,"This output will expose the number of pull requests stale."),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6}","{6}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.stale-pull-requests-count }}"\n')))}d.isMDXComponent=!0}}]);