<template>
  <transition-group name="item-list" tag="ul">
    <li v-for="item in items" :key="item.key" :class="{'done': item.checked}">
        <template v-if="editable">
          <checkbox v-model.lazy="item.checked"/>
          <input v-model="item.description"/>
          <btn class="btn_todo_remove" icon="close" size="small" @click="remove(item)" title="Удалить"/>
        </template>
        <template v-else>
          {{item.description}}
        </template>
    </li>
    <li v-if="editable" key="add">
      <checkbox v-model="newTodo.checked" :disabled="!editable"/>
      <input v-model.lazy="newTodo.description" @change="add" placeholder="Add..."/>
    </li>
  </transition-group>
</template>

<script>
import checkbox from './UI/checkbox.vue'
import Todo from '../classes/Todo.js'
import btn from './UI/btn.vue'

export default {
  name: 'Todolist',
  props: {
    items: {
      type: Array
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      newTodo: new Todo()
    }
  },
  methods: {
    add () {
      this.newTodo.key = this.newTodo.description
      this.$emit('add', this.newTodo)
      this.newTodo = new Todo()
    },
    remove (item) {
      this.$emit('remove', item)
    }
  },
  components: {
    checkbox,
    btn
  }
}
</script>

<style scoped lang="stylus">
ul
  list-style-type none
  max-height 80%
  max-width 80%
  overflow auto
  font-weight 400
  li
    display flex
    align-items center
    max-width 100%
    text-overflow ellipsis
    cursor default
    margin 5px
    padding 10px 20px
    border-radius 10px
    background-color #ffffff42
    &.done
      text-decoration line-through
    input
      background transparent
      border none
      border-bottom 2px solid transparent
      outline none
      font-size .4em
      width 100%
      &:focus
        border-bottom 2px solid #98c400
    .btn_todo_remove
      margin 5px

@media (orientation: portrait)
  ul
    max-width calc(100% - 40px)
    paddin 0 20px

// Анимации списка
.item-list-move
  transition transform .5s
.item-list-enter-active, .item-list-leave-active
  transition-property opacity, transform
  transition-duration .4s
.item-list-enter, .item-list-leave-active
  opacity 0
  transform scale(.8)
</style>
