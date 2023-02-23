import { computedPosition } from './shared'
/**
 * 获取默认绘制参数的默认值
 * @param params 
 */
export function getBasicDrawParamsDefaultValue(this: SakuraCanvasParams.SakuraCanvasInitParams, params: SakuraCanvasParams.BasicDrawParams): Required<SakuraCanvasParams.BasicDrawParams> {
	const { 
		y = 0, color = '#000000', size = 0, fillMode = 'fill', 
		width = 0, height = 0, alpha = 1, rotate = 0,
		shadow = null, gradient = null, lineWidth = 1, fillStyle = {},
		lineStyle, window = { algin: 'normal' }
	} = params
	let { x = 0 } = params
	if (window && window.algin !== 'normal') {
		const { algin, rightGap = 0 } = window
		x = computedPosition({
			startX: 0,
			type: algin,
			rightGap,
			containerWidth: this.canvasWidth,
			contentWidth: width || size
		})
	}
	return {
		x,
		y,
		color,
		size,
		fillMode,
		width,
		height,
		alpha,
		rotate,
		shadow,
		gradient,
		lineWidth,
		fillStyle: { color, lineWidth, fillMode, x, y, gradient, ...fillStyle },
		lineStyle: lineStyle || {},
		window
	}
}
/**
 * 获取渐变参数的默认值
 * @param params 
 * @returns 
 */
export const getGradientParamsDefalutValue = (params: SakuraCanvasParams.GradientParams | null): Required<SakuraCanvasParams.GradientParams> => {
	const { 
		type = 'linear',
		show = false,
		colors = [],
		circularPosition = { x: 0, y: 0, r: 0 }, 
		linearPosition = { x0: 0, x1: 0, y0: 0, y1: 0 }, 
	} = params || {}
	return {
		type,
		show,
		colors,
		circularPosition,
		linearPosition	
	}
}
/**
 * 格式化渐变参数
 * @param params 
 */
export const formatGradientParams = (params: Required<SakuraCanvasParams.GradientParams>, x: number, y: number): Required<SakuraCanvasParams.GradientParams> => {
	const { type, circularPosition, linearPosition } = params
	if (type === 'linear') {
		const { x0, x1, y0, y1 } = linearPosition
		linearPosition.x0 = x0 + x
		linearPosition.x1 = x1 + x
		linearPosition.y0 = y0 + y
		linearPosition.y1 = y1 + y
	} else {
		const { x: x0, y: y0 } = circularPosition
		circularPosition.x = x0 + x
		circularPosition.y = y0 + y
	}
	return params
}
/**
 * 获取阴影参数的默认值
 * @param params 
 */
export const getShadowParamsDefaultValue = (params: SakuraCanvasParams.ShadowParams | undefined): Required<SakuraCanvasParams.ShadowParams> => {
	const { x  = 0, y = 0, color = '#000000', blur = 0, show = false } = params || {}
	return {
		x,
		y,
		color,
		blur,
		show
	}
}
/**
 * 获取填充模式的默认参数
 * @param params 
 */
export const getFillStyleParamsDefaultValue = (params: SakuraCanvasParams.FillStyleParams): Required<SakuraCanvasParams.FillStyleParams> => {
	const { color = '#000000', fillMode = 'fill', strokeColor, fillColor, lineWidth = 1, setColor = true, gradient = null, x = 0, y = 1, fillGradient, strokeGradient  } = params
	const newFillGradient = getGradientParamsDefalutValue(fillGradient || gradient)
	const newStrokeGradient = getGradientParamsDefalutValue(strokeGradient || gradient)
	return {
		color,
		fillMode,
		strokeColor: strokeColor ?? color,
		fillColor: fillColor ?? color,
		lineWidth,
		setColor,
		gradient: fillMode === 'fill' ? newFillGradient : newStrokeGradient,
		fillGradient: newFillGradient,
		strokeGradient: newStrokeGradient,
		x,
		y
	}
}