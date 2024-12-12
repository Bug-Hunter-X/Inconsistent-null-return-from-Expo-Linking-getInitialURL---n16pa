// Solution: Add retry logic and state management
import * as Linking from 'expo-linking';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [initialUrl, setInitialUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialURLAsync = async () => {
      let url = await Linking.getInitialURL();
      if (url == null) {
        // retry mechanism with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        url = await Linking.getInitialURL();
        if (url == null) {
          console.warn('Failed to get initial URL after retry.');
        }
      }
      setInitialUrl(url);
      setLoading(false);
    };

    getInitialURLAsync();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (initialUrl) {
    // Process the deep link
    return <Text>Deep link received: {initialUrl}</Text>;
  } else {
    return <Text>No deep link received.</Text>;
  }
}

export default MyComponent;