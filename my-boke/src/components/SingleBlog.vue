<template>
  <div id="single-blog">
    <!--标题 内容-->
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
    <p>作者：{{blog.author}}</p>
    <p>分类：</p>
    <ul>
      <li v-for="category in blog.categories">
          {{category}}
      </li>
    </ul>

    <button @click="deleteSingleBlog()">删除</button>
    <router-link :to="'/edit/' + id">编辑</router-link>
  </div>
</template>

<script>
export default {
  name: 'single-blog',
  data () {
    return {
      // 获取输入的id
      id:this.$route.params.id,
      blog:{}
    }
  },
  //显示效果：blog/id号
  created() {
    this.$http.get('https://vuedemo-b1233.firebaseio.com/posts/' + this.id + ".json")
      .then(function(data){
        console.log(data);
      return data.json();
      })
      //   this.blog = data.body;
        .then(function(data) {
          this.blog = data;


      })

  },
  methods: {
    deleteSingleBlog(){
      this.$http.delete("https://vuedemo-b1233.firebaseio.com/posts/"+ this.id + ".json")
    //  如果删除成功
        .then(response => {
          this.$router.push({path:'/'})
        })
    }
  }
}
</script>


<style scoped>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #ccc;
  border: 1px solid #999;
}
</style>
