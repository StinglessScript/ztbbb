import { createHttpLink, from } from '@apollo/client/core'
import { crmApiUrl } from '~/constants/urlApi'

export default function () {


  const httpEndpoint = process.env.CRM_API_URL

  const httpLink = createHttpLink({
    uri: httpEndpoint,
   
  })
  return {
    link: from([httpLink]),
    defaultHttpLink: false,
  }
}
