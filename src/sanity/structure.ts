import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      // Campaigns section
      S.listItem()
        .title("📋 Campanhas")
        .child(
          S.documentTypeList("campaign")
            .title("Todas as Campanhas")
            .child((campaignId) =>
              S.document()
                .documentId(campaignId)
                .schemaType("campaign")
                .views([
                  S.view.form(),
                  S.view
                    .component(() => {
                      return null;
                    })
                    .title("Conteúdo da Campanha")
                    .icon(() => "📋"),
                ])
            )
        ),

      S.divider(),

      // Quick campaign-filtered views
      S.listItem()
        .title("🔍 Por Campanha")
        .child(
          S.documentTypeList("campaign")
            .title("Selecionar Campanha")
            .child((campaignId) =>
              S.list()
                .title("Conteúdo por Campanha")
                .items([
                  // Proposals for this campaign
                  S.listItem()
                    .title("💡 Propostas")
                    .child(
                      S.documentList()
                        .title("Propostas")
                        .filter(
                          '_type == "proposal" && campaign._ref == $campaignId'
                        )
                        .params({ campaignId })
                        .canHandleIntent(() => true)
                    ),

                  // News/Posts for this campaign
                  S.listItem()
                    .title("📰 Notícias")
                    .child(
                      S.documentList()
                        .title("Notícias")
                        .filter(
                          '_type == "post" && campaign._ref == $campaignId'
                        )
                        .params({ campaignId })
                        .canHandleIntent(() => true)
                    ),

                  // Events for this campaign
                  S.listItem()
                    .title("📅 Eventos")
                    .child(
                      S.documentList()
                        .title("Eventos")
                        .filter(
                          '_type == "event" && campaign._ref == $campaignId'
                        )
                        .params({ campaignId })
                        .canHandleIntent(() => true)
                    ),

                  // Custom Pages for this campaign
                  S.listItem()
                    .title("📄 Páginas")
                    .child(
                      S.documentList()
                        .title("Páginas Personalizadas")
                        .filter(
                          '_type == "page" && campaign._ref == $campaignId'
                        )
                        .params({ campaignId })
                        .canHandleIntent(() => true)
                    ),
                ])
            )
        ),

      S.divider(),

      // Quick access to all content types
      S.listItem()
        .title("💡 Todas as Propostas")
        .child(
          S.documentTypeList("proposal")
            .title("Todas as Propostas")
            .filter('_type == "proposal"')
            .child((proposalId) =>
              S.document().documentId(proposalId).schemaType("proposal")
            )
        ),

      S.listItem()
        .title("📰 Todas as Notícias")
        .child(
          S.documentTypeList("post")
            .title("Todas as Notícias")
            .filter('_type == "post"')
            .child((postId) =>
              S.document().documentId(postId).schemaType("post")
            )
        ),

      S.listItem()
        .title("📅 Todos os Eventos")
        .child(
          S.documentTypeList("event")
            .title("Todos os Eventos")
            .filter('_type == "event"')
            .child((eventId) =>
              S.document().documentId(eventId).schemaType("event")
            )
        ),

      S.listItem()
        .title("📄 Todas as Páginas")
        .child(
          S.documentTypeList("page")
            .title("Todas as Páginas")
            .filter('_type == "page"')
            .child((pageId) =>
              S.document().documentId(pageId).schemaType("page")
            )
        ),

      S.divider(),

      // Settings and other types (if any)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["campaign", "proposal", "post", "event", "page"].includes(
            listItem.getId() || ""
          )
      ),
    ]);
