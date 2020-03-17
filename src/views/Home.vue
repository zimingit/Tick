<template>
  <div class="home">
    <btn class="btn_add" icon="add" @click="create" title="Создать"/>
    <Tick v-for="tick in ticksSorted" :key="tick.id" :tick="tick"/>
  </div>
</template>

<script>
import Tick from '../components/TickCard.vue'
import btn from '../components/UI/btn.vue'

export default {
  name: 'Home',
  props: {
    sort: {
      type: String,
      default: 'asc'
    },
    offset: {
      type: [String, Number],
      default: 0
    },
    limit: {
      type: [String, Number],
      default: 30
    }
  },
  methods: {
    create () {
      this.$router.push('/Tick/0')
    }
  },
  computed: {
    // Возвращаем список всех заметок с указанной/дефолтной сортировкой и кадром
    ticksSorted () {
      const from = this.offset
      const to = this.limit
      const data = this.$ls.getAllTicks()
        .slice(from, to)
        .sort((a, b) => new Date(a.created) - new Date(b.created))

      if (this.sort === 'desc') {
        return data.reverse()
      }
      return data
    }
  },
  components: {
    Tick,
    btn
  }
}
</script>

<style scoped lang="stylus">
.home
  margin 2%
  display flex
  flex 1
  flex-wrap wrap
  align-content flex-start
  width 100%
  height 100%
  .btn_add
    position absolute
    bottom 20px
    right 20px

@media (orientation: portrait)
  .home
    flex-direction column
    flex-wrap nowrap
    margin 0
</style>
