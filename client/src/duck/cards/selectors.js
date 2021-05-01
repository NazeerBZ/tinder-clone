export const getCards = (store) => Object.values(store.cards.data) ?? [];
