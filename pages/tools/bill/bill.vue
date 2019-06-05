<template>
	<view class="page">
		<view :class="{ blur: loading }">
			<image class="bg" src="../../../static/bill_bg.png" mode=""></image>
			<view class="back" @tap="navBack">返回</view>
			<view class="page__body">
				<view class="item">
					<view class="title">发票类型</view>
					<view @tap="handleRadio" data-name="radio1" class="radio mr-4">
						<image v-if="type == 'radio1'" src="../../../static/icon_radio_active.png" />
						<image v-else src="../../../static/icon_radio.png" />
						增值税普通发票
					</view>
					<view @tap="handleRadio" data-name="radio2" class="radio">
						<image v-if="type == 'radio2'" src="../../../static/icon_radio_active.png" />
						<image v-else src="../../../static/icon_radio.png" />
						增值税专用发票
					</view>
				</view>

				<view class="item">
					<view class="title">发票代码</view>
					<input @blur="handleInput" data-name="invoiceCode" class="item__iput" placeholder="请输入发票代码" />
				</view>
				<view class="item">
					<view class="title">发票号码</view>
					<input @blur="handleInput" type="number" data-name="invoiceNum" class="item__iput" placeholder="请输入发票号码" />
				</view>
				<view class="item">
					<view class="title">开票日期</view>
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{ date || '请选择日期' }}</view>
					</picker>
				</view>
				<view v-if="type == 'radio1'" class="item">
					<view class="title">校验码</view>
					<input @blur="handleInput" maxlength="6" type="number" data-name="termCode" class="item__iput" placeholder="请输入验证码后六位" />
				</view>
				<view v-if="type == 'radio2'" class="item">
					<view class="title">金额</view>
					<input @blur="handleInput"  type="number" data-name="termCode" class="item__iput" placeholder="请输入金额" />
				</view>
				<view @tap="handleSubmit" class="button">查验</view>
				<image @tap="handleIsKown" src="../../../static/icon_blue-sm.png" class="icon__bottom" mode=""></image>
			</view>
			<view v-if="isKown" class="tip">
				<image class="img" src="../../../static/qrcode_bill.png" mode=""></image>
				<text class="text">扫码可以在手机上使用哦</text>
				<button @tap="handleIkown" class="button">我知道了</button>
				<view class="trangle"></view>
			</view>

			<x-popup @hidePopup="hidePopup" bgColor="#fff" @ :title="title" :show="popup">
				<scroll-view class="scroll" scroll-y="true" scroll-with-animation="true">
					<image v-if="invoice['isCancel'] == 'N'" class="popup__pic" src="../../../static/zhengchang.png"></image>
					<view class="popup__item">
						<view class="popup__item-title">发票代码</view>
						<view class="popup__item-disc">{{ invoice['invoiceCode'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">发票号码</view>
						<view class="popup__item-disc">{{ invoice['invoiceNum'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">开票日期</view>
						<view class="popup__item-disc">{{ invoice['invoiceDate'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">校验码</view>
						<view class="popup__item-disc">{{ invoice['checkCode'] }}</view>
					</view>
					<view class="popup__title">金额</view>
					<view class="popup__item">
						<view class="popup__item-title">金额</view>
						<view class="popup__item-disc">{{ invoice['noTaxAmount'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">税额</view>
						<view class="popup__item-disc">{{ invoice['taxAmount'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">价税合计</view>
						<view class="popup__item-disc">{{ invoice['totalTaxAmount'] }}</view>
					</view>
					<view class="popup__title">购买方</view>
					<view class="popup__item">
						<view class="popup__item-title">购买方</view>
						<view class="popup__item-disc">{{ invoice['buyerName'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">纳税人识别号</view>
						<view class="popup__item-disc">{{ invoice['buyerTaxNum'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">地址及电话</view>
						<view class="popup__item-disc">{{ invoice['buyerContact'] }} {{ invoice['buyerAccount'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">开户行及电话</view>
						<view class="popup__item-disc">{{ invoice['checkCode'] }}</view>
					</view>
					<view class="popup__title">销售方</view>
					<view class="popup__item">
						<view class="popup__item-title">销售方</view>
						<view class="popup__item-disc">{{ invoice['buyerAccount'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">纳税人识别号</view>
						<view class="popup__item-disc">{{ invoice['salerTaxNum'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">地址及电话</view>
						<view class="popup__item-disc">{{ invoice['province'] }} {{ invoice['salerAccount'] }}</view>
					</view>
					<view class="popup__item">
						<view class="popup__item-title">开户行及电话</view>
						<view class="popup__item-disc">{{ invoice['salerContact'] }}</view>
					</view>
					<view class="popup__footer">本查询结果来源于各地税局系统，查询结果不作为鉴别假票依据</view>
				</scroll-view>
			</x-popup>
		</view>

		<x-Loading :show="loading"></x-Loading>
	</view>
</template>

<script>
import { channelLogicApi } from '@/services/channelLogicApi.js';
export default {
	data() {
		// const currentDate = this.getDate({
		// 	format: true
		// });
		return {
			loading: false,
			popup: false,
			type: 'radio1',
			title: '增值税普通发票',
			array: ['中国', '美国', '巴西', '日本'],
			index: 0,
			date: '',
			time: '12:01',
			isKown: true,
			form: {
				invoiceCode: '',
				invoiceNum: '',
				invoiceTime: '',
				termCode: ''
			},
			invoice: {}
		};
	},
	methods: {
		handleRadio({
			currentTarget: {
				dataset: { name }
			}
		}) {
			this.type = name;
			if ((name = 'radio1')) {
				this.title = '增值税普通发票';
			}
			if ((name = 'radio1')) {
				this.title = '增值税专用发票';
			}
		},
		hidePopup() {
			this.popup = false;
		},
		handleIsKown() {
			this.isKown = !this.isKown;
		},
		navBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		},
		handleIkown() {
			this.isKown = false;
		},
		handleInput({
			detail: { value },
			currentTarget: {
				dataset: { name }
			}
		}) {
			this.form[name] = value;
		},
		async handleSubmit() {
			if (!this.form['invoiceCode']) {
				return this.$api.toast('请输入发票代码');
			}
			if (!this.form['invoiceNum']) {
				return this.$api.toast('请输入发票号码');
			}
			if (!this.date) {
				return this.$api.toast('请输入开票日期');
			}
			if (!this.form['termCode']) {
				return this.$api.toast('请输入校验码');
			}
			this.form['invoiceTime'] = this.date.split('-').join('');
			this.loading = true;
			try {
				this.invoice = await channelLogicApi.InvoiceCheck(this.form);
			} catch (e) {
				//TODO handle the exception
			} finally {
				this.loading = false;
				this.popup = true;
			}
		},
		getDate(type) {
			console.log('haha');
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
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
	.scroll {
		height: 800upx;
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

	&__body {
		@include absolute-center-top(346upx);
		width: 683upx;
		// height: 383upx;
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
			.mr-4 {
				margin-right: 40upx;
			}
			.radio {
				image {
					position: relative;
					bottom: 2upx;
					vertical-align: middle;
					width: 34upx;
					height: 34upx;
					margin-right: 10upx;
				}
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
			margin: 40upx auto 20upx;
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
		@include absolute-center-top(900upx);
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

	.popup {
		&__pic {
			position: absolute;
			top: 40upx;
			right: 10upx;
			width: 130upx;
			height: 137upx;
		}
		&__item {
			align-items: center;
			display: flex;
			min-height: 56upx;
			// height: 56upx;
			// line-height: 56upx;
			margin-left: 33upx;
			font-size: 19upx;
			font-weight: 400;
			color: rgba(125, 131, 134, 1);
			border-bottom: 1upx solid rgba(93, 72, 67, 0.16);

			&-title {
				width: 40%;
			}
			&-disc {
				width: 60%;
				word-break: normal;
				word-wrap: break-word;
			}
		}
		&__title {
			margin: 40upx 0 17upx 33upx;
			font-size: 25upx;
			font-weight: 500;
			color: rgba(44, 34, 34, 1);
		}
		&__footer {
			margin: 40upx 0 17upx 33upx;
			font-size: 19upx;
			font-weight: 400;
			color: rgba(125, 131, 134, 1);
		}
	}
}
</style>
