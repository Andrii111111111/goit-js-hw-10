// import SlimSelect from 'slim-select';
// new SlimSelect({
//   select: '#selectElement',
//   // settings: {
//   //   contentPosition: 'relative',
//   //   contentLocation: document.getElementById('local'),
//   // },
// });

const select = document.querySelector('.breed-select');
const fotoDiv = document.querySelector('.cat-info');
const spanStyle = document.querySelector('.span');

const options = {
  method: 'GET',
  api_key:
    'live_SG6chukU8EBugubL4otSUjuN1o5sFWslgv4YLx7Gm782NeUW5OYBEnbcWOImIoPQ',
  breed_ids: select.value,
};
fetch('https://api.thecatapi.com/v1/breeds')
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  })

  .then(data => {
    select.insertAdjacentHTML('afterbegin', createMarkup(data));
  })
  .catch(err => {
    console.log(err);
  });

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', currentCats);

function currentCats(evt) {
  const breed = select.value;
  fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&api_key=live_SG6chukU8EBugubL4otSUjuN1o5sFWslgv4YLx7Gm782NeUW5OYBEnbcWOImIoPQ`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(data => {
      fotoDiv.innerHTML = createMarkup3(data);
    });
}

function createMarkup3(arr) {
  return arr
    .map(
      ({ breeds, url }) => `
      <img src="${url}" alt=" " height="300"></img>
        <div class="text">
    <h2>${breeds.map(item => item.name)}</h2>
    <p>${breeds.map(item => item.description)}</p>
    <p><span class="span">Temperament: </span>${breeds.map(
      item => item.temperament
    )}</p>
  </div>`
    )
    .join('');
}

select.setAttribute('id', 'selectElement');

// styles

fotoDiv.style.display = 'flex';
fotoDiv.style.gap = '15px';
fotoDiv.style.marginTop = '15px';
// spanStyle.style.fontWeight = '600';
