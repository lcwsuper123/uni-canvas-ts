<template>
    <view class="main">
        <navigator class="nav" url="/pages/index/autoHeight">绘制内容宽高不确定</navigator>
        <navigator class="nav" url="/pages/index/autoBackground">画布背景宽高不确定</navigator>
        <navigator class="nav" url="/pages/index/poster">海报分享图</navigator>
        <navigator class="nav" url="/pages/index/jsonPoster">JSON-海报分享图</navigator>
    </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
#main{
    overflow: hidden;
}
.button{
    width: 200rpx;
    margin: 0 auto;
    height: 80rpx;
    @include flex-xy-center;
}
#poster{
    margin-bottom: 20rpx;
    // position: fixed;
    // left: -9999rpx;
    // top: -9999rpx;
}
.image{
    width: 750rpx;
    display: block;
    margin-bottom: 100rpx;
}
.nav{
    width: 750rpx;
    height: 80rpx;
    @include flex-xy-center;
    background-color: #eee;
}
</style>
