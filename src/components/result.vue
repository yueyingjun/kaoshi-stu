<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="back($event)"></a>
            <h1 class="mui-title">成绩</h1>
        </header>

        <div class="mui-content">

            考试结束

            选择题成绩为:<br>

            {{score}}

        </div>


    </div>
</template>

<script>
    export default {
        name: "result",
        back(){
            this.$router.go(-1);
        },
        data(){
            return {
                score:this.$route.query.score
            }
        }
    }
</script>

<style scoped>

</style>