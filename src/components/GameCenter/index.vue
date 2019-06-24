<template>
    <section class="game">
        <!--游戏页面-->
        <!-- <keep-alive>
            <router-view/>
        </keep-alive> -->
        <router-view/>
    </section>
</template>

<script>
    export default {
        name: "game",
    }
</script>

<style scoped lang="scss">
    .game {
        height: 100%;
    }
</style>
