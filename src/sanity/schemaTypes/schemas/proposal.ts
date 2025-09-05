import { defineField, defineType } from "sanity";

export default defineType({
  name: "proposal",
  title: "Proposta",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título da Proposta",
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
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Habitação", value: "habitacao" },
          { title: "Transportes", value: "transportes" },
          { title: "Ambiente", value: "ambiente" },
          { title: "Cultura", value: "cultura" },
          { title: "Educação", value: "educacao" },
          { title: "Saúde", value: "saude" },
          { title: "Economia", value: "economia" },
          { title: "Participação Cidadã", value: "participacao" },
          { title: "Igualdade", value: "igualdade" },
          { title: "Juventude", value: "juventude" },
          { title: "Idosos", value: "idosos" },
          { title: "Urbanismo", value: "urbanismo" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Resumo",
      type: "text",
      rows: 3,
      description: "Breve descrição da proposta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Conteúdo Detalhado",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priority",
      title: "Prioridade",
      type: "string",
      options: {
        list: [
          { title: "Alta", value: "high" },
          { title: "Média", value: "medium" },
          { title: "Baixa", value: "low" },
        ],
      },
      initialValue: "medium",
    }),
    defineField({
      name: "icon",
      title: "Ícone",
      type: "image",
      description: "Ícone representativo da proposta",
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
      name: "featured",
      title: "Proposta Destacada",
      type: "boolean",
      description: "Marcar para destacar esta proposta",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      priority: "priority",
      media: "icon",
    },
    prepare(selection) {
      const { title, category, priority } = selection;
      const categoryLabels = {
        habitacao: "Habitação",
        transportes: "Transportes",
        ambiente: "Ambiente",
        cultura: "Cultura",
        educacao: "Educação",
        saude: "Saúde",
        economia: "Economia",
        participacao: "Participação Cidadã",
        igualdade: "Igualdade",
        juventude: "Juventude",
        idosos: "Idosos",
        urbanismo: "Urbanismo",
      };

      const priorityEmoji = {
        high: "🔴",
        medium: "🟡",
        low: "🟢",
      };

      return {
        title,
        subtitle: `${
          categoryLabels[category as keyof typeof categoryLabels] || category
        } ${priorityEmoji[priority as keyof typeof priorityEmoji] || ""}`,
        media: selection.media,
      };
    },
  },
  orderings: [
    {
      title: "Prioridade",
      name: "priorityDesc",
      by: [
        { field: "priority", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
    {
      title: "Categoria",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
});
