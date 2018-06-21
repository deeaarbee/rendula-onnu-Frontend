<template>
  <div id="username">
    <h1 class="title is-1">Rendula Onnu!</h1>
    <h2 class="subtitle">Ceg Edition</h2>
    <input class="input is-large" type="text" placeholder="Enter your name" v-model="username" required>
    <br>
    <br>
    <button class="button is-large is-black" v-on:click="play">Play</button>
  </div>
</template>

<script>
    export default {
        name: "username",
        props:["root_url"],
      data(){
          return{
            username:null,
            userid: null
          }
      },
      created(){
          console.log(this.$route.params.userid);
          if (this.$route.params.userid != null){
            this.userid = this.$route.params.userid
          }
      },
     methods:{
          play: function(){
            console.log(this.username);
            if (this.username=='' || this.username==null){
              this.$router.push('/');
            }
            this.$router.push({name:'mainpage', params:{username: this.username, userid: this.userid }});
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
