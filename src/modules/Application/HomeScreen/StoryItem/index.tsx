import { Box, HStack, Text, VStack } from 'native-base';
import React from 'react';

import { Story } from '~/typings/structure';
import { icGallery } from '~/assets/icon';
import moment from 'moment';
import { Image } from 'react-native';

type Props = {
  story: Story;
};

const StoryItem = ({ story }: Props) => {
  return (
    <Box shadow={1} my={2} p={2} rounded={'lg'} bg={'white'}>
      <HStack space={2}>
        <Box>
          <Image
            key={story.multimedia[0] ? story.multimedia[0].url : story.title}
            style={{ width: 100, height: 100 }}
            source={story.multimedia[0] ? { uri: story.multimedia[0].url } : icGallery}
            defaultSource={icGallery}
          />
        </Box>

        <VStack space={2} flex={1} justifyContent={'space-between'}>
          <Text fontSize={'md'} numberOfLines={2}>
            {story.title}
          </Text>
          <VStack space={1}>
            <Text fontSize={'xs'} numberOfLines={2}>
              {story.byline}
            </Text>
            <Text fontSize={'xs'} numberOfLines={2}>
              {moment.utc(story.publishedDate).local().format('DD-MM-YYYY : hh:mm : a')}
            </Text>
          </VStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default StoryItem;
