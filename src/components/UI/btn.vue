<template>
  <transition name="fade" appear>
    <!--
      Срабатывает при клике
      @event click
      @property {$event} - нативный event
    -->
    <div class="btn" :class="[icon, size]" :style="styleComputed" @click="$emit('click', $event)"/>
  </transition>
</template>

<script>
export default {
  name: 'btn',
  props: {
    /**
     * Имя иконки
     * @values add, close, confirm, undo
     */
    icon: {
      type: String
    },
    /**
     * Размер иконки
     * @values normal, small
     */
    size: {
      type: String,
      default: 'normal'
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

  &.normal
    background-size 20px
    padding 20px
  &.small
    background-size 10px
    padding 10px

// Анимации появления
.fade-enter-active, .fade-leave-active
  transition opacity .2s ease

.fade-enter, .fade-leave-to
  opacity 0

</style>

<docs>
### Example:

```vue
  <template>
    <div>
      <btn v-for="action in ['add', 'close', 'confirm', 'undo']" :key="action" :icon="action"/>
    </div>
  </template>
  <style scoped>
    div {
      display: flex;
      justify-content: space-evenly;
    }
  </style>
```
</docs>
