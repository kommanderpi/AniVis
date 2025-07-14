import{s as F,_ as P,c as A,j as W,g as j,e as V,l as X,b as Z,S as N,q,W as Y,O as J,A as K,G as Q,L as ee,B as te,V as z,m as ne,n as ae,M as oe,k as se,d as ie}from"./transform-Cni_X9bb.js";let E=[],g=[],D=[],I=null,k=0,S=null,M=!1,C=[],U=[],O=!1;function le(){document.body.style.cssText="margin:0; background:#111; color:#eee; font-family:sans-serif";const a=document.createElement("div");a.style.cssText="padding:1em; display:flex; align-items:center; gap:10px;",a.innerHTML=`
    <a href="index.html" style="color:#0af; text-decoration:none; font-weight:bold;">← Back to Dashboard</a>
    <label>Start: <input id="startFrame" type="number" value="5" style="width:60px;"></label>
    <label>End: <input id="endFrame" type="number" value="20" style="width:60px;"></label>
    <button id="playBtn">▶ Play</button>
  `,document.body.appendChild(a);const e=document.createElement("select");e.id="datasetSelect_etv",e.style.cssText="margin-left:auto; background:#222; color:#eee; border:1px solid #444;",a.appendChild(e);const n=document.createElement("div");n.style.cssText=`
    width: 100%;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;const l=document.createElement("div");l.id="hullSlider_etv",l.style.cssText=`
    position: relative;
    width: 80%;
    height: 24px;
    border-top: 1px solid #666;
    background: transparent;
  `,n.appendChild(l),document.body.appendChild(n);const i=document.createElement("div");i.id="layoutContainer",i.style.cssText=`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 1em;
    padding: 1em;
    max-width: 100%;
    flex-wrap: nowrap;
  `,document.body.appendChild(i);const r=`
    flex: 0 0 auto;
    width: 100%;
    max-width: 1000px;
    max-height: 1000px;
    aspect-ratio: 1 / 1;
    background: #111;
    border: 1px solid #444;
  `;F("#pathPanel").remove();const c=F(i).append("svg").attr("id","pathPanel").attr("preserveAspectRatio","xMidYMid meet");c.node().style.cssText=r,c.append("g").attr("id","layer-base"),c.append("g").attr("id","layer-static-boxes"),c.append("g").attr("id","layer-path"),c.append("g").attr("id","layer-highlight");const t=document.createElement("div");t.id="viewer3D",t.style.cssText=`
    width: 600px;
    height: 600px;
    background: #111;
    border: 1px solid #444;
  `,i.appendChild(t),document.getElementById("playBtn").addEventListener("click",G)}function H(a,e=0,n=a-1,l=0){const i=document.getElementById("hullSlider_etv");i.innerHTML="";const r=h=>Math.round(h*100)/100,c=new Set(D.map(h=>r(+h.collision_time))),t=g.map(h=>+h.time),o=new Set;let f=1;for(let h=1;h<g.length;h++){const m=+g[h].centroidA_x-+g[h-1].centroidA_x,b=+g[h].centroidA_z-+g[h-1].centroidA_z;Math.hypot(m,b)<.02?(f++,f>=5&&o.add(+g[h].time)):f=1}t.forEach((h,m)=>{const b=m/(a-1),x=c.has(r(h)),d=o.has(h),p=document.createElement("div");p.style.cssText=`
      position: absolute;
      left: ${b*100}%;
      width: 1px;
      height: ${m===l?16:m>=e&&m<=n?12:8}px;
      top: ${m===l?"0px":"4px"};
      background: ${m===l?"#0af":x?"red":d?"yellow":m>=e&&m<=n?"#ddd":"#555"};
      cursor: ${x?"pointer":"default"};
    `,x&&p.addEventListener("click",()=>{const u=window.skelTimeToIndex;let y=m,_=m;for(let v=m-1;v>=0&&c.has(r(t[v]));v--)y=v;for(let v=m+1;v<t.length&&c.has(r(t[v]));v++)_=v;const s=t[y],B=t[_],w=u.get(s),T=u.get(B);if(w===void 0||T===void 0){console.warn(`⛔ Skipping: Collision group [${y}–${_}] has no matching pose data.`);return}console.log(`🟥 Collision group selected: ${T-w+1} frames (skelStart=${w}, skelEnd=${T})`),document.getElementById("startFrame").value=y,document.getElementById("endFrame").value=_,k=y,H(a,y,_,y),L(),M&&(clearInterval(S),M=!1,document.getElementById("playBtn").textContent="▶ Play"),G()}),i.appendChild(p)})}async function ce(a){const e=j(g,n=>n.time).get(g[0].time);return e?e.map(n=>{const l=+n.boundsB_min_world_x,i=+n.boundsB_max_world_x,r=+n.boundsB_min_world_y,c=+n.boundsB_max_world_y,t=+n.boundsB_min_world_z,o=+n.boundsB_max_world_z;return{x:l,y:r,z:t,width:i-l,height:c-r||.01,depth:o-t}}):[]}async function R(a){const e="/AniVis/",n=`${e}skeleton_tracking_${a}.csv`,l=`${e}centroid_data_${a}_tracking.csv`,i=`${e}centroid_data_${a}_collisions.csv`,r=`${e}skeleton_hierarchy_${a}.json`;[E,g,D,I]=await Promise.all([A(n),A(l),A(i),W(r)]),console.log("✅ Skeleton frames:",E.length),console.log("✅ Track timestamps:",g.length),console.log("✅ Collision entries:",D.length),console.log("✅ Hierarchy keys:",Object.keys(I).length),C=j(g,o=>o.time).get(g[0].time).map(o=>({xMin:+o.boundsB_min_world_x,xMax:+o.boundsB_max_world_x,zMin:+o.boundsB_min_world_z,zMax:+o.boundsB_max_world_z})),U=await ce(),window.skelTimeToIndex=new Map(E.map((o,f)=>[+o.time,f]));const c=+document.getElementById("startFrame").value,t=+document.getElementById("endFrame").value;H(g.length,c,t,k),L()}function L(){const a=F("#pathPanel");a.selectAll("*").remove();const e=Math.min(a.node().clientWidth,a.node().clientHeight);a.attr("width",e).attr("height",e);const n=g.map(s=>+s.centroidA_x),l=g.map(s=>+s.centroidA_z),i=C.flatMap(s=>[s.xMin,s.xMax]),r=C.flatMap(s=>[s.zMin,s.zMax]),c=n.concat(i),t=l.concat(r),[o,f]=V(c),[h,m]=V(t),b=Math.max(f-o,m-h),x=20,d=X().domain([0,b]).range([x,e-x]),p=o;a.selectAll("rect.static-box").data(C).enter().append("rect").attr("x",s=>d(s.xMin-p)).attr("y",s=>d(m-s.zMax)).attr("width",s=>d(s.xMax-p)-d(s.xMin-p)).attr("height",s=>d(m-s.zMin)-d(m-s.zMax)).attr("fill","#666").attr("stroke","#000").attr("stroke-width",1).attr("opacity",.4);const u=Z().x(s=>d(+s.centroidA_x-p)).y(s=>d(m-+s.centroidA_z));a.append("path").datum(g).attr("d",u).attr("fill","none").attr("stroke","#555").attr("stroke-width",2).attr("opacity",.5);const y=+document.getElementById("startFrame").value,_=+document.getElementById("endFrame").value;a.append("path").datum(g.slice(y,_+1)).attr("d",u).attr("fill","none").attr("stroke","yellow").attr("stroke-width",3).attr("opacity",1),document.getElementById("startFrame").addEventListener("input",L),document.getElementById("endFrame").addEventListener("input",L)}function G(){if(M){clearInterval(S),M=!1,document.getElementById("playBtn").textContent="▶ Play";return}const a=+document.getElementById("startFrame").value,e=+document.getElementById("endFrame").value,n=+g[a]?.time,l=+g[e]?.time,i=window.skelTimeToIndex.get(n),r=window.skelTimeToIndex.get(l);if(i===void 0||r===void 0){console.warn(`⚠️ Cannot find skelCSV frames for time range: ${n}–${l}`);return}k=i;const c=re();M=!0,document.getElementById("playBtn").textContent="⏸ Pause",S=setInterval(()=>{if(k>r&&(k=i),k>=E.length){console.warn(`⚠️ Frame ${k} exceeds skelCSV bounds (${E.length})`),clearInterval(S),M=!1,document.getElementById("playBtn").textContent="▶ Play";return}const t=E[k];t&&de(c,t,E,{start:i,end:r},U),k++},200)}let $=null;function re(){if($)return $;const a=document.getElementById("viewer3D");a.innerHTML="";const e=new N,n=new q(-2,2,2,-2,.1,100);n.position.set(2,2,2),n.lookAt(0,0,0);const l=new Y({antialias:!0});l.setSize(a.clientWidth,a.clientHeight),a.appendChild(l.domElement);const i=new J(n,l.domElement);i.target.set(0,0,0),i.update();const r=new K(16777215,1);e.add(r);const c=new Q;return e.add(c),$={scene:e,cam:n,renderer:l,controls:i,group:c},$}function de(a,e,n,l,i=[]){const{group:r,renderer:c,scene:t,cam:o,controls:f}=a;r.clear();const h=new ee({color:65535});e&&I.keys.forEach((x,d)=>{const p=I.values[d],u=+e[`${x}_x`],y=+e[`${x}_y`],_=+e[`${x}_z`],s=+e[`${p}_x`],B=+e[`${p}_y`],w=+e[`${p}_z`];if([u,y,_,s,B,w].every(Number.isFinite)){const T=new te().setFromPoints([new z(s,B,w),new z(u,y,_)]);r.add(new ne(T,h))}});const m=[];for(let x=l.start;x<=l.end;x++){const d=n[x];d&&I.keys.forEach(p=>{const u=+d[`${p}_x`],y=+d[`${p}_y`],_=+d[`${p}_z`];[u,y,_].every(Number.isFinite)&&m.push(new z(u,y,_))})}if(m.length){const x=new ae().setFromPoints(m),d=x.getCenter(new z);if(!O){const p=x.getSize(new z),u=Math.max(p.x,p.y,p.z)*1.2;o.left=-u/2,o.right=u/2,o.top=u/2,o.bottom=-u/2,o.near=.01,o.far=100,o.position.set(d.x+u,d.y+u,d.z+u),o.updateProjectionMatrix(),O=!0}o.lookAt(d),f.target.copy(d),f.update()}const b=new oe({color:16777215,transparent:!0,opacity:.3});i.forEach(x=>{const{x:d,y:p,z:u,width:y,height:_,depth:s}=x,B=new se(y,_,s),w=new ie(B,b);w.position.set(d+y/2,p+_/2,u+s/2),r.add(w)}),c.render(t,o)}async function me(){le();const e=Object.keys(Object.assign({"/public/skeleton_tracking_20250626_094312.csv":()=>P(()=>import("./skeleton_tracking_20250626_094312-CJ-Q6xvO.js"),[]).then(t=>t.default),"/public/skeleton_tracking_20250701_113425.csv":()=>P(()=>import("./skeleton_tracking_20250701_113425-CKgprWFM.js"),[]).then(t=>t.default),"/public/skeleton_tracking_20250703_165735.csv":()=>P(()=>import("./skeleton_tracking_20250703_165735-B8n5d4HE.js"),[]).then(t=>t.default)})).map(t=>t.match(/skeleton_tracking_(\d{8}_\d{6})\.csv/)?.[1]).filter(Boolean).sort().reverse(),n=document.getElementById("datasetSelect_etv");e.forEach(t=>{const o=document.createElement("option");o.value=t,o.textContent=t,n.appendChild(o)});const i=new URLSearchParams(location.search).get("ts"),r=e[0],c=e.includes(i)?i:r;n.value=c,console.log("📦 Loading dataset:",c),await R(c),n.addEventListener("change",async()=>{const t=n.value;console.log("🔁 Switching dataset to:",t),await R(t)})}document.addEventListener("DOMContentLoaded",me);
