<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="back($event)"></a>
            <h1 class="mui-title">开始考试</h1>
        </header>

        <div class="mui-content">
        <!--单选题-->
        <div>
            单选题:
            <div class="box" v-for="(item,key) in raidoData">
                <div class="title">
                    题目： {{item.title}}   {{item.score}}
                </div>
                <div class="opts">

                    <div class="mui-input-row mui-radio" v-for="(opt,optkey) in item.options">
                        <label> {{optkey*1+1}}. {{opt}}</label>
                        <input :name="key" type="radio" v-model="item.info" :value="optkey">
                    </div>


                </div>
                <div class="line"> </div>
            </div>


        </div>

        <!--多选题-->
        <div>
            多选题:
            <div class="box" v-for="(item,key) in checkData">
                <div class="title">
                    题目： {{item.title}}  {{item.score}}
                </div>
                <div class="opts">
                    选项:
                    <div>

                    </div>


                    <div class="mui-input-row mui-checkbox" v-for="(opt,optkey) in item.options">
                        <label>{{optkey*1+1}}. {{opt}}</label>
                        <input name="checkbox1" value="abc" type="checkbox" v-model="item.info" :value="optkey">
                    </div>

                </div>
                <div class="line"> </div>
            </div>

            <input type="button" value="点击" @click="show">


        </div>


        <!--简答题-->

        <div>
            简答题：
            <div class="box"v-for="(item,key) in jiandaData">
                <div class="title">
                    题目： {{item.title}} {{item.score}}
                </div>
                <div>
                    答案:
                    <div>
                        {{item.daan}}
                    </div>
                </div>

                <div class="line"> </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "preview",
        methods:{

            back(){
                this.$router.go(-1);
            },
            show(){
                console.log(this.raidoData)
                console.log(this.checkData)
            }
        },

        data(){
            return {
                all:["abc"],
                raidoData:[

                ],
                checkData:[

                ],
                jiandaData:[

                ],
                totalScore:0
            }
        },
        mounted(){

            var id=this.$route.query.id
            fetch("/api/stukaoshi/shiti?id="+id).then(function (e) {
                return e.json();
            }).then((e)=>{
                console.log(e);
                for(var i=0;i<e.length;i++){
                    if(e[i].typeid==1){
                        this.raidoData.push(e[i])
                    }else  if(e[i].typeid==2){
                        this.checkData.push(e[i])
                    }else{
                        this.jiandaData.push(e[i])
                    }
                }


            })

        }
    }
</script>

<style scoped>
    .box{
        padding: 10px;
        font-size: 18px;
        overflow: hidden;
    }
    .title{
        font-weight: bold;
    }
    .left{
        float:left;
        clear:none
    }
    .line{
        width:95%;height:2px;
        background: rgba(200,200,200,.6);
        clear:both;
        margin:auto;
        margin-too:5px;
    }
</style>