const params=new URLSearchParams(location.search), type=params.get("type");
const title=document.getElementById("categoryTitle"), desc=document.getElementById("categoryDescription"), grid=document.getElementById("categoryGrid");
let data=[];
if(type==="cars"){data=carData;title.textContent="Famous Car Models";desc.textContent="Explore sports, luxury and electric cars.";}
else if(type==="laptops"){data=laptopData;title.textContent="Popular Laptop Models";desc.textContent="Explore laptops for students, gamers and creators.";}
else {data=[...carData,...laptopData];}
grid.innerHTML=data.map(card).join(""); updateWishlistCount();
