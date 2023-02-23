/**
 * 绘制线条时的参数
 */
declare namespace SakuraCanvasLine {
	/**
	 * 线条私有属性
	 */
	type DrawPrivateParams = {
		/**
		 * 矩形的位置信息, 可以通过getPositionInfo方法获取/create方法的返回值获取
		 */
		positionInfo?: PositionInfo | null
	}
	/**
	 * 线条绘制参数
	 */
	type DrawParams = SakuraCanvasParams.BasicDrawParams & DrawPrivateParams
	/**
	 * 线条位置信息
	 */
	type PositionInfo = SakuraCanvasShared.PositionInfo
	/**
	 * 获取线条位置信息的参数
	 */
	type PositionInfoParams = {
		/**
		 * 水平方向位置
		 */
		x?: number,
		/**
		 * 垂直方向位置
		 */
		y?: number,
		/**
		 * 宽度
		 */
		width: number,
		/**
		 * 高度
		 */
		height: number
	}
	/**
	 * 线条绘制回调
	 */
	type Fn = {
		(positionInfo: PositionInfo): void | Promise<void>,
	}
}