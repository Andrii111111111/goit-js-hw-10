import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_SG6chukU8EBugubL4otSUjuN1o5sFWslgv4YLx7Gm782NeUW5OYBEnbcWOImIoPQ';

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
    console.log(data[0].id);
    console.log(data[0].name);
    console.log(data.length);
    console.log();
  })
  .catch(err => {
    console.log(err);
  });
