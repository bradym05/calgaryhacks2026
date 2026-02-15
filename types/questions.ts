import { Dispatch, SetStateAction } from "react"

export type Question = {
    id : number,
    question : string,
    type : string
}

export type QuestionProps = {
    question : string,
    response : string,
    setResponse: Dispatch<SetStateAction<string>>
}