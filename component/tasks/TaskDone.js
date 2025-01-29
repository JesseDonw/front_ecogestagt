
import {FlatList} from 'react-native';
import RenderItemTask from '../RenderItemTask';
import NoTask from '../NoTask';

export default function TaskDone ({taches, validateTask}) {
    const doneTasks = taches.filter((tache) => tache.valid);
    console.log('doneTasks :>> D', doneTasks);
    return doneTasks.length > 0 ? (
      <FlatList
        data={doneTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderItemTask item={item} validateTask={validateTask}/>
        )}
      />
    ) : (
      <NoTask message={"Aucune tâche faite pour l’instant"}/>
    );
  };
