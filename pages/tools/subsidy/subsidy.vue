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
				<input @blur="handleInput" data-name="name" class="item__iput" placeholder="请输入负责人名称" />
			</view>
			<view class="item">
				<view class="title">联系方式</view>
				<input type="number" maxlength="11" @blur="handleInput" data-name="tel" class="item__iput" placeholder="请输入手机号码" />
			</view>
			<view @tap="handleSubmit" class="button">立即提交</view>
			<image @tap="handleIkown" src="../../../static/icon_blue-sm.png" class="icon__bottom" mode=""></image>
		</view>
		<view v-if="isKown" class="tip">
			<image class="img" src="../../../static/qrcode_bz.png"></image>
			<text class="text">扫码可以在手机上使用哦</text>
			<button @tap="handleIkown" class="button">我知道了</button>
			<view class="trangle"></view>
		</view>

		<x-popup :icon="false" :show="popup" @hidePopup="hidePopup">
			<view class="popus">
				<image src="../../../static/pop.png" class="popus__img"></image>
				<view class="popus__top">
					<view class="popus__top-title">一键查询政府补贴</view>
					<view class="popus__top-disc">项目申报：政策补贴最高300W</view>
				</view>
				<view class="popus__bottom">
					<view class="popus__bottom-pic">
						<div id="yjcode" class="qrcode"></div>
						<tki-qrcode
							ref="qrcode"
							:val="val"
							:size="size"
							:show="false"
							:unit="unit"
							:pdground="pdground"
							:icon="icon"
							:onval="onval"
							:loadMake="loadMake"
							:showLoading="showLoading"
							:loadingText="loadingText"
							@result="qrR"
						/>
					</view>
					<view class="popus__bottom-title">扫描二维码获得具体项目及财税方案</view>
					<view @tap="hidePopup" class="popus__bottom-button">关闭</view>
				</view>
			</view>
		</x-popup>

		<x-loading :show="show"></x-loading>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
import xPopup from '@/components/x-popup/x-popup.vue';
import xLoading from '@/components/x-loading/x-loading.vue';
import route from '@/config/route.js';
import { getUrlQuery } from '@/utils/index.js';
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
//
require('@/libs/qrcode.js')
// console.log(url)

export default {
	data() {
		return {
			imgUrl: '',
			popup: false,
			from: {},
			show: false,
			isKown: true,
			ifShow: false,
			val: '', // 要生成的二维码值
			size: 220, // 二维码大小
			unit: 'upx', // 单位
			pdground: '#32dbc6', // 角标色
			icon: '', // 二维码图标
			iconsize: 10, // 二维码图标大小
			onval: true, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '', // 二维码生成后的图片地址或base64
			showLoading: true,
			loadingText: ''
		};
	},
	components: {
		xPopup,
		xLoading,
		tkiQrcode
	},

	methods: {
		handleInput({ detail: { value }, target: { dataset } }) {
			this[dataset.name] = value;
		},
		handleIkown() {
			this.isKown = !this.isKown;
		},
		qrR(e) {
			this.imgUrl = e;
		},
		hidePopup() {
			this.popup = false;
			document.getElementById('yjcode').innerHTML = "";
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

			// this.$api.navigateTo({
			// 	url: route.subsidyDetail,
			// 	data: {
			// 		companyname,
			// 		tel,
			// 		name
			// 	}
			// });
			// console.log(getUrlQuery('http://localhost:3333/#/pages/tools/subsidy/detail/detail', { companyname, tel, name }).)

			try {
				// console.log(resp);
				let url = getUrlQuery('http://park.zgcfo.com/#/pages/tools/subsidy/detail/detail', { companyname, tel, name }).url;
				// let resp = await channelLogicApi.GetShortUrl({ url: url });
				new QRCode(document.getElementById('yjcode'), { text: url ,width:'200',height:'200'});

				//
				// 				this.val = url;
				// 				this.$refs.qrcode._makeCode();
				this.popup = true;
			} catch (e) {
				//TODO handle the exception
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
	background-size: contain;
	overflow: hidden;

	.bg {
		width: 100%;
		height: 100vh;
		min-height: 1334upx;
	}

	.popus {
		width: 550upx;
		height: 733upx;
		text-align: center;

		&__img {
			transform: scale(1.1);
			// box-shadow: 0px 11upx 17upx 0upx rgba(0, 0, 0, 0.24);
			height: 100%;
			width: 100%;
		}

		&__top {
			@include absolute-center-top(50upx);
			&-title {
				font-size: 33upx;
				font-weight: 500;
				color: rgba(44, 34, 34, 1);
			}
			&-disc {
				font-size: 22upx;
				font-weight: 400;
				color: rgba(125, 131, 134, 1);
			}
		}

		&__bottom {
			@include absolute-center-top(300upx);
			&-pic {
				font-size: 22upx;
				width: 220upx;
				height: 220upx;
				margin: 0 auto;
				image {
					width: 220upx;
					height: 220upx;
				}
			}
			&-title {
				font-size: 22upx;
				font-weight: 400;
				color: rgba(44, 34, 34, 1);
				margin: 30upx 0;
			}
			&-button {
				margin: 0 auto;
				width: 125upx;
				position: relative;
				z-index: 2;
				height: 44upx;
				font-size: 22upx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				background: linear-gradient(90deg, rgba(242, 63, 15, 1) 0%, rgba(246, 30, 21, 1) 100%);
				border-radius: 6upx;
				line-height: 44upx;
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
	#yjcode {
		height: 220upx;
		width: 220upx;
	}
}
</style>
