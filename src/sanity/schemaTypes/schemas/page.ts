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
      title: "Conteúdo",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto Alternativo",
            },
            {
              name: "caption",
              type: "string",
              title: "Legenda",
            },
          ],
        },
        {
          type: "object",
          name: "hero",
          title: "Seção Hero",
          fields: [
            {
              name: "title",
              title: "Título",
              type: "string",
            },
            {
              name: "subtitle",
              title: "Subtítulo",
              type: "string",
            },
            {
              name: "image",
              title: "Imagem",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "ctaText",
              title: "Texto do Botão",
              type: "string",
            },
            {
              name: "ctaUrl",
              title: "URL do Botão",
              type: "string",
            },
          ],
        },
        {
          type: "object",
          name: "proposals",
          title: "Seção de Propostas",
          fields: [
            {
              name: "title",
              title: "Título da Seção",
              type: "string",
            },
            {
              name: "proposals",
              title: "Propostas",
              type: "array",
              of: [{ type: "reference", to: [{ type: "proposal" }] }],
            },
          ],
        },
        {
          type: "object",
          name: "events",
          title: "Seção de Eventos",
          fields: [
            {
              name: "title",
              title: "Título da Seção",
              type: "string",
            },
            {
              name: "events",
              title: "Eventos",
              type: "array",
              of: [{ type: "reference", to: [{ type: "event" }] }],
            },
          ],
        },
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
