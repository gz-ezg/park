<template>
	<view>
		<view v-show="show" @click="hide" @touchmove.stop.prevent="moveHandle" class="x-mask"></view>
		<view :style="{ background: bgColor }" :class="'x-popup-' + mode" v-show="show" class="x-popup">
			<view class="x-popup-title" v-if="!!title">{{ title }}</view>
			<slot />
			<!-- 			<view :class="{
          'uni-close-bottom': buttonMode === 'bottom',
          'uni-close-right': buttonMode === 'right'
        }"
			 class=" uni-icon uni-icon-close" @click="closeMask" /> -->
			<view @click="closeMask" class="iconfont icon-iccloes x-close"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		bgColor: {
			type: String,
			default: ''
		},
		show: {
			type: Boolean,
			default: false
		},
		buttonMode: {
			type: String,
			default: 'right'
		},
		mode: {
			type: String,
			default: 'middle'
		},
		title: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	},
	methods: {
		hide() {
			this.$emit('hidePopup');
		},
		closeMask() {
			this.$emit('hidePopup');
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/mixin.scss';
.x {
	&-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	&-icon {
		width: 100%;
		height: 100%;
	}

	&-popup {
		position: fixed;
		z-index: 999;
		// background-color: #ffffff;

		&-title {
			box-sizing: border-box;
			padding-left: 33upx;
			width: 683upx;
			height: 78upx;
			font-size: 25upx;
			font-weight: 700;
			line-height: 78upx;
			color: rgba(44, 34, 34, 1);
			@include ellipse-text(1);
		}
	}

	&-popup-middle {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0upx 11upx 17upx 0upx rgba(0, 0, 0, 0.5);
		border-radius: 11upx;
	}

	&-close {
		position: absolute;

		text-align: center;
		line-height: 56upx;
		font-size: 40upx;
		color: #000;
		right: -24upx;
		top: -24upx;
		font-weight: 700;
		background: #fff;
		width: 56upx;
		height: 56upx;
		border-radius: 50%;
	}
}

.uni-close-bottom,
.uni-close-right {
	position: absolute;
	bottom: -180upx;
	text-align: center;
	border-radius: 50%;
	color: #f5f5f5;
	font-size: 60upx;
	font-weight: bold;
	opacity: 0.8;
	z-index: 1;
}

.uni-close-bottom {
	margin: auto;
	left: 0;
	right: 0;
}

.uni-close-right {
	right: -32upx;
	top: -36upx;
}

.uni-close-bottom:after {
	content: '';
	position: absolute;
	width: 0px;
	border: 1px #f5f5f5 solid;
	top: -200upx;
	bottom: 56upx;
	left: 50%;
	transform: translate(-50%, -0%);
	opacity: 0.8;
}
</style>
