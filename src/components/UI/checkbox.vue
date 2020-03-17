<template>
  <label :class="{'checked': checked}">
    <input type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('change', !checked)"/>
  </label>
</template>

<script>
export default {
  name: 'checkbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="stylus">
input
  display none

label
  width 20px
  height 20px
  border-radius 2px
  border 1px solid #98c400
  margin 5px
  position relative
  display flex
  align-items center
  justify-content center

  &.checked
    background-color #98c400
    &:after
      opacity 1

label:after
  content ''
  display block
  position absolute
  background-color white
  width 50%
  height 50%
  border-radius 100%
  opacity 0
  transition opacity .3s ease
</style>
