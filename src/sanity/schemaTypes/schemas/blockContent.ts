import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                title: "Abrir em nova aba",
                name: "blank",
                type: "boolean",
                initialValue: false,
              },
            ],
          },
          {
            title: "Destaque",
            name: "highlight",
            type: "object",
            fields: [
              {
                title: "Cor de fundo",
                name: "color",
                type: "string",
                options: {
                  list: [
                    { title: "Azul", value: "blue" },
                    { title: "Vermelho", value: "red" },
                    { title: "Verde", value: "green" },
                    { title: "Amarelo", value: "yellow" },
                  ],
                },
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
          description: "Importante para acessibilidade e SEO.",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Legenda",
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "video",
      title: "Vídeo",
      fields: [
        {
          name: "url",
          type: "url",
          title: "URL do Vídeo",
          description: "YouTube, Vimeo, etc.",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "title",
          type: "string",
          title: "Título do Vídeo",
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Caixa de Destaque",
      fields: [
        {
          name: "type",
          type: "string",
          title: "Tipo",
          options: {
            list: [
              { title: "Informação", value: "info" },
              { title: "Aviso", value: "warning" },
              { title: "Sucesso", value: "success" },
              { title: "Erro", value: "error" },
            ],
          },
          initialValue: "info",
        },
        {
          name: "title",
          type: "string",
          title: "Título",
        },
        {
          name: "content",
          type: "text",
          title: "Conteúdo",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
});
