const api = {}

if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === 'forms-qa.htg.cl'
) {
  //api.url = 'https://api-docs-qa.gesintel.cl/api'
  api.url = 'http://localhost:5000/api'
} else {
  api.url = 'https://api.formularia.net/api'
}
export default api
