import { Injectable }       from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { ConfigService }    from "@nestjs/config";
@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private config: ConfigService) {
    super({
      clientID:     config.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: config.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL:  `${config.get<string>("APP_URL")}/auth/google/callback`,
      scope:        ["email", "profile"],
    });
  }
  async validate(_at: string, _rt: string, profile: any, done: VerifyCallback) {
    const { id, emails, name } = profile;
    done(null, {
      googleId:  id,
      email:     emails?.[0]?.value ?? "",
      firstName: name?.givenName ?? "",
      lastName:  name?.familyName ?? "",
    });
  }
}
