<template>
  <div class="tick" :style="styleComputed" @click.self="edit">
    <div class="delete_action" @click.self="remove"></div>
    <p>{{tick.label}}</p>
    <Todolist :items="tick.shortTodoList" :editable="false"/>
  </div>
</template>

<script>
import Todolist from './TodoList.vue'
import Confirm from '../classes/Confirm.js'
export default {
  name: 'TickCard',
  props: {
    tick: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit () {
      this.$router.push(this.linkComputed)
    },
    remove () {
      this.$modal.create(new Confirm(
        {
          label: 'WARNING',
          description: `"${this.tick.label}" будет удален. Вы уверены?`,
          action: {
            ok: () => {
              this.$ls.remove(this.tick)
              this.$emit('update')
            }
          }
        }
      ))
    }
  },
  computed: {
    styleComputed () {
      const gray = '#9e9e9e'
      return { 'background-color': `${this.tick.color || gray}10` }
    },
    linkComputed () {
      return `/Tick/${this.tick.id}`
    }
  },
  components: {
    Todolist
  }
}
</script>

<style scoped lang="stylus">
.tick
  overflow hidden
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
  cursor pointer
  position relative
  &:after
    content ''
    display block
    position absolute
    height 100%
    width 100%
    background #F5F5F5
    border-left 10px solid #98c400
    opacity .2
    transform-origin left top
    transform scale(0, 1)
    transition transform .3s ease
  &:hover
    &:after
      transform scale(1, 1)

  .delete_action
    position absolute
    top 10px
    right 10px
    z-index 1
    width 20px
    height 20px
    background-image url('../assets/icons/close.svg')
    background-size cover
    filter invert(.1)

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
