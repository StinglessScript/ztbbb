import { createHttpLink, from } from '@apollo/client/core'

export default function () {


  const httpEndpoint = process.env.ORDER_API_URL

  const httpLink = createHttpLink({
    uri: httpEndpoint,
   
  })
  return {
    link: from([httpLink]),
    defaultHttpLink: false,
  }
}
