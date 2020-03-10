<template>
  <div id="add-blog">

    <!--添加博客-->
    <h2>编辑博客</h2>
    <!--添加博客方法为非时-->
    <form v-if="!submmited">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" required>
      <label>博客内容</label>
      <textarea v-model="blog.content"></textarea>

      <!--博客分类-->
      <div id="checkboxes">
        <label>vue.js</label>
        <input type="checkbox" value="vue.js" v-model="blog.categories">
        <label>react.js</label>
        <input type="checkbox" value="react.js"  v-model="blog.categories">
        <label>angular</label>
        <input type="checkbox" value="angular"  v-model="blog.categories">
        <label>node.js</label>
        <input type="checkbox" value="node.js"  v-model="blog.categories">
      </div>

      <!--作者-->
      <label>作者：</label>
      <select v-model="blog.author">
        <option v-for="author in authors">{{author}}</option>
      </select>

      <!--启动post方法-->
      <button v-on:click.prevent="post">编辑博客</button>
    </form>


    <div v-if="submmited">
      <h3>博客发送成功！</h3>
    </div>

    <div id="preview">
      <h3>博客总览</h3>
      <!--获取博客标题和内容-->
      <p>博客标题：{{blog.title}}</p>

      <!--博客内容-->
      <p>博客内容：</p>
      <p>{{blog.content}}</p>

      <!--分类-->
      <p>博客分类：</p>
      <ul>
        <li v-for="category in blog.categories">{{category}}</li>
      </ul>

      <!--作者-->
      <p>作者：{{blog.author}}</p>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'add-blog',
    data () {
      return {
        id:this.$route.params.id,
        //  设置对象
        blog:{
          // //博客内容
          // content:"",
          // //博客标题
          // title:"",
          // //博客分类
          // categories:[],
          // //  定义作者
          // author:""
        },
        //  定义作者数据
        authors:["张三", "李四", "李六"],
        //添加博客方法为false
        submmited:false

      }
    },
    //  post触发数据
    methods: {
      fetchData(){
        // console.log(this.id)
        this.$http.get('https://vuedemo-b1233.firebaseio.com/posts/' + this.id + ".json")
             .then(response =>{
               // conosle.log(response.body);
            this.blog = response.body;
        })
      },
      post:function() {
        this.$http.put('https://vuedemo-b1233.firebaseio.com/posts/' + this.id + ".json",this.blog)
        // title:this.blog.title,
        //   body:this.blog.content,
        //   userId:1


        // https://jsonplaceholder.typicode.com/posts
        //返回对应内容
          .then(function(data) {
            console.log(data);
            //  添加博客为true,结果单独展示
            this.submmited = true;
          });
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>


<style scoped>
  #add-blog *{
    box-sizing:border-box;
  }
  #add-blog {
    margin:20px auto;
    max-width: 600px;
    padding:20px;

  }
  label{
    display: block;
    margin: 20px 0 10px;

  }
  input[type="text"],textarea,select {
    display:block;
    width: 100%;
    padding: 8px;
  }
  textarea {
    height: 200px;

  }

  #checkboxes label {
    display: inline-block;
    margin-top: 0;
  }
  #checkboxes input {
    display: inline-block;
    margin-right: 10px;
  }
  button {
    dispaly: block;
    margin: 20px 0;
    background: crimson;
    color: #fff;
    border: 0;
    padding: 14px;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;

  }
  #preview {
    padding: 10px 20px;
    boder: 1px solid #ccc;
    margin: 30px 0;
  }
  h3 {
    margin-top: 10px;

  }

</style>
