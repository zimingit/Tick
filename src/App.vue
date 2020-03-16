<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: 'scale-in'
    }
  },
  watch: {
    $route (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'scale-out' : 'scale-in'
    }
  }
}
</script>

<style lang="stylus">
body, #app
  font-family Avenir, 'Helvetica Neue', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  margin 0
  padding 0
  display flex
  flex 1
  height 100vh
  color #2c3e50
  overflow hidden

#app
  overflow auto

// Анимации переключения компонентов
.scale-in-enter-active, .scale-in-leave-active
.scale-out-enter-active, .scale-out-leave-active
  position absolute
  transform-origin top center
  transition-property opacity, transform
  transition-duration .4s
  transition-timing-function ease-in-out

.scale-in-enter,
.scale-out-leave-active
  opacity 0
  transform scale(1.5)

.scale-in-leave-active,
.scale-out-enter
  opacity 0
  transform scale(.5)
</style>
