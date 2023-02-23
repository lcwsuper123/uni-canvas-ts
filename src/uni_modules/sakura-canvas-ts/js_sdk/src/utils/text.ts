import { computedPosition, deepObject, extend } from './shared'
/**
 * 计算文字大小
 * @param this canvas上下文对象
 * @param text 文字
 * @param fontSize 文字大小
 */
export function measureText(this: UniApp.CanvasContext, text: string, fontSize: number): TextMetrics {
	if (this.measureText) {
		const textMetrics = this.measureText(text) as TextMetrics
		return textMetrics
	}
	// 这是为了兼容钉钉小程序,钉钉小程序没有Context.measureText方法
	let length = 0
	for (const i of text) {
		length += computedTextSize(i)
	}
	return {
		actualBoundingBoxAscent: 0,
		actualBoundingBoxDescent: 0,
		actualBoundingBoxLeft: 0,
		actualBoundingBoxRight: 0,
		fontBoundingBoxAscent: 0,
		fontBoundingBoxDescent: 0,
		width: length * fontSize
	}
}
/**
 * 计算字符大小
 * @param t 字符内容
 */
export const computedTextSize = (t: string): number => {
	let l: number
	if (/a/.test(t)) {
		l = 0.552734375
	} else if (/b/.test(t)) {
		l = 0.638671875
	} else if (/c/.test(t)) {
		l = 0.50146484375
	} else if (/d/.test(t)) {
		l = 0.6396484375
	} else if (/e/.test(t)) {
		l = 0.5673828125
	} else if (/f/.test(t)) {
		l = 0.3466796875
	} else if (/g/.test(t)) {
		l = 0.6396484375
	} else if (/h/.test(t)) {
		l = 0.61572265625
	} else if (/i/.test(t)) {
		l = 0.26611328125
	} else if (/j/.test(t)) {
		l = 0.26708984375
	} else if (/k/.test(t)) {
		l = 0.54443359375
	} else if (/l/.test(t)) {
		l = 0.26611328125
	} else if (/m/.test(t)) {
		l = 0.93701171875
	} else if (/n/.test(t)) {
		l = 0.6162109375
	} else if (/o/.test(t)) {
		l = 0.6357421875
	} else if (/p/.test(t)) {
		l = 0.638671875
	} else if (/q/.test(t)) {
		l = 0.6396484375
	} else if (/r/.test(t)) {
		l = 0.3818359375
	} else if (/s/.test(t)) {
		l = 0.462890625
	} else if (/t/.test(t)) {
		l = 0.37255859375
	} else if (/u/.test(t)) {
		l = 0.6162109375
	} else if (/v/.test(t)) {
		l = 0.52490234375
	} else if (/w/.test(t)) {
		l = 0.78955078125
	} else if (/x/.test(t)) {
		l = 0.5068359375
	} else if (/y/.test(t)) {
		l = 0.529296875
	} else if (/z/.test(t)) {
		l = 0.49169921875
	} else if (/A/.test(t)) {
		l = 0.70361328125
	} else if (/B/.test(t)) {
		l = 0.62744140625
	} else if (/C/.test(t)) {
		l = 0.6689453125
	} else if (/D/.test(t)) {
		l = 0.76171875
	} else if (/E/.test(t)) {
		l = 0.5498046875
	} else if (/F/.test(t)) {
		l = 0.53125
	} else if (/G/.test(t)) {
		l = 0.74365234375
	} else if (/H/.test(t)) {
		l = 0.7734375
	} else if (/I/.test(t)) {
		l = 0.2939453125
	} else if (/J/.test(t)) {
		l = 0.39599609375
	} else if (/K/.test(t)) {
		l = 0.634765625
	} else if (/L/.test(t)) {
		l = 0.51318359375
	} else if (/M/.test(t)) {
		l = 0.97705078125
	} else if (/N/.test(t)) {
		l = 0.81298828125
	} else if (/O/.test(t)) {
		l = 0.81494140625
	} else if (/P/.test(t)) {
		l = 0.61181640625
	} else if (/Q/.test(t)) {
		l = 0.81494140625
	} else if (/R/.test(t)) {
		l = 0.65283203125
	} else if (/S/.test(t)) {
		l = 0.5771484375
	} else if (/T/.test(t)) {
		l = 0.5732421875
	} else if (/U/.test(t)) {
		l = 0.74658203125
	} else if (/V/.test(t)) {
		l = 0.67626953125
	} else if (/W/.test(t)) {
		l = 1.017578125
	} else if (/X/.test(t)) {
		l = 0.64501953125
	} else if (/Y/.test(t)) {
		l = 0.603515625
	} else if (/Z/.test(t)) {
		l = 0.6201171875
	} else if (/[0-9]/.test(t)) {
		l = 0.58642578125
	} else if (/[\u4e00-\u9fa5]/.test(t)) {
		l = 1
	} else if (/ /.test(t)) {
		l = 0.2958984375
	} else if (/\`/.test(t)) {
		l = 0.294921875
	} else if (/\~/.test(t)) {
		l = 0.74169921875
	} else if (/\!/.test(t)) {
		l = 0.3125
	} else if (/\@/.test(t)) {
		l = 1.03125
	} else if (/\#/.test(t)) {
		l = 0.63818359375
	} else if (/\$/.test(t)) {
		l = 0.58642578125
	} else if (/\%/.test(t)) {
		l = 0.8896484375
	} else if (/\^/.test(t)) {
		l = 0.74169921875
	} else if (/\&/.test(t)) {
		l = 0.8701171875
	} else if (/\*/.test(t)) {
		l = 0.455078125
	} else if (/\(/.test(t)) {
		l = 0.333984375
	} else if (/\)/.test(t)) {
		l = 0.333984375
	} else if (/\_/.test(t)) {
		l = 0.4482421875
	} else if (/\-/.test(t)) {
		l = 0.4326171875
	} else if (/\+/.test(t)) {
		l = 0.74169921875
	} else if (/\=/.test(t)) {
		l = 0.74169921875
	} else if (/\|/.test(t)) {
		l = 0.26904296875
	} else if (/\\/.test(t)) {
		l = 0.416015625
	} else if (/\[/.test(t)) {
		l = 0.333984375
	} else if (/\]/.test(t)) {
		l = 0.333984375
	} else if (/\;/.test(t)) {
		l = 0.24072265625
	} else if (/\'/.test(t)) {
		l = 0.25634765625
	} else if (/\,/.test(t)) {
		l = 0.24072265625
	} else if (/\./.test(t)) {
		l = 0.24072265625
	} else if (/\//.test(t)) {
		l = 0.42724609375
	} else if (/\{/.test(t)) {
		l = 0.333984375
	} else if (/\}/.test(t)) {
		l = 0.333984375
	} else if (/\:/.test(t)) {
		l = 0.24072265625
	} else if (/\"/.test(t)) {
		l = 0.435546875
	} else if (/\</.test(t)) {
		l = 0.74169921875
	} else if (/\>/.test(t)) {
		l = 0.74169921875
	} else if (/\?/.test(t)) {
		l = 0.48291015625
	} else {
		l = 1
	}
	return l
}
/**
 * 获取文字字体
 * @param params 
 * @param params.size 字体大小
 * @param params.family 什么字体
 * @param params.style 字体样式
 * @param params.variant 字体样式
 * @param params.weight 字体粗细
 */
export const getTextFont = (params?: SakuraCanvasText.FontParams): SakuraCanvasText.Font => {
	const { size = 16, family = 'sans-serif', variant = 'normal', style = 'normal', weight = 'normal', } = params || {}
	const fontText: string = `${style} ${variant} ${weight} ${size}px ${family}`
	return {
		size,
		family,
		variant,
		style,
		weight,
		fontText
	}
}
/**
 * 获取文字行高、行数、下划线之类的样式
 * @param params 
 * @param params.num 行数
 * @param params.height 行高
 * @param params.style 线类型
 * @param params.type 线样式
 * @param params.width 线宽度
 */
export const getTextLine = (params?: Partial<SakuraCanvasText.Line>): Required<SakuraCanvasText.Line> => {
	const { num = -1, height = 16, style = 'solid', type = 'normal', width = 1, color = '' } = params || {}
	return {
		num,
		height,
		style,
		type,
		width,
		color
	}
}
/**
 * 格式化文字
 * @param params 
 * @param params.text 文字内容
 * @param params.color 文字颜色
 * @param params.font 文字字体样式
 */
export const formatText = (params: SakuraCanvasText.FormatParams): SakuraCanvasText.FormatData => {
	const { text, color = 'black', font, highlightText = [], line = null } = params
	const isBr = text.includes('\n')
	const defaultFont = getTextFont(font)
	// 是否有高亮文字
	const isHighlightText = highlightText && highlightText.length
	const highlightTextParams: SakuraCanvasText.FormatHighlightTextParams = {
		highlightText,
		defaultColor: color,
		defaultFont,
		originText: text,
		isBr: false,
		defaultLine: line
	}
	if (isBr) {
		const texts: SakuraCanvasText.FormatData = text.split('\n').map((v, i) => {
			const data = {
				text: v,
				isBr: true,
				color,
				font: defaultFont,
				line
			}
			highlightTextParams.isBr = data.isBr
			highlightTextParams.originText = v
			return isHighlightText ? formatHighlightText(highlightTextParams) : data
		}).flat()
		return texts
	}
	return isHighlightText ? formatHighlightText(highlightTextParams) : [{ text, isBr: false, color, font: defaultFont, line }]
}

/**
 * 格式化高亮文字
 * @param params
 * @param params.highlightText 高亮文字
 * @param params.defaultColor 默认颜色
 * @param params.defaultFont 默认字体
 * @param params.originText 原文字
 * @returns 
 */
export const formatHighlightText = (params: SakuraCanvasText.FormatHighlightTextParams): SakuraCanvasText.FormatData => {
	const { highlightText, defaultColor, defaultFont, originText, isBr, defaultLine } = params
	// 初始化之后的高亮文字数组
	const initTexts: SakuraCanvasText.FormatHighlightText[] = highlightText.map(v => {
		const { text, color = defaultColor, font = {}, siblingsAlgin = 'top', siblingsNum = 0, line = null } = v
		const data: SakuraCanvasText.FormatHighlightText = {
			index: 0,
			text,
			color,
			font: extend<SakuraCanvasText.Font>({}, defaultFont, font),
			siblingsAlgin,
			siblingsNum,
			length: text.length,
			line
		}
		return data
	})
	let flag = true
	const formatTexts: SakuraCanvasText.FormatHighlightText[] = []
	while(flag) {
		initTexts.forEach(v => {
			const { text, index, length } = v
			for (let i = 0; i < originText.length; i++) {
				const searchIndex = originText.indexOf(text, i)
				if (searchIndex !== -1) {
					i = searchIndex
					formatTexts.push({
						...v,
						index: searchIndex
					})
				} else {
					flag = false
				}
			}
		})
	}
	const formatTextsIndex: number[] = formatTexts.map(v => v.index)
	const texts: SakuraCanvasText.FormatData = []
	const setTexts = (text: string, data?: { font?: SakuraCanvasText.Font, line?: SakuraCanvasText.LinePick | null, color?: string, siblingsAlgin?: SakuraCanvasText.SiblingsAlginType, siblingsNum?: number, isBr?: boolean }) => {
		const { font = defaultFont, color = defaultColor, siblingsAlgin = 'normal', siblingsNum = 0, isBr = false, line = null } = data || {}
		texts.push({
			text,
			font,
			color,
			siblingsAlgin,
			siblingsNum,
			isBr,
			line
		})
	}
	let text = ''
	// console.log('originText---', originText)
	for (let i = 0; i < originText.length; i++) {
		if (formatTextsIndex.includes(i)) {
			const { length, color, font, siblingsAlgin, siblingsNum, line } = formatTexts.find(v => v.index === i) as SakuraCanvasText.FormatHighlightText
			if (text) {
				setTexts(text)
				text = ''
			}
			// console.log(line)
			setTexts(originText.slice(i, i + length), {
				color,
				font: getTextFont(font),
				siblingsAlgin,
				siblingsNum,
				line: line as SakuraCanvasText.LinePick | null
			})
			i += length - 1
			continue
		}
		text += originText[i]
		// 如果是最后一行则塞入内容
		if (i === originText.length - 1) {
			setTexts(text, {
				isBr
			})
		}
	}
	return texts
}
/**
 * 计算当使用了高亮文字并设置了对齐方式之后的y轴位置
 * @param params 
 * @param params.y 原先的y轴位置 
 * @param params.type 对齐方式
 * @param params.fontSize 文字大小
 * @param params.originFontSize 原先的文字大小
 * @param params.num 差值
 * @returns 
 */
export const computedSiblingsPosition = (params: SakuraCanvasText.SiblingsAlginParams): number => {
	const { type, fontSize, originFontSize, num } = params
	let y = params.y
	y -= num
	if (type === 'normal' || type === 'top') {
		return y
	}
	if (type === 'center') {
		y -= (fontSize - originFontSize) / 2
	} else {
		y -= fontSize - originFontSize
	}
	return y
}
/**
 * 获取文字位置与行数参数默认值
 * @param params 参数
 * @param canvasWidth 画布宽度
 * @returns 
 */
export const getTextDrawInfoDefaultParams = (params: SakuraCanvasText.DrawInfoParams, canvasWidth: number): Required<SakuraCanvasText.DrawInfoParams> => {
	const { 
		y = 0, text = '', width = canvasWidth, textIndent = 0, lastWidth, font, 
		line, color = 'black', textAlgin = 'normal', highlightText = [], divider = {}, window = { algin: 'normal' }
	} = params
	let { x = 0 } = params
	if (window && window.algin !== 'normal') {
		const { algin, rightGap = 0 } = window
		x = computedPosition({
			startX: 0,
			type: algin,
			rightGap,
			containerWidth: canvasWidth,
			contentWidth: width
		})
	}
	return {
		x,
		y,
		text,
		width,
		textIndent,
		lastWidth: lastWidth ?? width,
		font: font || {},
		line: line || {},
		color,
		textAlgin,
		highlightText,
		divider: extend<SakuraCanvasText.Divider>({ 
			height: 1,
			color,
			cap: 'butt',
			pattern: [5, 5],
			style: 'solid',
			offset: 5,
			show: false,
			gap: 10	
		}, divider),
		window
	}
}
/**
 * 获取绘制线条的信息
 * @param params 
 * @param params.x 说方向起始位置
 * @param params.y 垂直方向起始位置
 * @param params.textLength 文字长度
 * @param params.line 线条样式
 * @param params.fontSize 文字字体大小
 * @param params.textRow 当前行数
 * @param params.textMetrics 文字信息(2d绘制的时候才有)
 */
export const getTextLineDrawInfo = (params: SakuraCanvasText.LineDrawParams): SakuraCanvasText.LineDrawInfo => {
	const { x, textLength, line, fontSize, textMetrics } = params
	let { y } = params
	// textMetrics
	// if (textMetrics.actualBoundingBoxAscent) {
		// y -= (fontSize - textMetrics.actualBoundingBoxAscent)
	// }
	const { style, type, width, color } = line
	// 如果是默认
	if (type === 'normal') {
		return null
	}
	// 下划线
	if (type === 'underline') {
		y += fontSize + fontSize / (textMetrics.actualBoundingBoxAscent ? 6 : 4)
	} else if (type === 'lineThrough') {
		// 删除线
		y += fontSize / 2
	}
	return {
		x,
		y,
		width: textLength,
		height: width,
		style,
		type,
		color
	}
}
/**
 * 获取分割信息信息
 * @param params 
 * @param params.x 水平方向位置
 * @param params.y 垂直方向位置
 * @param params.fontSize 字体大小
 * @param params.containerWidth 容器宽度
 * @param params.textWidth 文字宽度
 * @param params.divider 分割线参数
 */
export const getDividerInfo = (params: SakuraCanvasText.GetDividerInfoParams): SakuraCanvasText.DividerInfoItem[] => {
	const { divider, x, y, fontSize, containerWidth, textWidth } = params
	const { color, height, offset, pattern, gap, style, cap  } = divider
	// 获取容器宽度-文字宽度剩余的宽度
	const surplusWidth = (containerWidth - textWidth) / 2 - gap
	// 线条样式
	const lineStyle: Required<SakuraCanvasParams.LineStyleParams> = {
		offset, 
		pattern,
		style,
		cap,
	}
	// 左边的分割线信息
	const leftDividerInfoItem: SakuraCanvasText.DividerInfoItem = {
		x,
		y: y + fontSize / 2 + height / 2,
		width: surplusWidth,
		lineStyle,
		color,
		height
	}
	// 右边的线条
	const rightDividerInfoItem = {
		x: x + surplusWidth + textWidth + (gap * 2),
		y: y + fontSize / 2 + height / 2,
		width: surplusWidth,
		lineStyle,
		color,
		height
	}
	return [leftDividerInfoItem, rightDividerInfoItem]
}
/**
 * 获取文字的绘制信息
 * @param this sakura工具
 * @param params 
 * @param params.text 文字内容
 * @param params.width 文字宽度
 * @param params.textIndent 首行缩进
 * @param params.lastWidth 最后一行的宽度
 * @param params.font 字体样式
 * @param params.defaultColor 默认颜色
 * @param params.textAlgin 文字对齐方式
 * @param params.highlightText 高亮文字
 */
export function getTextDrawInfo(this: SakuraCanvasShared.SakuraCanvasUtils, params: SakuraCanvasText.DrawInfoParams): SakuraCanvasText.DrawInfo {
	const { context, canvasWidth, } = this
	const { x, y, text, width, textIndent, lastWidth, font, line, color: defaultColor, textAlgin, highlightText, divider } = getTextDrawInfoDefaultParams(params, canvasWidth)
	const textFont: SakuraCanvasText.Font = getTextFont(font)
	const textLine: SakuraCanvasText.Line = getTextLine(line)
	textLine.color = textLine.color || defaultColor
	const texts: SakuraCanvasText.FormatData = formatText({ text, color: defaultColor, font: textFont, highlightText })
	// 文字长度(也用于当使用了高亮文字之后获取上一段文字的位置)
	let textSumLength = 0
	// 文字行数
	let textRow = 0
	// 文字是否已经首行缩进
	let textIsIndent = false
	// 当前文字的字体大小
	let textFontSize = textFont.size
	// 当前计算宽度的文字内容
	let text2: string = ''
	// text2文字长度
	let text2Length: number = 0
	// 行
	let row: SakuraCanvasText.RowData[] = []
	context.font = textFont.fontText
	// 行数
	const { num: lineNum, } = textLine
	// 行高
	const lineHeight = Math.max(textLine.height, textFontSize)
	// 计算文字长度
	// const measureTextBind = measureText.bind(context)
	// console.log(texts.slice(0, lineNum === -1 ? texts.length : lineNum))
	/**
	 * 增加行数，重置数据
	*/
	const addRowResetData = () => {
		textRow++
		textSumLength = 0
		text2Length = 0
		text2 = ''
		textIsIndent && (textIsIndent = false)
	}
	/**
	 * 增加行数
	 * @param params
	 * @param params.text 文字
	 * @param params.length 文字长度
	 * @param params.showLimitText 是否显示省略文字
	 * @param params.siblingsAlgin 高亮文字和其他兄弟文字的对齐方式
	 * @param params.siblingsNum 和兄弟字体对齐的差值因为在不同端，绘制字体的位置都不一样，设置这个属性可以改变在不同端不一样导致的差异
	 * @param params.color 字体颜色
	 * @param params.font 字体样式
	 * @param params.line 行高的一些参数
	 */
	const addRow = (params: SakuraCanvasText.AddRowParams) => {
		const { text, length, showLimitText, siblingsAlgin, siblingsNum, color, font, line, textMetrics } = params
		let startX = textSumLength + x
		let startY = y + (textRow * lineHeight) + textFontSize
		if (textIsIndent && textRow === 0 && textAlgin !== 'normal') {
			startX -= textIndent
			// text2Length -= textIndent
		}
		// if (highlightText.length === 0) {
			// startX = computedPosition({ containerWidth: width, contentWidth: text2Length + textSumLength, startX, type: textAlgin })
		// }
		if (siblingsAlgin !== 'normal' && textFontSize !== textFont.size) {
			startY = computedSiblingsPosition({
				y: startY,
				type: siblingsAlgin,
				num: siblingsNum,
				fontSize: textFontSize,
				originFontSize: textFont.size
			})
		}
		row.push({
			rowIndex: textRow,
			color,
			length,
			text,
			font,
			fontSize: textFontSize,
			fontText: font.fontText,
			startX,
			startY,
			lineDrawInfo: getTextLineDrawInfo({
				x: startX,
				y: y + (textRow * lineHeight),
				line: line ? extend({}, textLine, line) : textLine,
				fontSize: textFontSize,
				textLength: length,
				textMetrics
			}),
			limitText: showLimitText ? text.slice(0, text.length - 1) + '...' : '',
			textMetrics
		})
	}
	// 文字绘制信息
	const textDrawInfo = texts.map(({ text, color, font, isBr, line, siblingsAlgin = 'top', siblingsNum = 0 }) => {
		// 如果有限制行数, 则直接结束循环
		if (lineNum !== -1 && textRow >= lineNum) {
			return []
		}
		text2 = ''
		text2Length = 0
		row = []
		// 当默认的文字大小和texts里面的文字大小不一致的时候则改变一下context的文字样式(主要用于一段文字多个文字大小不一样的情况)
		if (highlightText.length && textFontSize !== font.size) {
			textFontSize = font.size
			context.font = font.fontText
		}
		// 当前整段文字的TextMetrics对象
		const currentTextMetrics = measureText.call(context, text, textFontSize)
		const currentTextLength = currentTextMetrics.width
		// 如果整段文字的长度小于设置的最大宽度并且没有使用高亮文字, 则直接返回, 优化性能
		if (!highlightText.length && currentTextLength < width) {
			// 是否需要首行缩进
			if (textRow === 0 && !textIsIndent && textIndent) {
				// text2Length += textIndent
				textIsIndent = true
				textSumLength += textIndent
			}
			addRow({
				text,
				length: currentTextLength,
				siblingsAlgin,
				siblingsNum,
				color,
				font,
				line,
				textMetrics: currentTextMetrics,
				showLimitText: (lineNum !== -1 && textRow + 1 >= lineNum) && (currentTextLength + (textIsIndent ? textIndent : 0)) >= lastWidth && lineNum !== -1
			})
			addRowResetData()
			return row
		}
		// 如果整段文字的长度小于容器的宽度
		for (let i = 0; i < text.length; i++) {
			text2 += text[i]
			const textMetrics = measureText.call(context, text2, textFontSize)
			text2Length = textMetrics.width
			// 是否需要首行缩进
			if (textRow === 0 && !textIsIndent && textIndent) {
				// text2Length += textIndent
				textIsIndent = true
				textSumLength += textIndent
			}
			// 是否到了最后一行
			const isLastRow = (lineNum !== -1 && textRow + 1 >= lineNum)
			// 是否当前获取到的文字内容大于设置的宽度
			const isWidth = textSumLength + text2Length > width - textFontSize
			// 是否是大于了最小宽度
			const isLastWidth = isLastRow && textSumLength + text2Length > lastWidth - textFontSize
			// 如果当前文字的长度大于了内容的长度, 则代表了需要换行了 || 如果到了最后一行
			if (i === text.length - 1 || isWidth || isLastWidth || (isBr && text.length - 1 === i)) {
				// 如果有限制行数, 则直接结束循环
				if (lineNum !== -1 && (textRow + 1) > lineNum) {
					break
				}
				addRow({
					text: text2,
					length: text2Length,
					siblingsAlgin,
					siblingsNum,
					color,
					font,
					line,
					textMetrics,
					showLimitText: isLastRow && isLastWidth && lineNum !== -1
				})
				if (isWidth || isLastWidth || (isBr && text.length - 1 === i)) {
					addRowResetData()
				}
			}
		}
		textSumLength += text2Length
		return row
	}).flat()
	// 每一行文字的宽度总和
	const textRowWidth: number[] = Array.from(textDrawInfo.reduce((data, { rowIndex, length }) => {
		if (!data.has(rowIndex)) {
			data.set(rowIndex, 0)
		}
		data.set(rowIndex, (data.get(rowIndex) ?? 0) + length)
		return data
	}, new Map as Map<number, number>).values())
	// 重置startX的值
	textDrawInfo.forEach(v => {
		const { startX, rowIndex } = v
		v.startX = computedPosition({ containerWidth: width, contentWidth: textRowWidth[rowIndex], startX, type: textAlgin })
		v.lineDrawInfo && (v.lineDrawInfo.x = v.startX)
	})
	// 开始水平方向位置
	const startX = Math.min(...textDrawInfo.map(v => v.startX))
	// 开始垂直方向位置
	const startY = Math.min(...textDrawInfo.map(v => v.startY - v.fontSize))
	return {
		drawInfo: textDrawInfo,
		textRowWidth,
		x: startX,
		y: startY,
		originWidth: width,
		maxWidth: Math.max(...textRowWidth),
		minWidth: Math.min(...textRowWidth),
		height: Math.max(...textDrawInfo.map(v => v.startY)) - startY,
		dividerInfo: textRow === 1 && textAlgin === 'center' && divider.show ? getDividerInfo({
			x,
			y: startY,
			textWidth: Math.max(...textRowWidth),
			containerWidth: width,
			fontSize: Math.max(...textDrawInfo.map(v => v.fontSize)),
			divider: divider as Required<SakuraCanvasText.Divider>
		}) : null
	}
}