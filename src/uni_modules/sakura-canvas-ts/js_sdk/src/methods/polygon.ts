import { deepObject } from './../utils/shared';
import { getPositionInfoByDot } from '../utils/positionInfo'
import { extend } from '../utils/shared'
/**
 * 创建多边形模型
 * @param options 
 * @param options.n 几条边 最少三条
 * @param options.size 多边形的大小
 * @param options.angle 绘制时的初始角度默认Math.PI / 2
 * @returns
 */
export const createPolygonModel = (params: SakuraCanvasPolygon.CreateModelParams): SakuraCanvasPolygon.ModelInfo => {
	const { n, lineWidth = 1 } = params
	const size = (params.size - lineWidth) / 2
	const unitAngle = Math.PI * 2  / n
	let angle: number = params.angle || Math.PI / 2
	const dotPosition: SakuraCanvasPolygon.DotPosition = []
	for (let i = 1; i <= n; i++) {
		dotPosition.push([
			size * Math.cos(angle) + size,
			size * Math.sin(angle) + size
		])
		angle += unitAngle
	}
	return {
		n,
		size: params.size,
		angle,
		dotPosition
	}
}
/**
 * 根据多边形模型, 水平位置, 垂直位置, 计算并获取多边形的位置信息
 * @param params 
 * @param params.x 水平方向位置 
 * @param params.y 垂直方向位置 
 * @param params.n 几条边 最少三条 
 * @param params.size 多边形的大小 
 * @param params.angle 绘制时的初始角度默认Math.PI / 2 
 * @param params.modelInfo 多边形模型 可以不填
 */
export const getPolygonPositionInfo = (params: SakuraCanvasPolygon.PositionInfoParams): SakuraCanvasPolygon.PositionInfo => {
	const { modelInfo, x = 0, y = 0, n, size, angle, lineWidth = 1 } = params
	const polygonModelInfo = deepObject<SakuraCanvasPolygon.ModelInfo>(modelInfo || createPolygonModel({ n, size, angle, lineWidth }))
	const { dotPosition: drawDotPosition, size: polygonSize } = polygonModelInfo
	const xDotPositions: number[] = []
	const yDotPositions: number[] = []
	drawDotPosition.forEach(v => {
		const [x1, y1] = v
		v[0] = x1 + x + lineWidth / 2
		v[1] = y - (y1 - polygonSize / 2) + polygonSize / 2
		xDotPositions.push(v[0])
		yDotPositions.push(v[1])
	})
	return extend<SakuraCanvasPolygon.PositionInfo>({}, getPositionInfoByDot({
		x,
		y,
		xDotPositions,
		yDotPositions,
	}), {
		drawDotPosition,
		modelInfo: polygonModelInfo
	})
}
/**
 * 获取绘制多边形私有参数的默认值
 * @param params 
 */
export const getPolygonDrawPrivateParamsDefaultValue = (params: SakuraCanvasPolygon.DrawPrivateParams): Required<SakuraCanvasPolygon.DrawPrivateParams> => {
	const { modelInfo = null, positionInfo = null, n = 3, angle = Math.PI / 2 } = params
	return {
		modelInfo,
		positionInfo,
		n,
		angle
	}
}
/**
 * 创建多边形
 * @param this 
 * @param params 
 * @param fn 回调函数在绘制完成时调用
 */
export async function createPolygon(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasPolygon.DrawParams, fn?: SakuraCanvasPolygon.Fn): Promise<SakuraCanvasPolygon.PositionInfo> {
	const { context, contextGlobalMethods } = this
	const { createDrawWrap, getBasicDrawParamsDefaultValue } = contextGlobalMethods
	const basicParams = getBasicDrawParamsDefaultValue(params)
	const { x, y, size, } = basicParams
	const { n, angle, modelInfo, positionInfo, } = getPolygonDrawPrivateParamsDefaultValue(params)
	const lineWidth = basicParams.fillMode !== 'fill' ? basicParams.fillStyle.lineWidth || 0 : 0
	const polygonPositionInfo: SakuraCanvasPolygon.PositionInfo = positionInfo || extend<SakuraCanvasPolygon.PositionInfo>(getPolygonPositionInfo({
		modelInfo: modelInfo || createPolygonModel({ size, n, angle, lineWidth }),
		x,
		y,
		n,
		size,
		angle,
		lineWidth
	}))
	return await createDrawWrap<SakuraCanvasPolygon.PositionInfo>({
		basicParams,
		positionInfo: polygonPositionInfo,
		fn
	}, () => {
		polygonPositionInfo.drawDotPosition.forEach(([x1, y1], i) => {
			if (i === 0) {
				context.moveTo(x1, y1)
			}
			context.lineTo(x1, y1)
		})
	})
}