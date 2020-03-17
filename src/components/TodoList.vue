<template>
  <ul>
    <li v-for="item in items" :key="item.description">
      <checkbox v-model="item.checked" :disabled="!editable"/>
        {{item.description}}
    </li>
  </ul>
</template>

<script>
import checkbox from './UI/checkbox.vue'
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
  components: {
    checkbox
  }
}
</script>

<style scoped lang="stylus">
ul
  font-size .5em
  list-style-type none
  li
    display flex
    align-items center
</style>
