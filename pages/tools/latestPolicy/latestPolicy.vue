<template>
	<view class="page">
		<image class="bg" src="../../../static/latestPolicy_bg.png" mode=""></image>
		<view class="back" @tap="navBack">返回</view>
		<view class="search">
			<view class="search__left">
				<image src="../../../static/search__left.png" mode=""></image>
			</view>
			<view class="search__input">
				<input placeholder="清收s" />
			</view>
			<view class="search__right">
				<image src="../../../static/search__input.png" mode=""></image>

			</view>
		</view>
		<picker-view class="picker" v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
			<picker-view-column>
				<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	import {
		channelLogicApi
	} from '@/services/channelLogicApi.js';
	export default {
		data() {
			return {
				years: ['23'],
				months: ['23'],
				days: ['23'],
				visible: true,
				value: [9999, 9999, 9999],
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			};
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
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		}
	};
</script>

<style lang="scss">
	@import '@/styles/mixin.scss';

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
		.picker {
			@include absolute-center-top(460upx);
			width: 683upx;
			height: 500upx;
		}
		.search {
			@include absolute-center-top(368upx);
			display: flex;
			border-radius: 6upx;
			width: 683upx;
			height: 78upx;
			background: white;

			&__left {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 78upx;
				height: 78upx;
				background: rgba(93, 72, 67, 0.08);

				image {
					height: 30upx;
					width: 30upx;
				}
			}

			&__input {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30upx;
				flex: 1;
				height: 100%;
				line-height: 78upx;

				input {
					width: 90%;
				}
			}

			&__right {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 104upx;
				height: 78upx;
				background: linear-gradient(90deg, rgba(242, 63, 15, 1) 0%, rgba(246, 30, 21, 1) 100%);
				border-radius: 0px 6upx 6upx 0px;

				image {
					height: 40upx;
					width: 40upx;
				}
			}
		}
	}
</style>
