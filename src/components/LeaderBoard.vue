<template>
<div>
  <section class="hero is-full-height is-dark">
    <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">Rendula Onnu!</h1>
          <h2 class="subtitle">Ceg Edition</h2>
          <h1 class="title">Thanks for playing!</h1>
          <h1 class="title is-1">Leader board</h1>
          <div v-for="iter in data">
            <p>{{ iter.votername }}'s score is {{ iter.mark }}</p> 
          </div>
        </div>
    </div>
  </section>
</div>
</template>

<script>
    export default {
        name: "leader-board",
      data(){
        return{
          data:null
        }
        },
      created(){
        this.$http.get('http://api.the-lazy-coder.me/vote/'+ this.$route.params.userid).then(function (data) {
          console.log(data);
          this.data = data.body
        });
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
