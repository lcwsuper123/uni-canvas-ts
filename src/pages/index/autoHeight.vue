<template>
    <view class="main">
        <button class="button" @tap="createPoster">绘制</button>
		<button class="button" @tap="saveImage(imageSrc)">保存图片</button>
		<template v-if="imageSrc">
			<image 
				:src="imageSrc"
				class="image"
				mode="widthFix"
			/>
		</template>
        <canvas
            :style="canvasStyle"
            id="poster"
            canvas-id="poster"
			type="2d"
        />
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createSakuraCanvas, getImagePositionInfo, getCanvasStyle } from '../../uni_modules/sakura-canvas-ts/js_sdk/src'
import saveImage from './saveImage'
const canvasWidth = 375
const canvasHeight = 1000
const imageSrc = ref<string>('')
const canvasStyle = ref<SakuraCanvasShared.CanvasStyle>(getCanvasStyle(canvasWidth, canvasHeight))
const getImage = (): string => {
	const images = ['/static/1.jpg', '/static/2.jpg', '/static/3.jpg', '/static/car.jpg', '/static/img.jpg', '/static/head.jpg']
	const random = Math.floor(Math.random() * images.length)
 	return images[random]
}
const createPoster = async () => {
	const { createImage, createText, createCanvasBackgroud, setCanvasStyle, context, exportImage, utils } = await createSakuraCanvas({
		canvasHeight,
		canvasWidth,
		canvasId: 'poster',
		type: '2d',
	})
	uni.showLoading({
		title: '绘制中...'
	})
	await createCanvasBackgroud({
		color: '#ffffff',
		wait: 200
	})
	const posterImageInfo = await createImage({
		src: getImage(),
		width: canvasWidth,
		mode: 'widthFix',
		isUseImageModeSize: true
	})
	const textInfo = await createText({
		text: '绘制内容宽高不确定',
		x: 24,
		y: posterImageInfo.wrapPositionInfo.endY + 24
	})
	context.draw && context.draw()
	uni.hideLoading()
	if (textInfo.endY + 24 !== canvasHeight) {
		canvasStyle.value = setCanvasStyle(canvasWidth, textInfo.endY + 24, 500)
	}
	// 当需要重新设置canvas宽高时, 导出图片的延迟时间要大于设置宽高的延迟时间, 只在2d绘制时需要
	// 2d绘制重新设置高度也不需要重新绘制了, 已经找到解决办法
	uni.showLoading({
		title: '导出图片中...'
	})
	const res = await exportImage({
		wait: 500 + 200
	})
	uni.hideLoading()
	if (!res.success) return
	imageSrc.value = res.data
}
</script>

<style lang="scss" scoped>
#main{
    overflow: hidden;
}
.button{
    width: 200rpx;
    margin: 0 auto;
    height: 80rpx;
    @include flex-xy-center;
}
#poster{
    margin-bottom: 20rpx;
    position: fixed;
    left: -9999rpx;
    top: -9999rpx;
}
.image{
    width: 750rpx;
    display: block;
    margin-bottom: 100rpx;
}
</style>
