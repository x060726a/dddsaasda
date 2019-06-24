<template>
    <section style="height: 100%">
        <gameModule />
    </section>
</template>

<script>
    const gameModule = import('../../module/gameModule')
    export default {
        name: "gameIndex",
        components: {
            gameModule () {
                return {
                    component: gameModule
                }
            }
        }
    }
</script>

<style scoped>

</style>
