/**
 * 绘制图片时的参数
 */
declare namespace SakuraCanvasImage {
	/**
	 * 获取图片位置信息的参数
	 */
	type PositionParams = Pick<SakuraCanvasParams.BasicDrawParams, 'width' | 'height' | 'x' | 'y'> & {
		/**
		 * 图片路径
		 */
		src: string,
		/**
		 * 绘制模式
		 */
		mode?: Mode,
	}
	/**
	 * 图片位置信息
	 */
	type PositionInfo = SakuraCanvasShared.PositionInfo & {
		/**
		 * 绘制图片的信息
		 */
		drawImageInfo: DrawInfo,
		/**
		 * 图片模式下的位置信息
		 */
		imageModePositionInfo: SakuraCanvasShared.PositionInfo
	}
	/**
	 * 图片信息
	 */
	type Info = {
		/**
		 * 原图宽度
		 */
		width: number,
		/**
		 * 原图高度
		 */
		height: number,
		/**
		 * 路径
		 */
		path: string
	}
	/**
	 * 绘制模式
	 * aspectFit: 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来
	 * aspectFill: 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
	 * widthFix: 宽度不变，高度自动变化，保持原图宽高比不变
	 * heightFix: 高度不变，宽度自动变化，保持原图宽高比不变
	 * none: 不进行计算
	 */
	type Mode = 'aspectFit' | 'aspectFill' | 'heightFix' | 'widthFix' | 'none'
	/**
	 * 获取绘制的图片信息
	 */
	type DrawInfoParams = {
		/**
		 * 图片路径
		 */
		src: any,
		/**
		 * 绘制的图片宽度
		 */
		width?: number,
		/**
		 * 绘制的图片高度
		 */
		height?: number,
		/**
		 * x轴位置水平方向
		 */
		x?: number,
		/**
		 * y轴位置垂直方向
		 */
		y?: number,
		/**
		 * 绘制图形的信息
		 */
		positionInfo?: SakuraCanvasShared.PositionInfo,
		/**
		 * 绘制模式
		 * aspectFit: 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来
		 * aspectFill: 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
		 * widthFix: 宽度不变，高度自动变化，保持原图宽高比不变
		 * heightFix: 高度不变，宽度自动变化，保持原图宽高比不变
		 */
		mode?: Mode
	}
	/**
	 * 获取不同绘制类型的图片信息参数
	 */
	type ModeInfoParams = Required<Pick<DrawInfoParams, 'width' | 'height' | 'x' | 'y' | 'mode'>> & {
		/**
		 * 原图宽度
		 */
		originImageWidth: number,
		/**
		 * 原图高度
		 */
		originImageHeight: number,
	}
	/**
	 * 不同绘制类型的图片信息
	 */
	type ModeInfo = {
		/**
		 * 图像的左上角在目标canvas上 X 轴的位置
		 */
		dx: number,
		/**
		 * 图像的左上角在目标canvas上 Y 轴的位置
		 */
		dy: number,
		/**
		 * 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
		 */
		dWidth: number,
		/**
		 * 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
		 */
		dHeight: number,
		/**
		 * 源图像的矩形选择框的左上角 X 坐标
		 */
		sx: number,
		/**
		 * 源图像的矩形选择框的左上角 Y 坐标
		 */
		sy: number,
		/**
		 * 源图像的矩形选择框的宽度
		 */
		sWidth: number,
		/**
		 * 源图像的矩形选择框的高度
		 */
		sHeight: number,
		/**
		 * 图片模式
		 */
		mode: Mode
	}
	/**
	 * 绘制的图片信息
	 */
	type DrawInfo = ModeInfo & {
		path: string
	}
	/**
	 * 绘制类型
	 * none: 不使用任何类型
	 * polygon: 多边形
	 * fiveStar: 五角星
	 * rect: 矩形
	 * circle: 圆形
	 */
	type DrawType = 'polygon' | 'fiveStar' | 'rect' | 'circle'
	/**
	 * 绘制图片私有参数
	 */
	type DrawPrivateParams = Partial<{
		/**
		 * 图片资源路径
		 */
		src: string,
		/**
		 * 图片模式
		 */
		mode: Mode,
		/**
		 * 绘制类型
		 * none: 不使用任何类型
		 * polygon: 多边形
		 * fiveStar: 五角星
		 */
		drawType: 'none' | DrawType,
		/**
		 * 绘制不同类型的不同的私有参数
		 */
		drawTypeParams: SakuraCanvasParams.AllDrawParams
		/**
		 * 图片的位置信息, 可以通过getPositionInfo方法获取/create方法的返回值获取
		 */
		positionInfo: PositionInfo | null,
		/**
		 * 是否使用图片使用了mode之后的位置信息与大小信息
		 */
		isUseImageModeSize: boolean
	}>
	/**
	 * 绘制图片的参数
	 */
	type DrawParams = SakuraCanvasParams.BasicDrawParams & DrawPrivateParams
	/**
	 * 图片的绘制回调
	 */
	type Fn = {
		(imagePositionInfo: PositionInfo, wrapPositionInfo?: SakuraCanvasShared.AllPositionInfo): void
	}
	/**
	 * 图片绘制结果
	 */
	type Result = {
		/**
		 * 图片位置信息
		 */
		imagePositionInfo: PositionInfo,
		/**
		 * 当使用其他绘制类型的时候, 其他绘制类型的位置信息
		 */
		wrapPositionInfo: SakuraCanvasShared.AllPositionInfo
	}
	/**
	 * 创建绘制图片时的容器参数
	 */
	type CreateWrapParams = {
		/**
		 * 默认绘制参数
		 */
		basicParams: SakuraCanvasParams.BasicDrawParams,
		/**
		 * 绘制类型
		 */
		drawType: DrawType,
		/**
		 * 绘制不同类型的不同的私有参数
		 */
		drawTypeParams: Omit<SakuraCanvasParams.AllDrawParams, 'x' | 'y' | 'window' | 'width' | 'height' | 'size'>,
		/**
		 * 图片位置信息
		 */
		imagePositionInfo: PositionInfo,
		/**
		 * 是否使用图片使用了mode之后的位置信息与大小信息
		 */
		isUseImageModeSize: boolean
		/**
		 * 图片的绘制回调
		 */
		fn?: (positionInfo: SakuraCanvasShared.AllPositionInfo) => void
	}
}