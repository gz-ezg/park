<template>
	<view class="page">
		<view :class="{ blur: loading }">
			<image @click.stop="selectOk" class="bg" src="../../../static/latestPolicy_bg.png" mode=""></image>
			<view class="back" @tap="navBack">返回</view>
			<view class="search">
				<view @tap="handleSelectAddress" class="search__left">
					{{ myArea }}
					<view class="trangle"></view>
				</view>
				<view class="search__input"><input @focus="onFocus" @blur="onBlur" placeholder-style="font-size:14px;color:rgba(44,34,34,0.24);" placeholder="搜索关键字" /></view>
				<view @tap="handleSearch" class="search__right"><image src="../../../static/search__input.png" mode=""></image></view>
			</view>
			<picker-view class="picker" v-if="isSelect" indicator-class="selectClass" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item, index) in provinceList" :key="index">{{ item }}</view>
				</picker-view-column>
				<picker-view-column>
					<view @click="handleQuit" class="item" v-for="(item, index) in city" :key="index">{{ item }}</view>
				</picker-view-column>
			</picker-view>
			<scroll-view v-if="list.length" class="content" scroll-y="true" @scrolltolower="scrolltolower" scroll-with-animation="true">
				<view v-for="(item, index) in list" :key="item.id" @tap="showDetail(index)" class="content-item">
					<view class="title">{{ item.Title }}</view>
					<view class="disc">
						{{ item.Province }}
						<text style="margin: 0 20upx;">{{ item.Label }}</text>
						{{ item.Date }}
					</view>
				</view>
			</scroll-view>

			<x-popup bgColor="#fff" :show="show" :title="detail.Title" @hidePopup="hidePopup">
				<scroll-view style="padding: 0;" class="popus" scroll-y="true" scroll-with-animation="true">
					<view class="popus"><rich-text :nodes="detail.HContent"></rich-text></view>	
				</scroll-view>
			</x-popup>
		</view>
		<x-Loading :show="loading"></x-Loading>
	</view>
</template>
d
<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
import { formatDate } from '@/utils/index.js';
let province = [];

export default {
	data() {
		return {
			provinceList: [],
			city: [],
			title: '',
			cityId: '',
			isSelect: false,
			show: false,
			list: [],
			detail: {},
			value: [0, 0],
			indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`,
			loading: false,
			page: 0,
			pageSize: 10,
			hasMore: true,
			myArea: ''
		};
	},
	async onShow() {
		await this.hanleGetUserCity();
		let tmpList = uni.getStorageSync('province');
		if (tmpList) {
			province = tmpList;
			this.provinceList = tmpList.map(v => v.province.realname);
		} else {
			this.getProvince();
		}
		this.handleDefaultProvince();
	},
	methods: {
		// onPicLoaded() {
		// 	this.loading = false
		// },
		async hanleGetUserCity() {
			try {
				const resp = await channelLogicApi.getUserCity();
				this.cityId = resp.city;
			} catch (e) {
				this.$api.toast('获取地址失败');
			} finally {
			}
		},
		handleDefaultProvince() {
			let { cityId } = this;
			let cIndex;
			let pIndex = province.findIndex((v1, i1) => {
				return (
					v1.city.findIndex((v2, i2) => {
						if (v2.id == cityId) {
							this.myArea = v2.realname;
							cIndex = i2;
							return true;
						}
					}) != -1
				);
			});
			this.value = [pIndex, cIndex];
			this.city = province[pIndex].city.map(v => v.realname);
		},
		async getProvince() {
			this.loading = true;
			try {
				province = await channelLogicApi.GetProvinceList();
				this.provinceList = province.map(v => v.province.realname);
				uni.setStorageSync('province', province);
			} catch (e) {
				//TODO handle the exception
			} finally {
				this.loading = false;
			}
		},
		onFocus() {
			this.isSelect = false;
		},
		onBlur({ detail: { value } }) {
			this.title = value;
		},
		scrolltolower(e) {
			this.getList();
		},
		async getList() {
			this.loading = true;
			if (!this.hasMore) {
				return false;
			}
			if (!this.page) {
				this.list = [];
			}
			this.page = Number(this.page) + 1;
			try {
				const resp = await channelLogicApi.PolicyList({ city: this.myArea, title: this.title, page: this.page, pageSize: this.pageSize });
				if (!resp.result.length) {
					this.$api.toast('查询暂无结果');
					this.page = 0;
				}
				this.hasMore = resp.total > this.page * this.pageSize ? true : false;

				this.list = [
					...this.list,
					...resp.result.map(v => {
						v.Date = formatDate(v.Date, 'yyyy-MM-dd');
						return v;
					})
				];
			} catch (e) {
				//TODO handle the exception
			} finally {
				this.loading = false;
			}
		},
		handleSelectAddress() {
			this.isSelect = !this.isSelect;
			this.list = [];
		},
		async handleSearch() {
			this.isSelect = false;
			this.page = [];
			if (!this.title) {
				return this.$api.toast('请输入关键字');
			}

			if (this.loading) {
				return;
			}
			this.getList();
		},
		bindChange({ detail: { value } }) {
			console.log(value);
			this.value = value;
			this.city = province[value[0]].city.map(v => v.realname);
			this.myArea = this.city[value[1]];
		},
		navBack() {
			uni.navigateTo({
				url: '/pages/index/index'
			});
		},
		selectOk() {
			this.isSelect = false;
			this.list = [];
		},
		showDetail(index) {
			this.show = true;
			this.detail = this.list[index];
		},
		hidePopup() {
			this.show = false;
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
		width: 100%;
		height: 100%;
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
	.picker {
		@include absolute-center-top(452upx);
		width: 683upx;
		height: 500upx;
		font-size: 24upx;
		color: #000;
		background: #ffffff;
		border-radius: 10upx;
		overflow: hidden;

		.item {
			line-height: 100upx;
			text-align: center;
			// width: 100upx;
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
			position: relative;
			display: flex;
			align-items: center;
			// justify-content: center;
			padding-left: 14upx;
			width: 132upx;
			height: 78upx;
			font-size: 22upx;
			box-shadow: -1upx 0px 0px 0px rgba(93, 72, 67, 0.16);
			// background: rgba(93, 72, 67, 0.08);

			.trangle {
				position: absolute;
				right: 12upx;
				top: 38upx;
				width: 0;
				height: 0;
				border-width: 6upx;
				border-style: solid;
				border-color: #000 transparent transparent transparent;
			}
			image {
				height: 30upx;
				width: 30upx;
			}
		}

		&__input {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
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
	.content {
		@include absolute-center-top(460upx);
		width: 683upx;
		height: 600upx;
		background: #ffffff;
		box-shadow: 0upx -1upx 0upx 0upx rgba(93, 72, 67, 0.16);
		border-radius: 11upx;
		overflow: hidden;

		&-item {
			padding: 0 28upx;
			position: relative;
			padding-top: 1rpx;
			height: 150upx;
			border-bottom: 1upx solid rgba(93, 72, 67, 0.16);

			.title {
				margin: 16upx 0;
				font-size: 25upx;
				font-weight: 500;
				color: rgba(44, 34, 34, 1);
				line-height: 40upx;
				padding-right: 10upx;
				overflow: hidden;
				// width: 683upx;
				@include ellipse-text(1);
			}

			.disc {
				font-size: 19upx;
				font-weight: 400;
				color: rgba(125, 131, 134, 1);
				@include ellipse-text(1);
				overflow: hidden;

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
	.popus {
		padding: 0 33upx 33upx;
		font-size: 19upx;
		color: #7d8386;
		// overflow: hidden;
		max-height: 1000upx;
		// width: 683upx;
	}
}
</style>
