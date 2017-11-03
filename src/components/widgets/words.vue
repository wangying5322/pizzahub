<template>
<div>
  <p class="widgetTitle">{{selected}}</p>
  <div v-if="sourcesName != ''">
    <div v-show="!selected">
      <select style="width:100px" v-model="selected" @change="bindFinished(selected)">
        <option v-for="item in sourcesName" v-bind:value="item">
        {{item}}
        </option>
      </select>
	</div>
  </div>

  <p v-if="selected">{{sources[selected]}}</p>
</div>
</template>

<script>
export default {
  data () {
    return {
      selected: ''
    }
  },
  props: ['text', 'sources', 'sourcesName'],
  methods: {
    bindFinished(value) { // 获取绑定的数据源名称
      // console.log(value)
      this.$emit('binded', value, this.index)
    }
  }
}
</script>

<style>
.widgetTitle{
  text-align: center;
}
</style>