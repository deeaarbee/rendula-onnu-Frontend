<template>
  <div id="mainpage">
    <h1 class="title is-1">Rendula Onnu!</h1>
    <h2 class="subtitle">Ceg Edition</h2>
    <br>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column" @click="trueclick">
        <img v-bind:src="img1" alt="">
        <h1 class="title is-1">{{ option1 }}</h1>
      </div>
      <div class="column" @click="falseclick">
        <img v-bind:src="img2" alt="">
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
            images: ["../assets/KP.jpg","../assets/Canteen.jpg"],
            options:["Cafeteria","canteen","Kp","Snh","Narayanasamy","Geetha","Green bench","Blue shed",
              "Senior","Junior","Nss,nso,yrc or ctf","SA","Techofes","Kurukshetra","Main gate",
              "Kottur gate","Spartans","Twisters","Ice tea","Cold coffee"],
            answers:[],
            value:0,
            iter1:0,
            iter2:1,
            img1:"",
            img2:"",
            option1:"",
            option2:"",
        }
      },
      mounted(){
        this.option1 = this.options[this.iter1];
        this.option2 = this.options[this.iter2];
        this.img1 = this.images[this.iter1];
        this.img2 = this.images[this.iter2];
        this.value = 10;
        console.log(this.img1);
      },
      updated(){

      },
      methods:{
          trueclick : function () {
            this.value +=10;
            if(this.value == 110){
              this.answers.push(true);
              console.log(this.answers)
              this.$router.push('/thankyou')
            }
            this.answers.push(true);
            
            this.$http.post('https://jsonplaceholder.typicode.com/posts',{
              title: this.option1,
              body: this.option2,
            }).then(function(data){
              console.log(data);
              });
            this.update_questions();
          },
        falseclick: function () {
          this.value +=10;
          if(this.value == 110){
            this.answers.push(false);
            console.log(this.answers)
            this.$router.push('/thankyou')
          }
          this.answers.push(false);
          this.$http.post('https://jsonplaceholder.typicode.com/posts',{
              title: this.option1,
              body: this.option2,
          }).then(function(data){
              console.log(data);
              });
          this.update_questions();


        },
        update_questions: function () {
          this.iter1 += 2;
          this.iter2 += 2;
          this.option1 = this.options[this.iter1];
          this.option2 = this.options[this.iter2];
          this.img1 = this.images[this.iter1];
          this.img2 = this.images[this.iter2];
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
