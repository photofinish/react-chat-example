import React, { Component } from "react"

class RoomList extends Component {

    isActive(room, currentRoom) {
        return room.get("id") === currentRoom
    }

    render() {
        const {rooms, currentRoom} = this.props

        return (
            <div className="chat-room-list">
                {
                    rooms.map((room, index)=>{
                        return (
                            <a className={this.isActive(room, currentRoom)?"active":""}
                                onClick={ e=>this.props.switchRoom(room.get("id"))}
                                key={index} href="#">
                                {room.get("name")}
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}
import PureRenderMixin from "react-addons-pure-render-mixin"
// react改变状态时, 先计算全部虚拟Dom树的节点, 通过对比Dom树节点的差异, 来决定哪些组件需要重新渲染
// 而immutable不可变数据类型加上PureRenderMixin, 可根据state决定哪些Dom树节点发生了改变需要重新去计算, 减少计算次数, 更快的计算出Dom树差异
import reactMixin from "react-mixin"
reactMixin.onClass( RoomList, PureRenderMixin )

export default RoomList