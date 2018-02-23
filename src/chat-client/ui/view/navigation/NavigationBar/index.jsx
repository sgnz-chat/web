import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import ListItemIcon     from "chat-client/ui/view/common/ListItemIcon"

import classNames from "chat-client/ui/view/navigation/NavigationBar/classNames"

export default ({
    location,
    onChange = () => undefined,
    history,
    tokenApi,
    ...props
}) => 
    <List
        className={classNames.Host}
    >
        <ListItem
            onClick={() => {
                onChange("friend")
                if (!new RegExp("^" + "/talks").test(location.pathname))
                    history.push("/talks")
            }}
        >
            <ListItemIcon>{'\uf007'}</ListItemIcon>
            <div>友達</div>
        </ListItem>
        <ListItem
            onClick={() => {
                onChange("room")
                if (!new RegExp("^" + "/talks").test(location.pathname))
                    history.push("/talks")
            }}
        >
            <ListItemIcon>{'\uf007'}</ListItemIcon>
            <div>ルーム</div>
        </ListItem>
        <ListItem
            to={"/setting"}
        >
            <ListItemIcon>{'\uf007'}</ListItemIcon>
            <div>設定</div>
        </ListItem>
    </List>
