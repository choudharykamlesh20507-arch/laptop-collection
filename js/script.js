function allItems(){ return [...carData, ...laptopData]; }

const grids = {
  cars: document.getElementById("carGrid"),
  laptops: document.getElementById("laptopGrid"),
  places: document.getElementById("placeGrid"),
  wishlist: document.getElementById("wishlistGrid")
};

function getWishlist(){ return JSON.parse(localStorage.getItem("autotechWishlist") || "[]"); }
function setWishlist(list){ localStorage.setItem("autotechWishlist", JSON.stringify(list)); updateWishlistCount(); }

function updateWishlistCount(){
  const el=document.getElementById("wishCount");
  if(el) el.textContent=getWishlist().length;
}

function toggleWishlist(id){
  let list=getWishlist();
  if(list.includes(id)) list=list.filter(x=>x!==id); else list.push(id);
  setWishlist(list);
  renderHomeCards();
  renderWishlist();
}

function card(item){
  const saved=getWishlist().includes(item.id);
  return `<article class="product-card">
    <div class="product-image"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="image-tag">${item.label}</span></div>
    <div class="product-body">
      <div class="card-top"><span class="tag">${item.type === "car" ? "CAR" : "LAPTOP"}</span><button class="heart ${saved ? "saved":""}" onclick="toggleWishlist('${item.id}')" aria-label="Wishlist">${saved ? "♥":"♡"}</button></div>
      <h3>${item.name}</h3><p>${item.description}</p>
      <div class="spec-list">${item.specs.map(s=>`<span>✓ ${s}</span>`).join("")}</div>
      <button class="details-btn" onclick="openItem('${item.id}')">View Details →</button>
    </div>
  </article>`;
}

function renderHomeCards(){
  if(grids.cars) grids.cars.innerHTML=carData.slice(0,3).map(card).join("");
  if(grids.laptops) grids.laptops.innerHTML=laptopData.slice(0,3).map(card).join("");
}

function renderPlaces(){
  if(!grids.places) return;
  grids.places.innerHTML=placeData.map(p=>`<article class="place-card">
    <img src="${p.image}" alt="${p.name}" loading="lazy">
    <div class="place-content"><span class="eyebrow">${p.country}</span><h3>${p.name}</h3><p>${p.description}</p>
    <h4>Things you can do</h4><ul>${p.things.map(x=>`<li>${x}</li>`).join("")}</ul></div>
  </article>`).join("");
}

function renderWishlist(){
  if(!grids.wishlist) return;
  const items=allItems().filter(x=>getWishlist().includes(x.id));
  const empty=document.getElementById("emptyWishlist");
  grids.wishlist.innerHTML=items.map(card).join("");
  if(empty) empty.style.display=items.length ? "none":"block";
}

function openItem(id){
  const item=allItems().find(x=>x.id===id);
  if(!item) return;
  const modal=document.createElement("div");
  modal.className="detail-modal";
  modal.innerHTML=`<div class="detail-panel"><button class="close-detail" onclick="this.closest('.detail-modal').remove()">×</button>
  <img src="${item.image}" alt="${item.name}"><div class="detail-copy"><span class="eyebrow">${item.type}</span><h2>${item.name}</h2><p>${item.description}</p><h4>Key features</h4><ul>${item.specs.map(s=>`<li>${s}</li>`).join("")}</ul><button class="btn btn-primary" onclick="toggleWishlist('${item.id}'); this.textContent=getWishlist().includes('${item.id}')?'♥ Saved':'♡ Add to Wishlist';">${getWishlist().includes(item.id)?"♥ Saved":"♡ Add to Wishlist"}</button></div></div>`;
  document.body.appendChild(modal);
}

function applyFilter(group, value){
  const source=group==="cars"?carData:laptopData;
  const grid=group==="cars"?grids.cars:grids.laptops;
  if(!grid) return;
  const result=value==="all"?source:source.filter(x=>x.category===value);
  grid.innerHTML=result.map(card).join("");
}

document.querySelectorAll(".filter-row").forEach(row=>{
  row.querySelectorAll(".filter").forEach(btn=>{
    btn.addEventListener("click",()=>{
      row.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(row.dataset.filterGroup, btn.dataset.filter);
    });
  });
});

const themeBtn=document.getElementById("themeBtn");
if(localStorage.getItem("autotechTheme")==="dark") document.body.classList.add("dark");
if(themeBtn) themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("autotechTheme",document.body.classList.contains("dark")?"dark":"light");
});

const menuToggle=document.getElementById("menuToggle"), nav=document.getElementById("mainNav");
if(menuToggle) menuToggle.addEventListener("click",()=>nav.classList.toggle("open"));

const newsletter=document.getElementById("newsletterForm");
if(newsletter) newsletter.addEventListener("submit",e=>{
  e.preventDefault();
  const email=document.getElementById("newsletterEmail").value.trim();
  const msg=document.getElementById("newsletterMsg");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){msg.textContent="Please enter a valid email.";msg.className="error";return;}
  msg.textContent="✓ Subscription successful (frontend demo).";msg.className="success";newsletter.reset();
});

renderHomeCards(); renderPlaces(); renderWishlist(); updateWishlistCount();
