<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
</script>
<style lang="scss">
view,
text,
navigator,
swiper,
swiper-item,
scroll-view,
web-view,
button,
label,
input,
textarea{
    word-break: break-all;
    box-sizing: border-box;
    font-family: Inter;
    font-weight: 400;
    &::before, &::after{
        word-break: break-all;
        box-sizing: border-box;
    }
}
/* 按钮样式处理 */
button{
    background-color: transparent;
    border: 0;
    width: auto;
    height: auto;
    outline: none;
    padding: 0;
    margin: 0;
    line-height: 1.4;
    border-radius: 0px;
    text-align: left;
    &::after{
        border: none;
    }
}
/* 取消按钮默认的边框线效果 */
button:after{
    border: none !important;
}
image{
    display: block;
    box-sizing: border-box;
}
.text-one{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.text-two{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: justify;
}
.text-three{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-align: justify;
}
.hava-sticky{
    position: sticky;
    top: 0;
    z-index: 99;
}
@for $i from 1 through 40 {
    .p-t-#{$i * 5}{
        padding-top: 5rpx * $i;
    }
    .p-b-#{$i * 5}{
        padding-bottom: 5rpx * $i;
    }
    .p-r-#{$i * 5}{
        padding-right: 5rpx * $i;
    }
    .p-l-#{$i * 5}{
        padding-left: 5rpx * $i;
    }
    .m-t-#{$i * 5}{
        margin-top: 5rpx * $i;
    }
    .m-b-#{$i * 5}{
        margin-bottom: 5rpx * $i;
    }
    .m-r-#{$i * 5}{
        margin-right: 5rpx * $i;
    }
    .m-l-#{$i * 5}{
        margin-left: 5rpx * $i;
    }
}
</style>
