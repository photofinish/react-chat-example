import React from "react"
import ReactDOM from "react-dom"
import {fromJS, Map, List} from "immutable"
import { expect } from "chai"

import MessageList from "../../src/client/components/MessageList"

import TestUnit, {
    Simulate,
    renderIntoDocument,
    isCompositeComponentWithType,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,
} from "react-dom/test-utils"

describe("MessageList", ()=>{
    it("render messages and my messages", ()=>{
        const messages = fromJS([
            {user: "eisneim", content: "some message", time: "23.33"},
            {user: "terry", content:"ss message", time: "12:34"}
        ])
        const component = renderIntoDocument(
            <MessageList username="eisneim" messages={messages} />
        )
        const $messages = scryRenderedDOMComponentsWithTag(component, "li")
        const $myMessages = scryRenderedDOMComponentsWithClass(component, "message-self")

        expect( $messages.length ).to.equal(2)
        expect( $myMessages.length ).to.equal(1)

    })
})