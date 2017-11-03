<template>
	<div class="m-header">
		<p class="topbar"><strong>可视化轻量级服务聚合器</strong> <small>PizzaHub</small></p>
	</div>
</template>

<script>
export default {
  name: 'm-header',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.m-header
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 1000;
	padding-left: 10px;
	height: 40px;
	background-color: $header-background-color
	border-color: $header-border-color
	color: $header-color
.topbar
	float:left
	margin: 0
	line-height: 40px
	font-size:$font-size-large
</style>