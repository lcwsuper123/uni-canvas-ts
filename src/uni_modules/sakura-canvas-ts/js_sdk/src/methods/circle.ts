import { getPositionInfoByOrigin } from '../utils/positionInfo'
import { extend, getUseBoxSizingAfterDrawInfo } from '../utils/shared'
/**
 * 获取圆形位置信息
 * @param params 
 * @param params.x 水平方向位置 
 * @param params.y 垂直方向位置 
 * @param params.size 圆形尺寸 
 * @returns 
 */
export const getCirclePositionInfo = (params: SakuraCanvasCircle.PositionInfoParams): SakuraCanvasCircle.PositionInfo => {
	const { x = 0, y = 0, size } = params
	return extend<SakuraCanvasCircle.PositionInfo>({}, getPositionInfoByOrigin({
		x,
		y,
		width: size,
		height: size
	}))
}
/**
 * 获取绘制圆形私有参数的默认值
 * @param params 
 */
export const getCircleDrawPrivateParamsDefaultValue = (params: SakuraCanvasCircle.DrawPrivateParams): Required<SakuraCanvasCircle.DrawPrivateParams> => {
	const { positionInfo = null, sAngle = 0, eAngle = Math.PI * 2, counterclockwise = false } = params
	return {
		positionInfo,
		sAngle,
		eAngle,
		counterclockwise
	}
}
/**
 * 绘制圆形
 * @param this 
 * @param params 绘制圆形参数
 * @param fn 回调函数在绘制完成时调用
 */
export async function createCircle(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasCircle.DrawParams, fn?: SakuraCanvasCircle.Fn): Promise<SakuraCanvasCircle.PositionInfo> {
	const { context, contextGlobalMethods } = this
	const { createDrawWrap, getBasicDrawParamsDefaultValue } = contextGlobalMethods
	const basicParams = getBasicDrawParamsDefaultValue(params)
	const { x, y, size } = basicParams
	const { positionInfo, sAngle, eAngle, counterclockwise } = getCircleDrawPrivateParamsDefaultValue(params)
	const arcPositionInfo: SakuraCanvasCircle.PositionInfo = positionInfo || getCirclePositionInfo({ x, y, size })
	return await createDrawWrap<SakuraCanvasCircle.PositionInfo>({
		basicParams,
		positionInfo: arcPositionInfo,
		fn
	}, () => {
		const fillStyle = basicParams.fillStyle as Required<SakuraCanvasParams.FillStyleParams>
		const { x, y, width: arcSize } = getUseBoxSizingAfterDrawInfo({
			positionInfo: arcPositionInfo,
			fillStyle,
		}) 
		const halfSize: number = arcSize / 2
		context.arc(x + halfSize, y + halfSize, halfSize, sAngle, eAngle, counterclockwise)
	})
}