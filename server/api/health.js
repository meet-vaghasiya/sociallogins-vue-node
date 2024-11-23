import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
    return {
        status: 'healthy',
        timestamp: new Date().toISOString()
    };
});

