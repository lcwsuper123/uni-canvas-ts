import QRCodeAlg from '../plugins/qrcodeAlg'

/**
 * 获取二维码算法实现实例
 * @param params 
 */
 export const getQrcodeAlg = (params: Required<SakuraCanvasQrcode.DrawPrivateParams>): any => {
	const { text, lv } = params
	const qrcodeAlgObjCache: any[] = []
	let qrCodeAlg = null
	const length = qrcodeAlgObjCache.length
	let d = 0
	for (let i = 0;i < length; i++) {
		d = i
		if (qrcodeAlgObjCache[i].text == text && qrcodeAlgObjCache[i].text.correctLevel == lv) {
			qrCodeAlg = qrcodeAlgObjCache[i].obj
			break
		}
	}
	if (d === length) {
		qrCodeAlg = new (QRCodeAlg as any)(text, lv)
		qrcodeAlgObjCache.push({
			text,
			correctLevel: lv,
			obj: qrCodeAlg
		})
	}
	return qrCodeAlg
}
/**
 * 计算矩阵点的前景色
 * @param params 
 * @param params.row 水平坐标
 * @param params.col 垂直坐标
 * @param params.count 矩阵大小
 * @param params.options 二维码私有参数
 * @param params.options.foreground 二维码前景色
 * @param params.options.pdground 二维码角标色
 */
export const getForeGround = (params: SakuraCanvasQrcode.ForeGroundParams): string => {
	const { options: { pdground, foreground }, row, col, count } = params
	if (pdground && (
		(row > 1 && row < 5 && col > 1 && col < 5) ||
		(row > (count - 6) && row < (count - 2) && col > 1 && col < 5) ||
		(row > 1 && row < 5 && col > (count - 6) && col < (count - 2))
	)) {
		return pdground
	}
	return foreground
}
/**
 * 创建二维码模型
 * @param contextGlobalMethods canvas上下文的一些公共方法
 * @param options
 * @param options.text 二维码内容
 * @param options.size 二维码尺寸
 * @param options.lv 容错级别
 * @param options.background 二维码背景色
 * @param options.foreground 二维码前景色
 * @param options.pdground 二维码角标色
 * @param options.image 二维码图片
 * @param options.x 水平方向位置
 * @param options.y 垂直方向位置
 * @param options.context 绘制对象
 */
export const createQrcodeStructure = (contextGlobalMethods: SakuraCanvasShared.ContextGlobalMethods, params: Required<SakuraCanvasQrcode.DrawPrivateParams> & { x: number, y: number, context: UniApp.CanvasContext }): any => {
	const { size, background, x, y, context } = params
	const qrCodeAlg = getQrcodeAlg(params)
	const count = qrCodeAlg.getModuleCount()
	//计算每个点的长宽
	const tileW = Number((size / count).toPrecision(4))
	const tileH = Number((size / count).toPrecision(4))
	//绘制
	for (let row = 0; row < count; row++) {
		for (let col = 0; col < count; col++) {
			const w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW))
			const h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW))
			const foreground = getForeGround({
				row,
				col,
				count,
				options: params
			})
			contextGlobalMethods.setFillStyle({
				fillMode: 'fill',
				color: qrCodeAlg.modules[row][col] ? foreground : background
			})
			context.fillRect(x + Math.round(col * tileW), y + Math.round(row * tileH), w, h)
		}
	}
	return qrCodeAlg
}