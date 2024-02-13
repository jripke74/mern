import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

export default function NewPlace() {
  return (
    <form className="place-form">
      <Input
        formElement="input"
        type="text"
        label="Title"
        validators={[]}
        errorText="Please enter a valid title."
      />
    </form>
  );
}
