import Taro, { Component } from '@tarojs/taro';
import { Image, Input, ScrollView, Text, View } from '@tarojs/components';
import './styles.scss';
import Imgs from '../../../const/image-set';
import Header from '../../../components/header/header';
import countryState from '../../../const/countries.json';

export default class Internationalization extends Component<any, any> {
  private countryList: any = [];
  constructor(props) {
    super(props);
    this.state = {
      countryChar: ['#'],
      searchCountryList: [],
      searchCountryCharList: [],
      searchCountry: '',
      searchChar: '#',
    };

    this.countryList = [
      {
        title: '#',
        data: [
          { code: '86', flag: 'CN', name: '中国大陆', format: 'XXX XXXX XXXX', pinyin: 'zhong guo da lu', index: 'Z' },
          { code: '852', flag: 'HK', name: '中国香港', format: 'X XXX XXXX', pinyin: 'zhong guo xiang gang', index: 'Z' },
          { code: '853', flag: 'MO', name: '中国澳门', format: 'XXXX XXXX', pinyin: 'zhong guo ao men', index: 'Z' },
          { code: '886', flag: 'TW', name: '中国台湾', format: 'XXX XXX XXX', pinyin: 'zhong guo tai wan', index: 'Z' },
        ],
      },
    ];
  }

  componentWillMount() {
    this.createCountryListData();
  }

  createCountryListData = () => {
    const charArray = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    const countryCharDup: string[] = [];
    for (let i = 0; i < charArray.length; i++) {
      const countryObj: any = { title: '', data: [] };
      countryObj.title = charArray[i];
      for (let j = 0; j < countryState.length; j++) {
        if (countryObj.title === countryState[j].index && countryState[j].index !== '') {
          countryObj.data.push(countryState[j]);
        }
      }
      if (countryObj.data.length) {
        this.countryList.push(countryObj);
        countryCharDup.push(countryObj.title);
      }
    }
    const { countryChar } = this.state;
    this.setState({ countryChar: countryChar.concat(countryCharDup) });
  };

  createSearchCountryListData = (charArray, _countryState) => {
    const _searCharArray: string[] = [];
    const _searCharCountryArray: any = [];
    const _comUseArray: any = [];
    const comUseObg: any = { title: '#', data: [] };
    for (let i = 0; i < _countryState.length; i += 1) {
      if (_countryState[i].name && _countryState[i].name.indexOf('中国') >= 0) {
        comUseObg.data.push(_countryState[i]);
      }
    }
    if (comUseObg.data.length) {
      _comUseArray.push(comUseObg);
    }
    for (let i = 0; i < charArray.length; i += 1) {
      const countryObj: any = { title: '', data: [] };
      countryObj.title = charArray[i];
      for (let j = 0; j < _countryState.length; j += 1) {
        if (countryObj.title === _countryState[j].index && _countryState[j].index !== '') {
          countryObj.data.push(_countryState[j]);
        }
      }
      if (countryObj.data.length) {
        _searCharCountryArray.push(countryObj);
        _searCharArray.push(countryObj.title);
      }
    }
    this.setState({
      searchCountryList: _comUseArray.concat(_searCharCountryArray),
      searchCountryCharList: _searCharArray,
    });
  };

  searchCountryArray = e => {
    const searchCountryArray: any[] = [];
    const searchCountryCharArray: string[] = [];
    this.setState({ searchCountry: e.detail.value });
    for (let i = 0; i < countryState.length; i += 1) {
      if (JSON.stringify(countryState[i]).indexOf(e.detail.value) >= 0) {
        searchCountryArray.push(countryState[i]);
      }
    }
    searchCountryArray.sort((a: any, b: any) => {
      if (a.index > b.index) {
        return 1;
      } else if (a.index < b.index) {
        return -1;
      } else {
        return 0;
      }
    });

    for (let j = 0; j < searchCountryArray.length; j += 1) {
      if (!searchCountryCharArray.includes(searchCountryArray[j].index)) {
        searchCountryCharArray.push(searchCountryArray[j].index);
      }
    }
    this.createSearchCountryListData(searchCountryCharArray, searchCountryArray);
  };

  chooseCountry = item => {
    console.log('11111111111=', item);
    Taro.navigateBack();
  };

  calculateDistance = (countryList: any[], searchChar: string) => {
    let itemnum = 0;
    let titlenum = 0;
    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].title !== searchChar) {
        titlenum += 1;
        itemnum += countryList[i].data.length;
      } else {
        break;
      }
    }
    return { itemnum, titlenum };
  };

  jump = item => {
    Taro.showToast({ title: item, icon: 'none' });
    this.setState({ searchChar: item });
  };

  renderItem = countryListData => {
    return countryListData.map(item => {
      return (
        <View>
          <View id={item.title} className='title-view'>
            <Text className='title-view-text'>{item.title === '#' ? '常用' : item.title}</Text>
          </View>
          {item.data.map((itemData, index) => {
            return (
              <View key={index} className='item-view' onClick={() => this.chooseCountry(itemData)}>
                <Text className='item-view-text1'>{itemData.name}</Text>
                <Text className='item-view-text2'>{`+${itemData.code}`}</Text>
              </View>
            );
          })}
        </View>
      );
    });
  };

  renderChar = charArray => {
    return (
      <View className='char-list'>
        {charArray.map((item, index) => {
          return (
            <Text key={index} className='char-list-text' onClick={() => this.jump(item)}>
              {item}
            </Text>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <View>
        <View className='header-view'>
          <Header />
          <View className='inputDiving' />
          <View className='search-view'>
            <Image src={Imgs.icon_search} className='search-icon' />
            <Input
              className='search-input'
              placeholder='请搜索国家和地区'
              value={this.state.searchCountry}
              onInput={this.searchCountryArray}
              placeholderClass='input-placeholder'
            />
          </View>
        </View>

        <ScrollView className='scroll-view' scrollY scrollIntoView={this.state.searchChar}>
          {this.renderItem(this.state.searchCountry ? this.state.searchCountryList : this.countryList)}
        </ScrollView>
        {this.renderChar(this.state.searchCountry ? this.state.searchCountryCharList : this.state.countryChar)}
      </View>
    );
  }
}
