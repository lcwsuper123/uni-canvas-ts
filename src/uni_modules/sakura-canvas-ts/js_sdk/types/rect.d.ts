/**
 * 矩形绘制参数
 */
declare namespace SakuraCanvasRect {
	/**
	 * 矩形圆角属性
	 */
	type Round = number | [number] | [number, number] | [number, number, number] | [number, number, number, number]
	/**
	 * 矩形圆角的信息 遵循css的border-radius 顺序
	 */
	type RoundData = {
		/**
		 * 上
		 */
		top: number
		/**
		 * 右
		 */
		right: number
		/**
		 * 下
		 */
		bottom: number
		/**
		 * 左
		 */
		left: number
	}
	/**
	 * 绘制矩形的私有参数
	 */
	type DrawPrivateParams = {
		/**
		 * 圆角属性
		 */
		r?: Round
		/**
		 * 矩形的位置信息, 可以通过getRectPositionInfo方法获取/createRect方法的返回值获取
		 */
		positionInfo?: PositionInfo | null
	}
	/**
	 * 绘制矩形的参数
	 */
	type DrawParams = SakuraCanvasParams.BasicDrawParams & DrawPrivateParams
	/**
	 * 矩形位置信息
	 */
	type PositionInfo = SakuraCanvasShared.PositionInfo
	/**
	 * 获取矩形位置信息的参数
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
	 * 矩形绘制回调
	 */
	type Fn = {
		(positionInfo: PositionInfo): void | Promise<void>,
	}
}