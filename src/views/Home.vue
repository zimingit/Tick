<template>
  <div class="home">
    <Tick v-for="tick in ticks" :key="tick.id" :tick="tick"/>
  </div>
</template>

<script>
import _ from 'lodash'
import Tick from '../components/TickCard.vue'

const colors = ['#ea4335', '#fbbc05', '#34a853', '#00bcd4', '#9c27b0', '#f44336', '#03a9f4', '#009688', '#8bc34a', '#cddc39', '#ff9800']

export default {
  name: 'Home',
  data () {
    return {
      colors: _.shuffle(colors),
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
