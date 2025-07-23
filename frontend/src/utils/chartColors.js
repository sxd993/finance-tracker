// Пастельные, неяркие цвета для категорий
export const CATEGORY_COLORS = [
    '#4F8FC0', // насыщенный синий
    '#5CB85C', // зелёный
    '#F0AD4E', // оранжевый
    '#D9534F', // красный
    '#9370DB', // фиолетовый
    '#FFD700', // золотой
    '#20B2AA', // бирюзовый
    '#FF69B4', // розовый
    '#A0522D', // коричневый
    '#4682B4', // стальной синий
];

export function getCategoryColor(id) {
    if (typeof id !== 'number') {
        id = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    }
    return CATEGORY_COLORS[id % CATEGORY_COLORS.length];
} 