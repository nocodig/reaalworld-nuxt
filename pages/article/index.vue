<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comment :article="article" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkDownIt from 'markdown-it';
import { getArticle } from "@/api/article";
import ArticleMeta from './components/article-meta'
import ArticleComment from './components/article-comment'


export default {
  name: "ArticleIndex",
  components: {
    ArticleMeta,
    ArticleComment
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);
    const md = new MarkDownIt();
    data.article.body = md.render(data.article.body)

    return {
      article: data.article,
    };
  },
  head() {
    return {
      title: `${this.article.title} - realWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description},
      ]
    }
  }
};
</script>

<style>
</style>