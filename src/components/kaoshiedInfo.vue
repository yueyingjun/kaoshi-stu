<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="back($event)"></a>
            <h1 class="mui-title">考试信息  总分({{totalScore}})</h1>

        </header>

        <div class="mui-content">
        <!--单选题-->
        <div>
            单选题:
            <div class="box" v-for="(item,key) in raidoData" :class="{red:item.ok=='no'}">
                <div class="title">
                    题目： {{item.title}}   {{item.score}}
                </div>
                <div class="opts">

                    <div class="mui-input-row mui-radio" v-for="(opt,optkey) in item.options">
                        <label> {{optkey*1+1}}. {{opt}}</label>

                        <input :name="key" type="radio" v-model="item.daan" :value="optkey" disabled>
                    </div>


                </div>

                 <router-link to="/" v-if="item.ok=='no'">查看正确答案</router-link>
                <div class="line"> </div>
            </div>


        </div>

        <!--多选题-->
        <div>
            多选题:
            <div class="box" v-for="(item,key) in checkData" :class="{red:item.ok=='no'}">
                <div class="title">
                    题目： {{item.title}}  {{item.score}}
                </div>
                <div class="opts">
                    选项:
                    <div>

                    </div>


                    <div class="mui-input-row mui-checkbox" v-for="(opt,optkey) in item.options">
                        <label>{{optkey*1+1}}. {{opt}}</label><input name="checkbox1"  type="checkbox" v-model="item.daan" :value="optkey" disabled>

                    </div>

                </div>

                <router-link :to="'/daanInfo/'+item.id" v-if="item.ok=='no'">查看正确答案</router-link>
                <div class="line">

                </div>
            </div>
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
                        <textarea name="" id="" width="100%" height="50px" v-model="item.info">


                        </textarea>
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
        methods: {

            back() {
                this.$router.go(-1);
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
                totalScore:0,

            }
        },
        mounted(){
            var id=this.$route.params.zutiid;
            var sid=JSON.parse(sessionStorage.stuLogin).id;
            fetch("/api/stukaoshi/kaoshiedInfo?id="+id+"&sid="+sid).then(function (e) {
                return e.json();
            }).then((e)=>{

                     console.log(e);
                    for (var i = 0; i < e.length; i++) {

                        if(e[i].ok=="yes"){
                           var score= e[i].score?parseInt(e[i].score):0;
                           this.totalScore+=score;
                        }
                        if (e[i].typeid == 1) {
                            this.raidoData.push(e[i])
                        } else if (e[i].typeid == 2) {
                            this.checkData.push(e[i])
                        } else {
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
    .red{
        color:red;
    }
</style>