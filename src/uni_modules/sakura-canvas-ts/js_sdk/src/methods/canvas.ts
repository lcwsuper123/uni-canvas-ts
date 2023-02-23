import { extend, sleep } from './../utils/shared'
import { formatGradientParams, getBasicDrawParamsDefaultValue, getFillStyleParamsDefaultValue, getGradientParamsDefalutValue, getShadowParamsDefaultValue } from './../utils/params'
import { createRect } from './rect'
import { createImage } from './image'
/**
 * 创建canvas上下文的参数
 */
export type CanvasContextOptions = Pick<SakuraCanvasParams.SakuraCanvasInitParams, 'canvasId' | 'canvasHeight' | 'canvasWidth' | 'type' | 'componentInstance'>
/**
 * 创建canvas上下文对象的参数类型
 */
type CreateCanvasContextParams = { 
	context: UniApp.CanvasContext,
	canvas: any
}
/**
 * 分辨率初始化->2d绘制时启用
 * @param params 
 * @param params.canvas canvas对象
 * @param params.context 上下文对象
 * @param params.width 宽度
 * @param params.height 高度
 */
export const setCanvasDpr = (params: SakuraCanvasParams.InitDprParams) => {
	const { canvas, context, width, height, dpr } = params
	canvas.width = width * dpr
	canvas.height = height * dpr
	context.scale(dpr, dpr)
}
/**
 * 创建canvas上下文对象
 * @param options 参数
 * @param options.canvasId canvasId
 * @param options.canvasWidth canvas的宽度
 * @param options.canvasHeight canvas的高度
 * @param options.type canvas模式 2d/default
 * @param options.componentInstance 自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 <canvas/> ，如果省略，则不在任何自定义组件内查找 
 * @param dpr 屏幕分辨率
 */
export const createCanvasContext = (options: CanvasContextOptions, dpr:number): CreateCanvasContextParams | Promise<CreateCanvasContextParams> => {
	// h5是否使用2d绘制
	let h5isUse2D: boolean = false
	// #ifdef H5
	if (options.type === '2d') {
		h5isUse2D = true
	}
	// #endif
	const { canvasId, canvasWidth, canvasHeight, type = '2d', componentInstance } = options
	if (type === 'default') {
		return { 
			context: uni.createCanvasContext(canvasId, componentInstance),
			canvas: null
		}
	}
	// #ifdef H5
	// h5->2d绘制
	if (h5isUse2D) {
		const canvas: any = document.querySelector(`#${canvasId} .uni-canvas-canvas`) as HTMLCanvasElement
		const context = canvas.getContext('2d') as UniApp.CanvasContext
		return {
			context,
			canvas
		}
	}
	// #endif
	return new Promise(resolve => {
		const query = componentInstance ? uni.createSelectorQuery().in(componentInstance) : uni.createSelectorQuery()
		query.select(`#${canvasId}`).fields({ size: true, node: true }, () => {}).exec(res => {
			const canvas = res[0].node
			const context = canvas.getContext('2d') as UniApp.CanvasContext
			setCanvasDpr({
				canvas,
				context,
				width: canvasWidth,
				height: canvasHeight,
				dpr
			})
			return resolve({
				context,
				canvas
			})
		})
	})
}
/**
 * 创建canvas上下文的一些公共方法
 * @param context 
 */
export const createCanvasContextGlobalMethods = (context: UniApp.CanvasContext, params: SakuraCanvasParams.SakuraCanvasInitParams): SakuraCanvasShared.ContextGlobalMethods => {
	/**
	 * 设置填充内容的样式内容填充模式的类型 
	 * @param params
	 * @param params.color 颜色
	 * @param params.fileMode 模式 fill: 填充 stroke: 线型 all: 两者都要
	 * @param params.fillColor 填充颜色 不传递默认使用color
	 * @param params.strokeColor 描边颜色 不传递默认使用color
	 * @param params.lineWidth 描边的大小默认1
	 * @param params.setColor 是否设置颜色
	 * @returns 
	 */
	const setFillStyle = (params: SakuraCanvasParams.FillStyleParams) => {
		const { lineWidth, strokeColor, fillColor, fillMode, setColor, fillGradient, strokeGradient, x, y } = getFillStyleParamsDefaultValue(params)
		const getColor = (color: string | UniApp.CanvasGradient, gradient: SakuraCanvasParams.GradientParams) => {
			return gradient?.show ? getGradientValue(gradient, x, y) : color
		}
		if (!setColor) return
		if ((fillMode === 'fill' || fillMode === 'all')) {
			context.fillStyle = getColor(fillColor, fillGradient)
			context.fill()
		} 
		if ((fillMode === 'stroke' || fillMode === 'all')) {
			context.strokeStyle = getColor(strokeColor, strokeGradient)
			context.lineWidth = lineWidth
			context.stroke()
		}
	}
	/**
	 * 设置透明度
	 * @param alpha 设置内容的透明度
	 */
	const setGlobalAlpha = (alpha: number) => {
		context.globalAlpha = alpha
	}
	/**
	 * 旋转内容
	 * @param rotate 旋转角度
	 * @param positionInfo 绘制内容的信息
	 * @returns 
	 */
	const setRotate = (rotate: number, positionInfo: SakuraCanvasShared.PositionInfo): { x: number, y: number } => {
		const { startX, startY, width, height } = positionInfo
		const translateX = startX + (width / 2)
		const translateY = startY + (height / 2)
		context.translate(translateX, translateY)
		context.rotate(rotate * Math.PI / 180)
		context.translate(-translateX, -translateY)
		return {
			x: translateX,
			y: translateY
		}
	}
	/**
	 * 设置阴影
	 * @param params 
	 */
	const setShadow = (params: SakuraCanvasParams.ShadowParams) => {
		const { x, y, color, blur } = getShadowParamsDefaultValue(params)
		context.shadowOffsetX = x
		context.shadowOffsetY = y
		context.shadowColor = color
		context.shadowBlur  = blur
	}
	/**
	 * 获取渐变的值
	 * @param params 
	 */
	const getGradientValue = (params: SakuraCanvasParams.GradientParams, x: number, y: number): any => {
		const { type = 'linear', colors, linearPosition, circularPosition } = formatGradientParams(getGradientParamsDefalutValue(params), x, y)
		let gradient: UniApp.CanvasGradient
		if (type === 'linear') {
			const { x0, x1, y0, y1 } = linearPosition as SakuraCanvasParams.LinearPositionParams
			gradient = context.createLinearGradient(x0, y0, x1, y1)
		} else {
			const { x, y, r } = circularPosition as SakuraCanvasParams.CirclePositionParams
			gradient = context.createCircularGradient(x, y, r)
		}
		colors.forEach(({ stop, color }) => {
			gradient.addColorStop(stop, color)
		})
		return gradient
	}
	/**
	 * 设置线条样式
	 * @param params 
	 */
	const setLineStyle = (params: SakuraCanvasParams.LineStyleParams) => {
		const { style = 'solid', cap = 'butt', offset = 10, pattern = [10, 5] } = params
		context.setLineCap ? context.setLineCap(cap) : (context.lineCap = cap)
		if (style === 'dashed') {
			context.setLineDash(pattern, offset)
			context.lineDashOffset = offset
		}
	}
	/**
	 * 创建绘制容器, 里面内置了一些旋转、阴影、透明度的方法的绘制
	 * @param params 
	 * @param params.basicParams 基本参数
	 * @param params.positionInfo 位置信息
	 * @param params.fn 方法的绘制回调
	 * @param drawFn 容器的回调
	 * @returns 
	 */
	const createDrawWrap = async <T extends SakuraCanvasShared.PositionInfo>(params: SakuraCanvasParams.CreateDrawWrapParams<T>, drawFn?: () => Promise<void> | void): Promise<T> => {
		const { basicParams, positionInfo, fn } = params
		const { alpha, rotate, shadow, fillStyle, lineStyle } = basicParams
		context.save()
		rotate !== 0 && setRotate(rotate, positionInfo)
		shadow?.show && setShadow(shadow)
		setGlobalAlpha(alpha)
		setLineStyle(lineStyle)
		context.beginPath()
		drawFn && await drawFn()
		context.closePath()
		setFillStyle(fillStyle)
		// 如果上一次绘制线条的时候是虚线的话需要重置一下, 为了防止影响fn回调函数里面绘制其他图形
		if (lineStyle.style === 'dashed') {
			setLineStyle(extend<SakuraCanvasParams.LineStyleParams>({}, lineStyle, {
				pattern: [0, 0],
				offset: 0
			}))
		}
		fn && await fn(positionInfo)
		context.restore()
		return positionInfo
	}
	return {
		setFillStyle,
		setGlobalAlpha,
		setRotate,
		setShadow,
		getGradientValue,
		createDrawWrap,
		getBasicDrawParamsDefaultValue: getBasicDrawParamsDefaultValue.bind(params)
	}
}
/**
 * 创建sakuraCanvasUtils工具
 * @param params 
 */
export async function createSakuraCanvasUtils(params: SakuraCanvasParams.SakuraCanvasInitParams): Promise<SakuraCanvasShared.SakuraCanvasUtils> {
	// 分辨率
	const dpr = uni.getSystemInfoSync().pixelRatio
	params.type = params.type ?? '2d'
	// #ifdef H5
	// h5 - 2d 绘制不需要设置分辨率
	// if (params.type === '2d') {
		// dpr = 1
	// }
	// #endif
	const { context, canvas, } = await createCanvasContext(params, dpr)
	const contextGlobalMethods = createCanvasContextGlobalMethods(context, params)
	const utils: SakuraCanvasShared.SakuraCanvasUtils = {
		...params,
		context,
		canvas,
		contextGlobalMethods,
		dpr
	}
	return utils
}
/**
 * 创建背景
 * @param this sakura工具类
 * @param params 
 * @param params.type image: 图片类型 color: 纯色背景 
 */
export async function createCanvasBackgroud(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasParams.CreateCanvasBackgroudParams): Promise<SakuraCanvasShared.CanvasBackgroundResult> {
	const { canvasWidth, canvasHeight } = this
	const { type = 'color', wait = 200, width, height, isUseImageModeSize = false, ...otherParams } = params
	await sleep(wait)
	let result: SakuraCanvasShared.CanvasBackgroundResult
	// 纯色背景
	if (type === 'color') {
		const rectPositionInfo: SakuraCanvasRect.PositionInfo = await createRect.call(this, {
			width: width || canvasWidth,
			height: height || canvasHeight,
			...otherParams
		})
		const { width: rectWidth, height: rectHeight } = rectPositionInfo
		result =  {
			style: {
				width: rectWidth + 'px',
				height: rectHeight + 'px'
			},
			positionInfo: rectPositionInfo,
			width: rectWidth,
			height: rectHeight
		}
	} else {
		// 背景图片
		const imageResult = await createImage.call(this, {
			width: width || canvasWidth,
			height: height || canvasHeight,
			isUseImageModeSize,
			...otherParams
		})
		const { imageModePositionInfo, } = imageResult.imagePositionInfo
		const { width: imageWidth, height: imageHeight } = isUseImageModeSize ? imageModePositionInfo : imageResult.imagePositionInfo
		result = {
			style: {
				width: imageWidth + 'px',
				height: imageHeight + 'px'
			},
			positionInfo: imageResult,
			width: imageWidth,
			height: imageHeight
		}
	}
	return result
}
/**
 * 设置canvas的样式
 * @param this 
 * @param width 宽度
 * @param height 高度
 * @param wait 导出新内容时的延迟时间(只在2d绘制时需要) 默认200
 */
export function setCanvasStyle(this: SakuraCanvasShared.SakuraCanvasUtils, width: number, height: number, wait: number = 200): SakuraCanvasShared.CanvasStyle {
	const { context, canvasId, dpr, type, canvas } = this as SakuraCanvasShared.SakuraCanvasUtils & { context: any }
	if (type === '2d') {
		const imageData = context.getImageData(0, 0, width * dpr, height * dpr)
		// #ifndef H5
		setCanvasDpr({
			context,
			canvas,
			width,
			height,
			dpr
		})
		// #endif
		context.clearRect(0, 0, 99999, 99999)
		sleep(wait).then(() => {
			context.putImageData(imageData, 0 , 0)
		})
	} else {
		// uni.canvasGetImageData({
		// 	canvasId,
		// 	x: 0,
		// 	y: 0,
		// 	width: width * dpr,
		// 	height: height * dpr,
		// 	success: async ({ data }) => {
		// 		context.clearRect(0, 0, 99999, 99999)
		// 		// await sleep(wait)
		// 		// uni.canvasPutImageData({
		// 		// 	canvasId,
		// 		// 	x: 0,
		// 		// 	y: 0,
		// 		// 	width,
		// 		// 	height,
		// 		// 	data
		// 		// })
		// 	}
		// })
	}
	this.canvasWidth = width
	this.canvasHeight = height
	return {
		width: width + 'px',
		height: height + 'px'
	}
}
/**
 * 导出图片
 * @param this 
 * @param params 
 * @param params.x 指定的画布区域的左上角横坐标
 * @param params.y 指定的画布区域的左上角纵坐标
 * @param params.width 宽度
 * @param params.height 高度
 * @param params.fileType 导出类型 png/jpg
 * @param params.quality 导出质量
 * @param params.destWidth 输出的图片的宽度
 * @param params.destHeight 输出的图片的高度
 * @param params.wait 延迟时长
 * @param params.tips 提示内容
 * @param params.showTips 是否显示提示
 */
export function exportImage(this: SakuraCanvasShared.SakuraCanvasUtils, params?: SakuraCanvasParams.ExportImageParams): Promise<SakuraCanvasShared.Result<string>> {
	const { canvas, canvasId, canvasWidth, canvasHeight, dpr, type, context } = this as SakuraCanvasShared.SakuraCanvasUtils & { context: any }
	const { 
		x = 0, y = 0,
		width = canvasWidth, height = canvasHeight, fileType = 'png', quality = 1, 
		destWidth = canvasWidth, destHeight = canvasHeight,
		wait = 200, showTips = true, tips = '导出图片中...' 
	} = params || {}
	return new Promise(async resolve => {
		showTips && uni.showLoading({ title: tips, mask: true })
		await sleep(wait)
		// #ifdef MP-TOUTIAO || MP-ALIPAY
		if (type === '2d') {
			return resolve({
				success: true,
				data: context.canvas.toDataURL(),
				message: '导出成功'
			})
		}
		// #endif
		uni.canvasToTempFilePath({
			x,
			y,
			width,
			height,
			destWidth: destWidth * dpr,
			destHeight: destHeight * dpr,
			fileType,
			quality,
			canvasId,
			canvas,
			success: res => {
				return resolve({
					success: true,
					message: '导出成功',
					data: res.tempFilePath
				})
			},
			fail: err => {
				return resolve({
					success: false,
					data: '',
					message: JSON.stringify(err)
				})
			},
			complete: () => {
				showTips && uni.hideLoading()
			}
		})
	})
}
/**
 * 获取搜索的绘制信息内容
 * @param searchKey 搜索的key, 多个用逗号分割
 * @param beforePositionInfo 上一次绘制信息
 * @param allPositionInfoList 所有的绘制信息
 * @returns 
 */
const getCallbackPositionInfo = (params: SakuraCanvasJSON.GetCallbackPositionInfoParams): SakuraCanvasJSON.CallbackPositionInfoResult => {
	const { searchKey, beforePositionInfo, allPositionInfoList } = params
	if (!searchKey) {
		return [beforePositionInfo.data]
	}
	const result: SakuraCanvasJSON.DrawPositionInfoData['data'][] = []
	const keys = searchKey.split(',').map(v => v.trim())
	for (let i in allPositionInfoList) {
		const { key, data } = allPositionInfoList[i]
		const index = keys.findIndex(v => v === key)
		if (index !== -1) {
			result[index] = data
			if (result.length === allPositionInfoList.length) {
				break
			}
		}
	}
	return result
}
/**
 * Json方式绘制海报
 * @param sakuraContext sakuraContext实例
 * @param fn 绘制内容
 */
export async function jsonDrawPoster(sakuraContext: SakuraCanvasShared.SakuraCanvasContext, fn: SakuraCanvasJSON.DrawPosterFn): Promise<SakuraCanvasShared.Result<string>> {
	const { createCircle, createRect, createFiveStar, createImage, createLine, createPolygon, createQrcode, createText, utils, context } = sakuraContext
	const { canvasWidth, canvasHeight } = utils
	// 所有的绘制方法
	const drawMethods: { 
		[key in SakuraCanvasJSON.DrawPosterParamsKey]: Function
	} = {
		// 绘制圆形
		circle: createCircle,
		// 绘制五角星
		fiveStar: createFiveStar,
		// 绘制图片
		image: createImage,
		// 绘制线条
		line: createLine,
		// 绘制多边形
		polygon: createPolygon,
		// 绘制二维码
		qrcode: createQrcode,
		// 绘制矩形
		rect: createRect,
		// 绘制文字
		text: createText
	}
	// 存储所有的绘制内容的位置信息
	const allPositionInfoList: SakuraCanvasJSON.DrawPositionInfoData[] = []
	const allPositionInfoDataList: SakuraCanvasJSON.DrawPositionInfoData['data'][] = [] 
	// 上一次的绘制信息
	let beforePositionInfo: SakuraCanvasJSON.DrawPositionInfoData = {} as SakuraCanvasJSON.DrawPositionInfoData
	try {
		for (const data of await fn(canvasWidth,canvasHeight)) {
			const { type, params, searchKey = '', callback, key } = data
			const drawDataParams: SakuraCanvasJSON.DrawPosterData['params'] = extend({}, params, callback ? callback(...getCallbackPositionInfo({ searchKey, beforePositionInfo, allPositionInfoList: allPositionInfoList })) : {})
			beforePositionInfo = {
				key: key ?? '',
				data: await drawMethods[type](drawDataParams)
			}
			allPositionInfoList.push(beforePositionInfo)
			allPositionInfoDataList.push(beforePositionInfo.data)
		}
		context.draw && context.draw()
		return {
			success: true,
			message: '绘制成功, 请调用exportImage方法生成图片',
			data: ''
		}
	} catch (e) {
		return {
			success: false,
			message: JSON.stringify(e),
			data: ''
		}
	}
}