const env = 'dev'
let apiURL = ''

if (env === 'dev') {
  apiURL = 'http://localhost:1000'
} else if (env === 'prod') {
  apiURL = 'https://admin.elmtreeapi.xyz'
}

export { apiURL }
