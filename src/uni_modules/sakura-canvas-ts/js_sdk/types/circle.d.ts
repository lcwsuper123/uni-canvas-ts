/**
 * 绘制圆形时的类型
 */
declare namespace SakuraCanvasCircle {
	/**
	 * 获取圆形位置信息的参数
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
		 * 尺寸
		 */
		size: number,
	}
	/**
	 * 圆形位置信息
	 */
	type PositionInfo = SakuraCanvasShared.PositionInfo
	/**
	 * 圆形的私有属性
	 */
	type DrawPrivateParams = {
		/**
		 * 圆形的位置信息, 可以通过getCirclePositionInfo方法获取/createCircle方法的返回值获取
		 */
		positionInfo?: PositionInfo | null,
		/**
		 * 起始弧度，单位弧度（在3点钟方向） 
		 */
		sAngle?: number,
		/**
		 * 终止弧度
		 */
		eAngle?: number,
		/**
		 * 指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针
		 */
		counterclockwise?: boolean,
	}
	/**
	 * 圆形绘制参数
	 */
	type DrawParams = SakuraCanvasParams.BasicDrawParams & DrawPrivateParams
	/**
	 * 圆形绘制回调
	 */
	type Fn = {
		(positionInfo: PositionInfo): void | Promise<void>
	}
}