import {
  collection,
  config as keystaticConfig,
  fields,
  singleton,
} from "@keystatic/core";
import { v4 as uuidv4 } from "uuid";

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
    hightlights: singleton({
      label: "Highlights",
      path: "src/content/highlights/",
      format: "json",
      schema: {
        content: fields.array(
          fields.relationship({
            label: "Berita",
            collection: "berita",
          }),
          {
            label: "Content",
            itemLabel: (props) => props.value as string,
            validation: {
              length: {
                max: 3,
              },
            },
          },
        ),
      },
    }),
  },
  collections: {
    berita: collection({
      label: "Berita",
      path: "src/content/berita/*/",
      format: "json",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
          },
        }),
        image: fields.image({
          label: "Image",
          directory: "public/images/content/berita",
          publicPath: "/images/content/berita",
          validation: {
            isRequired: true,
          },
        }),
        datePublished: fields.date({
          label: "Date Published",
          validation: {
            isRequired: true,
          },
        }),
        summary: fields.text({
          label: "Summary",
          multiline: true,
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
        id: fields.text({
          label: "ID",
          defaultValue: uuidv4(),
        }),
      },
    }),
  },
});
