import React from 'react'
import img1 from "@/static/img/bg_store.png"
import img2 from "@/static/img/icon_buy_task.png"

export default class Resume extends React.Component {
    render() {
        return (
            <div className="test test2">
                <p>resume</p>
                <img src={img1}/>
                <img src={img2}/>
            </div>
        )
    }
}
