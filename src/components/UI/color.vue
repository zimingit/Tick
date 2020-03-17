<template>
  <div class="color_item" :style="styleComputed"/>
</template>

<script>
export default {
  name: 'color',
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    styleComputed () {
      return { 'background-color': `${this.color}` }
    }
  }
}
</script>

<style scoped lang="stylus">
.color_item
  cursor pointer
  width 30px
  height 30px
</style>
