<template>
	<view class="page">
		<view :class="{ blur: loading }">
			<image class="bg" src="../../../static/enterprise__bg.png"></image>
			<view class="back" @tap="navBack">返回</view>

			<scroll-view class="content" scroll-y="true" scroll-with-animation="true">
				<view v-for="(item, index) in list" class="content-item" :key="item.id">
					<view class="title">{{ item.company_name }}</view>
					<view class="disc">
						<view class="disc_item">注册时间：{{ item.register_time }}</view>
						<view class="disc_item">产品特色：{{ item.product_feature }}</view>
						<view class="disc_item">办公地点：{{ item.address }}</view>
					</view>
					<view @tap="handleLook(item.website)" :class="{ button_gray: !item.website }" class="button">查看官网</view>
				</view>
			</scroll-view>
		</view>
		<x-Loading :show="loading"></x-Loading>
	</view>
</template>

<script>
import route from '@/config/route.js';
import { channelLogicApi } from '@/services/channelLogicApi.js';
import { mapState, mapMutations } from 'vuex';
import { formatDate } from '@/utils/index.js';
export default {
	data() {
		return {
			list: [],
			website: false,
			loading: true
		};
	},
	async onLoad() {
		try {
			let rep = await channelLogicApi.ChannelTypeCompanyList({ page: 1, pageSize: 10 });
			if (rep.rows.length) {
				this.list = rep.rows.map(v => {
					v.register_time = formatDate(v.register_time, 'yyyy年MM月dd日');
					return v;
				});
			}
		} catch (e) {
			//TODO handle the exception
		} finally {
			this.loading = false;
		}
	},

	methods: {
		navBack() {
			uni.navigateTo({
				url: '/pages/index/index'
			});
		},
		handleLook(e) {
			if (!e) {
				return;
			}
			window.open(`http://${e}`);
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
		min-height: 1334upx;
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
				overflow: hidden;
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
