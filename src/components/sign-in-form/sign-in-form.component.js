import React, {useState, useContext } from 'react';
import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { 
  createUserDocumentFromAuth, 
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../components/utils/firebase/firebase.utils'
import { UserContext } from '../../contexts/user.context'


const defaultFormData = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [formData, setFormData] = useState(defaultFormData);
  const {email, password} = formData;
  const {setCurrentUser} = useContext(UserContext);

  const resetFormData = () => {
    setFormData(defaultFormData);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormData({...formData, [name]: value});
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    setCurrentUser(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
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
          <Button type='submit'>Sign Up</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign Up</Button>
        </div>
      </form>
    </div>
  )
};

export default SignInForm;