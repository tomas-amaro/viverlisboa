import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Evento",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título do Evento",
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
      name: "date",
      title: "Data do Evento",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Hora do Evento",
      type: "string",
      description: "Ex: 18:00 ou 14:30-16:00",
    }),
    defineField({
      name: "location",
      title: "Local",
      type: "string",
      description: "Endereço ou nome do local do evento",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      title: "Imagem do Evento",
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
      name: "registrationUrl",
      title: "URL de Inscrição",
      type: "url",
      description: "Link para inscrição no evento (se aplicável)",
    }),
    defineField({
      name: "eventType",
      title: "Tipo de Evento",
      type: "string",
      options: {
        list: [
          { title: "Comício", value: "comicio" },
          { title: "Debate", value: "debate" },
          { title: "Encontro", value: "encontro" },
          { title: "Apresentação", value: "apresentacao" },
          { title: "Conferência", value: "conferencia" },
          { title: "Arruada", value: "arruada" },
          { title: "Outro", value: "outro" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Evento Destacado",
      type: "boolean",
      description: "Marcar para destacar este evento",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      time: "time",
      media: "image",
    },
    prepare(selection) {
      const { title, date, time } = selection;
      const formattedDate = date
        ? new Date(date).toLocaleDateString("pt-PT")
        : "";
      const subtitle = time ? `${formattedDate} às ${time}` : formattedDate;

      return {
        title,
        subtitle,
        media: selection.media,
      };
    },
  },
  orderings: [
    {
      title: "Data do Evento, Mais Próximo",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Data do Evento, Mais Distante",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
