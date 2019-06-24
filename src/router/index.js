
const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        { path: '/', redirect: '/main' },
        // 首页
        {
          path: '/main',
          component: resolve => require(['@/components/Index/index'], resolve),
          meta: { title: 'Welcome' }
        },
        // 登录
        {
            path: '/login',
            component: resolve => require(['@/components/Log_Reg/login'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 注册
        {
            path: '/register',
            component: resolve => require(['@/components/Log_Reg/register'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 忘记密码
        {
            path: '/forgetPwd',
            component: resolve => require(['@/components/Log_Reg/forgetPwd'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 个人中心
        {
          path: '/manage',
          component: resolve => require(['@/components/Manage/manage'], resolve),
          meta: { title: 'Manage' }
        },
        // 系统维护
        {
            path: '/maintain',
            component: resolve => require(['@/components/Index/maintain'], resolve),
            meta: { title: 'Welcome' , isHideFooter:true }
        },
        // 系统维护
        {
            path: '/down',
            component: resolve => require(['@/components/Index/downloadView'], resolve),
            meta: { title: 'Welcome' , isHideFooter:true }
        },
        {
            path: '/usertask',
            component: resolve => require(['@/components/Usertask/Entry'], resolve),
            meta: { title: 'usertask', isHideFooter:true }
        },
        // 跟单
        {
            path: '/documentary',
            component: resolve => require(['@/components/Documentary/index'], resolve),
            meta: { title: 'Welcome' }
        },
        // 跟单详情
        {
            path: '/unDetails',
            component: resolve => require(['@/components/Documentary/unDetails'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 账单详情
        {
            path: '/payDetails',
            component: resolve => require(['@/components/Documentary/payDetails'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 跟单列表
        {
            path: '/documentaryList',
            component: resolve => require(['@/components/Documentary/documentaryList'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 跟单用户信息
        {
            path: '/information',
            component: resolve => require(['@/components/Documentary/information'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 消息中心
        {
            path: '/message',
            component: resolve => require(['@/components/MessageCenter/index'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 投注记录
        {
            path: '/betRecord',
            component: resolve => require(['@/components/BetRecord/index'], resolve),
            meta: { title: 'Welcome', isHideFooter:true, }
        },
        // 订单详情
        {
            path: '/orderDetails',
            component: resolve => require(['@/components/BetRecord/orderDetails'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 游戏规则
        {
            path: '/rules',
            component: resolve => require(['@/components/RulesPlay/index'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 规则详情
        {
            path: '/ruleDetails',
            component: resolve => require(['@/components/RulesPlay/ruleDetails'], resolve),
            meta: { title: 'Welcome', isHideFooter:true }
        },
        // 游戏页面
        {
            path: '/',
            component: resolve => require(['@/components/GameCenter/index'], resolve),
            meta: { title: 'Welcome', isHideFooter:true },
            children: [
                {
                    path: 'ssc_cq',
                    name: '重庆时时彩',
                    component: resolve => require(['@/components/GameCenter/playCenter/sscGame/cqssc'], resolve),
                    meta: { title: 'Welcome', name: 'sscGame', id: 10, isHideFooter:true, type:'bet' }
                },
                {
                    path: 'ssc_fenfen',
                    name: '分分彩',
                    component: resolve => require(['@/components/GameCenter/playCenter/sscGame/ffc'], resolve),
                    meta: { title: 'Welcome', name: 'sscGame', id: 11, isHideFooter:true, type:'bet' }
                },
                {
                    path: 'ssc_sanfen',
                    name: '三分彩',
                    component: resolve => require(['@/components/GameCenter/playCenter/sscGame/sfc'], resolve),
                    meta: { title: 'Welcome', name: 'sscGame', id: 12, isHideFooter:true, type:'bet' }
                },
                {
                    path: 'pk10_bj',
                    name: '北京PK10',
                    component: resolve => require(['@/components/GameCenter/playCenter/carGame/bjpk10'], resolve),
                    meta: { title: 'Welcome', name: 'sc', id: 20, isHideFooter:true, type:'bet' }
                },
                {
                    path: 'pk10_jisu',
                    name: '极速赛车',
                    component: resolve => require(['@/components/GameCenter/playCenter/carGame/jisupk10'], resolve),
                    meta: { title: 'Welcome', name: 'sc', id: 21, isHideFooter:true, type:'bet' }
                },
                {
                    path: 'pk10_fenfen',
                    name: '分分PK10',
                    component: resolve => require(['@/components/GameCenter/playCenter/carGame/ffpk10'], resolve),
                    meta: { title: 'Welcome', name: 'sc', id: 22, isHideFooter:true, type:'bet' }
                },
                {
                    path: 'xyft',
                    name: '幸运飞艇',
                    component: resolve => require(['@/components/GameCenter/playCenter/carGame/xyft'], resolve),
                    meta: { title: 'Welcome', name: 'sc', id: 23, isHideFooter:true, type:'bet' }
                },
                {
                    path: '28_lucky',
                    name: '幸运28',
                    component: resolve => require(['@/components/GameCenter/playCenter/otherGame/lucky28'], resolve),
                    meta: { title: 'Welcome', name: '28Game', id: 30, isHideFooter:true, type:'bet' }
                },
                {
                    path: '28_canada',
                    name: '加拿大28',
                    component: resolve => require(['@/components/GameCenter/playCenter/otherGame/canada28'], resolve),
                    meta: { title: 'Welcome', name: '28Game', id: 31, isHideFooter:true, type:'bet' }
                },
                {
                    path: 'shaibao',
                    name: '欢乐骰宝',
                    component: resolve => require(['@/components/GameCenter/playCenter/otherGame/shaibao'], resolve),
                    meta: { title: 'Welcome', name: 'shaibao', id: 40, isHideFooter:true, type:'bet' }
                },
                {
                    path: 'niuniu',
                    name: '百人牛牛',
                    component: resolve => require(['@/components/GameCenter/playCenter/otherGame/niuniu'], resolve),
                    meta: { title: 'Welcome', name: 'niuniu', id: 50, isHideFooter:true, type:'bet' }
                },
                {
                    path: '6_hk',
                    name: '香港六合彩',
                    component: resolve => require(['@/components/GameCenter/playCenter/otherGame/hkliuhe'], resolve),
                    meta: { title: 'Welcome', name: 'liuhe', id: 70, isHideFooter:true, type:'bet' }
                },
                {
                    path: '6_jisu',
                    name: '极速六合彩',
                    component: resolve => require(['@/components/GameCenter/playCenter/otherGame/jisuliuhe'], resolve),
                    meta: { title: 'Welcome', name: 'liuhe', id: 71, isHideFooter:true, type:'bet' }
                }
            ]
        },
        // 充值
        {
            path: '/recharge',
            component: resolve => require(['@/components/Manage/Recharge/Entry'], resolve),
            meta: { title: 'recharge', isHideFooter:true }
        },
        // 充值下一步
        {
            path: '/rechargeNext',
            component: resolve => require(['@/components/Manage/Recharge/充值下一步'], resolve),
            meta: { title: 'recharge', isHideFooter:true }
        },
        // 线下充值
        {
            path: '/rechargeUnonline',
            component: ()=> import('@/components/Manage/Recharge/线下充值'),
            meta: { title: 'recharge-next', isHideFooter:true }
        },
        //线上充值
        {
            path: '/rechargeOnline',
            component: ()=> import('@/components/Manage/Recharge/线上充值'),
            meta: { title: 'recharge-next', isHideFooter:true }
        },
        // 充值完成
        {
            path: '/recharge-done',
            component: ()=> import('@/components/Manage/Recharge/充值完成'),
            meta: { title: 'recharge-done', isHideFooter:true }
        },
        // 提现
        {
            path: '/withdraw',
            component: ()=> import('@/components/Manage/Withdraw/Entry'),
            meta: { title: 'withdraw', isHideFooter:true }
        },
        // 提现申请
        {
            path: '/withdraw-done',
            component: ()=> import('@/components/Manage/Withdraw/提现申请'),
            meta: { title: 'withdraw-done', isHideFooter:true }
        },
        // 设置紫金密码
        {
            path: '/setmoneypaw',
            component: ()=> import('@/components/Manage/SetMoneyPaw/设置资金密码'),
            meta: { title: 'setmoneypaw', isHideFooter:true }
        },
        // 银行卡
        {
            path: '/bankcard',
            component: ()=> import('@/components/Manage/BankCard/Entry'),
            meta: { title: 'bankcard', isHideFooter:true }
        },
        // 绑定银行卡
        {
            path: '/band-bankcard',
            component: ()=> import('@/components/Manage/BankCard/绑定银行卡'),
            meta: { title: 'band-bankcard', isHideFooter:true }
        },
        // 交易记录
        {
            path: '/lransactionlog',
            component: ()=> import('@/components/Manage/Lransactionlog/Entry'),
            meta: { title: 'lransactionlog', isHideFooter:true, }
        },
        // 账单详情
        {
            path: '/account',
            component: ()=> import('@/components/Manage/Lransactionlog/账单详情'),
            meta: { title: 'account', isHideFooter:true }
        },
        // 关注
        {
            path: '/follow',
            component: ()=> import('@/components/Manage/Follow/Entry'),
            meta: { title: 'follow', isHideFooter:true }
        },
        // 团队管理
        {
            path: '/teams',
            component: ()=> import('@/components/Manage/Teams/Entry'),
            meta: { title: 'teams', isHideFooter:true, }
        },
        {
            path: '/userDetail',
            component: ()=> import('@/components/Manage/Teams/userDetail'),
            meta: { title: 'userDetail', isHideFooter:true }
        },
        {
            path: '/teamDetail',
            component: ()=> import('@/components/Manage/Teams/teamDetail'),
            meta: { title: 'userDetail', isHideFooter:true }
        },
        // 团队管理
        {
            path: '/share',
            component: ()=> import('@/components/Manage/Share/Entry'),
            meta: { title: 'share', isHideFooter:true }
        },
        // 设置
        {
            path: '/setting',
            component: ()=> import('@/components/Manage/Setting/Entry'),
            meta: { title: 'setting', isHideFooter:true, keepAlive:false }
        },
        //开奖列表
        {
            path: '/historyOpen',
            component: ()=> import('@/components/HistoryOpen/Entry'),
            meta: { title: 'setting', isHideFooter:false }
        },
        //开奖详情
        {
            path: '/historyOpenDetail',
            component: ()=> import('@/components/HistoryOpen/详情页'),
            meta: { title: 'setting', isHideFooter:true }
        },
        //找回资金密码
        {
            path: '/findpswzj',
            component: ()=> import('@/components/Manage/FindPaw/找回资金密码'),
            meta: { title: 'setting', isHideFooter:true }
        },
        //优惠活动
        {
            path:'/activity',
            component: ()=> import('@/components/Activity/Entry'),
            meta: { title: 'setting', isHideFooter:true }
        }
    ]
})
export default router
