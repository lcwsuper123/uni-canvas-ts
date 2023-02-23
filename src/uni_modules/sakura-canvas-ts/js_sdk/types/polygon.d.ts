/**
 * 创建多边形时的参数
 */
declare namespace SakuraCanvasPolygon {
	/**
	 * 创建多边形模型参数
	 */
	type CreateModelParams = {
		/**
		 * 几条边最少三条
		 */
		n: number,
		/**
		 * 多边形的尺寸
		 */
		size: number,
		/**
		 * 绘制时的初始角度默认Math.PI / 2
		 */
		angle?: number,
		/**
		 * 边框大小
		 */
		lineWidth?: number
	}
	/**
	 * 多边形模型信息
	 */
	type ModelInfo = CreateModelParams & {
		/**
		 * 绘制点信息
		 */
		dotPosition: DotPosition,
	}
	/**
	 * 获取多边形的位置信息参数
	 */
	type PositionInfoParams = {
		/**
		 * 多边形模型信息
		 */
		modelInfo?: ModelInfo,
		/**
		 * 水平方向位置
		 */
		x?: number,
		/**
		 * 垂直方向位置
		 */
		y?: number,
	} & CreateModelParams
	/**
	 * 多边形的位置信息
	 */
	type PositionInfo = SakuraCanvasShared.PositionInfo & {
		/**
		 * 绘制点信息
		 */
		drawDotPosition: DotPosition,
		/**
		 * 多边形的模型信息可以通过createModel方法获取
		 */
		modelInfo: ModelInfo,
	}
	/**
	 * 多边形绘制点的返回值
	 */
	type DotPosition = [number, number][]
	/**
	 * 创建多边形的私有参数(除了一些公共的参数)之外
	 */
	type DrawPrivateParams = {
		/**
		 * 多边形的模型信息可以通过createModel方法获取
		 */
		modelInfo?: ModelInfo | null,
		/**
		 * 多边形的位置信息, 可以通过getPositionInfo方法获取/create方法的返回值获取
		 */
		positionInfo?: PositionInfo | null
		/**
		 * 多少条边, 最少三条
		 */
		n?: number,
		/**
		 * 绘制时的初始角度默认Math.PI / 2
		 */
		angle?: number
	}
	/**
	 * 创建多边形的参数
	 */
	type DrawParams = SakuraCanvasParams.BasicDrawParams & DrawPrivateParams
	/**
	 * 多边形的绘制回调
	 */
	type Fn = {
		(positionInfo: PositionInfo): void | Promise<void>
	}
}