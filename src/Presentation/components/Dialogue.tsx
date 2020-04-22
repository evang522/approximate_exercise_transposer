import React, {ChangeEvent, ReactElement} from "react";
import AbstractExercise from "../../Domain/Exercise/AbstractExercise";
import {Locale} from "../../Domain/Types/Locale";
import {registeredExercises} from "../../Infrastructure/Exercise/config/registeredExercises";
import FormPromptInterface from "../../Domain/Exercise/FormPromptInterface";
import MissingDataException from "../../Domain/Exercise/Exception/MissingDataException";
import Translator from "../../Infrastructure/Translation/Translator";

interface IDialogueState {
    currentExercise: AbstractExercise | null;
    formValues: { [key: string]: string };
}

class Dialogue extends React.Component {
    public state: IDialogueState = {
        currentExercise: null,
        formValues: {}
    }

    public render(): ReactElement {
        return (
            <div id="dialogue">
                {Translator.translate('choose_your_exercise')}
                <br/>
                <br/>
                {this.renderChooseExerciseDropdown()}
                <br/>
                <br/>
                {this.renderExerciseForm()}
            </div>
        )
    }


    private renderChooseExerciseDropdown(): ReactElement {
        return (
            <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const exercise = registeredExercises.find((exercise: AbstractExercise) => {
                        return exercise.getName() === e.target.value;
                    })!;


                    this.setState({
                        currentExercise: exercise,
                        formValues: {}
                    })

                }}
            >
                <option disabled={true} selected={true}>{Translator.translate('choose_your_exercise')}</option>
                {registeredExercises.map((exercise: AbstractExercise<any>) => (
                    <option value={exercise.getName()}>{exercise.getName()}</option>
                ))}
            </select>
        )
    }

    private renderExerciseForm(): ReactElement | null {
        const {currentExercise} = this.state;

        if (!currentExercise) {
            return null;
        }

        return (
            <div>
                <h2>{currentExercise.getName()}</h2>
                <br/>
                <br/>
                {currentExercise.getFormPrompts().map((formPrompt: FormPromptInterface) => {
                    return (
                        <div>
                            <label htmlFor={formPrompt.name}><b>{Translator.translate(formPrompt.name)}</b></label>
                            <br/>
                            <br/>
                            <small>
                                {formPrompt.description}
                            </small>
                            <br/>
                            <br/>
                            <input
                                value={this.state.formValues[formPrompt.name] || ''}
                                id={formPrompt.name + Math.random()}
                                name={formPrompt.name}
                                autoComplete="off"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    this.setState({
                                        ...this.state,
                                        formValues: {
                                            ...this.state.formValues,
                                            [formPrompt.name]: e.target.value
                                        }
                                    })
                                }}
                            />
                            <br/>
                            <br/>
                        </div>
                    )
                })}
                {this.renderResults()}
                <br/>
                <br/>
                <br/>
            </div>
        )
    }

    private renderResults() {
        const {currentExercise} = this.state;

        if (!currentExercise) {
            return null;
        }

        return (
            <div style={{
                margin: '5rem'
            }}>
                {Translator.translate('results')}: {this.handleExercisePointCalculation(currentExercise)}
            </div>
        )
    }

    private handleExercisePointCalculation(exercise: AbstractExercise): string {
        try {
            const value = exercise.getPointsResult(this.state.formValues);

            if (!Number(value.asNumber())) {
                return '0';
            }

            return value.asNumber().toString() + ' ' + Translator.translate('points');
        } catch (e) {
            if (e instanceof MissingDataException) {
                return 'fill in all data!';
            }
            return 'Error';
        }
    }


}

export default Dialogue;
