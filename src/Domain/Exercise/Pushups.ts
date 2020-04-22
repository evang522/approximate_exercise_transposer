import AbstractExercise from "./AbstractExercise";
import FormPromptInterface from "./FormPromptInterface";
import FitnessPoints from "../FitnessPoints/FitnessPoints";
import MissingDataException from "./Exception/MissingDataException";
import Translator from "../../Infrastructure/Translation/Translator";

class Pushups extends AbstractExercise<{ amount: string }> {
    public getName(): string {
            return Translator.translate('pushups')
        }

    public getFormPrompts(): FormPromptInterface[] {
        return [
            {
                name: 'amount',
                description: Translator.translate('pushups_amount_description')
            }
        ];
    }

    public getPointsResult(formData: { amount: string }) {
        if (!formData.amount)
        {
            throw new MissingDataException();
        }

        const calories = Number(formData.amount) * .75;

        return FitnessPoints.fromCalories(calories);
    }
}


export default Pushups;
