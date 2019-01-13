<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    /* common css */

    /* css reset */
    * {
        margin: 0;
        padding: 0;
    }

    body {
        background: #fafafa;
    }

    .center {
        margin: 0 auto;
    }

    .width50 {
        width: 50%;
    }
</style>
