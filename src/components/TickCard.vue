<template>
  <div class="tick" :style="styleComputed" @click="edit">
    <div class="delete_action" @click.stop="remove"></div>
    <p :title="this.tick.label">{{labelComputed}}</p>
    <Todolist :items="tick.shortTodoList" :editable="false"/>
  </div>
</template>

<script>
import Todolist from './TodoList.vue'
import Confirm from '../classes/Confirm.js'
export default {
  name: 'TickCard',
  props: {
    /**
     * Объект Tick
     * @values new Tick()
     */
    tick: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * Открывает карточку на редактирование
     * @public
     */
    edit () {
      this.$router.push(this.linkComputed)
    },
    /**
     * Удаляет карточку (с подтверждением через Modal)
     * @public
     */
    remove () {
      this.$modal.create(new Confirm(
        {
          label: 'WARNING',
          description: `"${this.tick.label}" будет удален. Вы уверены?`,
          action: {
            ok: () => {
              this.$ls.remove(this.tick)
              /**
               * Событие обновления (состояние карточки обновилось)
               */
              this.$emit('update')
            }
          }
        }
      ))
    }
  },
  computed: {
    labelComputed () {
      return this.tick.label.length > 16 ? `${this.tick.label.slice(0, 20)}...` : this.tick.label
    },
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
  max-width calc(100% - 40px)
  padding 40px 20px 20px 20px
  width calc(23% - 40px)
  min-width 240px
  height 240px
  margin 1%
  display flex
  flex-direction column
  align-items center
  font-size 3em
  font-weight 600
  cursor pointer
  position relative
  &:after
    content ''
    pointer-events none
    display block
    position absolute
    top 0
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

  p
    text-align center
    text-transform uppercase

  ul
    font-size .5em
    list-style-type none
    li
      display flex
      align-items center

@media (orientation: portrait)
  .tick
    margin .5% 0
    width calc(100% - 40px)
    flex-shrink 0
</style>

<docs>
### Example:

```vue
  <template>
    <TickCard :tick="tick" key="TickCard"/>
  </template>

  <script>
    import Tick from '../classes/Tick'
    export default {
      data() {
        return {
          tick: new Tick({ label: 'Simple Tick' })
        }
      }
    }
  </script>
```
</docs>
