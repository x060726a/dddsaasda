
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    lastRouteName:'',
    routerStatus:'',
    taskDownShowActive:'',
    taskActive:0,
    taskTransitionName:'left',
    userinfo:'',
    headPopover: false,
    isCloseGame: false, // 是否封盘
    cedanObj:'',
    qihao:'',
    isSearch:false,
    websock:'',
    betOrderNum:0,
    // 开奖号码
    lotterCode: {
      code10: null, code11: null, code12: null, code20: null, code21: null, code22: null, code23: null, code30: null, code31: null, code70: null, code71: null, code40: null, code50: null
    },
    betList:[],
    isShowBetListDalog:false,
  },
  getters: {
    websock(){
      return state.websock
    },
    isShowBetListDalog(state){
      return state.isShowBetListDalog
    },
    updateLotteryCode (state) {
      return state.lotterCode
    },
    routerStatus(state){
      return state.routerStatus
    },
    taskDownShowActive(state){
      return state.taskDownShowActive
    },
    taskActive(state){
      return state.taskActive
    },
    taskTransitionName(state){
      return state.taskActive
    },
    userinfo(state){
      return state.userinfo
    },
    headPopover(state){
      return state.userinfo
    },
    isCloseGame(state){
      return state.isCloseGame
    },
    cedanObj(state){
      return state.cedanObj
    },
    betOrderNum(state){
      return state.betOrderNum
    },
    betList(state){
      return state.betList
    }
  },
  mutations: {
    websock(state,val){
      state.websock = val;
    },
    isSearch(state,val){
      console.log(val)
      state.isSearch = val;
    },
    qihao(state,val){
      state.qihao = val;
    },
    isShowBetListDalog(state,val){
      state.isShowBetListDalog = val;
    },
    updateLotteryCode (state, obj) {
      return state.lotterCode.code10 = obj.code10, state.lotterCode.code11 = obj.code11, state.lotterCode.code12 = obj.code12, state.lotterCode.code20 = obj.code20,
      state.lotterCode.code21 = obj.code21, state.lotterCode.code22 = obj.code22, state.lotterCode.code23 = obj.code23, state.lotterCode.code30 = obj.code30,
      state.lotterCode.code31 = obj.code31, state.lotterCode.code70 = obj.code70, state.lotterCode.code71 = obj.code71, state.lotterCode.code40 = obj.code40, state.lotterCode.code50 = obj.code50
    },
    lastRouteName(state,val){
      state.lastRouteName = val
    },
    routerStatus(state,val){
      state.routerStatus = val;
    },
    taskDownShowActive(state,val){
      state.taskDownShowActive = val;
    },
    taskActive(state,val){
      state.taskActive = val;
    },
    taskTransitionName(state,val){
      state.taskTransitionName = val;
    },
    userinfo(state,val){
      if(state.userinfo==''){
        state.userinfo = val
      }else{
        Object.assign(state.userinfo,val)
      }
      if(val==''){
        localStorage.removeItem('userinfo')
      }else{
        localStorage.setItem('userinfo',JSON.stringify(state.userinfo))
      }
    },
    funGetUserinfo(state){
      return 'dsadsadsa'
    },
    changeCoin(state,val){
      state.userinfo.coin = val
      localStorage.setItem('userinfo',JSON.stringify(state.userinfo))
    },
    headPopover(state,val){
      state.headPopover = val;
    },
    isCloseGame(state,val){
      state.isCloseGame = val;
    },
    cedanObj(state,val){
      state.cedanObj = val;
    },
    betOrderNum(state){
      state.betOrderNum++;
    },
    setBetList(state,val){
      state.betList = val || []
      if(state.betList.length==0){
        state.isShowBetListDalog = false
      }
    },
    pushBetList(state,val){
      state.betList.push(val)
    },
    delBetList(state,val){
      var index
      state.betList.forEach((ele,idx) => {
        if(ele.id*1==val*1){
          index = idx
        }
      });
      state.betList.splice(index,1);
      if(state.betList.length==0){
        state.isShowBetListDalog = false
      }
    }
  }
})
