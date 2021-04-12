<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date("MMM DD,YYYY") }}</span>
    </div>
    <template v-if="!isOwner">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following,
        }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow Eric Simons <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">(29)</span>
      </button>
    </template>
    <template v-else>
      <nuxt-link
        class="btn btn-sm btn-outline-secondary"
        :to="{
          name: 'editor',
          params: {
            slug: article.slug,
          }
        }"
      >
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button
        @click="detArticle()"
        class="btn btn-outline-danger btn-sm"
      >
        <i class="ion-trash-a"></i>
        &nbsp;  Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deletArticle } from '@/api/article'

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
    isOwner() {
      return this.user.username === this.article.author.username;
    },
  },

  methods: {
    async detArticle() {
      await deletArticle(this.article.slug)

      this.$router.push('/')
    }
  }
};
</script>

<style>
</style>