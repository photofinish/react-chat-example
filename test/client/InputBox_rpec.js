import React from "react"
import ReactDOM from "react-dom"
import {fromJS, Map, List} from "immutable"
import { expect } from "chai"

import InputBox from "../../src/client/components/InputBox"

import TestUnit, {
    Simulate,
    renderIntoDocument,
    isCompositeComponentWithType,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithClass,
} from "react-dom/test-utils"

describe("InputBox", ()=>{
    it("send message", ()=>{
        let message
        function sendMessage(msg) {
            message = msg
        }
        const instance = renderIntoDocument(
            <InputBox sendMessage={sendMessage} />
        )
        const $textarea = findRenderedDOMComponentWithTag(instance, "textarea")
        $textarea.value = "some message"
        const $form = findRenderedDOMComponentWithTag(instance, "form")
        Simulate.submit($form)

        expect(message).to.equal("some message")
    })
})