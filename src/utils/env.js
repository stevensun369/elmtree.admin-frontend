const env = 'dev'
let apiURL = ''

if (env === 'dev') {
  apiURL = 'http://192.168.0.25:2000'
} else if (env === 'prod') {
  apiURL = 'https://admin.elmtreeapi.xyz'
}

export { apiURL }
