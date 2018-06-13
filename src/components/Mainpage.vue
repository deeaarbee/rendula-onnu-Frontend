<template>
  <div id="mainpage">
    <h1 class="title is-1">Rendula Onnu!</h1>
    <h2 class="subtitle">Ceg Edition</h2>
    <br>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column" @click="trueclick">
        <!--<img src="../assets/logo.png" alt="">-->
        <h1 class="title is-1">{{ option1 }}</h1>
      </div>
      <div class="column" @click="falseclick">
        <!--<img src="../assets/logo.png" alt="">-->
        <h1 class="title is-1" >{{ option2 }}</h1>
      </div>
    </div>
    <h6 class="title is-6">{{ value/10 }}/10</h6>
    <progress class="progress is-danger" v-bind:value="value" max="100" ></progress>
  </div>
</template>

<script>
    export default {
        name: "mainpage",
      props:["root_url"],
      data(){
          return{
            options:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            answers:[],
            value:0,
            iter1:0,
            iter2:1,
            option1:"",
            option2:"",
        }
      },
      mounted(){
          this.option1 = this.options[this.iter1];
        this.option2 = this.options[this.iter2];
        this.value = 10
      },
      updated(){

      },
      methods:{
          trueclick : function () {
            this.value +=10;
            if(this.value == 110){
              console.log(this.answers)
              this.$router.push('/thankyou')
            }
            this.answers.push(true);
            this.update_questions();

          },
        falseclick: function () {
          this.value +=10;
          if(this.value == 110){
            console.log(this.answers)
            this.$router.push('/thankyou')
          }
          this.answers.push(false);
          this.update_questions();


        },
        update_questions: function () {
          this.iter1 += 2;
          this.iter2 += 2;
          this.option1 = this.options[this.iter1];
          this.option2 = this.options[this.iter2];

        }
      }

    }
</script>

<style scoped>

  .progress{
    width: 30%;
    margin: 10% 60% 40% 35%;
  }

</style>
