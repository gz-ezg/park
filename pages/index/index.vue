<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text @tap="request" class="title">{{title}}</text>
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
		onLoad() {},
		onShow() {},
		methods: {
			request() {
				console.log(route)
				uni.navigateTo({
					url: route.enterprise
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
