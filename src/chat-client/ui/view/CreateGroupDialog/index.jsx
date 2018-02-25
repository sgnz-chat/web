import React            from "react"
import Avatar           from "chat-client/ui/view/common/Avatar"
import Button           from "chat-client/ui/view/common/Button"
import CheckBox         from "chat-client/ui/view/common/CheckBox"
import Dialog           from "chat-client/ui/view/common/Dialog"
import DialogBody       from "chat-client/ui/view/common/DialogBody"
import DialogFooter     from "chat-client/ui/view/common/DialogFooter"
import DialogHeader     from "chat-client/ui/view/common/DialogHeader"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import ListItemAvatar   from "chat-client/ui/view/common/ListItemAvatar"
import TextField        from "chat-client/ui/view/common/TextField"
import setState         from "chat-client/util/setState"

import classNames from "chat-client/ui/view/CreateGroupDialog/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            isProcessing   : false,
            newGroupUserIds: [],
        })
    }

    render() {

        const {
            roomApi: {
                create: createRoom
            },
            user,
            userApi: {
                read: readUser,
                update: updateUser
            },
            onCancel,
            ...props
        } = this.props;

        return (
            <Dialog
                onCancel={() => this.setState({createGroupDialogIsView: false})}
                isVisible={this.state.createGroupDialogIsView}
            >
                <DialogHeader>グループ作成</DialogHeader>
                <DialogBody
                    component="form"
                    onSubmit={async e => {
                        e.preventDefault()

                        const form = e.target

                        // TODO shwo error
                        if (form.elements["name"].value == 0 || this.state.newGroupUserIds.length == 0)
                            return


                        await setState(
                            this,
                            {
                                isProcessing: true
                            }
                        )

                        await createRoom({
                            room: {
                                name   : form.elements["name"].value,
                                friends: this.state.newGroupUserIds
                            }
                        })

                        this.setState({
                            isProcessing: false
                        })

                    }}
                >
                    <div>
                        <TextField
                            autoComplete="off"
                            name="name"
                            labelText="グループ名"
                            required
                        />
                    </div>
                    <List
                        className={classNames.List}
                    >
                        {user.friends.map((x, i) => 
                            <ListItem
                                onClick={() => this.setState({
                                    newGroupUserIds: this.state.newGroupUserIds.concat(x.id)
                                })}
                                key={x.id}
                            >
                                <ListItemAvatar
                                    src={x.avatarUrl}
                                />
                                <div>{x.displayName}</div>
                                <CheckBox
                                    onClick={() => this.setState({
                                        newGroupUserIds: this.state.newGroupUserIds.concat(x.id)
                                    })}
                                    isSelect={this.state.newGroupUserIds.includes(x.id)}
                                />
                            </ListItem>
                        )}
                    </List>
                    <DialogFooter>
                        <Button
                            component="button"
                            color="BlueGrey"
                            onClick={onCancel}
                        >
                            キャンセル
                        </Button>
                        <Button
                            isDisable={this.state.isProcessing}
                            component="button"
                        >
                            追加
                        </Button>
                    </DialogFooter>
                </DialogBody>
            </Dialog>
        )
    }
}
