import { getPositionInfoByOrigin } from '../utils/positionInfo'
import { createQrcodeStructure } from '../utils/qrcode'
import { extend } from '../utils/shared'
import { createImage } from './image'
/**
 * 获取二维码位置信息
 * @param params 
 * @param params.x 水平方向位置 
 * @param params.y 垂直方向位置 
 * @param params.size 二维码尺寸 
 */
 export const getQrcodePositionInfo = (params: SakuraCanvasQrcode.PositionInfoParams): SakuraCanvasQrcode.PositionInfo => {
	const { x = 0, y = 0, size } = params
	return extend<SakuraCanvasQrcode.PositionInfo>({}, getPositionInfoByOrigin({
		x,
		y,
		width: size,
		height: size
	}))
}
/**
 * 获取绘制二维码默认值
 * @param params 
 * @param params.text 二维码内容
 * @param params.size 二维码尺寸
 * @param params.lv 容错级别
 * @param params.background 二维码背景色
 * @param params.foreground 二维码前景色
 * @param params.pdground 二维码角标色
 * @param params.image 二维码图片
 */
export const getQrcodeDrawPrivateParamsDefaultValue = (params: SakuraCanvasQrcode.DrawPrivateParams): Required<SakuraCanvasQrcode.DrawPrivateParams> => {
	const { text = '', lv = 3, background = '#ffffff', foreground = '#000000', pdground = '#000000', image = {}, positionInfo = null, size = 0 } = params
	return {
		text,
		lv,
		background,
		foreground,
		pdground,
		image: { show: false, ...image },
		positionInfo,
		size
	}
}
/**
 * 绘制二维码
 * @param this 
 * @param params 
 * @param fn 
 */
export async function createQrcode(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasQrcode.DrawParams, fn?: SakuraCanvasQrcode.Fn): Promise<SakuraCanvasQrcode.PositionInfo> {
	const { context, contextGlobalMethods } = this
	const { createDrawWrap, getBasicDrawParamsDefaultValue } = contextGlobalMethods
	const basicParams = getBasicDrawParamsDefaultValue(params)
	const { x, y, } = basicParams
	const qrcodePrivateParams = getQrcodeDrawPrivateParamsDefaultValue(params)
	const { size, positionInfo, image } = qrcodePrivateParams
	const qrcodePositionInfo: SakuraCanvasQrcode.PositionInfo = positionInfo || getQrcodePositionInfo({ x, y, size })
	await createDrawWrap<SakuraCanvasQrcode.PositionInfo>({
		basicParams,
		positionInfo: qrcodePositionInfo,
		fn
	}, () => {
		// 创建二维码模型
		createQrcodeStructure(contextGlobalMethods, {
			...qrcodePrivateParams,
			x,
			y,
			context
		})
	})
	// 如果有图片
	if (image.show && image.src) {
		const { width, height, size: imageSize } = image
		const imageWidth = width || imageSize || 0
		const imageHeight = height || imageSize || 0
		const imageX = x + Number(((size - imageWidth) / 2).toFixed(2))
		const imageY = y + Number(((size - imageHeight) / 2).toFixed(2))
		qrcodePositionInfo.imagePositionInfo = await createImage.call(this, {
			x: imageX,
			y: imageY,
			width: imageWidth,
			height: imageHeight,
			...image,
		})
	}
	return qrcodePositionInfo
}