import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class FeedPost extends Component {
	render() {
		return (
			<div className="row">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Card title</h5>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid de Pythagora? An eiusdem modi? Quippe: habes enim a rhetoribus;
		Cur iustitia laudatur? Torquatus, is qui consul cum Cn. Id est enim, de quo quaerimus.
		Quis enim redargueret? Duo Reges: constructio interrete. Nihilo beatiorem esse Metellum quam Regulum. Ostendit pedes et pectus. Quae quidem sapientes sequuntur duce natura tamquam videntes; Id Sextilius factum negabat.
						</p>
						<a href="#" className="btn btn-primary m-2">Like</a>
						<a href="#" className="btn btn-primary m-2">Share</a>
					</div>
				</div>
			</div>
		)
	}
}
export default FeedPost;