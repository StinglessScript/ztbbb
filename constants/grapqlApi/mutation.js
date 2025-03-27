import gql from "graphql-tag";
export const CREATE_PRODUCT_ID = gql`
  mutation createProductBare(
    $partnerId: String!
    $storeChannel: String!
    $createBy: String!
    $productParentId: String!
    $productOptionGroupItems: [ProductOptionGroupItemInput]!
  ) {
    createProductBare(
      partnerId: $partnerId
      storeChannel: $storeChannel
      createBy: $createBy
      productParentId: $productParentId
      productOptionGroupItems: $productOptionGroupItems
    ) {
      id
    }
  }
`;

export const CREATE_CONNECTOR = gql`
  mutation createConnector(
    $createRequest: CreateConnectorRequest
    $updateBy: String!
  ) {
    createConnector(createRequest: $createRequest, updateBy: $updateBy)
  }
`;

export const UPDATE_INFO = gql`
  mutation updateInfo(
    $orgId: String!
    $accessToken: String!
    $type: String
    $password: String!
    $updateUserRequest: UpdateUserRequest
  ) {
    updateInfo(
      orgId: $orgId
      accessToken: $accessToken
      type: $type
      password: $password
      updateUserRequest: $updateUserRequest
    ) {
      partyId
      fullName
      email
      phone
      address
      identityNumber
      gender
      birthDate
      avatarUrl
    }
  }
`;
export const SEND_TICKED = gql`
  mutation addOpportunity(
    $partyId: String!
    $performerId: String!
    $addOpportunityRequest: AddOpportunityRequest
  ) {
    addOpportunity(
      partyId: $partyId
      performerId: $performerId
      addOpportunityRequest: $addOpportunityRequest
    ) {
      ownerId
      id
      status
    }
  }
`;
export const CREATE_PAYMENT = gql`
  mutation createPayment(
    $orgId: String!
    $orderId: String!
    $paymentMethod: String!
    $storeChannel: String!
    $source: String
    $returnUrl: String
    $createBy: String
  ) {
    createPayment(
      orgId: $orgId
      orderId: $orderId
      paymentMethod: $paymentMethod
      storeChannel: $storeChannel
      source: $source
      returnUrl: $returnUrl
      createBy: $createBy
    ) {
      code
      message
      data
      qrCodeUrl
      deeplink
      deeplinkMiniApp
      invoiceId
      orderId
    }
  }
`;

export const CREATE_PAYMENT_ORDER = gql`
  mutation createPaymentOrder(
    $orgId: String!
    $orderId: String!
    $paymentMethod: String!
    $storeId: String!
    $source: String!
    $returnUrl: String
    $createBy: String
  ) {
    createPaymentOrder(
      orgId: $orgId
      orderId: $orderId
      paymentMethod: $paymentMethod
      storeId: $storeId
      source: $source
      returnUrl: $returnUrl
      createBy: $createBy
    ) {
      code
      message
      data
      qrCodeUrl
      deeplink
      deeplinkMiniApp
      invoiceId
      orderId
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      currencyCode
      currentSubtotalPrice {
        amount
        currencyCode
      }
      currentTotalDuties {
        amount
        currencyCode
      }
      currentTotalPrice {
        amount
        currencyCode
      }
      currentTotalTax {
        amount
        currencyCode
      }
      edited
      financialStatus
      fulfillmentStatus
      orderStatus
      id
      partnerId
      ownerName
      ownerEmail
      ownerPhone
      orderNumber
      originalTotalDuties {
        amount
        currencyCode
      }
      originalTotalPrice {
        amount
        currencyCode
      }
      shippingAddress {
        address1
        address2
        city
        company
        country
        countryCode
        firstName
        formattedArea
        id
        lastName
        latitude
        longitude
        name
        phone
        province
        provinceCode
        zip
      }
      subtotalPrice {
        amount
        currencyCode
      }
      totalPrice {
        amount
        currencyCode
      }
      totalRefunded {
        amount
        currencyCode
      }
      totalShippingPrice {
        amount
        currencyCode
      }
      totalTax {
        amount
        currencyCode
      }
      discountTotalPrice {
        amount
        currencyCode
      }
      cod {
        amount
        currencyCode
      }
      orderId
      note
      pending
      shopId
      shippingServiceId
      carrierId
      fromOrderId
      externalCode
      createdAt
      createdBy
      ownerPartyId
      customerLocale
      orderParentId
      totalVAT {
        amount
        currencyCode
      }
      shopName
      version
      discountApplications {
        allocationMethod
        targetSelection
        targetType
        title
      }
    }
  }
`;
export const UPDATE_PRODUCT_OPTION_ORDER_LINE_ITEM = gql`
  mutation UpdateProductOptionOrderLineItem(
    $orderLineItemId: String!
    $productOptionUpdate: [ProductOptionInput]!
    $updateBy: String!
  ){
    updateProductOptionOrderLineItem(
      orderLineItemId: $orderLineItemId
      productOptionUpdate: $productOptionUpdate
      updateBy: $updateBy
    )
  }
`;