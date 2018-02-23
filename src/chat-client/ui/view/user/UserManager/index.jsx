import React              from "react"

import classNames from "chat-client/ui/view/user/UserManager/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            selectedIndex  : undefined,
            dialogIsVisible: false
        })
    }

    render() {
        const {
            user = {},
            userApi: {
                update: updateUser
            },
            ...props
        } = this.props

        return (
            <div 
                className={classNames.Host}
                {...props}
            >
                {user.name}
            </div>
        )
    }
}
