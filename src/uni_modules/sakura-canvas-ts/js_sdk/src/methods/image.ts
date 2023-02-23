import { getDrawImageInfo } from '../utils/image'
import { getPositionInfoByOrigin } from '../utils/positionInfo'
import { extend } from '../utils/shared'
import { createPolygon } from './polygon'
import { createFiveStar } from './fiveStar'
import { createRect } from './rect'
import { createCircle } from './circle'
/**
 * 获取图片绘制信息
 * @param params.x 水平方向位置 
 * @param params.y 垂直方向位置 
 * @param params.src 图片绘制路径 
 * @param params.width 图片宽度 
 * @param params.height 图片高度 
 * @param params.mode 绘制模式 
 */
export const getImagePositionInfo = async (params: SakuraCanvasImage.PositionParams): Promise<SakuraCanvasImage.PositionInfo> => {
	const { x = 0, y = 0, width = 0, height = 0, mode = 'aspectFill', src } = params
	const imageInfo = await getDrawImageInfo({
		src,
		width,
		height,
		x,
		y,
		mode
	})
	const { dHeight, dWidth, dx, dy } = imageInfo
	return extend<SakuraCanvasImage.PositionInfo>({}, getPositionInfoByOrigin({
		width,
		height,
		x,
		y
	}), {
		drawImageInfo: imageInfo,
		imageModePositionInfo: getPositionInfoByOrigin({
			width: dWidth,
			height: dHeight,
			x: dx,
			y: dy
		})
	})

}
/**
 * 获取绘制图片私有参数的默认值
 * @param params 
 */
export const getImageDrawPrivateParamsDefaultValue = (params: SakuraCanvasImage.DrawPrivateParams): Required<SakuraCanvasImage.DrawPrivateParams> => {
	const { mode = 'aspectFill', src = '', positionInfo = null, drawType = 'rect', drawTypeParams = {}, isUseImageModeSize = false } = params
	return {
		mode,
		src,
		positionInfo,
		drawType,
		drawTypeParams,
		isUseImageModeSize
	}
}

/**
 * 绘制图片
 * @param context canvas上下文对象
 * @param mode 图片模式
 * @param drawImageInfo 图片绘制信息
 * @param fn 绘制完成的回调
 */
export const drawImage = (context: UniApp.CanvasContext, mode: SakuraCanvasImage.Mode, drawImageInfo: SakuraCanvasImage.DrawInfo, fn?: Function) => {
	const { path, dWidth, dHeight, dx, dy, sWidth, sHeight, sx, sy } = drawImageInfo
	if (mode === 'none') {
		context.drawImage(path, dx, dy, dWidth, dHeight)
	} else {
		context.drawImage(path, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	}
	fn && fn()
}

/**
 * 创建绘制图片时的容器
 * @param this SakuraCanvasUtils
 * @param params 
 * @param params.basicParams 默认绘制参数
 * @param params.drawType 绘制类型
 * @param params.drawTypeParams 绘制不同类型的不同的私有参数
 * @param params.imagePositionInfo 图片位置信息
 * @param params.isUseImageModeSize 是否使用图片使用了mode之后的位置信息与大小信息
 * @param params.fn 图片的绘制回调
 */
export async function createDrawImageWrap(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasImage.CreateWrapParams): Promise<SakuraCanvasShared.AllPositionInfo> {
	const { basicParams, drawType, drawTypeParams, imagePositionInfo, isUseImageModeSize, fn } = params
	const { startX, startY, width: imageWidth, height: imageHeight } = isUseImageModeSize ? imagePositionInfo.imageModePositionInfo : imagePositionInfo
	const { fillStyle } = basicParams
	const resetParams: SakuraCanvasParams.BasicDrawParams = {
		size: imageWidth,
		x: startX,
		y: startY,
		fillStyle,
		width: imageWidth,
		height: imageHeight
	}
	drawTypeParams.fillStyle = extend({}, basicParams.fillStyle, drawTypeParams.fillStyle)
	drawTypeParams.fillStyle?.lineWidth && (drawTypeParams.fillStyle.lineWidth = drawTypeParams.fillStyle?.lineWidth * 2)
	const getImageWrapParams = <T>() => extend<T>({}, basicParams, resetParams, drawTypeParams)
	const createWrapMethods: {
		[K in SakuraCanvasImage.DrawType]: () => Promise<SakuraCanvasShared.AllPositionInfo>
	} = {
		// 多边形图片
		polygon: createPolygon.bind(this, getImageWrapParams<SakuraCanvasPolygon.DrawParams>(), fn),
		// 五角星图片
		fiveStar: createFiveStar.bind(this, getImageWrapParams<SakuraCanvasFiveStar.DrawParams>(), fn),
		// 矩形图片
		rect: createRect.bind(this, getImageWrapParams<SakuraCanvasRect.DrawParams>(), fn),
		// 圆形图片
		circle: createCircle.bind(this, getImageWrapParams<SakuraCanvasCircle.DrawParams>(), fn)
	}
	return createWrapMethods[drawType]()
}
/**
 * 创建图片
 * @param this 
 * @param params 
 * @param fn 回调函数在绘制完成时调用
 */
export async function createImage(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasImage.DrawParams, fn?: SakuraCanvasImage.Fn): Promise<SakuraCanvasImage.Result> {
	const { context, canvas, type, contextGlobalMethods } = this
	const { getBasicDrawParamsDefaultValue } = contextGlobalMethods
	const basicParams = getBasicDrawParamsDefaultValue(params)
	const { width, height, x, y, size, color, fillStyle } = basicParams
	const { src, mode, positionInfo, drawType, drawTypeParams, isUseImageModeSize } = getImageDrawPrivateParamsDefaultValue(params)
	const imagePositionInfo: SakuraCanvasImage.PositionInfo = positionInfo || await getImagePositionInfo({
		x,
		y,
		src,
		mode,
		width,
		height,
	})
	fillStyle.setColor = fillStyle.setColor ?? false
	if (type === '2d') {
		const imageSrc = await loadImage(imagePositionInfo.drawImageInfo.path, canvas)
		imagePositionInfo.drawImageInfo.path = imageSrc
	}
	const { drawImageInfo } = imagePositionInfo
	// 绘制图片触发回调
	const drawImageFn = (positionInfo?: SakuraCanvasShared.AllPositionInfo) => {
		drawType !== 'none' && context.clip()
		drawImage(context, drawImageInfo.mode, drawImageInfo, () => {
			fn && fn(imagePositionInfo, positionInfo)
		})
	}
	if (drawType === 'none') {
		drawImageFn()
		return {
			imagePositionInfo,
			wrapPositionInfo: imagePositionInfo
		}
	}
	return {
		imagePositionInfo,
		wrapPositionInfo: await createDrawImageWrap.call(this, {
			basicParams,
			drawType,
			drawTypeParams,
			imagePositionInfo,
			isUseImageModeSize,
			fn: drawImageFn
		})
	}
}
/**
 * 加载图片资源(2d绘制的时候需要)
 * @param src 
 * @param canvas 2d绘制时的canvas对象 
 */
export function loadImage(src: string, canvas: any): Promise<any> {
	return new Promise(resolve => {
		if (canvas && (canvas.createImage || Image)) {
			// h5是否使用2d绘制
			let h5isUse2D: boolean = false
			// #ifdef H5
			h5isUse2D = true
			// #endif
			const image = h5isUse2D ? new Image() : canvas.createImage()
			image.src = src
			image.onload = () => {
				resolve(image)
			}
			return
		}
		return resolve(src)
	})
}