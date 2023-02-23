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
const imageSrc = ref('')
const canvasStyle = getCanvasStyle(375, 710)
// 绘制内容
const drawInfo = {
    userhead: '/static/head.jpg',
    poster: '/static/img.jpg',
    qrCode: '/static/qrCode.jpg',
    title: '推荐: 李宁卫衣男女同款套头无帽2021秋季训练系列情侣款刺绣加绒加厚长袖上衣外套官方店AWDRB76 威廉蓝-5 XXL',
    price: '￥179.00',
    linePrice: '￥155.00',
}
const createPoster = async () => {
    const { userhead, poster, qrCode, title, price, linePrice } = drawInfo
    const canvasWidth = 375 
    const canvasHeight = 710
    const { createCanvasBackgroud, createRect, createImage, createText, createCircle, createQrcode, exportImage, context, setCanvasStyle } = await createSakuraCanvas({
        canvasWidth,
        canvasHeight,
        canvasId: 'poster',
        type: '2d'
    })
    const startTime = Date.now()
    uni.showLoading({
        title: '绘制中...'
    })
    // 创建canvas背景
    const backgroundInfo = await createCanvasBackgroud({
        type: 'color',
        color: '#02C41E',
        r: 10,
    })
    // 创建白色背景
    const whiteInfo =  await createRect({
        width: canvasWidth - 24,
        height: canvasHeight - 24,
        color: '#ffffff',
        window: {
            algin: 'center'
        },
        y: 12,
        r: 10
    })
    // 创建海报图片
    const posterImageInfo = await createImage({
        width: canvasWidth - 46,
        height: canvasWidth - 46,
        src: poster,
        drawTypeParams: {
            r: 10
        },
        window: {
            algin: 'center'
        },
        y: whiteInfo.startY + 12
    })
    // 绘制标题
    const titleInfo = await createText({
        text: title,
        font: {
            size: 16,
        },
        line: {
            height: 32,
            num: 2
        },
        textIndent: 32,
        color: '#333333',
        highlightText: [
            {
                text: '推荐',
                color: 'red'
            },
            {
                text: '男',
                color: 'red'
            },
            {
                text: '女',
                color: 'blue',
                font: {
                    size: 24
                }
            },
            {
                text: '衣',
                color: 'orange'
            }
        ],
        width: posterImageInfo.wrapPositionInfo.width,
        y: posterImageInfo.wrapPositionInfo.endY + 20,
        window: {
            algin: 'center'
        },
    })
    // 绘制标签
    const tagTexts = ['优惠多', '经济实惠', '大佐牌']
    let tagTextInfo = {} as SakuraCanvasText.PositionInfo
    const tagTextsInfo = []
    for (const text of tagTexts) {
        // 如果标签信息集合里面没有数据的话，则代表了是第一次绘制，就去使用上一个参照物的位置信息
        tagTextInfo = await createText({
            text,
            y: !tagTextsInfo.length ? titleInfo.endY + 24 : tagTextInfo.startY,
            x: !tagTextsInfo.length ? titleInfo.startX : tagTextInfo.endX + 12,
            color: '#ffffff',
            textRect: {
                vertical: 8,
                vorizontal: 16,
                color: '#02C41E',
                show: true,
                r: 10,
                fillMode: 'fill',
            }
        })
        tagTextsInfo.push(tagTextInfo)
    }
    // 绘制价格
    const priceInfo = await createText({
        y: tagTextsInfo[0].endY + 24,
        x: tagTextsInfo[0].startX,
        text: `${price}   ${linePrice}`,
        font: {
            size: 18,
            weight: 'bold'
        },
        highlightText: [
            {
                text: price,
                color: '#F23B55',
                font: {
                    size: 25,
                },
                siblingsAlgin: 'center'
            },
            {
                text: linePrice,
                color: '#9E9E9E',
                line: {
                    type: 'lineThrough',
                    color: '#9E9E9E',
                },
                siblingsAlgin: 'center'
            }
        ]
    })
    // 创建分割线文字
    const dividerTextInfo = await createText({
        text: '大佐永远滴神',
        divider: {
            show: true,
            style: 'dashed'
        },
        textAlgin: 'center',
        y: priceInfo.endY + 24,
        width: whiteInfo.width,
        window: {
            algin: 'center'
        },
        color: '#9E9E9E',
    })
    // 两个圆
    await createCircle({
        size: 24,
        color: '#02C41E',
        y: dividerTextInfo.startY - 2
    })
    await createCircle({
        size: 24,
        color: '#02C41E',
        y: dividerTextInfo.startY - 2,
        window: {
            algin: 'right'
        }
    })
    // 创建二维码
    const qrCodeInfo = await createQrcode({
        size: 100,
        text: 'https://ext.dcloud.net.cn/plugin?id=10960',
        image: {
            show: true,
            src: userhead,
            size: 50,
            // drawType: 'circle',
            drawType: 'fiveStar',
            drawTypeParams: {
                fillStyle: {
                    fillMode: 'stroke',
                    color: '#02C41E',
                    setColor: true,
                    lineWidth: 2
                }
            }
        },
        y: dividerTextInfo.endY + 26,
        x: priceInfo.startX + 12
    })
    // 创建最后的提示语句
    await createText({
        text: '欢迎大家使用新的绘制插件',
        y: qrCodeInfo.startY + qrCodeInfo.height / 2,
        x: qrCodeInfo.endX + 12,
        color: '#02C41E'
    })
    uni.hideLoading()
    context.draw && context.draw()
	const result = await exportImage({
        wait: 200
    })
    if (!result.success) return
    imageSrc.value = result.data
    console.log('方法-绘制海报时长---', Date.now() - startTime)
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
