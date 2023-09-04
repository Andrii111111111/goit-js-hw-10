import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, options } from './cat-api';

const loader = document.querySelector('.loader');
const select = document.querySelector('.breed-select');
const fotoDiv = document.querySelector('.cat-info');
const load = document.querySelector('.load');
select.setAttribute('id', 'selectElement');

// const options = {
//   BASE_URL: 'https://api.thecatapi.com/v1',
//   END_POINT_BREEDS: '/breeds',
//   END_POINT_IMG: '/images/',
//   API_KEY:
//     'live_SG6chukU8EBugubL4otSUjuN1o5sFWslgv4YLx7Gm782NeUW5OYBEnbcWOImIoPQ',
// };

// function fetchBreeds() {
//   fetch(`${options.BASE_URL}${options.END_POINT_BREEDS}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }

//       return response.json();
//     })

//     .then(response => {
//       select.insertAdjacentHTML('afterbegin', createMarkup(response));
//       new SlimSelect({
//         select: '#selectElement',
//       });
//     })
//     .catch(error => {
//       Notiflix.Notify.warning(
//         'Oops! Something went wrong! Try reloading the page!'
//       );
//     })
//     .finally(() => {
//       Notiflix.Notify.info('Loading data, please wait...');
//     });
// }

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

fetchBreeds()
  .then(response => {
    select.insertAdjacentHTML('afterbegin', createMarkup(response));
    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(error => {
    Notiflix.Notify.warning(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    Notiflix.Notify.info('Loading data, please wait...');
  });

select.addEventListener('change', fetchCatByBreed);

function fetchCatByBreed() {
  const breedId = select.value;
  loader.classList.remove('is-hidden');
  fotoDiv.classList.add('is-hidden');

  return fetch(
    `${options.BASE_URL}${options.END_POINT_IMG}search?breed_ids=${breedId}&api_key=${options.API_KEY}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(data => {
      fotoDiv.innerHTML = createMarkup3(data);
    })
    .catch(error => {
      Notiflix.Notify.warning(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      Notiflix.Notify.info('Loading data, please wait...');
      loader.classList.add('is-hidden');
      fotoDiv.classList.remove('is-hidden');
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
    <p><h3 class="s">Temperament: </h3>${breeds.map(
      item => item.temperament
    )}</p>
  </div>`
    )
    .join('');
}

// styles
load.style.textAlign = 'center';
fotoDiv.style.display = 'flex';
fotoDiv.style.gap = '15px';
fotoDiv.style.marginTop = '15px';
