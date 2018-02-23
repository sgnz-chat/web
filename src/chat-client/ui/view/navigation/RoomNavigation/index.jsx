import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import SubNavigation    from "chat-client/ui/view/navigation/SubNavigation"

import classNames from "chat-client/ui/view/navigation/RoomNavigation/classNames"


export default class extends React.Component {
    componentWillMount() {
    }

    componentDidMount() {
        ;(async () => {
            const {
                databaseApi: {
                    roomApi: {
                        subsclibe
                    }
                },
                user = {},
                ...props
            } = this.props

            console.log(user, "debug")
            console.log("debug debug debug ")
            user.friends && user.friends.map(x => console.log(x))
        })()
    }

    render() {
        return (
            <List>
                <ListItem>ropm</ListItem>
                <ListItem>room</ListItem>
            </List>
        )
    }
}
