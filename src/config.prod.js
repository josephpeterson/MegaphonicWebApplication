export const Configuration = {
  auth: {
    authority: "http://3.16.48.81/auth",
    client_id: "client",
    redirect_uri: "http://3.16.48.81/callback",
    response_type: "id_token token",
    scope: "openid profile email office",
    post_logout_redirect_uri: "http://3.16.48.81/",
  }
}