let id;
const select = document.querySelector('.breed-select');
const fotoDiv = document.querySelector('.cat-info');
// const selectElement = document.querySelector('.breed-select');
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
function createMarkup2(arr) {
  return arr
    .map(
      ({ url }) => `<img src="${url}" alt=" " width="300" height="300"></img>`
    )
    .join('');
}

function createMarkup3(arr) {
  return arr
    .map(
      ({ description, name, temperament, id }) => `
      <div class="text">
  <h2>${name}</h2>
  <p>${description}</p>
  <p>${temperament}</p>
</div>`
    )
    .join('');
}

select.addEventListener('change', currentCats);

function currentCats(evt) {
  const breed = select.value;
  // console.log(breed);
  // console.log(fetch);
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
      console.log(data);
      fotoDiv.insertAdjacentHTML('afterbegin', createMarkup2(data));
      fotoDiv.insertAdjacentHTML('afterbegin', createMarkup3(data));
    });
}
