import React            from "react"
import Avatar           from "chat-client/ui/view/common/Avatar"
import Button           from "chat-client/ui/view/common/Button"
import Dialog           from "chat-client/ui/view/common/Dialog"
import DialogBody       from "chat-client/ui/view/common/DialogBody"
import DialogHeader     from "chat-client/ui/view/common/DialogHeader"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import TextField        from "chat-client/ui/view/common/TextField"

import classNames from "chat-client/ui/view/navigation/AddFriendNavigation/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            searchFriendDialogIsView: false
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
            user,
            ...props
        } = this.props

        return (
            <div>
                <List>
                    <Button
                        className={classNames.Button}
                        onClick={() => this.setState({searchFriendDialogIsView: true})}
                        type="raised"
                    >
                        友達検索
                    </Button>
                </List>
                <Dialog
                    onCancel={() => this.setState({searchFriendDialogIsView: false})}
                    isVisible={this.state.searchFriendDialogIsView}
                >
                    <DialogHeader>友達検索</DialogHeader>
                    <DialogBody>
                        <div>
                            <TextField
                                autoComplete="off"
                                name="id"
                                labelText="IDを入力"
                            />
                        </div>
                    </DialogBody>
                </Dialog>
            </div>
        )
    }
}
