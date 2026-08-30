import { apiClient } from "@/lib/api-helper";

export const pricingService = {
    fetchPlans: async (params = {}) => {
        try {
            let query = '';
            if (typeof params === 'string') {
                query = params ? `?type=${encodeURIComponent(params)}` : '';
            } else if (params && typeof params === 'object' && Object.keys(params).length > 0) {
                const searchParams = new URLSearchParams(params);
                query = `?${searchParams.toString()}`;
            }
            return await apiClient(`/api/pricing${query}`);
        } catch (error) {
            console.error('[PricingService] Error fetching plans:', error.message);
            throw error;
        }
    },

    fetchPlanById: async (id) => {
        try {
            return await apiClient(`/api/pricing/${id}`);
        } catch (error) {
            console.error(`[PricingService] Error fetching plan ${id}:`, error.message);
            throw error;
        }
    }
};