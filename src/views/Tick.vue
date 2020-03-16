<template>
  <div class="layout">
    <div class="tick">
      Tick
    </div>
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

<style scoped lang="stylus">
.layout
  display flex
  flex 1
  width 100%
  height 100%

.tick
  width 900px
  height 600px
  margin auto
  background #c8e6c9
  display flex
  justify-content center
  align-items center
  font-size 3em
  font-weight 600
  filter blur(3px)
</style>
