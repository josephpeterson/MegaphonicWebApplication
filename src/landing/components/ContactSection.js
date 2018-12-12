import React, { Component } from 'react';

class ContactSection extends Component {

	render() {
		return (
			<section className="contact-section bg-black" id="contact">
				<div className="container">

					<div className="row text-center">
						<div className="col-lg-8 mx-auto">
							<h2 className="text-white mb-4">Contact Us</h2>
							<p className="text-white-50">This is contact stuff here</p>
						</div>
					</div>
					<div className="row">

						<div className="col-md-4 mb-3 mb-md-0">
							<div className="card py-4 h-100">
								<div className="card-body text-center">
									<i className="fas fa-map-marked-alt text-primary mb-2"></i>
									<h4 className="text-uppercase m-0">Address</h4>
									<hr className="my-4" />
									<div className="small text-black-50">4923 Market Street, Orlando FL</div>
								</div>
							</div>
						</div>

						<div className="col-md-4 mb-3 mb-md-0">
							<div className="card py-4 h-100">
								<div className="card-body text-center">
									<i className="fas fa-envelope text-primary mb-2"></i>
									<h4 className="text-uppercase m-0">Email</h4>
									<hr className="my-4" />
									<div className="small text-black-50">

									</div>
								</div>
							</div>
						</div>

						<div className="col-md-4 mb-3 mb-md-0">
							<div className="card py-4 h-100">
								<div className="card-body text-center">
									<i className="fas fa-mobile-alt text-primary mb-2"></i>
									<h4 className="text-uppercase m-0">Phone</h4>
									<hr className="my-4" />
									<div className="small text-black-50">+1 (555) 902-8832</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row justify-content-center">
						<img src="/logo.png" className="img-fluid" alt="" />
					</div>

				</div>
			</section>
		);
	}
}

export default ContactSection;