<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const handleGoogleLogin = async () => {
  try {
    // Check if client ID is available
    const clientId = runtimeConfig.public.GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new Error('Google Client ID is not configured');
    }

    // Generate random state parameter for CSRF protection
    const state = Math.random().toString(36).substring(2);
    // Store state in sessionStorage to verify on callback
    sessionStorage.setItem('oauth_state', state);

    const redirectUri = 'http://localhost:3000/oauth2/google/callback';
    // Request minimal scope needed
    const scope = 'openid profile email';

    // Construct auth URL with additional security parameters
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('response_type', 'code'); // Using authorization code flow instead of implicit
    authUrl.searchParams.append('scope', scope);
    // authUrl.searchParams.append('state', state); // CSRF protection
    authUrl.searchParams.append('access_type', 'offline'); // Request refresh token
    authUrl.searchParams.append('prompt', 'consent'); // Force consent screen
    
    // Use window.location instead of popup for better security
    window.location.href = authUrl.toString();
 
  } catch (error) {
    console.error('Google login error:', error);
    alert(error instanceof Error ? error.message : 'An unexpected error occurred during login');
  }
}



</script>

<template>
    <button class="bg-blue-500 text-white p-2 rounded-md" @click="handleGoogleLogin">
      Login with Google
    </button>
    
</template>