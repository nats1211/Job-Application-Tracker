export const applicationKeys = {
  all: ["applications"] as const,
  lists: () => [...applicationKeys.all, "list"] as const,
  list: (filters: { status?: string }) =>
    [...applicationKeys.lists(), filters] as const,
};
