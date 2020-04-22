import Pushups from "../../../Domain/Exercise/Pushups";
import AbstractExercise from "../../../Domain/Exercise/AbstractExercise";
import Running from "../../../Domain/Exercise/Running";

export const registeredExercises: AbstractExercise[] = [
    new Pushups(),
    new Running()
];
