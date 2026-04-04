export function createPagination(page: number, pageSize: number, count: number) {
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const clampedPage = Math.min(page, totalPages);

  return {
    page: clampedPage,
    pageSize,
    totalPages,
    hasNextPage: clampedPage < totalPages,
    hasPreviousPage: clampedPage > 1,
  };
}
