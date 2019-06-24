<template>
    <section class="payDetails">
        <TrayHeader :title="title" />
        <div class="payList">
            <strong class="payOk">订单确认成功</strong>
            <ol class="list">
                <li>
                    <span>交易金额</span>
                    <strong>{{coin}}元</strong>
                </li>
                <li>
                    <span>交易时间</span>
                    <strong>{{time}}元</strong>
                </li>
                <li>
                    <span>投注详情</span>
                    <a @touchstart="$router.push({path: '/orderDetails', query: {id: Number(orderId)}})">查看</a>
                </li>
                <li>
                    <span>交易订单</span>
                    <strong>{{orderNum}}</strong>
                </li>
            </ol>
        </div>
        <a @touchstart="goBack()" class="complete">完成</a>
    </section>
</template>

<script>
    import {formatDate} from '@/assets/js/util'
    const TrayHeader = import('../public/rn-header')
    export default {
        name: "payDetails",
        components: {
            TrayHeader () {
                return {
                    component: TrayHeader
                }
            }
        },
        data () {
            return {
                title: '账单详情',
                coin: '', // 交易金额
                time: '', // 交易时间
                orderId: '', // 订单ID
                orderNum: '' // 订单编号
            }
        },
        methods: {
            goBack () {
                window.history.go(-1)
            }
        },
        created () {
            let obj = JSON.parse(sessionStorage.getItem('orderInfo'))
            let time = new Date(obj.successTime * 1000)
            this.coin = obj.coin, this.orderId = obj.id, this.orderNum = obj.order_id, this.time = formatDate(time, 'yyyy-MM-dd hh:mm:ss')
        }
    }
</script>

<style scoped lang="scss">
    .payDetails {
        height: 100%; background: #f3f3f3;
        .payList {
            background: white; padding: 50px 40px 0; color: #333; font-size: 28px;
            .payOk {
                display: block; width: 300px; margin: 0 auto 92px; padding-top: 180px; text-align: center; font-size: 34px;
                background: url("~@/assets/image/system/roundcheckfillOk.png") no-repeat top center; background-size: 160px 160px;
            }
            .list {
                padding: 53px 0 12px; border-top: 1px solid #d2d2d2;
                li {
                    height: 40px; line-height: 40px; font-size: 28px; margin-bottom: 26px;
                    span {
                        float: left; width: 150px; color: #999; text-align: left;
                    }
                    a { color: #3F8FEB; }
                }
            }
        }
        .complete {
            display: block; width: 650px; height: 100px; margin: 60px auto 0; font-size: 34px; line-height: 100px; background: $theme-color; border-radius: 6px; text-align: center;
        }
    }
</style>
