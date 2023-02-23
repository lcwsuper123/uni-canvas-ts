import { deepObject } from './../utils/shared';
import { getPositionInfoByDot } from '../utils/positionInfo'
import { extend } from '../utils/shared'
/**
 * 创建五角星模型
 * @param size 五角星尺寸
 * @param lineWidth 边框大小
 * @returns 
 */
export const createFiveStarModel = (size: number, lineWidth: number = 0): SakuraCanvasFiveStar.ModelInfo => {
	size -= lineWidth * 2
	const outCircleSize: number = size / 2
	const inCircleSize: number = size / 4
	const dotPosition: SakuraCanvasFiveStar.DotPosition = []
	for(let i = 0; i < 5; i++) {
		// 凸出的每个点的坐标位置
		const outDotPosition = (18 + 72 * i) / 180 * Math.PI
		// 凹下去的每个点坐标位置
		const inDotPosition = (54 + 72 * i) / 180 * Math.PI
		dotPosition.push([
			[Math.cos(outDotPosition) * outCircleSize + outCircleSize, -Math.sin(outDotPosition) * outCircleSize + outCircleSize], 
			[Math.cos(inDotPosition) * inCircleSize + outCircleSize, -Math.sin(inDotPosition) * inCircleSize + outCircleSize]
		])
	}
	return {
		dotPosition,
		size
	}
}
/**
 * 获取五角星的位置信息(size与modelInfo只需要填一个就行)
 * @param params 
 * @param params.x 水平方向位置 
 * @param params.y 垂直方向位置 
 * @param params.size 五角星尺寸 
 * @param params.lineWidth 边框大小
 * @param params.modelInfo 五角星模型信息可以不填
 * @returns 
 */
export const getFiveStarPositionInfo = (params: SakuraCanvasFiveStar.PositionInfoParams): SakuraCanvasFiveStar.PostionInfo => {
	const { modelInfo, x = 0, y = 0, size = 0, lineWidth = 1 } = params
	const fiveStarModelInfo = deepObject<SakuraCanvasFiveStar.ModelInfo>(modelInfo || createFiveStarModel(size, lineWidth))
	const { dotPosition: drawDotPosition } = fiveStarModelInfo
	const xDotPositions: number[] = []
	const yDotPositions: number[] = []
	drawDotPosition.forEach(v => {
		v.forEach(item => {
			const [x1, y1] = item
			item[0] = x1 + x + lineWidth
			item[1] = y1 + y + lineWidth
			xDotPositions.push(item[0])
			yDotPositions.push(item[1])
		})
	})
	return extend<SakuraCanvasFiveStar.PostionInfo>({}, getPositionInfoByDot({
		x,
		y,
		xDotPositions,
		yDotPositions,
	}), {
		drawDotPosition,
		modelInfo: fiveStarModelInfo
	})
}
/**
 * 获取绘制五角星的私有属性默认参数
 * @param params 
 */
export const getFiveStarDrawPrivateParamsDefaultValue = (params: SakuraCanvasFiveStar.DrawPrivateParams): Required<SakuraCanvasFiveStar.DrawPrivateParams> => {
	const { modelInfo = null, positionInfo = null } = params
	return {
		modelInfo,
		positionInfo
	}
}
/**
 * 创建五角星
 * @param this 
 * @param params 绘制五角星参数
 * @param fn 回调函数在绘制完成时调用
 */
export async function createFiveStar(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasFiveStar.DrawParams, fn?: SakuraCanvasFiveStar.Fn): Promise<SakuraCanvasFiveStar.PostionInfo> {
	const { context, contextGlobalMethods } = this
	const { createDrawWrap, getBasicDrawParamsDefaultValue } = contextGlobalMethods
	const basicParams = getBasicDrawParamsDefaultValue(params)
	const { x, y, size } = basicParams
	const { modelInfo, positionInfo } = getFiveStarDrawPrivateParamsDefaultValue(params)
	const lineWidth = basicParams.fillMode !== 'fill' ? basicParams.fillStyle.lineWidth || 0 : 0
	const fiveStarPositionInfo: SakuraCanvasFiveStar.PostionInfo = positionInfo || extend<SakuraCanvasFiveStar.PostionInfo>(getFiveStarPositionInfo({
		modelInfo: modelInfo || createFiveStarModel(size, lineWidth),
		x,
		y,
		lineWidth
	}))
	return await createDrawWrap<SakuraCanvasFiveStar.PostionInfo>({
		basicParams,
		positionInfo: fiveStarPositionInfo,
		fn
	}, () => {
		fiveStarPositionInfo.drawDotPosition.forEach(([outDotPositionArr, inDotPositionArr]) => {
			context.lineTo(outDotPositionArr[0] , outDotPositionArr[1])
			context.lineTo(inDotPositionArr[0], inDotPositionArr[1])
		})
	})
}