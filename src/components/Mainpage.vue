<template>
  <div id="mainpage">
    <h1 class="title is-1">Rendula Onnu!</h1>
    <h2 class="subtitle">Ceg Edition</h2>
    <br>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column" @click="trueclick">

        <h1 class="title is-1">{{ option1 }}</h1>
      </div>
      <div class="column" @click="falseclick">

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
            options:["Cafeteria","canteen","Kp","Snh","Narayanasamy","Geetha","Green bench","Blue shed",
              "Senior","Junior","Nss,nso,yrc or ctf","SA","Techofes","Kurukshetra","Main gate",
              "Kottur gate","Spartans","Twisters","Ice tea","Cold coffee"],
            answers:[],
            value:0,
            iter1:0,
            iter2:1,
            option1:"",
            option2:"",
            leaderboard:null
        }
      },
      mounted(){
          console.log(this.$route.params.username);
          console.log(this.$route.params.userid);
          if (this.$route.params.username == null){
            this.$router.push({name: 'username1', params:{userid:this.$route.params.userid }});
          }
        this.option1 = this.options[this.iter1];
        this.option2 = this.options[this.iter2];
        this.value = 10;
      },
      methods:{
          trueclick : function () {
            this.value +=10;
            if(this.value == 110) {
              this.answers.push(true);
              console.log(this.answers)
              if (this.$route.params.userid != null) {
                console.log("inside if")
                this.$http.post('https://api.the-lazy-coder.me/user/addUser', {
                  username: this.$route.params.username,
                  userid: this.$route.params.userid,
                  answers: this.answers,
                }).then(function (data) {
                  console.log(data);
                });

                this.$router.push({name: 'leaderboard', params:{ userid: this.$route.params.userid}})

              }
              else {
                console.log("else")
                this.$http.post('https://api.the-lazy-coder.me/user/addUser', {
                  username: this.$route.params.username,
                  answers: this.answers,
                }).then(function (data) {
                  console.log(data);
                });
                this.$router.push({name: 'thankyou'})
              }
            }
            this.answers.push(true);


            this.update_questions();
          },
        falseclick: function () {
          this.value +=10;
          if(this.value == 110){
            this.answers.push(false);
            console.log(this.answers);
            if(this.$route.params.userid != null){
              console.log("inside if");
              this.$http.post('https://api.the-lazy-coder.me/user/addUser',{
                username: this.$route.params.username,
                userid: this.$route.params.userid,
                answers: this.answers,
              }).then(function(data){
                console.log(data);
              });

              this.$router.push({name: 'leaderboard', params:{ userid: this.$route.params.userid}})

            }
            else {
              console.log("else")
              this.$http.post('https://api.the-lazy-coder.me/user/addUser', {
                username: this.$route.params.username,
                answers: this.answers,
              }).then(function (data) {
                console.log(data);
              });
            }
            this.$router.push({name: 'thankyou'})
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
