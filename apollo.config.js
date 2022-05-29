module.exports = {
  client: {
    service: {
      name: "vag",
      localSchemaFile: "./src/graphql/schema.graphql",
    },
    includes: ["src/**/*.{vue,ts}"],
  },
};
