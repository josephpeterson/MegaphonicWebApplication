import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';

class ProfileNavigationBar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		var user = this.props.ProfileUser;
		var path = this.props.path;
		//TODO: change this logic at some point
		
		var prefix = this.props.Prefix;
		var Artist = this.props.Artist;
		var Me = this.props.Me;
		var history = this.props.history;
		var tabs = this.props.Tabs;


		var activeTab = tabs.find(t => prefix + t.path == path);
		if (!activeTab)
			activeTab = tabs[0];

		return (<div>
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
			<div className="container p-3">
				<Switch>
					{tabs.map((tab, i) => {
						if ((!Artist && tab.artistOnly))
							return;
						return(<Route key={i} exact path={prefix + (i > 0 ? tab.path:"")} render={(props) =>
							(<tab.component history={history} ProfileUser={user} MegaUser={this.props.MegaUser} {...this.props}/>)
						} />)
					})}
					<Redirect to={prefix} />
				</Switch>
			</div>
		</div>);
	}
}
export default ProfileNavigationBar;