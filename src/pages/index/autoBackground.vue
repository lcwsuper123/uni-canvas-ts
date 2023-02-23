<template>
    <view class="main">
        <button class="button" @tap="createPoster">绘制</button>
        <button class="button" @tap="saveImage(imageSrc)">保存图片</button>
        <image 
            :src="imageSrc"
            class="image"
            mode="widthFix"
        />
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
const getImage = (): string => {
	const images = ['/static/1.jpg', '/static/2.jpg', '/static/3.jpg', '/static/car.jpg', '/static/img.jpg', '/static/head.jpg']
	const random = Math.floor(Math.random() * images.length)
 	return images[random]
}
const imageSrc = ref('')
const canvasStyle = ref({
    width: '375px',
    height: '375px'
})
const createPoster = async () => {
    const randomBackgroundInfo = await getImagePositionInfo({
        src: getImage(),
        width: 375,
        mode: 'widthFix',
    })
    const { width: canvasWidth, height: canvasHeight } = randomBackgroundInfo.imageModePositionInfo
    canvasStyle.value = getCanvasStyle(canvasWidth, canvasHeight)
    const { createCanvasBackgroud, context, createText, exportImage } = await createSakuraCanvas({
        canvasHeight,
        canvasWidth,
        canvasId: 'poster',
        // type: 'default'
    })
    uni.showLoading({
        title: '绘制中...'
    })
    await createCanvasBackgroud({
        type: 'image',
        positionInfo: randomBackgroundInfo,
        isUseImageModeSize: true
    })
    await createText({
        text: '画布背景宽高不确定',
        color: '#ffffff',
        x: 24,
        y: randomBackgroundInfo.imageModePositionInfo.endY - 32
    })
    context.draw && context.draw()
    uni.hideLoading()
	uni.showLoading({
		title: '导出图片中...'
	})
	const res = await exportImage()
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
