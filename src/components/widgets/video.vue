<template>
<div>
	<p class="widgetTitle">{{selected}}</p>
	<canvas class="videoCanvas" :id="id" v-show="selected"></canvas>

	<div v-if="sourcesName != ''">
    <div v-show="!selected">
      <select style="width:100px" v-model="selected" @change="bindFinished(selected)">
        <option v-for="item in sourcesName" v-bind:value="item">
        {{item}}
        </option>
      </select>
	  </div>
  </div>
</div>
</template>


<script>
import Jsmpeg from 'common/js/jsmpg.js'

export default {
  props: ['sourcesName', 'sources', 'index'],
  data() {
    return {
      selected: '',
      id: 'canvas' + this.index
    }
  },
  methods: {
    bindFinished(value) { // 获取绑定的数据源名称
      // this.connect(value)
      this.$emit('binded', value, this.index)
    },
    connect(sourcename) {
      let url = 'ws://' + this.sources[sourcename]
      let client = new WebSocket(url)
      let canvas = document.getElementById(this.id)
      let player = new Jsmpeg(client, {canvas: canvas})
      console.log(player)
    }
  }
}
</script>

<style>
	.videoCanvas{
		height: 200px;
		width: 100%;
	}
	.widgetTitle{
    text-align: center;
  }
</style>