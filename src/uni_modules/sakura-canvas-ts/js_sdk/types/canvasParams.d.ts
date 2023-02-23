/**
 * 绘制画布时的一些公共参数
 */
declare namespace SakuraCanvasParams {
	/**
	 * 绘制内容的基础参数
	 */
	type BasicDrawParams = Partial<{
		/**
		 * 绘制的内容的x轴位置
		 */
		x: number,
		/**
		 * 绘制内容的y轴位置
		 */
		y: number,
		/**
		 * 颜色
		 */
		color: string,
		/**
		 * 尺寸
		 */
		size: number,
		/** 
		 * 宽度
		 */
		width: number,
		/**
		 * 高度
		 */
		height: number,
		/**
		 * 边框大小
		 */
		lineWidth?: number,
		/**
		 * 填充样式参数
		 */
		fillStyle: FillStyleParams,
		/**
		 * 填充模式的类型 fill: 填充 stroke: 线型
		 */
		fillMode: DrawFillMode,
		/**
		 * 透明度
		 */
		alpha: number,
		/**
		 * 旋转角度
		 */
		rotate: number,
		/**
		 * 阴影
		 */
		shadow: ShadowParams | null,
		/**
		 * 渐变
		 */
		gradient: GradientParams | null,
		/**
		 * 线条样式参数
		 */
		lineStyle: LineStyleParams,
		/**
		 * 窗口对其方式
		 */
		window: WindowParams
	}>
	/**
	 * 绘制线性渐变矩形的位置参数
	 */
	type LinearPositionParams = {
		/**
		 * 起点的x坐标
		 */
		x0: number,
		/**
		 * 终点的x坐标
		 */
		x1: number,
		/**
		 * 起点的y坐标
		 */
		y0: number,
		/**
		 * 终点的y坐标
		 */
		y1: number
	}
	/**
	 * 获取圆心渐变的位置参数
	 */
	type CirclePositionParams = {
		/**
		 * 圆心的x坐标
		 */
		x: number,
		/**
		 * 圆心的y坐标
		 */
		y: number,
		/**
		 * 圆的半径
		 */
		r: number
	}
	/**
	 * 渐变参数
	 */
	type GradientParams = {
		/**
		 * 是否显示
		 */
		show: boolean,
		/**
		 * linear: 线性渐变
		 * circular: 圆心渐变
		 */
		type: 'linear' | 'circular',
		/**
		 * 线性渐变位置信息
		 */
		linearPosition?: LinearPositionParams,
		/**
		 * 圆心渐变位置信息
		 */
		circularPosition?: CirclePositionParams,
		/**
		 * 渐变颜色
		 */
		colors: { stop: number, color: string }[]
	}
	/**
	 * 内容填充模式的类型 fill: 填充 stroke: 线型 all 两者都要
	 */
	type DrawFillMode = 'fill' | 'stroke' | 'all'
	/**
	 * 阴影参数
	 */
	type ShadowParams = Partial<{
		/**
		 * 是否显示
		 */
		show: boolean,
		/**
		 * 阴影相对于形状在水平方向的偏移
		 */
		x: number,
		/**
		 * 阴影相对于形状在竖直方向的偏移
		 */
		y: number,
		/**
		 * 阴影的颜色
		 */
		color: string,
		/**
		 * 阴影的模糊级别
		 */
		blur: number
	}>
	/**
	 * 设置填充模式的参数
	 */
	type FillStyleParams = Partial<{
		/**
		 * 颜色
		 */
		color: string | UniApp.CanvasGradient,
		/**
		 * 模式 fill: 填充 stroke: 线型 all: 两者都要
		 */
		fillMode: 'fill' | 'stroke' | 'all',
		/**
		 * 填充颜色 不传递默认使用color
		 */
		fillColor: string | UniApp.CanvasGradient,
		/**
		 * 描边颜色 不传递默认使用color
		 */
		strokeColor: string | UniApp.CanvasGradient,
		/**
		 * 描边的大小默认1
		 */
		lineWidth: number,
		/**
		 * 是否设置颜色
		 */
		setColor: boolean,
		/**
		 * 渐变颜色
		 */
		gradient: GradientParams | null,
		/**
		 * 水平方向位置(渐变时使用)
		 */
		x: number,
		/**
		 * 垂直方向位置(渐变时使用)
		 */
		y: number,
		/**
		 * 填充的渐变色
		 */
		fillGradient: GradientParams,
		/**
		 * 线性的渐变色
		 */
		strokeGradient: GradientParams
	}>
	/**
	 * 线条样式参数
	 */
	type LineStyleParams = {
		/**
		 * 线条样式
		 * solid: 实线
		 * dashed: 虚线
		 */
		style?: 'solid' | 'dashed',
		/**
		 * 一组描述交替绘制线段和间距（坐标空间单位）长度的数字
		 * 
		 */
		pattern?: [number, number],
		/**
		 * 线条偏移量
		 */
		offset?: number,
		/**
		 * 条的端点样式
		 */
		cap?: 'butt' | 'round' | 'square'
	}
	/**
	 * 窗口对其方式参数
	 */
	type WindowParams = {
		/**
		 * 对其方式
		 * normal: 默认
		 * center: 居中
		 * right: 靠右
		 */
		algin?: 'normal' | 'center' | 'right',
		/**
		 * 靠右对其时, 右边的间隙
		 */
		rightGap?: number
	}
	/**
	 * 设置canvas分辨率->2d时使用
	 */
	type InitDprParams = {
		/**
		 * canvas对象
		 */
		canvas: any,
		/**
		 * canvas上下文对象
		 */
		context: UniApp.CanvasContext,
		/**
		 * 宽度
		 */
		width: number,
		/**
		 * 高度
		 */
		height: number,
		/**
		 * 屏幕分辨率
		 */
		dpr: number
	}
	/**
	 * 导出图片的参数
	 */
	type ExportImageParams = Partial<UniApp.CanvasToTempFilePathOptions> & Partial<{
		/**
		 * 导出时的延迟时间
		 */
		wait: number,
		/**
		 * 导出时的提示
		 */
		tips: string,
		/**
		 * 是否显示提示框
		 */
		showTips: boolean,
	}>
	/**
	 * 获取位置的参数
	 */
	type ComputedPositionParams = {
		/**
		 * 容器宽度
		 */
		containerWidth: number,
		/**
		 * 内容宽度
		 */
		contentWidth: number,
		/**
		 * 对齐方式
		 */
		type?: 'normal' | 'center' | 'right',
		/**
		 * 距离右边的距离
		 */
		rightGap?: number,
		/**
		 * 起始水平方向位置
		 */
		startX: number
	}
	/**
	 * 创建绘制容器的方法参数
	 */
	type CreateDrawWrapParams<T extends SakuraCanvasShared.PositionInfo> = {
		/**
		 * 基础参数
		 */
		basicParams: Required<BasicDrawParams>,
		/**
		 * 位置信息
		 */
		positionInfo: T,
		/**
		 * 绘制的位置参数
		 * @param positionInfo 
		 * @returns 
		 */
		fn?: (positionInfo: T) => void | Promise<void>
	}
	/**
	 * 创建sakuraCanvas的初始化参数
	 */
	type SakuraCanvasInitParams = {
		/**
		 * 画布宽度
		 */
		canvasWidth: number,
		/**
		 * 画布高度
		 */
		canvasHeight: number,
		/**
		 * 画布id
		 */
		canvasId: string,
		/**
		 * 绘制模式 default | 2d
		 */
		type?: 'default' | '2d',
		/**
		 * 
		 */
		componentInstance?: any
	}
	/**
	 * 获取使用了box-sizing之后的绘制信息的参数
	 */
	type UseBoxSizingAfterDrawInfoParams = {
		/**
		 * 位置信息
		 */
		positionInfo: SakuraCanvasShared.AllPositionInfo,
		/**
		 * 填充模式的参数
		 */
		fillStyle: Required<FillStyleParams>,
		/**
		 * 减掉的倍数
		 */
		multiple?: number
	}
	/**
	 * 创建背景的参数
	 */
	type CreateCanvasBackgroudParams = {
		/**
		 * 绘制类型 image: 图片类型 color: 纯色背景
		 */
		type?: 'image' | 'color',
		/**
		 * 绘制背景时的延迟时间
		 */
		wait?: number
	} & SakuraCanvasImage.DrawParams & SakuraCanvasRect.DrawParams
	/**
	 * 所有类型的绘制参数
	 */
	type AllDrawParams = SakuraCanvasPolygon.DrawParams | SakuraCanvasFiveStar.DrawParams | SakuraCanvasImage.DrawParams | SakuraCanvasRect.DrawParams | SakuraCanvasCircle.DrawParams
}