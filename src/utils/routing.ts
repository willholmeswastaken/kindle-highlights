export const isCurrentRoute: (
  currentRoute: string,
  targetRoute: string
) => boolean = (currentRoute, targetRoute) =>
  currentRoute.toLowerCase() === targetRoute.toLowerCase();
