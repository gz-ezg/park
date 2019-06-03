<template>
	<view class="page">
		<swiper @tap="navToIndex" class="swiper" :autoplay="autoplay" circular="true" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in imgList"><image class="bg_log" :src="item" mode=""></image></swiper-item>
		</swiper>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
import route from '@/config/route.js';
export default {
	data() {
		return {
			autoplay: true,
			interval: 10000,
			duration: 1000,
			imgList:[]
		};
	},
	async onLoad() {
		try {
			let res = await channelLogicApi.ChannelTypeImgList({ type: 'sy' });
			this.imgList = res.map(v => `http://cloud.yrl.fun/api/assets/${v.path}`);
		} catch (e) {
			//TODO handle the exception
		}
	},
	onShow() {},
	methods: {
		navToIndex() {
			this.$api.navigateTo({ url: route.index });
		}
	}
};
</script>

<style lang="scss">
page {
	width: 100vw;
	height: 100vh;
}
.page {
	width: 100vw;
	height: 100vh;

	.swiper {
		width: 100vw;
		height: 100vh;
		.bg_log {
			width: 100vw;
			height: 100vh;
		}
	}
}
</style>
