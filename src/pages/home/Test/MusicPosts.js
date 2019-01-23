import React, { Component } from 'react';
import AlbumPost from "../../../components/Music/AlbumPost";
class MusicPosts extends Component {
	render() {
		return(<div className='card mb-3'>
			<div className='card-body'>
				<AlbumPost PostLocationId={13} LocationType={2} LocationId={0}/>
			</div>
		</div>
		)
	}
}
export default MusicPosts;