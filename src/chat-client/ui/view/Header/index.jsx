import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"

import classNames from "chat-client/ui/view/Header/classNames"

export default class extends React.Component {
    componentWillMount() {
    }

    componentDidMount() {
        ;(async () => {
            const {
                databaseApi,
                user,
                ...props
            } = this.props

        })()
    }

    render() {
        const {
            user,
            ...props
        } = this.props

        return (
            <header
                className={classNames.Host}
            >
                <div>sgnz-chat</div>
            </header>
        )
    }
}
