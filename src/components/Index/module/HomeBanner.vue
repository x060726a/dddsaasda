<template>
    <div class="banner">
        <!--轮播-->
        <div class="swiper-container" ref="swiperContainer">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="ele in banner">
                    <!-- <img :src="ele" title="易趣彩票" @click="$router.push({path: 'ruleDetails', query: {id: 666, title: '活动详情'}})" /> -->
                    <img :src="ele" title="易趣彩票" @click="$router.push({path: '/activity'})" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeBanner",
        props: {
            banner: Array
        },
        mounted(){
            this.$nextTick(()=>{
                var mySwiper = new Swiper ('.swiper-container', {
                    centeredSlides:true, // 居中显示
                    autoplay: {
                        delay: 3000, // 3秒切换一次
                        disableOnInteraction: false, // 用户操作后不停止
                    },
                    loop: true, // 循环
                    initialSlide: 1, // 初始化索引
                    slidesPerView : 'auto',
                    loopedSlides: 3
                })
            })
        },
    }
</script>

<style lang="scss" scoped>
    .banner{
        padding: 20px 0; background: white;
    }
    .swiper-container {
        width: 100%;
        height: 320px;
        overflow: inherit;
        .swiper-slide{
            width:86%!important;
            transform: scale(0.93,0.8);
            transition: transform .2s ease;
            img{
                width:100%;
                height: 100%;
                border-radius: 16px;
            }
            a {
                display: block;

            }
        }
        .swiper-slide-active{
            transform: scale(1);
            img{
                box-shadow: 0px 1px 20px #666;
            }
        }
    }
</style>
