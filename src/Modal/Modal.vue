<template>
  <transition name="fade" appear>
    <div class="backdrop" v-body @click.self="run(data.action.cancel)">
      <div class="modal">
        <div class="modal_header" v-if="data.label">
          <h2>{{data.label}}</h2>
        </div>
        <div class="modal_body">
          <p>{{data.description}}</p>
        </div>
        <div class="modal_footer">
          <btn v-for="action in actions"
            :key="action.name"
            :icon="action.icon"
            :title="action.title"
            @click="action.do"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import vBody from '@/directives/vBody.js'
import btn from '../components/UI/btn.vue'
export default {
  name: 'Modal',
  components: {
    btn
  },
  methods: {
    /**
     * Запускапет обработчик кнопки, затем уничтожает экземпляр окна
     * @param {Function} f - Функция обработчик
     * @public
     */
    run (f) {
      if (typeof f === 'function') f()
      this.$destroy()
    }
  },
  computed: {
    actions () {
      return Object.keys(this.data.action)
        .reduce((acc, k) => {
          const action = this.data.action[k]
          acc.push({
            name: k,
            title: action.title,
            icon: action.icon,
            order: action.order || 0,
            do: () => { this.run(action.do || function () {}) }
          })
          return acc
        }, [])
        .sort((a, b) => (a.order - b.order))
    }
  },
  directives: {
    'v-body': vBody
  }
}
</script>

<style scoped lang="stylus">
@require('../assets/css/reset.styl')
.backdrop
  position fixed
  top 0
  left 0
  padding 0 10px
  width calc(100% - 20px)
  height 100%
  display flex
  background-color #00000066

.modal
  margin auto
  display flex
  flex-direction column
  flex-basis 600px
  max-width 100%
  min-width 30%
  max-height 100%
  min-height 10%
  border-radius 5px
  background-color #f5f5f5
  overflow hidden
  .modal
    &_header
      padding 10px
      display flex
      max-height 30%
      background-color #eeeeee
      margin-bottom 10px
    &_body
      padding 10px
      display flex
      flex-direction column
      flex 1
    &_footer
      padding 10px
      display flex
      max-height 30%
      justify-content flex-end

// Анимация появления модала
.fade-enter-active, .fade-leave-active
  transition opacity .5s ease

.fade-enter, .fade-leave-to
  opacity 0

// @media (orientation: portrait)
</style>
<style lang="stylus">
.modal_footer .btn
  margin-left 5px
</style>

<docs>
### Example:

```vue
  <template>
    <button @click.prevent="createModal">Open modal</button>
  </template>

  <script>
    import Vue from 'vue'
    import modal from '../plugins/ModalMaster'
    Vue.use(modal)

    export default {
      methods: {
        createModal () {
          return this.$modal.create(
            {
              label: 'MODAL LABEL',
              description: 'This is modal text example',
              actions: {
                ok: {},
                cancel: {}
              }
            }
          )
        }
    }
    }
  </script>
```
</docs>
