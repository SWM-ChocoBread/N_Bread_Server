import passport from 'passport';
const KakaoStrategy = require('passport-kakao').Strategy;
import {User} from '../../database/models/user';
import config from '../';

const passportKakao = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: config.kakaoId,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          });

          console.log('profile.id : ' + profile._json.id);
          console.log('profile.email : ' + profile._json.kakao_account.email);

          if (exUser) {
            await exUser.update({ isNewUser: false });
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
              isNewUser: true,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
export { passportKakao };
