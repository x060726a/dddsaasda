export const apis = {
    setting: '/v1/home/settings', // 平台配置
    reg: '/v1/user/signup', // 注册
    login: '/v1/user/login', // 登录
    honeData: '/v1/home/index', // 首页数据
    getRate: '/v1/trans/gameinfo', // 获取彩种赔率信息
    Notice: '/v1/home/notice', // 公告、消息中心
    verCode: '/v1/user/send-verify-code', // 验证码
    gameInfo: '/v1/trans/gameinfo', // 获取彩种赔率信息
    userinfo: '/v1/user/info', // 用户信息
    upuserinfo:'/v1/user/update',//更新用户信息
    bankcard:'/v1/user/bank-cards',//获取银行卡
    banklist:'/v1/user/bank-list',//获取银行列表
    bindbankcard:'/v1/user/bind-bank-card',//绑定银行卡
    setConinPasw:'/v1/user/set-coin-password',// 设置资金密码
    fans:'/v1/user/fans', // 粉丝
    follows:'/v1/user/follows',// 我的关注
    cancelFollows:'/v1/user/follows-del', // 取消关注
    gameDetails: '/v1/home/lottery-byid', // 获取游戏详情
    bets: '/v1/trans/bets', // 投注
    traceBet: '/v1/trans/trace-bets', // 追号
    betRecord: '/v1/trans/bets-records', // 投注记录
    proxyReport:'/v1/team/proxy-report', // 代理报表
    memberReport:'/v1/team/member-report', // 会员报表
    memberView:'/v1/team/member-view', // 会员详情
    selfStat:'/v1/team/self-stat', // 自身统计
    gameTime:'/v1/home/lottery-time', // 游戏时间获取
    LotteryNewBonus:'/v1/home/open-code', // 获取所有彩种最新开奖
    someLotteryBonus:'/v1/home/open-code-by-id', // 获取特定彩种
    follBet: '/v1/followbet/index', // 跟单首页
    follBetDetils: '/v1/followbet/view', // 跟单详情
    follBetList: '/v1/followbet/list', // 跟单列表
    folluserBet: '/v1/followbet/user-initiated', // 用户跟单列表
    follUser: '/v1/user/follows-add', // 关注
    payments:'/v1/trans/payments',// 充值方式
    follBets: '/v1/trans/follow-bet', // 跟单投注
    forgetPwd: 'v1/user/forget-password', // 忘记密码
    trans:'/v1/trans/list',// 投注记录
    transLotteries:'/v1/trans/lotteries',// 投注记录里的彩种列表
    recharge:'/v1/trans/recharge',// 充值
    rgDiscount: '/v1/promotion/deposit-list', // 充值优惠
    transRecord:'/v1/trans/record',// 交易记录
    withdrawal:'/v1/trans/withdrawal',// 提现
    userTask:'/v1/user/personal-task',// 个人任务
    doneTask:'/v1/user/task',// 今日任务，任务达成
    getTask:'/v1/user/receive-task-reward',// 领取任务
    transView:'/v1/trans/view',// 投注记录详情
    recordDetails:'v1/trans/record-details',// 交易记录详情
    cancelBet:'/v1/trans/cancel-bet',// 撤单
    askRoad:'/v1/trans/ask-road',// 开奖走势图
    logout:'/v1/user/logout',// 退出登录
    lotteryTime:'/v1/home/lottery-time',// 获取游戏时间
    myTraceBets:'/v1/trans/my-trace-bets',// 我的追号
    userSign:'/v1/user/sign',// 每日签到
    teamTable:'/v1/team/team-report',// 团队报表
    teamDetail:'/v1/team/team-view',// 团队报表详情
    activityList:'/v1/promotion/list',// 活动列表
}
