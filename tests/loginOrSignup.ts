import { ALICE } from "./fixtures/users";
import { SignIn } from "./pom/SignIn";
import { SignUp } from "./SignUp";

export const loginOrSignup = async (page,{name = ALICE.name, email = ALICE.email}) => {

  const signIn = new SignIn(page);
  const signUp = new SignUp(page);

  await page.goto('http://localhost:5173/');

  try {
    await page.getByRole('button', { name: /Your feed/i }).waitFor({ timeout: 300 });
  } catch (error) {
    await signIn.navigate();

    try {
      await signIn.fillAndSignIn({email, timeout: 300 });
    } catch (error) {
      await signUp.navigate();
      await signUp.fillAndSignUp({name,email});
    }
  }
};
