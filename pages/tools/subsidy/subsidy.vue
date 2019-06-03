<template>
	<view class="page">
		<image class="bg" src="../../../static/subsidy_bg.png" mode=""></image>
		<view class="back" @tap="navBack">返回</view>
		<view class="page__title">项目申报：政策补贴最高300W</view>
		<view class="page__body">
			<view class="item">
				<view class="title">公司名称</view>
				<input @blur="handleInput" data-name="companyname" class="item__iput" placeholder="请输入公司名称" />
			</view>
			<view class="item">
				<view class="title">负责人名称</view>
				<input @blur="handleInput" data-name="tel" class="item__iput" placeholder="请输入负责人名称" />
			</view>
			<view class="item">
				<view class="title">联系方式</view>
				<input type="number" maxlength="11" @blur="handleInput" data-name="name" class="item__iput" placeholder="请输入手机号码" />
			</view>
			<view @tap="handleSubmit" class="button">立即提交</view>
			<image src="../../../static/icon_blue-sm.png" class="icon__bottom" mode=""></image>
		</view>
		<view v-if="isKown" class="tip">
			<image class="img" src="" mode=""></image>
			<text class="text">扫码可以在手机上使用哦</text>
			<button @tap="handleIkown" class="button">我知道了</button>
			<view class="trangle"></view>
		</view>

		<x-popup :show="show" @hidePopup="hidePopup">
			<view class="popus"><image src="../../../static/pop.png" class="popus__img"></image></view>
		</x-popup>
		<x-loading :show="show"></x-loading>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
import xPopup from '@/components/x-popup/x-popup.vue';
import xLoading from '@/components/x-loading/x-loading.vue';
import route from '@/config/route.js';

export default {
	data() {
		return {
			from: {},
			show: false,
			isKown: true
		};
	},
	components: {
		xPopup,
		xLoading
	},

	methods: {
		handleInput({ detail: { value }, target: { dataset } }) {
			this[dataset.name] = value;
		},
		handleIkown() {
			this.isKown = false;
		},
		navBack() {
			uni.navigateTo({
				url: route.index
			});
		},
		async handleSubmit() {
			let { companyname, tel, name } = this;
			if (!companyname) {
				return this.$api.toast('公司名称不能为空');
			}
			if (!name) {
				return this.$api.toast('负责人名称不能为空');
			}
			if (!tel) {
				return this.$api.toast('联系方式不能为空');
			}
			this.$api.navigateTo({ url: route.subsidyDetail, data: {
				companyname,
				tel,
				name
			} });

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
	background-size: contain;
	overflow: hidden;

	.bg {
		width: 100%;
		height: 100%;
	}

	.popus {
		width: 550upx;
		height: 733upx;

		&__img {
			transform: scale(1.1);
			// box-shadow: 0px 11upx 17upx 0upx rgba(0, 0, 0, 0.24);
			height: 100%;
			width: 100%;
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

	&__title {
		position: absolute;
		left: 33upx;
		top: 334upx;
		font-size: 33upx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}

	&__body {
		@include absolute-center-top(406upx);
		width: 683upx;
		height: 383upx;
		padding: 11upx 0 0 0;
		background: rgba(255, 255, 255, 1);
		border-radius: 11upx;

		.item {
			display: flex;
			align-items: center;
			font-size: 22upx;
			font-weight: 500;
			height: 78rpx;
			padding: 0 28upx;
			box-shadow: 0px 1px 0px 0px rgba(93, 72, 67, 0.16);

			.title {
				width: 180upx;
			}

			.item__iput {
				flex: 1;
			}
		}

		.button {
			width: 389upx;
			height: 72upx;
			background: rgba(226, 22, 22, 1);
			border-radius: 42upx;
			text-align: center;
			line-height: 72upx;
			color: #ffffff;
			font-size: 28upx;
			margin: 40upx auto 0;
		}

		.icon__bottom {
			position: absolute;
			bottom: 0;
			right: 0;
			width: 97upx;
			height: 78upx;
		}
	}

	.tip {
		@include absolute-center-top(850upx);
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
			right: 20upx;
			top: -36upx;
			border-top: 20upx transparent dashed;
			border-left: 20upx transparent dashed;
			border-right: 20upx transparent dashed;
			border-bottom: 20upx rgba(53, 53, 53, 1) solid;
		}
	}
}
</style>
