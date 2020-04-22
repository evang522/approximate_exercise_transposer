class FitnessPoints {
    public constructor(private value: number) {}

    public static fromCalories(calories: number): FitnessPoints
    {
        return new this(calories / 100);
    }

    public static fromPointsCount(points: number): FitnessPoints
    {
        return new this(points);
    }

    public asNumber(): number
    {
        return this.value;
    }
}

export default FitnessPoints;
