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
                onCancel={_ => {
                    if (!this.state.isProcessing) {
                        this.setState({
                            newGroupUserIds: [],
                        })

                        onCancel()
                    }
                }}
                isVisible={this.state.createGroupDialogIsView}
                {...props}
            >
                <DialogHeader>グループ作成</DialogHeader>
                <DialogBody
                    className={classNames.Form}
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
                                name : form.elements["name"].value,
                                users: this.state.newGroupUserIds
                            }
                        })

                        this.setState({
                            isProcessing: false
                        })

                        onCancel()
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
                                className={classNames.ListItem}
                                onClick={() => this.setState({
                                    newGroupUserIds: this.state.newGroupUserIds.includes(x.id) ? this.state.newGroupUserIds.filter(id => id != x.id)
                                  :                                                              this.state.newGroupUserIds.concat(x.id)
                                })}
                                selected={this.state.newGroupUserIds.includes(x.id)}
                                key={x.id}
                            >
                                <ListItemAvatar
                                    src={x.avatarUrl}
                                />
                                <div>{x.displayName}</div>
                                <CheckBox
                                    selected={this.state.newGroupUserIds.includes(x.id)}
                                />
                            </ListItem>
                        )}
                    </List>
                    <DialogFooter>
                        <Button
                            component="button"
                            color="BlueGrey"
                            disabled={this.state.isProcessing}
                            onClick={_ => {
                                if (!this.state.isProcessing) {
                                    this.setState({
                                        newGroupUserIds: [],
                                    })

                                    onCancel()
                                }
                            }}
                        >
                            キャンセル
                        </Button>
                        <Button
                            disabled={this.state.isProcessing}
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
