import { useLocation, matchPath } from "react-router-dom";

export default function useRouteMatch(route) {
    const location = useLocation();
    return route ? matchPath(location.pathname, { path: route }) : null;
}
