// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const SINGLETON_TYPES = new Set(['siteSettings'])

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETON_TYPES.has(item.getId())),
    ])
