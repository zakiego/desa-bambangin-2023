import {
  collection,
  config as keystaticConfig,
  fields,
  type GitHubConfig,
  type LocalConfig,
  singleton,
} from "@keystatic/core";
import { v4 as uuidv4 } from "uuid";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: "zakiego",
          name: "desa-bambangin-2023",
        },
      };

export default keystaticConfig({
  storage,
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
    kknPage: singleton({
      label: "KKN Page",
      format: "json",
      path: "src/content/kkn-page/",
      schema: {
        hero: fields.object({
          heading: fields.text({
            label: "Hero Heading",
          }),
          subheading: fields.text({
            label: "Hero Subheading",
            multiline: true,
          }),
          images: fields.array(
            fields.image({
              label: "Hero Images",
              directory: "public/images/content/kkn-page/hero",
              publicPath: "/images/content/kkn-page/hero",
              validation: {
                isRequired: true,
              },
            }),
            {
              label: "Hero Images",
            },
          ),
        }),
        mission: fields.object({
          heading: fields.text({
            label: "Mission Heading",
          }),
          subheading: fields.text({
            label: "Mission Subheading",
          }),
          content: fields.document({
            label: "Mission Content",
            formatting: true,
          }),
        }),
        values: fields.object({
          image: fields.image({
            label: "Values Image",
            directory: "public/images/content/kkn-page/values",
            publicPath: "/images/content/kkn-page/values",
          }),
          heading: fields.text({
            label: "Values Heading",
          }),
          subheading: fields.text({
            label: "Values Subheading",
          }),
          items: fields.array(
            fields.object({
              title: fields.text({
                label: "Title",
              }),
              description: fields.text({
                label: "Description",
                multiline: true,
              }),
            }),
            {
              label: "Values Items",
              itemLabel: (props) => props.fields.title.value as string,
            },
          ),
        }),
        stats: fields.array(
          fields.object({
            label: fields.text({
              label: "Stats Label",
            }),
            value: fields.text({
              label: "Stats Value",
            }),
          }),
          {
            label: "Stats",
            itemLabel: (props) => props.fields.label.value as string,
          },
        ),
        blog: fields.object({
          heading: fields.text({
            label: "Blog Heading",
          }),
          subheading: fields.text({
            label: "Blog Subheading",
          }),
        }),
        team: fields.object({
          heading: fields.text({
            label: "Team Heading",
          }),
          subheading: fields.text({
            label: "Team Subheading",
          }),
        }),
        teamPeople: fields.array(
          fields.relationship({
            label: "Team",
            collection: "kknTeam",
          }),
          {
            itemLabel(props) {
              return props.value as string;
            },
            label: "Team",
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
          images: {
            directory: "public/images/content/berita",
            publicPath: "/images/content/berita",
          },
        }),
        id: fields.text({
          label: "ID",
          defaultValue: uuidv4(),
        }),
      },
    }),
    pages: collection({
      label: "Pages",
      path: "src/content/pages/*/",
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
          images: {
            directory: "public/images/content/pages",
            publicPath: "/images/content/pages",
          },
        }),
        id: fields.text({
          label: "ID",
          defaultValue: uuidv4(),
        }),
      },
    }),
    kknArticles: collection({
      label: "KKN Articles",
      path: "src/content/kkn-articles/*/",
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
          directory: "public/images/content/kkn-articles",
          publicPath: "/images/content/kkn-articles",
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
          images: {
            directory: "public/images/content/kkn-articles",
            publicPath: "/images/content/kkn-articles",
          },
        }),
        id: fields.text({
          label: "ID",
          defaultValue: uuidv4(),
        }),
      },
    }),
    kknTeam: collection({
      label: "KKN Team",
      path: "src/content/kkn-team/*/",
      format: "json",
      slugField: "name",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
          },
        }),
        role: fields.text({
          label: "Role",
        }),
        image: fields.image({
          label: "Image",
          directory: "public/images/content/kkn-team",
          publicPath: "/images/content/kkn-team",
          validation: {
            isRequired: true,
          },
        }),
        bio: fields.text({
          label: "Bio",
          multiline: true,
        }),
        instagram: fields.text({
          label: "Instagram",
          description: "Instagram username without @",
        }),
        twitter: fields.text({
          label: "Twitter",
          description: "Twitter username without @",
        }),
        linkedin: fields.text({
          label: "Linkedin",
          description: "Linkedin username without @",
        }),
      },
    }),
  },
});
