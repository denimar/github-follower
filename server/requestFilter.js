import authenticationHelper from './modules/authentication/authentication.helper';
import cookieParser from 'cookie-parser';

module.exports = function(app) {

  //app.use(cookieParser());

  app.use(function (req, res, next) {
    let hasPoint = req.originalUrl.indexOf('.') != -1;

    //console.log(req.originalUrl);

    if (hasPoint) {
      next();
    } else {
      //let acceptedUrls = ['/endpoints/login/authenticate', '/login'];
      //if (acceptedUrls.includes(req.originalUrl) || authenticationHelper.isValidToken(req.cookies['auth'])) {
        next();
      //} else {
      //  res.redirect('/login');
      //}
    }
  });

}
