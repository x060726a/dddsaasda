<template>
<div class="keypo" @click="getDome">
    <div class="row"><span>1</span><span>2</span><span>3</span></div>
    <div class="row"><span>4</span><span>5</span><span>6</span></div>
    <div class="row"><span>7</span><span>8</span><span>9</span></div>
    <div class="row"><span @click="$emit('keypoClose',false)">完成</span><span>0</span><span>删除</span></div>
</div>
</template>
<script>
export default {
    data(){
        return{
            res:'',
        }
    },
    props:['result'],
    watch:{
        res(val,oval){
            this.$emit('result',val)
        },
        result(val,oval){
            console.log('kkkkkk',val)
        }
    },
    methods:{
        close(){
            this.$emit('close',false)
        },
        getDome(){
            var  that = this
            if(event.target.textContent=='删除'){
                that.deletePas();
                return;
            }
            if(event.target.textContent=='') return;
            if(that.res.length>=6) return;
            that.res += event.target.textContent
            if(that.res.length==6){
                this.$emit('done',that.res)
            }
        },
        deletePas(){
            var that = this
            if(that.res.length>0){
                that.res = that.res.substring(0,that.res.length-1,1)
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.keypo{
    position: fixed;
    bottom:0;
    z-index: 1001;
    width: 100%;
    border-top:1px solid #d2d2d2;
    box-shadow: 0px 0px 20px #b7b7b78f;
    background: #fff;
    animation: mymove .5s ease;
    .row{
        display: flex;
        border-bottom:1px solid #D2D2D2;
        height: 120px;
        span{
            flex: 1;
            height: 120px;
            text-align: center;
            line-height: 120px;
            font-size: 38px;
            border-right:1px solid #D2D2D2;
        }
        span:last-child{
            border-right:none;
        }
    }
    .row:last-child{
        border-bottom:none;
    }
}
@keyframes mymove
{
    0% {transform:translateY(100%);}
    100% {transform:translateY(0);}
}
</style>
