import { defineField, defineType } from "sanity";

// Hero Block
export const heroBlock = defineType({
  name: "heroBlock",
  title: "Bloco Hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "backgroundImage",
      title: "Imagem de Fundo",
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
      name: "ctaButton",
      title: "Botão de Ação",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Texto do Botão",
          type: "string",
        },
        {
          name: "url",
          title: "URL",
          type: "string",
        },
        {
          name: "style",
          title: "Estilo",
          type: "string",
          options: {
            list: [
              { title: "Primário", value: "primary" },
              { title: "Secundário", value: "secondary" },
              { title: "Outline", value: "outline" },
            ],
          },
          initialValue: "primary",
        },
      ],
    }),
    defineField({
      name: "height",
      title: "Altura",
      type: "string",
      options: {
        list: [
          { title: "Pequena", value: "sm" },
          { title: "Média", value: "md" },
          { title: "Grande", value: "lg" },
          { title: "Extra Grande", value: "xl" },
        ],
      },
      initialValue: "lg",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "backgroundImage",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Hero: ${title}`,
        subtitle: subtitle,
        media: selection.media,
      };
    },
  },
});

// Text Block
export const textBlock = defineType({
  name: "textBlock",
  title: "Bloco de Texto",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título (Opcional)",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Conteúdo",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alignment",
      title: "Alinhamento",
      type: "string",
      options: {
        list: [
          { title: "Esquerda", value: "left" },
          { title: "Centro", value: "center" },
          { title: "Direita", value: "right" },
        ],
      },
      initialValue: "left",
    }),
    defineField({
      name: "backgroundColor",
      title: "Cor de Fundo",
      type: "string",
      options: {
        list: [
          { title: "Transparente", value: "transparent" },
          { title: "Branco", value: "white" },
          { title: "Cinza Claro", value: "gray-light" },
          { title: "Primária", value: "primary" },
          { title: "Secundária", value: "secondary" },
        ],
      },
      initialValue: "transparent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      content: "content",
    },
    prepare(selection) {
      const { title, content } = selection;
      const contentPreview =
        content?.[0]?.children?.[0]?.text || "Texto sem título";
      return {
        title: title ? `Texto: ${title}` : "Bloco de Texto",
        subtitle: contentPreview.substring(0, 60) + "...",
      };
    },
  },
});

// Image Block
export const imageBlock = defineType({
  name: "imageBlock",
  title: "Bloco de Imagem",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Legenda (Opcional)",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "size",
      title: "Tamanho",
      type: "string",
      options: {
        list: [
          { title: "Pequena", value: "small" },
          { title: "Média", value: "medium" },
          { title: "Grande", value: "large" },
          { title: "Largura Total", value: "full" },
        ],
      },
      initialValue: "large",
    }),
    defineField({
      name: "alignment",
      title: "Alinhamento",
      type: "string",
      options: {
        list: [
          { title: "Esquerda", value: "left" },
          { title: "Centro", value: "center" },
          { title: "Direita", value: "right" },
        ],
      },
      initialValue: "center",
    }),
  ],
  preview: {
    select: {
      media: "image",
      alt: "image.alt",
      size: "size",
    },
    prepare(selection) {
      const { alt, size } = selection;
      return {
        title: `Imagem: ${alt || "Sem descrição"}`,
        subtitle: `Tamanho: ${size}`,
        media: selection.media,
      };
    },
  },
});

// Gallery Block
export const galleryBlock = defineType({
  name: "galleryBlock",
  title: "Galeria de Imagens",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título da Galeria",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Imagens",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto Alternativo",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Legenda",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grade 2 Colunas", value: "grid-2" },
          { title: "Grade 3 Colunas", value: "grid-3" },
          { title: "Grade 4 Colunas", value: "grid-4" },
          { title: "Carrossel", value: "carousel" },
        ],
      },
      initialValue: "grid-3",
    }),
  ],
  preview: {
    select: {
      title: "title",
      images: "images",
      layout: "layout",
    },
    prepare(selection) {
      const { title, images, layout } = selection;
      const imageCount = images?.length || 0;
      return {
        title: title ? `Galeria: ${title}` : "Galeria de Imagens",
        subtitle: `${imageCount} imagens - Layout: ${layout}`,
        media: images?.[0],
      };
    },
  },
});

// Call to Action Block
export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Bloco Call-to-Action",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttons",
      title: "Botões",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Texto",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "style",
              title: "Estilo",
              type: "string",
              options: {
                list: [
                  { title: "Primário", value: "primary" },
                  { title: "Secundário", value: "secondary" },
                  { title: "Outline", value: "outline" },
                ],
              },
              initialValue: "primary",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: "backgroundColor",
      title: "Cor de Fundo",
      type: "string",
      options: {
        list: [
          { title: "Primária", value: "primary" },
          { title: "Secundária", value: "secondary" },
          { title: "Gradiente", value: "gradient" },
          { title: "Branco", value: "white" },
        ],
      },
      initialValue: "gradient",
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      buttons: "buttons",
    },
    prepare(selection) {
      const { title, description, buttons } = selection;
      const buttonCount = buttons?.length || 0;
      return {
        title: `CTA: ${title}`,
        subtitle: `${buttonCount} botões - ${description?.substring(0, 40)}...`,
      };
    },
  },
});

// Video Block
export const videoBlock = defineType({
  name: "videoBlock",
  title: "Bloco de Vídeo",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título (Opcional)",
      type: "string",
    }),
    defineField({
      name: "videoUrl",
      title: "URL do Vídeo",
      type: "url",
      description: "URL do YouTube, Vimeo ou arquivo de vídeo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Miniatura Personalizada",
      type: "image",
      description:
        "Opcional - será usado thumbnail automático se não fornecido",
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
      name: "aspectRatio",
      title: "Proporção",
      type: "string",
      options: {
        list: [
          { title: "16:9 (Widescreen)", value: "16:9" },
          { title: "4:3 (Padrão)", value: "4:3" },
          { title: "1:1 (Quadrado)", value: "1:1" },
        ],
      },
      initialValue: "16:9",
    }),
  ],
  preview: {
    select: {
      title: "title",
      videoUrl: "videoUrl",
      media: "thumbnail",
    },
    prepare(selection) {
      const { title, videoUrl } = selection;
      return {
        title: title ? `Vídeo: ${title}` : "Bloco de Vídeo",
        subtitle: videoUrl,
        media: selection.media,
      };
    },
  },
});

// Proposals Showcase Block
export const proposalsShowcaseBlock = defineType({
  name: "proposalsShowcaseBlock",
  title: "Vitrine de Propostas",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título da Seção",
      type: "string",
      initialValue: "Nossas Propostas",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "proposals",
      title: "Propostas",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "proposal" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(12),
      description: "Selecione as propostas que deseja mostrar nesta seção",
    }),
    defineField({
      name: "showCategoryFilter",
      title: "Mostrar Filtro de Categorias",
      type: "boolean",
      initialValue: true,
      description:
        "Mostrar botões de filtro por categoria baseados nas propostas selecionadas",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grade", value: "grid" },
          { title: "Lista", value: "list" },
          { title: "Carrossel", value: "carousel" },
        ],
      },
      initialValue: "grid",
    }),
  ],
  preview: {
    select: {
      title: "title",
      proposals: "proposals",
      layout: "layout",
    },
    prepare(selection) {
      const { title, proposals, layout } = selection;
      const proposalCount = proposals?.length || 0;
      return {
        title: `Propostas: ${title}`,
        subtitle: `${proposalCount} propostas - Layout: ${layout}`,
      };
    },
  },
});

// Spacer Block
export const spacerBlock = defineType({
  name: "spacerBlock",
  title: "Espaçador",
  type: "object",
  fields: [
    defineField({
      name: "height",
      title: "Altura",
      type: "string",
      options: {
        list: [
          { title: "Pequeno (1rem)", value: "sm" },
          { title: "Médio (2rem)", value: "md" },
          { title: "Grande (4rem)", value: "lg" },
          { title: "Extra Grande (6rem)", value: "xl" },
        ],
      },
      initialValue: "md",
    }),
  ],
  preview: {
    select: {
      height: "height",
    },
    prepare(selection) {
      const { height } = selection;
      const heightLabels = {
        sm: "Pequeno",
        md: "Médio",
        lg: "Grande",
        xl: "Extra Grande",
      };
      return {
        title: "Espaçador",
        subtitle: `Altura: ${heightLabels[height as keyof typeof heightLabels]}`,
      };
    },
  },
});
