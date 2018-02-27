import React    from "react"
import Snackbar from "chat-client/ui/view/common/Snackbar"
import Error    from "chat-client/ui/view/Error"

import classNames from "chat-client/ui/view/ErrorListener/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            errors: []
        })
    }

    render() {
        const {
            component = "div",
            Component = component,
            children,
            ...props
        } = this.props

        return (
            <Component
                className={classNames.Host}
            >
                {React.cloneElement(
                    children,
                    {
                        onError: (e) => this.setState(
                            {
                                errors: this.state.errors.concat({
                                    error: e,
                                    key  : Date.now()
                                })
                            },
                            () => console.error(e)
                        )
                    }
                )}
                {this.state.errors.map(x =>
                    <Snackbar
                        key={x.key}
                        duration={3000}
                        onHidden={_ =>
                            this.setState({
                                errors: this.state.errors.filter(y => y != x)
                            })
                        }
                        className={classNames.Snackbar}
                    >
                        <Error
                            error={x.error}
                        />
                    </Snackbar>
                )}
            </Component>
        )
    }
}