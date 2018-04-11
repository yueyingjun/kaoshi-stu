<template>
    <div>
    <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="back($event)"></a>
        <h1 class="mui-title">待考项目</h1>
    </header>

        <div class="mui-content">

            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="item in datas">
                    <span class="mui-navigate-right" @click="go(item)">
                        {{item.teachname}}<br>

                        考试时间<br>

                        <time>（{{item.start}}-{{item.end}}）</time>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "kaoshi",
        methods:{
            back(e){
                this.$router.go(-1);
            },
            go(item){
                var start=new Date(item.start).getTime();
                var end=new Date(item.end).getTime();
                var nowtime=new Date().getTime();
                if(nowtime>start && nowtime<end) {
                    this.$router.push("/view?id="+item.id)
                }else{
                    alert("请等待开考时间");
                }
            }
        },
        data(){
            return {
                datas:[]
            }
        },
        mounted(){
            fetch("/api/stukaoshi/kaoshi?cid="+JSON.parse(sessionStorage.stuLogin).cid).then(function (e) {
                return e.json();
            }).then((e)=>{
               this.datas=(e);
            })
        }
    }
</script>

<style scoped>
time{
    font-size: 12px;
}
</style>