/**
 * 绘制文字时的样式
 */
declare namespace SakuraCanvasText {
	/**
	 * 字体
	 */
	type Font = {
		/**
		 * 字体大小
		 */
		size: number,
		/**
		 * 什么字体
		 */
		family: string,
		/**
		 * 字体样式
		 * normal: 默认
		 * italic: 斜体
		 * oblique: 倾斜
		 */
		style: 'normal' | 'italic' | 'oblique',
		/**
		 * 字体
		 */
		variant: 'normal' | 'small-caps',
		/**
		 * 字体粗细
		 * normal: 默认字体粗细 400
		 * bold: 加粗的字体
		 * bolder: 更粗的字体
		 */
		weight: number | 'normal' | 'bold' | 'bolder',
		/**
		 * 设置的字体总格式
		 */
		fontText: string
	}
	/**
	 * 获取字体的参数
	 */
	type FontParams = Partial<Pick<Font, 'size' | 'family' | 'style' | 'variant' | 'weight'>>
	/**
	 * 行高、行数、下划线
	 */
	type Line = {
		/**
		 * 行数
		 */
		num: number,
		/**
		 * 行高
		 */
		height: number,
		/**
		 * 线条类型
		 * normal: 默认
		 * underline: 下划线
		 * lineThrough: 删除线
		 */
		type: 'normal' | 'underline' | 'lineThrough',
		/**
		 * 线条样式
		 * solid: 实线
		 * dashed: 虚线
		 */
		style: 'solid' | 'dashed',
		/**
		 * 线条宽度
		 */
		width: number,
		/**
		 * 线条颜色
		*/
		color: string
	}
	/**
	 * 行高的一些参数
	 */
	type LinePick = Pick<Line, 'style' | 'width' | 'type' | 'color'>
	/**
	 * 高亮文字和其他兄弟组件的对齐方式
	 */
	type SiblingsAlginType = 'normal' | 'center' | 'top' | 'bottom'
	/**
	 * 获取当使用了对齐方式之后的具体文字y轴位置
	 */
	type SiblingsAlginParams = {
		/**
		 * 高亮文字和其他兄弟组件的对齐方式
		 */
		type: SiblingsAlginType,
		/**
		 * 文字大小
		 */
		fontSize: number,
		/**
		 * 原先的文字大小
		 */
		originFontSize: number,
		/**
		 * 差值数值
		 */
		num: number,
		/**
		 * y轴原位置
		 */
		y: number
	}
	/**
	 * 高亮文字
	 */
	type HighlightText = {
		/**
		 * 高亮的文字
		 */
		text: string,
		/**
		 * 颜色
		 */
		color?: string,
		/**
		 * 文字字体样式
		 */
		font?: FontParams,
		/**
		 * 高亮文字和其他兄弟文字的对齐方式
		 * center: 水平对齐
		 * top: 靠上对齐
		 * bottom: 靠下对齐
		 */
		siblingsAlgin?: SiblingsAlginType,
		/**
		 * 和兄弟字体对齐的差值因为在不同端，绘制字体的位置都不一样，设置这个属性可以改变在不同端不一样导致的差异
		 */
		siblingsNum?: number,
		/**
		 * 线条样式
		 */
		line?: Partial<LinePick> | null,
	}
	/**
	 * 初始化的高亮文字
	 */
	type FormatHighlightText = Required<HighlightText> & {
		/**
		 * 当前高亮文字下标
		 */
		index: number,
		/**
		 * 高亮文字的长度
		 */
		length: number,
	}
	/**
	 * 高亮文字的参数
	 */
	type FormatHighlightTextParams = {
		/**
		 * 高量文字
		 */
		highlightText: HighlightText[],
		/**
		 * 默认颜色
		 */
		defaultColor: string,
		/**
		 * 默认字体样式
		 */
		defaultFont: Font,
		/**
		 * 原文字
		 */
		originText: string,
		/**
		 * 是否需要换行
		 */
		isBr: boolean,
		/**
		 * 默认线条样式
		 */
		defaultLine: LinePick | null
	}
	/**
	 * 格式化文字的参数
	 */
	type FormatParams = {
		/**
		 * 文字内容
		 */
		text: string,
		/**
		 * 文字颜色
		 */
		color?: string,
		/**
		 * 文字字体样式
		 */
		font?: Font,
		/**
		 * 高亮文字
		 */
		highlightText?: HighlightText[],
		/**
		 * 线条样式
		 */
		line?: LinePick | null
	}
	/**
	 * 格式化文字的返回内容
	 */
	type FormatData = {
		/**
		 * 文字
		 */
		text: string,
		/**
		 * 是否强制换行
		 */
		isBr: boolean,
		/**
		 * 字体颜色
		 */
		color: string,
		/**
		 * 字体样式
		 */
		font: Font,
		/**
		 * 线条样式
		 */
		line: LinePick | null
		/**
		 * 高亮文字和其他兄弟文字的对齐方式
		 * center: 水平对齐
		 * top: 靠上对齐
		 * bottom: 靠下对齐
		 */
		siblingsAlgin?: SiblingsAlginType,
		/**
		 * 和兄弟字体对齐的差值因为在不同端，绘制字体的位置都不一样，设置这个属性可以改变在不同端不一样导致的差异
		 */
		siblingsNum?: number,
		/**
		 * 字体信息只在2d的时候数据才是完整的
		 */
		textMetrics?: UniAppMetrics
	}[]
	/**
	 * 获取文字的绘制信息的参数
	 */
	type DrawInfoParams = {
		/**
		 * 文字水平方向位置
		 */
		x?: number,
		/**
		 * 文字垂直方向位置
		 */
		y?: number,
		/**
		 * 文字内容
		 */
		text: string,
		/**
		 * 文字宽度
		 */
		width?: number,
		/**
		 * 首行缩进
		 */
		textIndent?: number,
		/**
		 * 最后一行的宽度
		 */
		lastWidth?: number,
		/**
		 * 字体样式
		 */
		font?: FontParams,
		/**
		 * 行高、行数、下划线
		 */
		line?: Partial<Line>,
		/**
		 * 默认颜色
		 */
		color?: string,
		/**
		 * 文字对齐方式
		 * normal: 默认对齐
		 * center: 居中对齐
		 * right: 右边对齐
		 */
		textAlgin?: 'normal' | 'center' | 'right',
		/**
		 * 高亮文字
		 */
		highlightText?: HighlightText[],
		/**
		 * 分割线
		 */
		divider?: Divider,
		/**
		 * 窗口对齐方式参数
		 */
		window: SakuraCanvasParams.WindowParams
	}
	/**
	 * 文字分割线只有使用了text-algin: center之后才能使用
	 */
	type Divider = SakuraCanvasParams.LineStyleParams & {
		/**
		 * 是否显示
		 */
		show?: boolean,
		/**
		 * 线条的高度
		 */
		height?: number,
		/**
		 * 线的颜色
		 */
		color?: string,
		/**
		 * 间隙大小
		 */
		gap?: number
	}
	/**
	 * 获取分割线信息参数
	 */
	type GetDividerInfoParams = {
		/**
		 * 分割线
		 */
		divider: Required<Divider>,
		/**
		 * 水平方向位置
		 */
		x: number,
		/**
		 * 垂直方向位置
		 */
		y: number,
		/**
		 * 容器宽度
		 */
		containerWidth: number,
		/**
		 * 文字宽度
		 */
		textWidth: number,
		/**
		 * 字体大小
		 */
		fontSize: number
	}
	/**
	 * 分割线信息
	 */
	type DividerInfoItem = {
		/**
		 * 水平位置
		 */
		x: number,
		/**
		 * 垂直位置
		 */
		y: number,
		/**
		 * 线条颜色
		 */
		color: string,
		/**
		 * 线条宽度
		 */
		width: number,
		/**
		 * 线条的高度
		 */
		height: number,
		/**
		 * 线条样式
		 */
		lineStyle: SakuraCanvasParams.LineStyleParams
	} | null
	/**
	 * 文字的绘制信息
	 */
	type DrawInfo = {
		/**
		 * 绘制信息
		 */
		drawInfo: RowData[],
		/**
		 * 每一行文字的宽度
		 */
		textRowWidth: number[],
		/**
		 * 水平方向位置
		 */
		x: number,
		/**
		 * 垂直方向位置
		 */
		y: number,
		/**
		 * 文字的最大宽度
		 */
		maxWidth: number,
		/**
		 * 文字的最小宽度
		 */
		minWidth: number,
		/**
		 * 原先设置的宽度
		 */
		originWidth: number,
		/**
		 * 文字高度
		 */
		height: number,
		/**
		 * 分割线信息
		 */
		dividerInfo: DividerInfoItem[] | null
	}
	/**
	 * 获取线条绘制信息参数
	 */
	type LineDrawParams = {
		/**
		 * 文字长度
		 */
		textLength: number,
		/**
		 * 起始水平方向位置
		 */
		x: number,
		/**
		 * 起始垂直方向位置
		 */
		y: number,
		/**
		 * 线条样式
		 */
		line: LinePick,
		/**
		 * 文字大小
		 */
		fontSize: number,
		/**
		 * 字体信息只在2d的时候数据才是完整的
		 */
		textMetrics: UniAppMetrics
	}
	/**
	 * 获取文字线条的绘制信息
	 */
	type LineDrawInfo = {
		/**
		 * 水平方向位置
		 */
		x: number,
		/**
		 * 垂直方向位置
		 */
		y: number,
	} & Pick<Line, 'height' | 'width' | 'style' | 'type' | 'color'> | null
	/**
	 * 获取文字的每一行的内容
	 */
	type RowData = {
		/**
		 * 文字长度
		 */
		length: number,
		/**
		 * 文字内容
		 */
		text: string,
		/**
		 * 文字字体
		 */
		font: Font,
		/**
		 * 文字大小
		 */
		fontSize: number,
		/**
		 * 文字样式
		 */
		fontText: string,
		/**
		 * 文字起始的水平方向位置
		 */
		startX: number,
		/**
		 * 文字起始的垂直方向位置
		 */
		startY: number,
		/**
		 * 绘制线条的信息
		 */
		lineDrawInfo: LineDrawInfo,
		/**
		 * 当限制文字行数时，最后一条文字隐藏时的内容
		 */
		limitText: string,
		/**
		 * 字体颜色
		 */
		color: string,
		/**
		 * 当前行数
		 */
		rowIndex: number,
		/**
		 * 字体信息只在2d的时候数据才是完整的
		 */
		textMetrics: UniAppMetrics
	}
	/**
	 * 添加行数的参数
	 */
	type AddRowParams = {
		/**
		 * 文字
		 */
		text: string,
		/**
		 * 文字长度
		 */
		length: number,
		/**
		 * 是否显示省略文字
		 */
		showLimitText: boolean,
		/**
		 * 高亮文字和其他兄弟文字的对齐方式
		 * center: 水平对齐
		 * top: 靠上对齐
		 * bottom: 靠下对齐
		 */
		siblingsAlgin: SiblingsAlginType,
		/**
		 * 和兄弟字体对齐的差值因为在不同端，绘制字体的位置都不一样，设置这个属性可以改变在不同端不一样导致的差异
		 */
		siblingsNum: number,
		/**
		 * 字体颜色
		 */
		color: string,
		/**
		 * 字体样式
		 */
		font: Font,
		/**
		 * 行高的一些参数
		 */
		line: LinePick | null,
		/**
		 * 字体信息只在2d的时候数据才是完整的
		 */
		textMetrics: UniAppMetrics
	}
	/**
	 * 获取绘制文字的工具的返回值
	 */
	type UtilsMethod = {
		/**
		 * 获取文字的绘制信息
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
		getTextDrawInfo: (params: DrawInfoParams) => DrawInfo,
		/**
		 * 计算文字大小
		 * @param text 文字
		 * @param fontSize 文字大小
		 */
		measureText: (text: string, fontSize: number) => UniAppMetrics,
		/**
		 * 获取文字位置信息
		 * @param params
		 * @param params.text 文字内容
		 * @param params.width 文字宽度
		 * @param params.textIndent 首行缩进
		 * @param params.lastWidth 最后一行的宽度
		 * @param params.font 字体样式
		 * @param params.defaultColor 默认颜色
		 * @param params.textAlgin 文字对齐方式
		 * @param params.highlightText 高亮文字
		 * @param params.drawInfo 文字绘制信息
		 * @returns
		 */
		getTextPositionInfo: (params: PositionInfoParams) => PositionInfo
	}
	/**
	 * 获取文字位置信息参数
	 */
	type PositionInfoParams = Partial<DrawInfoParams> & {
		/**
		 * 文字绘制信息
		 */
		drawInfo?: DrawInfo | null
	}
	/**
	 * 文字位置信息
	 */
	type PositionInfo = SakuraCanvasShared.PositionInfo & {
		/**
		 * 文字绘制信息
		 */
		drawInfo: DrawInfo,
		/**
		 * 文字边框的位置信息
		 */
		// textRectPositionInfo?: SakuraCanvasRect.PositionInfo,
	}
	/**
	 * 绘制文字边框参数
	 */
	type RectParams = Omit<SakuraCanvasRect.DrawParams, 'width' | 'height'> & {
		/**
		 * 水平(左右两边的间隔大小)
		 */
		vorizontal: number,
		/**
		 * 垂直(上下两边的间隔大小)
		 */
		vertical: number,
		/**
		 * 是否显示
		 */
		show?: boolean
	}
	/**
	 * 绘制文字的私有参数
	 */
	type DrawPrivateParams = PositionInfoParams & {
		/**
		 * 文字位置信息
		 */
		positionInfo?: PositionInfo | null,
		/**
		 * 文字
		 */
		textRect?: RectParams | null,
	}
	/**绘制文字的参数
	 *
	 */
	type DrawParams = SakuraCanvasParams.BasicDrawParams & DrawPrivateParams
	/**
	 * 文字绘制回调
	 */
	type Fn = {
		(positionInfo: PositionInfo): void | Promise<void>,
	}
	/**
	 * Metrics对象(2d绘制的时候才有)
	 */
	type UniAppMetrics = {
		/**
		 * 从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的矩形边界顶部的距离，使用 CSS 像素计算
		 */
		actualBoundingBoxAscent: number,
		/**
		 * 从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的矩形边界底部的距离，使用 CSS 像素计算
		 */
		actualBoundingBoxDescent: number,
		/**
		 * 从CanvasRenderingContext2D.textAlign 属性确定的对齐点到文本矩形边界左侧的距离，使用 CSS 像素计
		 */
		actualBoundingBoxLeft: number,
		/**
		 * 从CanvasRenderingContext2D.textAlign 属性确定的对齐点到文本矩形边界右侧的距离，使用 CSS 像素计算
		 */
		actualBoundingBoxRight: number,
		/**
		 * 从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的所有字体的矩形最高边界顶部的距离，使用 CSS 像素计算
		 */
		fontBoundingBoxAscent: number,
		/**
		 * 从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的所有字体的矩形边界最底部的距离，使用 CSS 像素计算
		 */
		fontBoundingBoxDescent: number,
		/**
		 * 文字宽度
		 */
		width: number
	}
}