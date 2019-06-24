<template>
    <div>
        <ol class="messageList">
            <li v-for="(res, key) in list" :key="key" @click.stop="openNews($event, key)">
                <div class="title clearfix">
                    <i class="origin f"></i><span class="f">{{res.title}}</span><span class="r">{{res.time}}</span>
                </div>
                <p ref="list_p">
                    <strong>{{res.content}}</strong>
                </p>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: "messageList",
        props: {
            list: Array,
            checked: Number
        },
        data () {
            return {
                flag: true,
                offsetH: ''
            }
        },
        methods: {
            openNews ($event, key) {
                this.$emit('resetState')
                let lis = document.querySelectorAll('li')
                let p = $event.currentTarget.children[1]
                let offsetH = p.firstChild.offsetHeight
                if ((offsetH - this.offsetH) > 8) {
                    if (p.offsetHeight === offsetH) {
                        p.style.height = this.offsetH + 'px'
                    } else {
                        p.style.height = offsetH + 'px'
                    }
                    lis.forEach((res, i) => {
                        if (key !== i) res.lastChild.style.height = this.offsetH + 'px'
                    })
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                if (this.$refs.list_p&&this.$refs.list_p.length > 0) {
                    this.offsetH = this.$refs.list_p[0].offsetHeight
                } else {
                    this.offsetH = this.$refs.list_p&&this.$refs.list_p.offsetHeight
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .messageList {
        li {
            padding: 20px 30px; border-bottom: 1px solid #d2d2d2;
            .title {
                height: 28px; margin-bottom: 18px; color: #000; font-size: 28px; line-height: 28px;
                .f {
                    float: left; animation: wobble .3s ease-in-out .1s forwards; opacity: 0;
                }
                .r {
                    float: right; color: #999; font-size: 22px;
                }
                .origin {
                    width: 20px; height: 20px; margin: 4px 20px 0 0; background: $theme-color; border-radius: 50%
                }
            }
            p {
                overflow: hidden; height: 30px; line-height: 35px; padding-left: 40px; color: #666; font-size: 26px; text-align: justify; box-sizing: content-box;
                transition: all .3s ease-in-out;
                strong {
                    display: block; animation: wobble .3s ease-in-out .1s forwards; opacity: 0;
                }
            }
            @keyframes wobble {
                from {
                    transform:translateX(15px);
                    opacity: 0;
                }
                to {
                    transform:translateX(0px);
                    opacity: 1;
                }
            }
        }
    }
</style>
