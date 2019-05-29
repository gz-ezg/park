<template>
	<view class="page">
		<image class="bg" src="../../../static/income_bg.png" mode=""></image>
		<view class="back" @tap="navBack">返回</view>

		<view class="page__body">
			<view class="item">
				<view class="title">公司名称</view>
				<input @blur="handleInput" data-name="companyname" class="item__iput" placeholder="请输入公司名称" />
			</view>
			<view class="item">
				<view class="title">起征点</view>
				<input @blur="handleInput" data-name="tel" class="item__iput" placeholder="5000" />
			</view>
			<view class="item">
				<view class="title">无险一金</view>
				<input @blur="handleInput" data-name="name" class="item__iput" placeholder="请输入手机号码" />
			</view>
			<view @tap="handleSubmit" class="button">立即提交</view>
			<image src="../../../static/icon_blue-sm.png" class="icon__bottom" mode=""></image>
		</view>

		<x-popup :title="title" :show="show" @hidePopup="hidePopup">
			<view class="content">
				<view class="content-item">
					<text class="title">应付工资</text><text>9500</text>
				</view>
				<view class="content-item">
					<text class="title">应缴个税</text><text>9500</text>
				</view>
				<view class="content-item">
					<text class="title">税后工资</text><text>9500</text>
				</view>
				<view class="chart">
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
				</view>
			</view>
		</x-popup>
	</view>
</template>

<script>
	import xPopup from '@/components/x-popup/x-popup.vue'
	import uCharts from '@/libs/u-charts.js';
	import {
		channelLogicApi
	} from '@/services/channelLogicApi.js';
	import route from '@/config/route.js';
	var _self;
	var canvaColumn = null;
	var canvaRing;
	export default {
		components: {
			xPopup
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				show: false,
				title: '计算结果'
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(690);
			this.cHeight = uni.upx2px(300);
			this.getServerData();
		},
		methods: {
			navBack() {
				uni.navigateTo({
					url: route.index
				});
			},
			handlePopus(e) {
				console.log(e)

			},
			hidePopup(e) {
				this.show = !this.show
			},
			getServerData() {
				_self.showRing("canvasRing");
			},
			showRing(canvasId, chartData) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: [{
						"name": "三班",
						"data": 20
					}, {
						"name": "四班",
						"data": 18
					}, {
						"name": "五班",
						"data": 8
					}],
					animation: true,
					dataLabel: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
				});
			}
		}
	}
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

		&__body {
			@include absolute-center-top(406upx) width: 683upx;
			height: 383upx;
			padding: 11upx 0 0 0;
			background: rgba(255, 255, 255, 1);
			border-radius: 11upx;

			.item {
				display: flex;
				align-items: center;
				font-size: 22upx;
				font-weight: 500;
				height: 78rpx;
				padding: 0 28upx;
				box-shadow: 0px 1px 0px 0px rgba(93, 72, 67, 0.16);

				.title {
					width: 180upx;
				}

				.item__iput {
					flex: 1;
				}
			}

			.button {
				width: 389upx;
				height: 72upx;
				background: rgba(226, 22, 22, 1);
				border-radius: 42upx;
				text-align: center;
				line-height: 72upx;
				color: #ffffff;
				font-size: 28upx;
				margin: 40upx auto 0;
			}

			.icon__bottom {
				position: absolute;
				bottom: 0;
				right: 0;
				width: 97upx;
				height: 78upx;
			}
		}

		.content {
			font-size: 30upx;

			&-item {
				box-sizing: border-box;
				padding: 0 28upx;
				display: flex;
				align-items: center;
				width: 683upx;
				height: 78upx;
				box-shadow: 0px 1upx 0px 0px rgba(93, 72, 67, 0.16);
				color: #2C2222;
				font-size: 22upx;

				.title {
					width: 200upx;
					font-weight: 700;
				}
			}

			.chart {
				height: 307upx;
			}
		}
	}
</style>
