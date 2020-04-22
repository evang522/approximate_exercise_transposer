import FitnessPoints from "../FitnessPoints/FitnessPoints";
import FormPromptInterface from "./FormPromptInterface";

abstract class AbstractExercise<FormDataType = any> {
    abstract getName(): string;

    abstract getPointsResult(formData: FormDataType ): FitnessPoints;

    abstract getFormPrompts(): FormPromptInterface[];

}

export default AbstractExercise;
