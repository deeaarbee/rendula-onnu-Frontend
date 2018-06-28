<template>
  <div id="mainpage">
    <section class="hero is-dark">
        <div class="container">
          <h1 class="title">Rendula Onnu!</h1>
          <h2 class="subtitle">Ceg Edition</h2>
        </div>
    </section>
    <div class="columns is-mobile">
      <div v-bind:class="{column:temp,polaroid:temp,green:green,red:red}" @click="trueclick">
        <img v-bind:src="getimage1()" alt="" style="width:70%;height:325px;" />
        <div class="title is-1">{{ option1 }}</div>
      </div>
      <div v-bind:class="{column:temp,polaroid:temp,green:red,red:green}" @click="falseclick">
        <img v-bind:src="getimage2()" alt="" style="width:70%;height:325px;"/>
        <div class="title is-1" >{{ option2 }}</div>
      </div>
    </div>
    <h6 class="title" style="color:white">{{ value/10 }}/10</h6>
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
            img2:"",
            index:0,
            correctans:null,
            green:false,
            red:false,
            temp:true
        }
      },
      created()
      {
        console.log(this.$route.params.userid);
        if(this.$route.params.userid!=null)
        {
          this.$http.get('http://127.0.0.1:4444/user/'+this.$route.params.userid).then(function(data){
            this.correctans=data.body[0].answers;
            console.log(this.correctans);
          });
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
              this.value=100;
              this.answers.push(1);
              //console.log(this.answers)
              if (this.$route.params.userid != null) {
                console.log("inside if");
                console.log(this.answers);
                if(this.correctans[this.index]==0){
                  this.red=true;
                }
                else{
                  this.green=true;
                }
                setTimeout( () =>this.green=false, 100);
                setTimeout( () =>this.red=false, 100);
                this.$http.post('http://127.0.0.1:4444/vote/addVote', {
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
                this.$http.post('http://127.0.0.1:4444/user/addUser', {
                  username: this.$route.params.username,
                  answers: this.answers,
                }).then(function (data) {
                  console.log(data);
                  console.log("user added");
                  this.$router.push({name: 'thankyou'})
                });
              }
            }
            else {
              if(this.$route.params.userid != null){
                if(this.correctans[this.index]==1){
                  this.green=true;
                }
                else{
                  this.red=true;
                }
              }
              this.answers.push(1);
              this.update_questions();
              //console.log(this.answers);
            }
          },
          falseclick: function () {
            this.value +=10;
            if(this.value == 110){
              this.value=100;
              this.answers.push(0);
              //console.log(this.answers);
              if(this.$route.params.userid != null){
                console.log("inside if");
                console.log(this.answers);
                if(this.correctans[this.index]==0){
                  this.red=true;
                }
                else{
                  this.green=true;
                }
                setTimeout( () =>this.green=false, 100);
                setTimeout( () =>this.red=false, 100);
                this.$http.post('http://127.0.0.1:4444/vote/addVote',{
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
                this.$http.post('http://127.0.0.1:4444/user/addUser', {
                  username: this.$route.params.username,
                  answers: this.answers,
                }).then(function (data) {
                  console.log(data);
                  this.$router.push({name: 'thankyou'})
                });
              }
            }
            else{
              if(this.$route.params.userid != null){
                if(this.correctans[this.index]==0){
                  this.red=true;
                }
                else{
                  this.green=true;
                }
              }
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
            this.index += 1;
            if(this.$route.params.userid!=null){
              setTimeout(()=>this.option1 = this.options[this.iter1],200);
              setTimeout(()=>this.option2 = this.options[this.iter2],200);
            }
            else{
              this.option1=this.options[this.iter1];
              this.option2=this.options[this.iter2];
            }
            setTimeout( () =>this.green=false, 100);
            setTimeout( () =>this.red=false, 100);
          }
      }

    }
</script>

<style scoped>

.columns{
  margin-top:0px;
}
.hero{
  margin-top:26px;
  margin-bottom:25px;
}
img{
  margin-top: 40px;
}
.progress{
  width: 30%;
  margin: -2% 10% 5% 35%;
}
div.polaroid {
  padding:0px;
  background-color: white;
  box-shadow:  0 6px 20px 0 rgba(0, 0, 0, 0.219);
  margin-bottom: 20px;
}

div.green{
background-color:green;
}
div.red{
background-color:red;
}
</style>
