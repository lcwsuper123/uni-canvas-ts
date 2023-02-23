<a name="fLQil"></a>
# 前言: 
<a name="Q2KBw"></a>
## 1、重写架构插件架构、使用了函数式调用
<a name="NsTX5"></a>
## 2、重写了所有绘制方法。提升性能
<a name="kyf4v"></a>
## 3、新增了获取对应类型的位置方法，方便在绘制之前就能知道绘制的具体位置
<a name="fFtz4"></a>
## 4、背景图片高度不确定，可以使用getImagePositionInfo方法提前知道图片的宽高，然后在设置canvas的宽高
<a name="WZTWo"></a>
## 5、画布内容不确定，在绘制完内容时，调用setCanvasStyle方法就行
<a name="ld8Di"></a>
## 6、2d绘制目前测试已支持: h5, 微信小程序
<a name="Pxv6W"></a>
# 简单的流程图
![](https://cdn.nlark.com/yuque/0/2023/jpeg/32808459/1676274359401-6508c34b-90c9-4e0b-b896-8d32958af2e0.jpeg)

<a name="NTKGb"></a>
# 创建绘画实例
<a name="vm2OK"></a>
## createSakuraCanvas(params: [SakuraCanvasInitParams](#m8M8k)) =>Promise<[SakuraCanvasContext](#nE6Td)>
<a name="m8M8k"></a>
### SakuraCanvasInitParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| canvasWidth | Number |  |  | 是 | 画布宽度 |
| canvasHeight | Number |  |  | 是 | 画布高度 |
| canvasId | String |  |  | 是 | 画布id |
| type | String | 2d | default: 默认绘制<br />2d: 2d绘制模式 |  | 绘制模式提供<br />default->默认绘制<br />2d->2d绘制模式 |
| componentInstance | Vue-Component |  | vue3->getCurrentInstance->proxy<br />vue2->this |  | 自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 <canvas/> ，如果省略，则不在任何自定义组件内查找 <br /> |

<a name="nE6Td"></a>
### SakuraCanvasContext返回值内容

| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| [createFiveStar](#xTQvi) | function | 创建五角星 |
| [createPolygon](#hfiY3) | function | 创建多边形 |
| [createImage](#lC55n) | function | 创建图片 |
| [createRect](#LzuJT) | function | 创建矩形 |
| [createCircle](#UAfC4) | function | 创建圆形 |
| [createText](#YcFLF) | function | 创建文字 |
| [createLine](#ChQqF) | function | 创建线条 |
| [createQrcode](#Mduhc) | function | 创建二维码 |
| [createCanvasBackgroud](#zmr2Q) | function | 创建背景 |
| [getTextUtilsMethod](#JMub1) | function | 获取绘制文字的工具方法 |
| [setCanvasStyle](#V0nf5) | function | 重置canvas大小 |
| [exportImage](#EW6Cu) | function | 导出图片 |
| context | CanvasContext | canvas上下文对象 |
| canvas | Canvas | canvas对象(2d绘制时才有) |


<a name="nLqqV"></a>
# 创建背景
<a name="zmr2Q"></a>
## createCanvasBackground(params: [CreateCanvasBackgroudParams](#cQV35))=>Promise<[CanvasBackgroundResult](#m33sN)>
<a name="cQV35"></a>
### CreateCanvasBackgroudParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| type | String | color | color: 纯色背景<br />image:图片背景 | <br /> | 背景类型 |
| wait | Number | 200 |  | <br /> | 绘制背景时的延迟时间 |
| width | Number | 不填默认是canvasWidth |  |  | 背景宽度 |
| height | Number | 不填默认是canvasHeight |  |  | 背景高度 |
| r | Number |  |  |  | 圆角大小 |
| color | String |  |  |  | 背景颜色 |
| src | String |  |  |  | type为image时使用<br />图片地址 |
| xxx | xxx |  |  |  | 以上只列出常用的属性,其他属性请参考绘制矩形/绘制图片时的参数 |

<a name="m33sN"></a>
### CanvasBackgroundResult返回值类型
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| style | Object | 返回绘制完背景时canvas的宽高样式 |
| positionInfo | [RectPositionInfo](#bNj5M)/[ImagePositionInfo](#fQVHL) | type为color时返回矩形的位置信息<br />type为image时返回图片的位置信息 |
| width | Number | 高度 |
| height | Number | 宽度 |

<a name="iYFFM"></a>
# JSON方式绘制海报: jsonDrawPoster(context: [SakuraCanvasContext](#vm2OK), fn: SakuraCanvasJSON.DrawPosterFn) => Promise<SakuraCanvasShared.Result<string>>
<a name="ARnmv"></a>
## JSON方式参数类型
| 属性名称 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| context | SakuraCanvasContext | 是 | 使用createSakuraCanvas方法返回的上下文对象 |
| fn | (width?: number, height?: number): DrawPosterData[] &#124; Promise<DrawPosterData[]> | 是 | 绘制的所有内容 |

<a name="rOBZ7"></a>
## DrawPosterData内容
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| type | String | <br /> | circle: 圆形<br />fiveStar: 五角星<br />image: 图片<br />line: 线条<br />polygon: 多边形<br />qrcode: 二维码<br />rect: 矩形<br />text: 文字 | 是 | 绘制类型 |
| params | Object |  | rect: [RectDrawParams](#AOvp5)<br />polygon: [PolygonDrawParams](#Jl4L5)<br />fiveStar: [FiveStarDrawParams](#l5Ar1)<br />circle: [CircleDrawParams](#mVZv3)<br />line: [LineDrawParams](#GOGD4)<br />text: [TextDrawParams](#n4sLe)<br />qrcode: [QrcodeDrawParams](#DA5C3)<br />image: [ImageDrawParams](#vduBN)<br /> | 是 | 每个绘制类型的不同参数集合 |
| key | String |  |  |  | 绘制内容的key, 方便后面绘制其他内容时查找当前内容的绘制信息 |
| searchKey | String |  |  |  | 搜索当前绘制内容之前所有绘制完内容的绘制信息多个用逗号分割,<br />后面使用callback可以接收到搜索的内容, 内容顺序和searchKey的顺序一致<br />啥都不填，callback默认是上一次绘制的内容 |
| callback | (...positionInfo: DrawPositionInfoData['data'][]): Partial<DrawPosterParams[DrawPosterParamsKey]> |  |  |  | 等同于老板的callback, 里面的返回内容会覆盖params的内容 |

<a name="EW6Cu"></a>
# 导出图片: exportImage(params: [ExportImageParams](#SpxcP)) => Promise<[Result<string>](#w46zS)>
<a name="SpxcP"></a>
## ExportImageParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| wait | number | 200 |  |  | 导出图片的延迟时间 |
| tips | string | 导出图片中... |  |  | 提示内容 |
| showTips | boolean | true |  |  | 是否显示提示 |
| x | number | 0 |  |  | 指定的画布区域的左上角横坐标 |
| y | number | 0 |  |  | 指定的画布区域的左上角纵坐标 |
| width | number | canvasWidth |  |  | 宽度 |
| height | number | canvasHeight |  |  | 高度 |
| destWidth | number | canvasWidth |  |  | 输出的图片的宽度 |
| destHeight | number | canvasHeight |  |  | 输出的图片的高度 |
| quality | number | 1 | 0~1 |  | 导出质量 |
| fileType | string | png | png<br />jpg |  | 导出类型 png/jpg |

<a name="w46zS"></a>
### Result<string>内容信息
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| success | boolean | 是否成功 |
| data | String | 成功时返回图片路径 |
| message | string | 成功和失败时的提示内容 |

<a name="hS5W3"></a>
# 矩形
<a name="LzuJT"></a>
## 创建矩形: createRect(params: [RectDrawParams](#AOvp5), fn?: [RectFn](#Jfkd3)) => Promise<[RectPositionInfo](#bNj5M)>
<a name="AOvp5"></a>
### RectDrawParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| width | Number |  |  |  | 宽度 |
| height | Number |  |  |  | 高度 |
| r | Number | 0 |  |  | 圆角大小 |
| positionInfo | [RectPositionInfo](#bNj5M) |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| lineWidth | Stirng | 1 |  |  | 边框大小只有当fileMode为stroke/all时才起作用 |
| alpha | Number | 1 |  |  | 透明度 |
| rotate | Number | 0 |  |  | 旋转角度 |
| fillMode | Stirng | fill | fill: 填充<br />stroke: 线性<br />all: 填充和线性都要 |  | 填充类型 |
| fillStyle | [FillStyleParams](#XHNg4) |  |  |  | 填充的样式 |
| lineStyle | [LineStyleParams](#F2QBi) |  |  |  | 线条样式 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |
| shadow | [ShadowParams](#yI694) |  |  |  | 阴影 |
| gradient | [GradientParams](#d6fJX) |  |  |  | 渐变 |

<a name="m8I20"></a>
## 获取矩形位置信息: getRectPositionInfo(params: [RectPositionInfoParams](#oDfg1)) =>[RectPositionInfo](#bNj5M)
<a name="oDfg1"></a>
### RectPositionInfoParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| width | Number |  |  | 是 | 宽度 |
| height | Number |  |  | 是 | 高度 |

<a name="YvsL2"></a>
### 矩形位置信息: RectPositionInfo
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| startX | Number | 水平方向开始位置 |
| endX | Number | 水平方向结束位置 |
| startY | Number | 垂直方向开始位置 |
| endY | Number | 垂直方向结束位置 |
| width | Number | 内容宽度 |
| height | Number | 内容高度 |

<a name="SnZLR"></a>
### 矩形绘制回调: RectFn
<a name="bGZVe"></a>
### (positionInfo: RectPosition) => Promise<void> | void
<a name="d1MsH"></a>
# 圆形
<a name="UAfC4"></a>
## 创建圆形: createCircle(params: [CircleDrawParams](#mVZv3), fn?: [CircleFn](#iq6zd)) => Promise<[CirclePositionInfo](#ATUQb)>
<a name="mVZv3"></a>
### CircleDrawParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| size | Number |  |  |  | 圆形尺寸 |
| sAngle | Number | 0 |  |  | 起始弧度，单位弧度（在3点钟方向） |
| eAngle | Number | Math.PI * 2 |  |  | 终止弧度 |
| counterclockwise | Boolean | false |  |  | 指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针 |
| positionInfo | [CirclePositionInfo](#ATUQb) |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| lineWidth | Stirng | 1 |  |  | 边框大小只有当fileMode为stroke/all时才起作用 |
| alpha | Number | 1 |  |  | 透明度 |
| rotate | Number | 0 |  |  | 旋转角度 |
| fillMode | Stirng | fill | fill: 填充<br />stroke: 线性<br />all: 填充和线性都要 |  | 填充类型 |
| fillStyle | [FillStyleParams](#XHNg4) |  |  |  | 填充的样式 |
| lineStyle | [LineStyleParams](#F2QBi) |  |  |  | 线条样式 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |
| shadow | [ShadowParams](#yI694) |  |  |  | 阴影 |
| gradient | [GradientParams](#d6fJX) |  |  |  | 渐变 |

<a name="BwPMJ"></a>
## 获取圆形位置信息: getCirclePositionInfo(params: [CirclePositionInfoParams](#j6YPz)) => [CirclePositionInfo](#ATUQb)
<a name="j6YPz"></a>
### CirclePositionInfoParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| size | Number | 0 |  | 是 | 圆形尺寸 |

<a name="lspja"></a>
### 圆形位置信息: CirclePositionInfo
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| startX | Number | 水平方向开始位置 |
| endX | Number | 水平方向结束位置 |
| startY | Number | 垂直方向开始位置 |
| endY | Number | 垂直方向结束位置 |
| width | Number | 内容宽度 |
| height | Number | 内容高度 |

<a name="aKHvp"></a>
### 圆形绘制回调: CircleFn
<a name="nLEfb"></a>
### (positionInfo: CirclePosition) => Promise<void> | void
<a name="GZO0U"></a>
# 五角星
<a name="xTQvi"></a>
## 创建五角星: createFiveStar(params: [FiveStarDrawParams](#l5Ar1), fn?: [FiveStarFn](#yCGCg)) => Promise<[FiveStarPostionInfo](#GwOPE)>
<a name="l5Ar1"></a>
### FiveStarDrawParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| size | Number |  |  |  | 五角星的尺寸 |
| positionInfo | [FiveStarPostionInfo](#GwOPE) |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| lineWidth | Stirng | 1 |  |  | 边框大小只有当fileMode为stroke/all时才起作用 |
| alpha | Number | 1 |  |  | 透明度 |
| rotate | Number | 0 |  |  | 旋转角度 |
| fillMode | Stirng | fill | fill: 填充<br />stroke: 线性<br />all: 填充和线性都要 |  | 填充类型 |
| fillStyle | [FillStyleParams](#XHNg4) |  |  |  | 填充的样式 |
| lineStyle | [LineStyleParams](#F2QBi) |  |  |  | 线条样式 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |
| shadow | [ShadowParams](#yI694) |  |  |  | 阴影 |
| gradient | [GradientParams](#d6fJX) |  |  |  | 渐变 |

<a name="RjXHK"></a>
## 获取五角星位置信息: getFiveStarPositionInfo(params: [FiveStarPositionInfoParams](#Shmiz)) =>[FiveStarPostionInfo](#GwOPE)
<a name="Shmiz"></a>
### FiveStarPositionInfoParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| size | Number | 0 |  | 是 | 五角星尺寸 |
| lineWidth | Number | <br /> |  |  | 边框大小当需要绘制线性五角星时需要传递 |

<a name="znf7d"></a>
### 五角星位置信息: FiveStarPostionInfo
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| startX | Number | 水平方向开始位置 |
| endX | Number | 水平方向结束位置 |
| startY | Number | 垂直方向开始位置 |
| endY | Number | 垂直方向结束位置 |
| width | Number | 内容宽度 |
| height | Number | 内容高度 |
| FiveStarDotPosition | [[number, number], [number, number]][] | 绘制点信息 |

<a name="afbxa"></a>
### 五角星绘制回调: FiveStarFn
<a name="rjVJW"></a>
### (positionInfo: FiveStarPosition) => Promise<void> | void
<a name="mTAT3"></a>
# 多边形
<a name="hfiY3"></a>
## 创建多边形: createPolygon(params: [PolygonDrawParams](#Jl4L5), fn?: [PolygonFn](#ZDFaR)) =>Promise<[PolygonPositionInfo](#IQ9DE)>
<a name="Jl4L5"></a>
### PolygonDrawParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| size | Number |  |  |  | 多边形的尺寸 |
| n | Number | 3 |  |  | 几条边 |
| angle | Number | Math.PI / 2 |  |  | 绘制时的初始角度默认Math.PI / 2 |
| positionInfo | [PolygonPositionInfo](#IQ9DE) |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| lineWidth | Stirng | 1 |  |  | 边框大小只有当fileMode为stroke/all时才起作用 |
| alpha | Number | 1 |  |  | 透明度 |
| rotate | Number | 0 |  |  | 旋转角度 |
| fillMode | Stirng | fill | fill: 填充<br />stroke: 线性<br />all: 填充和线性都要 |  | 填充类型 |
| fillStyle | [FillStyleParams](#XHNg4) |  |  |  | 填充的样式 |
| lineStyle | [LineStyleParams](#F2QBi) |  |  |  | 线条样式 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |
| shadow | [ShadowParams](#yI694) |  |  |  | 阴影 |
| gradient | [GradientParams](#d6fJX) |  |  |  | 渐变 |

<a name="ZJM2F"></a>
## 获取多边形位置信息: getPolygonPositionInfo(params: [PolygonPositionInfoParams](#oFY4D)) => [PolygonPositionInfo](#IQ9DE)
<a name="oFY4D"></a>
### PolygonPositionInfoParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| size | Number | <br /> |  | 是 | 多边形尺寸 |
| n | Number | 3 |  |  | 几条边 |
| angle | Number |  |  |  | 绘制时的初始角度默认Math.PI / 2 |
| lineWidth | Number | <br /> |  |  | 边框大小当需要绘制线性五角星时需要传递 |

<a name="T6spz"></a>
### 多边形位置信息： PolygonPositionInfo
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| startX | Number | 水平方向开始位置 |
| endX | Number | 水平方向结束位置 |
| startY | Number | 垂直方向开始位置 |
| endY | Number | 垂直方向结束位置 |
| width | Number | 内容宽度 |
| height | Number | 内容高度 |
| FiveStarDotPosition | [[number, number], [number, number]][] | 绘制点信息 |

<a name="HVbEd"></a>
### 多边形绘制回调: PolygonFn
<a name="jjCW6"></a>
### (positionInfo: PolygonPosition) => Promise<void> | void
<a name="Zxiax"></a>
# 线条
<a name="ChQqF"></a>
## 创建线条: createLine(params: [LineDrawParams](#GOGD4), fn?: LineFn) => Promise<[LinePositionInfo](#FncHm)>
<a name="GOGD4"></a>
### LineDrawParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| width | Number |  |  | <br /> | 宽度 |
| height | Number |  |  | <br /> | 高度 |
| positionInfo | [LinePositionInfo](#FncHm) |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| alpha | Number | 1 |  |  | 透明度 |
| rotate | Number | 0 |  |  | 旋转角度 |
| lineStyle | [LineStyleParams](#F2QBi) |  |  |  | 线条样式 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |
| shadow | [ShadowParams](#yI694) |  |  |  | 阴影 |

<a name="sREax"></a>
## 获取线条位置信息: getLinePositionInfo(params: [LinePositionInfoParams](#I8H8x)) => [LinePositionInfo](#FncHm)
<a name="I8H8x"></a>
### LinePositionInfoParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| width | Number | <br /> |  | <br /> | 宽度 |
| height | Number | <br /> |  |  | 高度 |

<a name="GDVkv"></a>
### 线条位置信息: LinePositionInfo
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| startX | Number | 水平方向开始位置 |
| endX | Number | 水平方向结束位置 |
| startY | Number | 垂直方向开始位置 |
| endY | Number | 垂直方向结束位置 |
| width | Number | 内容宽度 |
| height | Number | 内容高度 |

<a name="oBZXJ"></a>
### 线条绘制回调: LineFn
<a name="PgU2N"></a>
### (positionInfo: LinePositionInfo) => Promise<void> | void
<a name="IpMVr"></a>
# 图片
<a name="lC55n"></a>
## 创建图片: createImage(params: [ImageDrawParams](#vduBN), fn?:[ImageFn](#p2ufx)) => Promise<[ImageResult](#CjngK)>
<a name="vduBN"></a>
### ImageDrawParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| width | Number |  |  |  | 宽度 |
| height | Number | <br /> |  |  | 高度 |
| src | String |  |  | 是 | 图片地址 |
| mode | [ImageMode](#UOKJX) | aspectFill |  |  | 图片绘制模式 |
| drawType | String | rect | none: 不使用类型<br />rect: 矩形<br />polygon: 多边形<br />fiveStar: 五角星<br />circle: 圆形 |  | 绘制类型 |
| drawTypeParams | Object |  | rect: [RectDrawParams](#AOvp5)<br />polygon: [PolygonDrawParams](#Jl4L5)<br />fiveStar: [FiveStarDrawParams](#l5Ar1)<br />circle: [CircleDrawParams](#mVZv3) |  | 当drawType不为none时,<br />对应绘制类型的不同绘制参数 |
| isUseImageModeSize | Boolean | false |  |  | 是否使用图片用了mode之后的位置信息与大小信息(使用了之后会直接覆盖之前设置的图片宽高) |
| positionInfo | [ImagePositionInfo](#fQVHL) |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| lineWidth | Stirng | 1 |  |  | 边框大小只有当fileMode为stroke/all时才起作用 |
| alpha | Number | 1 |  |  | 透明度 |
| rotate | Number | 0 |  |  | 旋转角度 |
| fillMode | Stirng | fill | fill: 填充<br />stroke: 线性<br />all: 填充和线性都要 |  | 填充类型 |
| fillStyle | [FillStyleParams](#XHNg4) |  |  |  | 填充的样式 |
| lineStyle | [LineStyleParams](#F2QBi) |  |  |  | 线条样式 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |
| shadow | [ShadowParams](#yI694) |  |  |  | 阴影 |
| gradient | [GradientParams](#d6fJX) |  |  |  | 渐变 |

<a name="Graum"></a>
## 获取图片位置信息: getImagePositionInfo(params: [ImagePositionParams](#IAmLO)) => Promise<[ImagePositionInfo](#fQVHL)>
<a name="Us9Ni"></a>
### ImagePositionParams类型参数
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| width | Number | <br /> |  | 是 | 宽度 |
| height | Number | <br /> |  | 是 | 高度 |
| src | String |  |  | 是 | 图片地址 |
| mode | [ImageMode](#UOKJX) | aspectFill |  |  | 图片绘制模式 |

<a name="CjngK"></a>
### 图片绘制结果: ImageResult
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| imagePositionInfo | [ImagePositionInfo](#fQVHL) | 图片位置信息 |
| wrapPositionInfo | 矩形: [RectPositionInfo](#bNj5M)<br />圆形: [CirclePositionInfo](#ATUQb)<br />五角星: [FiveStarPositionInfo](#GwOPE)<br />多边形: [PolygonPositionInfo](#IQ9DE)<br /> | 当drawType不为none时会有作为图片容器的位置信息 |

<a name="fQVHL"></a>
### 图片位置信息: ImagePositionInfo
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| drawImageInfo | [DrawImageInfo](#oFwo2) | 绘制图片的信息 |
| imageModePositionInfo | [ImageModePositionInfo](#leaDW) | 图片模式下的位置信息 |

<a name="oFwo2"></a>
#### DrawImageInfo类型内容
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| dx | Number | 图像的左上角在目标canvas上 X 轴的位置 |
| dy | Number | 图像的左上角在目标canvas上 Y 轴的位置 |
| dWidth | Number | 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放 |
| dHeight | Number | 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放 |
| sx | Number | 源图像的矩形选择框的左上角 X 坐标 |
| sy | Number | 源图像的矩形选择框的左上角 Y 坐标 |
| sWidth | Number | 源图像的矩形选择框的宽度 |
| sHeight | Number | 源图像的矩形选择框的高度 |
| mode | [ImageMode](#UOKJX) | 图片模式 |
| path | String | 图片路径(通过getImageInfo返回的图片路径) |

<a name="leaDW"></a>
#### ImageModePositionInfo类型内容
| 属性名称 | 值类型 | 描述 |
| --- | --- | --- |
| startX | Number | 水平方向开始位置 |
| endX | Number | 水平方向结束位置 |
| startY | Number | 垂直方向开始位置 |
| endY | Number | 垂直方向结束位置 |
| width | Number | 内容宽度 |
| height | Number | 内容高度 |

<a name="UOKJX"></a>
### ImageMode类型内容
| 属性名称 | 类型 | 描述 |
| --- | --- | --- |
| none | String | 不使用类型 |
| aspectFit | String | 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来 |
| aspectFill | String | 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取 |
| heightFix | String | 高度不变，宽度自动变化，保持原图宽高比不变 |
| widthFix | String | 宽度不变，高度自动变化，保持原图宽高比不变 |

<a name="p2ufx"></a>
### 图片绘制回调: ImageFn
<a name="YbMnP"></a>
### (imagePositionInfo: [ImagePositionInfo](#fQVHL), wrapPositionInfo?: AllPositionInfo): void
<a name="sP189"></a>
# 二维码
<a name="Mduhc"></a>
## 创建二维码: createQrcode(params: [QrcodeDrawParams](#DA5C3), fn?: [QrcodeFn](#YcLJa)) => Promise<[QrcodePositionInfo](#tYQ6S)>
<a name="DA5C3"></a>
### QrcodeDrawParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| size | Number |  |  | <br /> | 二维码尺寸 |
| text | String |  |  |  | 二维码内容 |
| lv | Number | 3 |  |  | 容错级别 |
| background | String | #ffffff |  |  | 二维码背景颜色 |
| foreground | String | #000000 |  |  | 二维码前景色 |
| pdground | String | #000000 |  |  | 二维码角标色 |
| image | [QrcodeImage](#xrMGT) |  |  |  | 二维码图片 |
| positionInfo | QrcodePositionInfo |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| alpha | Number | 1 |  |  | 透明度 |
| rotate | Number | 0 |  |  | 旋转角度 |
| lineStyle | [LineStyleParams](#F2QBi) |  |  |  | 线条样式 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |
| shadow | [ShadowParams](#yI694) |  |  |  | 阴影 |

<a name="xrMGT"></a>
### QrcodeImage参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| show | Boolean |  |  |  | 是否显示 |
| xxx | [ImageDrawParams](#vduBN) |  |  |  | 其他的属性名称都是绘制图片时的参数了 |

<a name="YcLJa"></a>
### 二维码绘制回调: QrcodeFn
<a name="SHhaj"></a>
### (positionInfo: [QrcodePositionInfo](#tYQ6S)): void | Promise<void>
<a name="etBVz"></a>
## 获取二维码位置信息: getQrcodePositionInfo(params: [QrcodePositionInfoParams](#zz62e)) =>[QrcodePositionInfo](#tYQ6S)
<a name="zz62e"></a>
### QrcodePositionInfoParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| size | Number | <br /> |  | 是 | 二维码尺寸 |

<a name="aHYX7"></a>
### 二维码位置信息: QrcodePositionInfo
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| width | Number | <br /> |  | 是 | 宽度 |
| height | Number | <br /> |  | 是 | 高度 |
| src | String |  |  | 是 | 图片地址 |
| imagePositionInfo | [ImageResult](#CjngK) |  |  |  | 当有二维码图片时，返回二维码图片的位置信息 |

<a name="Pr2Pq"></a>
# 文字
<a name="YcFLF"></a>
## 创建文字: createText(params: [TextDrawParams](#n4sLe), fn?: TextFn) => Promise<[TextPositionInfo](#LIlOW)>
<a name="n4sLe"></a>
### TextDrawParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| text | String |  |  |  | 文字内容支持\\n换行 |
| textIndent | Number |  |  |  | 首行缩进 |
| lastWidth | Number | <br /> | <br /> |  | 当限制行数时, 最后一行宽度 |
| font | [TextFontParams](#SfwWl) |  |  |  | 字体样式 |
| line | [TextLine](#zXSMS) |  |  |  | 文字行高/行数/下划线之类的样式参数 |
| textAlgin | String | normal | normal: 默认<br />center: 居中对齐<br />right: 靠右对齐 |  | 文字对齐方式 |
| divider | [TextDivider](#Irsu4) |  |  |  | 文字分割线<br />大概意思就是文字前后加一个和文字垂直对其的横线<br />tips: 只有在textAlgin为center时才起作用 |
| textRect | [TextRectParams](#zmvIK) |  |  |  | 文字边框(当绘制模式为2d绘制时能完美的和文字对齐) |
| highlightText | [HighlightText](HighlightText参数类型)[] |  |  |  | 高亮文字 |
| positionInfo | [TextPositionInfo](#LIlOW) |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| alpha | Number | 1 |  |  | 透明度 |
| rotate | Number | 0 |  |  | 旋转角度 |
| lineStyle | [LineStyleParams](#F2QBi) |  |  |  | 线条样式 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |
| shadow | [ShadowParams](#yI694) |  |  |  | 阴影 |

<a name="JMub1"></a>
## getTextUtilsMethod获取文字工具类方法(getTextPositionInfo方法需要从这里导出)
| 属性名称 | 类型 | 描述 |
| --- | --- | --- |
| [getTextPositionInfo](#lFoSS) | Funcation | 获取文字位置信息: |
| [getTextDrawInfo](#IkH0J) | Funcation | 获取文字绘制信息 |
| [measureText](#d8lwY) | Funcation | 计算文字大小 |

<a name="lFoSS"></a>
## 获取文字位置信息: getTextPositionInfo(params: [TextPositionInfoParams](#bIeSy)) => [TextPositionInfo](#LIlOW)
<a name="bIeSy"></a>
### TextPositionInfoParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| width | Number |  |  |  | 文字宽度 |
| text | String |  |  |  | 文字内容支持\\n换行 |
| textIndent | Number |  |  |  | 首行缩进 |
| lastWidth | Number | <br /> | <br /> |  | 当限制行数时, 最后一行宽度 |
| font | [TextFontParams](#SfwWl) |  |  |  | 字体样式 |
| line | [TextLine](#zXSMS) |  |  |  | 文字行高/行数/下划线之类的样式参数 |
| textAlgin | String | normal | normal: 默认<br />center: 居中对齐<br />right: 靠右对齐 |  | 文字对齐方式 |
| divider | [TextDivider](#Irsu4) |  |  |  | 文字分割线<br />大概意思就是文字前后加一个和文字垂直对其的横线 |
| textRect | [TextRectParams](#zmvIK) |  |  |  | 文字边框(当绘制模式为2d绘制时能完美的和文字对齐) |
| highlightText | [HighlightText](HighlightText参数类型)[] |  |  |  | 高亮文字 |
| positionInfo | [TextPositionInfo](#LIlOW) |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |
| drawInfo | [TextDrawInfo](#KMnsu) |  |  |  | 文字绘制信息 |

<a name="IkH0J"></a>
### 获取文字绘制信息: getTextDrawInfo(params: TextDrawInfoParams) => TextDrawInfo
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number | 0 |  |  | 水平方向位置 |
| y | Number | 0 |  |  | 垂直方向位置 |
| color | String | #000000 |  |  | 颜色 |
| width | Number |  |  |  | 文字宽度 |
| text | String |  |  |  | 文字内容支持\\n换行 |
| textIndent | Number |  |  |  | 首行缩进 |
| lastWidth | Number | <br /> | <br /> |  | 当限制行数时, 最后一行宽度 |
| font | [TextFontParams](#SfwWl) |  |  |  | 字体样式 |
| line | [TextLine](#zXSMS) |  |  |  | 文字行高/行数/下划线之类的样式参数 |
| textAlgin | String | normal | normal: 默认<br />center: 居中对齐<br />right: 靠右对齐 |  | 文字对齐方式 |
| divider | [TextDivider](#Irsu4) |  |  |  | 文字分割线<br />大概意思就是文字前后加一个和文字垂直对其的横线 |
| textRect | [TextRectParams](#zmvIK) |  |  |  | 文字边框(当绘制模式为2d绘制时能完美的和文字对齐) |
| highlightText | [HighlightText](HighlightText参数类型)[] |  |  |  | 高亮文字 |
| positionInfo | [TextPositionInfo](#LIlOW) |  |  |  | 传递了位置信息则之前获取位置信息传入的参数在这个方法中不必传入 |
| window | [WindowParams](#ug9bh) |  |  |  | 窗口对齐方式 |

<a name="d8lwY"></a>
### 计算文字大小: measureText(text: string, fontSize: nunber) => [UniAppTextMetrics](#vCsn2)
<a name="FA3AZ"></a>
### 文字位置信息: TextPositionInfo
| 属性名称 | 类型 | 描述 |
| --- | --- | --- |
| startX | Number | 水平方向开始位置 |
| endX | Number | 水平方向结束位置 |
| startY | Number | 垂直方向开始位置 |
| endY | Number | 垂直方向结束位置 |
| width | Number | 内容宽度 |
| height | Number | 内容高度 |
| drawInfo | [TextDrawInfo](#KMnsu) | 文字绘制信息 |

<a name="KMnsu"></a>
### TextDrawInfo内容信息
| 属性名称 | 类型 | 描述 |
| --- | --- | --- |
| drawInfo | [TextRowData](#Yukzz)[] | 文字绘制信息(可以拿出来自行调用context.drawText方法绘制) |
| textRowWidth | Number[] | 文字每一行的宽度 |
| maxWidth | Number | 文字的最大宽度 |
| minWidth | Number | 文字的最小宽度 |
| originWidth | Number | 原先设置的宽度 |
| height | Number | 文字高度 |
| dividerInfo | [DividerInfoItem[]](#xiGhR) | 分割线信息 |

<a name="Yukzz"></a>
### TextRowData内容信息
| 属性名称 | 类型 | 描述 |
| --- | --- | --- |
| length | Number | 文字长度 |
| text | String | 文字内容 |
| font | [TextFont](#YwCTg) | 文字字体 |
| fontSize | Number | 文字大小 |
| fontText | String | 文字样式 |
| startX | Number | 文字起始的水平方向位置 |
| startY | Number | 文字起始的垂直方向位置 |
| lineDrawInfo | [TextLineDrawInfo](#moB0N) | 绘制线条的信息 |
| limitText | String | 当限制文字行数时，最后一条文字隐藏时的内容 |
| color | String | 字体颜色 |
| rowIndex | Number | 文字当前行数 |
| textMetrics | [UniAppTextMetrics](#vCsn2) | 字体信息只在2d的时候数据才是完整的 |

<a name="vCsn2"></a>
### UniAppTextMetrics内容信息
| 属性名称 | 类型 | 描述 |
| --- | --- | --- |
| width | number | 文字宽度 |
| actualBoundingBoxAscent | number | 从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的矩形边界顶部的距离，使用 CSS 像素计算 |
| actualBoundingBoxDescent | number | 从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的矩形边界底部的距离，使用 CSS 像素计算 |
| actualBoundingBoxLeft | number | 从CanvasRenderingContext2D.textAlign 属性确定的对齐点到文本矩形边界左侧的距离，使用 CSS 像素计算 |
| actualBoundingBoxRight | number | 从CanvasRenderingContext2D.textAlign 属性确定的对齐点到文本矩形边界右侧的距离，使用 CSS 像素计算 |
| fontBoundingBoxAscent | number | 从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的所有字体的矩形最高边界顶部的距离，使用 CSS 像素计算 |
| fontBoundingBoxDescent | number | 从CanvasRenderingContext2D.textBaseline 属性标明的水平线到渲染文本的所有字体的矩形边界最底部的距离，使用 CSS 像素计算 |

<a name="xiGhR"></a>
### DividerInfoItem内容信息
| 属性名称 | 类型 | 描述 |
| --- | --- | --- |
| x | number | 水平位置 |
| y | number | 垂直位置 |
| color | string | 线条颜色 |
| width | number | 线条宽度 |
| height | number | 线条的高度 |
| lineStyle | [LineStyleParams](#F2QBi) | 线条样式 |

<a name="YwCTg"></a>
### TextFont内容信息
| 属性名称 | 类型 | 描述 |
| --- | --- | --- |
| size | number | 字体大小 |
| family | string | 什么字体 |
| style | string | 字体样式 |
| weight | string &#124; Number | 字体粗细 |
| fontText | String | 设置的字体总格式 |

<a name="moB0N"></a>
### TextLineDrawInfo内容信息
| 属性名称 | 类型 | 描述 |
| --- | --- | --- |
| x | number | 水平方向位置 |
| y | number | 垂直方向位置 |
| width | number | 线条宽度 |
| height | number | 线条高度 |
| color | string | 线条颜色 |
| style | string | 线条样式 |
| type | string | 线条类型 |

<a name="SfwWl"></a>
### TextFontParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| size | Number |  |  |  | 文字大小 |
| family | String |  |  |  | 什么字体 |
| style | String | noraml | normal: 默认<br />italic: 斜体<br />oblique: 倾斜 |  | 字体样式 |
| weight | String &#124; Number | 400 |  |  | 字体粗细 |

<a name="zXSMS"></a>
### TextLine参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| num | Number | -1 |  |  | 行数<br />-1: 不限制行数 |
| height | Number |  |  |  | 文字行高<br />默认和字体大小一样 |
| type | String | normal | normal: 不显示线条<br />underline: 下划线<br />lineThrough: 删除线 |  | 线条类型 |
| style | String | solid | solid: 实线<br />dashed: 虚线 |  | 线条样式 |
| width | Number | 1 |  |  | 线条宽度(粗细) |
| color | String |  |  |  | 线条颜色<br />默认和字体颜色一致 |

<a name="Irsu4"></a>
### TextDivider参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| show | Boolean | false |  |  | 是否显示 |
| height | Number | 1 |  |  | 线条的高度 |
| color | String |  |  |  | 线条的颜色<br />默认和字体颜色一致 |
| gap | Number | 10 |  |  | 线条于文字的间隔大小 |
| style | String | solid | solid: 实线<br />dashed: 虚线 |  | 线条样式 |
| pattern | [Number, Number] | [10, 5] |  |  | 一组描述交替绘制线段和间距（坐标空间单位）长度的数字 |
| offset | Number | 10 |  |  | 线条的偏移量 |
| cap | String | butt | butt<br />round<br />square |  | 线条两端样式 |

<a name="zmvIK"></a>
### TextRectParams参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| show | Boolean | false |  |  | 是否显示 |
| vorizontal | Number |  |  |  | 水平(左右两边的间隔大小) |
| vertical | Number |  |  |  | 垂直(上下两边的间隔大小) |
| xxx | [RectDrawParams](#AOvp5) |  |  |  | 除了width, height属性之外的<br />所有绘制矩形参数 |

<a name="tX5SK"></a>
### HighlightText参数类型
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| text | String |  |  | 是 | 高亮文字 |
| color | String |  |  |  | 重置的颜色 |
| font | [TextFontParams](#SfwWl) |  |  |  | 重置的字体样式 |
| line | [TextLine](#zXSMS) |  |  |  | 重置的线条样式 |
| siblingsAlgin | String | top | center: 水平对齐<br />top: 靠上对齐<br />bottom: 靠下对齐 |  | 高亮文字和其他兄弟文字的对其方式 |
| siblingsNum | Number | 0 |  |  | 和兄弟字体对齐的差值因为在不同端，绘制字体的位置都不一样，设置这个属性可以改变在不同端不一样导致的差异 |

<a name="ibIT6"></a>
# 特殊类型参数
<a name="XHNg4"></a>
## 填充样式参数: FillStyleParams
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| color | String | #000000 |  |  | 颜色(优先级最低) |
| fillMode | String | fill | fill: 填充<br />stroke: 线性<br />all: 填充和线性都要 |  | 填充类型 |
| fillColor | String |  |  |  | 当fileMode为fill/all时填充部分的颜色 |
| strokeColor | String |  |  |  | 当fileMode为stroke/all时线性部分的颜色 |
| lineWidth | Number |  |  |  | 边框大小优先级大于最外层的 |
| setColor | Boolean | true |  |  | 是否设置颜色,在绘制图片时默认为false, 防止绘制图片时会有背景色,如果想要让图片也有背景色请设置为true |

<a name="F2QBi"></a>
## 线条样式参数: LineStyleParams
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| style | String | solid | solid: 实线<br />dashed: 虚线 |  | 线条样式 |
| pattern | [Number, Number] | [10, 5] |  |  | 一组描述交替绘制线段和间距（坐标空间单位）长度的数字 |
| offset | Number | 10 |  |  | 线条的偏移量 |
| cap | String | butt | butt<br />round<br />square |  | 线条两端样式 |

<a name="ug9bh"></a>
## 窗口对齐参数: WindowParams
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| algin | Stirng | normal | normal: 默认<br />right: 靠右对齐<br />center: 靠左对齐 |  | 窗口对齐方式 |
| rightGap | Number | 0 |  |  | 窗口又对齐时, 右边的间隔距离 |

<a name="yI694"></a>
## 阴影参数: ShadowParams
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| show | Boolean | false |  |  | 是否显示 |
| x | Number | 0 |  |  | 阴影相对于形状在水平方向的偏移 |
| y | Number | 0 |  |  | 阴影相对于形状在竖直方向的偏移 |
| color | Stirng | #000000 |  |  | 阴影颜色 |
| blur | Number | 0 |  |  | 阴影的模糊级别 |

<a name="d6fJX"></a>
## 渐变参数: GradientParams
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| show | Boolean | false |  |  | 是否显示 |
| type | String | linear | linear: 线性渐变<br />circular: 圆心渐变 |  | 渐变类型 |
| colors | [GradientColor](#Ww7Hx) |  |  | 是 | 渐变颜色 |
| linearPosition | [LinearPositionParams](#Edykw) |  |  | type为linear时是必填 | 线性渐变位置信息 |
| circularPosition | [CirclePositionParams](#e9Uj7) |  |  | type为circular时是必填 | 圆心渐变位置信息 |

<a name="Ww7Hx"></a>
### 渐变颜色参数: GradientColor[](这是一个对象数组！！！)
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| stop | Number | 0 | 0~1 | 是 | 表示渐变点在起点和终点中的位置 |
| color | String | #000000 |  | 是 | 渐变点的颜色 |

<a name="Edykw"></a>
### 线性渐变位置信息参数: LinearPositionParams
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x0 | Number |  |  | 是 | 起点的x坐标 |
| x1 | Number |  |  | 是 | 终点的x坐标 |
| y0 | Number |  |  | 是 | 起点的y坐标 |
| y1 | Number |  |  | 是 | 终点的y坐标 |

<a name="e9Uj7"></a>
### 圆心渐变位置信息参数: CirclePositionParams
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| x | Number |  |  | 是 | 圆心的x坐标 |
| y | Number |  |  | 是 | 圆心的y坐标 |
| r | Number |  |  | 是 | 圆的半径 |

<a name="V0nf5"></a>
## 重置canvas宽高: setCanvasStyle(width: number, height: number, wait: number): { width: string, height: string }->返回style
| 属性名称 | 类型 | 默认值 | 可选值 | 是否必填 | 描述 |
| --- | --- | --- | --- | --- | --- |
| width | number |  |  | 是 | 画布宽度 |
| height | number |  |  | 是 | 画布高度 |
| wait | numver | 200 |  |  | 导出新内容时的延迟时间 默认200 |

