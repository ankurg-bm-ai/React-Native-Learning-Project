import React from 'react';
import {Spinner, HStack, Heading, View} from 'native-base';

export const Loading = () => {
  return (
    <View>
      <HStack space={2} alignItems="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </View>
  );
};

export default Loading;
