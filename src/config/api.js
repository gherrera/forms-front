const api = {}

if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === 'forms-qa.htg.cl'
) {
  //api.url = 'https://api-docs-qa.gesintel.cl/api'
  api.url = 'http://127.0.0.1:5000/api'
} else {
  api.url = 'https://api.formularia.net/api'
}
export default api
