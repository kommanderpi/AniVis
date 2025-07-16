import{z as ee,V as g,E as de,k as ce,x as pe,I as he,S as ue,h as me,G as fe,W as xe,P as _e,J as j,O as be,A as ge,e as U,c as te,a as A,L as ne,K as X,N as Y,i as we,B as ye,f as ke}from"./transform-DTeldIqv.js";class ve extends de{constructor(s=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=s,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new ce(.5,.5),this.addEventListener("removed",function(){this.traverse(function(i){i.element instanceof i.element.ownerDocument.defaultView.Element&&i.element.parentNode!==null&&i.element.remove()})})}copy(s,i){return super.copy(s,i),this.element=s.element.cloneNode(!0),this.center=s.center,this}}const S=new g,Z=new ee,$=new ee,J=new g,K=new g;class Ce{constructor(s={}){const i=this;let n,o,a,l;const d={objects:new WeakMap},c=s.element!==void 0?s.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:n,height:o}},this.render=function(t,r){t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),r.parent===null&&r.matrixWorldAutoUpdate===!0&&r.updateMatrixWorld(),Z.copy(r.matrixWorldInverse),$.multiplyMatrices(r.projectionMatrix,Z),x(t,t,r),M(t)},this.setSize=function(t,r){n=t,o=r,a=n/2,l=o/2,c.style.width=t+"px",c.style.height=r+"px"};function _(t){t.isCSS2DObject&&(t.element.style.display="none");for(let r=0,u=t.children.length;r<u;r++)_(t.children[r])}function x(t,r,u){if(t.visible===!1){_(t);return}if(t.isCSS2DObject){S.setFromMatrixPosition(t.matrixWorld),S.applyMatrix4($);const p=S.z>=-1&&S.z<=1&&t.layers.test(u.layers)===!0,h=t.element;h.style.display=p===!0?"":"none",p===!0&&(t.onBeforeRender(i,r,u),h.style.transform="translate("+-100*t.center.x+"%,"+-100*t.center.y+"%)translate("+(S.x*a+a)+"px,"+(-S.y*l+l)+"px)",h.parentNode!==c&&c.appendChild(h),t.onAfterRender(i,r,u));const C={distanceToCameraSquared:v(u,t)};d.objects.set(t,C)}for(let p=0,h=t.children.length;p<h;p++)x(t.children[p],r,u)}function v(t,r){return J.setFromMatrixPosition(t.matrixWorld),K.setFromMatrixPosition(r.matrixWorld),J.distanceToSquared(K)}function b(t){const r=[];return t.traverseVisible(function(u){u.isCSS2DObject&&r.push(u)}),r}function M(t){const r=b(t).sort(function(p,h){if(p.renderOrder!==h.renderOrder)return h.renderOrder-p.renderOrder;const C=d.objects.get(p).distanceToCameraSquared,D=d.objects.get(h).distanceToCameraSquared;return C-D}),u=r.length;for(let p=0,h=r.length;p<h;p++)r[p].element.style.zIndex=u-p}}}let w,f,z,L,Q=[],F=[],P=[],y=[],oe=new Map,E,k;const Ee=[["forehead","upper_jaw"],["forehead","lower_jaw"],["forehead","trunk_base"],["trunk_base","trunk_01"],["trunk_01","trunk_02"],["trunk_02","trunk_03"],["trunk_03","trunk_04"],["trunk_04","trunk_nose"],["forehead","right_eye"],["forehead","right_eartop"],["right_eartop","right_earmid"],["right_earmid","right_earbtm"],["forehead","right_tusk_end"],["forehead","left_eye"],["forehead","left_eartop"],["left_eartop","left_earmid"],["left_earmid","left_earbtm"],["forehead","left_tusk_end"],["forehead","back_base"],["back_base","back_middle"],["back_middle","back_end"],["back_end","tail_base"],["tail_base","tail_end"],["back_base","front_left_thai"],["front_left_thai","front_left_knee"],["front_left_knee","front_left_paw"],["back_base","front_right_thai"],["front_right_thai","front_right_knee"],["front_right_knee","front_right_paw"],["back_end","back_left_thai"],["back_left_thai","back_left_knee"],["back_left_knee","back_left_paw"],["back_end","back_right_thai"],["back_right_thai","back_right_knee"],["back_right_knee","back_right_paw"],["back_middle","belly_bottom"],["back_middle","body_middle_right"],["back_middle","body_middle_left"]];async function Se(){const e=await pe("realdata/trimmed-elephant_DLC_3D.csv"),s=he(e);P=s[0],s[1],y=s.slice(2+160,2+301+1);for(let o=1;o<P.length;o+=3){const l=P[o].replace(/^elephant_/,"").replace(/_bone$/,"").replace(/-/g,"_").toLowerCase();oe.set(l,o)}}let m=new g;function ze(e=100,s=300){const i=["front_left_paw","front_right_paw","back_left_paw","back_right_paw"];let n=[],o=0,a=0;for(let d=0;d<Math.min(e,y.length);d++){const c=ie(y[d]);i.forEach(_=>{const x=c[_];x&&x.length()<s&&(n.push(x),o+=x.y,a++)})}if(n.length===0)return;m=n.reduce((d,c)=>d.add(c.clone()),new g).divideScalar(n.length),a>0&&(m.y=o/a)}function ie(e){const s={};for(let[i,n]of oe.entries()){const o=parseFloat(e[n]),a=parseFloat(e[n+2]),l=parseFloat(e[n+1]);!isNaN(o)&&!isNaN(a)&&!isNaN(l)&&(s[i]=new g(o,-l,-a))}return s}function N(e){if(!e||e.length<3)return;const s=ie(e);for(Q.forEach(i=>f.remove(i)),F.forEach(i=>f.remove(i));k.children.length>0;)k.remove(k.children[0]);F=[],Object.entries(s).forEach(([i,n])=>{const o=i.includes("paw"),a=new A(new we(1,12,12),new te({color:o?16711680:65535}));a.position.copy(n),f.add(a),Q.push(a);const l=document.createElement("div");l.className="label",l.textContent=i,l.style.marginTop="-1em",l.style.color="#fff",l.style.fontSize="10px";const d=new ve(l);d.position.copy(n.clone().add(new g(0,0,0))),k.add(d)}),Ee.forEach(([i,n])=>{const o=s[i],a=s[n];if(!o||!a||!o.isVector3||!a.isVector3)return;const l=new ye().setFromPoints([o,a]),d=new ke(l,new ne({color:16753920}));f.add(d),F.push(d)})}function Me(){const e=document.createElement("div");e.id="viewerContainer",e.style.cssText=`
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 600px;
    overflow: hidden;
    background: #111;
  `,document.body.appendChild(e),E=new Ce,E.setSize(e.clientWidth,e.clientHeight),E.domElement.style.position="absolute",E.domElement.style.top="0px",E.domElement.style.pointerEvents="none",e.appendChild(E.domElement),f=new ue,f.background=new me(1118481),k=new fe,k.visible=!1,f.add(k);const s=document.createElement("button");s.textContent="← Back to Main Screen",s.style.cssText=`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    padding: 5px 12px;
    background-color: #333;
    color: white;
    border: 1px solid #888;
    border-radius: 4px;
    cursor: pointer;
  `,s.addEventListener("click",()=>{window.location.href="index.html"}),document.body.appendChild(s),z=new xe({antialias:!0}),z.setSize(e.clientWidth,e.clientHeight),e.appendChild(z.domElement);const i=13,n=13,o=13,a=40,l=m.x-a-i/2,d=m.x+a+i/2,c=m.y,_=m.y+n,x=m.z-o/2,v=m.z+o/2,b=new g((l+d)/2,(c+_)/2,(x+v)/2),M=new g(d-l,_-c,v-x),r=Math.max(M.x,M.y,M.z)*1;w=new _e(45,e.clientWidth/e.clientHeight,1,5e3);const u=15,p=35,h=j.degToRad(u),C=j.degToRad(p),D=r,ae=b.x+D*Math.sin(h)*Math.cos(C),re=b.y+D*Math.sin(C),le=b.z+D*Math.cos(h)*Math.cos(C);w.position.set(ae,re,le),w.lookAt(b),L=new be(w,z.domElement),L.target.copy(b),L.update(),f.add(new ge(16777215,1)),window.addEventListener("resize",()=>{w.aspect=e.clientWidth/e.clientHeight,w.updateProjectionMatrix(),z.setSize(e.clientWidth,e.clientHeight)});const T=document.createElement("button");T.textContent="Toggle Labels",T.style.cssText=`
    position: absolute;
    top: 10px;
    left: 330px;
    z-index: 1000;
    padding: 5px 10px;
  `,document.body.appendChild(T);let O=!0;T.addEventListener("click",()=>{O=!O,k.visible=O});const G=new U(i,n,o),H=new U(i,n,o),V=new te({color:5592575}),W=new A(G,V),B=new A(H,V);W.position.set(m.x-a,m.y+n/2,m.z),B.position.set(m.x+a,m.y+n/2,m.z),f.add(W),f.add(B);const R=new ne({color:0,linewidth:20}),I=new X(new Y(G),R);I.position.copy(W.position),f.add(I);const q=new X(new Y(H),R);q.position.copy(B.position),f.add(q),se()}function se(){requestAnimationFrame(se),L.update(),z.render(f,w),E.render(f,w)}function De(){const e=document.createElement("input");e.type="range",e.min=0,e.max=y.length-1,e.min=0,e.value=0,e.style.cssText=`
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1000;
    width: 300px;
  `,document.body.appendChild(e),e.addEventListener("input",()=>{const c=+e.value;N(y[c])});const s=document.createElement("div");s.innerHTML="&larr; slower &nbsp;|&nbsp; faster &rarr;",s.style.cssText=`
    position: absolute;
    top: 135px;
    left: 10px;
    z-index: 1000;
    color: white;
    font-size: 12px;
  `,document.body.appendChild(s);const i=document.createElement("label");i.textContent="Speed (ms per frame) :",i.style.cssText=`
    position: absolute;
    top: 90px;
    left: 10px;
    z-index: 1000;
    color: white;
  `,document.body.appendChild(i);const n=document.createElement("input");n.type="range",n.min=1,n.max=500,n.step=1,n.value=99,n.style.cssText=`
    position: absolute;
    top: 110px;
    left: 10px;
    z-index: 1000;
    width: 300px;
  `,document.body.appendChild(n);const o=document.createElement("button");o.textContent="▶ Play",o.style.cssText=`
    position: absolute;
    top: 50px;
    left: 10px;
    z-index: 1000;
    padding: 5px 10px;
  `,document.body.appendChild(o);let a=!1,l=10,d=null;o.addEventListener("click",()=>{if(a)clearTimeout(d),a=!1,o.textContent="▶ Play";else{a=!0,o.textContent="⏸ Pause";const c=()=>{l++,l>=y.length&&(l=0),e.value=l,N(y[l]);const _=parseInt(n.value),x=20,v=1e3,b=v-_/100*(v-x);d=setTimeout(c,b)};c()}}),o.click(),N(y[10])}Se().then(()=>{ze(),Me(),De()});
