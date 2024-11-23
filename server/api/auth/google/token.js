import { defineEventHandler, readBody } from 'h3';
import { exchangeCodeForToken } from '~/server/utils/googleAuth'; // Update import

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { code } = body; // Expecting a code in the request body

    // Exchange the authorization code for a token
    const user = await exchangeCodeForToken(code);
    
    if (!user) {
        // If verification fails, return an error response
        return {
            statusCode: 401,
            body: { message: 'Invalid code' }
        };
    }

    // If verification is successful, return user data
    return {
        statusCode: 200,
         user 
    };
});