import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      SignInNavText: "Sign In",
      SignUpNavText: "Sign Up",
      LabelForgotPassword: "Forgot your password?",
      Login: {
        SignInButtonText: "Login",
        LabelEmailAddress: "Email Address",
        LabelPassword: "Password",
        EmailValidationText: "Please enter a valid email address.",
        PasswordValidationText: "Please enter a valid password"
      },
      SignUp: {
        SignUpButtonText: "Sign Up",
        LabelEmailAddress: "Email Address",
        LabelPassword: "Password",
        LabelConfirmPassword: "Confirm Password",
        EmailValidationText: "Please enter a valid email address.",
        PasswordValidationText: "Please enter a valid password",
        ConfirmPasswordValidationText:
          "Confirm password and password do not match.",
        SignUpSuccess: "Signup Success",
        SignUpSuccessAlert:
          "Registration Successful. A confirmation will be sent to your e-mail address."
      },
      ResetPassword: {
        HeadingText: "Password Recovery",
        ResetButtonText: "Reset Password",
        LabelEmailAddress: "Email Address",
        PlaceholderEmailAddress: "eg: yourname@gmail.com",
        BackToLoginButtonText: "Back to login?"
      }
    }
  },
  fr: {
    translation: {
      SignInNavText: "S'identifier",
      SignUpNavText: "S'inscrire",
      LabelForgotPassword: "Mot de passe oublié?",
      Login: {
        SignInButtonText: "Connexion",
        LabelEmailAddress: "Adresse e-mail",
        LabelPassword: "Mot de passe",
        EmailValidationText:
          "S'il vous plaît, mettez une adresse email valide.",
        PasswordValidationText: "Entrer un mot de passe valide s'il vous plait."
      },
      SignUp: {
        SignUpButtonText: "S'inscrire",
        LabelEmailAddress: "Adresse e-mail",
        LabelPassword: "Mot de passe",
        LabelConfirmPassword: "Confirmez le mot de passe",
        EmailValidationText:
          "S'il vous plaît, mettez une adresse email valide.",
        PasswordValidationText:
          "Entrer un mot de passe valide s'il vous plait.",
        ConfirmPasswordValidationText:
          "Le mot de passe de confirmation et le mot de passe ne correspondent pas.",
        SignUpSuccess: "Succès de l'inscription",
        SignUpSuccessAlert:
          "Inscription réussi. Une confirmation sera envoyée à votre adresse e-mail."
      },
      ResetPassword: {
        HeadingText: "Récupération de mot de passe",
        ResetButtonText: "Réinitialiser le mot de passe",
        LabelEmailAddress: "Adresse e-mail",
        PlaceholderEmailAddress: "ex : votre nom@gmail.com",
        BackToLoginButtonText: "Retour connexion?"
      }
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    compatibilityJSON: "v3",
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
