export const calculateCartData = (selectedPlan) => {
    if (!selectedPlan) return null;

    const originalPrice = selectedPlan.originalPrice || selectedPlan.totalPrice;
    let baseSaveAmount = originalPrice - selectedPlan.totalPrice;
    let baseTotal = selectedPlan.totalPrice;
    let baseOriginalTotal = originalPrice;

    const preTaxTotal = baseTotal;
    const taxes = Math.round(preTaxTotal * (selectedPlan.taxesPercentage / 100));
    const finalTotal = preTaxTotal + taxes;
    const finalOriginalTotal = baseOriginalTotal + Math.round((baseOriginalTotal) * (selectedPlan.taxesPercentage / 100));

    return {
        originalPrice,
        saveAmount: baseSaveAmount,
        taxes,
        finalTotal,
        finalOriginalTotal
    };
};
