import React, { Component } from 'react';

class AboutSection extends Component {

	render() {
		return (
			<section id="about" className="about-section text-center">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto">
							<h2 className="text-white mb-4">About Megaphonic</h2>
							<p className="text-white-50">Grayscale is a free Bootstrap theme created by Start Bootstrap. It can be yours right now, simply download the template on
		<a href="http://startbootstrap.com/template-overviews/grayscale/">the preview page</a>. The theme is open source, and you can use it for any purpose, personal or commercial.</p>
						</div>
					</div>
					<div className="row">

						<div className="col-md-4 mb-3 mb-md-0">
							<div className="card py-4 h-100">
								<div className="card-body text-center">
									<i className="fas fa-map-marked-alt text-primary mb-2"></i>
									<h4 className="text-uppercase m-0">Stream Content</h4>
									<hr className="my-4" />
									<div className="small text-black-50">From music to live performances</div>
								</div>
							</div>
						</div>

						<div className="col-md-4 mb-3 mb-md-0">
							<div className="card py-4 h-100">
								<div className="card-body text-center">
									<i className="fas fa-envelope text-primary mb-2"></i>
									<h4 className="text-uppercase m-0">Book Shows</h4>
									<hr className="my-4" />
									<div className="small text-black-50">
										<a href="#">hello@yourdomain.com</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-4 mb-3 mb-md-0">
							<div className="card py-4 h-100">
								<div className="card-body text-center">
									<i className="fas fa-mobile-alt text-primary mb-2"></i>
									<h4 className="text-uppercase m-0">Support Artists</h4>
									<hr className="my-4" />
									<div className="small text-black-50">+1 (555) 902-8832</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
					<hr/>
					</div>
				</div >
			</section >
		);
	}
}

export default AboutSection;