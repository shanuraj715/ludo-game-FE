export const getRandomNumberInRange = (min, max) => {
    // Ensure min and max are integers
    min = Math.ceil(min);
    max = Math.floor(max);
    // Generate and return the random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}