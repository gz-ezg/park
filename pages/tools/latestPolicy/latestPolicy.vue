<template>
	<view class="page">
		<image class="bg" src="../../../static/latestPolicy_bg.png" mode=""></image>
		<view class="back" @tap="navBack">返回</view>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
export default {
	data() {
		return {};
	},
	async onLoad() {
		try {
			await channelLogicApi.GetProvinceList();
		} catch (e) {
			//TODO handle the exception
		}
	},
	methods: {
		navBack() {
			uni.navigateTo({ url: '/pages/index/index' });
		}
	}
};
</script>

<style lang="scss">
.page {
	width: 100%;
	height: 100vh;

	.bg {
		width: 100%;
		height: 100%;
	}

	.back {
		position: absolute;
		width: 125upx;
		height: 50upx;
		text-align: center;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0upx 1upx 0upx 0upx rgba(226, 22, 22, 1);
		border-radius: 6upx;
		font-size: 19upx;
		font-weight: 500;
		right: 33upx;
		top: 236upx;
		color: rgba(226, 22, 22, 1);
		line-height: 50upx;
	}
}
</style>
