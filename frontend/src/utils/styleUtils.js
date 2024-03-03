export const getBalanceColor = amount => {
    if (amount < 0) {
        return {
            color: '#ff0000',
        };
    }

    if (amount > 0) {
        return {
            color: '#21b81c',
        };
    }
};

export const getBorderColor = amount => {
    if (amount < 0) {
        return {
            borderColor: '#ff0000',
        };
    }

    if (amount > 0) {
        return {
            borderColor: '#21b81c',
        };
    }
};
