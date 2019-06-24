<template>
<div class="main">
    <TrayHeader :title="title" />
    <div class="content">
        <div class="block">
            <div class="label">请绑定持卡人本人的银行卡</div>
            <group class="xy-cell bankcard-cell">
                <x-input title="姓名" ref="input01" :show-clear="false" :required="true" :min="2" :max="8" @on-change="change" v-model="name" placeholder="请输入姓名" is-type="china-name"></x-input>
            </group>
            <group class="xy-cell bankcard-cell border-none">
                <x-input title="卡号" ref="input02" :show-clear="false" type="number" keyboard="number" :min="15" :max="24" :required="true" @on-change="change" v-model="cardnumber" placeholder="请输入银行卡号"></x-input>
            </group>
            <div class="label">请选择发卡银行</div>
            <group class="xy-cell bankcard-cell b-4-m border-none">
                <x-input title="发卡银行" ref="input03" :show-clear="false" type="text" :disabled="true" :required="true" @on-change="change" v-model="bankname" placeholder="请选择银行"></x-input>
            </group>
            <div class="label">请填写开户行信息</div>
            <group class="xy-cell bankcard-cell b-3-m">
                <x-input title="开户行" ref="input04" :show-clear="false" :disabled="true" :required="true" @on-change="change" v-model="province" placeholder="请选择开户行所在地"></x-input>
            </group>
            <group class="xy-cell bankcard-cell b-5-m border-none">
                <x-input title="开户行名称" ref="input05" :show-clear="false" keyboard="number" :min="3" :max="15" :required="true" @on-change="change" v-model="zhihangname" placeholder="请输入详细支行名称"></x-input>
            </group>
            <div class="label">请填写银行预留信息</div>
            <group class="xy-cell bankcard-cell b-3-m border-none">
                <x-input title="手机号" ref="input06" :show-clear="false" type="text" :required="true" @on-change="change" v-model="mobile" keyboard="number" is-type="china-mobile" placeholder="请输入银行预留手机号"></x-input>
            </group>
            <div class="label">信息加密处理，仅用于银行验证</div>
        </div>
        <div class="btn" @click="getBankData">确认提交</div>
        <popup v-model="popupVisible1" position="bottom" class="bankcard-pancel ignore">
            <div class="popup-head"><span @click="popupVisible1=false">取消</span><span @click="comfir1">确定</span></div>
            <picker :data='data1' :fixed-columns="1" :columns="3" v-model='data1Value'></picker>
        </popup>
        <popup v-model="popupVisible2" position="bottom" class="bankcard-pancel ignore">
            <div class="popup-head"><span @click="popupVisible2=false">取消</span><span @click="comfir2">确定</span></div>
            <picker :data='data2' :fixed-columns="3" :columns="3" v-model='data2Value'></picker>
        </popup>
    </div>
</div>
</template>
<script>
const TrayHeader = import('../../public/rn-header')
export default {
    components: {
        TrayHeader () {
            return {
                component: TrayHeader
            }
        }
    },
    data(){
        return{
            title: '绑定银行卡',
            name:'',
            cardnumber:'',
            bankname:'',
            province:'',
            zhihangname:'',
            mobile:'',
            banklist:'',
            popupVisible1:false,
            popupVisible2:false,
            data1Value:[],
            data1:[],
            data2Value:[],
            data2: [],
            isNumber:function(value){
                console.log(value)
            }
        }
    },
    async created(){
        this.$nextTick(()=>{
            this.$refs.input03.$el.onclick = ()=>{
                this.popupVisible1 = true
            }
            this.$refs.input04.$el.onclick = ()=>{
                this.popupVisible2 = true
            }
        })
        this.getBanklist();
        this.getProData();
    },
    methods:{
        change(val){
            // console.log(val);
        },
        comfir1(){
            this.popupVisible1 = false
            this.bankname = this.data1Value[0];
        },
        comfir2(){
            this.popupVisible2 = false
            this.province = this.data2Value[0]+this.data2Value[1]+(this.data2Value[2]||'')
            console.log(this.data2Value);
        },
        //提交信息
        getBankData(){
            var that = this;
            if(that.name!=''&&that.cardnumber!=''&&that.province!=''&&that.zhihangname!=''&&that.mobile!=''&&that.bankname!=''){
                let obj = {
                    bank_id:that.getbankcardId(),
                    account_name:that.name,
                    bank_account:that.cardnumber,
                    bank_address:that.province,
                    bank_detail_address:that.zhihangname,
                    phone:that.mobile
                }
                that.$vux.loading.show({
                    text: '请求中',
                })
                that.$post('bindbankcard',obj).then(res=>{
                    that.$vux.loading.hide();
                    if(res.code==0){
                        this.$vux.toast.text(res.msg_zh,'bottom')
                        setTimeout(()=>{
                            that.$router.push({path:'/bankcard'})
                        },500)
                    }
                })
            }else{
                this.$vux.toast.text('请完善银行卡信息','bottom')
            }
        },
        //获取银行列表
        getBanklist(){
            var that = this
            that.$get('banklist',{}).then(res=>{
                if(res.code==0){
                    that.banklist = res.data
                    res.data.forEach(ele => {
                        that.data1.push(ele.name)
                    });
                }
            })
        },
        //获取银行卡
        getBankcar(){
            var that = this
            return new Promise(resolve=>{
                that.$get('bankcard',{}).then(res=>{
                    if(res.code==0){
                        resolve(res.data)
                    }else{
                        resolve(false)
                    }
                })
            })
        },
        //获取中国JSON
        getProData(){
            var that = this
            that.$http.get('/static/js/zh_pro.json').then(res=>{
                // //省份
                res.data.forEach(ele=>{
                    let obj = {
                        name:ele.name,
                        value:ele.name,
                        parent:0
                    }
                    that.data2.push(obj)
                })
                //地级市
                res.data.forEach(ele=>{
                    ele.city.forEach(ele1=>{
                        let obj = {
                            name:ele1.name,
                            value:ele1.name,
                            parent:ele.name
                        }
                        that.data2.push(obj)
                    })
                })
                //县级市 地区
                res.data.forEach(ele=>{
                    ele.city.forEach(ele1=>{
                        ele1.area.forEach(ele2=>{
                            let obj = {
                                name:ele2,
                                value:ele2,
                                parent:ele1.name
                            }
                            that.data2.push(obj)
                        })
                    })
                })
            })
        },
        getbankcardId(){
            var index,that=this;
            that.banklist.forEach((ele,idx)=>{
                if(ele.name==that.bankname){
                    index = idx
                }
            })
            return that.banklist[index].id
        },
    },
}
</script>
<style lang="scss" scoped>
.main{
    height: 100%;
    background: $bg-color;
    .content{
        height: calc(100% - 100px);
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        .block{
            .label{
                margin: 23px 0 14px 20px;
                font-size: 26px;
                color: #999999;
            }
        }
        .border-none{
            border: none!important;
        }
        .bankcard-cell{
            border-bottom: 1px solid #D2D2D2;
        }
        .btn{
            background: #D9342F;
            border-radius: 6px;
            width:650px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            color:#fff;
            font-size: 34px;
            margin:54px auto 0 auto;
        }
    }
}
</style>
