import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Group,
  usePlatform,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import CardList from './components/CardList/CardList';

const App = () => {
  const platform = usePlatform();

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>Корзина</PanelHeader>
              <Group>
                <CardList />
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;