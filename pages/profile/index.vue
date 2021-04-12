<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img
              :src="
                profile.image ||
                'https://static.productionready.io/images/smiley-cyrus.jpg'
              "
              class="user-img"
            />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              v-if="!isCurrentUser"
              @click="toggleFollow()"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "Unfollow" : "Follow" }}
              {{ profile.username }}
            </button>
            <button
              v-else
              @click="gotoSettings()"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{ active: tab === 'myArticle' }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'myArticle',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{ active: tab === 'favorite' }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorite',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            v-for="article in articles"
            :key="article.slug"
            class="article-preview"
          >
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
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li
                v-for="item in totalPage"
                :key="item"
                :class="{
                  active: item === page,
                }"
                class="page-item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'profile',
                    query: {
                      page: item,
                      tab: tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getArticles } from "@/api/article";
import { getProfilesInfo, followUser, unFollowUser } from "@/api/user";

export default {
  name: "UserProfileIndex",
  middleware: "authenticated",
  async asyncData({ params, query }) {
    const page = parseInt(query.page || 1);
    const limit = 5;

    const articleParams =
      query.tab !== "favorite"
        ? {
            author: params.username,
          }
        : {
            favorited: params.username,
          };

    const [articleRes, profileRes] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit,
        ...articleParams,
      }),
      getProfilesInfo(params.username),
    ]);

    const {
      data: { profile },
    } = profileRes;
    const {
      data: { articles, articlesCount },
    } = articleRes;

    return {
      profile,
      articles,
      articlesCount,
      page,
      limit,
      tab: query.tab || "myArticle",
    };
  },
  watchQuery: ["page", "tab"],
  computed: {
    ...mapState(["user"]),
    isCurrentUser() {
      return this.user.username === this.$route.params.username;
    },
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    gotoSettings() {
      this.$router.push({
        name: "settings",
      });
    },

    async toggleFollow() {
      if (this.profile.following) {
        await unFollowUser(this.profile.username);
        this.profile.following = false;
      } else {
        await followUser(this.profile.username);
        this.profile.following = true;
      }
    },

    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        await removeFavorite(article.slug);
        article.favoriteDisabled = false;
        article.favorited = false;
        article.favoritesCount--;
        return;
      }

      await addFavorite(article.slug);
      article.favoriteDisabled = false;
      article.favorited = true;
      article.favoritesCount++;
    },
  },
};
</script>

<style>
</style>