<template>
    <div>
        <PageTitle pageTitle="Checkout" />
        <Checkout />
    </div>
</template>

<script>
import PageTitle from '../components/Common/PageTitle'
import Checkout from '../components/Checkout/Checkout'

export default {
    components: {
        PageTitle,
        Checkout,
    }
}
</script>