<template>
  <div class="layout">
    <div class="tick" :style="styleComputed">
      <input v-model="tick.label"/>
      <TodoList :items="tick.todoList"/>
      <div class="colors">
        <span v-for="color in colors" :key="color">
          <radio v-model="tick.color" :value="color">
            <color slot="selector" :color="color"/>
          </radio>
        </span>
      </div>
      <div class="btn" @click="saveTick()">Сохранить</div>
      <div class="btn" @click="cancel()">Отменить</div>
    </div>
  </div>
</template>

<script>
import Tick from '../classes/Tick.js'
import TodoList from '../components/TodoList.vue'
import radio from '../components/UI/radio.vue'
import color from '../components/UI/color.vue'

const colors = ['#ea4335', '#fbbc05', '#34a853', '#00bcd4', '#9c27b0', '#f44336', '#03a9f4', '#009688', '#8bc34a', '#cddc39', '#ff9800']
// const todoBase = {
//   checked: false,
//   description: ''
// }
export default {
  name: 'Tick',
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      color: '',
      colors: colors,
      tick: new Tick(this.$ls.get(`tick_${this.id}`))
    }
  },
  created () {

  },
  methods: {
    saveTick () {
      this.$ls.set(this.tick)
      this.cancel()
    },
    cancel () {
      this.$router.push('/')
    }
  },
  computed: {
    styleComputed () {
      const gray = '#9e9e9e'
      return { 'background-color': `${this.tick.color || gray}0d` }
    }
  },
  components: {
    TodoList,
    radio,
    color
  }
}
</script>

<style scoped lang="stylus">
.btn
  padding 10px
  border-radius 5px
  background #607d8b
  color white
  font-size .4em
  cursor pointer

.layout
  display flex
  flex 1
  width 100%
  height 100%
  overflow hidden

.tick
  max-width 100%
  max-height 100vh
  width 900px
  height 600px
  margin auto
  display flex
  flex-direction column
  justify-content center
  align-items center
  font-size 3em
  font-weight 600
  position relative
  input
    background-color transparent
    outline none
    border none
    font-size 1em
    text-align center
    border-bottom 2px solid transparent
    &:focus
      border-bottom 2px solid #98c400
  .colors
    position absolute
    bottom 0
    display flex
    justify-content space-evenly
    width 100%
    margin 5px
    overflow auto
    span
      display flex
      flex 1

@media (orientation: portrait)
  .tick
    width 100%
    height 100%
    .colors
      margin 0
</style>
