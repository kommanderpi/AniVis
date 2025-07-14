import{s as A,_ as L,c as P,j as H,g as V,e as D,l as G,b as W,S as X,q as Z,W as N,O as q,A as Y,G as J,L as K,B as Q,V as T,m as ee,n as te,M as ne,k as oe,d as ae}from"./transform-Cni_X9bb.js";let E=[],h=[],F=[],z=null,k=0,I=null,B=!1,$=[],R=[];function se(){document.body.style.cssText="margin:0; background:#111; color:#eee; font-family:sans-serif";const o=document.createElement("div");o.style.cssText="padding:1em; display:flex; align-items:center; gap:10px;",o.innerHTML=`
    <a href="index.html" style="color:#0af; text-decoration:none; font-weight:bold;">← Back to Dashboard</a>
    <label>Start: <input id="startFrame" type="number" value="5" style="width:60px;"></label>
    <label>End: <input id="endFrame" type="number" value="20" style="width:60px;"></label>
    <button id="playBtn">▶ Play</button>
  `,document.body.appendChild(o);const e=document.createElement("select");e.id="datasetSelect_etv",e.style.cssText="margin-left:auto; background:#222; color:#eee; border:1px solid #444;",o.appendChild(e);const n=document.createElement("div");n.style.cssText=`
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
  `;A("#pathPanel").remove();const c=A(i).append("svg").attr("id","pathPanel").attr("preserveAspectRatio","xMidYMid meet");c.node().style.cssText=r,c.append("g").attr("id","layer-base"),c.append("g").attr("id","layer-static-boxes"),c.append("g").attr("id","layer-path"),c.append("g").attr("id","layer-highlight");const t=document.createElement("div");t.id="viewer3D",t.style.cssText=`
    width: 600px;
    height: 600px;
    background: #111;
    border: 1px solid #444;
  `,i.appendChild(t),document.getElementById("playBtn").addEventListener("click",U)}function j(o,e=0,n=o-1,l=0){const i=document.getElementById("hullSlider_etv");i.innerHTML="";const r=p=>Math.round(p*100)/100,c=new Set(F.map(p=>r(+p.collision_time))),t=h.map(p=>+p.time),a=new Set;let w=1;for(let p=1;p<h.length;p++){const u=+h[p].centroidA_x-+h[p-1].centroidA_x,g=+h[p].centroidA_z-+h[p-1].centroidA_z;Math.hypot(u,g)<.02?(w++,w>=5&&a.add(+h[p].time)):w=1}t.forEach((p,u)=>{const g=u/(o-1),x=c.has(r(p)),d=a.has(p),m=document.createElement("div");m.style.cssText=`
      position: absolute;
      left: ${g*100}%;
      width: 1px;
      height: ${u===l?16:u>=e&&u<=n?12:8}px;
      top: ${u===l?"0px":"4px"};
      background: ${u===l?"#0af":x?"red":d?"yellow":u>=e&&u<=n?"#ddd":"#555"};
      cursor: ${x?"pointer":"default"};
    `,x&&m.addEventListener("click",()=>{const _=window.skelTimeToIndex;let y=u,f=u;for(let v=u-1;v>=0&&c.has(r(t[v]));v--)y=v;for(let v=u+1;v<t.length&&c.has(r(t[v]));v++)f=v;const s=t[y],b=t[f],M=_.get(s),C=_.get(b);if(M===void 0||C===void 0){console.warn(`⛔ Skipping: Collision group [${y}–${f}] has no matching pose data.`);return}console.log(`🟥 Collision group selected: ${C-M+1} frames (skelStart=${M}, skelEnd=${C})`),document.getElementById("startFrame").value=y,document.getElementById("endFrame").value=f,k=y,j(o,y,f,y),S(),B&&(clearInterval(I),B=!1,document.getElementById("playBtn").textContent="▶ Play"),U()}),i.appendChild(m)})}async function ie(o){const e=V(h,n=>n.time).get(h[0].time);return e?e.map(n=>{const l=+n.boundsB_min_world_x,i=+n.boundsB_max_world_x,r=+n.boundsB_min_world_y,c=+n.boundsB_max_world_y,t=+n.boundsB_min_world_z,a=+n.boundsB_max_world_z;return{x:l,y:r,z:t,width:i-l,height:c-r||.01,depth:a-t}}):[]}async function O(o){const e="/AniVis/",n=`${e}skeleton_tracking_${o}.csv`,l=`${e}centroid_data_${o}_tracking.csv`,i=`${e}centroid_data_${o}_collisions.csv`,r=`${e}skeleton_hierarchy_${o}.json`;[E,h,F,z]=await Promise.all([P(n),P(l),P(i),H(r)]),console.log("✅ Skeleton frames:",E.length),console.log("✅ Track timestamps:",h.length),console.log("✅ Collision entries:",F.length),console.log("✅ Hierarchy keys:",Object.keys(z).length),$=V(h,a=>a.time).get(h[0].time).map(a=>({xMin:+a.boundsB_min_world_x,xMax:+a.boundsB_max_world_x,zMin:+a.boundsB_min_world_z,zMax:+a.boundsB_max_world_z})),R=await ie(),window.skelTimeToIndex=new Map(E.map((a,w)=>[+a.time,w]));const c=+document.getElementById("startFrame").value,t=+document.getElementById("endFrame").value;j(h.length,c,t,k),S()}function S(){const o=A("#pathPanel");o.selectAll("*").remove();const e=Math.min(o.node().clientWidth,o.node().clientHeight);o.attr("width",e).attr("height",e);const n=h.map(s=>+s.centroidA_x),l=h.map(s=>+s.centroidA_z),i=$.flatMap(s=>[s.xMin,s.xMax]),r=$.flatMap(s=>[s.zMin,s.zMax]),c=n.concat(i),t=l.concat(r),[a,w]=D(c),[p,u]=D(t),g=Math.max(w-a,u-p),x=20,d=G().domain([0,g]).range([x,e-x]),m=a;o.selectAll("rect.static-box").data($).enter().append("rect").attr("x",s=>d(s.xMin-m)).attr("y",s=>d(u-s.zMax)).attr("width",s=>d(s.xMax-m)-d(s.xMin-m)).attr("height",s=>d(u-s.zMin)-d(u-s.zMax)).attr("fill","#666").attr("stroke","#000").attr("stroke-width",1).attr("opacity",.4);const _=W().x(s=>d(+s.centroidA_x-m)).y(s=>d(u-+s.centroidA_z));o.append("path").datum(h).attr("d",_).attr("fill","none").attr("stroke","#555").attr("stroke-width",2).attr("opacity",.5);const y=+document.getElementById("startFrame").value,f=+document.getElementById("endFrame").value;o.append("path").datum(h.slice(y,f+1)).attr("d",_).attr("fill","none").attr("stroke","yellow").attr("stroke-width",3).attr("opacity",1),document.getElementById("startFrame").addEventListener("input",S),document.getElementById("endFrame").addEventListener("input",S)}function U(){if(B){clearInterval(I),B=!1,document.getElementById("playBtn").textContent="▶ Play";return}const o=+document.getElementById("startFrame").value,e=+document.getElementById("endFrame").value,n=+h[o]?.time,l=+h[e]?.time,i=window.skelTimeToIndex.get(n),r=window.skelTimeToIndex.get(l);if(i===void 0||r===void 0){console.warn(`⚠️ Cannot find skelCSV frames for time range: ${n}–${l}`);return}k=i;const c=le();B=!0,document.getElementById("playBtn").textContent="⏸ Pause",I=setInterval(()=>{if(k>r&&(k=i),k>=E.length){console.warn(`⚠️ Frame ${k} exceeds skelCSV bounds (${E.length})`),clearInterval(I),B=!1,document.getElementById("playBtn").textContent="▶ Play";return}const t=E[k];t&&ce(c,t,E,{start:i,end:r},R),k++},200)}function le(){const o=document.getElementById("viewer3D");o.innerHTML="";const e=new X,n=new Z(-2,2,2,-2,.1,10);n.position.set(2,2,2),n.lookAt(e.position);const l=new N({antialias:!0});l.setSize(o.clientWidth,o.clientHeight),o.appendChild(l.domElement);const i=new q(n,l.domElement);i.target.set(0,0,0),i.update();const r=new Y(16777215,1);e.add(r);const c=new J;return e.add(c),{scene:e,cam:n,renderer:l,controls:i,group:c}}function ce(o,e,n,l,i=[]){const{group:r,renderer:c,scene:t,cam:a}=o;r.clear();const w=new K({color:65535});e&&z.keys.forEach((g,x)=>{const d=z.values[x],m=+e[`${g}_x`],_=+e[`${g}_y`],y=+e[`${g}_z`],f=+e[`${d}_x`],s=+e[`${d}_y`],b=+e[`${d}_z`];if([m,_,y,f,s,b].every(Number.isFinite)){const M=new Q().setFromPoints([new T(f,s,b),new T(m,_,y)]);r.add(new ee(M,w))}});const p=[];for(let g=l.start;g<=l.end;g++){const x=n[g];x&&z.keys.forEach(d=>{const m=+x[`${d}_x`],_=+x[`${d}_y`],y=+x[`${d}_z`];[m,_,y].every(Number.isFinite)&&p.push(new T(m,_,y))})}if(p.length){const g=new te().setFromPoints(p),x=g.getCenter(new T),d=g.getSize(new T),m=Math.max(d.x,d.y,d.z)*1.2;a.left=-m/2,a.right=m/2,a.top=m/2,a.bottom=-m/2,a.near=.01,a.far=100,a.position.set(x.x+m,x.y+m,x.z+m),a.lookAt(x),a.updateProjectionMatrix()}const u=new ne({color:16777215,transparent:!0,opacity:.3});i.forEach(g=>{const{x,y:d,z:m,width:_,height:y,depth:f}=g,s=new oe(_,y,f),b=new ae(s,u);b.position.set(x+_/2,d+y/2,m+f/2),r.add(b)}),c.render(t,a)}async function re(){se();const e=Object.keys(Object.assign({"/public/skeleton_tracking_20250626_094312.csv":()=>L(()=>import("./skeleton_tracking_20250626_094312-CJ-Q6xvO.js"),[]).then(t=>t.default),"/public/skeleton_tracking_20250701_113425.csv":()=>L(()=>import("./skeleton_tracking_20250701_113425-CKgprWFM.js"),[]).then(t=>t.default),"/public/skeleton_tracking_20250703_165735.csv":()=>L(()=>import("./skeleton_tracking_20250703_165735-B8n5d4HE.js"),[]).then(t=>t.default)})).map(t=>t.match(/skeleton_tracking_(\d{8}_\d{6})\.csv/)?.[1]).filter(Boolean).sort().reverse(),n=document.getElementById("datasetSelect_etv");e.forEach(t=>{const a=document.createElement("option");a.value=t,a.textContent=t,n.appendChild(a)});const i=new URLSearchParams(location.search).get("ts"),r=e[0],c=e.includes(i)?i:r;n.value=c,console.log("📦 Loading dataset:",c),await O(c),n.addEventListener("change",async()=>{const t=n.value;console.log("🔁 Switching dataset to:",t),await O(t)})}document.addEventListener("DOMContentLoaded",re);
