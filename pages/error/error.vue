<template>
	<view class="error">
		<image class="error_pic" src="/static/404.png" mode="widthFix"></image>
		<view class="error_title">
			哎呀，页面出错了
		</view>
		<view class="error_disc">
			这可能是服务器出错或者网络异常导致的
		</view>
		<view class="error_actions">
			<view @tap="navBack" class="error_actions-back">返回上一步</view>
			<view @tap="navToIndex" class="error_actions-index">返回首页</view>
		</view>
	</view>
</template>

<script>
	import route from '@/config/route.js'
	export default {
		data() {
			return {}
		},
		methods: {
			navBack() {
				uni.navigateBack({
					delta: 2
				});
			},
			navToIndex() {
				this.$api.navigateTo({
					url: route.index
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.error {
		width: 100%;
		height: 100%;
		text-align: center;

		&_pic {
			margin-top: 210rpx;
			height: 430upx;
			width: 750upx;
		}

		&_title {
			font-size: 33upx;
			font-family: PingFangSC-Medium;
			font-weight: 600;
			color: rgba(44, 34, 34, 1);
			line-height: 53upx;
		}

		&_disc {
			margin: 22upx 0 39upx 0;
			font-size: 24upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(125, 131, 134, 1);
			line-height: 33upx;
		}

		&_actions {
			display: flex;

			&-back {
				margin-left: 177upx;
				margin-right: 50upx;
				width: 185upx;
				height: 67upx;
				line-height: 67upx;
				border-radius: 11upx;
				border: 1upx solid rgba(205, 199, 199, 1);
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(125, 131, 134, 1);
			}

			&-index {
				width: 161upx;
				height: 67upx;
				line-height: 67upx;
				background: linear-gradient(90deg, rgba(242, 63, 15, 1) 0%, rgba(246, 30, 21, 1) 100%);
				border-radius: 11upx;
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
</style>
