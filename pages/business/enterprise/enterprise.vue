<template>
	<view class="content">
		<view>
			enterprise
		</view>
	</view>
</template>

<script>
	import route from '@/config/route.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				title: 'hello world'
			}
		},
		onLoad() {
			console.log('haha')
		},
		onShow() {
			console.log("onshow")
		},
		onPullDownRefresh() {
			console.log('isOk')
		},
		onNavigationBarButtonTap() {
			console.log('button')
		},
		methods: {
			request() {
				console.log(route)
				uni.navigateTo({
					url: route.LOG.url
				})
			},
			navigateToLog() {}
		}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
