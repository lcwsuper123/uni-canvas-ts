import { getPositionInfoByOrigin } from '../utils/positionInfo'
import { extend, getUseBoxSizingAfterDrawInfo } from './../utils/shared'
/**
 * 获取矩形位置信息
 * @param params 
 * @param params.x 水平方向位置 
 * @param params.y 垂直方向位置 
 * @param params.width 矩形宽度 
 * @param params.height 矩形高度 
 */
export const getRectPositionInfo = (params: SakuraCanvasRect.PositionInfoParams): SakuraCanvasRect.PositionInfo => {
	const { x = 0, y = 0, width, height } = params
	return extend<SakuraCanvasRect.PositionInfo>({}, getPositionInfoByOrigin({
		x,
		y,
		width,
		height
	}))
}
/**
 * 获取绘制矩形私有参数的默认值
 * @param params 
 */
export const getRectDrawPrivateParamsDefaultValue = (params: SakuraCanvasRect.DrawPrivateParams): Required<SakuraCanvasRect.DrawPrivateParams> => {
	const { r = 0, positionInfo = null } = params
	return {
		r,
		positionInfo
	}
}
/**
 * 获取矩形绘制圆角时的数据
 * @param r 圆角大小
 */
export const getRectRoundData = (r: SakuraCanvasRect.Round): SakuraCanvasRect.RoundData => {
	if (typeof r === 'number') {
		return {
			top: r,
			right: r,
			bottom: r,
			left: r
		}
	}
	const length = r.length
	if (length === 1) {
		const [round] = r
		return {
			top: round,
			right: round,
			left: round,
			bottom: round
		}
	}
	if (length === 2) {
		const [upDown, leftRight] = r
		return {
			top: upDown,
			right: leftRight,
			bottom: upDown,
			left: leftRight
		}
	}
	if (length === 3) {
		const [top, leftRight, bottom] = r
		return {
			top,
			right: leftRight,
			left: leftRight,
			bottom
		}
	}
	const [top, right, bottom, left] = r
	return {
		top,
		right,
		bottom,
		left
	}
	
}
/**
 * 创建矩形
 * @param this 
 * @param params 绘制矩形参数
 * @param fn 回调函数在绘制完成时调用
 */
export async function createRect(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasRect.DrawParams, fn?: SakuraCanvasRect.Fn): Promise<SakuraCanvasRect.PositionInfo> {
	const { context, contextGlobalMethods } = this
	const { createDrawWrap, getBasicDrawParamsDefaultValue } = contextGlobalMethods
	const basicParams = getBasicDrawParamsDefaultValue(params)
	const { x, y, width, height } = basicParams
	const { r, positionInfo } = getRectDrawPrivateParamsDefaultValue(params)
	const rectPositionInfo: SakuraCanvasRect.PositionInfo = positionInfo || getRectPositionInfo({ x, y, width, height })
	return await createDrawWrap<SakuraCanvasRect.PositionInfo>({
		basicParams,
		positionInfo: rectPositionInfo,
		fn
	}, () => {
		// 实现rect->box-sizing: border-box功能
		const fillStyle = basicParams.fillStyle as Required<SakuraCanvasParams.FillStyleParams>
		const { width, height, x, y } = getUseBoxSizingAfterDrawInfo({
			positionInfo: rectPositionInfo,
			fillStyle
		})
		// 上下左右四个角的圆角大小
		const { top, right, bottom, left } = getRectRoundData(r)
		context.lineTo(x + top, y)
		context.arc(x + width - right, y + right, right, Math.PI * 1.5, 0, false)
		context.lineTo(x + width, y + height - bottom)
		context.arc(x + width - bottom, y + height - bottom, bottom, 0, Math.PI * .5, false)
		context.lineTo(x + left, y + height)
		context.arc(x + left, y + height - left, left, Math.PI * .5, Math.PI, false)
		context.lineTo(x, y + top)
		context.arc(x + top, y + top, top, Math.PI * 1, Math.PI * 1.5, false)
	})
}