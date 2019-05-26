<template>
	<view > {{log}} </view>
</template>

<script>
	export default {
		data() {
			return {
				log: 'is log'
			}
		},
		onLoad(e) {
			console.log(e)
			console.log('log')
		},
		onUnload() {
			console.log('onUnload')
		},
		onBackPress() {
			console.log('im fanhui')
		},
		methods:{
			
		}
	}
</script>

<style>
	
</style>
