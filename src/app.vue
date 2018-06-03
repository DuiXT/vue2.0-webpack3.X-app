<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <todo></todo>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from './todo/header.vue'
    import Footer from './todo/footer.jsx'
    import todo from './todo/todo.vue'
export default{
    components:{
        Header,Footer,todo
    }
}
</script>
<!--scoped保证该样式仅在当前模板中生效，其他模板即使有重复的id也不会生效-->
<style lang="stylus" scoped>
#app{
    position absolute
    left:0
    right 0
    top 0
    bottom 0
}
    #cover{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999;
        opacity .9
        z-index -1
    }
</style>