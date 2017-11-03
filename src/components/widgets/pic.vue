<template>
<div>
  <p class="widgetTitle">{{selected}}</p>
  <img :src="sources[selected]" @click="toggle" v-show="flag" class="widget-img" v-if="selected">
  <div v-if="sourcesName != ''">
    <div v-show="!selected" >
      <select style="width:100px" v-model="selected"  @change="bindFinished(selected)">
        <option :value="null"></option>
        <option v-for="item in sourcesName" v-bind:value="item">
        {{item}}
        </option>
      </select>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      selected: '',
      flag: true
    }
  },
  props: ['sourcesName', 'sources', 'index'],
  methods: {
    toggle() {
      this.flag = !this.flag
    },
    bindFinished(value) {
      console.log(this.sources[value])
      this.$emit('binded', value, this.index)
    }
  }
}
</script>

<style>
  .widget-img{
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
  }
  .widgetTitle{
  text-align: center;
}
</style>
