import ErrorListener           from "chat-client/ui/view/ErrorListener"
import MainLayout              from "chat-client/ui/view/MainLayout"
import SignInPage              from "chat-client/ui/view/auth/SignInPage"
import TalkPage                from "chat-client/ui/view/talk/TalkPage"
import UserPage                from "chat-client/ui/view/user/UserPage"
import DatabaseApi             from "chat-client/ui/wrapper/DatabaseApi"
import TokenApi                from "chat-client/ui/wrapper/auth/TokenApi"
import React                   from "react"
import { Route }               from "react-router"
import { Switch }              from "react-router"
import { withRouter }          from "react-router"
import { BrowserRouter }       from "react-router-dom"

let Root = withRouter(
    props =>
        <TokenApi
            render={props =>
                <DatabaseApi
                    render={props =>
                        <MainLayout
                            {...props}
                        />
                    }
                    {...props}
                />
            }
            {...props}
        />
)

let ComposingRoute = ({
    component,
    Component = component,
    path,
    ...props
}) =>
    <Route
        path={path}
        render={x => <Component {...x} {...props} />}
    />

let ComposingSwitch = ({
    children,
    ...props
}) =>
    <Switch>
        {React.Children.toArray(children).map(
            x => React.cloneElement(
                x,
                {
                    ...props,
                    ...x.props
                }
            )
        )}
    </Switch>

export default props =>
    <BrowserRouter
        {...props}
    >
        <ErrorListener>
            <Root>
                <ComposingSwitch>
                    <ComposingRoute
                        exact
                        path="/"
                        component={TalkPage}
                    />
                    <ComposingRoute
                        exact
                        path="/talks"
                        component={TalkPage}
                    />
                    <ComposingRoute
                        path="/sign_in"
                        component={SignInPage}
                    />
                </ComposingSwitch>
            </Root>
        </ErrorListener>
    </BrowserRouter>
