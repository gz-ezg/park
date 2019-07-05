<template>
	<view class="page">
		<view :class="{ blur: loading }">
			<image class="bg" src="../../../static/finance_bg.png"></image>
			<view class="back" @tap="navBack">返回</view>
			<view @tap="call" class="call">
				一键呼叫园内财税管家
				<image class="icon" src="../../../static/finance_icon.png" />
			</view>
			<swiper class="card-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'" :circular="true" :autoplay="true" interval="5000" duration="500" @change="cardSwiper">
				<swiper-item v-for="(item, index) in imgList" :key="index" :class="cardCur == index ? 'cur' : ''"><image class="swiper-item" :src="item"></image></swiper-item>
			</swiper>
		</view>
		<x-Loading :show="loading"></x-Loading>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
import route from '@/config/route.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			cardCur: 0,
			direction: '',
			imgList: [],
			dotStyle: false,
			loading: false
		};
	},
	async onLoad() {},
	async onShow() {
		try {
			let res = await channelLogicApi.ChannelTypeImgList({ type: 'cs' });
			console.log(res);
			this.imgList = res.map(v => `http://cloud.zgcfo.com/api/assets/${v.path}`);
			console.log(this.imgList);
		} catch (e) {
			//TODO handle the exception
		}
	},
	methods: {
		navBack() {
			uni.navigateTo({
				url: '/pages/index/index'
			});
		},
		cardSwiper(e) {
			this.cardCur = e.detail.current;
		},
		async call() {
			this.loading = true;
			try {
				await channelLogicApi.SendMsg();
				this.$api.toast('呼叫成功');
			} catch (e) {
				this.$api.toast('呼叫失败');
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/mixin.scss';

page {
	font-size: 0;
	overflow: hidden;
	background: red;
}

.page {
	position: relative;
	width: 100%;
	height: 100vh;
	min-height: 1334upx;

	.bg {
		width: 100%;
		height: 100vh;
		min-height: 1334upx;
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

	.call {
		position: absolute;
		top: 340upx;
		left: 33upx;
		font-size: 28upx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);

		.icon {
			position: relative;
			top: -2upx;
			vertical-align: middle;
			margin-left: 10upx;
			width: 34upx;
			height: 34upx;
		}
	}

	.card-swiper {
		position: absolute;
		top: 400upx;
		width: 750upx;
		height: 740upx !important;
	}

	.card-swiper swiper-item {
		width: 610upx !important;
		left: 70upx;
		box-sizing: border-box;
		// padding: 40upx 0upx 70upx;
		overflow: initial;

		image {
			height: 740upx;
		}
	}

	.card-swiper swiper-item .swiper-item {
		width: 100%;
		display: block;
		height: 100%;
		border-radius: 10upx;
		transform: scale(0.9);
		transition: all 0.2s ease-in 0s;
		overflow: hidden;
	}

	.card-swiper swiper-item.cur .swiper-item {
		transform: none;
		transition: all 0.2s ease-in 0s;
	}
}
</style>
