import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import ListItemAvatar   from "chat-client/ui/view/common/ListItemAvatar"

import classNames from "chat-client/ui/view/navigation/FriendNavigation/classNames"

export default ({
    roomId,
    user,
    ...props
}) => 
    <List>
        {user.friends.map((x, i) => 
            <ListItem
                key={x.id}
                to={`/rooms/${x.roomId}`}
                selected={roomId == x.roomId}
            >
                <ListItemAvatar
                    src={x.avatarUrl}
                />
                {x.displayName}
            </ListItem>
        )}
    </List>
