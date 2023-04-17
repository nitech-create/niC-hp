import React, { Component } from 'react';
import FolderItem from './FolderItem';

class Folder extends Component {
  render() {

    const { data,component } = this.props;

    let ChildComponent = component || FolderItem;

    return(
      <ul>
        {data.map((text, i) => {
          return React.createElement(ChildComponent, { key: i, text })
        })}
      </ul>
    );
  }
}

export default Folder