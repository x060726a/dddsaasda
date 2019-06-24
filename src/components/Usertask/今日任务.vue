<template>
<div class="result">
    <transition-group  :name="$store.state.taskTransitionName" tag="div">
        <ITEM v-for="(item,key,index) in items" :item="item" :taskActive="taskActive" @status="status" :index="key" :key="key" :type="1"/>
    </transition-group>
</div>
</template>
<script>
const item = import('@/components/Usertask/item')
export default {
    data(){
        return{
            items:[]
        }
    },
    props:['res','taskActive'],
    created(){
        this.res.forEach((ele,idx) => {
            this.pushObj(ele,idx+1)
        });
    },
    methods:{
        pushObj(obj,idx){
            var that = this
            setTimeout(()=>{
                that.items.push(obj)
            },idx*50)
        },
        status(value){
            this.$emit('status',value)
        }
    },
    components:{
        ITEM(){
            return {
                component:item,
            }
        },
    }
}
</script>

