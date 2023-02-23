import { extend } from '../utils/shared'
import { getTextDrawInfo, getTextDrawInfoDefaultParams, measureText } from '../utils/text'
import { getPositionInfoByOrigin } from '../utils/positionInfo'
import { createRect } from './rect'
import { createLine } from './line'
/**
 * 获取文字绘制信息
 * @param this sakuraCanvas工具方法
 * @param params.text 文字内容
 * @param params.width 文字宽度
 * @param params.textIndent 首行缩进
 * @param params.lastWidth 最后一行的宽度
 * @param params.font 字体样式
 * @param params.defaultColor 默认颜色
 * @param params.textAlgin 文字对齐方式
 * @param params.highlightText 高亮文字
 * @param params.drawInfo 文字绘制信息
 */
export function getTextPositionInfo(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasText.PositionInfoParams): SakuraCanvasText.PositionInfo {
	const { drawInfo, ...drawInfoParams } = params
	const textDrawInfo: SakuraCanvasText.DrawInfo = drawInfo || getTextDrawInfo.call(this, extend<SakuraCanvasText.DrawInfoParams>({}, drawInfoParams))
	const { originWidth, x, y, height } = textDrawInfo
	return extend<SakuraCanvasText.PositionInfo>({}, getPositionInfoByOrigin({
		x,
		y,
		width: originWidth,
		height
	}), {
		drawInfo: textDrawInfo,
	})
}
/**
 * 获取绘制文字的工具方法
 * @param utils 
 * @returns 
 */
export function getTextUtilsMethod(this: SakuraCanvasShared.SakuraCanvasUtils): SakuraCanvasText.UtilsMethod {
	const { context, canvasWidth, } = this
	return {
		/**
		 * 获取文字的绘制信息
		 */
		getTextDrawInfo: getTextDrawInfo.bind(this),
		/**
		 * 计算文字大小
		 */
		measureText: measureText.bind(context),
		/**
		 * 获取文字位置信息
		 */
		getTextPositionInfo: getTextPositionInfo.bind(this)
	}
}
/**
 * 获取绘制文字私有参数的默认值
 * @param params 
 * @param canvasWidth 画布参数
 */
export const getTextDrawPrivateParamsDefaultValue = (params: SakuraCanvasText.DrawPrivateParams, canvasWidth: number): Required<SakuraCanvasText.DrawPrivateParams> => {
	const { positionInfo = null, drawInfo = null, textRect = null, ...drawInfoParams } = params
	return {
		positionInfo,
		drawInfo,
		textRect,
		...getTextDrawInfoDefaultParams(drawInfoParams as SakuraCanvasText.DrawInfoParams, canvasWidth)
	}
}
/**
 * 绘制文字矩形
 * @param this 
 * @param params 
 * @param positionInfo 文字的位置信息
 */
export async function createTextRect(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasText.RectParams, positionInfo: SakuraCanvasText.PositionInfo): Promise<SakuraCanvasRect.PositionInfo> {
	const { vorizontal = 10, vertical = 10, show = false, ...rectParams  } = params
	const { startX, startY, height, drawInfo: { maxWidth } } = positionInfo
	const rectX = startX - vorizontal
	const rectY = startY - vertical
	rectParams.fillMode = rectParams.fillMode ?? 'stroke'
	const rectWidth = maxWidth + vorizontal * 2
	const rectHeight = height + vertical * 2
	return await createRect.call(this, {
		x: rectX,
		y: rectY,
		width: rectWidth,
		height: rectHeight,
		...rectParams
	})
}
/**
 * 绘制文字
 * @param this 
 * @param params 绘制文字的参数
 * @param fn 回调函数在绘制完成时调用
 */
export async function createText(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasText.DrawParams, fn?: SakuraCanvasText.Fn): Promise<SakuraCanvasText.PositionInfo> {
	const { context, contextGlobalMethods, canvasWidth } = this
	const { createDrawWrap, getBasicDrawParamsDefaultValue } = contextGlobalMethods
	// params.defaultColor = params.color || params.defaultColor
	// 当使用了textRect时重置文字的位置
	if (params.textRect?.show) {
		const { vertical, vorizontal } = params.textRect
		params.x = (params.x || 0) + vorizontal
		params.y = (params.y || 0) + vertical
	}
	const basicParams = getBasicDrawParamsDefaultValue(params)
	const { positionInfo, textRect: textRectParams } = getTextDrawPrivateParamsDefaultValue(params, canvasWidth)
	const textPositionInfo: SakuraCanvasText.PositionInfo = positionInfo || getTextPositionInfo.call(this, params)
	if (textRectParams && textRectParams.show) {
		const { shadow, rotate } = basicParams
		!textRectParams.shadow && (textRectParams.shadow = shadow)
		!textRectParams.rotate && (textRectParams.rotate = rotate)
		extend(textPositionInfo, await createTextRect.call(this, textRectParams, textPositionInfo))
		// textPositionInfo.textRectPositionInfo = await createTextRect.call(this, textRectParams, textPositionInfo)
	}
	return await createDrawWrap<SakuraCanvasText.PositionInfo>({
		basicParams,
		positionInfo: textPositionInfo,
		fn
	}, async () => {
		const { drawInfo: { drawInfo, dividerInfo },  } = textPositionInfo
		for (const i of drawInfo) {
			const { text, length, startX, fontText, color, limitText, lineDrawInfo, fontSize, textMetrics } = i
			let { startY } = i
			context.fillStyle = color
		    context.font = fontText
			if (textMetrics.actualBoundingBoxAscent) {
				startY -= (fontSize - textMetrics.actualBoundingBoxAscent)
			}
		    context.fillText(limitText || text, startX, startY, )
		    if (lineDrawInfo) {
				const { color, height, x, y, width, style } = lineDrawInfo
				await createLine.call(this, {
					x,
					y,
					width,
					height,
					lineStyle: {
						style,
					},
					color
				})
		    }
		}
		if (dividerInfo && dividerInfo.length) {
			for (const v of dividerInfo) {
				await createLine.call(this, {
					...v,
				})
			}
		}
	})
}