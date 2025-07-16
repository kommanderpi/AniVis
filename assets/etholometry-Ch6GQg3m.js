import{S as W,j as X,W as Z,O as N,A as Y,G as q,L as J,B as K,V as z,f as Q,g as ee,M as te,e as ne,a as oe}from"./transform-DTeldIqv.js";import{s as F,_ as P,c as A,j as ae,g as j,e as V,l as se,b as ie}from"./line-DPgEyx6V.js";let E=[],g=[],D=[],I=null,k=0,S=null,M=!1,C=[],U=[],O=!1;function le(){document.body.style.cssText="margin:0; background:#111; color:#eee; font-family:sans-serif";const n=document.createElement("div");n.style.cssText="padding:1em; display:flex; align-items:center; gap:10px;",n.innerHTML=`
    <a href="index.html" style="color:#0af; text-decoration:none; font-weight:bold;">← Back to Dashboard</a>
    <label>Start: <input id="startFrame" type="number" value="5" style="width:60px;"></label>
    <label>End: <input id="endFrame" type="number" value="20" style="width:60px;"></label>
    <button id="playBtn">▶ Play</button>
  `,document.body.appendChild(n);const e=document.createElement("select");e.id="datasetSelect_etv",e.style.cssText="margin-left:auto; background:#222; color:#eee; border:1px solid #444;",n.appendChild(e);const i=document.createElement("div");i.style.cssText=`
    width: 100%;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;const c=document.createElement("div");c.id="hullSlider_etv",c.style.cssText=`
    position: relative;
    width: 80%;
    height: 24px;
    border-top: 1px solid #666;
    background: transparent;
  `,i.appendChild(c),document.body.appendChild(i);const a=document.createElement("div");a.id="layoutContainer",a.style.cssText=`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 1em;
    padding: 1em;
    max-width: 100%;
    flex-wrap: nowrap;
  `,document.body.appendChild(a);const d=`
    flex: 0 0 auto;
    width: 100%;
    max-width: 1000px;
    max-height: 1000px;
    aspect-ratio: 1 / 1;
    background: #111;
    border: 1px solid #444;
  `;F("#pathPanel").remove();const l=F(a).append("svg").attr("id","pathPanel").attr("preserveAspectRatio","xMidYMid meet");l.node().style.cssText=d,l.append("g").attr("id","layer-base"),l.append("g").attr("id","layer-static-boxes"),l.append("g").attr("id","layer-path"),l.append("g").attr("id","layer-highlight");const t=document.createElement("div");t.id="viewer3D",t.style.cssText=`
    width: 600px;
    height: 600px;
    background: #111;
    border: 1px solid #444;
  `,a.appendChild(t),document.getElementById("playBtn").addEventListener("click",G)}function H(n,e=0,i=n-1,c=0){const a=document.getElementById("hullSlider_etv");a.innerHTML="";const d=h=>Math.round(h*100)/100,l=new Set(D.map(h=>d(+h.collision_time))),t=g.map(h=>+h.time),s=new Set;let f=1;for(let h=1;h<g.length;h++){const m=+g[h].centroidA_x-+g[h-1].centroidA_x,b=+g[h].centroidA_z-+g[h-1].centroidA_z;Math.hypot(m,b)<.02?(f++,f>=5&&s.add(+g[h].time)):f=1}t.forEach((h,m)=>{const b=m/(n-1),x=l.has(d(h)),r=s.has(h),p=document.createElement("div");p.style.cssText=`
      position: absolute;
      left: ${b*100}%;
      width: 1px;
      height: ${m===c?16:m>=e&&m<=i?12:8}px;
      top: ${m===c?"0px":"4px"};
      background: ${m===c?"#0af":x?"red":r?"yellow":m>=e&&m<=i?"#ddd":"#555"};
      cursor: ${x?"pointer":"default"};
    `,x&&p.addEventListener("click",()=>{const u=window.skelTimeToIndex;let y=m,_=m;for(let v=m-1;v>=0&&l.has(d(t[v]));v--)y=v;for(let v=m+1;v<t.length&&l.has(d(t[v]));v++)_=v;const o=t[y],B=t[_],w=u.get(o),T=u.get(B);if(w===void 0||T===void 0){console.warn(`⛔ Skipping: Collision group [${y}–${_}] has no matching pose data.`);return}console.log(`🟥 Collision group selected: ${T-w+1} frames (skelStart=${w}, skelEnd=${T})`),document.getElementById("startFrame").value=y,document.getElementById("endFrame").value=_,k=y,H(n,y,_,y),L(),M&&(clearInterval(S),M=!1,document.getElementById("playBtn").textContent="▶ Play"),G()}),a.appendChild(p)})}async function ce(){const n=j(g,e=>e.time).get(g[0].time);return n?n.map(e=>{const i=+e.boundsB_min_world_x,c=+e.boundsB_max_world_x,a=+e.boundsB_min_world_y,d=+e.boundsB_max_world_y,l=+e.boundsB_min_world_z,t=+e.boundsB_max_world_z;return{x:i,y:a,z:l,width:c-i,height:d-a||.01,depth:t-l}}):[]}async function R(n){const e="/AniVis/",i=`${e}skeleton_tracking_${n}.csv`,c=`${e}centroid_data_${n}_tracking.csv`,a=`${e}centroid_data_${n}_collisions.csv`,d=`${e}skeleton_hierarchy_${n}.json`;[E,g,D,I]=await Promise.all([A(i),A(c),A(a),ae(d)]),console.log("✅ Skeleton frames:",E.length),console.log("✅ Track timestamps:",g.length),console.log("✅ Collision entries:",D.length),console.log("✅ Hierarchy keys:",Object.keys(I).length),C=j(g,s=>s.time).get(g[0].time).map(s=>({xMin:+s.boundsB_min_world_x,xMax:+s.boundsB_max_world_x,zMin:+s.boundsB_min_world_z,zMax:+s.boundsB_max_world_z})),U=await ce(),window.skelTimeToIndex=new Map(E.map((s,f)=>[+s.time,f]));const l=+document.getElementById("startFrame").value,t=+document.getElementById("endFrame").value;H(g.length,l,t,k),L()}function L(){const n=F("#pathPanel");n.selectAll("*").remove();const e=Math.min(n.node().clientWidth,n.node().clientHeight);n.attr("width",e).attr("height",e);const i=g.map(o=>+o.centroidA_x),c=g.map(o=>+o.centroidA_z),a=C.flatMap(o=>[o.xMin,o.xMax]),d=C.flatMap(o=>[o.zMin,o.zMax]),l=i.concat(a),t=c.concat(d),[s,f]=V(l),[h,m]=V(t),b=Math.max(f-s,m-h),x=20,r=se().domain([0,b]).range([x,e-x]),p=s;n.selectAll("rect.static-box").data(C).enter().append("rect").attr("x",o=>r(o.xMin-p)).attr("y",o=>r(m-o.zMax)).attr("width",o=>r(o.xMax-p)-r(o.xMin-p)).attr("height",o=>r(m-o.zMin)-r(m-o.zMax)).attr("fill","#666").attr("stroke","#000").attr("stroke-width",1).attr("opacity",.4);const u=ie().x(o=>r(+o.centroidA_x-p)).y(o=>r(m-+o.centroidA_z));n.append("path").datum(g).attr("d",u).attr("fill","none").attr("stroke","#555").attr("stroke-width",2).attr("opacity",.5);const y=+document.getElementById("startFrame").value,_=+document.getElementById("endFrame").value;n.append("path").datum(g.slice(y,_+1)).attr("d",u).attr("fill","none").attr("stroke","yellow").attr("stroke-width",3).attr("opacity",1),document.getElementById("startFrame").addEventListener("input",L),document.getElementById("endFrame").addEventListener("input",L)}function G(){if(M){clearInterval(S),M=!1,document.getElementById("playBtn").textContent="▶ Play";return}const n=+document.getElementById("startFrame").value,e=+document.getElementById("endFrame").value,i=+g[n]?.time,c=+g[e]?.time,a=window.skelTimeToIndex.get(i),d=window.skelTimeToIndex.get(c);if(a===void 0||d===void 0){console.warn(`⚠️ Cannot find skelCSV frames for time range: ${i}–${c}`);return}k=a;const l=re();M=!0,document.getElementById("playBtn").textContent="⏸ Pause",S=setInterval(()=>{if(k>d&&(k=a),k>=E.length){console.warn(`⚠️ Frame ${k} exceeds skelCSV bounds (${E.length})`),clearInterval(S),M=!1,document.getElementById("playBtn").textContent="▶ Play";return}const t=E[k];t&&de(l,t,E,{start:a,end:d},U),k++},200)}let $=null;function re(){if($)return $;const n=document.getElementById("viewer3D");n.innerHTML="";const e=new W,i=new X(-2,2,2,-2,.1,100);i.position.set(2,2,2),i.lookAt(0,0,0);const c=new Z({antialias:!0});c.setSize(n.clientWidth,n.clientHeight),n.appendChild(c.domElement);const a=new N(i,c.domElement);a.target.set(0,0,0),a.update();const d=new Y(16777215,1);e.add(d);const l=new q;return e.add(l),$={scene:e,cam:i,renderer:c,controls:a,group:l},$}function de(n,e,i,c,a=[]){const{group:d,renderer:l,scene:t,cam:s,controls:f}=n;d.clear();const h=new J({color:65535});e&&I.keys.forEach((x,r)=>{const p=I.values[r],u=+e[`${x}_x`],y=+e[`${x}_y`],_=+e[`${x}_z`],o=+e[`${p}_x`],B=+e[`${p}_y`],w=+e[`${p}_z`];if([u,y,_,o,B,w].every(Number.isFinite)){const T=new K().setFromPoints([new z(o,B,w),new z(u,y,_)]);d.add(new Q(T,h))}});const m=[];for(let x=c.start;x<=c.end;x++){const r=i[x];r&&I.keys.forEach(p=>{const u=+r[`${p}_x`],y=+r[`${p}_y`],_=+r[`${p}_z`];[u,y,_].every(Number.isFinite)&&m.push(new z(u,y,_))})}if(m.length){const x=new ee().setFromPoints(m),r=x.getCenter(new z);if(!O){const p=x.getSize(new z),u=Math.max(p.x,p.y,p.z)*1.2;s.left=-u/2,s.right=u/2,s.top=u/2,s.bottom=-u/2,s.near=.01,s.far=100,s.position.set(r.x+u,r.y+u,r.z+u),s.updateProjectionMatrix(),O=!0}s.lookAt(r),f.target.copy(r),f.update()}const b=new te({color:16777215,transparent:!0,opacity:.3});a.forEach(x=>{const{x:r,y:p,z:u,width:y,height:_,depth:o}=x,B=new ne(y,_,o),w=new oe(B,b);w.position.set(r+y/2,p+_/2,u+o/2),d.add(w)}),l.render(t,s)}async function me(){le();const e=Object.keys(Object.assign({"/public/skeleton_tracking_20250626_094312.csv":()=>P(()=>import("./skeleton_tracking_20250626_094312-CJ-Q6xvO.js"),[]).then(t=>t.default),"/public/skeleton_tracking_20250701_113425.csv":()=>P(()=>import("./skeleton_tracking_20250701_113425-CKgprWFM.js"),[]).then(t=>t.default),"/public/skeleton_tracking_20250703_165735.csv":()=>P(()=>import("./skeleton_tracking_20250703_165735-B8n5d4HE.js"),[]).then(t=>t.default)})).map(t=>t.match(/skeleton_tracking_(\d{8}_\d{6})\.csv/)?.[1]).filter(Boolean).sort().reverse(),i=document.getElementById("datasetSelect_etv");e.forEach(t=>{const s=document.createElement("option");s.value=t,s.textContent=t,i.appendChild(s)});const a=new URLSearchParams(location.search).get("ts"),d=e[0],l=e.includes(a)?a:d;i.value=l,console.log("📦 Loading dataset:",l),await R(l),i.addEventListener("change",async()=>{const t=i.value;console.log("🔁 Switching dataset to:",t),await R(t)})}document.addEventListener("DOMContentLoaded",me);
