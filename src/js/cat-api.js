const options = {
  BASE_URL: 'https://api.thecatapi.com/v1',
  END_POINT_BREEDS: '/breeds',
  END_POINT_IMG: '/images/',
  API_KEY:
    'live_SG6chukU8EBugubL4otSUjuN1o5sFWslgv4YLx7Gm782NeUW5OYBEnbcWOImIoPQ',
};

export function fetchBreeds() {
  return fetch(`${options.BASE_URL}${options.END_POINT_BREEDS}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    }
  );
}

export function fetchCatByBreed() {
  const select = document.querySelector('.breed-select');
  const breedId = select.value;
  return fetch(
    `${options.BASE_URL}${options.END_POINT_IMG}search?breed_ids=${breedId}&api_key=${options.API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
