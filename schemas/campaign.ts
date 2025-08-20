import { defineField, defineType } from "sanity";

export default defineType({
  name: "campaign",
  title: "Campanha",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título da Campanha",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "domain",
      title: "Domínio",
      type: "string",
      description: "Ex: viverlisboa.pt, viveravenidas.pt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Localização",
      type: "string",
      description: "Ex: Lisboa, Avenidas Novas, Alvalade",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainColor",
      title: "Cor Principal",
      type: "string",
      description: "Código hex da cor principal (ex: #48B9CA)",
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    defineField({
      name: "secondaryColor",
      title: "Cor Secundária",
      type: "string",
      description: "Código hex da cor secundária (ex: #FF394C)",
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    defineField({
      name: "logo",
      title: "Logotipo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Imagem Principal",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
        },
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Redes Sociais",
      type: "object",
      fields: [
        {
          name: "facebook",
          title: "Facebook",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter/X",
          type: "url",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "logo",
    },
  },
});
