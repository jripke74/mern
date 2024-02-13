import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import './NewPlace.css';

export default function NewPlace() {
  return (
    <form className="place-form">
      <Input
        formElement="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
      />
    </form>
  );
}
