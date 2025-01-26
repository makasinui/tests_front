export namespace Questions {
    export interface IItem {
        id: number
        name: string
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
        id: number
    }
}