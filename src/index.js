// const BASE_URL = `https://api.thecatapi.com/v1`;
// const END_POINT = '/images/';
// const API_KEY =
//   'live_SG6chukU8EBugubL4otSUjuN1o5sFWslgv4YLx7Gm782NeUW5OYBEnbcWOImIoPQ';

// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_SG6chukU8EBugubL4otSUjuN1o5sFWslgv4YLx7Gm782NeUW5OYBEnbcWOImIoPQ';
let id;
const select = document.querySelector('.breed-select');
const fotoDiv = document.querySelector('.cat-info');
const options = {
  method: 'GET',
};
fetch('https://api.thecatapi.com/v1/breeds', options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  })

  .then(data => {
    select.insertAdjacentHTML('afterbegin', createMarkup(data));

    // let id = data.map(el => el.id);
    // const name = data.map(el => el.name);
    // const select = document.querySelector('.breed-select');
    // for (let i = 0; i < name.length; i += 1) {
    //   select.innerHTML = `<option value="">${i}</option>`;
    //   console.log(i);
    // }
    // for (let i = 0; i < id.length; i += 1) {
    //   select.insertAdjacentHTML = `<option value="${i}"></option>`;
    // }
  })
  .catch(err => {
    console.log(err);
  });

function createMarkup(arr) {
  return arr
    .map(
      ({ id, name, description }) => `<option value="${id}">${name}</option>`
    )
    .join('');
}
function createMarkup2(arr) {
  return arr.map(({ url }) => `<img src="${url}" alt=" "></img>`).join('');
}

select.addEventListener('click', currentCats);

function currentCats(evt) {
  const breed = select.value;
  fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`,
    options
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(data => {
      fotoDiv.innerHTML('beforeend', createMarkup2(data));
    });
}
// const searchParams = new URLSearchParams({
//   id: 'abys',
//   appid: API_KEY,
// });

// export function getCurrentWeather(id) {
//   console.log(fetch(`${BASE_URL}${END_POINT}?${searchParams}`));
//   return fetch(`${BASE_URL}${END_POINT}?${searchParams}`)
//     .then(responce => {
//       if (!responce.ok) {
//         throw new Error(responce.status);
//       }

//       return responce.json();
//     })

//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
// getCurrentWeather();
