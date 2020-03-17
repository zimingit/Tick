<template>
  <transition name="fade" appear>
    <div class="btn" :class="icon" :style="styleComputed" @click="$emit('click', $event)"/>
  </transition>
</template>

<script>
export default {
  name: 'color',
  props: {
    icon: {
      type: String
    }
  },
  computed: {
    styleComputed () {
      return {
        'background-image': `url(${require(`@/assets/icons/${this.icon}.svg`)}`
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.btn
  background-position center
  background-repeat no-repeat
  background-size 20px
  padding 20px
  border-radius 100%
  background-color #9e9e9e
  cursor pointer
  box-shadow 1px 1px 3px 0px #7d7d7da6
  transition box-shadow .3s ease
  &:hover
    box-shadow 2px 2px 5px 0px #7d7d7da6
    opacity .8
  &:active
    background-size 18px

  &.add, &.confirm
    background-color #98c400
  &.close, &.undo
    background-color #bdbdbd

// Анимации появления
.fade-enter-active, .fade-leave-active
  transition opacity .2s ease

.fade-enter, .fade-leave-to
  opacity 0

</style>
