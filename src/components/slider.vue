<template>
      <div class="slider-win">
           <div class="slider-box" ref="slider-box" @touchstart.passive="start($event)">
                <slot></slot>
           </div>
      </div>
</template>

<script>
    export default {
        name: "slider",
        props:["nums"],
        data(){
          return{
              sliderBox:null,
              length:0,
              sliderList:null,
              startx:0,
              movex:0,
              initx:0,
              dir:"",
              maxlength:50,
              num:0
          }

        },
        methods:{
             start(e){
                 this.sliderBox.style.transition="none";
                 this.initx=getComputedStyle(this.sliderBox,null)["margin-left"]?parseInt(getComputedStyle(this.sliderBox,null)["margin-left"]):0
                 this.startx=e.touches[0].pageX;
                 console.log(this.startx);
                 this.sliderBox.addEventListener("touchmove",this.move)
                 this.sliderBox.addEventListener("touchend",this.end)
             },
             move(e){
                    this.movex=e.touches[0].pageX;
                     if(Math.abs(this.movex-this.startx)) {
                         if (this.movex > this.startx) {
                             this.dir = "right"

                         } else if (this.startx > this.movex) {
                             this.dir = "left"

                         }

                     this.sliderBox.style.marginLeft=this.initx+(this.movex-this.startx)+"px";
                     }


             },
             end(e){

                 if(this.dir=="left"){
                     if(Math.abs(this.movex-this.startx)>this.maxlength){
                           this.num--
                           if(this.num<-(this.sliderList.length-1)){
                               this.num=-(this.sliderList.length-1)
                           }
                     }
                 }else if(this.dir=="right"){

                     if(Math.abs(this.movex-this.startx)>this.maxlength){
                         this.num++
                         if(this.num>0){
                             this.num=0
                         }
                         console.log(this.num)
                     }
                 }

                 this.sliderBox.style.transition="margin 1s linear";
                 this.sliderBox.style.marginLeft=this.num*document.documentElement.clientWidth+"px"

                 this.sliderBox.removeEventListener("touchmove",this.move)
                 this.sliderBox.removeEventListener("touchend",this.end)
             }
        },
        mounted(){


        },
        watch:{
            nums(){
                this.length=this.nums;
                this.sliderBox = this.$refs["slider-box"];
                this.sliderBox.style.width = 100 * this.nums + "%";
                this.sliderList=this.sliderBox.getElementsByClassName("slider-list")

            }
        }
    }
</script>

<style scoped>
    .slider-win{
        width:100%;
        height:200px;
        position: relative;
        overflow: hidden;
    }
    .slider-box{
        width:300%;
        height:100%;
    }
    .slider-list{
        height:100%;
        float:left;
    }
</style>