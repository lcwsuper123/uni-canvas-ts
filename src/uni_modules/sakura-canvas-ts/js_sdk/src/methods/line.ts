import { extend } from '../utils/shared';
import { getPositionInfoByOrigin } from '../utils/positionInfo'
/**
 * 获取线条位置信息
 * @param params 
 * @param params.x 水平方向位置 
 * @param params.y 垂直方向位置 
 * @param params.width 线条的宽度 
 * @param params.height 线条的高度 
 */
export const getLinePositionInfo = (params: SakuraCanvasLine.PositionInfoParams): SakuraCanvasLine.PositionInfo => {
	const { x = 0, y = 0, width, height } = params
	return extend<SakuraCanvasLine.PositionInfo>({}, getPositionInfoByOrigin({
		x,
		y,
		width,
		height
	}))
}
/**
 * 获取绘制线条私有参数的默认值
 * @param params 
 */
export const getLineDrawPrivateParamsDefaultValue = (params: SakuraCanvasLine.DrawPrivateParams): Required<SakuraCanvasLine.DrawPrivateParams> => {
	const { positionInfo = null } = params
	return {
		positionInfo
	}
}
/**
 * 创建线条
 * @param this 
 * @param params 绘制线条的参数
 * @param fn 回调函数在绘制完成时调用
 */
export async function createLine(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasLine.DrawParams, fn?: SakuraCanvasLine.Fn): Promise<SakuraCanvasLine.PositionInfo> {
	const { context, contextGlobalMethods, canvasWidth } = this
	const { createDrawWrap, getBasicDrawParamsDefaultValue } = contextGlobalMethods
	const basicParams = getBasicDrawParamsDefaultValue(params)
	const { x, y, width, height, color } = basicParams
	const { positionInfo } = getLineDrawPrivateParamsDefaultValue(params)
	const linePositionInfo: SakuraCanvasLine.PositionInfo = positionInfo || getLinePositionInfo({ x, y, width, height })
	const { width: lineWidth, height: lineHeight, startX, startY } = linePositionInfo
	return await createDrawWrap<SakuraCanvasLine.PositionInfo>({
		basicParams,
		positionInfo: linePositionInfo,
		fn
	}, () => {
		context.lineWidth = lineHeight
		context.strokeStyle = color
		context.moveTo(startX, startY)
		context.lineTo(lineWidth + startX, startY)
		context.stroke()
	})
}