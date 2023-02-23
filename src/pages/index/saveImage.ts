import { saveImageToPhotosAlbum } from "../../uni_modules/sakura-canvas-ts/js_sdk/src"
/**
 * 保存图片
 * @param src 图片资源路径
 * @returns 
 */
export default async function saveImage(src: string){
	// #ifdef H5
	return uni.showToast({ title: 'h5不支持该API,请长按保存', icon: 'none' })
	// #endif
	uni.showLoading({
		title: '保存中...'
	})
	const result = await saveImageToPhotosAlbum(src)
	uni.hideLoading()
	if (!result.success) return
	uni.showToast({
		title: '保存成功！',
		icon: 'success'
	})
}