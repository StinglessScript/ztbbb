<template>
    <!-- Start Preloader Area -->
    <div class="preloader">
        <div class="logo"></div>
        <div class="nb-spinner"></div>

    </div>
    <!-- End Preloader Area -->
</template>

<script>
export default {
    middleware: ["checkAuth", "middlewareHeader"],
    name: 'PreLoader'
}
</script>