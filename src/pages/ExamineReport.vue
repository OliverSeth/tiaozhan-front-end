<template style="padding-left: 217px">
    <div id="clothExamine" :style="bg" style="background-size: cover">
        <div style="position: absolute;right: 15%;bottom: 34%">
            <router-link to="device-control">上海</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExamineReport",
        data(){
            return{
                bg:{
                    background:'url('+require('../assets/map.jpg')+')no-repeat',
                    // backgroundsize:
                }
            }
        }
    }

</script>

<style scoped>

    #clothExamine{
        width: 70%;
        height: 88%;
        position: absolute;

        /*padding: 0;*/
        /*margin: 0;*/
    }
</style>