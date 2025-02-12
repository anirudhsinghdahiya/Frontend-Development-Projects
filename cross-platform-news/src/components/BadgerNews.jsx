import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import BadgerTabs from './navigation/BadgerTabs';
import CS571 from '@cs571/mobile-client';

// Create BadgerPreferencesContext.jsx first
import { BadgerPreferencesProvider } from './context/BadgerPreferencesContext';

export default function BadgerNews(props) {
  return (
    <BadgerPreferencesProvider>
      <NavigationContainer>
        <BadgerTabs />
      </NavigationContainer>
    </BadgerPreferencesProvider>
  );
}