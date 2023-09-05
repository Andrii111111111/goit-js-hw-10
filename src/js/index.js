import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const loader = document.querySelector('.loader');
const select = document.querySelector('.breed-select');
const fotoDiv = document.querySelector('.cat-info');
const load = document.querySelector('.load');
select.setAttribute('id', 'selectElement');
select.classList.add('is-hidden');

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

fetchBreeds()
  .then(response => {
    Notiflix.Notify.info('Loading data, please wait...', {
      timeout: 500,
    });
    select.classList.remove('is-hidden');
    select.insertAdjacentHTML('afterbegin', createMarkup(response));
    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(error => {
    Notiflix.Notify.warning(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

select.addEventListener('change', changeBreeds);
function changeBreeds() {
  loader.classList.remove('is-hidden');
  fotoDiv.classList.add('is-hidden');

  fetchCatByBreed()
    .then(data => {
      loader.classList.add('is-hidden');
      fotoDiv.classList.remove('is-hidden');
      Notiflix.Notify.info('Loading data, please wait...', {
        timeout: 1000,
      });
      fotoDiv.innerHTML = createMarkupInfo(data);
    })
    .catch(error => {
      select.classList.add('is-hidden');
      loader.classList.add('is-hidden');
      Notiflix.Notify.warning(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function createMarkupInfo(arr) {
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
