import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import ListItemAvatar   from "chat-client/ui/view/common/ListItemAvatar"

import classNames from "chat-client/ui/view/navigation/FriendNavigation/classNames"

export default ({
    roomId,
    onClickItem = e => undefined,
    user,
    ...props
}) => 
    <List>
        {user.friends.map((x, i) => 
            <ListItem
                className={classNames.ListItem}
                key={x.id}
                onClick={onClickItem}
                to={`/rooms/${x.roomId}`}
                selected={roomId == x.roomId}
            >
                <ListItemAvatar
                    src={x.avatarUrl}
                />
                <div>
                    <div>{x.displayName}</div>
                    <div
                        title={x.statusMessage}
                    >{x.statusMessage}</div>
                </div>
            </ListItem>
        )}
    </List>
