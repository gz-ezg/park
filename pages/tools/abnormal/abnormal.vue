<template>
	<view class="page">
		<image class="bg" src="../../../static/abnormal_bg.png" mode=""></image>
		<view class="back" @tap="navBack">返回</view>
		<view class="search">
			<view @tap="handleIkown" class="search__left"><image src="../../../static/search__left.png" mode=""></image></view>
			<view class="search__input">
				<!-- <input placeholder="清收s" /> -->
				<input @blur="onBlur" type="text" />
			</view>
			<view @tap="handleSearch" class="search__right"><image src="../../../static/search__input.png" mode=""></image></view>
		</view>

		<view v-if="isKown" class="tip">
			<image class="img" src="../../../static/qrcode_adm.png" mode=""></image>
			<text class="text">扫码可以在手机上使用哦</text>
			<button @tap="handleIkown" class="button">我知道了</button>
			<view class="trangle"></view>
		</view>

		<x-popup @hidePopup="hidePopup" bgColor="#fff" @ :title="componyName" :show="popup">
			<view class="page__body">
				<view class="tab">
					<view v-for="(item, index) in tabs" @tap="handleTab(index)" :class="{ active: index == tabIndex }" class="tab__item">{{ item.title }}</view>
				</view>
				<scroll-view class="contents" scroll-y="true" scroll-with-animation="true">
					<block v-if="tabIndex == 0">
						<view v-for="(item, index) in businessList" class="contents-item">
							<view class="disc">
								<view class="disc_item">列入经营异常名录原因：{{ item.abnormal_cause }}</view>
								<view class="disc_item">决定机关：{{ item.office }}</view>
								<view class="disc_item">列入日期：{{ item.abnormal_date }}</view>
								<view class="disc_item">移出日期：{{ item.remove_date }}</view>
							</view>
						</view>
						<view class="no_data" v-if="!businessList.length">暂无数据</view>
					</block>
					<block v-if="tabIndex == 1">
						<view v-for="(item, index) in etaxList" class="contents-item">
							<view class="disc">
								<view class="disc_item">税种：{{ item['zsxmmc'] }}</view>
								<view class="disc_item">所属期始：{{ item['skssqq'] }}</view>
								<view class="disc_item">所属期止：{{ item['skssqz'] }}</view>
							</view>
						</view>
						<view class="no_data" v-if="!etaxList.length">暂无数据</view>
					</block>
				</scroll-view>
			</view>
		</x-popup>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
import { formatDate } from '@/utils/index.js';

export default {
	data() {
		return {
			isKown: true,
			list: [],
			popup: false,
			isSearch: false,
			tabIndex: 0,
			componyName: '',
			tabs: [
				{
					title: '工商异常信息'
				},
				{
					title: '税务异常信息'
				}
			],
			etaxList: {},
			businessList: {}
		};
	},
	methods: {
		navBack() {
			uni.navigateTo({
				url: '/pages/index/index'
			});
		},
		handleIkown() {
			this.isKown = !this.isKown;
		},
		onBlur({ detail: { value } }) {
			this.componyName = value;
		},
		async handleSearch() {
			const { componyName } = this;
			this.popup = true;
			try {
				const resp = await channelLogicApi.Business({ componyName });
				this.businessList = JSON.parse(resp).data.abnormalList.map(v => {
					if (v.remove_date) {
						v.remove_date = formatDate(v.remove_date);
					}
					if (v.abnormal_date) {
						v.abnormal_date = formatDate(v.abnormal_date);
					}
					return v;
				});

				this.getEtax(componyName);
			} catch (e) {
				console.log(e);
			} finally {
			}
		},
		showDetail() {
			this.popup = true;
		},
		hidePopup() {
			this.popup = false;
		},
		handleTab(index) {
			this.tabIndex = index;
		},
		async getEtax(componyName) {
			const resp = await channelLogicApi.Etax({ componyName });
			this.etaxList = JSON.parse(resp).data.taxML.body.taxML.sbqkList.sbqk;
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
	.no_data {
		margin: 30upx;
		text-align: center;
		font-size: 22upx;
		font-weight: 400;
		color: #000;
	}
	.bg {
		width: 100%;
		height: 100%;
	}
	.tip {
		@include absolute-center-top(470upx);
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
			left: 20upx;
			top: -36upx;
			border-top: 20upx transparent dashed;
			border-left: 20upx transparent dashed;
			border-right: 20upx transparent dashed;
			border-bottom: 20upx rgba(53, 53, 53, 1) solid;
		}
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
		@include absolute-center-top(470upx);
		width: 683upx;
		background: #ffffff;
		height: 600upx;
		box-shadow: 0upx -1upx 0upx 0upx rgba(93, 72, 67, 0.16);
		border-radius: 11upx;
		overflow: hidden;

		&-item {
			padding: 0 28upx;
			position: relative;
			padding-top: 1rpx;
			border-bottom: 1upx solid rgba(93, 72, 67, 0.16);
			height: 89upx;
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

	&__body {
		// @include absolute-center-top(400upx);
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
				margin-top: 10upx;
				min-height: 175upx;
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
						font-size: 19upx;
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
