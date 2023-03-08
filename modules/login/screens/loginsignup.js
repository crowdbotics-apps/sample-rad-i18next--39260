import { StyleSheet } from "react-native"
import { OptionsContext } from "@options"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { unwrapResult } from "@reduxjs/toolkit"
import React, { useContext, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
// import { loginRequest, signupRequest } from "../auth"
// import { validateEmail } from "../constants"
import { buttonStyles, Color, textInputStyles } from "./styles" // Custom Text Input
import { useTranslation } from "react-i18next"

export const TextInputField = props => (
  <View>
    <Text style={[textInputStyles.label, props.labelStyle]}>{props.label}</Text>
    <TextInput
      autoCapitalize="none"
      style={[textInputStyles.textInput, props.textInputStyle]}
      placeholderTextColor={Color.steel}
      underlineColorAndroid={"transparent"}
      {...props}
    />
    {!!props.error && <Text style={textInputStyles.error}>{props.error}</Text>}
  </View>
) // Custom Button

export const Button = props => (
  <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
    <View style={[buttonStyles.viewStyle, props.buttonStyle]}>
      {props.loading ? (
        <ActivityIndicator
          color={props.loadingColor ? props.loadingColor : Color.white}
          style={props.loadingStyle}
        />
      ) : (
        <Text style={[buttonStyles.textStyle, props.buttonTextStyle]}>
          {props.title}
        </Text>
      )}
    </View>
  </TouchableOpacity>
) // Signup Component Tab

export const SignupTab = ({ navigation, route }) => {
  const options = useContext(OptionsContext)
  const { textInputStyle, buttonStyle, buttonTextStyle } = route.params
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  })
  // const { api } = useSelector(state => state.Login)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()

  const onSignupPress = async () => {
    setValidationError({
      email: "",
      password: ""
    })

    if (!email) {
      return setValidationError({
        email: t("SignUp.EmailValidationText"),
        password: ""
      })
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: t("SignUp.PasswordValidationText")
      })
    }

    if (password !== confirmPassword) {
      return setValidationError({
        email: "",
        password: t("SignUp.ConfirmPasswordValidationText")
      })
    }

    dispatch(
      signupRequest({
        email,
        password
      })
    )
      .then(unwrapResult)
      .then(() => {
        Alert.alert(t("SignUp.SignUpSuccess"), t("SignUp.SignUpSuccessAlert"))
      })
      .catch(err => console.log(err.message))
  }

  return (
    <KeyboardAvoidingView>
      <View style={_styles.advHZVLx}>
        <TextInputField
          keyboardType="email-address"
          label={t("SignUp.LabelEmailAddress")}
          placeholder={t("SignUp.LabelEmailAddress")}
          onChangeText={value => setEmail(value)}
          value={email}
          error={validationError.email}
          textInputStyle={textInputStyle}
        />
        <TextInputField
          label={t("SignUp.LabelPassword")}
          placeholder={t("SignUp.LabelPassword")}
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          value={password}
          error={validationError.password}
          textInputStyle={textInputStyle}
        />
        <TextInputField
          label={t("SignUp.LabelConfirmPassword")}
          placeholder={t("SignUp.LabelConfirmPassword")}
          secureTextEntry={true}
          onChangeText={value => setConfirmPassword(value)}
          value={confirmPassword}
          textInputStyle={textInputStyle}
        />
      </View>
      <Button
        title={t("SignUp.SignUpButtonText")}
        // loading={api.loading === "pending"}
        onPress={onSignupPress}
        buttonStyle={buttonStyle}
        buttonTextStyle={buttonTextStyle}
      />
      {/* {!!api.error && (
        <Text style={textInputStyles.error}>{api.error.message}</Text>
      )} */}
    </KeyboardAvoidingView>
  )
}

export const SignInTab = ({ navigation, route }) => {
  const options = useContext(OptionsContext)
  const { textInputStyle, buttonStyle, buttonTextStyle } = route.params
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  })
  // const { api } = useSelector(state => state.Login)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()

  const onSigninPress = async () => {
    if (!email) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      })
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      })
    }

    dispatch(
      loginRequest({
        username: email,
        password
      })
    )
      .then(unwrapResult)
      .then(async res => {
        if (res.token) {
          await AsyncStorage.setItem("access_token", res.token)
          navigation.navigate(options.HOME_SCREEN_NAME)
        }
      })
      .catch(err => console.log(err.message))
  }

  return (
    <KeyboardAvoidingView>
      <View style={_styles.ASYuuknY}>
        <TextInputField
          keyboardType="email-address"
          label={t("Login.LabelEmailAddress")}
          placeholder={t("Login.LabelEmailAddress")}
          onChangeText={value => setEmail(value)}
          value={email}
          error={validationError.email}
          textInputStyle={textInputStyle}
        />
        <TextInputField
          label={t("Login.LabelPassword")}
          placeholder={t("Login.LabelPassword")}
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          value={password}
          error={validationError.password}
          textInputStyle={textInputStyle}
        />
      </View>

      <Button
        title={t("Login.SignInButtonText")}
        // loading={api.loading === "pending"}
        onPress={onSigninPress}
        buttonStyle={buttonStyle}
        buttonTextStyle={buttonTextStyle}
      />
      {/* {!!api.error && (
        <Text style={textInputStyles.error}>{api.error.message}</Text>
      )} */}
      <View style={_styles.zlhFqcWb}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("PasswordReset")
          }}
        >
          <Text>{t("LabelForgotPassword")}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const _styles = StyleSheet.create({
  advHZVLx: {
    marginVertical: 10,
    marginHorizontal: 15
  },
  ASYuuknY: {
    marginVertical: 10,
    marginHorizontal: 15
  },
  zlhFqcWb: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  }
})
