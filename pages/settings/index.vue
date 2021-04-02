<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="submitForm()">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userData.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userData.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="userData.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userData.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userData.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout()">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { updateUserInfo } from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "SettingsIndex",
  middleware: "authenticated",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      userData: {
        image: "",
        username: "",
        email: "",
        bio: "",
        password: "",
      },
    };
  },

  created() {
    this.userData.image = this.user.image;
    this.userData.username = this.user.username;
    this.userData.email = this.user.email;
    this.userData.bio = this.user.bio;
  },

  methods: {
    ...mapMutations(["setUser", "removeUser"]),
    async submitForm() {
      const params = {};

      Object.keys(this.userData).forEach((item) => {
        if (this.userData[item]) {
          params[item] = this.userData[item];
        }
      });

      const { data } = await updateUserInfo({
        user: {
          ...params,
        },
      });

      this.setUser(data.user);
      Cookie.set("user", data.user);

      this.$router.push({
        name: "profile",
        params: {
          username: this.userData.username,
        },
      });
    },

    logout() {
      this.removeUser();
      Cookie.remove("user", null);

      this.$router.push({
        name: 'home'
      })
    },
  },
};
</script>

<style>
</style>