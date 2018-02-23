import React            from "react"
import queryString      from "query-string"
import FriendNavigation from "chat-client/ui/view/navigation/FriendNavigation"
import RoomNavigation   from "chat-client/ui/view/navigation/RoomNavigation"
import SubNavigation    from "chat-client/ui/view/navigation/SubNavigation"

import classNames from "chat-client/ui/view/talk/TalkPage/classNames"

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
        })
    }

    render() {
        const {
            databaseApi,
            subNavigationType,
            user = {},
            ...props
        } = this.props

        const Component = subNavigationType == "friend" ? FriendNavigation
                        :                                 RoomNavigation
        
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
                <div>
                    test
                </div>
            </div>
        )
    }
}   
