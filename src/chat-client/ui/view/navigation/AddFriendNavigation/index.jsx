import React            from "react"
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
                <ListItem
                    className={classNames.AddFriendButton}
                >
                    {x.name}
                </ListItem>
            </List>
        )
    }
}
