import { getMaxnumAndMinnum } from './shared'
/**
 * 根据(绘制点的信息/原宽高)绘制图形的位置信息与自身信息
 */
type PositionInfoParams = {
	/**
	 * x轴位置
	 */
	x: number,
	/**
	 * y轴位置
	 */
	y: number,
	/**
	 * 绘制点的x轴数组信息
	 */
	xDotPositions?: number[],
	/**
	 * 绘制点的y轴数组信息
	 */
	yDotPositions?: number[],
	/**
	 * 原宽度
	 */
	width?: number,
	/**
	 * 原高度
	 */
	height?: number,
	/**
	 * origin: 根据原宽高来获取图形信息
	 * dot: 根据点来获取图形信息
	 * all: 两个信息都要(需要传递全部参数)
	 * 默认: origin
	 */
	type?: 'origin' | 'dot' | 'all',
}
/**
 * 根据绘制点的信息获取图形的位置信息与自身信息参数
 */
type PositionInfoDotParams = Required<Pick<PositionInfoParams, 'x' | 'y' | 'xDotPositions' | 'yDotPositions'>>
/**
 * 根据原宽度的信息获取图形的位置信息与自身信息参数
 */
type PositionInfoOriginParams = Required<Pick<PositionInfoParams, 'x' | 'y' | 'width' | 'height'>>
/**
 * 根据(绘制点的信息/原宽高)绘制图形的位置信息与自身信息
 * @param params 
 * @param params.x x轴位置
 * @param params.y y轴位置
 * @param params.xDotPositions 绘制点的x轴数组信息
 * @param params.yDotPositions 绘制点的y轴数组信息
 * @param params.width 原宽度
 * @param params.height 原高度
 * @param params.type 默认: origin origin: 根据原宽高来获取图形信息 dot: 根据点来获取图形信息 all: 两个信息都要(需要传递全部参数)
 * @returns 
 */
export const getPositionInfo = (params: PositionInfoParams): SakuraCanvasShared.PositionInfo | {
	dotInfo: SakuraCanvasShared.PositionInfo,
	originInfo: SakuraCanvasShared.PositionInfo
}   => {
	const { x = 0, y = 0, xDotPositions = [], yDotPositions = [], width = 0, height = 0, type = 'origin' } = params
	if (type === 'origin') {
		return getPositionInfoByOrigin({
			x,
			y,
			width,
			height
		})
	}
	if (type === 'dot') {
		return getPositionInfoByDot({
			x,
			y,
			xDotPositions,
			yDotPositions,
		})
	}
	return {
		dotInfo: getPositionInfoByDot({
			x,
			y,
			xDotPositions,
			yDotPositions,
		}),
		originInfo: getPositionInfoByOrigin({
			x,
			y,
			width,
			height
		})
	}
}
/**
 * 根据绘制点的信息获取图形的位置信息与自身信息
 * @param params 
 * @param params.x x轴位置
 * @param params.y y轴位置
 * @param params.xDotPositions 绘制点的x轴数组信息
 * @param params.yDotPositions 绘制点的y轴数组信息
 * @returns 
 */
export const getPositionInfoByDot = (params: PositionInfoDotParams): SakuraCanvasShared.PositionInfo => {
	const { x, y, xDotPositions, yDotPositions } = params
	const { maxValue: xMaxValue, minValue: xMinValue } = getMaxnumAndMinnum(xDotPositions)
	const { maxValue: yMaxValue, minValue: yMinValue } = getMaxnumAndMinnum(yDotPositions)
	const startX = xMinValue
	const endX = xMaxValue
	const startY = yMinValue
	const endY = yMaxValue
	const width = endX - startX
	const height = endY - startY
	return {
		startX,
		endX,
		startY,
		endY,
		width,
		height,
	}
}
/**
 * 根据原宽度的信息获取图形的位置信息与自身信息
 * @param params 
 * @param params.x x轴位置
 * @param params.y y轴位置
 * @param params.width 原宽度
 * @param params.height 原高度
 * @returns 
 */
export const getPositionInfoByOrigin = (params: PositionInfoOriginParams): SakuraCanvasShared.PositionInfo => {
	const { x, y, width, height } = params
	const startX = x
	const endX = x + width
	const startY = y
	const endY = y + height
	return {
		startX,
		endX,
		startY,
		endY,
		width: endX - startX,
		height: endY - startY
	}
}