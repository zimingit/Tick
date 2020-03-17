<template>
  <div class="home">
    <Tick v-for="tick in ticks" :key="tick.id" :tick="tick"/>
  </div>
</template>

<script>
import Tick from '../components/TickCard.vue'

export default {
  name: 'Home',
  data () {
    return {
      ticks: this.$ls.getAllTicks()
    }
  },
  components: {
    Tick
  }
}
</script>

<style scoped lang="stylus">
.home
  margin 2%
  display flex
  flex 1
  flex-wrap wrap
  align-content flex-start

@media (orientation: portrait)
  .home
    flex-direction column
    flex-wrap nowrap
    margin 0
</style>
