<template>
    <div id="username">
      <section class="hero is-medium is-dark">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Rendula Onnu!</h1>
            <h2 class="subtitle">Ceg Edition</h2>
            <input class="input is-large" type="text" placeholder="Enter your name" v-model="username" required>
            <button class="button is-large is-black" v-on:click="play">Play</button>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
    export default {
        name: "username",
      data(){
          return{
            username:null,
            userid: null,
            session:null
          }
      },
      created(){
          //console.log(this.$route.params.userid);
          if (this.$route.params.userid != null){
            this.userid = this.$route.params.userid
          }
          this.$http.get('http://127.0.0.1:4444/user/getSession').then(function(data){
            this.session=data.body;
            console.log(this.session);
          });
      },
     methods:{
          play: function(){
            //console.log(this.username);
            if (this.username=='' || this.username==null){
              this.$router.push('/');
            }
            else if(this.session){
              if(this.session==this.userid){
                this.$router.push({name:'leaderboard',params:{username: this.username, userid: this.userid }})
              }
              else if(this.userid!=null){
                this.$router.push({name:'leaderboard',params:{username: this.username, userid: this.userid }})
              }
              else{
              this.$router.push({name:'mainpage', params:{username: this.username, userid: this.userid }});
              }
            }
            else{
            this.$router.push({name:'mainpage', params:{username: this.username, userid: this.userid }});
            }
            }
          }
    }
</script>

<style scoped>
  .input{
    width: 30%;
    align-self: center;
  }

</style>
