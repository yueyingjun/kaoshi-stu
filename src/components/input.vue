<template>
    <div class="username" :style="{'margin-top':top }">
                <span  class="mui-icon" :class="icon"></span>
        <input :type="type" v-model="name" :placeholder="placeholder" @keyup="up"/>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                name:""
            }
        },
        methods:{
          up(){
              this.$emit("getval",this.prop,this.name)
          }
        },
        props:["top","placeholder","type","icon","prop"],
    }
</script>

<style scoped>
    ::-webkit-input-placeholder{
        color:#ddd;
    }
    .username{
        width:5.65rem;
        height:0.88rem;
        margin:auto;
        border:1px solid #fff;
        border-radius: 0.2rem;
    }
    .username input{
        border:none;
        background: rgba(0,0,0,0);
        float:left;width:4.70rem;
        height:100%;
        color:#fff;
    }
    .username .mui-icon{
        float:left;
        width:0.88rem;
        height:0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color:#fff;

    }
</style>