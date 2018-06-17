<template>
<div>
  This is the leader board
  {{data}}
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
        this.$http.get('https://api.the-lazy-coder.me/vote/'+ this.$route.params.userid).then(function (data) {
          console.log(data.body);
          this.data = data.body
        });
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
