import { useReducer } from 'react';

import { validate } from '../../../util/validators';
import './Input.css';

function inputReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

export default function Input({
  formElement,
  label,
  id,
  type,
  placeholder,
  rows,
  errorText,
  validators,
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false,
  });

  function changeHandler(event) {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators,
    });
  }

  function touchHandler() {
    dispatch({
      type: 'TOUCH',
    });
  }

  const element =
    formElement === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
}
