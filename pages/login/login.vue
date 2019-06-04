<template>
	<view class="login">
		<image class="login_welcome" src="/static/welcome.png"></image>
		<view :class="{ select: select1 }" class="login_input-m">
			<input data-i="loginCode" @focus="handleFocus" @blur="handleBlur" class="input" type="text" value="" placeholder-class="white_placeholder" placeholder="请输入登录码" />
		</view>
		<view :class="{ select: select2 }" class="login_input-p">
			<input
				adjust-position="false"
				data-i="password"
				@focus="handleFocus"
				@blur="handleBlur"
				class="input"
				type="text"
				value=""
				placeholder-class="white_placeholder"
				placeholder="请输入密码"
			/>
		</view>
		<view @tap="handleLogin" class="login_button"><image class="login_button-icon" src="../../static/icon_arrow.png"></image></view>
	</view>
</template>

<script>
import route from '@/config/route.js';
import { channelLogicApi } from '@/services/channelLogicApi.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			select1: false,
			select2: false,
			password: '',
			loginCode: '',
			height: '100%'
		};
	},
	methods: {
		handleFocus({ target: { dataset } }) {
			switch (dataset.i) {
				case 'loginCode':
					this.select1 = true;
					break;
				case 'password':
					this.select2 = true;
					break;
				default:
					break;
			}
		},
		handleBlur({ detail: { value }, target: { dataset } }) {
			switch (dataset.i) {
				case 'loginCode':
					this.select1 = false;
					break;
				case 'password':
					this.select2 = false;
					break;
				default:
					break;
			}
			this[dataset.i] = value;
		},
		async handleLogin() {
			if (!this.loginCode) {
				return this.$api.toast('请输入登陆码');
			}
			if (!this.password) {
				return this.$api.toast('请输入密码');
			}
			try {
				let resp = await channelLogicApi.Login({
					loginCode: this.loginCode,
					password: this.password
				});
				uni.setStorageSync('account',JSON.stringify(resp));
				this.$api.navigateTo({ url: route.router });
			} catch (e) {
				return this.$api.toast('密码不正确');
			}
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/mixin.scss';
input::-webkit-input-placeholder {
	color: #fff;
	font-size: 12px;
	text-align: right;
}

page {
	background: linear-gradient(180deg, rgba(255, 84, 38, 1) 0%, rgba(210, 9, 1, 1) 100%);
	width: 100%;
	height: 100vh;
	overflow: hidden;
}

.login {
	height: 100%;
	width: 100%;

	&_welcome {
		margin: 0 auto;
		display: block;
		padding-top: 227upx;
		width: 512upx;
		height: 149upx;
	}

	&_input-m {
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
			color: #2c2222;
		}
	}

	&_input-p {
		@include flex-center();

		margin: 20upx auto 82upx;
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
			color: #2c2222;
		}

		.select {
			background: rgba(255, 255, 255, 1);
		}
	}

	.select {
		background: rgba(255, 255, 255, 1);
	}

	&_button {
		@include flex-center();
		margin: 0 auto;
		width: 139upx;
		height: 139upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 50%;

		&-icon {
			width: 74upx;
			height: 58upx;
		}

		&:hover {
			transition: 0.5s;
			transform: scale(1.2);
		}
	}
}
</style>
