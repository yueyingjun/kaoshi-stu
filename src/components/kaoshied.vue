<template>

    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="back($event)"></a>
            <h1 class="mui-title">已考成绩</h1>
        </header>

        <div class="mui-content">

            <ul class="mui-table-view">
                <router-link class="mui-table-view-cell" v-for="(item,key) in datas" tag="li" :to="'/kaoshiedInfo/'+item.zutiid" :key="key">
                     <span class="mui-navigate-right" >
                        {{item.tname}}
                    </span>
                </router-link>



            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "kaoshied",
        data(){
            return {
                datas:[]
            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            }
        },
        mounted(){
            fetch("/api/stukaoshi/kaoshied?sid="+JSON.parse(sessionStorage.stuLogin).id).then(function (e) {
                return e.json();
            }).then((e)=>{
                    this.datas=e;
            })

        }
    }
</script>

<style scoped>

</style>