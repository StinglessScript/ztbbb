import gql from "graphql-tag";

export const GET_USER_BY_ID = gql`
  query getPersonByPartyId($partyId: String!) {
    getPersonByPartyId(partyId: $partyId) {
      status
      partyId
      fullName
      phone
      address
      gender
      birthDate
      email
      personalTitle
      imageUrl
      identityNumber
      id
    }
  }
`;

export const GET_INVOICE_DETAIL = gql`
  query getInvoiceDetail($invoiceId: String!) {
    getInvoiceDetail(invoiceId: $invoiceId) {
      id
      orderId
      type
      partyIdFrom
      partyIdTo
      status
      invoiceDate
      createdBy
      createdStamp
      paymentId
      originalTotalPrice
      totalVAT
      appliedAmount
    }
  }
`;
export const LOGIN_GG = gql`
  query loginGoogle(
    $redirectUrl: String!
    $orgId: String!
    $type: String!
    $partyId: String
  ) {
    loginGoogle(
      redirectUrl: $redirectUrl
      orgId: $orgId
      type: $type
      partyId: $partyId
    )
  }
`;
export const LOGIN_ZALO = gql`
  query loginZalo(
    $redirectUrl: String!
    $orgId: String!
    $type: String!
    $partyId: String
  ) {
    loginZalo(
      redirectUrl: $redirectUrl
      orgId: $orgId
      type: $type
      partyId: $partyId
    )
  }
`;
export const LOGIN_FB = gql`
  query loginFacebook(
    $redirectUrl: String!
    $orgId: String!
    $type: String!
    $partyId: String
  ) {
    loginFacebook(
      redirectUrl: $redirectUrl
      orgId: $orgId
      type: $type
      partyId: $partyId
    )
  }
`;

export const GET_USER_DETAIL = gql`
  query getUserDetail($orgId: String!, $accessToken: String!) {
    getUserDetail(orgId: $orgId, accessToken: $accessToken) {
      partyId
      orgId
      fullName
      username
      email
      phone
      readyV2
    }
  }
`;
export const GET_USER_DETAIL_SOCIAL = gql`
  query getUserDetailSocial(
    $orgId: String!
    $providerId: String!
    $extAuthId: String!
    $accessToken: String!
  ) {
    getUserDetailSocial(
      orgId: $orgId
      accessToken: $accessToken
      providerId: $providerId
      extAuthId: $extAuthId
    ) {
      partyId
      orgId
      fullName
      userName
      email
    }
  }
`;

export const GET_PAYMENT_IDS = gql`
  query getPaymentMethodOfStoreChannel(
    $orgId: String!
    $storeChannelId: String!
  ) {
    getPaymentMethodOfStoreChannel(
      orgId: $orgId
      storeChannelId: $storeChannelId
    )
  }
`;
export const GET_PAYMENTS = gql`
  query getPaymentMethod($orgId: String!, $storeChannelId: String!) {
    getPaymentMethod(orgId: $orgId, storeChannelId: $storeChannelId) {
      id
      code
      name
      image
      description
    }
  }
`;

export const GET_ORDER_DETAIL = gql`
  query getOrderDetail($orderId: String!) {
    orderDetail(orderId: $orderId) {
      order {
        financialStatus
        orderStatus
        ownerName
        ownerEmail
        ownerPhone
        orderId
        id
        createdAt
        currentTotalPrice {
          amount
          currencyCode
        }
      }
      lineItems {
        orderLineItem {
          unitType
          customAttributes {
            key
            value
          }
          id
          orderItemId
          quantity
          totalVAT {
            amount
            currencyCode
          }
          variant {
            id
            price {
              amount
              currencyCode
            }
            product {
              id
              title
            }
            title
            unitPrice {
              amount
              currencyCode
            }
          }
          productOptions {
            idOption
            name
            value
            title
          }
        }
      }
    }
  }
`;

export const GET_PRICE_FOR_PRODUCT_OPTION = gql`
  query getPriceForProductOption(
    $partnerId: String!
    $storeChannel: String!
    $productParentId: String!
    $productOptionGroupItemDTOS: [ProductOptionGroupItemInput]
  ) {
    getPriceForProductOption(
      partnerId: $partnerId
      storeChannel: $storeChannel
      productParentId: $productParentId
      productOptionGroupItemDTOS: $productOptionGroupItemDTOS
    )
  }
`;
export const GET_PRICE_FOR_PRODUCT_OPTION_AND_PLAN = gql`
  query getPriceForProductOptionAndPricePlan(
    $partnerId: String!
    $storeChannel: String!
    $productParentIds: [String!]!
  ) {
    getPriceForProductOptionAndPricePlan(
      partnerId: $partnerId
      storeChannel: $storeChannel
      productParentIds: $productParentIds
    ) {
      productId
      price
      priceInstallment
      loanTenure
      firstMonth
      nextMonth
    }
  }
`;
export const GET_PRICE_PLAN = gql`
  query getPricePlans(
    $partnerId: String!
    $storeChannel: String!
    $productId: String!
  ) {
    getPricePlans(
      partnerId: $partnerId
      storeChannel: $storeChannel
      productId: $productId
    ) {
      id
      interestRate
      loanTenure
      firstPaymentPercent
      monthlyInterestRate
    }
  }
`;
export const GET_PRICE_INSTALLMENT = gql`
  query getPriceInstallment(
    $partnerId: String!
    $storeId: String!
    $productBareId: String!
    $productCollId: String!
    $pricePlanId: String!
  ) {
    getPriceInstallment(
      partnerId: $partnerId
      storeId: $storeId
      productBareId: $productBareId
      productCollId: $productCollId
      pricePlanId: $pricePlanId
    ) {
      firstMonthBare
      firstMonthColl
      firstMonthVat
      firstMonthTotal
      nextMonthBare
      nextMonthColl
      nextMonthVat
      nextMonthTotal
      totalPrice
    }
  }
`;
