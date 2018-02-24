import React            from "react"
import Button           from "chat-client/ui/view/common/Button"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"

import classNames from "chat-client/ui/view/navigation/AddFriendNavigation/classNames"

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
            <List>
                <Button
                    className={classNames.Button}
                    type="raised"
                >
                    友達追加
                </Button>
            </List>
        )
    }
}
