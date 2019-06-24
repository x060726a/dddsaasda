<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$root.routerGoBack"></i>
        <div class="title"><span>{{$route.query.type==0?'线上充值':'线下充值'}}</span></div>
    </div>
    <div class="content">
        <div class="item" @click="popupVisible=true"><img :src="queryObj.icon"><span>{{queryObj.third_name}}</span><i class="iconB"></i></div>
        <div v-if="discountName == '请选择优惠活动'" class="text">优惠充值最低金额{{discountMoney}}元</div>
        <div v-else class="text" style="color: #d9342f;">优惠充值最低金额{{discountMoney}}元</div>
        <div class="rgDiscount" @click="popupDiscount = true">
            <p class="rgText">
                <span>优惠</span>
                <strong v-if="discountName == '请选择优惠活动'">{{discountName}}</strong>
                <strong v-else class="sg">{{discountName}}</strong>
            </p>
            <i class="iconB"></i>
        </div>
        <div class="text">最多可充值{{queryObj.maxpay}}元</div>
        <div class="block1">
            <form action="https://cp-payend.jinriliuhetest.com/pay/pay" method="post" ref="form">
                <div class="input-wrap">
                    <p class="rgText">
                        <span>金额</span>
                        <input type="number" v-model="money" placeholder="请输入充值金额" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' oninput="if(value.length>8)value=value.slice(0,8)"  />
                    </p>
                    <!--<group class="xy-cell"><x-input title="金额" ref="moneyinput" keyboard="number" type="number" @on-change="change" placeholder="请输入充值金额"></x-input></group>-->
                    <input type="hidden" name="coin" :value="money">
                    <input type="hidden" name="sys_bank_id" :value="queryObj.id">
                    <input type="hidden" name="token" :value="token">
                    <input type="hidden" name="promotion_id" :value="promotion_id">
                    <button type="submit" ref="submit" class="button-sy"></button>
                </div>
                <div class="pad21"></div>
                <div class="kscz">快速充值</div>
                <div class="group-btn">
                    <div @click="chooseCion(20)" :class="{active:money==20}">20元</div>
                    <div @click="chooseCion(50)" :class="{active:money==50}">50元</div>
                    <div @click="chooseCion(100)" :class="{active:money==100}">100元</div>
                    <div @click="chooseCion(200)" :class="{active:money==200}">200元</div>
                    <div @click="chooseCion(500)" :class="{active:money==500}">500元</div>
                    <div @click="chooseCion(1000)" :class="{active:money==1000}">1000元</div>
                </div>
            </form>
        </div>
        <div class="xy-btn" @click="recharge">确认支付</div>
    </div>
    <!--充值方式-->
    <popup v-model="popupVisible" position="bottom" class="bankcard-pancel">
        <div class="popup-head"><span @click="popupVisible=false">取消</span><span @click="confirm">确定</span></div>
        <picker :data='data1' :fixed-columns="1" :columns="3" v-model='data1Value'></picker>
    </popup>
    <!--充值优惠-->
    <div v-transfer-dom >
        <popup v-model="popupDiscount" position="bottom" class="bankcard-pancel ignore">
            <div class="popup-head"><span @click="popupDiscount=false">取消</span><span @click="confirmType">确定</span></div>
            <picker :data='discountData' :fixed-columns="1" :columns="3" v-model='discountValue'></picker>
        </popup>
    </div>
</div>
</template>
<script>
import Vuecookie from 'vue-cookie'
export default {
    data(){
        return{
            money:20,
            popupVisible:false,
            popupDiscount: false, // 充值优惠
            queryObj:'',
            data1Value:[''],
            data1:[],
            discountDatas: [],
            discountData: ['请选择优惠活动'],
            discountValue: [],
            promotion_id: 0, // 充值优惠ID
            discountName: '请选择优惠活动',
            discountMoney: '',  // 优惠充值最低金额
            ip:'ip',
            token:Vuecookie.get('webToken')
        }
    },
    beforeCreate(){
        var script = document.createElement("script")
        script.src = 'https://pv.sohu.com/cityjson?ie=utf-8'
        script.id = 'sohuip'
        var app = document.getElementsByTagName('head')[0]
        app.appendChild(script)
    },
    created(){
        this.getRgDiscount()
        var newArr = JSON.parse(this.$route.query.list)
        this.queryObj = newArr[0]
        newArr.forEach(ele => {
            this.data1.push(ele.third_name)
        });
    },
    mounted(){
        this.$nextTick(()=>{
            this.$refs.moneyinput.$el.children[1].children[0].value = 20
        })
    },
    methods:{
        confirm(){
            this.popupVisible = !this.popupVisible
            this.queryObj = this.getId(this.data1Value[0]);
        },
        change(value){
            this.money = Number(value)
        },
        // 充值优惠选择
        confirmType () {
            this.discountName = this.discountValue[0]
            this.discountDatas.some(res => {
                if (this.discountName == res.name) this.discountMoney = res.minimum_deposit, this.promotion_id = res.id
            })
            if (this.discountName == '请选择优惠活动') this.promotion_id = 0
            this.popupDiscount = false
            console.log(this.discountValue, this.discountMoney, this.promotion_id)
        },
        //选择金额
        chooseCion(num){
            this.money = Number(num)
            this.$refs.moneyinput.$el.children[1].children[0].value = Number(num)
            this.$refs.moneyinput.$el.children[1].children[0].blur()
        },
        // 获取充值优惠
        getRgDiscount () {
            this.$get('rgDiscount', {}).then(res => {
                if (res.code !== 0) return
                this.discountDatas = res.data
                this.discountMoney = this.discountDatas[0].minimum_deposit
                res.data.some(res => {
                    this.discountData.push(res.name)
                })
            })
        },
        // 确认充值
        recharge(){
            var that = this
            // console.log(this.queryObj)
            if(that.money<this.queryObj.minpay){
                this.$vux.toast.text('最小充值金额为'+this.queryObj.minpay+'元','bottom')
                return;
            }
            if(that.money>this.queryObj.maxpay){
                this.$vux.toast.text('最大充值金额为'+this.queryObj.maxpay+'元','bottom')
                return;
            }
            if (this.discountName != '请选择优惠活动' && this.money < Number(this.discountMoney)) return  this.$vux.toast.text(`该活动最低充值${Number(this.discountMoney)}元`, 'bottom')
            if(!returnCitySN["cip"]){
                this.$vux.toast.text('请稍候','bottom')
                return;
            }
            that.$vux.confirm.show({
                title:'温馨提示',
                content:'您确认充值'+that.money+'元吗？',
                confirmText:'确认',
                onConfirm () {
                    if(that.$route.query.type==0){
                        // that.$refs.submit.click()
                        var obj = that.$qs.stringify({
                            coin:that.money,
                            sys_bank_id:that.queryObj.id,
                            token:that.token,
                            promotion_id: that.promotion_id
                        })
                        console.log(obj)
                        that.$http.post('/pay/pay',obj).then(res=>{
                            // console.log(res.data)
                            // console.log(that.$route.query)
                            if(res.data.code==0){
                                if(res.data.data.mode=='html'){
                                    window.location.href = res.data.data.content+'&token='+that.token
                                }
                                if(res.data.data.mode=='qrcode'){
                                    that.$router.push({path:'/rechargeOnline',query:{
                                        res:res.data.data.content,
                                        data:that.$route.query.list,
                                        money:that.money
                                    }})
                                }
                                if(res.data.data.mode=='qrcode_url'){
                                    window.location.href = res.data.data.content
                                }
                            }
                        })
                        // that.$router.push({path:'/rechargeOnline'})
                    }else{
                        that.$post('recharge',{
                            promotion_id: that.promotion_id,
                            coin:that.money,
                            sys_bank_id:that.queryObj.id,
                            ip:returnCitySN["cip"]
                        }).then(res=>{
                            if(res.code==0){
                                that.res = res.data
                                that.$router.push({path:'/rechargeUnonline',query:{data:JSON.stringify(res.data)}})
                            }
                        })
                    }
                }
            })
        },
        getId(name){
            var newArr = JSON.parse(this.$route.query.list),obj;
            newArr.forEach(ele => {
                if(ele.third_name==name){
                    obj = ele
                }
            });
            return obj
        },
    },
    beforeDestroy(){
        document.getElementsByTagName('head')[0].removeChild(document.getElementById('sohuip'))
    },
}
</script>
<style lang="scss" scoped>
.kscz{
    font-size: 28px;
    color: #666666;
    height: 40px;
    line-height: 40px;
    margin-top:22px;
    margin-left:22px;
    margin-bottom:23px;
}
.pad21{
    height: 21px;
    background: #f7f7f7;
    border-bottom:1px solid #d2d2d2;
}
.main{
    height: 100%;
    .button-sy{
        position: absolute;
        top: 0;
        z-index: -1;
    }
}
.content{
    background: #f7f7f7;
    padding-top:20px;
    height: calc(100% - 88px);
    .item{
        padding-left:30px;
        padding-right:30px;
        height: 120px;
        line-height: 120px;
        font-size: 0;
        position: relative;
        border-top: 1px solid #D2D2D2;
        border-bottom: 1px solid #D2D2D2;
        background: #fff;
        img{
            width:60px;
            height: 60px;
            margin-right:40px;
            margin-top:30px;
            float: left;
        }
        img.yinlian{
            width:66px;
            height: 41px;
            margin-right:34px;
            margin-top:40px;
        }
        span{
            float: left;
            font-size: 28px;
            color: #333333;
            letter-spacing: 0;
        }
        .iconB {
            display: block;
            float: right;
            width: 18px;
            height: 32px;
            background: url('~@/assets/image/system/back_light@3x.png') no-repeat;
            background-size: 100%;
            margin-top:40px;
        }
    }
    .text{
        padding:15px 20px;
        font-size: 22px;
        color:#999999;
    }
    .block1{
        background: #fff;
        padding: 0px 0px 41px 0px;
        font-size: 28px;
        color:#999;
        line-height: 25px;
        margin-bottom:61px;
        .xy-cell .weui-cell{
            border-right: none;
            border-left: none;
            border-radius: 0;
        }
        .group-btn{
            overflow: hidden;
            padding-left:30px;
            div{
                border: 1px solid #D2D2D2;
                border-radius: 6px;
                float: left;
                width:217px;
                height: 80px;
                line-height: 76px;
                text-align: center;
                font-size: 30px;
                margin-right:19px;
                margin-bottom:18px;
            }
            div.active{
                background: #D9342F;
                border: 1px solid #D9342F;
                color:#fff;
            }
            div:nth-child(3n){
                margin-right:0;
            }
            div:nth-child(4),div:nth-child(5),div:nth-child(6){
                margin-bottom:0;
            }
        }
    }
    .rgDiscount, .block1 {
        position: relative;
        .rgText {
            height: 84px; background: white; border: 1px solid #d2d2d2; border-left: none; border-right: none; padding: 0 30px; color: #333; font-size: 28px; line-height: 84px;
            span {
                float: left; width: 3em;
            }
            strong {
                float: left; color: #999;
            }
            .sg { color: #333; }
        }
        .iconB {
            position: absolute;
            z-index: 99;
            top: 24px;
            right: 30px;
            width: 18px;
            height: 32px;
            background: url('~@/assets/image/system/back_light@3x.png') no-repeat;
            background-size: 100%;
        }
    }
    .xy-btn{
        margin: auto;
        border-radius: 6px;
        width:650px;
        height: 110px;
        line-height: 110px;
        text-align: center;
        color:#fff;
        background: #D9342F;
        font-size: 34px;
    }
}
</style>
