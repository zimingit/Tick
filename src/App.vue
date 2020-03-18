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
  created () {
    if (!this.$ls.getAllTicks().length) {
      this.$ls.generateDefaultData()
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
html
  height 100%

h1, h2, h3, ul, div, p, body, a
  margin 0
  padding 0
  color #2c3e50
  text-decoration none

body, #app
  font-family Avenir, 'Helvetica Neue', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  display flex
  flex 1
  height 100%
  max-height 100vh
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

// Переопределяем стили скролбара
::-webkit-scrollbar
    width 4px
    height 4px
::-webkit-scrollbar-thumb
    border-color #777
    background-color #aaa

</style>
