/**
 * JSON方式绘制海报参数
 */
declare namespace SakuraCanvasJSON {
	/**
	 * 绘制海报的参数集合
	*/
	type DrawPosterParams = {
		/**
		 * 圆形参数
		 */
		circle: SakuraCanvasCircle.DrawParams,
		/**
		 * 矩形菜蔬
		 */
		rect: SakuraCanvasRect.DrawParams,
		/**
		 * 五角星参数
		 */
		fiveStar: SakuraCanvasFiveStar.DrawParams,
		/**
		 * 图片参数
		 */
		image: SakuraCanvasImage.DrawParams,
		/**
		 * 线条参数
		 */
		line: SakuraCanvasImage.DrawParams,
		/**
		 * 多边形参数
		 */
		polygon: SakuraCanvasPolygon.DrawParams,
		/**
		 * 文字参数
		 */
		text: SakuraCanvasText.DrawParams,
		/**
		 * 二维码参数
		 */
		qrcode: SakuraCanvasQrcode.DrawParams
	}
	/**
	 * 绘制海报的参数Key
	 */
	type DrawPosterParamsKey = keyof DrawPosterParams
	/**
	 * 回调里面
	 */
	type DrawPosterData = {
		/**
		 * 绘制类型
		 */
		type: DrawPosterParamsKey,
		/**
		 * 每个类型的参数
		 */
		params: DrawPosterParams[DrawPosterParamsKey],
		/**
		 * 搜索的内容
		 */
		searchKey?: string,
		/**
		 * 当前内容的key
		 */
		key?: string,
		/**
		 * 绘制回调
		 */
		callback?: {
			(...positionInfo: DrawPositionInfoData['data'][]): Partial<DrawPosterParams[DrawPosterParamsKey]>
		}
	}
	/**
	 * 绘制海报的Json回调
	 */
	type DrawPosterFn = {
		(width?: number, height?: number): DrawPosterData[] | Promise<DrawPosterData[]>
	}
	/**
	 * 所有绘制内容的位置信息
	 */
	type DrawPositionInfoData = {
		key: string,
		data: SakuraCanvasShared.AllPositionInfo
	}
	type GetCallbackPositionInfoParams = {
		/**
		 * 搜索的key, 多个用逗号分割
		 */
		searchKey: string,
		/**
		 * 上一次绘制信息
		 */
		beforePositionInfo: SakuraCanvasJSON.DrawPositionInfoData,
		/**
		 * 所有的绘制信息
		 */
		allPositionInfoList: SakuraCanvasJSON.DrawPositionInfoData[]
	}
	type CallbackPositionInfoResult = SakuraCanvasJSON.DrawPositionInfoData['data'][]
}