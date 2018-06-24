<template>
  <div id="mainpage">
    <h1 class="title is-1">Rendula Onnu!</h1>
    <h2 class="subtitle">Ceg Edition</h2>
    <br>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column" @click="trueclick">
        <img v-bind:src ="getimage1()" alt="" style="width:450px;height:350px;"/>
        <h1 class="title is-1">{{ option1 }}</h1>
      </div>
      <div class="column" @click="falseclick">
        <img v-bind:src ="getimage2()" alt="" style="width:450px;height:350px;"/>
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
      data(){
          return{
            images:["Cafeteria.jpg","Canteen.jpg","KP.jpg","Snh.jpg","Narayanasamy.jpg","Geetha.jpg",
            "Greenbench.jpg","Blueshed.jpg","Senior.jpg","Junior.jpg","AS.jpg","SA.jpg","Techofes.jpg",
            "K.jpg","Maingate.jpg","Kotturgate.jpg","Spartanz.jpg","Twisters.jpg",
            "Icetea.jpg","Coldcoffee.jpg"],
            options:["Cafeteria","Canteen","Kp","Snh","Narayanasamy","Geetha","Green bench","Blue shed",
              "Senior","Junior","AS","SA","Techofes","Kurukshetra","Main gate",
              "Kottur gate","Spartanz","Twisters","Ice tea","Cold coffee"],
            answers:[],
            value:0,
            iter1:0,
            iter2:1,
            option1:"",
            option2:"",
            leaderboard:null,
            img1:"",
            img2:""
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
              this.answers.push(1);
              //console.log(this.answers)
              if (this.$route.params.userid != null) {
                console.log("inside if");
                console.log(this.answers);
                this.$http.post('http://api.the-lazy-coder.me/vote/addVote', {
                  votername: this.$route.params.username,
                  userid: this.$route.params.userid,
                  answers: this.answers,
                }).then(function (data) {
                  console.log(data);
                  console.log("voter added");
                  this.$router.push({name: 'leaderboard', params:{ userid: this.$route.params.userid}})
                });
              }
              else {
                console.log("else");
                console.log(this.$route.params.username);
                console.log(this.answers);
                this.$http.post('http://api.the-lazy-coder.me/user/addUser', {
                  username: this.$route.params.username,
                  answers: this.answers,
                }).then(function (data) {
                  console.log(data);
                  this.$router.push({name: 'thankyou'})
                });
              }
            }
            else { 
              this.answers.push(1);
              this.update_questions();
              //console.log(this.answers);
            }
          },
          falseclick: function () {               
            this.value +=10;
            if(this.value == 110){
              this.answers.push(0);
              //console.log(this.answers);
              if(this.$route.params.userid != null){
                console.log("inside if");
                console.log(this.answers);
                this.$http.post('http://api.the-lazy-coder.me/vote/addVote',{
                  votername: this.$route.params.username,
                  userid: this.$route.params.userid,
                  answers: this.answers,
                }).then(function(data){
                  console.log(data);
                  this.$router.push({name: 'leaderboard', params:{ userid: this.$route.params.userid}})
                });
                
              }
              else {
                console.log("else");
                this.$http.post('http://api.the-lazy-coder.me/user/addUser', {
                  username: this.$route.params.username,
                  answers: this.answers,
                }).then(function (data) {
                  console.log(data);
                  this.$router.push({name: 'thankyou'})
                });
              }
            }
            else{
              this.answers.push(0);
              this.update_questions();
              //console.log(this.answers);
            }
          },
          getimage1() {
            this.img1=require('../assets/'+this.images[this.iter1]);
            return this.img1;
          },
          getimage2() {
            this.img2=require('../assets/'+this.images[this.iter2]);
            return this.img2;
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
