import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { createSelector } from 'reselect';
import NoChooseHolder from '../components/no-choose-holder';
import { Props } from './interfaces';
import './styles.scss';

const MyChoose = (props: Props) => {
  console.log('MyChoose props', props);
  if (props.collNoData) {
    return <NoChooseHolder />;
  }

  return (
    <View>
      <NoChooseHolder />
    </View>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.userInfo,
    (state: Record<string, any>) => state.collectionList,
    (state: Record<string, any>) => state.localCollection,
  ],
  (userInfo, collectionList, localCollection = {}) => {
    const collDataList = collectionList || [];
    const localDataList = localCollection || [];
    console.log('collDataList', collDataList);
    let collNoData;
    if (userInfo && userInfo.data) {
      collNoData = collDataList.length === 0 || !collDataList[0];
    } else {
      collNoData = localDataList.length === 0 || !localDataList[0];
    }
    return {
      userInfo,
      collDataList,
      collNoData,
      localCollection: localDataList,
    };
  },
);

export default connect(
  mapStateToProps,
  null,
  // @ts-ignore
)(MyChoose);
