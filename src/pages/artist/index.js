// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'
import Calendar from '../../components/calendar';
import $ from 'jquery';

const panes = [
  { menuItem: 'Feed', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Calendar', render: () => <Tab.Pane><Calendar /></Tab.Pane> },
  { menuItem: 'Support', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

class ArtistPage extends Component {
  render() {
    return (
      <div>
        <Tab panes={panes}/>
      </div>
    );
  }
}
/*
function test() {
  $('.ui.menu .item')
    .tab({
      history: true,
      historyType: 'state',
      path: '/modules/tab.html'
    })
    ;
}
*/
export default ArtistPage;