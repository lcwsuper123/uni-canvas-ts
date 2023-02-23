/**
 * 绘制二维码时的参数
 */
declare namespace SakuraCanvasQrcode {
	/**
	 * 二维码绘制私有参数
	 */
	type DrawPrivateParams = Partial<{
		/**
		 * 二维码内容
		 */
		text: string,
		/**
		 * 容错级别 默认3
		 */
		lv: number,
		/**
		 * 二维码背景色
		 */
		background: string,
		/**
		 * 二维码前景色
		 */
		foreground: string,
		/**
		 * 二维码角标色
		 */
		pdground: string,
		/**
		 * 二维码图片
		 */
		image: Omit<SakuraCanvasImage.DrawParams, 'x' | 'y' | 'window'> & {
			/**
			 * 是否显示
			 */
			show: boolean,
		},
		/**
		 * 二维码尺寸
		 */
		size: number,
		/**
		 * 二维码的位置信息
		 */
		positionInfo: PositionInfo | null
	}>
	/**
	 * 二维码绘制参数
	 */
	type DrawParams = SakuraCanvasParams.BasicDrawParams & DrawPrivateParams
	/**
	 * 二维码的位置信息
	 */
	type PositionInfo = SakuraCanvasShared.PositionInfo & {
		imagePositionInfo: SakuraCanvasImage.Result | null
	}
	/**
	 * 获取二维码位置信息的参数
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
		 * 二维码尺寸
		 */
		size: number,
	}
	/**
	 * 二维码绘制回调
	 */
	type Fn = {
		(positionInfo: PositionInfo): void | Promise<void>,
	}
	/**
	 * 计算矩阵点的前景色参数
	 */
	type ForeGroundParams = {
		/**
		 * 水平坐标
		 */
		row: number,
		/**
		 * 垂直坐标
		 */
		col: number,
		/**
		 * 矩阵大小
		 */
		count: number,
		/**
		 * 二维码绘制私有参数
		 */
		options: Required<DrawPrivateParams>
	}
}