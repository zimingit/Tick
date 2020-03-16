<template>
  <div class="home">
    <div class="tick_item" v-for="item in 10" :key="item" :style="{'background-color': `${colors[item]}0d`}"> Tick {{item}} </div>
  </div>
</template>

<script>
import _ from 'lodash'
const colors = ['#ea4335', '#fbbc05', '#34a853', '#00bcd4', '#9c27b0', '#f44336', '#03a9f4', '#009688', '#8bc34a', '#cddc39', '#ff9800']
export default {
  name: 'Home',
  data () {
    return {
      colors: _.shuffle(colors)
    }
  },
  components: {
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

  .tick_item
    max-width 100%
    // -2px на border
    width 23%
    min-width 360px
    height 300px
    margin 1%
    display flex
    justify-content center
    align-items center
    font-size 3em
    font-weight 600
    filter blur(3px)

@media (orientation: portrait)
  .home
    flex-direction column
    flex-wrap nowrap
    margin 0
    .tick_item
      margin .5% 0
      width 100%
      flex-shrink 0
</style>
