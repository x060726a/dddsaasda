<template>
    <!--<section class="establish">-->
        <section class="maskReleaseaCon">
            <i class="iconX" @touchstart="$emit('clxRele')"></i>
           <div class="listDetails">
               <h3 class="esTitle">创建跟单</h3>
               <p class="info">
                   <span>投注彩种：{{lotteryName}}</span>
                   <span>方案金额：{{Amount}}元</span>
               </p>
               <div class="details">
                   <div class="secrecy clearfix">
                       <em class="f">保密设置</em>
                       <p class="state f">
                           <strong v-for="(res, key) in secrecy" :key="key" :class="{'secrecyKey' : key == statusKey}" @touchstart.stop="statusKey = key">{{res}}</strong>
                       </p>
                   </div>
                   <div class="declaration">
                       <em class="f">方案宣言</em>
                       <input type="text f" v-model="announce" placeholder="最多可以输入30个字" maxlength="30" />
                   </div>
                   <p class="documentary">
                       <label for="trackd" :class="{'label' : checkedBox}">
                           <input type="checkbox" id="trackd" class="checkbox" ref="checkTrack">允许他人跟单
                       </label>
                       &nbsp;( 佣金10%，发单人所得4% )
                   </p>
                   <div class="pay clearfix">
                       <span class="f">起跟金额</span>
                       <p class="f">
                           <i class="icon f" @touchstart.prevent="subNum()">-</i>
                           <input type="text" class="f" v-model="min_coin" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' maxlength="6">
                           <i class="icon f" @touchstart.prevent="subNums()">+</i>
                       </p>
                       <span class="f">元</span>
                       <strong class="gry f">起跟金额不得低于20元</strong>
                   </div>
                   <!--<div class="odds clearfix">-->
                   <!--<label for="track" class="f" :class="{'label' : checkOdds}" @touchstart.stop="ischecked(false)">-->
                   <!--<input type="checkbox" id="track" class="checkbox" ref="checkOdds">-->
                   <!--</label>-->
                   <!--<p class="f">-->
                   <!--<em class="f">保障赔率</em>-->
                   <!--<input type="text" class="f" v-model="odds" maxlength="6" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' />-->
                   <!--<em class="gry">（中奖赔率小于该赔率，不收取佣金）</em>-->
                   <!--</p>-->
                   <!--</div>-->
               </div>
           </div>
            <button class="subPay" @touchstart.prevent="payBet()">确认支付</button>
        </section>
    <!--</section>-->
</template>

<script>
    const TrayHeader = import('../public/rn-header')
    export default {
        name: "establishDocumentary",
        components: {
            TrayHeader () {
                return {
                    component: TrayHeader
                }
            }
        },
        props: {
            lotteryName: String, // 彩种名称
            Amount: '' // 金额
        },
        data () {
            return {
                title: '创建跟单',
                firstClick: true, // 防止用户投注重复点击
                validnote: null, // 跟单数据
                userInfo: '', // 用户信息
                gameData: null, // 投注信息
                announce: '', // 跟单宣言
                coin: 10,
                min_coin: 50, // 最小跟单金额
                min_nums: 1, // 最小跟投数量
                odds: '0.0', // 赔率
                secrecy: ['保密', '开奖后公开', '公开'], // 保密设置
                statusKey: 1, // 保密key值
                icon: true,
                checkedBox: true // 允许他人跟单
            }
        },
        methods: {
            subNum () {
                // this.min_coin = Number(this.min_coin)
                this.min_coin -= this.coin
                if (this.min_coin < 20) this.min_coin = 20
            },
            subNums () {
                this.min_coin = Number(this.min_coin)
                this.min_coin += this.coin
            },
            payBet () {
                if (this.min_coin < 20) return this.$vux.toast.text('起跟金额不得低于20元', 'middle')
                let key = 0
                if (this.secrecy[this.statusKey] == '保密') key = 0
                if (this.secrecy[this.statusKey] == '公开') key = 1
                if (this.secrecy[this.statusKey] == '开奖后公开') key = 2
                let initiateBet = {
                    announce: this.announce.toString(),
                    min_coin: this.min_coin.toString(),
                    min_nums: this.min_nums.toString(),
                    status: key.toString()
                }
                this.$emit('subInfo', initiateBet)
            }
        }
    }
</script>

<style scoped lang="scss">
    .maskReleaseaCon {
        position: absolute; top: 15%; left: 50%; width: 94%; margin: 0 -47%; padding: 70px 25px 35px; background: white; border-radius: 6px;
        .iconX {
            position: absolute; top: 25px; right: 25px; width: 26px;height: 26px; background: url("~@/assets/image/play/icon-close2.png") no-repeat center; background-size: cover;
        }
        .listDetails {
            border: 1px solid #d2d2d2; border-radius: 6px;
            .esTitle {
                height: 80px; color: white; text-align: center; font-size: 32px; line-height: 80px; background: $theme-color;
            }
            .info {
                display: flex; height: 70px; color: #333; font-size: 26px; background: white; border-bottom: 1px solid #d2d2d2;
                span {
                    flex: 1; height: 40px; text-align: center; line-height: 40px; margin-top: 15px; box-shadow: 1px 0 #d2d2d2;
                }
            }
            .details {
                padding: 30px 0 30px 20px; background: white; color: #333; font-size: 24px;
                .f { float: left; }
                .gry { color: #999; font-size: 24px; }
                input {
                    border: 1px solid #d2d2d2; border-radius: 6px; box-sizing: content-box;
                }
                label {
                    position: relative; padding-left: 50px; height: 30px;
                    input { display: none; }
                }
                label:before {
                    content: '';
                    position: absolute; top: 1px; left: 0; width: 30px; height: 30px;
                    background: url("~@/assets/image/play/square.png")no-repeat center; background-size: cover;
                }
                .label:before {
                    background: url("~@/assets/image/play/icon-check2.png")no-repeat center; background-size: cover;
                }
                .secrecy {
                    line-height: 64px;
                    .state {
                        display: flex; width: 490px; margin-left: 15px; border: 1px solid #d2d2d2; border-radius: 6px;
                        strong {
                            float: left; width: 30%; height: 60px; line-height: 60px; text-align: center; font-size: 26px; border-right: 1px solid #d2d2d2;
                        }
                        strong:nth-child(2) { width:  40%;}
                        strong:last-child { border: none; }
                        .secrecyKey {
                            color: white; background: #d9342f;
                        }
                    }
                }
                .declaration {
                    margin: 35px 0 40px; line-height: 60px;
                    input {
                        width: 466px; height: 58px; line-height: 58px; padding: 0 0 0 18px;  margin-left: 15px;
                    }
                }
                .documentary {
                    height: 33px; line-height: 33px;
                }
                .pay {
                    margin: 35px 0 0; line-height: 60px;
                    p {
                        margin: 0 15px; border: 1px solid #d2d2d2; border-radius: 6px;
                        .icon {
                            width: 55px; height: 60px; line-height: 58px; color: #999; font-size: 42px; text-align: center;
                        }
                        input {
                            width: 90px; height: 24px; padding: 18px 0; color: #d9342f; text-align: center; border-left: 1px solid #d2d2d2; border-right: 1px solid #d2d2d2;
                            border-top: none; border-bottom: none; border-radius: 0;
                        }
                    }
                    span { margin-right: 10px; }
                }
                .odds {
                    line-height: 48px;
                    label:before {
                        top: 10px;
                    }
                    input {
                        width: 120px; margin: 0 8px; height: 24px; padding: 10px 0; text-align: center;
                    }
                }
            }
        }
        .subPay {
            display: block; width: 100%; height: 80px; margin: 35px auto 0; color: white; font-size: 34px; background: $theme-color; text-align: center; border-radius: 6px;
        }
    }
</style>
