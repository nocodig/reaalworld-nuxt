<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onsubmit()">
            <fieldset>
              <fieldset class="form-group">
                <input
                  :disabled="submitting"
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  :disabled="submitting"
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  :disabled="submitting"
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  :disabled="submitting"
                  v-model="article.tagList"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                :disabled="submitting"
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'

export default {
  name: 'EditorIndex',
  // 路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',

  async asyncData({ params }) {
    const article = {
        title: '',
        description: '',
        body: '',
        tagList: ''
    };

    if (params.slug) {
      const { data: {article: init} } = await getArticle(params.slug);

      article.title = init.title
      article.description = init.description
      article.body = init.body
      article.tagList = init.tagList.join(',')
    }


    return {
      article
    }
  },

  data() {
    return {
      submitting: false
    }
  },

  methods: {
    async onsubmit() {
      this.submitting = true
      let article;
      if (this.$route.params.slug) {
        const {data} = await updateArticle({
          article: {
            ...this.article,
            tagList: this.article.tagList.split(',')
          }
        }, this.$route.params.slug)
        article = data.article;
      } else {
        const {data} = await createArticle({
          article: {
            ...this.article,
            tagList: this.article.tagList.split(',')
          }
        })
        article = data.article;
      }
      

      this.$router.push({
        name: 'article',
        params: {
          slug: article.slug
        }
      })
    }
  }
}
</script>

<style>
</style>