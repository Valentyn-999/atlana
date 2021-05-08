import axios from "axios";


export const github_data = {
    "token": "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",
    "username": "Valentyn-999"
}

const instance = axios.create({
    baseURL: 'https://api.github.com/',
})

// const body = {
//     "query": `
//         query {
//           viewer {
//             repositories(isFork: false) {
//               totalCount
//             }
//           }
//         }
//     `
// }
const body = {
    "query": `
        query {
          user {
            repositories(isFork: false) {
              totalCount
            }
          }
        }
    `
}
