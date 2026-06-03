export const validateFieldIsPositive = (fields) => {
    fields.forEach(field => {
        if (field < 0)
            throw new Error("A field was negative.");
    });
}