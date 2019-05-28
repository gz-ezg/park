<template>
	<view class="login">
		<image class="login_welcome" src="/static/welcome.png"></image>
		<view :class="{ select: select1 }" class="login_input-m">
			<input data-i="loginCode" @focus="handleFocus" @blur="handleBlur" class="input" type="text" value="" placeholder-class="input_placeholder" placeholder="请输入登录码" />
		</view>
		<view :class="{ select: select2 }" class="login_input-p">
			<input data-i="password" @focus="handleFocus" @blur="handleBlur" class="input" type="text" value="" placeholder-class="input_placeholder" placeholder="请输入密码" />
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
			loginCode: ''
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
			try {
				await channelLogicApi.Login({
					loginCode: this.loginCode,
					password: this.password
				});
				this.$api.navigateTo({ url: route.index });
			} catch (e) {
				console.log(e);
			}
		}
	}	
};
</script>

<style lang="scss">
@import '@/styles/mixin.scss';

.input-placeholder {
	color: rgba(255, 255, 255, 0.4);
}

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

		.input_placeholder {
			font-size: 28upx;
			color: rgba(255, 255, 255, 0.4) !important;
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

.input_placeholder {
	font-size: 28upx;
	color: rgba(255, 255, 255, 0.4) !important;
}
</style>
