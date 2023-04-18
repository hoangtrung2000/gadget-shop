const generateHtml = (resetToken) => {
  return `Please click the link below to change your password. This link will expire after 15 minutes. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Change password</a>`;
};

export default generateHtml;
