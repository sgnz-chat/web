import React               from "react"
import AddFriendNavigation from "chat-client/ui/view/navigation/AddFriendNavigation"
import FriendNavigation    from "chat-client/ui/view/navigation/FriendNavigation"
import RoomNavigation      from "chat-client/ui/view/navigation/RoomNavigation"
import SubNavigation       from "chat-client/ui/view/navigation/SubNavigation"
import RoomManager         from "chat-client/ui/view/room/RoomManager"

import classNames from "chat-client/ui/view/room/RoomPage/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            roomId: undefined
        })
    }

    componentDidMount() {
        const params = location.pathname.match(/^\/rooms\/(.*)/)

        this.setState({
            roomId: params && params[1]
        })
    }

    componentWillReceiveProps(props) {
        const params = props.location.pathname.match(/^\/rooms\/(.*)/)

        this.setState({
            roomId: params && params[1]
        })
    }

    render() {
        const {
            databaseApi,
            location,
            subNavigationType,
            user,
            ...props
        } = this.props

        const Component = subNavigationType == "friend"    ? FriendNavigation
                        : subNavigationType == "room"      ? RoomNavigation
                        : subNavigationType == "addFriend" ? AddFriendNavigation
                        :                                    RoomNavigation

        return (
            <div
                className={classNames.Host}
            >
                <SubNavigation>
                    <Component
                        databaseApi={databaseApi}
                        user={user}
                    />
                </SubNavigation>
                <RoomManager
                    databaseApi={databaseApi}
                    roomId={this.state.roomId}
                    user={user}
                />
            </div>
        )
    }
}   
