<template>
<div id="final">
    <section class="hero is-full-height is-dark">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-1">Rendula Onnu!</h1>
                <h2 class="subtitle">Ceg Edition</h2>
                <h1 class="title">Thanks for playing!</h1>
                <h1 class="title">Share this link with your friends</h1>
                <h2 style="font-size:20px;">localhost:8080/{{id}}</h2>
              <a v-bind:href="link">Share on whatsapp</a>
            </div>
        </div>
    </section>
</div>
</template>

<script>
    export default {
        name: "final",
        data() {
            return{
                id:null,
                link:"whatsapp://send?text=Play Onnula rendu! https://localhost:8080/" + this.id
            }
        },
        mounted(){
            this.$http.get('localhost:4444/user/getSession').then(function(data){
                this.id=data.body;
                console.log(data);
            });
        }

    }
</script>

<style scoped>

</style>
