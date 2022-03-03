"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6842],{4137:function(t,e,n){n.d(e,{Zo:function(){return p},kt:function(){return m}});var u=n(7294);function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);e&&(u=u.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,u)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,u,s=function(t,e){if(null==t)return{};var n,u,s={},o=Object.keys(t);for(u=0;u<o.length;u++)n=o[u],e.indexOf(n)>=0||(s[n]=t[n]);return s}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(u=0;u<o.length;u++)n=o[u],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(s[n]=t[n])}return s}var a=u.createContext({}),l=function(t){var e=u.useContext(a),n=e;return t&&(n="function"==typeof t?t(e):r(r({},e),t)),n},p=function(t){var e=l(t.components);return u.createElement(a.Provider,{value:e},t.children)},c={inlineCode:"code",wrapper:function(t){var e=t.children;return u.createElement(u.Fragment,{},e)}},d=u.forwardRef((function(t,e){var n=t.components,s=t.mdxType,o=t.originalType,a=t.parentName,p=i(t,["components","mdxType","originalType","parentName"]),d=l(n),m=s,f=d["".concat(a,".").concat(m)]||d[m]||c[m]||o;return n?u.createElement(f,r(r({ref:e},p),{},{components:n})):u.createElement(f,r({ref:e},p))}));function m(t,e){var n=arguments,s=e&&e.mdxType;if("string"==typeof t||s){var o=n.length,r=new Array(o);r[0]=d;var i={};for(var a in e)hasOwnProperty.call(e,a)&&(i[a]=e[a]);i.originalType=t,i.mdxType="string"==typeof t?t:s,r[1]=i;for(var l=2;l<o;l++)r[l]=n[l];return u.createElement.apply(null,r)}return u.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9463:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return i},contentTitle:function(){return a},metadata:function(){return l},assets:function(){return p},toc:function(){return c},default:function(){return m}});var u=n(7462),s=n(3366),o=(n(7294),n(4137)),r=["components"],i={id:"stale-issues-count-output",title:"Stale issues count output",description:"All the information you need to know about the stale issues count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},a=void 0,l={unversionedId:"issues/outputs/stale-issues-count-output",id:"issues/outputs/stale-issues-count-output",title:"Stale issues count output",description:"All the information you need to know about the stale issues count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/06-issues/02-outputs/05-stale-issues-count-output.mdx",sourceDirName:"06-issues/02-outputs",slug:"/issues/outputs/stale-issues-count-output",permalink:"/stale/fr/docs/issues/outputs/stale-issues-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/06-issues/02-outputs/05-stale-issues-count-output.mdx",tags:[{label:"Issues",permalink:"/stale/fr/docs/tags/issues"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:5,frontMatter:{id:"stale-issues-count-output",title:"Stale issues count output",description:"All the information you need to know about the stale issues count output.\nIncluding a detailed description and an example.\n",tags:["Issues","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Unaltered issues count output",permalink:"/stale/fr/docs/issues/outputs/unaltered-issues-count-output"},next:{title:"Already stale issues count output",permalink:"/stale/fr/docs/issues/outputs/already-stale-issues-count-output"}},p={},c=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function m(t){var e=t.components,n=(0,s.Z)(t,r);return(0,o.kt)("wrapper",(0,u.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"stale-issues-count"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This output will expose the number of issues stale."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.stale-issues-count }}"\n')))}m.isMDXComponent=!0}}]);