import type { Questions } from "../questions"

export namespace Quiz {
    export interface IBackItem {
        count: number
        rows: IItem[]
    }
    export interface IItem {
        id: number
        title: string
        subtitle?: string
        img?: string
    }

    export interface IItemCreated {
        name: string
        subtitle?: string
        img?: string
        questions: Questions.IItemCreated[]
    }
}