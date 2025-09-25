// libros que tenemos disponibles
const BOOKS = [
  {id:1, title:"El terror de la jungla", author:"SANSER", price:7500, isbn:"978-00-00001", img:"img/libro1.jpg", genre:"Aventura"},
  {id:2, title:"La ayuda es un beneficio?", author:"SKADI", price:7500, isbn:"978-00-00002", img:"img/libro2.jpg", genre:"Ensayo"},
  {id:3, title:"Control de oleadas", author:"WERLYB", price:7500, isbn:"978-00-00003", img:"img/libro3.jpg", genre:"Estrategia"},
  {id:4, title:"La ciencia de la victoria", author:"GABOXYIYI", price:444444, isbn:"978-00-00004", img:"img/libro4.jpg", genre:"Superación"}
];
// funciones para guardar, leer y usuarios 
const storage={get:(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const allowedDomains=/(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
const currentUser=()=>storage.get("mb_currentUser",null);
const setCurrentUser=u=>storage.set("mb_currentUser",u);
const users=()=>storage.get("mb_users",[]);
function saveUser(u){const l=users();if(l.find(x=>x.email===u.email))return false;l.push(u);storage.set("mb_users",l);return true;}
function logout(){setCurrentUser(null);location.href='index.html'}
// carrito y funciones que tenemos
const cart=()=>storage.get("mb_cart",[]);
const setCart=c=>{storage.set("mb_cart",c);updateCartBadge();};
function addToCart(id,qty=1){const c=cart();const it=c.find(i=>i.id===id);if(it){it.qty+=qty}else{c.push({id,qty})}setCart(c)}
function removeFromCart(id){setCart(cart().filter(i=>i.id!==id))}
function changeQty(id,delta){setCart(cart().map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+delta)}:i))}
const cartCount=()=>cart().reduce((s,i)=>s+i.qty,0);
const money=n=>`$${n.toLocaleString('es-CL')}`;
const bookById=id=>BOOKS.find(b=>b.id===id);
function updateCartBadge(){const b=document.querySelector('[data-cart-count]');if(!b)return;b.textContent=cartCount();b.style.display=cartCount()>0?'inline-block':'none'}
function renderHeaderUser(){const box=document.querySelector('[data-userbox]');if(!box)return;const u=currentUser();if(!u){box.innerHTML='<a class="btn" href="login.html">Ingresar</a>';return;}const ini=u.name?u.name[0].toUpperCase():'U';box.innerHTML=`<div class="header-user"><div class="avatar">${ini}</div><span>${u.name}</span><button class="btn" id="btnLogout">Salir</button></div>`;document.getElementById('btnLogout').onclick=logout}
// plantilla de tarjeta libro
function cardHTML(b,allowAdd=false){return `<article class="card">
  <img src="${b.img}" alt="">
  <div class="body">
    <div class="badge">${b.author}</div>
    <h3>${b.title}</h3>
    <p class="subtitle">${b.genre} · ISBN ${b.isbn}</p>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px">
      <strong>${money(b.price)}</strong>
      <div>${allowAdd?`<a class="btn warn" href="#" data-add-book="${b.id}">Añadir</a>`:`<a class="btn" href="producto.html?id=${b.id}">Ver</a>`}</div>
    </div>
  </div>
</article>`}
// páginas de inicio, catalogo, detalles del producto, carito, login, registro y subir libros como autor
function pageIndex(){const w=document.getElementById('destacados');if(!w)return;w.innerHTML=BOOKS.slice(0,3).map(b=>cardHTML(b,true)).join('')}
function pageProductos(){const w=document.getElementById('catalogo');if(!w)return;w.innerHTML=BOOKS.map(b=>cardHTML(b)).join('')}
function pageProducto(){const cont=document.getElementById('producto');if(!cont)return;const id=Number(new URLSearchParams(location.search).get('id'))||1;const b=bookById(id)||BOOKS[0];cont.innerHTML=`<section class="grid cols-2">
  <div class="card"><img src="${b.img}" alt=""></div>
  <div><h1>${b.title}</h1><p><strong>Autor:</strong> ${b.author}</p><p><strong>Género:</strong> ${b.genre}</p><p><strong>ISBN:</strong> ${b.isbn}</p><p class="subtitle"></p><p><strong style="font-size:1.5rem">${money(b.price)}</strong></p><a class="btn warn" href="#" data-add="${b.id}">Añadir al carrito</a></div>
</section>`;cont.querySelector('[data-add]').onclick=(e)=>{e.preventDefault();addToCart(b.id);alert('Añadido');}}
function pageCarrito(){const tb=document.getElementById('cartBody');const total=document.getElementById('cartTotal');if(!tb||!total)return;const rows=cart().map(i=>{const b=bookById(i.id);const sub=b.price*i.qty;return `<tr><td>${b.title} — ${b.author}</td><td>${money(b.price)}</td><td class="quantity"><button data-dec="${b.id}">-</button><strong>${i.qty}</strong><button data-inc="${b.id}">+</button></td><td>${money(sub)}</td><td><button class="btn" data-del="${b.id}">Quitar</button></td></tr>`});tb.innerHTML=rows.join('')||'<tr><td colspan="5">Tu carrito está vacío.</td></tr>';const tot=cart().reduce((s,i)=>s+bookById(i.id).price*i.qty,0);total.textContent=money(tot);tb.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>{changeQty(Number(b.dataset.inc),+1);pageCarrito()});tb.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>{changeQty(Number(b.dataset.dec),-1);pageCarrito()});tb.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{removeFromCart(Number(b.dataset.del));pageCarrito()})}
function pageLogin(){const f=document.getElementById('formLogin');if(!f)return;f.addEventListener('submit',(e)=>{e.preventDefault();const email=f.email.value.trim(),pass=f.pass.value.trim();const u=users().find(x=>x.email===email&&x.pass===pass);if(!u){alert('Credenciales inválidas');return;}setCurrentUser({name:u.name,email:u.email});location.href='index.html';})}
function pageRegistro(){const f=document.getElementById('formReg');if(!f)return;f.addEventListener('submit',(e)=>{e.preventDefault();const name=f.nombre.value.trim(),email=f.email.value.trim(),pass=f.pass.value.trim();if(!allowedDomains.test(email)){alert('Dominio de correo no permitido');return;}const ok=saveUser({name,email,pass});if(!ok){alert('Ese correo ya existe');return;}alert('Usuario creado. Ahora puedes iniciar sesión.');location.href='login.html';})}
function pageAutor(){const list=document.getElementById('adminBooks');const ulist=document.getElementById('adminUsers');const form=document.getElementById('formBook');if(list){renderAdminBooks();form.addEventListener('submit',(e)=>{e.preventDefault();const b={id:Date.now(),title:form.titulo.value.trim(),author:form.autor.value.trim(),price:Number(form.precio.value||0),isbn:form.isbn.value.trim()||'N/A',img:'img/libro1.jpg',genre:form.genero.value.trim()||'General'};const arr=storage.get('mb_custom_books',[]);arr.push(b);storage.set('mb_custom_books',arr);form.reset();renderAdminBooks();alert('Libro guardado (local)');});}if(ulist){const us=users();ulist.innerHTML=us.map(u=>`<tr><td>${u.name}</td><td>${u.email}</td></tr>`).join('')||'<tr><td colspan="2">Sin usuarios</td></tr>';}function renderAdminBooks(){const custom=storage.get('mb_custom_books',[]);const all=[...BOOKS,...custom];list.innerHTML=all.map(b=>`<tr><td>${b.isbn}</td><td>${b.title}</td><td>${b.author}</td><td>${money(b.price)}</td></tr>`).join('')}}
// iniciar app 
function init(){updateCartBadge();renderHeaderUser();pageIndex();pageProductos();pageProducto();pageCarrito();pageLogin();pageRegistro();pageAutor();document.body.addEventListener('click',(e)=>{const btn=e.target.closest('[data-add-book]');if(btn){addToCart(Number(btn.dataset.addBook));alert('Añadido');e.preventDefault();}})}
document.addEventListener('DOMContentLoaded',init);
