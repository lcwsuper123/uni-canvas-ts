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
import { createSakuraCanvas, getImagePositionInfo, sleep, jsonDrawPoster, getCanvasStyle } from '../../uni_modules/sakura-canvas-ts/js_sdk/src'
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
// 创建海报
const createPoster = async () => {
    const { userhead, poster, qrCode, title, price, linePrice } = drawInfo
    const canvasWidth = 375 
    const canvasHeight = 710
    const sakuraCanvasContext = await createSakuraCanvas({
        canvasWidth,
        canvasHeight,
        canvasId: 'poster',
        type: '2d'
    })
	const { createCanvasBackgroud, createRect, createImage, createText, createCircle, createQrcode, exportImage, context, setCanvasStyle } = sakuraCanvasContext
    const startTime = Date.now()
    uni.showLoading({
        title: '绘制中...'
    })
	// 创建canvas背景
    await createCanvasBackgroud({
        type: 'color',
        color: '#02C41E',
        r: 10,
    })
	const result = await jsonDrawPoster(sakuraCanvasContext, async () => {
		// 创建白色背景
		const whiteBackground: SakuraCanvasJSON.DrawPosterData = {
			key: 'whiteBackground',
			type: 'rect',
			params: {
				width: canvasWidth - 24,
				height: canvasHeight - 24,
				color: '#ffffff',
				window: {
					algin: 'center'
				},
				y: 12,
				r: 10
			}
		}
		// 创建海报图片
		const posterImage: SakuraCanvasJSON.DrawPosterData = {
			key: 'posterImage',
			type: 'image',
			params: {
				width: canvasWidth - 46,
				height: canvasWidth - 46,
				src: poster,
				drawTypeParams: {
					r: 10
				},
				window: {
					algin: 'center'
				},
			},
			callback: whiteBackground => {
				return {
					y: whiteBackground.startY + 12
				}
			}
		}
		// 绘制标题
		const titleData: SakuraCanvasJSON.DrawPosterData = {
			key: 'titleData',
			type: 'text',
			params: {
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
				window: {
					algin: 'center'
				},
			},
			callback: (posterImageInfo: any) => {
				return {
					width: posterImageInfo.wrapPositionInfo.width,
					y: posterImageInfo.wrapPositionInfo.endY + 20,
				}
			}
		}
		// 绘制标签
		const tagTexts = ['优惠多', '经济实惠', '大佐牌']
		const tagTextsData = []
		for (const i in tagTexts) {
			const text = tagTexts[i]
			// 如果标签信息集合里面没有数据的话，则代表了是第一次绘制，就去使用上一个参照物的位置信息
			const drawData: SakuraCanvasJSON.DrawPosterData = {
				key: text,
				type: 'text',
				params: {
					text,
					color: '#ffffff',
					textRect: {
						vertical: 8,
						vorizontal: 16,
						color: '#02C41E',
						show: true,
						r: 10,
						fillMode: 'fill',
					}
				},
				callback: dataInfo => {
					return {
						y: i == '0' ? dataInfo.endY + 24 : dataInfo.startY,
						x: i == '0' ? dataInfo.startX : dataInfo.endX + 12,
					}
				}
			}
			tagTextsData.push(drawData)
		}
		// 绘制价格
		const priceData: SakuraCanvasJSON.DrawPosterData = {
			type: 'text',
			key: 'priceData',
			searchKey: tagTexts[0],
			params: {
				
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
			},
			callback: tagTextInfo => {
				return {
					y: tagTextInfo.endY + 24,
					x: tagTextInfo.startX,
				}
			}
		}
		// 创建分割线文字
		const dividerTextData: SakuraCanvasJSON.DrawPosterData = {
			type: 'text',
			key: 'dividerText',
			searchKey: 'priceData, whiteBackground',
			params: {
				text: '大佐永远滴神',
				divider: {
					show: true,
					style: 'dashed'
				},
				textAlgin: 'center',
				window: {
					algin: 'center'
				},
				color: '#9E9E9E',
			},
			callback: (priceData, whiteBackground) => {
				return {
					y: priceData.endY + 24,
					width: whiteBackground.width,
				}
			}
		}
		// 两个圆
		const leftCircle: SakuraCanvasJSON.DrawPosterData = {
			type: 'circle',
			params: {
				  size: 24,
        		color: '#02C41E',
			},
			callback: dividerTextInfo => {
				return {
					y: dividerTextInfo.startY - 2
				}
			}
		}
		const rightCircle: SakuraCanvasJSON.DrawPosterData = {
			type: 'circle',
			params: {
				size: 24,
        		color: '#02C41E',
				window: {
					algin: 'right'
				}
			},
			callback: dividerTextInfo => {
				return {
					y: dividerTextInfo.startY - 2
				}
			}
		}
		// 创建二维码
		const qrCodeData: SakuraCanvasJSON.DrawPosterData = {
			type: 'qrcode',
			key: 'qrCodeData',
			searchKey: 'dividerText, priceData',
			params: {
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
			},
			callback: (dividerText, priceData) => {
				return {
					y: dividerText.endY + 26,
					x: priceData.startX as number + 12
				}
			}
		}
		// 最后的提示语句
		const tipsData: SakuraCanvasJSON.DrawPosterData = {
			type: 'text',
			params: {
				text: '欢迎大家使用新的绘制插件',
				
				color: '#02C41E'
			},
			callback: qrCodeData => {
				return {
					y: qrCodeData.startY + qrCodeData.height / 2,
					x: qrCodeData.endX + 12,
				}
			}
		}
		return [whiteBackground, posterImage, titleData, ...tagTextsData, priceData, dividerTextData, leftCircle, rightCircle, qrCodeData, tipsData]
	})
    uni.hideLoading()
	if (!result.success) return
    context.draw && context.draw()
	const res = await exportImage({
        wait: 200
    })
    if (!res.success) return
    imageSrc.value = res.data
	console.log('json-绘制海报时长---', Date.now() - startTime)
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
