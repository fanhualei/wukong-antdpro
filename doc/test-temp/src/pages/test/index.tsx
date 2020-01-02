import React, { Component } from 'react';
import { Button } from 'antd';
import EditActivity from './edit'
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface PageProps{

}

interface PageState {
  modalVisible: boolean;
  currentItem: {title:string};
}


class ActivityListPage extends Component <PageProps, PageState> {
  state: PageState = {
    modalVisible: false,
    currentItem: {
      title: 'default',
    },
  }

  goEditPage=(id:number) => {
    let itemToSave:{title:string};
    if (id > 0) {
      itemToSave = { title: `item${id}` }
    } else {
      itemToSave = { title: 'default' };
    }
    this.setState({
      modalVisible: true,
      currentItem: { ...itemToSave },
    })
  }

  handleFromEdit=(clickClose:boolean) => {
    if (clickClose || clickClose === undefined) {
      this.setState({
        modalVisible: false,
      })
    }
  }


  render() {
    const { modalVisible, currentItem } = this.state
    return (
      <PageHeaderWrapper>
        <EditActivity modalVisible={modalVisible}
                      currentItem={currentItem}
                      handleFromEdit={this.handleFromEdit}
        />
        <Button onClick={() => this.goEditPage(2)}>ddd-2</Button>
        <Button onClick={() => this.goEditPage(1)}>ddd-1</Button>
      </PageHeaderWrapper>
    )
  }
}
export default ActivityListPage;
