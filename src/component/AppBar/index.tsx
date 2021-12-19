import React from 'react';
import { Box, HStack, StatusBar, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/reducer';
import { capitalize } from '~/utils/utils';

const AppBar = () => {
  const { selectedSection } = useSelector((state: RootState) => state.section);

  return (
    <>
      <StatusBar backgroundColor={'#64748b'} barStyle={'light-content'} />
      <Box safeAreaTop backgroundColor={'#64748b'} />
      <HStack bg={'primary.500'} px={4} py={3} justifyContent={'space-between'} alignItems={'center'}>
        <Text bold color="white" fontSize="20">
          {selectedSection.length > 0 ? capitalize(selectedSection) : 'Top Stories'}
        </Text>
      </HStack>
    </>
  );
};

export default AppBar;
