<template>
	<view class="page">
		<image class="bg" src="../../../static/highSalary_bg.png"></image>
		<view class="back" @tap="navBack">返回</view>

		<scroll-view class="content" scroll-y="true" scroll-with-animation="true">
			<view v-for="(item, index) in list" id="demo1" class="content-item">
				<view class="number">
					{{ index + 1 }}
					<view class="fix"></view>
				</view>
				<view class="title">{{ item.company_name }}</view>
				<view class="disc">
					<view class="disc_item">注册时间：{{ item.register_time }}</view>
					<view class="disc_item">产品特色：{{ item.product_feature }}</view>
				</view>
				<view @tap="handleLook(item.company_name)" class="button">查看荣誉</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';

import route from '@/config/route.js';
import { mapState, mapMutations } from 'vuex';
import { formatDate } from '@/utils/index.js';
export default {
	data() {
		return {
			list: []
		};
	},
	async onLoad() {
		try {
			console.log();
			const resp = await channelLogicApi.TopFiveCompny();
			this.list = resp.map(v => {
				v.register_time = formatDate(v.register_time, 'yyyy年MM月dd日');
				return v;
			});
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

		async handleLook(e) {
			this.$api.navigateTo({
				url: route.companyDetail,
				data: {
					componyName:e
				}
			});
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

		.content {
			@include absolute-center-top(346upx);
			width: 683upx;
			height: 700upx;
			background: #ffffff;
			box-shadow: 0upx -1upx 0upx 0upx rgba(93, 72, 67, 0.16);
			border-radius: 11upx;
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
				overflow: hidden;
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
</style>
