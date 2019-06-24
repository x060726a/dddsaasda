<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$root.routerGoBack"></i>
        <div class="title"><span>设置</span></div>
    </div>
    <div class="content">
        <div class="block">
            <div class="avatar-bar" @click="setting(0)">
                <span>头像</span>
                <span><img :src="userinfo.avatar"></span>
            </div>
            <div class="date-bar" @click="setting(1)"><span>昵称</span><span>{{userinfo.nickname}}</span></div>
            <div class="date-bar none-icon"><span>账户</span><span>{{userinfo.username==''?'未设置':userinfo.username}}</span></div>
            <div class="date-bar border-none none-icon"><span>持卡人中文名</span><span>{{userinfo.realname==''?'未设置':userinfo.realname}}</span></div>
        </div>
        <div class="block">
            <div class="date-bar" @click="setting(4)"><span>QQ号</span><span>{{userinfo.qq==''?'未设置':userinfo.qq}}</span></div>
            <div class="date-bar" @click="setting(5)"><span>微信号</span><span>{{userinfo.wechat==''?'未设置':userinfo.wechat}}</span></div>
            <div class="date-bar" @click="setting(6)"><span>电子邮箱</span><span>{{userinfo.email==''?'未设置':userinfo.email}}</span></div>
            <div class="date-bar border-none none-icon"><span>手机号</span><span>{{userinfo.phone}}</span></div>
        </div>
        <div class="block">
            <div class="date-bar" @click="setting(7)"><span>修改登录密码</span><span></span></div>
            <div class="date-bar" @click="setting(8)"><span>修改资金密码</span><span></span></div>
            <div class="date-bar border-none"><span>关于我们</span><span>2.0</span></div>
        </div>
        <div class="btn" @click="loginout">退出登录</div>
    </div>
    <popup v-model="popupVisible" position="right" width="100%">
        <AVATAR v-if="active===0" @close="popupVisible=false" />
        <NICKNAME  v-if="active==1"  @close="popupVisible=false" />
        <USERNUM v-if="active==2" @close="popupVisible=false"/>
        <REALNAME v-if="active==3" @close="popupVisible=false" />
        <QQ v-if="active==4" @close="popupVisible=false" />
        <WECHAT v-if="active==5" @close="popupVisible=false" />
        <EMAIL v-if="active==6" @close="popupVisible=false" />
        <LOGINPAW v-if="active==7" @close="popupVisible=false" />
        <MONEYPAW v-if="active==8" @keypoShow="showKeypo" @close="popupVisible=false" :res="result"/>
    </popup>
    <NUMKEYPO v-if="show" @keypoClose="show=false" @result="getResult"/>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return{
            result:'',
            show:false,
            active:'',
            title:['选择默认头像','修改昵称','设置账户','设置持卡人姓名','修改QQ号','修改微信号','修改电子邮箱','修改登录密码','修改资金密码'],
            popupVisible:false,
        }
    },
    computed:{
        ...mapGetters(['userinfo'])
    },
    created(){
        if(this.$store.state.userinfo==''){
            this.$root.getuserInfo();
        }
    },
    methods:{
        showKeypo(value){
            this.show = value
        },
        getResult(value){
            this.result = value
        },
        //退出登录
        loginout(){
            var that = this
            that.$vux.confirm.show({
                title:'温馨提示',
                content:'您确认退出登录吗？',
                onConfirm:()=>{
                    that.$vux.loading.show({
                        text: '正在退出',
                    })
                    that.$post('logout',{}).then(res=>{
                        if(res.code==0){
                            console.log(that.$cookie);
                            that.$store.commit('userinfo','')
                            that.$cookie.delete('webToken')
                            that.$vux.toast.text('退出成功','middle')
                            that.$router.push({path:'/login'})
                        }
                        that.$vux.loading.hide()
                    })
                }
            })

        },
        setting(index){
            if(index==3){
                if(this.$store.state.userinfo.realname==''){
                    this.active = index
                    this.popupVisible=true
                }
                return;
            }
            if(index==8){
                if(this.$store.state.userinfo.isset_coin_pwd){
                    this.popupVisible=true
                    this.active = index
                }else{
                    this.$router.push({path:'/setmoneypaw'})
                }
                return
            }
            this.popupVisible=true
            this.active = index
        },
        deletePas(index){
            this.resPsw = index
        }
    },
    components:{
        NUMKEYPO(){
            return{
                component:import ('@/components/public/numkeypo.vue')
            }
        },
        USERNUM(){
            return {
                component:import('@/components/Manage/Setting/设置账户'),
            }
        },
        REALNAME(){
            return {
                component:import('@/components/Manage/Setting/设置持卡人中文名'),
            }
        },
        AVATAR(){
            return {
                component:import('@/components/Manage/Setting/设置头像'),
            }
        },
        NICKNAME(){
            return {
                component:import('@/components/Manage/Setting/修改昵称'),
            }
        },
        QQ(){
            return {
                component:import('@/components/Manage/Setting/修改QQ号'),
            }
        },
        WECHAT(){
            return {
                component:import('@/components/Manage/Setting/修改微信号'),
            }
        },
        EMAIL(){
            return {
                component:import('@/components/Manage/Setting/修改电子邮箱'),
            }
        },
        LOGINPAW(){
            return {
                component:import('@/components/Manage/Setting/修改登录密码'),
            }
        },
        MONEYPAW(){
            return {
                component:import('@/components/Manage/Setting/修改资金密码'),
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.pancel-main{
    height: 100%;
    .pancel-content{
        background: #fff;
        height: calc(100% - 100px);
    }
}
.main{
    height: 100%;
    background: $bg-color;
    .content{
        height: calc(100% - 102px);
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        position: relative;
        .block{
            background: #fff;
            margin-bottom:20px;
            border-bottom:1px solid #d2d2d2;
            .avatar-bar{
                margin-left:20px;
                padding-right:20px;
                height: 140px;
                line-height: 140px;
                overflow: hidden;
                position: relative;
                border-bottom:1px solid #d2d2d2;
                span:first-child{
                    float: left;
                    font-size: 30px;
                    color: #333333;
                }
                span:last-child{
                    float: right;
                    display: block;
                    width:100px;
                    height: 100px;
                    overflow: hidden;
                    border-radius: 50%;
                    margin:20px 36px 20px 20px;
                    img{
                        width:100%;
                        height: 100%;
                    }
                }
            }
            .avatar-bar::before{
                content:'';
                position: absolute;
                top: 52px;
                right:30px;
                transform: rotate(-50deg);
                height: 25px;
                width:3px;
                background: #D2D2D2;
            }
            .avatar-bar::after{
                content:'';
                position: absolute;
                top: 65px;
                right:30px;
                transform: rotate(50deg);
                height: 25px;
                width:3px;
                background: #D2D2D2;
            }
            .date-bar::before{
                content:'';
                position: absolute;
                top: 27px;
                right:30px;
                transform: rotate(-50deg);
                height: 25px;
                width:3px;
                background: #D2D2D2;
            }
            .date-bar::after{
                content:'';
                position: absolute;
                top: 43px;
                right:30px;
                transform: rotate(50deg);
                height: 25px;
                width:3px;
                background: #D2D2D2;
            }
            .date-bar{
                margin-left:20px;
                padding-right:20px;
                height: 90px;
                line-height: 90px;
                overflow: hidden;
                position: relative;
                border-bottom:1px solid #d2d2d2;
                span:first-child{
                    font-size: 30px;
                    color: #333333;
                    float: left;
                }
                span:last-child{
                    float: right;
                    font-size: 30px;
                    color: #999999;
                    margin-right:40px;
                }
            }
            .date-bar-noicon::after{
                display: none;
            }
            .date-bar-noicon::before{
                display: none;
            }
            .none-icon::after,.none-icon::before{
                display: none;
            }
        }
        .border-none{
            border:none!important;
        }
        .btn{
            height: 90px;
            line-height: 86px;
            border-top:1px solid #d2d2d2;
            border-bottom:1px solid #d2d2d2;
            font-size: 34px;
            color: #333333;
            background: #fff;
            text-align: center;
        }
    }
}
</style>
