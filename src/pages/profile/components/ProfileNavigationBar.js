import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';

import TabEdit from './TabEdit';
import TabAbout from './TabAbout';
import TabFollowing from './TabFollowing';
import TabPlaylists from './TabPlaylists';
import TabMusic from './artist/TabMusic';
import TabLive from './artist/TabLive';

var ProfileTabs = [
	{ component: TabAbout, path: "about", title: "About" },
	{ component: TabPlaylists, path: "playlists", title: "Playlists" },
	{ component: TabFollowing, path: "following", title: "Following" }
];
var ArtistTabs = [
	{ component: TabMusic, path: "music", title: "Music", artistOnly: true },
	{ component: TabLive, path: "live", title: "Live", artistOnly: true }
];
var PersonalTabs = [
	{ component: TabEdit, path: "edit", title: "Edit Profile" }
]

class ProfileNavigationBar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		var user = this.props.ProfileUser;
		var path = this.props.path;
		var prefix = "/p/" + user.Username + "/";
		var Artist = this.props.Artist;
		var Me = this.props.Me;
		var history = this.props.history;
		var tabs = [];

		//Add artist tabs first
		if(Artist)
			tabs = tabs.concat(ArtistTabs);

		//Now add all tabs
		tabs = tabs.concat(ProfileTabs);

		//Ok add our personal tabs
		if(Me)
			tabs = tabs.concat(PersonalTabs);


		var activeTab = tabs.find(t => prefix + t.path == path);
		if (!activeTab)
			activeTab = tabs[0];

		return (<div className="card">
			<div className="card-header">
				<ul className="nav nav-tabs card-header-tabs">
					{tabs.map((tab, i) => {
						if (!tab.title || (!Artist && tab.artistOnly))
							return;
						return (<li key={i} className="nav-item">
							<Link to={prefix + tab.path} className={"nav-link " + (activeTab == tab ? "active" : "")}>{tab.title}</Link>
						</li>)
					}
					)}
				</ul>
			</div>
			<div className="container p-3 mt-3">
				<Switch>
					{tabs.map((tab, i) => {
						if ((!Artist && tab.artistOnly))
							return;
						return(<Route key={i} exact path={prefix + (i > 0 ? tab.path:"")} render={(props) =>
							(<tab.component history={history} MegaUser={user} />)
						} />)
					})}
					<Redirect to={prefix} />
				</Switch>
			</div>
		</div>);
	}
}
export default ProfileNavigationBar;