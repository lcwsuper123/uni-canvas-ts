import { base64ToPath } from '../plugins/image-tool'
/**
 * 下载网路图片资源
 * @param url 图片路径
 * @returns 
 */
export const downloadFile = (url: string): Promise<SakuraCanvasShared.Result<string>> => {
	return new Promise(resolve => {
		try {
			uni.downloadFile({
				url,
				success: (res: UniApp.DownloadSuccessData) => {
					return resolve({
						success: true,
						data: res.tempFilePath,
						message: '下载成功'
					})
				},
				fail: err => {
					return resolve({
						success: false,
						message: `下载资源${url}失败---${JSON.stringify(err)}`,
						data: ''
					})
				}
			})
		} catch(e) {
			return resolve({
				success: false,
				message: `下载资源${url}失败---${JSON.stringify(e)}`,
				data: ''
			})
		}
	})
}

/**
* 获取图片信息
* @param src 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
*/
export const getImageInfo = (src: string): Promise<SakuraCanvasShared.Result<SakuraCanvasImage.Info>> => {
	return new Promise(async resolve =>{
		src = await base64ToLocalPath(src)
		uni.getImageInfo({
			src,
			success: (res: UniApp.GetImageInfoSuccessData) => {
				const { width, height, path } = res
				resolve({
					success: true,
					message: '获取成功',
					data: {
						width,
						height,
						path
					}
				})
			},
			fail: e => {
				resolve({
					success: false,
					message: `获取图片信息${src}失败---${JSON.stringify(e)}`,
					data: ''
				})
			}
		})
	})
}
/**
 * base64图片路径转换为本地路径
 * @param path 图片路径
 */
export const base64ToLocalPath = (path: string): Promise<string> | string => {
	const reg: RegExp = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i
	if (!reg.test(path)) {
		return path
	}
	return base64ToPath(path)
}