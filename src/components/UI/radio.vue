<template>
  <label>
    <!-- @slot Используется для получения элемента в кач-ве переключателя -->
    <slot/>
    <!--
      Срабатывает при изменении
      @event change
      @property {*} value - значение, которое будет отправлено в событие
    -->
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
    /**
     * Значение переключателя
     */
    value: {
      required: true
    },
    /**
     * Значение, которое будет связано с v-model
     */
    modelValue: {
      default: ''
    },
    /**
     * Disabled-статус кнопки
     */
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

<docs>
### Example:

```vue
  <template>
    <div>
      <radio v-model="data" value="Yes">
        <span>YES</span>
      </radio> |
      <radio v-model="data" value="No">
        <span>NO</span>
      </radio>
      <br/>
      <span>Selected value: {{data}} </span>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          data: ''
        };
      }
    }
  </script>
```
</docs>
