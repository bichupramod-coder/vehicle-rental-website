const money=n=>'₹'+Number(n).toLocaleString('en-IN');
const wa=msg=>`https://wa.me/${RENTAL_WHATSAPP}?text=${encodeURIComponent(msg)}`;
const card=v=>`<article class="card"><a href="vehicle-details.html?id=${v.id}"><img src="${v.image}" alt="${v.name}" loading="lazy"></a><div class="cardbody"><small>${v.category} · ${v.seats}</small><h3>${v.name}</h3><div class="cardfoot"><b>${money(v.price)} <small>/ day</small></b><a href="vehicle-details.html?id=${v.id}">Details →</a></div></div></article>`;
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('#menu'),nav=document.querySelector('#nav');menu?.addEventListener('click',()=>nav.classList.toggle('open'));
 const featured=document.querySelector('#featured');if(featured)featured.innerHTML=vehicles.slice(0,3).map(card).join('');
 const all=document.querySelector('#all'),search=document.querySelector('#search'),category=document.querySelector('#category');
 function render(){if(!all)return;const term=(search?.value||'').toLowerCase(),cat=category?.value||'all';const list=vehicles.filter(v=>(cat==='all'||v.category===cat)&&`${v.name} ${v.category} ${v.fuel}`.toLowerCase().includes(term));all.innerHTML=list.length?list.map(card).join(''):'<p>No matching vehicles found.</p>';document.querySelector('#count').textContent=`${list.length} vehicle(s) listed`;}
 if(all){search.addEventListener('input',render);category.addEventListener('change',render);render();}
 const detail=document.querySelector('#detail');if(detail){const id=new URLSearchParams(location.search).get('id'),v=vehicles.find(x=>x.id===id)||vehicles[0];detail.innerHTML=`<a href="vehicles.html">← All vehicles</a><div class="detail"><img src="${v.image}" alt="${v.name}"><div><small>${v.category} · ${v.seats} · ${v.fuel}</small><h1>${v.name}</h1><h2>${money(v.price)} <small>/ day</small></h2><a class="button" target="_blank" rel="noopener" href="${wa('Hello, I am interested in '+v.name+'. Please confirm availability and final rental price.')}">Enquire on WhatsApp</a><h3>Rental conditions</h3><ul>${v.conditions.map(c=>`<li>${c}</li>`).join('')}</ul><p><small>Sample terms only. Confirm actual terms with the rental business before publishing.</small></p></div></div>`;}
 const select=document.querySelector('#vehicle');if(select)vehicles.forEach(v=>select.add(new Option(v.name,v.name)));
 const waLink=document.querySelector('#wa');if(waLink)waLink.href=wa('Hello, I would like to enquire about vehicle rentals.');
 document.querySelector('#form')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target);const msg=`Rental enquiry\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nVehicle: ${d.get('vehicle')}\nMessage: ${d.get('message')}`;window.open(wa(msg),'_blank','noopener');});
});
