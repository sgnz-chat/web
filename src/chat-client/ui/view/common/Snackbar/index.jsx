import React  from "react"
import Root   from "chat-client/ui/control/Root"

import classNames from "chat-client/ui/view/common/Snackbar/classNames"

export default (props) =>
    <Root>
        <Snackbar
            {...props}
        />
    </Root>

let Snackbar = class extends React.Component {
    componentWillMount() {
        this.setState({
            timeoutID: undefined,
            visible  : true
        })
    }

    componentWillUnmount() {
        if (this.state.timeoutID)
            clearTimeout(this.state.timeoutID)
    }

    render() {
        let {
            className,
            duration,
            onAnimationEnd,
            onHidden,
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        className,
                        classNames.Host,
                        this.state.visible ? classNames.Visible
                      :                      classNames.Hidden
                    ].join(" ")
                }
                onAnimationEnd={e => {
                    onAnimationEnd && onAnimationEnd(e)

                    if (this.state.visible)
                        this.setState({
                            timeoutID: setTimeout(
                                () => {
                                    this.setState({
                                        timeoutID: undefined,
                                        visible  : false
                                    })
                                },
                                duration
                            )
                        })
                    else
                        onHidden && onHidden()
                }}
                {...props}
            />
        )
    }
}