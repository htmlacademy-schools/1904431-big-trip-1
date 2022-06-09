export const updateItem = (items, update) => {
    const index = items.findIndex((item) => item.id === update.id);
  
    if (index === -1) {
      return items;
    }
  
    return [
      ...items.slice(0, index),
      update,
      ...items.slice(index + 1),
    ];
  };

  export const SortForm = {
    SORT_DAY: 'sort-day',
    SORT_TIME: 'sort-time',
    SORT_PRICE: 'sort-price'
  };