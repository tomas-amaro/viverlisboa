import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Página",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título da Página",
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
      name: "showInNavigation",
      title: "Mostrar na Navegação",
      type: "boolean",
      description: "Mostrar esta página no menu de navegação",
      initialValue: false,
    }),
    defineField({
      name: "navigationOrder",
      title: "Ordem na Navegação",
      type: "number",
      description: "Ordem de aparição no menu (menor número = mais cedo)",
      hidden: ({ document }) => !document?.showInNavigation,
    }),
    defineField({
      name: "navigationLabel",
      title: "Etiqueta da Navegação",
      type: "string",
      description: "Nome personalizado para o menu (usa título se vazio)",
      hidden: ({ document }) => !document?.showInNavigation,
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
    defineField({
      name: "content",
      title: "Conteúdo da Página",
      type: "array",
      description: "Construa sua página usando blocos modulares",
      of: [
        { type: "heroBlock" },
        { type: "textBlock" },
        { type: "imageBlock" },
        { type: "galleryBlock" },
        { type: "ctaBlock" },
        { type: "videoBlock" },
        { type: "proposalsShowcaseBlock" },
        { type: "spacerBlock" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "campaign.title",
    },
  },
});
