(self.webpackChunkgatsby_blog=self.webpackChunkgatsby_blog||[]).push([[367],{3768:function(e){e.exports={kebabCase:function(e){var t=e;return t=(t=(t=(t=t.replace(/([a-z][A-Z])/g,(function(e){return e.substr(0,1)+"-"+e.substr(1,1).toLowerCase()}))).toLowerCase()).replace(/[^-a-z0-9]+/g,"-")).replace(/^-+/,"").replace(/-+$/,"")}}},3316:function(e,t,l){"use strict";var a=l(6540),n=l(4810),r=l(3768);t.A=function(e){let{tags:t}=e;return a.createElement("div",{className:"tags"},a.createElement("h3",{className:"heading"},"Categories:"),a.createElement("ul",null,t.map((e=>a.createElement("li",{key:(0,r.kebabCase)(e)},a.createElement(n.N_,{to:"/tags/"+(0,r.kebabCase)(e),itemProp:"url"},a.createElement("span",{itemProp:"headline"},e)))))))}},7797:function(e,t,l){"use strict";l.r(t);var a=l(6540),n=l(4810),r=l(2944),s=l(2269),c=l(3316);t.default=e=>{var t;let{data:l,pageContext:m,location:o}=e;const i=l.markdownRemark,u=l.morePosts.nodes,p=(null===(t=l.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",{previous:E,next:d,tags:g}=m,f=i.frontmatter.date,b=i.frontmatter.update,h=()=>a.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",null,a.createElement("h1",{itemProp:"headline"},i.frontmatter.title),f&&a.createElement("small",{className:"date"},a.createElement("b",null,"Posted on:")," ",f),b&&a.createElement("small",{className:"date update"},a.createElement("b",null,"Updated on:")," ",b)),a.createElement("section",{dangerouslySetInnerHTML:{__html:i.html},itemProp:"articleBody"})),k=()=>a.createElement("footer",null,a.createElement(c.A,{tags:g}),a.createElement("div",{className:"related-posts"},a.createElement("h3",null,"Similar posts:"),u.length?u.map(((e,t)=>a.createElement(n.N_,{key:t,to:e.fields.slug},e.frontmatter.title))):a.createElement("p",null,"No related posts"))),v=()=>{const e=e=>{let{link:t,linkText:l,rel:r}=e;return t&&a.createElement("li",null,a.createElement("span",null,l," "),a.createElement(n.N_,{to:t.fields.slug,rel:r},t.frontmatter.title))};return a.createElement("nav",{className:"blog-post-nav"},a.createElement("ul",null,a.createElement(e,{link:E,linkText:"Previous post:",rel:"prev"}),a.createElement(e,{link:d,linkText:"Next post:",rel:"next"})))};return a.createElement(r.A,{location:o,title:p,className:"single-post"},a.createElement(s.A,{title:i.frontmatter.title,description:i.frontmatter.description||i.excerpt}),a.createElement("div",{className:"post"},a.createElement(h,null),a.createElement("hr",null),a.createElement(k,null),a.createElement("hr",null),a.createElement(v,null)))}}}]);
//# sourceMappingURL=component---src-templates-single-post-js-f9231bccda9d4c3c686f.js.map