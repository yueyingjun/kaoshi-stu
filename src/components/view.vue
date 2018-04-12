<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav mui-pull-left" @click.prevent="back($event)"></a>
            <h1 class="mui-title">开始考试</h1>
            <span class="mui-pull-right" @click="show" style="line-height: 44px;">
                完成
            </span>
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
                        <input name="checkbox1"  type="checkbox" v-model="item.info" :value="optkey">
                    </div>

                </div>
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
        methods:{

            back(){
                this.$router.go(-1);
            },
            show(){
                var zid=this.$route.query.id;
                var sid=JSON.parse(sessionStorage.stuLogin).id;
                var cid=JSON.parse(sessionStorage.stuLogin).cid;

                var selectSuccess="";
                var selectErr="";
                var selectScore=0;


                var arr=this.raidoData.concat(this.checkData);

                for(var i=0;i<arr.length;i++){
                    if(arr[i].info instanceof  Array){
                        arr[i].info=arr[i].info.join("|");
                    }
                    if(arr[i].info==arr[i].daan){
                        selectSuccess+=arr[i].id+":"+arr[i].score+"|";
                        selectScore+=parseInt(arr[i].score);
                    }else{
                        selectErr+=arr[i].id+"|"
                    }
                }
                selectSuccess=selectSuccess.slice(0,-1);
                selectErr=selectErr.slice(0,-1);

                var jianda="";

               for(var i=0;i<this.jiandaData.length;i++){

                   jianda+=this.jiandaData[i].id+":"+this.jiandaData[i].info;
               }
               var jiandaScore="";
               var status=1;

               var params="zid="+zid+"&sid="+sid+"&cid="+cid+"&selectSuccess="+selectSuccess+"&selectErr="+selectErr+"&jianda="+jianda+"&jiandaScore="+jiandaScore+"&status="+status;

               fetch("/api/stukaoshi/result?"+params).then(function (e) {
                   return e.text();
               }).then((e)=>{
                    if(e=="ok"){
                        this.$router.push("/result?score="+selectScore)
                    }
               })


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



            var id=this.$route.query.id;
            var sid=JSON.parse(sessionStorage.stuLogin).id;
            fetch("/api/stukaoshi/shiti?id="+id+"&sid="+sid).then(function (e) {
                return e.json();
            }).then((e)=>{
                if(e=="ok") {
                    for (var i = 0; i < e.length; i++) {
                        if (e[i].typeid == 1) {
                            this.raidoData.push(e[i])
                        } else if (e[i].typeid == 2) {
                            this.checkData.push(e[i])
                        } else {
                            this.jiandaData.push(e[i])
                        }
                    }
                }else{
                    alert("考过");
                    this.$router.push("/")
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