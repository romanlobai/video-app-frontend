import { useCookie } from "contexts/cookieContext";
import { Login } from "pages/Login";
import React from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    useHistory,
    useLocation,
} from "react-router-dom";
import NotFoundPage from "pages/NotFoundPage";
import { Registration } from "pages/Registration";
import { Videos } from "pages/Videos";
import { VideoById } from "pages/Video";
import { Upload } from "pages/Upload";

function SwitchRoutes(): React.ReactElement {
    const { getAccessTokenCookie } = useCookie();
    const currentAccessToken = getAccessTokenCookie();

    const history = useHistory();
    const location = useLocation();

    if (
        !["/login", "/registration"].includes(location.pathname) &&
        !currentAccessToken
    ) {
        history.push("/login");
    }

    if (!currentAccessToken) {
        return (
            <Switch>
                <Route component={Login} path="/" exact />

                <Route component={Login} path="/login" exact />

                <Route component={Registration} path="/registration" exact />

                <Route path="*" component={NotFoundPage} />
            </Switch>
        );
    }

    return (
        <Switch>
            <Switch>
                <Route component={Videos} path="/" exact />

                <Route component={VideoById} path="/video/:videoId" exact />

                <Route component={Upload} path="/upload/video" exact />

                <Route path="*" component={NotFoundPage} />
            </Switch>
        </Switch>
    );
}

function Routes(): React.ReactElement {
    return (
        <BrowserRouter>
            <SwitchRoutes />
        </BrowserRouter>
    );
}

export default Routes;
