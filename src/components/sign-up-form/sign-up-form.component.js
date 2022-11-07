import {useState } from 'react';
import './sign-up-form.styles.scss';
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { 
  createUserDocumentFromAuth, 
  createAuthUserWithEmailAndPassword
} from '../utils/firebase/firebase.utils'

const defaultFormData = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function SignUpForm() {

  const [formData, setFormData] = useState(defaultFormData);
  const {displayName, email, password, confirmPassword} = formData;

  const resetFormData = () => {
    setFormData(defaultFormData);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const {user } = await createAuthUserWithEmailAndPassword(email, password)
      
      const userDocRef = await createUserDocumentFromAuth(user, {displayName})

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } 
      console.log('user creation encountered error:' + error.message);
    }
    
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Display Name'
          type='text'
          required
          name='displayName'
          value={displayName}
          onChange={handleChange}
          />
        <FormInput
          label='Email'
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
        <FormInput
          label='Confirm Password'
          type='password' 
          required
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
} 