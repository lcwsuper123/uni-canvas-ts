/**
 * 合并对象
 * @param originValue 源对象
 * @param values 其他合并对象
 * @returns 
 */
export const extend = <T = any>(originValue: any, ...values: any[]): T => Object.assign(originValue, ...values)
/**
 * 获取最大的值
 * @param numArr 数值数组
 * @returns 
 */
export const getMaxNum = (numArr: number[]) => Math.max(...numArr)
/**
 * 获取最小的值
 * @param numArr 数值数组
 * @returns 
 */
export const getMixNum = (numArr: number[]) => Math.min(...numArr)
/**
 * 获取最大值与最小值
 * @param numArr 数值数组
 * @returns 
 */
export const getMaxnumAndMinnum = (numArr: number[]): { maxValue: number, minValue: number } => ({
	maxValue: getMaxNum(numArr),
	minValue: getMixNum(numArr)
})
/**
 * 深拷贝对象(先偷个懒使用JSON)
 * @param value 对象值
 * @returns 
 */
export const deepObject = <T = any>(value: T): T => JSON.parse(JSON.stringify(value))
/**
 * 计算位置
 * @param params 
 * @param params.containerWidth 容器宽度
 * @param params.contentWidth 内容宽度
 * @param params.type 对其方式 normal: 默认 right: 右对齐 center: 居中对齐
 * @param params.rightGap 距离右边的位置
 * @param params.startX 起始X轴位置
 * @returns 
 */
export const computedPosition = (params: SakuraCanvasParams.ComputedPositionParams): number => {
	const { containerWidth, contentWidth, type = 'normal', rightGap = 0, startX } = params
	if (type === 'normal') {
		return startX
	}
	if (type === 'right') {
		return startX + (containerWidth - contentWidth - rightGap)
	}
	return startX + ((containerWidth - contentWidth) / 2 - rightGap)
}
/**
 * 获取使用了box-sizing之后的绘制信息
 * @param params
 * @param params.positionInfo 位置信息
 * @param params.fillStyle 填充模式的参数
 * @param params.multiple 减掉的倍数
 */
export const getUseBoxSizingAfterDrawInfo = (params: SakuraCanvasParams.UseBoxSizingAfterDrawInfoParams): SakuraCanvasShared.UseBoxiSizingData => {
	const { fillStyle, positionInfo, multiple = 1 } = params
	const { fillMode, lineWidth } = fillStyle
	let { width, height, startX, startY } = positionInfo
	if (['all', 'stroke'].includes(fillMode)) {
		width -= lineWidth / multiple
		height -= lineWidth / multiple
		startX += lineWidth / 2
		startY += lineWidth / 2
	}
	return {
		width,
		height,
		x: startX,
		y: startY
	}
}
/**
 * 睡眠线程
 * @param wait 睡眠时间
 * @returns 
 */
export const sleep = (wait: number = 500): Promise<any> => {
	return new Promise(resolve => {
		setTimeout(resolve, wait)
	})
}
/**
 * 获取canvas的样式
 * @param width 宽度
 * @param height 高度
 * @param unit 单位 默认px
 * @returns 
 */
export const getCanvasStyle = (width: number, height: number, unit: string = 'px'): SakuraCanvasShared.CanvasStyle => ({
	width: width + unit,
	height: height + unit
})
/**
 * 保存图片至本地
 * @param filePath 图片资源路径
 * @returns 
 */
export const saveImageToPhotosAlbum = (filePath: string): Promise<SakuraCanvasShared.Result<string>> => {
	return new Promise(resolve => {
		uni.saveImageToPhotosAlbum({
			filePath,
			success: res => {
				resolve({
					success: true,
					data: res.path,
					message: ''
				})
			},
			fail: err => {
				resolve({
					success: false,
					message: err,
					data: ''
				})
			}	
		})
	})
}