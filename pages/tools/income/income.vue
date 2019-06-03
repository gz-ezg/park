<template>
	<view class="page">
		<image class="bg" src="../../../static/income_bg.png" mode=""></image>
		<view class="back" @tap="navBack">返回</view>

		<view v-if="!next" class="page__body">
			<view class="header">
				<view @tap="changeTab(0)" :class="{ active: tabIndex == 0 }" class="header__item">精简版</view>
				<view @tap="changeTab(1)" :class="{ active: tabIndex == 1 }" class="header__item">专业版</view>
			</view>
			<view class="item">
				<view class="title">月收入</view>
				<input @blur="handleInput" data-name="companyname" type="number" class="item__iput" placeholder="请输入当前月收入" />
			</view>
			<view class="item">
				<view class="title">起征点</view>
				<input @blur="handleInput" disabled data-name="tel" class="item__iput" placeholder="5000" />
			</view>
			<view v-if="tabIndex == 0" class="item">
				<view class="title">无险一金</view>
				<input @blur="handleInput" data-name="name" class="item__iput" type="number" placeholder="请输入您每月实缴五险一金" />
			</view>
			<view v-if="tabIndex == 1" class="item">
				<view class="title">社保基数</view>
				<input @blur="handleInput" data-name="name" class="item__iput" type="number" placeholder="请输入社保基数" />
			</view>
			<view v-if="tabIndex == 1" class="item">
				<view class="title">公积金基数</view>
				<input @blur="handleInput" data-name="name" class="item__iput" type="number" placeholder="请输入公积金基数" />
			</view>
			<view v-if="tabIndex == 1" class="item">
				<view class="title">公积金比例</view>
				<input @blur="handleInput" data-name="name" class="item__iput" type="number" placeholder="请输入公积金比例" />
			</view>
			<view @tap="handleNext" class="button">下一步</view>
			<image src="../../../static/icon_blue-sm.png" class="icon__bottom" mode=""></image>
		</view>

		<view v-if="next" class="page__body">
			<view class="top">-- 抵扣项 --</view>
			<view class="content">
				<view class="left">
					<view class="left__item mt">
						子女教育
						<image src=""></image>
					</view>
					<view class="left__item ">1000/人/月</view>
				</view>
				<view class="right">
					<view class="item">
						<view class="title">抵扣方式</view>
						<view class="select_button select_active">单独使用</view>
						<view class="select_button">共同使用</view>
					</view>
					<view class="item">
						<view class="title">子女数</view>
						<view class="input_number">
							<image src="../../../static/jianhao.png" mode=""></image>
							<view class="number">1</view>
							<image src="../../../static/jiahao.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="left">继续教育</view>
				<view class="right">
					<view class="item">
						<view class="title">抵扣方式</view>
						<view class="select_button">学历：4800</view>
						<view class="select_button">技术：3600</view>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="left">赡养老人2000/月</view>
				<view class="right">
					<view class="item">
						<view class="title">兄妹数</view>
						<view class="select_button">学历：4800</view>
						<view class="select_button">技术：3600</view>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="left">继续教育</view>
				<view class="right">
					<view class="item">
						<view class="title">抵扣方式</view>
						<view class="select_button">学历：4800</view>
						<view class="select_button">技术：3600</view>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="left">继续教育</view>
				<view class="right">
					<view class="item">
						<view class="title">抵扣方式</view>
						<view class="select_button">学历：4800</view>
						<view class="select_button">技术：3600</view>
					</view>
				</view>
			</view>
			<view @tap="handleSubmit" class="button">计算</view>
			<image src="../../../static/icon_blue-sm.png" class="icon__bottom" mode=""></image>
		</view>

		<x-popup bg-color="#fff" :title="title" :show="show" @hidePopup="hidePopup">
			<view class="content">
				<view class="content-item">
					<text class="title">应付工资</text>
					<text>9500</text>
				</view>
				<view class="content-item">
					<text class="title">应缴个税</text>
					<text>9500</text>
				</view>
				<view class="content-item">
					<text class="title">税后工资</text>
					<text>9500</text>
				</view>

				<view class="chart"><canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas></view>
			</view>
		</x-popup>
	</view>
</template>

<script>
import xPopup from '@/components/x-popup/x-popup.vue';
import uCharts from '@/libs/u-charts.js';
import { channelLogicApi } from '@/services/channelLogicApi.js';
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
			tabIndex: 0,
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: '',
			show: false,
			title: '计算结果',
			next: false
		};
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
		changeTab(index) {
			let { tabIndex } = this;
			if (tabIndex == index) {
				return;
			}
			this.tabIndex = index;
		},
		handleNext() {
			this.next = true;
		},
		handlePopus(e) {
			console.log(e);
		},
		hidePopup(e) {
			this.show = !this.show;
		},
		handleSubmit() {
			this.show = true;
			this.getServerData();
		},
		getServerData() {
			_self.showRing('canvasRing');
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
				series: [
					{
						name: '三班',
						data: 20
					},
					{
						name: '四班',
						data: 18
					},
					{
						name: '五班',
						data: 8
					}
				],
				animation: true,
				dataLabel: false,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio
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
	min-height: 1000upx;
	overflow: hidden;

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
		// height: 489upx;
		padding: 11upx 0 0 0;
		background: rgba(255, 255, 255, 1);
		border-radius: 11upx;

		.top {
			text-align: center;
			margin: 50upx 0 40upx;
			font-size: 22upx;
			font-weight: 700;
		}

		.content {
			display: flex;
			margin: 0 auto;
			width: 628upx;
			border: 1upx solid rgba(93, 72, 67, 0.16);
			border-radius: 6upx 6upx 0upx 0upx;
			.mt {
				margin-bottom: 20upx;
			}
			.left {
				padding: 28upx 0;
				@include flex-center();

				flex-direction: column;
				width: 167upx;
				font-size: 22upx;
				background: rgba(246, 246, 246, 1);
				border-radius: 6upx 0upx 0px 0px;
				border-right: 1upx solid rgba(93, 72, 67, 0.16);

				&__item {
					image {
						width: 30upx;
						height: 30upx;
					}
				}
			}

			.right {
				// border-collapse:collapse;
				// @include flex-center();
				flex-direction: column;
				display: flex;
				justify-content: center;
				flex: 1;
				.item {
					box-shadow: none;
					padding: 0;
					height: 50upx;
					.title {
						text-align: center;
						width: 140upx;
					}
					.select_button {
						height: 33upx;
						background: rgba(255, 255, 255, 1);
						border-radius: 17upx;
						padding: 0 14upx;
						border: 1upx solid rgba(93, 72, 67, 0.4);
						font-size: 17upx;
						font-weight: 400;
						color: rgba(125, 131, 134, 1);
						line-height: 33upx;
						margin-right: 12upx;
					}

					.select_active {
						background: linear-gradient(90deg, rgba(242, 63, 15, 1) 0%, rgba(246, 30, 21, 1) 100%);
						color: rgba(255, 255, 255, 1);
						border: 1upx solid #e21616;
					}
				}
			}
		}

		.input_number {
			display: flex;
			align-content: center;
			image {
				height: 30upx;
				width: 30upx;
			}
			.number {
				margin: 0 24upx;
			}
		}
		.header {
			display: flex;
			align-items: center;

			.active {
				color: #e21616;
				&:before {
					content: '';
					left: 0;
					right: 0;
					bottom: 0;
					margin: 0 auto;
					position: absolute;
					width: 28upx;
					height: 4upx;
					background: rgba(226, 22, 22, 1);
					border-radius: 2upx;
				}
			}
			&__item {
				position: relative;
				text-align: center;
				line-height: 67upx;
				flex: 1;
				height: 67upx;
				font-size: 25upx;
				box-shadow: 0px 1upx 0px 0px rgba(93, 72, 67, 0.16);
			}
		}
		.item {
			display: flex;
			align-items: center;
			font-size: 22upx;
			font-weight: 500;
			height: 78rpx;
			padding: 0 28upx;
			box-shadow: 0px 1upx 0px 0px rgba(93, 72, 67, 0.16);

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
			margin: 60upx auto 39upx;
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
			color: #2c2222;
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
