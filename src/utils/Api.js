import axios from 'axios'

export const baseURL = 'https://parseapi.back4app.com/'

// export const httpClient = axios.create({
//    baseURL: 'https://parseapi.back4app.com/',
//    headers: {
//       'Content-Type': `application/json`,
//       'X-Parse-Application-Id': `7cdnhxJBYIErK7x5gqPsyqBSm1YL2OdSvaKByqgU`,
//       'X-Parse-Application-Id': `7cdnhxJBYIErK7x5gqPsyqBSm1YL2OdSvaKByqgU`,
//    },
// })

axios.defaults.headers.common['Content-Type'] = `application/json`
axios.defaults.headers.common[
   'X-Parse-Application-Id'
] = `7cdnhxJBYIErK7x5gqPsyqBSm1YL2OdSvaKByqgU`
axios.defaults.headers.common[
   'X-Parse-REST-API-Key'
] = `rmDlTBlUy8cCwMm5xIjQ4kFKFcEfehK0TmAEq6cS`
axios.defaults.headers.common['X-Parse-Revocable-Session'] = 1

export const httpClient = {
   get: (url, params = {}) => axios.get(`${baseURL}${url}`, { params }),
   post: (url, body = {}) => axios.post(`${baseURL}${url}`, body),
   put: (url, body = {}) => axios.put(`${baseURL}${url}`, body),
   del: (url, body) => axios.delete(`${baseURL}${url}`, body),
}

export const setTokenOnHeader = (token) => {
   axios.defaults.headers.common['X-Parse-Session-Token'] = token
}
