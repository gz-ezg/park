<template>
	<view class="page">
		<view :class="{ blur: loading }">
			<image @tap.stop="handleClose" class="bg" src="../../../static/patent_bg.png" mode=""></image>
			<view class="back" @tap="navBack">返回</view>
			<view class="search">
				<!-- <view class="search__left"><image src="../../../static/search__left.png" mode=""></image></view> -->
				<view class="search__input">
					<!-- <input placeholder="清收s" /> -->
					<input @blur="onBlur" type="text" />
				</view>
				<view @tap="handleSearch" class="search__right"><image src="../../../static/search__input.png" mode=""></image></view>
			</view>

			<scroll-view v-if="isSearch" class="content" scroll-y="true" scroll-with-animation="true">
				<view @tap="handleDetail(item.company_name)" v-for="(item, index) in list" :key="item.id" class="content-item">{{ item.company_name }}</view>
			</scroll-view>
		</view>
		<x-popup @hidePopup="hidePopup" bgColor="#fff" @ :title="componyName" :show="popup">
			<view class="page__bodys">
				<view class="tab">
					<view v-for="(item, index) in tabs" @tap="handleTab(index)" :class="{ active: index == tabIndex }" class="tab__item">{{ item.title }}</view>
				</view>
				<scroll-view class="contents" scroll-y="true" scroll-with-animation="true">
					<block v-if="tabIndex == 0">
						<view v-for="(item, index) in detailList" class="contents-item">
							<!-- <view class="title">广州奇异果科技有限公司</view> -->
							<view class="discs">
								<view class="discs_item">名称：{{ item.XMMC }}</view>
								<view class="discs_item">类型：{{ item.XMLB }}</view>
								<view class="discs_item">年份：{{ item.NF }}</view>
							</view>
						</view>
					</block>
					<block v-if="tabIndex == 1">
						<view v-for="(item, index) in detailList" class="contents-item">
							<!-- <view class="title">广州奇异果科技有限公司</view> -->
							<view class="discs">
								<view class="discs_item">发明（设计）人：{{ item['发明（设计）人'] }}</view>
								<view class="discs_item">名称：{{ item['名称'] }}</view>
								<view class="discs_item">申请号：{{ item['申请号'] }}</view>
							</view>
						</view>
					</block>
					<block v-if="tabIndex == 2">
						<view v-for="(item, index) in detailList" class="contents-item">
							<!-- <view class="title">广州奇异果科技有限公司</view> -->
							<view class="discs">
								<view class="discs_item">发明（设计）人：{{ item['发明（设计）人'] }}</view>
								<view class="discs_item">名称：{{ item['名称'] }}</view>
								<view class="discs_item">公开（公告）日：{{ item['公开（公告）日'] }}</view>
							</view>
						</view>
					</block>
					<block v-if="tabIndex == 3">
						<view v-for="(item, index) in detailList" class="contents-item">
							<!-- <view class="title">广州奇异果科技有限公司</view> -->
							<view class="discs">
								<view class="discs_item">发明（设计）人：{{ item['发明（设计）人'] }}</view>
								<view class="disc_item">名称：{{ item['名称'] }}</view>
								<view class="discs_item">公开（公告）日：{{ item['公开（公告）日'] }}</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</x-popup>

		<x-Loading :show="loading"></x-Loading>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
export default {
	data() {
		return {
			loading: false,
			isSearch: false,
			list: [],
			popup: false,
			tabIndex: 0,
			detailList: [],
			componyName:'',
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
			totalList: {}
		};
	},
	onLoad() {},
	methods: {
		navBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		async handleDetail(componyName) {
			this.list = [];
			this.componyName = componyName;
			try {
				const resp = await channelLogicApi.CompanyHonorByName({ componyName });
				this.detailList = resp.rongyu;
				this.totalList = resp;
				this.popup = true;
			} catch (e) {
				//TODO handle the exception
			} finally {
				this.loading = false;
			}
		},
		onBlur({ detail: { value } }) {
			this.componyName = value;
		},
		async handleSearch() {
			this.isSearch = false;
			this.loading = true;
			try {
				this.list = await channelLogicApi.QueryChannelCompnyByName({ componyName: this.componyName });
				this.isSearch = true;
			} catch (e) {
				this.$api.toast('该企业在园区下不存在');
			} finally {
				this.loading = false;
			}
		},
		handleClose() {
			this.list = [];
		},
		hidePopup() {
			this.popup = false;
		},
		handleTab(index) {
			this.tabIndex = index;
			switch (index) {
				case 0:
					this.detailList = this.totalList['rongyu'];
					break;
				case 1:
					this.detailList = this.totalList['fmzl'];
					break;
				case 2:
					this.detailList = this.totalList['wgzl'];
					break;
				case 3:
					this.detailList = this.totalList['syxx'];
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
	width: 100%;
	height: 100vh;
	min-height: 1334upx;
	overflow: hidden;
	> view {
		height: 100%;
		width: 100%;
	}
	.bg {
		width: 100%;
		height: 100%;
		min-height: 1334upx;
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
	.search {
		@include absolute-center-top(368upx);
		display: flex;
		border-radius: 6upx;
		width: 683upx;
		height: 78upx;
		background: white;

		&__left {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 78upx;
			height: 78upx;
			background: rgba(93, 72, 67, 0.08);

			image {
				height: 30upx;
				width: 30upx;
			}
		}

		&__input {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30upx;
			flex: 1;
			height: 100%;
			line-height: 78upx;

			input {
				width: 90%;
			}
		}

		&__right {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 104upx;
			height: 78upx;
			background: linear-gradient(90deg, rgba(242, 63, 15, 1) 0%, rgba(246, 30, 21, 1) 100%);
			border-radius: 0px 6upx 6upx 0px;

			image {
				height: 40upx;
				width: 40upx;
			}
		}
	}
	&__bodys {
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
	
		.contents {
			width: 683upx;
			height: 700upx;
			background: #ffffff;
			box-shadow: 0upx -1upx 0upx 0upx rgba(93, 72, 67, 0.16);
			border-radius: 0 0 11upx 11upx;
			overflow: hidden;
	
			&-item {
				@include flex-center();
				// padding: 0 28upx 0 78upx;
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
	
				.discs {
					font-size: 19upx;
					font-weight: 400;
					color: rgba(125, 131, 134, 1);
					width: 606upx;
	
					&_items {
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
	.content {
		@include absolute-center-top(470upx);
		width: 683upx;
		background: #ffffff;
		box-shadow: 0upx -1upx 0upx 0upx rgba(93, 72, 67, 0.16);
		border-radius: 11upx;
		max-height: 480upx;
		overflow: hidden;

		&-item {
			padding: 0 28upx;
			position: relative;
			padding-top: 1rpx;
			font-size: 25upx;
			font-weight: 500;
			color: rgba(44, 34, 34, 1);
			border-bottom: 1upx solid rgba(93, 72, 67, 0.16);
			height: 89upx;
			line-height: 89upx;
			box-shadow: 0px -1px 0px 0px rgba(93, 72, 67, 0.16);

			.title {
				margin: 20upx 0;
				font-size: 25upx;
				font-weight: 500;
				color: rgba(44, 34, 34, 1);
				line-height: 40upx;
				overflow: hidden;
			}
		}
	}
}
</style>
