import React              from "react"
import Button             from "chat-client/ui/view/common/Button"
import List               from "chat-client/ui/view/common/List"
import ListItem           from "chat-client/ui/view/common/ListItem"
import ListItemAvatar     from "chat-client/ui/view/common/ListItemAvatar"
import CreateGroupDialog  from "chat-client/ui/view/CreateGroupDialog"
import SearchUserDialog   from "chat-client/ui/view/SearchUserDialog"

import classNames from "chat-client/ui/view/navigation/AddFriendNavigation/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            createGroupDialogIsView : false,
            newGroupUserIds         : [],
            searchFriendDialogIsView: false,
            targetUser              : undefined,
            targetUserIsFound       : undefined
        })
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
            databaseApi: {
                roomApi: {
                    create: createRoom
                },
                userApi: {
                    read: readUser,
                    update: updateUser
                }
            },
            user,
            rooms,
            ...props
        } = this.props

        return (
            <div
                className={classNames.Host}
            >
                <div>
                    <Button
                        className={classNames.Button}
                        onClick={() => this.setState({searchFriendDialogIsView: true})}
                        type="raised"
                    >
                        友達検索
                    </Button>
                    <Button
                        className={classNames.Button}
                        onClick={() => this.setState({createGroupDialogIsView: true})}
                        type="raised"
                    >
                        グループ作成
                    </Button>
                </div>
                <List>
                </List>
                <SearchUserDialog
                    user={user}
                    rooms={rooms}
                    roomApi={this.props.databaseApi.roomApi}
                    userApi={this.props.databaseApi.userApi}
                    onCancel={() => this.setState({searchFriendDialogIsView: false})}
                    isVisible={this.state.searchFriendDialogIsView}
                />
                <CreateGroupDialog
                    user={user}
                    roomApi={this.props.databaseApi.roomApi}
                    userApi={this.props.databaseApi.userApi}
                    onCancel={() => this.setState({createGroupDialogIsView: false})}
                    isVisible={this.state.createGroupDialogIsView}
                />
            </div>
        )
    }
}
