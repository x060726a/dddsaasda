export default {
    data(){
        return{
            isUsePullUp:true,
            pullDownObj:{
                downContent: "<span class='loading-text'>下拉刷新</span>",
                upContent: "<span class='loading-text'>释放后更新</span>",
                loadingContent:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
            },
            pullUpObj:{
                upContent:"<span class='loading-text'></span>",
                downContent: "<span class='loading-text'>释放后加载</span>",
                loadingContent:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
            },
            socket:''
        }
    },
    created(){

    },
    methods:{
        routerGoBack(){
            this.$router.go(-1)
        },
        kefu(){
            console.log('联系客服');
        },
        //签到
        getDaka(){
            var that = this
            that.$vux.loading.show({
                text: '签到中',
            })
            that.$get('userSign',{}).then(res=>{
                that.$vux.loading.hide();
                if(res.code==0){
                    that.$vux.toast.text('签到成功','bottom');
                }
            })
        },
        //获取彩种详情
        getLotteryDetail(id){
            var that = this
            that.$get('gameDetails',{lottery_id:id}).then(res=>{
                //that.$store.commit('setBetList',res.data.betsList)
            })
        },
        //更新用户信息
        upuserData(data){
            var that = this
            return new Promise(resolve=>{
                that.$post('upuserinfo',data).then(res=>{
                    resolve(res)
                })
            })
        },
        //获取用户信息
        getuserInfo(){
            var that = this
            return new Promise(resolve=>{
                that.$get('userinfo',{}).then(res => {
                    if(res.code==0){
                        that.$store.commit('userinfo',res.data)
                    }
                    resolve(res)
                },err=>{
                    resolve(false)
                })
            })
        },
        //转化时间 ///
        ConversionTime(str){
            var timeStep = str*1000,
            year = new Date(timeStep).getFullYear(),
            month = new Date(timeStep).getMonth()+1,
            day = new Date(timeStep).getDate(),
            hour = new Date(timeStep).getHours(),
            miu = new Date(timeStep).getMinutes();
            return year+'/'+(month<10?'0'+month:month)+'/'+(day<10?'0'+day:day)+' '+(hour<10?'0'+hour:hour)+':'+(miu<10?'0'+miu:miu)
        },
        //转化时间 ---
        ConversionTimeL(str){
            var timeStep = str*1000,
            year = new Date(timeStep).getFullYear(),
            month = new Date(timeStep).getMonth()+1,
            day = new Date(timeStep).getDate(),
            hour = new Date(timeStep).getHours(),
            miu = new Date(timeStep).getMinutes();
            return year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)+' '+(hour<10?'0'+hour:hour)+':'+(miu<10?'0'+miu:miu)
        },
         //转化时间 年月日
         ConversionTimeNYR(str){
            var timeStep = str*1000,
            year = new Date(timeStep).getFullYear(),
            month = new Date(timeStep).getMonth()+1,
            day = new Date(timeStep).getDate(),
            hour = new Date(timeStep).getHours(),
            miu = new Date(timeStep).getMinutes();
            return year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)
        },
         //转化时间 月日
        ConversionTimeYR(str){
            var timeStep = str*1000,
            month = new Date(timeStep).getMonth()+1,
            day = new Date(timeStep).getDate()
            return (month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)
        },
        //转化时间 小时 分钟
        ConversionTimeHour(str){
            var timeStep = str*1000,
            hour = new Date(timeStep).getHours(),
            miu = new Date(timeStep).getMinutes();
            return (hour<10?'0'+hour:hour)+':'+(miu<10?'0'+miu:miu)
        },
        //转化时间
        ConversionTimeMD(str){
            var timeStep = str*1000,
            month = new Date(timeStep).getMonth()+1,
            day = new Date(timeStep).getDate(),
            hour = new Date(timeStep).getHours(),
            miu = new Date(timeStep).getMinutes();
            return (month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)
        },
        //补0
        buling(str){
            return str*1<10?'0'+str:str
        }
    }
}
