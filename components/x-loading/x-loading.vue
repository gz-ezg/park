<template>
	<view>
		<view v-show="show" class="x-mask"></view>
		<view class="container" v-show="show">
			<view class="loader">
				<view class="roataqx-loader">
					<view class="one"></view>
					<view class="two"></view>
					<view class="three"></view>
				</view>
			</view>
		</view>
	</view>
	<!-- <x-loading show="true"></x-loading> -->
</template>

<script>
export default {
	props: {
		bgColor: {
			type: String,
			default: '#ffffff'
		},
		show: {
			type: Boolean,
			default: false
		},
		maskColor: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
.x {
	&-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		// background-color: rgba(210, 210, 210, 0.3);
	}
}
.container {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

/* Loading CSS 样式 */
.loader {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 194upx;
	height: 194upx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 11upx 17upx 0upx rgba(0, 0, 0, 0.16);
	border-radius: 11upx;
}
.roataqx-loader {
	width: 94upx;
	height: 104upx;
	// background: #ffffff;
	// border-radius: 11upx;
	perspective: 800px;
	position: relative;
	// box-shadow: 0px 11upx 17upx 0upx rgba(0, 0, 0, 0.16);
}

.roataqx-loader > view {
	position: absolute;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.roataqx-loader .one {
	left: 0%;
	top: 0%;
	animation: rotate-one 0.7s linear infinite;
	border-bottom: 5upx solid #f23e0f;
}

.roataqx-loader .two {
	right: 0%;
	top: 0%;
	animation: rotate-two 0.7s linear infinite;
	border-right: 5upx solid #f23e0f;
}

.roataqx-loader .three {
	right: 0%;
	bottom: 0%;
	animation: rotate-three 0.7s linear infinite;
	border-top: 5upx solid #f23e0f;
}

@keyframes rotate-one {
	0% {
		transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
	}
	100% {
		transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
	}
}

@keyframes rotate-two {
	0% {
		transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
	}
	100% {
		transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
	}
}

@keyframes rotate-three {
	0% {
		transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
	}
	100% {
		transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
	}
}
</style>
