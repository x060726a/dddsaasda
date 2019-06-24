<template>
    <view-box id="app" :body-padding-bottom="routerStatus.isHideFooter?'0':'13.333vw'">
      <router-view />
      <Tabbar v-if="!routerStatus.isHideFooter"></Tabbar>
    </view-box>
</template>
<script>
import ViewBox from "vux/src/components/view-box/index"
const Tabbar = import('@/components/public/tabbar')
import { mapGetters, mapActions } from 'Vuex'
export default {
    name: 'App',
    components: {
      ViewBox,
      Tabbar(){
        return {
          component:Tabbar,
        }
      },
    },
    // mounted () {
    //     this.$nextTick(() => { // 监听浏览器挂起状态刷新页面
    //       if (document.visibilityState) {
    //         document.addEventListener('visibilitychange', function () {
    //           if (document.visibilityState === 'visible') window.location.reload()
    //         })
    //         return false
    //       }
    //       if (document.webkitVisibilityState) {
    //         document.addEventListener('webkitvisibilitychange', function () {
    //           if (document.webkitVisibilityState === 'visible') window.location.reload()
    //         })
    //         return false
    //       }
    //       if (document.mozVisibilityState) {
    //         document.addEventListener('mozvisibilitychange', function () {
    //           if (document.mozVisibilityState === 'visible') window.location.reload()
    //         })
    //         return false
    //       }
    //       if (document.msVisibilityState) {
    //         document.addEventListener('msvisibilitychange', function () {
    //           if (document.msVisibilityState === 'visible') window.location.reload()
    //         })
    //         return false
    //       }
    //     })
    // },
    computed:{
      ...mapGetters(['routerStatus'])
    }
}
</script>
<style lang="scss">
@-moz-document url-prefix() {
  .weui-dialog{
    margin: 65% auto auto auto;
  }
}
input::-webkit-input-placeholder{
  color:#999;
  font-weight: 400!important;
  font-size: 30px;
  font-family: '-apple-system-font,Helvetica Neue,Helvetica,Arial,sans-serif'
}
input:-moz-placeholder{
  color:#999;
  font-size: 30px;
  font-weight: 500;
  font-family: '-apple-system-font,Helvetica Neue,Helvetica,Arial,sans-serif'
}
input::-moz-placeholder{
  color:#999;
  font-size: 30px;
  font-weight: 500;
  font-family: '-apple-system-font,Helvetica Neue,Helvetica,Arial,sans-serif'
}
    //等级badge
    .level-l1{
      background: url('/static/images/levelbadge/l1.png') no-repeat;
      background-size: 100% 100%;
    }
    .level-l2{
      background: url('/static/images/levelbadge/l2.png') no-repeat;
      background-size: 100% 100%;
    }
    .level-l3{
      background: url('/static/images/levelbadge/l3.png') no-repeat;
      background-size: 100% 100%;
    }
    .level-l4{
      background: url('/static/images/levelbadge/l4.png') no-repeat;
      background-size: 100% 100%;
    }
    .level-l5{
      background: url('/static/images/levelbadge/l5.png') no-repeat;
      background-size: 100% 100%;
    }
    .level-l6{
      background: url('/static/images/levelbadge/l6.png') no-repeat;
      background-size: 100% 100%;
    }
    // VUX
    .weui-toast.vux-toast-bottom{
      bottom:150px;
    }
    .weui-toast_text .weui-toast__content{
      font-size: 26px;
    }
    .setting{
        .weui-cells{
            margin-top: 0;
        }
    }
    .vux-loading{
      display: flex;
      width:100%;
      height: 100%;
      position: fixed;
      top: 0;
      z-index: 502!important;
      align-items: center;
      justify-content:center;
      .weui-toast{
        position: relative;
        margin: 0;
        top: 0;
        left: 0;
        width: 250px;
        min-height: 250px;
        transform: translateX(0);
        .weui-icon_toast.weui-loading{
            height: 72px;
            width:72px;
            margin:60px 0 0;
        }
        .weui-toast__content{
          font-size: 30px;
        }
      }
    }
    .nobold{
      .weui-input{
        font-weight: 500!important;
      }
    }
    .xy-cell{
      .weui-cell{
        padding:20px 30px;
        border: 1px solid #D2D2D2;
        border-radius: 6px;
      }
      input::-webkit-input-placeholder{
        font-weight: 500;
      }
      .weui-label,.weui-input{
        font-size: 28px;
        color:#333333;
      }
      .weui-input{
        font-weight: bold;
      }
      .weui-icon-clear,.weui-icon-warn{
        height: 28px;
        width: 28px;
        font-size: 40px;
        position: relative;
        overflow: hidden;
        padding-left:0!important;
      }
      .weui-icon-clear::before{
        content:''!important;
        display: block!important;
        margin-left:0!important;
        margin-right:0!important;
        width:100%;
        height: 100%;
        background: url('~@/assets/image/system/close_light@2x.png') no-repeat;
        background-size: 28px 28px;
      }
      .weui-icon-warn::before{
        content:''!important;
        display: block!important;
        margin-left:0!important;
        margin-right:0!important;
        width:100%;
        height: 100%;
        background: url('~@/assets/image/system/wring.png') no-repeat;
        background-size: 28px 28px;
      }
    }
    .bankcard-cell{
      .weui-label{
        font-size: 30px;
        margin-right:90px;
      }
      .vux-x-input.disabled .weui-input{
        color:#72849E;
        -webkit-text-fill-color:inherit;
      }
      .weui-input{
        color:#72849E;
        font-weight: 600;
        font-size: 30px;
      }
      .weui-cell{
        border:none;
        padding-left:19px;
      }
      .vux-x-input .vux-input-icon,.vux-input-icon.weui-icon-warn:before{
        font-size: 30px;
      }
      .weui-cells{
        margin-top:0;
      }
    }
    .b-5-m{
      .weui-label{
        margin-right:0px;
      }
    }
    .b-4-m{
      .weui-label{
        margin-right:30px;
      }
    }
    .b-3-m{
      .weui-label{
        margin-right:60px;
      }
    }
    .weui-cells:after, .weui-cells:before{
      display: none;
    }
    .vux-x-input .weui-icon{
      padding-left: 5px;
    }
    .vux-x-input .vux-input-icon{
      font-size: 21px;
    }
    .weui-cell_warn .weui-icon-warn{
      display: inline-block;
    }
    //confirm
    .vux-confirm .weui-dialog{
        width: 72%;
        max-width: 72%;
        border-radius:20px;
    }
    .vux-confirm .weui-dialog .weui-dialog__hd{
        padding: 30px 0 20px;
    }
    .vux-confirm .weui-dialog .weui-dialog__hd .weui-dialog__title {
        font-size: 34px;
    }
    .vux-confirm .weui-dialog .weui-dialog__bd {
    margin-bottom: 41px; padding: 0 31px; color: #030303; font-size: 26px; text-align: center;
    }
    .vux-confirm .weui-dialog .weui-dialog__btn_default, .vux-confirm .weui-dialog .weui-dialog__btn_primary {
        color: #0076FF !important;
    }
    .ws-dialog .weui-dialog{
        width:600px;
        max-width: 600px;
        height: 620px;
        top:230px;
        left: 50%;
        margin:0 0 0 -300px;
        border-radius: 20px;
        overflow: hidden;
    }
    .weui-dialog__ft{
        height: 87px;
        line-height: 87px!important;
        font-size: 34px!important;
    }
    .weui-dialog__btn_primary{
        color:#26a2ff!important;
    }
    // VUX
    html,body{
      padding:0;
      margin: 0;
      height: 100%;
      width: 100%;
    }
    body {
      font-size: 12px;
    }
    .vux-tab-container{
      height: 100px!important;
    }
    .vux-tab{
      height: 100px!important;
    }
    .other-header{
        position: relative;
        z-index: 2;
        height: 88px;
        background: $theme-color;
        .back{
            position: absolute; top: 0; left: 0; width: 78px; height: 88px; background: url("~@/assets/image/system/headback.png") no-repeat center; background-size: 26px 44px;
        }
        .title{
            height: 88px; line-height: 88px; background: $theme-color; color: #fff; font-size: 36px; text-align: center;
          >span,>div{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 88px;
            line-height: 88px;
            text-align: center;
            em{
              display: inline-block;
              vertical-align: middle;
              margin-right:40px;
            }
            .cp-icon-down{
              vertical-align: middle;
              display: inline-block;
              background: url('~@/assets/image/system/cp-icon-down.png') center center no-repeat;
              background-size: 35px 20px;
              height: 30px;
              width:50px;
              transform:rotate(0deg);
            }
            .cp-icon-up{
              vertical-align: middle;
              transform: rotate(-360deg);
              display: inline-block;
              background: url('~@/assets/image/system/cp-icon-up.png') center center no-repeat;
              background-size: 35px 20px;
              height: 30px;
              width:50px;
            }
          }
        }
        .right{
          position: absolute;
          top: 29px;
          right:20px;
          line-height: 42px;
          font-size: 30px;
          color:#fff;
        }
    }
    .no-more-data{
        line-height: 68px;
        text-align: center;
    }
    .loading-text,.no-more-data{
        font-size: 30px;
        height: 100%;
        color:#908e8e;
    }
    .my-spinner {
        margin: auto;
        width: 100%;
        height: 100%;
        font-size: 10px;
        display: flex;
        justify-content:center;
        align-items: center;
        background: none;
    }
    .my-spinner > div {
        background-color: #908d8d;
        height: 60%;
        width: 5px;
        margin-right:5px;
        -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
        animation: stretchdelay 1.2s infinite ease-in-out;
    }

    .my-spinner .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }

    .my-spinner .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    .my-spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    .my-spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }

    @keyframes stretchdelay {
      0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
      20% { -webkit-transform: scaleY(1.0) }
    }

    @keyframes stretchdelay {
      0%, 40%, 100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }  20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
      }
    }
    // 底部弹窗的 取消 确定按钮
    .popup-head{
        height: 79px;
        line-height: 79px;
        border-bottom:1px solid #D2D2D2;
        background: #fff;
        span{
            font-size: 30px;
            color: #3F8FEB;
        }
        span:first-child{
            padding-left:30px;
            float: left;
        }
        span:last-child{
            padding-right:30px;
            float: right;
        }
    }
    // 底部弹窗的 取消 确定按钮
    .bankcard-pancel{
      .scroller-component{
        height: 270px;
        // background: rgba(255,255,255,0.5);
      }
      .scroller-mask{
        // background: rgba(255,255,255,0);
        height: 108%;
      }
      .scroller-item,.scroller-indicator{
        height: 90px;
        line-height: 115px;
        font-size: 28px;
        color: #333333;
      }
      .scroller-item-selected{
        font-size: 34px;
      }
    }
    //tab
    .my-tab{
      padding-top:100px!important;
      .vux-tab-container{
          height: 100px!important;
      }
      .vux-tab-item{
          height: 100px!important;
          line-height: 100px!important;
          font-size: 30px!important;
      }
    }
    .xs-container{
        min-height: 100%;
    }
    /*暂无数据*/
    .noData {
        color: #999; font-size: 26px; text-align: center;
        .nodataIcon {
            display: block; width: 381px; height: 262px; margin: 300px auto 15px; background: url("~@/assets/image/system/noData.png")no-repeat center; background-size: cover;
        }
    }
    /*扑克*/
    @for $i from 1 through 13
    {
        @for $j from 1 through 4 {
            .poker#{$i}_#{$j}
            {
                background: url('/static/images/poker/poker#{$i}_#{$j}.png')no-repeat center; background-size: 100% 100%;
            }
            @if $i == 11 {
                .pokerJ_#{$j}
                {
                    background: url('/static/images/poker/pokerJ_#{$j}.png')no-repeat center; background-size: 100% 100%;
                }
            }
            @if $i == 12 {
                .pokerQ_#{$j}
                {
                    background: url('/static/images/poker/pokerQ_#{$j}.png')no-repeat center; background-size: 100% 100%;
                }
            }
            @if $i == 13 {
                .pokerK_#{$j}
                {
                    background: url('/static/images/poker/pokerK_#{$j}.png')no-repeat center; background-size: 100% 100%;
                }
            }
        }
    }
</style>
