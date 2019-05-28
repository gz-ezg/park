<template>
	<view class="page">
		<image class="bg" src="../../../../static/highSalary_bg.png"></image>
		<view class="back" @tap="navBack">返回</view>
		<view class="page__title">广州奇异果科技有限公司</view>
		<view class="page__body">
			<view class="tab">
				<view class="tab__item active">荣誉</view>
				<view class="tab__item">发明专利</view>
				<view class="tab__item">实用新型</view>
				<view class="tab__item">外观专利</view>
			</view>
			<scroll-view class="content" scroll-y="true" scroll-with-animation="true">
				<view id="demo1" class="content-item">
					<view class="number">
						1
						<view class="fix"></view>
					</view>
					<view class="title">广州奇异果科技有限公司</view>
					<view class="disc">
						<view class="disc_item">注册时间：2014年4月2日</view>
						<view class="disc_item">产品特色：</view>
					</view>
					<view :class="{ button_gray: true }" class="button">查看荣誉</view>
				</view>
				<view id="demo1" class="content-item">
					<view class="number">
						2
						<view class="fix"></view>
					</view>
					<view class="title">广州奇异果科技有限公司</view>
					<view class="disc">
						<view class="disc_item">注册时间：2014年4月2日</view>
						<view class="disc_item">产品特色：</view>
					</view>
					<view class="button">查看荣誉</view>
				</view>
				<view id="demo1" class="content-item">
					<view class="number">
						3
						<view class="fix"></view>
					</view>

					<view class="title">广州奇异果科技有限公司</view>
					<view class="disc">
						<view class="disc_item">注册时间：2014年4月2日</view>
						<view class="disc_item">产品特色：</view>
					</view>
					<view class="button">查看荣誉</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		channelLogicApi
	} from '@/services/channelLogicApi.js';

	import route from '@/config/route.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {};
		},
		async onLoad(e) {
			try {
				await channelLogicApi.CompanyHonorByName(e);
			} catch (e) {
				//TODO handle the exception
			}
		},
		methods: {
			navBack() {
				uni.navigateTo({
					url: route.highSalary
				});
			},
		}
	};
</script>

<style lang="scss">
	@import '@/styles/mixin.scss';


	.page {
		position: relative;
		width: 100%;
		height: 100vh;

		.bg {
			width: 100%;
			height: 100vh;
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
			@include absolute-center-top(400upx);
			width: 683upx;
			height: 700upx;

			.tab {
				display: flex;
				background: #ffffff;
				border-bottom: 1upx solid rgba(93, 72, 67, 0.1);
				border-radius: 11upx 11upx 0 0;

				&__item {
					position: relative;
					flex: 1;
					font-size: 25upx;
					text-align: center;
					height: 67upx;
					line-height: 67upx;
					font-weight: 600;
					color: rgba(44, 34, 34, 1);
				}

				.active {
					color: #E21616;

					&:after {
						content: '';
						position: absolute;
						left: 0;
						right: 0;
						bottom: 0;
						margin: 0 auto;
						width: 28upx;
						height: 4upx;
						background: rgba(226, 22, 22, 1);
						border-radius: 2upx;
					}
				}
			}

			.content {
				width: 683upx;
				height: 700upx;
				background: #ffffff;
				box-shadow: 0upx -1upx 0upx 0upx rgba(93, 72, 67, 0.16);
				border-radius: 0 0 11upx 11upx;
				overflow: hidden;

				&-item {
					padding: 0 28upx 0 78upx;
					position: relative;
					padding-top: 1rpx;
					height: 175upx;
					border-bottom: 1upx solid rgba(93, 72, 67, 0.16);

					.number {
						position: absolute;
						top: 39upx;
						left: 0;
						width: 67upx;
						height: 67upx;
						font-weight: 900;
						font-size: 67upx;
						line-height: 67rpx;
						text-align: center;
						color: #ff140a;

						.fix {
							border-top: 2upx solid #ff140a;
							background: #ffffff;
							height: 30upx;
							width: 40upx;
							transform: rotate(-40deg);
							position: relative;
							left: 30upx;
							top: -20upx;
						}
					}

					.title {
						margin: 16upx 0;
						font-size: 25upx;
						font-weight: 700;
						color: rgba(44, 34, 34, 1);
						line-height: 40upx;
					}

					.disc {
						font-size: 19upx;
						font-weight: 400;
						color: rgba(125, 131, 134, 1);

						&_item {
							margin: 0 0 10upx 0;
						}
					}

					.button {
						position: absolute;
						right: 28upx;
						top: 79upx;
						width: 133upx;
						height: 50upx;
						font-size: 19upx;
						text-align: center;
						line-height: 50upx;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						background: linear-gradient(90deg, rgba(242, 63, 15, 1) 0%, rgba(246, 30, 21, 1) 100%);
						box-shadow: 0upx -1upx 0upx 0upx rgba(93, 72, 67, 0.16);
					}

					.button_gray {
						background: linear-gradient(90deg, rgba(217, 221, 224, 1) 0%, rgba(198, 204, 207, 1) 100%);
					}
				}
			}
		}
	}
</style>
