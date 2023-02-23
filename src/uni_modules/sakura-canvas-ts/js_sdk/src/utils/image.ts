import { getImageInfo } from './api'
import { extend } from './shared'
/**
 * 获取绘制图片信息
 * @param params.src 图片路径
 * @param params.width 绘制的图片宽度
 * @param params.height 绘制的图片高度
 * @param params.x x轴位置水平方向
 * @param params.y y轴位置垂直方向
 * @param params.mode aspectFit | aspectFill | heightFix | widthFix
 * @returns 
 */
export const getDrawImageInfo = async (params: SakuraCanvasImage.DrawInfoParams): Promise<SakuraCanvasImage.DrawInfo> => {
	const { src, mode = 'aspectFill' } = params
	const { width, height, x, y } = getDrawImageInfoDefaultValue(params)
	const imageInfoResult: SakuraCanvasShared.Result<SakuraCanvasImage.Info> = await getImageInfo(src)
	if (!imageInfoResult.success) {
		throw new Error(imageInfoResult.message)
	}
	// originImageWidth: 原图宽度 originImageHeight: 原图高度
	const { width: originImageWidth, height: originImageHeight } = imageInfoResult.data as SakuraCanvasImage.Info
	return extend<SakuraCanvasImage.DrawInfo>(getImageModeInfo({
			width,
			height,
			x,
			y,
			originImageHeight,
			originImageWidth,
			mode
		}), {
			path: src
		}
	)
}
/**
 * 获取绘制图片信息参数的默认值
 * @param params 
 */
const getDrawImageInfoDefaultValue = (params: SakuraCanvasImage.DrawInfoParams): Required<Pick<SakuraCanvasImage.DrawInfoParams, 'x' | 'y' | 'width' | 'height' | 'src'>> => {
	const { src, width = 0, height = 0, x = 0, y = 0, positionInfo } = params
	if (positionInfo) {
		const { startX, startY, width, height } = positionInfo as SakuraCanvasShared.PositionInfo
		return {
			src,
			width,
			height,
			x: startX,
			y: startY,
		}
	}
	return {
		src,
		width,
		height,
		x,
		y,
	}
}
/**
 * 根据不同图片模式获取不同模式下的图片绘制信息
 * @param params 
 * @returns 
 */
export const getImageModeInfo = (params: SakuraCanvasImage.ModeInfoParams & {
	mode: SakuraCanvasImage.Mode
}): SakuraCanvasImage.ModeInfo => {
	// const { mode, ...imageModeInfoParams } = params
	switch(params.mode) {
		case 'aspectFill':
			return getAspectFillModeInfo(params)
		case 'aspectFit':
			return getAspectFitModeDrawInfo(params)
		case 'widthFix':
			return getWidthFixModeInfo(params)
		case 'heightFix':
			return getHeightFixModeInfo(params)
		case 'none':
			const { x, y, width, height, mode } = params
			return {
				sWidth: 0,
				sHeight: 0,
				sx: 0,
				sy: 0,
				dWidth: width,
				dHeight: height,
				dx: x,
				dy: y,
				mode
			}
	}
}
/**
 * 获取aspectFit模式下的图片绘制信息
 * 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
 * @param params.originImageWidth 原图宽度
 * @param params.originImageHeight 原图高度
 * @param params.width 绘制的图片宽度
 * @param params.height 绘制的图片高度
 * @param params.x x轴位置水平方向
 * @param params.y y轴位置垂直方向
 */
export const getAspectFitModeDrawInfo = (params: SakuraCanvasImage.ModeInfoParams): SakuraCanvasImage.ModeInfo => {
	const { originImageWidth, originImageHeight, width, height, x, y, mode, } = params
	let aspect = originImageHeight / originImageWidth
	let dWidth = width
	let dHeight = aspect * dWidth
	if (aspect >= 1) {
		aspect = originImageWidth / originImageHeight
		dHeight = height
		dWidth = aspect * dHeight
	}
	return {
		dWidth,
		dHeight,
		dx: x + ((width - dWidth) / 2),
		dy: y + ((height - dHeight) / 2),
		sWidth: originImageWidth,
		sHeight: originImageHeight,
		sx: 0,
		sy: 0,
		mode
	}
}
/**
 * 获取aspectFill模式下的图片绘制信息
 * 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
 * @param params 
 */
export const getAspectFillModeInfo = (params: SakuraCanvasImage.ModeInfoParams): SakuraCanvasImage.ModeInfo => {
	const { originImageWidth, originImageHeight, width, height, x, y, mode } = params
	let aspect = originImageHeight / originImageWidth
	let dWidth = width
	let dHeight = aspect * dWidth
	let sx = 0
	let sy = (originImageHeight - (height * (originImageHeight / dHeight))) / 2
	if (aspect < 1) {
		// 高比宽小 高是短边
		aspect = originImageWidth / originImageHeight
		dHeight = height
		dWidth = aspect * dHeight
		sy = 0
		sx = (originImageWidth - (width * (originImageWidth / dWidth))) / 2
	}
	return {
		dWidth,
		dHeight,
		sx,
		sy,
		sWidth: originImageWidth,
		sHeight: originImageHeight,
		dx: x,
		dy: y,
		mode
	}
}
/**
 * 获取widthFix模式下的图片绘制信息
 * 宽度不变，高度自动变化，保持原图宽高比不变
 * @param params 
 */
export const getWidthFixModeInfo = (params: SakuraCanvasImage.ModeInfoParams): SakuraCanvasImage.ModeInfo => {
	const { originImageWidth, originImageHeight, width, height, x, y, mode } = params
	const aspect = originImageHeight / originImageWidth
	const dWidth = width
	const dHeight = dWidth * aspect
	const sx = 0
	const sy = 0
	return {
		dWidth,
		dHeight,
		sx,
		sy,
		sWidth: originImageWidth,
		sHeight: originImageHeight,
		dx: x,
		dy: y,
		mode
	}
}
/**
 * 获取heightFix模式下的图片绘制信息
 * 高度不变，宽度自动变化，保持原图宽高比不变
 * @param params 
 * @returns 
 */
export const getHeightFixModeInfo = (params: SakuraCanvasImage.ModeInfoParams): SakuraCanvasImage.ModeInfo => {
	const { originImageWidth, originImageHeight, width, height, x, y, mode } = params
	const aspect = originImageWidth / originImageHeight
	const dHeight = height
	const dWidth = dHeight * aspect
	const dx = 0
	const dy = 0
	return {
		dWidth,
		dHeight,
		dx: x,
		dy: y,
		sWidth: originImageWidth,
		sHeight: originImageHeight,
		sx: dx,
		sy: dy,
		mode
	}
}