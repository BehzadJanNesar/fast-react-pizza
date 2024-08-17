import { useState, FormEvent, ChangeEvent } from 'react';
import Button from '../../ui/Button';

function CreateUser(): JSX.Element {
  const [username, setUsername] = useState<string>('');

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    // Additional logic for submitting the form can be added here
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="input mb-8 w-72"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />

      {username !== '' && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
