import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import SubNavigation    from "chat-client/ui/view/navigation/SubNavigation"

import classNames from "chat-client/ui/view/navigation/FriendNavigation/classNames"

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

        console.log("FriendNavigation")

        return (
            <List>
                {user.friends.map((x, i) => 
                    <ListItem
                        key={i}
                        to={"/rooms/" + x.roomId}
                    >{x.name}</ListItem>
                )}
            </List>
        )
    }
}
