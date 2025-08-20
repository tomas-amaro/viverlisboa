import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Notícia",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
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
      name: "campaign",
      title: "Campanha",
      type: "reference",
      to: [{ type: "campaign" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
      description: "Breve descrição da notícia",
    }),
    defineField({
      name: "featuredImage",
      title: "Imagem Destacada",
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
      name: "content",
      title: "Conteúdo",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Propostas", value: "propostas" },
          { title: "Eventos", value: "eventos" },
          { title: "Comunicados", value: "comunicados" },
          { title: "Imprensa", value: "imprensa" },
          { title: "Campanha", value: "campanha" },
        ],
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Título SEO",
          type: "string",
          description: "Título para motores de busca (60 caracteres)",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "description",
          title: "Descrição SEO",
          type: "text",
          description: "Descrição para motores de busca (160 caracteres)",
          validation: (Rule) => Rule.max(160),
        },
        {
          name: "keywords",
          title: "Palavras-chave",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        },
        {
          name: "ogImage",
          title: "Imagem Open Graph",
          type: "image",
          description: "Imagem para redes sociais (1200x630px)",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "featuredImage",
    },
    prepare(selection) {
      const { subtitle } = selection;
      return {
        ...selection,
        subtitle: subtitle && new Date(subtitle).toLocaleDateString("pt-PT"),
      };
    },
  },
  orderings: [
    {
      title: "Data de Publicação, Mais Recente",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
