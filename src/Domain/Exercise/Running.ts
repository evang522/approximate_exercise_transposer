import AbstractExercise from "./AbstractExercise";
import {Locale} from "../Types/Locale";
import FormPromptInterface from "./FormPromptInterface";
import FitnessPoints from "../FitnessPoints/FitnessPoints";
import MissingDataException from "./Exception/MissingDataException";
import Translator from "../../Infrastructure/Translation/Translator";

class Running extends AbstractExercise<{ time: string, distance: string }> {
    public getName(): string {
        return Translator.translate('running')
    }


    public getFormPrompts(): FormPromptInterface[] {
        return [
            {
                name: 'time',
                description: 'The total time you went running (in minutes)?'
            },
            {
                name: 'distance',
                description: 'How far did you run (in kilometers)?'
            }
        ];
    }

    public getPointsResult(formData: { time: string, distance: string }) {
        if (!formData.time || !formData.distance) {
            throw new MissingDataException();
        }

        const caloriesBurnedPerKilometer = (Number(formData.time) / Number(formData.distance)) < 6 ? 75 : 50;

        const calories = caloriesBurnedPerKilometer * Number(formData.distance);

        return FitnessPoints.fromCalories(calories);
    }
}


export default Running;
