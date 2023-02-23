/**
 * 绘制五角星时的一些参数
 */
declare namespace SakuraCanvasFiveStar {
	/**
	 * 五角星模型信息
	 */
	type ModelInfo = {
		/**
		 * 绘制点信息
		 */
		dotPosition: DotPosition,
		/**
		 * 五角星尺寸
		 */
		size: number
	}
	/**
	 * 根据五角星模型信息, 水平方向位置, 垂直方向位置返回五角星的位置信息
	 */
	type PositionInfoParams = {
		/**
		 * 五角星模型信息
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
		/**
		 * 五角星尺寸
		 */
		size?: number,
		/**
		 * 边框大小
		 */
		lineWidth?: number
	}
	/**
	 * 五角星位置信息
	 */
	type PostionInfo = SakuraCanvasShared.PositionInfo & {
		/**
		 * 绘制点信息
		 */
		drawDotPosition: DotPosition,
		/**
		 * 五角星模型信息, 可以通过createModel方法获取
		 */
		modelInfo: ModelInfo
	}
	/**
	 * 五角星绘制点的位置
	 */
	type DotPosition = [[number, number], [number, number]][]
	/**
	 * 绘制五角星的私有属性
	 */
	type DrawPrivateParams = {
		/**
		 * 五角星模型信息, 可以通过createModel方法获取
		 */
		modelInfo?: ModelInfo | null,
		/**
		 * 五角星位置信息, 可以通过getPositionInfo方法获取/create方法的返回值获取
		 */
		positionInfo?: PostionInfo | null
	}
	/**
	 * 五角星的绘制参数
	 */
	type DrawParams = SakuraCanvasParams.BasicDrawParams & DrawPrivateParams
	/**
	 * 五角星的绘制回调
	 */
	type Fn = {
		(positionInfo: PostionInfo): void | Promise<void>
	}
}