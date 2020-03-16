<template>
  <div>
    Tick
    {{id}}
  </div>
</template>

<script>

export default {
  name: 'Tick',
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  created () {
    console.log(this.id)
  },
  components: {
  }
}
</script>
