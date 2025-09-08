/**
 * Utility functions for handling proposal categories
 */

export interface CategoryOption {
  value: string;
  label: string;
}

/**
 * Category labels mapping based on the Sanity schema
 */
export const CATEGORY_LABELS: Record<string, string> = {
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

/**
 * Get the display label for a category
 */
export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category;
}

/**
 * Get all available category options with labels
 */
export function getAllCategoryOptions(): CategoryOption[] {
  return Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    value,
    label,
  }));
}

/**
 * Format categories for use in components (includes "All" option)
 */
export function formatCategoriesWithAll(
  categories: string[]
): CategoryOption[] {
  const formattedCategories: CategoryOption[] = [
    { value: "all", label: "Todas" },
    ...categories.map((category: string) => ({
      value: category,
      label: getCategoryLabel(category),
    })),
  ];

  return formattedCategories;
}
