<template>
	<view class="page">
		<image class="bg" src="../../../static/enterprise__bg.png"></image>
		<view class="back" @tap="navBack">返回</view>

		<scroll-view class="content" scroll-y="true" scroll-with-animation="true">
			<view id="demo1" class="content-item">
				<view class="title">广州奇异果科技有限公司</view>
				<view class="disc">
					<view class="disc_item">注册时间：2014年4月2日</view>
					<view class="disc_item">产品特色：</view>
					<view class="disc_item">办公地点：</view>
				</view>
				<view @tap="handleLook" :class="{ button_gray: true }" class="button">查看官网</view>
			</view>
			<view id="demo1" class="content-item">
				<view class="title">广州奇异果科技有限公司</view>
				<view class="disc">
					<view class="disc_item">注册时间：2014年4月2日</view>
					<view class="disc_item">产品特色：</view>
					<view class="disc_item">办公地点：</view>
				</view>
				<view @tap="handleLook" class="button">查看官网</view>
			</view>
			<view id="demo1" class="content-item">
				<view class="title">广州奇异果科技有限公司</view>
				<view class="disc">
					<view class="disc_item">注册时间：2014年4月2日</view>
					<view class="disc_item">产品特色：</view>
					<view class="disc_item">办公地点：</view>
				</view>
				<view @tap="handleLook" class="button">查看官网</view>
			</view>
			<view id="demo3" class="content-item">C</view>
			<view id="demo3" class="content-item">C</view>
			<view id="demo3" class="content-item">C</view>
			<view id="demo3" class="content-item">C</view>
		</scroll-view>
	</view>
</template>

<script>
import route from '@/config/route.js';
import { channelLogicApi } from '@/services/channelLogicApi.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {};
	},
	async onLoad() {
		try {
			let rep = await channelLogicApi.ChannelTypeCompanyList({ page: 1, pageSize: 10 });
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
		handleLook(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/mixin.scss';

page {
	font-size: 0;
	overflow: hidden;
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
		height: 628upx;
		background: #ffffff;
		box-shadow: 0upx -1upx 0upx 0upx rgba(93, 72, 67, 0.16);
		border-radius: 11upx;
		overflow: hidden;

		&-item {
			padding: 0 28upx;
			position: relative;
			padding-top: 1rpx;
			height: 208upx;
			border-bottom: 1upx solid rgba(93, 72, 67, 0.16);

			.title {
				margin: 20upx 0;
				font-size: 25upx;
				font-weight: 500;
				color: rgba(44, 34, 34, 1);
				line-height: 40upx;
			}

			.disc {
				font-size: 19upx;
				font-weight: 400;
				color: rgba(125, 131, 134, 1);

				&_item {
					margin: 10upx 0;
				}
			}

			.button {
				position: absolute;
				right: 28upx;
				top: 90upx;
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
