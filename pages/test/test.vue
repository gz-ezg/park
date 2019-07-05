<template>
	<view class="page">
		<image class="bg" src="../../../../../static/subsidy_bg.png" mode=""></image>
		<view class="back" @tap="navBack">返回</view>
		<view class="page__title">项目申报：政策补贴最高300W</view>
		<view id="main" class="page__body">111</view>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
import xPopup from '@/components/x-popup/x-popup.vue';
import xLoading from '@/components/x-loading/x-loading.vue';
import route from '@/config/route.js';
import { getUrlQuery } from '@/utils/index.js';
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';

var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts-en.simple.js';
head.appendChild(script);
try {
	setTimeout(() => {
		var myChart = window.echarts.init(document.getElementById('main'));
		console.log(myChart);
		myChart.setOption(option);
	}, 1000);
} catch (e) {
	//TODO handle the exception
}

var data;
var option;
export default {
	data() {
		return {
			option: {}
		};
	},
	components: {
		xPopup,
		xLoading,
		tkiQrcode
	},

	onShow() {
		option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: [
						{ value: 335, name: '直接访问' },
						{ value: 310, name: '邮件营销' },
						{ value: 234, name: '联盟广告' },
						{ value: 135, name: '视频广告' },
						{ value: 1548, name: '搜索引擎' }
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss">
@import '@/styles/mixin.scss';

.page {
	width: 100%;
	height: 100vh;
	min-height: 1334upx;
	background-size: contain;
	overflow: hidden;

	.bg {
		width: 100%;
		height: 100vh;
		min-height: 1334upx;
	}

	.popus {
		width: 550upx;
		height: 733upx;
		text-align: center;

		&__img {
			transform: scale(1.1);
			// box-shadow: 0px 11upx 17upx 0upx rgba(0, 0, 0, 0.24);
			height: 100%;
			width: 100%;
		}

		&__top {
			@include absolute-center-top(50upx);
			&-title {
				font-size: 33upx;
				font-weight: 500;
				color: rgba(44, 34, 34, 1);
			}
			&-disc {
				font-size: 22upx;
				font-weight: 400;
				color: rgba(125, 131, 134, 1);
			}
		}

		&__bottom {
			@include absolute-center-top(300upx);
			&-pic {
				font-size: 22upx;
				width: 220upx;
				height: 220upx;
				margin: 0 auto;
				image {
					width: 220upx;
					height: 220upx;
				}
			}
			&-title {
				font-size: 22upx;
				font-weight: 400;
				color: rgba(44, 34, 34, 1);
				margin: 30upx 0;
			}
			&-button {
				margin: 0 auto;
				width: 125upx;
				position: relative;
				z-index: 2;
				height: 44upx;
				font-size: 22upx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				background: linear-gradient(90deg, rgba(242, 63, 15, 1) 0%, rgba(246, 30, 21, 1) 100%);
				border-radius: 6upx;
				line-height: 44upx;
			}
		}
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

	&__title {
		position: absolute;
		left: 33upx;
		top: 334upx;
		font-size: 33upx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}

	&__body {
		font-size: 33upx;
		font-weight: 500;
		@include absolute-center-top(406upx);
		width: 683upx;
		height: 600upx;
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

	.tip {
		@include absolute-center-top(850upx);
		display: flex;
		align-items: center;
		margin: 0 auto;
		width: 683upx;
		height: 133upx;
		border-radius: 11upx;
		background: rgba(53, 53, 53, 1);
		.img {
			margin: 0 33upx;
			width: 78upx;
			height: 78upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 3upx;
		}
		.text {
			flex: 1;
			font-size: 22upx;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}
		.button {
			text-align: center;
			line-height: 33upx;
			height: 33upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 6upx;
			font-size: 17upx;
			font-weight: 400;
			color: rgba(53, 53, 53, 1);
			margin: 0 33upx;
			padding: 0 10upx;
		}
		.trangle {
			position: absolute;
			right: 20upx;
			top: -36upx;
			border-top: 20upx transparent dashed;
			border-left: 20upx transparent dashed;
			border-right: 20upx transparent dashed;
			border-bottom: 20upx rgba(53, 53, 53, 1) solid;
		}
	}
	#yjcode {
		height: 220upx;
		width: 220upx;
	}
}
</style>
