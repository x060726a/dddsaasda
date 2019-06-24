<template>
    <section class="download">
        <i class="icon-left" @click="$router.push('/')"></i>
        <div class="logo"></div>
        <a class="downA" @touchstart="startCs" @touchend="endCs" ref="sub" :href="downUrl"></a>
        <div class="iphone" v-if="!isAndroid">
            <p class="downP">iphone下载安装教程</p>
            <p>[下载App后弹未受信任的开发者怎么办？]</p>
            <i class="ios1"></i>
            <i class="num">1</i>
            <p>[点击设置，打开通用，找到设备管理]</p>
            <i class="ios2"></i>
            <i class="num">2</i>
            <p>[点击信任"China Network Television"]</p>
            <i class="ios3"></i>
            <i class="num">3</i>
            <p>[点击弹框中的信任，完成！]</p>
            <i class="ios4"></i>
        </div>
    </section>
</template>

<script>
    export default {
        name: "downloadView",
        data () {
            return {
                isAndroid: null,
                downUrl: '' // 下载链接
            }
        },
        methods: {
            startCs () {
                this.$refs.sub.className='downB'
            },
            endCs () {
                this.$refs.sub.className='downA'
            },
            getDown () {
                // 判断安卓或IOS
                let u = navigator.userAgent
                this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
                this.$get('setting', {}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.isAndroid ? this.downUrl = res.data.download_android.value : this.downUrl = res.data.download_ios.value
                })
            }
        },
        created () {
            this.getDown()
        }
    }
</script>

<style scoped lang="scss">
    .download {
        position: relative; height: 100%;
        .icon-left {
            position: absolute; top: 0; left: 0; width: 78px; height: 88px; background: url("~@/assets/image/system/headback.png") no-repeat center; background-size: 26px 44px;
        }
        .logo {
            width: 100%; height: 855px; background: url("~@/assets/image/index/down.png") no-repeat center; background-size: cover;
        }
        .downA {
            display: block; width: 650px; height: 100px; margin: 140px auto 120px; background: url("~@/assets/image/index/downB.png") no-repeat center; background-size: cover;
        }
        .downB {
            display: block; width: 650px; height: 100px; margin: 140px auto 120px; background: url("~@/assets/image/index/downA.png") no-repeat center; background-size: cover;
        }
        .iphone {
            p {
                color: #666; font-size: 28px; text-align: center; line-height: 30px;
            }
            .downP {
                color: #333; font-size: 30px; margin-bottom: 50px;
            }
            .num {
                display: block; width: 40px; height: 40px; margin: 0 auto 20px; background: $theme-color; color: white; font-size: 24px; line-height: 42px; text-align: center; background: #d9342f; border-radius: 50%;
            }
            @for $i from 1 through 4 {
                .ios#{$i} {
                    display: block; width: 488px; height: 340px; margin: 30px auto 30px;  background: url("~@/assets/image/index/ios#{$i}.png") no-repeat center; background-size: cover;
                }
            }
        }
    }
</style>
