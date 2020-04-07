import { defineAction } from "rd-redux-utils"
import { Travelling } from "../../types/Travelling";

export const createTravelling = defineAction<{
    travelling: Travelling
}>("CREATE TRAVELLING");

export const deleteTravelling = defineAction<{
    index: number
}> ("DELETE TRAVELLING");