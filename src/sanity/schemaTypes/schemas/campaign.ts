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
      description:
        "Logotipo da campanha (opcional - será mostrado título se não fornecido)",
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
      name: "contentTypes",
      title: "Tipos de Conteúdo Ativados",
      type: "object",
      description: "Configure que tipos de conteúdo esta campanha utiliza",
      fields: [
        {
          name: "proposals",
          title: "Propostas/Programa",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "news",
          title: "Notícias/Posts",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "events",
          title: "Eventos/Agenda",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "customPages",
          title: "Páginas Personalizadas",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: "navigationLabels",
      title: "Etiquetas de Navegação",
      type: "object",
      description: "Personalize os nomes dos links de navegação",
      fields: [
        {
          name: "proposals",
          title: "Nome para Propostas",
          type: "string",
          initialValue: "Propostas",
          description: "Ex: Propostas, Programa, Plano",
        },
        {
          name: "news",
          title: "Nome para Notícias",
          type: "string",
          initialValue: "Notícias",
          description: "Ex: Notícias, Atualizações, Blog",
        },
        {
          name: "events",
          title: "Nome para Eventos",
          type: "string",
          initialValue: "Eventos",
          description: "Ex: Eventos, Agenda, Atividades",
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
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "seoSettings",
      title: "Configurações SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Título Meta",
          type: "string",
          description: "Título para resultados de busca",
        },
        {
          name: "metaDescription",
          title: "Descrição Meta",
          type: "text",
          rows: 2,
          description: "Descrição para resultados de busca",
        },
        {
          name: "ogImage",
          title: "Imagem Social (Open Graph)",
          type: "image",
          description: "Imagem exibida quando partilhado nas redes sociais",
        },
      ],
    }),
    defineField({
      name: "headerContent",
      title: "Conteúdo do Header",
      type: "object",
      fields: [
        {
          name: "tagline",
          title: "Slogan",
          type: "string",
          description: "Slogan curto exibido no menu mobile",
        },
      ],
    }),
    defineField({
      name: "footerContent",
      title: "Conteúdo do Footer",
      type: "object",
      fields: [
        {
          name: "description",
          title: "Descrição da Campanha",
          type: "text",
          rows: 2,
          description: "Descrição curta exibida no rodapé",
        },
        {
          name: "contactInfo",
          title: "Informações de Contacto",
          type: "object",
          fields: [
            {
              name: "phone",
              title: "Telefone",
              type: "string",
            },
            {
              name: "email",
              title: "Email",
              type: "email",
            },
            {
              name: "address",
              title: "Morada",
              type: "string",
            },
          ],
        },
        {
          name: "quickLinks",
          title: "Links Rápidos",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  title: "Nome do Link",
                  type: "string",
                  description:
                    "Deixe vazio para usar o título da página automaticamente",
                },
                {
                  name: "linkType",
                  title: "Tipo de Link",
                  type: "string",
                  options: {
                    list: [
                      { title: "Página Personalizada", value: "page" },
                      { title: "Lista de Propostas", value: "proposals" },
                      { title: "Lista de Notícias", value: "news" },
                      { title: "Lista de Eventos", value: "events" },
                      { title: "URL Externa", value: "external" },
                    ],
                  },
                },
                {
                  name: "pageReference",
                  title: "Página",
                  type: "reference",
                  to: [{ type: "page" }],
                  hidden: ({ parent }) => parent?.linkType !== "page",
                  validation: (Rule) =>
                    Rule.custom((value, { parent }) => {
                      if (
                        (parent as { linkType?: string })?.linkType ===
                          "page" &&
                        !value
                      ) {
                        return "Página é obrigatória para links do tipo 'Página Personalizada'";
                      }
                      return true;
                    }),
                },
                {
                  name: "externalUrl",
                  title: "URL Externa",
                  type: "url",
                  hidden: ({ parent }) => parent?.linkType !== "external",
                  validation: (Rule) =>
                    Rule.custom((value, { parent }) => {
                      if (
                        (parent as { linkType?: string })?.linkType ===
                          "external" &&
                        !value
                      ) {
                        return "URL é obrigatória para links externos";
                      }
                      return true;
                    }),
                },
              ],
              preview: {
                select: {
                  label: "label",
                  linkType: "linkType",
                  pageTitle: "pageReference.title",
                  externalUrl: "externalUrl",
                },
                prepare({ label, linkType, pageTitle, externalUrl }) {
                  const typeConfig = {
                    page: { label: "Página", defaultTitle: pageTitle },
                    proposals: {
                      label: "Propostas",
                      defaultTitle: "Propostas",
                    },
                    news: { label: "Notícias", defaultTitle: "Notícias" },
                    events: { label: "Eventos", defaultTitle: "Eventos" },
                    external: { label: "Externa", defaultTitle: externalUrl },
                  };

                  const config =
                    typeConfig[linkType as keyof typeof typeConfig];
                  const title =
                    label || config?.defaultTitle || "Link sem título";

                  const subtitleParts = [config?.label || linkType];
                  if (linkType === "page" && pageTitle)
                    subtitleParts.push(pageTitle);
                  if (linkType === "external" && externalUrl)
                    subtitleParts.push(externalUrl);

                  return {
                    title,
                    subtitle: subtitleParts.join(" - "),
                  };
                },
              },
            },
          ],
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
