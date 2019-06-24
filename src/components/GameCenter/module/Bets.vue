<template>
    <section class="betBox" @touchstart="$emit('close'), reset()" ref="betBox">
        <div class="bets" ref="main">
            <div class="content clearfix" @touchstart.stop="" @touchmove.stop="" @touchend.stop="">
                <!--玩法类型-->
                <nav class="menu">
                    <scroller lock-x ref="scroller" height="100%">
                        <div>
                            <span v-for="(res, key) in betData" :key="key" :class="{active: key === active}" @click.stop="active = key, trackNum = 1, trackMult = 1, money = 50, chipMoney = 50, liuhe.key = 0, chipNum = 0, trackList = [], trackBool = false, reset()">
                                {{res.group}}
                                <i v-if="key === active"></i>
                            </span>
                        </div>
                    </scroller>
                </nav>
                <!--时时彩详细玩法-->
                <div v-if="gameCode === 'sscGame'" class="detailed">
                    <div class="container" v-for="(res, key) in betData" :key="key" v-if="key === active">
                        <div class="ball-num" v-if="res.list.length > 1" @touchstart.prevent="selectBall(res.list)" ref="ballNum"><em>{{res.list[0].name}}</em><i class="icon"></i></div>
                        <scroller lock-x ref="scroRight" height="100%">
                            <div class="clearfix">
                                <section class="betList" ref="betList" v-for="(item, key) in res.list" :key="key">
                                    <h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" :class="{r: key % 2 !== 0, betSelected: data.selected}" @touchstart.prevent="betCheck(data, res.group)">
                                            <em :class="{sscNum: !isNaN(data.name)}">{{data.name}}</em>
                                            <i class="odds">{{parseFloat(data.odds)}}</i>
                                        </span>
                                    </div>
                                </section>
                                <p class="explain" @click.stop="oddsShow = true">赔率说明</p>
                            </div>
                        </scroller>
                    </div>
                </div>
                <!--赛车详细玩法-->
                <div v-if="gameCode === 'sc'" class="detailed">
                    <div class="container" v-for="(res, key) in betData" :key="key" v-if="key === active">
                        <div class="ball-num" v-if="res.list.length > 1" @touchstart.prevent="selectBall(res.list)" ref="ballNum"><em>{{res.list[0].name}}</em><i class="icon"></i></div>
                        <scroller lock-x ref="scroRight" height="100%">
                            <div class="clearfix">
                                <section class="betList" ref="betList" v-for="(item, key) in res.list" :key="key" v-if="res.group !== '猜冠亚'">
                                    <h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>
                                    <div class="list-detailed clearfix">
                                            <span v-for="(data, key) in item.list" :key="key" :class="{r: key % 2 !== 0, sp100: item.name == '猜区段' , betSelected: data.selected}" @click.prevent="betCheck(data, res.group)">
                                                <em :class="{['scNum scNum' + data.name]: !isNaN(data.name) && item.name !== '猜数字'}">{{data.name}}</em>
                                                <b v-if="data.alias">{{data.alias}}</b>
                                                <i class="odds">{{data.odds}}</i>
                                            </span>
                                    </div>
                                </section>
                                <!--猜冠亚单独处理-->
                                <section class="betList" ref="betList" v-for="(item, key) in res.list" :key="key" v-if="res.group == '猜冠亚'">
                                    <h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>
                                    <div class="list-detailed clearfix">
                                            <span class="carGuan" v-for="(data, key) in carGuanYa" :key="key" :class="{betSelected: data.selected}" @click.prevent="betCheck(data, res.group, item.list[0])">
                                                <strong :class="{['guanNum scNum' + data.code]: true}"> {{data.code}}</strong>
                                            </span>
                                    </div>
                                    <p style="color: #d9342f;">倍数：{{parseFloat(item.list[0].odds)}}</p>
                                    <p style="color: #999; text-align: justify;">备注：每次竞彩需要两个号码，顺序不限（两个号码为一注）</p>
                                </section>
                                <p class="explain" @click.stop="oddsShow = true">赔率说明</p>
                            </div>
                        </scroller>
                    </div>
                </div>
                <!--幸运28详细玩法-->
                <div v-if="gameCode === '28Game'" class="detailed">
                    <div class="container" v-for="(res, key) in betData" :key="key" v-if="key === active">
                        <div class="ball-num" v-if="res.list.length > 1" @touchstart.prevent="selectBall(res.list)" ref="ballNum"><em>{{res.list[0].name}}</em><i class="icon"></i></div>
                        <scroller lock-x ref="scroRight" height="100%">
                            <div class="clearfix">
                                <section class="betList" ref="betList" v-for="(item, key) in res.list" :key="key">
                                    <h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" :class="{r: key % 2 !== 0, betSelected: data.selected}" @click.prevent="betCheck(data, res.group)">
                                            <em :class="{['numBox numBox' + data.name]: !isNaN(data.name)}">{{data.name}}</em>
                                            <b v-if="data.alias">{{data.alias}}</b>
                                            <i class="odds">{{data.odds}}</i>
                                        </span>
                                    </div>
                                </section>
                                <p class="explain" @click.stop="oddsShow = true">赔率说明</p>
                            </div>
                        </scroller>
                    </div>
                </div>
                <!--欢乐骰宝详细玩法-->
                <div v-if="gameCode === 'shaibao'" class="detailed">
                    <div class="container" v-for="(res, key) in betData" :key="key" v-if="key === active">
                        <div class="ball-num" v-if="res.list.length > 1" @touchstart.prevent="selectBall(res.list)" ref="ballNum"><em>{{res.list[0].name}}</em><i class="icon"></i></div>
                        <scroller lock-x ref="scroRight" height="100%">
                            <div class="clearfix">
                                <section class="betList" ref="betList" v-for="(item, key) in res.list" :key="key">
                                    <h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" :class="{r: key % 2 !== 0, betSelected: data.selected, quanWei: item.name == '猜围骰'}" @click.prevent="betCheck(data, res.group)" v-if="data.name != '全骰'">
                                            <em :class="{['shaiBox shaiBox' + data.name]: !isNaN(data.name) && item.name !== '猜总和' || (item.name == '猜对子' || item.name == '猜双骰' || item.name == '猜围骰')}">{{data.name}}</em>
                                            <em :class="{['shaiBox shaiBox' + data.name]: true}" v-if="item.name == '猜对子' || item.name == '猜双骰' || item.name == '猜围骰'"></em>
                                            <em :class="{['shaiBox shaiBox' + data.name]: true}" v-if="item.name == '猜围骰'" style="margin-right: 0;"></em>
                                            <b v-if="data.alias">{{data.alias}}</b>
                                            <i class="odds">{{data.odds}}</i>
                                        </span>
                                        <!--全骰-->
                                        <span v-for="(data, key) in item.list" :key="key" :class="{spQuanwei : true, betSelected: data.selected}" v-if="data.name == '全骰'" @click.prevent="betCheck(data, res.group)">
                                            <em class="wleft">
                                                <i>{{data.name}}</i>
                                                <i class="weiOdds">{{data.odds}}</i>
                                            </em>
                                            <em class="wright">
                                                <em v-for="(obj, i) in 18" :key="i" :class="'shaiBox quanWei' + i"></em>
                                            </em>
                                        </span>
                                    </div>
                                </section>
                                <p class="explain" @click.stop="oddsShow = true">赔率说明</p>
                            </div>
                        </scroller>
                    </div>
                </div>
                <!--百人牛牛-->
                <div v-if="gameCode === 'niuniu'" class="detailed">
                    <div class="container" v-for="(res, key) in betData" :key="key" v-if="key === active">
                        <div class="ball-num" v-if="res.list.length > 1" @touchstart.prevent="selectBall(res.list)" ref="ballNum"><em>{{res.list[0].name}}</em><i class="icon"></i></div>
                        <scroller lock-x ref="scroRight" height="100%">
                            <div class="clearfix">
                                <section class="betList" ref="betList" v-for="(item, key) in res.list" :key="key">
                                    <h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" :class="{r: key % 2 !== 0, betSelected: data.selected}" @click.prevent="betCheck(data, res.group)">
                                            <em :class="{['niuNum niuNum' + data.name]: res.group == '猜牌面', 'emRed': data.name == '红方胜', 'emBlue': data.name == '蓝方胜'}">{{data.name}}</em>
                                            <i class="odds">{{data.odds}}</i>
                                        </span>
                                    </div>
                                </section>
                                <p class="explain" @click.stop="oddsShow = true">赔率说明</p>
                            </div>
                        </scroller>
                    </div>
                </div>
                <!--六合彩详细玩法-->
                <div v-if="gameCode === 'liuhe'" class="detailed">
                    <div class="container" v-for="(res, key) in betData" :key="key" v-if="key === active">
                        <div class="ball-num" v-if="res.list.length > 1 && res.group !== '正码1-6' && res.group !== '正1-6龙虎'" @touchstart.prevent="selectBall(res.list, '六合')" ref="ballNum"><em>{{res.list[0].name}}</em><i class="icon"></i></div>
                        <div class="ball-num" v-if="res.group == '正码1-6' || res.group == '正1-6龙虎'" @touchstart.prevent="selectBall(res.list)" ref="ballNum"><em>{{res.list[0].name}}</em><i class="icon"></i></div>
                        <scroller lock-x ref="scroRight" height="100%">
                            <div class="clearfix">
                                <!--特码、正码、正特-->
                                <section class="betList" v-for="(item, key) in res.list" :key="key" v-if="key == liuhe.key && (res.group == '特码' || res.group == '正码' || res.group == '正特')">
                                    <!--<h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>-->
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" :class="{r: key % 2 !== 0, betSelected: data.selected, s30: !isNaN(data.name), s30g: !isNaN(data.name) && (key + 1) % 3 == 0}" @click="betCheck(data, res.group)">
                                            <em :class="{['liuBox liuBox' + data.name]: !isNaN(data.name)}">{{data.name}}</em>
                                            <i class="odds">{{data.odds}}</i>
                                        </span>
                                    </div>
                                </section>
                                <!--连码、不中-->
                                <section class="betList" v-for="(item, key) in res.list" :key="key" v-if="res.group == '连码' || res.group == '不中'">
                                    <div class="ball-num" @touchstart.prevent="selectBall(item.list, '六合')"><em>{{item.list[liuhe.key].name}}</em><i class="icon"></i></div>
                                    <!--<h3>{{res.group}}</h3>-->
                                    <div class="list-detailed clearfix" v-if="item.list[liuhe.key].name == '三全中' || item.list[liuhe.key].name == '二全中' || item.list[liuhe.key].name == '特串' || res.group == '不中'">
                                        <span v-for="(data, key) in liuhe.mashu" :key="key" class="s30" :class="{'s30g': (key + 1) % 3 == 0,  betSelected: data.selected}"  @click.prevent="betCheck(data, res.group, item.list[liuhe.key])">
                                            <em :class="{['liuBox liuBox' + data.code] : true}">{{data.code}}</em>
                                            <i class="odds">{{item.list[liuhe.key].odds}}</i>
                                        </span>
                                    </div>
                                    <div class="list-detailed clearfix" v-if="item.list[liuhe.key].name == '三中二' || item.list[liuhe.key].name == '二中特'">
                                        <span v-for="(data, key) in liuhe.mashu" class="sbig s30" :key="key" :class="{'s30g': (key + 1) % 3 == 0, r: key % 2 !== 0,  betSelected: data.selected}" @click.prevent="betCheck(data, res.group, item.list[liuhe.key])">
                                            <em :class="{['liuBox liuBox' + data.code] : true}">{{data.code}}</em>
                                            <b>{{item.list[liuhe.key].odds}}</b>
                                        </span>
                                    </div>
                                </section>
                                <!--半波-->
                                <section class="betList" v-for="(item, key) in res.list" :key="key" v-if="res.group == '半波'">
                                    <h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" class="sp100 spBanbo" :class="{betSelected: data.selected}" @click="betCheck(data, res.group)">
                                            <strong class="banboBox">
                                                {{data.name}}
                                                <strong>x{{parseFloat(data.odds)}}</strong>
                                            </strong>
                                            <p class="banboBall">
                                                <i :class="liuhe.banbo[key].cls" v-for="(res, i) in liuhe.banbo[key].list" :key="i">{{res}}</i>
                                            </p>
                                        </span>
                                    </div>
                                </section>
                                <!--尾数、一肖、特肖-->
                                <section class="betList" v-for="(item, key) in res.list" :key="key" v-if="res.group == '尾数' || res.group == '一肖' || res.group == '特肖'">
                                    <h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" class="sp100 spComLiu" :class="{betSelected: data.selected}" @click="betCheck(data, res.group)">
                                            <strong class="ComliuBox">
                                                <i>{{data.name}}</i>
                                                <b>x{{parseFloat(data.odds)}}</b>
                                            </strong>
                                            <p class="ComliuBall" v-if="res.group == '尾数'">
                                                <i :class="{['liuBox' + res] : true}" v-for="(res, i) in liuhe.weishu[key].list" :key="i">{{res}}</i>
                                            </p>
                                            <p class="ComliuBall" v-if="res.group == '一肖' || res.group == '特肖'">
                                                <i :class="{['liuBox' + res] : true}" v-for="(res, i) in liuhe.shenxiao[key].list" :key="i">{{res}}</i>
                                            </p>
                                        </span>
                                    </div>
                                </section>
                                <!--连肖-->
                                <section class="betList" v-for="(item, key) in res.list" :key="key" v-if="key == liuhe.key && res.group == '连肖'">
                                    <!--<h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>-->
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" class="sp100 spComLiu" :class="{betSelected: liuhe.shenxiao[key].selected}" @click="betCheck(liuhe.shenxiao[key], res.group, data)">
                                            <strong class="ComliuBox">
                                                <i >{{data.alias}}</i>
                                                <b>x{{parseFloat(data.odds)}}</b>
                                            </strong>
                                            <p class="ComliuBall">
                                                <i :class="{['liuBox' + res] : true}" v-for="(res, i) in liuhe.shenxiao[key].list" :key="i">{{res}}</i>
                                            </p>
                                        </span>
                                    </div>
                                </section>
                                <!--连尾-->
                                <section class="betList" v-for="(item, key) in res.list" :key="key" v-if="key == liuhe.key && res.group == '连尾'">
                                    <!--<h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>-->
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" class="sp100 spComLiu" :class="{betSelected: liuhe.weishu[key].selected}" @click="betCheck(liuhe.weishu[key], res.group, data)">
                                            <strong class="ComliuBox">
                                                <i >{{data.alias}}</i>
                                                <b>x{{parseFloat(data.odds)}}</b>
                                            </strong>
                                            <p class="ComliuBall">
                                                <i :class="{['liuBox' + res] : true}" v-for="(res, i) in liuhe.weishu[key].list" :key="i">{{res}}</i>
                                            </p>
                                        </span>
                                    </div>
                                </section>
                                <!--正码1-6-->
                                <section class="betList" ref="betList" v-for="(item, key) in res.list" :key="key" v-if="res.group == '正码1-6' || res.group == '正1-6龙虎'">
                                    <h3 :class="{h3_b: res.list.length <= 1}">{{item.name}}</h3>
                                    <div class="list-detailed clearfix">
                                        <span v-for="(data, key) in item.list" :key="key" :class="{r: key % 2 !== 0, betSelected: data.selected}" @click="betCheck(data, res.group)">
                                            <em :class="{['liuBox liuBox' + data.name]: !isNaN(data.name)}">{{data.name}}</em>
                                            <i class="odds">{{parseFloat(data.odds)}}</i>
                                        </span>
                                    </div>
                                </section>
                                <p class="explain" @click.stop="oddsShow = true">赔率说明</p>
                            </div>
                        </scroller>
                    </div>
                </div>
            </div>
        </div>
        <!--投注-->
        <section v-if="isBet" @touchstart.stop="" @touchmove.stop="" @touchend.stop="">
            <!--暂未下注-->
            <div v-transfer-dom class="no_tabbar" >
                <popup :value="!betShow" position="bottom" :show-mask=false>
                    <!--默认显示-->
                    <section class="clearfix" v-if="!isNote">
                        <span>暂未下注</span><span>1元起投</span>
                    </section>
                    <!--加入注单点击显示-->
                    <section class="clearfix" v-else>
                        <p class="documentary" v-if="initiate">
                            <label class="noCheck" v-if="valCoin.Amount < 100 || betNum != 1">
                                是否要发布跟单
                            </label>
                            <label v-else for="trackd" ref="labelList" :class="{'label' : checkedBox}" @touchstart.prevent="ischecked()">
                                <input type="checkbox" id="trackd" class="checkbox" ref="checkTrack">是否要发布跟单
                            </label>
                            &nbsp;( 限制单注，自身投注不可低于100 )
                        </p>
                        <div class="betNum" @touchstart.prevent="isCon ? isCon = false : isCon = true">
                            <i class="i_con">{{betNum}}</i>
                            <div class="mp">
                                <p>总计：{{parseFloat(valCoin.Amount).toFixed(2)}}</p>
                                <p>共{{betNum}}注，单注预期可获<i v-if="valCoin.minMoney !== valCoin.maxMoney && valCoin.minMoney">{{parseInt(valCoin.minMoney)}}~</i>{{parseInt(valCoin.maxMoney)}}</p>
                            </div>
                        </div>
                        <button class="gobet" @touchstart.prevent="addList()">确认</button>
                    </section>
                </popup>
            </div>
            <!--已选注单-->
            <div v-transfer-dom class="bets_tabbar"  style="cursor :pointer;">
                <popup :value="betShow" id="bets" position="bottom" :show-mask=false>
                    <div class="chipList clearfix">
                        <span v-for="(res, key) in chipList" :class="{ckMoneyStyle: key === chipNum}" :key="key" @touchstart.prevent="selectChip(key, res)">{{res}}</span>
                        <button class="minBtn" @touchstart.prevent="chipMoney = 1, chipNum = -1, money = 1">最小投注</button>
                    </div>
                    <p class="tips">已选<i>{{betsNum}}</i>注，共计<i>{{parseFloat(amount).toFixed(2)}}</i>元，单注预期可获<i v-if="minMoney !== maxMoney && minMoney">{{minMoney}}~</i><i v-if="!isNaN(maxMoney)">{{maxMoney}}</i>元</p>
                    <div class="betFoot clearfix">
                        <input class="inp f" type="number" v-model="money" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' oninput="if(value.length>6)value=value.slice(0,6)" />
                        <button class="f" @touchstart.prevent="betting(betList)" ref="bet_btn">投注</button>
                        <button class="f" @touchstart.prevent="addBets()">加入注单</button>
                        <button class="f" @touchstart.prevent="reset()">取消</button>
                    </div>
                </popup>
            </div>
            <!--加入注单-->
            <div v-transfer-dom class="betCon">
                <popup :value="isCon" position="bottom" :show-mask=false>
                    <div class="head clearfix">
                        <strong>本期投注内容</strong>
                        <span @touchstart.prevent="emptyData = true">清空</span>
                    </div>
                    <ol class="betList">
                        <li v-for="(res, key) in validnote" :key="key" :class="{'liActive': key % 2 != 0}">
                            <span>{{res.groupName}}</span><span>{{res.group_name}}-{{res.name}}</span><span style="padding-left: 10px;">{{res.money}}元</span>
                            <span class="d" @touchstart.prevent="delList(res, key)"><i></i></span>
                        </li>
                    </ol>
                </popup>
                <div class="maskCon" @touchstart.stop="isCon ? isCon = false : isCon = true" @touchmove.stop="" @touchend.stop="" v-if="isCon"></div>
            </div>
        </section>
        <!--追号-->
        <section v-else @touchstart.stop="" @touchmove.stop="" @touchend.stop="">
            <div class="track" v-if="trackBol">
                <section class="trackBox">
                    <div class="trackTop">
                        <div class="track_type clearfix">
                            <strong>{{trackValType}}</strong>
                            <p>
                                <span>投注金额：</span>
                                <input type="number" v-model="money" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' oninput="if(value.length>6)value=value.slice(0,6)" />
                            </p>
                        </div>
                        <div class="establish clearfix">
                            <p>
                                <span class="f">期数：</span>
                                <input type="number" v-model="trackNum" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' oninput="if(value.length>2)value=value.slice(0,2)" />
                            </p>
                            <p class="p1">
                                <span class="f">翻倍：</span>
                                <input type="number" v-model="trackMult" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' oninput="if(value.length>2)value=value.slice(0,2)" />
                            </p>
                            <button class="esta_btn" @touchstart.prevent="estabList()">创建</button>
                        </div>
                    </div>
                    <div class="trackList" v-if="trackBool">
                        <p class="nav">
                            <em>期号</em><em>投注金额</em><em>翻倍</em>
                        </p>
                        <ol>
                            <li v-for="(res, key) in trackList" :key="key">
                                <em>{{res.qihao}}</em><em>￥{{res.money}}</em><em>{{res.money / trackMoney}}倍</em>
                            </li>
                        </ol>
                    </div>
                    <div class="tracking" v-if="trackBool">
                        <div class="trackLeft">
                            <label for="track" ref="label" :class="{'label' : checkedBox}" @touchstart.prevent="ischecked()">
                                <input type="checkbox" id="track" class="checkbox" ref="checkTrack">是否追停
                            </label>
                        </div>
                        <button class="trackBtn" @touchstart.prevent="trackShow = true">确定追号</button>
                    </div>
                </section>
            </div>
            <div class="maskCon" @click.stop="reset(), trackBol = !trackBol" v-if="trackBol"></div>
        </section>
        <!--弹窗类型选择-->
        <div v-transfer-dom >
            <popup v-model="popupliuhe" position="bottom" :show-mask=false class="bankcard-pancel ignore" :popup-style="{zIndex: 600}">
                <div class="popup-head"><span @click="popupliuhe=false">取消</span><span @click="confirmType()">确定</span></div>
                <picker :data='typeName' :fixed-columns="1" :columns="3" v-model='data1Value'></picker>
            </popup>
            <div class="maskCon" @touchstart.prevent="popupliuhe = !popupliuhe" @touchmove.stop="" @touchend.stop="" v-if="popupliuhe"></div>
        </div>
        <!--加入注单、确定追号（投注弹窗）-->
        <div v-transfer-dom>
            <confirm v-model="goBetShow" title="温馨提示" @on-confirm="betting(validnote, false, 'tracking')">本次投注{{valCoin.Amount}}元</confirm>
            <confirm v-model="trackShow" title="温馨提示" @on-confirm="betting(trackBetList, true)">本次投注{{amount}}元</confirm>
            <confirm v-model="emptyData" title="温馨提示" @on-confirm="clearAll()">是否清空所有注单</confirm>
            <confirm v-model="noMoney" title="温馨提示" @on-confirm="$router.push('/recharge')">您的余额不足，请充值！</confirm>
        </div>
        <!--发布跟单-->
        <div v-transfer-dom>
            <div class="maskRelease" v-if="releaseWith">
                <estab :Amount="valCoin.Amount" :lotteryName="$route.name" @clxRele="releaseWith = false" @subInfo="subInfo"></estab>
            </div>
        </div>
        <!--赔率说明-->
        <div v-transfer-dom class="statement">
            <confirm v-model="oddsShow" title="赔率说明" :show-cancel-button="false">
                <p class="tip-text" v-if="gameid == 10 || gameid == 11 || gameid == 12">
                    本房间赔率<br/>1.猜双面：第一球-第五球大/小/单/双/质/合：1.96倍。<br/>2.猜球数字：第一球-第五球数字(0～9)：9.8倍，以上赔率均含本金。
                </p>
                <p class="tip-text" v-if="gameid == 20 || gameid == 21 || gameid == 22 || gameid == 23">
                    本房间赔率：<br/>1.大小单双：<br/>（1）猜双面：含本1.98倍。<br/>（2）大单、小双：含本4.5倍。<br/>（3）小单、大双：含本3.0倍。<br/>2.猜冠亚：含本42倍。<br/>3.猜龙虎：含本1.96倍。<br/>4.冠亚和<br/>（1）大、双：含本2.19倍。<br/>
                    （2）小、单：含本1.78倍。<br/>（3）3、4、18、19：含本42倍。<br/>（4）5、6、16、17：含本21倍。<br/>（5）7、8、14、15：含本14倍。<br/>（6）9、10、12、13：含本10倍。<br/>（7）11：含本8.0倍。<br/>
                </p>
                <p class="tip-text" v-if="gameid == 30">
                    1.大小单双赔率2倍。<br/>2.组合(小单|大双)4.6倍。<br/>3.组合（小双|大单）4.2倍。<br/>4.开13/14,总注小于等于10000时,大小单双赔率1.5倍，组合赔率1倍。<br/>5.开13/14,总注大于10000时，大小单双赔率1倍,组合赔率1倍。<br/>
                    输分返水说明：100-5000 2%，5001-50000 3%，50001-999999 4%。
                </p>
                <p class="tip-text" v-if="gameid == 70 || gameid == 71">
                    1.特码A/B:(1～49)48.8倍，总和大/总和小/总和单/总和双/龙/虎/总尾大/总尾小/合大/合小/合单/合双/家禽/野兽1.96倍，区段(A～E)4倍，红波2.8倍，蓝波/绿波2.9倍。<br/>
                    2.正码A/B:(1～49)7.5倍，总和大/总和小/总和单/总和双/龙/虎/总尾大/总尾小1.96倍。<br/>
                    3.正特(1～6):(1～49)42倍，尾大/尾小/大/小/单/双/合单/合双1.96倍，红波2.8倍，蓝波/绿波2.9倍。<br/>
                    4.连码:三全中650倍，三中二20倍/90倍，二全中60倍，二中特30倍/47倍，特串150倍。<br/>
                    5.半波:红单/绿单/蓝单/绿双/蓝双/红大/绿大/绿小/蓝小/绿合单/蓝合单/红合双/蓝合双/绿合双5.02倍，红双/蓝大/红合单4.54倍，红小4.04倍。<br/>
                    6.尾数:0尾2倍，(1尾～9尾)1.8倍。<br/>
                    7.一肖:鼠/牛/虎/兔/龙/蛇/马/羊/猴/鸡/猪2.06倍，狗1.85倍。<br/>
                    8.特肖:鼠/牛/虎/兔/龙/蛇/马/羊/猴/鸡/猪11.2倍，狗9.50倍。<br/>
                    9.连肖:二肖连中4.06倍(狗3.61倍)，三肖连中10.68倍(狗8.57倍)四肖连中31.15倍(狗25.28倍)，二肖连不中3.11倍(狗3.5倍)，三肖连不中7.12倍(狗7.6倍)，四肖连不中17.8倍(狗18.86倍)。<br/>
                    10.连尾:二尾连中3.02倍(0尾3.22倍)，三尾连中6.4倍(0尾6.74倍)，四尾连中15.13倍(0尾16.11)，二尾连不中4.53倍(0尾3.56倍)，三尾连不中13.36倍(0尾10.68倍)，四尾连不中45.39倍(36.49倍)。<br/>
                    11.不中:五不中2.10倍，六不中2.6倍，七不中3.1倍，八不中3.7倍，九不中4.3倍，十不中5.3倍。<br/>
                    12.正码1-6:大/小/单/双/尾大/尾小/合大/合小/合单/合双1.96倍，红波2.8倍，绿波.蓝波2.9倍。<br/>
                    13.正1-6龙虎:龙/虎1.96倍。
                    以上赔率均含本金。
                </p>
                <p class="tip-text" v-if="gameid == 40">
                    1.大小单双赔率2倍<br/>2.组合(小单|大双)4.6倍。<br/>3.组合（小双|大单）4.2倍。<br/>4.开13/14,总注小于等于10000时,大小单双赔率1.5倍,组合赔率1倍。<br/>5.开13/14,总注大于10000时,大小单双赔率1倍,组合赔率1倍。<br/>输分返水说明：<br/>100-5000 2%<br/>5001-50000 3%<br/>50001-999999 4%
                </p>
                <p class="tip-text" v-if="gameid == 50">
                    百人牛牛赔率说明：<br/>1.猜牛牛：<br/>（1）牛①—牛⑨：含本8.8倍。<br/>（2）牛牛：含本11倍。<br/>（3）无牛：含本2.5倍。<br/>（4）花色牛：含本600倍。<br/>2.猜牌面：第一张-第五张：含本12倍。<br/>3.猜双面：第一张-第五张。<br/>（1）(大/单)含本1.6倍。<br/>（2）(小/双)含本1.9倍<br/>（3）(大单)含本2.88倍<br/>（4）(大双/小单/小双)含本3.88倍<br/>4.猜胜负：（红方胜/蓝方胜）含本1.96倍<br/>
                </p>
            </confirm>
        </div>
    </section>
</template>

<script>
    import { Popup, Confirm } from 'vux'
    import {resultData, sortArray, getNewDate} from '@/assets/js/util'
    export default {
        name: "Bets",
        components: {
            Popup,
            Confirm,
            estab(){
                return {
                    component: import('../../Documentary/establishDocumentary')
                }
            },
        },
        props: {
            uid: '', // 用户ID
            initiate: Number, // 用户是否有权限发布跟单
            gameCode: String, // 游戏编码
            isBet: Boolean, // 投注或者追号
            betData: { // 游戏玩法赔率
                type: Array,
                required: true
            },
            gameid: Number, // 彩种ID
            ftime: Number, // 截止投注时间
            lotteryNum: Number, // 每日期数
            qihao: '', // 投注期号
            nickname: String, // 用户昵称
            level: String, // 会员等级
            avatar: String, // 会员头像
            coin: '' // 用户余额
        },
        data () {
            return {
                gameName: '', // 彩种名称
                noMoney: false, // 余额不足提示
                oddsShow: false, // 赔率弹窗
                goBetShow: false, // 加入注单弹窗
                trackShow: false, // 确定追号弹窗
                betShow: false, // 是否下注
                isNote: false, // 是否选择加入注单
                isCon: false, // 显示投注内容
                isConMask: false, // 投注内容遮罩
                trackBol: false, // 是否追号
                trackBool: false, // 是否显示追号列表
                firstClick: true, // 防止用户投注重复点击
                checkedBox: true, // 是否追号、发布跟单
                releaseWith: false, // 发布跟单弹窗
                emptyData: false, // 是否清空加入注单数据
                initiateBet: null, // 创建跟单相关数据
                trackMoney: 0, // 追号金额
                trackNum: 1, // 追号期数
                trackMult: 1, // 追号倍数
                trackQihao: [], // 追号期数集合
                trackValType: '', // 追号类型名称
                chipList: [50, 100, 500, 1000, 5000, 'x'],
                active: 0, //选中彩种
                chipNum: 0, // 筹码选择
                chipMoney: 50, // 筹码金额 （默认50）
                betsNum: 0, // 下注笔数
                betNum: 0, // 加入注单笔数
                money: 50, // 金额 （默认50）
                amount: 0, // 总金额
                minMoney: 0, // 单注最低预期可获金额
                maxMoney: 0, // 单注最高预期可获金额
                Odds: '', // 单注赔率
                minOdds: '', // 最小赔率
                maxOdds: '', // 最大赔率
                betList: [], // 投注List集合
                trackBetList: [], // 追号list集合
                validnote: [], // 加入注单List集合
                valCoin: {
                    Amount: 0, // 加入注单总金额
                    minMoney: 0, // 加入注单单注最低金额
                    maxMoney: 0 // 加入注单单注最高金额
                },
                trackList: [], // 追号List集合
                codeList: [], // 复试投注号码集合
                playIds: [], // 六合彩连肖、连尾ID组
                playOdds: [], // 六合彩连肖、连尾赔率组
                minOddsId: '', // 六合彩连肖、连尾最小赔率ID
                carGuanYa: [ // 北京赛车PK10猜冠亚
                    {selected: false, code: 1}, {selected: false, code: 2}, {selected: false, code: 3}, {selected: false, code: 4}, {selected: false, code: 5},
                    {selected: false, code: 6}, {selected: false, code: 7}, {selected: false, code: 8}, {selected: false, code: 9}, {selected: false, code: 10}
                ],
                // 六合彩相关数据选择
                liuhe: {
                    key: 0, // 玩法类型
                    typeName: '', // 类型名称（连肖、连码、不中、连尾）单独处理
                    mashu: [ // 码数
                        {selected: false, code: 1}, {selected: false, code: 2}, {selected: false, code: 3}, {selected: false, code: 4}, {selected: false, code: 5}, {selected: false, code: 6}, {selected: false, code: 7}, {selected: false, code: 8}, {selected: false, code: 9}, {selected: false, code: 10},
                        {selected: false, code: 11}, {selected: false, code: 12}, {selected: false, code: 13}, {selected: false, code: 14}, {selected: false, code: 15}, {selected: false, code: 16}, {selected: false, code: 17}, {selected: false, code: 18}, {selected: false, code: 19}, {selected: false, code: 20},
                        {selected: false, code: 21}, {selected: false, code: 22}, {selected: false, code: 23}, {selected: false, code: 24}, {selected: false, code: 25}, {selected: false, code: 26}, {selected: false, code: 27}, {selected: false, code: 28}, {selected: false, code: 29}, {selected: false, code: 30},
                        {selected: false, code: 31}, {selected: false, code: 32}, {selected: false, code: 33}, {selected: false, code: 34}, {selected: false, code: 35}, {selected: false, code: 36}, {selected: false, code: 37}, {selected: false, code: 38}, {selected: false, code: 39}, {selected: false, code: 40},
                        {selected: false, code: 41}, {selected: false, code: 42}, {selected: false, code: 43}, {selected: false, code: 44}, {selected: false, code: 45}, {selected: false, code: 46}, {selected: false, code: 47}, {selected: false, code: 48}, {selected: false, code: 49}
                    ],
                    banbo: [ // 半波号码
                        { selected: false, code: '红单', cls: 'banboBall_red', list: [1, 7, 13, 19, 23, 29, 35, 45] },
                        { selected: false, code: '蓝单', cls: 'banboBall_blue', list: [3, 9, 15, 25, 31, 37, 41, 47] },
                        { selected: false, code: '绿单', cls: 'banboBall_gre', list: [5, 11, 17, 21, 27, 33, 39, 43] },
                        { selected: false, code: '红双', cls: 'banboBall_red', list: [2, 8, 12, 18, 24, 30, 34, 40, 46] },
                        { selected: false, code: '蓝双', cls: 'banboBall_blue', list: [4, 10, 14, 20, 26, 36, 42, 48] },
                        { selected: false, code: '绿双', cls: 'banboBall_gre', list: [6, 16, 22, 28, 32, 38, 44] },
                        { selected: false, code: '红大', cls: 'banboBall_red', list: [29, 30, 34, 35, 40, 45, 46] },
                        { selected: false, code: '蓝大', cls: 'banboBall_blue', list: [25, 26, 31, 36, 37, 41, 42, 47, 48] },
                        { selected: false, code: '绿大', cls: 'banboBall_gre', list: [27, 28, 32, 33, 38, 39, 43, 44] },
                        { selected: false, code: '红小', cls: 'banboBall_red', list: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24] },
                        { selected: false, code: '蓝小', cls: 'banboBall_blue', list: [3, 4, 9, 10, 14, 15, 20] },
                        { selected: false, code: '绿小', cls: 'banboBall_gre', list: [5, 6, 11, 16, 17, 21, 22] },
                        { selected: false, code: '红合单', cls: 'banboBall_red', list: [1, 7, 12, 18, 23, 29, 30, 34, 45] },
                        { selected: false, code: '蓝合单', cls: 'banboBall_blue', list: [3, 9, 10, 14, 25, 36, 41, 47] },
                        { selected: false, code: '绿合单', cls: 'banboBall_gre', list: [5, 16, 21, 27, 32, 38, 43] },
                        { selected: false, code: '红合双', cls: 'banboBall_red', list: [2, 8, 13, 19, 24, 35, 40, 46] },
                        { selected: false, code: '蓝合双', cls: 'banboBall_blue', list: [4, 15, 20, 26, 31, 37, 42, 48] },
                        { selected: false, code: '绿合双', cls: 'banboBall_gre', list: [6, 11, 17, 22, 28, 33, 39, 44] }
                    ],
                    weishu: [ // 尾数号码
                        { selected: false, code: '0尾', list: [10, 20, 30, 40] },
                        { selected: false, code: '1尾', list: [11, 11, 21, 31, 41] },
                        { selected: false, code: '2尾', list: [2, 12, 22, 32, 42] },
                        { selected: false, code: '3尾', list: [3, 13, 23, 33, 43] },
                        { selected: false, code: '4尾', list: [4, 14, 24, 34, 44] },
                        { selected: false, code: '5尾', list: [5, 15, 25, 35, 45] },
                        { selected: false, code: '6尾', list: [6, 16, 26, 36, 46] },
                        { selected: false, code: '7尾', list: [7, 17, 27, 37, 47] },
                        { selected: false, code: '8尾', list: [8, 18, 28, 38, 48] },
                        { selected: false, code: '9尾', list: [9, 19, 29, 39, 49] }
                    ],
                    shenxiao: [ // 生肖号码
                        { selected: false, code: '鼠', list: [12, 24, 36, 48] },
                        { selected: false, code: '牛', list: [11, 23, 35, 47] },
                        { selected: false, code: '虎', list: [10, 22, 34, 46] },
                        { selected: false, code: '兔', list: [9, 21, 33, 45] },
                        { selected: false, code: '龙', list: [8, 20, 32, 44] },
                        { selected: false, code: '蛇', list: [7, 19, 31, 43] },
                        { selected: false, code: '马', list: [6, 18, 30, 42] },
                        { selected: false, code: '羊', list: [5, 17, 29, 41] },
                        { selected: false, code: '猴', list: [4, 16, 28, 40] },
                        { selected: false, code: '鸡', list: [3, 15, 27, 39] },
                        { selected: false, code: '狗', list: [2, 14, 26, 38] },
                        { selected: false, code: '猪', list: [1, 13, 25, 37, 49] }
                    ]
                },
                typeName: [], // 类型名称
                popupliuhe: false, // 六合彩弹窗类型选择
                data1Value: [] // 类型名称值
            }
        },
        methods: {
            // 选中玩法类型
            betCheck (res, groupName, data) {
                // 选中属性
                res.selected = !res.selected
                // 确认有效注单
                if (res.selected) {
                    res.odds ? this.playOdds.push(res.odds) : this.playOdds.push(data.odds) // 赔率ID组合
                    res.odds ? res.groupName = groupName : data.groupName = groupName // 分组名称
                    // 猜冠亚注数单独计算
                    if (groupName == '猜冠亚' || groupName == '连码' || groupName == '不中' || groupName == '连肖' || groupName == '连尾') {
                        this.betList = []
                        this.codeList.push(res.code) // 复试投注号码集合
                        if (groupName == '连肖' || groupName == '连尾') this.playIds.push(data.id.toString()) // 连肖、连尾ID，赔率组合
                        // 猜冠亚至少选择两个数字、连码最多选择10个数字
                        if ((this.codeList.length > 2 && groupName == '猜冠亚') || (this.codeList.length > 8 && (groupName == '连肖' || groupName == '连尾')) || (this.codeList.length > 10 && groupName == '连码') || (this.codeList.length > 8 && data.name == '五不中') ||(this.codeList.length > 9 && data.name == '六不中') || (this.codeList.length > 10 && data.name == '七不中') || (this.codeList.length > 11 && data.name == '八不中') || (this.codeList.length > 12 && data.name == '九不中') || (this.codeList.length > 13 && data.name == '十不中') ) {
                            this.codeList.pop(), this.playIds.pop()
                            res.selected = false
                            if (groupName == '猜冠亚') this.$vux.toast.text('已选择两个数字', 'middle')
                            if (groupName == '连码') this.$vux.toast.text('最多选择10个号码', 'middle')
                            if (groupName == '连肖' || groupName == '连尾') this.$vux.toast.text('最多选择8个号码', 'middle')
                            if (data.name == '五不中') this.$vux.toast.text('最多选择8个号码', 'middle')
                            if (data.name == '六不中') this.$vux.toast.text('最多选择9个号码', 'middle')
                            if (data.name == '七不中') this.$vux.toast.text('最多选择10个号码', 'middle')
                            if (data.name == '八不中') this.$vux.toast.text('最多选择11个号码', 'middle')
                            if (data.name == '九不中') this.$vux.toast.text('最多选择12个号码', 'middle')
                            if (data.name == '十不中') this.$vux.toast.text('最多选择13个号码', 'middle')
                        }
                        this.betsNum = sortArray(this.codeList, data.betsNum)
                    } else {
                        this.betList.push(res)
                        this.betsNum += 1 // 注数
                    }
                } else {
                    if (groupName == '猜冠亚' || groupName == '连码' || groupName == '不中' || groupName == '连肖' || groupName == '连尾') {
                        this.codeList.forEach((item, i) => {
                            if (groupName == '连肖' || groupName == '连尾') {
                                if (this.playIds[i] == data.id) this.playIds.splice(i, 1), this.playOdds.splice(i, 1)
                            }
                            if (item == res.code) this.codeList.splice(i, 1)
                        })
                        this.betsNum = sortArray(this.codeList, data.betsNum)
                    } else {
                        this.betList.forEach((item, i) => {
                            if (res === item) this.betList.splice(i, 1)
                            if (this.playOdds[i] == res.odds) this.playOdds.splice(i, 1)
                        })
                        this.betsNum -= 1
                    }
                }
                // isBet为True代表投注，False表示追号
                if (this.isBet) {
                    this.betsNum > 0 ? this.betShow = true : this.betShow = false
                    this.getScrollerHeight()
                } else {
                    this.betsNum > 0 ? this.trackBol = true : this.trackBol = false
                    this.trackValType = res.group_name ? `${res.group_name} - ${res.name}` : `${data.groupName} _ ${this.codeList.join(',')}`
                }
                // 复试投注： 北京赛车/幸运飞艇[猜冠亚]    香港六合彩/极速六合彩[连肖、连码、不中、连尾]  时单独处理传入code号码
                if (this.codeList.length > 1)  {
                    data.code = this.codeList, data.playIds = this.playIds, data.betNum = this.betsNum
                    if (this.betList.length < 1) this.betList.push(data)
                }
                // console.log(this.betList)
                // 计算最大、最小赔率
                let arrOdds = JSON.parse(JSON.stringify(this.playOdds)), reg = RegExp('/')
                arrOdds.sort( function(a,b) {return a-b;} )
                this.minOdds = arrOdds[0], this.maxOdds = arrOdds[arrOdds.length - 1] // 最小、大赔率
                if (arrOdds.length > 0 && (arrOdds[0].constructor == String && reg.test(arrOdds[0]))) this.minOdds = 0 ,this.maxOdds = arrOdds[0].split('/')[1]
                // 赔率，类型名称
                res.odds ? this.Odds = res.odds : this.Odds = data.odds, this.groupName = groupName
                // 总金额金额
                this.amount = this.betsNum * this.money
                // 单注最高、最低可获得金额
                if(this.minOdds) this.minMoney = parseFloat(this.money * this.minOdds).toFixed(2)
                if(this.maxOdds) this.maxMoney = parseFloat(this.money * this.maxOdds).toFixed(2)
                // 六合彩连肖、连尾取出最小赔率以及相应ID
                if (groupName == '连肖' || groupName == '连尾') {
                    // 找出对应的赔率ID
                    this.playOdds.some((res, i) => {
                        if (res == this.minOdds) return this.minOddsId = this.playIds[i]
                    })
                }
            },
            // 筹码选择
            selectChip (key, res) {
                if (res == 'x') res = Number(this.coin)
                this.money = res, this.chipNum = key, this.chipMoney = res, this.amount = this.betsNum * res
                this.minMoney = parseFloat(res * this.minOdds).toFixed(2), this.maxMoney = parseFloat(res * this.maxOdds).toFixed(2)
            },
            // 加入注单
            addBets () {
                if (Number(this.money) < 1) return this.$vux.toast.text('请输入投注金额', 'middle')
                if (Number(this.amount > Number(this.coin))) return this.noMoney = true
                this.valCoin.minMoney = this.minMoney // 单注最高金额
                this.valCoin.maxMoney = this.maxMoney // 单注最高金额
                // 独立对象数据指向不同地址
                let arr = JSON.parse(JSON.stringify(this.betList))
                this.betNum += this.betsNum
                this.valCoin.Amount += this.amount
                // 保存单注金额
                arr.forEach(res => {
                    res.money = this.money.toString()
                    // if (res.group_name == '连码' || res.group_name == '不中' || res.group_name == '连肖' || res.group_name == '连尾') res.betNum = this.betsNum
                    if (res.group_name == '连肖' || res.group_name == '连尾') res.minOdds = this.minOdds, res.minOddsId = this.minOddsId
                    this.validnote.push(res)
                })
                this.isNote = true
                // console.log(this.betNum, this.valCoin)
                let betObj = { betNum: this.betNum, Amount: this.valCoin.Amount, validnote: this.validnote }
                sessionStorage.setItem('betObj', JSON.stringify(betObj))
                this.reset()
            },
            // 删除某一注单
            delList (obj, key) {
                if (obj.betNum) { // 复试投注
                    let money = obj.betNum * Number(obj.money)
                    this.betNum -= obj.betNum, this.valCoin.Amount -= money
                } else { // 单注
                    this.betNum -= 1, this.valCoin.Amount -= Number(obj.money)
                }
                this.validnote.splice(key, 1)
                if (this.betNum == 0) {
                    this.validnote = [], this.valCoin.Amount = 0, this.valCoin.minMoney = 0, this.valCoin.maxMoney = 0
                    this.isCon = false, this.isNote = false, this.reset()
                }
                let betObj = { betNum: this.betNum, Amount: this.valCoin.Amount, validnote: this.validnote }
                sessionStorage.setItem('betObj', JSON.stringify(betObj))
            },
            // 清空所有注单
            clearAll () {
                sessionStorage.removeItem('betObj')
                this.validnote = [], this.valCoin.Amount = 0, this.valCoin.minMoney = 0, this.valCoin.maxMoney = 0, this.betNum = 0, this.betsNum = 0
                this.isCon = false, this.isNote = false, this.reset()
            },
            // 创建注单（追号）数据整理
            estabList () {
                if (isNaN(this.money) || this.money < 1) return this.$vux.toast.text('请输入投注金额', 'middle')
                if (isNaN(this.trackNum) || this.trackNum < 1) return this.$vux.toast.text('请输入追号期数', 'middle')
                if (isNaN(this.trackMult) || this.trackMult < 1) return this.$vux.toast.text('请输入倍数', 'middle')
                if (this.trackNum > 10) return this.$vux.toast.text('追号期数不能大于10', 'middle')
                this.trackMoney = this.money // 追号金额
                this.amount = 0
                let betDetails = this.betList[0] // 投注详情，追号重组投注数据
                let listArr = [], trackBetList = [], trackQihao = [], moneyList = [], qihao = 0, money = this.money // listArr：注单列表，trackBetList：追号集合， trackQihao：期数集合，moneyList：金额集合， money：金额
                for(let i = 0; i < this.trackNum; i++) {
                    if (i == 0) {
                        money = money * 1
                    } else {
                        money =  money * this.trackMult
                    }
                    qihao = this.qihao + i
                    listArr.push({money: money, qihao: qihao})
                    this.amount += money // 总金额
                    trackQihao.push(qihao) // 期数集合
                    moneyList.push(money) // 金额集合
                    trackBetList.push((JSON.parse(JSON.stringify(betDetails)))) // 追号List数据集合
                    trackBetList[i].qihao = qihao
                    trackBetList[i].coin = money
                    // 超出当天期数重新计算期号（北京赛车、幸运28不用计算）
                    if (this.gameid != 20 || this.gameid != 30) {
                        if (Number(qihao.toString().slice(6)) == this.lotteryNum) {
                            for (let j = 0; j < this.trackNum - (i + 1); j++) {
                                // 获取日期
                                let date = getNewDate(1).split('-'), newDate = date[0].slice(2) + date[1] + date[2]
                                for (let x = 0; x < this.lotteryNum.toString().length; x++) newDate += '0'
                                money =  money * this.trackMult
                                qihao =  Number(newDate) + j + 1
                                this.amount += money // 总金额
                                trackQihao.push(qihao) // 期数集合
                                moneyList.push(money) // 金额集合
                                trackBetList.push((JSON.parse(JSON.stringify(betDetails)))) // 追号List数据集合
                                trackBetList[i + j + 1].qihao = qihao
                                trackBetList[i + j + 1].coin = money
                                listArr.push({money: money, qihao: qihao})
                            }
                            break
                        }
                    }
                }
                this.trackList = listArr
                this.trackQihao = trackQihao // 期数集合
                this.trackBetList = trackBetList // 追号数据集合
                this.trackBool = true
            },
            // 选择玩法类型
            selectBall (res, name) {
                this.gameName = name
                this.typeName = []
                res.forEach(item => {
                    this.typeName.push(item.name)
                })
                this.popupliuhe = true
            },
            // 确认选择
            confirmType () {
                if (this.gameName == '六合') {
                    this.reset()
                    this.typeName.forEach((res, key) => {
                        if (res == this.data1Value[0]) this.liuhe.key = key
                    })
                } else {
                    let i = 0
                    this.typeName.forEach((res, key) => {
                        if (res == this.data1Value[0]) i = key
                    })
                    let _height = '-' + (this.$refs.betList[0].offsetHeight + 8) * i + 'px'
                    if (this.typeName[i] == '猜区段') _height = '-' + (this.$refs.betList[1].offsetHeight) + 'px'
                    this.$refs.scroRight[0].$el.firstChild.style.cssText = `transform-origin: 0px 0px 0px; transform: translate(0px, ${_height}) translateZ(0px);`
                }
                if (this.$refs.ballNum && this.$refs.ballNum.length > 0) this.$refs.ballNum[0].firstElementChild.innerText = this.data1Value
                this.$refs.main.click();
                this.popupliuhe = false
            },
            // 是否发布跟单、追号
            ischecked () {
                this.checkedBox = this.$refs.checkTrack.checked
            },
            addList () { // 发布跟单弹窗
                this.checkedBox && this.$refs.labelList ? this.releaseWith = true : this.goBetShow = true
            },
            // 发布跟单
            subInfo (obj) {
                this.initiateBet = obj, this.betting(this.validnote)
            },
            // 投注、追号
            betting (list, bool, str) {
                // return console.log(list)
                if (!this.firstClick) return false
                this.firstClick = false // 防止重复点击
                let betList = [], isBet = true, _this = this //  betList: 投注集合， isBet：是否满足投注条件
                if (this.$store.state.isCloseGame) return this.$vux.confirm.show({
                    title: '温馨提示',
                    content:'本期已封盘，请开盘后下注！',
                    confirmText:'确认',
                    showCancelButton:false,
                    onConfirm () { _this.$refs.main.click(), _this.firstClick = true }
                })
                if (isNaN(this.money) || this.money < 1) return this.$vux.toast.text('请输入投注金额', 'middle'), this.firstClick = true
                if (Number(this.amount) > Number(this.coin)) return this.noMoney = true, this.firstClick = true
                list.some((res, i) => {
                    if (this.money) {
                        if (this.money > res.max_bet || this.money < res.min_bet) return this.$vux.toast.text(`${res.group_name}-${res.name}最小投注${res.min_bet}元, 最大投注${res.max_bet}元`, 'middle'), isBet = false, this.firstClick = true
                    }
                    betList.push({ playid: res.id.toString(), odds: res.odds.toString(),  rebate: res.rebate.toString(), coin: res.money || this.money.toString(), title: res.group_name + '-' + res.name})
                    if (!Number(res.odds)) betList[i].odds = res.odds.split('/')[0] // 特殊赔率取第一个值，列如 20/90
                    if (res.code) betList[i].betinfo = res.code.join(','), betList[i].title = `${res.name}_${res.code.join(',')}`  // 复试投注号码集合
                    // 连肖、连尾最小赔率ID
                    if (res.group_name == '连肖' || res.group_name == '连尾') betList[i].playids = res.playIds.join(','), betList[i].playid = this.minOddsId, betList[i].odds = this.minOdds.toString()
                    // 加入注单重新计算连肖、连尾单注最小赔率ID
                    if (str == 'tracking' && (res.group_name == '连肖' || res.group_name == '连尾')) betList[i].odds = res.minOdds.toString(), betList[i].playid = res.minOddsId
                    // 复试投注重新计算单注数
                    if (res.betNum)  betList[i].betNum = res.betNum.toString()
                    // 追号金额、期号list集合
                    if (bool) betList[i].qihao = res.qihao.toString(), betList[i].coin = res.coin.toString()
                })
                // console.log(this.betsNum,this.betNum,this.amount, this.valCoin.Amount)
                if (isBet) {
                    this.$vux.loading.show({text: '投注中'})
                    let url = bool ? 'traceBet' : 'bets' // 投注或追号
                    let module = {
                        gameid: this.gameid,
                        qihao: this.qihao,
                        totalNums: this.betsNum || this.betNum,
                        totalCoin: this.amount || this.valCoin.Amount,
                        ftime: this.ftime,
                        betBean: betList,
                        userInfo: JSON.stringify({nickName: this.nickname,level: this.level,avatar: this.avatar,uid: this.uid})
                    }
                    if (bool) module.autoStop = this.checkedBox ? 1 : 0, module.totalNums = this.trackBetList.length, delete module.qihao  // 是否追停，期数
                    if (this.initiateBet && this.releaseWith) module.initiateBet = this.initiateBet // 发布跟单
                    this.$post(url, module).then(res => {
                        this.$vux.loading.hide()
                        if (res.code !== 0) return this.firstClick = true
                        if (str == 'tracking') sessionStorage.removeItem('betObj')
                        this.$vux.toast.text('投注成功!', 'middle')
                        this.$emit('submit', res.data.coin), this.$emit('betCount', res.data.betsListCount)
                        this.reset()
                    })
                }
            },
            // 重置
            reset () {
                this.$store.commit('betOrderNum')
                this.$nextTick(async () => {
                    // 清空投注数据
                    this.betsNum = 0, this.minMoney = 0, this.maxMoney = 0 ,this.amount = 0
                    this.betList = [], this.codeList = [], this.playIds = [] ,this.playOdds = [], this.betShow = false
                    if (this.gameid == 20 || this.gameid == 23) { // 赛车游戏清空猜冠亚选中数据
                        this.carGuanYa.forEach(res => {
                            res.selected = false
                        })
                    }
                    if (this.gameid == 70 || this.gameid == 71) { // 六合彩游戏清空相关自定义数据
                        Object.keys(this.liuhe).forEach(res => {
                            if (this.liuhe[res] instanceof Array) {
                                this.liuhe[res].forEach(item => {
                                    item.selected = false
                                })
                            }
                        })
                    }
                    await resultData(this.betData).then(res => {
                        res.forEach(item => {
                            item.selected = false
                        })
                    })
                    this.getScrollerHeight()
                })
            },
            // 获取scro高度
            getScrollerHeight () {
                this.$nextTick(() => {
                    let ballNum = 0
                    if (this.$refs.ballNum && this.$refs.ballNum.length > 0) ballNum = 12
                    // isBet为true代表投注false代表追号
                    if (this.$refs.scroller) {
                        if (this.isBet) {
                            if (!this.betShow) {
                                // this.$refs.scroller.$el.style.paddingBottom = '13.067vw'
                                this.$refs.scroller.$el.style.paddingBottom = '22.067vw'
                                if (this.$refs.scroRight) this.$refs.scroRight[0].$el.style.paddingBottom = 13.067 + ballNum + 'vw'
                            } else {
                                this.$refs.scroller.$el.style.paddingBottom = '32.533vw'
                                if (this.$refs.scroRight) this.$refs.scroRight[0].$el.style.paddingBottom = 32.533 + ballNum + 'vw'
                            }
                        } else {
                            this.$refs.scroller.$el.style.paddingBottom = '0'
                            if (this.$refs.scroRight) this.$refs.scroRight[0].$el.style.paddingBottom = ballNum + 'vw'
                        }
                        this.$refs.scroller.reset()
                        if (this.$refs.scroRight) this.$refs.scroRight[0].reset()
                    }
                })
            }
        },
        watch: {
            // chipMoney(val) { //
            //     if (val === 'x') val = Number(this.coin)
            //     this.money = val, this.amount = this.betsNum * val, this.chipMoney = val
            //     this.minMoney = parseFloat(val * this.minOdds).toFixed(2), this.maxMoney = parseFloat(val * this.maxOdds).toFixed(2)
            // },
            money(val) {
                if (this.isBet) {
                    this.amount = this.betsNum * val
                    this.minMoney = parseFloat(val * this.minOdds).toFixed(2), this.maxMoney = parseFloat(val * this.maxOdds).toFixed(2)
                }
            }
        },
        mounted () {
            this.$nextTick(async () => {
                let betObj = JSON.parse(sessionStorage.getItem('betObj'))
                if (betObj) {
                    this.validnote = betObj.validnote
                    this.betNum = betObj.betNum, this.valCoin.Amount = betObj.Amount
                }
                this.getScrollerHeight()
                await resultData(this.betData)
            })
        }
    }
</script>

<style scoped lang="scss">
    .betBox {
        position: absolute; top: 0; z-index: 99; width: 100%; height: 100%; background: rgba(0,0,0,.35);
        .bets {
            position: fixed; z-index: 99; bottom: 0; width: 100%; height: 78%;
            .content {
                height: 100%;
                .menu {
                    float: left; width: 24%; height: 100%; background: #e7e7e7;
                    span {
                        position: relative; display: block; height: 75px; color: #666; font-size: 26px; line-height: 75px; text-align: center;
                    }
                    span.active {
                        color: $theme-color; background: white;
                    }
                    i {
                        position: absolute; top: 17px; left: 20px; width: 6px; height: 40px; background: $theme-color;
                    }
                }
                .detailed {
                    float: left; width: 76%; height: 100%; padding: 30px 35px 0; background: white;
                    .container {
                        width: 100%; height: 100%; color: #000; font-size: 24px;
                        .ball-num {
                            position: relative; width: 100%; height: 70px; margin: 0 0 20px; font-size: 28px; line-height: 70px; text-align: center; border: 1px solid #d2d2d2; border-radius: 6px;
                            .icon {
                                position: absolute; top: 11px; right: 20px; width: 0; height: 0; margin: 14px 0 0 5px; border-style: solid; border-width: 19px 17px 0 17px;
                                border-color: #666 transparent transparent transparent;
                            }
                            .icon:before {
                                position: absolute; top: -20px; left: -15px; content: ''; border-style: solid; border-width: 17px 15px 0 15px;
                                border-color: white transparent transparent transparent;
                            }
                        }
                        .betList {
                            margin-bottom: 20px;
                            h3 {
                                font-size: 26px; line-height: 26px; text-align: center; margin-bottom: 20px;
                            }
                            .h3_b {
                                padding-bottom: 20px; border-bottom: 1px solid #d2d2d2; font-size: 28px; line-height: 28px;
                            }
                            .list-detailed {
                                span {
                                    float: left; width: 240px; margin-bottom: 20px; padding: 0 20px; line-height: 80px; background: #e7e7e7; border-radius: 6px; text-align: center;
                                    .sscNum, .numBox, .liuBox {
                                        float: left; width: 40px; height: 40px; margin-top: 20px; background: white; border-radius: 50%; text-align: center; line-height: 42px;
                                    }
                                    .scNum {
                                        float: left; width: 40px; height: 40px; margin-top: 20px; border-radius: 6px; color: white; text-align: center; line-height: 42px;
                                    }
                                    .shaiBox {
                                        float: left; width: 50px; height: 50px; margin: 15px 10px 0 0 ; color: rgba(0,0,0,0);
                                    }
                                    .niuNum {
                                        float: left; width: 48px; height: 60px; margin-top: 10px; color: rgba(0,0,0,0);
                                    }
                                    .emRed { color: $theme-color }
                                    .emBlue { color: #3f8fe8; }
                                    .shaiBox1, .shaiBox1_1, .shaiBox1_1_1, .shaiBox1_2, .shaiBox1_3, .shaiBox1_4, .shaiBox1_5, .shaiBox1_6, .quanWei0, .quanWei1, .quanWei2 {
                                        background: url("/static/images/lotteryIcon/dice1@2x.png") no-repeat center; background-size: 100% 100%;
                                    }
                                    .shaiBox2, .shaiBox2_2, .shaiBox2_2_2, .shaiBox2_3, .shaiBox2_4, .shaiBox2_5, .shaiBox2_6, .shaiBox1_2:nth-child(2), .quanWei3, .quanWei4, .quanWei5 {
                                        background: url("/static/images/lotteryIcon/dice2@2x.png") no-repeat center; background-size: 100% 100%;
                                    }
                                    .shaiBox3, .shaiBox3_3, .shaiBox3_3_3, .shaiBox3_4, .shaiBox3_5, .shaiBox3_6, .shaiBox1_3:nth-child(2), .shaiBox2_3:nth-child(2), .quanWei6, .quanWei7, .quanWei8 {
                                        background: url("/static/images/lotteryIcon/dice3@2x.png") no-repeat center; background-size: 100% 100%;
                                    }
                                    .shaiBox4, .shaiBox4_4, .shaiBox4_4_4, .shaiBox4_5, .shaiBox4_6, .shaiBox1_4:nth-child(2), .shaiBox2_4:nth-child(2), .shaiBox3_4:nth-child(2), .quanWei9, .quanWei10, .quanWei11 {
                                        background: url("/static/images/lotteryIcon/dice4@2x.png") no-repeat center; background-size: 100% 100%;
                                    }
                                    .shaiBox5, .shaiBox5_5, .shaiBox5_5_5, .shaiBox5_6, .shaiBox1_5:nth-child(2), .shaiBox2_5:nth-child(2), .shaiBox3_5:nth-child(2), .shaiBox4_5:nth-child(2), .quanWei12, .quanWei13, .quanWei14 {
                                        background: url("/static/images/lotteryIcon/dice5@2x.png") no-repeat center; background-size: 100% 100%;
                                    }
                                    .shaiBox6, .shaiBox6_6, .shaiBox6_6_6, .shaiBox1_6:nth-child(2), .shaiBox2_6:nth-child(2), .shaiBox3_6:nth-child(2), .shaiBox4_6:nth-child(2), .shaiBox5_6:nth-child(2), .quanWei15, .quanWei16, .quanWei17 {
                                        background: url("/static/images/lotteryIcon/dice6@2x.png") no-repeat center; background-size: 100% 100%;
                                    }
                                    @for $i from 1 through 10 {
                                        .niuNum#{$i} {
                                            background: url("~@/assets/image/play/Z#{$i}@2x.png") no-repeat center; background-size: cover;
                                        }
                                    }
                                    .niuNumJ {
                                        background: url("~@/assets/image/play/ZJ@2x.png") no-repeat center; background-size: cover;
                                    }
                                    .niuNumQ {
                                        background: url("~@/assets/image/play/ZQ@2x.png") no-repeat center; background-size: cover;
                                    }
                                    .niuNumK {
                                        background: url("~@/assets/image/play/ZK@2x.png") no-repeat center; background-size: cover;
                                    }
                                    .numBox1, .numBox4, .numBox7, .numBox10, .numBox16, .numBox19, .numBox22, .numBox25, .liuBox5, .liuBox6, .liuBox11, .liuBox16, .liuBox17, .liuBox21, .liuBox22, .liuBox27, .liuBox28, .liuBox32, .liuBox33, .liuBox38, .liuBox39, .liuBox43, .liuBox44, .liuBox49, .banboBall_gre {
                                        color: #05ad5c;
                                    }
                                    .numBox2, .numBox5, .numBox8, .numBox11, .numBox17, .numBox20, .numBox23, .numBox26, .liuBox3, .liuBox4, .liuBox9, .liuBox10, .liuBox14, .liuBox15, .liuBox20, .liuBox25, .liuBox26, .liuBox31, .liuBox36, .liuBox37, .liuBox41, .liuBox42, .liuBox47, .liuBox48, .banboBall_blue {
                                        color: #3F8FEB;
                                    }
                                    .numBox3, .numBox6, .numBox9, .numBox12, .numBox15, .numBox18, .numBox21, .numBox24, .liuBox1, .liuBox2, .liuBox7, .liuBox8, .liuBox12, .liuBox13, .liuBox18, .liuBox19, .liuBox23, .liuBox24, .liuBox29, .liuBox30, .liuBox34, .liuBox35, .liuBox40, .liuBox45, .liuBox46, .banboBall_red {
                                        color: #D9342F;
                                    }
                                    @for $i from 1 to length($bgcolorList) + 1 {
                                        .scNum#{$i} {
                                            background-color: nth($bgcolorList,$i);
                                        }
                                    }
                                    em {
                                        float: left;
                                    }
                                    .odds {
                                        float: right; color: $theme-color;
                                    }
                                }
                                span.quanWei { padding: 0 10px; }
                                span.sp100, span.spQuanwei { width: 100%; }
                                span.spQuanwei {
                                    padding: 0 0 15px;
                                    .wleft {
                                        width: 28%; padding: 30px 0 0;
                                        i {
                                            display: block; line-height: 24px;
                                        }
                                        .weiOdds {
                                            margin-top: 85px; color: $theme-color;
                                        }
                                    }
                                    .wright {
                                        width: 72%;
                                        em.quanWei5, em.quanWei11, em.quanWei17 { margin-right: 0; }
                                    }
                                }
                                span.sbig {
                                    height: 120px;
                                    em {
                                        float: none; display: inline-block;
                                    }
                                    b {
                                        display: block; color: $theme-color; line-height: 24px;
                                    }
                                }
                                span.spBanbo {
                                    padding: 20px 67px 20px 30px; height: 140px;
                                    .banboBox {
                                        float: left; padding-top: 18px; line-height: 24px;
                                        strong {
                                            display: block; height: 24px; margin-top: 20px; color: $theme-color; line-height: 24px;
                                        }
                                    }
                                    .banboBall {
                                        float: right; width: 280px;
                                        i {
                                            float: left; width: 40px; height: 40px; margin: 0 20px 18px 0; background: white; border-radius: 50%; text-align: center; line-height: 40px;
                                        }
                                        i:nth-child(5), i:last-child { margin: 0 0 15px 0; }
                                    }
                                }
                                span.spComLiu {
                                    padding: 20px 0 20px 30px;height: 80px;
                                    .ComliuBox {
                                        float: left; width: 150px; padding-top: 7px; line-height: 28px;
                                        i {
                                            float: left; font-size: 28px;
                                        }
                                        b {
                                            float: left; margin-left: 20px; color: $theme-color; font-size: 24px;
                                        }
                                    }
                                    .ComliuBall {
                                        float: left;
                                        i {
                                            float: left; width: 40px; height: 40px; margin: 0 20px 0 0; background: white; border-radius: 50%; text-align: center; line-height: 40px;
                                        }

                                        i:last-child { margin: 0; }
                                    }
                                }
                                span.r { float: right; }
                                span.s30 {
                                    float: left; width: 152px; margin-right: 20px;
                                }
                                span.s30:nth-child(49){ margin-right: 200px; }
                                span.s30g { margin: 0; }
                                span.betSelected { background: #fdb6b4; }
                                span.carGuan {
                                    width: 84px; height: 84px; margin-right: 20px;
                                    .guanNum {
                                        display: inline-block; width: 40px; height: 40px; margin: 10px auto; color: white; line-height: 40px; text-align: center; border-radius: 6px;
                                    }
                                }
                                span.carGuan:nth-child(5), span.carGuan:last-child { margin: 0; }
                            }
                        }
                        .explain {
                            float: right; height: 26px; margin: 20px 0; padding-left: 35px; color: #000; font-size: 24px; line-height: 26px;
                            background: url("~@/assets/image/play/icon-help-question@2x.png") no-repeat left center; background-size: 26px 26px;
                        }
                    }
                }
            }
        }
        .track {
            position: relative; width: 100%; height: 100%;
            .trackBox {
                position: fixed; bottom: 0; z-index: 200; width: 100%; background: #f7f7f7;
                .trackTop {
                    background: white; color: #333; font-size: 28px;
                    .track_type {
                        padding: 20px; border-bottom: 1px solid #d2d2d2;
                        strong {
                            float: left; color: $theme-color; line-height: 70px;
                        }
                        p {
                            float: right; line-height: 70px;
                            span { float: left; }
                            input {
                                display: inline-block; width: 290px; height: 70px; line-height: 70px; text-align: center; border: 1px solid #d2d2d2; border-radius: 6px;
                            }
                        }
                    }
                    .establish {
                        padding: 20px;
                        p {
                            float: left; line-height: 70px; margin-right: 42px;
                            span.f { float: left; }
                            input {
                                display: inline-block; width: 160px; height: 70px; line-height: 70px; text-align: center; border: 1px solid #d2d2d2; border-radius: 6px;
                            }
                        }
                        .p1 { margin: 0; }
                        .esta_btn {
                            float: right; width: 146px; height: 70px; color: white; line-height: 70px; background: $theme-color; border-radius: 6px;
                        }
                    }
                }
                .trackList {
                    margin-top: 20px; padding: 20px; background: white;
                    ol {
                        overflow-y: auto; max-height: 240px; border: 1px solid #d2d2d2;
                        li {
                            display: flex; height: 80px; color: #333; font-size: 26px; line-height: 80px; border-bottom: 1px solid #d2d2d2;
                            em {
                                flex: 1; text-align: center;
                                overflow:hidden; text-overflow:ellipsis; white-space: nowrap;
                            }
                            em:nth-child(2) { color: $theme-color }
                        }
                        li.liActive { background: #fbfbe9; }
                        li:last-child { border: none; }
                    }
                    .nav {
                        display: flex; height: 80px; color: #999; font-size: 26px; line-height: 80px; border: 1px solid #d2d2d2; border-bottom: none;
                        em {
                            flex: 1; text-align: center;
                        }
                    }
                }
                .tracking {
                    color: white;
                    .trackLeft {
                        float: left; width: 65%; height: 98px; padding-left: 60px; font-size: 30px; line-height: 98px; background: #666;
                    }
                    .trackBtn {
                        float: right; width: 35%; height: 98px; font-size: 34px; line-height: 98px; color: white; text-align: center; background: $theme-color;
                    }
                }
            }
        }
    }
    label {
        position: relative; padding-left: 50px; width: 30px; height: 40px; line-height: 40px; font-size: 30px;
    }
    label:before {
        content: '';
        position: absolute; top: 1px; left: 0; width: 30px;height: 30px;
        background: url("~@/assets/image/play/square.png")no-repeat center; background-size: cover;
    }
    .label:before {
        background: url("~@/assets/image/play/icon-check.png")no-repeat center; background-size: cover;
    }
    .noCheck:before {
        background: url("~@/assets/image/play/icon-check3.jpg")no-repeat center; background-size: cover;
    }
    .checkbox { display: none; }
    .maskCon, .maskRelease {
        position: absolute; top: 0; left: 0; z-index: 100; width: 100%; height: 100%; background: rgba(0,0,0,.4);
    }
    .maskRelease { z-index: 505; }
    /*弹窗样式*/
    .no_tabbar {
        .vux-popup-dialog {
            span {
                float: left; width: 65%; height: 98px; color: white; font-size: 37px; line-height: 98px; text-align: center; background: #666;
            }
            span:last-child {
                width: 35%; background: #999;
            }
            .documentary {
                height: 80px; padding-left: 20px; color: #999; font-size: 26px; line-height: 80px; background: white;
                label { color: #333; }
            }
            .betNum {
                float: left; width: 65%; height: 98px; padding-left: 20px; color: white; background: #666;
                .i_con {
                    float: left; width: 60px; height: 60px; margin: 19px 20px 0 0; color: $theme-color; font-size: 22px; text-align: center; line-height: 60px;
                    background: url("~@/assets/image/play/noteNum.png") no-repeat center; background-size: 100% 100%;
                }
                .mp {
                    float: left; width: 81%; margin-top: 10px; color: white; font-size: 30px;
                    p:last-child {
                        width: 100%; color: #d2d2d2; font-size: 24px; overflow:hidden; text-overflow:ellipsis; white-space: nowrap;
                    }
                }
            }
            .gobet {
                float: right; width: 35%; height: 98px; color: white; font-size: 34px; line-height: 98px; text-align: center; background: $theme-color;
            }
        }
    }
    .bets_tabbar {
        .vux-popup-dialog {
            background: white;
            .chipList {
                position: relative; padding: 9px 20px 6px; background: #f7f7f7;
                span {
                    position: absolute; bottom: 7px; width: 65px; height: 65px; color: rgba(255,255,255,0); border-radius: 50%;
                    transition: all .3s ease-in-out;
                }
                span:nth-child(1) { left: 20px; }
                span:nth-child(2) { left: 110px; }
                span:nth-child(3) { left: 200px; }
                span:nth-child(4) { left: 290px; }
                span:nth-child(5) { left: 380px; }
                span:nth-child(6) { left: 475px; }
                span.ckMoneyStyle {
                    top: 0;
                }
                @for $i from 1 through 6 {
                    span:nth-child(#{$i}) {
                        background: url("~@/assets/image/play/chip#{$i}.png") no-repeat center; background-size: 100% 100%;
                    }
                    @if $i == 6 {
                        span:nth-child(#{$i}) {
                            margin: 0;
                        }
                    }
                }
                .minBtn {
                    float: right; width: 146px; height: 70px; color: white; font-size: 30px; line-height: 70px; text-align: center; background: #3f8fe6; border-radius: 6px;
                }
            }
            .tips {
                margin: 20px 0; padding: 0 20px; color: #000; font-size: 24px; line-height: 30px; text-align: justify;
                i {
                    color: $theme-color;
                }
            }
            .betFoot {
                padding: 0 20px 20px;
                .f {
                    float: left; width: 146px; height: 70px; margin-right: 19px; border-radius: 6px; color: white; font-size: 30px;
                }
                .f:nth-child(2) {
                    background: $theme-color;
                }
                .f:nth-child(3) {
                    margin-right: 0; background: #fd9c02;
                }
                .f:last-child {
                    float: right; margin-right: 0; background: #666;
                }
                .inp {
                    width: 216px; padding: 0 20px; color: #000; font-size: 32px; border: 1px solid #d2d2d2;
                }
            }
        }
    }
    .betCon {
        .vux-popup-dialog {
            bottom: 98px;
            .head {
                padding: 20px 32px 20px 20px; background: #f7f7f7; color: #000; font-size: 28px;
                strong {
                    float: left; height: 40px; line-height: 40px; padding-left: 20px; border-left: 6px solid $theme-color;
                }
                span {
                    float: right; height: 40px; line-height: 40px; padding-left: 50px;
                    background: url("~@/assets/image/play/icon-delete.png") no-repeat left center; background-size: 31px 31px;
                }
            }
            .betList {
                max-height: 240px; overflow-y: auto;
                li {
                    display: flex; height: 80px; padding: 0 32px 0 46px; color: #000; font-size: 26px; line-height: 80px; background: white;
                    span {
                        width: 31%;
                    }
                    span.d {
                        width: 7%;
                        i {
                            float: right; width: 35px; height: 35px; margin-top: 22px;
                            background: url("~@/assets/image/play/icon-delete@2x.png") no-repeat center; background-size: 100% 100%;
                        }
                    }
                }
                li.liActive { background: #fbf6e9; }
            }
        }
    }
    .statement .tip-text{
        max-height: 300px; overflow-y: auto; overflow: scroll; text-align: left; line-height: 35px; color: #666;
    }
</style>
<style>
    .xs-container {
        transition: all .3s ease-in-out;
    }
</style>
