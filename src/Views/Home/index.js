import React from 'react';
import { get } from 'lodash';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { connectReducer } from 'redux-in-place';
import reducer from './reducer';
import { loadChapter, loadStory } from './actions';
import styles from './styles';
import ChapterReader from '../../components/ChapterReader';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.nextChapter = this.nextChapter.bind(this);
    this.getChapter = this.getChapter.bind(this);
    this.previousChapter = this.previousChapter.bind(this);
    this.chapterNumber = 1;
  }
  componentDidMount() {
    this.props.getStory();
    this.getChapter();
  }
  getChapter() {
    this.props.getChapter(this.chapterNumber);
  }
  previousChapter() {
    this.chapterNumber -= 1;
    this.getChapter();
  }
  nextChapter() {
    this.chapterNumber += 1;
    this.getChapter();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.buttonsContainer}>
          {this.chapterNumber > 1 &&
            <TouchableOpacity onPress={this.previousChapter} style={styles.button}>
              <Text style={styles.buttonText}>Previous chapter</Text>
            </TouchableOpacity>
                    }
          {this.props.numberOfChapters > this.chapterNumber &&
            <TouchableOpacity onPress={this.nextChapter} style={styles.button}>
              <Text style={styles.buttonText}>Next chapter</Text>
            </TouchableOpacity>
                    }
        </View>
        <ChapterReader value={this.props.text} />
      </ScrollView>
    );
  }
}

Home.propTypes = {
  text: PropTypes.string.isRequired,
  numberOfChapters: PropTypes.number.isRequired,
  getChapter: PropTypes.func.isRequired,
  getStory: PropTypes.func.isRequired,
};

const ConnectedHome = connect(({ Story }) => ({
  text: get(Story, 'currentChapter', ''),
  numberOfChapters: get(Story, 'numberOfChapters', 0),
}), dispatch => ({
  getChapter: compose(dispatch, loadChapter),
  getStory: compose(dispatch, loadStory),
}))(Home);

export default connectReducer(reducer)(ConnectedHome);
