<template>
  <div class="citySearch">
    <van-search v-model="keyWord" shape="round" background="#00BCD4" placeholder="输入城市名或者拼音" />
    <div class="search" ref="search" v-show="keyWord">
      <ul>
        <li v-for="(item, index) in list" :key="index" class="search-item" @click="handleCityClick(item.name)">
          {{item.name}}</li>
        <!-- list为空时  就不匹配数据 -->
        <li class="search-item" v-show="noList">没有找到匹配数据</li>
      </ul>
    </div>

  </div>
</template>
<script>

import Bscroll from 'better-scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'CitySearch',
  props: ['allCities'],
  data () {
    return {
      keyWord: '',
      list: [],
      timer: null
    }
  },
  computed: {
    noList () {
      return !this.list.length
    }
  },
  methods: {
    handleCityClick (city) {
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      this.$router.push('/')
      // 点击搜索到的内容后 跳转到首页
    },
    ...mapMutations(['changeCity'])
  },
  watch: {
    keyWord () {
      // 延迟
      // if (this.timer) {
      //   clearTimeout(this.timer)
      // }
      // // 如果搜索框没有内容 list就为空  不显示搜索内容
      // if (!this.keyWord) {
      //   this.list = []
      //   return
      // }
      // this.timer = setTimeout(() => {
      //   const result = []
      //   for (const i in this.allCities) {
      //     this.allCities[i].forEach((value) => {
      //       if (value.spell.indexOf(this.keyWord) > -1 || value.name.indexOf(this.keyWord) > -1) {
      //         result.push(value)
      //       }
      //     })
      //   }
      //   this.list = result
      // }, 100)
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        const result = []
        for (const i in this.allCities) {
          this.allCities[i].forEach((value) => {
            if (value.spell.indexOf(this.keyWord) > -1 ||
              value.name.indexOf(this.keyWord) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  mounted () {
    const options = {
      click: true
    }
    this.scroll = new Bscroll(this.$refs.search, options)
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.search
  position absolute
  top 1.94rem
  right 0
  left 0
  bottom 0
  background-color #eee
  z-index 1
  overflow hidden
  .search-item
    line-height 30px
    padding-left 20px
    background-color #fff
    border-bottom 1px solid #ddd
</style>
