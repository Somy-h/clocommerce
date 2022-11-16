import React, {useState } from 'react';
import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { 
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import { 
  googleSignInStart,
  emailSignInStart
} from '../../store/user/user.action';
import { useDispatch } from 'react-redux';

const defaultFormData = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [formData, setFormData] = useState(defaultFormData);
  const {email, password} = formData;
  
  const dispatch = useDispatch();

  const resetFormData = () => {
    setFormData(defaultFormData);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormData({...formData, [name]: value});
  }

  const signInWithGoogle = async () => {
    //const { user } = await signInWithGooglePopup();
    dispatch(googleSignInStart());
  }
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email, password))
      resetFormData();
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('Your email was not found. Try again.');
          break;
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        default:
          console.log(error);
      }
    }
  }

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='email'
          type='email' 
          required
          name='email'
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label='Password'
          type='password' 
          required
          name='password'
          value={password}
          onChange={handleChange}
          />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign In</Button>
        </div>
      </form>
    </div>
  )
};

export default SignInForm;