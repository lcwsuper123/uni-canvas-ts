/**
 * SakuraCanvas一些公共类型
 */
declare namespace SakuraCanvasShared {
	/**
	 * sakuraCanvasContext实例对象
	 */
	type SakuraCanvasContext = {
		/**
		 * 绘制五角星
		 * @param params 绘制参数
		 * @param fn 回调函数在绘制完成时调用
		 * @returns 
		 */
		createFiveStar: (params: SakuraCanvasFiveStar.DrawParams, fn?: SakuraCanvasFiveStar.Fn) => Promise<SakuraCanvasFiveStar.PostionInfo>,
		/**
		 * 绘制多边形
		 * @param params 绘制多边形的参数
		 * @param fn 回调函数在绘制完成时调用
		 * @returns 
		 */
		createPolygon: (params: SakuraCanvasPolygon.DrawParams, fn?: SakuraCanvasPolygon.Fn) => Promise<SakuraCanvasPolygon.PositionInfo>,
		/**
		 * 创建图片
		 * @param params 绘制图片的参数
		 * @returns 回调函数在绘制完成时调用
		 */
		createImage: (params: SakuraCanvasImage.DrawParams, fn?: SakuraCanvasImage.Fn) => Promise<SakuraCanvasImage.Result> 
		/**
		 * 绘制矩形
		 * @param params 绘制矩形参数
		 * @param fn 回调函数在绘制完成时调用
		 * @returns 
		 */
		createRect: (params: SakuraCanvasRect.DrawParams, fn?: SakuraCanvasRect.Fn) => Promise<SakuraCanvasRect.PositionInfo>,
		/**
		 * 绘制圆形
		 * @param params 绘制圆形的参数
		 * @param fn 回调函数在绘制完成时调用
		 * @returns 
		 */
		createCircle: (params: SakuraCanvasCircle.DrawParams, fn?: SakuraCanvasCircle.Fn) => Promise<SakuraCanvasCircle.PositionInfo>,
		/**
		 * 获取绘制文字的工具方法
		 * @returns 
		 */
		getTextUtilsMethod: () => SakuraCanvasText.UtilsMethod,
		/**
		 * 绘制文字
		 * @param params 绘制文字的参数
		 * @param fn 回调函数在绘制完成时调用
		 * @returns 
		 */
		createText: (params: SakuraCanvasText.DrawParams, fn?: SakuraCanvasText.Fn) => Promise<SakuraCanvasText.PositionInfo>,
		/**
		 * 绘制线条
		 * @param params 绘制线条时的参数
		 * @param fn 回调函数在绘制完成时调用
		 * @returns 
		 */
		createLine: (params: SakuraCanvasLine.DrawParams, fn?: SakuraCanvasLine.Fn) => Promise<SakuraCanvasLine.PositionInfo>,
		/**
		 * 绘制二维码
		 * @param params 绘制二维码时的参数
		 * @param fn 回调函数在绘制完成时调用
		 * @returns 
		 */
		createQrcode: (params: SakuraCanvasQrcode.DrawParams, fn?: SakuraCanvasQrcode.Fn) => Promise<SakuraCanvasQrcode.PositionInfo>,
		/**
		 * 创建背景
		 * @param params 
		 * @returns 
		 */
		createCanvasBackgroud: (params: SakuraCanvasParams.CreateCanvasBackgroudParams) => Promise<CanvasBackgroundResult>,
		/**
		 * 设置canvas样式
		 * @param width 宽度
		 * @param height 高度
		 * @param waitheight 导出新内容时的延迟时间(只在2d绘制时需要) 默认200
		 * @returns 
		 */
		setCanvasStyle: (width: number, height: number, wait?: number) => SakuraCanvasShared.CanvasStyle,
		/**
		 * 导出图片
		 * @param params 
		 * @param params.x 指定的画布区域的左上角横坐标
		 * @param params.y 指定的画布区域的左上角纵坐标
		 * @param params.width 宽度
		 * @param params.height 高度
		 * @param params.fileType 导出类型 png/jpg
		 * @param params.quality 导出质量
		 * @param params.destWidth 输出的图片的宽度
		 * @param params.destHeight 输出的图片的高度
		 * @param params.wait 延迟时长
		 * @param params.tips 提示内容
		 * @param params.showTips 是否显示提示
		 */
		exportImage: (params?: SakuraCanvasParams.ExportImageParams) => Promise<Result<string>>
		/**
		 * canvas实例, 可以自行调用绘制
		 */
		context: UniApp.CanvasContext,
		/**
		 * canvas实例
		 */
		canvas: any,
		/**
		 * sakura工具类
		 */
		utils: SakuraCanvasUtils,
	}
	/**
	 * 内容的位置
	 */
	type PositionInfo = {
		/** 
		 * x轴开始位置
		 */
		startX: number,
		/** 
		 * x轴结束位置
		 */
		endX: number,
		/** 
		 * y轴开始位置
		 */
		startY: number,
		/** 
		 * y轴结束位置
		 */
		endY: number,
		/** 
		 * 内容的宽度
		 */
		width: number,
		/** 
		 * 内容的高度
		 */
		height: number,
	}
	/**
	 * 获取使用了box-sizing之后的绘制信息
	 */
	type UseBoxiSizingData = {
		/**
		 * 宽度
		 */
		width: number,
		/**
		 * 高度
		 */
		height: number,
		/**
		 * 水平位置位置
		 */
		x: number,
		/**
		 * 垂直方向位置
		 */
		y: number
	}
	/**
	 * 结果类型
	 */
	type Result<T = any> = {
		/**
		 * 是否成功
		 */
		success: boolean,
		/**
		 * 成功时的数据
		 */
		data: T | string,
		/**
		 * 成功/失败是的内容
		 */
		message: string
	}
	/**
	 * sakuraCanvas工具方法
	 */
	type SakuraCanvasUtils = SakuraCanvasParams.SakuraCanvasInitParams & {
		/**
		 * canvas上下文对象可以自行调用绘制
		 */
		context: UniApp.CanvasContext,
		/**
		 * canvas实例
		 */
		canvas: any,
		/**
		 * 创建canvas上下文的一些公共方法
		 */
		contextGlobalMethods: ContextGlobalMethods,
		/**
		 * 屏幕分辨率
		 */
		dpr: number
	}
	/**
	 * canvas上下文的一些公共方法
	 */
	type ContextGlobalMethods = {
		/**
		 * 设置填充内容的样式内容填充模式的类型 
		 * @param params
		 * @param params.color 颜色
		 * @param params.mode 模式 fill: 填充 stroke: 线型 all: 两者都要
		 * @param params.fillColor 填充颜色 不传递默认使用color
		 * @param params.strokeColor 描边颜色 不传递默认使用color
		 * @param params.lineWidth 描边的大小默认1
		 * @param params.setColor 是否设置颜色
		 * @returns 
		 */
		setFillStyle: (params: SakuraCanvasParams.FillStyleParams) => void,
		/**
		 * 设置内容透明度
		 * @param alpha 透明度
		 * @returns 
		 */
		setGlobalAlpha: (alpha: number) => void,
		/**
		 * 旋转内容
		 * @param rotate 旋转角度
		 * @param positionInfo 绘制内容的信息
		 * @returns 
		 */
		setRotate: (rotate: number, positionInfo: PositionInfo) => { x: number, y: number },
		/**
		 * 设置阴影
		 * @param params 
		 * @returns 
		 */
		setShadow: (params: SakuraCanvasParams.ShadowParams) => void,
		/**
		 * 获取渐变的值
		 * @param params 
		 * @param x 
		 * @param y 
		 * @returns 
		 */
		getGradientValue: (params: SakuraCanvasParams.GradientParams, x: number, y: number) => UniApp.CanvasGradient,
		/**
		 * 创建绘制容器, 里面内置了一些旋转、阴影、透明度的方法的绘制
		 * @param params 
		 * @param params.basicParams 基本参数
		 * @param params.positionInfo 位置信息
		 * @param params.fn 方法的绘制回调
		 * @param drawFn 容器的回调
		 */
		createDrawWrap: {
			<T extends PositionInfo>(params: SakuraCanvasParams.CreateDrawWrapParams<T>, drawFn?: () => Promise<void> | void): Promise<T>
		},
		/**
		 * 获取参数默认值
		 * @param params 
		 * @returns 
		 */
		getBasicDrawParamsDefaultValue: (params: SakuraCanvasParams.BasicDrawParams) => Required<SakuraCanvasParams.BasicDrawParams>
	}
	/**
	 * 创建背景成功之后的返回值
	 */
	type CanvasBackgroundResult = {
		/**
		 * 样式
		 */
		style: {
			width: string,
			height: string
		},
		/**
		 * 位置信息
		 */
		positionInfo: SakuraCanvasRect.PositionInfo | SakuraCanvasImage.Result,
		/**
		 * 背景宽度
		 */
		width: number,
		/**
		 * 背景高度
		 */
		height: number
	}
	/**
	 * 所有类型的位置信息
	 */
	type AllPositionInfo = SakuraCanvasPolygon.PositionInfo | SakuraCanvasFiveStar.PostionInfo | SakuraCanvasImage.PositionInfo 
							| SakuraCanvasRect.PositionInfo | SakuraCanvasCircle.PositionInfo | SakuraCanvasText.PositionInfo
	/**
	 * canvas样式
	 */
	type CanvasStyle = {
		width: string,
		height: string
	}
}