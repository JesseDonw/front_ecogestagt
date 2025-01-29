import React, { useState } from 'react';
import { FlatList} from 'react-native';
import RenderItemTask from '../RenderItemTask';

export default function AllTasks ({taches, validateTask}) {
    return (
        <FlatList
              data={taches}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RenderItemTask item={item} validateTask={validateTask}/>
              )}
            />
      );
}