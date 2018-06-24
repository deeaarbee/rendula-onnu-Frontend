<template>
<div id="final">
  <h1 class="title is-1">Rendula Onnu!</h1>
  <h2 class="subtitle">Ceg Edition</h2>
  <h1 class="title is-1">Thanks for playing!</h1>
  <h1>Share this link with your friends</h1>
  <h2>localhost:8084/{{id}}</h2>
</div>
</template>

<script>
    export default {
        name: "final",
        data() {
            return{
                id:null
            }
        },
        mounted(){
            this.$http.get('http://api.the-lazy-coder.me/user/getSession').then(function(data){
                this.id=data.body;
                console.log(data);
            });
        }
        
    }
</script>

<style scoped>

</style>
