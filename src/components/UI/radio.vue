<template>
  <label>
    <slot name="selector"/>
    <input type="radio"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('change', value)"/>
  </label>
</template>

<script>
export default {
  name: 'radio',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      required: true
    },
    modelValue: {
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checked () {
      return this.value === this.modelValue
    }
  }
}
</script>

<style scoped lang="stylus">
input
  display none
</style>
