import { defineAction } from "rd-redux-utils"
import { Thing } from "src/types/Things";

export const addThing = defineAction<{
    thing: Thing
}>("ADD THING");

export const changeThing = defineAction<{
    index: number,
    thing: Thing
}>("CHANGE THING");