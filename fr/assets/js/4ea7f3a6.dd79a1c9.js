"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[1241],{4137:function(e,t,n){n.d(t,{Zo:function(){return a},kt:function(){return m}});var u=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);t&&(u=u.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,u)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,u,r=function(e,t){if(null==e)return{};var n,u,r={},o=Object.keys(e);for(u=0;u<o.length;u++)n=o[u],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(u=0;u<o.length;u++)n=o[u],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=u.createContext({}),i=function(e){var t=u.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},a=function(e){var t=i(e.components);return u.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return u.createElement(u.Fragment,{},t)}},d=u.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,a=s(e,["components","mdxType","originalType","parentName"]),d=i(n),m=r,f=d["".concat(p,".").concat(m)]||d[m]||c[m]||o;return n?u.createElement(f,l(l({ref:t},a),{},{components:n})):u.createElement(f,l({ref:t},a))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var i=2;i<o;i++)l[i]=n[i];return u.createElement.apply(null,l)}return u.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4697:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return i},assets:function(){return a},toc:function(){return c},default:function(){return m}});var u=n(7462),r=n(3366),o=(n(7294),n(4137)),l=["components"],s={id:"ignored-pull-requests-count-output",title:"Ignored pull requests count output",description:"All the information you need to know about the ignored pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},p=void 0,i={unversionedId:"pull-requests/outputs/ignored-pull-requests-count-output",id:"pull-requests/outputs/ignored-pull-requests-count-output",title:"Ignored pull requests count output",description:"All the information you need to know about the ignored pull requests count output.\nIncluding a detailed description and an example.\n",source:"@site/docs/08-pull-requests/02-outputs/03-ignored-pull-requests-count-output.mdx",sourceDirName:"08-pull-requests/02-outputs",slug:"/pull-requests/outputs/ignored-pull-requests-count-output",permalink:"/stale/fr/docs/pull-requests/outputs/ignored-pull-requests-count-output",editUrl:"https://github.com/Sonia-corporation/stale/tree/develop/documentation/docs/08-pull-requests/02-outputs/03-ignored-pull-requests-count-output.mdx",tags:[{label:"Pull requests",permalink:"/stale/fr/docs/tags/pull-requests"},{label:"Outputs",permalink:"/stale/fr/docs/tags/outputs"}],version:"current",sidebarPosition:3,frontMatter:{id:"ignored-pull-requests-count-output",title:"Ignored pull requests count output",description:"All the information you need to know about the ignored pull requests count output.\nIncluding a detailed description and an example.\n",tags:["Pull requests","Outputs"]},sidebar:"tutorialSidebar",previous:{title:"Processed pull requests count output",permalink:"/stale/fr/docs/pull-requests/outputs/processed-pull-requests-count-output"},next:{title:"Unaltered pull requests count output",permalink:"/stale/fr/docs/pull-requests/outputs/unaltered-pull-requests-count-output"}},a={},c=[{value:"Output",id:"output",level:3},{value:"Description",id:"description",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function m(e){var t=e.components,n=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,u.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"output"},"Output"),(0,o.kt)("p",null,"Name: ",(0,o.kt)("inlineCode",{parentName:"p"},"ignored-pull-requests-count"),(0,o.kt)("br",{parentName:"p"}),"\n","Type: ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h3",{id:"description"},"Description"),(0,o.kt)("p",null,"This output will expose the number of pull requests ignored."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml",metastring:"{6-7}","{6-7}":!0},'# ...\nsteps:\n  - name: Stale\n    id: stale\n    uses: sonia-corporation/stale@latest\n  - name: Count\n    run: echo "${{ steps.Stale.outputs.ignored-pull-requests-count }}"\n')))}m.isMDXComponent=!0}}]);