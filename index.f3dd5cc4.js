!function(){var n=document.querySelector(".breed-select"),t=document.querySelector(".cat-info"),e={method:"GET"};fetch("https://api.thecatapi.com/v1/breeds",e).then((function(n){if(!n.ok)throw new Error(n.statusText);return n.json()})).then((function(e){n.insertAdjacentHTML("afterbegin",e.map((function(n){var t=n.id,e=n.name;return'<option value="'.concat(t,'">').concat(e,"</option>")})).join("")),n.addEventListener("change",(function(n){t.insertAdjacentHTML("afterbegin",function(n){return n.map((function(n){var t=n.description,e=n.name,c=n.temperament;return'\n      <div class="text">\n  <h2>'.concat(e,"</h2>\n  <p>").concat(t,"</p>\n  <p>").concat(c,"</p>\n</div>")})).join("")}(e))}))})).catch((function(n){console.log(n)})),n.addEventListener("change",(function(c){var o=n.value;fetch("https://api.thecatapi.com/v1/images/search?breed_ids=".concat(o),e).then((function(n){if(!n.ok)throw new Error(n.statusText);return n.json()})).then((function(n){console.log(n),t.insertAdjacentHTML("afterbegin",n.map((function(n){var t=n.url;return'<img src="'.concat(t,'" alt=" " width="300" height="300"></img>')})).join(""))}))}))}();
//# sourceMappingURL=index.f3dd5cc4.js.map
