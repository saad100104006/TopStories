import React, { useState } from 'react';
import { Box, FlatList, HStack, Input, Spinner, useToast } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { finalize } from 'rxjs';

import Sections from '~/modules/Application/HomeScreen/Sections';
import api from '~/api';
import actions from '~/store/actions';
import { RootState } from '~/store/reducer';
import { Story } from '~/typings/structure';
import StoryItem from '~/modules/Application/HomeScreen/StoryItem';
import { searchStory } from '~/modules/Application/HomeScreen/search';
import { doOnSubscribe } from '~/utils/rxjs-utils';
import { getErrorMessage } from '~/api/utils';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { selectedSection } = useSelector((state: RootState) => state.section);
  const stories = useSelector((state: RootState) => state.stories.topStories[selectedSection] ?? []);
  const geoFacets = useSelector((state: RootState) => state.stories.geoFacets[selectedSection] ?? []);

  const [keyWordSearchQuery, setKeyWordSearchQuery] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  const filteredStories: Story[] = searchStory(stories, keyWordSearchQuery ?? '', locationSearchQuery ?? '');

  const [loading, setLoading] = useState(false);

  const loadTopStories = (section: string) => {
    // reset search queries
    setKeyWordSearchQuery('');
    setLocationSearchQuery('');

    // load stories for section
    api
      .getTopStories$(section)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false)),
      )
      .subscribe({
        next: (data) => {
          dispatch(actions.stories.updateTopStories({ section: section, stories: data }));
          console.log('Data', data);
        },
        error: (error) => {
          toast.show({
            title: 'Error',
            description: getErrorMessage(error),
            placement: 'bottom',
          });
        },
      });
  };

  const renderStoryItem = ({ item }: { item: Story }) => <StoryItem story={item} />;

  return (
    <Box flex={1} bg={'gray.200'}>
      <Sections onChange={(section) => loadTopStories(section)} />

      <HStack space={2} mx={4} my={2} p={2} rounded={'md'} bg={'white'} size={'lg'}>
        <Box flex={1}>
          <RNPickerSelect
            placeholder={{ label: 'Location', value: null }}
            value={locationSearchQuery}
            onValueChange={(value) => setLocationSearchQuery(value)}
            items={geoFacets.map((geo) => {
              return {
                value: geo,
                label: geo,
              };
            })}>
            <Input placeholder="Location" isReadOnly>
              {locationSearchQuery ? locationSearchQuery : ''}
            </Input>
          </RNPickerSelect>
        </Box>
        <Box flex={1}>
          <Input
            variant="outline"
            placeholder="Keywords"
            value={keyWordSearchQuery}
            onChangeText={(value) => setKeyWordSearchQuery(value)}
          />
        </Box>
      </HStack>

      {loading && <Spinner />}

      <FlatList px={4} data={filteredStories} renderItem={renderStoryItem} initialNumToRender={8} />
    </Box>
  );
};

export default HomeScreen;
