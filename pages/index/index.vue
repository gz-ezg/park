<template>
	<view class="index">
		<view :class="{ blur: loading }">
			<image class="index__bg-top " src="../../static/index_top-bg.png"></image>
			<image class="index__bg-bottom" src="../../static/index_bottom.png"></image>
			<view @tap="navTo" class="index__header">
				<view data-index="enterprise" class="index__header-item">
					<image data-index="enterprise" src="../../static/index__icon1.png" class="icon"></image>
					<view data-index="enterprise" class="title">企业名录</view>
				</view>
				<view data-index="highSalary" class="index__header-item mlr-30">
					<image data-index="highSalary" src="../../static/index__icon2.png" class="icon"></image>
					<view data-index="highSalary" class="title">高新企业榜</view>
				</view>
				<view data-index="finance" class="index__header-item">
					<image data-index="finance" src="../../static/index__icon3.png" class="icon"></image>
					<view data-index="finance" class="title">获取财税服务</view>
				</view>
			</view>
			<view class="index__body">
				<view class="index__body-title">常用工具</view>
				<view @tap="navTo" class="index__body-content">
					<view data-index="latestPolicy" class="index__body-content-item">
						<image data-index="latestPolicy" src="../../static/index_icons01.png" class="icon" mode=""></image>
						<view data-index="latestPolicy" class="title">最新政策</view>
					</view>
					<view data-index="patent" class="index__body-content-item">
						<image data-index="patent" src="../../static/index_icons02.png" class="icon" mode=""></image>
						<view data-index="patent" class="title">专利荣誉查询</view>
					</view>
					<view data-index="abnormal" class="index__body-content-item">
						<image data-index="abnormal" src="../../static/index_icons03.png" class="icon" mode=""></image>
						<view data-index="abnormal" class="title">企业异常查询</view>
					</view>
				</view>
				<view @tap="navTo" class="index__body-content">
					<view data-index="bill" class="index__body-content-item">
						<image data-index="bill" src="../../static/index_icons04.png" class="icon" mode=""></image>
						<view data-index="bill" class="title">发票查验</view>
					</view>
					<view data-index="subsidy" class="index__body-content-item">
						<image data-index="subsidy" src="../../static/index_icons05.png" class="icon" mode=""></image>
						<view data-index="subsidy" class="title">政府补助测评</view>
					</view>
					<view data-index="income" class="index__body-content-item">
						<image data-index="income" src="../../static/index_icons06.png" class="icon" mode=""></image>
						<view data-index="income" class="title">个税测算</view>
					</view>
				</view>
				<view @tap="call" class="index__body-button">一键呼叫园内财税管家</view>
				<view class="index__text">
					<view class="line"></view>
					<view class="year">2019</view>
					<view class="copyright">Copyright @2004 - 2019 xxxx.com 版权所有</view>
				</view>
			</view>
		</view>
		<x-Loading :show="loading"></x-Loading>
	</view>
</template>

<script>
import route from '@/config/route.js';
import { channelLogicApi } from '@/services/channelLogicApi.js';

import { mapState, mapMutations } from 'vuex';
let timer;
export default {
	data() {
		return {
			loading: false
		};
	},
	onLoad() {},
	onShow() {
		clearTimeout(timer);
		timer = setTimeout(v => {
			uni.reLaunch({
				url: route.router
			});
		}, 20000);
	},
	onHide() {
		clearTimeout(timer);
	},
	methods: {
		navTo({ target: { dataset } }) {
			this.$api.navigateTo({
				url: route[dataset.index]
			});
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
	background: #eef0f7;
	font-size: 0;
	height: 100%;
	overflow: hidden;
}
.index {
	width: 100%;
	height: 100%;

	&__bg {
		&-top {
			width: 100vw;
			height: 435upx;
		}

		&-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
			height: 280upx;
		}
	}

	&__header {
		position: relative;
		top: -140upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		.mlr-30 {
			margin: 0 0upx;
		}
		&-item {
			margin: 0 20upx;
			width: 211upx;
			height: 256upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0upx 10upx 21upx 0upx rgba(69, 0, 0, 0.15);
			border-radius: 11upx;

			.icon {
				margin: 44upx auto 22upx auto;
				display: block;
				height: 100upx;
				width: 100upx;
			}

			.title {
				text-align: center;
				font-size: 24upx;
				font-weight: 400;
				color: rgba(44, 34, 34, 1);
			}
		}
	}

	&__body {
		overflow: none;
		position: relative;
		margin: -120upx auto 0;
		width: 683upx;
		height: 433upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0upx 10upx 21upx 0upx rgba(69, 0, 0, 0.1);
		border-radius: 11upx;

		&-title {
			text-align: center;
			height: 100upx;
			font-size: 28upx;
			font-weight: 500;
			color: rgba(44, 34, 34, 1);
			line-height: 100upx;
		}

		&-content {
			display: flex;
			justify-content: space-around;
			align-items: center;

			&-item {
				width: 211upx;
				height: 137upx;

				.icon {
					display: block;
					margin: 0 auto;
					margin-bottom: 19upx;
					width: 67upx;
					height: 67upx;
				}

				.title {
					text-align: center;
					font-size: 24upx;
					font-weight: 400;
					color: rgba(44, 34, 34, 1);
				}
			}
		}

		&-button {
			position: absolute;
			bottom: -31upx;
			margin: 0 auto;
			left: 0;
			right: 0;
			width: 389upx;
			height: 72upx;
			font-size: 28upx;
			color: rgba(255, 255, 255, 1);
			background: rgba(226, 22, 22, 1);
			border-radius: 42upx;
			text-align: center;
			line-height: 72upx;
			z-index: 1;
		}
	}
	&__text {
		position: fixed;
		bottom: 0;
		left: 0;
		color: #e21616;
		margin: 0 0 40upx 40upx;
		.line {
			width: 50upx;
			height: 8upx;
			background: #e21616;
			margin-bottom: 10upx;
		}
		.year {
			font-size: 37upx;
			font-weight: 700;
		}
		.copyright {
			width: 240upx;
			font-size: 14upx;
			font-weight: 500;
			color: rgba(226, 22, 22, 1);
			line-height: 30upx;
		}
	}
}
</style>
