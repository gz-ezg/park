<script>
export default {
	onLaunch: function(e) {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/styles/index.scss';
@import '@/styles/icon.scss';

.white_placeholder {
	font-size: 28upx;
	color: rgba(255, 255, 255, 0.4) !important;
}
</style>
