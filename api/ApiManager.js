import commonFetch from './CommonFetch';
export function getGifs(limit) {
  return new Promise((success, failure) => {
    commonFetch({
      url: `https://api.giphy.com/v1/gifs/trending?api_key=BSREPLVBMNe6zApv2KDYovt03Pe2rsoj&limit=${limit}&rating=g`,
      // data: data,
      method: 'GET',
    })
      .then(res => {
        res.json().then(result => {
          success(result);
        });
      })
      .catch(err => {
        failure(err);
      });
  });
}

export function getSearchResults(keyword, limit) {
  return new Promise((success, failure) => {
    commonFetch({
      url: `https://api.giphy.com/v1/gifs/search?api_key=BSREPLVBMNe6zApv2KDYovt03Pe2rsoj&q=${keyword}&limit=${limit}&offset=0&rating=g&lang=en`,
      method: 'GET',
    })
      .then(res => {
        res.json().then(result => {
          success(result);
        });
      })
      .catch(err => {
        failure(err);
      });
  });
}
