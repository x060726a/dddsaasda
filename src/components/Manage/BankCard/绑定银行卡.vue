<template>
<div class="main">
    <TrayHeader :title="'绑定银行卡'" />
    <div class="content">
        <div class="block-label">请绑定持卡人本人的银行卡</div>
        <div class="input-group border-none">
            <div class="input-wrap">
                <div class="label">持卡人</div>
                <input type="text" placeholder="请输入持卡人姓名" @blur="blur1" @focus="focus1" v-model="chinesename">
                <i class="close" v-show="close1" @click="chinesename=''"></i>
                <i class="warning" v-show="reg1"></i>
            </div>
            <div class="input-wrap">
                <div class="label">卡号</div>
                <input type="number" placeholder="请输入银行卡号" @blur="blur2" @focus="focus2" oninput="if(value.length>28)value=value.slice(0,28)" v-model="bankcard">
                <i class="close" v-show="close2" @click="bankcard=''"></i>
                <i class="warning" v-show="reg2"></i>
            </div>
        </div>
        <div class="block-label">请选择发卡银行</div>
        <div class="input-group border-none">
            <div class="input-wrap">
                <div class="label">发卡银行</div>
                <input type="text" :class="{has:bankname!=''}" placeholder="请选择银行">
                <span @click="popupVisible1=true">{{bankname}}</span>
                <i class="warning" v-show="reg3"></i>
            </div>
        </div>
        <div class="block-label">请填写开户行信息</div>
        <div class="input-group border-none">
            <div class="input-wrap">
                <div class="label">开户行</div>
                <input type="text" :class="{has:bankaddress!=''}" placeholder="请选择开户行所在地">
                <span @click="popupVisible2=true">{{bankaddress}}</span>
                <i class="warning" v-show="reg4"></i>
            </div>
            <div class="input-wrap">
                <div class="label">开户行名称</div>
                <input type="text" placeholder="请输入详细支行名称" @blur="blur3" @focus="focus3" v-model="bankbeach">
                <i class="close" v-show="close5" @click="bankbeach=''"></i>
                <i class="warning" v-show="reg5"></i>
            </div>
        </div>
        <div class="block-label">请填写银行预留信息</div>
        <div class="input-group border-none">
            <div class="input-wrap">
                <div class="label">手机号</div>
                <input type="number" placeholder="请输入银行预留手机号" oninput="if(value.length>11)value=value.slice(0,11)" @blur="blur4" @focus="focus4" v-model="phone">
                <i class="close" v-show="close6" @click="phone=''"></i>
                <i class="warning" v-show="reg6"></i> 
            </div>
        </div>
        <div class="block-label">信息加密处理，仅用于银行验证</div>
        <div class="submit-btn" @click="getBankData">确认提交</div>
    </div>
    <popup v-model="popupVisible1" position="bottom" class="bankcard-pancel ignore">
        <div class="popup-head"><span @click="popupVisible1=false">取消</span><span @click="comfir1">确定</span></div>
        <picker :data='data1' :fixed-columns="1" :columns="3" v-model='data1Value'></picker>
    </popup>
    <popup v-model="popupVisible2" position="bottom" class="bankcard-pancel ignore">
        <div class="popup-head"><span @click="popupVisible2=false">取消</span><span @click="comfir2">确定</span></div>
        <picker :data='data2' :fixed-columns="3" :columns="3" v-model='data2Value'></picker>
    </popup>
</div>
</template>
<script>
export default {
    data(){
        return{
            popupVisible1:false,
            popupVisible2:false,
            data1Value:[],
            data1:[],
            data2Value:[],
            data2: [],

            banklist:'',
            chinesename:'',//中文名
            bankcard:'',//银行卡号
            bankname:'',//发卡银行
            bankaddress:'',//开户行所在地
            bankbeach:'',//支行名称
            phone:'',//手机号码
            reg1:false,
            reg2:false,
            reg3:false,
            reg4:false,
            reg5:false,
            reg6:false,
            close1:false,
            close2:false,
            close3:false,
            close4:false,
            close5:false,
            close6:false,
        }
    },
    watch:{
        chinesename(val,oval){
            if(val!=''){
                this.close1 = true
            }
        },
        bankcard(val,oval){
            if(val>0){
                this.close2 = true
            }
        },
        bankbeach(val,oval){
            if(val!=''){
                this.close5 = true
            }
        },
        phone(val,oval){
            if(val!=''){
                this.close6 = true
            }
        },
    },
    created(){
        this.getBanklist();
        this.getProData();
    },
    methods:{
        comfir1(){
            this.popupVisible1 = false
            this.bankname = this.data1Value[0];
        },
        comfir2(){
            this.popupVisible2 = false
            this.bankaddress = this.data2Value[0]+this.data2Value[1]+(this.data2Value[2]||'')
        },
        //提交信息
        getBankData(){
            var that = this;
            setTimeout(()=>{
                if(that.chinesename==''){
                    that.$vux.toast.text('请输入中文名','bottom')
                    return;
                }
                if(that.bankcard==''){
                    that.$vux.toast.text('请输入银行卡号','bottom')
                    return;
                }
                if(that.reg1){
                    that.$vux.toast.text('请输入正确的中文名','bottom')
                    return;
                }
                if(that.reg2){
                    that.$vux.toast.text('请输入正确的银行卡号','bottom')
                    return;
                }
                if(that.bankname==''){
                    that.$vux.toast.text('请输选择发卡银行','bottom')
                    return; 
                }
                if(that.bankaddress==''){
                    that.$vux.toast.text('请选择开户行所在地','bottom')
                    return; 
                }
                if(that.bankbeach==''){
                    that.$vux.toast.text('请填写支行名称','bottom')
                    return; 
                }
                if(that.phone==''){
                    that.$vux.toast.text('请输入手机号码','bottom')
                    return; 
                }
                let obj = {
                    bank_id:that.getbankcardId(),
                    account_name:that.chinesename,
                    bank_account:that.bankcard,
                    bank_address:that.bankaddress,
                    bank_detail_address:that.bankbeach,
                    phone:that.phone
                }
                that.$vux.loading.show({
                    text: '请求中',
                })
                that.$post('bindbankcard',obj).then(res=>{
                    that.$vux.loading.hide();
                    if(res.code==0){
                        that.$vux.toast.text(res.msg_zh,'bottom')
                        setTimeout(()=>{
                            that.$router.push({path:'/bankcard'})
                        },500)
                    }
                })
            },120)
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
            // console.log(that.$axios)
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
        //手机正则
        REG_PHONE(){
            var Reg = new RegExp(/^1(3|4|5|7|8)\d{9}$/)
            return Reg.test(this.phone)
        },
        //验证中文名
        REG_ZH_NAME(){
            var nameReg = new RegExp(/^[\u4E00-\u9FA5]{2,4}$/)
            return nameReg.test(this.chinesename)
        },
        //失去焦点
        blur1(){
            var that = this;
            setTimeout(()=>{
                that.close1 = false
                that.reg1 = !that.REG_ZH_NAME()
            },100)
        },
        blur2(){
            var that = this;
            setTimeout(()=>{
                that.close2 = false
                if(this.bankcard.length<10){
                    this.reg2 = true;
                }
            },100)
        },
        blur3(){
            var that = this;
            setTimeout(()=>{
                that.close5 = false
                if(this.bankbeach==''){
                    this.reg5 = true;
                }
            },100)
        },
        blur4(){
            var that = this;
            setTimeout(()=>{
                that.close6 = false
                that.reg6 = !that.REG_PHONE()
            },100)
        },
        //获取焦点
        focus1(){
            this.reg1 = false;
            if(this.chinesename!=''){
                this.close1 = true
            }
        },
        focus2(){
            this.reg2 = false;
            if(this.bankcard!=''){
                this.close2 = true
            }
        },
        focus3(){
            this.reg5 = false;
            if(this.bankbeach!=''){
                this.close5 = true
            }
        },
        focus4(){
            this.reg6 = false;
            if(this.phone!=''){
                this.close6 = true
            }
        },
    },
    components: {
        TrayHeader () {
            return {
                component: import('../../public/rn-header')
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.block-label{
    font-size: 26px;
    color: #999999;
    height: 74px;
    line-height: 41px;
    padding:23px 0 14px 20px;
}
.main{
    height: 100%;
    background: #f7f7f7;
}
.content{
    height: calc(100% - 88px);
    .border-none{
        border:none!important;
    }
    .input-group{
        padding-left:20px;
        background: #fff;
        border-top:1px solid #d2d2d2;
        border-bottom:1px solid #d2d2d2;
        .input-wrap{
            height: 90px;
            border-bottom:1px solid #d2d2d2;
            position: relative;
            overflow: hidden;
            >div{
                float: left;
                height: 89px;
                line-height: 89px;
                font-size: 30px;
                color: #333333;
                width:155px;
                text-align: left;
                margin-right:28px;
            }
            >input{
                height: 50px;
                line-height: 50px;
                float: left;
                width:calc(100% - 183px);
                color:#72849E;
                font-weight: bold;
                font-size: 30px;
                margin-top:20px;
            }
            >input.has{
                opacity: 0;
            }
            >span{
                position: absolute;
                display: block;
                height: 89px;
                line-height: 89px;
                font-weight: bold;
                width:calc(100% - 183px);
                right:0;
                top: 0;
                z-index: 1;
                font-size: 30px;
                color: #72849E;
            }
            input::-webkit-input-placeholder{
                font-weight: 500;
            }
            .close,.warning{
                display: block;
                position: absolute;
                right:20px;
                height: 90px;
                width: 50px;
            }
            .close{
                background: url('~@/assets/image/system/close_light@2x.png') center center no-repeat;
                background-size: 30px 30px;
                z-index: 2;
            }
            .warning{
                background: url('~@/assets/image/system/wring.png') center center no-repeat;
                background-size: 25px 25px;
                z-index: 2;
            }
        }
        >div:last-child{
            border-bottom:none;
        }
    }
    .submit-btn{
        background: $theme-color;
        border-radius: 6px;
        width:650px;
        height: 100px;
        line-height: 100px;
        font-size: 34px;
        color: #FFFFFF;
        text-align: center;
        margin: 41px auto 0 auto;
    }
}
</style>
