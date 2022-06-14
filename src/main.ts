import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";

import App from "./App.vue";
import { apolloClient } from "./apolloClient";

import "./index.css";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.mount("#app");
