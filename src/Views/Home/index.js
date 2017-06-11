import React from 'react';
import { get } from 'lodash';
import { compose } from 'redux';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import HtmlView from 'react-native-htmlview';
import { connectReducer } from 'redux-in-place';
import reducer from './reducer';
import { loadChapter, loadStory } from './actions';
import styles from './styles'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.nextChapter = this.nextChapter.bind(this);
        this.getChapter = this.getChapter.bind(this);
        this.previousChapter = this.previousChapter.bind(this);
        this.chapterNumber = 1
    }
    nextChapter() {
        this.chapterNumber = ++this.chapterNumber;
        this.getChapter();
    }
    previousChapter() {
        this.chapterNumber = --this.chapterNumber;
        this.getChapter();
    }
    getChapter() {
        this.props.getChapter(this.chapterNumber);
    }
    componentDidMount() {
        this.props.getStory();
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
                <HtmlView value={this.props.text}/>
            </ScrollView>
        );
    }
}

const ConnectedHome = connect(({ Story }) => ({
    text: get(Story, 'currentChapter', ''),
    numberOfChapters: get(Story, 'numberOfChapters', 0),
}), (dispatch) => ({
    getChapter: compose(dispatch, loadChapter),
    getStory: compose(dispatch, loadStory),
}))(Home);

export default connectReducer(reducer)(ConnectedHome);