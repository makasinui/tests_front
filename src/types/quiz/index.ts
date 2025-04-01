import type { Questions } from "../questions"
import type { Result } from "../results"

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
        description?: string
        img?: string
        result: Result.IITemCreated[]
        questions: Questions.IItemCreated[]
    }
}