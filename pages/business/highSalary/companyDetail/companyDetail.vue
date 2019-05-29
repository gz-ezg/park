<template>
	<view class="page">
		<image class="bg" src="../../../../static/highSalary_bg.png"></image>
		<view class="back" @tap="navBack">返回</view>
		<view class="page__title">{{componyName}}</view>
		<view class="page__body">
			<view class="tab">
				<view v-for="(item, index) in tabs" @tap="handleTab(index)" :class="{ active: index == tabIndex }" class="tab__item">{{ item.title }}</view>
			</view>
			<scroll-view class="content" scroll-y="true" scroll-with-animation="true">
				<block v-if="tabIndex == 0">
					<view v-for="(item, index) in list" class="content-item">
						<!-- <view class="title">广州奇异果科技有限公司</view> -->
						<view class="disc">
							<view class="disc_item">名称：{{ item.XMMC }}</view>
							<view class="disc_item">类型：{{ item.XMLB }}</view>
							<view class="disc_item">年份：{{ item.NF }}</view>
						</view>
					</view>
				</block>
				<block v-if="tabIndex == 1">
					<view v-for="(item, index) in list" class="content-item">
						<!-- <view class="title">广州奇异果科技有限公司</view> -->
						<view class="disc">
							<view class="disc_item">发明（设计）人：{{ item['发明（设计）人'] }}</view>
							<view class="disc_item">名称：{{ item['名称'] }}</view>
							<view class="disc_item">公开（公告）日：{{ item['公开（公告）日'] }}</view>
						</view>
					</view>
				</block>
				<block v-if="tabIndex == 2">
					<view v-for="(item, index) in list" class="content-item">
						<!-- <view class="title">广州奇异果科技有限公司</view> -->
						<view class="disc">
							<view class="disc_item">发明（设计）人：{{ item['发明（设计）人'] }}</view>
							<view class="disc_item">名称：{{ item['名称'] }}</view>
							<view class="disc_item">公开（公告）日：{{ item['公开（公告）日'] }}</view>
						</view>
					</view>
				</block>
				<block v-if="tabIndex == 3">
					<view v-for="(item, index) in list" class="content-item">
						<!-- <view class="title">广州奇异果科技有限公司</view> -->
						<view class="disc">
							<view class="disc_item">发明（设计）人：{{ item['发明（设计）人'] }}</view>
							<view class="disc_item">名称：{{ item['名称'] }}</view>
							<view class="disc_item">公开（公告）日：{{ item['公开（公告）日'] }}</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';

import route from '@/config/route.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			tabIndex: 0,
			tabs: [
				{
					title: '荣誉'
				},
				{
					title: '发明专利'
				},
				{
					title: '实用新型'
				},
				{
					title: '外观专利'
				}
			],
			totalList: {},
			list:[]
		};
	},
	async onLoad({ componyName }) {
		try {
			this.componyName = componyName;
			const resp = await channelLogicApi.CompanyHonorByName({ componyName });
			console.log(resp);

			this.list = resp.rongyu;
			this.totalList = resp;
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
		handleTab(index) {
			this.tabIndex = index;
			switch (index) {
				case 0:
					this.list = this.totalList['rongyu'];
					break;
				case 1:
					this.list = this.totalList['fmzl'];
					break;
				case 2:
					this.list = this.totalList['wgzl'];
					break;
				case 3:
					this.list = this.totalList['syxx'];
					break;
				default:
					break;
			}
		}
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
				color: #e21616;

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
				@include flex-center()// padding: 0 28upx 0 78upx;
					position: relative;
				padding-top: 1rpx;
				height: 175upx;
				border-bottom: 1upx solid rgba(93, 72, 67, 0.16);

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
					width: 606upx;

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
