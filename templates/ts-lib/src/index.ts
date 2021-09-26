export const sum = (a: number, b: number): number => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Dev env !');
    }

    if (process.env.NODE_ENV === 'test') {
        console.log('Test env !');
    }

    return a + b;
};
