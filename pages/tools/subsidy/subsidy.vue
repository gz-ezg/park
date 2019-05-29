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
				<input @blur="handleInput" data-name="name" class="item__iput" placeholder="请输入手机号码" />
			</view>
			<view @tap="handleSubmit" class="button">立即提交</view>
			<image src="../../../static/icon_blue-sm.png" class="icon__bottom" mode=""></image>
		</view>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
import route from '@/config/route.js';

export default {
	data() {
		return {
			from: {}
		};
	},
	methods: {
		handleInput({ detail: { value }, target: { dataset } }) {
			this.from[dataset.name] = value;
		},
		navBack() {
			uni.navigateTo({
				url: route.index
			});
		},
		async handleSubmit() {
			// !this.from.companyname && (return this.$api.toast('公司名称不能为空'))
			// !this.from.name && (return this.$api.toast('负责人不能为空'))
			// !this.from.tel && (return this.$api.toast('电话不能为空'))
			let { companyname, tel, name } = this;
			await channelLogicApi.GovernmentSubsidies({ companyname, tel, name, userid: '10510' });
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/mixin.scss';
.page {
	width: 100%;
	height: 100vh;

	.bg {
		width: 100%;
		height: 100%;
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
		@include absolute-center-top(406upx) width: 683upx;
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
}
</style>
