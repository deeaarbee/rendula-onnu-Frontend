<template>
<div>
  <h1 class="title is- 1">Leader board</h1>
  <div v-for="iter in data">
    <p>{{ iter.votername }}'s score is {{ iter.mark }}</p> 
  </div>
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
