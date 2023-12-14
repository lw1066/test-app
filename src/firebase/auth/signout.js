
import { auth } from './signin';

const signOutUser = async () => {
  try {
    await auth.signOut();
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export { signOutUser };
