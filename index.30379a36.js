const e=document.querySelector(".breed-select"),t=document.querySelector(".cat-info"),n={method:"GET"};fetch("https://api.thecatapi.com/v1/breeds",n).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).then((t=>{e.insertAdjacentHTML("afterbegin",t.map((({id:e,name:t,description:n})=>`<option value="${e}">${t}</option>`)).join(""))})).catch((e=>{console.log(e)})),e.addEventListener("click",(function(o){const r=e.value;fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${r}`,n).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).then((e=>{t.innerHTML("beforeend",e.map((({url:e})=>`<img src="${e}" alt=" "></img>`)).join(""))}))}));
//# sourceMappingURL=index.30379a36.js.map
