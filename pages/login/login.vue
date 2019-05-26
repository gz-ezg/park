<template>
	<view class="login">
		<image class="login_welcome" src="/static/welcome.png"></image>
		<view class="login_input">
			<input class="input" type="number" value="" placeholder-class="input_placeholder" placeholder="请输入登录码" />
		</view>
		<view @tap="handleLogin" class="login_button">
		</view>
	</view>
</template>

<script>
	import route from '@/config/route.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {},
		methods: {
			handleLogin() {
				this.$api.navigateTo({
					url: route.index
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/styles/mixin.scss';

	.login {
		height: 100vh;
		width: 100vw;
		background: linear-gradient(180deg, rgba(255, 84, 38, 1) 0%, rgba(210, 9, 1, 1) 100%);

		&_welcome {
			margin: 0 auto;
			display: block;
			padding-top: 227upx;
			width: 512upx;
			height: 149upx;
		}

		&_input {
			@include flex-center();

			margin: 180upx auto 82upx;
			width: 444upx;
			height: 100upx;
			background: rgba(255, 255, 255, 0.16);
			border-radius: 50upx;
			line-height: 100upx;

			.input {
				text-align: center;
				font-size: 28upx;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				color: #2C2222;
			}

			.input_placeholder {
				font-size: 28upx;
				color: rgba(255, 255, 255, 0.4) !important;
			}
		}

		&_button {
			margin: 0 auto;
			width: 139upx;
			height: 139upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 50%;
		}
	}
</style>
