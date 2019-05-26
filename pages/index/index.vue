<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text @tap="request" class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapState(['title'])
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
			},
			navigateToLog() {
			}
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
