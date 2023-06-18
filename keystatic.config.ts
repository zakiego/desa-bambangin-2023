import { config as keystaticConfig, fields, singleton } from "@keystatic/core";

export default keystaticConfig({
  storage: {
    kind: "local",
  },
  singletons: {
    homepage: singleton({
      label: "Homepage",
      path: "src/content/homepage",
      format: "json",
      schema: {
        title: fields.text({
          label: "Title",
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        subtitle: fields.text({
          label: "Subtitle",
          multiline: true,
          validation: {
            length: {
              min: 1,
            },
          },
        }),
      },
    }),
    profile: singleton({
      label: "Profil Desa",
      path: "src/content/profile",
      format: "json",
      schema: {
        title: fields.text({
          label: "Title",
          validation: {
            length: {
              min: 1,
            },
          },
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          links: true,
        }),
      },
    }),
  },
});
