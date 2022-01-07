const commonFetch = data => {
  return fetch(`${data.url}`, {
    method: data.method,
    headers: {
      Accept: 'application/json',
      Authorization: 'authToken',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.data),
  });
};
export default commonFetch;
