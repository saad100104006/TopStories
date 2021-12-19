import React from 'react';
import { Box, Button, HStack, ScrollView } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import actions from '~/store/actions';
import { sections } from '~/config/section';
import { RootState } from '~/store/reducer';
import { capitalize } from '~/utils/utils';

type Props = {
  onChange: (section: string) => void;
};

const Sections = ({ onChange }: Props) => {
  const dispatch = useDispatch();
  const { selectedSection } = useSelector((state: RootState) => state.section);

  if (selectedSection.length === 0) {
    dispatch(actions.section.updateSection(sections[0]));
    onChange(sections[0]);
  }

  const onSectionChange = (section: string) => {
    dispatch(actions.section.updateSection(section));
    onChange(section);
  };

  return (
    <Box>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <HStack space={2} p={2}>
          {sections.map((section) => {
            return (
              <Button
                size="sm"
                variant={selectedSection === section ? 'solid' : 'outline'}
                width={32}
                onPress={() => onSectionChange(section)}
                key={section}>
                {capitalize(section)}
              </Button>
            );
          })}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default Sections;
