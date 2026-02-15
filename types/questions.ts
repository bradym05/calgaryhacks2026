import { Dispatch, SetStateAction } from "react"

export type Question = {
    question : string,
    type : string,
    theme : string
}

export type QuestionProps = {
    question : string,
    response : string,
    setResponse: Dispatch<SetStateAction<string>>
}