<template>
	<view class="page">
		<image class="bg" src="../../../static/bill_bg.png" mode=""></image>
		<view class="back" @tap="navBack">返回</view>
		<view class="page__body">
			<view class="item">
				<view class="title">发票类型</view>
				<input @blur="handleInput" data-name="companyname" class="item__iput" placeholder="请输入公司名称" />
			</view>
			<view class="item">
				<view class="title">发票代码</view>
				<input @blur="handleInput" data-name="tel" class="item__iput" placeholder="请输入负责人名称" />
			</view>
			<view class="item">
				<view class="title">发表日期</view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>
			</view>
			<view @tap="handleSubmit" class="button">立即提交</view>
			<image src="../../../static/icon_blue-sm.png" class="icon__bottom" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				title: 'picker',
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				date: currentDate,
				time: '12:01'
			}
		},
		methods: {
			navBack() {
				uni.navigateBack({
					delta: 1,
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				console.log('haha')
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
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
		},
	}
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
