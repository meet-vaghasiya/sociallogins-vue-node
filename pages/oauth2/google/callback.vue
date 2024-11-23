<script setup lang="ts">
import { ref } from 'vue';

const isLoggedIn = ref(false);
const userProfile = ref<{
  name: string;
  email: string;
  id?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
} | null>(null);


// Function to handle the response after redirect
const handleAuthResponse = async () => {
  try {
    // Get URL search params from the current location
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    // const state = params.get('state');
    
    // // Verify state parameter matches stored state
    // const storedState = sessionStorage.getItem('oauth_state');
    // if (!state || state !== storedState) {
    //   throw new Error('Invalid state parameter');
    // }
    
    // Clear stored state
    sessionStorage.removeItem('oauth_state');

    if (!code) {
      throw new Error('No authorization code received');
    }

    // Exchange code for tokens using your backend endpoint
    // Note: You'll need to implement a backend endpoint to securely exchange the code
    const tokenResponse = await fetch('/api/auth/google/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    });

   
    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange authorization code');
    }

    const userDetails = await tokenResponse.json();
    console.log(userDetails);
    userProfile.value = userDetails;


   

  } catch (error) {
    console.error('Authentication error:', error);
    alert(error instanceof Error ? error.message : 'An unexpected error occurred during authentication');
  }
}

onMounted(() => {
    // Call the function to handle the auth response
    handleAuthResponse();
})



</script>


<template>
  <div>
    <h1>Google Callback</h1>
    <p>You have successfully logged in with Google!</p>
    <pre>{{ userProfile }}</pre>

  </div>
</template>