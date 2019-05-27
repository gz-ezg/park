<template>
	<view class="index">
		<view @tap="navTo" class="index__header">
			<view data-index="enterprise" class="index__header-item">
				<image data-index="enterprise" class="icon"></image>
				<view data-index="enterprise" class="title">企业名录</view>
			</view>
			<view data-index="highSalary" class="index__header-item">
				<image data-index="highSalary" class="icon"></image>
				<view data-index="highSalary" class="title">高新企业榜</view>
			</view>
			<view data-index="finance" class="index__header-item">
				<image data-index="finance" class="icon"></image>
				<view data-index="finance" class="title">获取财税服务</view>
			</view>
		</view>
		<view class="index__body">
			<view class="index__body-title">常用工具</view>
			<view @tap="navTo" class="index__body-content">
				<view data-index="latestPolicy" class="index__body-content-item">
					<image data-index="latestPolicy" class="icon" mode=""></image>
					<view data-index="latestPolicy" class="title">最新政策</view>
				</view>
				<view data-index="patent" class="index__body-content-item">
					<image data-index="patent" class="icon" mode=""></image>
					<view data-index="patent"  class="title">专利荣誉查询</view>
				</view>
				<view data-index="abnormal" class="index__body-content-item">
					<image data-index="abnormal" class="icon" mode=""></image>
					<view data-index="abnormal"  class="title">企业异常查询</view>
				</view>
			</view>
			<view @tap="navTo" class="index__body-content">
				<view data-index="bill"  class="index__body-content-item">
					<image data-index="bill"  class="icon" mode=""></image>
					<view data-index="bill"  class="title">发票查验</view>
				</view>
				<view data-index="subsidy"  class="index__body-content-item">
					<image data-index="subsidy"  class="icon" mode=""></image>
					<view data-index="subsidy"   class="title">政府补助测评</view>
				</view>
				<view class="index__body-content-item">
					<image data-index="income"  class="icon" mode=""></image>
					<view data-index="income"  class="title">个税测算</view>
				</view>
			</view>
			<view class="index__body-button">一键呼叫园内财税管家</view>
		</view>
	</view>
</template>

<script>
import route from '@/config/route.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			title: 'hello world'
		};
	},
	onLoad() {},
	onShow() {},
	methods: {
		navTo({ target: { dataset } }) {
			console.log(dataset);
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

	&__header {
		@include flex-around();

		margin-top: 348upx;
		&-item {
			width: 211upx;
			height: 256upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0upx 10upx 21upx 0upx rgba(69, 0, 0, 0.15);
			border-radius: 11upx;
			.icon {
				margin: 44upx 0 22upx 0;
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
		margin: 40upx auto 0;
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
			@include flex-evenly();

			&-item {
				width: 211upx;
				height: 137upx;

				.icon {
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
			bottom: -20upx;
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
}
</style>
