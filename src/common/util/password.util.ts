import * as bcrypt from "bcryptjs";

class PasswordUtil {
  public hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };
}

export const passwordUtil = new PasswordUtil();
