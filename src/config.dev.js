export const Configuration = {
  auth: {
    authority: "https://localhost:5001/",
    client_id: "client",
    redirect_uri: "http://localhost:3000/callback",
    response_type: "id_token token",
    scope: "openid profile email office",
    post_logout_redirect_uri: "http://localhost:3000/",
  }
}