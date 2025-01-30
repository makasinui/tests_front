import type { Answers } from "../answers"

export namespace Questions {
    export interface IItem {
        id: number
        name: string
        optional: boolean
        timeLimit?: Date
        isImage?: boolean
        img?: string
        type: EType
        sort?: number
    }

    export enum EType {
        CHOICE = 'choice',
        TEXT = 'text'
    }

    export interface IQuestionStep {
        step: number
        id?: number
        answer?: string
        result?: string[]
    }

    export interface IItemCreated {
        name: string
        optional: boolean
        answers?: Answers.IItemCreated[]
        timeLimit?: Date
        isImage?: boolean
        img?: string
        type: EType
        sort?: number
    }
}