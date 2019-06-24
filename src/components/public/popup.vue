<template>
    <section class="popup">
        <div class="popupBox" v-if="gameClose">
            <!--<i class="iconX"></i>-->
            <i class="time"></i>
            <div class="tip">
                <p>该彩种已停售</p>
                <!--<strong>已停售，售彩时间：</strong>-->
                <!--<strong>2019-04-10 10：00：00</strong>-->
                <!--<strong>2019-04-10 10：00：00</strong>-->
                <router-link to="/">前往其他彩种</router-link>
            </div>
        </div>
        <div class="popupBox" v-else>
            <i class="iconX" @click="$emit('isClose')"></i>
            <i class="isBank"></i>
            <div class="tip">
                <p>请先绑定银行卡</p>
                <strong>为保障您的账号安全，需先成功</strong>
                <strong>绑定银行卡才能进行安全提现。</strong>
                <router-link to="/band-bankcard">立即绑定</router-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "alert",
        props: {
            gameClose: { // 彩种停售
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .popup {
        position: absolute; top: 0; left: 0; z-index: 99; width: 100%; height: 100%; background: rgba(0,0,0,.4);
        .popupBox {
            position: absolute; top: 50%; left: 50%; width: 86%; margin-left: -43%;  padding: 50px 35px 40px; border-radius: 6px; background: white; color: #999; font-size: 28px; transform: translateY(-50%);
            .iconX {
                position: absolute; top: 27px; right: 24px; width: 26px; height: 26px; background: url("~@/assets/image/play/icon-close2.png") no-repeat center; background-size: 100%;
            }
            .time {
                display: block; width: 163px; height: 145px; margin: 0 auto 40px; background: url("~@/assets/image/play/clokc.png") no-repeat center; background-size: 100% 100%;
            }
            .isBank {
                display: block; width: 254px; height: 145px; margin: 0 auto 40px; background: url("~@/assets/image/play/bank.png") no-repeat center; background-size: 100% 100%;
            }
            .tip {
                color: #666;
                p {
                    margin: 0 0 20px; color: #000; font-size: 34px; line-height: 34px; text-align: center;
                }
                strong {
                    display: block; font-size: 28px; line-height: 28px; text-align: center; margin-bottom: 15px;
                }
                a {
                    display: block; width: 100%; height: 80px; margin: 50px 0 0; color: white; font-size: 35px; line-height: 80px; text-align: center; border-radius: 6px; background: $theme-color;
                }
            }
        }
    }
</style>
