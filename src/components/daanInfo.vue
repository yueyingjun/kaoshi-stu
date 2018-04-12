<template>
     <div>
         <header class="mui-bar mui-bar-nav">
             <a class="mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="back($event)"></a>
             <h1 class="mui-title">答案</h1>
         </header>
         <div class="mui-content">

             <div>
                 {{result}}
             </div>
         </div>
     </div>
</template>

<script>
    export default {
        name: "daan-info",
        methods:{
            back(){
                this.$router.go(-1);
            }
        },
        data(){
            return {
                result:""
            }
        },
        mounted(){
            fetch("/api/stukaoshi/daanInfo?id="+this.$route.params.id).then(function (e) {
                return e.text();
            }).then((e)=>{
                this.result=e
            })
        }

    }
</script>

<style scoped>

</style>