import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import ListItemIcon     from "chat-client/ui/view/common/ListItemIcon"

import classNames from "chat-client/ui/view/navigation/NavigationBar/classNames"

export default ({
    location,
    onChange = () => undefined,
    history,
    selectedType,
    ...props
}) => 
    <List
        className={classNames.Host}
    >
        <ListItem
            onClick={() => {
                onChange("friend")
                if (!new RegExp("^" + "/rooms").test(location.pathname))
                    history.push("/rooms")
            }}
            selected={selectedType == "friend"}
        >
            <ListItemIcon>{'\uf007'}</ListItemIcon>
            <div>友達</div>
        </ListItem>
        <ListItem
            onClick={() => {
                onChange("room")
                if (!new RegExp("^" + "/rooms").test(location.pathname))
                    history.push("/rooms")
            }}
            selected={selectedType == "room"}
        >
            <ListItemIcon>{'\uf27a'}</ListItemIcon>
            <div>ルーム</div>
        </ListItem>
        <ListItem
            onClick={() => {
                onChange("addFriend")
                if (!new RegExp("^" + "/rooms").test(location.pathname))
                    history.push("/rooms")
            }}
            selected={selectedType == "addFriend"}
        >
            <ListItemIcon>{'\uf234'}</ListItemIcon>
            <div>友達追加</div>
        </ListItem>
        <ListItem
            to={"/setting"}
            onClick={() => {
                onChange("setting")
            }}
            selected={selectedType == "setting"}
        >
            <ListItemIcon>{'\uf013'}</ListItemIcon>
            <div>設定</div>
        </ListItem>
    </List>
