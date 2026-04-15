export const categoryLabels = {
  pizza: 'Пицца',
  burgers: 'Бургеры',
  rolls: 'Роллы',
  sushi: 'Суши',
  snacks: 'Закуски',
  sides: 'Гарниры',
  drinks: 'Напитки'
};

export const allCategories = [
  { value: 'pizza', label: 'Пицца' },
  { value: 'burgers', label: 'Бургеры' },
  { value: 'rolls', label: 'Роллы' },
  { value: 'sushi', label: 'Суши' },
  { value: 'snacks', label: 'Закуски' },
  { value: 'sides', label: 'Гарниры' },
  { value: 'drinks', label: 'Напитки' }
];

export const addNewCategory = (value, label) => {
  const exists = allCategories.some(cat => cat.value === value);
  if (!exists && value && label) {
    allCategories.push({ value, label });
  }
};

export const getCategoryLabel = (categoryValue, categoryLabel) => {
  if (categoryLabel) return categoryLabel;
  return categoryLabels[categoryValue] || categoryValue || 'Без категории';
};