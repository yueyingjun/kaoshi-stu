<template>
    <div>
    <header class="mui-bar mui-bar-nav">
        <router-link to="/center" tag="a" class="mui-action-back  mui-pull-left photo">

        </router-link>
        <a class="mui-action-back  mui-pull-right logout" @click="logout"> 退出</a>
        <h1 class="mui-title">主页</h1>
    </header>

        <div class="mui-content">
           <slider :nums="sliders.length">

           </slider>


           <ul class="opts">

               <router-link to="/kaoshi" tag="li" class="opt">
                     <span class="mui-icon mui-icon mui-icon-compose"></span>
                     <div class="info">我要考试</div>
               </router-link>
               <li class="opt">
                   <span class="mui-icon mui-icon mui-icon-compose"></span>
                   <div class="info">已考试题</div>
               </li>
               <li class="opt">
                   <span class="mui-icon mui-icon mui-icon-compose"></span>
                   <div class="info">我要出题</div>
               </li>

           </ul>


            <ul class="opts">
                <li class="opt">
                    <span class="mui-icon  mui-icon-star"></span>
                    <div class="info">我要出题</div>
                </li>
                <li class="opt">
                    <span class="mui-icon mui-icon mui-icon-compose"></span>
                    <div class="info">我要出题</div>
                </li>
                <li class="opt">
                    <span class="mui-icon mui-icon mui-icon-compose"></span>
                    <div class="info">我要出题</div>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>


    import slider from "@/components/slider"
    export default {
            components:{slider},
            methods:{
                logout(){
                    sessionStorage.removeItem("stuLogin");
                    this.$router.push("/login")
                }
            },
            data(){
                return {
                    sliders:[

                    ]
                }
            },
            mounted(){
                this.sliders=[
                    {img:"/static/img/1.jpg"},
                    {img:"/static/img/2.jpg"},
                    {img:"/static/img/111.jpeg"}
                ]
            }
    }
</script>

<style scoped>
    ul,li{
        padding:0;;margin:0;list-style: none;
    }
    .opts{
        margin-top:0.4rem;
        width:100%;height:auto;
        display: flex;
        justify-content: space-around;
    }
    .opt{
        width:1rem;height:1rem;
    }
    .opt span{
        width:100%;
        text-align: center;
        font-size: .8rem;
        color: #67d4ff;

    }
    .opt div{
        text-align: center;
        font-size: .1rem;
    }

    .photo{
        width:36px;
        height:36px;
        background: rgba(200,200,200,0.3);
        border-radius: 50%;
        margin-top:4px;

    }
    .logout{
        font-size: 14px; line-height: 44px;
    }
    .slider-list{

    }

</style>