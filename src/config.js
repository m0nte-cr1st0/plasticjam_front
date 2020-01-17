
let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
   baseUrl = 'https://plastickjambackend.herokuapp.com/api/v1/users/';
} else {
   baseUrl = 'http://127.0.0.1:8000/api/v1/users/';
}

export const apiHost = baseUrl
