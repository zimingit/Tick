<template>
  <div class="tick" :style="styleComputed">
    <router-link :to="linkComputed">{{tick.label}}</router-link>
    <ul>
      <li v-for="todo in tick.shortTodoList" :key="todo.description">
        <checkbox v-model="todo.checked" :disabled="true"/>
        {{todo.description}}
      </li>
    </ul>
  </div>
</template>

<script>
import checkbox from './UI/checkbox.vue'
export default {
  name: 'TickCard',
  props: {
    tick: {
      type: Object,
      required: true
    }
  },
  computed: {
    styleComputed () {
      const gray = '#9e9e9e'
      return { 'background-color': `${this.tick.color || gray}0d` }
    },
    linkComputed () {
      return `/Tick/${this.tick.id}`
    }
  },
  components: {
    checkbox
  }
}
</script>

<style scoped lang="stylus">
.tick
  max-width 100%
  width 23%
  min-width 360px
  height 300px
  margin 1%
  display flex
  flex-direction column
  justify-content center
  align-items center
  font-size 3em
  font-weight 600
  // filter blur(3px)

  ul
    font-size .5em
    list-style-type none
    li
      display flex
      align-items center

@media (orientation: portrait)
  .tick
    margin .5% 0
    width 100%
    flex-shrink 0
</style>
