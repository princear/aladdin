// const baseUrl = 'http://3.26.216.78/api/';
const baseUrl = 'https://aladdin.com.iq/api';

export default function API(variables, method, apiMethod, Authorization, formdata) {
  var init =
    apiMethod === 'GET'
      ? {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Authorization ? 'token ' + Authorization : '',
        },
      }
      : formdata == true
        ? {
          method: apiMethod,
          headers: {
            Authorization: Authorization ? 'token ' + Authorization : '',
          },
          body: variables,
        }
        : {
          method: apiMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: Authorization ? 'token ' + Authorization : '',
            Accept: 'application/json',
          },
          body: JSON.stringify(variables),
        };

  return fetch(baseUrl + method, init)
    .then((res) =>
      res.json().then((data) => {
        var apiData = {
          status: res.status,
          data: data,
        };

        return apiData;
      }),
    )
    .catch((err) => {

      var apiData = {
        status: 900,
        data: 'Server not responding. Please try again after some times.',
      };
      return apiData;
    });
}
