<template>
  <transition name="fade" appear>
    <div class="backdrop" v-body @click.self="run(data.action.cancel)">
      <div class="modal">
        <div class="modal_header">
          <h2>{{data.label}}</h2>
        </div>
        <div class="modal_body">
          <p>{{data.description}}</p>
        </div>
        <div class="modal_footer">
          <btn icon="confirm" @click="run(data.action.ok)" title="Подтвердить"/>
          <btn icon="undo" @click="run(data.action.cancel)" title="Отменить"/>
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
  props: ['data'],
  components: {
    btn
  },
  methods: {
    run (f) {
      f()
      this.$destroy()
    }
  },
  directives: {
    'v-body': vBody
  }
}
</script>

<style scoped lang="stylus">
.backdrop
  position fixed
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
