<template>
  <div class="layout">
    <div class="tick" :style="styleComputed">
      <input placeholder="Some label" v-model="tick.label"/>
      <TodoList :items="tick.todoList" @add="addTodo" @remove="removeTodo"/>
      <!-- Выбор цвета -->
      <div class="colors">
        <span v-for="color in colors" :key="color">
          <radio v-model="tick.color" :value="color">
            <color :color="color"/>
          </radio>
        </span>
      </div>
      <!-- Элементы управления -->
      <div class="controls">
        <btn v-if="tick.changed" icon="confirm" @click="save()" title="Сохранить"/>
        <btn v-if="!newTickComputed" icon="close" @click="remove()" title="Удалить"/>
        <btn icon="undo" @click="cancel()" :title="undoTitleComputed"/>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @example [none]
 */
import Tick from '../classes/Tick.js'
import TodoList from '../components/TodoList.vue'
import radio from '../components/UI/radio.vue'
import color from '../components/UI/color.vue'
import btn from '../components/UI/btn.vue'

const colors = ['#ea4335', '#fbbc05', '#34a853', '#00bcd4', '#9c27b0', '#f44336', '#03a9f4', '#009688', '#8bc34a', '#cddc39', '#ff9800']

export default {
  name: 'Tick',
  props: {
    /**
     * Id Tick'а
     * @values {[Number, String]}
     */
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      colors: colors,
      to: 0,
      tick: new Tick(this.$ls.get(`tick_${this.id}`))
    }
  },
  created () {
    document.addEventListener('keydown', this.hotkeyHundler)
  },
  methods: {
    /**
     * Выполняет сохранение
     * @public
     */
    save () {
      if (!this.tick.label) {
        return this.$modal.create(
          {
            label: 'CONTINUE?',
            description: 'Tick must contain label.',
            actions: {
              ok: { do: () => { this.$router.push('/') }, title: 'Home', icon: 'undo' },
              cancel: { icon: 'close', title: 'Close' }
            }
          }
        )
      }
      this.$ls.set(this.tick)
      this.cancel(true)
    },
    /**
     * Выполняет удаления
     * @public
     */
    remove () {
      const del = () => {
        this.$ls.remove(this.tick)
        this.cancel(true)
      }
      this.$modal.create(
        {
          label: 'CONTINUE?',
          description: `"${this.tick.label}" will be deleted.`,
          actions: {
            ok: { do: del }
          }
        }
      )
    },
    /**
     * Выполняет добавление Todo элемента в список
     * @param {Object} data - объект new Todo()
     * @public
     */
    addTodo (data) {
      // Proxy не отследит простой push, т.к. следит за tick
      this.tick.todoList = [...this.tick.todoList, data]
    },
    /**
     * Выполняет удаление Todo элемента из списка
     * @param {Object} data - объект new Todo()
     * @public
     */
    removeTodo (data) {
      this.tick.todoList = this.tick.todoList.filter(todo => todo.key !== data.key)
    },
    /**
     * Выполняет переход на домашнюю страницу
     * @param {Boolean} forced - флаг принудительной переадресации. Игнорирует проверку несохраненных изменений
     * @public
     */
    cancel (forced) {
      if (this.tick.changed && !forced) {
        const abort = () => {
          this.cancel(true)
        }
        return this.$modal.create(
          {
            label: 'SAVE CHANGES?',
            description: `"${this.tick.label}" contains unsaved changes.`,
            actions: {
              ok: { do: this.save },
              return: { name: 'return', do: abort, title: 'Not save', icon: 'undo', order: 15 },
              cancel: { icon: 'close', title: 'Close' }
            }
          }
        )
      }
      this.$router.push('/')
    },
    /**
     * Обработчик нажатия кнопок
     * @param {$event} e - нативное событие нажатия кнопок
     * @public
     */
    hotkeyHundler (e) {
      if (e.code === 'KeyZ' && e.ctrlKey && !e.shiftKey) {
        e.preventDefault()
        this.tick.applyPreviousVersion()
      }
      if (e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        this.tick.applyNextVersion()
      }
    }
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.hotkeyHundler)
  },
  computed: {
    styleComputed () {
      const gray = '#9e9e9e'
      return { 'background-color': `${this.tick.color || gray}10` }
    },
    undoTitleComputed () {
      return this.tick.changed ? 'Отменить' : 'Вернуться'
    },
    newTickComputed () {
      return [0, '0'].includes(this.id)
    }
  },
  components: {
    TodoList,
    radio,
    color,
    btn
  }
}
</script>

<style scoped lang="stylus">
.layout
  display flex
  flex 1
  width 100%
  height 100%
  overflow hidden

.tick
  padding-left 30px
  max-width calc(100% - 30px)
  max-height 100vh
  max-height 100%
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
    margin-bottom 20px
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
    left 0
    top 0
    display flex
    flex-direction column
    justify-content space-between
    height 100%
    overflow auto
    span
      display block

  .controls
    position absolute
    bottom 0
    display flex
    align-self flex-end
    .btn
      margin 5px

@media (orientation: portrait)
  .tick
    width calc(100% - 30px)
    height 100%
    input
      max-width calc(100% - 30px)
    .colors
      margin 0
</style>
