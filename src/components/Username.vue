<template>
  <div id="username">
    <h1 class="title is-1">Rendula Onnu!</h1>
    <h2 class="subtitle">Ceg Edition</h2>
    <input class="input is-large" type="text" placeholder="Enter username" v-model="username">
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
            username:""
          }
      },
     methods:{
          play: function(){
            console.log(this.username);
            this.$router.push('/play');
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
