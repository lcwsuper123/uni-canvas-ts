import { createFiveStar } from './methods/fiveStar'
import { createCanvasBackgroud, createSakuraCanvasUtils, exportImage, setCanvasStyle } from './methods/canvas'
import { createPolygon } from './methods/polygon'
import { createImage } from './methods/image'
import { createRect } from './methods/rect'
import { createCircle } from './methods/circle'
import { createText, getTextUtilsMethod } from './methods/text'
import { createLine } from './methods/line'
import { createQrcode } from './methods/qrcode'
// 主页面导出一些常用方法
export { getCirclePositionInfo } from './methods/circle'
export { getFiveStarPositionInfo, createFiveStarModel } from './methods/fiveStar'
export { getImagePositionInfo } from './methods/image'
export { getDrawImageInfo } from './utils/image'
export { getLinePositionInfo } from './methods/line'
export { getPolygonPositionInfo, createPolygonModel } from './methods/polygon'
export { getRectPositionInfo } from './methods/rect'
export { getTextPositionInfo } from './methods/text'
export { getQrcodePositionInfo } from './methods/qrcode'
export { sleep, getCanvasStyle, saveImageToPhotosAlbum } from './utils/shared'
export { jsonDrawPoster, exportImage } from './methods/canvas'
/**
 * 创建sakuraCanvas实例
 * @param params 
 */
export async function createSakuraCanvas(params: SakuraCanvasParams.SakuraCanvasInitParams): Promise<SakuraCanvasShared.SakuraCanvasContext> {
	const utils: SakuraCanvasShared.SakuraCanvasUtils = await createSakuraCanvasUtils(params)
	const { canvas, context } = utils
	return {
		/**
		 * 绘制五角星
		 */
		createFiveStar: createFiveStar.bind(utils),
		/**
		 * 绘制多边形
		 */
		createPolygon: createPolygon.bind(utils),
		/**
		 * 绘制图片
		 */
		createImage: createImage.bind(utils),
		/**
		 * 绘制矩形
		 */
		createRect: createRect.bind(utils),
		/**
		 * 绘制圆形
		 */
		createCircle: createCircle.bind(utils),
		/**
		 * 获取绘制文字的工具方法
		 */
		getTextUtilsMethod: getTextUtilsMethod.bind(utils),
		/**
		 * 绘制文字
		 */
		createText: createText.bind(utils),
		/**
		 * 绘制线条
		 */
		createLine: createLine.bind(utils),
		/**
		 * 绘制二维码
		 */
		createQrcode: createQrcode.bind(utils),
		/**
		 * 创建背景
		 */
		createCanvasBackgroud: createCanvasBackgroud.bind(utils),
		/**
		 * 设置canvas样式
		 */
		setCanvasStyle: setCanvasStyle.bind(utils),
		/**
		 * 导出图片
		 */
		exportImage: exportImage.bind(utils),
		/**
		 * context上下文对象
		 */
		context,
		/**
		 * canvas对象, 2d绘制时会有
		 */
		canvas,
		/**
		 * sakuraCanvas工具方法
		 */
		utils,
	}
}