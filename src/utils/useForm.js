import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  const updateValue = ({ target }) => {
    let { value } = target;

    if (target.type === 'number') value = parseInt(value);
    setValues({
      ...values,
      [target.name]: value,
    });
  };

  return { values, updateValue };
};

export default useForm;
