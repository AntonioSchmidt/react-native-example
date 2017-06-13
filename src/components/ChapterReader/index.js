import React from 'react';
import { Text, View } from 'react-native';
import htmlparser from 'htmlparser2-without-node-native';
import P from './P';
import I from './I';
import B from './B';


export default class ChapterReader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nativeElements: null,
    };
  }
  componentWillReceiveProps({ value }) {
    if (!value) {
      return;
    }
    const updateState = (nativeElements) => {
      this.setState({
        nativeElements,
      });
    };
    const handler = new htmlparser.DomHandler(((error, document) => {
      const toNativeElements = elements => elements.map((node, index) => {
        switch (node.name) {
          case 'p':
            return (<P key={`p_${node.name}_${index}`}>{toNativeElements(node.children)}{'\n\n'}</P>);
          case 'i':
            return (<I key={`i_${node.name}_${index}`}>{toNativeElements(node.children)}</I>);
          case 'b':
            return (<B key={`b_${node.name}_${index}`}>{toNativeElements(node.children)}</B>);
          case 'br':
            return (<Text key={`br_${node.name}_${index}`}>{'\n'}</Text>);
          default:
            return (<Text key={`t_${node.name}_${index}`} style={{ color: 'black' }}>{node.data}</Text>);
        }
      });
      const nativeElements = toNativeElements(document);
      updateState(nativeElements);
    }));
    const parser = new htmlparser.Parser(handler);
    parser.write(value);
    parser.done();
  }
  render() {
    return (<View style={{ flex: 1 }}>{this.state.nativeElements}</View>);
  }
}
