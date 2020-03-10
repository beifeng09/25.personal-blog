<template>
  <!--自定义指令 传的值需要单引号-->
  <!--自定义需在main.js中调试-->
  <!--展示json数据-->
  <div v-theme:column="'blogs'" id="show-blogs">
<h1>博客总览</h1>
    <!--搜索框-->
    <input type="text" placeholder="搜索" v-model="search">
    <div v-for="blog in filteredBlogs" class="single-blog">


      <!--使用自定义指令 main.js中调用-->
    <router-link v-bind:to="'/blog/' + blog.id"><h2 v-rainbow>{{blog.title | toUppercase}}</h2>
    </router-link>

      <article>{{blog.content }}</article>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'show-blogs',
    data() {
      return {
        blogs:[],
      //  搜搜框
        search:""

      }
    },
    //获取get请求
    created() {
      this.$http.get('../static/posts.json')
        .then(function(data) {
          // console.log(data.json());
          return data.json()
          //只获取10条数据
          // this.blogs = data.body.slice(0, 10);
          // console.log(this.blogs)
        })
        .then(function(data) {
          var blogsArray = [];
          for(let key in data){
            // console.log(key);
            // console.log(data[key]);
            data[key].id = key;
            blogsArray.push(data[key]);

          }
          // console.log(blogsArray);
          this.blogs = blogsArray;
          console.log(this.blogs)
        })

    },
  //  搜索框
    computed:{
      filteredBlogs:function() {
        //返回过滤器blog
        return this.blogs.filter((blog) => {
          //返回blog中的标题模块match指向搜索
          return blog.title.match(this.search);
        })
      }
    },

    //局部过滤器
    filters: {
      // "to-uppercase":function(value){
      //   return value.toUpperCase();
      // }
      //使用es6方法过滤器
      toUppercase(value){
        return value.toUpperCase();
      }
    },
  //  本地方法过滤器
    directives:{
      'rainbow':{
        bind(el,binding,vnode){
          el.style.color="#" + Math.random().toString(16).slice(2,8)
        }
      }
    }
  }
</script>

<style>
#show-blos {
  max-width: 800px;
  margin: 0 auto;
}
  .single-blog{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #999;
    border: 1px dotted #aaa;
  }
  #show-blogs a{
    text-decoration: none;
    color: #444;
  }
  input[type="text"] {
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }

</style>
