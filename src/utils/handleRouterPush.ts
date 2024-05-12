import { NavigateFunction } from "react-router-dom";

export default function handleRouterPush(
  navigate: NavigateFunction,
  path?: string
): React.MouseEventHandler {
  return (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(
      path ||
        (event.currentTarget as HTMLAnchorElement).getAttribute("href") ||
        ""
    );
  };
}
